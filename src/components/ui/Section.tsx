export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  className = '',
  align = 'left',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="tt-h2 mt-4 text-balance">
        {title}
      </h2>
      {lead ? <p className="tt-lead mt-5 text-pretty">{lead}</p> : null}
    </div>
  );
}

export function ComingSoon({ label = 'Coming soon' }: { label?: string }) {
  return <span className="chip chip-soon">{label}</span>;
}

export function Live({ label = 'Live' }: { label?: string }) {
  return (
    <span className="chip chip-live">
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
