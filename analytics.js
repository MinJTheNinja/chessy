const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const DEFAULT_MAX_BATCH_SIZE = 20;

const allowedEventNames = new Set([
  "session_started",
  "page_viewed",
  "session_ended",
  "signup_started",
  "signup_completed",
  "signup_failed",
  "login_started",
  "login_completed",
  "login_failed",
  "logout_completed",
  "play_page_viewed",
  "quick_match_clicked",
  "matchmaking_started",
  "matchmaking_cancelled",
  "match_found",
  "match_started",
  "match_completed",
  "match_abandoned",
  "room_create_clicked",
  "room_created",
  "invite_shared",
  "room_join_attempted",
  "room_joined",
  "room_join_failed",
  "game_started",
  "game_completed",
  "training_opened",
  "puzzle_started",
  "puzzle_attempted",
  "puzzle_completed",
  "puzzle_abandoned",
  "review_opened",
  "review_started",
  "review_completed",
  "review_abandoned",
  "community_opened",
  "post_opened",
  "post_created",
  "profile_opened",
  "piece_guide_opened",
  "piece_guide_auto_opened",
  "piece_guide_closed",
  "culture_content_impression",
  "culture_content_opened",
  "culture_content_completed",
  "culture_related_content_opened",
  "api_error",
  "matchmaking_error",
  "room_creation_error",
  "room_join_error",
  "game_connection_error",
  "review_generation_error",
]);

const propertyRules = {
  match_type: "string",
  rated: "boolean",
  matchmaking_duration_ms: "number",
  game_duration_ms: "number",
  result: "string",
  room_creation_duration_ms: "number",
  join_method: "string",
  wait_duration_ms: "number",
  failure_reason: "string",
  puzzle_id: "string",
  difficulty: "string",
  attempt_count: "number",
  duration_ms: "number",
  review_generation_duration_ms: "number",
  module: "number",
  score: "number",
  post_id: "string",
  content_id: "string",
  content_type: "string",
  region: "string",
  category: "string",
  source_feature: "string",
  error_code: "string",
  operation: "string",
  http_status: "number",
  page_load_duration_ms: "number",
  experiment: "string",
  variant: "string",
  time_control: "string",
  provider: "string",
  source: "string",
  mode: "string",
};

function analyticsId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function cleanIdentifier(value, prefix) {
  const normalized = String(value || "").trim();
  const pattern = new RegExp(`^${prefix}_[A-Za-z0-9-]{16,80}$`);
  return pattern.test(normalized) ? normalized : null;
}

function cleanText(value, maxLength = 100) {
  return String(value || "").trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, maxLength);
}

