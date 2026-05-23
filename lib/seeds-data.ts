import seedsJson from "./seeds-data.json"

export type SeedRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "secret"
  | "prismatic"
  | "divine"
  | "exotic"
  | "transcended"

export type Seed = {
  id: string
  name: string
  emoji: string
  rarity: SeedRarity
  baseIncome: number | null
  growTimeSeconds: number | null
  rollWeight: number
  seedCost: number | null
  source: string
}

export const seeds = seedsJson as Seed[]

export const rarityOrder: SeedRarity[] = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "secret",
  "prismatic",
  "divine",
  "exotic",
  "transcended",
]

export const rarityFilters = ["all", ...rarityOrder] as const

export type RarityFilter = (typeof rarityFilters)[number]

export type SortOption =
  | "default"
  | "rarest"
  | "highest-value"
  | "fastest-growth"
  | "most-expensive"

export const rarityConfig: Record<
  SeedRarity,
  { label: string; color: string; tabClass: string; borderClass: string }
> = {
  common: {
    label: "Common",
    color: "text-zinc-500",
    tabClass: "data-[active=true]:bg-zinc-500 data-[active=true]:text-white",
    borderClass: "border-t-zinc-500",
  },
  uncommon: {
    label: "Uncommon",
    color: "text-green-600",
    tabClass: "data-[active=true]:bg-green-600 data-[active=true]:text-white",
    borderClass: "border-t-green-600",
  },
  rare: {
    label: "Rare",
    color: "text-blue-600",
    tabClass: "data-[active=true]:bg-blue-600 data-[active=true]:text-white",
    borderClass: "border-t-blue-600",
  },
  epic: {
    label: "Epic",
    color: "text-purple-600",
    tabClass: "data-[active=true]:bg-purple-600 data-[active=true]:text-white",
    borderClass: "border-t-purple-600",
  },
  legendary: {
    label: "Legendary",
    color: "text-amber-600",
    tabClass: "data-[active=true]:bg-amber-500 data-[active=true]:text-white",
    borderClass: "border-t-amber-500",
  },
  secret: {
    label: "Secret",
    color: "text-red-600",
    tabClass: "data-[active=true]:bg-red-600 data-[active=true]:text-white",
    borderClass: "border-t-red-600",
  },
  prismatic: {
    label: "Prismatic",
    color: "text-pink-600",
    tabClass: "data-[active=true]:bg-pink-600 data-[active=true]:text-white",
    borderClass: "border-t-pink-600",
  },
  divine: {
    label: "Divine",
    color: "text-cyan-600",
    tabClass: "data-[active=true]:bg-cyan-600 data-[active=true]:text-white",
    borderClass: "border-t-cyan-600",
  },
  exotic: {
    label: "Exotic",
    color: "text-orange-600",
    tabClass: "data-[active=true]:bg-orange-500 data-[active=true]:text-white",
    borderClass: "border-t-orange-500",
  },
  transcended: {
    label: "Transcended",
    color: "text-red-600",
    tabClass:
      "data-[active=true]:bg-gradient-to-r data-[active=true]:from-red-600 data-[active=true]:to-purple-600 data-[active=true]:text-white",
    borderClass: "border-t-red-600",
  },
}

/** Matches buildaring.xyz roll chance display (256-based table). */
export function formatRollChance(rollWeight: number): string {
  const num = Number(rollWeight)
  if (num <= 0) return "Unavailable"
  const odds = Math.round(256 / num)
  return `1 in ${odds.toLocaleString("en-US")}`
}

export function formatGrowTime(seconds: number | null): string {
  if (seconds === null || seconds >= 999) return "Unknown"
  return `${seconds}s`
}

export function formatCompactNumber(value: number | null): string {
  if (value === null) return "Unknown"
  if (value === 0) return "0"
  const abs = Math.abs(value)
  if (abs >= 1e12) return `${trimTrailingZero(value / 1e12)}T`
  if (abs >= 1e9) return `${trimTrailingZero(value / 1e9)}B`
  if (abs >= 1e6) return `${trimTrailingZero(value / 1e6)}M`
  if (abs >= 1e3) return `${trimTrailingZero(value / 1e3)}K`
  return value.toLocaleString("en-US")
}

function trimTrailingZero(n: number): string {
  const fixed = n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2)
  return fixed.replace(/\.0+$/, "")
}

export function formatBaseIncome(value: number | null): string {
  if (value === null || value === 0) return "Unknown"
  return formatCompactNumber(value)
}
