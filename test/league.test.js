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
