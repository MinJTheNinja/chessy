const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { AsyncLocalStorage } = require("node:async_hooks");

const source = fs.readFileSync(path.join(__dirname, "..", "server.js"), "utf8");
const start = source.indexOf("async function withMatchMutation(");
const end = source.indexOf("async function withAppStateMutation(", start);
const mutationSource = source.slice(start, end);

function fakePool() {
  const held = new Set();
  const waiters = new Map();
  const events = [];
  return {
    events,
    async connect() {
      let room = null;
      return {
        async query(sql, params) {
          if (sql.includes("FROM matches") && sql.includes("FOR UPDATE")) {
            room = params[0];
            while (held.has(room)) await new Promise((resolve) => {
              const queue = waiters.get(room) || [];
              queue.push(resolve);
              waiters.set(room, queue);
            });
            held.add(room);
            events.push(`lock:${room}`);
            return { rows: [{ data: { id: room } }] };
          }
          if (sql === "COMMIT" || sql === "ROLLBACK") {
            events.push(`${sql.toLowerCase()}:${room}`);
            if (room) {
              held.delete(room);
              waiters.get(room)?.shift()?.();
            }
          }
          if (sql.includes("FROM app_state")) return { rows: [{ data: {} }] };
          return { rows: [] };
        },
        release() {},
      };
    },
  };
}

test("room transactions isolate unrelated rooms and publish only committed events", async () => {
  const pgPool = fakePool();
  const published = [];
  const context = vm.createContext({
    pgPool,
    appStateContext: new AsyncLocalStorage(),
    ensurePostgresDb: async () => {},
    recordMatchPoolWait: () => {},
    normalizeDb: (value) => value,
    defaultDb: () => ({}),
    loadAllUsers: async () => [],
    broadcast: (id, payload) => published.push([id, payload]),
    syncRedisRoom: async () => {},
    console,
  });
  vm.runInContext(mutationSource, context);

  let releaseFirst;
  let enteredFirst;
  const firstEntered = new Promise((resolve) => { enteredFirst = resolve; });
  const first = context.withMatchMutation("a", async () => {
    context.appStateContext.getStore().roomEvents.push(["a", { type: "move" }]);
    enteredFirst();
    await new Promise((resolve) => { releaseFirst = resolve; });
  });
  await firstEntered;

  const otherRoom = context.withMatchMutation("b", async () => "ready");
  const sameRoom = context.withMatchMutation("a", async () => "next");
  assert.equal(await otherRoom, "ready");
  assert.equal(pgPool.events.filter((event) => event === "lock:a").length, 1);
  assert.deepEqual(published, []);

  releaseFirst();
  await Promise.all([first, sameRoom]);
  assert.equal(pgPool.events.filter((event) => event === "lock:a").length, 2);
  assert.deepEqual(published, [["a", { type: "move" }]]);

  await assert.rejects(context.withMatchMutation("a", async () => {
    context.appStateContext.getStore().roomEvents.push(["a", { type: "invalid" }]);
    throw new Error("failed");
  }), /failed/);
  assert.deepEqual(published, [["a", { type: "move" }]]);
});
