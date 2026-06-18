const board = document.querySelector("#chessBoard");
const syncState = document.querySelector("#syncState");
const queueTime = document.querySelector("#queueTime");
const queueProgress = document.querySelector("#queueProgress");
const queuePrompt = document.querySelector("#queuePrompt");
const findMatchButton = document.querySelector("#findMatch");
const joinKeMatchButton = document.querySelector("#joinKeMatch");
const simulateMoveButton = document.querySelector("#simulateMove");
const resignMatchButton = document.querySelector("#resignMatch");
const matchResult = document.querySelector("#matchResult span");
const matchLayout = document.querySelector("#matchLayout");
const partnerLanguage = document.querySelector("#partnerLanguage");
const partnerName = document.querySelector("#partnerName");
const voiceRing = document.querySelector("#voiceRing");
const toggleVoiceButton = document.querySelector("#toggleVoice");
const reportUserButton = document.querySelector("#reportUser");
const mannerTemp = document.querySelector("#mannerTemp");
const dashboardTemp = document.querySelector("#dashboardTemp");
const profileTemp = document.querySelector("#profileTemp");
const nextMissionButton = document.querySelector("#nextMission");
const icebreakerText = document.querySelector("#icebreakerText");
const composeVoiceLetter = document.querySelector("#composeVoiceLetter");
const voiceDialog = document.querySelector("#voiceDialog");
const sttToggle = document.querySelector("#sttToggle");
const translationToggle = document.querySelector("#translationToggle");
const sttPill = document.querySelector("#sttPill");
const sttStatusText = document.querySelector("#sttStatusText");
const translatedSpeech = document.querySelector("#translatedSpeech");
const originalSpeech = document.querySelector("#originalSpeech");
const subtitleSize = document.querySelector("#subtitleSize");
const contrastToggle = document.querySelector("#contrastToggle");
const activateStt = document.querySelector("#activateStt");
const wordsRecognized = document.querySelector("#wordsRecognized");
const latencyText = document.querySelector("#latencyText");
const dashboardLatency = document.querySelector("#dashboardLatency");
const generateReviewButton = document.querySelector("#generateReview");
const refreshReviewButton = document.querySelector("#refreshReview");
const pronunciationStatus = document.querySelector("#pronunciationStatus");
const reviewStatus = document.querySelector("#reviewStatus");
const serverStatus = document.querySelector("#serverStatus");
const authForm = document.querySelector("#authForm");
const authEmail = document.querySelector("#authEmail");
const authPassword = document.querySelector("#authPassword");
const authLanguagePair = document.querySelector("#authLanguagePair");
const authStatus = document.querySelector("#authStatus");
const authSubmit = document.querySelector("#authSubmit");
const continueToDashboardButton = document.querySelector("#continueToDashboard");
const signupButton = document.querySelector("#signupButton");
const loginButton = document.querySelector("#loginButton");
const activeMatchesCount = document.querySelector("#activeMatchesCount");
const subtitleSessionsCount = document.querySelector("#subtitleSessionsCount");
const conversationGoal = document.querySelector("#conversationGoal");
const vocabList = document.querySelector("#vocabList");
const culturalTitle = document.querySelector("#culturalTitle");
const culturalBody = document.querySelector("#culturalBody");
const culturalPrompt = document.querySelector("#culturalPrompt");
const quickPairGrid = document.querySelector("#quickPairGrid");
const lobbySummary = document.querySelector("#lobbySummary");
const seekTimeControl = document.querySelector("#seekTimeControl");
const createSeekButton = document.querySelector("#createSeek");
const openSeeksList = document.querySelector("#openSeeksList");
const refreshLobbyButton = document.querySelector("#refreshLobby");
const createPrivateChallengeButton = document.querySelector("#createPrivateChallenge");
const privateChallengeCode = document.querySelector("#privateChallengeCode");
const matchSourceBadge = document.querySelector("#matchSourceBadge");
const timeControlBadge = document.querySelector("#timeControlBadge");

const pieceCodes = {
  white: {
    p: "wp",
    n: "wn",
    b: "wb",
    r: "wr",
    q: "wq",
    k: "wk",
  },
  black: {
    p: "bp",
    n: "bn",
    b: "bb",
    r: "br",
    q: "bq",
    k: "bk",
  },
};

