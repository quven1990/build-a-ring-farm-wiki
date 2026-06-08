# 2026-06-07 站点问题复盘 — 无 CSS、Calculator 体验、部署缓存

> buildaring.online 当天排查与修复的记录。  
> 目的：记下**我们之前犯过的错**，避免下次部署或改 UI 时再踩一遍。

---

## 一、问题清单（当天解决了什么）

| 问题 | 用户侧表现 | 状态 |
|------|-----------|------|
| 间歇性「无 CSS」 | 页面有 HTML 内容，但样式全丢，像裸页 | ✅ 已修（首页短缓存 + 部署后 Purge） |
| Calculator 手机/PC 体验差 | 调参数时看不到收益；PC sticky 不生效 | ✅ 已修（布局重排 + 底部栏 + sticky 修复） |
| Calculator 公式/金额乱码 | 公式区符号异常、金额显示怪 | ✅ 已修（ASCII 公式 + 去掉渐变裁剪字） |
| `removeChild` JS 报错 | 控制台报错，偶发交互异常 | ✅ 已修（`translate="no"`） |
| Cloudflare Purge 未生效 | 部署后旧 HTML 仍可能被 CDN 命中 | ✅ 需 Token 加 Cache Purge 权限后验证 |

相关 commit（`main`）：

- `5e42551` — 首页 HTML 短缓存 + CI 部署后 Purge
- `f10bf68` — 防浏览器自动翻译破坏 React DOM
- `df76621` — Calculator UX + Update Log 条目
- `16f9cb5` — 空推验证 Purge Token 权限

---

## 二、我们之前犯过的错（按类别）

### 1. 部署与 CDN 缓存

**错在哪**

- Next.js 每次 build 都会给 CSS/JS 换 **新 hash 路径**（`/_next/static/chunks/xxx.css`），旧文件部署后就不存在了。
- 站点 HTML 却被 Cloudflare **长时间缓存**（部分页面 `s-maxage=31536000`，约 1 年）。
- 部署后没有 **主动 Purge CDN**，访客可能拿到「旧 HTML + 新静态资源目录」的组合 → HTML 里引用的 CSS 404 → **有内容无样式**。
- 第一版只给 **首页 `/`** 加了短缓存（`s-maxage=300`），其它 HTML 路由仍是长缓存；若 Purge 失败，从 `/calculator`、`/seeds` 等入口进仍可能中招。

**正确做法**

- 部署后：**Purge Everything**（CI 自动化）或接受 HTML 较短 CDN TTL。
- `/_next/static/*` 可以长期 `immutable`（文件名带 hash，变了就是新 URL）。
- **HTML 和静态资源必须同版本**，不能一个缓存一年、一个每次部署都变。

**Cloudflare Token 的错**

- GitHub Actions 用的 Token 只有 **Workers Scripts: Edit**，没有 **Zone → Cache Purge → Purge**。
- Purge 步骤用了 `continue-on-error: true`，失败只打 warning，**容易以为部署成功就万事大吉**。
- 还缺 **Zone → Read** 时，CI 无法解析 `buildaring.online` 的 zone id，Purge 会直接 skip。

**需在 Cloudflare / GitHub 确认的**

- Token 权限：Account Workers Scripts Edit + Zone Cache Purge Purge + Zone Read + Workers Routes Edit（zone: buildaring.online）。
- GitHub Secret `CLOUDFLARE_API_TOKEN` 已换成新 Token。
- Actions 里 **Purge Cloudflare CDN cache** 步骤出现 `"success":true` 和 `CDN cache purged`。

---

### 2. Calculator UI / CSS 实现

**错在哪 — sticky 不生效**

- Calculator 外层 `<section>` 用了 `overflow-hidden`（为了裁切背景渐变）。
- **祖先元素有 `overflow-hidden` 时，子元素的 `position: sticky` 会失效** — PC 端右侧 Earnings 面板看起来写了 sticky，实际不吸顶。

**错在哪 — 移动端顶栏方案**

- 在站点 Header（`h-16`）下面又加一层 sticky 顶栏 → **双层顶栏**，小屏信息挤、换行丑。
- 配置区很长，收益在 DOM 下方 → 首屏看不到结果，体验差。

**错在哪 — IntersectionObserver**

- `rootMargin: "-4rem 0px 0px 0px"` — **IntersectionObserver 不支持 rem**，只支持 `px` 或 `%`，直接 Runtime SyntaxError。

**后来的改法（教训）**

