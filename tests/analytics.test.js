const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const net = require("node:net");
const { spawn } = require("node:child_process");
const { AnalyticsStore } = require("../analytics");

const anonId = "anon_00000000-0000-4000-8000-000000000001";
const suggestedSessionId = "as_00000000-0000-4000-8000-000000000001";

function event(name, suffix, properties = {}, page = "/") {
  return {
    event_id: `ae_00000000-0000-4000-8000-${String(suffix).padStart(12, "0")}`,
    event_name: name,
    timestamp: new Date().toISOString(),
    page,
    properties,
  };
}

async function temporaryDirectory(prefix) {
  return fs.promises.mkdtemp(path.join(os.tmpdir(), prefix));
}

async function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

async function waitForServer(child) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("server start timed out")), 10_000);
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.stdout.on("data", (chunk) => {
      if (!String(chunk).includes("Live Chess app running")) return;
      clearTimeout(timer);
      resolve();
    });
    child.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`server exited with ${code}: ${stderr}`));
    });
  });
}

function analyticsHeaders(sessionId = suggestedSessionId) {
  return {
    "content-type": "application/json",
    "x-easymate-analytics-consent": "granted",
    "x-easymate-anonymous-id": anonId,
    "x-easymate-session-id": sessionId,
    "x-easymate-page": "/home",
    "x-easymate-viewport-width": "1280",
  };
}

test("local analytics records anonymous/authenticated events and rolls sessions after inactivity", async () => {
  const dataDir = await temporaryDirectory("easymate-analytics-unit-");
  try {
    const store = new AnalyticsStore({ dataDir, sessionTimeoutMs: 100 });
    const first = await store.startOrResumeSession({ anonymousId: anonId, sessionId: suggestedSessionId, entryPage: "/" });
    assert.equal(first.created, true);
    const continued = await store.startOrResumeSession({ anonymousId: anonId, sessionId: suggestedSessionId, entryPage: "/" });
    assert.equal(continued.sessionId, first.sessionId);
    assert.equal(continued.created, false);

    await store.recordBatch({
      anonymousId: anonId,
      sessionId: first.sessionId,
      entryPage: "/",
      events: [event("page_viewed", 1)],
    });
    await store.recordBatch({
      anonymousId: anonId,
      sessionId: first.sessionId,
      userId: "user_real",
      entryPage: "/home",
      events: [event("profile_opened", 2, {}, "/profile")],
    });

    await new Promise((resolve) => setTimeout(resolve, 130));
    const next = await store.startOrResumeSession({ anonymousId: anonId, sessionId: first.sessionId, userId: "user_real", entryPage: "/home" });
    assert.notEqual(next.sessionId, first.sessionId);
    assert.equal(next.created, true);

    const stored = JSON.parse(await fs.promises.readFile(path.join(dataDir, "analytics.json"), "utf8"));
    assert.equal(stored.sessions[0].userId, "user_real");
    assert.equal(stored.events.find((item) => item.eventName === "page_viewed").userId, null);
    assert.equal(stored.events.find((item) => item.eventName === "profile_opened").userId, "user_real");
  } finally {
    await fs.promises.rm(dataDir, { recursive: true, force: true });
  }
});

test("event validation rejects unknown events and deduplicates event ids", async () => {
  const dataDir = await temporaryDirectory("easymate-analytics-validation-");
  try {
    const store = new AnalyticsStore({ dataDir });
    await assert.rejects(
      store.recordBatch({
        anonymousId: anonId,
        sessionId: suggestedSessionId,
        entryPage: "/",
        events: [event("password_copied", 3)],
      }),
      /Unsupported analytics event/,
    );
    const duplicate = event("page_viewed", 4);
    await store.recordBatch({ anonymousId: anonId, sessionId: suggestedSessionId, entryPage: "/", events: [duplicate, duplicate] });
    const stored = JSON.parse(await fs.promises.readFile(path.join(dataDir, "analytics.json"), "utf8"));
    assert.equal(stored.events.filter((item) => item.eventId === duplicate.event_id).length, 1);
  } finally {
    await fs.promises.rm(dataDir, { recursive: true, force: true });
  }
});

