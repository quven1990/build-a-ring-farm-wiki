/** @typedef {{ code: string, reward: string }} ParsedCode */

const CODE_DENYLIST = new Set([
  "ACTIVE",
  "BUILD",
  "COPY",
  "CODES",
  "CODE",
  "DISCORD",
  "EMAIL",
  "ENTER",
  "EXPIRED",
  "FAQ",
  "FARM",
  "HTML",
  "HTTP",
  "HTTPS",
  "IMAGE",
  "MAY",
  "NEW",
  "NEWS",
  "REDEEM",
  "RING",
  "ROBLOX",
  "SETTINGS",
  "STATUS",
  "SYMBOLS",
  "UPDATE",
  "WIKI",
  "WORKING",
])

/** @param {string} code */
export function normalizeCode(code) {
  return code.trim().toUpperCase()
}

/** @param {string} reward */
export function normalizeReward(reward) {
  return reward
    .replace(/<[^>]+>/g, " ")
    .replace(/\s*\((?:NEW|new|[^)]*mark[^)]*)\)\s*/gi, " ")
    .replace(/\s*\([^)]*\)\s*$/g, "")
    .replace(/\s+/g, " ")
    .replace(/^a\s+/i, "")
    .replace(/^an\s+/i, "")
    .replace(/×/g, "x")
    .trim()
}

/** @param {string} html @returns {ParsedCode[]} */
export function extractFromListItemHtml(html) {
  /** @type {ParsedCode[]} */
  const found = []
  const pattern =
    /<li[^>]*>[\s\S]*?<strong>(?:<strong>)?([A-Z0-9:]+)(?:<\/strong>)+[\s\S]*?[—–-]\s*(?:Redeem for\s*)?([^<]+)<\/li>/gi
  for (const match of html.matchAll(pattern)) {
    const code = normalizeCode(match[1])
    if (!isLikelyGameCode(code)) continue
    found.push({ code, reward: normalizeReward(match[2]) })
  }
  return found
}

/** @param {string} html @returns {ParsedCode[]} */
export function extractFromJsonLdListItems(html) {
  /** @type {ParsedCode[]} */
  const found = []
  const pattern =
    /"name"\s*:\s*"(?:\\u003c|<)strong(?:\\u003e|>)([A-Z0-9:]+)(?:\\u003c|<)\/strong(?:\\u003e|>)\s*(?:\\u2013|–|—|-)\s*([^"]+)"/gi
  for (const match of html.matchAll(pattern)) {
    const code = normalizeCode(match[1])
    if (!isLikelyGameCode(code)) continue
    found.push({ code, reward: normalizeReward(match[2]) })
  }
  return found
}

/** @param {string} code */
export function isLikelyGameCode(code) {
  const normalized = normalizeCode(code)
  if (normalized.length < 3 || normalized.length > 24) return false
  if (CODE_DENYLIST.has(normalized)) return false
  if (!/^[A-Z0-9][A-Z0-9_:.-]*$/.test(normalized)) return false
  if (/^\d+$/.test(normalized)) return false
  // Typical BARF codes include digits, colon, or are 5+ chars
  if (normalized.length < 5 && !/[:0-9]/.test(normalized)) return false
  return true
}

/** @param {string} html */
export function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, "—")
    .replace(/\s+/g, " ")
}

/**
 * Comma lists in FAQ / quick answer copy.
 * @param {string} text
 * @returns {string[]}
 */
export function extractCodeListFromProse(text) {
  /** @type {Set<string>} */
  const codes = new Set()
  const patterns = [
    /(?:codes are|listed as active|working Build A Ring Farm codes are|current working[^:]*:)\s*([A-Z0-9,:\s]+(?:,\s*and\s+[A-Z0-9_:.-]+)?)/gi,
    /\b([A-Z][A-Z0-9_:.-]{3,22})\b(?:\s*,\s*([A-Z][A-Z0-9_:.-]{3,22}))+/g,
  ]

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const chunk = match[1] ?? match[0]
      for (const part of chunk.split(/,\s*|\s+and\s+/)) {
        const code = normalizeCode(part.replace(/[.\s]+$/g, ""))
        if (isLikelyGameCode(code)) codes.add(code)
      }
    }
  }

  return [...codes]
}

