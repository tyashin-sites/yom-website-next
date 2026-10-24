import { describe, expect, it } from 'vitest';
import { markdownToHtml, pickRelated, postSeo, sanitizePostHtml, type BlogPost } from '@/lib/blog';
import { buildGraph } from '@/lib/knowledge-graph';

const post = (slug: string, tags: string[] = [], extra: Partial<BlogPost> = {}): BlogPost => ({ slug, title: slug, tags, ...extra });

describe('blog: post HTML', () => {
  it('strips executable content and demotes body h1', () => {
    const dirty =
      '<h1>T</h1><p onclick="x()">a</p><script>alert(1)</script><a href="javascript:alert(1)">l</a><iframe src="//e"></iframe><img src=x onerror=alert(1)>';
    const clean = sanitizePostHtml(dirty);
    expect(clean).not.toMatch(/<script|onclick|onerror|javascript:|<iframe|<h1/i);
    expect(clean).toContain('<h2>T</h2>');
    expect(clean).toContain('<p>a</p>');
  });

  it('keeps ordinary markup', () => {
    const html = '<h2 id="x">Head</h2><p>Text <a href="https://yom.aapastech.com/pricing">link</a></p><img src="/a.png" alt="A">';
    expect(sanitizePostHtml(html)).toBe(html);
  });

  it('renders the markdown subset', () => {
    const html = markdownToHtml('# Title\n\nPara with **bold** and [a link](/pricing).\n\n- one\n- two\n\n> quote');
    expect(html).toContain('<h2>Title</h2>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<a href="/pricing">a link</a>');
    expect(html).toContain('<ul>\n<li>one</li>\n<li>two</li>\n</ul>');
    expect(html).toContain('<blockquote><p>quote</p></blockquote>');
    expect(markdownToHtml('<script>x</script>')).not.toContain('<script>');
  });
});

describe('blog: SEO text', () => {
  it('prefers a real metaTitle but not a truncated prefix of the title', () => {
    expect(postSeo(post('a', [], { title: 'GA4 thresholding explained for store owners', seo: { metaTitle: 'GA4 thresholding expl' } })).title).toBe(
      'GA4 thresholding explained for store owners',
    );
    expect(postSeo(post('a', [], { title: 'Long title', seo: { metaTitle: 'Short own line' } })).title).toBe('Short own line');
  });

  it('skips WordPress auto-excerpts and falls back to the body', () => {
    const p = post('a', [], { excerpt: 'First words [&hellip;]', content: '<p>The body text.</p>' });
    expect(postSeo(p).description).toBe('The body text.');
  });
});

describe('blog: related posts', () => {
  it('ranks by shared tags, then recency, and excludes the post itself', () => {
    const cur = post('cur', ['GPC', 'consent']);
    const out = pickRelated(cur, [post('cur', ['GPC']), post('new', []), post('one', ['gpc']), post('two', ['GPC', 'Consent'])]);
    expect(out.map((p) => p.slug)).toEqual(['two', 'one', 'new']);
  });
});

describe('blog: knowledge graph', () => {
  it('adds a BlogPosting linked to the page, publisher and breadcrumb', () => {
    const g = buildGraph({
      path: '/blog/x',
      title: 'X',
      description: 'D',
      crumbs: [
        { name: 'Blog', path: '/blog' },
        { name: 'X', path: '/blog/x' },
      ],
      article: { headline: 'X', description: 'D', datePublished: '2026-10-24T00:00:00Z', authorName: 'A' },
    });
    const art = g['@graph'].find((n) => n['@type'] === 'BlogPosting')!;
    expect(art['@id']).toMatch(/\/blog\/x#article$/);
    expect(art.publisher).toEqual({ '@id': expect.stringMatching(/#organization$/) });
    expect(art.author).toEqual({ '@type': 'Person', name: 'A' });
    expect(art.datePublished).toBe('2026-10-24T00:00:00.000Z');
    expect(g['@graph'].some((n) => n['@type'] === 'BreadcrumbList')).toBe(true);
  });
});