test("HTTP analytics is consent gated, size limited, identity safe, reconstructable, and staff only", async () => {
  const dataDir = await temporaryDirectory("easymate-analytics-http-");
  const port = await freePort();
  const child = spawn(process.execPath, ["server.js"], {
    cwd: path.join(__dirname, ".."),
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: "test",
      EASYMATE_DATA_DIR: dataDir,
      STAFF_EMAILS: "staff@easymate.test",
      ANALYTICS_SESSION_TIMEOUT_MS: "100",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await waitForServer(child);

    const noConsent = await fetch(`${baseUrl}/api/analytics/session`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ anonymous_id: anonId, session_id: suggestedSessionId }),
    });
    assert.equal(noConsent.status, 403);

    const sessionResponse = await fetch(`${baseUrl}/api/analytics/session`, {
      method: "POST",
      headers: analyticsHeaders(),
      body: JSON.stringify({ anonymous_id: anonId, session_id: suggestedSessionId, entry_page: "/home", viewport_width: 1280 }),
    });
    assert.equal(sessionResponse.status, 200);
    const session = await sessionResponse.json();

    const invalid = await fetch(`${baseUrl}/api/analytics/events`, {
      method: "POST",
      headers: analyticsHeaders(session.session_id),
      body: JSON.stringify({ anonymous_id: anonId, session_id: session.session_id, events: [event("keystroke_recorded", 5)] }),
    });
    assert.equal(invalid.status, 400);

    const oversized = await fetch(`${baseUrl}/api/analytics/events`, {
      method: "POST",
      headers: analyticsHeaders(session.session_id),
      body: JSON.stringify({ padding: "x".repeat(70_000) }),
    });
    assert.equal(oversized.status, 413);

    const sequence = [
      event("page_viewed", 10, {}, "/home"),
      event("play_page_viewed", 11, {}, "/play"),
      event("quick_match_clicked", 12, { match_type: "quick", rated: false }, "/play"),
      event("matchmaking_started", 13, { match_type: "quick" }, "/play"),
      event("matchmaking_cancelled", 14, { matchmaking_duration_ms: 2100 }, "/play"),
      event("page_viewed", 15, {}, "/home"),
      event("culture_content_impression", 16, { content_id: "cheoinseong", content_type: "history_collection" }, "/training"),
      event("culture_content_opened", 17, { content_id: "cheoinseong-puzzle", source_feature: "training" }, "/training"),
    ];
    const sequenceResponse = await fetch(`${baseUrl}/api/analytics/events`, {
      method: "POST",
      headers: analyticsHeaders(session.session_id),
      body: JSON.stringify({
        anonymous_id: anonId,
        session_id: session.session_id,
        user_id: "spoofed_user",
        entry_page: "/home",
        events: sequence,
      }),
    });
    assert.equal(sequenceResponse.status, 202);

    const signup = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: analyticsHeaders(session.session_id),
      body: JSON.stringify({ email: "player@easymate.test", displayName: "Player", password: "safe-test-password" }),
    });
    assert.equal(signup.status, 200);
    const playerCookie = signup.headers.get("set-cookie").split(";", 1)[0];
    const player = (await signup.json()).user;

    const authenticated = await fetch(`${baseUrl}/api/analytics/events`, {
      method: "POST",
      headers: { ...analyticsHeaders(session.session_id), cookie: playerCookie },
      body: JSON.stringify({
        anonymous_id: anonId,
        session_id: session.session_id,
        user_id: "spoofed_user",
        events: [event("profile_opened", 18, {}, "/profile")],
      }),
    });
    assert.equal(authenticated.status, 202);

    await new Promise((resolve) => setTimeout(resolve, 120));
    const stored = JSON.parse(await fs.promises.readFile(path.join(dataDir, "analytics.json"), "utf8"));
    const reconstructed = stored.events
      .filter((item) => item.sessionId === session.session_id && sequence.some((source) => source.event_id === item.eventId))
      .map((item) => item.eventName);
    assert.deepEqual(reconstructed, sequence.map((item) => item.event_name));
    assert.equal(stored.events.find((item) => item.eventName === "profile_opened").userId, player.id);
    assert.equal(stored.events.some((item) => item.userId === "spoofed_user"), false);

    const anonymousAdmin = await fetch(`${baseUrl}/api/admin/analytics/summary`);
    assert.equal(anonymousAdmin.status, 403);
    const playerAdmin = await fetch(`${baseUrl}/api/admin/analytics/summary`, { headers: { cookie: playerCookie } });
    assert.equal(playerAdmin.status, 403);

    const staffSignup = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "staff@easymate.test", displayName: "Staff", password: "safe-test-password" }),
    });
    assert.equal(staffSignup.status, 200);
    const staffCookie = staffSignup.headers.get("set-cookie").split(";", 1)[0];
    const staffAdmin = await fetch(`${baseUrl}/api/admin/analytics/summary?days=30`, { headers: { cookie: staffCookie } });
    assert.equal(staffAdmin.status, 200);
    const summary = await staffAdmin.json();
    assert.ok(summary.sessions.total >= 1);
    assert.ok(summary.featureUsage.quick_match.events >= 2);
    assert.ok(summary.featureUsage.culture_history.events >= 2);

    const source = await fs.promises.readFile(path.join(__dirname, "..", "app.js"), "utf8");
    assert.match(source, /analytics\?\.pageView\(viewName\)/);
    assert.match(source, /trackEvent\("matchmaking_started"/);
    assert.match(source, /trackEvent\("culture_content_opened"/);

    const analyticsPath = path.join(dataDir, "analytics.json");
    await fs.promises.rm(analyticsPath, { force: true });
    await fs.promises.mkdir(analyticsPath);
    const coreStillWorks = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: analyticsHeaders(session.session_id),
      body: JSON.stringify({ email: "resilient@easymate.test", displayName: "Resilient", password: "safe-test-password" }),
    });
    assert.equal(coreStillWorks.status, 200);
  } finally {
    child.kill();
    await new Promise((resolve) => child.once("exit", resolve));
    await fs.promises.rm(dataDir, { recursive: true, force: true });
  }
});

