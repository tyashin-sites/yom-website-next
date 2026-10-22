import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/** Shell for draft legal pages. The banner stays until counsel signs off (docs/ASSET-DEBT.md #4, #5). */
export function LegalDraft({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="container-y pt-10 pb-24 sm:pt-14">
      <Breadcrumbs trail={[{ name: title, path }]} />
      <h1 className="tt-h1 mt-10">{title}</h1>
      <p className="mt-4 font-mono text-[0.78rem] text-muted">Draft · last updated {updated}</p>
      <div role="note" className="mt-8 max-w-3xl rounded-md border border-dashed border-primary px-5 py-4 text-sm">
        <strong className="font-semibold">Draft, pending legal review.</strong> This text has not yet been approved by
        counsel and may change. Questions: contact@aapastech.com.
      </div>
      <div className="prose-y mt-10">{children}</div>
    </article>
  );
}
