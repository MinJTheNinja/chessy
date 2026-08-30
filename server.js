const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const zlib = require("zlib");
const util = require("util");
const { URL } = require("url");
const { Chess } = require("chess.js");
const { Pool } = require("pg");

const rootDir = __dirname;
const dataDir = path.join(rootDir, ".localappdata", "live-chess");
const dbPath = path.join(dataDir, "db.json");
const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL;
const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashRedisRestToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const nvidiaApiKey = process.env.NVIDIA_API_KEY;
const nvidiaApiBaseUrl = (process.env.NVIDIA_API_BASE_URL || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "");
const nvidiaTranslationModel = process.env.NVIDIA_TRANSLATION_MODEL || "nvidia/riva-translate-4b-instruct-v1.1";
const nvidiaSafetyModel = process.env.NVIDIA_SAFETY_MODEL || "nvidia/nemotron-3.5-content-safety";
const meteredTurnApiUrl = String(process.env.METERED_TURN_API_URL || "").trim().replace(/\/$/, "");
const meteredTurnApiKey = process.env.METERED_TURN_API_KEY;
const googleClientId = String(process.env.GOOGLE_CLIENT_ID || "").trim();
const staffEmails = new Set(
  String(process.env.STAFF_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);
const myMemoryEmail = process.env.MYMEMORY_EMAIL;
const myMemoryEndpoint = (process.env.MYMEMORY_ENDPOINT || "https://api.mymemory.translated.net").replace(/\/$/, "");
const redisEnabled = Boolean(upstashRedisRestUrl && upstashRedisRestToken);
const nvidiaEnabled = Boolean(nvidiaApiKey);
const rateLimitBuckets = new Map();
let cachedIceServers = null;
let cachedIceServersAt = 0;
let cachedGoogleKeys = null;
let cachedGoogleKeysAt = 0;
const pieceEditions = new Set(["original", "cheoinseong", "beta"]);
const dayMs = 24 * 60 * 60 * 1000;
let streakTimeZone = String(process.env.STREAK_TIME_ZONE || "Asia/Seoul").trim() || "Asia/Seoul";
let streakDateFormatter;
try {
  streakDateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: streakTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
} catch {
  streakTimeZone = "Asia/Seoul";
  streakDateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: streakTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
const trainingModules = [
  { id: 1, title: "기물의 움직임", src: "/assets/how-to-play.html?module=1&v=20260829-tutorial-fixes" },
  { id: 2, title: "기물 잡기", src: "/assets/how-to-play.html?module=2&v=20260829-tutorial-fixes" },
  { id: 3, title: "체크에서 벗어나기", src: "/assets/how-to-play.html?module=3&v=20260829-tutorial-fixes" },
  { id: 4, title: "체크메이트", src: "/assets/how-to-play.html?module=4&v=20260829-tutorial-fixes" },
];
const pgPool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: /sslmode=require|ssl=true/i.test(databaseUrl) || process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 10000),
    })
  : null;
let pgReady = null;
let storageReady = !pgPool;
let storageError = null;
let storageRetryTimer = null;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".stl": "model/stl",
};
const compressibleExtensions = new Set([".html", ".css", ".js", ".json", ".svg"]);
const gzipAsync = util.promisify(zlib.gzip);
const brotliAsync = util.promisify(zlib.brotliCompress);
const staticTextCache = new Map();
let localDbCache = null;
let localDbWriteQueue = Promise.resolve();

const sampleTranscript = [
  {
    speaker: "Mina",
    text: "I usually play the London System when I want a calm position.",
    translation: "Korean: I usually play the London System when I want a calm position.",
    kind: "speech",
    at: new Date().toISOString(),
  },
  {
    speaker: "You",
    text: "That makes sense. Your bishop move controls the center nicely.",
    translation: "Korean: That makes sense. Your bishop move controls the center nicely.",
    kind: "speech",
    at: new Date().toISOString(),
  },
  {
    speaker: "Mina",
    text: "GG, that knight fork was really strong.",
    translation: "Korean: GG, that knight fork was really strong.",
    kind: "speech",
    at: new Date().toISOString(),
  },
];

const quickPools = [
  {
    id: "bullet-1-0",
    label: "1+0",
    name: "Bullet",
    timeControl: "1+0",
    rated: false,
    description: "Fast chess, short phrases",
  },
  {
    id: "blitz-3-2",
    label: "3+2",
    name: "Blitz",
    timeControl: "3+2",
    rated: false,
    description: "Quick talk between moves",
  },
  {
    id: "rapid-10-0",
    label: "10+0",
    name: "Rapid Talk",
    timeControl: "10+0",
    rated: false,
    description: "Best for caption practice",
  },
  {
    id: "classical-30-0",
    label: "30+0",
    name: "Study",
    timeControl: "30+0",
    rated: false,
    description: "Slow game, deeper review",
  },
];

const vocabularyTemplates = [
  {
    term: "calm position",
    translation: "Korean: calm position",
    context: "Used when a player described choosing a quiet opening before attacking.",
    triggers: ["calm position", "quiet opening"],
  },
  {
    term: "London System",
    translation: "Korean: London System",
    context: "A chess opening discussed as a stable plan for language practice and chess learning.",
    triggers: ["london system"],
  },
  {
    term: "knight fork",
    translation: "Korean: knight fork",
    context: "Used when a knight attacked two pieces at the same time.",
    triggers: ["knight fork", "fork"],
  },
  {
    term: "center control",
    translation: "Korean: center control",
    context: "Used while explaining why a bishop or pawn move was strategically useful.",
    triggers: ["center", "controls the center", "center control"],
  },
  {
    term: "protect my king",
    translation: "Korean: protect my king",
    context: "Used to explain defensive play before starting an attack.",
    triggers: ["protect my king", "king"],
  },
  {
    term: "good game",
    translation: "Korean: good game",
    context: "A polite closing phrase after the match result.",
    triggers: ["good game", "gg"],
  },
  {
    term: "replay that move",
    translation: "Korean: replay that move",
    context: "Useful when asking a partner to review a move from the match.",
    triggers: ["replay", "that move"],
  },
  {
    term: "bishop move",
    translation: "Korean: bishop move",
    context: "Used when reviewing how a bishop affected the position.",
    triggers: ["bishop"],
  },
  {
    term: "sportsmanship",
    translation: "Korean: sportsmanship",
    context: "Used when discussing respectful behavior after a game.",
    triggers: ["respect", "sportsmanship", "gg"],
  },
];

function defaultDb() {
  return {
    users: [],
    sessions: [],
    queue: [],
    seeks: [],
    challenges: [],
    matches: [],
    voiceLetters: [],
    reviews: [],
    reports: [],
    shopInterests: [],
    leagues: [],
    forumPosts: [],
  };
}

function normalizeDb(db = {}) {
  return {
    ...defaultDb(),
    ...db,
    users: db.users || [],
    sessions: db.sessions || [],
    queue: db.queue || [],
    seeks: db.seeks || [],
    challenges: db.challenges || [],
    matches: db.matches || [],
    voiceLetters: db.voiceLetters || [],
    reviews: db.reviews || [],
    reports: db.reports || [],
    shopInterests: db.shopInterests || [],
    leagues: db.leagues || [],
    forumPosts: Array.isArray(db.forumPosts) ? db.forumPosts : [],
  };
}

function ensureJsonDb() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(normalizeDb(defaultDb()), null, 2), "utf8");
  }
}

async function readJsonDb() {
  ensureJsonDb();
  if (localDbCache) return localDbCache;
  const source = await fs.promises.readFile(dbPath, "utf8");
  localDbCache = normalizeDb(JSON.parse(source));
  return localDbCache;
}

async function writeJsonDb(db) {
  const normalized = normalizeDb(db);
  const payload = JSON.stringify(normalized, null, 2);
  localDbCache = normalized;
  localDbWriteQueue = localDbWriteQueue.catch(() => {}).then(async () => {
    await fs.promises.mkdir(dataDir, { recursive: true });
    await fs.promises.writeFile(dbPath, payload, "utf8");
  });
  await localDbWriteQueue;
}

async function ensurePostgresDb() {
  if (!pgPool) return;
  if (!pgReady) {
    pgReady = (async () => {
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS app_state (
          id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await pgPool.query(
        `
          INSERT INTO app_state (id, data)
          VALUES ($1, $2::jsonb)
          ON CONFLICT (id) DO NOTHING
        `,
        ["main", JSON.stringify(defaultDb())],
      );
    })().catch((error) => {
      pgReady = null;
      throw error;
    });
  }
  await pgReady;
}

async function ensureDb() {
  if (pgPool) {
    await ensurePostgresDb();
    return;
  }
  ensureJsonDb();
}

function initializeStorage() {
  ensureDb()
    .then(() => {
      storageReady = true;
      storageError = null;
      console.log(`Storage ready (${pgPool ? "postgres" : "local-json"}).`);
    })
    .catch((error) => {
      storageReady = false;
      storageError = error;
      console.error("Storage initialization failed; retrying in 10 seconds:", error.message || error);
      clearTimeout(storageRetryTimer);
      storageRetryTimer = setTimeout(initializeStorage, 10000);
      storageRetryTimer.unref?.();
    });
}

async function readDb() {
  if (!pgPool) return readJsonDb();
  await ensurePostgresDb();
  const result = await pgPool.query("SELECT data FROM app_state WHERE id = $1", ["main"]);
  return normalizeDb(result.rows[0]?.data || defaultDb());
}

async function writeDb(db) {
  if (!pgPool) {
    await writeJsonDb(db);
    return;
  }
  await ensurePostgresDb();
  await pgPool.query(
    `
      INSERT INTO app_state (id, data, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (id)
      DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    `,
    ["main", JSON.stringify(normalizeDb(db))],
  );
}

async function redisCommand(command) {
  if (!redisEnabled) return null;
  try {
    const response = await fetch(upstashRedisRestUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${upstashRedisRestToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(command),
    });
    if (!response.ok) throw new Error(`Redis ${response.status}`);
    const data = await response.json().catch(() => ({}));
    return data.result;
  } catch (error) {
    console.warn(`Redis unavailable: ${error.message}`);
    return null;
  }
}

function redisRoomPayload(match) {
  return {
    id: match.id,
    status: match.status,
    players: match.players || [],
    timeControl: match.timeControl || "10+0",
    partnerLanguage: match.partnerLanguage || "English",
    goal: match.goal || "Explain chess moves",
    result: match.result || "In progress",
    clocks: liveClockState(match),
    updatedAt: new Date().toISOString(),
  };
}

async function syncRedisRoom(match) {
  if (!match?.id || !redisEnabled) return;
  await redisCommand(["SET", `room:${match.id}`, JSON.stringify(redisRoomPayload(match)), "EX", "86400"]);
  await redisCommand(["SADD", "rooms:active", match.id]);
}

async function touchRedisPresence(matchId, clientId) {
  if (!matchId || !clientId || !redisEnabled) return;
  const key = `room:${matchId}:presence:${clientId}`;
  await redisCommand(["SET", key, JSON.stringify({ clientId, matchId, at: new Date().toISOString() }), "EX", "90"]);
  await redisCommand(["SADD", `room:${matchId}:clients`, clientId]);
  await redisCommand(["EXPIRE", `room:${matchId}:clients`, "86400"]);
}

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!stored) return false;
  const [salt] = stored.split(":");
  return hashPassword(password, salt) === stored;
}

function sendJson(res, status, data, headers = {}) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    ...headers,
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
  });
}

function normalizeTranslationLanguage(value, fallback = "en") {
  const language = String(value || "").trim().toLowerCase();
  const aliases = {
    english: "en",
    korean: "ko",
    thai: "th",
    japanese: "ja",
    "en-us": "en",
    "en-gb": "en",
    "ko-kr": "ko",
    "th-th": "th",
    "ja-jp": "ja",
  };
  if (!language) return fallback;
  return aliases[language] || language.split("-")[0] || fallback;
}

function truncateUtf8(text, maxBytes = 480) {
  let phrase = String(text || "").trim();
  while (Buffer.byteLength(phrase, "utf8") > maxBytes) {
    phrase = phrase.slice(0, -1);
  }
  return phrase;
}

function translationLanguageName(value, fallback = "English") {
  const code = normalizeTranslationLanguage(value, "").toLowerCase();
  const names = {
    en: "English",
    ko: "Korean",
    th: "Thai",
    ja: "Japanese",
    zh: "Chinese",
    es: "Spanish",
    fr: "French",
    de: "German",
    vi: "Vietnamese",
  };
  return names[code] || String(value || fallback).trim() || fallback;
}

async function callNvidiaChat({ model, messages, maxTokens = 256, temperature = 0, extra = {} }) {
  if (!nvidiaApiKey) {
    const error = new Error("NVIDIA API key is not configured.");
    error.statusCode = 503;
    throw error;
  }

  const response = await fetch(`${nvidiaApiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${nvidiaApiKey}`,
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false,
      ...extra,
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.error?.message || data?.detail || `NVIDIA API failed with ${response.status}.`;
    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }
  if (response.status === 202) {
    const error = new Error("NVIDIA API returned a pending response. Try again in a moment.");
    error.statusCode = 503;
    throw error;
  }

  return String(data?.choices?.[0]?.message?.content || data?.output || "").trim();
}

async function translateWithNvidia({ text, targetLanguage, sourceLanguage }) {
  const phrase = truncateUtf8(text);
  if (!phrase) {
    const error = new Error("Text is required.");
    error.statusCode = 400;
    throw error;
  }

  const target = normalizeTranslationLanguage(targetLanguage, "ko");
  const source = normalizeTranslationLanguage(sourceLanguage, "en");
  const sourceName = translationLanguageName(sourceLanguage, "source language");
  const targetName = translationLanguageName(targetLanguage, "target language");
  const translated = await callNvidiaChat({
    model: nvidiaTranslationModel,
    messages: [
      {
        role: "system",
        content:
          "You are a real-time subtitle translator for a chess voice chat. Translate only the user's text. Do not add explanations, labels, quotation marks, or extra commentary.",
      },
      {
        role: "user",
        content: `Translate from ${sourceName} to ${targetName}:\n${phrase}`,
      },
    ],
    maxTokens: 180,
    temperature: 0,
  });

  return {
    text: translated || phrase,
    to: target,
    from: source,
    provider: "nvidia",
    model: nvidiaTranslationModel,
  };
}

async function translateWithMyMemory({ text, targetLanguage, sourceLanguage }) {
  const phrase = truncateUtf8(text);
  if (!phrase) {
    const error = new Error("Text is required.");
    error.statusCode = 400;
    throw error;
  }

  const target = normalizeTranslationLanguage(targetLanguage, "ko");
  const source = normalizeTranslationLanguage(sourceLanguage, "en");
  const url = new URL("/get", myMemoryEndpoint);
  url.searchParams.set("q", phrase);
  url.searchParams.set("langpair", `${source}|${target}`);
  if (myMemoryEmail) url.searchParams.set("de", myMemoryEmail);

  const response = await fetch(url);

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(data?.responseDetails || "MyMemory translation failed.");
    error.statusCode = response.status;
    throw error;
  }
  if (data?.responseStatus && Number(data.responseStatus) >= 400) {
    const error = new Error(data.responseDetails || "MyMemory translation failed.");
    error.statusCode = data.responseStatus;
    throw error;
  }

  return {
    text: data?.responseData?.translatedText || phrase,
    to: target,
    from: source,
    match: data?.responseData?.match || null,
    provider: "mymemory",
  };
}

