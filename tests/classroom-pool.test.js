const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const { AsyncLocalStorage } = require('node:async_hooks');
const source = fs.readFileSync(path.join(__dirname, '../server.js'), 'utf8');
function functionSource(name) {
  const start = source.search(new RegExp('^(?:async )?function ' + name + '\\(', 'm'));
  const rest = source.slice(start);
  const end = rest.slice(1).search(/^function |^async function /m);
  return end < 0 ? rest : rest.slice(0, end + 1);
}

// A bounded pool and an exclusive app_state row reproduce the production wait
// cycle without accessing a production database. SQL persistence is covered by
// the HTTP league tests and the opt-in PostgreSQL suite.
function boundedPool(max) {
  let active = 0;
  let rowLocked = false;
  const connections = [];
  const rowWaiters = [];
  const pool = {
    borrowedForSession: 0,
    async connect() {
      if (active >= max) await new Promise(resolve => connections.push(resolve));
      else active++;
      let ownsRow = false;
      return {
        async query(sql, params) {
          if (sql.includes('FOR UPDATE')) {
            if (rowLocked) await new Promise(resolve => rowWaiters.push(resolve));
            rowLocked = true;
            ownsRow = true;
            return { rows: [{ data: {} }] };
          }
          if (sql === 'COMMIT' || sql === 'ROLLBACK') {
            if (ownsRow) {
              ownsRow = false;
              const next = rowWaiters.shift();
              if (next) next();
              else rowLocked = false;
            }
          }
          if (sql.includes('FROM sessions')) return { rows: [{ id: params[0], completed_modules: [] }] };
          return { rows: [] };
        },
        release() {
          const next = connections.shift();
          if (next) next();
          else active--;
        },
      };
    },
    async query(sql, params) {
      if (sql.includes('FROM sessions')) pool.borrowedForSession++;
      const client = await pool.connect();
      try { return await client.query(sql, params); }
      finally { client.release(); }
    },
  };
  return pool;
}

test('16 state mutations authenticate with their existing connection even with a 2-connection pool', { timeout: 3000 }, async () => {
  const pgPool = boundedPool(2);
  const context = vm.createContext({
    pgPool,
    appStateContext: new AsyncLocalStorage(),
    ensurePostgresDb: async () => {},
    loadAllUsers: async () => [],
    normalizeDb: value => value,
    defaultDb: () => ({}),
    getCookie: req => req.token,
    tokenHash: value => value,
    rowToStoredUser: row => row,
    storedUserToUser: row => row,
  });
  vm.runInContext(functionSource('withAppStateMutation') + functionSource('getSessionUser'), context);
  const work = Promise.all(Array.from({ length: 16 }, (_, i) => context.withAppStateMutation(async () => {
    const user = await context.getSessionUser({ token: 'student-' + i, headers: {} });
    assert.equal(user.id, 'student-' + i);
    return user.id;
  })));
  let timer;
  try {
    const completed = await Promise.race([work, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Connection pool deadlock')), 1500); })]);
    assert.equal(new Set(completed).size, 16);
    assert.equal(pgPool.borrowedForSession, 0);
  } finally { clearTimeout(timer); }
});
