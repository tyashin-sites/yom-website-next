# YOM claims ledger

Every capability or factual claim on yom.aapastech.com (pages, metadata, JSON-LD, FAQ, pricing, compare, code samples, legal descriptions of data handling, llms.txt) and the evidence that YOM production serves it.

**Rule (user, 2026-10-24):** whatever the website texts and blogs claim must be justified and served by the YOM platform.

- **Production** = `aapastech/yourownmetrics` origin/main `88b75f5` (release PR #51, deployed 2026-10-24). Evidence paths are on that commit.
- **Behaviour checks** used the staging QA fixture (`yom-wt-qa-staging/e2e/staging/.env.qa`, staging = develop at the #51 merge, code parity with main), read-only probes of the prod hosts, `wrangler secret list` on the prod workers (names only), and the published npm tarballs.
- **Audit:** 2026-10-24, claims-audit session. Site commits `1e09fac` (legal storage names), then the copy changes `cce52a4`, `1417406`, `6bc9840` were reverted on the same day.
- **User decision (2026-10-24):** "best here is to build it in YOM rather than changing the marketing copy." Capability claims that prod doesn't serve keep their copy and become **BUILD-PENDING** with an owning build session and an expiry. Kept from the audit: retention 180/395 (the billing build adopts those values), the Free 20,000/day note (true until the billing build removes the cap), and the code-sample fixes (they made customers double-count or fail).

## Statuses

| Status | Meaning | Gate |
|---|---|---|
| VERIFIED-IN-PROD | Code on origin/main does this, it is wired and configured in prod, and nothing contradicts it. | passes |
| EXTERNAL-SOURCE | Third-party fact, cited on the page with the URL in `src/lib/sources.ts`. | passes |
| SHIPPED-NOT-DEPLOYED | Code exists on main but prod lacks a secret, var, publish or listing. | passes only next to a "Coming soon" / "Early access" label |
| BUILD-PENDING (owner, until YYYY-MM-DD) | Not served yet; the copy stays because a build session owns making it true. Expiry is at most 14 days after marking. | passes until the date, then fails |
| PARTIAL | True with a caveat the copy doesn't carry. | fails |
| NOT-TRUE | Prod doesn't do it. Kept here so the old wording can't come back. | fails |

## Claims

| ID | Claim | Pages | Evidence | Status |
|---|---|---|---|---|
| C01 | Free plan: $0, no credit card required | home, pricing, faq, JSON-LD, llms | `api/src/routes/auth.ts:139` inserts plan `free`; sign-up has no payment step (`/signup` → RegisterPage, live 200) | VERIFIED-IN-PROD |
| C02 | 100,000 events a month included on Free; past it, ingest answers 429 until the next month (no daily cap) | pricing, faq, llms | origin/main ca16b0f (PR #55, released 2026-10-26): `shared/src/constants/index.ts:186-200` free monthlyLimit 100,000, absoluteDailyLimit null, degradeAfterHardLimit false; `ingest/src/index.ts:509-525` 429 `MONTHLY_ALLOWANCE_USED` (v1 and v2 share checkLimits, `ingest/src/v2.ts:734`); 10% exact-event grace. Copy "(at most 20,000 a day)" removed 2026-10-26 | VERIFIED-IN-PROD |
| C03 | First 100,000 events free on pay-as-you-go too | pricing, home, faq, llms | `shared/src/constants/index.ts:356-396` tier `upTo: 100_000` at 0 | VERIFIED-IN-PROD |
| C04 | Graduated rate card $0.10 / $0.06 / $0.03 / $0.015 per 1K; CA$0.14 / 0.08 / 0.04 / 0.02; worked examples ($90 at 1M, $150 at 2M, $630 at 10M, $930 at 20M, $1,080 at 25M) | pricing, home, compare, why-yom, faq, llms | `shared/src/constants/index.ts:356-396` EVENT_TIERS; `src/lib/pricing.ts` mirrors it; `tests/pricing.test.ts` | BUILD-PENDING (billing, until 2026-11-07). Metering code released in ca16b0f (PR #55); BLOCKER: Stripe live-mode keys/meters not configured yet (user action), so no charge happens until then Coordinator 2026-10-26: if Stripe live is not in by 2026-11-07, extend once by 14 days (to 2026-11-21) with reason "awaiting merchant-of-record entity decision + Stripe live activation (user)"; do not change the pricing copy. |
| C05 | CAD rates published for the same bands (calculator currency switch) | pricing, faq, llms | `api/scripts/setup-stripe.ts:52` `currency: 'usd'` | VERIFIED-IN-PROD (published; Stripe bills USD only, see billing gaps) |
| C06 | Free: 1 project | pricing, llms | `api/src/routes/projects.ts:78`, `api/src/routes/v2/projects.ts:386` (402) | VERIFIED-IN-PROD |
| C07 | Free: up to 3 sub-tenants; PAYG unlimited | pricing, agencies, llms | `shared/src/analytics/entitlements.ts:42,61`; `api/src/routes/v2/manage.ts:183-193` | VERIFIED-IN-PROD |
| C08 | Retention: Free 180 days; PAYG 395 days by default, adjustable up to five years | product, pricing, faq, compare, llms | origin/main ca16b0f: single `RETENTION_POLICY` (`shared/src/constants/index.ts:37-41`: free 180/180, payg 395 default / 1825 max) used by the legacy cron, v2 purge, reports, imports, dashboard and tenants.ts (PR #55) | VERIFIED-IN-PROD |
| C09 | PAYG adds over Free: custom events, API access, funnels, embedded dashboards, webhooks/destinations, audit logs | pricing, llms | origin/main ca16b0f (PR #55): PAYG-only gates for embed tokens incl. v1 (`api/src/routes/embed.ts:205-214` 402 PLAN_LIMIT), realtime + up to 25 destinations, Meta/GA4 (`manage.ts:507`), portals without branding; audit-log read PAYG (C68); team members (C69) | VERIFIED-IN-PROD |
| C10 | PAYG: realtime webhooks, up to 25 destinations per project (Free: 1 batched) | pricing, llms | `entitlements.ts:43-44,62-63` | VERIFIED-IN-PROD (not stated on the site today) |
| C11 | Meta CAPI and GA4 Measurement Protocol forwarding on PAYG only | pricing, product, llms | `api/src/routes/v2/manage.ts:507` 402 on Free; `entitlements.ts:64` | VERIFIED-IN-PROD |
| C12 | Embed tokens on PAYG; portals without "Powered by" on PAYG | pricing, agencies, llms | `manage.ts:1041` embed gate; `api/src/routes/portal-public.ts:85` removeBranding | VERIFIED-IN-PROD |
| C13 | Exact, deduplicated counts for purchase, refund, generate_lead, form_submit, sign_up; no sampling or thresholds on those counts | home, product, why-yom, faq, ecommerce, llms, JSON-LD | `shared/src/analytics/exact.ts:15-21`; `shared/src/migrations/analytics.ts:78` `UNIQUE(project_id,event,id)`; e2e/staging exact counters strict (run 108/108) | VERIFIED-IN-PROD |
| C14 | Dedup scope: on the event id, per project, permanent for exact events; a retried send with the same id counts once; SDK always sends an id | home, product, faq, developers | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): `shared/src/analytics/conversion-dedupe.ts` purchase deduped on (project, purchase, transaction_id), refund on transaction_id+value, raw HTTP without id included; event-id dedupe as before | VERIFIED-IN-PROD |
| C15 | Funnels, attribution and unique visitors are estimates, "and the product says so" | home, product, why-yom, faq, llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): dashboard Estimate chips on funnels (`reports/FunnelsPage.tsx:239`), attribution (`AttributionPage.tsx:190-211`) and overview visitor cards (`analytics/OverviewPage.tsx:88,96`, `reports/common.tsx:206,241`); API flags as before | VERIFIED-IN-PROD |
| C16 | Reconciliation report: orders by API or CSV matched to purchase transaction ids from exact events; missing and extra listed | product, ecommerce, llms | `api/src/routes/v2/proof.ts:126,150`; `shared/.../reconciliation.ts:733-741` | VERIFIED-IN-PROD |
| C17 | Cookieless until analytics consent: no persistent id, no storage writes; server forces visitor id empty without consent | home, product, regulated, faq, developers, privacy, security, llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): v2 as before; legacy v1 now resolves GPC/DNT/consent the same way (`ingest/src/v1-privacy.ts`, shared `resolveOptOut`), scrubs PII and strips URL queries (`ingest/src/v1-scrub.ts`); daily visitor hash uses a secret salt | VERIFIED-IN-PROD |
| C18 | Withdrawing consent wipes the stored ids | product, cookies | SDK `core/client.ts:509-551` | BUILD-PENDING (sdk, until 2026-11-07). yom_fp is kept YOM PR #57: applyConsent removes yom_fp on withdrawal; then update the cookies page. 2026-10-26: fixed in SDK source on main 75fa6b2 (wipes yom_fp on withdrawal) but npm @yourownmetric/sdk is still 0.3.1 (2026-10-24); stays pending until the SDK is republished. |
| C19 | DNT and GPC treated as denied: cookieless by default; project can choose drop or ignore | home, product, why-yom, regulated, faq, developers, llms | `shared/src/analytics/config.ts:110-123` (dnt: cookieless\|drop\|ignore); `normalize.ts:544-552` | VERIFIED-IN-PROD |
| C20 | Required mode drops events whose consent is denied | product | `normalize.ts` required-consent branch (browser events, `denied` only) | VERIFIED-IN-PROD |
| C21 | Pages recorded by path; SDK drops query string and fragment; referrers reduced to a host | home, product, regulated, faq, dpa, privacy, llms | SDK `core/client.ts:681-683`; `normalize.ts:142-156` cleanPath | VERIFIED-IN-PROD (page envelope). Plugin params: see C22 |
| C22 | "Only the path is sent. Query strings (and fragments) never leave the browser" | home, product, faq, regulated, llms | SDK 0.3.1 `plugins/auto-ecommerce.ts:238,509,532` send `location.href`; `plugins/auto-click.ts:75-86` send full link href; site-search term sent by design | BUILD-PENDING (sdk, until 2026-11-07). plugins send location.href / link href; YOM PR #53 fixes YOM PR #57 + #53: referrers host-only, og:url/og:image path-only, server stripUrlQueries; search term still sent as its own field. 2026-10-26: server now strips query strings and fragments from every URL-like param before storage (`normalize.ts:259-280`, applied at :736), but the browser still sends them: auto-ecommerce begin_checkout/Shopify product use location.href on main, in the CDN build and in npm 0.3.1. Needs YOM PR #53 merged + SDK republished. 2026-10-26: #53 merged, SDK 0.4.0 on staging (ae4611c); becomes true for CDN/snippet users at the prod release, npm users after the 0.4.0 publish. |
| C23 | Click ids recorded only as present or absent in reports; Meta click id to Meta with marketing consent + CAPI | product, regulated, faq, llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): click-id presence kept as booleans/bitmask, never the value (`shared/src/analytics/click-ids.ts`), reported via `click_id` filter and the click-ids report; SDK 0.3.1 already sends booleans; Meta click id to Meta only with marketing consent + CAPI | VERIFIED-IN-PROD |
| C24 | Email-, phone-, name-, address- and card-like params scrubbed from browser events | home, product, regulated, faq, privacy, llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): server-side scrub of keys named like PII plus values that look like email, card or phone (`shared/src/analytics/normalize.ts:231-241` looksLikePhone), label/item/dims from scrubbed params; applies to every browser event whatever the SDK version | VERIFIED-IN-PROD |
| C25 | Forwarding to ad platforms only with explicit marketing consent and no GPC; suppressed sends logged | home, product, why-yom, ecommerce, faq, llms | `shared/.../adplatforms/common.ts:69-70` (`suppressed_consent`); SDK `client.ts:512` | VERIFIED-IN-PROD |
| C26 | Internal traffic excluded from reports and never sent to destinations | product | `shared/.../sql.ts:408-409`; `destinations.ts:207` | BUILD-PENDING (sdk, until 2026-11-07). SDK browser GA4/Meta forwarding ignores the internal flag YOM PR #57: SDK browser forwarding skips internal events. 2026-10-26: fixed in SDK source on main but not in npm 0.3.1; pending SDK republish. |
| C27 | Opt-out evidence report: per event, consent state, GPC, DNT, kept cookieless, PII scrubbed, forwarding suppressed | product, regulated, why-yom, llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): per-event flags stored and listed per event: `GET /v2/projects/:id/reports/privacy-evidence/events` (docs/privacy-evidence.md:76) beside the daily totals report | VERIFIED-IN-PROD |
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
| C39 | React components need React 19 | developers | npm `dist/react.js` bundles React 19 jsx-runtime (`react.transitional.element`) | VERIFIED-IN-PROD (package peer range still says >=18) YOM PR #57 externalises jsx-runtime so React 18 works; when that SDK is published, REMOVE the "need React 19" note from /developers. |
| C40 | Reports: overview, timeseries, breakdowns, ecommerce (funnel, revenue, AOV, items), goals, funnels, attribution (first/last/any touch by channel), retention cohorts, Core Web Vitals, errors, 30-minute realtime | product, ecommerce, llms | `api/src/routes/v2/reports.ts:243-397,680` | VERIFIED-IN-PROD |
| C41 | Generic counters query: count, sum, unique sessions/visitors, percentiles, up to two dimensions or by time | product, platforms | `reports.ts:406`; `mcp/src/tools.ts:613-622` | VERIFIED-IN-PROD |
| C42 | Export CSV or NDJSON "any time"; "older data comes from the raw archive" | product, faq, security, compare, why-yom, llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): any age via `GET /v2/projects/:id/archive/export` (`api/src/routes/v2/archive.ts:26`, read scope, cursor paging; dashboard Exports screen); recent data also via /export; prod route answers 401 without auth | VERIFIED-IN-PROD |
| C43 | Raw archive "kept for the life of the project so you can export it" / "your events, kept as files you can export" | security, product, faq, compare | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): retention no longer touches the v2 raw archive (no caller of purgeProjectArchive on main); archive kept for the life of the project and exportable at any age (C42); deleted with the project/org (C80) | VERIFIED-IN-PROD |
| C44 | Raw archive: daily archive files, deleted with the rest of your data when retention ends | product, security | `shared/.../retention.ts:134-175` purgeProjectArchive | VERIFIED-IN-PROD (not stated on the site today) |
| C45 | Webhooks: realtime or batched, HMAC-signed `YOM-Signature`, stable `YOM-Event-Id`, secret `whsec_` shown once, filters all / family / named | product, developers, compare, llms | `shared/.../destinations.ts:16,178-207`; `crypto.ts:61-67`; `manage.ts:548,580` | VERIFIED-IN-PROD |
| C46 | Retries from 30 s to 6 h, about 24 h total; delivery log (30 days), health, test events, redelivery | product, developers, security, llms | `destinations.ts:506-509` (85,350 s); `manage.ts:742,865,891,911` | VERIFIED-IN-PROD |
| C47 | White-label webhook headers: own prefix and user agent | home, product, agencies, platforms, developers | `config.ts:391-405` | VERIFIED-IN-PROD |
| C48 | Warehouse exports live (S3, GCS, R2, BigQuery; Snowflake via external stage) | product, developers, platforms, compare, llms | code: `shared/src/analytics/warehouse/*`, cron hourly `cron/src/index.ts:95`. Prod `yom-cron` has no `SECRET_ENC_KEY` → `runner.ts:496` throws | BUILD-PENDING (other, until 2026-11-07; blocker: Workers Paid upgrade (user)). prod yom-cron lacks SECRET_ENC_KEY 2026-10-26: code on main 75fa6b2 seals credentials with EXPORTS_ENC_KEY (`shared/src/analytics/warehouse/sealing.ts`, `runner.ts:44`); EXPORTS_ENC_KEY present on prod yom-cron and yom-api (wrangler secret list); hourly `runExports` in the prod cron (`cron/src/index.ts:110`); staging QA exercises export run-now to an S3 receiver. No prod export configured yet (warehouse_exports empty). Remaining check: the hourly cron needs Workers Paid (docs/v2-deploy.md "Workers plan"); confirm the plan or one successful scheduled run. Runtime evidence 2026-10-26 (CF GraphQL workersInvocationsAdaptive, yom-cron, 2026-10-22..26): 672 invocations, 667 success / 5 scriptThrewException, 0 exceededCpu; 29 successful invocations above 10 ms CPU (max p99 146 ms at the 01:00 hourly run). Not proof of the plan, but no CPU kills seen. |
| C49 | Scheduled weekly/monthly email reports live (CSV on PAYG) | agencies, product, faq, llms | code: `api/src/routes/v2/scheduled-reports.ts:119,170`. Prod `yom-cron` has no `RESEND_API_KEY` (`cron/wrangler.toml:108`: "without it both stay queued") | BUILD-PENDING (other, until 2026-11-07). prod yom-cron lacks RESEND_API_KEY |
| C50 | Client portals on your own domain on PAYG | agencies, product, faq, llms | `api/src/routes/v2/portals.ts:74-75,277` need `CF_SAAS_ZONE_ID` + `PORTAL_CNAME_TARGET`; neither is a prod var or secret | BUILD-PENDING (other, until 2026-11-07). CF_SAAS_ZONE_ID / PORTAL_CNAME_TARGET unset on yom-api |
| C51 | White-label client portals with read-only client logins limited to chosen reports | home, product, agencies, faq, llms | `api/src/routes/v2/portals.ts` (client_viewer, per-portal reports); dashboard `/portal/*` | VERIFIED-IN-PROD |
| C52 | <yom-report> web component with embed tokens, around 9 KB gzipped | platforms, product, developers, faq, llms | YOM main 662eb04 (PR #60, released 2026-10-26): served by YOM itself at https://yom.aapastech.com/app/cdn/embed/latest/yom-report.iife.js (and /0.2.0/), 200 application/javascript, 24,765 B raw / 9,210 B gzip, registers the custom element; `docs/embed.md:119-124`; dashboard snippet `packages/dashboard/src/modules/docs/DocsPage.tsx:56` | VERIFIED-IN-PROD (the npm package is tracked separately as C97) |
| C53 | Sub-tenants open (created on first event, zero setup) or registered; bound principals forced; another → 403 | home, product, agencies, platforms, faq, llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): new projects start with sub-tenants `open` (`shared/src/analytics/config.ts:121-123` NEW_PROJECT_CONFIG_DEFAULTS), so a new id becomes a partition on its first event with zero setup; projects created before 2026-10-26 keep their stored mode (legacy default off); bound principals forced, other sub-tenant 403 (C94) | VERIFIED-IN-PROD (new projects; older projects switch sub-tenants on in settings) |
| C54 | Usage by sub-tenant for re-billing | home, product, agencies, platforms, faq, llms | `reports.ts:379` `/reports/usage` | VERIFIED-IN-PROD |
| C55 | Embed tokens: short-lived (≤24 h), report and origin allow-lists | agencies, platforms, faq, dpa | `crypto.ts:139`; `manage.ts:1058-1067`; `principal.ts:235` | VERIFIED-IN-PROD (v2 tokens; an empty origin list allows any origin) v1 embed-token expiry owned by yom-build-team (coordinator 2026-10-24). PR #58 adds v1 embed-token expiry (30 days default, existing tokens 90 days). |
| C56 | Custom dimensions: map plan/region/cohort into reportable dimensions and metrics | platforms | `config.ts:263-293` (4 dimension, 12 metric slots) | VERIFIED-IN-PROD |
| C57 | Partner API: management keys create and suspend projects and mint keys; can't call the report API | product, platforms, developers, llms | `api/src/routes/v2/projects.ts:401,500,542,558,604,796`; `principal.ts:131` | VERIFIED-IN-PROD |
| C58 | Management keys "can never read analytics data" | platforms, llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): a management key itself never gets the read scope (`principal.ts`), and it can mint a read-scoped key only with the explicit, off-by-default `analytics:delegate` scope (`api/src/routes/v2/key-mint.ts:35-42`, `shared/src/analytics/management-keys.ts:22-30`) | VERIFIED-IN-PROD |
| C59 | MCP server: 13 read-only tools, Streamable HTTP, Bearer read-scoped key or short-lived embed token; publishable keys refused | product, why-yom, developers, faq, llms | `mcp/src/tools.ts` (13 READ_ONLY); live `https://mcp.yourownmetrics.aapastech.com/mcp` → 401 `Bearer realm="yom-mcp"`, pk refused | VERIFIED-IN-PROD |
| C60 | Report API with read-scoped keys | product, faq | `reports.ts:241` `requireScope('read')` | VERIFIED-IN-PROD |
| C61 | GA4 gtag shim in the SDK; GA4 BigQuery daily-totals import API with a script you run | product, developers, llms | SDK `src/gtag-shim.ts` (export `./gtag-shim`); `api/src/routes/v2/imports.ts:46`; `scripts/ga4-import/` | VERIFIED-IN-PROD |
| C62 | Looker Studio community connector, early access, self-deployed from the repo | product, developers, home, llms | `integrations/looker-studio/` (clasp deploy README), not in gallery | VERIFIED-IN-PROD (as early access) |
| C63 | WooCommerce plugin, early access, not on wordpress.org; we install it with you | product, ecommerce, faq, developers, home, llms | `integrations/woocommerce/yom-analytics` (zip via `npm run zip`) | VERIFIED-IN-PROD (as early access) |
| C64 | Shopify app in early access (we set it up with you) | ecommerce, product, faq, developers, home, llms | `integrations/shopify/shopify.app.toml:3` `client_id = "<shopify app client id>"`; `shopify.yourownmetrics.aapastech.com` does not resolve; no deploy job | BUILD-PENDING (other, until 2026-11-07). client_id placeholder, app host unresolved; needs the Shopify Partner app |
| C65 | Google Ads Enhanced Conversions not built | home, product, faq, developers, ecommerce, llms | `shared/.../adplatforms/google-ads.ts:2` "config schema ONLY"; create → 400 | VERIFIED-IN-PROD (as Coming soon) |
| C66 | No session replay, feature flags or experiments | home, compare, faq, llms | no such code on main | VERIFIED-IN-PROD |
| C67 | Sign-in: email + password, Google sign-in, optional TOTP multi-factor authentication (two-step verification) for your team | product, faq, security, regulated, llms | origin/main ca16b0f (PR #58, released 2026-10-26): `api/src/routes/auth.ts:443` (Google → MFA challenge), `api/src/services/credentials.ts:54`, `api/src/routes/mfa.ts:426`, `dashboard/src/modules/auth/MfaChallengeForm.tsx:16`, `LoginPage.tsx:28`, `dashboard/src/modules/team/SecurityPage.tsx:301`, `api/src/services/membership.ts:30`. Prod 2026-10-26: POST /v1/auth/mfa/verify bogus token → 401 INVALID_CHALLENGE; dashboard bundle index-D25acxf0.js has "Two-step verification", "Use a recovery code instead", "Require two-step verification for every member". Client portals have no MFA (not claimed) | VERIFIED-IN-PROD |
| C68 | Audit logs (readable on pay-as-you-go) | pricing, security, regulated, llms | origin/main ca16b0f: `api/src/routes/v2/team.ts:382`, `shared/src/constants/org-roles.ts:81` (PAYG read gate), `:67` (retention free 90 / paid 730 days), `cron/src/jobs/audit-retention.ts:15`, `api/src/services/audit-trail.ts:34`, `dashboard/src/modules/team/AuditLogPage.tsx:69`. Prod: GET /v2/orgs/current/audit-logs → 401 (route live); bundle has "Export CSV". Free 402 covered by staging QA 115/115 | VERIFIED-IN-PROD |
| C69 | Team members: Free 1, pay-as-you-go unlimited; invite by email; clients do not cost extra seats | pricing, why-yom, agencies, llms | origin/main ca16b0f: `api/src/routes/v2/team.ts:353`, `api/src/services/team.ts:264,298` (Free limit 1), `shared/src/constants/org-roles.ts:58`, `api/src/routes/invite-auth.ts:88`, `dashboard/src/modules/team/TeamPage.tsx:74`. Prod: GET /v2/orgs/current/members → 401 (route live); bundle has "Send invite"; /accept-invite renders. Sent invite covered by staging QA | VERIFIED-IN-PROD |
| C70 | Per-key v2 API rate limits 120/min Free, 1,200/min PAYG | security | origin/main ca16b0f: signed-in v1 requests use the plan limit (`api/src/middleware/rate-limit.ts:158-176`, same RL_V2_FREE 120 / RL_V2_PAID 1,200 buckets as /v2); RL_V1 300/min per IP applies only to anonymous requests (sign-in, webhooks) | VERIFIED-IN-PROD |
| C71 | Publishable `yom_pk_…` and secret `yom_sk_…` keys with scopes (prod format `yom_pk_live_…`) | security, developers | `shared/src/utils/index.ts:21`; `key-mint.ts:71` | VERIFIED-IN-PROD |
| C72 | Passwords stored as bcrypt hashes; API keys hashed; destination credentials AES-GCM; webhook secrets shown once, encrypted | security, dpa | origin/main ca16b0f: bcrypt + rehash on sign-in `shared/src/utils/index.ts:205`, legacy SHA-256 accepted until `:202` 2027-01-31 (approved), `api/src/services/credentials.ts:30`, `api/src/routes/auth.ts:234`; API keys hashed; AES-GCM `crypto.ts:98-110`; whsec once `manage.ts:548,580` | VERIFIED-IN-PROD (legacy hashes rehash on next sign-in, rejected from 2027-01-31) |
| C73 | Runs on Cloudflare Workers with D1, KV, R2 and Queues | product, security | `api/wrangler.toml`, `cron/wrangler.toml` bindings | VERIFIED-IN-PROD |
| C74 | "First-party collection" / "first-party edge ingest" (collection on your domain) | llms | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): first-party collection through your own domain via a documented reverse proxy (`docs/first-party.md`; Cloudflare Worker / Nginx / Vercel recipes); the published SDK 0.3.1 takes `ingestUrl`, the script tag `data-endpoint` (CDN build). The self-serve custom collection hostname (`api/src/routes/v2/collection-domain.ts`) is built but off behind COLLECTION_DOMAINS_ENABLED until the user enables Cloudflare for SaaS; the site does not claim self-serve hostnames | VERIFIED-IN-PROD (reverse proxy; self-serve hostname not claimed) |
| C75 | "First-party" means first-party data: you collect it for your own use, no third-party pixels or cookies. It does not mean collection runs on the customer's domain | home, faq, product, JSON-LD, llms | See C74 and C17: first-party data (no third-party pixels or cookies) and first-party collection via your own domain through the documented reverse proxy | VERIFIED-IN-PROD |
| C76 | Not available today: third-party attestations, BAAs, data-location commitments, customer IdP SSO, public status page / SLA | security, regulated | none of these exist in code or ops | VERIFIED-IN-PROD (as "Not yet") |
| C77 | Browser storage keys: `yom_visitor_<id>`, `yom_session_<id>`, `yom_consent_<id>`, `yom_fp` (opt-in cross-site), dashboard `yom_token` (24 h), `yom_user`, `yom_tenant`, `yom_selected_project`, `yom_portal_session` (12 h); SDK sets no cookies | cookies | SDK `core/client.ts:35-58`, `fingerprint.ts:13`; dashboard `authSlice.ts:56-66`, `portalSessionSlice.ts:11` | VERIFIED-IN-PROD |
| C78 | Website sets no cookies | cookies (meta) | live `curl -I` on /, /pricing, /developers: no Set-Cookie | VERIFIED-IN-PROD (Cloudflare may add `__cf_bm` on bot challenges; the page body says so) |
| C79 | Sub-processors: Cloudflare, Stripe, Razorpay, Resend, Google, Slack (plus Tyashin hosting vendors for the website) | subprocessors | code calls exactly these; MongoDB Atlas / SendGrid are Tyashin-side | VERIFIED-IN-PROD (jsDelivr gap closed 2026-10-26: the dashboard snippet now loads the embed from yom.aapastech.com/app/cdn, DocsPage.tsx:56; no third-party CDN) |
| C80 | Customer data deleted within 180 days after termination | terms §17, dpa §13 | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): org closure/termination → 30-day grace → automated purge of every store with a deletion certificate (`shared/src/analytics/lifecycle/`, `cron/src/jobs/lifecycle.ts` runDeletions every 5 min, alert if open at 120 days); `GET /v1/tenants/:id/deletion` (prod 401 without auth); docs/data-lifecycle.md §2 | VERIFIED-IN-PROD |
| C81 | Data-subject requests handled mainly through the Service's own controls | dpa §9 | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): data-subject access (NDJSON export) and erasure by visitor id, user id or email hash via `/v2/projects/:id/privacy/*` (`api/src/routes/v2/privacy-subjects.ts`) and the dashboard Privacy requests screen; AE rows suppressed by tombstone until they expire; prod route 401 without auth; docs/data-lifecycle.md §3 | VERIFIED-IN-PROD |
| C82 | Backups expire on their own cycle | privacy §9, dpa §13 | `cron/src/jobs/backup.ts:13` hard-codes the STAGING platform DB id; prod platform DB relies on D1 Time Travel | BUILD-PENDING (other, until 2026-11-07). backup job dumps the STAGING DB; legal-risk item sent to coordinator 2026-10-26: backup fix released in 662eb04 (PR #56); stays pending until the first prod run writes R2 backups/d1/_last-run.json (coordinator checks). |
| C83 | MFA settings and recovery codes (stored hashed) | privacy §4 | origin/main ca16b0f: recovery codes hashed; TOTP secret sealed with SECRET_ENC_KEY `api/src/services/credentials.ts:87` (bulk re-seal `:130`, post-deploy hook `api/src/routes/internal.ts:116`), `api/src/routes/mfa.ts:108` | VERIFIED-IN-PROD |
| C84 | 32.5% of US internet users block ads (Q2 2025) | home, why-yom, ecommerce | Backlinko (GWI) `src/lib/sources.ts` adBlock | EXTERNAL-SOURCE |
| C85 | 20 US states with comprehensive privacy laws by 2026 | home, why-yom | MultiState `sources.ts` stateLaws | EXTERNAL-SOURCE |
| C86 | Healthline $1.55M; Tractor Supply $1.35M; Honda $632,500; Todd Snyder $345,178; GPC sweep Sept 2025 | home, why-yom | Hunton, White & Case, CPPA, TrustArc, CA OAG in `sources.ts` | EXTERNAL-SOURCE |
| C87 | GA4 thresholds, consent-mode modeling thresholds, 2/14/50-month retention, 1M/day BigQuery export cap, Looker quota errors | compare, why-yom, agencies, ecommerce | Google Analytics Help, Momentic, Databloo in `sources.ts` | EXTERNAL-SOURCE |
| C88 | Mixpanel, Amplitude, Segment, RudderStack, AgencyAnalytics prices | compare, why-yom, agencies, platforms | vendor pages / Hardal in `sources.ts` (verified 21 Oct 2026) | EXTERNAL-SOURCE |
| C89 | Safari caps cookies set by scripts (document.cookie) at a 7-day expiry (ITP 2.1; was misquoted as "script-writable storage… without user interaction", fixed 2026-10-24); sGTM subdomain blocking; Chrome kept 3P cookies | why-yom, ecommerce | WebKit, PPC Land, The Register in `sources.ts` | EXTERNAL-SOURCE |
| C90 | Luzmo 78% / 3.6 of 5; Adobe +693% AI traffic (eCommerceNews, Adobe data; was mis-cited to Practical Ecommerce, fixed 2026-10-24); ChatGPT under 0.2% of ecommerce traffic (Practical Ecommerce); GA4 AI Assistant channel May 2026, AI visits still land in Direct/Unassigned (Clickport); GA4 MCP server July 2025 | why-yom, platforms | Luzmo, Practical Ecommerce, PPC Land, Clickport in `sources.ts` | EXTERNAL-SOURCE |
| C91 | Kaiser $47.5M; CIPA §631 after SB 690 signed 30 September 2026; Quebec Law 25 opt-in | regulated | BankInfoSecurity, Crowell (page states "September 30, 2026", checked 2026-10-24), McCarthy Tétrault | EXTERNAL-SOURCE |
| C94 | Sub-tenants inside one project (turned on per project, open or registered); keys and embed tokens bound to one sub-tenant only read it; asking for another returns 403 | blog (agencies), product, agencies, platforms, faq | `shared/src/analytics/config.ts:68` (off\|open\|registered); 403s `api/src/routes/v2/reports.ts:106`, `manage.ts:444,1051`, `errors.ts:48`, `proof.ts:70`; e2e/staging bound-key checks | VERIFIED-IN-PROD (split from C53 on 2026-10-24; C53 keeps the pending "created on first event, zero setup" wording) |
| C95 | With the current SDK and v2 collection: until analytics consent is granted the SDK keeps no persistent id and writes nothing to browser storage, and the server drops any visitor id the browser sends; conversions are still counted, without an id | blog (Law 25), product, faq, developers | SDK `core/client.ts:509-551,590`; `shared/src/analytics/normalize.ts:545-552` (browser events: id forced empty unless granted); exact counting C13 is independent of consent | VERIFIED-IN-PROD (split from C17 on 2026-10-24; C17 stays pending only because the legacy v1 endpoints ignore consent) |
| C96 | Free "at most 20,000 events a day" | pricing, llms (until 2026-10-26) | daily cap removed in PR #55 (absoluteDailyLimit null) | NOT-TRUE. Copy removed 2026-10-26 |
| C97 | <yom-report> from the npm package @yourownmetric/embed | developers, llms, security/disclosure (package named) | npm @yourownmetric/embed latest is 0.1.0 (Feb 2026), which has no yom-report build; the element itself is served from YOM's host (C52) | BUILD-PENDING (other, until 2026-11-07). Publish @yourownmetric/embed 0.2.0 with dist/yom-report.iife.js |
| C98 | Billing and tax records (invoices, payments, subscription records) kept 8 years after account closure, then deleted automatically | privacy §9 | YOM main 75fa6b2 (PRs #57 #61 #62, released 2026-10-26): `purgeBillingRecords` deletes payment events, invoices, subscriptions and usage reports, then the org row, 8 years after the closure request (`cron/src/jobs/lifecycle.ts:14`, daily `runDailyLifecycle` `cron/src/index.ts:133`); docs/data-lifecycle.md §5 | VERIFIED-IN-PROD |
| C93 | Retention "90 days on Free, 365 days on pay-as-you-go" | product, pricing, faq, compare, llms | v2 retention is 180 / 395 default (C08); 90/365 only in the legacy D1 cron | NOT-TRUE. Copy changed |
| C92 | Company: YOM built by Aapastech; 14818032 Canada Inc., Burlington, Ontario; contact@aapastech.com; +1 437 800 0190 | all (footer, about, contact, JSON-LD) | business facts from the user, `src/config/site.ts` | EXTERNAL-SOURCE |

## Keyword gate

`npm run claims:check` scans `src/` (comments stripped) for each regex and checks the rows it maps to. Lines are matched case-insensitively. In regexes, `\|` is an escaped pipe (alternation).

| Keyword (regex) | Rows |
|---|---|
| `100,000 events\|100K events\|first 100,000` | C02 C03 |
| `20,000 (a\|in one) day` | C96 |
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
| `@yourownmetric/embed` | C97 |
| `8 years after the account` | C98 |
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

## Build owners

| Owner | Session | Rows |
|---|---|---|
| billing | yom-build-billing (local_494e7aa6) | C04 (blocked on Stripe live keys) |
| team | yom-build-team (local_2517071e) | (all verified 2026-10-26) |
| sdk | yom-build-firstparty (local_e654c5fc) | C18 C22 C26 (need YOM PR #53 merged + npm @yourownmetric/sdk republished) |
| lifecycle | data-lifecycle agent (PR #61) | (all verified 2026-10-26) |
| other | coordinator (local_e5cb927e) | C48 C49 C50 C64 C82 C97 |

When a build is verified in prod, change the row to VERIFIED-IN-PROD with the new evidence. If the date passes first, `claims:check` and `npm test` fail: ship the build, or change the copy, or (with a reason in the row) move the date once.

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
- [aapastech/yourownmetrics#53](https://github.com/aapastech/yourownmetrics/pull/53): SDK sends checkout, download and outbound-click URLs without query string or fragment. Part of C22 (the site-search term is still sent by design; the sdk build owns the rest).

## How to add or change a row

1. **Find the evidence in production.** Check out origin/main of `aapastech/yourownmetrics` in your own worktree and find the file:line that does it. Code on develop or a branch doesn't count. If it depends on a secret, var, cron, publish or store listing, check that too (`wrangler secret list --name <worker>` with the YOM account login, `npm view`, a curl of the public endpoint).
2. **Add a row** to the Claims table with the next free ID. Quote the claim as the page says it, list the pages, cite the evidence, set the status. Don't reuse or renumber IDs.
3. **Add a keyword** to the Keyword gate if the claim names a capability another page could repeat. Map it to every row it can stand for, and make the regex narrow enough not to fire on unrelated text.
4. **Not served yet but being built?** Status `BUILD-PENDING (<owner>, until <date ≤ 14 days out>)` plus a short note of what is missing.
5. **Run `npm run claims:check`** (and `npm run claims:check -- --live` after deploy). A failure names the file:line and the row that blocks it. Fix the copy, or verify the claim and update the row. Never flip a status without new evidence.
6. **When a feature ships,** re-verify, change SHIPPED-NOT-DEPLOYED to VERIFIED-IN-PROD, then remove the Coming soon label from the copy, in that order.
7. **Blog drafts** go through docs/BLOG-FACTCHECK.md. `npm run claims:check -- --file draft.md` runs the same gate on a draft.