- 去掉 section 上的 `overflow-hidden`，渐变放到单独 `absolute` 层。
- 手机：**收益卡片置顶** + 滚出视口后 **底部固定栏**（拇指区），不用顶部第二条 sticky。
- PC：左配置 / 右 sticky 收益；`rootMargin` 用 `-64px`（对应 header 高度）。

---

### 3. Calculator「乱码」（不是 CSS 404）

**错在哪**

- 公式里用了 Unicode 数学符号（如 `×`、特殊减号）和 Emoji。
- 金额用了 `bg-clip-text text-transparent` 渐变字 — 部分字体/浏览器下渲染异常，像乱码。
- 明细表用 `×` 等字符，fallback 字体不一致时也会怪。

**正确做法**

- 公式区用 **ASCII**：`*`、`-`、`floor(Saw * 2/3)`。
- 金额用普通 `text-primary`，图标用 Lucide，不用 Emoji 当 UI 主视觉。

**教训**：工具页、数据页优先 **可读性 + 字体无关**，少玩花活。

---

### 4. 浏览器自动翻译 vs React

**错在哪**

- 未对交互-heavy 页面标记 `translate="no"`。
- Chrome 自动翻译会 **改 DOM 结构**，React  reconciliation 时对不上 → `removeChild` 等报错。

**正确做法**

- Calculator、mutations 等工具页加 `translate="no"`（或站点级策略），减少翻译插件/浏览器翻译破坏 hydration。

---

### 5. 内容与 SEO 流程上的误判

**Update Log vs `/updates`**

- `/build-a-ring-update-log` = **站点维护 changelog**（无 CSS、Calculator 等）。
- `/updates` = **游戏补丁 / 兑换码新闻**（Update 4、Update 5）。
- 差点把站点改动写进游戏 updates — **频道要分开**。

**Sitemap**

- 以为 Update Log 不在 sitemap 里 — 实际已在 `lib/seo-routes.ts` 的 `guideRoutes`，线上 `sitemap.xml` 可搜到 `build-a-ring-update-log`。
- **教训**：改 SEO 相关前先 `curl https://buildaring.online/sitemap.xml` 或看代码，别凭印象。

---

## 三、根因一句话总结

| 现象 | 根因 |
|------|------|
| 无 CSS | CDN 缓存的旧 HTML 引用已删除的 `/_next/static/*.css` |
| PC sticky 无效 | 祖先 `overflow-hidden` |
| 移动端体验差 | 信息顺序 + 双 sticky 顶栏 |
| IO 报错 | `rootMargin` 用了 rem |
| 公式乱码 | Unicode/Emoji/渐变裁剪字，非资源 404 |
| removeChild | 浏览器翻译改 DOM |
| Purge 不工作 | API Token 缺 Cache Purge 权限 |

---

## 四、以后部署 Checklist

每次 push `main` 部署后：

- [ ] GitHub Actions **Deploy to Cloudflare Workers** 全绿
- [ ] **Purge Cloudflare CDN cache** 步骤：`"success":true`
- [ ] 无痕打开 `/` 和 `/calculator`，确认有样式、Calculator 底部栏/右侧 sticky 正常
- [ ] 若 Purge warning：检查 Token 权限或 Dashboard 手动 Purge Everything 一次

改 Calculator 或带 sticky 的页面时：

- [ ] 祖先链上避免 `overflow-hidden`（除非明确知道不影响 sticky）
- [ ] 浏览器 API 单位查文档（如 IO 只用 px/%）
- [ ] 工具页少 Unicode 装饰符号，金额不用 `text-transparent` 渐变

---

## 五、尚未做 / 可选后续

- [ ] 给**所有 HTML 路由**缩短 CDN 缓存（不只首页 `/`），降低 Purge 失败时的风险
- [ ] README 补充 Cloudflare Token 的 **Cache Purge** 权限说明
- [ ] `memory/transcripts/` 仅本地参考，勿 commit

---

## 六、相关文件

| 文件 | 作用 |
|------|------|
| `next.config.mjs` | 首页 `Cache-Control: s-maxage=300` |
| `.github/workflows/deploy-cloudflare.yml` | 部署后 `purge_everything` |
| `public/_headers` | `/_next/static/*` 长期 immutable |
| `components/wiki/profit-calculator.tsx` | Calculator UX + IO 底部栏 |
| `lib/seo-pages/guides.ts` | Update Log changelog 条目 |

---

*记录人：与 Cursor Agent 协作整理 · 2026-06-07*
