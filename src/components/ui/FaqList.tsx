export interface Faq {
  q: string;
  a: string;
}

/** No-JS accordion (details/summary). Answers are plain text so they can feed FAQ schema. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="rule-top">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-border py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="tt-num mt-0.5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-pretty text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
