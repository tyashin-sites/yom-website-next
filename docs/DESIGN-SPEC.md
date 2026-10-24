# YOM website: design spec

Single source of truth for the YOM (Your Own Metrics) marketing site. Deviations are bugs.
Archetype: **Marketing / SaaS** (tyashin-website site-patterns, archetype 4).
Written 2026-10-21, before any app code.

## 1. Thesis

**"The measurement layer you can prove."** The site has to feel like a precision instrument,
not a dashboard vendor. Every visual is evidence. A visitor should leave believing YOM's
numbers can be checked: conversions reconcile with the order system, an opt-out is visibly
honoured, one org fans out to N clients, and the API is something an agent can call.

### Anti-goals (each one is a defect)

- A generic SaaS look: purple or blue gradients, glassy blobs, floating 3D shapes, "AI sparkle".
- The Thridify reference look: teal/pink palette, Space Grotesk/Inter/Plex Mono, its hero
  pipeline, the metric band, the logo marquee, magnetic CTAs or the card spotlight.
- Any invented proof: customer logos, testimonials, user counts, uptime figures, "trusted by".
- Dashboards full of fake numbers. Any illustrative number is labelled "Illustration".
- Geography as the pitch. Burlington, Ontario appears only where an address belongs.
- Hype verbs ("revolutionary", "supercharge", "unlock the power").

## 2. Color system (canonical; `html:root` tokens in `layout.tsx` + `globals.css`)

The metaphor is a ledger page under a desk lamp: warm paper, instrument-black ink, one
signal colour (vermilion, the needle) and one verification colour (cobalt, "matched").

| Token | Light | Dark | Use | Share |
|---|---|---|---|---|
| `--brand-bg` | `#F4F1EA` ledger paper | `#0F1215` | page ground | ~60% |
| `--brand-surface` | `#ECE7DC` | `#171B20` | raised bands, table zebra | ~12% |
| `--brand-paper` | `#FBF9F4` | `#1A1F25` | cards, code frames | ~10% |
| `--brand-ink` | `#14171C` | `#14171C` | instrument panels (dark in both schemes) | ~10% |
| `--brand-text` | `#14171C` | `#ECE8DF` | body + headings | |
| `--brand-text-muted` | `#575B61` (6.1:1) | `#A3A69F` (7.6:1) | secondary copy | |
| `--brand-primary` | `#B8360F` vermilion (white text 5.9:1) | `#FF6B3D` (ink text 6.6:1) | primary CTA, the needle, "Δ" | ≤5% |
| `--brand-match` | `#2A45B0` cobalt (7.2:1) | `#9DB0FF` (9.0:1) | matched / verified / reconciled states | ≤3% |
| `--brand-brass` | `#8A6A2C` | `#D2B06A` | hairlines, tick marks, eyebrow dash. **Decorative only in light (4.46:1)** | ≤2% |
| `--brand-border` | `rgba(20,23,28,.12)` | `rgba(236,232,223,.12)` | rules, table lines | |

On ink panels (both schemes): paper text `#ECE8DF` 14.7:1, muted `#A3A69F` 7.3:1,
signal `#FF6B3D` 6.4:1, match `#9DB0FF` 8.6:1, brass `#D2B06A` 8.7:1.

**FORBIDDEN:** purple/violet anywhere; multi-stop gradients on text; gray (`#000`-based)
shadows, since shadows take the ink hue; pure `#000`/`#FFF` page grounds; teal; pink; more
than one signal colour per viewport.

Tailwind v3 maps tokens through `var(--brand-*)` (hex values in vars, so the oklch/HSL
`<alpha-value>` footer bug cannot occur). Opacity variants use `color-mix()` utilities, not
`/NN` on var colours.

## 3. Typography (self-hosted via `next/font/local`, OFL files in `src/fonts/`)

