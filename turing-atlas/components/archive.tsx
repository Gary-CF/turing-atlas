"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { awards, fields, personById, settings } from "@/lib/content";
import { Portrait, Quote } from "@/components/laureate";

export default function Archive() {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("");
  const terms = query.trim().toLocaleLowerCase().split(/\s+/);
  const filtered = awards.map(a => ({ ...a, people: a.people.filter(id => {
    const p = personById[id];
    return (!field || p.field === field) && terms.every(term => `${a.year} ${p.name} ${p.chinese} ${p.tag} ${p.contribution}`.toLocaleLowerCase().includes(term));
  }) })).filter(a => a.people.length);
  const decades = [...new Set(filtered.map(a => Math.floor(a.year / 10) * 10))];
  const reset = () => { setQuery(""); setField(""); };
  return <>
    {settings.directoryFilters && <div className="archive-controls"><label className="archive-search"><Search size={17} /><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索姓名、年份或贡献" aria-label="搜索姓名、年份或贡献" /></label><select value={field} onChange={e => setField(e.target.value)} aria-label="按研究方向筛选"><option value="">全部研究方向</option>{fields.map(f => <option value={f.id} key={f.id}>{f.label}</option>)}</select>{(query || field) && <button type="button" onClick={reset}>清除筛选</button>}</div>}
    <p className="archive-results" role="status">{filtered.reduce((sum, a) => sum + a.people.length, 0)} 位得主 · {filtered.length} 个获奖年份</p>
    <div className="archive-layout"><nav className="year-nav" aria-label="获奖年代">{decades.map(decade => <a href={`#year-${filtered.find(a => Math.floor(a.year / 10) * 10 === decade)!.year}`} key={decade}>{decade}s<span>↗</span></a>)}</nav>
      <div className="years">{filtered.map(award => <section className="year-group" id={`year-${award.year}`} key={award.year}>
        <div className="year-heading"><h3>{award.year}</h3><span>{awards.find(a => a.year === award.year)!.people.length > 1 ? "共同获奖" : "A. M. TURING AWARD"}</span>{award.announcedAt && <span>公布于 {award.announcedAt}</span>}</div>
        {award.people.map(id => { const p = personById[id]; return <article className="person-card" key={id}>
          <Link href={`/laureates/${id}`} aria-label={`阅读 ${p.name} 的介绍`}><Portrait person={p} /></Link>
          <div className="person-copy"><span className={`field field-${p.field}`}>{p.tag}</span><h4><Link href={`/laureates/${id}`}>{p.name}<ArrowUpRight size={20} /></Link></h4><p className="chinese-name">{p.chinese}</p><p className="contribution">{p.contribution}</p><Quote person={p} compact /></div>
        </article>; })}
      </section>)}{!filtered.length && <div className="archive-empty"><p>没有找到匹配的人物，试试英文姓氏或获奖年份。</p><button className="text-link" onClick={reset}>显示全部得主 ↗</button></div>}</div>
    </div>
  </>;
}
