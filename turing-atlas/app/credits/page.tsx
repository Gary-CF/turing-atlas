import Link from "@/components/site-link";
import { portraits } from "@/lib/portraits";

export const metadata = { title: "肖像署名" };

export default function Credits() {
  return <main id="main" className="wrap detail">
    <Link className="back-link" href="/">← 返回人物纪年</Link>
    <p className="eyebrow">PORTRAIT CREDITS</p><h1 className="credits-title">肖像署名</h1>
    <p className="content-note">黑金线描肖像为 AI 绘制的艺术化形象。使用参考图的作品保留原作者署名与适用许可；项目的 MIT 许可仅适用于代码。</p>
    <div className="credit-list">{[...portraits].sort((a, b) => a.name.localeCompare(b.name)).map(photo => <article key={photo.id}>
      <h2><Link href={`/laureates/${photo.id}`}>{photo.name}</Link></h2><p>{photo.credit}</p>
      <a href={photo.sourcePage} target="_blank" rel="noreferrer">{photo.license ? "参考图片与授权记录" : "人物资料"} ↗</a>{photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license} ↗</a></>}
    </article>)}</div>
  </main>;
}
