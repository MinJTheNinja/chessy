const assert = require("node:assert/strict");
const test = require("node:test");

const { migrateLegacyState, migrationVersion } = require("../storage-migration");

test("completed migration skips transaction, locks, and legacy state reads", async () => {
  const queries = [];
  const details = {
    before: { users: 2, sessions: 1, tutorialProgress: 3 },
    after: { users: 2, sessions: 1, tutorialProgress: 3 },
  };
  const client = {
    async query(sql, params) {
      queries.push({ sql, params });
      if (sql.includes("to_regclass")) return { rows: [{ table_name: "schema_migrations" }] };
      if (sql.includes("SELECT details FROM schema_migrations")) {
        assert.deepEqual(params, [migrationVersion]);
        return { rows: [{ details }] };
      }
      throw new Error(`Unexpected query on completed migration path: ${sql}`);
    },
  };

  const result = await migrateLegacyState(client);

  assert.deepEqual(result, { ...details, alreadyApplied: true });
  assert.equal(queries.length, 2);
  assert.equal(queries.some(({ sql }) => /BEGIN|pg_advisory|FOR UPDATE/.test(sql)), false);
});