const pieceNames = {
  p: "pawn",
  n: "knight",
  b: "bishop",
  r: "rook",
  q: "queen",
  k: "king",
};

function pieceSvg(pieceCode) {
  const color = pieceCode?.[0] === "w" ? "white" : "black";
  const type = pieceCode?.[1] || "p";
  const light = color === "white";
  const fill = light ? "#fbf6e8" : "#10202a";
  const stroke = light ? "#40514f" : "#071117";
  const accent = light ? "#d9d1be" : "#28434b";
  const common = `fill="${fill}" stroke="${stroke}" stroke-width="4.6" stroke-linejoin="round" stroke-linecap="round"`;
  const base = `<path ${common} d="M22 78h56l7 10H15z"/><path ${common} d="M29 67h42l5 11H24z"/>`;
  const details = {
    p: `<circle ${common} cx="50" cy="27" r="13"/><path ${common} d="M37 67c3-19 8-27 13-27s10 8 13 27z"/>${base}`,
    n: `<path ${common} d="M30 78c5-18 5-31 18-43l-9-13c19 1 34 10 40 25 4 10 0 21-11 29l8 12H27z"/><path fill="${accent}" stroke="${stroke}" stroke-width="3" d="M50 33l-6 9 12-3z"/><circle fill="${light ? stroke : "#d8efe8"}" cx="61" cy="42" r="2.7"/>${base}`,
    b: `<path ${common} d="M50 14c15 11 22 25 14 39-4 8-10 12-14 18-4-6-10-10-14-18-8-14-1-28 14-39z"/><path fill="none" stroke="${stroke}" stroke-width="4" d="M56 29L44 47"/>${base}`,
    r: `<path ${common} d="M24 20h11v9h10v-9h10v9h10v-9h11v24H24z"/><path ${common} d="M31 44h38v27H31z"/>${base}`,
    q: `<circle fill="${fill}" stroke="${stroke}" stroke-width="4" cx="25" cy="27" r="6"/><circle fill="${fill}" stroke="${stroke}" stroke-width="4" cx="50" cy="20" r="6"/><circle fill="${fill}" stroke="${stroke}" stroke-width="4" cx="75" cy="27" r="6"/><path ${common} d="M22 35l13 30h30l13-30-20 17-8-26-8 26z"/>${base}`,
    k: `<path fill="none" stroke="${stroke}" stroke-width="6" d="M50 13v24M39 25h22"/><path ${common} d="M50 34c13 8 19 18 18 33H32c-1-15 5-25 18-33z"/>${base}`,
  };

  return `<svg viewBox="0 0 100 100" role="img" aria-label="${color} ${pieceNames[type] || "piece"}">${details[type] || details.p}</svg>`;
}

const initialPieces = {
  a8: "br",
  b8: "bn",
  c8: "bb",
  d8: "bq",
  e8: "bk",
  f8: "bb",
  g8: "bn",
  h8: "br",
  a7: "bp",
  b7: "bp",
  c7: "bp",
  d7: "bp",
  e7: "bp",
  f7: "bp",
  g7: "bp",
  h7: "bp",
  a2: "wp",
  b2: "wp",
  c2: "wp",
  d2: "wp",
  e2: "wp",
  f2: "wp",
  g2: "wp",
  h2: "wp",
  a1: "wr",
  b1: "wn",
  c1: "wb",
  d1: "wq",
  e1: "wk",
  f1: "wb",
  g1: "wn",
  h1: "wr",
};

const plannedMoves = [
  ["e2", "e4"],
  ["e7", "e5"],
  ["g1", "f3"],
  ["b8", "c6"],
  ["f1", "c4"],
  ["g8", "f6"],
  ["d2", "d3"],
  ["f8", "c5"],
];

const missions = [
  "Ask your partner what opening they enjoy most.",
  "Compliment one move and ask why they chose it.",
  "Explain your next move in one short sentence.",
  "Ask your partner how to say 'good game' in their language.",
  "Send one chess phrase to the subtitle view for practice.",
];

const subtitleSamples = [
  {
    original: "Your knight fork was really strong.",
    translated: "Korean: Your knight fork was really strong.",
  },
  {
    original: "Can you explain why you moved the bishop there?",
    translated: "Korean: Can you explain why you moved the bishop there?",
  },
  {
    original: "I am trying to protect my king before attacking.",
    translated: "Korean: I am trying to protect my king before attacking.",
  },
];

