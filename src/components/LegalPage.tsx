import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LEGAL_UPDATED, LEGAL_UPDATED_ISO, legalDocs } from '@/config/legal';

export type TocItem = { id: string; label: string };

/** Shell for the published legal documents: title, date, contents, sibling-document nav. */
export function LegalPage({
  title,
  path,
  intro,
  toc,
  trail,
  children,
}: {
  title: string;
  path: string;
  intro?: React.ReactNode;
  toc?: TocItem[];
  trail?: { name: string; path: string }[];
  children: React.ReactNode;
}) {
  return (
    <article className="container-y pt-10 pb-24 sm:pt-14">
      <Breadcrumbs trail={trail ?? [{ name: title, path }]} />
      <h1 className="tt-h1 mt-10">{title}</h1>
      <p className="mt-4 font-mono text-[0.78rem] text-muted">
        Last updated: <time dateTime={LEGAL_UPDATED_ISO}>{LEGAL_UPDATED}</time>
      </p>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_15rem]">
        <div className="prose-y min-w-0">
          {intro}
          {toc?.length ? (
            <nav aria-label="Contents" className="legal-toc">
              <p className="eyebrow">Contents</p>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          {children}
        </div>
        <aside aria-label="Legal documents" className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            {legalDocs.map((d) => (
              <li key={d.href}>
                {d.href === path ? (
                  <span aria-current="page" className="font-semibold text-foreground">
                    {d.label}
                  </span>
                ) : (
                  <a href={d.href} className="text-muted hover:text-foreground">
                    {d.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
