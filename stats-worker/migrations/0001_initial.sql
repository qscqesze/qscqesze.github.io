PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS visitors (
  visitor_hash TEXT PRIMARY KEY,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  total_visits INTEGER NOT NULL DEFAULT 1 CHECK (total_visits > 0)
);

CREATE TABLE IF NOT EXISTS visitor_countries (
  visitor_hash TEXT NOT NULL,
  country TEXT NOT NULL CHECK (length(country) = 2),
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  visits INTEGER NOT NULL DEFAULT 1 CHECK (visits > 0),
  PRIMARY KEY (visitor_hash, country),
  FOREIGN KEY (visitor_hash) REFERENCES visitors(visitor_hash) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS visitor_countries_country_idx
  ON visitor_countries(country);
