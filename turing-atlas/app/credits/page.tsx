import Link from "@/components/site-link";
import { portraits } from "@/lib/portraits";

export const metadata = { title: "肖像署名" };

export default function Credits() {
  return <main id="main" className="wrap detail">
    <Link className="back-link" href="/">← 返回人物纪年</Link>
    <p className="eyebrow">PORTRAIT CREDITS</p><h1 className="credits-title">肖像署名</h1>
    <p className="content-note">肖像按各自许可使用，保留原作者权利。页面以灰度和裁切形式展示；项目的 MIT 许可仅适用于代码。</p>
    <div className="credit-list">{[...portraits].sort((a, b) => a.name.localeCompare(b.name)).map(photo => <article key={photo.id}>
      <h2><Link href={`/laureates/${photo.id}`}>{photo.name}</Link></h2><p>{photo.credit}</p>
      <a href={photo.sourcePage} target="_blank" rel="noreferrer">原始图片与授权记录 ↗</a><span> · </span><a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license} ↗</a>
    </article>)}</div>
  </main>;
}
