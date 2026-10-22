import { Breadcrumbs } from './Breadcrumbs';

export function PageHero({
  eyebrow,
  title,
  lead,
  trail,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  trail: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container-y pt-10 pb-14 sm:pt-14 sm:pb-20">
      <Breadcrumbs trail={trail} />
      <p className="eyebrow mt-10">{eyebrow}</p>
      <h1 className="tt-h1 mt-4 max-w-4xl text-balance">{title}</h1>
      {lead ? <p className="tt-lead mt-6 max-w-2xl text-pretty">{lead}</p> : null}
      {children ? <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div> : null}
    </section>
  );
}