const defaultReview = {
  vocabulary: [
    {
      term: "calm position",
      translation: "Korean: calm position",
      context: "Used when a player described choosing a quiet opening before attacking.",
      pronunciationText: "calm position",
      language: "en-US",
    },
    {
      term: "London System",
      translation: "Korean: London System",
      context: "A stable chess opening discussed during beginner-friendly planning.",
      pronunciationText: "London System",
      language: "en-US",
    },
    {
      term: "knight fork",
      translation: "Korean: knight fork",
      context: "Used after a knight attacked two pieces at the same time.",
      pronunciationText: "knight fork",
      language: "en-US",
    },
    {
      term: "center control",
      translation: "Korean: center control",
      context: "Used while explaining why a move was strategically useful.",
      pronunciationText: "center control",
      language: "en-US",
    },
    {
      term: "good game",
      translation: "Korean: good game",
      context: "A polite phrase used after the match result.",
      pronunciationText: "good game",
      language: "en-US",
    },
  ],
  culturalInsight: {
    title: "Detected reference: saying GG",
    summary: 'The AI can flag "GG" and "good game" as respectful online-game closings.',
    researchPrompt: "Compare polite post-game phrases in your partner's language.",
  },
};

let pieces = { ...initialPieces };
let moveIndex = 0;
let queueInterval;
let missionIndex = 0;
let currentManner = 42.8;
let backendOnline = false;
let currentUser = null;
let currentMatchId = null;
let selectedSquare = null;
let boardOrientation = "white";
let socket = null;
let authMode = "signup";

function setMatchPaired(isPaired) {
  matchLayout.classList.toggle("paired", isPaired);
  findMatchButton.hidden = isPaired;
  joinKeMatchButton.hidden = isPaired;
}

function setServerStatus(text, online) {
  serverStatus.textContent = text;
  serverStatus.classList.toggle("online", online === true);
  serverStatus.classList.toggle("offline", online === false);
}

function renderAuthState() {
  const signedIn = Boolean(currentUser);
  authForm.classList.toggle("signed-in", signedIn);
  continueToDashboardButton.hidden = !signedIn;
  loginButton.textContent = signedIn ? "Dashboard" : "Log in";
  signupButton.textContent = signedIn ? "Sign out" : "Sign up";
  authSubmit.textContent = signedIn ? "Signed in" : authMode === "login" ? "Log in" : "Create account";
  authSubmit.disabled = signedIn;
  authEmail.disabled = signedIn;
  authPassword.disabled = signedIn;
  authLanguagePair.disabled = signedIn;
}

function setAuthMode(mode) {
  authMode = mode;
  renderAuthState();
  authStatus.textContent =
    mode === "login" ? "Enter your existing email and password." : "Create an account to save matches and language review.";
  document.querySelector("#home").scrollIntoView({ behavior: "smooth", block: "start" });
  authEmail.focus();
}

