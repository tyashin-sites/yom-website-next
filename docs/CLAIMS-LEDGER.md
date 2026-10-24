# YOM claims ledger

Every capability or factual claim on yom.aapastech.com (pages, metadata, JSON-LD, FAQ, pricing, compare, code samples, legal descriptions of data handling, llms.txt) and the evidence that YOM production serves it.

**Rule (user, 2026-10-24):** whatever the website texts and blogs claim must be justified and served by the YOM platform.

- **Production** = `aapastech/yourownmetrics` origin/main `88b75f5` (release PR #51, deployed 2026-10-24). Evidence paths are on that commit.
- **Behaviour checks** used the staging QA fixture (`yom-wt-qa-staging/e2e/staging/.env.qa`, staging = develop at the #51 merge, code parity with main), read-only probes of the prod hosts, `wrangler secret list` on the prod workers (names only), and the published npm tarballs.
- **Audit:** 2026-10-24, claims-audit session. Site commits `1e09fac`, `cce52a4`, `1417406`.

## Statuses

| Status | Meaning | Gate |
|---|---|---|
| VERIFIED-IN-PROD | Code on origin/main does this, it is wired and configured in prod, and nothing contradicts it. | passes |
| EXTERNAL-SOURCE | Third-party fact, cited on the page with the URL in `src/lib/sources.ts`. | passes |
| SHIPPED-NOT-DEPLOYED | Code exists on main but prod lacks a secret, var, publish or listing. | passes only next to a "Coming soon" / "Early access" label |
| PARTIAL | True with a caveat the copy doesn't carry. | fails |
| NOT-TRUE | Prod doesn't do it. Kept here so the old wording can't come back. | fails |

## Claims

| ID | Claim | Pages | Evidence | Status |
|---|---|---|---|---|
| C01 | Free plan: $0, no credit card required | home, pricing, faq, JSON-LD, llms | `api/src/routes/auth.ts:139` inserts plan `free`; sign-up has no payment step (`/signup` → RegisterPage, live 200) | VERIFIED-IN-PROD |
| C02 | 100,000 events a month included on Free (at most 20,000 a day) | pricing, faq, llms | `shared/src/constants/index.ts:49` `freeEventsIncluded: 100_000`, `:141` `absoluteDailyLimit: 20_000` (429 over it) | VERIFIED-IN-PROD |
| C03 | First 100,000 events free on pay-as-you-go too | pricing, home, faq, llms | `shared/src/constants/index.ts:356-396` tier `upTo: 100_000` at 0 | VERIFIED-IN-PROD |
| C04 | Graduated rate card $0.10 / $0.06 / $0.03 / $0.015 per 1K; CA$0.14 / 0.08 / 0.04 / 0.02; worked examples ($90 at 1M, $150 at 2M, $630 at 10M, $930 at 20M, $1,080 at 25M) | pricing, home, compare, why-yom, faq, llms | `shared/src/constants/index.ts:356-396` EVENT_TIERS; `src/lib/pricing.ts` mirrors it; `tests/pricing.test.ts` | VERIFIED-IN-PROD (published price). See D1: metered charging is not wired |
| C05 | Pay-as-you-go is billed in USD; CAD is for estimates | pricing, faq, llms | `api/scripts/setup-stripe.ts:52` `currency: 'usd'` | VERIFIED-IN-PROD |
| C06 | Free: 1 project | pricing, llms | `api/src/routes/projects.ts:78`, `api/src/routes/v2/projects.ts:386` (402) | VERIFIED-IN-PROD |
| C07 | Free: up to 3 sub-tenants; PAYG unlimited | pricing, agencies, llms | `shared/src/analytics/entitlements.ts:42,61`; `api/src/routes/v2/manage.ts:183-193` | VERIFIED-IN-PROD |
| C08 | Retention: Free 180 days; PAYG 395 days by default, adjustable up to five years | product, pricing, faq, compare, llms | `cron/src/jobs/analytics-v2.ts:84-88` `min(config.retentionDays, maxRetentionDays)`; `shared/src/analytics/config.ts:114` 395; `entitlements.ts:47` 180, `:66` 1825 | VERIFIED-IN-PROD (v2 data; legacy v1 D1 uses 90/365, see D4) |
| C09 | No daily or monthly event cap on PAYG | pricing, llms | `shared/src/constants/index.ts:147-155` payg limits null | VERIFIED-IN-PROD |
| C10 | PAYG: realtime webhooks, up to 25 destinations per project (Free: 1 batched) | pricing, llms | `entitlements.ts:43-44,62-63` | VERIFIED-IN-PROD |
| C11 | Meta CAPI and GA4 Measurement Protocol forwarding on PAYG only | pricing, product, llms | `api/src/routes/v2/manage.ts:507` 402 on Free; `entitlements.ts:64` | VERIFIED-IN-PROD |
| C12 | Embed tokens on PAYG; portals without "Powered by" on PAYG | pricing, agencies, llms | `manage.ts:1041` embed gate; `api/src/routes/portal-public.ts:85` removeBranding | VERIFIED-IN-PROD |
| C13 | Exact, deduplicated counts for purchase, refund, generate_lead, form_submit, sign_up; no sampling or thresholds on those counts | home, product, why-yom, faq, ecommerce, llms, JSON-LD | `shared/src/analytics/exact.ts:15-21`; `shared/src/migrations/analytics.ts:78` `UNIQUE(project_id,event,id)`; e2e/staging exact counters strict (run 108/108) | VERIFIED-IN-PROD |
| C14 | Dedup scope: on the event id, per project, permanent for exact events; a retried send with the same id counts once; SDK always sends an id | home, product, faq, developers | `ingest/src/v2.ts:362-505,756,837`; SDK `core/client.ts:443-479` purchase id = transaction_id | VERIFIED-IN-PROD (raw HTTP without `id` is not deduped; the samples always send one) |
| C15 | Funnels, attribution and unique visitors are statistical estimates, and we say so | home, product, why-yom, faq, llms | API: funnel `exact:false` (`api/src/routes/v2/reports.ts:841`), attribution splits `exact_conversions` (`:1039`) | VERIFIED-IN-PROD (copy no longer says the dashboard labels them; it doesn't) |
| C16 | Reconciliation report: orders by API or CSV matched to purchase transaction ids from exact events; missing and extra listed | product, ecommerce, llms | `api/src/routes/v2/proof.ts:126,150`; `shared/.../reconciliation.ts:733-741` | VERIFIED-IN-PROD |
| C17 | Cookieless until analytics consent: no persistent id, no storage writes; server forces visitor id empty without consent | home, product, regulated, faq, developers, privacy, security, llms | SDK `core/client.ts:509-551,590`; `shared/src/analytics/normalize.ts:545-552` | VERIFIED-IN-PROD (v2; legacy v1 endpoints excepted, see D3) |
| C18 | Withdrawing consent clears the visitor, session and consent keys | product, cookies | SDK `core/client.ts:509-551` | VERIFIED-IN-PROD (yom_fp stays; the cookie page says so) |
| C19 | DNT and GPC treated as denied: cookieless by default; project can choose drop or ignore | home, product, why-yom, regulated, faq, developers, llms | `shared/src/analytics/config.ts:110-123` (dnt: cookieless\|drop\|ignore); `normalize.ts:544-552` | VERIFIED-IN-PROD |
| C20 | Required mode drops events whose consent is denied | product | `normalize.ts` required-consent branch (browser events, `denied` only) | VERIFIED-IN-PROD |
| C21 | Pages recorded by path; SDK drops query string and fragment; referrers reduced to a host | home, product, regulated, faq, dpa, privacy, llms | SDK `core/client.ts:681-683`; `normalize.ts:142-156` cleanPath | VERIFIED-IN-PROD (page envelope). Plugin params: see C22 |
| C22 | "Query strings never leave the browser" (absolute) | old home, product, faq, regulated, llms | SDK 0.3.1 `plugins/auto-ecommerce.ts:238,509,532` send `location.href`; `plugins/auto-click.ts:75-86` send full link href; site-search term sent by design | NOT-TRUE until YOM PR #53 ships in a published SDK. Copy changed |
| C23 | Click ids not stored; they only decide the channel; Meta click id passed to Meta with marketing consent + CAPI | product, regulated, faq, llms | SDK `core/client.ts:620-625`; `normalize.ts:594-605`; `sdk/src/core/forwarders.ts:101-125` | VERIFIED-IN-PROD |
| C24 | PII scrubbing: params named like personal data, and values that look like an email or card number, removed from browser events; server events kept as sent | home, product, regulated, faq, privacy, llms | `normalize.ts:188-256,682` | VERIFIED-IN-PROD (phone values are caught by key name only) |
| C25 | Forwarding to ad platforms only with explicit marketing consent and no GPC; suppressed sends logged | home, product, why-yom, ecommerce, faq, llms | `shared/.../adplatforms/common.ts:69-70` (`suppressed_consent`); SDK `client.ts:512` | VERIFIED-IN-PROD |
| C26 | Internal traffic excluded from reports and never sent to webhook or server-side destinations | product | `shared/.../sql.ts:408-409`; `destinations.ts:207` | VERIFIED-IN-PROD (the SDK's own browser GA4/Meta forwarding ignores the flag) |
| C27 | Opt-out evidence: every event stores consent, GPC, DNT, cookieless, scrubbed, forwarding-suppressed flags; the report totals them | product, regulated, why-yom, llms | `shared/.../privacy.ts:4-27`; `query/proof.ts:72-85` | VERIFIED-IN-PROD |
| C28 | Browser batches as text/plain via sendBeacon, no CORS preflight, fetch(keepalive) fallback | home, product, why-yom, developers, llms | SDK `core/transport.ts:1-8,82-107`; prod OPTIONS → 204 | VERIFIED-IN-PROD |
| C29 | Server events to /v2/events with Bearer secret key or HMAC (`YOM-Key-Id`, `YOM-Signature: t=<unix>,v1=<hex hmac_sha256(secret,"t.body")>`; HMAC key = the secret key) | home, product, why-yom, developers, faq, ecommerce, llms | `ingest/src/v2.ts:771-797`; `shared/src/analytics/crypto.ts:60-95`; KEY_ENC_SECRET set on prod yom-api + yom-ingest; staging: Bearer sample 202, e2e HMAC (`e2e/staging/run.mjs:616`) | VERIFIED-IN-PROD (the key id is in the keys API; the dashboard shows it after YOM PR #52) |
| C30 | Up to 50 events per request; 64 KB from browsers, 256 KB from servers; 429/5xx retried with backoff | product, developers | `normalize.ts:24-25`; `ingest/src/v2.ts:773`; SDK `transport.ts:44-80`, `node.ts:238-263` | VERIFIED-IN-PROD |
| C31 | Ingest host `https://ingest.yourownmetrics.aapastech.com`, POST /v2/collect (publishable key) and /v2/events | developers, llms | prod `/health` 200; unauthenticated /v2/events → 401 | VERIFIED-IN-PROD |
| C32 | Bot filtering at the edge (UA rules, missing UA); webdriver detection in the SDK | product, security, llms | `normalize.ts:108-113`; `ingest/src/v2.ts:678`; SDK `client.ts:939` | VERIFIED-IN-PROD |
| C33 | GA4-aligned taxonomy; custom snake_case names up to 64 chars; strict mode drops undeclared names | product, developers, faq, llms | `shared/.../taxonomy.ts:11-45,73-86`; `config.ts:11` | VERIFIED-IN-PROD |
| C34 | Enrichment: channel from UTM + referrer, device/browser/OS, country and region from the edge | product | `normalize.ts:587-615,702-704` | VERIFIED-IN-PROD |
| C35 | AI-assistant channel, 12 assistants incl. ChatGPT, Perplexity, Claude, Gemini | product, why-yom, faq, llms | `shared/.../ai.ts:14-26` (12 entries); `channel.ts:75` `ai_assistant` | VERIFIED-IN-PROD |
| C36 | AI-crawler report, last 88 days, in the API and MCP server; sees crawlers via server-side events or the pixel | product, why-yom, faq, llms | `api/src/routes/v2/reports.ts:1308-1365`; MCP tool `ai_crawlers` | VERIFIED-IN-PROD (no dashboard page) |
| C37 | SDK: one npm package for browser, React and Node, v0.3.1, zero dependencies, around 12 KB gzipped with every plugin | developers, product, faq, llms | npm `@yourownmetric/sdk@0.3.1`; `dist/yom.min.js` 11,957 B gzip; `sdk/scripts/check-size.mjs` budget 12,000 B | VERIFIED-IN-PROD |
| C38 | Code samples run as written (init/consent/ecommerce/lead/track, React provider + autoCapture, Node YOMServer track/shutdown/verifyWebhook, curl Bearer and HMAC) | developers, home | type-checked against SDK 0.3.1; Bearer curl on staging → 202; browser and server purchase share id `1043` | VERIFIED-IN-PROD |
| C39 | React components need React 19 | developers | npm `dist/react.js` bundles React 19 jsx-runtime (`react.transitional.element`) | VERIFIED-IN-PROD (package peer range still says >=18) |
| C40 | Reports: overview, timeseries, breakdowns, ecommerce (funnel, revenue, AOV, items), goals, funnels, attribution (first/last/any touch by channel), retention cohorts, Core Web Vitals, errors, 30-minute realtime | product, ecommerce, llms | `api/src/routes/v2/reports.ts:243-397,680` | VERIFIED-IN-PROD |
| C41 | Generic counters query: count, sum, unique sessions/visitors, percentiles, up to two dimensions or by time | product, platforms | `reports.ts:406`; `mcp/src/tools.ts:613-622` | VERIFIED-IN-PROD |
| C42 | Export CSV or NDJSON over the API for the last 88 days, 7 days per request on Free, 90 on PAYG | product, faq, security, compare, why-yom, llms | `reports.ts:426-460`; `entitlements.ts:48,67` | VERIFIED-IN-PROD |
| C43 | "Raw archive kept for the life of the project so you can export it" / "older data comes from the raw archive" / "export any time" | old security, product, faq, compare | v2 archive is purged at retention (`cron/src/jobs/analytics-v2.ts:292-303`); no API downloads archive data | NOT-TRUE. Copy changed |
| C44 | Raw archive: daily archive files, deleted with the rest of your data when retention ends | product, security | `shared/.../retention.ts:134-175` purgeProjectArchive | VERIFIED-IN-PROD (v2) |
| C45 | Webhooks: realtime or batched, HMAC-signed `YOM-Signature`, stable `YOM-Event-Id`, secret `whsec_` shown once, filters all / family / named | product, developers, compare, llms | `shared/.../destinations.ts:16,178-207`; `crypto.ts:61-67`; `manage.ts:548,580` | VERIFIED-IN-PROD |
| C46 | Retries from 30 s to 6 h, about 24 h total; delivery log (30 days), health, test events, redelivery | product, developers, security, llms | `destinations.ts:506-509` (85,350 s); `manage.ts:742,865,891,911` | VERIFIED-IN-PROD |
| C47 | White-label webhook headers: own prefix and user agent | home, product, agencies, platforms, developers | `config.ts:391-405` | VERIFIED-IN-PROD |
| C48 | Warehouse exports (S3, GCS, R2, BigQuery; Snowflake via external stage) | product, developers, platforms, compare, llms | code: `shared/src/analytics/warehouse/*`, cron hourly `cron/src/index.ts:95`. Prod `yom-cron` has no `SECRET_ENC_KEY` → `runner.ts:496` throws | SHIPPED-NOT-DEPLOYED |
| C49 | Scheduled weekly/monthly email reports (CSV on PAYG) | agencies, product, faq, llms | code: `api/src/routes/v2/scheduled-reports.ts:119,170`. Prod `yom-cron` has no `RESEND_API_KEY` (`cron/wrangler.toml:108`: "without it both stay queued") | SHIPPED-NOT-DEPLOYED |
| C50 | Client portals on your own domain | agencies, product, faq, llms | `api/src/routes/v2/portals.ts:74-75,277` need `CF_SAAS_ZONE_ID` + `PORTAL_CNAME_TARGET`; neither is a prod var or secret | SHIPPED-NOT-DEPLOYED |
| C51 | White-label client portals with read-only client logins limited to chosen reports | home, product, agencies, faq, llms | `api/src/routes/v2/portals.ts` (client_viewer, per-portal reports); dashboard `/portal/*` | VERIFIED-IN-PROD |
| C52 | `<yom-report>` web component (@yourownmetric/embed), ~9 KB | platforms, product, developers, faq, llms | npm `@yourownmetric/embed@0.1.0` has no yom-report build; jsDelivr URL 404; `publish-sdk.yml` skips embed | SHIPPED-NOT-DEPLOYED |
| C53 | Sub-tenants: turn on in project settings, open (new id = partition on first event) or registered; keys and embed tokens bound to one; another sub-tenant → 403 | home, product, agencies, platforms, faq, llms | `config.ts:68` (default off); `ingest/src/v2.ts:548-557`; 403s `reports.ts:106`, `manage.ts:444,1051` | VERIFIED-IN-PROD |
| C54 | Usage by sub-tenant for re-billing | home, product, agencies, platforms, faq, llms | `reports.ts:379` `/reports/usage` | VERIFIED-IN-PROD |
| C55 | Embed tokens: short-lived (≤24 h), report and origin allow-lists | agencies, platforms, faq, dpa | `crypto.ts:139`; `manage.ts:1058-1067`; `principal.ts:235` | VERIFIED-IN-PROD (v2 tokens; an empty origin list allows any origin) |
| C56 | Custom dimensions: map plan/region/cohort into reportable dimensions and metrics | platforms | `config.ts:263-293` (4 dimension, 12 metric slots) | VERIFIED-IN-PROD |
| C57 | Partner API: management keys create and suspend projects and mint keys; can't call the report API | product, platforms, developers, llms | `api/src/routes/v2/projects.ts:401,500,542,558,604,796`; `principal.ts:131` | VERIFIED-IN-PROD |
| C58 | "Management keys can never read analytics data" | old platforms, llms | they can mint a `read` key (`key-mint.ts:17`) | NOT-TRUE. Copy changed |
| C59 | MCP server: 13 read-only tools, Streamable HTTP, Bearer read-scoped key or short-lived embed token; publishable keys refused | product, why-yom, developers, faq, llms | `mcp/src/tools.ts` (13 READ_ONLY); live `https://mcp.yourownmetrics.aapastech.com/mcp` → 401 `Bearer realm="yom-mcp"`, pk refused | VERIFIED-IN-PROD |
| C60 | Report API with read-scoped keys | product, faq | `reports.ts:241` `requireScope('read')` | VERIFIED-IN-PROD |
| C61 | GA4 gtag shim in the SDK; GA4 BigQuery daily-totals import API with a script you run | product, developers, llms | SDK `src/gtag-shim.ts` (export `./gtag-shim`); `api/src/routes/v2/imports.ts:46`; `scripts/ga4-import/` | VERIFIED-IN-PROD |
| C62 | Looker Studio community connector, early access, self-deployed from the repo | product, developers, home, llms | `integrations/looker-studio/` (clasp deploy README), not in gallery | VERIFIED-IN-PROD (as early access) |
| C63 | WooCommerce plugin, early access, not on wordpress.org; we install it with you | product, ecommerce, faq, developers, home, llms | `integrations/woocommerce/yom-analytics` (zip via `npm run zip`) | VERIFIED-IN-PROD (as early access) |
| C64 | Shopify app | ecommerce, product, faq, developers, home, llms | `integrations/shopify/shopify.app.toml:3` `client_id = "<shopify app client id>"`; `shopify.yourownmetrics.aapastech.com` does not resolve; no deploy job | SHIPPED-NOT-DEPLOYED (was claimed as early access; changed to Coming soon) |
| C65 | Google Ads Enhanced Conversions not built | home, product, faq, developers, ecommerce, llms | `shared/.../adplatforms/google-ads.ts:2` "config schema ONLY"; create → 400 | VERIFIED-IN-PROD (as Coming soon) |
| C66 | No session replay, feature flags or experiments | home, compare, faq, llms | no such code on main | VERIFIED-IN-PROD |
| C67 | Sign-in: email + password, Google sign-in, optional TOTP MFA | product, faq, security, regulated, llms | `api/src/routes/auth.ts:114,360`; `mfa.ts:76`; prod secret `GOOGLE_CLIENT_ID` present | VERIFIED-IN-PROD |
| C68 | Audit logs (on PAYG) for customers | old pricing, security, regulated, llms | writes `api/src/routes/v2/audit.ts:27`; only reader `admin.ts:829` behind `requireSuperAdmin` | NOT-TRUE. Copy removed |
| C69 | Team members / seats (Free 1, PAYG unlimited) | old pricing, why-yom, agencies, llms | `teamMembers` never read; `tenant_members` only written at sign-up (`auth.ts:146,458`); no invite flow | NOT-TRUE. Copy removed |
| C70 | Per-key v2 API rate limits 120/min Free, 1,200/min PAYG | security | `api/wrangler.toml` RL_V2_FREE 120, RL_V2_PAID 1200; `principal.ts:389` | VERIFIED-IN-PROD |
| C71 | Publishable `yom_pk_…` and secret `yom_sk_…` keys with scopes (prod format `yom_pk_live_…`) | security, developers | `shared/src/utils/index.ts:21`; `key-mint.ts:71` | VERIFIED-IN-PROD |
| C72 | Passwords salted hashes (bcrypt); API keys hashed; destination credentials AES-GCM; webhook secrets shown once, encrypted at rest | security, dpa | `utils/index.ts:184,201-213`; `crypto.ts:98-110`; `manage.ts:548,565,580,636` | VERIFIED-IN-PROD (legacy SHA-256 hashes still accepted for old accounts) |
| C73 | Runs on Cloudflare Workers with D1, KV, R2 and Queues | product, security | `api/wrangler.toml`, `cron/wrangler.toml` bindings | VERIFIED-IN-PROD |
| C74 | Edge ingest on YOM's domain; no custom ingest domain | llms | single custom_domain `ingest.yourownmetrics.aapastech.com`; only an SDK `ingestUrl` override exists | VERIFIED-IN-PROD |
| C75 | "First-party" means first-party data: you collect it for your own use, no third-party pixels or cookies. It does not mean collection runs on the customer's domain | home, faq, product, JSON-LD, llms | see C74, C17; SDK sets no cookies (`transport.ts:58,103` `credentials: 'omit'`) | VERIFIED-IN-PROD |
| C76 | Not available today: third-party attestations, BAAs, data-location commitments, customer IdP SSO, public status page / SLA | security, regulated | none of these exist in code or ops | VERIFIED-IN-PROD (as "Not yet") |
| C77 | Browser storage keys: `yom_visitor_<id>`, `yom_session_<id>`, `yom_consent_<id>`, `yom_fp` (opt-in cross-site), dashboard `yom_token` (24 h), `yom_user`, `yom_tenant`, `yom_selected_project`, `yom_portal_session` (12 h); SDK sets no cookies | cookies | SDK `core/client.ts:35-58`, `fingerprint.ts:13`; dashboard `authSlice.ts:56-66`, `portalSessionSlice.ts:11` | VERIFIED-IN-PROD |
| C78 | Website sets no cookies | cookies (meta) | live `curl -I` on /, /pricing, /developers: no Set-Cookie | VERIFIED-IN-PROD (Cloudflare may add `__cf_bm` on bot challenges; the page body says so) |
| C79 | Sub-processors: Cloudflare, Stripe, Razorpay, Resend, Google, Slack (plus Tyashin hosting vendors for the website) | subprocessors | code calls exactly these; MongoDB Atlas / SendGrid are Tyashin-side | VERIFIED-IN-PROD (jsDelivr used by the dashboard docs snippet is not listed: D7) |
| C80 | Customer data deleted within 180 days after termination | terms §17, dpa §13 | no automated job; hard delete misses `v2/`, `compressed-archive/`, DB_ANALYTICS, AE (`api/src/routes/tenants.ts:244-288`, `admin.ts:304-333`) | PARTIAL (manual ops process needed: D5) |
| C81 | Data-subject requests handled mainly through the Service's own controls | dpa §9 | no per-visitor lookup/export/delete in code | PARTIAL (manual: D5) |
| C82 | Backups expire on their own cycle | privacy §9, dpa §13 | `cron/src/jobs/backup.ts:13` hard-codes the STAGING platform DB id; prod platform DB relies on D1 Time Travel | PARTIAL (D6) |
| C83 | Recovery codes stored hashed | privacy §4 | `api/src/routes/mfa.ts:76-89` (codes SHA-256; TOTP secret plaintext) | VERIFIED-IN-PROD (copy now limits "hashed" to recovery codes) |
| C84 | 32.5% of US internet users block ads (Q2 2025) | home, why-yom, ecommerce | Backlinko (GWI) `src/lib/sources.ts` adBlock | EXTERNAL-SOURCE |
| C85 | 20 US states with comprehensive privacy laws by 2026 | home, why-yom | MultiState `sources.ts` stateLaws | EXTERNAL-SOURCE |
| C86 | Healthline $1.55M; Tractor Supply $1.35M; Honda $632,500; Todd Snyder $345,178; GPC sweep Sept 2025 | home, why-yom | Hunton, White & Case, CPPA, TrustArc, CA OAG in `sources.ts` | EXTERNAL-SOURCE |
| C87 | GA4 thresholds, consent-mode modeling thresholds, 2/14/50-month retention, 1M/day BigQuery export cap, Looker quota errors | compare, why-yom, agencies, ecommerce | Google Analytics Help, Momentic, Databloo in `sources.ts` | EXTERNAL-SOURCE |
| C88 | Mixpanel, Amplitude, Segment, RudderStack, AgencyAnalytics prices | compare, why-yom, agencies, platforms | vendor pages / Hardal in `sources.ts` (verified 21 Oct 2026) | EXTERNAL-SOURCE |
| C89 | Safari 7-day storage cap; sGTM subdomain blocking; Chrome kept 3P cookies | why-yom, ecommerce | WebKit, PPC Land, The Register in `sources.ts` | EXTERNAL-SOURCE |
| C90 | Luzmo 78% / 3.6 of 5; Adobe +693% AI traffic; GA4 MCP server July 2025; ChatGPT as Direct | why-yom, platforms | Luzmo, Practical Ecommerce, PPC Land, Clickport in `sources.ts` | EXTERNAL-SOURCE |
| C91 | Kaiser $47.5M; CIPA §631 after SB 690 signed 30 September 2026; Quebec Law 25 opt-in | regulated | BankInfoSecurity, Crowell (page states "September 30, 2026", checked 2026-10-24), McCarthy Tétrault | EXTERNAL-SOURCE |
| C93 | Retention "90 days on Free, 365 days on pay-as-you-go" | old product, pricing, faq, compare, llms | v2 retention is 180 / 395 default (C08); 90/365 only in the legacy D1 cron | NOT-TRUE. Copy changed |
| C92 | Company: YOM built by Aapastech; 14818032 Canada Inc., Burlington, Ontario; contact@aapastech.com; +1 437 800 0190 | all (footer, about, contact, JSON-LD) | business facts from the user, `src/config/site.ts` | EXTERNAL-SOURCE |

## Keyword gate

`npm run claims:check` scans `src/` (comments stripped) for each regex and checks the rows it maps to. Lines are matched case-insensitively. In regexes, `\|` is an escaped pipe (alternation).

| Keyword (regex) | Rows |
|---|---|
| `100,000 events\|100K events\|first 100,000` | C02 C03 |
| `20,000 (a\|in one) day` | C02 |
| `no credit card` | C01 |
| `\$0\.10\|\$0\.06\|\$0\.03\|\$0\.015\|CA\$0\.1` | C04 |
| `billed in US\|billing is in USD` | C05 |
| `180.day\|180 days` | C08 |
| `395` | C08 |
| `five years` | C08 |
| `90.day (data )?retention\|90 days on Free\|Free: 90` | C93 |
| `365.day\|365 days` | C93 |
| `team members?\|unlimited seats` | C69 |
| `audit log` | C68 |
| `sub-tenants?` | C53 |
| `up to 3 sub-tenants\|Free includes 3` | C07 |
| `25 destinations` | C10 |
| `Meta CAPI\|Conversions API` | C11 C25 |
| `GA4 Measurement Protocol\|GA4 MP` | C11 C25 |
| `exact(ly)?,? deduplicated\|counted exactly\|are exact` | C13 C14 |
| `reconcil` | C16 |
| `cookieless` | C17 C19 |
| `Global Privacy Control\|\bGPC\b` | C19 |
| `query string` | C21 |
| `never leave the browser\|query strings never` | C22 |
| `click ids?` | C23 |
| `scrubb?` | C24 |
| `internal traffic\|internal events` | C26 |
| `evidence report\|opt-out report` | C27 |
| `sendBeacon` | C28 |
| `HMAC` | C29 |
| `YOM-Key-Id` | C29 |
| `64 KB\|256 KB` | C30 |
| `bot filter\|Bots are filtered` | C32 |
| `snake_case` | C33 |
| `AI-assistant\|12 AI assistants\|and 9 others` | C35 |
| `AI-crawler` | C36 |
| `12 KB` | C37 |
| `React 19` | C39 |
| `Core Web Vitals\|retention cohorts` | C40 |
| `counters (query\|endpoint)` | C41 |
| `NDJSON` | C42 |
| `life of the project\|from the raw archive\|at any time\.\|Export any time` | C43 |
| `raw archive` | C44 |
| `YOM-Signature\|signed webhook\|HMAC-signed` | C45 |
| `about 24 hours\|redeliver` | C46 |
| `header prefix` | C47 |
| `warehouse exports?` | C48 |
| `scheduled (weekly\|monthly\|email)\|weekly or monthly` | C49 |
| `own domain` | C50 |
| `client portal\|portals?` | C51 |
| `yom-report` | C52 |
| `embed tokens?` | C55 |
| `custom dimensions` | C56 |
| `Partner API\|management keys` | C57 |
| `never read analytics` | C58 |
| `MCP` | C59 |
| `13 read-only` | C59 |
| `gtag shim\|gtag-shim` | C61 |
| `Looker Studio` | C62 |
| `WooCommerce` | C63 |
| `Shopify app` | C64 |
| `Enhanced Conversions` | C65 |
| `session replay` | C66 |
| `Google sign-in\|multi-factor\|TOTP` | C67 |
| `120 requests` | C70 |
| `yom_pk_\|yom_sk_` | C71 |
| `bcrypt\|AES-GCM` | C72 |
| `Cloudflare Workers` | C73 |
| `custom ingest domain\|runs on your domain\|first-party (ingest\|collection\|domain)` | C74 |
| `yom_visitor\|yom_portal_session\|yom_fp` | C77 |
| `32\.5%` | C84 |
| `1\.55` | C86 |

## Decisions and follow-ups (need a human)

- **D1. PAYG usage is never billed.** `StripeProvider.reportEventUsage` (`api/src/services/stripe-provider.ts:161`) and `incrementEventUsage` (`billing-service.ts:351`) have no caller, so Stripe gets no usage and PAYG event charges are $0. The rate card is published but not charged. Product fix, not copy.
- **D2. Turn on the built features:** set `SECRET_ENC_KEY` (same value as yom-api/yom-pipeline) and `RESEND_API_KEY` on prod `yom-cron`; set `CF_SAAS_ZONE_ID`, `PORTAL_CNAME_TARGET` (and `CF_SAAS_API_TOKEN`) on `yom-api`; publish `@yourownmetric/embed` with the yom-report build; create the Shopify Partner app. Then re-verify C48 to C50, C52, C64 and flip them to VERIFIED-IN-PROD here before changing the copy.
- **D3. Legacy v1 endpoints** (`/v1/ingest`, `/v1/beacon`, `/v1/pixel.gif`) are live with no consent, DNT or GPC handling and keep full URLs. Retire them or keep the "legacy v1 excepted" wording in the privacy policy.
- **D4. Retention numbers disagree in code:** plan constants 90/365 (legacy D1 cron), v2 entitlements 180/1825, v2 default 395. The site now states the v2 values. If 90/365 is the intended product, change the code first (it deletes data, so plan it), then the copy.
- **D5. Deletion within 180 days of termination and DSR handling are manual today.** Write the ops runbook, or build the purge across every prefix and shard.
- **D6. Backup job exports the staging DB** into the prod bucket (`cron/src/jobs/backup.ts:13`).
- **D7. Smaller code fixes:** MFA TOTP secret in plaintext; legacy SHA-256 password hashes never rehashed; `yom_fp` kept on withdrawal; SDK peer range `react >=18` but needs 19; `docs/integrations/shopify.md:15` says "Install from the Shopify App Store"; jsDelivr not on the sub-processor list; dashboard Funnels/Attribution pages show no "Estimate" label.
- **"First-party":** the site uses it for first-party data, not first-party domain (C75). Collection runs on YOM's ingest domain. A CNAME ingest option would make the stronger reading true too.

## YOM PRs from this audit

- [aapastech/yourownmetrics#52](https://github.com/aapastech/yourownmetrics/pull/52): dashboard shows the secret key's id for HMAC (`YOM-Key-Id`). After it deploys, the developers page can say "shown next to the key in your dashboard".
- [aapastech/yourownmetrics#53](https://github.com/aapastech/yourownmetrics/pull/53): SDK sends checkout, download and outbound-click URLs without query string or fragment. After it ships in a published SDK, C22 can become VERIFIED and the copy can go back to "query strings never leave the browser" (except the site-search term).

## How to add or change a row

1. **Find the evidence in production.** Check out origin/main of `aapastech/yourownmetrics` in your own worktree and find the file:line that does it. Code on develop or a branch doesn't count. If it depends on a secret, var, cron, publish or store listing, check that too (`wrangler secret list --name <worker>` with the YOM account login, `npm view`, a curl of the public endpoint).
2. **Add a row** to the Claims table with the next free ID. Quote the claim as the page says it, list the pages, cite the evidence, set the status. Don't reuse or renumber IDs.
3. **Add a keyword** to the Keyword gate if the claim names a capability another page could repeat. Map it to every row it can stand for, and make the regex narrow enough not to fire on unrelated text.
4. **Run `npm run claims:check`** (and `npm run claims:check -- --live` after deploy). A failure names the file:line and the row that blocks it. Fix the copy, or verify the claim and update the row. Never flip a status without new evidence.
5. **When a feature ships,** re-verify, change SHIPPED-NOT-DEPLOYED to VERIFIED-IN-PROD, then remove the Coming soon label from the copy, in that order.
6. **Blog drafts** go through docs/BLOG-FACTCHECK.md. `npm run claims:check -- --file draft.md` runs the same gate on a draft.
