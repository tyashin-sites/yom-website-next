# yom-website-next

Marketing site for **YOM (Your Own Metrics)**, a Tyashin-hosted Next.js 16 site (OpenNext on Cloudflare Workers).
Project slug `yom-website`, worker `site-yom-website`, preview host `yom-website.sites.tyashin.com`.
Production: **https://yom.aapastech.com**, shared with the YOM dashboard through a path router. The paths in
`src/config/router-paths.json` belong to the dashboard; this site must never own them (enforced by
`npm test` and `scripts/check-routes.mjs`). Sign-up / log-in links are relative (`/signup`, `/login`).

Read first: `docs/DESIGN-SPEC.md` (canonical), `docs/BRAND.md`, `docs/BUILD-PLAN.md`, `docs/ASSET-DEBT.md`,
`docs/audits/AUDIT-2026-10-22.md`.

## Commands

```bash
npm install
npm run dev            # local dev
npm test               # pricing calculator + router-collision tests
npm run build          # next build (prod defaults; export ROBOTS_NOINDEX=true for a preview build)
npm run og             # regenerate public/og/default.png + public/brand/mark-512.png (local Chrome)
npm run build:worker   # OpenNext build for Cloudflare
```

Verification against a prod build (`npx next start -p 3300`):

```bash
node scripts/check-routes.mjs        # ghost links, orphans, anchors, route-list coverage, router collisions
node scripts/verify-browser.mjs      # screenshots + motion/calculator/form assertions
node scripts/lighthouse-sweep.mjs    # Lighthouse mobile, every route
```

Never build while a dev server is running on this folder (shared `.next`).

## Environment

| Var | When | Purpose |
|---|---|---|
| `SITE_URL` | build + runtime | Canonical origin (metadataBase, canonicals, sitemap, JSON-LD, llms.txt). Defaults to `https://yom.aapastech.com`. |
| `PROJECT_ID` | build | Tyashin project id (exposed as `NEXT_PUBLIC_PROJECT_ID`). |
| `ROBOTS_NOINDEX` | build + runtime | `"false"` for production (default). `"true"` only for a preview build; prerendered pages bake it at build time. |
| `TYASHIN_API_KEY` | runtime secret | Lets `/api/contact` forward leads to the Contact Form & Lead Capture plugin. Set by the `/adopt` workflow. |
| `TYASHIN_API_URL` | runtime | Defaults to `https://website-api.tyashin.com`. |

`.github/workflows/deploy.yml` is intentionally absent — `/adopt` installs the canonical one.
