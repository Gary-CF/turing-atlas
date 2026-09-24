import type { Person } from "@/lib/content";
import { settings } from "@/lib/content";

export { default as Portrait } from "./portrait";

export function Quote({ person, compact = false }: { person: Person; compact?: boolean }) {
  if (!settings.quotes || !person.quote) return null;
  const q = person.quote;
  return <blockquote className={compact ? "quote compact" : "quote"}><p lang="en">“{q.text}”</p>{!compact && <p className="quote-translation">{q.translation}</p>}<a href={q.url} target="_blank" rel="noreferrer">{compact ? "引文出处 ↗" : `${q.context} ↗`}</a></blockquote>;
}