| Role | Face | Weights | Notes |
|---|---|---|---|
| Display (h1, h2, big numerals) | **Instrument Serif** | 400 + italic | Lighter as it grows. Tracking −0.01em at display sizes. Italic is reserved for the one emphasised word per headline. |
| Body / UI | **Schibsted Grotesk** (variable) | 400–600 | Editorial grotesk; reads like a financial paper, not a SaaS template. |
| Data / code / labels | **Geist Mono** (variable) | 400–500 | All numbers in tables, ledgers, prices, event names. `font-variant-numeric: tabular-nums`. Preloaded (it is above the fold in the hero; a late swap measured CLS 0.023). |

Scale (clamp):
- `tt-display` `clamp(2.6rem, 6.2vw, 5.6rem)` / 1.02
- `tt-h1` `clamp(2.2rem, 4.6vw, 4rem)` / 1.05
- `tt-h2` `clamp(1.8rem, 3.4vw, 3rem)` / 1.08
- `tt-h3` `1.35rem` / 1.25, body face, weight 600
- `lead` `clamp(1.06rem, 1.4vw, 1.25rem)` / 1.6, muted
- body `1rem` / 1.65; small `0.875rem`
- `eyebrow`: Geist Mono 0.72rem, uppercase, tracking 0.14em, with a 20px brass tick before it.

Custom type classes use the `tt-` namespace so they never shadow Tailwind utilities.

## 4. Hard text budgets

- Hero headline ≤ 9 words. Hero sub ≤ 32 words.
- Section heading ≤ 10 words; section lead ≤ 40 words.
- Card title ≤ 6 words; card body ≤ 30 words.
- One primary CTA per viewport: **"Start free, no credit card"** (→ `/signup`, same host; the router sends it to the dashboard).
  The secondary is always a ghost link (Talk to us / See pricing / Read the docs).

## 5. Space, grid, surfaces

- Container `max-w-[76rem]`, gutters `px-5 sm:px-8`.
- Section rhythm `clamp(4.5rem, 9vw, 8rem)`.
- Radius language: **tight and engineered**: `sm 4px`, `md 6px`, `lg 10px`, pills 999px only for
  status chips. Instruments have bevels, not bubbles.
- Rules over boxes: 1px hairlines (`--brand-border`) separate most content; cards are used for
  repeated items only.
- Ink panels ("instrument faces") carry: a 1px inner top highlight, a faint 8px dot grid
  (`radial-gradient`, ≤6% paper), and ink-tinted layered shadows.
- Shadows: `--shadow-rest: 0 1px 0 rgba(20,23,28,.04), 0 6px 18px -8px rgba(20,23,28,.18)`;
  `--shadow-lift` adds `0 22px 48px -24px rgba(184,54,15,.22)` (signal-tinted key light).

## 6. Motion tiers

One ease: `--ease-brand: cubic-bezier(0.2, 0.7, 0.1, 1)` (a measured settle, not a bounce).
Durations: micro 140ms, ui 260ms, reveal 700ms, scan 2.4s.

| Tier | What | Rule |
|---|---|---|
| T0 | Hover/focus | colour + 1px lift only |
| T1 | Below-fold rise | `data-fx="rise"`: opacity + 16px translate, IntersectionObserver, once. Only elements below the fold at wiring time are ever hidden. |
| T2 | Signature moments (§8) | transform/opacity/stroke-dashoffset only; paused off-screen |
| T3 | Header condense | `.is-scrolled` class: shadow + logo scale. **Bar height constant (CLS law).** |

No GSAP, no framer-motion: a ~2 KB IntersectionObserver/rAF module (`src/components/motion`).
`prefers-reduced-motion: reduce` → global CSS kill switch + every JS effect checks `reduced()`
and renders its final state. Banned: parallax, scroll-jacking, typewriter headlines, cursor trails,
autoplaying count-ups above the fold, confetti.

## 7. Imagery

No stock photography and no AI-generated images (ai-cost-gate). Every visual is hand-made SVG,
CSS or DOM data-viz in the product's own language: ledgers, event streams, consent flows,
fan-out diagrams, code. Illustrative data is labelled "Illustration" in mono caption type.
OG image is an SVG-built PNG generated at build time from the wordmark (no photography).

