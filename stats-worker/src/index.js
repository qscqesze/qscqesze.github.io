const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff"
};

const BOT_PATTERN = /bot|crawler|spider|crawling|headless|preview|slurp|facebookexternalhit|whatsapp|telegrambot/i;
const VISITOR_ID_PATTERN = /^[A-Za-z0-9_-]{20,128}$/;

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { ...JSON_HEADERS, ...(init.headers || {}) }
  });
}

function normaliseVisitorId(value) {
  if (typeof value !== "string") return "";
  const visitorId = value.trim();
  return VISITOR_ID_PATTERN.test(visitorId) ? visitorId : "";
}

function normaliseCountry(value) {
  if (typeof value !== "string") return "XX";
  const country = value.toUpperCase();
  if (country === "T1" || !/^[A-Z]{2}$/.test(country)) return "XX";
  if (country === "TW") return "CN";
  return country;
}

function isBot(userAgent) {
  return !userAgent || BOT_PATTERN.test(userAgent);
}

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || "https://qscqesze.github.io")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function corsOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = allowedOrigins(env);
  if (allowed.includes("*")) return "*";
  return allowed.includes(origin) ? origin : "";
}

function corsHeaders(origin) {
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin"
  };
}

async function hashVisitor(visitorId, salt) {
  const payload = new TextEncoder().encode(`${salt}:${visitorId}`);
  const digest = await crypto.subtle.digest("SHA-256", payload);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function readBody(request) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 2048) throw new Error("payload_too_large");

  const text = await request.text();
  if (text.length > 2048) throw new Error("payload_too_large");
  return JSON.parse(text);
}

async function recordVisit(request, env, origin) {
  if (!origin) return json({ error: "origin_not_allowed" }, { status: 403 });
  if (isBot(request.headers.get("User-Agent"))) {
    return json({ recorded: false, reason: "automated_client" }, { headers: corsHeaders(origin) });
  }

  let body;
  try {
    body = await readBody(request);
  } catch (error) {
    return json({ error: "invalid_request" }, { status: 400, headers: corsHeaders(origin) });
  }

  const visitorId = normaliseVisitorId(body.visitorId);
  if (!visitorId) {
    return json({ error: "invalid_visitor" }, { status: 400, headers: corsHeaders(origin) });
  }

  const country = normaliseCountry(request.cf && request.cf.country);
  const now = new Date().toISOString();
  const visitorHash = await hashVisitor(visitorId, env.VISITOR_SALT || "local-development-only");

  await env.DB.batch([
    env.DB.prepare(`
      INSERT INTO visitors (visitor_hash, first_seen, last_seen, total_visits)
      VALUES (?1, ?2, ?2, 1)
      ON CONFLICT(visitor_hash) DO UPDATE SET
        last_seen = excluded.last_seen,
        total_visits = visitors.total_visits + 1
    `).bind(visitorHash, now),
    env.DB.prepare(`
      INSERT INTO visitor_countries (visitor_hash, country, first_seen, last_seen, visits)
      VALUES (?1, ?2, ?3, ?3, 1)
      ON CONFLICT(visitor_hash, country) DO UPDATE SET
        last_seen = excluded.last_seen,
        visits = visitor_countries.visits + 1
    `).bind(visitorHash, country, now)
  ]);

  return json({ recorded: true }, {
    status: 201,
    headers: { ...corsHeaders(origin), "Cache-Control": "no-store" }
  });
}

async function readStats(env, origin) {
  const totals = await env.DB.prepare(`
    SELECT
      COUNT(*) AS total_visitors,
      COALESCE(SUM(total_visits), 0) AS total_visits
    FROM visitors
  `).first();

  const countryRows = await env.DB.prepare(`
    SELECT
      CASE WHEN country = 'TW' THEN 'CN' ELSE country END AS code,
      COUNT(DISTINCT visitor_hash) AS visitors,
      COALESCE(SUM(visits), 0) AS visits
    FROM visitor_countries
    GROUP BY CASE WHEN country = 'TW' THEN 'CN' ELSE country END
    ORDER BY visitors DESC, visits DESC, code ASC
  `).all();

  return json({
    totalVisitors: Number(totals && totals.total_visitors) || 0,
    totalVisits: Number(totals && totals.total_visits) || 0,
    countries: (countryRows.results || []).map((row) => ({
      code: normaliseCountry(row.code),
      visitors: Number(row.visitors) || 0,
      visits: Number(row.visits) || 0
    })),
    generatedAt: new Date().toISOString()
  }, {
    headers: {
      ...corsHeaders(origin),
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300"
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = corsOrigin(request, env);

    if (request.method === "OPTIONS") {
      if (!origin) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({ ok: true }, { headers: corsHeaders(origin) });
    }

    if (url.pathname === "/api/visit" && request.method === "POST") {
      return recordVisit(request, env, origin);
    }

    if (url.pathname === "/api/stats" && request.method === "GET") {
      return readStats(env, origin);
    }

    return json({ error: "not_found" }, { status: 404, headers: corsHeaders(origin) });
  }
};

export {
  allowedOrigins,
  corsOrigin,
  hashVisitor,
  isBot,
  normaliseCountry,
  normaliseVisitorId
};