async function api(path, options = {}) {
  if (location.protocol === "file:") {
    throw new Error("Backend is offline. Start the local server to use app features.");
  }

  const response = await fetch(path, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

function selectedPool() {
  const button = document.querySelector(".pool-button.active") || document.querySelector(".pool-button");
  return {
    id: button?.dataset.poolId || "rapid-10-0",
    timeControl: button?.dataset.timeControl || "10+0",
    rated: button?.dataset.rated === "true",
    label: button?.querySelector("span")?.textContent?.trim() || "10+0",
    name: button?.querySelector("strong")?.textContent?.trim() || "Rapid Talk",
  };
}

function activeGameType() {
  const activeMode = document.querySelector(".segment.active")?.dataset.mode || "Casual";
  return {
    mode: activeMode,
    rated: activeMode === "Rated",
  };
}

function matchBelongsToCurrentUser(match) {
  if (!currentUser || !match?.players) return true;
  return match.players.some((player) => player.userId === currentUser.id);
}

function matchSourceLabel(match) {
  const source = match?.pairingType || "practice";
  const labels = {
    "quick-pool": "Quick pool",
    "open-seek": "Open seek",
    "language-pool": "Language pool",
    "guest-practice": "Practice game",
    practice: "Practice game",
  };
  return labels[source] || "Lobby match";
}

function matchClockLabel(match) {
  if (!match) return "No active clock yet";
  const clock = match.timeControl || "10+0";
  const type = match.rated ? "Rated" : "Casual";
  const goal = match.goal || "Explain chess moves";
  return `${clock} - ${type} - ${goal}`;
}

function currentPlayerColor(match) {
  if (!match?.players?.length) return "white";
  if (currentUser) {
    return match.players.find((player) => player.userId === currentUser.id)?.color || "white";
  }
  return match.players.find((player) => player.userId === null)?.color || "white";
}

async function refreshStats() {
  if (!backendOnline) return;
  try {
    const stats = await api("/api/stats");
    activeMatchesCount.textContent = String(stats.activeMatches);
    subtitleSessionsCount.textContent = String(stats.subtitleSessions);
  } catch {
    // Non-critical status cards can fail without blocking play.
  }
}

function renderLobby(lobby = {}) {
  const seeks = lobby.openSeeks || [];
  openSeeksList.innerHTML = "";
  const openCount = Number(lobby.openSeeksTotal ?? seeks.length);
  lobbySummary.textContent = `${openCount} live`;

  if (!seeks.length) {
    const empty = document.createElement("article");
    empty.className = "open-seek-card empty-state";

    const title = document.createElement("strong");
    title.textContent = backendOnline ? "No live games waiting" : "Live lobby unavailable";

    const text = document.createElement("p");
    text.textContent = backendOnline
      ? "Create an open seek or ask your friend to create one. Their game will appear here after refresh."
      : "Start the backend to see real players instead of demo content.";

    empty.append(title, text);
    openSeeksList.append(empty);
    return;
  }

  seeks.forEach((seek) => {
    const card = document.createElement("article");
    card.className = "open-seek-card";

    const header = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = seek.displayName || "Player";
    const time = document.createElement("span");
    time.className = "pill";
    time.textContent = seek.timeControl || "10+0";
    header.append(title, time);

    const meta = document.createElement("div");
    meta.className = "open-seek-meta";
    const type = document.createElement("span");
    type.textContent = seek.rated ? "Rated" : "Casual";
    const language = document.createElement("span");
    language.textContent = seek.partnerLanguage || "English";
    meta.append(type, language);

    const goal = document.createElement("p");
    goal.textContent = seek.goal || "Explain chess moves";

    const joinButton = document.createElement("button");
    joinButton.className = "button secondary full small";
    joinButton.type = "button";
    joinButton.textContent = "Join game";
    joinButton.addEventListener("click", () => acceptSeek(seek));

    card.append(header, meta, goal, joinButton);
    openSeeksList.append(card);
  });
}

async function refreshLobby() {
  if (!backendOnline) {
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
    return;
  }

  try {
    const lobby = await api("/api/matches/lobby");
    renderLobby(lobby);
  } catch (error) {
    lobbySummary.textContent = "Lobby offline";
    queuePrompt.textContent = error.message;
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
  }
}

async function checkBackend() {
  try {
    const health = await api("/api/health");
    backendOnline = Boolean(health.ok);
    setServerStatus("Backend online", true);
    const session = await api("/api/session");
    currentUser = session.user;
    if (currentUser) {
      authStatus.textContent = `Signed in as ${currentUser.displayName}`;
      updateTemperature(Number(currentUser.mannerTemperature || currentManner));
    }
    renderAuthState();
    connectSocket(null);
    await refreshStats();
    await refreshLobby();
  } catch {
    backendOnline = false;
    setServerStatus("Prototype mode", false);
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
  }
}

function connectSocket(matchId) {
  if (!backendOnline || location.protocol === "file:") return;
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "join", matchId }));
    return;
  }

  const protocol = location.protocol === "https:" ? "wss" : "ws";
  socket = new WebSocket(`${protocol}://${location.host}/ws`);
  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({ type: "join", matchId }));
    syncState.textContent = "Live socket connected";
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if ((message.type === "match:started" || message.type === "queue:matched") && matchBelongsToCurrentUser(message.match)) {
      renderMatch(message.match);
    }
    if (message.type === "match:move" && matchBelongsToCurrentUser(message.match)) renderMatch(message.match);
    if (message.type === "match:ended" && matchBelongsToCurrentUser(message.match)) renderMatch(message.match);
    if (message.type === "review:generated") renderReview(message.review);
    if (message.type === "queue:waiting") queuePrompt.textContent = "Waiting for another player to join.";
    if (message.type === "lobby:updated") refreshLobby();
  });
  socket.addEventListener("close", () => {
    syncState.textContent = "Live socket disconnected";
  });
}

