# YOM blog (native, on the Tyashin Blog plugin)

Written 2026-10-24. Code: `src/lib/blog.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`,
`src/components/blog/*`.

## How it works

| Piece | Behaviour |
|---|---|
| Posts | Written in Tyashin (Blog plugin, Editorial Desk). The site reads them at request time from the public Blog API (`TYASHIN_API_URL` + the `TYASHIN_API_KEY` worker secret, which also gives categories). Without the key it falls back to the keyless same-origin data API `/_tyashin/blog/posts` on the slug host (no categories). |
| Gate | `/_tyashin/blog/meta` → `{ active, hasPosts }`. `active` is false until the Blog plugin is installed and enabled. |
| Caching | Every blog fetch has a 5-minute data-cache TTL; the platform API is edge-cached too (list 300 s, post 600 s). The two blog routes render per request (`force-dynamic`), not through page ISR: this site's OpenNext config has no revalidation queue, so an ISR page would never refresh. Marketing pages stay fully static. |
| Dormant | Plugin off or no posts: `/blog` is a 200 page saying nothing is published, `noindex, follow`, with links to /why-yom and /compare. `/blog/<slug>` is a 404. |
| Index | Featured first post, then ledger rows (date, category, read time, title, excerpt). Category chips when 2+ categories exist (`/blog?category=<slug>`, noindex, a filtered view of /blog). Real `<a href="/blog?page=N">` pagination (`rel` prev/next, self canonical); `LoadMore` appends the next page in place on click or scroll and falls back to the link. |
| Post | Breadcrumb, category, h1, excerpt, date/author/read time, featured image only if the body doesn't already contain it, sanitised body (scripts, iframes, handlers and `javascript:` URLs stripped; body `<h1>` demoted), tags, "Keep reading" (3 posts ranked by shared tags, then recency), back link, CTA band. |
| SEO | Per-post `generateMetadata` (metaTitle unless it is a truncated prefix of the title; WordPress `[…]` excerpts ignored), OG `article` with published/modified time, absolute OG image. One `@graph` with `BlogPosting` (`#article`, publisher → Organization, author → Person or the org), `BreadcrumbList`; the index has `CollectionPage` + `ItemList`. RSS: `/blog/rss.xml` is platform-served (next.config rewrite for direct Worker access) and linked with `rel=alternate`. |
| Sitemap | `/blog` is in `getSiteRoutes()` but `/sitemap-pages.xml` lists it only once a build has seen a published post. Posts are in the platform's `/sitemap-content.xml` (addendum §3g). |
| Nav | "Blog" is added to the header (desktop + mobile) and the footer Company column, and to llms.txt, **only when the build saw `hasPosts: true`** (`getBlogStatusAtBuild`). Static pages carry no runtime fetch. **After the first posts are published, redeploy** (re-run the Tyashin deploy workflow or push to main) so the links appear. |
| Router | `/blog` and `/blog/*` are not dashboard paths (`tests/router-paths.test.ts` asserts it); the YOM router sends them to the website. |

## Platform steps for the coordinator (project `6adbd5375e7468a761ffbd3c`)

Nothing below was done by the build session.

1. **Install and enable the Blog / CMS plugin** (`pluginId: "blog"`): admin UI → project → Plugins → Blog / CMS, or
   `POST /api/v1/plugins/projects/6adbd5375e7468a761ffbd3c` with `{"pluginId":"blog"}`. On the Free plugin plan, generated posts are saved as **drafts** (auto-publish needs a paid plan), which suits a reviewed launch batch.
2. **Switch page ownership to the site** (this step is required). The platform's `blog-index` and `blog-post` pages default to `tyashin` and currently answer `/blog` with a plain-text 404 even though the plugin is off (verified on yom.aapastech.com 2026-10-24). Admin UI → project → Page ownership → Blog and Blog Post → **storefront**, or
   `PATCH /api/v1/projects/6adbd5375e7468a761ffbd3c/tyashin-pages` with `{"updates":{"blog-index":"storefront","blog-post":"storefront"}}`.
   Leave `blog-rss` and `blog-data` on Tyashin (`blog-data` is locked).
3. **Check the worker has `TYASHIN_API_KEY`.** It is the same secret the contact form uses (set through /adopt envSecrets). Without it the blog still works through `/_tyashin/blog/*`, but categories disappear.
4. **Editorial Desk settings for YOM:** set the brand voice, audience (US/Canada growth, analytics and privacy leads) and author name. Turn auto-mode **off** or **auto-draft**, and keep the humanizer gate on.
5. **Generate the launch posts only after the user approves the estimate below.** Review the drafts against the site's facts rules: claims must match /product, and every figure needs a source. Then publish them.
6. **Redeploy the site** once the posts are live, so the header, footer, sitemap and llms.txt pick up the blog. Then request indexing for `/blog` in GSC.
7. Optional: create 3–4 categories (e.g. *GA4 & measurement*, *Consent & privacy law*, *Agencies*, *AI traffic*). Chips appear when 2 or more categories exist.

