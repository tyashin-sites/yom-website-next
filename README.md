# yom-website-next

Marketing site for **YOM (Your Own Metrics)**, a Tyashin-hosted Next.js 15 site (OpenNext on Cloudflare Workers).
Project slug `yom-website`, worker `site-yom-website`, preview host `yom-website.sites.tyashin.com`.

Read first: `docs/DESIGN-SPEC.md` (canonical), `docs/BRAND.md`, `docs/BUILD-PLAN.md`, `docs/ASSET-DEBT.md`,
`docs/audits/AUDIT-2026-10-22.md`.

## Commands

```bash
npm install
npm run dev            # local dev
npm test               # pricing calculator unit tests
npm run build          # next build (export ROBOTS_NOINDEX=true until cutover)
npm run og             # regenerate public/og/default.png + public/brand/mark-512.png (local Chrome)
npm run build:worker   # OpenNext build for Cloudflare
```

Verification against a prod build (`npx next start -p 3300`):

```bash
node scripts/check-routes.mjs        # ghost links, orphans, anchors, route-list coverage
node scripts/verify-browser.mjs      # screenshots + motion/calculator/form assertions
node scripts/lighthouse-sweep.mjs    # Lighthouse mobile, every route
```

Never build while a dev server is running on this folder (shared `.next`).

## Environment

| Var | When | Purpose |
|---|---|---|
| `SITE_URL` | build + runtime | Canonical origin (metadataBase, canonicals, sitemap, JSON-LD). Defaults to the slug host. |
| `PROJECT_ID` | build | Tyashin project id (exposed as `NEXT_PUBLIC_PROJECT_ID`). |
| `ROBOTS_NOINDEX` | build + runtime | `"true"` until cutover; prerendered pages bake it at build time. |
| `TYASHIN_API_KEY` | runtime secret | Lets `/api/contact` forward leads to the Contact Form & Lead Capture plugin. Set by the `/adopt` workflow. |
| `TYASHIN_API_URL` | runtime | Defaults to `https://website-api.tyashin.com`. |

`.github/workflows/deploy.yml` is intentionally absent — `/adopt` installs the canonical one.
