// The project token is public, but is supplied by the server so deployments can change projects.
(async () => {
  try {
    const response = await fetch("/api/config", { cache: "no-store" });
    if (!response.ok) return;
    const { posthogProjectToken: token, posthogHost: host } = await response.json();
    if (!token || !/^https:\/\/[a-z0-9.-]+\.i\.posthog\.com$/i.test(host)) return;

    const posthog = window.posthog = [];
    posthog._i = [];
    posthog.__SV = 1;
    posthog.init = (projectToken, options) => {
      for (const method of ["capture", "identify", "reset", "opt_out_capturing", "opt_in_capturing"]) {
        posthog[method] = (...args) => posthog.push([method, ...args]);
      }
      posthog._i.push([projectToken, options, "posthog"]);
    };
    posthog.init(token, { api_host: host, defaults: "2026-05-30" });
    // PostHog's browser bundle consumes this queue and captures the first pageview.
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `${host.replace(".i.posthog.com", "-assets.i.posthog.com")}/static/array.js`;
    script.onerror = () => console.warn("PostHog SDK failed to load");
    document.head.appendChild(script);
  } catch (error) {
    console.warn("PostHog initialization failed", error);
  }
})();
