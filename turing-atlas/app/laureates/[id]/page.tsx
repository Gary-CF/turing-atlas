import Link from "@/components/site-link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { people, awardByPerson, relations, settings, fields } from "@/lib/content";
import { Portrait, Quote } from "@/components/laureate";
import { getPortrait } from "@/lib/portraits";
import RelationshipList from "@/components/relationship-list";

type Props = { params: Promise<{ id: string }> };
export const generateStaticParams = () => people.map(({ id }) => ({ id }));
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = people.find(p => p.id === id);
  return { title: p?.name ?? "人物未找到", description: p?.contribution };
}

export default async function PersonPage({ params }: Props) {
  const { id } = await params;
  const p = people.find(p => p.id === id);
  if (!p) notFound();
  const award = awardByPerson[id];
  const lecture = p.materials.find(m => m.kind.includes("图灵奖演讲")) ?? (p.lecture === undefined ? null : p.materials[p.lecture]);
  const connections = relations.filter(r => r.from === id || r.to === id);
  const photo = getPortrait(id);
  return <main id="main" className="wrap detail">
    <Link href={`/#year-${award.year}`} className="back-link"><ArrowLeft size={16} /> 返回人物纪年</Link>
    <section className="profile-hero"><div><p className="eyebrow">{award.year} / A. M. TURING AWARD</p><h1>{p.name}</h1><p className="profile-subtitle">{p.chinese}<span>{p.years}</span></p><p className="profile-lede">{p.contribution}</p><span className={`field field-${p.field}`}>{p.tag}</span></div><Portrait person={p} large /></section>
    <div className="detail-grid"><aside className="detail-nav"><a href="#life">01 · {p.basic ? "人物概览" : "生平与思想"}</a><a href="#award">02 · 图灵奖{lecture && "与演讲"}</a>{!!p.materials.length && <a href="#reading">03 · 值得阅读</a>}{p.home && <a href={p.home} target="_blank" rel="noreferrer">{p.homeLabel ?? "个人主页"} ↗</a>}{settings.graph && <Link href={`/constellation?person=${id}`}>在星图中查看 ↗</Link>}</aside>
      <div className="detail-content"><section id="life"><p className="eyebrow">01 / LIFE & IDEAS</p><h2>{p.basic ? "人物概览" : "生平与思想"}</h2>{p.basic ? <p>{p.name}（{p.chinese}）是 {award.year} 年度图灵奖得主。主要研究方向归入{fields.find(f => f.id === p.field)!.label}，代表贡献为{p.tag}。</p> : p.bio.map(text => <p key={text}>{text}</p>)}<a className="source-link" href={p.source} target="_blank" rel="noreferrer">人物资料来源 ↗</a><Quote person={p} /></section>
        <section id="award"><p className="eyebrow">02 / THE TURING AWARD</p><h2>图灵奖{lecture && "与演讲"}</h2><p>{award.citation}</p><a className="source-link" href={award.source} target="_blank" rel="noreferrer">获奖记录 ↗</a>
          {award.people.length > 1 && <p className="co-winners">共同获奖：{award.people.filter(other => other !== id).map(other => <Link key={other} href={`/laureates/${other}`}>{people.find(p => p.id === other)!.name} ↗</Link>)}</p>}
          {award.announcedAt && <p className="content-note">获奖年度 {award.year} · 公布日期 {award.announcedAt}</p>}
          {lecture && <a className="lecture-link" href={lecture.url} target="_blank" rel="noreferrer"><span><small>{lecture.kind} · {lecture.dateLabel ?? lecture.year}</small><strong>{lecture.title}</strong></span><ArrowUpRight /></a>}
          {p.response && <div className="award-response"><h3>{p.response.title}</h3><p>{p.response.note}</p><a className="source-link" href={p.response.url} target="_blank" rel="noreferrer">阅读原始记录 ↗</a></div>}
        </section>
        {!!p.materials.length && <section id="reading"><p className="eyebrow">03 / READING THEIR IDEAS</p><h2>值得阅读<span className="section-count">{String(p.materials.length).padStart(2, "0")}</span></h2>
          <div className="reading-list">{[...p.materials].sort((a,b) => a.year-b.year).map(m => <article className="reading-item" key={m.url}><time>{m.year}</time><div><span className="eyebrow">{m.kind}</span><h3><a href={m.url} target="_blank" rel="noreferrer">{m.title}<ArrowUpRight size={20} /></a></h3>{m.authors && <small className="material-authors">{m.authors}</small>}<p>{m.note}</p><small>{m.dateLabel && <>{m.dateLabel} · </>}{m.access}</small></div></article>)}</div>
        </section>}
        {connections.length > 0 && <section><p className="eyebrow">CONNECTED MINDS</p><h2>思想的交汇</h2><RelationshipList id={id} links={connections} /></section>}
        {!!p.sources?.length && <div className="profile-sources"><p className="eyebrow">SOURCES / 参考资料</p>{p.sources.map(s => <a key={s.url} className="source-link" href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div>}
        {photo && <details className="portrait-credit"><summary>肖像署名</summary><p><a href={photo.sourcePage} target="_blank" rel="noreferrer">{photo.credit} ↗</a>{photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></>} · {photo.modifications}</p></details>}
      </div>
    </div>
  </main>;
}