async function signInOrRegister() {
  const email = authEmail.value.trim();
  const password = authPassword.value;
  if (!email || !password) {
    authStatus.textContent = "Enter an email and password to continue.";
    return;
  }

  authSubmit.disabled = true;
  authSubmit.textContent = authMode === "login" ? "Logging in..." : "Creating account...";
  authStatus.textContent = "Checking your account...";

  try {
    const data = await api(authMode === "login" ? "/api/auth/login" : "/api/auth/signup", {
      method: "POST",
      body: {
        email,
        password,
        languagePair: authLanguagePair.value,
      },
    });
    currentUser = data.user;
    authStatus.textContent = `Signed in as ${currentUser.displayName}. Continue to the dashboard or start a match.`;
    authPassword.value = "";
    renderAuthState();
    setView("dashboard");
    await refreshStats();
    await refreshLobby();
  } catch (error) {
    authStatus.textContent = error.message;
    renderAuthState();
  }
}

async function signOut() {
  if (!backendOnline) {
    currentUser = null;
    renderAuthState();
    return;
  }

  try {
    await api("/api/auth/logout", { method: "POST" });
  } catch {
    // The visible account state can still reset if the server logout response is missed.
  }
  currentUser = null;
  authEmail.disabled = false;
  authPassword.disabled = false;
  authLanguagePair.disabled = false;
  authStatus.textContent = "Signed out. You can log in again anytime.";
  renderAuthState();
}

function setView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === viewName);
  });
  document.querySelectorAll(".side-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === viewName);
  });
  document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
}

function piecesFromBoard(boardRows) {
  const next = {};
  boardRows.forEach((row) => {
      row.forEach((piece) => {
        if (!piece) return;
      next[piece.square] = pieceCodes[piece.color][piece.type];
    });
  });
  return next;
}

function buildBoard() {
  board.innerHTML = "";
  board.dataset.orientation = boardOrientation;
  const files = boardOrientation === "black" ? ["h", "g", "f", "e", "d", "c", "b", "a"] : ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = boardOrientation === "black" ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];

  ranks.forEach((rank, rankIndex) => {
    files.forEach((file, fileIndex) => {
      const id = `${file}${rank}`;
      const fileCoordinateIndex = "abcdefgh".indexOf(file);
      const square = document.createElement("button");
      square.type = "button";
      square.className = `square ${(rank + fileCoordinateIndex) % 2 === 1 ? "dark" : "light"}`;
      square.dataset.square = id;
      square.style.gridRow = String(rankIndex + 1);
      square.style.gridColumn = String(fileIndex + 1);
      square.setAttribute("aria-label", `${id} square`);
      square.addEventListener("click", () => handleSquareClick(id));

      if (selectedSquare === id) square.classList.add("selected");
      if (pieces[id]) {
        const piece = document.createElement("span");
        piece.className = `piece ${pieces[id].startsWith("w") ? "white-piece" : "black-piece"} piece-${pieces[id][1]}`;
        piece.innerHTML = pieceSvg(pieces[id]);
        square.append(piece);
      }

      board.append(square);
    });
  });
}

function renderMatch(match) {
  if (!match) return;
  currentMatchId = match.id;
  const matchEnded = match.status === "ended" || match.game?.gameOver;
  setMatchPaired(!matchEnded);
  boardOrientation = currentPlayerColor(match);
  if (match.game?.board) {
    pieces = piecesFromBoard(match.game.board);
    selectedSquare = null;
    buildBoard();
  }
  const opponent = match.players?.find((player) => player.userId !== currentUser?.id) || match.players?.[1];
  partnerName.textContent = opponent ? `${opponent.displayName} (${match.partnerLanguage})` : `Mina K. (${match.partnerLanguage})`;
  matchResult.textContent = match.result || "In progress";
  syncState.textContent = match.game?.gameOver ? "Game over" : `${match.game?.turn || "white"} to move`;
  matchSourceBadge.textContent = matchSourceLabel(match);
  timeControlBadge.textContent = matchClockLabel(match);
  connectSocket(match.id);
}

function localMove(from, to) {
  const piece = pieces[from];
  if (!piece) return;
  delete pieces[from];
  pieces[to] = piece;
  selectedSquare = null;
  buildBoard();
  document.querySelector(`[data-square="${from}"]`)?.classList.add("moved");
  document.querySelector(`[data-square="${to}"]`)?.classList.add("recent");
  syncState.textContent = `${from} to ${to} moved locally`;
}

