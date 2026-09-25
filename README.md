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

普通读者直接访问在线网站即可。下面供需要修改、预览代码的贡献者使用，不需要 Docker。

**先选对终端：**在 Windows「命令提示符」中操作，选第一项；在 Ubuntu / WSL 终端（常见提示符为 `用户名@电脑名:~$`）中操作，选第二项。Windows 和 WSL 的 Node.js 是两套环境，必须在实际运行项目的那一套环境里安装。

<details>
<summary>Windows：从安装工具到打开网页</summary>

1. 安装 [Git for Windows](https://git-scm.com/downloads/win)。打开 [Node.js 下载页](https://nodejs.org/en/download)，选择 **24 LTS → Windows → Windows Installer (.msi)** 并安装。跳过页面中的 Docker 命令，npm 会随 Node.js 一起安装。
2. 安装后关闭旧终端。按 `Win + R`，输入 `cmd` 并回车，打开新的「命令提示符」。逐行执行：

```bat
node -v
npm -v
git --version
```

`node -v` 应显示 `v24.x.x`，另外两行也应显示版本号。若提示命令不存在或仍是 `v18`，先解决安装或终端版本问题，再继续。

3. 在同一终端中逐行执行：

```bat
git clone https://github.com/Gary-CF/turing-atlas.git
cd turing-atlas\turing-atlas
npm ci
npm run dev
```

</details>

<details>
<summary>Ubuntu / WSL：从安装工具到打开网页</summary>

以下命令全部在 **Ubuntu / WSL 终端**中执行，逐段复制；一段成功后再执行下一段。不要在 Windows 的 PowerShell 中执行。

1. 安装下载工具和 Git。`sudo` 提示密码时输入 Ubuntu 用户密码；输入时不显示字符是正常的。

```bash
sudo apt update && sudo apt install -y curl ca-certificates git
```

2. 安装并载入 [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)（用于安装、切换 Node.js）：

```bash
export NVM_DIR="$HOME/.nvm"
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh -o /tmp/turing-atlas-nvm-install.sh && bash /tmp/turing-atlas-nvm-install.sh
. "$NVM_DIR/nvm.sh"
```

3. 在同一终端安装并启用 Node.js 24。**这一步不要加 `sudo`**，也不要使用 `apt nvm`：

```bash
nvm install 24 && nvm use 24
node -v
npm -v
```

`node -v` 必须显示 `v24.x.x` 后再继续。如果仍是 `v18` 或出现 `nvm: command not found`，说明前一步没有成功，先检查前一步的报错。

4. 下载项目并启动：

```bash
git clone https://github.com/Gary-CF/turing-atlas.git
cd turing-atlas/turing-atlas
npm ci
npm run dev
```

已经下载过代码的，请先按 `Ctrl + C` 停止旧预览，跳过 `git clone`，进入已有项目中包含 `package.json` 的内层目录并更新源码。例如：

```bash
cd ~/projects/turing-atlas/turing-atlas
git pull --ff-only
nvm use 24
npm ci
npm run dev
```

</details>

**成功标志：**终端出现 `Local: http://localhost:5173/`。保持终端开启，在这台电脑的浏览器中访问该地址（WSL 用户也可用 Windows 浏览器）。若端口被占用，以终端输出的地址为准；按 `Ctrl + C` 停止服务。

**更新已有项目（所有系统）：**本地预览不会自动同步在线网站。先停止旧服务，在项目目录执行 `git pull --ff-only`，成功后再执行 `npm ci` 和 `npm run dev`。若 Git 提示本地修改冲突，先保留并处理修改，不要强制覆盖。`npm ci` 只安装依赖，不会更新项目源码；若启动时改用了其他端口，请打开终端显示的新地址。

下载源码和安装依赖需要联网。若看到 `styleText` 或 `EBADENGINE`，先在同一终端执行 `node -v`；Node.js 18 不受支持，切换到 24 后重新执行 `npm ci`。若使用远程服务器，则需通过端口转发访问，浏览器中的 `localhost` 默认指向你自己的电脑。

## 许可

原创代码采用 [MIT](LICENSE) 许可。肖像及其他第三方材料保留各自许可，详见 [NOTICE](NOTICE) 与[肖像署名记录](turing-atlas/lib/portraits.json)。本项目为独立策展，非 ACM 官方网站。
