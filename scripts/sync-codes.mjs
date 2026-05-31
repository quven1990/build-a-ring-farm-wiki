#!/usr/bin/env node
/**
 * Weekly community codes sync — fetches public code lists, never marks Verified.
 * Run: node scripts/sync-codes.mjs
 * Output: lib/codes-data.ts, lib/codes-sync-state.json
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { CODE_SYNC_SOURCES } from "./codes-sync-sources.mjs"
import {
  extractCodesForSource,
  isLikelyGameCode,
  normalizeCode,
  pickConsensusReward,
} from "./lib/codes-parse.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const OVERRIDES_PATH = join(__dirname, "codes-sync-overrides.json")
const STATE_PATH = join(ROOT, "lib/codes-sync-state.json")
const OUTPUT_PATH = join(ROOT, "lib/codes-data.ts")

const MIN_SOURCES_TO_LIST = 2
const MIN_SOURCES_FOR_COMMUNITY = 2
const NEW_CODE_DAYS = 14
const FETCH_TIMEOUT_MS = 20_000

/** @typedef {{ code: string, reward: string, sourceIds: string[] }} MergedCode */

/** @param {string} url */
async function fetchSourceHtml(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "buildaring.online-codes-sync/1.0 (+https://buildaring.online/codes; community mirror)",
        Accept: "text/html,application/xhtml+xml",
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.text()
  } finally {
    clearTimeout(timer)
  }
}

/** @returns {Record<string, { reward?: string }>} */
function readOverrides() {
  if (!existsSync(OVERRIDES_PATH)) return {}
  return JSON.parse(readFileSync(OVERRIDES_PATH, "utf8"))
}

/** @returns {{ codeFirstSeen: Record<string, string>, changelog: Array<{ date: string, summary: string }>, archived?: Array<{ code: string, reward: string, removedAt: string }>, lastRewards?: Record<string, string> }} */
function readState() {
  if (!existsSync(STATE_PATH)) {
    return { codeFirstSeen: {}, changelog: [] }
  }
  return JSON.parse(readFileSync(STATE_PATH, "utf8"))
}

/** @param {string} isoDate @param {number} days */
function isWithinDays(isoDate, days) {
  const then = new Date(isoDate).getTime()
  const now = Date.now()
  return now - then <= days * 24 * 60 * 60 * 1000
}

async function main() {
  const overrides = readOverrides()
  const previousState = readState()
  const today = new Date().toISOString().slice(0, 10)

  /** @type {Map<string, { rewards: string[], sourceIds: Set<string> }>} */
  const aggregate = new Map()

  /** @type {Array<{ sourceId: string, name: string, url: string, ok: boolean, error?: string, count: number }>} */
  const sourceResults = []

  for (const source of CODE_SYNC_SOURCES) {
    try {
      const html = await fetchSourceHtml(source.url)
      const parsed = extractCodesForSource(source.id, html)
      let count = 0

      for (const item of parsed) {
        if (!isLikelyGameCode(item.code)) continue
        const code = normalizeCode(item.code)
        const existing = aggregate.get(code) ?? { rewards: [], sourceIds: new Set() }
        if (item.reward) existing.rewards.push(item.reward)
        existing.sourceIds.add(source.id)
        aggregate.set(code, existing)
        count++
      }

      sourceResults.push({
        sourceId: source.id,
        name: source.name,
        url: source.url,
        ok: true,
        count,
      })
      console.log(`✓ ${source.name}: ${count} code entries parsed`)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      sourceResults.push({
        sourceId: source.id,
        name: source.name,
        url: source.url,
        ok: false,
        error: message,
        count: 0,
      })
      console.warn(`✗ ${source.name}: ${message}`)
    }
  }

  const okSources = sourceResults.filter((item) => item.ok)
  if (okSources.length === 0) {
    console.error("No sources fetched successfully — aborting without writing files.")
    process.exit(1)
  }

  /** @type {MergedCode[]} */
  let merged = [...aggregate.entries()]
    .map(([code, data]) => ({
      code,
      reward: pickConsensusReward(data.rewards),
      sourceIds: [...data.sourceIds],
    }))
    .filter((item) => item.sourceIds.length > 0)
    .sort((a, b) => {
      const diff = b.sourceIds.length - a.sourceIds.length
      if (diff !== 0) return diff
      return a.code.localeCompare(b.code)
    })

  merged = merged.filter((item) => item.sourceIds.length >= MIN_SOURCES_TO_LIST)

  /** @type {Record<string, string>} */
  const codeFirstSeen = { ...previousState.codeFirstSeen }
  for (const item of merged) {
    if (!codeFirstSeen[item.code]) {
      codeFirstSeen[item.code] = today
    }
  }

  const activeCodes = new Set(merged.map((item) => item.code))
  /** @type {Array<{ code: string, reward: string, removedAt: string }>} */
  const archived = (previousState.archived ?? []).filter(
    (item) => !activeCodes.has(item.code)
  )

  for (const code of Object.keys(codeFirstSeen)) {
    if (!activeCodes.has(code)) {
      const existingArchive = archived.find((item) => item.code === code)
      if (!existingArchive) {
        archived.unshift({
          code,
          reward: previousState.lastRewards?.[code] ?? "Unknown",
          removedAt: today,
        })
      }
    }
  }

  const added = merged.filter((item) => !previousState.codeFirstSeen?.[item.code]).map((i) => i.code)
  const removed = Object.keys(previousState.codeFirstSeen ?? {}).filter(
    (code) => !activeCodes.has(code)
  )

  const summaryParts = [
    `${merged.length} codes matched across ${okSources.length} public gaming lists.`,
  ]
  if (added.length) summaryParts.push(`New: ${added.join(", ")}.`)
  if (removed.length) summaryParts.push(`Dropped: ${removed.join(", ")}.`)

  const changelogEntry = {
    date: today,
    summary: summaryParts.join(" "),
  }

  const changelog = [changelogEntry, ...(previousState.changelog ?? [])].slice(0, 30)

  /** @type {Record<string, string>} */
  const lastRewards = {}
  for (const item of merged) {
    const override = overrides[item.code]?.reward
    lastRewards[item.code] = override ?? item.reward ?? "See in-game reward"
  }

  const syncState = {
    lastSyncedAt: new Date().toISOString(),
    sources: CODE_SYNC_SOURCES.map((source) => ({
      id: source.id,
      name: source.name,
      url: source.url,
    })),
    sourceResults,
    codeFirstSeen,
    lastRewards,
    archived: archived.slice(0, 20),
    changelog,
  }

  writeFileSync(STATE_PATH, `${JSON.stringify(syncState, null, 2)}\n`, "utf8")

  const ts = generateCodesDataTs(merged, overrides, codeFirstSeen, syncState)
  writeFileSync(OUTPUT_PATH, ts, "utf8")

  console.log("\n" + changelogEntry.summary)
  console.log(`Wrote ${OUTPUT_PATH}`)
  console.log(`Wrote ${STATE_PATH}`)
}

