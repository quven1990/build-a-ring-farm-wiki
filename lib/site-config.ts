import type { GuidePageId } from "@/lib/seo-pages/types"

export const siteConfig = {
  name: "Build A Ring Farm Wiki",
  tagline: "Data, codes & profit tools for Roblox players",
  description:
    "Unofficial player toolkit: profit calculator, seed database, mutations, rings, and farming guides for Build A Ring Farm on Roblox.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://buildaring.online",
  locale: "en",
  /** Fallback label if formatSiteLastUpdatedLabel is unavailable */
  lastUpdated: "June 2026",
  robloxGameUrl:
    "https://www.roblox.com/games/107646426076756/Build-A-Ring-Farm",
  /** Optional @handle for Twitter Card site attribution (e.g. "@buildaringonline"). */
  twitterSite: process.env.NEXT_PUBLIC_TWITTER_SITE?.trim() || undefined,
}

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Seeds", href: "/seeds" },
  { label: "Mutations", href: "/mutations" },
  { label: "Events", href: "/events" },
  { label: "Rings", href: "/rings" },
  { label: "Calculator", href: "/calculator" },
  { label: "Codes", href: "/codes" },
  { label: "Progression", href: "/progression" },
  { label: "FAQ", href: "/faq" },
] as const

export const guideCards = [
  {
    title: "Seeds",
    description: "All seeds sorted by rarity with drop chances, prices, and grow times",
    href: "/seeds",
    color: "text-primary bg-primary/10",
  },
  {
    title: "Mutations",
    description: "All mutations, multipliers, and how to get them",
    href: "/mutations",
    color: "text-chart-4 bg-chart-4/10",
  },
  {
    title: "Events",
    description: "Weather events and mutation mechanics",
    href: "/events",
    color: "text-chart-5 bg-chart-5/10",
  },
  {
    title: "Rings",
    description: "Ring multipliers, saw yield, and placement tips",
    href: "/rings",
    color: "text-chart-2 bg-chart-2/10",
  },
  {
    title: "Calculator",
    description: "Calculate exact earnings for any seed and setup",
    href: "/calculator",
    color: "text-primary bg-primary/10",
  },
  {
    title: "Progression",
    description: "Best upgrade paths and progression strategies",
    href: "/progression",
    color: "text-chart-3 bg-chart-3/10",
  },
  {
    title: "Codes",
    description: "Active redeem codes for free rewards",
    href: "/codes",
    color: "text-chart-2 bg-chart-2/10",
  },
  {
    title: "FAQ",
    description: "Frequently asked questions and game mechanics",
    href: "/faq",
    color: "text-chart-4 bg-chart-4/10",
  },
] as const

export const footerLinks = {
  guides: [
    { label: "Seeds", href: "/seeds" },
    { label: "Mutations", href: "/mutations" },
    { label: "Progression", href: "/progression" },
    { label: "Calculator", href: "/calculator" },
  ],
  resources: [
    { label: "Codes", href: "/codes" },
    { label: "FAQ", href: "/faq" },
    { label: "Rings", href: "/rings" },
    { label: "Events", href: "/events" },
  ],
} as const

/** SEO priority & crawl hints — keys must match every `navItems[].href` */
export const sitemapRouteSettings: Record<
  (typeof navItems)[number]["href"],
  { priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }
> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/seeds": { priority: 0.9, changeFrequency: "weekly" },
  "/mutations": { priority: 0.9, changeFrequency: "weekly" },
  "/events": { priority: 0.8, changeFrequency: "weekly" },
  "/rings": { priority: 0.8, changeFrequency: "monthly" },
  "/calculator": { priority: 0.9, changeFrequency: "monthly" },
  "/codes": { priority: 0.95, changeFrequency: "weekly" },
  "/progression": { priority: 0.85, changeFrequency: "monthly" },
  "/faq": { priority: 0.7, changeFrequency: "monthly" },
}