test("auth config stays available and health fails clearly while PostgreSQL reconnects", async () => {
  const dataDir = await temporaryDirectory("easymate-auth-config-");
  const port = await freePort();
  const googleClientId = "123456789-test.apps.googleusercontent.com";
  const child = spawn(process.execPath, ["server.js"], {
    cwd: path.join(__dirname, ".."),
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: "test",
      EASYMATE_DATA_DIR: dataDir,
      DATABASE_URL: "postgresql://test:test@127.0.0.1:1/test?sslmode=disable",
      GOOGLE_CLIENT_ID: googleClientId,
      PG_CONNECT_TIMEOUT_MS: "200",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await waitForServer(child);

    const configResponse = await fetch(`${baseUrl}/api/config`);
    assert.equal(configResponse.status, 200);
    assert.deepEqual(await configResponse.json(), {
      googleClientId,
      googleLoginConfigured: true,
    });

    const healthResponse = await fetch(`${baseUrl}/api/health`);
    assert.equal(healthResponse.status, 503);
    const health = await healthResponse.json();
    assert.equal(health.ok, false);
    assert.equal(health.googleLogin, "configured");

    const signupResponse = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "blocked@easymate.test", displayName: "Blocked", password: "safe-test-password" }),
    });
    assert.equal(signupResponse.status, 503);
    assert.deepEqual(await signupResponse.json(), {
      error: "Account storage is temporarily unavailable. Please try again shortly.",
    });
  } finally {
    child.kill();
    await new Promise((resolve) => child.once("exit", resolve));
    await fs.promises.rm(dataDir, { recursive: true, force: true });
  }
});
