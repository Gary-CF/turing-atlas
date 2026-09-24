import Link from "@/components/site-link";
import { ArrowUpRight } from "lucide-react";
import { people, settings } from "@/lib/content";
import Archive from "@/components/archive";
import Hero from "@/components/hero";

export default function Home() {
  return <main id="main" className="wrap">
    <Hero />
    <div className="archive-bar" id="archive"><div><span className="eyebrow">THE ARCHIVE</span><h2>群星纪年 <span> / {people.length} 位图灵奖得主</span></h2></div>
      {settings.graph && <Link className="text-link" href="/constellation">探索人物星图 <ArrowUpRight size={18} /></Link>}
    </div>
    <Archive />
  </main>;
}
