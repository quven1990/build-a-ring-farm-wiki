export type RelatedGuideLink = {
  href: string
  title: string
  description: string
}

export type RelatedPageKey =
  | "home"
  | "seeds"
  | "mutations"
  | "events"
  | "rings"
  | "calculator"
  | "codes"
  | "progression"
  | "faq"
  | "build-a-ring-farm"
  | "build-a-ring-guide"
  | "build-a-ring-codes"
  | "build-a-ring-calculator"
  | "build-a-ring-wiki"
  | "build-a-ring-faq"
  | "build-a-ring-tier-list"
  | "build-a-ring-best-rings"
  | "build-a-ring-update-log"

const LINKS = {
  home: { href: "/", title: "Home", description: "Player toolkit hub and quick links" },
  seeds: { href: "/seeds", title: "Seeds Database", description: "51 crops with income and grow times" },
  mutations: { href: "/mutations", title: "Mutations Matrix", description: "Multipliers, shop prices, event tags" },
  events: { href: "/events", title: "Weather Events", description: "Trigger rates and roll mechanics" },
  rings: { href: "/rings", title: "Rings Guide", description: "Inner, Middle, Outer multipliers" },
  calculator: { href: "/calculator", title: "Profit Calculator", description: "Verified harvest formula tool" },
  codes: { href: "/codes", title: "Active Codes", description: "Copy redeem codes with status labels" },
  progression: { href: "/progression", title: "Progression Guide", description: "Early to late upgrade path" },
  faq: { href: "/faq", title: "FAQ", description: "Quick answers about mechanics" },
  farm: {
    href: "/build-a-ring-farm",
    title: "Farm Efficiency Guide",
    description: "Farming loops, harvest rhythm, resource planning",
  },
  guide: {
    href: "/build-a-ring-guide",
    title: "Beginner Guide",
    description: "First session checklist for new players",
  },
  codesGuide: {
    href: "/build-a-ring-codes",
    title: "Codes Guide",
    description: "How to redeem and track expired codes",
  },
  calcGuide: {
    href: "/build-a-ring-calculator",
    title: "Calculator Guide",
    description: "When and how to use the profit tool",
  },
  wiki: {
    href: "/build-a-ring-wiki",
    title: "Wiki Index",
    description: "Directory of all databases and tools",
  },
  faqGuide: {
    href: "/build-a-ring-faq",
    title: "FAQ Hub",
    description: "Long-tail questions and troubleshooting",
  },
  tierList: {
    href: "/build-a-ring-tier-list",
    title: "Tier List Framework",
    description: "Compare seeds by rarity and role",
  },
  bestRings: {
    href: "/build-a-ring-best-rings",
    title: "Best Rings Guide",
    description: "Which ring to unlock and plant on first",
  },
  updateLog: {
    href: "/build-a-ring-update-log",
    title: "Update Log",
    description: "Site and community data changelog",
  },
} as const satisfies Record<string, RelatedGuideLink>

/** Per-page related links — order varies to avoid duplicate sitewide blocks */
export const relatedGuidesByPage: Record<RelatedPageKey, RelatedGuideLink[]> = {
  home: [LINKS.codes, LINKS.calculator, LINKS.farm, LINKS.guide, LINKS.wiki, LINKS.tierList, LINKS.seeds, LINKS.updateLog],
  seeds: [LINKS.tierList, LINKS.rings, LINKS.calculator, LINKS.farm, LINKS.mutations, LINKS.wiki, LINKS.progression, LINKS.codesGuide],
  mutations: [LINKS.events, LINKS.calculator, LINKS.seeds, LINKS.farm, LINKS.tierList, LINKS.bestRings, LINKS.wiki, LINKS.faqGuide],
  events: [LINKS.mutations, LINKS.farm, LINKS.calculator, LINKS.seeds, LINKS.rings, LINKS.updateLog, LINKS.wiki, LINKS.codes],
  rings: [LINKS.bestRings, LINKS.calculator, LINKS.seeds, LINKS.farm, LINKS.progression, LINKS.tierList, LINKS.mutations, LINKS.wiki],
  calculator: [LINKS.calcGuide, LINKS.seeds, LINKS.rings, LINKS.mutations, LINKS.farm, LINKS.tierList, LINKS.progression, LINKS.wiki],
  codes: [LINKS.codesGuide, LINKS.updateLog, LINKS.guide, LINKS.farm, LINKS.seeds, LINKS.progression, LINKS.faq, LINKS.wiki],
  progression: [LINKS.guide, LINKS.farm, LINKS.seeds, LINKS.rings, LINKS.calculator, LINKS.codes, LINKS.tierList, LINKS.faqGuide],
  faq: [LINKS.faqGuide, LINKS.guide, LINKS.codes, LINKS.calculator, LINKS.wiki, LINKS.farm, LINKS.bestRings, LINKS.updateLog],
  "build-a-ring-farm": [LINKS.seeds, LINKS.rings, LINKS.events, LINKS.calculator, LINKS.tierList, LINKS.progression, LINKS.codes, LINKS.updateLog],
  "build-a-ring-guide": [LINKS.progression, LINKS.codes, LINKS.seeds, LINKS.farm, LINKS.faq, LINKS.wiki, LINKS.calculator, LINKS.guide],
  "build-a-ring-codes": [LINKS.codes, LINKS.updateLog, LINKS.guide, LINKS.farm, LINKS.faqGuide, LINKS.wiki, LINKS.progression, LINKS.seeds],
  "build-a-ring-calculator": [LINKS.calculator, LINKS.seeds, LINKS.rings, LINKS.mutations, LINKS.tierList, LINKS.farm, LINKS.wiki, LINKS.faq],
  "build-a-ring-wiki": [LINKS.seeds, LINKS.mutations, LINKS.events, LINKS.rings, LINKS.calculator, LINKS.codes, LINKS.tierList, LINKS.updateLog],
  "build-a-ring-faq": [LINKS.faq, LINKS.guide, LINKS.codesGuide, LINKS.calcGuide, LINKS.wiki, LINKS.farm, LINKS.bestRings, LINKS.updateLog],
  "build-a-ring-tier-list": [LINKS.seeds, LINKS.calculator, LINKS.farm, LINKS.rings, LINKS.mutations, LINKS.progression, LINKS.wiki, LINKS.bestRings],
  "build-a-ring-best-rings": [LINKS.rings, LINKS.calculator, LINKS.seeds, LINKS.farm, LINKS.tierList, LINKS.mutations, LINKS.progression, LINKS.wiki],
  "build-a-ring-update-log": [LINKS.codes, LINKS.updateLog, LINKS.wiki, LINKS.seeds, LINKS.mutations, LINKS.farm, LINKS.faqGuide, LINKS.calculator],
}
