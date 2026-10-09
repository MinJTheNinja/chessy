const assert = require('node:assert/strict');
const path = require('node:path');
const { spawn } = require('node:child_process');
const test = require('node:test');

const enabled = Boolean(process.env.TEST_DATABASE_URL && process.env.ALLOW_TEST_DATABASE_WRITE === '1');

async function startServer() {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, PORT: '0', DATABASE_URL: process.env.TEST_DATABASE_URL, NODE_ENV: 'test' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  const port = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Startup timeout: ${output}`)), 60000);
    child.stdout.on('data', (chunk) => {
      output += chunk;
      const match = output.match(/localhost:(\d+)/);
      if (match && output.includes('Storage ready (postgres)')) {
        clearTimeout(timer);
        resolve(Number(match[1]));
      }
    });
    child.stderr.on('data', (chunk) => { output += chunk; });
    child.once('exit', (code) => { clearTimeout(timer); reject(new Error(`Server exited ${code}: ${output}`)); });
  });
  return { child, base: `http://127.0.0.1:${port}` };
}

async function api(base, route, cookie, body) {
  const response = await fetch(base + route, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { ...(cookie ? { cookie } : {}), ...(body === undefined ? {} : { 'content-type': 'application/json' }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
}

test('two PostgreSQL servers serialize duplicate moves and award a result once', { skip: !enabled, timeout: 90000 }, async (t) => {
  const [a, b] = await Promise.all([startServer(), startServer()]);
  t.after(() => { a.child.kill(); b.child.kill(); });
  const suffix = `${Date.now()}-${process.pid}`;
  const white = await api(a.base, '/api/auth/signup', null, { email: `multi-white-${suffix}@example.test`, password: 'test-passphrase', displayName: 'White' });
  const black = await api(b.base, '/api/auth/signup', null, { email: `multi-black-${suffix}@example.test`, password: 'test-passphrase', displayName: 'Black' });
  assert.equal(white.status, 200);
  assert.equal(black.status, 200);
  const started = await api(a.base, '/api/matches/start', white.cookie, { waitingForOpponent: true });
  assert.equal(started.status, 200);
  const id = started.data.match.id;
  assert.equal((await api(b.base, `/api/matches/${id}/join`, black.cookie, {})).status, 200);
  const moves = await Promise.all([
    api(a.base, `/api/matches/${id}/move`, white.cookie, { from: 'e2', to: 'e4' }),
    api(b.base, `/api/matches/${id}/move`, white.cookie, { from: 'e2', to: 'e4' }),
  ]);
  assert.deepEqual(moves.map((item) => item.status).sort(), [200, 403]);
  assert.equal((await api(a.base, `/api/matches/${id}`, white.cookie)).data.match.moves.length, 1);
  assert.equal((await api(b.base, `/api/matches/${id}/move`, black.cookie, { from: 'e7', to: 'e5' })).status, 200);
  const endings = await Promise.all([
    api(a.base, `/api/matches/${id}/end`, black.cookie, { result: 'Resigned' }),
    api(b.base, `/api/matches/${id}/end`, black.cookie, { result: 'Resigned' }),
  ]);
  assert.deepEqual(endings.map((item) => item.status), [200, 200]);
  assert.deepEqual(endings[0].data.match.easyEloChanges, endings[1].data.match.easyEloChanges);
  assert.equal((await api(b.base, '/api/profile', white.cookie)).data.user.easyElo, 1030);
  assert.equal((await api(a.base, '/api/matches/active', white.cookie)).data.match, null);
});
