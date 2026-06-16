#!/usr/bin/env node
/**
 * Weekly analytics markdown report → memory/analytics/weekly-YYYY-MM-DD.md
 * Run: pnpm analytics
 */
import { mkdirSync, writeFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { pullAnalyticsReport } from "./pull-analytics.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const outDir = join(root, "memory", "analytics")

function pct(n, total) {
  if (!total) return "—"
  return ((n / total) * 100).toFixed(1) + "%"
}

function avgDaily(trend, days = 7) {
  const slice = trend?.slice(-days) ?? []
  if (!slice.length) return "—"
  const sum = slice.reduce((a, d) => a + (d.visitors || 0), 0)
  return (sum / slice.length).toFixed(0)
}

function formatReport(data) {
  const date = data.generatedAt.slice(0, 10)
  const p = data.plausible
  const g = data.ga4
  const s = data.gsc
  const lines = []

  lines.push(`# buildaring.online 周报 · ${date}`)
  lines.push("")
  lines.push(`> 自动生成 · \`pnpm analytics\``)
  lines.push("")

  if (data.errors?.length) {
    lines.push("## ⚠️ 拉取异常")
    for (const err of data.errors) lines.push(`- ${err}`)
    lines.push("")
  }

  lines.push("## 总览（近 28 天）")
  lines.push("")
  lines.push("| 指标 | Plausible | GA4 | GSC |")
  lines.push("|------|-----------|-----|-----|")
  const pv = p?.aggregate28d
  const ga = g?.aggregate28d
  lines.push(
    `| 访客/用户 | ${pv?.[0] ?? "—"} | ${ga?.activeUsers ?? "—"} | — |`
  )
  lines.push(
    `| 浏览/会话 | ${pv?.[2] ?? "—"} | ${ga?.pageviews ?? "—"} / ${ga?.sessions ?? "—"} | — |`
  )
  lines.push(
    `| 跳出率 | ${pv?.[3] != null ? pv[3] + "%" : "—"} | ${ga?.bounceRate != null ? (Number(ga.bounceRate) * 100).toFixed(1) + "%" : "—"} | — |`
  )
  lines.push(
    `| 搜索点击/展示 | — | — | ${s?.last28d?.clicks ?? "—"} / ${s?.last28d?.impressions ?? "—"} |`
  )
  lines.push(
    `| 搜索 CTR | — | — | ${s?.last28d?.ctr ?? "—"} |`
  )
  lines.push("")

  if (p?.dailyTrend?.length) {
    lines.push("## 流量趋势")
    lines.push("")
    lines.push(`- 近 7 日 Plausible 日均访客：**${avgDaily(p.dailyTrend, 7)}**`)
    lines.push(`- 前 7 日 Plausible 日均访客：**${avgDaily(p.dailyTrend.slice(0, -7), 7)}**`)
    if (s?.last7d && s?.prior7d) {
      lines.push(
        `- GSC 近 7 天：${s.last7d.clicks} 点击 / ${s.last7d.impressions} 展示（CTR ${s.last7d.ctr}）`
      )
      lines.push(
        `- GSC 前 7 天：${s.prior7d.clicks} 点击 / ${s.prior7d.impressions} 展示（CTR ${s.prior7d.ctr}）`
      )
    }
    lines.push("")
  }

  if (p?.topSources?.length) {
    lines.push("## 来源（Plausible）")
    lines.push("")
    const total = p.aggregate28d?.[0] || 1
    for (const row of p.topSources.slice(0, 8)) {
      lines.push(`- **${row.source}**：${row.visitors}（${pct(row.visitors, total)}）`)
    }
    lines.push("")
  }

  if (p?.topPages?.length) {
    lines.push("## 热门页面（Plausible）")
    lines.push("")
    lines.push("| 页面 | 访客 | PV |")
    lines.push("|------|------|-----|")
    for (const row of p.topPages.slice(0, 10)) {
      lines.push(`| ${row.page} | ${row.visitors} | ${row.pageviews} |`)
    }
    lines.push("")
  }

  if (p?.goals28d?.length) {
    lines.push("## 转化 Goals（Plausible）")
    lines.push("")
    lines.push("| Goal | 次数 | 访客转化率 |")
    lines.push("|------|------|------------|")
    for (const row of p.goals28d) {
      const rate =
        typeof row.conversionRate === "number"
          ? row.conversionRate.toFixed(2) + "%"
          : row.conversionRate
      lines.push(`| ${row.goal} | ${row.events} | ${rate} |`)
    }
    lines.push("")
    lines.push(
      "> 新埋点 `Play on Roblox` / Code Copy `source` 需部署后积累数据；请在 Plausible Goals 注册 **Play on Roblox**。"
    )
    lines.push("")
  }

  if (s?.topQueries?.length) {
    lines.push("## 搜索词（GSC · Top 10）")
    lines.push("")
    lines.push("| 查询词 | 点击 | 展示 | CTR | 排名 |")
    lines.push("|--------|------|------|-----|------|")
    for (const row of s.topQueries.slice(0, 10)) {
      lines.push(
        `| ${row.query} | ${row.clicks} | ${row.impressions} | ${row.ctr} | ${row.position} |`
      )
    }
    lines.push("")
  }

  if (s?.topPages?.length) {
    lines.push("## 搜索落地页（GSC · Top 8）")
    lines.push("")
    for (const row of s.topPages.slice(0, 8)) {
      const path = row.page.replace("https://buildaring.online", "") || "/"
      lines.push(
        `- \`${path}\`：${row.clicks} 点击 / ${row.impressions} 展示 · CTR ${row.ctr} · 排名 ${row.position}`
      )
    }
    lines.push("")
  }

  if (g?.channels?.length) {
    lines.push("## GA4 渠道")
    lines.push("")
    for (const row of g.channels) {
      lines.push(`- **${row.channel}**：${row.users} 用户 / ${row.sessions} 会话`)
    }
    lines.push("")
  }

  lines.push("## 本周行动建议（自动规则）")
  lines.push("")
  const mainQuery = s?.topQueries?.[0]
  const calcGoal = p?.goals28d?.find((x) => x.goal === "Calculator Run")
  const codeGoal = p?.goals28d?.find((x) => x.goal === "Code Copy")
  const daily7 = Number(avgDaily(p?.dailyTrend, 7))

  if (daily7 && daily7 < 35) {
    lines.push("- 🔴 **SEO 曝光偏低**：盯住 GSC 主词展示/排名，勿频繁改首页 title。")
  }
  if (mainQuery && parseFloat(mainQuery.position) > 4.5) {
    lines.push(
      `- 🟡 主词 \`${mainQuery.query}\` 排名 **${mainQuery.position}**：外链 + 稳住 snippet，目标 ≤4。`
    )
  }
  if (codeGoal && codeGoal.conversionRate < 5) {
    lines.push("- 🟡 **Code Copy <5%**：强化首页 codes 表复制按钮，看 `source` 分布。")
  }
  if (calcGoal && calcGoal.conversionRate >= 12) {
    lines.push("- 🟢 **Calculator 表现强**：保持内链，考虑 calculator 长尾词页面。")
  }
  const mutPage = s?.topPages?.find((x) => x.page.includes("/mutations"))
  if (mutPage && parseFloat(mutPage.ctr) < 5) {
    lines.push("- 🟡 **/mutations 搜索 CTR 低**：优化 mutations 页 title/description。")
  }
  if (!lines[lines.length - 1].startsWith("-")) {
    lines.push("- 继续每周运行 `pnpm analytics`，对比 Goals 与 GSC 趋势。")
  }
  lines.push("")

  return lines.join("\n")
}

const data = await pullAnalyticsReport()
const markdown = formatReport(data)
const filename = `weekly-${data.generatedAt.slice(0, 10)}.md`
const outPath = join(outDir, filename)

mkdirSync(outDir, { recursive: true })
writeFileSync(outPath, markdown, "utf8")

console.log(`Wrote ${outPath}`)
console.log("")
console.log(markdown)
