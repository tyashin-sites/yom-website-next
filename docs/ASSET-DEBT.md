# YOM website: asset debt

Living table of every placeholder or unconfirmed input. Only a real asset or a confirmed fact
clears a row. "Blocks" names the phase or launch step it gates.

| # | Item | Current state | What clears it | Blocks |
|---|---|---|---|---|
| 1 | Tyashin project id | Placeholder `PROJECT_ID` env (empty) in `src/config/site.ts` | Parent creates project `yom-website`, sets `PROJECT_ID` build env | Deploy |
| 2 | Production domain / `SITE_URL` | **Cleared 2026-10-23**: `https://yom.aapastech.com` is the default (`site.ts`, `next.config.ts`, `wrangler.jsonc`). Shared with the dashboard via a path router; dashboard paths in `src/config/router-paths.json` are gated by `npm test` + `check-routes.mjs` | — | — |
| 3 | Contact form → Contact Form & Lead Capture plugin | Code done: `/api/contact` logs `LEAD:` and forwards to `/api/v1/contact/public/submit` (with `renderedAt`) when `TYASHIN_API_KEY` exists. Setup in `docs/CONTACT-FORM.md` | Coordinator installs the plugin, sets `notifyEmails`, sets the `TYASHIN_API_KEY` secret, runs the smoke test | Launch |
| 4 | Privacy policy | **Delegated and published 2026-10-23** (user delegated legal drafting). Controller + processor roles, PIPEDA/Law 25/CCPA/GDPR. Sources + gaps: `docs/LEGAL-SOURCES.md` | Lawyer review recommended, not blocking | — |
| 5 | Terms of service | **Delegated and published 2026-10-23**, plus `/dpa`, `/acceptable-use`, `/cookies`, `/subprocessors`, `/security/disclosure`, `/.well-known/security.txt` | Lawyer review recommended, not blocking (Quebec French-version question first; `docs/LEGAL-SOURCES.md`) | — |
| 6 | Company street address | Not shown anywhere (none exists). City/province only: Burlington, Ontario | A registered mailing address if one is created | Schema `PostalAddress` (city/region only today) |
| 7 | Social profiles (`sameAs`) | Empty: none supplied | Real YOM/Aapastech profile URLs | Knowledge graph richness |
| 8 | Customer logos, testimonials, case studies | None shown, by rule | Signed, real customer permission | Social-proof sections (hidden until then) |
| 9 | OG image | Generated from the wordmark + thesis (`public/og/default.png`, script `scripts/generate-og.mjs`) | Optional designed OG per page | — |
| 10 | Compare-page competitor facts | Cited from YOM-POSITIONING-RESEARCH.md, last verified 2026-10-21; several are 3rd-party estimates (marked) | Re-verify each footnote before every major campaign; update `LAST_VERIFIED` in `src/lib/sources.ts` | Ongoing |
| 11 | SDK CDN script tag | Site shows only the npm install (`@yourownmetric/sdk`, npm `latest` 0.3.0 on 2026-10-23). The YOM repo's docs disagree on the CDN path (`/yom.min.js` vs `/sdk/latest/yom.min.js`) and CI uploads only the embed bundle | CDN URL verified live → add the `<script data-key>` snippet to /developers | Developers page completeness |
| 12 | Ingest host for docs | `https://ingest.yourownmetrics.aapastech.com` (SDK default; host answers) | Confirm it is the public, long-term ingest hostname (or a custom first-party domain flow) | Developers page |
| 13 | Blog | Not built and not linked (platform-owned) | Blog plugin with ≥1 published post; then add a site-native `/blog` per port skill §4a and nav links | Content SEO |
| 14 | SEO Co-Pilot plugin + `/llms.txt` ownership | Site ships its own `/llms.txt` route; the platform may intercept it once SEO Co-Pilot is installed | Install SEO Co-Pilot (needs a verified custom domain); reconcile which `/llms.txt` wins | SEO |
| 15 | Trust pack | DPA + sub-processor list **published 2026-10-23**. No SOC 2, BAA, residency or SLA — /security lists them as "Not yet" | Real attestation / residency only if built | Regulated + enterprise sales |
| 16 | Status / uptime page | None claimed | A real status page URL | /security |
| 17 | Sign-up / login URLs | Relative `/signup` and `/login` (same host; router sends them to the dashboard, decided 2026-10-23). The dashboard on origin/main registers `/register`, not `/signup` | Router must serve `/signup` (alias to the dashboard's register screen) | Launch |
| 18 | Pricing in CAD | Mirrors `EVENT_TIERS.pricePerKCAD` in the YOM repo (14/8/4/2 cents per 1K) | Re-sync if `packages/shared/src/constants/index.ts` changes | Pricing |
| 19 | Retention numbers | Free 90 days / PAYG 365 days per the brief (`PLANS` in shared constants). Note: `ANALYTICS_ENTITLEMENTS` in YOM-PLATFORM-PLAN §9 lists different max values (180 / 1,825) | YOM team confirms which is customer-facing | Pricing, FAQ |
| 20 | Response-time promise on /contact | No SLA or reply-time claim is made | A real support commitment | — |
| 21 | Quebec Law 25 statement on /solutions/regulated | Cited to McCarthy Tétrault; the research marks Law 25 summaries "verify against the statute" | Lawyer review (delegated; not blocking) | — |
| 22 | Bot-blocked citations | White & Case (403), TrustArc (403) and McCarthy Tétrault (429) refuse automated checks; they load in a browser | Manual click-through before each re-verification | — |
| 23 | Tyashin brand kit values | Not set (no project yet). Values to mirror are in docs/BRAND.md | Parent PATCHes the brand kit after project creation | Platform pages (consent centre, etc.) styling |
| 24 | Pricing source of truth drift | `src/lib/pricing.ts` is a copy of the YOM repo's `EVENT_TIERS`; cross-checked 702 samples vs the real `calculateEventCost` on 2026-10-21 (0 mismatches) | Re-run the cross-check whenever YOM pricing changes | Pricing |
| 25 | Early-access connectors | Shopify app, WooCommerce plugin and Looker Studio connector exist in code but are not listed in their stores/gallery; labelled "early access" sitewide | Store listings live → change labels | Product, FAQ, solutions |
| 26 | YOM engineering gaps behind legal wording | v1 endpoints without consent handling, R2 archive never purged, incomplete org deletion, plaintext TOTP secret, backup job on staging DB id, no DSR tooling (`docs/LEGAL-SOURCES.md`) | Fixed in the YOM repo → tighten the legal wording | Legal accuracy |
