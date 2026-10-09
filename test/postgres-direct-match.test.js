const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const enabled = Boolean(process.env.TEST_DATABASE_URL && process.env.ALLOW_TEST_DATABASE_WRITE === '1');

test('PostgreSQL direct match lookup returns one room with normal access control', { skip: !enabled, timeout: 90000 }, async (t) => {
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
  const owner = await call('/api/auth/signup', null, { email: `direct-owner-${suffix}@example.test`, password: 'test-passphrase', displayName: 'Owner' });
  const outsider = await call('/api/auth/signup', null, { email: `direct-outsider-${suffix}@example.test`, password: 'test-passphrase', displayName: 'Outsider' });
  const other = await call('/api/auth/signup', null, { email: `direct-other-${suffix}@example.test`, password: 'test-passphrase', displayName: 'Other' });
  assert.equal(owner.status, 200);
  assert.equal(outsider.status, 200);
  assert.equal(other.status, 200);
  const started = await call('/api/matches/start', owner.cookie, { waitingForOpponent: true });
  assert.equal(started.status, 200);
  const matchId = started.data.match.id;
  const direct = await call(`/api/matches/${matchId}`, owner.cookie);
  assert.equal(direct.status, 200);
  assert.equal(direct.data.match.id, matchId);
  assert.equal(direct.data.match.status, 'waiting');
  assert.equal((await call(`/api/matches/${matchId}`, outsider.cookie)).status, 403);
  assert.equal((await call(`/api/matches/${matchId}`)).status, 401);
  assert.equal((await call('/api/matches/nonexistent-room', owner.cookie)).status, 404);

  const joins = await Promise.all([
    call(`/api/matches/${matchId}/join`, outsider.cookie, {}),
    call(`/api/matches/${matchId}/join`, other.cookie, {}),
  ]);
  assert.deepEqual(joins.map((item) => item.status).sort(), [200, 409]);
  const joined = await call(`/api/matches/${matchId}`, owner.cookie);
  assert.equal(joined.status, 200);
  assert.equal(joined.data.match.status, 'matched');
  assert.equal(joined.data.match.players.filter((player) => player.userId).length, 2);
  const successfulJoiner = joins[0].status === 200 ? outsider : other;
  assert.equal((await call(`/api/matches/${matchId}/join`, successfulJoiner.cookie, {})).status, 200);
  assert.equal((await call(`/api/matches/${matchId}`, successfulJoiner.cookie)).status, 200);

  const seek = await call('/api/matches/seeks', owner.cookie, { goal: `Direct lobby ${suffix}` });
  assert.equal(seek.status, 200);
  assert.equal(seek.data.seek.status, 'open');
  const otherLobby = await call('/api/matches/lobby', other.cookie);
  assert.equal(otherLobby.status, 200);
  assert.equal(otherLobby.data.openSeeks.find((item) => item.id === seek.data.seek.id)?.displayName, 'Owner');
  const ownerLobby = await call('/api/matches/lobby', owner.cookie);
  assert.equal(ownerLobby.status, 200);
  assert.equal(ownerLobby.data.openSeeks.some((item) => item.id === seek.data.seek.id), false);
});
