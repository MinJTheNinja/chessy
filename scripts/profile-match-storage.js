// Read-only diagnostic for an isolated PostgreSQL test database.
const fs = require('node:fs');
const { performance } = require('node:perf_hooks');
const { Pool } = require('pg');

if (!process.env.TEST_DATABASE_URL) throw new Error('TEST_DATABASE_URL is required.');
const pool = new Pool({
  connectionString: process.env.TEST_DATABASE_URL,
  ...(process.env.PGSSLROOTCERT
    ? { ssl: { ca: fs.readFileSync(process.env.PGSSLROOTCERT, 'utf8'), rejectUnauthorized: true } }
    : {}),
});

async function timed(client, label, sql, params = []) {
  const start = performance.now();
  const result = await client.query(sql, params);
  return { label, ms: +(performance.now() - start).toFixed(1), result };
}

(async () => {
  const client = await pool.connect();
  try {
    const size = await client.query('SELECT COUNT(*)::int AS matches, SUM(pg_column_size(data))::bigint AS jsonb_bytes FROM matches');
    const example = await client.query('SELECT id FROM matches ORDER BY created_at DESC LIMIT 1');
    const runs = [];
    for (let i = 0; i < 5; i++) {
      await client.query('BEGIN');
      const appLock = await timed(client, 'app_state_lock', "SELECT data FROM app_state WHERE id = 'main' FOR UPDATE");
      const allMatches = await timed(client, 'all_match_rows_lock_and_transfer', 'SELECT data FROM matches ORDER BY id FOR UPDATE');
      const serializeStart = performance.now();
      const originals = new Map(allMatches.result.rows.map((row) => [String(row.data.id), JSON.stringify(row.data)]));
      const stringifyMs = +(performance.now() - serializeStart).toFixed(1);
      await client.query('ROLLBACK');

      await client.query('BEGIN');
      const oneMatch = await timed(client, 'one_match_row_lock_and_transfer', 'SELECT data FROM matches WHERE id = $1 FOR UPDATE', [example.rows[0].id]);
      const appRead = await timed(client, 'app_state_read', "SELECT data FROM app_state WHERE id = 'main'");
      await client.query('ROLLBACK');
      runs.push({
        appStateLockMs: appLock.ms,
        allMatchesMs: allMatches.ms,
        allMatchesRows: allMatches.result.rowCount,
        serializeAllMatchesMs: stringifyMs,
        serializedMatches: originals.size,
        oneMatchMs: oneMatch.ms,
        appStateReadMs: appRead.ms,
      });
    }
    const avg = (key) => +(runs.reduce((sum, row) => sum + row[key], 0) / runs.length).toFixed(1);
    console.log(JSON.stringify({
      matches: size.rows[0].matches,
      storedJsonbMiB: +(Number(size.rows[0].jsonb_bytes) / 1048576).toFixed(2),
      averagesMs: {
        appStateLock: avg('appStateLockMs'),
        allMatchRowsLockAndTransfer: avg('allMatchesMs'),
        serializeAllMatches: avg('serializeAllMatchesMs'),
        oneMatchRowLockAndTransfer: avg('oneMatchMs'),
        appStateRead: avg('appStateReadMs'),
      },
      runs,
    }));
  } finally {
    client.release();
  }
})().catch((error) => {
  console.error(error.code || error.message);
  process.exitCode = 1;
}).finally(() => pool.end());