async function makeMove(from, to) {
  if (!from || !to || from === to) {
    selectedSquare = null;
    buildBoard();
    return;
  }

  if (!backendOnline || !currentMatchId) {
    localMove(from, to);
    return;
  }

  try {
    const data = await api(`/api/matches/${currentMatchId}/move`, {
      method: "POST",
      body: { from, to, promotion: "q" },
    });
    renderMatch(data.match);
    syncState.textContent = `${data.move.san} accepted`;
    await refreshStats();
  } catch (error) {
    selectedSquare = null;
    buildBoard();
    syncState.textContent = error.message;
  }
}

function handleSquareClick(square) {
  if (!selectedSquare) {
    if (!pieces[square]) return;
    selectedSquare = square;
    buildBoard();
    return;
  }
  makeMove(selectedSquare, square);
}

async function applyPlannedMove() {
  const [from, to] = plannedMoves[moveIndex % plannedMoves.length];
  await makeMove(from, to);
  moveIndex += 1;
}

async function startQueue(label = "Searching for a safe partner with matching goals.", liveQueue = false, overrides = {}) {
  clearInterval(queueInterval);
  let seconds = 105;
  let progress = 18;
  queuePrompt.textContent = label;
  queueProgress.style.width = `${progress}%`;
  matchResult.textContent = "Queue started";
  queueTime.textContent = "01:45";

  if (backendOnline) {
    try {
      const pool = selectedPool();
      const gameType = activeGameType();
      const data = await api(overrides.endpoint || (liveQueue ? "/api/matches/queue" : "/api/matches/start"), {
        method: "POST",
        body: {
          mode: gameType.mode,
          poolId: pool.id,
          timeControl: pool.timeControl,
          rated: gameType.rated || pool.rated,
          partnerLanguage: partnerLanguage.value,
          goal: conversationGoal.value,
          ...(overrides.body || {}),
        },
      });

      if (data.waiting) {
        queuePrompt.textContent = `Waiting for another player. ${data.queuedPlayers} player(s) in queue.`;
      } else {
        renderMatch(data.match);
        matchResult.textContent = overrides.readyText || (liveQueue ? "Live opponent matched" : "Practice match ready");
      }
      await refreshStats();
      await refreshLobby();
    } catch (error) {
      queuePrompt.textContent = error.message;
    }
  }

  queueInterval = setInterval(() => {
    seconds = Math.max(0, seconds - 7);
    progress = Math.min(100, progress + 9);
    queueTime.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    queueProgress.style.width = `${progress}%`;
    if (progress >= 100) clearInterval(queueInterval);
  }, 500);
}

async function quickPairFromSelectedPool() {
  const pool = selectedPool();
  await startQueue(`Searching the ${pool.label} ${pool.name} pool.`, false, {
    endpoint: "/api/matches/quick-pair",
    readyText: "Quick pool match ready",
    body: {
      pairingType: "quick-pool",
      poolId: pool.id,
      timeControl: pool.timeControl,
      rated: pool.rated,
    },
  });
}

async function acceptSeek(seek) {
  if (!backendOnline) {
    queuePrompt.textContent = "Start the backend to join live open games.";
    return;
  }

  try {
    queuePrompt.textContent = `Joining ${seek.displayName}'s ${seek.timeControl} game.`;
    const data = await api(`/api/matches/seeks/${seek.id}/accept`, { method: "POST" });
    renderMatch(data.match);
    matchResult.textContent = "Open seek joined";
    await refreshStats();
    await refreshLobby();
  } catch (error) {
    queuePrompt.textContent = error.message;
  }
}

async function createOpenSeek() {
  const gameType = activeGameType();
  if (!backendOnline) {
    queuePrompt.textContent = "Start the backend and sign in to post a real open seek.";
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
    return;
  }

  try {
    const data = await api("/api/matches/seeks", {
      method: "POST",
      body: {
        timeControl: seekTimeControl.value,
        rated: gameType.rated,
        partnerLanguage: partnerLanguage.value,
        goal: conversationGoal.value,
      },
    });
    queuePrompt.textContent = `Open seek posted: ${data.seek.timeControl} ${data.seek.rated ? "rated" : "casual"}.`;
    await refreshLobby();
  } catch (error) {
    queuePrompt.textContent = error.message;
  }
}

