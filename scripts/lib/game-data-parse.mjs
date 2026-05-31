/** @typedef {{ multiplier?: number, chancePercent?: number, price?: string | null, trigger?: string, eventOnly?: boolean }} ParsedMutation */

/** @typedef {{ baseIncome?: number | null, growTimeSeconds?: number | null, seedCost?: number | null, rarity?: string }} ParsedSeed */

export const MUTATION_NAMES = [
  "Honeycomb",
  "Rainbow",
  "Farm",
  "Alien",
  "Radioactive",
  "Void",
  "Autumn",
  "Frozen",
  "Wet",
]

/** Static UI fields — sync only updates numeric / price / confidence. */
export const MUTATION_CATALOG = [
  { name: "Honeycomb", emoji: "🍯", eventOnly: true, trigger: "Bee Swarm" },
  { name: "Rainbow", emoji: "🌈", eventOnly: false, trigger: "Galaxy" },
  { name: "Farm", emoji: "🚜", eventOnly: true, trigger: "Mega Farm" },
  { name: "Alien", emoji: "👽", eventOnly: true, trigger: "UFO" },
  { name: "Radioactive", emoji: "☢️", eventOnly: false, trigger: "Nuclear" },
  { name: "Void", emoji: "🌑", eventOnly: false, trigger: "Black Hole" },
  { name: "Autumn", emoji: "🍂", eventOnly: false, trigger: "Harvest" },
  { name: "Frozen", emoji: "❄️", eventOnly: false, trigger: "Blizzard" },
  { name: "Wet", emoji: "💧", eventOnly: false, trigger: "Rain" },
]

/** @param {string} html */
export function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, "—")
    .replace(/\s+/g, " ")
}

/** @param {string} raw */
export function parseMoney(raw) {
  if (!raw) return null
  const text = String(raw)
    .trim()
    .replace(/,/g, "")
    .replace(/^\$/, "")
    .toUpperCase()
  if (!text || text === "TBA" || text === "UNKNOWN" || text === "N/A") return null
  const match = text.match(/^([\d.]+)\s*([KMBT])?$/)
  if (!match) return null
  const base = Number.parseFloat(match[1])
  if (!Number.isFinite(base)) return null
  const suffix = match[2]
  const mult =
    suffix === "K"
      ? 1e3
      : suffix === "M"
        ? 1e6
        : suffix === "B"
          ? 1e9
          : suffix === "T"
            ? 1e12
            : 1
  return Math.round(base * mult)
}

/** @param {string} raw */
export function parseGrowTimeSeconds(raw) {
  if (!raw) return null
  const text = String(raw).trim()
  if (/TBA|unknown/i.test(text)) return null
  const sec = text.match(/([\d.]+)\s*seconds?/i)
  if (sec) return Number.parseFloat(sec[1])
  return null
}

/** @param {string} priceText */
export function formatShopPrice(priceText) {
  const value = parseMoney(priceText)
  if (value == null) return null
  if (value >= 1e12) return `$${trimNum(value / 1e12)}T`
  if (value >= 1e9) return `$${trimNum(value / 1e9)}B`
  if (value >= 1e6) return `$${trimNum(value / 1e6)}M`
  if (value >= 1e3) return `$${trimNum(value / 1e3)}K`
  return `$${value.toLocaleString("en-US")}`
}

/** @param {number} n */
function trimNum(n) {
  const fixed = n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2)
  return fixed.replace(/\.0+$/, "")
}

