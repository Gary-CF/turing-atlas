import Link from "@/components/site-link";
import { awardByPerson, personById } from "@/lib/content";
import { Relation, relationKinds } from "@/lib/relationships";

export default function RelationshipList({ id, links, onExplore }: { id: string; links: Relation[]; onExplore?: (id: string) => void }) {
  return <div className="relationship-list">{links.map(r => {
    const other = personById[r.from === id ? r.to : r.from];
    return <article className="relationship" key={other.id}>
      <h3><Link href={`/laureates/${other.id}`}>{other.name}（{awardByPerson[other.id].year}） ↗</Link></h3>
      {onExplore && <button className="source-link" aria-label={`以 ${other.name} 为中心探索`} onClick={() => onExplore(other.id)}>以此人为中心探索 →</button>}
      {r.evidence.map(e => <div key={`${e.kind}-${e.source}`}><span className="relation-badge" style={{ color: relationKinds[e.kind].color }}>{e.label}</span><p>{e.note}</p><a className="source-link" href={e.source} target="_blank" rel="noreferrer">查看关系依据 ↗</a></div>)}
    </article>;
  })}</div>;
}
