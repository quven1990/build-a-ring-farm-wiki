/** Earnings logic aligned with https://buildaring.xyz/calculator.html */
export const MAX_SEED_LEVEL = 100
export const MAX_PLANTS = 60
export const SLIDER_SYNC_MAX = 100

export const PLACEMENT_MULTIPLIERS = {
  inner: 7,
  middle: 13,
  outer: 19,
} as const

export type RingPlacement = keyof typeof PLACEMENT_MULTIPLIERS

export const CASH_MULTIPLIERS = [1, 2, 4, 6, 8, 10, 12] as const
export type CashMultiplier = (typeof CASH_MULTIPLIERS)[number]

export function getSeedGrowthRate(seedId: string): number {
  return seedId === "carrot" ? 1.1 : 1.25
}

export function unitPriceAtLevel(
  baseIncome: number,
  level: number,
  growthRate: number
): number {
  return baseIncome * Math.pow(growthRate, level - 1)
}

export function sawBonusFromLevel(sawLevel: number): number {
  return Math.floor((sawLevel * 2) / 3)
}

export function unitsPerHarvest(ring: RingPlacement, sawLevel: number): number {
  const placeMult = PLACEMENT_MULTIPLIERS[ring]
  const sawBonus = sawBonusFromLevel(sawLevel)
  return placeMult * (1 + sawBonus / 7)
}

export type CalculatorInput = {
  baseIncome: number
  seedId: string
  level: number
  sawLevel: number
  sprinklerLevel: number
  growTimeSeconds: number
  ring: RingPlacement
  mutationMultiplier: number
  cashMultiplier: CashMultiplier
  plants: number
}

export type CalculatorResult = {
  unitPriceAtLevel: number
  levelMultiplier: number
  moneyPerUnit: number
  afterCash: number
  unitsPerHarvest: number
  combinedMultiplier: number
  perPlant: number
  totalEarnings: number
  sawBonus: number
  growTimeSeconds: number
  effectiveGrowTimeSeconds: number
}

export function calculateEarnings(input: CalculatorInput): CalculatorResult {
  const growthRate = getSeedGrowthRate(input.seedId)
  const levelMult = Math.pow(growthRate, input.level - 1)
  const unitPrice = unitPriceAtLevel(input.baseIncome, input.level, growthRate)
  const afterCash = unitPrice * input.cashMultiplier
  const moneyPerUnit = afterCash * input.mutationMultiplier
  const units = unitsPerHarvest(input.ring, input.sawLevel)
  const perPlant = moneyPerUnit * units
  const totalEarnings = perPlant * input.plants
  const effectiveGrowTimeSeconds =
    input.growTimeSeconds / Math.max(1, input.sprinklerLevel)

  return {
    unitPriceAtLevel: unitPrice,
    levelMultiplier: levelMult,
    moneyPerUnit,
    afterCash: unitPrice * input.cashMultiplier,
    unitsPerHarvest: units,
    combinedMultiplier: units,
    perPlant,
    totalEarnings,
    sawBonus: sawBonusFromLevel(input.sawLevel),
    growTimeSeconds: input.growTimeSeconds,
    effectiveGrowTimeSeconds,
  }
}

export function formatCalculatorMoney(num: number): string {
  if (num === 0) return "$0"
  const abs = Math.abs(num)
  const tiers: { limit: number; suffix: string }[] = [
    { limit: 1e24, suffix: "Sp" },
    { limit: 1e21, suffix: "Sx" },
    { limit: 1e18, suffix: "Qi" },
    { limit: 1e15, suffix: "Qd" },
    { limit: 1e12, suffix: "T" },
    { limit: 1e9, suffix: "B" },
    { limit: 1e6, suffix: "M" },
    { limit: 1e3, suffix: "K" },
  ]
  for (const { limit, suffix } of tiers) {
    if (abs >= limit) {
      const scaled = num / limit
      const text = scaled.toFixed(3).replace(/\.0+$|\.00$/, "").replace(/\.$/, "")
      return `$${text}${suffix}`
    }
  }
  return `$${num.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
}

export function formatCalculatorMoneyFull(num: number): string {
  return `$${num.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
}

export function formatCalculatorTime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds * 10) / 10}s`.replace(/\.0s$/, "s")
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  if (secs === 0) return `${mins}m`
  return `${mins}m ${secs}s`
}