/** @param {string} html @returns {Map<string, ParsedMutation>} */
export function extractMutationsFromProGameGuidesHtml(html) {
  /** @type {Map<string, ParsedMutation>} */
  const found = new Map()

  const rowPattern =
    /<strong>(Honeycomb|Rainbow|Farm|Alien|Radioactive|Void|Autumn|Frozen|Wet)<\/strong><\/td><td[^>]*>([\s\S]*?)<\/td><td[^>]*>([\s\S]*?)<\/td>/gi

  for (const match of html.matchAll(rowPattern)) {
    const name = match[1]
    const detailCell = match[2]
    const howCell = match[3]

    const multMatch = detailCell.match(/([\d.]+)\s*x/i)
    const multiplier = multMatch ? Number.parseFloat(multMatch[1]) : undefined

    const chanceMatch = howCell.match(/([\d.]+)\s*%\s*chance/i)
    const chancePercent = chanceMatch ? Number.parseFloat(chanceMatch[1]) : undefined

    const shopMatch = howCell.match(/\[\$([^\]]+)\]/)
    const price = shopMatch ? formatShopPrice(shopMatch[1]) : null

    const eventOnly = !shopMatch && /Event/i.test(howCell)

    /** @type {ParsedMutation} */
    const entry = {}
    if (multiplier != null) entry.multiplier = multiplier
    if (chancePercent != null) entry.chancePercent = chancePercent
    if (price) entry.price = price
    if (eventOnly) entry.eventOnly = true
    found.set(name, { ...found.get(name), ...entry })
  }

  return found
}

/** @param {string} text @returns {Map<string, ParsedMutation>} */
export function extractMutationsFromProse(text) {
  /** @type {Map<string, ParsedMutation>} */
  const found = new Map()

  for (const name of MUTATION_NAMES) {
    const namePattern =
      name === "Farm"
        ? String.raw`\bFarm\b(?:\s+mutation|\s+event| mutation)`
        : String.raw`\b${name}\b(?:\s+mutation|\s+spray|\s+event| mutation| Spray)`

    const patterns = [
      new RegExp(`${namePattern}[^.]{0,100}?(\\d+(?:\\.\\d+)?)\\s*[x×]`, "i"),
      new RegExp(`(\\d+(?:\\.\\d+)?)\\s*[x×][^.]{0,80}?${namePattern}`, "i"),
      new RegExp(`\\b${name}\\b[^.]{0,80}?(\\d+(?:\\.\\d+)?)\\s*(?:times|×|x)\\b`, "i"),
    ]

    for (const pattern of patterns) {
      const match = pattern.exec(text)
      if (!match) continue
      const multiplier = Number.parseFloat(match[1])
      // Ignore 1x noise from phrases like "Build A Ring Farm".
      if (!Number.isFinite(multiplier) || multiplier <= 1.2 || multiplier > 20) continue
      found.set(name, { multiplier })
      break
    }
  }

  return found
}

/** @param {string} html @returns {Map<string, ParsedSeed>} */
export function extractSeedsFromProGameGuidesHtml(html) {
  /** @type {Map<string, ParsedSeed>} */
  const found = new Map()

  const rowPattern =
    /<strong>([^<]+)<\/strong><br>([A-Za-z]+)<\/td><td[^>]*>[\s\S]*?<strong>Base Income: <\/strong>\$?([^<]+)<br><strong>Grow Time: <\/strong>([^<]+)<br><strong>Seed Cost: <\/strong>\$?([^<]+)/gi

  for (const match of html.matchAll(rowPattern)) {
    const name = match[1].trim()
    const rarity = match[2].trim().toLowerCase()
    const incomeRaw = match[3].trim()
    const growRaw = match[4].trim()
    const costRaw = match[5].trim()

    if (/TBA|\[TBA\]/i.test(incomeRaw + costRaw + growRaw)) {
      found.set(name, {
        baseIncome: /TBA/i.test(incomeRaw) ? null : parseMoney(incomeRaw),
        growTimeSeconds: parseGrowTimeSeconds(growRaw),
        seedCost: /TBA/i.test(costRaw) ? null : parseMoney(costRaw),
        rarity,
      })
      continue
    }

    found.set(name, {
      baseIncome: parseMoney(incomeRaw),
      growTimeSeconds: parseGrowTimeSeconds(growRaw),
      seedCost: parseMoney(costRaw),
      rarity,
    })
  }

  return found
}

