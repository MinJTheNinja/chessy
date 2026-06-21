const board = document.querySelector("#chessBoard");
const menuToggle = document.querySelector("#menuToggle");
const sidebarMenu = document.querySelector("#sidebarMenu");
const syncState = document.querySelector("#syncState");
const queueTime = document.querySelector("#queueTime");
const queueProgress = document.querySelector("#queueProgress");
const queuePrompt = document.querySelector("#queuePrompt");
const findMatchButton = document.querySelector("#findMatch");
const cancelMatchSearchButton = document.querySelector("#cancelMatchSearch");
const showCreateSeekButton = document.querySelector("#showCreateSeek");
const showFriendRoomButton = document.querySelector("#showFriendRoom");
const seekComposer = document.querySelector("#seekComposer");
const friendRoomDialog = document.querySelector("#friendRoomDialog");
const closeFriendRoomButton = document.querySelector("#closeFriendRoom");
const resignMatchButton = document.querySelector("#resignMatch");
const drawMatchButton = document.querySelector("#drawMatch");
const matchResult = document.querySelector("#matchResult span");
const matchLayout = document.querySelector("#matchLayout");
const partnerLanguage = document.querySelector("#partnerLanguage");
const partnerName = document.querySelector("#partnerName");
const partnerId = document.querySelector("#partnerId");
const boardPartnerName = document.querySelector("#boardPartnerName");
const boardPartnerId = document.querySelector("#boardPartnerId");
const selfPlayerName = document.querySelector("#selfPlayerName");
const voiceRing = document.querySelector("#voiceRing");
const startVoiceCallButton = document.querySelector("#startVoiceCall");
const endVoiceCallButton = document.querySelector("#endVoiceCall");
const remoteVoiceAudio = document.querySelector("#remoteVoiceAudio");
const voiceStatusMessages = document.querySelectorAll("[data-voice-status]");
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
const sttSourceLanguage = document.querySelector("#sttSourceLanguage");
const subtitleTargetLanguage = document.querySelector("#subtitleTargetLanguage");
const matchActivateStt = document.querySelector("#matchActivateStt");
const matchSttSourceLanguage = document.querySelector("#matchSttSourceLanguage");
const matchSubtitleTargetLanguage = document.querySelector("#matchSubtitleTargetLanguage");
const matchOriginalSpeech = document.querySelector("#matchOriginalSpeech");
const matchTranslatedSpeech = document.querySelector("#matchTranslatedSpeech");
const matchSttStatus = document.querySelector("#matchSttStatus");
const matchSessionDuration = document.querySelector("#matchSessionDuration");
const matchWordsRecognized = document.querySelector("#matchWordsRecognized");
const wordsRecognized = document.querySelector("#wordsRecognized");
const sessionDuration = document.querySelector("#sessionDuration");
const latencyText = document.querySelector("#latencyText");
const dashboardLatency = document.querySelector("#dashboardLatency");
const generateReviewButton = document.querySelector("#generateReview");
const refreshReviewButton = document.querySelector("#refreshReview");
const pronunciationStatus = document.querySelector("#pronunciationStatus");
const reviewStatus = document.querySelector("#reviewStatus");
const serverStatus = document.querySelector("#serverStatus");
const authForm = document.querySelector("#authForm");
const authEmail = document.querySelector("#authEmail");
const authDisplayNameField = document.querySelector("#authDisplayNameField");
const authDisplayName = document.querySelector("#authDisplayName");
const authPassword = document.querySelector("#authPassword");
const authLanguagePair = document.querySelector("#authLanguagePair");
const authStatus = document.querySelector("#authStatus");
const authSubmit = document.querySelector("#authSubmit");
const continueToDashboardButton = document.querySelector("#continueToDashboard");
const googleSignInButton = document.querySelector("#googleSignIn");
const headerProfile = document.querySelector("#headerProfile");
const headerProfileButton = document.querySelector("#headerProfileButton");
const headerProfileMenu = document.querySelector("#headerProfileMenu");
const headerProfileName = document.querySelector("#headerProfileName");
const headerProfileAvatar = document.querySelector("#headerProfileAvatar");
const headerSignOutButton = document.querySelector("#headerSignOut");
const deleteAccountButton = document.querySelector("#deleteAccount");
const contrastModeButton = document.querySelector("#contrastModeButton");
const largeTextButton = document.querySelector("#largeTextButton");
const settingsAccountName = document.querySelector("#settingsAccountName");
const signupButton = document.querySelector("#signupButton");
const loginButton = document.querySelector("#loginButton");
const notificationButton = document.querySelector("#notificationButton");
const notificationCount = document.querySelector("#notificationCount");
const notificationPanel = document.querySelector("#notificationPanel");
const notificationList = document.querySelector("#notificationList");
const clearNotificationsButton = document.querySelector("#clearNotifications");
const activeMatchesCount = document.querySelector("#activeMatchesCount");
const subtitleSessionsCount = document.querySelector("#subtitleSessionsCount");
const conversationGoal = document.querySelector("#conversationGoal");
const forumPostTitle = document.querySelector("#forumPostTitle");
const forumPostCategory = document.querySelector("#forumPostCategory");
const forumPostBody = document.querySelector("#forumPostBody");
const forumPostList = document.querySelector("#forumPostList");
const publishForumPostButton = document.querySelector("#publishForumPost");
const showForumComposerButton = document.querySelector("#showForumComposer");
const forumComposer = document.querySelector("#forumComposer");
const forumFilterButtons = document.querySelectorAll("[data-forum-filter]");
const shopInterestStatus = document.querySelector("#shopInterestStatus");
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
const privateChallengeInput = document.querySelector("#privateChallengeInput");
const joinPrivateChallengeButton = document.querySelector("#joinPrivateChallenge");
const matchRoomLink = document.querySelector("#matchRoomLink");
const copyMatchRoomLinkButton = document.querySelector("#copyMatchRoomLink");
const matchSourceBadge = document.querySelector("#matchSourceBadge");
const timeControlBadge = document.querySelector("#timeControlBadge");
const whiteClock = document.querySelector("#whiteClock");
const blackClock = document.querySelector("#blackClock");
const whiteClockCard = document.querySelector("#whiteClockCard");
const blackClockCard = document.querySelector("#blackClockCard");
const refreshAdminButton = document.querySelector("#refreshAdmin");
const adminStatus = document.querySelector("#adminStatus");
const adminUsersCount = document.querySelector("#adminUsersCount");
const adminMatchesCount = document.querySelector("#adminMatchesCount");
const adminReportsCount = document.querySelector("#adminReportsCount");
const adminMatchesList = document.querySelector("#adminMatchesList");
const adminUsersList = document.querySelector("#adminUsersList");
const adminReportsList = document.querySelector("#adminReportsList");
const adminMatchSearch = document.querySelector("#adminMatchSearch");
const adminUserSearch = document.querySelector("#adminUserSearch");
const refreshProfileButton = document.querySelector("#refreshProfile");
const profileStatus = document.querySelector("#profileStatus");
const profileAvatar = document.querySelector("#profileAvatar");
const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");
const profileLanguageText = document.querySelector("#profileLanguageText");
const profileDisplayName = document.querySelector("#profileDisplayName");
const profileLanguagePair = document.querySelector("#profileLanguagePair");
const profileBio = document.querySelector("#profileBio");
const saveProfileButton = document.querySelector("#saveProfile");
const peerFeedbackType = document.querySelector("#peerFeedbackType");
const peerFeedbackNote = document.querySelector("#peerFeedbackNote");
const submitPeerFeedbackButton = document.querySelector("#submitPeerFeedback");
const badgeList = document.querySelector("#badgeList");
const badgeDetails = document.querySelector("#badgeDetails");
const cultureGuideList = document.querySelector("#cultureGuideList");
const cultureGuideInput = document.querySelector("#cultureGuideInput");
const saveCultureGuideButton = document.querySelector("#saveCultureGuide");

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
let queuePollInterval;
let missionIndex = 0;
let currentManner = 42.8;
let backendOnline = false;
let currentUser = null;
let currentMatchId = null;
let drawOfferFromOpponent = false;
let selectedSquare = null;
let legalMoveTargets = [];
let boardOrientation = "white";
let socket = null;
let authMode = "login";
let cachedSpeechVoices = [];
let peerConnection = null;
let localVoiceStream = null;
let pendingVoiceOffer = null;
let makingVoiceOffer = false;
let ignoredVoiceOffer = false;
let pendingIceCandidates = [];
let voiceConnectTimeout = null;
let voiceOfferRetryTimer = null;
let voiceOfferRetryCount = 0;
let clockSnapshot = null;
let clockInterval = null;
let timeoutNotifiedFor = null;
let speechRecognition = null;
let sttListening = false;
let sttShouldRestart = false;
let sttInterimLines = [];
let sttSessionStart = null;
let sttSessionTimer = null;
let notifications = [];
let unreadNotifications = 0;
let cachedAdminData = null;
let adminCommandBuffer = "";
let forumFilter = "All";
let forumPosts = [];

