import { wikiCodes } from "@/lib/codes-data"
import { wikiMutations } from "@/lib/mutations-data"
import { rarityOrder, seeds } from "@/lib/seeds-data"

export const wikiStats = {
  seeds: seeds.length,
  rarities: rarityOrder.length,
  mutations: wikiMutations.length,
  codes: wikiCodes.length,
} as const
