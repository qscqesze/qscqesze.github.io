# Global visitor statistics Worker

This Cloudflare Worker provides the privacy-friendly backend for the blog's
`/stats/` page. It stores only a salted hash of the browser-generated visitor
identifier, country code, timestamps, and aggregate visit counts. It never
stores an IP address or precise location.

## Deployment

The production database, Worker binding, and `VISITOR_SALT` secret are already
provisioned. Install dependencies with `npm install`, run `npm test`, and
publish updates with `npm run deploy`.

When a new SQL migration is added, apply it with `npm run migrate:remote`
before publishing. The production endpoint is configured in `_config.yml` at
`visitor_stats.endpoint`.

For local development, run `npm run migrate:local` once and then `npm run dev`.
