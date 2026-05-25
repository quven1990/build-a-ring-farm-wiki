import type { SeoPageKey } from "@/lib/seo-article-content"

/** Unique opening copy per page (≈200 words target across intro + first heading avoided duplication) */
export const pageIntros: Partial<Record<SeoPageKey, string>> = {
  home:
    "buildaring.online is your player toolkit hub — not a single long wiki article. Jump to databases, calculators, or focused guides below. Each section has its own page title, summary, and FAQs so you do not wade through repeated game introductions.",
  seeds:
    "This page is the live seed database only: sort fifty-one crops by rarity, income, grow time, and roll weight. For farming strategy without table noise, read the [farm efficiency guide](/build-a-ring-farm). For rarity bands without exact stats, see the [tier list framework](/build-a-ring-tier-list).",
  mutations:
    "Every harvest multiplier in one matrix — shop sprays, weather procs, and event-only tags. This page does not re-explain ring placement; pair it with [weather events](/events) for timing and the [profit calculator](/calculator) before you buy Rainbow-tier sprays.",
  events:
    "Weather events control free mutation rolls. Use this reference for activation rates and per-plant odds — then plan harvests using the [mutations matrix](/mutations) and [farm efficiency guide](/build-a-ring-farm).",
  rings:
    "Inner, Middle, and Outer multipliers with placement notes. For unlock order and crop matching, read [best rings guide](/build-a-ring-best-rings); for raw seed stats, open the [seeds database](/seeds).",
  calculator:
    "Interactive profit tool with step-by-step breakdown. Read the [calculator guide](/build-a-ring-calculator) for when to run scenarios; use [seeds](/seeds) and [rings](/rings) pages to pick inputs.",
  codes:
    "Active redeem codes with copy buttons and status labels. For redemption steps and expired-code policy, see the [codes guide](/build-a-ring-codes); patch notes appear in the [update log](/build-a-ring-update-log).",
  progression:
    "Staged upgrade path from first harvest to endgame layout. New players should start with the [beginner guide](/build-a-ring-guide); efficiency-focused players prefer the [farm guide](/build-a-ring-farm).",
  faq:
    "Short accordion FAQ for quick answers. Expand a question below, or open the [FAQ hub](/build-a-ring-faq) for longer explanations about codes, calculator trust, and unofficial site status.",
}
