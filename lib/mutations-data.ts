import type { DataConfidence } from "@/lib/data-confidence"
import { wikiMutationsGenerated } from "@/lib/mutations-data.generated"

export type WikiMutation = {
  name: string
  emoji: string
  multiplier: number
  chancePercent: number
  trigger: string
  price: string | null
  eventOnly: boolean
  confidence: DataConfidence
  /** Event proc % are community estimates unless verified in-game */
  chanceIsEstimate?: boolean
  /** Public lists that agreed on the last sync (never auto-verified). */
  sourceCount?: number
  notes?: string
}

export { gameDataSyncMeta, formatGameDataSyncDate } from "@/lib/game-data-sync-meta"

export const wikiMutations: WikiMutation[] = wikiMutationsGenerated

export type MutationSortOption = "multiplier-desc" | "chance-asc"

export type MutationTier = "elite" | "high" | "upper" | "mid" | "entry"

export function formatMultiplier(value: number): string {
  return `${value}x`
}

export function formatChance(percent: number): string {
  return `${percent}%`
}

export function formatMutationPrice(mutation: WikiMutation): string {
  if (mutation.eventOnly || !mutation.price) return "Event Only"
  return mutation.price
}

export function getMutationTier(multiplier: number): MutationTier {
  if (multiplier >= 6) return "elite"
  if (multiplier >= 4) return "high"
  if (multiplier >= 2.5) return "upper"
  if (multiplier >= 2) return "mid"
  return "entry"
}

/** Theme-aligned tiers: forest green base, gold for top-end */
export const mutationTierStyles: Record<
  MutationTier,
  {
    bar: string
    emojiBg: string
    multiplierPill: string
    accentText: string
  }
> = {
  elite: {
    bar: "from-secondary via-secondary/80 to-primary/60",
    emojiBg: "bg-secondary/25 ring-secondary/35",
    multiplierPill: "bg-secondary text-secondary-foreground shadow-sm",
    accentText: "text-secondary-foreground",
  },
  high: {
    bar: "from-primary via-primary/85 to-chart-5/70",
    emojiBg: "bg-primary/20 ring-primary/25",
    multiplierPill: "bg-primary text-primary-foreground shadow-sm",
    accentText: "text-primary",
  },
  upper: {
    bar: "from-chart-5 via-primary/70 to-primary/40",
    emojiBg: "bg-chart-5/15 ring-chart-5/25",
    multiplierPill: "bg-chart-5/90 text-white shadow-sm",
    accentText: "text-chart-5",
  },
  mid: {
    bar: "from-primary/80 to-primary/30",
    emojiBg: "bg-primary/12 ring-primary/20",
    multiplierPill: "bg-primary/90 text-primary-foreground",
    accentText: "text-primary",
  },
  entry: {
    bar: "from-muted-foreground/30 to-primary/25",
    emojiBg: "bg-muted ring-border",
    multiplierPill: "bg-muted text-foreground",
    accentText: "text-muted-foreground",
  },
}

export const calculatorMutations = [
  { name: "None", multiplier: 1 },
  ...wikiMutations.map((m) => ({ name: m.name, multiplier: m.multiplier })),
]

export const mutationSummary = {
  total: wikiMutations.length,
  purchasable: wikiMutations.filter((m) => !m.eventOnly).length,
  eventOnly: wikiMutations.filter((m) => m.eventOnly).length,
}