/**
 * @param {MergedCode[]} merged
 * @param {Record<string, { reward?: string }>} overrides
 * @param {Record<string, string>} codeFirstSeen
 * @param {{ lastSyncedAt: string, archived?: Array<{ code: string, reward: string, removedAt: string }> }} syncState
 */
function generateCodesDataTs(merged, overrides, codeFirstSeen, syncState) {
  const entries = merged.map((item) => {
    const sourceCount = item.sourceIds.length
    const status =
      sourceCount >= MIN_SOURCES_FOR_COMMUNITY ? "community" : "needs-testing"
    const reward = overrides[item.code]?.reward ?? item.reward ?? "See in-game reward"
    const firstSeen = codeFirstSeen[item.code] ?? syncState.lastSyncedAt.slice(0, 10)
    const isNew = isWithinDays(firstSeen, NEW_CODE_DAYS)

    return {
      code: item.code,
      reward: reward.replace(/\\/g, "\\\\").replace(/"/g, '\\"'),
      status,
      sourceCount,
      firstSeen,
      isNew,
    }
  })

  const archived = (syncState.archived ?? [])
    .slice(0, 10)
    .map((item) => ({
      code: item.code,
      reward: String(item.reward).replace(/\\/g, "\\\\").replace(/"/g, '\\"'),
      removedAt: item.removedAt,
    }))

  const entriesJson = entries
    .map(
      (item) => `  {
    code: "${item.code}",
    reward: "${item.reward}",
    status: "${item.status}",
    sourceCount: ${item.sourceCount},${item.isNew ? "\n    isNew: true," : ""}
  }`
    )
    .join(",\n")

  const archivedJson = archived.length
    ? archived
        .map(
          (item) => `  {
    code: "${item.code}",
    reward: "${item.reward}",
    removedAt: "${item.removedAt}",
  }`
        )
        .join(",\n")
    : ""

  return `// AUTO-GENERATED by scripts/sync-codes.mjs — do not edit manually.
// Run "pnpm sync:codes" or wait for the weekly GitHub Action.
// Reward overrides: scripts/codes-sync-overrides.json

import syncState from "./codes-sync-state.json"

export type CodeStatus = "verified" | "community" | "needs-testing"

/** Public sync metadata — no third-party URLs exposed on the codes page. */
export const codesSyncMeta = {
  lastSyncedAt: syncState.lastSyncedAt,
  sourceCount: syncState.sources.length,
} as const

export type WikiCode = {
  code: string
  reward: string
  status: CodeStatus
  /** Number of gaming-media lists that included this code on last sync. */
  sourceCount: number
  isNew?: boolean
}

export type ArchivedCode = {
  code: string
  reward: string
  removedAt: string
}

export const wikiCodes: WikiCode[] = [
${entriesJson}
]

export const wikiCodesArchived: ArchivedCode[] = [
${archivedJson}
]

/** Display ordering: new codes first, then higher source consensus, then alphabetical. */
export const wikiCodesSorted = [...wikiCodes].sort((a, b) => {
  const aNew = a.isNew ? 1 : 0
  const bNew = b.isNew ? 1 : 0
  if (bNew !== aNew) return bNew - aNew
  if (b.sourceCount !== a.sourceCount) return b.sourceCount - a.sourceCount
  return a.code.localeCompare(b.code)
})

export function formatSyncDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))
}
`
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