## 8. Signature moments (2 + 1, chosen for "precision instrument / proof")

1. **The reconciliation ledger (hero, home).** Order-system rows beside YOM's exact rows; a
   cobalt scan line sweeps the table (transform-only) and a Δ readout settles on `0.00`.
   SSR renders the reconciled final state, so no-JS and reduced-motion visitors see the proof;
   the sweep is decoration on top. It is never the LCP element (the h1 is).
2. **The consent stream (home §privacy, /product#privacy).** A live-looking event stream. Rows
   tagged `GPC` or `consent: denied` visibly lose their visitor id (the id strikes through and
   becomes `cookieless`) while the purchase is still counted. Pauses off-screen; reduced motion
   shows a static frame with both states.
3. **The sub-tenant fan-out (home §clients, /solutions/agencies, /solutions/platforms).** One org
   node draws scoped lines out to N client nodes as it scrolls into view (stroke-dashoffset),
   each node labelled with its scoped key prefix.

## 9. Page blueprints (one intent per URL)

| URL | Intent | Primary CTA |
|---|---|---|
| `/` | Understand the thesis in 5 seconds; choose a path | Start free |
| `/why-yom` | The cited case: what's broken in measurement today (footnoted) | Start free |
| `/product` | What ships today, by capability: `#conversions #privacy #collection #destinations #multi-tenant #ai-ready` | Start free |
| `/solutions` | Pick your situation (index) | — |
| `/solutions/ecommerce` | DTC: revenue that matches the order system | Start free |
| `/solutions/agencies` | One org, N clients | Start free |
| `/solutions/platforms` | Analytics you can embed and re-bill | Read the docs |
| `/solutions/regulated` | Privacy-first by design, with honest limits + legal-review language | Talk to us |
| `/compare` | YOM vs GA4, vs Mixpanel/Amplitude, vs Segment/RudderStack: cited facts, last-verified date | Start free |
| `/pricing` | Exact graduated price + calculator + FAQ | Start free |
| `/developers` | Install, server events, webhooks: real SDK code | Start free |
| `/security` | What exists today vs roadmap | Talk to us |
| `/about` | Who builds YOM (Aapastech; 14818032 Canada Inc., Burlington, Ontario) | Talk to us |
| `/contact` | Demo / contact form → Tyashin Contact Form plugin | Submit |
| `/faq` | Every common question, answered plainly | Start free |
| `/terms`, `/privacy`, `/dpa`, `/acceptable-use`, `/cookies`, `/subprocessors`, `/security/disclosure` | Published legal (delegated 2026-10-23; `docs/LEGAL-SOURCES.md`) | — |
| 404 | Elegant "no reading" instrument page | Home |

## 10. UX laws

- One primary CTA per viewport; it always reads "Start free, no credit card".
- 5-second test: the home hero must answer "what is it, who is it for, why trust it".
- "Coming soon" items always carry a visible `Coming soon` chip; never mixed into shipped lists.
- Estimates are labelled: funnels, attribution and unique counts are statistical estimates;
  only conversion counts are exact. Say so wherever those features appear.
- WCAG 2.2 AA: contrast per §2, visible focus ring (2px signal outline, 3px offset), skip link,
  every chart has a text equivalent, motion respects reduced-motion.
- No ghost links; no orphan pages; every external link `rel="noopener"`.

## 11. Performance budget (a design constraint; if an idea breaks it, the idea loses)

- Lighthouse mobile (prod build, `next start`): Performance ≥ 90, Accessibility ≥ 95, CLS ≈ 0.
- LCP element = hero h1 (text), painted from SSR HTML with no JS dependency. Above-the-fold
  elements animate transform-only, never hidden.
- First-load JS per route ≤ 120 KB gzip. No animation library.
- Fonts: 4 woff2 files (≈113 KB), all preloaded except the display italic.
- No third-party runtime origins.
