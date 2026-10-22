# YOM website: build plan

Gated phases. Each phase names the KPI it serves and the auditor lens that closes it. Evidence
lives in `docs/audits/`. Local build and verification only. Repo, Tyashin project and deploy
are created by the parent session.

| # | Phase | Deliverables | KPI | Exit gate (lens) |
|---|---|---|---|---|
| 0 | Guardrails | DESIGN-SPEC, BRAND, BUILD-PLAN, ASSET-DEBT committed before app code; facts list in `src/config/site.ts` | No invented facts | brand: every hard fact traces to the brief |
| 1 | Design system | Tokens (`html:root`), Tailwind v3 map, local fonts, type tiers, surfaces, buttons, focus ring, reduced-motion kill switch, Mark + wordmark | First screenshot has the feel | design |
| 2 | Core pages | All 19 routes from DESIGN-SPEC §9, footer covering every route, custom 404 | One intent per URL; zero orphans | qa + design |
| 3 | Pricing calculator | `src/lib/pricing.ts` (exact graduated math, USD/CAD, cents), unit tests (vitest), UI with breakdown | Calculator matches `calculateEventCost` in the YOM repo | qa |
| 4 | SEO / LLM surface | `src/lib/seo.ts` `pageMetadata` on every page, one `@graph` per page (`knowledge-graph.ts`), `/sitemap-pages.xml` from `site-routes.ts`, `/llms.txt`, OG image | 100% of pages have unique metadata and are in the route list | seo |
| 5 | Trust & compliance | Footnoted sources on /why-yom + /compare with last-verified date; honest /security; regulated page with legal-review language; forbidden-claims grep | Zero forbidden claims | brand + seo |
| 6 | Motion + signatures | Ledger scan, consent stream, fan-out draw; header condense; reveal | Perceptible, LCP-safe | design |
| 7 | Perf & hardening | `next build` green; Lighthouse mobile perf ≥ 90, a11y ≥ 95, CLS ≈ 0 on `next start`; screenshots desktop/mobile × light/dark | Budgets in DESIGN-SPEC §11 | qa |
| 8 | Full audit → handoff | Four lens verdicts GO; ASSET-DEBT current; handoff notes for the parent | All four GO | design / brand / seo / qa |

## Launch steps owned by the parent session (not done here)

1. Create the Tyashin project (slug `yom-website`) and the PUBLIC repo `tyashin-sites/yom-website-next`; push `main`.
2. `/adopt` with `overwriteWorkflow:true` (worker `site-yom-website`). Do not hand-write `deploy.yml`.
3. Set build-time env: `SITE_URL`, `PROJECT_ID`, `ROBOTS_NOINDEX` (keep `"true"` until cutover).
4. Install + configure the **Contact Form & Lead Capture** plugin (form posts through `/api/contact` → `/api/v1/contact/public/submit` with the project `TYASHIN_API_KEY`).
5. Install SEO Co-Pilot once a custom domain exists; set phone `+1 437 800 0190`.
6. Verify on `yom-website.sites.tyashin.com`, then flip `ROBOTS_NOINDEX` to `"false"` and rebuild.
7. Register the site in `CUSTOMERS.md` + `CUSTOMER_URLS` in `safe-deploy.sh`.
