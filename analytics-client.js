(function () {
  "use strict";

  const consentKey = "easyMateAnalyticsConsent";
  const anonymousKey = "easyMateAnonymousId";
  const sessionKey = "easyMateAnalyticsSession";
  const sessionTimeoutMs = 30 * 60 * 1000;
  const maxQueueSize = 100;
  const batchSize = 20;
  let queue = [];
  let context = null;
  let flushTimer = null;
  let flushing = false;
  let currentPage = pageFromLocation();
  let previousPage = null;

  function readSetting(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeSetting(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Analytics is optional; storage restrictions must never affect the app.
    }
  }

  function removeSetting(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Analytics is optional; storage restrictions must never affect the app.
    }
  }

  function randomId(prefix) {
    const random = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}_${random}`;
  }

  function pageFromLocation() {
    const pathname = location.pathname.split(/[?#]/, 1)[0];
    if (/^\/match\//.test(pathname)) return "/play";
    if (/^\/tutorial\/?$/.test(pathname)) return "/training";
    if (/^\/staff\/?$/.test(pathname)) return "/staff";
    if (/^\/teacher\/?$/.test(pathname)) return "/teacher";
    return pathname || "/";
  }

  function pageForView(viewName) {
    return {
      home: "/",
      overview: "/home",
      dashboard: "/play",
      "how-to-play": "/training",
      forum: "/community",
      profile: "/profile",
      staff: "/staff",
      teacher: "/teacher",
      chessboards: "/shop",
      stt: "/captions",
    }[viewName] || `/${String(viewName || "unknown").replace(/[^a-z0-9-]/gi, "")}`;
  }

  function consentGranted() {
    return readSetting(consentKey) === "granted";
  }

  function loadContext() {
    if (!consentGranted()) return null;
    const now = Date.now();
    let anonymousId = readSetting(anonymousKey);
    if (!/^anon_[A-Za-z0-9-]{16,80}$/.test(anonymousId || "")) {
      anonymousId = randomId("anon");
      writeSetting(anonymousKey, anonymousId);
    }
    let saved = null;
    try {
      saved = JSON.parse(readSetting(sessionKey) || "null");
    } catch {
      saved = null;
    }
    const resumable = saved && /^as_[A-Za-z0-9-]{16,80}$/.test(saved.sessionId || "") && now - Number(saved.lastActivityAt || 0) < sessionTimeoutMs;
    const next = {
      anonymousId,
      sessionId: resumable ? saved.sessionId : randomId("as"),
      startedAt: resumable ? Number(saved.startedAt || now) : now,
      lastActivityAt: now,
    };
    saveContext(next);
    return next;
  }

  function saveContext(next = context) {
    if (!next) return;
    next.lastActivityAt = Date.now();
    writeSetting(sessionKey, JSON.stringify({
      sessionId: next.sessionId,
      startedAt: next.startedAt,
      lastActivityAt: next.lastActivityAt,
    }));
  }

  function ensureContext() {
    if (!consentGranted()) return null;
    if (!context || Date.now() - context.lastActivityAt >= sessionTimeoutMs) context = loadContext();
    saveContext();
    return context;
  }

  function requestHeaders() {
    const active = ensureContext();
    if (!active) return {};
    return {
      "x-easymate-analytics-consent": "granted",
      "x-easymate-anonymous-id": active.anonymousId,
      "x-easymate-session-id": active.sessionId,
      "x-easymate-page": currentPage,
      "x-easymate-previous-page": previousPage || "",
      "x-easymate-viewport-width": String(Math.round(window.innerWidth || 0)),
    };
  }

  async function establishSession() {
    const active = ensureContext();
    if (!active || location.protocol === "file:") return;
    try {
      const response = await fetch("/api/analytics/session", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json", ...requestHeaders() },
        body: JSON.stringify({
          anonymous_id: active.anonymousId,
          session_id: active.sessionId,
          viewport_width: Math.round(window.innerWidth || 0),
          entry_page: currentPage,
          referrer: document.referrer || "",
        }),
      });
      if (!response.ok) return;
      const data = await response.json().catch(() => ({}));
      if (/^as_[A-Za-z0-9-]{16,80}$/.test(data.session_id || "")) {
        context.sessionId = data.session_id;
        saveContext();
      }
    } catch {
      // Product use continues even when analytics is unavailable.
    }
  }

  function scheduleFlush(delay = 1800) {
    if (flushTimer || !queue.length) return;
    flushTimer = window.setTimeout(() => {
      flushTimer = null;
      void flush();
    }, delay);
  }

  function track(eventName, properties = {}, options = {}) {
    const active = ensureContext();
    if (!active) return false;
    queue.push({
      event_id: randomId("ae"),
      event_name: eventName,
      timestamp: new Date().toISOString(),
      page: options.page || currentPage,
      previous_page: options.previousPage === undefined ? previousPage : options.previousPage,
      properties,
    });
    if (queue.length > maxQueueSize) queue = queue.slice(-maxQueueSize);
    scheduleFlush(options.immediate ? 0 : undefined);
    return true;
  }

  async function flush(options = {}) {
    const active = ensureContext();
    if (!active || flushing || !queue.length || location.protocol === "file:") return false;
    flushing = true;
    const events = queue.splice(0, batchSize);
    try {
      const response = await fetch("/api/analytics/events", {
        method: "POST",
        credentials: "include",
        keepalive: Boolean(options.keepalive),
        headers: { "content-type": "application/json", ...requestHeaders() },
        body: JSON.stringify({
          anonymous_id: active.anonymousId,
          session_id: active.sessionId,
          viewport_width: Math.round(window.innerWidth || 0),
          entry_page: currentPage,
          referrer: document.referrer || "",
          events,
        }),
      });
      if (!response.ok) throw new Error("analytics_unavailable");
      const data = await response.json().catch(() => ({}));
      if (/^as_[A-Za-z0-9-]{16,80}$/.test(data.session_id || "")) {
        context.sessionId = data.session_id;
        saveContext();
      }
    } catch {
      queue = [...events, ...queue].slice(0, maxQueueSize);
      scheduleFlush(30_000);
      return false;
    } finally {
      flushing = false;
    }
    if (queue.length) scheduleFlush(300);
    return true;
  }

  function pageView(viewName) {
    const nextPage = viewName?.startsWith?.("/") ? viewName : pageForView(viewName);
    if (nextPage === currentPage && window.__easyMateInitialPageTracked) return;
    previousPage = window.__easyMateInitialPageTracked ? currentPage : null;
    currentPage = nextPage;
    window.__easyMateInitialPageTracked = true;
    const navigation = performance.getEntriesByType?.("navigation")?.[0];
    const pageProperties = !previousPage && Number.isFinite(navigation?.duration)
      ? { page_load_duration_ms: Math.round(navigation.duration) }
      : {};
    track("page_viewed", pageProperties, { page: currentPage, previousPage });
    if (currentPage === "/play") track("play_page_viewed");
    if (currentPage === "/training") track("training_opened");
    if (currentPage === "/community") track("community_opened");
    if (currentPage === "/profile") track("profile_opened");
  }

  function updateConsentUi() {
    const value = readSetting(consentKey);
    const banner = document.getElementById("analyticsConsentBanner");
    if (banner) banner.hidden = value === "granted" || value === "declined";
    const status = document.getElementById("analyticsConsentStatus");
    if (status) status.textContent = value === "granted" ? "사용 분석 허용됨" : value === "declined" ? "사용 분석 거부됨" : "선택하지 않음";
  }

  function setConsent(granted) {
    writeSetting(consentKey, granted ? "granted" : "declined");
    if (granted) {
      context = loadContext();
      void establishSession();
      window.__easyMateInitialPageTracked = false;
      pageView(document.body.classList.contains("show-landing") ? "home" : document.querySelector(".view.active")?.dataset.view || pageFromLocation());
    } else {
      queue = [];
      context = null;
      removeSetting(anonymousKey);
      removeSetting(sessionKey);
    }
    updateConsentUi();
  }

  function bindConsentControls() {
    document.querySelectorAll("[data-analytics-consent]").forEach((button) => {
      button.addEventListener("click", () => setConsent(button.dataset.analyticsConsent === "granted"));
    });
    updateConsentUi();
    if (consentGranted()) {
      context = loadContext();
      void establishSession();
    }
  }

  window.EasyMateAnalytics = {
    track,
    flush,
    headers: requestHeaders,
    pageView,
    setConsent,
    consentGranted,
    currentPage: () => currentPage,
  };

  document.addEventListener("DOMContentLoaded", bindConsentControls, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) void flush({ keepalive: true });
  });
  window.addEventListener("pagehide", () => {
    track("session_ended", {}, { immediate: true });
    void flush({ keepalive: true });
  });
})();
