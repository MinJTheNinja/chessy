const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { URL } = require("url");
const { Chess } = require("chess.js");
const { Pool } = require("pg");

const rootDir = __dirname;
const dataDir = path.join(rootDir, ".localappdata", "live-chess");
const dbPath = path.join(dataDir, "db.json");
const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL;
const pgPool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: /sslmode=require|ssl=true/i.test(databaseUrl) || process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false,
    })
  : null;
let pgReady = null;

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
    description: "Best for STT practice",
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
  };
}

function ensureJsonDb() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    writeJsonDb(defaultDb());
  }
}

function readJsonDb() {
  ensureJsonDb();
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  return normalizeDb(db);
}

function writeJsonDb(db) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(normalizeDb(db), null, 2), "utf8");
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
    })();
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

async function readDb() {
  if (!pgPool) return readJsonDb();
  await ensurePostgresDb();
  const result = await pgPool.query("SELECT data FROM app_state WHERE id = $1", ["main"]);
  return normalizeDb(result.rows[0]?.data || defaultDb());
}

async function writeDb(db) {
  if (!pgPool) {
    writeJsonDb(db);
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

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
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

function getCookie(req, name) {
  const cookie = req.headers.cookie || "";
  return cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")[1];
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
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    languagePair: user.languagePair,
    mannerTemperature: user.mannerTemperature,
    role: user.role || "player",
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

function decorateMatch(match) {
  return {
    ...match,
    game: serializeGame(match.fen || new Chess().fen()),
  };
}

function playerColor(match, user) {
  if (!user) return null;
  return match.players?.find((player) => player.userId === user.id)?.color || null;
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

function createMatch(db, user, body = {}, opponent = null) {
  const game = new Chess();
  const white = user
    ? { userId: user.id, displayName: user.displayName, color: "white" }
    : { userId: null, displayName: "Guest", color: "white" };
  const black = opponent
    ? { userId: opponent.id, displayName: opponent.displayName, color: "black" }
    : { userId: null, displayName: "Mina K.", color: "black" };

  const match = {
    id: id("match"),
    status: "matched",
    userId: user?.id || null,
    players: [white, black],
    partnerName: black.displayName,
    partnerLanguage: body.partnerLanguage || "English",
    mode: body.mode || "Live",
    goal: body.goal || "Explain chess moves",
    timeControl: body.timeControl || "10+0",
    rated: Boolean(body.rated),
    pairingType: body.pairingType || "practice",
    poolId: body.poolId || null,
    seekId: body.seekId || null,
    result: "In progress",
    fen: game.fen(),
    pgn: "",
    moves: [],
    transcript: [...sampleTranscript],
    reviewId: null,
    createdAt: new Date().toISOString(),
    endedAt: null,
  };
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

async function handleApi(req, res, pathname) {
  const db = await readDb();
  const user = getSessionUser(req, db);

  if (req.method === "GET" && pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      app: "Live Chess",
      storage: pgPool ? "postgres" : "local-json",
      now: new Date().toISOString(),
    });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/session") {
    sendJson(res, 200, { user: publicUser(user) });
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

  if (req.method === "GET" && pathname === "/api/matches/lobby") {
    sendJson(res, 200, {
      quickPools,
      openSeeks: db.seeks
        .filter((seek) => seek.status === "open")
        .slice(-20)
        .reverse()
        .map((seek) => decorateSeek(db, seek)),
      queuedPlayers: db.queue.length,
    });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/auth/signup") {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!email || !password) {
      sendJson(res, 400, { error: "Email and password are required." });
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
        displayName: body.displayName || email.split("@")[0] || "ChessLearner",
        languagePair: body.languagePair || "English to Korean",
        passwordHash: hashPassword(password),
        mannerTemperature: 42.8,
        role: db.users.length === 0 ? "admin" : "player",
        createdAt: new Date().toISOString(),
      };
      db.users.push(found);
    }

    const token = createSession(db, found.id);
    await writeDb(db);
    sendJson(res, 200, { user: publicUser(found) }, { "set-cookie": `lc_session=${token}; Path=/; SameSite=Lax` });
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
    sendJson(res, 200, { user: publicUser(found) }, { "set-cookie": `lc_session=${token}; Path=/; SameSite=Lax` });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/auth/logout") {
    const token = getCookie(req, "lc_session");
    const nextDb = {
      ...db,
      sessions: db.sessions.filter((session) => session.token !== token),
    };
    await writeDb(nextDb);
    sendJson(res, 200, { ok: true }, { "set-cookie": "lc_session=; Path=/; Max-Age=0; SameSite=Lax" });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/matches/start") {
    const body = await readBody(req);
    const match = createMatch(db, user, { ...body, pairingType: body.pairingType || "practice" });
    await writeDb(db);
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    sendJson(res, 200, { match: decorateMatch(match) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/matches/quick-pair") {
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

    if (!user) {
      const match = createMatch(db, null, { ...matchDetails, pairingType: "guest-practice" });
      await writeDb(db);
      broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
      sendJson(res, 200, { waiting: false, match: decorateMatch(match), practice: true });
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
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    broadcast(null, { type: "queue:matched", match: decorateMatch(match) });
    sendJson(res, 200, { waiting: false, match: decorateMatch(match) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/matches/seeks") {
    if (!user) {
      sendJson(res, 401, { error: "Sign in before creating an open seek." });
      return true;
    }

    const body = await readBody(req);
    db.seeks = db.seeks.filter((seek) => !(seek.userId === user.id && seek.status === "open"));
    const seek = {
      id: id("seek"),
      userId: user.id,
      displayName: user.displayName,
      timeControl: body.timeControl || "10+0",
      rated: Boolean(body.rated),
      partnerLanguage: body.partnerLanguage || "English",
      goal: body.goal || "Explain chess moves",
      status: "open",
      createdAt: new Date().toISOString(),
    };
    db.seeks.push(seek);
    await writeDb(db);
    broadcast(null, { type: "lobby:updated", openSeeks: db.seeks.filter((item) => item.status === "open").length });
    sendJson(res, 200, { seek: decorateSeek(db, seek) });
    return true;
  }

  const acceptSeekParams = routePattern(pathname, "/api/matches/seeks/:id/accept");
  if (req.method === "POST" && acceptSeekParams) {
    if (!user) {
      sendJson(res, 401, { error: "Sign in before accepting an open seek." });
      return true;
    }

    const seek = db.seeks.find((item) => item.id === acceptSeekParams.id && item.status === "open");
    if (!seek) {
      sendJson(res, 404, { error: "Open seek not found." });
      return true;
    }
    if (seek.userId === user.id) {
      sendJson(res, 409, { error: "This is your own open seek." });
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
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    broadcast(null, { type: "queue:matched", match: decorateMatch(match) });
    broadcast(null, { type: "lobby:updated", openSeeks: db.seeks.filter((item) => item.status === "open").length });
    sendJson(res, 200, { match: decorateMatch(match) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/challenges") {
    const body = await readBody(req);
    const code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const challenge = {
      id: id("challenge"),
      code,
      userId: user?.id || null,
      displayName: user?.displayName || "Guest",
      timeControl: body.timeControl || "10+0",
      rated: false,
      partnerLanguage: body.partnerLanguage || "English",
      goal: body.goal || "Explain chess moves",
      status: "open",
      createdAt: new Date().toISOString(),
    };
    db.challenges.push(challenge);
    await writeDb(db);
    sendJson(res, 200, { challenge });
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
    broadcast(match.id, { type: "match:started", match: decorateMatch(match) });
    broadcast(null, { type: "queue:matched", match: decorateMatch(match) });
    sendJson(res, 200, { waiting: false, match: decorateMatch(match) });
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
    if (game.isGameOver()) {
      match.status = "ended";
      match.endedAt = new Date().toISOString();
    }
    match.moves.push(move);
    match.transcript.push({
      speaker: move.by,
      text: `I played ${move.san}.`,
      translation: `Move notation: ${move.san}.`,
      kind: "move",
      at: move.at,
    });
    await writeDb(db);
    broadcast(match.id, { type: "match:move", matchId: match.id, move, match: decorateMatch(match) });
    sendJson(res, 200, { match: decorateMatch(match), move });
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
    const item = {
      speaker: body.speaker || user?.displayName || "You",
      text: String(body.text || ""),
      translation: body.translation || "",
      kind: body.kind || "speech",
      at: new Date().toISOString(),
    };
    match.transcript.push(item);
    await writeDb(db);
    broadcast(match.id, { type: "match:transcript", matchId: match.id, item });
    sendJson(res, 200, { item, match: decorateMatch(match) });
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
    match.status = "ended";
    match.result = body.result || match.result || "Completed";
    match.endedAt = new Date().toISOString();
    await writeDb(db);
    broadcast(match.id, { type: "match:ended", matchId: match.id, result: match.result, match: decorateMatch(match) });
    sendJson(res, 200, { match: decorateMatch(match) });
    return true;
  }

  const reviewParams = routePattern(pathname, "/api/matches/:id/review");
  if (req.method === "POST" && reviewParams) {
    const match = db.matches.find((item) => item.id === reviewParams.id);
    if (!match) {
      sendJson(res, 404, { error: "Match not found." });
      return true;
    }
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
    sendJson(res, 200, { match: decorateMatch(match) });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/reviews/latest") {
    sendJson(res, 200, { review: db.reviews.at(-1) || null });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/voice-letters") {
    sendJson(res, 200, { voiceLetters: db.voiceLetters.slice(-20).reverse() });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/voice-letters") {
    const body = await readBody(req);
    const voiceLetter = {
      id: id("letter"),
      fromUserId: user?.id || null,
      recipient: body.recipient || "Mina K.",
      note: body.note || "",
      transcript: body.transcript || "",
      createdAt: new Date().toISOString(),
    };
    db.voiceLetters.push(voiceLetter);
    await writeDb(db);
    sendJson(res, 200, { voiceLetter });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/reports") {
    if (user?.role !== "admin") {
      sendJson(res, 403, { error: "Admin access required." });
      return true;
    }
    sendJson(res, 200, { reports: db.reports.slice(-50).reverse() });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/reports") {
    const body = await readBody(req);
    const report = {
      id: id("report"),
      matchId: body.matchId || null,
      reporterId: user?.id || null,
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
  const requested = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const filePath = path.normalize(path.join(rootDir, requested));
  const relative = path.relative(rootDir, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "content-type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}

const clients = new Set();

function acceptWebSocket(req, socket) {
  const key = req.headers["sec-websocket-key"];
  if (!key) {
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

  const client = { socket, matchId: null };
  clients.add(client);

  socket.on("data", (buffer) => {
    for (const message of decodeFrames(buffer)) {
      handleSocketMessage(client, message);
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
    const first = buffer[offset++];
    const second = buffer[offset++];
    const opcode = first & 0x0f;
    let length = second & 0x7f;
    if (length === 126) {
      if (offset + 2 > buffer.length) break;
      length = buffer.readUInt16BE(offset);
      offset += 2;
    } else if (length === 127) {
      if (offset + 8 > buffer.length) break;
      length = Number(buffer.readBigUInt64BE(offset));
      offset += 8;
    }
    const masked = (second & 0x80) !== 0;
    const mask = masked ? buffer.subarray(offset, offset + 4) : null;
    if (masked) offset += 4;
    if (offset + length > buffer.length) break;
    const payload = buffer.subarray(offset, offset + length);
    offset += length;
    if (opcode === 8) break;
    if (opcode !== 1) continue;
    const text = Buffer.from(payload);
    if (mask) {
      for (let index = 0; index < text.length; index += 1) {
        text[index] ^= mask[index % 4];
      }
    }
    messages.push(text.toString("utf8"));
  }
  return messages;
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

function broadcast(matchId, data) {
  for (const client of clients) {
    if (!matchId || client.matchId === matchId) {
      sendSocket(client, data);
    }
  }
}

function handleSocketMessage(client, message) {
  let data;
  try {
    data = JSON.parse(message);
  } catch {
    return;
  }

  if (data.type === "join") {
    client.matchId = data.matchId || null;
    sendSocket(client, { type: "socket:joined", matchId: client.matchId });
    return;
  }

  if (data.matchId) {
    client.matchId = data.matchId;
    broadcast(data.matchId, data);
  }
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (requestUrl.pathname.startsWith("/api/")) {
      const handled = await handleApi(req, res, requestUrl.pathname);
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
  acceptWebSocket(req, socket);
});

ensureDb()
  .then(() => {
    server.listen(port, "0.0.0.0", () => {
      console.log(`Live Chess app running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize storage:", error);
    process.exitCode = 1;
  });
