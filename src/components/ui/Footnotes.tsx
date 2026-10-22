import { LAST_VERIFIED, LAST_VERIFIED_LABEL, SOURCES, type SourceId } from '@/lib/sources';

/**
 * Numbered footnotes. A page declares its ordered source ids once:
 *   const fn = footnotes(['ga4Thresholds', 'mixpanelPricing']);
 *   … text<fn.Ref id="ga4Thresholds" /> …  <fn.List />
 */
export function footnotes(ids: SourceId[]) {
  const order = Array.from(new Set(ids));
  const n = (id: SourceId) => order.indexOf(id) + 1;
  function Ref({ id }: { id: SourceId }) {
    const i = n(id);
    return (
      <a href={`#fn-${i}`} id={`ref-${i}-${id}`} className="fn" aria-label={`Source ${i}`}>
        [{i}]
      </a>
    );
  }
  function List({ title = 'Sources' }: { title?: string }) {
    return (
      <section aria-labelledby="sources-heading" className="rule-top pt-8">
        <h2 id="sources-heading" className="eyebrow">
          {title}
        </h2>
        <p className="mt-3 text-sm text-muted">
          Third-party figures as published by the cited source. Last verified{' '}
          <time dateTime={LAST_VERIFIED}>{LAST_VERIFIED_LABEL}</time>. Prices and policies change; check the
          source before relying on a number.
        </p>
        <ol className="mt-6 space-y-3 text-sm">
          {order.map((id, idx) => {
            const s = SOURCES[id];
            return (
              <li key={id} id={`fn-${idx + 1}`} className="grid grid-cols-[2.2rem_1fr] gap-2">
                <span className="tt-num text-muted">[{idx + 1}]</span>
                <span>
                  {s.publisher}, &ldquo;{s.title}.&rdquo;{' '}
                  <a href={s.url} target="_blank" rel="noopener" className="break-all text-match underline">
                    {s.url.replace(/^https?:\/\//, '')}
                  </a>
                  {s.thirdParty ? <span className="text-muted"> (third-party estimate)</span> : null}
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
  return { Ref, List, n };
}
