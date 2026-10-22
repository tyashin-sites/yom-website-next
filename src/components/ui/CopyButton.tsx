'use client';

import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* clipboard blocked — nothing to do */
        }
      }}
      className="rounded-sm px-2 py-1 text-on-ink-muted transition-colors hover:text-on-ink"
      aria-live="polite"
    >
      {done ? 'Copied' : 'Copy'}
    </button>
  );
}
