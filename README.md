<h1 align="center">Turing Atlas</h1>
<p align="center"><strong>图灵奖得主 · 群星纪年</strong></p>
<p align="center">沿着思想的轨迹，走近改变计算的人。</p>

<p align="center"><a href="https://turing-laureates-atlas.garychencf98.chatgpt.site"><strong>在线访问 Turing Atlas →</strong></a></p>
<p align="center">直接打开即可浏览，无需安装 Node.js、npm 或下载代码。</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-d3b687" alt="Code License: MIT"></a>
  <a href="https://github.com/Gary-CF/turing-atlas/actions/workflows/ci.yml"><img src="https://github.com/Gary-CF/turing-atlas/actions/workflows/ci.yml/badge.svg" alt="Build"></a>
</p>

<p align="center">
  <a href="#功能">功能</a> · <a href="#动机">动机</a> · <a href="#本地开发可选">本地开发</a> · <a href="#许可">许可</a>
</p>

---

一个探索图灵奖得主、代表贡献与思想关联的开源网页。以简约星空、暖金色标题和「Hello World!」打字机效果，呈现计算机科学的群星纪年，支持桌面与移动端浏览。

## 功能

- **人物纪年**：按获奖年份浏览得主、肖像、代表贡献与有出处的名言，支持姓名、年份、贡献搜索及研究方向筛选。
- **人物档案**：了解生平与获奖成果，查阅图灵奖演讲、获奖回应及个人主页等资料。
- **精选阅读**：按时间整理访谈、论文、书籍与演讲，附简要介绍和原始链接。
- **关系星图**：按研究领域探索人物及其师生、合作、共同获奖关系；支持搜索、筛选、缩放与拖动，单击查看关联，双击进入人物页。

## 动机

人类的群星闪耀时，自我第一次读到茨威格这本传记时就被深深打动。人来人往，潮起潮落，大多数人都被遗忘，而那些在他们有限的生命里竭力做出璀璨而有意义贡献的先驱，却如同灯塔一般长久地矗立着。

图灵奖一路走来，见证了计算机领域的成长和变革。我想我们可以从这些图灵奖得主的人生轨迹和分享中探看到这个领域更深层的东西。

我们需要时不时停下来思考这个世界上别人做了什么事，尤其是那些做出精彩贡献的人，追问他们是怎么做通的，然后理解事物运行的规律。

然后，我们便可以在自己叩问世界的路途上，理解他们口中的“Hello World!”，做出一些属于我们自己的杰出的发现。

## 本地开发（可选）

<details>
<summary>仅在修改代码时需要 Node.js 和 npm，浏览网站无需安装。</summary>

使用 Node.js 24（附带 npm）：

```bash
git clone https://github.com/Gary-CF/turing-atlas.git
cd turing-atlas/turing-atlas
npm ci
npm run dev
```

打开 [http://localhost:5173](http://localhost:5173)。

</details>

## 许可

原创代码采用 [MIT](LICENSE) 许可。肖像及其他第三方材料保留各自许可，详见 [NOTICE](NOTICE) 与[肖像署名记录](turing-atlas/lib/portraits.json)。本项目为独立策展，非 ACM 官方网站。
