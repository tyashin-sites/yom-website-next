# YOM website: asset debt

Living table of every placeholder or unconfirmed input. Only a real asset or a confirmed fact
clears a row. "Blocks" names the phase or launch step it gates.

| # | Item | Current state | What clears it | Blocks |
|---|---|---|---|---|
| 1 | Tyashin project id | Placeholder `PROJECT_ID` env (empty) in `src/config/site.ts` | Parent creates project `yom-website`, sets `PROJECT_ID` build env | Deploy |
| 2 | Production domain / `SITE_URL` | Defaults to `https://yom-website.sites.tyashin.com` | Decide the canonical marketing domain; set `SITE_URL` at build | Cutover, canonical, sitemap |
| 3 | Contact form → Contact Form & Lead Capture plugin | `/api/contact` validates, logs `LEAD:` and forwards to `/api/v1/contact/public/submit` only when `TYASHIN_API_KEY` exists | Install + enable the plugin on the project; confirm the inbox/Slack destination | Launch |
| 4 | Privacy policy | Draft at `/privacy`, marked "Draft, pending legal review" | Counsel-approved text (PIPEDA, Quebec Law 25, US state laws, subprocessors) | Launch |
| 5 | Terms of service | Draft at `/terms`, marked "Draft, pending legal review" | Counsel-approved terms (governing law, liability, DPA reference) | Launch |
| 6 | Company street address | Not shown anywhere (none exists). City/province only: Burlington, Ontario | A registered mailing address if one is created | Schema `PostalAddress` (city/region only today) |
| 7 | Social profiles (`sameAs`) | Empty: none supplied | Real YOM/Aapastech profile URLs | Knowledge graph richness |
| 8 | Customer logos, testimonials, case studies | None shown, by rule | Signed, real customer permission | Social-proof sections (hidden until then) |
| 9 | OG image | Generated from the wordmark + thesis (`public/og/default.png`, script `scripts/generate-og.mjs`) | Optional designed OG per page | — |
| 10 | Compare-page competitor facts | Cited from YOM-POSITIONING-RESEARCH.md, last verified 2026-10-21; several are 3rd-party estimates (marked) | Re-verify each footnote before every major campaign; update `LAST_VERIFIED` in `src/lib/sources.ts` | Ongoing |
| 11 | SDK CDN script tag | `cdn.yourownmetrics.aapastech.com` did not resolve on 2026-10-21, so the site shows only the npm install (`@yourownmetric/sdk@0.2.0`, verified on npm) | CDN host live → add the `<script data-key>` snippet to /developers | Developers page completeness |
| 12 | Ingest host for docs | `https://ingest.yourownmetrics.aapastech.com` (SDK default; host answers) | Confirm it is the public, long-term ingest hostname (or a custom first-party domain flow) | Developers page |
| 13 | Blog | Not built and not linked (platform-owned) | Blog plugin with ≥1 published post; then add a site-native `/blog` per port skill §4a and nav links | Content SEO |
| 14 | SEO Co-Pilot plugin + `/llms.txt` ownership | Site ships its own `/llms.txt` route; the platform may intercept it once SEO Co-Pilot is installed | Install SEO Co-Pilot (needs a verified custom domain); reconcile which `/llms.txt` wins | SEO |
| 15 | Trust pack (SOC 2, DPA, subprocessors, residency statement) | Shown on /security as "Not yet available" / roadmap | Real documents | Regulated + enterprise sales |
| 16 | Status / uptime page | None claimed | A real status page URL | /security |
| 17 | Sign-up / login URLs | `https://yom.aapastech.com/register` and `/login` (both 200 on 2026-10-21) | — (verified) | — |
| 18 | Pricing in CAD | Mirrors `EVENT_TIERS.pricePerKCAD` in the YOM repo (14/8/4/2 cents per 1K) | Re-sync if `packages/shared/src/constants/index.ts` changes | Pricing |
| 19 | Retention numbers | Free 90 days / PAYG 365 days per the brief (`PLANS` in shared constants). Note: `ANALYTICS_ENTITLEMENTS` in YOM-PLATFORM-PLAN §9 lists different max values (180 / 1,825) | YOM team confirms which is customer-facing | Pricing, FAQ |
| 20 | Response-time promise on /contact | No SLA or reply-time claim is made | A real support commitment | — |