Verify after steps 1–2: `curl -s https://yom.aapastech.com/_tyashin/blog/meta` → `{"active":true,...}`, and
`/blog` returns the site's HTML (it has `<meta name="robots" content="noindex` until a post is published).

## Launch topics (12, North American buyers)

Sources: `yourownmetrics-research/YOM-POSITIONING-RESEARCH.md` §2 and §4. Keywords are targets; search volumes are **not verified** (there's no keyword-tool access in this session).

| # | Working title | Target keyword | Intent | ICP |
|---|---|---|---|---|
| 1 | Why GA4 hides rows: data thresholds, and what to do about small segments | ga4 data thresholding | Informational, problem-aware | DTC, agencies |
| 2 | GA4 revenue doesn't match Shopify: a reconciliation checklist | ga4 revenue not matching shopify | Problem-aware | DTC |
| 3 | Global Privacy Control in 2026: what your analytics must do when a browser sends it | global privacy control compliance | Informational | Regulated, marketing ops |
| 4 | Healthline, Tractor Supply, Honda: what the 2025 opt-out fines say about your tags | ccpa opt-out enforcement | Informational, commercial | Regulated, DTC |
| 5 | Meta Conversions API without leaking opt-outs: consent-gated server events | meta conversions api consent | Solution-aware | DTC |
| 6 | Ad blockers, Safari and server-side tracking: what still gets through in 2026 | server side tracking ad blockers | Informational | DTC, developers |
| 7 | ChatGPT traffic shows up as Direct in GA4. How to measure AI assistant referrals | chatgpt traffic google analytics | Informational | DTC, SaaS, agencies |
| 8 | Looker Studio quota errors on GA4: client reporting that doesn't break | looker studio quota exceeded ga4 | Problem-aware | Agencies |
| 9 | White-label analytics for agencies: one login, a fenced view per client | white label analytics for agencies | Commercial investigation | Agencies |
| 10 | CIPA after SB 690: which website-tracking claims remain in 2027 | sb 690 cipa | Informational | Regulated, legal |
| 11 | Quebec Law 25 and analytics cookies: what opt-in means for your numbers | law 25 cookies analytics | Informational | Canadian brands |
| 12 | GA4 alternatives for teams that need exact conversion counts | ga4 alternative | Commercial investigation (BOFU) | All |

Reserves: consent-mode modelling thresholds for small sites (`ga4 consent mode modeling`); embedded customer-facing analytics for SaaS (`embedded analytics saas`).

Writing rules for these posts: the site's facts rules apply. Product claims must match /product, which lists what ships today. Early-access and Coming-soon labels stay as they are, and a legal topic is information, not legal advice. The humanizer gate stays on.

## Cost estimate: 12 posts with the Editorial Desk (needs approval, nothing generated)

The pipeline per post is: one Tavily basic search → a Claude brief, write, judge and revise (`claude-sonnet-5`) → two images (`gpt-image-2`). The unit costs are **measured** from the Tyashin cost ledger on 2026-09-16 (tyashin.com pilot, 1,134-word post), not list prices.

| Line | Per post | 12 posts | Basis |
|---|---|---|---|
| Research (Tavily, 1 basic search) | ~$0.01 | ~$0.10 | 1 credit per search |
| Text (brief + write + revise, judge if it fires) | $0.08 to $0.15 | $0.96 to $1.80 | $0.081 measured at 1,134 words; YOM posts run longer and more technical |
| Images (2 per post, gpt-image-2) | $0.08 to $0.24 | $0.95 to $2.82 | $0.079 (both medium) to $0.235 (one high) measured; depends on the layout drawn |
| **Total** | **$0.17 to $0.40** | **$2.01 to $4.72** | |
| With a 20% buffer for retries | | **cap: $5.70** | |

- **Text only** (no AI images): $1.06 to $1.90, cap $2.30.
- **Conflict to decide:** DESIGN-SPEC §7 says the YOM site uses no AI-generated images. The Desk generates two per post, and I found no per-project switch to turn them off on tyashin-platform `origin/main`. Either approve the image line as a blog exception, or ask for a platform change to skip images. The site handles image-less posts well: the featured slot falls back to an ink date panel.
- **Prerequisites:** the Anthropic and OpenAI credits on the Tyashin account must be funded. The Desk errors out when credits are at zero, as happened in October 2026.
- **Re-measure before spending:** these are September ledger numbers. Check `/admin/costs/all-sources` after the first post and stop if one post exceeds $0.50.
