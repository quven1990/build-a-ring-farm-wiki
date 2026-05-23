export type WikiMutation = {
  name: string
  emoji: string
  multiplier: number
  chancePercent: number
  trigger: string
  price: string | null
  eventOnly: boolean
}

/** Source: https://buildaringfarm.net/mutations/ */
export const wikiMutations: WikiMutation[] = [
  {
    name: "Honeycomb",
    emoji: "🍯",
    multiplier: 6.5,
    chancePercent: 0.5,
    trigger: "Bee Swarm",
    price: null,
    eventOnly: true,
  },
  {
    name: "Rainbow",
    emoji: "🌈",
    multiplier: 5,
    chancePercent: 1,
    trigger: "Galaxy",
    price: "$1T",
    eventOnly: false,
  },
  {
    name: "Farm",
    emoji: "🚜",
    multiplier: 4,
    chancePercent: 1.5,
    trigger: "Mega Farm",
    price: null,
    eventOnly: true,
  },
  {
    name: "Alien",
    emoji: "👽",
    multiplier: 3.25,
    chancePercent: 2.5,
    trigger: "UFO",
    price: null,
    eventOnly: true,
  },
  {
    name: "Radioactive",
    emoji: "☢️",
    multiplier: 3,
    chancePercent: 2,
    trigger: "Nuclear",
    price: "$10B",
    eventOnly: false,
  },
  {
    name: "Void",
    emoji: "🌑",
    multiplier: 2.25,
    chancePercent: 3,
    trigger: "Black Hole",
    price: "$1B",
    eventOnly: false,
  },
  {
    name: "Autumn",
    emoji: "🍂",
    multiplier: 2,
    chancePercent: 3.5,
    trigger: "Harvest",
    price: "$850M",
    eventOnly: false,
  },
  {
    name: "Frozen",
    emoji: "❄️",
    multiplier: 1.75,
    chancePercent: 4,
    trigger: "Blizzard",
    price: "$750M",
    eventOnly: false,
  },
  {
    name: "Wet",
    emoji: "💧",
    multiplier: 1.5,
    chancePercent: 8,
    trigger: "Rain",
    price: "$10M",
    eventOnly: false,
  },
]

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
