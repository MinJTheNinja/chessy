const assert = require("node:assert/strict");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const test = require("node:test");

const projectDir = path.resolve(__dirname, "..");

function waitForServer(child) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timer = setTimeout(() => reject(new Error(`Server start timed out: ${output}`)), 15000);
    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
      const match = output.match(/localhost:(\d+)/);
      if (match) {
        clearTimeout(timer);
        resolve(Number(match[1]));
      }
    });
    child.stderr.on("data", (chunk) => { output += chunk.toString(); });
    child.once("exit", (code) => reject(new Error(`Server exited with ${code}: ${output}`)));
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

test("normalized identity paths preserve concurrent mutations", { timeout: 120000 }, async (t) => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "easymate-concurrency-"));
  const child = spawn(process.execPath, ["server.js"], {
    cwd: projectDir,
    env: { ...process.env, PORT: "0", LOCAL_DATA_DIR: dataDir, NODE_ENV: "test", DATABASE_URL: "" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  t.after(() => {
    child.kill();
    fs.rmSync(dataDir, { recursive: true, force: true });
  });
  const port = await waitForServer(child);
  const baseUrl = `http://127.0.0.1:${port}`;
  const appStatePath = path.join(dataDir, "db.json");
  const identityPath = path.join(dataDir, "identity.json");

  const users = Array.from({ length: 100 }, (_, index) => ({
    email: `class-${index}@example.test`,
    password: "compatible-password",
    displayName: `Student ${index}`,
  }));
  const signupResults = await Promise.all(users.map((body) => request(baseUrl, "/api/auth/signup", { method: "POST", body })));
  assert.equal(signupResults.filter((result) => result.status === 200).length, 100);
  assert.equal(new Set(signupResults.map((result) => result.cookie)).size, 100);

  const duplicateResults = await Promise.all(Array.from({ length: 100 }, () => request(baseUrl, "/api/auth/signup", {
    method: "POST",
    body: { email: "same@example.test", password: "one-password", displayName: "Same" },
  })));
  assert.equal(duplicateResults.filter((result) => result.status === 200).length, 100);
  let identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  assert.equal(identity.users.filter((user) => user.email === "same@example.test").length, 1);

  const loginResults = await Promise.all(users.map((body) => request(baseUrl, "/api/auth/login", { method: "POST", body })));
  assert.equal(loginResults.filter((result) => result.status === 200).length, 100);
  assert.equal(new Set(loginResults.map((result) => result.cookie)).size, 100);
  identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  const loginTokenHashes = new Set(loginResults.map((result) => crypto.createHash("sha256").update(result.cookie.split("=")[1]).digest("hex")));
  assert.equal(identity.sessions.filter((session) => loginTokenHashes.has(session.tokenHash)).length, 100);

  const appStateMtime = fs.statSync(appStatePath).mtimeMs;
  const repeatedProgress = await Promise.all(Array.from({ length: 100 }, () => request(baseUrl, "/api/training/tutorial-complete", {
    method: "POST",
    cookie: signupResults[0].cookie,
    body: { module: 1 },
  })));
  assert.equal(repeatedProgress.filter((result) => result.status === 200).length, 100);
  identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  const firstUserId = signupResults[0].data.user.id;
  assert.equal(identity.tutorialProgress.filter((item) => item.userId === firstUserId && item.moduleId === 1).length, 1);

  const allProgress = await Promise.all(signupResults.map((signup) => request(baseUrl, "/api/training/tutorial-complete", {
    method: "POST",
    cookie: signup.cookie,
    body: { module: 1 },
  })));
  assert.equal(allProgress.filter((result) => result.status === 200).length, 100);
  identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  assert.equal(new Set(identity.tutorialProgress.filter((item) => item.moduleId === 1).map((item) => item.userId)).size, 100);
  const appState = JSON.parse(fs.readFileSync(appStatePath, "utf8"));
  assert.equal(Object.hasOwn(appState, "users"), false);
  assert.equal(Object.hasOwn(appState, "sessions"), false);
  assert.equal(fs.statSync(appStatePath).mtimeMs, appStateMtime, "identity APIs must not write app_state");
  const hiddenAppStatePath = `${appStatePath}.hidden`;
  fs.renameSync(appStatePath, hiddenAppStatePath);
  try {
    assert.equal((await request(baseUrl, "/api/session", { cookie: signupResults[0].cookie })).status, 200);
    assert.equal((await request(baseUrl, "/api/training/state", { cookie: signupResults[0].cookie })).status, 200);
    assert.equal((await request(baseUrl, "/api/auth/login", { method: "POST", body: users[0] })).status, 200);
    assert.equal((await request(baseUrl, "/api/training/tutorial-complete", {
      method: "POST",
      cookie: signupResults[0].cookie,
      body: { module: 1 },
    })).status, 200);
  } finally {
    fs.renameSync(hiddenAppStatePath, appStatePath);
  }

  const matches = await Promise.all(Array.from({ length: 3 }, () => request(baseUrl, "/api/matches/start", {
    method: "POST",
    cookie: signupResults[0].cookie,
    body: { pairingType: "practice" },
  })));
  assert.equal(matches.filter((result) => result.status === 200).length, 3);
  const matchIds = matches.map((result) => result.data.match.id);

  const mixed = [
    request(baseUrl, "/api/training/tutorial-complete", { method: "POST", cookie: signupResults[0].cookie, body: { module: 2 } }),
    request(baseUrl, "/api/profile", { method: "PUT", cookie: signupResults[1].cookie, body: { displayName: "Updated B", bio: "preserved" } }),
    request(baseUrl, "/api/auth/login", { method: "POST", body: users[0] }),
    request(baseUrl, "/api/training/tutorial-complete", { method: "POST", cookie: signupResults[1].cookie, body: { module: 2 } }),
  ];
  for (let round = 0; round < 10; round += 1) {
    for (const matchId of matchIds) {
      mixed.push(request(baseUrl, `/api/matches/${matchId}/transcript`, {
        method: "POST",
        cookie: signupResults[0].cookie,
        body: { text: `match-${matchId}-round-${round}`, kind: "speech" },
      }));
    }
  }
  const mixedResults = await Promise.all(mixed);
  const mixedFailures = mixedResults.filter((result) => result.status >= 400);
  assert.equal(mixedFailures.length, 0, JSON.stringify(mixedFailures));

  const [trainingA, trainingB, profileB, ...matchViews] = await Promise.all([
    request(baseUrl, "/api/training/state", { cookie: signupResults[0].cookie }),
    request(baseUrl, "/api/training/state", { cookie: signupResults[1].cookie }),
    request(baseUrl, "/api/profile", { cookie: signupResults[1].cookie }),
    ...matchIds.map((matchId) => request(baseUrl, `/api/matches/${matchId}`, { cookie: signupResults[0].cookie })),
  ]);
  assert.deepEqual(trainingA.data.state.completedModules, [1, 2]);
  assert.deepEqual(trainingB.data.state.completedModules, [1, 2]);
  assert.ok(trainingB.data.user.streak >= 1);
  assert.ok(trainingB.data.user.achievements.some((achievement) => achievement.id === "capture-specialist"));
  assert.equal(profileB.data.user.displayName, "Updated B");
  assert.equal(profileB.data.user.bio, "preserved");
  matchViews.forEach((view) => {
    const stressItems = view.data.match.transcript.filter((item) => item.text?.startsWith("match-"));
    assert.equal(stressItems.length, 10);
  });

  const logoutCookie = loginResults[0].cookie;
  assert.equal((await request(baseUrl, "/api/auth/logout", { method: "POST", cookie: logoutCookie })).status, 200);
  assert.equal((await request(baseUrl, "/api/session", { cookie: logoutCookie })).data.user, null);

  const expiringLogin = await request(baseUrl, "/api/auth/login", { method: "POST", body: users[2] });
  identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  const rawToken = expiringLogin.cookie.split("=")[1];
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  identity.sessions.find((session) => session.tokenHash === hashedToken).expiresAt = new Date(0).toISOString();
  fs.writeFileSync(identityPath, JSON.stringify(identity, null, 2));
  assert.equal((await request(baseUrl, "/api/session", { cookie: expiringLogin.cookie })).data.user, null);

  assert.equal((await request(baseUrl, "/api/auth/delete", { method: "DELETE", cookie: signupResults[1].cookie })).status, 200);
  identity = JSON.parse(fs.readFileSync(identityPath, "utf8"));
  const deletedUserId = signupResults[1].data.user.id;
  assert.equal(identity.users.some((user) => user.id === deletedUserId), false);
  assert.equal(identity.sessions.some((session) => session.userId === deletedUserId), false);
  assert.equal(identity.tutorialProgress.some((progress) => progress.userId === deletedUserId), false);
});

test("legacy password hashes remain compatible and comparison is asynchronous", async () => {
  process.env.PORT = "0";
  process.env.DATABASE_URL = "";
  const { verifyPassword } = require("../server");
  const salt = "00112233445566778899aabbccddeeff";
  const hash = crypto.pbkdf2Sync("legacy-password", salt, 120000, 32, "sha256").toString("hex");
  assert.equal(await verifyPassword("legacy-password", `${salt}:${hash}`), true);
  assert.equal(await verifyPassword("wrong-password", `${salt}:${hash}`), false);
});