const voiceClientId =
  window.crypto?.randomUUID?.() || `voice_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const rtcConfig = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
      ],
    },
  ],
  iceCandidatePoolSize: 4,
};

function setVoiceStatus(message, statusElement) {
  if (statusElement) statusElement.textContent = message;
  voiceStatusMessages.forEach((element) => {
    if (element !== statusElement) element.textContent = message;
  });
}

function sendSocketMessage(data) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return false;
  socket.send(JSON.stringify(data));
  return true;
}

function sendVoiceSignal(data) {
  if (!currentMatchId) return false;
  return sendSocketMessage({
    ...data,
    matchId: currentMatchId,
    from: voiceClientId,
  });
}

function sendSubtitleSignal(data) {
  if (!currentMatchId) return false;
  return sendSocketMessage({
    ...data,
    type: "stt:subtitle",
    matchId: currentMatchId,
    from: voiceClientId,
    speaker: sttSpeakerName(),
    sourceLanguage: sttLanguage(),
  });
}

function waitForSocketOpen() {
  if (socket?.readyState === WebSocket.OPEN) return Promise.resolve(true);
  if (!socket || socket.readyState !== WebSocket.CONNECTING) return Promise.resolve(false);

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => resolve(false), 2500);
    socket.addEventListener(
      "open",
      () => {
        window.clearTimeout(timeout);
        resolve(true);
      },
      { once: true },
    );
    socket.addEventListener(
      "error",
      () => {
        window.clearTimeout(timeout);
        resolve(false);
      },
      { once: true },
    );
  });
}

function updateSpeechVoices() {
  if (!("speechSynthesis" in window)) return [];
  cachedSpeechVoices = window.speechSynthesis.getVoices();
  return cachedSpeechVoices;
}

if ("speechSynthesis" in window) {
  updateSpeechVoices();
  window.speechSynthesis.onvoiceschanged = updateSpeechVoices;
}

function speakText(text, options = {}) {
  const phrase = String(text || "").trim();
  const statusElement = options.statusElement || null;
  const label = options.label || phrase;

  if (!phrase) {
    setVoiceStatus("No voice text is available.", statusElement);
    return false;
  }

  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    setVoiceStatus("Voice playback is not available in this browser.", statusElement);
    return false;
  }

  const lang = options.lang || "en-US";
  const voices = updateSpeechVoices();
  const langRoot = lang.split("-")[0];
  const voice =
    voices.find((item) => item.lang === lang) ||
    voices.find((item) => item.lang?.startsWith(langRoot)) ||
    voices.find((item) => item.default);

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = lang;
  utterance.rate = options.rate || 0.88;
  utterance.pitch = options.pitch || 1;
  if (voice) utterance.voice = voice;

  utterance.onstart = () => setVoiceStatus(`Playing: ${label}`, statusElement);
  utterance.onend = () => setVoiceStatus(`Finished: ${label}`, statusElement);
  utterance.onerror = () => {
    setVoiceStatus("Could not play audio. Check browser or system sound, then click again.", statusElement);
  };

  setVoiceStatus(`Starting: ${label}`, statusElement);
  window.speechSynthesis.speak(utterance);
  window.setTimeout(() => window.speechSynthesis.resume(), 120);
  return true;
}

function setMatchPaired(isPaired) {
  matchLayout.classList.toggle("paired", isPaired);
  findMatchButton.hidden = isPaired;
  showCreateSeekButton.hidden = isPaired;
  showFriendRoomButton.hidden = isPaired;
  cancelMatchSearchButton.hidden = true;
  if (isPaired) seekComposer.hidden = true;
  document.querySelector("#matchTitle").textContent = isPaired ? "Live match" : "Find a game";
}

function isVoiceCallSupported() {
  return Boolean(
    navigator.mediaDevices?.getUserMedia &&
      window.RTCPeerConnection &&
      window.RTCSessionDescription &&
      window.RTCIceCandidate,
  );
}

function setVoiceCallButtons(active) {
  startVoiceCallButton.disabled = active;
  endVoiceCallButton.disabled = !active;
}

function isVoiceConnected() {
  return (
    peerConnection?.connectionState === "connected" ||
    peerConnection?.iceConnectionState === "connected" ||
    peerConnection?.iceConnectionState === "completed"
  );
}

function clearVoiceConnectTimer() {
  window.clearTimeout(voiceConnectTimeout);
  voiceConnectTimeout = null;
}

function clearVoiceOfferRetry() {
  window.clearInterval(voiceOfferRetryTimer);
  voiceOfferRetryTimer = null;
  voiceOfferRetryCount = 0;
}

function startVoiceConnectTimer() {
  clearVoiceConnectTimer();
  voiceConnectTimeout = window.setTimeout(() => {
    if (isVoiceConnected()) return;
    setVoiceStatus("Voice is taking longer than expected. Make sure your partner clicked Start mic, or tap End voice and Start mic again.");
  }, 10000);
}

function sendCurrentVoiceOffer(statusMessage = "") {
  const connection = ensureVoicePeerConnection();
  if (connection.localDescription?.type !== "offer") return false;
  const sent = sendVoiceSignal({
    type: "voice:offer",
    description: connection.localDescription,
    retry: voiceOfferRetryCount,
  });
  if (!sent) return false;
  if (statusMessage) setVoiceStatus(statusMessage);
  return true;
}

function scheduleVoiceOfferRetry() {
  clearVoiceOfferRetry();
  voiceOfferRetryTimer = window.setInterval(() => {
    if (isVoiceConnected() || peerConnection?.remoteDescription) {
      clearVoiceOfferRetry();
      return;
    }
    voiceOfferRetryCount += 1;
    if (voiceOfferRetryCount > 4) {
      clearVoiceOfferRetry();
      setVoiceStatus("Still waiting for partner voice. Ask them to tap Start mic, then try again if needed.");
      return;
    }
    sendCurrentVoiceOffer("Re-sending voice invite...");
  }, 2200);
}

function isSecureVoiceContext() {
  return (
    location.protocol === "https:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
  );
}

async function flushPendingIceCandidates() {
  if (!peerConnection?.remoteDescription) return;
  const candidates = pendingIceCandidates;
  pendingIceCandidates = [];
  for (const candidate of candidates) {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }
}

function ensureVoicePeerConnection() {
  if (peerConnection) return peerConnection;

  peerConnection = new RTCPeerConnection(rtcConfig);

  peerConnection.addEventListener("icecandidate", (event) => {
    if (!event.candidate) return;
    sendVoiceSignal({
      type: "voice:ice",
      candidate: event.candidate,
    });
  });

  peerConnection.addEventListener("track", (event) => {
    const [stream] = event.streams;
    if (stream) remoteVoiceAudio.srcObject = stream;
    remoteVoiceAudio.play().catch(() => {
      setVoiceStatus("Partner voice is connected. Click the page if your browser blocks audio.");
    });
    voiceRing.classList.add("speaking");
    setVoiceStatus("Partner voice connected.");
  });

  peerConnection.addEventListener("connectionstatechange", () => {
    const state = peerConnection.connectionState;
    if (state === "connected") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice call connected.");
    }
    if (state === "connecting") setVoiceStatus("Connecting voice call...");
    if (state === "failed" || state === "disconnected") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice call disconnected. You can start it again.");
      setVoiceCallButtons(Boolean(localVoiceStream));
    }
    if (state === "closed") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice call ended.");
    }
  });

  peerConnection.addEventListener("iceconnectionstatechange", () => {
    const state = peerConnection.iceConnectionState;
    if (state === "connected" || state === "completed") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice call connected.");
    }
    if (state === "failed") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice route failed. Tap End voice, then Start mic again.");
      setVoiceCallButtons(Boolean(localVoiceStream));
    }
  });

  return peerConnection;
}

async function attachLocalVoiceStream() {
  if (localVoiceStream) return localVoiceStream;

  localVoiceStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video: false,
  });

  const connection = ensureVoicePeerConnection();
  localVoiceStream.getTracks().forEach((track) => connection.addTrack(track, localVoiceStream));
  return localVoiceStream;
}

async function acceptVoiceOffer(description) {
  const connection = ensureVoicePeerConnection();
  await connection.setRemoteDescription(new RTCSessionDescription(description));
  await flushPendingIceCandidates();
  const answer = await connection.createAnswer();
  await connection.setLocalDescription(answer);
  const socketReady = await waitForSocketOpen();
  if (!socketReady) throw new Error("Live voice socket is still connecting. Try again in a moment.");
  sendVoiceSignal({
    type: "voice:answer",
    description: connection.localDescription,
  });
  setVoiceCallButtons(true);
  startVoiceConnectTimer();
  setVoiceStatus("Microphone on. Connecting voice...");
}

async function startVoiceCall() {
  if (!isVoiceCallSupported()) {
    setVoiceStatus("This browser does not support live microphone calls.");
    return;
  }
  if (!backendOnline) {
    setVoiceStatus("Start the backend before using live voice.");
    return;
  }
  if (!currentMatchId) {
    setVoiceStatus("Start or join a match before turning on your mic.");
    return;
  }
  if (!isSecureVoiceContext()) {
    setVoiceStatus("Microphone needs HTTPS. Render is OK, and localhost is OK.");
    return;
  }

  try {
    setVoiceStatus("Requesting microphone permission...");
    connectSocket(currentMatchId);
    const socketReady = await waitForSocketOpen();
    if (!socketReady) throw new Error("Live voice socket is still connecting. Try again in a moment.");
    await attachLocalVoiceStream();
    voiceRing.classList.add("speaking");
    sendVoiceSignal({ type: "voice:ready" });

    if (pendingVoiceOffer) {
      const offer = pendingVoiceOffer;
      pendingVoiceOffer = null;
      await acceptVoiceOffer(offer);
      return;
    }

    const connection = ensureVoicePeerConnection();
    makingVoiceOffer = true;
    const offer = await connection.createOffer({ offerToReceiveAudio: true });
    await connection.setLocalDescription(offer);
    sendCurrentVoiceOffer();
    scheduleVoiceOfferRetry();
    setVoiceCallButtons(true);
    startVoiceConnectTimer();
    setVoiceStatus("Microphone on. Waiting for partner...");
  } catch (error) {
    const message = error.name === "NotAllowedError" ? "Microphone permission was blocked." : `Voice error: ${error.message}`;
    endVoiceCall(false);
    setVoiceStatus(message);
  } finally {
    makingVoiceOffer = false;
  }
}

function endVoiceCall(notifyPartner = true) {
  if (notifyPartner) sendVoiceSignal({ type: "voice:end" });
  clearVoiceConnectTimer();
  clearVoiceOfferRetry();

  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localVoiceStream) {
    localVoiceStream.getTracks().forEach((track) => track.stop());
    localVoiceStream = null;
  }

  pendingVoiceOffer = null;
  pendingIceCandidates = [];
  ignoredVoiceOffer = false;
  remoteVoiceAudio.srcObject = null;
  voiceRing.classList.remove("speaking");
  setVoiceCallButtons(false);
  setVoiceStatus("Voice call ended.");
}

async function handleVoiceSignal(message) {
  if (!message.matchId || message.matchId !== currentMatchId || message.from === voiceClientId) return;

  if (message.type === "voice:end") {
    endVoiceCall(false);
    return;
  }

  if (!isVoiceCallSupported()) {
    setVoiceStatus("Live voice is not supported in this browser.");
    return;
  }

  try {
    const connection = ensureVoicePeerConnection();

    if (message.type === "voice:ready") {
      if (!localVoiceStream) {
        setVoiceStatus("Partner is ready for voice. Click Start mic to connect.");
        return;
      }
      if (connection.signalingState === "have-local-offer" && connection.localDescription?.type === "offer") {
        sendCurrentVoiceOffer("Partner is ready. Re-sending voice invite...");
        scheduleVoiceOfferRetry();
        startVoiceConnectTimer();
        return;
      }
      if (connection.signalingState === "stable" && !isVoiceConnected() && !makingVoiceOffer) {
        makingVoiceOffer = true;
        try {
          const offer = await connection.createOffer({ offerToReceiveAudio: true });
          await connection.setLocalDescription(offer);
          sendCurrentVoiceOffer();
          scheduleVoiceOfferRetry();
          startVoiceConnectTimer();
          setVoiceStatus("Partner mic is ready. Connecting voice...");
        } finally {
          makingVoiceOffer = false;
        }
      }
      return;
    }

    if (message.type === "voice:offer") {
      if (
        localVoiceStream &&
        connection.signalingState === "stable" &&
        connection.remoteDescription?.type === "offer" &&
        connection.localDescription?.type === "answer"
      ) {
        sendVoiceSignal({
          type: "voice:answer",
          description: connection.localDescription,
        });
        setVoiceStatus("Re-sent voice confirmation.");
        return;
      }

      const offerCollision = makingVoiceOffer || connection.signalingState !== "stable";
      ignoredVoiceOffer = offerCollision && voiceClientId.localeCompare(message.from || "") < 0;
      if (ignoredVoiceOffer) return;

      if (offerCollision) {
        await connection.setLocalDescription({ type: "rollback" });
      }

      if (!localVoiceStream) {
        pendingVoiceOffer = message.description;
        setVoiceStatus("Partner started voice. Click Start mic to join.");
        return;
      }

      await acceptVoiceOffer(message.description);
      return;
    }

    if (message.type === "voice:answer") {
      if (connection.signalingState !== "have-local-offer") return;
      await connection.setRemoteDescription(new RTCSessionDescription(message.description));
      await flushPendingIceCandidates();
      clearVoiceOfferRetry();
      startVoiceConnectTimer();
      setVoiceStatus("Partner accepted voice. Connecting...");
      return;
    }

    if (message.type === "voice:ice" && message.candidate) {
      if (!connection.remoteDescription) {
        pendingIceCandidates.push(message.candidate);
        return;
      }
      if (!ignoredVoiceOffer) await connection.addIceCandidate(new RTCIceCandidate(message.candidate));
    }
  } catch (error) {
    setVoiceStatus(`Voice connection issue: ${error.message}`);
  }
}

function handleSubtitleSignal(message) {
  if (!message.matchId || message.matchId !== currentMatchId || message.from === voiceClientId) return;
  const text = String(message.text || "").trim();
  if (!text) return;
  const opponent =
    message.speaker ||
    document.querySelector("#boardPartnerName")?.textContent ||
    document.querySelector("#partnerName")?.textContent ||
    "Partner";
  appendFinalSubtitle({
    speaker: opponent,
    text,
    sourceLanguage: message.sourceLanguage || "",
    persist: false,
  });
}

function setServerStatus(text, online) {
  if (!serverStatus) return;
  serverStatus.textContent = text;
  serverStatus.classList.toggle("online", online === true);
  serverStatus.classList.toggle("offline", online === false);
}

function renderAuthState() {
  const signedIn = Boolean(currentUser);
  document.body.classList.toggle("is-signed-in", signedIn);
  authForm.classList.toggle("signed-in", signedIn);
  headerProfile.hidden = !signedIn;
  if (signedIn) {
    headerProfileName.textContent = currentUser.displayName || "Player";
    headerProfileAvatar.textContent = initials(currentUser.displayName || "Player");
    if (settingsAccountName) settingsAccountName.textContent = `Signed in as ${currentUser.displayName || "Player"}`;
  } else {
    if (settingsAccountName) settingsAccountName.textContent = "Signed out";
    closeProfileMenu();
  }
  if (headerSignOutButton) headerSignOutButton.disabled = !signedIn;
  if (deleteAccountButton) deleteAccountButton.disabled = !signedIn;
  if (forumPostList) renderForumPosts();
  continueToDashboardButton.hidden = !signedIn;
  loginButton.textContent = signedIn ? "Play" : "Login";
  signupButton.textContent = signedIn ? "Sign out" : "New user";
  loginButton.classList.toggle("active", !signedIn && authMode === "login");
  signupButton.classList.toggle("active", !signedIn && authMode === "signup");
  authSubmit.textContent = signedIn ? "Signed in" : authMode === "login" ? "Log in" : "Create account";
  authSubmit.disabled = signedIn;
  googleSignInButton.disabled = signedIn;
  authEmail.disabled = signedIn;
  authDisplayName.disabled = signedIn;
  authPassword.disabled = signedIn;
  authLanguagePair.disabled = signedIn;
  authDisplayNameField.hidden = authMode === "login";
  authPassword.autocomplete = authMode === "login" ? "current-password" : "new-password";
  if (currentUser?.role !== "admin") {
    document.querySelectorAll(".admin-only").forEach((button) => {
      button.hidden = true;
    });
  }
}

function setAuthMode(mode) {
  authMode = mode;
  renderAuthState();
  authStatus.textContent =
    mode === "login" ? "Enter your existing email and password." : "Create an account to save matches and language review.";
  document.querySelector("#home").scrollIntoView({ behavior: "smooth", block: "start" });
  (mode === "login" ? authEmail : authDisplayName).focus();
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

function routeMatchId() {
  const match = location.pathname.match(/^\/match\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function roomUrl(matchId = currentMatchId) {
  if (!matchId) return "";
  return new URL(`/match/${encodeURIComponent(matchId)}`, location.origin).href;
}

function updateRoomLink(matchId = currentMatchId) {
  const link = roomUrl(matchId);
  matchRoomLink.value = link || "No match yet";
  copyMatchRoomLinkButton.disabled = !link;
}

function updateMatchRoute(matchId) {
  if (!matchId || location.protocol === "file:") return;
  const nextPath = `/match/${encodeURIComponent(matchId)}`;
  if (location.pathname !== nextPath) {
    history.replaceState({ matchId }, "", nextPath);
  }
}

async function copyRoomLink() {
  const link = matchRoomLink.value;
  if (!currentMatchId || !link || link === "No match yet") return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(link);
    } else {
      matchRoomLink.select();
      document.execCommand("copy");
    }
    setVoiceStatus("Match room link copied.");
  } catch {
    matchRoomLink.select();
    setVoiceStatus("Room link selected. Copy it manually.");
  }
}

async function loadMatchFromRoute() {
  const matchId = routeMatchId();
  if (!matchId || !backendOnline) return false;

  try {
    let data = await api(`/api/matches/${matchId}`);
    if (currentUser && !matchBelongsToCurrentUser(data.match) && matchHasOpenSlot(data.match)) {
      data = await api(`/api/matches/${matchId}/join`, { method: "POST" });
    }
    renderMatch(data.match);
    setView("match");
    matchResult.textContent = data.match.result || "Joined room from link";
    return true;
  } catch (error) {
    setView("match");
    matchResult.textContent = "Room not found";
    syncState.textContent = error.message;
    return true;
  }
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

function matchHasOpenSlot(match) {
  return Boolean(match?.players?.some((player) => !player.userId));
}

function shortPlayerId(player) {
  if (!player) return "waiting";
  if (!player.userId) return "guest";
  return player.userId.replace(/^user_/, "user_").slice(0, 18);
}

function formatClock(ms) {
  const safeMs = Math.max(0, Number(ms || 0));
  const totalSeconds = Math.ceil(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function clockValue(color) {
  if (!clockSnapshot) return null;
  const key = `${color}Ms`;
  const base = Number(clockSnapshot[key] || 0);
  const active = clockSnapshot.running && clockSnapshot.activeColor === color;
  const elapsed = active ? Date.now() - clockSnapshot.receivedAt : 0;
  return Math.max(0, base - elapsed);
}

function updateClockDisplay() {
  const whiteMs = clockValue("white");
  const blackMs = clockValue("black");
  whiteClock.textContent = whiteMs === null ? "--:--" : formatClock(whiteMs);
  blackClock.textContent = blackMs === null ? "--:--" : formatClock(blackMs);
  whiteClockCard.classList.toggle("active", clockSnapshot?.running && clockSnapshot.activeColor === "white");
  blackClockCard.classList.toggle("active", clockSnapshot?.running && clockSnapshot.activeColor === "black");
  whiteClockCard.classList.toggle("low-time", whiteMs !== null && whiteMs <= 30_000);
  blackClockCard.classList.toggle("low-time", blackMs !== null && blackMs <= 30_000);

  if (clockSnapshot?.running && clockSnapshot.activeColor) {
    const activeMs = clockSnapshot.activeColor === "white" ? whiteMs : blackMs;
    if (activeMs !== null && activeMs <= 0) {
      notifyClockTimeout(clockSnapshot.activeColor);
    }
  }
}

function startMatchClock(match) {
  window.clearInterval(clockInterval);
  if (!match?.clocks) {
    clockSnapshot = null;
    updateClockDisplay();
    return;
  }

  clockSnapshot = {
    ...match.clocks,
    running: match.status !== "ended" && match.clocks.running !== false,
    receivedAt: Date.now(),
  };
  updateClockDisplay();
  if (clockSnapshot.running) {
    clockInterval = window.setInterval(updateClockDisplay, 1000);
  }
}

async function notifyClockTimeout(color) {
  const timeoutKey = `${currentMatchId}:${color}`;
  if (!currentMatchId || timeoutNotifiedFor === timeoutKey) return;
  timeoutNotifiedFor = timeoutKey;
  const loser = color === "white" ? "White" : "Black";
  const result = `${loser} lost on time`;
  matchResult.textContent = result;
  syncState.textContent = "Time expired";
  window.clearInterval(clockInterval);
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Chess clock expired", { body: result });
  }
  if (backendOnline) {
    await finishMatch(result, { review: false, statusText: "Time expired" });
  }
}

async function requestNotificationPermission() {
  if (!("Notification" in window) || Notification.permission !== "default") return;
  try {
    await Notification.requestPermission();
  } catch {
    // Browser notification permission is optional.
  }
}

function renderNotifications() {
  notificationCount.textContent = String(unreadNotifications);
  notificationCount.hidden = unreadNotifications === 0;

  notificationList.innerHTML = "";
  if (!notifications.length) {
    const empty = document.createElement("p");
    empty.className = "notification-empty";
    empty.textContent = "No notifications yet.";
    notificationList.append(empty);
    return;
  }

  notifications.slice(0, 12).forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `notification-item ${item.category || "info"}`;
    button.innerHTML = `
      <span>${item.title}</span>
      <small>${item.body}</small>
    `;
    button.addEventListener("click", () => {
      notificationPanel.hidden = true;
      notificationButton.setAttribute("aria-expanded", "false");
      if (item.view) setView(item.view);
    });
    notificationList.append(button);
  });
}

function addNotification({ category = "info", title = "New notification", body = "", view = null }) {
  const notification = {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    category,
    title,
    body,
    view,
  };
  notifications.unshift(notification);
  notifications = notifications.slice(0, 30);
  unreadNotifications += 1;
  renderNotifications();

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

function handleNotificationMessage(message) {
  if (message.category === "warning" && message.userId !== currentUser?.id) return;
  if (message.fromUserId && message.fromUserId === currentUser?.id) return;

  const views = {
    "game-request": "match",
    warning: "profile",
    voicemail: "communication",
  };

  addNotification({
    category: message.category,
    title: message.title || "New notification",
    body: message.body || "",
    view: views[message.category] || null,
  });
}

function matchSourceLabel(match) {
  const source = match?.pairingType || "practice";
  const labels = {
    "quick-pool": "Quick pair",
    "open-seek": "Created game",
    "language-pool": "Language match",
    "private-challenge": "Friend room",
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
    title.textContent = backendOnline ? "No players waiting" : "Live lobby unavailable";

    const text = document.createElement("p");
    text.textContent = backendOnline
      ? "Create a game or ask a friend to create one. Matching games will appear here."
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

function adminEmpty(message) {
  const empty = document.createElement("p");
  empty.className = "admin-empty";
  empty.textContent = message;
  return empty;
}

function renderAdminList(container, items, renderItem, emptyMessage) {
  container.innerHTML = "";
  if (!items.length) {
    container.append(adminEmpty(emptyMessage));
    return;
  }
  items.forEach((item) => container.append(renderItem(item)));
}

function adminSearchText(value) {
  return String(value || "").trim().toLowerCase();
}

function adminMatchSearchText(match) {
  const players = (match.players || []).map((player) => `${player.displayName} ${player.color}`).join(" ");
  return adminSearchText(
    `${match.timeControl} ${match.status} ${match.result} ${match.moveCount} ${match.transcriptCount} ${players}`,
  );
}

function adminUserSearchText(user) {
  return adminSearchText(
    `${user.displayName} ${user.email} ${user.role} ${Number(user.mannerTemperature ?? 0).toFixed(1)} ${(user.warnings || []).length}`,
  );
}

function renderAdminOverview(data) {
  cachedAdminData = data;
  adminUsersCount.textContent = String(data.stats.users);
  adminMatchesCount.textContent = String(data.stats.activeMatches);
  adminReportsCount.textContent = String(data.stats.openReports);
  adminStatus.textContent = `Admin data loaded. ${data.stats.totalReports} total report(s).`;
  const matchQuery = adminSearchText(adminMatchSearch.value);
  const userQuery = adminSearchText(adminUserSearch.value);
  const matches = matchQuery ? data.matches.filter((match) => adminMatchSearchText(match).includes(matchQuery)) : data.matches;
  const users = userQuery ? data.users.filter((user) => adminUserSearchText(user).includes(userQuery)) : data.users;

  renderAdminList(
    adminMatchesList,
    matches,
    (match) => {
      const card = document.createElement("details");
      card.className = "admin-item admin-disclosure";
      const players = (match.players || []).map((player) => `${player.displayName} (${player.color})`).join(" vs ") || "No players";
      const summary = document.createElement("summary");
      summary.innerHTML = `
        <span>
          <strong>${match.timeControl || "10+0"} ${match.rated ? "Rated" : "Casual"}</strong>
          <small>${players}</small>
        </span>
        <b>${match.status}</b>
      `;
      const detail = document.createElement("div");
      detail.className = "admin-disclosure-body";
      detail.innerHTML = `
        <p>${match.result || "In progress"}</p>
        <p>${match.moveCount} move(s), ${match.transcriptCount} transcript item(s)</p>
      `;
      const button = document.createElement("button");
      button.className = "button danger full small";
      button.type = "button";
      button.textContent = match.status === "ended" ? "Match Ended" : "End Match";
      button.disabled = match.status === "ended";
      button.addEventListener("click", () => endAdminMatch(match.id));
      detail.append(button);
      card.append(summary, detail);
      return card;
    },
    matchQuery ? "No matches match your search." : "No matches yet.",
  );

  renderAdminList(
    adminUsersList,
    users,
    (user) => {
      const card = document.createElement("details");
      card.className = "admin-item admin-disclosure";
      const warningCount = (user.warnings || []).length;
      const summary = document.createElement("summary");
      summary.innerHTML = `
        <span>
          <strong>${user.displayName}</strong>
          <small>${user.email}</small>
        </span>
        <b>${warningCount} warning${warningCount === 1 ? "" : "s"}</b>
      `;
      const detail = document.createElement("div");
      detail.className = "admin-disclosure-body";
      detail.innerHTML = `
        <p>${user.role} - ${Number(user.mannerTemperature ?? 0).toFixed(1)} fair play score</p>
        <p>${warningCount} warning(s)</p>
      `;
      const button = document.createElement("button");
      button.className = "button danger full small";
      button.type = "button";
      button.textContent = user.role === "admin" ? "Admin Account" : "Issue Warning";
      button.disabled = user.role === "admin";
      button.addEventListener("click", () => warnAdminUser(user.id));
      detail.append(button);
      card.append(summary, detail);
      return card;
    },
    userQuery ? "No users match your search." : "No users yet.",
  );

  renderAdminList(
    adminReportsList,
    data.reports,
    (report) => {
      const card = document.createElement("article");
      card.className = "admin-item";
      card.innerHTML = `
        <strong>${report.reason}</strong>
        <span>${report.status}</span>
        <p>Reporter: ${report.reporterName}</p>
        <p>${report.detail || "No details provided."}</p>
      `;
      const button = document.createElement("button");
      button.className = "button secondary full small";
      button.type = "button";
      button.textContent = report.status === "resolved" ? "Resolved" : "Mark Resolved";
      button.disabled = report.status === "resolved";
      button.addEventListener("click", () => resolveAdminReport(report.id));
      card.append(button);
      return card;
    },
    "No safety reports yet.",
  );
}

async function refreshAdmin() {
  if (!backendOnline) {
    adminStatus.textContent = "Start the backend to use admin tools.";
    return;
  }
  if (currentUser?.role !== "admin") {
    adminStatus.textContent = "Admin access required. Sign in with the first account created for this app.";
    return;
  }

  adminStatus.textContent = "Loading admin data...";
  try {
    const data = await api("/api/admin/overview");
    renderAdminOverview(data);
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

async function resolveAdminReport(reportId) {
  try {
    await api(`/api/admin/reports/${reportId}/resolve`, { method: "POST" });
    await refreshAdmin();
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

async function warnAdminUser(userId) {
  try {
    await api(`/api/admin/users/${userId}/warn`, {
      method: "POST",
      body: { reason: "Admin safety warning" },
    });
    await refreshAdmin();
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

async function endAdminMatch(matchId) {
  try {
    await api(`/api/admin/matches/${matchId}/end`, {
      method: "POST",
      body: { result: "Ended by admin" },
    });
    await refreshAdmin();
    await refreshStats();
  } catch (error) {
    adminStatus.textContent = error.message;
  }
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
      updateTemperature(Number(currentUser.mannerTemperature ?? currentManner));
      await refreshProfile();
    }
    renderAuthState();
    connectSocket(null);
    await refreshStats();
    await refreshLobby();
    const routedToMatch = await loadMatchFromRoute();
    if (currentUser && !routedToMatch) setView("match");
  } catch {
    backendOnline = false;
    setServerStatus("Prototype mode", false);
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
  }
}

function connectSocket(matchId) {
  if (!backendOnline || location.protocol === "file:") return;
  if (socket && socket.readyState === WebSocket.OPEN) {
    sendSocketMessage({ type: "join", matchId, clientId: voiceClientId });
    return;
  }
  if (socket && socket.readyState === WebSocket.CONNECTING) {
    socket.addEventListener("open", () => sendSocketMessage({ type: "join", matchId, clientId: voiceClientId }), { once: true });
    return;
  }

  const protocol = location.protocol === "https:" ? "wss" : "ws";
  socket = new WebSocket(`${protocol}://${location.host}/ws`);
  socket.addEventListener("open", () => {
    sendSocketMessage({ type: "join", matchId, clientId: voiceClientId });
    syncState.textContent = "Live socket connected";
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if ((message.type === "match:started" || message.type === "queue:matched" || message.type === "match:joined") && matchBelongsToCurrentUser(message.match)) {
      renderMatch(message.match);
    }
    if (message.type === "match:move" && matchBelongsToCurrentUser(message.match)) renderMatch(message.match);
    if (message.type === "match:ended" && matchBelongsToCurrentUser(message.match)) renderMatch(message.match);
    if (message.type === "review:generated") renderReview(message.review);
    if (message.type?.startsWith("voice:")) handleVoiceSignal(message);
    if (message.type === "stt:subtitle") handleSubtitleSignal(message);
    if (message.type === "draw:offer") handleDrawOffer(message);
    if (message.type === "notification") handleNotificationMessage(message);
    if (message.type === "queue:waiting") queuePrompt.textContent = "Waiting for another player to join.";
    if (message.type === "lobby:updated") refreshLobby();
  });
  socket.addEventListener("close", () => {
    syncState.textContent = "Live socket disconnected";
  });
}

