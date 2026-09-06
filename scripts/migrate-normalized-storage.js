const { Pool } = require("pg");
const { migrateLegacyState } = require("../storage-migration");

function postgresSslOptions(connectionString) {
  try {
    const parsed = new URL(connectionString);
    const sslMode = String(parsed.searchParams.get("sslmode") || "").toLowerCase();
    if (sslMode === "disable") return false;
    if (sslMode || /(^|\.)supabase\.(com|co)$/i.test(parsed.hostname)) {
      return { rejectUnauthorized: false };
    }
  } catch {
    // Let pg report malformed connection strings with its normal error message.
  }
  return process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false;
}

async function main() {
  const databaseUrl = process.env.MIGRATION_DATABASE_URL || process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("Set MIGRATION_DATABASE_URL (preferred) or DATABASE_URL.");
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: postgresSslOptions(databaseUrl),
    connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 10000),
  });
  const client = await pool.connect();
  try {
    const result = await migrateLegacyState(client);
    console.log(JSON.stringify({ ok: true, migration: "001_normalize_identity", ...result }, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
