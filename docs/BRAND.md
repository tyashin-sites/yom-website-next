# YOM brand

## Name

**YOM**, short for **Your Own Metrics**. Written "YOM" in running text; "Your Own Metrics" on
first mention per page where space allows. Built by **Aapastech**. North American legal entity:
**14818032 Canada Inc.**, headquartered in Burlington, Ontario.

## Wordmark

Type wordmark: `YOM` set in **Schibsted Grotesk 600**, letter-spacing `0.06em`, paired with the
mark to its left at cap height. The "O" is not replaced by the mark; the mark sits beside it.
Lockup gap = 0.45 × cap height. Minimum size: 18px cap height on screen.

## Mark: "Null point"

A gauge reading zero. It is the brand idea, "the measurement layer you can prove", in one glyph:
when YOM's numbers are reconciled against the order system, the needle rests at the null point.

Construction (24 × 24 grid, `src/components/brand/Mark.tsx`, `public/brand/mark.svg`):

- Outer ring: circle r = 10, stroke 1.75, `currentColor` (ink on paper, paper on ink).
- Zero line: horizontal hairline from x = 5 to x = 19 at y = 12, stroke 1.25, brass.
- Two gauge ticks at 12 and 6 o'clock: 2.5px long, stroke 1.5, `currentColor`.
- The null point: a filled circle r = 2.4 at the exact centre, **signal vermilion**.

Rules: the dot is always the signal colour; the ring is always a single ink/paper colour; never
rotate, outline, gradient or animate the mark (the 404 page is the only exception: the dot
drifts off-centre, "no reading").

## Voice

Plain, exact, a little dry. An engineer explaining to a CFO. Short sentences. Numbers carry
their source. We say what we don't do ("Not our lane") and label what isn't shipped
("Coming soon"). No hype verbs, no "revolutionary", no "AI-powered" as a headline.

## Palette and type

See `docs/DESIGN-SPEC.md` §2–3 (canonical). Vermilion signal `#B8360F` / `#FF6B3D` (dark),
cobalt match `#2A45B0` / `#9DB0FF`, ledger paper `#F4F1EA`, instrument ink `#14171C`, brass `#8A6A2C`.
Instrument Serif (display), Schibsted Grotesk (UI), Geist Mono (data). All three are OFL.

## Tyashin brand kit (to set when the project exists)

Mirror these into the Tyashin brand kit so platform pages match:
`primary #B8360F`, `primary-contrast #FFFFFF`, `accent #2A45B0`, `bg #F4F1EA`, `surface #ECE7DC`,
`text #14171C`, `text-muted #575B61`, `border rgba(20,23,28,0.12)`, radius sm/md/lg 4/6/10px.
The site does not load `/brand-kit.css`; it declares these tokens at `html:root` specificity so a
stale platform kit cannot override them.
