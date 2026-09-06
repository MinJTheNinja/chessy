const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const migrationVersion = "001_normalize_identity";
const sessionTtlMs = 30 * 24 * 60 * 60 * 1000;
const schemaSql = fs.readFileSync(path.join(__dirname, "migrations", "001_normalize_identity.sql"), "utf8");

function tokenHash(token) {
  return crypto.createHash("sha256").update(String(token || ""), "utf8").digest("hex");
}

function normalizedModules(training = {}) {
  const legacyFirstModule = Array.isArray(training.completedTutorialDays) && training.completedTutorialDays.includes(0);
  const source = Array.isArray(training.completedModules) ? training.completedModules : legacyFirstModule ? [1] : [];
  return [...new Set(source.map(Number).filter((value) => Number.isInteger(value) && value > 0))].sort((a, b) => a - b);
}

function splitLegacyUser(user = {}) {
  const {
    id,
    email,
    passwordHash,
    displayName,
    authProvider,
    googleSub,
    createdAt,
    updatedAt,
    training = {},
    ...profile
  } = user;
  const { completedModules, completedTutorialDays, ...trainingProfile } = training || {};
  return {
    id: String(id || ""),
    email: String(email || "").trim().toLowerCase(),
    passwordHash: String(passwordHash || ""),
    displayName: String(displayName || "Player").trim() || "Player",
    authProvider: String(authProvider || (googleSub ? "google" : "password")),
    googleSub: googleSub ? String(googleSub) : null,
    profile: { ...profile, training: trainingProfile },
    createdAt: createdAt || new Date().toISOString(),
    updatedAt: updatedAt || createdAt || new Date().toISOString(),
    completedModules: normalizedModules(training),
  };
}

function legacyCounts(data = {}) {
  const users = (Array.isArray(data.users) ? data.users : []).filter((user) => user?.id && user?.email);
  const sessions = Array.isArray(data.sessions) ? data.sessions : [];
  const userIds = new Set(users.map((user) => user.id));
  const sessionHashes = new Set(
    sessions
      .filter((session) => session?.token && userIds.has(session?.userId))
      .map((session) => tokenHash(session.token)),
  );
  const progress = new Set();
  users.forEach((user) => normalizedModules(user.training).forEach((moduleId) => progress.add(`${user.id}:${moduleId}`)));
  return { users: users.length, sessions: sessionHashes.size, tutorialProgress: progress.size };
}

async function databaseCounts(client) {
  const result = await client.query(`
    SELECT
      (SELECT COUNT(*)::int FROM users) AS users,
      (SELECT COUNT(*)::int FROM sessions) AS sessions,
      (SELECT COUNT(*)::int FROM tutorial_progress) AS tutorial_progress
  `);
  return {
    users: result.rows[0].users,
    sessions: result.rows[0].sessions,
    tutorialProgress: result.rows[0].tutorial_progress,
  };
}

async function migrateLegacyState(client, options = {}) {
  const manageTransaction = options.manageTransaction !== false;
  if (manageTransaction) await client.query("BEGIN");
  try {
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [migrationVersion]);
    await client.query(schemaSql);
    const stateResult = await client.query("SELECT data FROM app_state WHERE id = $1 FOR UPDATE", ["main"]);
    const legacy = stateResult.rows[0]?.data || {};
    const before = legacyCounts(legacy);

    await client.query(
      `INSERT INTO app_state_legacy_backup (migration_version, data)
       VALUES ($1, $2::jsonb)
       ON CONFLICT (migration_version) DO NOTHING`,
      [migrationVersion, JSON.stringify(legacy)],
    );

    for (const rawUser of Array.isArray(legacy.users) ? legacy.users : []) {
      const user = splitLegacyUser(rawUser);
      if (!user.id || !user.email) continue;
      await client.query(
        `INSERT INTO users
           (id, email, password_hash, display_name, auth_provider, google_sub, profile, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9)
         ON CONFLICT DO NOTHING`,
        [user.id, user.email, user.passwordHash, user.displayName, user.authProvider, user.googleSub, JSON.stringify(user.profile), user.createdAt, user.updatedAt],
      );
      for (const moduleId of user.completedModules) {
        await client.query(
          `INSERT INTO tutorial_progress (user_id, module_id, completed_at)
           SELECT $1, $2, $3
           WHERE EXISTS (SELECT 1 FROM users WHERE id = $1)
           ON CONFLICT (user_id, module_id) DO NOTHING`,
          [user.id, moduleId, user.updatedAt],
        );
      }
    }

    for (const session of Array.isArray(legacy.sessions) ? legacy.sessions : []) {
      if (!session?.token || !session?.userId) continue;
      const createdAt = session.createdAt || new Date().toISOString();
      const createdTime = Date.parse(createdAt);
      const expiresAt = new Date(Math.max(Date.now() + sessionTtlMs, (Number.isFinite(createdTime) ? createdTime : Date.now()) + sessionTtlMs)).toISOString();
      await client.query(
        `INSERT INTO sessions (token_hash, user_id, created_at, expires_at)
         SELECT $1, $2, $3, $4
         WHERE EXISTS (SELECT 1 FROM users WHERE id = $2)
         ON CONFLICT (token_hash) DO NOTHING`,
        [tokenHash(session.token), session.userId, createdAt, expiresAt],
      );
    }

    const after = await databaseCounts(client);
    const details = { before, after };
    if (after.users < before.users || after.sessions < before.sessions || after.tutorialProgress < before.tutorialProgress) {
      throw new Error(`Migration count verification failed: ${JSON.stringify(details)}`);
    }
    await client.query(
      `INSERT INTO schema_migrations (version, details)
       VALUES ($1, $2::jsonb)
       ON CONFLICT (version) DO NOTHING`,
      [migrationVersion, JSON.stringify(details)],
    );

    if (stateResult.rows[0]) {
      await client.query(
        `UPDATE app_state
         SET data = data - 'users' - 'sessions' - 'training', updated_at = NOW()
         WHERE id = $1`,
        ["main"],
      );
    }
    if (manageTransaction) await client.query("COMMIT");
    return details;
  } catch (error) {
    if (manageTransaction) await client.query("ROLLBACK").catch(() => {});
    throw error;
  }
}

module.exports = {
  databaseCounts,
  legacyCounts,
  migrateLegacyState,
  migrationVersion,
  normalizedModules,
  schemaSql,
  sessionTtlMs,
  splitLegacyUser,
  tokenHash,
};
