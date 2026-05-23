import { wikiMutations } from "@/lib/mutations-data"

export type MutationOption = {
  key: string
  name: string
  emoji: string
  multiplier: number
}

export const calculatorMutationOptions: MutationOption[] = [
  { key: "none", name: "None", emoji: "🌱", multiplier: 1 },
  ...wikiMutations.map((m) => ({
    key: m.name.toLowerCase(),
    name: m.name,
    emoji: m.emoji,
    multiplier: m.multiplier,
  })),
]

export const ringOptions = [
  { key: "inner" as const, label: "Inner", emoji: "💍", multiplier: 7 },
  { key: "middle" as const, label: "Middle", emoji: "⭕", multiplier: 13 },
  { key: "outer" as const, label: "Outer", emoji: "🌐", multiplier: 19 },
]

export const cashMultiplierOptions = [
  { value: 1, label: "None", emoji: "💎" },
  { value: 2, label: "×2", emoji: "💎" },
  { value: 4, label: "×4", emoji: "💎" },
  { value: 6, label: "×6", emoji: "💎" },
  { value: 8, label: "×8", emoji: "💎" },
  { value: 10, label: "×10", emoji: "💎" },
  { value: 12, label: "×12", emoji: "💎" },
]