export type PageMeta = {
  title: string
  h1: string
  description: string
  heroDescription?: string
  ogTitle?: string
  ogImage?: string
  ogImageAlt: string
  breadcrumb: string
  keywords: string[]
}

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: "Build A Ring Farm Wiki — Codes, Seeds & Calculator (2026)",
    h1: "Build A Ring Farm Wiki — Codes, Seeds & Calculator",
    description:
      "Active Build A Ring Farm codes, free profit calculator, full mutations list & 51-seed database — unofficial fan wiki for Roblox players. Updated June 2026.",
    heroDescription:
      "Active redeem codes, profit calculator, mutations matrix, and 51-seed database — updated June 2026.",
    ogTitle: "Build A Ring Farm Wiki — Codes, Seeds & Calculator",
    ogImage: "/images/og-share.png",
    ogImageAlt: "Build A Ring Farm wiki hero — farmer, crops, and glowing ring portal",
    breadcrumb: "Home",
    keywords: [
      "build a ring farm",
      "Build A Ring Farm",
      "build a ring farm wiki",
      "build a ring farm codes",
      "Roblox farm wiki",
      "build a ring farm calculator",
      "build a ring farm mutations",
      "build a ring farm seeds",
    ],
  },
  seeds: {
    title: "Build A Ring Farm Seeds — 51 Crops & Rarities (2026)",
    h1: "Build A Ring Farm Seeds",
    description:
      "Full Build A Ring Farm seeds list: 51 crops, 10 rarities, base income, grow times & roll odds. Compare crops and plan the most profitable layout. Updated 2026.",
    heroDescription:
      "Every seed — rarity, income, grow time, and roll weight in one database. Updated May 2026.",
    ogTitle: "Build A Ring Farm Seeds — Full Database (2026)",
    ogImageAlt: "Build A Ring Farm seeds guide showing crop rarities and farming plots",
    breadcrumb: "Seeds",
    keywords: [
      "build a ring farm seeds",
      "Build A Ring Farm seeds",
      "seed rarity",
      "grow time",
      "Roblox farm seeds",
    ],
  },
  mutations: {
    title: "Build A Ring Farm Mutations — Multipliers (June 2026)",
    h1: "Build A Ring Farm Mutations",
    description:
      "Build A Ring Farm mutations (June 2026): Wet 1.5x to Honeycomb 6.5x, Gear Shop prices, weather triggers & event buffs. Compare multipliers before buying sprays.",
    heroDescription:
      "Every mutation multiplier — shop prices, weather triggers, and event-only tags. Updated June 2026.",
    ogTitle: "Build A Ring Farm Mutations — Multiplier List (June 2026)",
    ogImageAlt: "Build A Ring Farm mutation matrix with harvest multipliers",
    breadcrumb: "Mutations",
    keywords: [
      "build a ring farm mutations",
      "build a ring farm mutations list",
      "mutation multipliers 2026",
      "Wet mutation",
      "Rainbow mutation",
      "Honeycomb",
    ],
  },
  events: {
    title: "Build A Ring Farm Events — Weather & Rolls (2026)",
    h1: "Build A Ring Farm Events",
    description:
      "Build A Ring Farm weather events guide: Rain, Blizzard, Black Hole, Nuclear & Galaxy trigger rates, per-roll odds & free mutation income boosts.",
    heroDescription:
      "Weather events, roll mechanics, and how to time harvests for maximum mutation income.",
    ogTitle: "Build A Ring Farm Events — Weather Rates & Roll Mechanics",
    ogImageAlt: "Build A Ring Farm weather events affecting crop mutations",
    breadcrumb: "Events",
    keywords: [
      "build a ring farm events",
      "weather events",
      "Galaxy event",
      "mutation rolls",
      "free income boost",
    ],
  },
  rings: {
    title: "Build A Ring Farm Rings — 7x, 13x & 19x Multipliers",
    h1: "Build A Ring Farm Rings",
    description:
      "Build A Ring Farm rings reference (June 2026): Inner 7x, Middle 13x & Outer 19x multipliers. Compare zones, saw bonus synergy & ring unlock costs.",
    heroDescription:
      "Inner, Middle, and Outer ring multipliers — where to plant each crop for max profit. Updated May 2026.",
    ogTitle: "Build A Ring Farm Rings — Multipliers & Placement (2026)",
    ogImageAlt: "Build A Ring Farm ring placement on circular farm plots",
    breadcrumb: "Rings",
    keywords: [
      "build a ring farm rings",
      "ring multipliers",
      "Inner ring",
      "Outer ring 19x",
      "farm layout",
    ],
  },
  calculator: {
    title: "Build A Ring Farm Profit Calculator — Free (2026)",
    h1: "Build A Ring Farm Calculator",
    description:
      "Free Build A Ring Farm calculator: verified per-plant & total harvest formula. Test seed level, rings, mutations, saw, sprinkler & cash multipliers.",
    heroDescription:
      "Calculate exact earnings with the verified in-game profit formula.",
    ogTitle: "Build A Ring Farm Calculator — Profit & Mutation Tool",
    ogImageAlt: "Build A Ring Farm profit calculator interface preview",
    breadcrumb: "Calculator",
    keywords: [
      "build a ring farm calculator",
      "profit calculator",
      "harvest calculator",
      "earnings formula",
      "Roblox farm calculator",
    ],
  },
  codes: {
    title: "Build A Ring Farm Codes (June 2026) — Active Redeem List",
    h1: "Build A Ring Farm Codes",
    description:
      "Active Build A Ring Farm redeem codes (June 2026) — copy strings with one click. Synced weekly from public gaming lists with community status labels.",
    heroDescription:
      "Active redeem codes with copy buttons — synced weekly from public sources with status labels.",
    ogTitle: "Build A Ring Farm Active Codes (June 2026)",
    ogImageAlt: "Build A Ring Farm active promo and redeem codes list",
    breadcrumb: "Codes",
    keywords: [
      "build a ring farm codes",
      "redeem codes",
      "promo codes 2026",
      "Roblox codes",
      "free rewards",
    ],
  },
  progression: {
    title: "Build A Ring Farm Progression — Upgrade Path (2026)",
    h1: "Build A Ring Farm Progression",
    description:
      "Build A Ring Farm progression guide: early, mid & late game upgrade paths. Which seeds, rings & tools to unlock first for the fastest cash growth.",
    heroDescription:
      "Step-by-step upgrade path from your first harvest to endgame optimization.",
    ogTitle: "Build A Ring Farm Progression — Beginner to Endgame Guide",
    ogImageAlt: "Build A Ring Farm progression and upgrade strategy chart",
    breadcrumb: "Progression",
    keywords: [
      "build a ring farm progression",
      "beginner guide",
      "upgrade path",
      "farming strategy",
      "early game tips",
    ],
  },
  faq: {
    title: "Build A Ring Farm FAQ — Quick Answers | buildaring.online",
    h1: "Build A Ring Farm FAQ",
    description:
      "Quick FAQ for Build A Ring Farm: codes, rings, mutations, calculator, and beginner tips. For detailed answers see the FAQ hub at buildaring.online.",
    heroDescription:
      "Quick answers about mechanics, rings, codes, and getting started.",
    ogTitle: "Build A Ring Farm FAQ — Game Mechanics & Tips",
    ogImageAlt: "Build A Ring Farm frequently asked questions",
    breadcrumb: "FAQ",
    keywords: [
      "Build A Ring Farm FAQ",
      "how to play",
      "game mechanics",
      "beginner help",
    ],
  },
}

