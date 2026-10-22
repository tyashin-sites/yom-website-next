import { CopyButton } from './CopyButton';

/**
 * Server-rendered code frame with a tiny, dependency-free highlighter:
 * comments muted, strings cobalt, a handful of keywords signal. Good enough
 * for short snippets; no highlighter runtime ships to the client.
 */
const KEYWORDS =
  /\b(import|from|export|const|let|await|async|new|return|function|if|else|process|curl|npm|true|false|null)\b/;

function highlight(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\/\/[^\n]*|#[^\n!]*$|'[^'\n]*'|"[^"\n]*"|`[^`]*`|\b[a-zA-Z_]+\b)/gm;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const t = m[0];
    if (t.startsWith('//') || t.startsWith('#')) out.push(<span key={i++} className="tok-c">{t}</span>);
    else if (t[0] === "'" || t[0] === '"' || t[0] === '`') out.push(<span key={i++} className="tok-s">{t}</span>);
    else if (KEYWORDS.test(t)) out.push(<span key={i++} className="tok-k">{t}</span>);
    else out.push(t);
    last = m.index + t.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeBlock({ code, label, lang }: { code: string; label: string; lang?: string }) {
  return (
    <figure className="code-frame">
      <figcaption className="code-head">
        <span>
          {label}
          {lang ? <span className="ml-2">· {lang}</span> : null}
        </span>
        <CopyButton text={code} />
      </figcaption>
      <pre tabIndex={0} aria-label={`${label} code`}>
        <code>{highlight(code)}</code>
      </pre>
    </figure>
  );
}
