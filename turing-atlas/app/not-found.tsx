import Link from "@/components/site-link";

export default function NotFound() {
  return <main className="wrap empty-page" id="main"><p className="eyebrow">404 / UNCHARTED</p><h1>这颗星尚未收录。</h1><p>人物链接可能有误，请从人物纪年继续浏览。</p><Link className="text-link" href="/">返回人物纪年 ↗</Link></main>;
}
