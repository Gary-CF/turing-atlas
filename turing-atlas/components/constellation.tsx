"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Minus, Plus, RotateCcw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelationshipList from "@/components/relationship-list";
import Portrait from "@/components/portrait";
import { people, personById, fields, relations, settings, awardByPerson } from "@/lib/content";
import { RelationKind, relationKinds } from "@/lib/relationships";

const initialView = { x: 0, y: 0, scale: 1 };
const name = (id: string) => `${personById[id].name}${settings.graphAwardYears ? `（${awardByPerson[id].year}）` : ""}`;
const kinds = Object.entries(relationKinds) as [RelationKind, typeof relationKinds[RelationKind]][];

export default function Constellation() {
  const router = useRouter();
  const [selected, select] = useState("");
  const [narrow, setNarrow] = useState(false);
  const [field, setField] = useState("");
  const [kind, setKind] = useState<RelationKind | "">("");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [center, setCenter] = useState("");
  const [view, setView] = useState(initialView);
  const svg = useRef<SVGSVGElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const inspector = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const resetView = () => { setView(initialView); stage.current?.scrollTo(0, 0); };
  const pick = (id: string) => {
    select(id); inspector.current?.scrollTo(0, 0);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("person", id); else url.searchParams.delete("person");
    window.history.replaceState(window.history.state, "", url);
  };
  const explore = (id: string) => { pick(id); setCenter(id); setFocused(settings.graphExplore); setField(""); setQuery(""); resetView(); };
  useEffect(() => {
    const readPerson = () => { const id = new URLSearchParams(window.location.search).get("person") ?? ""; select(personById[id] ? id : ""); setCenter(id); setFocused(!!personById[id] && settings.graphExplore); };
    const media = window.matchMedia("(max-width: 760px)");
    const resize = () => { setNarrow(media.matches); setView(initialView); };
    readPerson(); resize(); media.addEventListener("change", resize); window.addEventListener("popstate", readPerson);
    return () => { media.removeEventListener("change", resize); window.removeEventListener("popstate", readPerson); };
  }, []);
  const filtered = relations.map(r => ({ ...r, evidence: r.evidence.filter(e => !kind || e.kind === kind) })).filter(r => r.evidence.length);
  const person = personById[selected];
  const links = filtered.filter(r => r.from === selected || r.to === selected);
  const connected = new Set([selected, ...links.flatMap(r => [r.from, r.to])]);
  const focus = focused && !!personById[center];
  const matches = query.trim() ? people.filter(p => `${p.name} ${p.chinese} ${p.tag} ${awardByPerson[p.id].year}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) : [];
  let width = 600, height = 0;
  const groups: (typeof fields[number])[] = [];
  let nodes: typeof people = [];
  if (focus) {
    const neighborhood = new Set(filtered.filter(r => r.from === center || r.to === center).flatMap(r => [r.from, r.to]));
    const neighbors = people.filter(p => p.id !== center && neighborhood.has(p.id));
    width = narrow ? 600 : 1000;
    height = narrow ? 240 + Math.ceil(neighbors.length / 2) * 200 : 680;
    nodes = [{ ...personById[center], x: width / 2, y: narrow ? 90 : 310 }, ...neighbors.map((p, i) => {
      const angle = -Math.PI / 2 + i * Math.PI * 2 / neighbors.length;
      return { ...p, x: narrow ? (i % 2 ? 450 : 150) : 500 + Math.cos(angle) * 340, y: narrow ? 300 + Math.floor(i / 2) * 200 : 310 + Math.sin(angle) * 220 };
    })];
  } else {
    const visibleFields = fields.filter(f => !field || f.id === field);
    const columns = narrow ? 2 : 3, groupColumns = field || narrow ? 1 : 3;
    width = groupColumns * 600;
    // Pack each row using its tallest group; positions stay stable between visits.
    for (let row = 0; row < visibleFields.length; row += groupColumns) {
      let rowHeight = 0;
      visibleFields.slice(row, row + groupColumns).forEach((f, column) => {
        const members = people.filter(p => p.field === f.id);
        groups.push({ ...f, x: column * 600 + 300, y: height + 40 });
        members.forEach((p, i) => {
          const count = Math.min(columns, members.length - Math.floor(i / columns) * columns);
          nodes.push({ ...p, x: column * 600 + (i % columns + (columns - count) / 2 + .5) * 600 / columns, y: height + 140 + Math.floor(i / columns) * 180 });
        });
        rowHeight = Math.max(rowHeight, 160 + Math.ceil(members.length / columns) * 180);
      });
      height += rowHeight;
    }
  }
  const positions = new Map(nodes.map(p => [p.id, p]));
  const edges = filtered.filter(r => positions.has(r.from) && positions.has(r.to));
  const canPan = settings.graphPan && view.scale > 1;
  // Convert screen coordinates to SVG units so dragging stays correct at any size.
  const point = (x: number, y: number) => new DOMPoint(x, y).matrixTransform(svg.current!.getScreenCTM()!.inverse());
  const zoom = (factor: number) => {
    const bounds = stage.current!.getBoundingClientRect();
    const center = point(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    setView(v => { const scale = Math.max(settings.minZoom, Math.min(settings.maxZoom, v.scale * factor)), ratio = scale / v.scale; return { scale, x: center.x - (center.x - v.x) * ratio, y: center.y - (center.y - v.y) * ratio }; });
  };
  return <>
    <div className="graph-controls">
      {settings.graphExplore && <div className="graph-search"><label htmlFor="graph-search"><Search size={17} /><span className="sr-only">查找人物、贡献或获奖年份</span></label><input id="graph-search" value={query} placeholder="姓名、贡献或获奖年份" autoComplete="off" aria-controls={query.trim() ? "graph-results" : undefined} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === "Escape") setQuery(""); if (e.key === "Enter" && matches.length === 1) explore(matches[0].id); }} />{query && <button onClick={() => setQuery("")} aria-label="清空搜索"><X size={16} /></button>}
        {!!query.trim() && <div id="graph-results" className="graph-results" aria-live="polite">{matches.length ? <><small>{matches.length} 位匹配人物</small>{matches.map(p => <button key={p.id} onClick={() => explore(p.id)}>{name(p.id)}<small>{p.chinese} · {p.tag}</small></button>)}</> : <p>没有匹配人物，请试试英文姓氏或获奖年份。</p>}</div>}
      </div>}
      {settings.fullCatalog && <label>研究方向<select value={field} disabled={focus} onChange={e => { explore(""); setFocused(false); setField(e.target.value); }}><option value="">全部星群 · {people.length} 人</option>{fields.map(f => <option value={f.id} key={f.id}>{f.label}</option>)}</select></label>}
      {settings.graphExplore && <label>关系类型<select value={kind} onChange={e => { setKind(e.target.value as RelationKind | ""); if (focus) pick(center); resetView(); }}><option value="">全部关系</option>{kinds.map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label>}
    </div>
    <div className="graph-context"><p>{focus ? <>正在探索 <strong>{name(center)}</strong> 的直接关联 · 跨领域显示</> : <>领域按主要贡献归类；同一领域中的人物不一定有直接关系。</>}</p>{person && settings.graphExplore && <button onClick={() => { if (focus) { setFocused(false); resetView(); } else explore(selected); }}>{focus ? "返回领域全图" : "只看关联人物"} →</button>}</div>
    <div className="graph-toolbar"><span aria-live="polite">{nodes.length} 位人物 · {edges.length} 组关联{!narrow && " · 单击探索，双击进入人物页"}</span><div>{settings.graphZoom && <><Button variant="ghost" size="icon" onClick={() => zoom(1 / 1.2)} disabled={view.scale <= settings.minZoom} aria-label="缩小星图"><Minus /></Button><span className="zoom-level">{Math.round(view.scale * 100)}%</span><Button variant="ghost" size="icon" onClick={() => zoom(1.2)} disabled={view.scale >= settings.maxZoom} aria-label="放大星图"><Plus /></Button></>}<Button variant="ghost" size="icon" onClick={() => { explore(""); setKind(""); setField(""); }} aria-label="恢复全图"><RotateCcw /></Button></div></div>
    <div className={`graph-workspace${focus ? " has-selection" : ""}`}>
      <div className="graph-canvas"><div ref={stage} className={`graph-stage graph-catalog${focus ? " graph-focused" : ""}${field ? " graph-filtered" : ""}`} tabIndex={0} aria-label="星图画布，可滚动浏览；放大后可拖动" onKeyDown={e => { if (e.key === "Escape") { explore(""); setKind(""); } }}><svg ref={svg} viewBox={`0 0 ${width} ${height}`} role="group" aria-label="图灵奖得主关系星图，可通过 Tab 选择人物" style={{ touchAction: canPan ? "none" : "auto" }}
        onPointerDown={e => { if (!canPan || !e.isPrimary || e.button !== 0 || (e.target as Element).closest("[data-node]")) return; drag.current = point(e.clientX, e.clientY); e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (!drag.current) return; const next = point(e.clientX, e.clientY), previous = drag.current; setView(v => ({ ...v, x: v.x + next.x - previous.x, y: v.y + next.y - previous.y })); drag.current = next; }}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
        <defs>{people.map(p => <clipPath id={`clip-${p.id}`} key={p.id}><circle r="37" /></clipPath>)}<marker id="mentor-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9" fill="none" stroke={relationKinds.mentor.color} /></marker></defs>
        <g transform={`translate(${view.x},${view.y}) scale(${view.scale})`}>
          {groups.map(f => <g key={f.id} className="graph-field" transform={`translate(${f.x},${f.y})`}><text fill={f.color} textAnchor="middle">{f.label}</text><text y="26" textAnchor="middle" className="graph-field-en">{f.english}</text></g>)}
          {edges.map(r => {
            const a = positions.get(r.from)!, b = positions.get(r.to)!, dx = b.x - a.x, dy = b.y - a.y, distance = Math.hypot(dx, dy);
            const type = r.evidence[0].kind, style = relationKinds[type];
            return <g key={`${r.from}-${r.to}`} className={`graph-edge ${selected && r.from !== selected && r.to !== selected ? "faded" : ""}`}><line x1={a.x + dx / distance * 48} y1={a.y + dy / distance * 48} x2={b.x - dx / distance * 52} y2={b.y - dy / distance * 52} style={{ stroke: style.color, strokeDasharray: style.dash }} markerEnd={type === "mentor" ? "url(#mentor-arrow)" : undefined} /><title>{`${name(r.from)} · ${name(r.to)}：${r.evidence.map(e => e.label).join("、")}`}</title></g>;
          })}
          {nodes.map(p => <g key={p.id} data-node={p.id} role="button" tabIndex={0} aria-label={`${name(p.id)}，${p.tag}，显示关联`} aria-pressed={selected === p.id} className={`graph-node ${selected === p.id ? "selected" : ""} ${selected && !connected.has(p.id) ? "faded" : ""}`} transform={`translate(${p.x},${p.y})`} onClick={() => pick(p.id)} onDoubleClick={() => router.push(`/laureates/${p.id}`)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(p.id); } }}>
            <circle r="44" className="node-ring" style={{ stroke: fields.find(f => f.id === p.field)!.color }} /><Portrait person={p} round /><text y="68" textAnchor="middle" className="node-name" textLength={name(p.id).length > 17 ? (narrow ? 274 : focus ? 245 : 188) : undefined} lengthAdjust="spacingAndGlyphs">{name(p.id)}</text><text y="94" textAnchor="middle" className="node-tag">{p.tag}</text>
          </g>)}
        </g>
      </svg></div><p className="graph-hint">{focus ? "圆环颜色表示主要研究方向；选择另一人物可继续探索。" : "滚动浏览全部星群，或用上方搜索快速定位人物。"}{canPan ? " 拖动可移动画布。" : " 放大后可拖动画布。"}</p></div>
      {person && <aside ref={inspector} className="graph-inspector" aria-label="人物与关系依据"><div className="graph-selection" aria-live="polite"><p className="eyebrow">SELECTED LAUREATE / {awardByPerson[selected].year}</p><h2>{person.name}</h2><p>{person.contribution}</p><Link className="text-link" href={`/laureates/${selected}`}>阅读人物介绍 <ArrowUpRight size={17} /></Link>{settings.graphExplore && <button className="graph-explore-button" onClick={() => explore(selected)}>以此人为中心探索 →</button>}</div><h3 className="graph-evidence-heading">{links.length} 位关联人物 · {kind ? relationKinds[kind].label : "全部关系"}</h3>{links.length ? <RelationshipList id={selected} links={links} onExplore={settings.graphExplore ? explore : undefined} /> : <p className="content-note">{relations.some(r => r.from === selected || r.to === selected) ? "此筛选下没有关联人物，可切换为“全部关系”。" : "此人物暂无可展示的关联。"}</p>}</aside>}
    </div>
    <div className="graph-legend">{fields.map(f => <span key={f.id}><i style={{ background: f.color }} />{f.label}</span>)}</div>
    <div className="graph-relation-legend">{kinds.map(([key, value]) => <span key={key}><svg width="32" height="12" aria-hidden="true"><line x1="0" y1="6" x2="30" y2="6" stroke={value.color} strokeDasharray={value.dash} />{key === "mentor" && <path d="m 25 2 5 4 -5 4" fill="none" stroke={value.color} />}</svg>{value.label}{key === "mentor" && " · 导师 → 学生"}</span>)}</div>
    <p className="graph-hint">同一对人物可有多种关系，切换关系类型可分别查看。</p>
    <details className="graph-directory-toggle"><summary>文字目录 · 当前 {nodes.length} 位人物</summary><nav className="graph-directory" aria-label="星图人物快捷入口">{nodes.map(p => <Link href={`/laureates/${p.id}`} key={p.id}>{name(p.id)} ↗</Link>)}</nav></details>
  </>;
}
