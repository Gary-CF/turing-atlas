import materials from "./research-materials.json";

export const relationKinds = {
  mentor: { label: "博士指导", color: "#c1abe8", dash: "3 5" },
  collaboration: { label: "研究合作", color: "#8bc8bc", dash: "9 5" },
  award: { label: "共同获奖", color: "#d3b687", dash: "" },
};
export type RelationKind = keyof typeof relationKinds;
export type Evidence = { kind: RelationKind; label: string; note: string; source: string };
export type Relation = { from: string; to: string; evidence: Evidence[] };
const link = (from: string, to: string, kind: RelationKind, note: string, source: string, label = relationKinds[kind].label): Relation => ({ from, to, evidence: [{ kind, label, note, source }] });
const pairs = (ids: string[]) => ids.flatMap((from, i) => ids.slice(i + 1).map(to => [from, to]));
const mit = "https://news.mit.edu/2013/goldwasser-and-micali-win-turing-award-0313";
const mccarthy = "https://ai.stanford.edu/~nilsson/John_McCarthy.pdf";
const base = [
  link("andrew-barto", "richard-sutton", "mentor", "Andrew Barto 指导 Richard Sutton 的博士研究；其主页列出 Sutton 于 1984 年毕业。", "https://people.cs.umass.edu/~barto/"),
  link("ken-thompson", "dennis-ritchie", "collaboration", "共同撰写 The UNIX Time-Sharing System，记录 Unix 的设计与实现。", "https://www.nokia.com/bell-labs/about/dennis-m-ritchie/cacm.html"),
];
const mentors = [
  link("manuel-blum", "shafi-goldwasser", "mentor", "Manuel Blum 是 Shafi Goldwasser 在加州大学伯克利分校的博士论文导师。", mit),
  link("manuel-blum", "silvio-micali", "mentor", "Manuel Blum 是 Silvio Micali 在加州大学伯克利分校的博士论文导师。", mit),
  link("john-mccarthy", "barbara-liskov", "mentor", "John McCarthy 指导 Barbara Liskov 的博士研究；Nilsson 撰写的传记第 21 页列有其姓名。", mccarthy),
  link("john-mccarthy", "raj-reddy", "mentor", "John McCarthy 指导 Raj Reddy 的博士研究；Nilsson 撰写的传记第 21 页列有其姓名。", mccarthy),
  link("marvin-minsky", "manuel-blum", "mentor", "Manuel Blum 在 ACM 口述访谈中回忆 Marvin Minsky 成为自己的博士论文导师。", "https://amturing.acm.org/pdf/BlumTuringTranscript.pdf"),
  link("ivan-sutherland", "edwin-catmull", "mentor", "Ivan Sutherland 是 Edwin Catmull 在犹他大学攻读博士期间的导师之一；Catmull 于 1974 年获得博士学位。", "https://www.price.utah.edu/2020/03/18/catmull-to-receive-turing-award"),
  link("herbert-simon", "edward-feigenbaum", "mentor", "George Baylor 在 CMU 的回忆中记述：Feigenbaum 在 Simon 指导下，以 EPAM 模型开展博士研究。", "https://www.cs.cmu.edu/simon/all.html"),
];
// Explicit author groups avoid mistaking a shared reading recommendation for collaboration.
const papers: [keyof typeof materials, string[]][] = [
  ["allen-cocke-dataflow", ["frances-allen", "john-cocke"]],
  ["blum-micali", ["manuel-blum", "silvio-micali"]],
  ["goldwasser-signature", ["shafi-goldwasser", "silvio-micali", "ronald-rivest"]],
  ["gmw", ["silvio-micali", "avi-wigderson"]],
  ["thacker-alto", ["butler-lampson", "charles-thacker"]],
  ["symbols-search", ["allen-newell", "herbert-simon"]],
  ["rabin-scott-automata", ["michael-rabin", "dana-scott"]],
  ["hopcroft-tarjan-planarity", ["john-hopcroft", "robert-tarjan"]],
  ["hartmanis-stearns-complexity", ["juris-hartmanis", "richard-stearns"]],
  ["simula", ["ole-johan-dahl", "kristen-nygaard"]],
  ["rsa", ["ronald-rivest", "adi-shamir", "leonard-adleman"]],
  ["tcp", ["vinton-cerf", "robert-kahn"]],
  ["clarke-emerson", ["edmund-clarke", "allen-emerson"]],
  ["diffie-hellman", ["whitfield-diffie", "martin-hellman"]],
  ["architecture-lecture", ["john-hennessy", "david-patterson"]],
  ["deep-learning", ["yann-lecun", "yoshua-bengio", "geoffrey-hinton"]],
  ["aho-ullman-translation", ["alfred-aho", "jeffrey-ullman"]],
  ["bb84", ["charles-bennett", "gilles-brassard"]],
];

export function createRelations(awards: { year: number; people: string[]; citation: string; source: string }[], ids: string[], expanded: boolean) {
  const extra = expanded ? [...mentors,
    link("marvin-minsky", "john-mccarthy", "collaboration", "1959 年，Minsky 与 McCarthy 共同创建 MIT 人工智能项目。", "https://news.mit.edu/2016/marvin-minsky-obituary-0125", "共同创建 · MIT AI 项目"),
    link("andrew-barto", "richard-sutton", "collaboration", "共同撰写 Reinforcement Learning: An Introduction；此处链接为 2018 年第二版。", "https://www.incompleteideas.net/book/the-book-2nd.html"),
    ...papers.flatMap(([id, authors]) => { const m = materials[id]; return pairs(authors).map(([from, to]) => link(from, to, "collaboration", `共同署名：${m.title}（${m.year}）。`, m.url)); }),
  ] : [];
  const joint = awards.flatMap(a => pairs(a.people).map(([from, to]) => link(from, to, "award", `同获 ${a.year} 年度图灵奖。${a.citation}`, a.source, `${a.year} · 共同获奖`)));
  const grouped = new Map<string, Relation>();
  for (const r of [...base, ...extra, ...joint]) {
    if (!ids.includes(r.from) || !ids.includes(r.to)) continue;
    const key = [r.from, r.to].sort().join("/");
    const existing = grouped.get(key);
    if (existing) existing.evidence.push(...r.evidence);
    else grouped.set(key, { ...r, evidence: [...r.evidence] });
  }
  return [...grouped.values()];
}