async function signInOrRegister() {
  const email = authEmail.value.trim();
  const displayName = authDisplayName.value.trim();
  const password = authPassword.value;
  if (!email || !password) {
    authStatus.textContent = "Enter an email and password to continue.";
    return;
  }
  if (authMode === "signup" && !displayName) {
    authStatus.textContent = "Choose a display name shown to opponents.";
    authDisplayName.focus();
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
        displayName,
        password,
        languagePair: authLanguagePair.value,
      },
    });
    currentUser = data.user;
    authStatus.textContent = `Signed in as ${currentUser.displayName}. Continue to play.`;
    authDisplayName.value = "";
    authPassword.value = "";
    renderAuthState();
    setView("match");
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
    clearProfile();
    renderAuthState();
    setView("home");
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
  clearProfile();
  renderAuthState();
  setView("home");
}

async function deleteAccount() {
  if (!currentUser) {
    authStatus.textContent = "Sign in before deleting an account.";
    setView("home");
    return;
  }

  const confirmed = window.confirm(
    "Delete your account? This removes your profile, active rooms, queue entries, and voice letters."
  );
  if (!confirmed) return;

  if (!backendOnline) {
    currentUser = null;
    clearProfile();
    renderAuthState();
    authStatus.textContent = "Local account state cleared. Start the server to delete saved account data.";
    setView("home");
    return;
  }

  deleteAccountButton.disabled = true;
  deleteAccountButton.textContent = "Deleting...";
  try {
    await api("/api/auth/delete", { method: "DELETE" });
    currentUser = null;
    clearProfile();
    renderAuthState();
    authStatus.textContent = "Account deleted.";
    setView("home");
  } catch (error) {
    authStatus.textContent = error.message;
  } finally {
    deleteAccountButton.disabled = false;
    deleteAccountButton.textContent = "Delete account";
  }
}

