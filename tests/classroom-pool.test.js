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
    postgresStateQueue: Promise.resolve(),
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
  vm.runInContext(functionSource('withAppStateMutation') + functionSource('runPostgresStateMutation') + functionSource('getSessionUser'), context);
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

function stateContext(pgPool, extra = {}) {
  const c = vm.createContext({
    pgPool, postgresStateQueue: Promise.resolve(),
    appStateContext: new AsyncLocalStorage(), ensurePostgresDb: async () => {},
    loadAllUsers: async () => [], normalizeDb: v => v, defaultDb: () => ({}),
    console, ...extra,
  });
  vm.runInContext(functionSource('withAppStateMutation') + functionSource('runPostgresStateMutation'), c);
  return c;
}

test('queued state writes leave a connection available to login and recover after rollback', { timeout: 3000 }, async () => {
  const pgPool = boundedPool(2);
  const c = stateContext(pgPool);
  let enter, release;
  const entered = new Promise(r => { enter = r; });
  const hold = new Promise(r => { release = r; });
  const first = c.withAppStateMutation(async () => { enter(); await hold; throw Error('rollback'); });
  const rejected = assert.rejects(first, /rollback/);
  await entered;
  const queued = Array.from({length: 16}, () => c.withAppStateMutation(async () => 'joined'));
  try {
    const result = await Promise.race([
      pgPool.query('SELECT * FROM sessions', ['login-user']),
      new Promise((_, reject) => setTimeout(() => reject(Error('login starved')), 500)),
    ]);
    assert.equal(result.rows[0].id, 'login-user');
  } finally { release(); }
  await rejected;
  assert.equal((await Promise.all(queued)).length, 16);
});

test('Redis starts after commit and release, never on rollback, and cannot block later writes', { timeout: 3000 }, async () => {
  let released = false, writes = 0;
  const pool = { async connect() { released = false; return {
    async query(sql) { return {rows: sql.includes('FOR UPDATE') ? [{data:{}}] : []}; },
    release() { released = true; },
  }; }};
  const c = stateContext(pool, {
    redisEnabled: true, redisRoomPayload: m => ({id:m.id}),
    redisCommand: async () => { assert.equal(released, true); writes++; await new Promise(() => {}); },
  });
  vm.runInContext(functionSource('syncRedisRoom'), c);
  await c.withAppStateMutation(async () => { await c.syncRedisRoom({id:'committed'}); assert.equal(writes,0); });
  assert.equal(writes, 1);
  await assert.rejects(c.withAppStateMutation(async () => { await c.syncRedisRoom({id:'rolled-back'}); throw Error('rollback'); }), /rollback/);
  assert.equal(writes, 1);
  assert.equal(await c.withAppStateMutation(async () => 'next'), 'next');
});
