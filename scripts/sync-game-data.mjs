#!/usr/bin/env node
/**
 * Weekly seeds & mutations sync — multi-source consensus, never auto-verified.
 * Run: node scripts/sync-game-data.mjs
 * Output: lib/seeds-data.json, lib/mutations-data.generated.ts, lib/game-data-sync-state.json
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { GAME_DATA_SOURCES } from "./game-data-sync-sources.mjs"
import {
  MUTATION_CATALOG,
  extractForSource,
  pickConsensusNumber,
  pickConsensusString,
  seedNameMatches,
} from "./lib/game-data-parse.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const SEEDS_PATH = join(ROOT, "lib/seeds-data.json")
const MUTATIONS_GENERATED_PATH = join(ROOT, "lib/mutations-data.generated.ts")
const STATE_PATH = join(ROOT, "lib/game-data-sync-state.json")
const OVERRIDES_PATH = join(__dirname, "game-data-overrides.json")

const MIN_SOURCES_TO_RUN = 2
const MIN_SOURCES_TO_CHANGE = 2
const FETCH_TIMEOUT_MS = 25_000

/** @param {string} url */
async function fetchSourceHtml(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "buildaring.online-game-data-sync/1.0 (+https://buildaring.online/seeds; community mirror)",
        Accept: "text/html,application/xhtml+xml",
      },
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.text()
  } finally {
    clearTimeout(timer)
  }
}

function readOverrides() {
  if (!existsSync(OVERRIDES_PATH)) return { seeds: {}, mutations: {} }
  return JSON.parse(readFileSync(OVERRIDES_PATH, "utf8"))
}

function readState() {
  if (!existsSync(STATE_PATH)) return { changelog: [] }
  return JSON.parse(readFileSync(STATE_PATH, "utf8"))
}

/** @returns {Array<{ name: string, emoji: string, multiplier: number, chancePercent: number, trigger: string, price: string | null, eventOnly: boolean, confidence?: string }>} */
function readBaselineMutations(previousState) {
  if (previousState.mutationsSnapshot?.length) {
    return previousState.mutationsSnapshot
  }

  return MUTATION_CATALOG.map((catalog) => {
    const defaults = baselineMutationsFromCatalog(catalog)
    return {
      name: catalog.name,
      emoji: catalog.emoji,
      multiplier: defaults.multiplier,
      chancePercent: defaults.chancePercent,
      trigger: catalog.trigger,
      price: catalog.eventOnly ? null : defaults.price,
      eventOnly: catalog.eventOnly,
      confidence: "community",
    }
  })
}

/** @param {unknown} confidence */
function resolveConfidence(confidence, hasConflict, sourceCount, incomplete) {
  if (confidence === "verified") return "verified"
  if (hasConflict) return "conflicting"
  if (incomplete) return "needs-testing"
  if (sourceCount >= MIN_SOURCES_TO_CHANGE) return "community"
  if (sourceCount >= 1) return "community"
  return "needs-testing"
}

