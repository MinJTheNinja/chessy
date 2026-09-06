const assert = require("node:assert/strict");
const crypto = require("crypto");
const test = require("node:test");
const { Pool } = require("pg");
const { migrateLegacyState, tokenHash } = require("../storage-migration");

const enabled = Boolean(process.env.TEST_DATABASE_URL && process.env.ALLOW_TEST_DATABASE_WRITE === "1");

test("PostgreSQL migration is idempotent and preserves legacy credentials", { skip: !enabled, timeout: 30000 }, async () => {
  const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  const client = await pool.connect();
  const schema = `easymate_test_${crypto.randomBytes(6).toString("hex")}`;
  try {
    await client.query(`CREATE SCHEMA ${schema}`);
    await client.query(`SET search_path TO ${schema}`);
    await client.query(`CREATE TABLE app_state (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    const legacy = {
      users: [{
        id: "user_legacy",
        email: "Legacy@Example.test",
        passwordHash: "salt:hash",
        displayName: "Legacy",
        training: { completedModules: [1, 2], completedPuzzles: [] },
        createdAt: "2026-01-01T00:00:00.000Z",
      }],
      sessions: [{ token: "raw-session-token", userId: "user_legacy", createdAt: "2026-01-01T00:00:00.000Z" }],
      matches: [],
    };
    await client.query("INSERT INTO app_state (id, data) VALUES ($1, $2::jsonb)", ["main", JSON.stringify(legacy)]);

    const first = await migrateLegacyState(client);
    const second = await migrateLegacyState(client);
    assert.deepEqual(first.before, { users: 1, sessions: 1, tutorialProgress: 2 });
    assert.deepEqual(second.after, first.after);
    const user = await client.query("SELECT * FROM users WHERE id = $1", ["user_legacy"]);
    assert.equal(user.rows.length, 1);
    assert.equal(user.rows[0].email, "legacy@example.test");
    assert.equal(user.rows[0].password_hash, "salt:hash");
    const sessions = await client.query("SELECT token_hash FROM sessions WHERE user_id = $1", ["user_legacy"]);
    assert.deepEqual(sessions.rows.map((row) => row.token_hash), [tokenHash("raw-session-token")]);
    assert.equal((await client.query("SELECT COUNT(*)::int AS count FROM tutorial_progress")).rows[0].count, 2);
    const state = (await client.query("SELECT data FROM app_state WHERE id = 'main'")).rows[0].data;
    assert.equal(Object.hasOwn(state, "users"), false);
    assert.equal(Object.hasOwn(state, "sessions"), false);
    assert.equal((await client.query("SELECT COUNT(*)::int AS count FROM app_state_legacy_backup")).rows[0].count, 1);
  } finally {
    await client.query("SET search_path TO public").catch(() => {});
    await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`).catch(() => {});
    client.release();
    await pool.end();
  }
});
