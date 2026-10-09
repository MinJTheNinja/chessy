const assert = require('node:assert/strict');
const path = require('node:path');
const { spawn } = require('node:child_process');
const test = require('node:test');

const enabled = Boolean(process.env.TEST_DATABASE_URL && process.env.ALLOW_TEST_DATABASE_WRITE === '1');

test('PostgreSQL serializes moves within one room while preserving independent rooms', { skip: !enabled, timeout: 90000 }, async (t) => {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, PORT: '0', DATABASE_URL: process.env.TEST_DATABASE_URL, NODE_ENV: 'test' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(() => child.kill());
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
    child.once('exit', (code) => reject(new Error(`Server exited ${code}: ${output}`)));
  });
  const base = `http://127.0.0.1:${port}`;
  async function call(route, cookie, body) {
    const response = await fetch(base + route, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { ...(cookie ? { cookie } : {}), ...(body === undefined ? {} : { 'content-type': 'application/json' }) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
  }

  const suffix = `${Date.now()}-${process.pid}`;
  const white = await call('/api/auth/signup', null, { email: `room-white-${suffix}@example.test`, password: 'test-passphrase', displayName: 'White' });
  const black = await call('/api/auth/signup', null, { email: `room-black-${suffix}@example.test`, password: 'test-passphrase', displayName: 'Black' });
  assert.equal(white.status, 200);
  assert.equal(black.status, 200);

  async function room() {
    const started = await call('/api/matches/start', white.cookie, { waitingForOpponent: true });
    assert.equal(started.status, 200);
    const id = started.data.match.id;
    assert.equal((await call(`/api/matches/${id}/join`, black.cookie, {})).status, 200);
    return id;
  }
  const [first, second] = await Promise.all([room(), room()]);
  const duplicate = await Promise.all([
    call(`/api/matches/${first}/move`, white.cookie, { from: 'e2', to: 'e4' }),
    call(`/api/matches/${first}/move`, white.cookie, { from: 'e2', to: 'e4' }),
  ]);
  assert.equal(duplicate.filter((item) => item.status === 200).length, 1);
  assert.equal((await call(`/api/matches/${first}`, white.cookie)).data.match.moves.length, 1);

  const parallel = await Promise.all([
    call(`/api/matches/${first}/move`, black.cookie, { from: 'e7', to: 'e5' }),
    call(`/api/matches/${second}/move`, white.cookie, { from: 'e2', to: 'e4' }),
  ]);
  assert.deepEqual(parallel.map((item) => item.status), [200, 200]);
  assert.equal((await call(`/api/matches/${first}`, white.cookie)).data.match.moves.length, 2);
  assert.equal((await call(`/api/matches/${second}`, white.cookie)).data.match.moves.length, 1);
});
