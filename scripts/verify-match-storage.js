// Read-only status check for a disposable PostgreSQL test database.
const fs = require('node:fs');
const { Pool } = require('pg');

if (!process.env.TEST_DATABASE_URL) throw new Error('TEST_DATABASE_URL is required.');
const pool = new Pool({
  connectionString: process.env.TEST_DATABASE_URL,
  ...(process.env.PGSSLROOTCERT
    ? { ssl: { ca: fs.readFileSync(process.env.PGSSLROOTCERT, 'utf8'), rejectUnauthorized: true } }
    : {}),
});

(async () => {
  const [matches, state, migrations] = await Promise.all([
    pool.query('SELECT COUNT(*)::int AS count FROM matches'),
    pool.query("SELECT data ? 'matches' AS legacy_matches FROM app_state WHERE id = 'main'"),
    pool.query('SELECT version FROM schema_migrations ORDER BY version'),
  ]);
  console.log(JSON.stringify({
    matches: matches.rows[0].count,
    legacyMatchesInAppState: state.rows[0]?.legacy_matches ?? null,
    migrations: migrations.rows.map((row) => row.version),
  }));
})().catch((error) => {
  console.error(error.code || error.message);
  process.exitCode = 1;
}).finally(() => pool.end());
