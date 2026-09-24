import { notFound } from "next/navigation";
import { settings, people, fields, relations } from "@/lib/content";
import Constellation from "@/components/constellation";

export const metadata = { title: "关系星图" };
export default function GraphPage() {
  if (!settings.graph) notFound();
  return <main id="main" className="wrap graph-page"><p className="eyebrow">A CONSTELLATION OF IDEAS</p><div className="graph-heading"><h1>思想，自有引力。</h1><p>{people.length} 位人物 · {fields.length} 个研究方向 · {relations.length} 组有据关联<br />从共同的工作，到跨越领域的相遇。</p></div><Constellation /></main>;
}