async function signInWithGoogle() {
  authStatus.textContent = "Signing in with Google...";
  googleSignInButton.disabled = true;
  try {
    const data = await api("/api/auth/signup", {
      method: "POST",
      body: {
        email: "google.player@livechess.local",
        displayName: "Google Player",
        password: "google-oauth-demo",
        languagePair: authLanguagePair.value,
      },
    });
    currentUser = data.user;
    authStatus.textContent = `Signed in with Google as ${currentUser.displayName}.`;
    renderAuthState();
    setView("match");
    await refreshStats();
    await refreshLobby();
  } catch (error) {
    authStatus.textContent = error.message;
    renderAuthState();
  }
}

function toggleContrastMode() {
  const enabled = !document.body.classList.contains("high-contrast-mode");
  document.body.classList.toggle("high-contrast-mode", enabled);
  contrastModeButton.setAttribute("aria-pressed", String(enabled));
}

function toggleLargeTextMode() {
  const enabled = !document.body.classList.contains("large-text-mode");
  document.body.classList.toggle("large-text-mode", enabled);
  largeTextButton.setAttribute("aria-pressed", String(enabled));
}

function renderForumPosts() {
  forumPostList.replaceChildren();
  forumFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.forumFilter === forumFilter);
  });
  const visiblePosts = (forumFilter === "All" ? forumPosts : forumPosts.filter((post) => post.category === forumFilter)).sort(
    (first, second) => Number(second.pinned) - Number(first.pinned)
  );
  if (visiblePosts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "forum-empty";
    empty.textContent = "No posts yet.";
    forumPostList.append(empty);
    return;
  }
  visiblePosts.forEach((post) => {
    const item = document.createElement("article");
    item.className = "forum-post";

    const pin = document.createElement("span");
    pin.className = "forum-post-pin";
    pin.textContent = post.pinned ? "📌" : "";

    const main = document.createElement("div");
    main.className = "forum-post-main";

    const category = document.createElement("span");
    category.className = `forum-post-tag ${post.category === "Question" ? "question" : post.category === "Free" ? "free" : ""}`;
    category.textContent = post.category;

    const title = document.createElement("h4");
    title.textContent = post.title;

    const side = document.createElement("div");
    side.className = "forum-post-side";

    const author = document.createElement("span");
    author.textContent = post.author;

    const time = document.createElement("time");
    time.textContent = post.time;

    const comments = document.createElement("span");
    comments.className = "forum-comments";
    comments.textContent = `💬 ${post.comments || 0}`;

    let pinButton = null;
    if (currentUser?.role === "admin") {
      pinButton = document.createElement("button");
      pinButton.className = "forum-pin-action";
      pinButton.type = "button";
      pinButton.textContent = post.pinned ? "Unpin" : "Pin";
      pinButton.addEventListener("click", () => toggleForumPin(post.id));
    }

    main.append(category, title);
    side.append(author, time, comments);
    if (pinButton) side.append(pinButton);
    item.append(pin, main, side);
    forumPostList.append(item);
  });
}

