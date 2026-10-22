import { graphJson, type GraphPage } from '@/lib/knowledge-graph';

/** ONE @graph per page (addendum §3b). */
export function JsonLd({ page }: { page?: GraphPage }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graphJson(page) }} />;
}