function cleanPage(value) {
  const source = String(value || "").trim();
  if (!source.startsWith("/") || source.startsWith("//")) return "/";
  return source.split(/[?#]/, 1)[0].slice(0, 160) || "/";
}

function cleanOperation(value) {
  const pathname = cleanPage(value);
  return pathname
    .replace(/\/api\/challenges\/[^/]+\/accept$/, "/api/challenges/:code/accept")
    .replace(/\/api\/matches\/seeks\/[^/]+\/accept$/, "/api/matches/seeks/:id/accept")
    .replace(/\/api\/matches\/[^/]+\/(join|move|transcript|end|review)$/, "/api/matches/:id/$1")
    .replace(/\/api\/admin\/(reports|users|matches)\/[^/]+(.*)$/, "/api/admin/$1/:id$2")
    .slice(0, 120);
}

function cleanTimestamp(value, now = Date.now()) {
  const parsed = Date.parse(value || "");
  if (!Number.isFinite(parsed) || Math.abs(parsed - now) > 24 * 60 * 60 * 1000) return new Date(now).toISOString();
  return new Date(parsed).toISOString();
}

function sanitizeProperties(properties = {}) {
  if (!properties || typeof properties !== "object" || Array.isArray(properties)) return {};
  const sanitized = {};
  Object.entries(properties).forEach(([key, value]) => {
    const rule = propertyRules[key];
    if (!rule) return;
    if (key === "operation") {
      sanitized[key] = cleanOperation(value);
      return;
    }
    if (rule === "boolean" && typeof value === "boolean") sanitized[key] = value;
    if (rule === "number") {
      const number = Number(value);
      if (Number.isFinite(number)) sanitized[key] = Math.max(0, Math.min(number, 30 * 24 * 60 * 60 * 1000));
    }
    if (rule === "string") {
      const text = cleanText(value);
      if (text) sanitized[key] = text;
    }
  });
  return sanitized;
}

function normalizeEvent(event, now = Date.now()) {
  if (!event || typeof event !== "object" || Array.isArray(event)) throw new Error("Invalid analytics event.");
  const eventName = cleanText(event.event_name || event.eventName, 80);
  if (!allowedEventNames.has(eventName)) throw new Error(`Unsupported analytics event: ${eventName || "unknown"}.`);
  const eventId = cleanIdentifier(event.event_id || event.eventId, "ae") || analyticsId("ae");
  return {
    eventId,
    eventName,
    timestamp: cleanTimestamp(event.timestamp, now),
    page: cleanPage(event.page),
    previousPage: event.previous_page || event.previousPage ? cleanPage(event.previous_page || event.previousPage) : null,
    properties: sanitizeProperties(event.properties),
  };
}

function parseBrowserFamily(userAgent = "") {
  const source = String(userAgent);
  if (/Edg\//.test(source)) return "Edge";
  if (/Firefox\//.test(source)) return "Firefox";
  if (/Chrome\//.test(source)) return "Chrome";
  if (/Safari\//.test(source) && /Version\//.test(source)) return "Safari";
  return "Other";
}

function parseDeviceType(userAgent = "") {
  const source = String(userAgent);
  if (/iPad|Tablet/i.test(source)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(source)) return "mobile";
  return "desktop";
}

function cleanReferrerDomain(value) {
  try {
    const url = new URL(String(value || ""));
    return cleanText(url.hostname.toLowerCase(), 120) || null;
  } catch {
    return null;
  }
}

function emptyLocalAnalytics() {
  return { sessions: [], events: [] };
}

function percentileMedian(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

class AnalyticsStore {
  constructor(options = {}) {
    this.pgPool = options.pgPool || null;
    this.dataDir = options.dataDir;
    this.localPath = path.join(this.dataDir, "analytics.json");
    this.sessionTimeoutMs = Math.max(100, Number(options.sessionTimeoutMs || DEFAULT_SESSION_TIMEOUT_MS));
    this.maxBatchSize = Math.max(1, Number(options.maxBatchSize || DEFAULT_MAX_BATCH_SIZE));
    this.localCache = null;
    this.writeQueue = Promise.resolve();
    this.ready = null;
  }

  initialize() {
    if (this.ready) return this.ready;
    this.ready = (this.pgPool ? this.initializePostgres() : this.initializeLocal()).catch((error) => {
      this.ready = null;
      throw error;
    });
    return this.ready;
  }

  async initializeLocal() {
    await fs.promises.mkdir(this.dataDir, { recursive: true });
    try {
      await fs.promises.access(this.localPath);
    } catch {
      await fs.promises.writeFile(this.localPath, JSON.stringify(emptyLocalAnalytics(), null, 2), "utf8");
    }
  }

  async initializePostgres() {
    await this.pgPool.query(`
      CREATE TABLE IF NOT EXISTS analytics_sessions (
        session_id TEXT PRIMARY KEY,
        user_id TEXT NULL,
        anonymous_id TEXT NOT NULL,
        started_at TIMESTAMPTZ NOT NULL,
        last_activity_at TIMESTAMPTZ NOT NULL,
        ended_at TIMESTAMPTZ NULL,
        device_type TEXT NOT NULL,
        browser TEXT NOT NULL,
        viewport_width INTEGER NULL,
        entry_page TEXT NOT NULL,
        referrer_domain TEXT NULL
      )
    `);
    await this.pgPool.query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        event_id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
        user_id TEXT NULL,
        anonymous_id TEXT NOT NULL,
        event_name TEXT NOT NULL,
        event_timestamp TIMESTAMPTZ NOT NULL,
        received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        page TEXT NOT NULL,
        previous_page TEXT NULL,
        properties JSONB NOT NULL DEFAULT '{}'::jsonb
      )
    `);
    const indexes = [
      "CREATE INDEX IF NOT EXISTS analytics_sessions_started_at_idx ON analytics_sessions(started_at)",
      "CREATE INDEX IF NOT EXISTS analytics_sessions_user_id_idx ON analytics_sessions(user_id) WHERE user_id IS NOT NULL",
      "CREATE INDEX IF NOT EXISTS analytics_sessions_anonymous_id_idx ON analytics_sessions(anonymous_id)",
      "CREATE INDEX IF NOT EXISTS analytics_events_timestamp_idx ON analytics_events(event_timestamp)",
      "CREATE INDEX IF NOT EXISTS analytics_events_session_id_timestamp_idx ON analytics_events(session_id, event_timestamp)",
      "CREATE INDEX IF NOT EXISTS analytics_events_user_id_timestamp_idx ON analytics_events(user_id, event_timestamp) WHERE user_id IS NOT NULL",
      "CREATE INDEX IF NOT EXISTS analytics_events_anonymous_id_timestamp_idx ON analytics_events(anonymous_id, event_timestamp)",
      "CREATE INDEX IF NOT EXISTS analytics_events_name_timestamp_idx ON analytics_events(event_name, event_timestamp)",
    ];
    for (const statement of indexes) await this.pgPool.query(statement);
  }

  enqueue(task) {
    const queued = this.writeQueue.then(task, task);
    this.writeQueue = queued.catch(() => {});
    return queued;
  }

  async readLocal() {
    if (this.localCache) return structuredClone(this.localCache);
    const source = await fs.promises.readFile(this.localPath, "utf8");
    const parsed = JSON.parse(source);
    this.localCache = {
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
    };
    return structuredClone(this.localCache);
  }

  async writeLocal(data) {
    this.localCache = data;
    await fs.promises.writeFile(this.localPath, JSON.stringify(data, null, 2), "utf8");
  }

  normalizeSessionInput(input = {}) {
    const anonymousId = cleanIdentifier(input.anonymousId, "anon");
    if (!anonymousId) throw new Error("A valid anonymous_id is required.");
    const viewport = Number(input.viewportWidth);
    return {
      anonymousId,
      suggestedSessionId: cleanIdentifier(input.sessionId || input.suggestedSessionId, "as"),
      userId: input.userId ? cleanText(input.userId, 100) : null,
      deviceType: parseDeviceType(input.userAgent),
      browser: parseBrowserFamily(input.userAgent),
      viewportWidth: Number.isInteger(viewport) && viewport >= 240 && viewport <= 10000 ? viewport : null,
      entryPage: cleanPage(input.entryPage),
      referrerDomain: cleanReferrerDomain(input.referrer),
    };
  }

  async startOrResumeSession(input = {}) {
    await this.initialize();
    const normalized = this.normalizeSessionInput(input);
    return this.enqueue(() => (this.pgPool ? this.startOrResumePostgres(normalized) : this.startOrResumeLocal(normalized)));
  }

  sessionCanResume(session, normalized, now) {
    if (!session || session.anonymousId !== normalized.anonymousId || session.endedAt) return false;
    if (session.userId && normalized.userId && session.userId !== normalized.userId) return false;
    return now - Date.parse(session.lastActivityAt) < this.sessionTimeoutMs;
  }

  newSession(normalized, now = Date.now()) {
    const timestamp = new Date(now).toISOString();
    return {
      sessionId: normalized.suggestedSessionId || analyticsId("as"),
      userId: normalized.userId,
      anonymousId: normalized.anonymousId,
      startedAt: timestamp,
      lastActivityAt: timestamp,
      endedAt: null,
      deviceType: normalized.deviceType,
      browser: normalized.browser,
      viewportWidth: normalized.viewportWidth,
      entryPage: normalized.entryPage,
      referrerDomain: normalized.referrerDomain,
    };
  }

  sessionStartedEvent(session) {
    return {
      eventId: analyticsId("ae"),
      sessionId: session.sessionId,
      userId: session.userId,
      anonymousId: session.anonymousId,
      eventName: "session_started",
      timestamp: session.startedAt,
      page: session.entryPage,
      previousPage: null,
      properties: {},
    };
  }

  async startOrResumeLocal(normalized) {
    const now = Date.now();
    const data = await this.readLocal();
    let session = normalized.suggestedSessionId
      ? data.sessions.find((item) => item.sessionId === normalized.suggestedSessionId)
      : null;
    if (!this.sessionCanResume(session, normalized, now)) {
      session = [...data.sessions].reverse().find((item) => this.sessionCanResume(item, normalized, now));
    }
    let created = false;
    if (!session) {
      const sessionInput = data.sessions.some((item) => item.sessionId === normalized.suggestedSessionId)
        ? { ...normalized, suggestedSessionId: null }
        : normalized;
      session = this.newSession(sessionInput, now);
      data.sessions.push(session);
      data.events.push(this.sessionStartedEvent(session));
      created = true;
    } else {
      session.lastActivityAt = new Date(now).toISOString();
      if (!session.userId && normalized.userId) session.userId = normalized.userId;
    }
    await this.writeLocal(data);
    return { ...session, created };
  }

  async startOrResumePostgres(normalized) {
    const now = new Date();
    let result = null;
    if (normalized.suggestedSessionId) {
      result = await this.pgPool.query("SELECT * FROM analytics_sessions WHERE session_id = $1", [normalized.suggestedSessionId]);
    }
    if (!result?.rows[0]) {
      result = await this.pgPool.query(
        `SELECT * FROM analytics_sessions
         WHERE anonymous_id = $1 AND ended_at IS NULL AND last_activity_at > $2
           AND (user_id IS NULL OR $3::text IS NULL OR user_id = $3)
         ORDER BY last_activity_at DESC LIMIT 1`,
        [normalized.anonymousId, new Date(now.getTime() - this.sessionTimeoutMs), normalized.userId],
      );
    }
    const existing = result?.rows[0];
    const mapped = existing && {
      sessionId: existing.session_id,
      userId: existing.user_id,
      anonymousId: existing.anonymous_id,
      startedAt: new Date(existing.started_at).toISOString(),
      lastActivityAt: new Date(existing.last_activity_at).toISOString(),
      endedAt: existing.ended_at ? new Date(existing.ended_at).toISOString() : null,
    };
    if (mapped && this.sessionCanResume(mapped, normalized, now.getTime())) {
      await this.pgPool.query(
        "UPDATE analytics_sessions SET last_activity_at = $2, user_id = COALESCE(user_id, $3) WHERE session_id = $1",
        [mapped.sessionId, now, normalized.userId],
      );
      return { ...mapped, userId: mapped.userId || normalized.userId, lastActivityAt: now.toISOString(), created: false };
    }

    const sessionInput = existing ? { ...normalized, suggestedSessionId: null } : normalized;
    const session = this.newSession(sessionInput, now.getTime());
    await this.pgPool.query(
      `INSERT INTO analytics_sessions
       (session_id, user_id, anonymous_id, started_at, last_activity_at, ended_at, device_type, browser, viewport_width, entry_page, referrer_domain)
       VALUES ($1,$2,$3,$4,$5,NULL,$6,$7,$8,$9,$10)`,
      [session.sessionId, session.userId, session.anonymousId, session.startedAt, session.lastActivityAt, session.deviceType, session.browser, session.viewportWidth, session.entryPage, session.referrerDomain],
    );
    const started = this.sessionStartedEvent(session);
    await this.insertPostgresEvents([started]);
    return { ...session, created: true };
  }

  async recordBatch(input = {}) {
    await this.initialize();
    const rawEvents = Array.isArray(input.events) ? input.events : [];
    if (!rawEvents.length || rawEvents.length > this.maxBatchSize) throw new Error(`Analytics batches must contain 1-${this.maxBatchSize} events.`);
    const session = await this.startOrResumeSession(input);
    const normalizedEvents = rawEvents.map((event) => normalizeEvent(event));
    const records = normalizedEvents.map((event) => ({
      ...event,
      sessionId: session.sessionId,
      userId: input.userId || null,
      anonymousId: session.anonymousId,
    }));
    await this.enqueue(() => (this.pgPool ? this.recordPostgres(records) : this.recordLocal(records)));
    return { sessionId: session.sessionId, accepted: records.length };
  }

  async recordLocal(records) {
    const data = await this.readLocal();
    const ids = new Set(data.events.map((event) => event.eventId));
    records.forEach((record) => {
      if (!ids.has(record.eventId)) {
        data.events.push(record);
        ids.add(record.eventId);
      }
    });
    const session = data.sessions.find((item) => item.sessionId === records[0]?.sessionId);
    if (session) {
      session.lastActivityAt = new Date().toISOString();
      if (!session.userId && records[0]?.userId) session.userId = records[0].userId;
      if (records.some((record) => record.eventName === "session_ended")) session.endedAt = new Date().toISOString();
    }
    await this.writeLocal(data);
  }

  async insertPostgresEvents(records) {
    for (const record of records) {
      await this.pgPool.query(
        `INSERT INTO analytics_events
         (event_id, session_id, user_id, anonymous_id, event_name, event_timestamp, page, previous_page, properties)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb)
         ON CONFLICT (event_id) DO NOTHING`,
        [record.eventId, record.sessionId, record.userId, record.anonymousId, record.eventName, record.timestamp, record.page, record.previousPage, JSON.stringify(record.properties)],
      );
    }
  }

  async recordPostgres(records) {
    await this.insertPostgresEvents(records);
    const ended = records.some((record) => record.eventName === "session_ended");
    await this.pgPool.query(
      `UPDATE analytics_sessions
       SET last_activity_at = NOW(), user_id = COALESCE(user_id, $2), ended_at = CASE WHEN $3 THEN NOW() ELSE ended_at END
       WHERE session_id = $1`,
      [records[0].sessionId, records[0].userId, ended],
    );
  }

  recordServerEvent(req, user, eventName, properties = {}, options = {}) {
    const anonymousId = cleanIdentifier(req.headers["x-easymate-anonymous-id"], "anon");
    const sessionId = cleanIdentifier(req.headers["x-easymate-session-id"], "as");
    if (!anonymousId || !sessionId || !allowedEventNames.has(eventName)) return Promise.resolve(false);
    return this.recordBatch({
      anonymousId,
      sessionId,
      userId: user?.id || null,
      userAgent: req.headers["user-agent"],
      viewportWidth: req.headers["x-easymate-viewport-width"],
      entryPage: req.headers["x-easymate-page"] || options.page || "/",
      referrer: req.headers.referer,
      events: [{
        event_id: analyticsId("ae"),
        event_name: eventName,
        timestamp: new Date().toISOString(),
        page: options.page || req.headers["x-easymate-page"] || "/",
        previous_page: req.headers["x-easymate-previous-page"] || null,
        properties,
      }],
    }).then(() => true);
  }

  async rawData(rangeDays = 30) {
    await this.initialize();
    const cutoff = new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000);
    if (!this.pgPool) {
      const data = await this.readLocal();
      return {
        sessions: data.sessions.filter((item) => Date.parse(item.startedAt) >= cutoff.getTime()),
        events: data.events.filter((item) => Date.parse(item.timestamp) >= cutoff.getTime()),
      };
    }
    const [sessionsResult, eventsResult] = await Promise.all([
      this.pgPool.query("SELECT * FROM analytics_sessions WHERE started_at >= $1 ORDER BY started_at ASC LIMIT 50000", [cutoff]),
      this.pgPool.query("SELECT * FROM analytics_events WHERE event_timestamp >= $1 ORDER BY event_timestamp ASC, received_at ASC LIMIT 100000", [cutoff]),
    ]);
    return {
      sessions: sessionsResult.rows.map((row) => ({
        sessionId: row.session_id,
        userId: row.user_id,
        anonymousId: row.anonymous_id,
        startedAt: new Date(row.started_at).toISOString(),
        lastActivityAt: new Date(row.last_activity_at).toISOString(),
        endedAt: row.ended_at ? new Date(row.ended_at).toISOString() : null,
      })),
      events: eventsResult.rows.map((row) => ({
        eventId: row.event_id,
        sessionId: row.session_id,
        userId: row.user_id,
        anonymousId: row.anonymous_id,
        eventName: row.event_name,
        timestamp: new Date(row.event_timestamp).toISOString(),
        page: row.page,
        previousPage: row.previous_page,
        properties: row.properties || {},
      })),
    };
  }

  async summary(rangeDays = 30) {
    const days = Math.max(1, Math.min(90, Number(rangeDays) || 30));
    const { sessions, events } = await this.rawData(days);
    const sessionIdentity = new Map(sessions.map((session) => [session.sessionId, session.userId || session.anonymousId]));
    const identity = (item) => item.userId || sessionIdentity.get(item.sessionId) || item.anonymousId;
    const uniqueIdentities = new Set(sessions.map(identity).filter(Boolean));
    const durations = sessions.map((session) => Math.max(0, Date.parse(session.endedAt || session.lastActivityAt) - Date.parse(session.startedAt)));
    const funnelStages = ["page_viewed", "play_page_viewed", "quick_match_clicked", "matchmaking_started", "match_found", "match_started", "match_completed"];
    const eventsBySession = new Map();
    events.forEach((event) => {
      if (!eventsBySession.has(event.sessionId)) eventsBySession.set(event.sessionId, []);
      eventsBySession.get(event.sessionId).push(event);
    });
    const reached = funnelStages.map(() => new Set());
    sessions.forEach((session) => {
      let stageIndex = 0;
      const actor = identity(session);
      for (const event of eventsBySession.get(session.sessionId) || []) {
        if (event.eventName !== funnelStages[stageIndex]) continue;
        reached[stageIndex].add(actor);
        stageIndex += 1;
        if (stageIndex === funnelStages.length) break;
      }
    });
    const funnel = funnelStages.map((stage, index) => {
      const users = reached[index].size;
      const previous = index ? reached[index - 1].size : users;
      const dropOffCount = index ? Math.max(0, previous - users) : 0;
      return {
        stage,
        users,
        conversionRate: index && previous ? Number((users / previous).toFixed(4)) : 1,
        dropOffCount,
        dropOffRate: index && previous ? Number((dropOffCount / previous).toFixed(4)) : 0,
      };
    });
    const featureGroups = {
      quick_match: ["quick_match_clicked", "matchmaking_started"],
      private_room: ["room_created", "room_joined"],
      training: ["training_opened", "puzzle_started", "puzzle_completed"],
      review: ["review_opened", "review_completed"],
      community: ["community_opened", "post_created"],
      culture_history: ["culture_content_impression", "culture_content_opened", "culture_content_completed"],
    };
    const featureUsage = Object.fromEntries(Object.entries(featureGroups).map(([name, names]) => [
      name,
      {
        events: events.filter((event) => names.includes(event.eventName)).length,
        users: new Set(events.filter((event) => names.includes(event.eventName)).map(identity)).size,
      },
    ]));
    const eventDaysByIdentity = new Map();
    events.forEach((event) => {
      const actor = identity(event);
      if (!actor) return;
      const day = Math.floor(Date.parse(event.timestamp) / (24 * 60 * 60 * 1000));
      if (!eventDaysByIdentity.has(actor)) eventDaysByIdentity.set(actor, new Set());
      eventDaysByIdentity.get(actor).add(day);
    });
    const retention = {};
    [1, 7, 30].forEach((offset) => {
      let eligible = 0;
      let returned = 0;
      eventDaysByIdentity.forEach((daySet) => {
        const first = Math.min(...daySet);
        if (first + offset > Math.floor(Date.now() / (24 * 60 * 60 * 1000))) return;
        eligible += 1;
        if (daySet.has(first + offset)) returned += 1;
      });
      retention[`d${offset}`] = { eligible, returned, rate: eligible ? Number((returned / eligible).toFixed(4)) : 0 };
    });
    return {
      rangeDays: days,
      sessions: {
        total: sessions.length,
        uniqueUsers: uniqueIdentities.size,
        medianDurationMs: percentileMedian(durations),
        eventsPerSession: sessions.length ? Number((events.length / sessions.length).toFixed(2)) : 0,
      },
      funnel,
      featureUsage,
      retention,
    };
  }
}

module.exports = {
  AnalyticsStore,
  allowedEventNames,
  normalizeEvent,
  sanitizeProperties,
  cleanOperation,
  DEFAULT_SESSION_TIMEOUT_MS,
};