function publishForumPost() {
  const title = forumPostTitle.value.trim();
  const body = forumPostBody.value.trim();
  if (!title || !body) {
    forumPostBody.focus();
    return;
  }
  forumPosts = [
    {
      id: window.crypto?.randomUUID?.() || `post_${Date.now()}`,
      title,
      category: forumPostCategory.value,
      body,
      author: currentUser?.displayName || "Guest Player",
      time: "Just now",
      comments: 0,
      pinned: false,
    },
    ...forumPosts,
  ];
  forumPostTitle.value = "";
  forumPostBody.value = "";
  forumComposer.hidden = true;
  renderForumPosts();
}

function toggleForumComposer() {
  forumComposer.hidden = !forumComposer.hidden;
  if (!forumComposer.hidden) forumPostTitle.focus();
}

function toggleForumPin(postId) {
  if (currentUser?.role !== "admin") return;
  forumPosts = forumPosts.map((post) => (post.id === postId ? { ...post, pinned: !post.pinned } : post));
  renderForumPosts();
}

function saveShopInterest(productName) {
  shopInterestStatus.textContent = `${productName} interest saved. We'll use this tab for checkout and launch updates next.`;
}

function setView(viewName) {
  if (viewName === "home") {
    document.querySelector("#home").scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelectorAll(".side-link").forEach((link) => link.classList.remove("active"));
    return;
  }

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === viewName);
  });
  document.querySelectorAll(".side-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === viewName);
  });
  if (viewName === "admin") refreshAdmin();
  if (viewName === "profile") refreshProfile();
  document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu();
  closeProfileMenu();
}

function openMenu() {
  sidebarMenu.hidden = false;
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  sidebarMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}

function closeProfileMenu() {
  headerProfileMenu.hidden = true;
  headerProfileButton.setAttribute("aria-expanded", "false");
}

function toggleProfileMenu() {
  const willOpen = headerProfileMenu.hidden;
  headerProfileMenu.hidden = !willOpen;
  headerProfileButton.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) {
    closeMenu();
    notificationPanel.hidden = true;
    notificationButton.setAttribute("aria-expanded", "false");
  }
}

function toggleMenu() {
  if (sidebarMenu.hidden) openMenu();
  else closeMenu();
}

