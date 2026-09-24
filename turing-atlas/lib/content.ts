import roster from "./roster.json";
import awardYears from "./award-years.json";
import { research } from "./research";
import { createRelations } from "./relationships";

export const settings = { portraits: true, lineArtPortraits: true, deepProfiles: true, fullCatalog: true, directoryFilters: true, graph: true, graphExplore: true, graphAwardYears: true, quotes: true, graphZoom: true, graphPan: true, minZoom: 0.7, maxZoom: 4 };
export const checkedAt = "2026-09-24";
const acm = "https://awards.acm.org/binaries/content/assets/awards/awards-booklet-2019.pdf";
const rlAward = "https://awards.acm.org/award_winners/barto_9471663";
const unix = "https://www.nokia.com/bell-labs/about/dennis-m-ritchie/cacm.html";
const perlisQuotes = "https://cs.yale.edu/homes/perlis-alan/quotes.html";
const hammingTalk = "https://www.cs.virginia.edu/~robins/YouAndYourResearch";
const humble = "https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html";
const bartoHome = "https://people.cs.umass.edu/~barto/";
export type Material = { year: number; dateLabel?: string; authors?: string; title: string; kind: string; url: string; note: string; access: string };
export type Person = { id: string; name: string; chinese: string; years: string; field: string; tag: string; contribution: string; bio: string[]; basic?: boolean; home?: string; homeLabel?: string; source: string; sources?: { label: string; url: string }[]; reviewedAt?: string; response?: { title: string; url: string; note: string }; quote?: { text: string; translation: string; url: string; context: string }; materials: Material[]; lecture?: number; x: number; y: number };
const material = (year: number, title: string, kind: string, url: string, note: string, access = "英文 · 原文") => ({ year, title, kind, url, note, access });
const book = material(2018, "Reinforcement Learning: An Introduction", "书籍 · 第二版", "https://www.incompleteideas.net/book/the-book-2nd.html", "从价值函数、时间差分到策略梯度，建立强化学习的完整概念框架。第一版发表于 1998 年。", "英文 · 作者提供电子版");
const unixPaper = material(1974, "The UNIX Time-Sharing System", "论文", unix, "从文件、进程与接口理解 Unix 的简洁设计。链接为作者保存的 1978 年修订版。");
const featuredPeople: Person[] = [
  { id: "alan-perlis", name: "Alan J. Perlis", chinese: "艾伦·佩利斯", years: "1922—1990", field: "languages", tag: "编程语言", contribution: "推动高级程序设计技术与编译器构造，让编程成为一门学科。", source: "https://awards.acm.org/award_winners/perlis_0132439.cfm", home: "https://www.cs.yale.edu/admin/perlismain.html", homeLabel: "耶鲁纪念页面", x: 230, y: 200,
    bio: ["Perlis 是首届图灵奖得主。他在卡内基理工学院及后来的耶鲁大学从事编程语言与计算机科学教育，参与了高级语言发展初期的重要工作。", "他既关注编译器与语言设计，也关心程序员如何思考。晚年的编程箴言把数十年的研究经验压缩成短句，保留了对抽象、复杂性与习惯的敏锐观察。"],
    quote: { text: "Simplicity does not precede complexity, but follows it.", translation: "简洁不是复杂的先导，而是复杂之后的结果。", url: perlisQuotes, context: "Epigrams in Programming · 第 31 条，1982" },
    materials: [material(1967, "The Synthesis of Algorithmic Systems", "图灵奖演讲 · 发表版", "https://doi.org/10.1145/321371.321372", "回到高级语言兴起的年代，理解算法系统如何成为独立的研究对象。", "英文 · 出版社页面"), material(1982, "Epigrams in Programming", "短文", perlisQuotes, "用极短的篇幅反思语言、抽象和复杂性，适合反复阅读。"), material(1984, "Foreword to Structure and Interpretation of Computer Programs", "序言", "https://sicp.sourceacademy.org/chapters/foreword84.html", "从 Perlis 的视角理解程序设计教育，以及语言如何帮助组织复杂思想。", "英文 · 序言重刊")], lecture: 0 },
  { id: "richard-hamming", name: "Richard W. Hamming", chinese: "理查德·汉明", years: "1915—1998", field: "theory", tag: "纠错编码", contribution: "在数值方法、自动编码系统及检错纠错码方面作出奠基性贡献。", source: acm, x: 190, y: 430,
    bio: ["Hamming 长期在贝尔实验室研究计算与通信中的数学问题。他的名字留在汉明码、汉明距离等概念中：即使数据出现错误，信息仍有机会被正确恢复。", "在研究之外，他持续思考怎样选择有意义的问题。《You and Your Research》把注意力转向研究者的习惯、勇气与时间分配。"],
    quote: { text: "If you do not work on an important problem, it's unlikely you'll do important work.", translation: "如果不研究重要的问题，就很难做出重要的工作。", url: hammingTalk, context: "You and Your Research · 1986" },
    materials: [material(1950, "Error Detecting and Error Correcting Codes", "论文", "https://doi.org/10.1002/j.1538-7305.1950.tb00463.x", "了解冗余如何变成可靠性，以及编码理论的基本问题。", "英文 · 出版社页面"), material(1969, "One Man’s View of Computer Science", "图灵奖演讲 · 发表版", "https://doi.org/10.1145/321495.321497", "从早期计算实践出发，思考计算机科学的边界与研究目标。", "英文 · 出版社页面"), material(1986, "You and Your Research", "演讲 · 文字稿", hammingTalk, "关于选题、研究品味与长期积累的直接建议，适合研究生和研究人员。")], lecture: 1 },
  { id: "edsger-dijkstra", name: "Edsger W. Dijkstra", chinese: "艾兹格·迪杰斯特拉", years: "1930—2002", field: "languages", tag: "程序正确性", contribution: "推动结构化程序设计，以严谨的推理应对程序的复杂性。", source: "https://www.cs.utexas.edu/~EWD/", home: "https://www.cs.utexas.edu/~EWD/", homeLabel: "手稿档案", x: 410, y: 155,
    bio: ["Dijkstra 从荷兰早期计算实践走向算法、操作系统与程序设计方法研究。他的工作将程序的构造与正确性推理紧密联系起来。", "他认为人的思维能力有限，程序结构应当帮助我们理解问题。他留下的大量 EWD 手稿，记录了这种简洁而严格的思考方式。"],
    quote: { text: "We must be very careful when we give advice to younger people; sometimes they follow it!", translation: "给年轻人建议时要十分谨慎；有时他们真的会照做！", url: humble, context: "The Humble Programmer · 1972，节选" },
    materials: [material(1968, "Go To Statement Considered Harmful", "论文", "https://www.cs.utexas.edu/~EWD/transcriptions/EWD02xx/EWD215.html", "理解程序控制结构为何会影响可读性与正确性推理。"), material(1972, "The Humble Programmer", "图灵奖演讲", humble, "从计算机速度与人类认知的差异出发，理解为什么编程需要克制与纪律。"), material(1974, "On the Role of Scientific Thought", "手稿", "https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD447.html", "理解关注点分离：暂时只聚焦问题的一个方面，也是一种有效的思考方法。")], lecture: 1 },
  { id: "donald-knuth", name: "Donald E. Knuth", chinese: "唐纳德·克努特", years: "1938—", field: "theory", tag: "算法分析", contribution: "系统建立算法分析方法，以《计算机程序设计艺术》塑造学科基础。", source: "https://amturing.acm.org/award_recipient/knuth_1013846.cfm", home: "https://www-cs-faculty.stanford.edu/~knuth/", x: 370, y: 385,
    bio: ["Knuth 是斯坦福大学荣休教授。他通过《计算机程序设计艺术》把算法、数据结构与数学分析组织成可持续发展的知识体系。", "他也创造了 TeX 排版系统，并倡导文学化编程：程序除了交给机器执行，也应当向人清楚地解释自己的意图。"],
    quote: { text: "Premature optimization is the root of all evil (or at least most of it) in programming.", translation: "在编程中，过早优化是万恶之源（至少是大多数弊病的根源）。", url: "https://www.cs.tufts.edu/~nr/cs257/archive/don-knuth/as-an-art.pdf", context: "Computer Programming as an Art · 1974，节选；讨论优化的时机与位置" },
    materials: [material(1968, "The Art of Computer Programming", "书籍 · 持续修订", "https://www-cs-faculty.stanford.edu/~knuth/taocp.html", "从基本算法到组合问题，观察一个问题如何被精确定义、分析和实现。", "英文 · 作者书目与勘误"), material(1974, "Computer Programming as an Art", "图灵奖演讲", "https://www.cs.tufts.edu/~nr/cs257/archive/don-knuth/as-an-art.pdf", "理解程序设计中严谨、审美与创造力之间的关系。", "英文 · PDF"), material(1984, "Literate Programming", "论文", "https://www-cs-faculty.stanford.edu/~knuth/lp.html", "思考如何让程序的组织服务于人的理解，而不只是执行顺序。", "英文 · 作者书目与论文信息")], lecture: 1 },
  { id: "ken-thompson", name: "Ken Thompson", chinese: "肯·汤普森", years: "1943—", field: "systems", tag: "UNIX", contribution: "与 Dennis Ritchie 共同发展操作系统理论，并实现 Unix 操作系统。", source: "https://sigops.hosting.acm.org/about/history/", x: 645, y: 180,
    bio: ["Thompson 在贝尔实验室创建了早期 Unix，并与 Ritchie 等研究者共同推进它的发展。围绕文件、进程和小工具的设计成为理解现代系统的重要起点。", "他在图灵奖演讲中展示了一个深刻问题：即使源代码看起来正确，编译工具也可能破坏信任。这个思想至今仍适用于软件供应链。"],
    materials: [unixPaper, material(1984, "Reflections on Trusting Trust", "图灵奖演讲 · 发表版", "https://doi.org/10.1145/358198.358210", "理解编译器如何把隐藏行为传递给后续程序，重新审视工具链的信任边界。", "英文 · 出版社页面"), material(2024, "Oral History of Ken Thompson", "口述历史 · 2024 录制", "https://computerhistory.org/blog/a-computing-legend-speaks/", "从 Unix、计算机国际象棋到 Go，听创造者回顾设计背后的环境与选择。2025 年公开。", "英文 · 视频与文字稿入口")], lecture: 1 },
  { id: "dennis-ritchie", name: "Dennis M. Ritchie", chinese: "丹尼斯·里奇", years: "1941—2011", field: "systems", tag: "C · UNIX", contribution: "与 Ken Thompson 共同发展 Unix；创造 C 语言，连接语言与系统。", source: "https://www.nokia.com/bell-labs/about/dennis-m-ritchie/", home: "https://www.nokia.com/bell-labs/about/dennis-m-ritchie/", homeLabel: "个人主页存档", x: 710, y: 375,
    bio: ["Ritchie 于 1967 年加入贝尔实验室，与 Thompson 等人共同开发 Unix。他创造的 C 语言为系统软件提供了贴近机器、同时具有可移植性的表达方式。", "他保存的论文与历史材料展示了语言和操作系统如何一起演进。1983 年的图灵奖表彰重点是他与 Thompson 对操作系统理论及 Unix 实现的贡献。"],
    materials: [unixPaper, material(1984, "Reflections on Software Research", "图灵奖演讲 · 发表版", "https://doi.org/10.1145/358198.358207", "从 Unix 的经验理解软件研究与实践之间相互推动的关系。", "英文 · 出版社页面"), material(1993, "The Development of the C Language", "历史回顾", "https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html", "由创造者回顾 C 的设计取舍，理解语言如何受到硬件与真实需求的影响。")], lecture: 1 },
  { id: "andrew-barto", name: "Andrew G. Barto", chinese: "安德鲁·巴托", years: "1948—", field: "ai", tag: "强化学习", contribution: "与 Richard Sutton 奠定强化学习的概念与算法基础。", source: rlAward, home: bartoHome, x: 985, y: 180,
    bio: ["Barto 在马萨诸塞大学阿默斯特分校研究机器与动物如何学习。他与博士生 Sutton 结合心理学、控制理论与计算，推进了现代强化学习。", "他关注算法与动物学习之间的联系，也研究内在动机：智能体如何通过主动探索，为未来任务积累知识与技能。"],
    quote: { text: "It is important to understand how new developments relate to what others have done in the past.", translation: "理解新的进展与前人工作的联系，是很重要的。", url: bartoHome, context: "个人主页 · Research Interests，日期未标注" },
    materials: [material(1983, "Neuronlike Adaptive Elements That Can Solve Difficult Learning Control Problems", "论文 · 与 Sutton、Anderson 合作", "https://doi.org/10.1109/TSMC.1983.6313077", "从早期控制实验观察学习、评价与行动如何组成反馈回路。", "英文 · 出版社页面"), book, material(2025, "Richard S. Sutton and Andrew G. Barto: 2024 Turing Award Recipients", "CACM 获奖人物访谈", "https://www.youtube.com/watch?v=RrXibq7-W6o", "结合获奖背景，听两位研究者讨论强化学习的来路与研究思想。", "英文 · 视频")] },
  { id: "richard-sutton", name: "Richard S. Sutton", chinese: "理查德·萨顿", years: "1957—", field: "ai", tag: "时间差分学习", contribution: "与 Andrew Barto 奠定强化学习基础，推进从交互经验中学习。", source: rlAward, home: "http://www.incompleteideas.net/", x: 965, y: 400,
    bio: ["Sutton 在 Barto 指导下完成博士研究，随后持续研究智能体如何从与环境的交互中学习。时间差分学习是其代表性研究方向。", "他与 Barto 合著的教材成为进入强化学习的重要入口。他的《The Bitter Lesson》则提出关于通用学习方法、搜索与计算规模的研究判断。"],
    materials: [material(1988, "Learning to Predict by the Methods of Temporal Differences", "论文", "https://doi.org/10.1007/BF00115009", "理解如何利用相邻预测之间的差异学习，而不必等待最终结果。", "英文 · 出版社页面"), book, material(2019, "The Bitter Lesson", "短文", "http://www.incompleteideas.net/IncIdeas/BitterLesson.html", "思考通用方法与人为注入知识之间的取舍。应结合具体任务与证据阅读这项研究主张。")] },
];
const featuredAwards = [
  { year: 1966, people: ["alan-perlis"], citation: "高级程序设计技术与编译器构造。", source: featuredPeople[0].source },
  { year: 1968, people: ["richard-hamming"], citation: "数值方法、自动编码系统，以及检错与纠错码。", source: acm },
  { year: 1972, people: ["edsger-dijkstra"], citation: "对程序设计语言的基础性贡献。", source: "https://www.acm.org/binaries/content/assets/press-releases/2012/july/dijkstra-prize-2012a.pdf" },
  { year: 1974, people: ["donald-knuth"], citation: "算法分析与程序设计语言，尤其是《计算机程序设计艺术》系列著作。", source: featuredPeople[3].source },
  { year: 1983, people: ["ken-thompson", "dennis-ritchie"], citation: "发展通用操作系统理论，尤其是 Unix 操作系统的实现。", source: featuredPeople[4].source },
  { year: 2024, people: ["andrew-barto", "richard-sutton"], citation: "奠定强化学习的概念与算法基础。", source: rlAward },
];
export const awards: { year: number; people: string[]; citation: string; source: string; announcedAt?: string }[] = settings.fullCatalog ? awardYears : featuredAwards;
const catalogPeople: Person[] = settings.fullCatalog ? roster.map(p => featuredPeople.find(other => other.id === p.id) ?? {
  ...p, years: "", basic: true, contribution: awards.find(a => a.people.includes(p.id))!.citation,
  bio: [], materials: [], x: 0, y: 0,
}) : featuredPeople;
export const people = catalogPeople.map(p => settings.deepProfiles && research[p.id] ? { ...p, ...research[p.id], basic: false } : p);
export const personById = Object.fromEntries(people.map(p => [p.id, p]));
export const awardByPerson = Object.fromEntries(awards.flatMap(a => a.people.map(id => [id, a])));
export const relations = createRelations(awards, people.map(p => p.id), settings.graphExplore);
export const fields = [
  { id: "languages", label: "语言与程序设计", english: "LANGUAGES", color: "#b4a4da", x: 310, y: 65 },
  { id: "theory", label: "数学与算法", english: "FOUNDATIONS", color: "#8eafca", x: 255, y: 520 },
  { id: "systems", label: "系统与工具", english: "SYSTEMS", color: "#d3b687", x: 680, y: 65 },
  { id: "ai", label: "人工智能", english: "INTELLIGENCE", color: "#8ebbac", x: 985, y: 65 },
  ...(settings.fullCatalog ? [
    { id: "data", label: "数据库", english: "DATA", color: "#9bbdaf", x: 0, y: 0 },
    { id: "networks", label: "网络与 Web", english: "NETWORKS", color: "#88b8ce", x: 0, y: 0 },
    { id: "security", label: "密码与安全", english: "SECURITY", color: "#c49bae", x: 0, y: 0 },
    { id: "graphics", label: "图形与交互", english: "GRAPHICS", color: "#c4b47e", x: 0, y: 0 },
    { id: "quantum", label: "量子信息", english: "QUANTUM", color: "#9eade1", x: 0, y: 0 },
  ] : []),
];
