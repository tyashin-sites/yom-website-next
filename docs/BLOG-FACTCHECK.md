# Blog fact-check gate

Every YOM blog draft passes this checklist before it is published. The rule behind it (user, 2026-10-24): whatever the website and blogs claim must be justified and served by the YOM platform.

The checker records the result in the draft's review note: draft title, date, checker, and one line per item below (pass, or what was changed).

## 1. YOM capability statements → a VERIFIED ledger row

- [ ] Mark every sentence that says what YOM does, has, costs, stores, blocks, counts or supports. Feature lists, comparisons, captions and image alt text count too.
- [ ] Each one maps to a row in [CLAIMS-LEDGER.md](CLAIMS-LEDGER.md) with status **VERIFIED-IN-PROD**. Write the row id next to the sentence in the review note (e.g. "C29").
- [ ] A **BUILD-PENDING** or **SHIPPED-NOT-DEPLOYED** row may appear only as "coming soon". A post is permanent and the build may slip, so it never states these as available today. It also stays out of the title, excerpt, meta description and CTA.
- [ ] A **PARTIAL** or **NOT-TRUE** row, or no row at all: cut the sentence or rewrite it to what the row says is true. If the claim matters to the post, verify it in production first (ledger "How to add a row"), then cite the new row.
- [ ] Numbers about YOM (prices, retention, limits, sizes, counts of tools or assistants) match the ledger exactly. Use "at most 20,000 events a day on Free", "180 days on Free", "395 days by default on pay-as-you-go". Don't round or upgrade them.
- [ ] Run the gate on the draft as markdown or html: `npm run claims:check -- --file path/to/draft.md`. It must print "every gated capability…". It can't catch claims outside its keyword list, so the manual pass above still applies.

### Traps for the 12 launch topics (docs/BLOG.md)

| Topic | Don't write | Write |
|---|---|---|
| 2 GA4 vs Shopify revenue | "Install the YOM Shopify app" | The Shopify app is coming soon. Today: send orders from your backend to /v2/events with the order id as the event id, then run the reconciliation report (C16, C29, C64) |
| 3, 4 GPC / opt-out fines | "YOM makes you compliant", "query strings never leave the browser" | YOM treats GPC and DNT as denied and enforces it on the server (C19, C17); pages are recorded by path (C21). Compliance is the reader's counsel's call |
| 5 Meta CAPI | "on every plan" | Pay-as-you-go only, marketing consent and no GPC required, suppressions logged (C11, C25) |
| 6 Ad blockers | "first-party domain", "CNAME", "can't be blocked" | Browser collection can be blocked; server events to /v2/events can't be seen by filter lists (C29). No custom ingest domain yet (C74) |
| 7 AI traffic | "AI-crawler dashboard" | 12 assistants get their own channel (C35); the AI-crawler report is in the API and MCP server, last 88 days (C36) |
| 8 Looker Studio | "Looker Studio connector in the gallery" | Early access, deployed from our repository (C62) |
| 9 Agencies | "unlimited seats", "audit logs", "portals on your domain", "scheduled client reports" | Sub-tenants, scoped keys and embed tokens, usage by sub-tenant, portals with read-only client logins (C53 to C55, C51). Own domain and scheduled reports are coming soon (C50, C49) |
| 12 GA4 alternatives | "everything is exact", "raw archive export", "warehouse sync" | Only the five conversion events are exact (C13, C15); export is the last 88 days over the API (C42); warehouse exports are coming soon (C48) |

## 2. Third-party facts → a cited source

- [ ] Every statistic, fine, law, date, vendor price or competitor capability links to its source URL inline or in a Sources list at the end.
- [ ] Prefer the URLs already verified in `yourownmetrics-research/YOM-POSITIONING-RESEARCH.md` (and `src/lib/sources.ts`, which the site cites). A figure that isn't in either needs a primary source (regulator, court, vendor's own page, the study itself) opened during the check. A blog's or aggregator's summary isn't enough.
- [ ] The number, date and wording match the source. "Up to", "estimated", "vendor survey" and "third-party estimate" qualifiers stay.
- [ ] Competitor prices carry "as published on <date>". Don't add a competitor capability we couldn't verify.
- [ ] Legal topics (3, 4, 10, 11) say plainly that the post is not legal advice, and don't predict outcomes.

## 3. Nothing invented

- [ ] No customers, logos, quotes, testimonials, case studies or results. YOM has no published customer stories yet.
- [ ] No invented numbers: no "teams see 30% more conversions", no made-up benchmarks, no uptime or response-time promises (YOM has no SLA or status page, C76).
- [ ] No certifications or compliance badges (C76: no third-party attestations, no BAAs, no data-location commitment).
- [ ] Examples and sample data are labelled as illustrations ("sample orders, not customer data").
- [ ] No people's names except cited public sources. No Aapastech staff names.

## 4. Code in the post runs

- [ ] Code samples are copied from /developers (they are type-checked against the published SDK and the curl was run against staging), or are run before publish against the staging fixture (`yom-wt-qa-staging/e2e/staging/.env.qa`).
- [ ] A browser purchase and a server purchase for the same order use the same id (the order / transaction id). Otherwise the order counts twice.
- [ ] SDK version matches npm (`npm view @yourownmetric/sdk version`).

## 5. Humanizer and house style

- [ ] Run the humanizer skill (`humanizer:humanizer`) on the prose. Landing-page / blog strength: no significance inflation, no promotional words, no "not just X, it's Y", no generic closer, no signposting.
- [ ] No em or en dashes in visitor-facing text (the site's dash guard). Use commas, colons, parentheses or full stops.
- [ ] Plain claims with numbers beat adjectives. Keep sentences short; one idea per paragraph.
- [ ] Title, excerpt and meta description pass the same checks as the body. They are the parts most likely to overclaim.

## 6. Sign-off

- [ ] Review note filled in (section 1 row ids, section 2 source URLs, changes made).
- [ ] Draft edited in Tyashin (Blog plugin) and left as a draft for the coordinator to publish.
- [ ] If a claim needed a new ledger row, commit the ledger change before the post goes live.
