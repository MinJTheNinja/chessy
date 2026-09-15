// Isolated local correctness check; does not measure production PostgreSQL capacity.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { once } = require('node:events');

async function main() {
  const root = path.resolve(__dirname, '..');
  fs.mkdirSync(path.join(root, 'output'), { recursive: true });
  const dataDir = fs.mkdtempSync(path.join(root, 'output', 'league-capacity-'));
  const child = spawn(process.execPath, ['server.js'], {
    cwd: root,
    env: { ...process.env, PORT: '0', LOCAL_DATA_DIR: dataDir, NODE_ENV: 'test', DATABASE_URL: '',
      UPSTASH_REDIS_REST_URL: '', UPSTASH_REDIS_REST_TOKEN: '', NVIDIA_API_KEY: '', METERED_TURN_API_KEY: '' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const results = {};
  try {
    const port = await new Promise((resolve, reject) => {
      let output = '';
      const timer = setTimeout(() => reject(new Error('Startup timed out')), 15000);
      child.stdout.on('data', chunk => {
        output += chunk;
        const match = output.match(/localhost:(\d+)/);
        if (match) { clearTimeout(timer); resolve(Number(match[1])); }
      });
      child.once('exit', code => { clearTimeout(timer); reject(new Error(`Server exited ${code}`)); });
    });
    async function req(group, url, cookie, body) {
      const start = performance.now();
      const response = await fetch(`http://127.0.0.1:${port}${url}`, {
        method: body === undefined ? 'GET' : 'POST',
        headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(30000),
      });
      const data = await response.json();
      (results[group] ||= []).push({ ms: performance.now() - start, status: response.status });
      assert.ok(response.ok, `${url}: ${response.status} ${JSON.stringify(data)}`);
      return { data, cookie: response.headers.get('set-cookie')?.split(';')[0] };
    }
    const users = [];
    for (let batch = 0; batch < 9; batch++) {
      users.push(...await Promise.all(Array.from({ length: 20 }, (_, i) => req('signup', '/api/auth/signup', null,
        { email: `capacity-${batch * 20 + i}@example.test`, password: 'local-capacity-only', displayName: `Test ${batch * 20 + i}` }))));
    }
    const active = users.slice(0, 20);
    const league = await req('create-league', '/api/leagues/create', active[0].cookie, { name: 'Capacity check' });
    const code = league.data.league.code;
    await Promise.all(active.map(u => req('join-league', '/api/leagues/join', u.cookie, { code })));
    const board = await req('leaderboard', `/api/leagues/leaderboard?code=${code}`, active[0].cookie);
    assert.equal(board.data.members.length, 20);
    const matches = await Promise.all(Array.from({ length: 10 }, (_, i) => req('start-match', '/api/matches/start', active[i * 2].cookie, { pairingType: 'practice' })));
    await Promise.all(matches.map((m, i) => req('join-match', `/api/matches/${m.data.match.id}/join`, active[i * 2 + 1].cookie, {})));
    const moves = [['e2','e4'], ['e7','e5'], ['g1','f3'], ['b8','c6'], ['f1','c4'], ['g8','f6']];
    for (let round = 0; round < moves.length; round++) {
      await Promise.all(matches.map(async (m, i) => {
        const matchId = m.data.match.id;
        await Promise.all([
          req('move', `/api/matches/${matchId}/move`, active[i * 2 + round % 2].cookie, { from: moves[round][0], to: moves[round][1] }),
          ...[0, 1].map(side => req('transcript', `/api/matches/${matchId}/transcript`, active[i * 2 + side].cookie, { text: `check-${round}-${side}`, kind: 'speech' })),
          ...[0, 1].map(side => req('leaderboard', `/api/leagues/leaderboard?code=${code}`, active[i * 2 + side].cookie)),
        ]);
      }));
    }
    for (let i = 0; i < matches.length; i++) {
      const view = await req('verify', `/api/matches/${matches[i].data.match.id}`, active[i * 2].cookie);
      assert.equal(view.data.match.moves.length, 6);
      assert.equal(view.data.match.transcript.filter(t => t.text?.startsWith('check-')).length, 12);
    }
    const summary = { checkedAt: new Date().toISOString(), storage: 'local-json', redis: 'disabled', users: 180, activePlayers: 20,
      games: 10, verifiedMoves: 60, verifiedTranscripts: 120, productionCapacityVerified: false,
      groups: Object.fromEntries(Object.entries(results).map(([key, values]) => {
        const times = values.map(v => v.ms).sort((a,b) => a-b);
        return [key, { requests: values.length, errors: values.filter(v => v.status >= 400).length,
          p95Ms: Math.round(times[Math.ceil(times.length * .95)-1]), maxMs: Math.round(times.at(-1)) }];
      })) };
    fs.writeFileSync(path.join(root, 'output', 'league-capacity-results.json'), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    if (child.exitCode === null) { const closed = once(child, 'exit'); child.kill(); await closed; }
    // Delete only the unique fixture directory created by this run inside output.
    assert.equal(path.dirname(dataDir), path.join(root, 'output'));
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
