import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Orbit } from "lucide-react";
import { settings } from "@/lib/content";

export const metadata: Metadata = {
  title: { default: "Turing Award Laureates · 群星纪年", template: "%s · Turing Laureates" },
  description: "沿着思想的轨迹，走近改变计算的人。图灵奖得主、精选研究资料与人物关系星图。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <a className="skip-link" href="#main">跳到正文</a>
        <header className="site-header wrap"><Link href="/" className="brand"><Orbit size={24} strokeWidth={1.2} /><span>TURING <b>LAUREATES</b></span></Link><nav aria-label="主导航"><Link href="/">人物纪年</Link>{settings.graph && <Link href="/constellation">关系星图 <span>↗</span></Link>}</nav></header>
        {children}
        <footer className="site-footer wrap"><span>TURING AWARD LAUREATES</span><p>独立策展 · 非 ACM 官方网站 · <Link href="/credits">肖像署名</Link></p><span>1966 — ∞</span></footer>
      </body>
    </html>
  );
}