async function createPrivateChallenge() {
  const pool = selectedPool();
  if (!backendOnline) {
    privateChallengeCode.textContent = "LOCAL";
    queuePrompt.textContent = "Private challenge preview created. Start the backend for shareable codes.";
    return;
  }

  try {
    const data = await api("/api/challenges", {
      method: "POST",
      body: {
        timeControl: pool.timeControl,
        partnerLanguage: partnerLanguage.value,
        goal: conversationGoal.value,
      },
    });
    privateChallengeCode.textContent = data.challenge.code;
    queuePrompt.textContent = "Private invite created. Share the code with a friend.";
  } catch (error) {
    queuePrompt.textContent = error.message;
  }
}

function updateTemperature(value) {
  const text = `${value.toFixed(1)} C`;
  mannerTemp.textContent = value.toFixed(1);
  dashboardTemp.textContent = text;
  profileTemp.textContent = text;
}

async function appendSubtitle() {
  const sample = subtitleSamples[Math.floor(Math.random() * subtitleSamples.length)];
  const original = document.createElement("p");
  original.innerHTML = `<strong>Mina:</strong> ${sample.original}`;
  originalSpeech.append(original);

  const translated = document.createElement("p");
  translated.innerHTML = `<strong>Mina:</strong> ${sample.translated}`;
  translatedSpeech.append(translated);

  wordsRecognized.textContent = String(Number(wordsRecognized.textContent) + sample.original.split(" ").length);

  if (backendOnline && currentMatchId) {
    try {
      await api(`/api/matches/${currentMatchId}/transcript`, {
        method: "POST",
        body: {
          speaker: "Mina",
          text: sample.original,
          translation: sample.translated,
          kind: "speech",
        },
      });
    } catch {
      // Keep the subtitle UI responsive if persistence fails.
    }
  }
}

function renderReview(review) {
  if (!review) return;
  reviewStatus.textContent = `${review.vocabulary.length} items generated`;
  pronunciationStatus.textContent = "AI review generated. Click any word to replay pronunciation.";
  vocabList.innerHTML = "";

  review.vocabulary.forEach((item) => {
    const card = document.createElement("article");
    card.className = "vocab-item";

    const button = document.createElement("button");
    button.className = "vocab-term";
    button.dataset.say = item.pronunciationText || item.term;
    button.dataset.lang = item.language || "en-US";
    button.textContent = item.term;
    button.addEventListener("click", () => playPronunciation(button));

    const translation = document.createElement("strong");
    translation.textContent = item.translation;

    const context = document.createElement("p");
    context.textContent = item.context;

    card.append(button, translation, context);
    vocabList.append(card);
  });

  culturalTitle.textContent = review.culturalInsight.title;
  culturalBody.textContent = review.culturalInsight.summary;
  culturalPrompt.textContent = `Research prompt: ${review.culturalInsight.researchPrompt}`;
}

async function requestReview(source = "the completed match") {
  reviewStatus.textContent = "Generating";
  pronunciationStatus.textContent = `Building AI review from ${source}.`;
  if (!backendOnline || !currentMatchId) {
    reviewStatus.textContent = "Prototype review ready";
    pronunciationStatus.textContent = "Start the backend and finish a match to generate a saved review.";
    return;
  }

  try {
    const data = await api(`/api/matches/${currentMatchId}/review`, { method: "POST" });
    renderReview(data.review);
  } catch (error) {
    pronunciationStatus.textContent = error.message;
  }
}

function playPronunciation(button) {
  const phrase = button.dataset.say || button.textContent.trim();
  const lang = button.dataset.lang || "en-US";

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = lang;
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
    pronunciationStatus.textContent = `Playing pronunciation: ${phrase}`;
    return;
  }

  pronunciationStatus.textContent = `Pronunciation replay is not available in this browser for: ${phrase}`;
}

document.querySelectorAll("[data-view-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const viewName = link.dataset.viewLink;
    if (!viewName) return;
    event.preventDefault();
    setView(viewName);
  });
});

document.querySelectorAll(".route-card").forEach((card) => {
  card.tabIndex = 0;
  card.role = "button";
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setView(card.dataset.viewLink);
    }
  });
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    syncState.textContent = `${button.dataset.mode} game ready`;
  });
});

