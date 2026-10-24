'use client';

import { useEffect } from 'react';

/**
 * Progressive enhancement for the blog index (addendum §3e "LAYER IT"): the
 * server renders a real `<a href="/blog?page=N">` next link. This intercepts
 * it, on click and when it scrolls into view, fetches that page and appends
 * its rows in place. If a fetch fails it stops enhancing and the link
 * navigates normally, so crawlers and no-JS readers keep the paginated trail.
 */
export function LoadMore() {
  useEffect(() => {
    const list = document.querySelector<HTMLOListElement>('[data-blog-list]');
    let next = document.querySelector<HTMLAnchorElement>('[data-blog-next]');
    if (!list || !next || !('IntersectionObserver' in window)) return;
    let busy = false;
    let dead = false;

    const load = async (e?: Event) => {
      if (dead || busy || !next) return;
      e?.preventDefault();
      busy = true;
      const href = next.href;
      try {
        const res = await fetch(href, { headers: { accept: 'text/html' } });
        if (!res.ok) throw new Error(String(res.status));
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        doc.querySelectorAll('[data-blog-list] > li').forEach((li) => list.appendChild(document.importNode(li, true)));
        const fresh = doc.querySelector<HTMLAnchorElement>('[data-blog-next]');
        const pager = document.querySelector('[data-blog-pager]');
        const freshPager = doc.querySelector('[data-blog-pager]');
        if (pager && freshPager) pager.replaceWith(document.importNode(freshPager, true));
        else pager?.remove();
        next = fresh ? document.querySelector<HTMLAnchorElement>('[data-blog-next]') : null;
        if (next) {
          next.addEventListener('click', load);
          io.observe(next);
        } else io.disconnect();
      } catch {
        dead = true; // let the link navigate
        io.disconnect();
        if (!e) return;
        window.location.href = href;
      } finally {
        busy = false;
      }
    };

    const io = new IntersectionObserver((entries) => entries.some((x) => x.isIntersecting) && load(), { rootMargin: '600px 0px' });
    next.addEventListener('click', load);
    io.observe(next);
    return () => io.disconnect();
  }, []);
  return null;
}
