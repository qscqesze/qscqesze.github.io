const config = window.qscVisitorStats || {};
const endpoint = normaliseEndpoint(config.endpoint);

const VISITOR_KEY = "qscqesze.visitor.v1";
const LAST_VISIT_KEY = "qscqesze.last-visit.v1";
const VISIT_WINDOW_MS = 30 * 60 * 1000;

function normaliseEndpoint(value) {
  if (!value) return "";

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.href.replace(/\/$/, "");
  } catch (error) {
    return "";
  }
}

function createVisitorId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  const bytes = new Uint8Array(24);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getVisitorId() {
  try {
    const saved = localStorage.getItem(VISITOR_KEY);
    if (saved) return saved;

    const visitorId = createVisitorId();
    localStorage.setItem(VISITOR_KEY, visitorId);
    return visitorId;
  } catch (error) {
    return createVisitorId();
  }
}

function shouldTrack() {
  if (!endpoint || document.visibilityState === "prerender") return false;
  if (navigator.globalPrivacyControl === true || navigator.doNotTrack === "1") return false;

  try {
    const lastVisit = Number(localStorage.getItem(LAST_VISIT_KEY) || 0);
    return !lastVisit || Date.now() - lastVisit > VISIT_WINDOW_MS;
  } catch (error) {
    return true;
  }
}

async function recordVisit() {
  if (!shouldTrack()) return;

  const visitorId = getVisitorId();
  const timestamp = Date.now();

  try {
    localStorage.setItem(LAST_VISIT_KEY, String(timestamp));
  } catch (error) {
    // A blocked localStorage should not prevent anonymous statistics.
  }

  try {
    const response = await fetch(`${endpoint}/api/visit`, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({
        visitorId,
        path: window.location.pathname.slice(0, 240)
      })
    });

    if (!response.ok) throw new Error(`Visitor service returned ${response.status}`);
  } catch (error) {
    try {
      if (localStorage.getItem(LAST_VISIT_KEY) === String(timestamp)) {
        localStorage.removeItem(LAST_VISIT_KEY);
      }
    } catch (storageError) {
      // Nothing else to clean up.
    }
  }
}

recordVisit();

export { endpoint, normaliseEndpoint };