function revealAdminByCommand() {
  if (currentUser?.role !== "admin") return;
  document.querySelectorAll(".admin-only").forEach((button) => {
    button.hidden = false;
  });
  setView("admin");
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

function squareToCoords(square) {
  return { file: "abcdefgh".indexOf(square[0]), rank: Number(square[1]) - 1 };
}

function coordsToSquare(file, rank) {
  if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
  return `${"abcdefgh"[file]}${rank + 1}`;
}

function addSlidingMoves(targets, file, rank, color, directions) {
  directions.forEach(([fileStep, rankStep]) => {
    let nextFile = file + fileStep;
    let nextRank = rank + rankStep;
    while (true) {
      const target = coordsToSquare(nextFile, nextRank);
      if (!target) return;
      const occupant = pieces[target];
      if (!occupant) {
        targets.push(target);
      } else {
        if (occupant[0] !== color) targets.push(target);
        return;
      }
      nextFile += fileStep;
      nextRank += rankStep;
    }
  });
}

function legalTargetsFor(square) {
  const piece = pieces[square];
  if (!piece) return [];
  const color = piece[0];
  const type = piece[1];
  const { file, rank } = squareToCoords(square);
  const targets = [];
  const pushIfOpenOrCapture = (target) => {
    if (!target) return;
    const occupant = pieces[target];
    if (!occupant || occupant[0] !== color) targets.push(target);
  };

  if (type === "p") {
    const direction = color === "w" ? 1 : -1;
    const startRank = color === "w" ? 1 : 6;
    const oneStep = coordsToSquare(file, rank + direction);
    if (oneStep && !pieces[oneStep]) {
      targets.push(oneStep);
      const twoStep = coordsToSquare(file, rank + direction * 2);
      if (rank === startRank && twoStep && !pieces[twoStep]) targets.push(twoStep);
    }
    [file - 1, file + 1].forEach((captureFile) => {
      const target = coordsToSquare(captureFile, rank + direction);
      if (target && pieces[target] && pieces[target][0] !== color) targets.push(target);
    });
  } else if (type === "n") {
    [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ].forEach(([fileStep, rankStep]) => pushIfOpenOrCapture(coordsToSquare(file + fileStep, rank + rankStep)));
  } else if (type === "b") {
    addSlidingMoves(targets, file, rank, color, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
  } else if (type === "r") {
    addSlidingMoves(targets, file, rank, color, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
  } else if (type === "q") {
    addSlidingMoves(targets, file, rank, color, [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]);
  } else if (type === "k") {
    [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([fileStep, rankStep]) =>
      pushIfOpenOrCapture(coordsToSquare(file + fileStep, rank + rankStep)),
    );
  }

  return targets;
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
      if (legalMoveTargets.includes(id)) {
        square.classList.add(pieces[id] ? "legal-capture" : "legal-move");
      }
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
  clearInterval(queuePollInterval);
  clearInterval(queueInterval);
  currentMatchId = match.id;
  drawOfferFromOpponent = false;
  updateRoomLink(match.id);
  updateMatchRoute(match.id);
  const matchEnded = match.status === "ended" || match.game?.gameOver;
  setMatchPaired(!matchEnded);
  if (!matchEnded) timeoutNotifiedFor = null;
  boardOrientation = currentPlayerColor(match);
  if (match.game?.board) {
    pieces = piecesFromBoard(match.game.board);
    selectedSquare = null;
    buildBoard();
  }
  const opponent = match.players?.find((player) => player.userId !== currentUser?.id) || match.players?.[1];
  partnerName.textContent = opponent ? `${opponent.displayName} (${match.partnerLanguage})` : `Mina K. (${match.partnerLanguage})`;
  partnerId.textContent = shortPlayerId(opponent);
  boardPartnerName.textContent = opponent ? opponent.displayName : "Waiting";
  boardPartnerId.textContent = shortPlayerId(opponent);
  if (selfPlayerName) selfPlayerName.textContent = currentUser?.displayName || "You";
  voiceRing.textContent = initials(opponent?.displayName || "Mina K.");
  matchResult.textContent = match.result || "In progress";
  syncState.textContent = match.game?.gameOver ? "Game over" : `${match.game?.turn || "white"} to move`;
  matchSourceBadge.textContent = matchSourceLabel(match);
  timeControlBadge.textContent = matchClockLabel(match);
  startMatchClock(match);
  connectSocket(match.id);
  if (matchEnded) {
    endVoiceCall(false);
  } else if (!localVoiceStream) {
    setVoiceStatus("Match paired. You can start your mic.");
  }
}

function localMove(from, to) {
  const piece = pieces[from];
  if (!piece) return;
  delete pieces[from];
  pieces[to] = piece;
  selectedSquare = null;
  legalMoveTargets = [];
  buildBoard();
  document.querySelector(`[data-square="${from}"]`)?.classList.add("moved");
  document.querySelector(`[data-square="${to}"]`)?.classList.add("recent");
  syncState.textContent = `${from} to ${to} moved locally`;
}

async function makeMove(from, to) {
  if (!from || !to || from === to) {
    selectedSquare = null;
    legalMoveTargets = [];
    buildBoard();
    return;
  }

  if (!backendOnline || !currentMatchId) {
    localMove(from, to);
    return;
  }

  selectedSquare = null;
  legalMoveTargets = [];
  buildBoard();
  syncState.textContent = "Sending move...";

  try {
    const data = await api(`/api/matches/${currentMatchId}/move`, {
      method: "POST",
      body: { from, to, promotion: "q" },
    });
    renderMatch(data.match);
    syncState.textContent = `${data.move.san} accepted`;
    refreshStats();
  } catch (error) {
    selectedSquare = null;
    legalMoveTargets = [];
    buildBoard();
    syncState.textContent = error.message;
  }
}

function handleSquareClick(square) {
  if (!selectedSquare) {
    if (!pieces[square]) return;
    selectedSquare = square;
    legalMoveTargets = legalTargetsFor(square);
    buildBoard();
    return;
  }
  if (pieces[square] && pieces[square][0] === pieces[selectedSquare]?.[0]) {
    selectedSquare = square;
    legalMoveTargets = legalTargetsFor(square);
    buildBoard();
    return;
  }
  if (!legalMoveTargets.includes(square)) {
    selectedSquare = null;
    legalMoveTargets = [];
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

async function finishMatch(result, options = {}) {
  const review = options.review ?? true;
  matchResult.textContent = result;
  syncState.textContent = options.statusText || "Match ended";
  generateReviewButton.textContent = "View AI Review";
  window.clearInterval(clockInterval);
  if (backendOnline && currentMatchId) {
    try {
      const data = await api(`/api/matches/${currentMatchId}/end`, {
        method: "POST",
        body: { result },
      });
      renderMatch(data.match);
      await refreshStats();
    } catch (error) {
      syncState.textContent = error.message;
      return;
    }
  }
  if (review) await requestReview("the completed match");
}

function offerDraw() {
  if (!currentMatchId) {
    matchResult.textContent = "Start a game first";
    return;
  }
  if (drawOfferFromOpponent) {
    drawOfferFromOpponent = false;
    finishMatch("Draw agreed", { statusText: "Draw accepted" });
    return;
  }
  matchResult.textContent = "Draw offered";
  syncState.textContent = "Draw offer sent. Waiting for opponent.";
  sendSocketMessage({ type: "draw:offer", matchId: currentMatchId, from: voiceClientId });
}

function handleDrawOffer(message) {
  if (!message.matchId || message.matchId !== currentMatchId || message.from === voiceClientId) return;
  drawOfferFromOpponent = true;
  matchResult.textContent = "Draw offered by opponent";
  syncState.textContent = "Opponent offered a draw. Press 1/2 to accept.";
}

async function startQueue(label = "Searching for a safe partner with matching goals.", liveQueue = false, overrides = {}) {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  requestNotificationPermission();
  let seconds = 25;
  let progress = 22;
  cancelMatchSearchButton.hidden = false;
  queuePrompt.textContent = label;
  queueProgress.style.width = `${progress}%`;
  matchResult.textContent = "Searching";
  queueTime.textContent = "00:25";

  if (backendOnline) {
    try {
      const pool = selectedPool();
      const gameType = activeGameType();
      const endpoint = overrides.endpoint || (liveQueue ? "/api/matches/queue" : "/api/matches/start");
      const body = {
        mode: gameType.mode,
        poolId: pool.id,
        timeControl: pool.timeControl,
        rated: gameType.rated || pool.rated,
        partnerLanguage: partnerLanguage.value,
        goal: conversationGoal.value,
        ...(overrides.body || {}),
      };
      const data = await api(endpoint, {
        method: "POST",
        body,
      });

      if (data.waiting) {
        queuePrompt.textContent = "Waiting for a matching player.";
        queuePollInterval = setInterval(async () => {
          if (currentMatchId) {
            clearInterval(queuePollInterval);
            return;
          }
          try {
            const next = await api(endpoint, { method: "POST", body });
            if (!next.waiting) {
              clearInterval(queuePollInterval);
              clearInterval(queueInterval);
              renderMatch(next.match);
              matchResult.textContent = overrides.readyText || "Opponent matched";
              await refreshStats();
              await refreshLobby();
            }
          } catch {
            // Keep the visible queue running if a poll misses.
          }
        }, 1200);
      } else {
        renderMatch(data.match);
        matchResult.textContent = overrides.readyText || (liveQueue ? "Opponent matched" : "Game ready");
      }
      await refreshStats();
      await refreshLobby();
    } catch (error) {
      queuePrompt.textContent = error.message;
    }
  }

  queueInterval = setInterval(() => {
    seconds = Math.max(0, seconds - 1);
    progress = Math.min(95, progress + 3);
    queueTime.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    queueProgress.style.width = `${progress}%`;
    if (seconds <= 0) {
      seconds = 25;
      progress = 42;
    }
  }, 1000);
}

function cancelMatchSearch() {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  cancelMatchSearchButton.hidden = true;
  queueTime.textContent = "Choose mode";
  queueProgress.style.width = "0%";
  queuePrompt.textContent = "Search canceled. Choose how you want to play.";
  matchResult.textContent = "Canceled";
}

async function quickPairFromSelectedPool() {
  const pool = selectedPool();
  seekComposer.hidden = true;
  await startQueue(`Quick pair is searching ${pool.label} ${pool.name}.`, false, {
    endpoint: "/api/matches/quick-pair",
    readyText: "Quick pair matched",
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
    queuePrompt.textContent = "Start the backend to join live games.";
    return;
  }

  try {
    queuePrompt.textContent = `Joining ${seek.displayName}'s ${seek.timeControl} game.`;
    const data = await api(`/api/matches/seeks/${seek.id}/accept`, { method: "POST" });
    renderMatch(data.match);
    matchResult.textContent = "Game joined";
    await refreshStats();
    await refreshLobby();
  } catch (error) {
    queuePrompt.textContent = error.message;
  }
}

async function createOpenSeek() {
  const gameType = activeGameType();
  if (!backendOnline) {
    queuePrompt.textContent = "Start the backend and sign in to create a live game.";
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
    if (data.match) {
      renderMatch(data.match);
      matchResult.textContent = "Matched by settings";
      await refreshStats();
      await refreshLobby();
      return;
    }
    queuePrompt.textContent = `Game created. Waiting for ${data.seek.timeControl}, ${data.seek.partnerLanguage}, ${data.seek.goal}.`;
    cancelMatchSearchButton.hidden = false;
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

async function joinPrivateChallenge() {
  const code = privateChallengeInput.value.trim().toUpperCase();
  if (!code) {
    queuePrompt.textContent = "Enter a private challenge code first.";
    privateChallengeInput.focus();
    return;
  }
  if (!backendOnline) {
    queuePrompt.textContent = "Start the backend to join private challenges.";
    return;
  }

  try {
    queuePrompt.textContent = `Joining private challenge ${code}.`;
    const data = await api(`/api/challenges/${encodeURIComponent(code)}/accept`, { method: "POST" });
    privateChallengeInput.value = "";
    renderMatch(data.match);
    matchResult.textContent = "Private challenge joined";
    await refreshStats();
    await refreshLobby();
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

function initials(name = "CL") {
  return name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "CL";
}

function renderProfile(profile) {
  if (!profile?.user) return;
  const user = profile.user;
  profileAvatar.textContent = initials(user.displayName);
  profileName.textContent = user.displayName;
  profileEmail.textContent = user.email;
  profileLanguageText.textContent = user.languagePair || "Language pair not set";
  profileDisplayName.value = user.displayName || "";
  profileLanguagePair.value = user.languagePair || "English to Korean";
  profileBio.value = user.bio || "";
  updateTemperature(Number(user.mannerTemperature ?? currentManner));

  badgeList.innerHTML = "";
  profile.badges.forEach((badge) => {
    const item = document.createElement("span");
    item.textContent = badge.name;
    badgeList.append(item);
  });

  badgeDetails.innerHTML = "";
  profile.badges.forEach((badge) => {
    const item = document.createElement("p");
    item.innerHTML = `<strong>${badge.name}</strong> ${badge.detail}`;
    badgeDetails.append(item);
  });

  cultureGuideList.innerHTML = "";
  if (!profile.cultureGuide.length) {
    const empty = document.createElement("p");
    empty.textContent = "No culture notes saved yet.";
    cultureGuideList.append(empty);
  } else {
    profile.cultureGuide.forEach((entry) => {
      const item = document.createElement("p");
      item.innerHTML = `<strong>${entry.source || "Culture note"}</strong> ${entry.note}`;
      cultureGuideList.append(item);
    });
  }

  profileStatus.textContent = `${profile.stats.matches} match(es), ${profile.stats.reviews} review(s), ${profile.stats.cultureNotes} culture note(s).`;
}

function clearProfile() {
  profileAvatar.textContent = "CL";
  profileName.textContent = "ChessLearner";
  profileEmail.textContent = "player@example.com";
  profileLanguageText.textContent = "Sign in to load language settings.";
  profileDisplayName.value = "";
  profileLanguagePair.value = "English to Korean";
  profileBio.value = "";
  badgeList.innerHTML = "";
  badgeDetails.innerHTML = "";
  cultureGuideList.innerHTML = "";
  profileStatus.textContent = "Sign in to load your saved profile.";
}

async function refreshProfile() {
  if (!backendOnline) {
    profileStatus.textContent = "Start the backend to use profile tools.";
    return;
  }
  if (!currentUser) {
    profileStatus.textContent = "Sign in to load your saved profile.";
    return;
  }

  profileStatus.textContent = "Loading profile...";
  try {
    const profile = await api("/api/profile");
    currentUser = profile.user;
    renderProfile(profile);
    renderAuthState();
  } catch (error) {
    profileStatus.textContent = error.message;
  }
}

async function saveProfile() {
  try {
    profileStatus.textContent = "Saving profile...";
    const profile = await api("/api/profile", {
      method: "PUT",
      body: {
        displayName: profileDisplayName.value,
        languagePair: profileLanguagePair.value,
        bio: profileBio.value,
      },
    });
    currentUser = profile.user;
    renderProfile(profile);
    authStatus.textContent = `Signed in as ${currentUser.displayName}`;
    renderAuthState();
  } catch (error) {
    profileStatus.textContent = error.message;
  }
}

async function submitPeerFeedback() {
  try {
    profileStatus.textContent = "Submitting feedback...";
    const data = await api("/api/profile/feedback", {
      method: "POST",
      body: {
        kind: peerFeedbackType.value,
        note: peerFeedbackNote.value,
        matchId: currentMatchId,
      },
    });
    peerFeedbackNote.value = "";
    if (data.profile) renderProfile(data.profile);
    profileStatus.textContent = currentMatchId
      ? `Feedback saved for ${data.target?.displayName || "your match partner"}.`
      : "Feedback saved to your profile history.";
  } catch (error) {
    profileStatus.textContent = error.message;
  }
}

async function saveCultureGuide() {
  try {
    const note = cultureGuideInput.value.trim();
    if (!note) {
      profileStatus.textContent = "Enter a culture note first.";
      return;
    }
    profileStatus.textContent = "Saving culture note...";
    const profile = await api("/api/profile/culture-guide", {
      method: "POST",
      body: { note, source: "Culture Guide" },
    });
    cultureGuideInput.value = "";
    renderProfile(profile);
  } catch (error) {
    profileStatus.textContent = error.message;
  }
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

function browserSpeechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function sttLanguage() {
  return sttSourceLanguage.value || navigator.language || "en-US";
}

function sttSpeakerName() {
  return currentUser?.displayName || "You";
}

function originalSubtitleContainers() {
  return [originalSpeech, matchOriginalSpeech].filter(Boolean);
}

function translatedSubtitleContainers() {
  return [translatedSpeech, matchTranslatedSpeech].filter(Boolean);
}

function setSttButtonText(text) {
  activateStt.textContent = text;
  if (matchActivateStt) matchActivateStt.textContent = text;
}

function setSttStatus(active, detail = "") {
  sttListening = active;
  sttPill.textContent = active ? "Captions listening" : "Captions paused";
  if (sttStatusText) sttStatusText.textContent = detail || (active ? "Listening" : "Paused");
  if (matchSttStatus) matchSttStatus.textContent = detail || (active ? "Listening" : "Paused");
  setSttButtonText(active ? "Stop captions" : "Start captions");
}

function updateSessionDuration() {
  if (!sttSessionStart) {
    sessionDuration.textContent = "00:00";
    if (matchSessionDuration) matchSessionDuration.textContent = "00:00";
    return;
  }
  const elapsed = Math.floor((Date.now() - sttSessionStart) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const text = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  sessionDuration.textContent = text;
  if (matchSessionDuration) matchSessionDuration.textContent = text;
}

function startSessionTimer() {
  if (!sttSessionStart) sttSessionStart = Date.now();
  updateSessionDuration();
  window.clearInterval(sttSessionTimer);
  sttSessionTimer = window.setInterval(updateSessionDuration, 1000);
}

function stopSessionTimer() {
  window.clearInterval(sttSessionTimer);
  sttSessionTimer = null;
}

function subtitleTranslation(text) {
  const target = subtitleTargetLanguage.value || "Korean";
  return `Translation pending (${target}): ${text}`;
}

async function translateSubtitleText(text, options = {}) {
  if (!backendOnline || !currentUser) {
    return { text: subtitleTranslation(text), provider: "fallback" };
  }
  try {
    const data = await api("/api/translate", {
      method: "POST",
      body: {
        text,
        sourceLanguage: options.sourceLanguage || sttSourceLanguage.value || navigator.language || "en-US",
        targetLanguage: subtitleTargetLanguage.value,
      },
    });
    return { text: data.translation?.text || subtitleTranslation(text), provider: "mymemory" };
  } catch (error) {
    return { text: `Translation unavailable: ${text}`, provider: "fallback", error: error.message };
  }
}

function subtitlePlaceholder(text) {
  const line = document.createElement("p");
  line.className = "subtitle-placeholder";
  line.textContent = text;
  return line;
}

function resetSubtitlePlaceholders() {
  originalSubtitleContainers().forEach((container) => {
    container.replaceChildren(subtitlePlaceholder("Start captions, allow microphone access, then speak."));
  });
  translatedSubtitleContainers().forEach((container) => {
    container.replaceChildren(subtitlePlaceholder("Live captions capture speech first. Translation appears here."));
  });
}

function clearSubtitlePlaceholders() {
  [...originalSubtitleContainers(), ...translatedSubtitleContainers()].forEach((container) => {
    container.querySelectorAll(".subtitle-placeholder").forEach((line) => line.remove());
  });
}

function appendSubtitleLine(container, speaker, text, className = "") {
  clearSubtitlePlaceholders();
  const line = document.createElement("p");
  if (className) line.className = className;
  const name = document.createElement("strong");
  name.textContent = `${speaker}:`;
  line.append(name, document.createTextNode(` ${text}`));
  container.append(line);
  container.scrollTop = container.scrollHeight;
  return line;
}

function appendSubtitleLines(containers, speaker, text, className = "") {
  return containers.map((container) => appendSubtitleLine(container, speaker, text, className));
}

async function persistSubtitleLine(text, translation, speaker = sttSpeakerName()) {
  if (!backendOnline || !currentMatchId) return;
  try {
    await api(`/api/matches/${currentMatchId}/transcript`, {
      method: "POST",
      body: {
        speaker,
        text,
        translation,
        kind: "speech",
      },
    });
  } catch {
    // Keep live captions running even when transcript persistence is unavailable.
  }
}

function appendRecognizedSpeech(text) {
  const phrase = String(text || "").trim();
  if (!phrase) return;
  const speaker = sttSpeakerName();

  appendFinalSubtitle({ speaker, text: phrase, sourceLanguage: sttLanguage(), persist: true });
  sendSubtitleSignal({ text: phrase });
}

function appendFinalSubtitle({ speaker, text, sourceLanguage, persist = false }) {
  const phrase = String(text || "").trim();
  if (!phrase) return;

  appendSubtitleLines(originalSubtitleContainers(), speaker, phrase);
  const translatedLines = appendSubtitleLines(translatedSubtitleContainers(), speaker, "Translating...");
  const nextWords = Number(wordsRecognized.textContent || 0) + phrase.split(/\s+/).filter(Boolean).length;
  wordsRecognized.textContent = String(nextWords);
  if (matchWordsRecognized) matchWordsRecognized.textContent = String(nextWords);

  const latency = 80 + Math.floor(Math.random() * 80);
  if (latencyText) latencyText.textContent = `${latency} ms`;
  dashboardLatency.textContent = `${latency} ms`;

  translateSubtitleText(phrase, { sourceLanguage }).then((result) => {
    translatedLines.forEach((line) => {
      line.replaceChildren();
      const name = document.createElement("strong");
      name.textContent = `${speaker}:`;
      line.append(name, document.createTextNode(` ${result.text}`));
    });
    if (persist) persistSubtitleLine(phrase, result.text, speaker);
    if (result.provider === "mymemory") {
      if (sttStatusText) sttStatusText.textContent = "Translated";
      if (matchSttStatus) matchSttStatus.textContent = "Translated";
    }
  });
}

function updateInterimSpeech(text) {
  const phrase = String(text || "").trim();
  if (!phrase) {
    removeInterimSpeech();
    return;
  }
  if (!sttInterimLines.length) {
    sttInterimLines = appendSubtitleLines(originalSubtitleContainers(), sttSpeakerName(), phrase, "interim");
    return;
  }
  sttInterimLines.forEach((line) => {
    line.replaceChildren();
    const name = document.createElement("strong");
    name.textContent = `${sttSpeakerName()}:`;
    line.append(name, document.createTextNode(` ${phrase}`));
    line.parentElement.scrollTop = line.parentElement.scrollHeight;
  });
}

function removeInterimSpeech() {
  sttInterimLines.forEach((line) => line.remove());
  sttInterimLines = [];
}

function stopBrowserStt() {
  sttShouldRestart = false;
  if (speechRecognition) {
    speechRecognition.onend = null;
    try {
      speechRecognition.stop();
    } catch {
      // Browser speech recognition may already be stopped.
    }
    speechRecognition = null;
  }
  removeInterimSpeech();
  stopSessionTimer();
  setSttStatus(false, "Captions stopped.");
}

function startBrowserStt() {
  const Recognition = browserSpeechRecognitionCtor();
  if (!Recognition) {
    sttToggle.checked = false;
    setSttStatus(false, "Live captions need Chrome or another browser with speech recognition support.");
    return;
  }
  if (!isSecureVoiceContext()) {
    sttToggle.checked = false;
    setSttStatus(false, "Caption microphone access needs HTTPS. Render is OK, and localhost is OK.");
    return;
  }

  if (speechRecognition) stopBrowserStt();

  speechRecognition = new Recognition();
  speechRecognition.lang = sttLanguage();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.maxAlternatives = 1;
  sttShouldRestart = true;
  sttToggle.checked = true;
  startSessionTimer();
  setSttStatus(true, "Listening for speech...");

  speechRecognition.onresult = (event) => {
    let finalText = "";
    let interimText = "";
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index];
      const transcript = result[0]?.transcript || "";
      if (result.isFinal) finalText += transcript;
      else interimText += transcript;
    }
    if (finalText.trim()) {
      removeInterimSpeech();
      appendRecognizedSpeech(finalText);
    } else {
      updateInterimSpeech(interimText);
    }
  };

  speechRecognition.onerror = (event) => {
    if (event.error === "no-speech") {
      setSttStatus(true, "Listening");
      return;
    }
    sttShouldRestart = false;
    sttToggle.checked = false;
    stopSessionTimer();
    const message = event.error === "not-allowed"
      ? "Mic permission blocked"
      : `Caption issue: ${event.error || "stopped"}`;
    setSttStatus(false, message);
  };

  speechRecognition.onend = () => {
    speechRecognition = null;
    if (sttShouldRestart && sttToggle.checked) {
      window.setTimeout(() => {
        if (sttShouldRestart && sttToggle.checked && !speechRecognition) startBrowserStt();
      }, 350);
      return;
    }
    stopSessionTimer();
    setSttStatus(false, "Captions stopped.");
  };

  try {
    speechRecognition.start();
  } catch (error) {
    sttShouldRestart = false;
    sttToggle.checked = false;
    setSttStatus(false, `Caption error: ${error.message}`);
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
  speakText(phrase, {
    lang,
    label: phrase,
    statusElement: pronunciationStatus,
  });
}

resetSubtitlePlaceholders();
renderForumPosts();

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  closeProfileMenu();
  toggleMenu();
});

document.addEventListener("click", (event) => {
  if (!sidebarMenu.hidden && !sidebarMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  if (!headerProfileMenu.hidden && !headerProfile.contains(event.target)) closeProfileMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeProfileMenu();
  }
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
  if (event.key.length !== 1) return;
  adminCommandBuffer = `${adminCommandBuffer}${event.key.toLowerCase()}`.slice(-5);
  if (adminCommandBuffer === "admin") {
    adminCommandBuffer = "";
    revealAdminByCommand();
  }
});

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

googleSignInButton.addEventListener("click", signInWithGoogle);
headerProfileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleProfileMenu();
});
headerSignOutButton.addEventListener("click", signOut);
deleteAccountButton.addEventListener("click", deleteAccount);
contrastModeButton.addEventListener("click", toggleContrastMode);
largeTextButton.addEventListener("click", toggleLargeTextMode);

signupButton.addEventListener("click", () => {
  if (currentUser) {
    signOut();
    return;
  }
  setAuthMode("signup");
});

loginButton.addEventListener("click", () => {
  if (currentUser) {
    setView("match");
    return;
  }
  setAuthMode("login");
});

notificationButton.addEventListener("click", async () => {
  const willOpen = notificationPanel.hidden;
  notificationPanel.hidden = !willOpen;
  notificationButton.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) closeProfileMenu();
  if (willOpen) {
    unreadNotifications = 0;
    renderNotifications();
    await requestNotificationPermission();
  }
});

clearNotificationsButton.addEventListener("click", () => {
  notifications = [];
  unreadNotifications = 0;
  renderNotifications();
});

continueToDashboardButton.addEventListener("click", () => {
  setView("match");
});

findMatchButton.addEventListener("click", quickPairFromSelectedPool);
cancelMatchSearchButton.addEventListener("click", cancelMatchSearch);
showCreateSeekButton.addEventListener("click", () => {
  seekComposer.hidden = false;
  queuePrompt.textContent = "Choose settings, then create a game.";
  seekTimeControl.focus();
});
showFriendRoomButton.addEventListener("click", () => {
  friendRoomDialog.showModal();
  privateChallengeInput.focus();
});
closeFriendRoomButton.addEventListener("click", () => friendRoomDialog.close());
createSeekButton.addEventListener("click", createOpenSeek);
refreshLobbyButton.addEventListener("click", refreshLobby);
createPrivateChallengeButton.addEventListener("click", createPrivateChallenge);
joinPrivateChallengeButton.addEventListener("click", joinPrivateChallenge);
privateChallengeInput.addEventListener("input", () => {
  privateChallengeInput.value = privateChallengeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
});
privateChallengeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    joinPrivateChallenge();
  }
});
copyMatchRoomLinkButton.addEventListener("click", copyRoomLink);
refreshAdminButton.addEventListener("click", refreshAdmin);
adminMatchSearch.addEventListener("input", () => {
  if (cachedAdminData) renderAdminOverview(cachedAdminData);
});
adminUserSearch.addEventListener("input", () => {
  if (cachedAdminData) renderAdminOverview(cachedAdminData);
});
refreshProfileButton.addEventListener("click", refreshProfile);
saveProfileButton.addEventListener("click", saveProfile);
submitPeerFeedbackButton.addEventListener("click", submitPeerFeedback);
saveCultureGuideButton.addEventListener("click", saveCultureGuide);
showForumComposerButton.addEventListener("click", toggleForumComposer);
publishForumPostButton.addEventListener("click", publishForumPost);
forumFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    forumFilter = button.dataset.forumFilter;
    renderForumPosts();
  });
});
document.querySelectorAll("[data-shop-interest]").forEach((button) => {
  button.addEventListener("click", () => saveShopInterest(button.dataset.shopInterest));
});

