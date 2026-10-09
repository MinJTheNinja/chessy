const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const databaseUrl = process.env.ALLOW_TEST_DATABASE_WRITE === '1' ? process.env.TEST_DATABASE_URL || '' : '';

async function startServer(dataDir) {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: root,
    env: { ...process.env, PORT: '0', DATABASE_URL: databaseUrl, LOCAL_DATA_DIR: dataDir, NODE_ENV: 'test' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  const port = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Startup timeout: ${output}`)), databaseUrl ? 60000 : 15000);
    child.stdout.on('data', (chunk) => {
      output += chunk;
      const match = output.match(/localhost:(\d+)/);
      if (match && (!databaseUrl || output.includes('Storage ready (postgres)'))) {
        clearTimeout(timer);
        resolve(Number(match[1]));
      }
    });
    child.stderr.on('data', (chunk) => { output += chunk; });
    child.once('exit', (code) => { clearTimeout(timer); reject(new Error(`Server exited ${code}: ${output}`)); });
  });
  return { child, base: `http://127.0.0.1:${port}` };
}

async function api(base, pathname, cookie, method = 'GET', body) {
  const response = await fetch(`${base}${pathname}`, {
    method,
    headers: { ...(cookie ? { cookie } : {}), ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
}

test('two-player match preserves moves, transcript, and one-time rewards across restart', { timeout: databaseUrl ? 90000 : 30000 }, async (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chess-lifecycle-'));
  let server = await startServer(dir);
  t.after(() => { server.child.kill(); fs.rmSync(dir, { recursive: true, force: true }); });
  const runId = `${Date.now()}-${process.pid}`;
  const alice = await api(server.base, '/api/auth/signup', '', 'POST', { email: `alice-${runId}@example.test`, password: 'passphrase', displayName: 'Alice' });
  const bob = await api(server.base, '/api/auth/signup', '', 'POST', { email: `bob-${runId}@example.test`, password: 'passphrase', displayName: 'Bob' });
  assert.equal(alice.status, 200);
  assert.equal(bob.status, 200);
  const started = await api(server.base, '/api/matches/start', alice.cookie, 'POST', { waitingForOpponent: true });
  assert.equal(started.status, 200);
  const id = started.data.match.id;
  assert.equal(started.data.match.status, 'waiting');
  const joined = await api(server.base, `/api/matches/${id}/join`, bob.cookie, 'POST', {});
  assert.equal(joined.status, 200);
  assert.equal(joined.data.match.status, 'matched');
  const activeBeforeMove = await api(server.base, '/api/matches/active', alice.cookie);
  assert.equal(activeBeforeMove.status, 200);
  assert.equal(activeBeforeMove.data.match?.id, id);
  const white = await api(server.base, `/api/matches/${id}/move`, alice.cookie, 'POST', { from: 'e2', to: 'e4' });
  assert.equal(white.status, 200);
  assert.equal(white.data.move.san, 'e4');
  const wrongTurn = await api(server.base, `/api/matches/${id}/move`, alice.cookie, 'POST', { from: 'd2', to: 'd4' });
  assert.equal(wrongTurn.status, 403);
  const black = await api(server.base, `/api/matches/${id}/move`, bob.cookie, 'POST', { from: 'e7', to: 'e5' });
  assert.equal(black.status, 200);
  const speech = await api(server.base, `/api/matches/${id}/transcript`, bob.cookie, 'POST', { text: 'good game', kind: 'speech' });
  assert.equal(speech.status, 200);
  const ended = await api(server.base, `/api/matches/${id}/end`, bob.cookie, 'POST', { result: 'Resigned' });
  assert.equal(ended.status, 200);
  assert.equal(ended.data.match.moves.length, 2);
  assert.equal(ended.data.match.transcript.length, 3);
  const reward = ended.data.match.easyEloChanges;
  assert.equal(reward[alice.data.user.id], 30);
  assert.equal(reward[bob.data.user.id], 5);
  const endedAgain = await api(server.base, `/api/matches/${id}/end`, bob.cookie, 'POST', { result: 'Resigned' });
  assert.deepEqual(endedAgain.data.match.easyEloChanges, reward);
  assert.equal((await api(server.base, `/api/matches/${id}/move`, alice.cookie, 'POST', { from: 'g1', to: 'f3' })).status, 409);
  assert.equal((await api(server.base, '/api/matches/active', alice.cookie)).data.match, null);

  server.child.kill();
  await new Promise((resolve) => server.child.once('exit', resolve));
  server = await startServer(dir);
  const persisted = await api(server.base, `/api/matches/${id}`, alice.cookie);
  assert.equal(persisted.status, 200);
  assert.equal(persisted.data.match.status, 'ended');
  assert.deepEqual(persisted.data.match.easyEloChanges, reward);
  assert.deepEqual(persisted.data.match.moves.map((move) => move.san), ['e4', 'e5']);
  assert.equal(persisted.data.match.transcript.filter((item) => item.text === 'good game').length, 1);
  const profile = await api(server.base, '/api/profile', alice.cookie);
  assert.equal(profile.data.user.easyElo, 1030);
});
