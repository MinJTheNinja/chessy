const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const source = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
function functionSource(name) {
  const start = source.search(new RegExp('^(?:async )?function ' + name + '\\(', 'm'));
  const rest = source.slice(start);
  const end = rest.slice(1).search(/^function |^async function /m);
  return rest.slice(0, end + 1);
}
function deferred() { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; }
function startupContext(activeLookup = Promise.resolve()) {
  const session = deferred();
  const navigated = [];
  const c = vm.createContext({
    navigationRevision: 0, trainingModuleOpen: false, currentUser: null, cachedTrainingState: null,
    currentManner: 42, authStatus: {}, backendOnline: false,
    captureCurrentUserRevision: () => 0,
    currentInterfaceLanguage: () => 'Korean',
    setServerStatus() {}, updateTemperature() {}, renderAuthState() {}, showAchievementUnlocks() {}, connectSocket() {}, renderLobby() {},
    loadMatchFromRoute: async () => false,
    refreshActivePlayState: () => activeLookup,
    isStaffRoute: () => false, isTeacherRoute: () => false, isTutorialRoute: () => true,
    setView: name => navigated.push(name), openRequestedTrainingModule: () => navigated.push('reset-module'),
    api: route => route === '/api/health' ? Promise.resolve({ ok: true }) : session.promise,
  });
  c.applyCurrentUserSnapshot = user => { c.currentUser = user; return true; };
  vm.runInContext(functionSource('checkBackend'), c);
  return { c, session, navigated };
}

test('late session restoration preserves a knight lesson already in progress', async () => {
  const { c, session, navigated } = startupContext();
  const pending = c.checkBackend();
  c.navigationRevision++;
  c.trainingModuleOpen = true;
  session.resolve({ user: { displayName: 'Student' } });
  await pending;
  assert.deepEqual(navigated, []);
  assert.equal(c.backendOnline, true);
  assert.equal(c.currentUser.displayName, 'Student');
});

test('slow active-game lookup does not return an open tutorial to its home', async () => {
  const active = deferred();
  const { c, session, navigated } = startupContext(active.promise);
  session.resolve({ user: { displayName: 'Student' } });
  const pending = c.checkBackend();
  await new Promise(resolve => setImmediate(resolve));
  c.navigationRevision++;
  c.trainingModuleOpen = true;
  active.resolve();
  await pending;
  assert.deepEqual(navigated, []);
});

test('startup still selects the requested route when the user has not navigated', async () => {
  const { c, session, navigated } = startupContext();
  session.resolve({ user: { displayName: 'Student' } });
  await c.checkBackend();
  assert.deepEqual(navigated, ['how-to-play', 'reset-module']);
});

function joinContext(api) {
  const button = { disabled: false, attrs: {}, setAttribute(k,v) { this.attrs[k] = v; }, removeAttribute(k) { delete this.attrs[k]; } };
  const status = {};
  let timerCallback;
  const c = vm.createContext({
    AbortController, currentUser: { id: 'student' }, leagueJoinPending: false,
    leagueCodeInput: { value: ' class16 ', disabled: false }, joinLeagueButton: button,
    leagueStatus: {}, document: { querySelector: () => status },
    currentInterfaceLanguage: () => 'Korean', translateCopy: s => s,
    window: { setTimeout(callback) { timerCallback = callback; return 1; }, clearTimeout() {} },
    api, requestCurrentUserMutation: async fn => ({ data: await fn(), applied: true }),
    showAchievementUnlocks() {}, renderDashboardSummary() {}, renderLeaderboard() {}, renderAuthState() {}, setLeagueActionMode() {},
  });
  vm.runInContext(functionSource('setLeagueJoinStatus') + functionSource('joinLeague'), c);
  return { c, button, status, timeout: () => timerCallback() };
}

test('join shows pending feedback immediately, blocks repeated clicks, and clears on success', async () => {
  const response = deferred();
  let calls = 0;
  const { c, button, status } = joinContext((route, options) => {
    calls++;
    assert.equal(options.body.code, 'CLASS16');
    return response.promise;
  });
  const pending = c.joinLeague();
  assert.equal(button.disabled, true);
  assert.equal(button.attrs['aria-busy'], 'true');
  assert.match(status.textContent, /참여하는 중/);
  await c.joinLeague();
  assert.equal(calls, 1);
  response.resolve({ league: { code: 'CLASS16' }, unlocked: [] });
  await pending;
  assert.equal(button.disabled, false);
  assert.equal(c.leagueCodeInput.disabled, false);
  assert.equal(button.attrs['aria-busy'], undefined);
  assert.match(status.textContent, /참여 완료/);
});

test('a timed out join restores the controls and tells the player how to retry', async () => {
  const { c, button, status, timeout } = joinContext((route, options) => new Promise((resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new Error('aborted')));
  }));
  const pending = c.joinLeague();
  timeout();
  await pending;
  assert.equal(button.disabled, false);
  assert.equal(c.leagueJoinPending, false);
  assert.match(status.textContent, /다시 참여/);
});