export const guidePageMeta: Record<
  GuidePageId,
  PageMeta & { breadcrumb: string }
> = {
  "build-a-ring-farm": {
    title: "Build A Ring Farm Guide — Efficiency & Farming (2026)",
    h1: "Build A Ring Farm Efficiency Guide",
    description:
      "Build A Ring Farm farm guide: Big Lion two-crop focus, Plant Rush, Cosmic Spray, harvest rhythm, rings & reinvestment. Community tips — verify stats in-game.",
    heroDescription:
      "Plan faster sessions, post-update money metas, smarter harvests, and better reinvestment — without repeating a beginner tutorial.",
    ogTitle: "Build A Ring Farm Efficiency Guide",
    ogImageAlt: "Build A Ring Farm farming efficiency guide",
    breadcrumb: "Farm Guide",
    keywords: [
      "build a ring farm guide",
      "farming efficiency",
      "big lion",
      "plant rush",
      "cosmic spray",
      "harvest timing",
      "Roblox farm",
    ],
  },
  "build-a-ring-guide": {
    title: "Build A Ring Farm Beginner Guide — Roblox (2026)",
    h1: "Build A Ring Farm Beginner Guide",
    description:
      "New player guide for Build A Ring Farm on Roblox: first-session checklist, codes, seeds, rings, and what to read next. Start smart without grinding blind.",
    heroDescription:
      "First hours on Roblox — clear steps from planting your first crop to your first smart upgrade.",
    ogTitle: "Build A Ring Farm Beginner Guide",
    ogImageAlt: "Build A Ring Farm beginner guide for new players",
    breadcrumb: "Beginner Guide",
    keywords: ["build a ring beginner guide", "how to play", "new player", "Roblox"],
  },
  "build-a-ring-beginner-mistakes": {
    title: "Build A Ring Beginner Mistakes — What to Avoid (2026)",
    h1: "Build A Ring Farm Beginner Mistakes",
    description:
      "Ten common Build A Ring Farm mistakes new players make — bad ring placement, expired codes, spray waste, and event timing. Fixes plus links to calculator and progression guides.",
    heroDescription:
      "Stop wasting hours on codes, rings, and sprays — quick fixes for the mistakes that slow most farms.",
    ogTitle: "Build A Ring Farm Beginner Mistakes Guide",
    ogImageAlt: "Build A Ring Farm beginner mistakes to avoid",
    breadcrumb: "Beginner Mistakes",
    keywords: [
      "build a ring farm mistakes",
      "beginner errors",
      "what not to do",
      "new player tips",
    ],
  },
  "build-a-ring-codes": {
    title: "How to Redeem Build A Ring Farm Codes (2026)",
    h1: "Build A Ring Farm Codes Guide",
    description:
      "Step-by-step guide to redeem Build A Ring Farm codes, read status labels, and handle expired strings. For the copy-paste list see the active codes page.",
    heroDescription:
      "Redeem safely, understand status labels, and know what to do when a code stops working.",
    ogTitle: "Build A Ring Farm Codes Guide",
    ogImageAlt: "Build A Ring Farm codes redemption guide",
    breadcrumb: "Codes Guide",
    keywords: ["build a ring codes guide", "redeem codes", "promo codes", "Roblox codes"],
  },
  "build-a-ring-calculator": {
    title: "Build A Ring Calculator Guide — Profit Tool (2026)",
    h1: "Build A Ring Farm Calculator Guide",
    description:
      "When to use the Build A Ring Farm profit calculator, how each input maps to in-game settings, and how to debug mismatches with live harvests.",
    heroDescription:
      "Run scenarios before big purchases — seed level, rings, mutations, saw, and farm totals explained.",
    ogTitle: "Build A Ring Calculator Guide",
    ogImageAlt: "Build A Ring Farm calculator usage guide",
    breadcrumb: "Calculator Guide",
    keywords: ["build a ring calculator guide", "profit tool", "earnings formula"],
  },
  "build-a-ring-wiki": {
    title: "Build A Ring Wiki Index — Databases & Tools (2026)",
    h1: "Build A Ring Farm Wiki Index",
    description:
      "Directory of Build A Ring Farm databases, calculators, active codes, written guides, and FAQ pages on buildaring.online — your map to every tool on this wiki.",
    heroDescription:
      "One hub to find seeds, mutations, events, rings, tools, and written guides.",
    ogTitle: "Build A Ring Farm Wiki Index",
    ogImageAlt: "Build A Ring Farm wiki directory",
    breadcrumb: "Wiki Index",
    keywords: ["build a ring wiki", "database index", "Roblox wiki"],
  },
  "build-a-ring-faq": {
    title: "Build A Ring FAQ Hub — Long-Tail Answers (2026)",
    h1: "Build A Ring Farm FAQ Hub",
    description:
      "Extended FAQ for Build A Ring Farm: codes, rings, calculator, mechanics, and site data policy. Conservative answers — verify rewards in-game after patches.",
    heroDescription:
      "Long-tail questions in one place — codes, rings, mutations, calculator, and site data policy.",
    ogTitle: "Build A Ring Farm FAQ Hub",
    ogImageAlt: "Build A Ring Farm FAQ hub",
    breadcrumb: "FAQ Hub",
    keywords: ["build a ring faq", "questions", "help"],
  },
  "build-a-ring-tier-list": {
    title: "Build A Ring Tier List — Seeds by Rarity (2026)",
    h1: "Build A Ring Farm Tier List Framework",
    description:
      "Tier list framework for Build A Ring Farm seeds by rarity and role — early, mid, and late game paths. Open the seeds database for exact income and grow times.",
    heroDescription:
      "Compare crops by band and play style — not a stale single ranking chart.",
    ogTitle: "Build A Ring Farm Tier List Framework",
    ogImageAlt: "Build A Ring Farm seed tier list framework",
    breadcrumb: "Tier List",
    keywords: ["build a ring tier list", "best seeds", "rarity tiers"],
  },
  "build-a-ring-best-rings": {
    title: "Best Rings in Build A Ring Farm — Placement (2026)",
    h1: "Best Rings in Build A Ring Farm",
    description:
      "Which Build A Ring Farm ring to unlock first, where to plant each crop, and how saw level pairs with Inner, Middle, and Outer zones for maximum harvest value.",
    heroDescription:
      "Unlock order and placement — 7x Inner, 13x Middle, 19x Outer explained for real farms.",
    ogTitle: "Best Rings Build A Ring Farm Guide",
    ogImageAlt: "Build A Ring Farm best rings placement guide",
    breadcrumb: "Best Rings",
    keywords: ["build a ring best rings", "ring placement", "outer ring"],
  },
  "build-a-ring-update-log": {
    title: "Build A Ring Update Log — Site Changelog (2026)",
    h1: "Build A Ring Farm Update Log",
    description:
      "Changelog for buildaring.online and community-reported Build A Ring Farm updates — new codes, balance changes, and when we reviewed seeds and mutations data.",
    heroDescription:
      "Track site edits and what to re-check after Roblox patches.",
    ogTitle: "Build A Ring Farm Update Log",
    ogImageAlt: "Build A Ring Farm update log",
    breadcrumb: "Update Log",
    keywords: ["build a ring update", "changelog", "patch notes"],
  },
}

export const footerGuideLinks = [
  { label: "Updates", href: "/updates" },
  { label: "Farm Guide", href: "/build-a-ring-farm" },
  { label: "Beginner Guide", href: "/build-a-ring-guide" },
  { label: "Beginner Mistakes", href: "/build-a-ring-beginner-mistakes" },
  { label: "Codes Guide", href: "/build-a-ring-codes" },
  { label: "Calculator Guide", href: "/build-a-ring-calculator" },
  { label: "Wiki Index", href: "/build-a-ring-wiki" },
  { label: "FAQ Hub", href: "/build-a-ring-faq" },
  { label: "Tier List", href: "/build-a-ring-tier-list" },
  { label: "Best Rings", href: "/build-a-ring-best-rings" },
  { label: "Update Log", href: "/build-a-ring-update-log" },
] as const
