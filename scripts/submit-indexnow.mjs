#!/usr/bin/env node
/**
 * Submit sitemap URLs to IndexNow (Bing, Yandex, etc.).
 * Run after deploy: pnpm run indexnow
 *
 * Key file must be live at {SITE_URL}/{KEY}.txt before submission.
 */

const KEY = "0952a95079fc4202a3e4e31cc73d59c7"
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://buildaring.online").replace(
  /\/$/,
  ""
)
const HOST = new URL(SITE_URL).hostname
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
const MAX_URLS_PER_REQUEST = 10_000
const FETCH_TIMEOUT_MS = 30_000

/** @param {string} sitemapUrl */
async function fetchSitemapUrls(sitemapUrl) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(sitemapUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "build-a-ring-farm-wiki-indexnow/1.0" },
    })
    if (!response.ok) {
      throw new Error(`sitemap fetch failed: ${response.status} ${response.statusText}`)
    }
    const xml = await response.text()
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
    if (urls.length === 0) {
      throw new Error("no <loc> entries found in sitemap")
    }
    return urls
  } finally {
    clearTimeout(timer)
  }
}

/** @param {string[]} urlList */
async function submitIndexNow(urlList) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    })
    const body = await response.text()
    return { status: response.status, body }
  } finally {
    clearTimeout(timer)
  }
}

/** @param {string[]} items @param {number} size */
function chunk(items, size) {
  /** @type {string[][]} */
  const batches = []
  for (let i = 0; i < items.length; i += size) {
    batches.push(items.slice(i, i + size))
  }
  return batches
}

async function main() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`
  console.log(`IndexNow: fetching ${sitemapUrl}`)
  const urls = await fetchSitemapUrls(sitemapUrl)
  console.log(`IndexNow: ${urls.length} URL(s) from sitemap`)

  const batches = chunk(urls, MAX_URLS_PER_REQUEST)
  for (const [index, batch] of batches.entries()) {
    const label = batches.length > 1 ? ` (batch ${index + 1}/${batches.length})` : ""
    console.log(`IndexNow: submitting${label}…`)
    const { status, body } = await submitIndexNow(batch)
    if (status === 200 || status === 202) {
      console.log(`IndexNow: accepted (${status})${body ? ` — ${body}` : ""}`)
      continue
    }
    console.error(`IndexNow: failed (${status})${body ? ` — ${body}` : ""}`)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error("IndexNow:", error instanceof Error ? error.message : error)
  process.exit(1)
})