async function main() {
  const overrides = readOverrides()
  const previousState = readState()
  const baselineMutationRows = readBaselineMutations(previousState)
  const today = new Date().toISOString().slice(0, 10)

  /** @type {import('./lib/seeds-data.ts').Seed[]} */
  const baselineSeeds = JSON.parse(readFileSync(SEEDS_PATH, "utf8"))

  /** @type {Array<{ sourceId: string, name: string, ok: boolean, error?: string }>} */
  const sourceResults = []

  /** @type {Map<string, Map<string, { multiplier?: number, chancePercent?: number, price?: string | null }>>} */
  const mutationObs = new Map()
  /** @type {Map<string, Map<string, { baseIncome?: number | null, growTimeSeconds?: number | null, seedCost?: number | null }>>} */
  const seedObs = new Map()

  for (const source of GAME_DATA_SOURCES) {
    try {
      const html = await fetchSourceHtml(source.url)
      const parsed = extractForSource(source.id, html, source.kinds)

      for (const [name, data] of parsed.mutations) {
        if (!mutationObs.has(name)) mutationObs.set(name, new Map())
        mutationObs.get(name).set(source.id, data)
      }

      for (const [name, data] of parsed.seeds) {
        if (!seedObs.has(name)) seedObs.set(name, new Map())
        seedObs.get(name).set(source.id, data)
      }

      sourceResults.push({ sourceId: source.id, name: source.name, ok: true })
      console.log(
        `✓ ${source.name}: ${parsed.mutations.size} mutations, ${parsed.seeds.size} seeds parsed`
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      sourceResults.push({
        sourceId: source.id,
        name: source.name,
        ok: false,
        error: message,
      })
      console.warn(`✗ ${source.name}: ${message}`)
    }
  }

  const okCount = sourceResults.filter((s) => s.ok).length
  if (okCount < MIN_SOURCES_TO_RUN) {
    console.error(`Only ${okCount}/${GAME_DATA_SOURCES.length} sources OK — aborting without writes.`)
    process.exit(1)
  }

  /** @type {import('../lib/mutations-data.ts').WikiMutation[]} */
  const mergedMutations = []
  /** @type {string[]} */
  const mutationChanges = []

  for (const catalog of MUTATION_CATALOG) {
    const name = catalog.name
    const obsMap = mutationObs.get(name) ?? new Map()
    const override = overrides.mutations?.[name] ?? {}
    const prev =
      baselineMutationRows.find((row) => row.name === name) ??
      baselineMutationsFromCatalog(catalog)

    const multObs = [...obsMap.entries()].map(([sourceId, d]) => ({
      sourceId,
      value: d.multiplier,
    }))
    const mult = pickConsensusNumber(
      multObs,
      override.multiplier ?? prev.multiplier,
      { minSources: MIN_SOURCES_TO_CHANGE, allowSingleFill: false }
    )

    const chanceObs = [...obsMap.entries()].map(([sourceId, d]) => ({
      sourceId,
      value: d.chancePercent,
    }))
    const chance = pickConsensusNumber(
      chanceObs,
      override.chancePercent ?? prev.chancePercent,
      { minSources: MIN_SOURCES_TO_CHANGE, allowSingleFill: false }
    )

    const priceObs = [...obsMap.values()]
      .map((d) => d.price)
      .filter((p) => p != null)
    const pricePick = pickConsensusString(
      priceObs,
      override.price ?? prev.price,
      MIN_SOURCES_TO_CHANGE
    )

    const hasConflict =
      mult.status === "conflicting" ||
      chance.status === "conflicting" ||
      pricePick.status === "conflicting"

    const maxSourceCount = Math.max(mult.sourceCount, chance.sourceCount, pricePick.sourceCount)

    const confidence = resolveConfidence(
      override.confidence,
      hasConflict,
      maxSourceCount,
      false
    )

    if (mult.status === "updated") mutationChanges.push(`${name} multiplier → ${mult.value}x`)
    if (chance.status === "updated") mutationChanges.push(`${name} chance → ${chance.value}%`)

    mergedMutations.push({
      name,
      emoji: catalog.emoji,
      multiplier: mult.value ?? prev.multiplier,
      chancePercent: chance.value ?? prev.chancePercent,
      trigger: override.trigger ?? catalog.trigger,
      price: catalog.eventOnly ? null : (pricePick.value ?? prev.price),
      eventOnly: catalog.eventOnly,
      confidence,
      chanceIsEstimate: true,
      sourceCount: maxSourceCount,
      ...(override.notes ? { notes: override.notes } : {}),
    })
  }

  /** @type {import('./lib/seeds-data.ts').Seed[]} */
  const mergedSeeds = []
  /** @type {string[]} */
  const seedChanges = []

  for (const seed of baselineSeeds) {
    const override = overrides.seeds?.[seed.id] ?? overrides.seeds?.[seed.name] ?? {}

    /** @type {Map<string, { baseIncome?: number | null, growTimeSeconds?: number | null, seedCost?: number | null }>} */
    let observations = new Map()
    for (const [parsedName, bySource] of seedObs) {
      if (seedNameMatches(parsedName, seed.id, seed.name)) {
        observations = bySource
        break
      }
    }

    const incomeObs = [...observations.entries()].map(([sourceId, d]) => ({
      sourceId,
      value: d.baseIncome,
    }))
    const income = pickConsensusNumber(
      incomeObs,
      override.baseIncome ?? seed.baseIncome,
      { minSources: MIN_SOURCES_TO_CHANGE, allowSingleFill: true }
    )

    const growObs = [...observations.entries()].map(([sourceId, d]) => ({
      sourceId,
      value: d.growTimeSeconds,
    }))
    const grow = pickConsensusNumber(
      growObs,
      override.growTimeSeconds ?? seed.growTimeSeconds,
      { minSources: MIN_SOURCES_TO_CHANGE, allowSingleFill: true }
    )

    const costObs = [...observations.entries()].map(([sourceId, d]) => ({
      sourceId,
      value: d.seedCost,
    }))
    const cost = pickConsensusNumber(
      costObs,
      override.seedCost ?? seed.seedCost,
      { minSources: MIN_SOURCES_TO_CHANGE, allowSingleFill: true }
    )

    const hasConflict =
      income.status === "conflicting" ||
      grow.status === "conflicting" ||
      cost.status === "conflicting"

    const maxSourceCount = Math.max(income.sourceCount, grow.sourceCount, cost.sourceCount)
    const incomplete =
      (income.value == null || income.value <= 0) || grow.value == null

    let confidence = resolveConfidence(
      override.confidence ?? seed.confidence,
      hasConflict,
      maxSourceCount,
      incomplete
    )

    if (income.status === "updated") seedChanges.push(`${seed.name} income → ${income.value}`)
    if (grow.status === "updated") seedChanges.push(`${seed.name} grow → ${grow.value}s`)

    mergedSeeds.push({
      ...seed,
      baseIncome: income.value ?? seed.baseIncome,
      growTimeSeconds: grow.value ?? seed.growTimeSeconds,
      seedCost: cost.value ?? seed.seedCost,
      confidence,
      sourceCount: maxSourceCount,
      ...(override.notes ?? seed.notes ? { notes: override.notes ?? seed.notes } : {}),
    })
  }

  const summaryParts = [
    `Synced ${mergedSeeds.length} seeds & ${mergedMutations.length} mutations from ${okCount} public lists.`,
  ]
  if (seedChanges.length) summaryParts.push(`Seed updates: ${seedChanges.slice(0, 5).join("; ")}${seedChanges.length > 5 ? "…" : ""}.`)
  if (mutationChanges.length) summaryParts.push(`Mutation updates: ${mutationChanges.join("; ")}.`)
  if (!seedChanges.length && !mutationChanges.length) summaryParts.push("No consensus field changes this run.")

  const changelogEntry = { date: today, summary: summaryParts.join(" ") }
  const changelog = [changelogEntry, ...(previousState.changelog ?? [])].slice(0, 30)

  const syncState = {
    lastSyncedAt: new Date().toISOString(),
    sources: GAME_DATA_SOURCES.map((s) => ({ id: s.id, name: s.name, url: s.url })),
    sourceResults,
    seedChanges,
    mutationChanges,
    mutationsSnapshot: mergedMutations.map(({ name, emoji, multiplier, chancePercent, trigger, price, eventOnly, confidence }) => ({
      name,
      emoji,
      multiplier,
      chancePercent,
      trigger,
      price,
      eventOnly,
      confidence,
    })),
    changelog,
  }

  writeFileSync(SEEDS_PATH, `${JSON.stringify(mergedSeeds, null, 2)}\n`, "utf8")
  writeFileSync(MUTATIONS_GENERATED_PATH, generateMutationsTs(mergedMutations), "utf8")
  writeFileSync(STATE_PATH, `${JSON.stringify(syncState, null, 2)}\n`, "utf8")

  console.log("\n" + changelogEntry.summary)
  console.log(`Wrote ${SEEDS_PATH}`)
  console.log(`Wrote ${MUTATIONS_GENERATED_PATH}`)
  console.log(`Wrote ${STATE_PATH}`)
}

/** @param {typeof MUTATION_CATALOG[number]} catalog */
function baselineMutationsFromCatalog(catalog) {
  const defaults = {
    Honeycomb: { multiplier: 6.5, chancePercent: 0.5, price: null },
    Rainbow: { multiplier: 5, chancePercent: 1, price: "$1T" },
    Farm: { multiplier: 4, chancePercent: 1.5, price: null },
    Alien: { multiplier: 3.25, chancePercent: 2.5, price: null },
    Radioactive: { multiplier: 3, chancePercent: 2, price: "$10B" },
    Void: { multiplier: 2.25, chancePercent: 3, price: "$1B" },
    Autumn: { multiplier: 2, chancePercent: 3.5, price: "$850M" },
    Frozen: { multiplier: 1.75, chancePercent: 4, price: "$750M" },
    Wet: { multiplier: 1.5, chancePercent: 8, price: "$10M" },
  }
  return defaults[catalog.name] ?? { multiplier: 1, chancePercent: 0, price: null }
}

/** @param {Array<{ name: string, emoji: string, multiplier: number, chancePercent: number, trigger: string, price: string | null, eventOnly: boolean, confidence: string, chanceIsEstimate?: boolean, sourceCount?: number, notes?: string }>} mutations */
function generateMutationsTs(mutations) {
  const entries = mutations
    .map((m) => {
      const lines = [
        `    name: ${JSON.stringify(m.name)},`,
        `    emoji: ${JSON.stringify(m.emoji)},`,
        `    multiplier: ${m.multiplier},`,
        `    chancePercent: ${m.chancePercent},`,
        `    trigger: ${JSON.stringify(m.trigger)},`,
        `    price: ${m.price ? JSON.stringify(m.price) : "null"},`,
        `    eventOnly: ${m.eventOnly},`,
        `    confidence: ${JSON.stringify(m.confidence)},`,
        `    chanceIsEstimate: true,`,
        `    sourceCount: ${m.sourceCount ?? 0},`,
      ]
      if (m.notes) lines.push(`    notes: ${JSON.stringify(m.notes)},`)
      return `  {\n${lines.join("\n")}\n  }`
    })
    .join(",\n")

  return `// AUTO-GENERATED by scripts/sync-game-data.mjs — do not edit manually.
// Run "pnpm sync:game-data" or wait for the weekly GitHub Action.
// Manual overrides: scripts/game-data-overrides.json

import type { WikiMutation } from "./mutations-data"

export const wikiMutationsGenerated: WikiMutation[] = [
${entries}
]
`
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
