// Isolated HTTP benchmark. Run: node scripts/bench-match-moves.js
// Set TEST_DATABASE_URL and ALLOW_TEST_DATABASE_WRITE=1 to benchmark a disposable PostgreSQL database.
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const base = path.resolve(__dirname, '..');
const databaseUrl = process.env.ALLOW_TEST_DATABASE_WRITE === '1' ? process.env.TEST_DATABASE_URL || '' : '';
const dataDir = fs.mkdtempSync(path.join(base, 'tmp', 'chess-move-bench-'));
const child = spawn(process.execPath, ['server.js'], {
  cwd: base,
  env: { ...process.env, NODE_ENV: 'test', PORT: '0', DATABASE_URL: databaseUrl, LOCAL_DATA_DIR: dataDir, EASYMATE_DATA_DIR: dataDir },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let output = '';
child.stdout.on('data', chunk => {
  output += chunk;
  if (process.env.MATCH_PERF_PROFILE === '1') {
    for (const line of String(chunk).split(/\r?\n/)) if (line.startsWith('MATCH_POOL_WAIT ')) console.log(line);
  }
});
child.stderr.on('data', chunk => { output += chunk; });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const percentile = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.ceil(p * sorted.length) - 1)];

async function main() {
  const started = Date.now();
  while (!/localhost:(\d+)/.test(output) || (databaseUrl && !output.includes('Storage ready'))) {
    if (child.exitCode !== null || Date.now() - started > 30000) throw new Error(`Startup failed: ${output}`);
    await delay(50);
  }
  const port = Number(output.match(/localhost:(\d+)/)[1]);
  const url = `http://127.0.0.1:${port}`;
  async function post(route, body, cookie) {
    const begin = performance.now();
    const response = await fetch(url + route, { method: 'POST', headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) }, body: JSON.stringify(body) });
    const data = await response.json();
    return { status: response.status, data, cookie: response.headers.get('set-cookie')?.split(';')[0], ms: performance.now() - begin };
  }
  async function get(route, cookie) {
    const begin = performance.now();
    const response = await fetch(url + route, { headers: cookie ? { cookie } : {} });
    const data = await response.json();
    return { status: response.status, data, ms: performance.now() - begin };
  }
  const signup = await post('/api/auth/signup', { email: `bench-${Date.now()}@example.test`, password: 'benchmark-password', displayName: 'Benchmark' });
  if (signup.status !== 200) throw new Error(`Signup failed: ${JSON.stringify(signup)}`);
  const cookie = signup.cookie;
  const sequence = [['g1','f3'], ['g8','f6'], ['f3','g1'], ['f6','g8']];
  console.log(JSON.stringify({ storage: databaseUrl ? 'postgresql' : 'local-json', node: process.version, platform: process.platform, pid: process.pid }));
  const roomCounts = (process.env.BENCH_ROOMS || '1,4,16,32').split(',').map(Number);
  for (const rooms of roomCounts) {
    if (!Number.isInteger(rooms) || rooms < 1 || rooms > 512) throw new Error(`Invalid room count: ${rooms}`);
    const ids = [];
    const cookies = [];
    const distinctUsers = process.env.BENCH_DISTINCT_USERS === '1';
    if (distinctUsers) {
      for (let i = 0; i < rooms; i++) {
        const account = await post('/api/auth/signup', { email: `bench-room-${Date.now()}-${i}@example.test`, password: 'benchmark-password', displayName: `Benchmark ${i}` });
        if (account.status !== 200) throw new Error(`Room signup failed: ${JSON.stringify(account)}`);
        cookies.push(account.cookie);
      }
    } else {
      for (let i = 0; i < rooms; i++) cookies.push(cookie);
    }
    const createSamples = [];
    const createBegin = performance.now();
    const createOne = (_, index) => post('/api/matches/start', { pairingType: 'practice' }, cookies[index]);
    const createdRooms = process.env.BENCH_PARALLEL_CREATE === '1'
      ? await Promise.all(Array.from({ length: rooms }, createOne))
      : await (async () => {
          const results = [];
          for (let i = 0; i < rooms; i++) results.push(await createOne(null, i));
          return results;
        })();
    for (const created of createdRooms) {
      if (created.status !== 200) throw new Error(`Create failed: ${JSON.stringify(created)}`);
      ids.push(created.data.match.id);
      createSamples.push(created.ms);
    }
    const createSeconds = (performance.now() - createBegin) / 1000;
    createSamples.sort((a,b) => a-b);
    const samples = [], errors = [];
    const rounds = Number(process.env.BENCH_ROUNDS || 12);
    if (!Number.isInteger(rounds) || rounds < 1 || rounds > 100) throw new Error(`Invalid round count: ${rounds}`);
    const begin = performance.now();
    await Promise.all(ids.map(async (id, index) => {
      for (let i = 0; i < rounds; i++) {
        const [from, to] = sequence[i % sequence.length];
        try {
          const result = await post(`/api/matches/${id}/move`, { from, to }, cookies[index]);
          samples.push(result.ms);
          if (result.status !== 200) errors.push({ status: result.status, error: result.data.error });
        } catch (error) { errors.push({ error: error.message }); }
      }
    }));
    const elapsed = (performance.now() - begin) / 1000;
    samples.sort((a,b) => a-b);
    const activeSamples = [];
    for (let i = 0; i < 20; i++) {
      const active = await get('/api/matches/active', cookie);
      if (active.status !== 200) throw new Error(`Active lookup failed: ${JSON.stringify(active)}`);
      activeSamples.push(active.ms);
    }
    activeSamples.sort((a,b) => a-b);
    console.log(JSON.stringify({ rooms, distinctUsers, requested: rooms * rounds, ok: samples.length - errors.filter(e => e.status).length, errors: errors.length, errorExamples: errors.slice(0,3), creationPerSecond: Number((rooms / createSeconds).toFixed(1)), creationP95Ms: Number(percentile(createSamples,.95)?.toFixed(1)), throughputPerSecond: Number((samples.length / elapsed).toFixed(1)), p50Ms: Number(percentile(samples,.5)?.toFixed(1)), p95Ms: Number(percentile(samples,.95)?.toFixed(1)), activeP50Ms: Number(percentile(activeSamples,.5)?.toFixed(1)), activeP95Ms: Number(percentile(activeSamples,.95)?.toFixed(1)), maxMs: Number(samples.at(-1)?.toFixed(1)), durationSeconds: Number(elapsed.toFixed(2)) }));
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
  child.kill();
  if (!databaseUrl) fs.rmSync(dataDir, { recursive: true, force: true });
});