resignMatchButton.addEventListener("click", () => finishMatch("Resigned"));
drawMatchButton.addEventListener("click", offerDraw);

partnerLanguage.addEventListener("change", () => {
  partnerName.textContent = `Mina K. (${partnerLanguage.value})`;
});

startVoiceCallButton.addEventListener("click", startVoiceCall);
endVoiceCallButton.addEventListener("click", () => endVoiceCall(true));

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
  if (active) {
    startBrowserStt();
  } else {
    stopBrowserStt();
  }
});

translationToggle.addEventListener("change", () => {
  translatedSpeech.hidden = !translationToggle.checked;
  if (matchTranslatedSpeech) matchTranslatedSpeech.hidden = !translationToggle.checked;
});

subtitleSize.addEventListener("change", () => {
  [originalSpeech, translatedSpeech].forEach((block) => {
    block.classList.remove("small", "large");
    if (subtitleSize.value !== "medium") block.classList.add(subtitleSize.value);
  });
});

contrastToggle.addEventListener("change", () => {
  document.querySelector('[data-view="stt"]').classList.toggle("high-contrast", contrastToggle.checked);
  document.body.classList.toggle("high-contrast-mode", contrastToggle.checked);
  contrastModeButton.setAttribute("aria-pressed", String(contrastToggle.checked));
});