async function translateText({ text, targetLanguage, sourceLanguage }) {
  if (nvidiaEnabled) {
    try {
      return await translateWithNvidia({ text, targetLanguage, sourceLanguage });
    } catch (error) {
      console.warn(`NVIDIA translation unavailable: ${error.message}`);
    }
  }
  return translateWithMyMemory({ text, targetLanguage, sourceLanguage });
}

function localSafetyHeuristic(text) {
  const phrase = String(text || "").toLowerCase();
  const profanityPatterns = [
    /\bf+u+c+k+\b/i,
    /\bs+h+i+t+\b/i,
    /\bb+i+t+c+h+\b/i,
    /\ba+s+s+h+o+l+e+\b/i,
    /\bidiot\b/i,
    /\bstupid\b/i,
    /씨발|시발|ㅅㅂ|병신|ㅂㅅ|꺼져|좆|개새/i,
  ];
  const harassmentPatterns = [
    /\bkill yourself\b/i,
    /\bi hate you\b/i,
    /\byou suck\b/i,
    /죽어|나가 죽어|혐오/i,
  ];
  const matched = profanityPatterns.some((pattern) => pattern.test(phrase));
  const severe = harassmentPatterns.some((pattern) => pattern.test(phrase));
  return {
    flagged: matched || severe,
    severity: severe ? "high" : matched ? "medium" : "low",
    categories: [...(matched ? ["profanity"] : []), ...(severe ? ["harassment"] : [])],
    source: "local",
    reason: matched || severe ? "Possible profanity or disrespectful speech detected." : "No local safety issue detected.",
  };
}

function parseNvidiaSafetyResult(raw) {
  const text = String(raw || "").trim();
  const lowered = text.toLowerCase();
  const local = localSafetyHeuristic(text);
  const flagged =
    local.flagged ||
    /\bunsafe\b/.test(lowered) ||
    /\btoxic\b/.test(lowered) ||
    /\bharassment\b/.test(lowered) ||
    /\bhate\b/.test(lowered) ||
    /\bprofanity\b/.test(lowered);
  const safe = /\bsafe\b/.test(lowered) && !flagged;
  return {
    flagged: flagged && !safe,
    severity: /\bhigh\b|\bsevere\b/.test(lowered) ? "high" : flagged ? "medium" : "low",
    categories: [
      ...new Set([
        ...local.categories,
        ...(["profanity", "harassment", "hate", "threat", "toxic"].filter((category) => lowered.includes(category))),
      ]),
    ],
    source: "nvidia",
    reason: text.slice(0, 280) || "No safety issue detected.",
  };
}

async function detectUnsafeText(text) {
  const local = localSafetyHeuristic(text);
  if (!String(text || "").trim()) return local;

  if (!nvidiaEnabled) return local;

  try {
    const raw = await callNvidiaChat({
      model: nvidiaSafetyModel,
      messages: [
        {
          role: "user",
          content:
            `Classify this chess voice-chat transcript for profanity, harassment, hate, threats, or disrespectful behavior. ` +
            `Return a short result with safe or unsafe, severity, categories, and reason.\n\nTranscript:\n${truncateUtf8(text, 1600)}`,
        },
      ],
      maxTokens: 220,
      temperature: 0,
      extra: {
        chat_template_kwargs: {
          request_categories: "/categories",
        },
      },
    });
    const modelResult = parseNvidiaSafetyResult(raw);
    return {
      ...modelResult,
      flagged: modelResult.flagged || local.flagged,
      severity: modelResult.severity === "low" && local.flagged ? local.severity : modelResult.severity,
      categories: [...new Set([...modelResult.categories, ...local.categories])],
    };
  } catch (error) {
    console.warn(`NVIDIA safety unavailable: ${error.message}`);
    return local;
  }
}

function transcriptSpeakerUser(match, item, db) {
  const speaker = String(item?.speaker || "").trim().toLowerCase();
  const player = (match.players || []).find((entry) => String(entry.displayName || "").trim().toLowerCase() === speaker);
  if (!player?.userId) return null;
  return db.users.find((user) => user.id === player.userId) || null;
}

async function moderateTranscriptItem(matchId, transcriptItemId) {
  const db = await readDb();
  const match = db.matches.find((item) => item.id === matchId);
  if (!match) return;
  const transcriptItem = (match.transcript || []).find((item) => item.id === transcriptItemId);
  if (!transcriptItem || transcriptItem.safetyCheckedAt) return;

  const safety = await detectUnsafeText(transcriptItem.text);
  transcriptItem.safetyCheckedAt = new Date().toISOString();
  transcriptItem.safety = safety;

  if (safety.flagged) {
    const target = transcriptSpeakerUser(match, transcriptItem, db);
    if (target) {
      target.warnings = target.warnings || [];
      target.warnings.push({
        id: id("warning"),
        reason: safety.reason || "Possible disrespectful speech detected.",
        by: "ai-moderation",
        createdAt: new Date().toISOString(),
        matchId: match.id,
        source: safety.source,
      });
      const penalty = safety.severity === "high" ? 2 : 1;
      target.mannerTemperature = Math.max(0, Number(target.mannerTemperature ?? 42.8) - penalty);
    }

    db.reports.push({
      id: id("report"),
      matchId: match.id,
      userId: target?.id || null,
      reason: "AI moderation detected possible profanity or disrespectful speech.",
      detail: safety.reason,
      status: "open",
      source: safety.source,
      categories: safety.categories,
      createdAt: new Date().toISOString(),
    });

  }

  await writeDb(db);
  if (safety.flagged) {
    broadcast(match.id, {
      type: "notification",
      category: "warning",
      userId: transcriptSpeakerUser(match, transcriptItem, db)?.id || null,
      title: "Safety warning",
      body: safety.reason || "Possible disrespectful speech detected.",
    });
  }
}

function getCookie(req, name) {
  const cookie = req.headers.cookie || "";
  return cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")[1];
}

function isSecureRequest(req) {
  return req.headers["x-forwarded-proto"] === "https" || req.socket.encrypted || process.env.NODE_ENV === "production";
}

