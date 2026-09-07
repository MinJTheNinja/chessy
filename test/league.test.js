const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const test = require("node:test");

const projectDir = path.resolve(__dirname, "..");

async function waitForServer(child, port) {
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk.toString(); });
  child.stderr.on("data", (chunk) => { output += chunk.toString(); });
  const baseUrl = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Server exited with ${child.exitCode}: ${output}`);
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return baseUrl;
    } catch {
      // The child has not bound its port yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  child.kill();
  throw new Error(`Server start timed out: ${output}`);
}

async function startServer(dataDir) {
  const port = crypto.randomInt(20_000, 50_000);
  const child = spawn(process.execPath, ["server.js"], {
    cwd: projectDir,
    env: {
      ...process.env,
      PORT: String(port),
      LOCAL_DATA_DIR: dataDir,
      NODE_ENV: "test",
      DATABASE_URL: "",
      TEACHER_ACCESS_CODE: "league-test-teacher",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const baseUrl = await waitForServer(child, port);
  return { child, baseUrl };
}

async function stopServer(child) {
  if (!child || child.exitCode !== null) return;
  child.kill();
  await new Promise((resolve) => {
    child.once("exit", resolve);
    setTimeout(resolve, 5_000).unref();
  });
}

async function request(baseUrl, pathname, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.cookie) headers.cookie = options.cookie;
  if (options.body !== undefined) headers["content-type"] = "application/json";
  const response = await fetch(`${baseUrl}${pathname}`, {
    method: options.method || "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  return {
    status: response.status,
    data: await response.json(),
    cookie: response.headers.get("set-cookie")?.split(";")[0] || "",
  };
}

async function signup(baseUrl, email, displayName) {
  const result = await request(baseUrl, "/api/auth/signup", {
    method: "POST",
    body: { email, password: "league-test-password", displayName },
  });
  assert.equal(result.status, 200);
  return result;
}

async function createLeague(baseUrl, cookie, name) {
  const result = await request(baseUrl, "/api/leagues/create", {
    method: "POST",
    cookie,
    body: { name, teacherCode: "league-test-teacher" },
  });
  assert.ok([200, 201].includes(result.status));
  return result;
}

test("forum preserves staff and teacher notices while blocking league students from creating posts", { timeout: 60_000 }, async (t) => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "easymate-forum-roles-"));
  const runtime = await startServer(dataDir);
  t.after(async () => {
    await stopServer(runtime.child);
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  const staff = await signup(runtime.baseUrl, "forum-staff@example.test", "Forum Staff");
  const teacher = await signup(runtime.baseUrl, "forum-teacher@example.test", "Forum Teacher");
  const student = await signup(runtime.baseUrl, "forum-student@example.test", "Forum Student");
  const outsider = await signup(runtime.baseUrl, "forum-outsider@example.test", "Forum Outsider");

  const createdLeague = await createLeague(runtime.baseUrl, teacher.cookie, "Forum Class");
  const joined = await request(runtime.baseUrl, "/api/leagues/join", {
    method: "POST",
    cookie: student.cookie,
    body: { code: createdLeague.data.league.code },
  });
  assert.equal(joined.status, 200);

  const staffNotice = await request(runtime.baseUrl, "/api/forum/posts", {
    method: "POST",
    cookie: staff.cookie,
    body: { title: "Staff notice", body: "Staff announcement", category: "Notice" },
  });
  assert.equal(staffNotice.status, 201);
  assert.equal(staffNotice.data.post.category, "Notice");

  const teacherNotice = await request(runtime.baseUrl, "/api/forum/posts", {
    method: "POST",
    cookie: teacher.cookie,
    body: { title: "Teacher notice", body: "Class announcement", category: "Notice" },
  });
  assert.equal(teacherNotice.status, 201);
  assert.equal(teacherNotice.data.post.category, "Notice");

  const studentPost = await request(runtime.baseUrl, "/api/forum/posts", {
    method: "POST",
    cookie: student.cookie,
    body: { title: "Student post", body: "Should be blocked", category: "Question" },
  });
  assert.equal(studentPost.status, 403);

  const outsiderPost = await request(runtime.baseUrl, "/api/forum/posts", {
    method: "POST",
    cookie: outsider.cookie,
    body: { title: "Outside post", body: "Allowed outside a league", category: "Free" },
  });
  assert.equal(outsiderPost.status, 201);
  assert.equal(outsiderPost.data.post.category, "Free");

  const pinned = await request(runtime.baseUrl, `/api/forum/posts/${staffNotice.data.post.id}/pin`, {
    method: "PATCH",
    cookie: staff.cookie,
  });
  assert.equal(pinned.status, 200);
  assert.equal(pinned.data.post.pinned, true);
});

test("league membership, teacher access, codes, and owner rows remain stable", { timeout: 60_000 }, async (t) => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "easymate-leagues-"));
  let runtime = await startServer(dataDir);
  t.after(async () => {
    await stopServer(runtime.child);
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  const teacherA = await signup(runtime.baseUrl, "teacher-a@example.test", "Teacher A");
  const teacherB = await signup(runtime.baseUrl, "teacher-b@example.test", "Teacher B");
  const student = await signup(runtime.baseUrl, "student@example.test", "Student");

  assert.equal(student.data.user.isTeacher, false);
  const forbiddenTeacherPage = await request(runtime.baseUrl, "/api/leagues/teacher", { cookie: student.cookie });
  assert.equal(forbiddenTeacherPage.status, 403);

  const createdA = await createLeague(runtime.baseUrl, teacherA.cookie, "Class A");
  const createdB = await createLeague(runtime.baseUrl, teacherB.cookie, "Class B");
  const codeA = createdA.data.league.code;
  const codeB = createdB.data.league.code;
  assert.notEqual(codeA, codeB);

  const repeatedCreate = await createLeague(runtime.baseUrl, teacherA.cookie, "Replacement name");
  assert.equal(repeatedCreate.status, 200);
  assert.equal(repeatedCreate.data.league.code, codeA);

  let teacherViewA = await request(runtime.baseUrl, "/api/leagues/teacher", { cookie: teacherA.cookie });
  assert.equal(teacherViewA.status, 200);
  const teacherRow = teacherViewA.data.league.members.find((member) => member.id === teacherA.data.user.id);
  assert.ok(teacherRow, "the league owner must appear on the teacher leaderboard");
  assert.equal(teacherRow.isTeacher, true);

  const identityPath = path.join(dataDir, "identity.json");
  const identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  const storedTeacher = identity.users.find((user) => user.id === teacherA.data.user.id);
  storedTeacher.profile.leagueCode = "";
  storedTeacher.profile.leagueJoined = false;
  fs.writeFileSync(identityPath, JSON.stringify(identity, null, 2));

  const recoveredTeacherSession = await request(runtime.baseUrl, "/api/session", { cookie: teacherA.cookie });
  assert.equal(recoveredTeacherSession.data.user.leagueCode, codeA, "league ownership must recover a stale owner membership");
  const recoveredTeacherLeaderboard = await request(runtime.baseUrl, "/api/leagues/leaderboard?scope=mine", { cookie: teacherA.cookie });
  assert.equal(recoveredTeacherLeaderboard.data.code, codeA);
  assert.ok(recoveredTeacherLeaderboard.data.members.some((member) => member.id === teacherA.data.user.id));

  let membership = await request(runtime.baseUrl, "/api/leagues/join", {
    method: "POST",
    cookie: student.cookie,
    body: { code: codeA },
  });
  assert.equal(membership.status, 200);
  assert.equal(membership.data.user.leagueCode, codeA);

  const left = await request(runtime.baseUrl, "/api/leagues/leave", {
    method: "POST",
    cookie: student.cookie,
  });
  assert.equal(left.status, 200);
  assert.equal(left.data.user.leagueCode, "");
  let studentSession = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.equal(studentSession.data.user.leagueCode, "", "leaving must persist beyond the mutation response");

  membership = await request(runtime.baseUrl, "/api/leagues/join", {
    method: "POST",
    cookie: student.cookie,
    body: { code: codeB },
  });
  assert.equal(membership.status, 200);
  studentSession = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.equal(studentSession.data.user.leagueCode, codeB);
  const studentLeaderboard = await request(runtime.baseUrl, "/api/leagues/leaderboard?scope=mine", { cookie: student.cookie });
  assert.equal(studentLeaderboard.data.code, codeB);
  assert.ok(studentLeaderboard.data.members.some((member) => member.id === student.data.user.id));
  teacherViewA = await request(runtime.baseUrl, "/api/leagues/teacher", { cookie: teacherA.cookie });
  assert.equal(teacherViewA.data.league.members.some((member) => member.id === student.data.user.id), false);

  const competitionEndsOn = new Date(Date.now() + 30 * 24 * 60 * 60 * 1_000).toISOString().slice(0, 10);
  const savedSettings = await request(runtime.baseUrl, "/api/leagues/teacher", {
    method: "PATCH",
    cookie: teacherA.cookie,
    body: { name: "Class A Updated", competitionEndsOn },
  });
  assert.equal(savedSettings.status, 200);
  assert.equal(savedSettings.data.league.code, codeA, "saving settings must retain the league code");
  const repairedTeacherSession = await request(runtime.baseUrl, "/api/session", { cookie: teacherA.cookie });
  assert.equal(repairedTeacherSession.data.user.leagueCode, codeA, "saving settings must persistently repair owner membership");
  const appState = JSON.parse(fs.readFileSync(path.join(dataDir, "db.json"), "utf8"));
  assert.equal(appState.leagues.length, 2);
  assert.deepEqual(new Set(appState.leagues.map((league) => league.code)), new Set([codeA, codeB]));

  const ownerLeave = await request(runtime.baseUrl, "/api/leagues/leave", { method: "POST", cookie: teacherA.cookie });
  assert.equal(ownerLeave.status, 200);
  assert.equal(ownerLeave.data.user.leagueCode, "");
  assert.equal(ownerLeave.data.user.isTeacher, true, "leaving membership must retain teacher management access");
  teacherViewA = await request(runtime.baseUrl, "/api/leagues/teacher", { cookie: teacherA.cookie });
  assert.equal(teacherViewA.status, 200);
  assert.equal(teacherViewA.data.league.ownerIsMember, false);
  assert.equal(teacherViewA.data.league.members.some((member) => member.id === teacherA.data.user.id), false);
  const settingsAfterLeaving = await request(runtime.baseUrl, "/api/leagues/teacher", {
    method: "PATCH",
    cookie: teacherA.cookie,
    body: { name: "Class A After Leaving", competitionEndsOn },
  });
  assert.equal(settingsAfterLeaving.status, 200);
  const ownerSessionAfterSettings = await request(runtime.baseUrl, "/api/session", { cookie: teacherA.cookie });
  assert.equal(ownerSessionAfterSettings.data.user.leagueCode, "", "saving settings must not rejoin an owner who intentionally left");

  const removed = await request(runtime.baseUrl, `/api/leagues/teacher/members/${student.data.user.id}`, {
    method: "DELETE",
    cookie: teacherB.cookie,
  });
  assert.equal(removed.status, 200);
  studentSession = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.equal(studentSession.data.user.leagueCode, "");

  const restored = await request(runtime.baseUrl, `/api/leagues/teacher/members/${student.data.user.id}/restore`, {
    method: "POST",
    cookie: teacherB.cookie,
  });
  assert.equal(restored.status, 200);
  studentSession = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.equal(studentSession.data.user.leagueCode, codeB);

  await stopServer(runtime.child);
  runtime = await startServer(dataDir);
  studentSession = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.equal(studentSession.data.user.leagueCode, codeB, "membership must survive a server restart");
  teacherViewA = await request(runtime.baseUrl, "/api/leagues/teacher", { cookie: teacherA.cookie });
  assert.equal(teacherViewA.data.league.code, codeA);
  assert.equal(teacherViewA.data.league.ownerIsMember, false);
  assert.equal(teacherViewA.data.league.members.some((member) => member.id === teacherA.data.user.id), false);
  const teacherSessionAfterRestart = await request(runtime.baseUrl, "/api/session", { cookie: teacherA.cookie });
  assert.equal(teacherSessionAfterRestart.data.user.leagueCode, "");
  assert.equal(teacherSessionAfterRestart.data.user.isTeacher, true);
});

test("deleting a teacher league removes the league and every membership permanently", { timeout: 60_000 }, async (t) => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "easymate-league-delete-"));
  let runtime = await startServer(dataDir);
  t.after(async () => {
    await stopServer(runtime.child);
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  const teacher = await signup(runtime.baseUrl, "delete-teacher@example.test", "Delete Teacher");
  const student = await signup(runtime.baseUrl, "delete-student@example.test", "Delete Student");
  const removedStudent = await signup(runtime.baseUrl, "removed-student@example.test", "Removed Student");
  const created = await createLeague(runtime.baseUrl, teacher.cookie, "Delete This League");
  const code = created.data.league.code;

  for (const account of [student, removedStudent]) {
    const joined = await request(runtime.baseUrl, "/api/leagues/join", {
      method: "POST",
      cookie: account.cookie,
      body: { code },
    });
    assert.equal(joined.status, 200);
  }

  const removed = await request(runtime.baseUrl, `/api/leagues/teacher/members/${removedStudent.data.user.id}`, {
    method: "DELETE",
    cookie: teacher.cookie,
  });
  assert.equal(removed.status, 200);

  const deleted = await request(runtime.baseUrl, "/api/leagues/teacher", {
    method: "DELETE",
    cookie: teacher.cookie,
  });
  assert.equal(deleted.status, 200);
  assert.equal(deleted.data.deletedLeagueCode, code);
  assert.equal(deleted.data.removedMemberCount, 2, "the owner and active student should be removed");
  assert.equal(deleted.data.user.isTeacher, false);
  assert.equal(deleted.data.user.teacherLeagueCode, "");
  assert.equal(deleted.data.user.leagueCode, "");

  for (const account of [teacher, student, removedStudent]) {
    const session = await request(runtime.baseUrl, "/api/session", { cookie: account.cookie });
    assert.equal(session.data.user.leagueCode, "");
    assert.equal(session.data.user.teacherLeagueCode, "");
  }

  const teacherPage = await request(runtime.baseUrl, "/api/leagues/teacher", { cookie: teacher.cookie });
  assert.equal(teacherPage.status, 403);
  const oldCodeJoin = await request(runtime.baseUrl, "/api/leagues/join", {
    method: "POST",
    cookie: student.cookie,
    body: { code },
  });
  assert.equal(oldCodeJoin.status, 404);
  const leaderboard = await request(runtime.baseUrl, "/api/leagues/leaderboard?scope=mine", { cookie: student.cookie });
  assert.equal(leaderboard.data.emptyReason, "no-league");

  const state = JSON.parse(fs.readFileSync(path.join(dataDir, "db.json"), "utf8"));
  assert.equal(state.leagues.some((league) => league.code === code), false);
  const identity = JSON.parse(fs.readFileSync(path.join(dataDir, "identity.json"), "utf8"));
  const removedProfile = identity.users.find((item) => item.id === removedStudent.data.user.id).profile;
  assert.equal(removedProfile.removedFromLeagueCode, "");

  await stopServer(runtime.child);
  runtime = await startServer(dataDir);
  const sessionAfterRestart = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.equal(sessionAfterRestart.data.user.leagueCode, "");
  const deletedLeagueAfterRestart = await request(runtime.baseUrl, "/api/leagues/join", {
    method: "POST",
    cookie: student.cookie,
    body: { code },
  });
  assert.equal(deletedLeagueAfterRestart.status, 404);
});

test("Cheoinseong puzzles unlock strictly in sequence and repair skipped progress", { timeout: 30_000 }, async (t) => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "easymate-cheoinseong-"));
  const runtime = await startServer(dataDir);
  t.after(async () => {
    await stopServer(runtime.child);
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  const student = await signup(runtime.baseUrl, "cheoinseong-student@example.test", "History Student");
  const completeStage = (puzzleId) => request(runtime.baseUrl, "/api/training/puzzle-complete", {
    method: "POST",
    cookie: student.cookie,
    body: {
      puzzleId,
      title: puzzleId,
      theme: "처인성 전투",
      family: "처인성의 마지막 화살",
      level: 4,
      hintsUsed: 0,
      durationMs: 1_000,
      familyTotal: 5,
      levelTotal: 5,
    },
  });

  assert.equal((await completeStage("cheoin-1")).status, 200, "the first history puzzle must not require tutorial completion");
  const skipped = await completeStage("cheoin-3");
  assert.equal(skipped.status, 409);
  assert.equal(skipped.data.error, "Complete the previous Cheoinseong puzzle first.");

  const identityPath = path.join(dataDir, "identity.json");
  const identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  const storedStudent = identity.users.find((user) => user.id === student.data.user.id);
  storedStudent.profile.training.completedPuzzles.push({
    id: "cheoin-3",
    stars: 3,
    completedAt: new Date().toISOString(),
  });
  fs.writeFileSync(identityPath, JSON.stringify(identity, null, 2));

  assert.equal((await completeStage("cheoin-2")).status, 200);
  let session = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  const repairedIds = session.data.user.training.completedPuzzles
    .map((puzzle) => puzzle.id)
    .filter((id) => id.startsWith("cheoin-"));
  assert.deepEqual(repairedIds, ["cheoin-1", "cheoin-2"]);
  assert.equal((await completeStage("cheoin-3")).status, 200);
  session = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.deepEqual(
    session.data.user.training.completedPuzzles
      .map((puzzle) => puzzle.id)
      .filter((id) => id.startsWith("cheoin-")),
    ["cheoin-1", "cheoin-2", "cheoin-3"],
  );
});

test("training modules five and six gate mate-in-two and mate-in-three tiers", { timeout: 30_000 }, async (t) => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "easymate-puzzle-tiers-"));
  const runtime = await startServer(dataDir);
  t.after(async () => {
    await stopServer(runtime.child);
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  const student = await signup(runtime.baseUrl, "tier-student@example.test", "Tier Student");
  const completePuzzle = (puzzleId) => request(runtime.baseUrl, "/api/training/puzzle-complete", {
    method: "POST",
    cookie: student.cookie,
    body: { puzzleId, stars: 3, durationMs: 500 },
  });

  assert.equal((await completePuzzle("s1")).status, 409);
  for (let moduleId = 1; moduleId <= 6; moduleId += 1) {
    const completion = await request(runtime.baseUrl, "/api/training/tutorial-complete", {
      method: "POST",
      cookie: student.cookie,
      body: { module: moduleId },
    });
    assert.equal(completion.status, 200);
    if (moduleId === 4) assert.equal(completion.data.state.puzzleUnlocked, false);
  }

  assert.equal((await completePuzzle("m1")).status, 409);
  for (const puzzleId of ["s1", "s2", "s3"]) assert.equal((await completePuzzle(puzzleId)).status, 200);
  assert.equal((await completePuzzle("m1")).status, 200);
  assert.equal((await completePuzzle("a1")).status, 409);
  for (const puzzleId of ["m2", "m3", "h1", "h2"]) assert.equal((await completePuzzle(puzzleId)).status, 200);
  assert.equal((await completePuzzle("a1")).status, 200);
});

test("badge awards remain persisted, visible in profiles, and acknowledgeable", { timeout: 30_000 }, async (t) => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "easymate-badges-"));
  let runtime = await startServer(dataDir);
  t.after(async () => {
    await stopServer(runtime.child);
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  const student = await signup(runtime.baseUrl, "badge-student@example.test", "Badge Student");
  for (let moduleId = 1; moduleId <= 6; moduleId += 1) {
    const completion = await request(runtime.baseUrl, "/api/training/tutorial-complete", {
      method: "POST",
      cookie: student.cookie,
      body: { module: moduleId },
    });
    assert.equal(completion.status, 200);
  }
  for (let index = 1; index <= 5; index += 1) {
    const completion = await request(runtime.baseUrl, "/api/training/puzzle-complete", {
      method: "POST",
      cookie: student.cookie,
      body: {
        puzzleId: "badge-puzzle-" + index,
        title: "Badge puzzle " + index,
        theme: "theme-" + index,
        hintsUsed: 0,
        durationMs: 1_000,
      },
    });
    assert.equal(completion.status, 200);
  }

  let session = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  const earnedIds = new Set(session.data.user.achievements.map((badge) => badge.id));
  ["first-step", "piece-commander", "capture-specialist", "crisis-escape", "mate-solver", "flawless-solver", "lightning-move", "puzzle-explorer"]
    .forEach((id) => assert.ok(earnedIds.has(id), "missing earned badge: " + id));

  const profile = await request(runtime.baseUrl, "/api/profile", { cookie: student.cookie });
  assert.equal(profile.status, 200);
  assert.ok(profile.data.badges.length >= earnedIds.size);
  profile.data.badges.forEach((badge) => assert.ok(badge.imageUrl, "badge artwork must be available"));

  const pendingIds = session.data.user.badgeNotifications.map((badge) => badge.id);
  assert.ok(pendingIds.length > 0);
  const acknowledged = await request(runtime.baseUrl, "/api/achievements/acknowledge", {
    method: "POST",
    cookie: student.cookie,
    body: { ids: pendingIds },
  });
  assert.equal(acknowledged.status, 200);
  session = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.deepEqual(session.data.user.badgeNotifications, []);
  assert.deepEqual(new Set(session.data.user.achievements.map((badge) => badge.id)), earnedIds);

  await stopServer(runtime.child);
  runtime = await startServer(dataDir);
  session = await request(runtime.baseUrl, "/api/session", { cookie: student.cookie });
  assert.deepEqual(new Set(session.data.user.achievements.map((badge) => badge.id)), earnedIds);
});
