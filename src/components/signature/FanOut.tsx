/**
 * Signature 3 — the sub-tenant fan-out (DESIGN-SPEC §8.3). Server component.
 * One org node draws scoped lines to N client sub-tenants as the figure
 * scrolls into view: MotionFX writes --p (0→1) on [data-fx="fan"], CSS maps
 * it to stroke-dashoffset. SSR / no-JS / reduced-motion = fully drawn.
 *
 * Labels use YOM's real key/token vocabulary (sub-tenant external id, scoped
 * key, embed token); the client names are placeholders, not customers.
 */

const CLIENTS = [
  { st: 'client-a', kind: 'open' },
  { st: 'client-b', kind: 'registered' },
  { st: 'client-c', kind: 'registered' },
  { st: 'client-d', kind: 'open' },
  { st: 'client-e', kind: 'registered' },
];

export function FanOut({ orgLabel = 'Your org' }: { orgLabel?: string }) {
  // Desktop geometry (viewBox 760 × 340)
  const ox = 120;
  const oy = 170;
  const cx = 600;
  const ys = CLIENTS.map((_, i) => 40 + i * 65);

  return (
    <figure data-fx="fan" className="ink-panel on-ink p-5 sm:p-7">
      <svg viewBox="0 0 760 340" className="hidden h-auto w-full md:block" role="img" aria-labelledby="fan-title fan-desc">
        <title id="fan-title">One organisation, five client sub-tenants</title>
        <desc id="fan-desc">
          A single YOM org connects to five sub-tenants. Each line is a scoped key or embed token that can only read
          its own client&rsquo;s data.
        </desc>
        {ys.map((y, i) => {
          const d = `M${ox + 46} ${oy} C ${ox + 230} ${oy}, ${cx - 210} ${y}, ${cx - 14} ${y}`;
          return (
            <g key={i}>
              <path d={d} stroke="var(--on-ink-border)" strokeWidth="1" fill="none" />
              <path
                d={d}
                className="fan-path"
                pathLength={400}
                style={{ ['--len' as string]: 400 }}
                stroke="var(--on-ink-match)"
                strokeWidth="1.5"
                fill="none"
              />
              <text x={(ox + cx) / 2 + 30} y={(oy + y) / 2 - 6} fill="var(--on-ink-muted)" fontSize="11" fontFamily="var(--brand-mono-font)" className="fan-node">
                {i % 2 === 0 ? 'scoped key' : 'embed token'}
              </text>
            </g>
          );
        })}
        <g>
          <circle cx={ox} cy={oy} r="46" fill="var(--brand-ink)" stroke="var(--on-ink-signal)" strokeWidth="1.5" />
          <circle cx={ox} cy={oy} r="5" fill="var(--on-ink-signal)" />
          <text x={ox} y={oy + 72} textAnchor="middle" fill="var(--on-ink)" fontSize="14" fontFamily="var(--brand-body-font)" fontWeight="600">
            {orgLabel}
          </text>
          <text x={ox} y={oy + 90} textAnchor="middle" fill="var(--on-ink-muted)" fontSize="11" fontFamily="var(--brand-mono-font)">
            one login · one bill
          </text>
        </g>
        {CLIENTS.map((c, i) => (
          <g key={c.st} className="fan-node">
            <rect x={cx - 14} y={ys[i] - 19} width="150" height="38" rx="6" fill="var(--brand-ink)" stroke="var(--on-ink-border)" />
            <circle cx={cx + 4} cy={ys[i]} r="4" fill="var(--on-ink-match)" />
            <text x={cx + 16} y={ys[i] - 2} fill="var(--on-ink)" fontSize="12.5" fontFamily="var(--brand-mono-font)">
              st: {c.st}
            </text>
            <text x={cx + 16} y={ys[i] + 12} fill="var(--on-ink-muted)" fontSize="10.5" fontFamily="var(--brand-mono-font)">
              {c.kind}
            </text>
          </g>
        ))}
      </svg>

      {/* Mobile: vertical stack, same idea, legible type. */}
      <div className="md:hidden">
        <p className="sr-only">One YOM org connects to five client sub-tenants, each through a scoped key or embed token.</p>
        <div aria-hidden="true" className="flex flex-col items-start">
          <div className="flex items-center gap-3 rounded-md border border-[color:var(--on-ink-signal)] px-3 py-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--on-ink-signal)]" />
            <span className="font-semibold">{orgLabel}</span>
            <span className="font-mono text-[0.7rem] text-on-ink-muted">one login · one bill</span>
          </div>
          <ul className="ml-4 border-l border-[color:var(--on-ink-match)] pt-2">
            {CLIENTS.map((c, i) => (
              <li key={c.st} className="fan-node flex items-center gap-2 py-1.5 font-mono text-[0.78rem]">
                <span className="inline-block h-px w-5 bg-[color:var(--on-ink-match)]" />
                <span>st: {c.st}</span>
                <span className="text-on-ink-muted">· {i % 2 === 0 ? 'scoped key' : 'embed token'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 font-mono text-[0.66rem] text-on-ink-muted">
        Illustration · sub-tenant ids are examples. A bound key or token is forced to its own sub-tenant; asking for
        another returns 403.
      </figcaption>
    </figure>
  );
}
