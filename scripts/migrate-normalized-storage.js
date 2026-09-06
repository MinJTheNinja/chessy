const { Pool } = require("pg");
const { migrateLegacyState } = require("../storage-migration");

async function main() {
  const databaseUrl = process.env.MIGRATION_DATABASE_URL || process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("Set MIGRATION_DATABASE_URL (preferred) or DATABASE_URL.");
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: /sslmode=require|ssl=true/i.test(databaseUrl) || process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
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
