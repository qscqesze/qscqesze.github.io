import assert from "node:assert/strict";
import test from "node:test";

import worker, {
  hashVisitor,
  isBot,
  normaliseCountry,
  normaliseVisitorId
} from "../src/index.js";

class FakeStatement {
  constructor(database, sql) {
    this.database = database;
    this.sql = sql;
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async first() {
    return {
      total_visitors: this.database.visitors.size,
      total_visits: Array.from(this.database.visitors.values()).reduce((sum, visitor) => sum + visitor.totalVisits, 0)
    };
  }

  async all() {
    const countries = new Map();
    for (const value of this.database.countries.values()) {
      const code = normaliseCountry(value.country);
      const current = countries.get(code) || { code, visitorHashes: new Set(), visits: 0 };
      current.visitorHashes.add(value.visitorHash);
      current.visits += value.visits;
      countries.set(code, current);
    }
    return {
      results: Array.from(countries.values())
        .map((country) => ({ code: country.code, visitors: country.visitorHashes.size, visits: country.visits }))
        .sort((left, right) => right.visitors - left.visitors || right.visits - left.visits || left.code.localeCompare(right.code))
    };
  }
}

class FakeDatabase {
  constructor() {
    this.visitors = new Map();
    this.countries = new Map();
  }

  prepare(sql) {
    return new FakeStatement(this, sql);
  }

  async batch(statements) {
    for (const statement of statements) {
      if (statement.sql.includes("INSERT INTO visitors")) {
        const [visitorHash, now] = statement.values;
        const current = this.visitors.get(visitorHash);
        this.visitors.set(visitorHash, current
          ? { ...current, lastSeen: now, totalVisits: current.totalVisits + 1 }
          : { firstSeen: now, lastSeen: now, totalVisits: 1 });
      }

      if (statement.sql.includes("INSERT INTO visitor_countries")) {
        const [visitorHash, country, now] = statement.values;
        const key = `${visitorHash}:${country}`;
        const current = this.countries.get(key);
        this.countries.set(key, current
          ? { ...current, lastSeen: now, visits: current.visits + 1 }
          : { visitorHash, country, firstSeen: now, lastSeen: now, visits: 1 });
      }
    }
    return [];
  }
}

function request(path, { method = "GET", body, country = "US", origin = "https://qscqesze.github.io", userAgent = "Mozilla/5.0" } = {}) {
  const headers = new Headers({ Origin: origin, "User-Agent": userAgent });
  if (body) headers.set("Content-Type", "text/plain;charset=UTF-8");
  const value = new Request(`https://stats.example${path}`, { method, headers, body });
  Object.defineProperty(value, "cf", { value: { country } });
  return value;
}

function environment() {
  return {
    DB: new FakeDatabase(),
    ALLOWED_ORIGINS: "https://qscqesze.github.io,http://localhost:4000",
    VISITOR_SALT: "test-salt"
  };
}

test("normalises public inputs", async () => {
  assert.equal(normaliseVisitorId("18ef5bcf-d72d-447d-a61a-283e8ff12435"), "18ef5bcf-d72d-447d-a61a-283e8ff12435");
  assert.equal(normaliseVisitorId("short"), "");
  assert.equal(normaliseCountry("cn"), "CN");
  assert.equal(normaliseCountry("TW"), "CN");
  assert.equal(normaliseCountry("T1"), "XX");
  assert.equal(isBot("Googlebot/2.1"), true);
  assert.equal(isBot("Mozilla/5.0"), false);
  assert.equal((await hashVisitor("visitor", "salt")).length, 64);
});

test("merges Taiwan visits into China", async () => {
  const env = environment();
  const mainlandVisitor = "18ef5bcf-d72d-447d-a61a-283e8ff12435";
  const taiwanVisitor = "7de35e44-7244-4416-a4ac-aa3b19acd492";

  await worker.fetch(request("/api/visit", { method: "POST", body: JSON.stringify({ visitorId: mainlandVisitor }), country: "CN" }), env);
  await worker.fetch(request("/api/visit", { method: "POST", body: JSON.stringify({ visitorId: taiwanVisitor }), country: "TW" }), env);

  const response = await worker.fetch(request("/api/stats"), env);
  const stats = await response.json();

  assert.deepEqual(stats.countries, [
    { code: "CN", visitors: 2, visits: 2 }
  ]);
});

test("records unique visitors and country totals", async () => {
  const env = environment();
  const visitorId = "18ef5bcf-d72d-447d-a61a-283e8ff12435";

  const first = await worker.fetch(request("/api/visit", { method: "POST", body: JSON.stringify({ visitorId }), country: "CN" }), env);
  assert.equal(first.status, 201);

  await worker.fetch(request("/api/visit", { method: "POST", body: JSON.stringify({ visitorId }), country: "CN" }), env);
  await worker.fetch(request("/api/visit", { method: "POST", body: JSON.stringify({ visitorId }), country: "JP" }), env);

  const response = await worker.fetch(request("/api/stats"), env);
  const stats = await response.json();

  assert.equal(stats.totalVisitors, 1);
  assert.equal(stats.totalVisits, 3);
  assert.deepEqual(stats.countries, [
    { code: "CN", visitors: 1, visits: 2 },
    { code: "JP", visitors: 1, visits: 1 }
  ]);
});

test("rejects writes from an unapproved origin and ignores bots", async () => {
  const env = environment();
  const visitorId = "18ef5bcf-d72d-447d-a61a-283e8ff12435";

  const denied = await worker.fetch(request("/api/visit", {
    method: "POST",
    body: JSON.stringify({ visitorId }),
    origin: "https://example.com"
  }), env);
  assert.equal(denied.status, 403);

  const bot = await worker.fetch(request("/api/visit", {
    method: "POST",
    body: JSON.stringify({ visitorId }),
    userAgent: "Googlebot/2.1"
  }), env);
  assert.equal((await bot.json()).recorded, false);
  assert.equal(env.DB.visitors.size, 0);
});