document.querySelectorAll(".pool-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pool-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const pool = selectedPool();
    queuePrompt.textContent = `${pool.label} ${pool.name} selected.`;
    timeControlBadge.textContent = `${pool.timeControl} - ${pool.rated ? "Rated" : "Casual"} - ${conversationGoal.value}`;
  });
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signInOrRegister();
});

signupButton.addEventListener("click", () => {
  if (currentUser) {
    signOut();
    return;
  }
  setAuthMode("signup");
});

loginButton.addEventListener("click", () => {
  if (currentUser) {
    setView("dashboard");
    return;
  }
  setAuthMode("login");
});

continueToDashboardButton.addEventListener("click", () => {
  setView("dashboard");
});

findMatchButton.addEventListener("click", quickPairFromSelectedPool);
joinKeMatchButton.addEventListener("click", () =>
  startQueue("Looking for another signed-in language partner.", true, {
    readyText: "Language pool match ready",
    body: {
      mode: "Language",
      pairingType: "language-pool",
      timeControl: seekTimeControl.value,
    },
  }),
);
simulateMoveButton.addEventListener("click", applyPlannedMove);
createSeekButton.addEventListener("click", createOpenSeek);
refreshLobbyButton.addEventListener("click", refreshLobby);
createPrivateChallengeButton.addEventListener("click", createPrivateChallenge);

resignMatchButton.addEventListener("click", async () => {
  matchResult.textContent = "Resigned";
  syncState.textContent = "Match ended";
  generateReviewButton.textContent = "View AI Review";
  if (backendOnline && currentMatchId) {
    try {
      const data = await api(`/api/matches/${currentMatchId}/end`, {
        method: "POST",
        body: { result: "Resigned" },
      });
      renderMatch(data.match);
      await refreshStats();
    } catch (error) {
      syncState.textContent = error.message;
    }
  }
  await requestReview("the completed match");
});

partnerLanguage.addEventListener("change", () => {
  partnerName.textContent = `Mina K. (${partnerLanguage.value})`;
});

toggleVoiceButton.addEventListener("click", () => {
  const speaking = voiceRing.classList.toggle("speaking");
  toggleVoiceButton.textContent = speaking ? "Voice connected" : "Voice muted";
});

reportUserButton.addEventListener("click", async () => {
  currentManner = Math.max(0, currentManner - 1.4);
  updateTemperature(currentManner);
  matchResult.textContent = "Safety report submitted";
  if (backendOnline) {
    try {
      await api("/api/reports", {
        method: "POST",
        body: {
          matchId: currentMatchId,
          reason: "Safety report",
          detail: "Submitted from match panel.",
        },
      });
    } catch {
      // Local UI has already acknowledged the report.
    }
  }
});

nextMissionButton.addEventListener("click", () => {
  missionIndex = (missionIndex + 1) % missions.length;
  icebreakerText.textContent = missions[missionIndex];
});

composeVoiceLetter.addEventListener("click", () => {
  voiceDialog.showModal();
});

sttToggle.addEventListener("change", () => {
  const active = sttToggle.checked;
  sttPill.textContent = active ? "STT Active" : "STT Paused";
  sttStatusText.textContent = active ? "Active" : "Paused";
});

translationToggle.addEventListener("change", () => {
  translatedSpeech.hidden = !translationToggle.checked;
});

subtitleSize.addEventListener("change", () => {
  [originalSpeech, translatedSpeech].forEach((block) => {
    block.classList.remove("small", "large");
    if (subtitleSize.value !== "medium") block.classList.add(subtitleSize.value);
  });
});

contrastToggle.addEventListener("change", () => {
  document.querySelector('[data-view="stt"]').classList.toggle("high-contrast", contrastToggle.checked);
});

activateStt.addEventListener("click", async () => {
  await appendSubtitle();
  const latency = 34 + Math.floor(Math.random() * 18);
  latencyText.textContent = `${latency} ms`;
  dashboardLatency.textContent = `${latency} ms`;
});

generateReviewButton.addEventListener("click", () => requestReview("the completed match"));
refreshReviewButton.addEventListener("click", () => requestReview("the latest transcript sample"));

document.querySelectorAll(".vocab-term").forEach((button) => {
  button.addEventListener("click", () => playPronunciation(button));
});

buildBoard();
renderReview(defaultReview);
checkBackend();