/** @param {string} seedName @param {string} id */
export function seedNameMatches(seedName, id, name) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "")
  return norm(seedName) === norm(name) || norm(seedName) === norm(id)
}

/**
 * Pick consensus numeric value from source observations.
 * @param {Array<{ sourceId: string, value: number | null | undefined }>} observations
 * @param {number | null | undefined} baseline
 * @param {{ minSources: number, allowSingleFill: boolean }} options
 */
export function pickConsensusNumber(observations, baseline, options) {
  const values = observations
    .map((o) => o.value)
    .filter((v) => v != null && Number.isFinite(v))

  if (values.length === 0) {
    return { value: baseline ?? null, sourceCount: 0, status: "unchanged" }
  }

  /** @type {Map<number, Set<string>>} */
  const byValue = new Map()
  for (const obs of observations) {
    if (obs.value == null || !Number.isFinite(obs.value)) continue
    const set = byValue.get(obs.value) ?? new Set()
    set.add(obs.sourceId)
    byValue.set(obs.value, set)
  }

  const ranked = [...byValue.entries()].sort((a, b) => b[1].size - a[1].size)
  const [topValue, topSources] = ranked[0]
  const sourceCount = topSources.size

  const baselineMissing =
    baseline == null || baseline === 0 || !Number.isFinite(baseline)

  if (sourceCount >= options.minSources) {
    if (baseline != null && topValue !== baseline) {
      return { value: topValue, sourceCount, status: "updated" }
    }
    return { value: topValue, sourceCount, status: "confirmed" }
  }

  if (options.allowSingleFill && baselineMissing && sourceCount >= 1) {
    return { value: topValue, sourceCount, status: "filled" }
  }

  if (baseline != null && ranked.some(([v, s]) => v !== baseline && s.size >= 1)) {
    return { value: baseline, sourceCount, status: "conflicting" }
  }

  return { value: baseline ?? null, sourceCount, status: "unchanged" }
}

/**
 * @param {string[]} values
 * @param {string | null | undefined} baseline
 * @param {number} minSources
 */
export function pickConsensusString(values, baseline, minSources) {
  const cleaned = values.map((v) => v?.trim()).filter(Boolean)
  if (cleaned.length === 0) return { value: baseline ?? null, sourceCount: 0, status: "unchanged" }

  /** @type {Map<string, number>} */
  const counts = new Map()
  for (const v of cleaned) counts.set(v, (counts.get(v) ?? 0) + 1)

  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1])
  const [topValue, topCount] = ranked[0]

  if (topCount >= minSources) {
    if (baseline && topValue !== baseline) return { value: topValue, sourceCount: topCount, status: "updated" }
    return { value: topValue, sourceCount: topCount, status: "confirmed" }
  }

  if (baseline && ranked.some(([v, c]) => v !== baseline && c >= 1)) {
    return { value: baseline, sourceCount: topCount, status: "conflicting" }
  }

  return { value: baseline ?? topValue, sourceCount: topCount, status: "unchanged" }
}

/** @param {string} sourceId @param {string} html @param {string[]} kind */
export function extractForSource(sourceId, html, kinds) {
  /** @type {{ seeds: Map<string, ParsedSeed>, mutations: Map<string, ParsedMutation> }} */
  const result = { seeds: new Map(), mutations: new Map() }
  const text = htmlToText(html)

  if (kinds.includes("seeds-structured")) {
    for (const [name, data] of extractSeedsFromProGameGuidesHtml(html)) {
      result.seeds.set(name, data)
    }
  }

  if (kinds.includes("mutations-structured")) {
    for (const [name, data] of extractMutationsFromProGameGuidesHtml(html)) {
      result.mutations.set(name, data)
    }
  }

  if (kinds.includes("prose")) {
    for (const [name, data] of extractMutationsFromProse(text)) {
      const prev = result.mutations.get(name) ?? {}
      result.mutations.set(name, { ...prev, ...data })
    }
  }

  return result
}