activateStt.addEventListener("click", async () => {
  if (sttListening) {
    sttToggle.checked = false;
    stopBrowserStt();
  } else {
    sttToggle.checked = true;
    startBrowserStt();
  }
});

matchActivateStt.addEventListener("click", () => {
  if (sttListening) {
    sttToggle.checked = false;
    stopBrowserStt();
  } else {
    sttToggle.checked = true;
    startBrowserStt();
  }
});

sttSourceLanguage.addEventListener("change", () => {
  matchSttSourceLanguage.value = sttSourceLanguage.value;
  if (!sttListening) return;
  stopBrowserStt();
  sttToggle.checked = true;
  startBrowserStt();
});

matchSttSourceLanguage.addEventListener("change", () => {
  sttSourceLanguage.value = matchSttSourceLanguage.value;
  if (!sttListening) return;
  stopBrowserStt();
  sttToggle.checked = true;
  startBrowserStt();
});

subtitleTargetLanguage.addEventListener("change", () => {
  matchSubtitleTargetLanguage.value = subtitleTargetLanguage.value;
});

matchSubtitleTargetLanguage.addEventListener("change", () => {
  subtitleTargetLanguage.value = matchSubtitleTargetLanguage.value;
});

generateReviewButton.addEventListener("click", () => requestReview("the completed match"));
refreshReviewButton.addEventListener("click", () => requestReview("the latest transcript sample"));

document.querySelectorAll(".vocab-term").forEach((button) => {
  button.addEventListener("click", () => playPronunciation(button));
});

document.querySelectorAll(".inbox-item").forEach((item) => {
  item.addEventListener("click", () => {
    speakText(item.dataset.voiceText || item.textContent, {
      lang: item.dataset.voiceLang || "en-US",
      label: "voice letter",
    });
  });
});

buildBoard();
renderReview(defaultReview);
updateRoomLink(null);
renderAuthState();
checkBackend();