function sessionCookie(token, req, options = {}) {
  const secure = isSecureRequest(req) ? "; Secure" : "";
  const maxAge = options.clear ? "; Max-Age=0" : "";
  return `lc_session=${token || ""}; Path=/${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}

function base64UrlDecode(value) {
  const padded = `${value}${"=".repeat((4 - (value.length % 4)) % 4)}`;
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function decodeJwtPart(value) {
  return JSON.parse(base64UrlDecode(value).toString("utf8"));
}

async function googlePublicKeys() {
  const now = Date.now();
  if (cachedGoogleKeys && now - cachedGoogleKeysAt < 60 * 60 * 1000) return cachedGoogleKeys;
  const response = await fetch("https://www.googleapis.com/oauth2/v3/certs");
  if (!response.ok) throw new Error(`Google keys request failed with ${response.status}`);
  const payload = await response.json();
  cachedGoogleKeys = Array.isArray(payload.keys) ? payload.keys : [];
  cachedGoogleKeysAt = now;
  return cachedGoogleKeys;
}

async function verifyGoogleCredential(credential) {
  if (!googleClientId) throw new Error("Google login is not configured.");
  const parts = String(credential || "").split(".");
  if (parts.length !== 3) throw new Error("Invalid Google credential.");
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = decodeJwtPart(encodedHeader);
  const payload = decodeJwtPart(encodedPayload);
  if (header.alg !== "RS256") throw new Error("Unsupported Google credential algorithm.");
  const key = (await googlePublicKeys()).find((item) => item.kid === header.kid);
  if (!key) throw new Error("Google credential signing key was not found.");
  const publicKey = crypto.createPublicKey({ key, format: "jwk" });
  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(`${encodedHeader}.${encodedPayload}`);
  verifier.end();
  const valid = verifier.verify(publicKey, base64UrlDecode(encodedSignature));
  if (!valid) throw new Error("Google credential signature is invalid.");
  if (!["accounts.google.com", "https://accounts.google.com"].includes(payload.iss)) throw new Error("Google credential issuer is invalid.");
  if (payload.aud !== googleClientId) throw new Error("Google credential audience is invalid.");
  if (Number(payload.exp || 0) * 1000 <= Date.now()) throw new Error("Google credential has expired.");
  if (!payload.email || payload.email_verified === false) throw new Error("Google account email is not verified.");
  return {
    email: String(payload.email).trim().toLowerCase(),
    displayName: String(payload.name || payload.given_name || payload.email || "Google Player").trim().slice(0, 40),
    picture: payload.picture || "",
    googleSub: payload.sub || "",
  };
}

function clientAddress(req) {
  return String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
}

function checkRateLimit(req, user, bucket, limit, windowMs) {
  const now = Date.now();
  const key = `${bucket}:${user?.id || clientAddress(req)}`;
  const current = rateLimitBuckets.get(key);
  if (!current || now > current.resetAt) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= limit;
}

function requireRateLimit(req, res, user, bucket, limit, windowMs = 60_000) {
  if (checkRateLimit(req, user, bucket, limit, windowMs)) return true;
  sendJson(res, 429, { error: "Too many requests. Try again in a moment." });
  return false;
}

function fallbackIceServers() {
  return [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
      ],
    },
  ];
}

async function voiceIceServers() {
  const now = Date.now();
  if (cachedIceServers && now - cachedIceServersAt < 10 * 60 * 1000) return cachedIceServers;
  if (!meteredTurnApiUrl || !meteredTurnApiKey) {
    cachedIceServers = fallbackIceServers();
    cachedIceServersAt = now;
    return cachedIceServers;
  }

  const url = new URL("/api/v1/turn/credentials", meteredTurnApiUrl);
  url.searchParams.set("apiKey", meteredTurnApiKey);

  try {
    const response = await fetch(url);
    const iceServers = await response.json().catch(() => null);
    if (!response.ok || !Array.isArray(iceServers)) throw new Error(`TURN API ${response.status}`);
    cachedIceServers = [...fallbackIceServers(), ...iceServers];
    cachedIceServersAt = now;
    return cachedIceServers;
  } catch (error) {
    console.warn(`TURN API unavailable: ${error.message}`);
    cachedIceServers = fallbackIceServers();
    cachedIceServersAt = now;
    return cachedIceServers;
  }
}

function signupRole(email, db) {
  const normalizedEmail = String(email || "").toLowerCase();
  if (staffEmails.has(normalizedEmail)) return "staff";
  if (process.env.NODE_ENV !== "production" && staffEmails.size === 0 && db.users.length === 0) return "staff";
  return "player";
}

function normalizedRole(user) {
  if (user?.role === "admin") return "staff";
  return user?.role || "player";
}

function normalizedPieceEdition(value) {
  return pieceEditions.has(value) ? value : "cheoinseong";
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object || {}, key);
}

function defaultTraining() {
  return {
    completedModules: [],
    completedPuzzles: [],
    reviewQuizzes: [],
  };
}

const achievementCatalog = [
  { id: "first-step", name: "첫걸음", category: "훈련장", detail: "첫 튜토리얼을 완료했습니다." },
  { id: "piece-commander", name: "기물 지휘관", category: "훈련장", detail: "모든 기본 훈련 모듈을 완료했습니다." },
  { id: "capture-specialist", name: "포획 전문가", category: "훈련장", detail: "기물 잡기 모듈을 완료했습니다." },
  { id: "crisis-escape", name: "위기 탈출", category: "훈련장", detail: "체크 피하기 모듈을 완료했습니다." },
  { id: "mate-solver", name: "외통수 해결사", category: "훈련장", detail: "체크메이트 모듈을 완료했습니다." },
  { id: "review-craftsperson", name: "복습 장인", category: "훈련장", detail: "복습 퀴즈를 다섯 번 완료했습니다." },
  { id: "gate-guardian", name: "성문 수호자", category: "퍼즐", detail: "성문 뒤의 함정 퍼즐을 세 번 해결했습니다." },
  { id: "flawless-solver", name: "무결점 풀이", category: "퍼즐", detail: "힌트 없이 퍼즐을 다섯 번 해결했습니다." },
  { id: "lightning-move", name: "번개 수", category: "퍼즐", detail: "45초 안에 힌트 없이 퍼즐을 세 번 해결했습니다." },
  { id: "five-routes", name: "다섯 갈래 길", category: "퍼즐", detail: "같은 테마의 유사 퍼즐 다섯 개를 모두 해결했습니다." },
  { id: "puzzle-explorer", name: "퍼즐 탐험가", category: "퍼즐", detail: "서로 다른 퍼즐 테마 다섯 개를 완료했습니다." },
  { id: "perfect-march", name: "완벽한 행군", category: "퍼즐", detail: "한 레벨의 퍼즐을 별 2개 이상으로 모두 해결했습니다." },
  { id: "first-match", name: "첫 대국", category: "대국", detail: "충분히 진행된 첫 실제 대국을 완료했습니다." },
  { id: "first-victory", name: "첫 승리", category: "대국", detail: "충분히 진행된 대국에서 첫 승리를 거뒀습니다." },
  { id: "finish-the-game", name: "끝까지 한 판", category: "대국", detail: "기권하지 않고 대국 세 판을 마쳤습니다." },
  { id: "comeback-master", name: "역전의 명수", category: "대국", detail: "불리한 상황에서 승리했습니다." },
  { id: "first-checkmate", name: "체크메이트", category: "대국", detail: "체크메이트로 첫 승리를 거뒀습니다." },
  { id: "solid-defense", name: "단단한 수비", category: "대국", detail: "체크를 세 번 이상 적절히 피했습니다." },
  { id: "conversation-listener", name: "대화 리스너", category: "커뮤니티와 매너", detail: "대국 중 직접 작성한 대화를 여덟 번 남겼습니다." },
  { id: "respectful-move", name: "존중의 한 수", category: "커뮤니티와 매너", detail: "신고 없이 충분히 진행된 대국 열 판을 완료했습니다." },
  { id: "first-greeting", name: "첫 인사", category: "커뮤니티와 매너", detail: "아이스브레이커 미션을 완료했습니다." },
  { id: "league-together", name: "함께하는 리그", category: "커뮤니티와 매너", detail: "리그에 처음 참가했습니다." },
  { id: "league-founder", name: "리그 개설자", category: "커뮤니티와 매너", detail: "세 명 이상이 참여한 리그를 개설했습니다." },
  { id: "friend-match", name: "친구와 한 판", category: "커뮤니티와 매너", detail: "초대 코드로 충분히 진행된 친구 대국을 마쳤습니다." },
  { id: "march-3", name: "3일 행군", category: "꾸준함", detail: "3일 연속 학습하거나 대국을 완료했습니다." },
  { id: "march-7", name: "7일 행군", category: "꾸준함", detail: "7일 연속 학습하거나 대국을 완료했습니다." },
  { id: "march-30", name: "30일 행군", category: "꾸준함", detail: "30일 연속 학습하거나 대국을 완료했습니다." },
  { id: "morning-strategist", name: "아침의 전략가", category: "꾸준함", detail: "아침 학습을 세 번 완료했습니다." },
  { id: "night-strategist", name: "밤의 전략가", category: "꾸준함", detail: "밤 학습을 세 번 완료했습니다." },
  { id: "returning-warrior", name: "돌아온 용사", category: "꾸준함", detail: "7일 이상 쉬었다가 다시 학습을 완료했습니다." },
];

const achievementArtwork = {
  "first-step": "/assets/badges/first-step.png",
  "piece-commander": "/assets/badges/piece-commander.png",
  "capture-specialist": "/assets/badges/capture-specialist.png",
  "crisis-escape": "/assets/badges/crisis-escape.png",
  "mate-solver": "/assets/badges/mate-solver.png",
  "review-craftsperson": "/assets/badges/review-craftsperson.png",
  "gate-guardian": "/assets/badges/gate-guardian.png",
  "flawless-solver": "/assets/badges/flawless-solver.png",
  "lightning-move": "/assets/badges/lightning-move.png",
  "five-routes": "/assets/badges/five-routes.png",
  "puzzle-explorer": "/assets/badges/puzzle-explorer.png",
  "perfect-march": "/assets/badges/perfect-march.png",
  "first-match": "/assets/badges/first-match.png",
  "first-victory": "/assets/badges/first-victory.png",
  "finish-the-game": "/assets/badges/finish-the-game.png",
  "comeback-master": "/assets/badges/comeback-master.png",
  "first-checkmate": "/assets/badges/checkmate.png",
  "solid-defense": "/assets/badges/solid-defense.png",
  "conversation-listener": "/assets/badges/conversation-listener.png",
  "respectful-move": "/assets/badges/respectful-move.png",
  "first-greeting": "/assets/badges/first-greeting.png",
  "league-together": "/assets/badges/league-together.png",
  "league-founder": "/assets/badges/league-founder.png",
  "friend-match": "/assets/badges/friend-match.png",
  "march-3": "/assets/badges/march-3.png",
  "march-7": "/assets/badges/march-7.png",
  "march-30": "/assets/badges/march-30.png",
  "morning-strategist": "/assets/badges/morning-strategist.png",
  "night-strategist": "/assets/badges/night-strategist.png",
  "returning-warrior": "/assets/badges/returning-warrior.png",
};

const achievementById = new Map(achievementCatalog.map((achievement) => [
  achievement.id,
  { ...achievement, imageUrl: achievementArtwork[achievement.id] },
]));

function normalizeAchievementEntries(entries) {
  const seen = new Set();
  return (Array.isArray(entries) ? entries : [])
    .map((entry) => (typeof entry === "string" ? { id: entry } : entry || {}))
    .filter((entry) => achievementById.has(entry.id) && !seen.has(entry.id) && seen.add(entry.id))
    .map((entry) => ({ id: entry.id, earnedAt: entry.earnedAt || "" }));
}

function achievementView(entry) {
  const definition = achievementById.get(entry?.id);
  return definition ? { ...definition, earnedAt: entry.earnedAt || "" } : null;
}

function userAchievementEntries(user) {
  if (!user) return [];
  user.achievements = normalizeAchievementEntries(user.achievements);
  user.badgeNotifications = normalizeAchievementEntries(user.badgeNotifications);
  return user.achievements;
}

function pendingAchievementViews(user) {
  if (!user) return [];
  userAchievementEntries(user);
  return user.badgeNotifications.map(achievementView).filter(Boolean);
}

const maxAchievementUnlocksPerSync = 3;

function awardAchievements(user, ids, earnedAt = new Date().toISOString(), maxUnlocks = maxAchievementUnlocksPerSync) {
  if (!user) return [];
  const earned = userAchievementEntries(user);
  const known = new Set(earned.map((entry) => entry.id));
  const pending = new Set(user.badgeNotifications.map((entry) => entry.id));
  const unlocked = [];
  for (const id of ids) {
    if (unlocked.length >= maxUnlocks) break;
    if (!achievementById.has(id) || known.has(id)) continue;
    const entry = { id, earnedAt };
    earned.push(entry);
    known.add(id);
    if (!pending.has(id)) {
      user.badgeNotifications.push(entry);
      pending.add(id);
    }
    unlocked.push(achievementView(entry));
  }
  return unlocked;
}

function normalizeTraining(training = {}) {
  const legacyCompletion = Array.isArray(training.completedTutorialDays) && training.completedTutorialDays.includes(0);
  const { completedTutorialDays, ...currentTraining } = training;
  return {
    ...defaultTraining(),
    ...currentTraining,
    completedModules: Array.isArray(training.completedModules)
      ? [...new Set(training.completedModules.map((id) => Number(id)).filter((id) => trainingModules.some((module) => module.id === id)))].sort((a, b) => a - b)
      : legacyCompletion
        ? [1]
        : [],
    completedPuzzles: Array.isArray(training.completedPuzzles) ? training.completedPuzzles : [],
    reviewQuizzes: Array.isArray(training.reviewQuizzes) ? training.reviewQuizzes : [],
  };
}

function trainingState(user) {
  const training = normalizeTraining(user?.training);
  const nextModule = trainingModules.find((module) => !training.completedModules.includes(module.id)) || null;
  return {
    hasTutorial: Boolean(nextModule),
    nextModule,
    tutorialSrc: nextModule?.src || "",
    puzzleUnlocked: !nextModule,
    completedModules: training.completedModules,
    completedPuzzles: training.completedPuzzles,
    reviewQuizzes: training.reviewQuizzes,
    modules: trainingModules.map((module) => ({ ...module, completed: training.completedModules.includes(module.id) })),
    reviewOptions: trainingModules
      .filter((module) => training.completedModules.includes(module.id))
      .map((module) => ({ module: module.id, title: module.title })),
  };
}

function markTutorialComplete(user, requestedModule) {
  user.training = normalizeTraining(user.training);
  const nextModule = trainingModules.find((module) => !user.training.completedModules.includes(module.id));
  if (!nextModule) return trainingState(user);
  const moduleId = Number(requestedModule);
  if (moduleId && moduleId !== nextModule.id) {
    throw new Error("Complete the current training module first.");
  }
  user.training.completedModules.push(nextModule.id);
  user.training.completedModules.sort((first, second) => first - second);
  return trainingState(user);
}

function calendarDayNumber(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) return null;
  const parts = Object.fromEntries(
    streakDateFormatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );
  return Math.floor(Date.UTC(parts.year, parts.month - 1, parts.day) / dayMs);
}

function applyDailyStreak(user, completedAt = new Date(), activityType = "match") {
  if (!user) return false;
  const completedTime = completedAt.getTime();
  const previousLearningTime = Date.parse(user.lastLearningAt || "");
  const completedDay = calendarDayNumber(completedAt);
  const previousDay = calendarDayNumber(user.lastStreakAt);
  if (activityType === "learning") {
    const hour = completedAt.getHours();
    user.learningActivityHours = [...(Array.isArray(user.learningActivityHours) ? user.learningActivityHours : []), hour].slice(-120);
    if (Number.isFinite(previousLearningTime) && completedTime - previousLearningTime >= dayMs * 7) {
      user.returnedAfterBreak = true;
    }
    user.lastLearningAt = completedAt.toISOString();
  }
  if (completedDay === null) return false;
  if (previousDay !== null && completedDay <= previousDay) return false;
  const current = Math.max(0, Number(user.streak || 0));
  user.streak = previousDay !== null && completedDay - previousDay === 1 ? current + 1 : 1;
  user.lastStreakAt = completedAt.toISOString();
  return true;
}

function recordMatchCompletionStreak(match, db) {
  const participantIds = new Set((match.players || []).map((player) => player.userId).filter(Boolean));
  const unlocked = [];
  participantIds.forEach((userId) => {
    const player = db.users.find((item) => item.id === userId);
    applyDailyStreak(player);
    unlocked.push(...syncAchievements(player, db));
  });
  return unlocked;
}

function maskEmailMiddle(email) {
  const normalized = String(email || "").trim().toLowerCase();
  const [localPart, domain] = normalized.split("@");
  if (!localPart || !domain) return "Player";
  if (localPart.length <= 3) return `${"*".repeat(localPart.length)}@${domain}`;
  const startLength = Math.ceil((localPart.length - 3) / 2);
  const endLength = localPart.length - 3 - startLength;
  return `${localPart.slice(0, startLength)}***${endLength ? localPart.slice(-endLength) : ""}@${domain}`;
}

function publicDisplayName(user, fallback = "Player") {
  const displayName = String(user?.displayName || "").trim();
  if (displayName && user?.displayNameSource !== "google") return displayName;
  if (user?.authProvider === "google" && user?.email) return maskEmailMiddle(user.email);
  return displayName || fallback;
}

function getSessionUser(req, db) {
  const token = getCookie(req, "lc_session") || (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const session = db.sessions.find((item) => item.token === token);
  if (!session) return null;
  return db.users.find((user) => user.id === session.userId) || null;
}

function publicUser(user) {
  if (!user) return null;
  const achievements = userAchievementEntries(user).map(achievementView).filter(Boolean);
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    languagePair: user.languagePair,
    mannerTemperature: user.mannerTemperature,
    role: normalizedRole(user),
    pieceEdition: normalizedPieceEdition(user.pieceEdition),
    avatarUrl: user.avatarUrl || "",
    streak: Number(user.streak || 0),
    lastStreakAt: user.lastStreakAt || "",
    easyElo: Number(user.easyElo || 1000),
    leagueCode: user.leagueCode || "",
    training: trainingState(user),
    achievements,
    badgeNotifications: pendingAchievementViews(user),
  };
}

function playerUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    displayName: user.displayName,
    languagePair: user.languagePair,
    mannerTemperature: user.mannerTemperature,
    role: normalizedRole(user),
    pieceEdition: normalizedPieceEdition(user.pieceEdition),
    avatarUrl: user.avatarUrl || "",
    streak: Number(user.streak || 0),
    lastStreakAt: user.lastStreakAt || "",
    easyElo: Number(user.easyElo || 1000),
    leagueCode: user.leagueCode || "",
  };
}

function adminUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    languagePair: user.languagePair,
    mannerTemperature: user.mannerTemperature,
    role: normalizedRole(user),
    pieceEdition: normalizedPieceEdition(user.pieceEdition),
    warnings: user.warnings || [],
    warningCount: (user.warnings || []).length,
    createdAt: user.createdAt,
  };
}

function adminMatch(match) {
  return {
    id: match.id,
    status: match.status,
    result: match.result,
    pairingType: match.pairingType,
    timeControl: match.timeControl,
    rated: Boolean(match.rated),
    partnerLanguage: match.partnerLanguage,
    goal: match.goal,
    players: match.players || [],
    moveCount: match.moves?.length || 0,
    transcriptCount: match.transcript?.length || 0,
    createdAt: match.createdAt,
    endedAt: match.endedAt,
  };
}

function adminReport(report, db) {
  const reporter = db.users.find((user) => user.id === report.reporterId);
  const match = db.matches.find((item) => item.id === report.matchId);
  return {
    ...report,
    reporterName: reporter?.displayName || "Guest",
    matchResult: match?.result || null,
  };
}

function shopInterestView(interest, db) {
  const user = db.users.find((item) => item.id === interest.userId);
  return {
    ...interest,
    displayName: user?.displayName || interest.displayName || "Guest Player",
    email: user?.email || interest.email || "",
  };
}

function requireStaff(user, res) {
  if (normalizedRole(user) === "staff") return true;
  sendJson(res, 403, { error: "Staff access required." });
  return false;
}

function requireUser(user, res) {
  if (user) return true;
  sendJson(res, 401, { error: "Sign in first." });
  return false;
}

function matchParticipant(match, user) {
  if (!match || !user) return false;
  return (match.players || []).some((player) => player.userId === user.id) || match.userId === user.id;
}

function canAccessMatch(match, user) {
  return Boolean(user?.role === "admin" || matchParticipant(match, user));
}

function requireMatchAccess(match, user, res) {
  if (!requireUser(user, res)) return false;
  if (canAccessMatch(match, user)) return true;
  sendJson(res, 403, { error: "You do not have access to this match." });
  return false;
}

function matchHasUser(match, userId) {
  return (match?.players || []).some((player) => player.userId === userId);
}

function endedMatchBetween(match, userId, targetUserId) {
  return match?.status === "ended" && matchHasUser(match, userId) && matchHasUser(match, targetUserId);
}

function matchWinnerIs(match, user) {
  const player = (match.players || []).find((item) => item.userId === user.id) || {};
  const result = match.result && typeof match.result === "object" ? match.result : {};
  const winner = match.winnerId || match.winnerUserId || result.winnerId || result.winnerUserId || match.winner || result.winner;
  return winner === user.id || (player.color && String(winner || "").toLowerCase() === String(player.color).toLowerCase());
}

function matchText(match) {
  return JSON.stringify({
    result: match.result || "",
    status: match.status || "",
    termination: match.termination || "",
    reason: match.reason || "",
  }).toLowerCase();
}

function matchUserStats(match, userId) {
  return match.playerStats?.[userId]
    || match.stats?.[userId]
    || match.result?.playerStats?.[userId]
    || match.result?.stats?.[userId]
    || {};
}

function matchMoveCount(match) {
  return Array.isArray(match?.moves) ? match.moves.length : 0;
}

function userMoveCount(match, userId) {
  const color = (match?.players || []).find((player) => player.userId === userId)?.color;
  if (!color) return 0;
  return (Array.isArray(match?.moves) ? match.moves : []).filter((move) => move.color === color).length;
}

function isSubstantialFinishedMatch(match, userId) {
  return match?.status === "ended"
    && matchHasUser(match, userId)
    && matchMoveCount(match) >= 10
    && userMoveCount(match, userId) >= 4
    && !/cancel|canceled|abandon|timeout before move/i.test(matchText(match));
}

function userSpeechCount(match, userId) {
  return (Array.isArray(match?.transcript) ? match.transcript : [])
    .filter((entry) =>
      entry?.kind === "speech"
      && [entry.userId, entry.authorId, entry.senderId].includes(userId)
      && String(entry.text || "").trim().length >= 8
    )
    .length;
}

function leagueMemberCount(db, code) {
  const normalizedCode = String(code || "").trim().toUpperCase();
  if (!normalizedCode) return 0;
  return (Array.isArray(db.users) ? db.users : []).filter((item) => String(item.leagueCode || "").trim().toUpperCase() === normalizedCode).length;
}

function syncAchievements(user, db) {
  if (!user) return [];
  user.training = normalizeTraining(user.training);
  const training = user.training;
  const earnedIds = new Set(userAchievementEntries(user).map((entry) => entry.id));
  const completedModules = new Set(training.completedModules);
  const puzzles = training.completedPuzzles.filter((puzzle) => puzzle && puzzle.id);
  const matches = Array.isArray(db.matches) ? db.matches : [];
  const reports = Array.isArray(db.reports) ? db.reports : [];
  const finishedMatches = matches.filter((match) => match.status === "ended" && matchHasUser(match, user.id));
  const substantialMatches = finishedMatches.filter((match) => isSubstantialFinishedMatch(match, user.id));
  const wonMatches = substantialMatches.filter((match) => matchWinnerIs(match, user));
  const hasReport = reports.some((report) => [report.reporterId, report.reportedUserId, report.targetUserId, report.userId].includes(user.id));
  const puzzleThemes = new Set(puzzles.map((puzzle) => puzzle.theme).filter(Boolean));
  const familyGroups = new Map();
  const levelGroups = new Map();
  puzzles.forEach((puzzle) => {
    if (puzzle.family && Number(puzzle.familyTotal) > 0) {
      const family = familyGroups.get(puzzle.family) || { ids: new Set(), total: Number(puzzle.familyTotal) };
      family.ids.add(String(puzzle.id));
      family.total = Math.max(family.total, Number(puzzle.familyTotal));
      familyGroups.set(puzzle.family, family);
    }
    if (Number(puzzle.level) > 0 && Number(puzzle.levelTotal) > 0) {
      const level = levelGroups.get(Number(puzzle.level)) || { ids: new Set(), total: Number(puzzle.levelTotal) };
      level.ids.add(String(puzzle.id));
      level.total = Math.max(level.total, Number(puzzle.levelTotal));
      levelGroups.set(Number(puzzle.level), level);
    }
  });

  const candidateIds = [];
  if (completedModules.has(1)) candidateIds.push("first-step");
  if (completedModules.size >= trainingModules.length) candidateIds.push("piece-commander");
  if (completedModules.has(2)) candidateIds.push("capture-specialist");
  if (completedModules.has(3)) candidateIds.push("crisis-escape");
  if (completedModules.has(4)) candidateIds.push("mate-solver");
  if (training.reviewQuizzes.filter((quiz) => Number(quiz.score || 0) >= 4).length >= 5) candidateIds.push("review-craftsperson");

  const gatePuzzles = puzzles.filter((puzzle) => String(puzzle.title || "").includes("성문 뒤의 함정") || /(^|[-_:])s1($|[-_:])/.test(String(puzzle.id)));
  const noHintPuzzles = puzzles.filter((puzzle) => Number.isFinite(Number(puzzle.hintsUsed)) && Number(puzzle.hintsUsed) === 0);
  const fastNoHintPuzzles = noHintPuzzles.filter((puzzle) => Number(puzzle.durationMs) > 0 && Number(puzzle.durationMs) <= 45000);
  if (gatePuzzles.length >= 3) {
    candidateIds.push("gate-guardian");
  }
  if (noHintPuzzles.length >= 5) candidateIds.push("flawless-solver");
  if (fastNoHintPuzzles.length >= 3) candidateIds.push("lightning-move");
  if ([...familyGroups.values()].some((family) => family.total >= 5 && family.ids.size >= family.total)) candidateIds.push("five-routes");
  if (puzzleThemes.size >= 5) candidateIds.push("puzzle-explorer");
  if ([...levelGroups.values()].some((level) =>
    level.total >= 6
    && level.ids.size >= level.total
    && puzzles
      .filter((puzzle) => level.ids.has(String(puzzle.id)))
      .every((puzzle) => Number(puzzle.stars || 0) >= 2)
  )) candidateIds.push("perfect-march");

  if (substantialMatches.length >= 1) candidateIds.push("first-match");
  if (wonMatches.length >= 1) candidateIds.push("first-victory");
  if (substantialMatches.filter((match) => !/resign|forfeit|기권/.test(matchText(match))).length >= 3) candidateIds.push("finish-the-game");
  if (wonMatches.some((match) => [match.comebackWinnerId, match.result?.comebackWinnerId].includes(user.id) || match.result?.comeback === true)) candidateIds.push("comeback-master");
  if (wonMatches.some((match) => /checkmate|체크메이트/.test(matchText(match)))) candidateIds.push("first-checkmate");
  if (substantialMatches.filter((match) => Number(matchUserStats(match, user.id).checksEscaped || matchUserStats(match, user.id).escapedChecks || 0) >= 3).length >= 2) candidateIds.push("solid-defense");
  if (substantialMatches.reduce((total, match) => total + userSpeechCount(match, user.id), 0) >= 8) candidateIds.push("conversation-listener");
  if (substantialMatches.length >= 10 && !hasReport) candidateIds.push("respectful-move");
  if (substantialMatches.some((match) => match.icebreakerCompletedBy === user.id || match.icebreaker?.completedBy === user.id)) candidateIds.push("first-greeting");
  if ((user.leagueJoined || user.leagueCode) && leagueMemberCount(db, user.leagueCode) >= 2) candidateIds.push("league-together");
  if (user.leagueCreated && leagueMemberCount(db, user.leagueCode) >= 3) candidateIds.push("league-founder");
  if (substantialMatches.some((match) => ["friend", "private", "invite", "private-challenge"].includes(match.pairingType) || match.inviteCode || match.roomCode || match.challengeId)) candidateIds.push("friend-match");

  const streak = Number(user.streak || 0);
  if (streak >= 30 && earnedIds.has("march-7")) candidateIds.push("march-30");
  else if (streak >= 7 && earnedIds.has("march-3")) candidateIds.push("march-7");
  else if (streak >= 3) candidateIds.push("march-3");
  const learningHours = Array.isArray(user.learningActivityHours) ? user.learningActivityHours : [];
  if (learningHours.filter((hour) => Number(hour) >= 5 && Number(hour) < 12).length >= 3) candidateIds.push("morning-strategist");
  if (learningHours.filter((hour) => Number(hour) >= 20 || Number(hour) < 5).length >= 3) candidateIds.push("night-strategist");
  if (user.returnedAfterBreak) candidateIds.push("returning-warrior");

  return awardAchievements(user, candidateIds);
}

function profileBadges(user, db) {
  const wonBadges = user.leagueBadges || [];
  const badges = userAchievementEntries(user).map(achievementView).filter(Boolean);
  wonBadges.forEach((badge, index) => badges.push({
    id: badge.id || `league-badge-${index + 1}`,
    name: badge.name,
    category: badge.category || "리그",
    detail: badge.detail || "리그 순위 보상 배지입니다.",
    imageUrl: badge.imageUrl || achievementArtwork["league-together"],
    earnedAt: badge.earnedAt || "",
  }));
  return badges;
}

function buildProfile(user, db) {
  const userMatches = db.matches.filter((match) => (match.players || []).some((player) => player.userId === user.id));
  const matchIds = new Set(userMatches.map((match) => match.id));
  return {
    user: {
      ...publicUser(user),
      bio: user.bio || "",
      nativeLanguage: user.nativeLanguage || "",
      learningLanguage: user.learningLanguage || "",
      training: trainingState(user),
    },
    stats: {
      matches: userMatches.length,
      completedMatches: userMatches.filter((match) => match.status === "ended").length,
      reviews: db.reviews.filter((review) => matchIds.has(review.matchId)).length,
      feedback: (user.feedbackReceived || []).length,
      cultureNotes: (user.cultureGuide || []).length,
    },
    badges: profileBadges(user, db),
    feedback: [],
    cultureGuide: [],
  };
}

function leagueCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

function leagueView(league, db, period = "weekly") {
  const members = db.users
    .filter((user) => user.leagueCode === league.code)
    .map((user) => ({
      id: user.id,
      displayName: publicDisplayName(user),
      avatarUrl: user.avatarUrl || "",
      streak: Number(user.streak || 0),
      easyElo: Number(period === "weekly" ? user.weeklyEasyElo ?? user.easyElo ?? 1000 : user.easyElo ?? 1000),
      badges: user.leagueBadges || [],
    }))
    .sort((a, b) => b.easyElo - a.easyElo)
    .map((member, index) => ({ ...member, rank: index + 1 }));
  return {
    code: league.code,
    name: league.name || `EasyMate League ${league.code}`,
    period,
    scope: "mine",
    resetsAt: league.resetsAt,
    members,
  };
}

function defaultLeaderboard(db, period = "weekly") {
  const members = db.users
    .map((user) => ({
      id: user.id,
      displayName: publicDisplayName(user),
      avatarUrl: user.avatarUrl || "",
      streak: Number(user.streak || 0),
      easyElo: Number(period === "weekly" ? user.weeklyEasyElo ?? user.easyElo ?? 1000 : user.easyElo ?? 1000),
      badges: user.leagueBadges || [],
    }))
    .sort((a, b) => b.easyElo - a.easyElo)
    .slice(0, 10)
    .map((member, index) => ({ ...member, rank: index + 1 }));
  return {
    code: "",
    name: period === "weekly" ? "Weekly Easy Elo" : "All-time Easy Elo",
    period,
    scope: "all",
    members,
  };
}

function displayNameFor(db, userId, fallback = "Player") {
  return db.users.find((user) => user.id === userId)?.displayName || fallback;
}

function decorateSeek(db, seek) {
  return {
    id: seek.id,
    displayName: displayNameFor(db, seek.userId, seek.displayName || "Player"),
    timeControl: seek.timeControl || "10+0",
    rated: Boolean(seek.rated),
    partnerLanguage: seek.partnerLanguage || "English",
    goal: seek.goal || "Explain chess moves",
    status: seek.status || "open",
    createdAt: seek.createdAt,
  };
}

function createSession(db, userId) {
  const token = crypto.randomBytes(24).toString("hex");
  db.sessions.push({
    id: id("session"),
    token,
    userId,
    createdAt: new Date().toISOString(),
  });
  return token;
}

function serializeGame(fen) {
  const game = new Chess(fen);
  return {
    fen: game.fen(),
    pgn: game.pgn(),
    turn: game.turn() === "w" ? "white" : "black",
    inCheck: game.inCheck(),
    gameOver: game.isGameOver(),
    checkmate: game.isCheckmate(),
    draw: game.isDraw(),
    stalemate: game.isStalemate(),
    board: game.board().map((row, rankIndex) =>
      row.map((piece, fileIndex) => {
        if (!piece) return null;
        return {
          type: piece.type,
          color: piece.color === "w" ? "white" : "black",
          square: `${"abcdefgh"[fileIndex]}${8 - rankIndex}`,
        };
      }),
    ),
  };
}

function parseTimeControl(timeControl = "10+0") {
  const match = String(timeControl).match(/(\d+)\s*\+\s*(\d+)/);
  const minutes = match ? Number(match[1]) : 10;
  const increment = match ? Number(match[2]) : 0;
  return {
    initialMs: Math.max(1, minutes) * 60_000,
    incrementMs: Math.max(0, increment) * 1000,
  };
}

function createClockState(timeControl = "10+0", startedAt = new Date().toISOString()) {
  const { initialMs, incrementMs } = parseTimeControl(timeControl);
  return {
    whiteMs: initialMs,
    blackMs: initialMs,
    incrementMs,
    activeColor: "white",
    startedAt,
    lastUpdatedAt: startedAt,
    running: true,
  };
}

function liveClockState(match, now = new Date()) {
  const base = match.clocks || createClockState(match.timeControl, now.toISOString());
  const clocks = { ...base };
  const activeColor = clocks.activeColor;
  const shouldRun = match.status !== "ended" && match.status !== "waiting" && clocks.running !== false && Boolean(activeColor);
  if (shouldRun) {
    const key = `${activeColor}Ms`;
    const lastUpdated = Date.parse(clocks.lastUpdatedAt || clocks.startedAt || match.createdAt || now.toISOString());
    const elapsed = Number.isFinite(lastUpdated) ? Math.max(0, now.getTime() - lastUpdated) : 0;
    clocks[key] = Math.max(0, Number(clocks[key] || 0) - elapsed);
  }
  clocks.lastUpdatedAt = now.toISOString();
  clocks.running = shouldRun;
  return clocks;
}

function ensureMatchClock(match) {
  if (!match.clocks) {
    match.clocks = createClockState(match.timeControl, new Date().toISOString());
  }
  return match.clocks;
}

function applyClockAfterMove(match, move, game) {
  const now = new Date();
  const clocks = ensureMatchClock(match);
  const movedColor = move.color === "w" ? "white" : "black";
  const key = `${movedColor}Ms`;
  const lastUpdated = Date.parse(clocks.lastUpdatedAt || clocks.startedAt || match.createdAt || now.toISOString());
  const elapsed = Number.isFinite(lastUpdated) ? Math.max(0, now.getTime() - lastUpdated) : 0;
  const remainingBeforeIncrement = Number(clocks[key] || 0) - elapsed;

  if (remainingBeforeIncrement <= 0) {
    clocks[key] = 0;
    clocks.activeColor = null;
    clocks.lastUpdatedAt = now.toISOString();
    clocks.running = false;
    match.status = "ended";
    match.result = `${movedColor === "white" ? "White" : "Black"} lost on time`;
    match.winnerId = winnerUserIdForColor(match, movedColor === "white" ? "black" : "white");
    match.endedAt = now.toISOString();
    return;
  }

  clocks[key] = remainingBeforeIncrement + Number(clocks.incrementMs || 0);
  clocks.activeColor = game.turn() === "w" ? "white" : "black";
  clocks.lastUpdatedAt = now.toISOString();
  clocks.running = !game.isGameOver();
}

function decorateMatch(match) {
  return {
    ...match,
    clocks: liveClockState(match),
    game: serializeGame(match.fen || new Chess().fen()),
  };
}

function playerColor(match, user) {
  if (!user) return null;
  return match.players?.find((player) => player.userId === user.id)?.color || null;
}

function activeMatchForUser(db, user) {
  if (!user) return null;
  return db.matches
    .filter((match) => match.status !== "ended" && (match.players || []).some((player) => player.userId === user.id))
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))[0] || null;
}

function describeGameResult(game, move) {
  if (game.isCheckmate()) {
    return `${move.color === "w" ? "White" : "Black"} won by checkmate`;
  }
  if (game.isStalemate()) return "Draw by stalemate";
  if (game.isDraw()) return "Draw";
  if (game.inCheck()) return "Check";
  return "In progress";
}

function winnerUserIdForColor(match, color) {
  return (match.players || []).find((player) => player.color === color)?.userId || null;
}

function createMatch(db, user, body = {}, opponent = null) {
  const game = new Chess();
  const createdAt = new Date().toISOString();
  const timeControl = body.timeControl || "10+0";
  const white = user
    ? { userId: user.id, displayName: user.displayName, color: "white", pieceEdition: normalizedPieceEdition(user.pieceEdition) }
    : { userId: null, displayName: "Guest", color: "white", pieceEdition: "cheoinseong" };
  const black = opponent
    ? { userId: opponent.id, displayName: opponent.displayName, color: "black", pieceEdition: normalizedPieceEdition(opponent.pieceEdition) }
    : {
        userId: null,
        displayName: body.waitingForOpponent ? "Partner waiting" : "Mina K.",
        color: "black",
        pieceEdition: "beta",
      };

  const match = {
    id: id("match"),
    status: body.waitingForOpponent ? "waiting" : "matched",
    userId: user?.id || null,
    players: [white, black],
    partnerName: black.displayName,
    partnerLanguage: body.partnerLanguage || "English",
    mode: body.mode || "Live",
    goal: body.goal || "Explain chess moves",
    timeControl,
    rated: Boolean(body.rated),
    pairingType: body.pairingType || "practice",
    poolId: body.poolId || null,
    seekId: body.seekId || null,
    result: "In progress",
    fen: game.fen(),
    pgn: "",
    clocks: createClockState(timeControl, createdAt),
    moves: [],
    transcript: [...sampleTranscript],
    reviewId: null,
    createdAt,
    endedAt: null,
  };
  if (body.waitingForOpponent && match.clocks) {
    match.clocks.running = false;
  }
  db.matches.push(match);
  return match;
}

function buildReview(match) {
  const transcriptText = match.transcript.map((item) => item.text || "").join(" ").toLowerCase();
  let vocabulary = vocabularyTemplates
    .filter((item) => item.triggers.some((trigger) => transcriptText.includes(trigger)))
    .slice(0, 10)
    .map((item) => ({
      term: item.term,
      translation: item.translation,
      context: item.context,
      pronunciationText: item.term,
      language: "en-US",
    }));

  if (vocabulary.length < 5) {
    const existing = new Set(vocabulary.map((item) => item.term));
    vocabulary = vocabulary.concat(vocabularyTemplates.filter((item) => !existing.has(item.term)).slice(0, 5 - vocabulary.length));
  }

  let culturalInsight = {
    title: "Detected reference: saying GG",
    summary:
      'The AI noticed "GG" and "good game" as a friendly closing. In many online game communities, this expresses respect, not only the literal result.',
    researchPrompt: "Look up how your partner's language expresses sportsmanship after a match.",
  };

  if (/\b(food|meal|holiday|festival|slang|street food)\b/i.test(transcriptText)) {
    culturalInsight = {
      title: "Detected local culture reference",
      summary: "The AI noticed a food, holiday, or slang reference in the conversation.",
      researchPrompt: "Save this item to your culture guide and ask your partner about it next match.",
    };
  }

  return {
    id: id("review"),
    matchId: match.id,
    createdAt: new Date().toISOString(),
    summary: `Review generated from ${match.transcript.length} transcript items and ${match.moves.length} chess moves.`,
    vocabulary,
    culturalInsight,
  };
}

function routePattern(pathname, pattern) {
  const pathParts = pathname.split("/").filter(Boolean);
  const patternParts = pattern.split("/").filter(Boolean);
  if (pathParts.length !== patternParts.length) return null;
  const params = {};
  for (let index = 0; index < patternParts.length; index += 1) {
    const part = patternParts[index];
    if (part.startsWith(":")) {
      params[part.slice(1)] = pathParts[index];
    } else if (part !== pathParts[index]) {
      return null;
    }
  }
  return params;
}

async function handleApi(req, res, pathname, searchParams = new URLSearchParams()) {
  const db = await readDb();
  const user = getSessionUser(req, db);

  if (req.method === "GET" && pathname === "/api/config") {
    sendJson(res, 200, {
      googleClientId,
      googleLoginConfigured: Boolean(googleClientId),
    });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/translate") {
    if (!requireUser(user, res)) return true;
    if (!requireRateLimit(req, res, user, "translate", 60)) return true;
    const body = await readBody(req);
    if (String(body.text || "").length > 1000) {
      sendJson(res, 400, { error: "Translation text is too long." });
      return true;
    }
    try {
      const translation = await translateText({
        text: body.text,
        targetLanguage: body.targetLanguage,
        sourceLanguage: body.sourceLanguage,
      });
      sendJson(res, 200, { translation });
    } catch (error) {
      sendJson(res, error.statusCode || 500, { error: error.message || "Translation failed." });
    }
    return true;
  }

  if (req.method === "POST" && pathname === "/api/moderate") {
    if (!requireUser(user, res)) return true;
    if (!requireRateLimit(req, res, user, "moderate", 30)) return true;
    const body = await readBody(req);
    if (String(body.text || "").length > 2000) {
      sendJson(res, 400, { error: "Moderation text is too long." });
      return true;
    }
    const safety = await detectUnsafeText(body.text);
    sendJson(res, 200, { safety });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/session") {
    sendJson(res, 200, { user: publicUser(user), unlocked: pendingAchievementViews(user) });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/voice/ice-servers") {
    if (!requireUser(user, res)) return true;
    if (!requireRateLimit(req, res, user, "ice-servers", 20)) return true;
    const iceServers = await voiceIceServers();
    sendJson(res, 200, {
      iceServers,
      provider: meteredTurnApiUrl && meteredTurnApiKey ? "metered-openrelay" : "stun-fallback",
    });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/profile") {
    if (!requireUser(user, res)) return true;
    sendJson(res, 200, { ...buildProfile(user, db), unlocked: pendingAchievementViews(user) });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/forum/posts") {
    const posts = [...db.forumPosts]
      .sort((first, second) => Number(second.pinned) - Number(first.pinned) || Date.parse(second.createdAt) - Date.parse(first.createdAt))
      .map((post) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        category: post.category,
        pinned: Boolean(post.pinned),
        authorId: post.authorId,
        author: post.author,
        createdAt: post.createdAt,
        comments: (Array.isArray(post.comments) ? post.comments : []).map((comment) => ({
          id: comment.id,
          body: comment.body,
          authorId: comment.authorId,
          author: comment.author,
          createdAt: comment.createdAt,
        })),
      }));
    sendJson(res, 200, { posts });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/forum/posts") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    const title = String(body.title || "").trim().slice(0, 80);
    const postBody = String(body.body || "").trim().slice(0, 2000);
    let category = ["Notice", "Question", "Free"].includes(body.category) ? body.category : "Question";
    if (category === "Notice" && user.role !== "admin") category = "Question";
    if (!title || !postBody) {
      sendJson(res, 400, { error: "Title and body are required." });
      return true;
    }
    const post = {
      id: crypto.randomUUID(), title, body: postBody, category, pinned: false,
      authorId: user.id, author: publicDisplayName(user), createdAt: new Date().toISOString(), comments: [],
    };
    db.forumPosts.unshift(post);
    await writeDb(db);
    broadcast(null, { type: "forum:updated", action: "created", postId: post.id });
    sendJson(res, 201, { post });
    return true;
  }

  const forumPostParams = routePattern(pathname, "/api/forum/posts/:id");
  if (req.method === "DELETE" && forumPostParams) {
    if (!requireStaff(user, res)) return true;
    const postIndex = db.forumPosts.findIndex((item) => item.id === forumPostParams.id);
    if (postIndex === -1) {
      sendJson(res, 404, { error: "Forum post not found." });
      return true;
    }
    const [deletedPost] = db.forumPosts.splice(postIndex, 1);
    await writeDb(db);
    broadcast(null, { type: "forum:updated", action: "deleted", postId: deletedPost.id });
    sendJson(res, 200, { ok: true, postId: deletedPost.id });
    return true;
  }

  const forumCommentParams = routePattern(pathname, "/api/forum/posts/:id/comments");
  if (req.method === "POST" && forumCommentParams) {
    if (!requireUser(user, res)) return true;
    const post = db.forumPosts.find((item) => item.id === forumCommentParams.id);
    if (!post) { sendJson(res, 404, { error: "Forum post not found." }); return true; }
    const body = await readBody(req);
    const commentBody = String(body.body || "").trim().slice(0, 1000);
    if (!commentBody) { sendJson(res, 400, { error: "Comment body is required." }); return true; }
    const comment = {
      id: crypto.randomUUID(), body: commentBody, authorId: user.id,
      author: publicDisplayName(user), createdAt: new Date().toISOString(),
    };
    if (!Array.isArray(post.comments)) post.comments = [];
    post.comments.push(comment);
    await writeDb(db);
    broadcast(null, { type: "forum:updated", action: "commented", postId: post.id });
    sendJson(res, 201, { comment });
    return true;
  }

  const forumPinParams = routePattern(pathname, "/api/forum/posts/:id/pin");
  if (req.method === "PATCH" && forumPinParams) {
    if (!requireUser(user, res)) return true;
    if (user.role !== "admin") { sendJson(res, 403, { error: "Staff access required." }); return true; }
    const post = db.forumPosts.find((item) => item.id === forumPinParams.id);
    if (!post) { sendJson(res, 404, { error: "Forum post not found." }); return true; }
    post.pinned = !post.pinned;
    await writeDb(db);
    broadcast(null, { type: "forum:updated", action: "pinned", postId: post.id });
    sendJson(res, 200, { post });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/leagues/leaderboard") {
    const period = searchParams.get("period") === "alltime" ? "alltime" : "weekly";
    const scope = searchParams.get("scope") === "all" ? "all" : "mine";
    if (scope === "all") {
      sendJson(res, 200, defaultLeaderboard(db, period));
      return true;
    }
    const code = String(searchParams.get("code") || user?.leagueCode || "").trim().toUpperCase();
    const league = code ? db.leagues.find((item) => item.code === code) : null;
    sendJson(
      res,
      200,
      league
        ? leagueView(league, db, period)
        : {
            code: "",
            name: "내 리그",
            period,
            scope: "mine",
            emptyReason: "no-league",
            members: [],
          },
    );
    return true;
  }

  if (req.method === "POST" && pathname === "/api/leagues/create") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    let code = leagueCode();
    while (db.leagues.some((league) => league.code === code)) code = leagueCode();
    const league = {
      id: id("league"),
      code,
      name: String(body.name || "EasyMate Class League").trim().slice(0, 80),
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      resetsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    db.leagues.push(league);
    user.leagueCode = code;
    user.leagueCreated = true;
    const unlocked = syncAchievements(user, db);
    await writeDb(db);
    sendJson(res, 201, { league: leagueView(league, db, "weekly"), user: publicUser(user), unlocked });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/leagues/join") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    const code = String(body.code || "").trim().toUpperCase();
    const league = db.leagues.find((item) => item.code === code);
    if (!league) {
      sendJson(res, 404, { error: "League code not found." });
      return true;
    }
    user.leagueCode = code;
    user.weeklyEasyElo = Number(user.weeklyEasyElo ?? user.easyElo ?? 1000);
    user.leagueJoined = true;
    const unlocked = syncAchievements(user, db);
    await writeDb(db);
    sendJson(res, 200, { league: leagueView(league, db, "weekly"), user: publicUser(user), unlocked });
    return true;
  }

  if (req.method === "PUT" && pathname === "/api/profile") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    if (hasOwn(body, "displayName")) {
      const displayName = String(body.displayName || "").trim();
      if (displayName) {
        user.displayName = displayName.slice(0, 60);
        if (body.displayNameSource === "user") user.displayNameSource = "user";
      }
    }
    if (hasOwn(body, "languagePair")) {
      const languagePair = String(body.languagePair || "").trim();
      if (languagePair) user.languagePair = languagePair.slice(0, 80);
    }
    if (hasOwn(body, "pieceEdition")) user.pieceEdition = normalizedPieceEdition(body.pieceEdition);
    if (hasOwn(body, "bio")) user.bio = String(body.bio || "").trim().slice(0, 280);
    if (hasOwn(body, "avatarUrl")) user.avatarUrl = String(body.avatarUrl || "").trim().slice(0, 500);
    if (hasOwn(body, "nativeLanguage")) user.nativeLanguage = String(body.nativeLanguage || "").trim().slice(0, 40);
    if (hasOwn(body, "learningLanguage")) user.learningLanguage = String(body.learningLanguage || "").trim().slice(0, 40);
    await writeDb(db);
    sendJson(res, 200, buildProfile(user, db));
    return true;
  }

  if (req.method === "GET" && pathname === "/api/training/state") {
    if (!requireUser(user, res)) return true;
    user.training = normalizeTraining(user.training);
    sendJson(res, 200, { state: trainingState(user), user: publicUser(user) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/training/tutorial-complete") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    let state;
    try {
      state = markTutorialComplete(user, body.module);
    } catch (error) {
      sendJson(res, 409, { error: error.message, state: trainingState(user) });
      return true;
    }
    applyDailyStreak(user, new Date(), "learning");
    const unlocked = syncAchievements(user, db);
    await writeDb(db);
    sendJson(res, 200, { state, user: publicUser(user), unlocked });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/training/puzzle-complete") {
    if (!requireUser(user, res)) return true;
    user.training = normalizeTraining(user.training);
    const state = trainingState(user);
    if (!state.puzzleUnlocked) {
      sendJson(res, 409, { error: "Finish every training module before opening puzzles.", state });
      return true;
    }
    const body = await readBody(req);
    const puzzleId = String(body.puzzleId || "goryeo-vs-mongol").slice(0, 80);
    const puzzle = {
      id: puzzleId,
      stars: Math.max(0, Math.min(3, Number(body.stars || 0))),
      module: state.nextModule?.id || trainingModules.at(-1).id,
      completedAt: new Date().toISOString(),
    };
    ["title", "theme", "family", "level"].forEach((key) => {
      if (body[key] !== undefined && body[key] !== null) puzzle[key] = String(body[key]).slice(0, 100);
    });
    ["hintsUsed", "durationMs", "familyTotal", "levelTotal"].forEach((key) => {
      if (Number.isFinite(Number(body[key]))) puzzle[key] = Math.max(0, Number(body[key]));
    });
    const existingIndex = user.training.completedPuzzles.findIndex((item) => item.id === puzzleId);
    if (existingIndex >= 0) user.training.completedPuzzles[existingIndex] = { ...user.training.completedPuzzles[existingIndex], ...puzzle };
    else user.training.completedPuzzles.push(puzzle);
    applyDailyStreak(user, new Date(), "learning");
    const unlocked = syncAchievements(user, db);
    await writeDb(db);
    sendJson(res, 200, { state: trainingState(user), user: publicUser(user), unlocked });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/training/review-quiz") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    user.training = normalizeTraining(user.training);
    user.training.reviewQuizzes.push({
      module: Math.min(trainingModules.length, Math.max(1, Number(body.module || 1))),
      score: Math.max(0, Number(body.score || 0)),
      completedAt: new Date().toISOString(),
    });
    applyDailyStreak(user, new Date(), "learning");
    const unlocked = syncAchievements(user, db);
    await writeDb(db);
    sendJson(res, 200, { state: trainingState(user), user: publicUser(user), unlocked });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/achievements/acknowledge") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    const ids = new Set(Array.isArray(body.ids) ? body.ids.map(String) : []);
    userAchievementEntries(user);
    user.badgeNotifications = user.badgeNotifications.filter((badge) => !ids.has(String(badge?.id || badge)));
    await writeDb(db);
    sendJson(res, 200, { user: publicUser(user) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/profile/feedback") {
    if (!requireUser(user, res)) return true;
    if (!requireRateLimit(req, res, user, "feedback", 10)) return true;
    const body = await readBody(req);

    const match = db.matches.find((item) => item.id === body.matchId);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
    if (match.status !== "ended") {
      sendJson(res, 409, { error: "Feedback is available after the match ends." });
      return true;
    }
    if (!matchHasUser(match, user.id)) {
      sendJson(res, 403, { error: "You can only rate players you've matched with." });
      return true;
    }

    const opponent = match.players?.find((player) => player.userId && player.userId !== user.id);
    const target = db.users.find((item) => item.id === (body.targetUserId || opponent?.userId));
    if (!target || target.id === user.id || !endedMatchBetween(match, user.id, target.id)) {
      sendJson(res, 403, { error: "You can only rate players you've matched with." });
      return true;
    }

    target.feedbackReceived = target.feedbackReceived || [];
    const duplicate = target.feedbackReceived.some((item) => item.fromUserId === user.id && item.matchId === match.id);
    if (duplicate) {
      sendJson(res, 409, { error: "You already submitted feedback for this match." });
      return true;
    }

    const allowedKinds = new Set(["positive", "clear", "concern"]);
    const kind = allowedKinds.has(body.kind) ? body.kind : "positive";
    const delta = kind === "concern" ? -1.2 : kind === "clear" ? 0.7 : 0.9;
    target.mannerTemperature = Math.max(0, Math.min(50, Number(target.mannerTemperature ?? 42.8) + delta));
    target.feedbackReceived.push({
      id: id("feedback"),
      kind,
      note: String(body.note || "").trim().slice(0, 220),
      fromUserId: user.id,
      matchId: match.id,
      createdAt: new Date().toISOString(),
    });
    await writeDb(db);
    sendJson(res, 200, { profile: buildProfile(user, db), target: playerUser(target) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/profile/culture-guide") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    const note = String(body.note || "").trim();
    if (!note) {
      sendJson(res, 400, { error: "Culture note is required." });
      return true;
    }
    user.cultureGuide = user.cultureGuide || [];
    user.cultureGuide.push({
      id: id("culture"),
      note: note.slice(0, 300),
      source: body.source || "Profile",
      createdAt: new Date().toISOString(),
    });
    await writeDb(db);
    sendJson(res, 200, buildProfile(user, db));
    return true;
  }

  if (req.method === "GET" && pathname === "/api/stats") {
    sendJson(res, 200, {
      activeMatches: db.matches.filter((match) => match.status !== "ended").length,
      subtitleSessions: db.matches.filter((match) => match.transcript.length > 0).length,
      queuedPlayers: db.queue.length,
      openSeeks: db.seeks.filter((seek) => seek.status === "open").length,
      reviews: db.reviews.length,
      users: db.users.length,
    });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/admin/overview") {
    if (!requireStaff(user, res)) return true;
    const openReports = db.reports.filter((report) => report.status !== "resolved").length;
    sendJson(res, 200, {
      stats: {
        users: db.users.length,
        activeMatches: db.matches.filter((match) => match.status !== "ended").length,
        openReports,
        totalReports: db.reports.length,
      },
      users: db.users.slice(-30).reverse().map(adminUser),
      matches: db.matches.slice(-30).reverse().map(adminMatch),
      reports: db.reports.slice(-30).reverse().map((report) => adminReport(report, db)),
      shopInterests: db.shopInterests.slice(-50).reverse().map((interest) => shopInterestView(interest, db)),
    });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/shop/interests") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    const productName = String(body.productName || "").trim().slice(0, 120);
    if (!productName) {
      sendJson(res, 400, { error: "Product name is required." });
      return true;
    }
    const existing = db.shopInterests.find((interest) => interest.userId === user.id && interest.productName === productName);
    if (existing) {
      existing.updatedAt = new Date().toISOString();
      await writeDb(db);
      sendJson(res, 200, { interest: shopInterestView(existing, db), duplicate: true });
      return true;
    }
    const interest = {
      id: id("shop_interest"),
      productName,
      userId: user.id,
      displayName: user.displayName || "Player",
      email: user.email || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.shopInterests.push(interest);
    await writeDb(db);
    sendJson(res, 201, { interest: shopInterestView(interest, db) });
    return true;
  }

  const resolveReportParams = routePattern(pathname, "/api/admin/reports/:id/resolve");
  if (req.method === "POST" && resolveReportParams) {
    if (!requireStaff(user, res)) return true;
    const report = db.reports.find((item) => item.id === resolveReportParams.id);
    if (!report) {
      sendJson(res, 404, { error: "Report not found." });
      return true;
    }
    report.status = "resolved";
    report.resolvedBy = user.id;
    report.resolvedAt = new Date().toISOString();
    await writeDb(db);
    sendJson(res, 200, { report: adminReport(report, db) });
    return true;
  }

  const deleteReportParams = routePattern(pathname, "/api/admin/reports/:id");
  if (req.method === "DELETE" && deleteReportParams) {
    if (!requireStaff(user, res)) return true;
    const beforeCount = db.reports.length;
    db.reports = db.reports.filter((item) => item.id !== deleteReportParams.id);
    if (db.reports.length === beforeCount) {
      sendJson(res, 404, { error: "Report not found." });
      return true;
    }
    await writeDb(db);
    sendJson(res, 200, { ok: true });
    return true;
  }

  const warnUserParams = routePattern(pathname, "/api/admin/users/:id/warn");
  if (req.method === "POST" && warnUserParams) {
    if (!requireStaff(user, res)) return true;
    const body = await readBody(req);
    const target = db.users.find((item) => item.id === warnUserParams.id);
    if (!target) {
      sendJson(res, 404, { error: "User not found." });
      return true;
    }
    target.warnings = target.warnings || [];
    target.warnings.push({
      id: id("warning"),
      reason: body.reason || "Staff warning",
      by: user.id,
      createdAt: new Date().toISOString(),
    });
    target.mannerTemperature = Math.max(0, Number(target.mannerTemperature ?? 42.8) - 2);
    await writeDb(db);
    broadcast(null, {
      type: "notification",
      category: "warning",
      userId: target.id,
      title: "Staff warning",
      body: body.reason || "Staff safety warning",
    });
    sendJson(res, 200, { user: adminUser(target) });
    return true;
  }

  const reduceWarningParams = routePattern(pathname, "/api/admin/users/:id/warnings/reduce");
  if (req.method === "POST" && reduceWarningParams) {
    if (!requireStaff(user, res)) return true;
    const target = db.users.find((item) => item.id === reduceWarningParams.id);
    if (!target) {
      sendJson(res, 404, { error: "User not found." });
      return true;
    }
    target.warnings = target.warnings || [];
    if (target.warnings.length) target.warnings.pop();
    target.mannerTemperature = Math.min(42.8, Number(target.mannerTemperature ?? 42.8) + 2);
    await writeDb(db);
    sendJson(res, 200, { user: adminUser(target) });
    return true;
  }

  const endAdminMatchParams = routePattern(pathname, "/api/admin/matches/:id/end");
  if (req.method === "POST" && endAdminMatchParams) {
    if (!requireStaff(user, res)) return true;
    const body = await readBody(req);
    const match = db.matches.find((item) => item.id === endAdminMatchParams.id);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
    const wasEnded = match.status === "ended";
    match.status = "ended";
    match.result = body.result || "Ended by staff";
    match.endedAt = new Date().toISOString();
    if (!wasEnded) recordMatchCompletionStreak(match, db);
    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:ended", matchId: match.id, result: match.result, match: decorateMatch(match) });
    sendJson(res, 200, { match: adminMatch(match) });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/matches/lobby") {
    const openSeeks = db.seeks.filter((seek) => seek.status === "open");
    sendJson(res, 200, {
      quickPools,
      openSeeks: openSeeks
        .filter((seek) => seek.userId !== user?.id)
        .slice(-20)
        .reverse()
        .map((seek) => decorateSeek(db, seek)),
      openSeeksTotal: openSeeks.length,
      queuedPlayers: db.queue.length,
    });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/matches/active") {
    if (!requireUser(user, res)) return true;
    const match = activeMatchForUser(db, user);
    const openSeek = db.seeks
      .filter((seek) => seek.userId === user.id && seek.status === "open")
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))[0] || null;
    const openChallenge = db.challenges
      .filter((challenge) => challenge.userId === user.id && challenge.status === "open")
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))[0] || null;
    const queueEntry = db.queue.find((entry) => entry.userId === user.id) || null;
    sendJson(res, 200, {
      match: match ? decorateMatch(match) : null,
      openSeek: openSeek ? decorateSeek(db, openSeek) : null,
      openChallenge,
      queueEntry,
    });
    return true;
  }

  if (req.method === "DELETE" && pathname === "/api/matches/waiting") {
    if (!requireUser(user, res)) return true;
    db.queue = db.queue.filter((entry) => entry.userId !== user.id);
    db.seeks.forEach((seek) => {
      if (seek.userId === user.id && seek.status === "open") seek.status = "canceled";
    });
    const canceledChallengeIds = new Set();
    db.challenges.forEach((challenge) => {
      if (challenge.userId === user.id && challenge.status === "open") {
        challenge.status = "canceled";
        canceledChallengeIds.add(challenge.id);
      }
    });
    db.matches.forEach((match) => {
      if (match.status !== "waiting" || !matchHasUser(match, user.id)) return;
      if (match.challengeId && !canceledChallengeIds.has(match.challengeId)) return;
      match.status = "ended";
      match.result = "Canceled";
      match.endedAt = new Date().toISOString();
    });
    await writeDb(db);
    broadcast(null, { type: "lobby:updated", openSeeks: db.seeks.filter((item) => item.status === "open").length });
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/auth/signup") {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const displayName = String(body.displayName || "").trim().slice(0, 40);
    if (!email || !password) {
      sendJson(res, 400, { error: "Email and password are required." });
      return true;
    }
    if (!displayName) {
      sendJson(res, 400, { error: "Display name is required." });
      return true;
    }

    let found = db.users.find((item) => item.email === email);
    if (found && !verifyPassword(password, found.passwordHash)) {
      sendJson(res, 409, { error: "Account exists. Use the existing password to log in." });
      return true;
    }

    if (!found) {
      found = {
        id: id("user"),
        email,
        displayName,
        displayNameSource: "user",
        languagePair: body.languagePair || "English to Korean",
        pieceEdition: normalizedPieceEdition(body.pieceEdition),
        passwordHash: hashPassword(password),
        mannerTemperature: 42.8,
        streak: 0,
        lastStreakAt: "",
        easyElo: 1000,
        weeklyEasyElo: 1000,
        leagueBadges: [],
        training: defaultTraining(),
        role: signupRole(email, db),
        createdAt: new Date().toISOString(),
      };
      db.users.push(found);
    }

    const token = createSession(db, found.id);
    await writeDb(db);
    sendJson(res, 200, { user: publicUser(found) }, { "set-cookie": sessionCookie(token, req) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/auth/login") {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const found = db.users.find((item) => item.email === email);
    if (!found || !verifyPassword(password, found.passwordHash)) {
      sendJson(res, 401, { error: "Invalid email or password." });
      return true;
    }
    const token = createSession(db, found.id);
    await writeDb(db);
    sendJson(res, 200, { user: publicUser(found) }, { "set-cookie": sessionCookie(token, req) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/auth/google") {
    if (!requireRateLimit(req, res, user, "auth-google", 20)) return true;
    const body = await readBody(req);
    try {
      const googleProfile = await verifyGoogleCredential(body.credential);
      let found = db.users.find((item) => item.email === googleProfile.email);
      if (!found) {
        found = {
          id: id("user"),
          email: googleProfile.email,
          displayName: googleProfile.displayName,
          displayNameSource: "google",
          languagePair: body.languagePair || "English to Korean",
          pieceEdition: normalizedPieceEdition(body.pieceEdition),
          passwordHash: "",
          authProvider: "google",
          googleSub: googleProfile.googleSub,
          avatarUrl: googleProfile.picture,
          mannerTemperature: 42.8,
          streak: 0,
          lastStreakAt: "",
          easyElo: 1000,
          weeklyEasyElo: 1000,
          leagueBadges: [],
          training: defaultTraining(),
          role: signupRole(googleProfile.email, db),
          createdAt: new Date().toISOString(),
        };
        db.users.push(found);
      } else {
        found.authProvider = found.authProvider || "google";
        found.googleSub = found.googleSub || googleProfile.googleSub;
        found.avatarUrl = googleProfile.picture || found.avatarUrl;
        if (!found.displayName) {
          found.displayName = googleProfile.displayName;
          found.displayNameSource = "google";
        }
        if (!found.displayNameSource && !found.passwordHash) found.displayNameSource = "google";
        found.pieceEdition = normalizedPieceEdition(found.pieceEdition);
      }
      const token = createSession(db, found.id);
      await writeDb(db);
      sendJson(res, 200, { user: publicUser(found) }, { "set-cookie": sessionCookie(token, req) });
    } catch (error) {
      sendJson(res, 401, { error: error.message || "Google login failed." });
    }
    return true;
  }

  if (req.method === "POST" && pathname === "/api/auth/logout") {
    const token = getCookie(req, "lc_session");
    const nextDb = {
      ...db,
      sessions: db.sessions.filter((session) => session.token !== token),
    };
    await writeDb(nextDb);
    sendJson(res, 200, { ok: true }, { "set-cookie": sessionCookie("", req, { clear: true }) });
    return true;
  }

  if (req.method === "DELETE" && pathname === "/api/auth/delete") {
    if (!requireUser(user, res)) return true;
    const userId = user.id;
    const nextDb = {
      ...db,
      users: db.users.filter((item) => item.id !== userId),
      sessions: db.sessions.filter((session) => session.userId !== userId),
      queue: db.queue.filter((entry) => entry.userId !== userId),
      seeks: db.seeks.filter((seek) => seek.userId !== userId),
      challenges: db.challenges.filter((challenge) => challenge.userId !== userId),
      matches: db.matches.map((match) => {
        const includesDeletedUser = (match.players || []).some((player) => player.userId === userId);
        if (!includesDeletedUser) return match;
        return {
          ...match,
          userId: match.userId === userId ? null : match.userId,
          status: match.status === "ended" ? match.status : "ended",
          result: match.status === "ended" ? match.result : "Account deleted",
          endedAt: match.endedAt || new Date().toISOString(),
          players: (match.players || []).map((player) =>
            player.userId === userId ? { ...player, userId: null, displayName: "Deleted account" } : player
          ),
          partnerName: match.partnerName === user.displayName ? "Deleted account" : match.partnerName,
        };
      }),
      voiceLetters: db.voiceLetters.filter(
        (letter) => letter.fromUserId !== userId && letter.toUserId !== userId && letter.userId !== userId
      ),
      reports: db.reports.filter((report) => report.reporterId !== userId && report.targetUserId !== userId),
    };
    await writeDb(nextDb);
    sendJson(res, 200, { ok: true }, { "set-cookie": sessionCookie("", req, { clear: true }) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/matches/start") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    const match = createMatch(db, user, { ...body, pairingType: body.pairingType || "practice" });
    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    sendJson(res, 200, { match: decorateMatch(match) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/matches/quick-pair") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    const pool = quickPools.find((item) => item.id === body.poolId) || quickPools[2];
    const matchDetails = {
      ...body,
      poolId: pool.id,
      mode: "Live",
      timeControl: body.timeControl || pool.timeControl,
      rated: Boolean(body.rated ?? pool.rated),
      pairingType: "quick-pool",
      partnerLanguage: body.partnerLanguage || "English",
      goal: body.goal || "Explain chess moves",
    };

    const activeMatch = activeMatchForUser(db, user);
    if (activeMatch) {
      sendJson(res, 200, { waiting: false, match: decorateMatch(activeMatch) });
      return true;
    }

    const existingEntry = db.queue.find(
      (entry) => entry.userId !== user.id && entry.kind === "quick-pool" && entry.poolId === pool.id,
    );
    db.queue = db.queue.filter((entry) => entry.userId !== user.id);

    if (!existingEntry) {
      db.queue.push({
        id: id("queue"),
        kind: "quick-pool",
        userId: user.id,
        poolId: pool.id,
        timeControl: matchDetails.timeControl,
        rated: matchDetails.rated,
        partnerLanguage: matchDetails.partnerLanguage,
        goal: matchDetails.goal,
        createdAt: new Date().toISOString(),
      });
      await writeDb(db);
      broadcast(null, { type: "queue:waiting", userId: user.id, queuedPlayers: db.queue.length, poolId: pool.id });
      sendJson(res, 200, { waiting: true, queuedPlayers: db.queue.length, pool });
      return true;
    }

    const opponent = db.users.find((item) => item.id === existingEntry.userId);
    db.queue = db.queue.filter((entry) => entry.id !== existingEntry.id);
    const match = createMatch(
      db,
      opponent || user,
      {
        ...matchDetails,
        timeControl: existingEntry.timeControl || matchDetails.timeControl,
        rated: existingEntry.rated ?? matchDetails.rated,
        partnerLanguage: matchDetails.partnerLanguage || existingEntry.partnerLanguage,
        goal: matchDetails.goal || existingEntry.goal,
      },
      opponent ? user : null,
    );
    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    broadcast(null, { type: "queue:matched", match: decorateMatch(match) });
    sendJson(res, 200, { waiting: false, match: decorateMatch(match) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/matches/seeks") {
    if (!user) {
      sendJson(res, 401, { error: "Sign in before creating a game." });
      return true;
    }

    const body = await readBody(req);
    const timeControl = body.timeControl || "10+0";
    const rated = Boolean(body.rated);
    const partnerLanguage = body.partnerLanguage || "English";
    const goal = body.goal || "Explain chess moves";
    db.seeks = db.seeks.filter((seek) => !(seek.userId === user.id && seek.status === "open"));
    const matchingSeek = db.seeks.find(
      (seek) =>
        seek.userId !== user.id &&
        seek.status === "open" &&
        seek.timeControl === timeControl &&
        Boolean(seek.rated) === rated &&
        seek.partnerLanguage === partnerLanguage &&
        seek.goal === goal,
    );

    if (matchingSeek) {
      matchingSeek.status = "matched";
      const seeker = db.users.find((item) => item.id === matchingSeek.userId);
      const match = createMatch(
        db,
        seeker || user,
        {
          timeControl,
          rated,
          partnerLanguage,
          goal,
          mode: "Live",
          pairingType: "open-seek",
          seekId: matchingSeek.id,
        },
        seeker ? user : null,
      );
      await writeDb(db);
      await syncRedisRoom(match);
      broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
      broadcast(null, { type: "queue:matched", match: decorateMatch(match) });
      broadcast(null, { type: "lobby:updated", openSeeks: db.seeks.filter((item) => item.status === "open").length });
      sendJson(res, 200, { matched: true, match: decorateMatch(match) });
      return true;
    }

    const seek = {
      id: id("seek"),
      userId: user.id,
      displayName: user.displayName,
      timeControl,
      rated,
      partnerLanguage,
      goal,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    db.seeks.push(seek);
    await writeDb(db);
    broadcast(null, { type: "lobby:updated", openSeeks: db.seeks.filter((item) => item.status === "open").length });
    broadcast(null, {
      type: "notification",
      category: "game-request",
      fromUserId: user.id,
      title: "New game request",
      body: `${user.displayName} created a ${seek.timeControl} ${seek.rated ? "rated" : "casual"} game.`,
    });
    sendJson(res, 200, { seek: decorateSeek(db, seek) });
    return true;
  }

  const acceptSeekParams = routePattern(pathname, "/api/matches/seeks/:id/accept");
  if (req.method === "POST" && acceptSeekParams) {
    if (!user) {
      sendJson(res, 401, { error: "Sign in before joining a game." });
      return true;
    }

    const seek = db.seeks.find((item) => item.id === acceptSeekParams.id && item.status === "open");
    if (!seek) {
      sendJson(res, 404, { error: "Game request not found." });
      return true;
    }
    if (seek.userId === user.id) {
      sendJson(res, 409, { error: "This is your own game request." });
      return true;
    }

    const seeker = db.users.find((item) => item.id === seek.userId);
    seek.status = "accepted";
    seek.acceptedBy = user.id;
    seek.acceptedAt = new Date().toISOString();
    const match = createMatch(
      db,
      seeker || user,
      {
        timeControl: seek.timeControl,
        rated: seek.rated,
        partnerLanguage: seek.partnerLanguage,
        goal: seek.goal,
        mode: "Live",
        pairingType: "open-seek",
        seekId: seek.id,
      },
      seeker ? user : null,
    );
    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    broadcast(null, { type: "queue:matched", match: decorateMatch(match) });
    broadcast(null, { type: "lobby:updated", openSeeks: db.seeks.filter((item) => item.status === "open").length });
    sendJson(res, 200, { match: decorateMatch(match) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/challenges") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    db.challenges.forEach((item) => {
      if (item.userId !== user.id || item.status !== "open") return;
      item.status = "canceled";
      const waitingMatch = item.matchId ? db.matches.find((match) => match.id === item.matchId && match.status === "waiting") : null;
      if (waitingMatch) {
        waitingMatch.status = "ended";
        waitingMatch.result = "Canceled";
        waitingMatch.endedAt = new Date().toISOString();
      }
    });
    const code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const match = createMatch(db, user, {
      timeControl: body.timeControl || "10+0",
      rated: false,
      partnerLanguage: body.partnerLanguage || "English",
      goal: body.goal || "Explain chess moves",
      mode: "Private",
      pairingType: "private-challenge",
      waitingForOpponent: true,
    });
    const challenge = {
      id: id("challenge"),
      code,
      matchId: match.id,
      userId: user.id,
      displayName: user.displayName || "Player",
      timeControl: body.timeControl || "10+0",
      rated: false,
      partnerLanguage: body.partnerLanguage || "English",
      goal: body.goal || "Explain chess moves",
      status: "open",
      createdAt: new Date().toISOString(),
    };
    match.challengeId = challenge.id;
    db.challenges.push(challenge);
    await writeDb(db);
    await syncRedisRoom(match);
    sendJson(res, 200, { challenge, match: decorateMatch(match) });
    return true;
  }

  const acceptChallengeParams = routePattern(pathname, "/api/challenges/:code/accept");
  if (req.method === "POST" && acceptChallengeParams) {
    if (!requireUser(user, res)) return true;

    const code = String(acceptChallengeParams.code || "").trim().toUpperCase();
    const challenge = db.challenges.find((item) => item.code === code && item.status === "open");
    if (!challenge) {
      sendJson(res, 404, { error: "Private challenge code not found or already used." });
      return true;
    }
    if (challenge.userId === user.id) {
      sendJson(res, 409, { error: "You cannot join your own private challenge." });
      return true;
    }

    const challenger = db.users.find((item) => item.id === challenge.userId);
    challenge.status = "accepted";
    challenge.acceptedBy = user.id;
    challenge.acceptedAt = new Date().toISOString();

    let match = challenge.matchId ? db.matches.find((item) => item.id === challenge.matchId) : null;
    if (match) {
      const openSlot = match.players?.find((player) => !player.userId);
      if (!openSlot || match.status === "ended") {
        sendJson(res, 409, { error: "This private room is no longer available." });
        return true;
      }
      openSlot.userId = user.id;
      openSlot.displayName = user.displayName;
      openSlot.pieceEdition = normalizedPieceEdition(user.pieceEdition);
      match.status = "matched";
      match.partnerName = user.displayName;
      match.joinedAt = new Date().toISOString();
      if (match.clocks) {
        match.clocks.running = true;
        match.clocks.lastUpdatedAt = match.joinedAt;
        match.clocks.startedAt = match.joinedAt;
      }
    } else {
      match = createMatch(
        db,
        challenger || null,
        {
          timeControl: challenge.timeControl,
          rated: challenge.rated,
          partnerLanguage: challenge.partnerLanguage,
          goal: challenge.goal,
          mode: "Private",
          pairingType: "private-challenge",
          challengeId: challenge.id,
        },
        user,
      );
      challenge.matchId = match.id;
    }
    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    broadcast(null, { type: "queue:matched", match: decorateMatch(match) });
    sendJson(res, 200, { match: decorateMatch(match), challenge });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/matches/queue") {
    if (!user) {
      sendJson(res, 401, { error: "Sign in before joining live matchmaking." });
      return true;
    }

    const body = await readBody(req);
    const mode = body.mode || "Live";
    const existingEntry = db.queue.find((entry) => entry.userId !== user.id && entry.mode === mode);
    db.queue = db.queue.filter((entry) => entry.userId !== user.id);

    if (!existingEntry) {
      db.queue.push({
        id: id("queue"),
        kind: "language-pool",
        userId: user.id,
        mode,
        partnerLanguage: body.partnerLanguage || "English",
        goal: body.goal || "Explain chess moves",
        createdAt: new Date().toISOString(),
      });
      await writeDb(db);
      broadcast(null, { type: "queue:waiting", userId: user.id, queuedPlayers: db.queue.length });
      sendJson(res, 200, { waiting: true, queuedPlayers: db.queue.length });
      return true;
    }

    const opponent = db.users.find((item) => item.id === existingEntry.userId);
    db.queue = db.queue.filter((entry) => entry.id !== existingEntry.id);
    const match = createMatch(
      db,
      opponent || user,
      {
        mode,
        partnerLanguage: body.partnerLanguage || existingEntry.partnerLanguage,
        goal: body.goal || existingEntry.goal,
        timeControl: body.timeControl || existingEntry.timeControl || "10+0",
        rated: Boolean(body.rated || existingEntry.rated),
        pairingType: "language-pool",
      },
      opponent ? user : null,
    );
    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    broadcast(null, { type: "queue:matched", match: decorateMatch(match) });
    sendJson(res, 200, { waiting: false, match: decorateMatch(match) });
    return true;
  }

  const joinMatchParams = routePattern(pathname, "/api/matches/:id/join");
  if (req.method === "POST" && joinMatchParams) {
    if (!requireUser(user, res)) return true;
    const match = db.matches.find((item) => item.id === joinMatchParams.id);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
    if (match.status === "ended") {
      sendJson(res, 409, { error: "This match has already ended." });
      return true;
    }

    const existingPlayer = match.players?.find((player) => player.userId === user.id);
    if (!existingPlayer) {
      const openSlot = match.players?.find((player) => !player.userId);
      if (!openSlot) {
        sendJson(res, 409, { error: "This match room is already full." });
        return true;
      }
      openSlot.userId = user.id;
      openSlot.displayName = user.displayName;
      openSlot.pieceEdition = normalizedPieceEdition(user.pieceEdition);
      match.partnerName = user.displayName;
      match.joinedAt = new Date().toISOString();
    }

    if ((match.players || []).filter((player) => player.userId).length > 1) {
      match.status = "matched";
      if (match.clocks) {
        match.clocks.running = true;
        match.clocks.lastUpdatedAt = match.joinedAt || new Date().toISOString();
        match.clocks.startedAt = match.clocks.lastUpdatedAt;
      }
      const challenge = match.challengeId
        ? db.challenges.find((item) => item.id === match.challengeId && item.status === "open")
        : null;
      if (challenge) {
        challenge.status = "accepted";
        challenge.acceptedBy = user.id;
        challenge.acceptedAt = new Date().toISOString();
      }
    }

    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:joined", matchId: match.id, match: decorateMatch(match) });
    sendJson(res, 200, { match: decorateMatch(match) });
    return true;
  }

  const moveParams = routePattern(pathname, "/api/matches/:id/move");
  if (req.method === "POST" && moveParams) {
    const body = await readBody(req);
    const match = db.matches.find((item) => item.id === moveParams.id);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
    if (!requireMatchAccess(match, user, res)) return true;
    if (match.status === "ended") {
      sendJson(res, 409, { error: "This match has already ended." });
      return true;
    }

    const game = new Chess(match.fen || undefined);
    const color = playerColor(match, user);
    const humanPlayers = (match.players || []).filter((player) => player.userId);
    if (humanPlayers.length > 1 && color && color !== (game.turn() === "w" ? "white" : "black")) {
      sendJson(res, 403, { error: "It is not your turn." });
      return true;
    }

    let legalMove;
    try {
      legalMove = game.move({
        from: body.from,
        to: body.to,
        promotion: body.promotion || "q",
      });
    } catch {
      legalMove = null;
    }

    if (!legalMove) {
      sendJson(res, 400, { error: `Illegal move: ${body.from || "?"} to ${body.to || "?"}.` });
      return true;
    }

    const result = describeGameResult(game, legalMove);
    const move = {
      from: legalMove.from,
      to: legalMove.to,
      piece: legalMove.piece,
      color: legalMove.color === "w" ? "white" : "black",
      san: legalMove.san,
      captured: legalMove.captured || null,
      promotion: legalMove.promotion || null,
      by: user?.displayName || "You",
      at: new Date().toISOString(),
    };

    match.fen = game.fen();
    match.pgn = game.pgn();
    match.result = result;
    const wasEndedBeforeMove = match.status === "ended";
    applyClockAfterMove(match, legalMove, game);
    if (game.isGameOver()) {
      match.status = "ended";
      match.endedAt = new Date().toISOString();
      if (game.isCheckmate()) {
        match.winnerId = winnerUserIdForColor(match, legalMove.color === "w" ? "white" : "black");
      }
      if (match.clocks) {
        match.clocks.activeColor = null;
        match.clocks.running = false;
      }
    }
    const unlocked = !wasEndedBeforeMove && match.status === "ended" ? recordMatchCompletionStreak(match, db) : [];
    match.moves.push(move);
    match.transcript.push({
      speaker: move.by,
      text: `I played ${move.san}.`,
      translation: `Move notation: ${move.san}.`,
      kind: "move",
      userId: user?.id || null,
      at: move.at,
    });
    await writeDb(db);
    syncRedisRoom(match).catch((error) => console.warn(`Redis room sync failed: ${error.message}`));
    broadcast(match.id, { type: "match:move", matchId: match.id, move, match: decorateMatch(match) });
    sendJson(res, 200, { match: decorateMatch(match), move, unlocked });
    return true;
  }

  const transcriptParams = routePattern(pathname, "/api/matches/:id/transcript");
  if (req.method === "POST" && transcriptParams) {
    const body = await readBody(req);
    const match = db.matches.find((item) => item.id === transcriptParams.id);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
    if (!requireMatchAccess(match, user, res)) return true;
    if (String(body.text || "").length > 2000 || String(body.translation || "").length > 3000) {
      sendJson(res, 400, { error: "Transcript item is too long." });
      return true;
    }
    const item = {
      id: id("transcript"),
      speaker: body.speaker || user?.displayName || "You",
      text: String(body.text || ""),
      translation: body.translation || "",
      kind: body.kind || "speech",
      userId: user?.id || null,
      at: new Date().toISOString(),
    };
    match.transcript.push(item);
    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:transcript", matchId: match.id, item });
    sendJson(res, 200, { item, match: decorateMatch(match) });
    moderateTranscriptItem(match.id, item.id).catch((error) => console.warn(`Transcript moderation failed: ${error.message}`));
    return true;
  }

  const endParams = routePattern(pathname, "/api/matches/:id/end");
  if (req.method === "POST" && endParams) {
    const body = await readBody(req);
    const match = db.matches.find((item) => item.id === endParams.id);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
    if (!requireMatchAccess(match, user, res)) return true;
    const wasEnded = match.status === "ended";
    if (match.clocks) {
      match.clocks = liveClockState(match);
    }
    match.status = "ended";
    match.result = body.result || match.result || "Completed";
    const requestedWinnerId = String(body.winnerId || "").trim();
    const requestedWinnerColor = String(body.winnerColor || "").toLowerCase();
    if (requestedWinnerId && matchHasUser(match, requestedWinnerId)) {
      match.winnerId = requestedWinnerId;
    } else if (["white", "black"].includes(requestedWinnerColor)) {
      match.winnerId = winnerUserIdForColor(match, requestedWinnerColor);
    }
    match.endedAt = new Date().toISOString();
    if (match.clocks) {
      match.clocks.activeColor = null;
      match.clocks.running = false;
      match.clocks.lastUpdatedAt = match.endedAt;
    }
    const unlocked = !wasEnded ? recordMatchCompletionStreak(match, db) : [];
    await writeDb(db);
    await syncRedisRoom(match);
    broadcast(match.id, { type: "match:ended", matchId: match.id, result: match.result, match: decorateMatch(match) });
    sendJson(res, 200, { match: decorateMatch(match), unlocked });
    return true;
  }

  const reviewParams = routePattern(pathname, "/api/matches/:id/review");
  if (req.method === "POST" && reviewParams) {
    const match = db.matches.find((item) => item.id === reviewParams.id);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
    if (!requireMatchAccess(match, user, res)) return true;
    const review = buildReview(match);
    match.reviewId = review.id;
    db.reviews.push(review);
    await writeDb(db);
    broadcast(match.id, { type: "review:generated", matchId: match.id, review });
    sendJson(res, 200, { review });
    return true;
  }

  const matchParams = routePattern(pathname, "/api/matches/:id");
  if (req.method === "GET" && matchParams) {
    const match = db.matches.find((item) => item.id === matchParams.id);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
    if (!requireMatchAccess(match, user, res)) return true;
    sendJson(res, 200, { match: decorateMatch(match) });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/reviews/latest") {
    if (!requireUser(user, res)) return true;
    const userMatchIds = new Set(
      db.matches
        .filter((match) => matchParticipant(match, user))
        .map((match) => match.id),
    );
    const review = db.reviews.filter((item) => userMatchIds.has(item.matchId)).at(-1) || null;
    sendJson(res, 200, { review });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/voice-letters") {
    if (!requireUser(user, res)) return true;
    const voiceLetters = db.voiceLetters
      .filter((letter) => letter.fromUserId === user.id || letter.toUserId === user.id || letter.userId === user.id)
      .slice(-20)
      .reverse();
    sendJson(res, 200, { voiceLetters });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/voice-letters") {
    if (!requireUser(user, res)) return true;
    const body = await readBody(req);
    if (String(body.note || "").length > 500 || String(body.transcript || "").length > 3000) {
      sendJson(res, 400, { error: "Voice letter is too long." });
      return true;
    }
    const voiceLetter = {
      id: id("letter"),
      fromUserId: user.id,
      toUserId: body.toUserId || null,
      recipient: String(body.recipient || "Mina K.").slice(0, 80),
      note: String(body.note || "").slice(0, 500),
      transcript: String(body.transcript || "").slice(0, 3000),
      createdAt: new Date().toISOString(),
    };
    db.voiceLetters.push(voiceLetter);
    await writeDb(db);
    broadcast(null, {
      type: "notification",
      category: "voicemail",
      fromUserId: user.id,
      title: "New voice letter",
      body: `${user.displayName || "Player"} sent a voice letter.`,
    });
    sendJson(res, 200, { voiceLetter });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/reports") {
    if (normalizedRole(user) !== "staff") {
      sendJson(res, 403, { error: "Staff access required." });
      return true;
    }
    sendJson(res, 200, { reports: db.reports.slice(-50).reverse() });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/reports") {
    if (!requireUser(user, res)) return true;
    if (!requireRateLimit(req, res, user, "reports", 10)) return true;
    const body = await readBody(req);
    if (String(body.detail || "").length > 1000) {
      sendJson(res, 400, { error: "Report detail is too long." });
      return true;
    }
    const report = {
      id: id("report"),
      matchId: body.matchId || null,
      reporterId: user.id,
      reason: body.reason || "Safety report",
      detail: body.detail || "",
      status: "open",
      createdAt: new Date().toISOString(),
    };
    db.reports.push(report);
    await writeDb(db);
    sendJson(res, 200, { report });
    return true;
  }

  return false;
}

function serveStatic(req, res, pathname) {
  const matchRoute = routePattern(pathname, "/match/:id");
  const tutorialRoute = pathname === "/tutorial" || pathname === "/tutorial/";
  const staffRoute = pathname === "/staff" || pathname === "/staff/";
  const requested = pathname === "/" || matchRoute || tutorialRoute || staffRoute ? "/index.html" : decodeURIComponent(pathname);
  const filePath = path.normalize(path.join(rootDir, requested));
  const relative = path.relative(rootDir, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  const allowedStatic =
    requested === "/index.html" ||
    requested === "/app.js" ||
    requested === "/styles.css" ||
    requested === "/hallmark-demo.html" ||
    requested === "/hallmark-demo.css" ||
    requested === "/tokens.css" ||
    requested === "/google0bf39d77e9bebab7.html" ||
    requested.startsWith("/assets/");

  if (!allowedStatic) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  fs.stat(filePath, async (statError, stats) => {
    if (statError || !stats.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const extension = path.extname(filePath).toLowerCase();
    const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;
    const responseHeaders = {
      "content-type": contentTypes[extension] || "application/octet-stream",
      etag,
    };
    if (compressibleExtensions.has(extension)) responseHeaders.vary = "Accept-Encoding";
    if (requested.startsWith("/assets/tutorial-pieces/") || /-v\d+\.[a-z0-9]+$/i.test(requested)) {
      responseHeaders["cache-control"] = "public, max-age=31536000, immutable";
    } else if (requested === "/index.html" || requested === "/app.js" || requested === "/styles.css" || extension === ".html") {
      responseHeaders["cache-control"] = "no-cache, must-revalidate";
    } else {
      responseHeaders["cache-control"] = "public, max-age=3600, must-revalidate";
    }
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, responseHeaders);
      res.end();
      return;
    }

    if (req.method === "HEAD") {
      responseHeaders["content-length"] = stats.size;
      res.writeHead(200, responseHeaders);
      res.end();
      return;
    }

    if (!compressibleExtensions.has(extension)) {
      responseHeaders["content-length"] = stats.size;
      res.writeHead(200, responseHeaders);
      const stream = fs.createReadStream(filePath);
      stream.on("error", () => res.destroy());
      stream.pipe(res);
      return;
    }

    try {
      let cached = staticTextCache.get(filePath);
      if (!cached || cached.etag !== etag) {
        const data = await fs.promises.readFile(filePath);
        const [gzip, brotli] = await Promise.all([
          gzipAsync(data, { level: zlib.constants.Z_BEST_SPEED }),
          brotliAsync(data, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 } }),
        ]);
        cached = { etag, data, gzip, brotli };
        staticTextCache.set(filePath, cached);
      }

      const accepted = String(req.headers["accept-encoding"] || "");
      let body = cached.data;
      if (/\bbr\b/i.test(accepted)) {
        body = cached.brotli;
        responseHeaders["content-encoding"] = "br";
      } else if (/\bgzip\b/i.test(accepted)) {
        body = cached.gzip;
        responseHeaders["content-encoding"] = "gzip";
      }
      responseHeaders["content-length"] = body.length;
      res.writeHead(200, responseHeaders);
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
}

const clients = new Set();

async function acceptWebSocket(req, socket) {
  const key = req.headers["sec-websocket-key"];
  if (!key) {
    socket.destroy();
    return;
  }
  const db = await readDb();
  const user = getSessionUser(req, db);
  if (!user) {
    socket.write("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n");
    socket.destroy();
    return;
  }
  const accept = crypto
    .createHash("sha1")
    .update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`)
    .digest("base64");
  socket.write(
    [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${accept}`,
      "",
      "",
    ].join("\r\n"),
  );

  const client = { socket, user, matchId: null, clientId: null, frameBuffer: Buffer.alloc(0) };
  clients.add(client);

  socket.on("data", (buffer) => {
    client.frameBuffer = Buffer.concat([client.frameBuffer, buffer]);
    const decoded = decodeFrames(client.frameBuffer);
    client.frameBuffer = decoded.remaining;
    for (const message of decoded.messages) {
      handleSocketMessage(client, message).catch((error) => {
        sendSocket(client, { type: "socket:error", error: error.message || "Socket message failed." });
      });
    }
  });

  socket.on("close", () => clients.delete(client));
  socket.on("error", () => clients.delete(client));
  sendSocket(client, { type: "socket:ready" });
}

function decodeFrames(buffer) {
  const messages = [];
  let offset = 0;
  while (offset + 2 <= buffer.length) {
    const frameStart = offset;
    const first = buffer[offset++];
    const second = buffer[offset++];
    const opcode = first & 0x0f;
    let length = second & 0x7f;
    if (length === 126) {
      if (offset + 2 > buffer.length) {
        offset = frameStart;
        break;
      }
      length = buffer.readUInt16BE(offset);
      offset += 2;
    } else if (length === 127) {
      if (offset + 8 > buffer.length) {
        offset = frameStart;
        break;
      }
      length = Number(buffer.readBigUInt64BE(offset));
      offset += 8;
    }
    const masked = (second & 0x80) !== 0;
    const mask = masked ? buffer.subarray(offset, offset + 4) : null;
    if (masked && offset + 4 > buffer.length) {
      offset = frameStart;
      break;
    }
    if (masked) offset += 4;
    if (offset + length > buffer.length) {
      offset = frameStart;
      break;
    }
    const payload = buffer.subarray(offset, offset + length);
    offset += length;
    if (opcode === 8) return { messages, remaining: Buffer.alloc(0) };
    if (opcode !== 1) continue;
    const text = Buffer.from(payload);
    if (mask) {
      for (let index = 0; index < text.length; index += 1) {
        text[index] ^= mask[index % 4];
      }
    }
    messages.push(text.toString("utf8"));
  }
  return { messages, remaining: buffer.subarray(offset) };
}

function sendSocket(client, data) {
  const text = JSON.stringify(data);
  const payload = Buffer.from(text);
  let header;
  if (payload.length < 126) {
    header = Buffer.from([0x81, payload.length]);
  } else if (payload.length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(payload.length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(payload.length), 2);
  }
  client.socket.write(Buffer.concat([header, payload]));
}

function broadcast(matchId, data, excludeClient = null) {
  for (const client of clients) {
    if (client === excludeClient) continue;
    if (!matchId || client.matchId === matchId) {
      sendSocket(client, data);
    }
  }
}

async function socketMatchForUser(matchId, user) {
  if (!matchId || !user) return null;
  const db = await readDb();
  const match = db.matches.find((item) => item.id === matchId);
  if (!match || !canAccessMatch(match, user)) return null;
  return match;
}

async function handleSocketMessage(client, message) {
  let data;
  try {
    data = JSON.parse(message);
  } catch {
    return;
  }

  if (data.type === "join") {
    const requestedMatchId = data.matchId || null;
    if (requestedMatchId) {
      const match = await socketMatchForUser(requestedMatchId, client.user);
      if (!match) {
        sendSocket(client, { type: "socket:error", error: "You do not have access to this match." });
        return;
      }
    }
    client.matchId = requestedMatchId;
    client.clientId = data.clientId || client.clientId || id("client");
    touchRedisPresence(client.matchId, client.clientId).catch(() => {});
    sendSocket(client, { type: "socket:joined", matchId: client.matchId });
    return;
  }

  if (data.matchId) {
    if (data.matchId !== client.matchId) {
      const match = await socketMatchForUser(data.matchId, client.user);
      if (!match) {
        sendSocket(client, { type: "socket:error", error: "You do not have access to this match." });
        return;
      }
      client.matchId = data.matchId;
    }
    client.clientId = data.from || data.clientId || client.clientId || id("client");
    touchRedisPresence(client.matchId, client.clientId).catch(() => {});
    broadcast(data.matchId, data, data.type?.startsWith("voice:") ? client : null);
  }
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (req.method === "GET" && requestUrl.pathname === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        app: "Live Chess",
        storage: pgPool ? "postgres" : "local-json",
        storageStatus: storageReady ? "ready" : "connecting",
        storageError: storageError ? "temporarily unavailable" : null,
        postgresProvider: databaseUrl?.includes("supabase") ? "supabase" : pgPool ? "postgres" : null,
        redis: redisEnabled ? "upstash" : "disabled",
        translator: nvidiaEnabled ? "nvidia" : "mymemory",
        nvidia: nvidiaEnabled ? "configured" : "not-configured",
        safetyModel: nvidiaEnabled ? nvidiaSafetyModel : "local-fallback",
        translatorEmail: myMemoryEmail ? "configured" : "anonymous",
        streakTimeZone,
        now: new Date().toISOString(),
      });
      return;
    }
    if (requestUrl.pathname.startsWith("/api/")) {
      const handled = await handleApi(req, res, requestUrl.pathname, requestUrl.searchParams);
      if (!handled) sendJson(res, 404, { error: "API route not found." });
      return;
    }
    serveStatic(req, res, requestUrl.pathname);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error." });
  }
});

server.on("upgrade", (req, socket) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  if (requestUrl.pathname !== "/ws") {
    socket.destroy();
    return;
  }
  acceptWebSocket(req, socket).catch(() => {
    socket.write("HTTP/1.1 500 Internal Server Error\r\nConnection: close\r\n\r\n");
    socket.destroy();
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Live Chess app running at http://localhost:${port}`);
  initializeStorage();
});
