export const siteConfig = {
  name: "Build A Ring Farm Wiki",
  description:
    "Unofficial fan guide. Compare seeds, redeem codes, calculate earnings, learn mutations, and plan your best farm route.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://buildaring.online",
  locale: "en",
  lastUpdated: "May 2026",
  /** ISO date for sitemap lastmod (May 2026) */
  siteLastModified: "2026-05-01T00:00:00.000Z",
  robloxGameUrl:
    "https://www.roblox.com/games/107646426076756/Build-A-Ring-Farm",
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
  "/codes": { priority: 0.95, changeFrequency: "daily" },
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
    title: "Build A Ring Farm Wiki & Calculator | Build A Ring Farm Wiki",
    h1: "Build A Ring Farm Wiki & Calculator",
    description:
      "Complete Build A Ring Farm wiki: 51 seeds, 9 mutations, active codes, profit calculator & progression guides. Free Roblox farming tips updated May 2026.",
    heroDescription:
      "Your complete unofficial guide to seeds, mutations, codes, rings, and earnings on Roblox.",
    ogTitle: "Build A Ring Farm Wiki — Seeds, Codes, Mutations & Calculator",
    ogImageAlt: "Build A Ring Farm wiki hero — farmer, crops, and glowing ring portal",
    breadcrumb: "Home",
    keywords: [
      "build a ring farm",
      "Build A Ring Farm",
      "Roblox farm wiki",
      "build a ring farm codes",
      "build a ring farm calculator",
    ],
  },
  seeds: {
    title: "Build A Ring Farm Seeds | Build A Ring Farm Wiki",
    h1: "Build A Ring Farm Seeds",
    description:
      "Full Build A Ring Farm seeds list: 51 crops, 10 rarities, base income, grow times & roll odds. Compare seeds and plan the most profitable farm layout.",
    heroDescription:
      "Every seed in Build A Ring Farm — rarity, income, grow time, and roll weight in one database.",
    ogTitle: "Build A Ring Farm Seeds — Full Database & Rarity Guide",
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
    title: "Build A Ring Farm Mutations | Build A Ring Farm Wiki",
    h1: "Build A Ring Farm Mutations",
    description:
      "All Build A Ring Farm mutations ranked: multipliers from Wet 1.5x to Honeycomb 6.5x, Gear Shop prices, weather triggers & event-only buffs explained.",
    heroDescription:
      "Nine mutations, harvest multipliers, shop prices, and which buffs are event-only.",
    ogTitle: "Build A Ring Farm Mutations — Multipliers & How to Get Them",
    ogImageAlt: "Build A Ring Farm mutation matrix with harvest multipliers",
    breadcrumb: "Mutations",
    keywords: [
      "build a ring farm mutations",
      "mutation multipliers",
      "Wet mutation",
      "Rainbow mutation",
      "Honeycomb",
    ],
  },
  events: {
    title: "Build A Ring Farm Events | Build A Ring Farm Wiki",
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
    title: "Build A Ring Farm Rings | Build A Ring Farm Wiki",
    h1: "Build A Ring Farm Rings",
    description:
      "Build A Ring Farm rings explained: Inner 7x, Middle 13x & Outer 19x multipliers. Learn placement strategy, saw bonus synergy & endgame layout tips.",
    heroDescription:
      "Inner, Middle, and Outer ring multipliers — where to plant each crop for max profit.",
    ogTitle: "Build A Ring Farm Rings — Multipliers & Placement Guide",
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
    title: "Build A Ring Farm Calculator | Build A Ring Farm Wiki",
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
    title: "Build A Ring Farm Codes | Build A Ring Farm Wiki",
    h1: "Build A Ring Farm Codes",
    description:
      "Active Build A Ring Farm codes for May 2026: redeem free sprays, seed packs & time skips. Copy codes in one click with community verification status.",
    heroDescription:
      "Latest redeem codes, rewards, and verification status — updated regularly.",
    ogTitle: "Build A Ring Farm Codes — Active Redeem Codes List",
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
    title: "Build A Ring Farm Progression | Build A Ring Farm Wiki",
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
    title: "FAQ | Build A Ring Farm Wiki",
    h1: "Frequently Asked Questions",
    description:
      "Answers to common Build A Ring Farm questions: how mutations work, best rings, code redemption, offline earnings, and beginner farming mistakes to avoid.",
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