/** @param {string} html @returns {ParsedCode[]} */
export function extractFromBeebomHtml(html) {
  /** @type {ParsedCode[]} */
  const found = []
  const pattern = /<strong>([A-Z0-9:]+)<\/strong>\s*:\s*([^<]+)/gi
  for (const match of html.matchAll(pattern)) {
    const code = normalizeCode(match[1])
    if (!isLikelyGameCode(code)) continue
    found.push({ code, reward: normalizeReward(match[2]) })
  }
  return found
}

/** @param {string} html @returns {ParsedCode[]} */
export function extractFromGamesRadarHtml(html) {
  const fromJsonLd = extractFromJsonLdListItems(html)
  if (fromJsonLd.length > 0) return fromJsonLd

  /** @type {ParsedCode[]} */
  const found = []
  const pattern = /<strong>([A-Z0-9:]+)<\/strong>\s*[–—-]\s*([^<]+)/gi
  for (const match of html.matchAll(pattern)) {
    const code = normalizeCode(match[1])
    if (!isLikelyGameCode(code)) continue
    found.push({ code, reward: normalizeReward(match[2]) })
  }
  return found
}

/** @param {string} html @returns {ParsedCode[]} */
export function extractFromBuildaringFarmHtml(html) {
  /** @type {ParsedCode[]} */
  const found = []

  const tablePattern = /`([A-Z0-9:]+)`\s*\|\s*([^|]{3,100}?)\s*\|/gi
  for (const match of html.matchAll(tablePattern)) {
    const code = normalizeCode(match[1])
    if (!isLikelyGameCode(code)) continue
    found.push({ code, reward: normalizeReward(match[2]) })
  }

  const cardPattern = />([A-Z0-9:]+)<\/[^>]+>\s*([^<]{3,80}?)\s*Copy/gi
  for (const match of html.matchAll(cardPattern)) {
    const code = normalizeCode(match[1])
    if (!isLikelyGameCode(code)) continue
    found.push({ code, reward: normalizeReward(match[2]) })
  }

  for (const item of extractFromJsonLdListItems(html)) {
    if (!found.some((entry) => entry.code === item.code)) found.push(item)
  }

  const text = htmlToText(html)
  for (const code of extractCodeListFromProse(text)) {
    if (!found.some((item) => item.code === code)) {
      found.push({ code, reward: "" })
    }
  }

  return found
}

/** @param {string} html @returns {ParsedCode[]} */
export function extractFromDestructoidHtml(html) {
  const fromList = extractFromListItemHtml(html)
  if (fromList.length > 0) return fromList

  const text = htmlToText(html)
  /** @type {ParsedCode[]} */
  const found = []
  for (const line of text.split(/\s{2,}|\n/g)) {
    const match = line.match(
      /^([A-Z0-9:]+)\s*[—–-]\s*(?:Redeem for\s*)?(.+?)\.?(?:\s+Image|\s+Related|\s*$)/i
    )
    if (!match) continue
    const code = normalizeCode(match[1])
    if (!isLikelyGameCode(code)) continue
    let reward = normalizeReward(match[2])
    reward = reward.replace(/\s+[A-Z0-9_:.-]{4,}\s*$/, "").trim()
    found.push({ code, reward })
  }
  for (const code of extractCodeListFromProse(text)) {
    if (!found.some((item) => item.code === code)) {
      found.push({ code, reward: "" })
    }
  }
  return found
}

/**
 * @param {string} sourceId
 * @param {string} html
 * @returns {ParsedCode[]}
 */
export function extractCodesForSource(sourceId, html) {
  switch (sourceId) {
    case "beebom":
      return extractFromBeebomHtml(html)
    case "gamesradar":
      return extractFromGamesRadarHtml(html)
    case "buildaringfarm-co":
      return extractFromBuildaringFarmHtml(html)
    case "destructoid":
      return extractFromDestructoidHtml(html)
    default:
      return extractCodeListFromProse(htmlToText(html)).map((code) => ({
        code,
        reward: "",
      }))
  }
}

/**
 * Pick the most common non-empty reward string.
 * @param {string[]} rewards
 */
export function pickConsensusReward(rewards) {
  const cleaned = rewards.map(normalizeReward).filter(Boolean)
  if (cleaned.length === 0) return "See in-game reward"

  /** @type {Map<string, number>} */
  const counts = new Map()
  for (const reward of cleaned) {
    counts.set(reward, (counts.get(reward) ?? 0) + 1)
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0]
}
