#!/usr/bin/env node
/**
 * Pull Plausible + GA4 (+ optional GSC) into stdout JSON for local analysis.
 * Reads ../.env.local — never commit secrets.
 */
import { readFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { createSign } from "node:crypto"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const envPath = join(root, ".env.local")

function loadEnv() {
  if (!existsSync(envPath)) return {}
  const out = {}
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim()
    if (!t || t.startsWith("#")) continue
    const i = t.indexOf("=")
    if (i === -1) continue
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim()
  }
  return out
}

const env = loadEnv()

async function plausibleQuery(body) {
  const base = env.PLAUSIBLE_API_BASE || "https://plausible.shipsolo.io"
  const res = await fetch(`${base}/api/v2/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.PLAUSIBLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ site_id: env.PLAUSIBLE_SITE_ID || "buildaring.online", ...body }),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`Plausible ${res.status}: ${text}`)
  return JSON.parse(text)
}

async function plausibleV1(path, params) {
  const base = env.PLAUSIBLE_API_BASE || "https://plausible.shipsolo.io"
  const q = new URLSearchParams({ site_id: env.PLAUSIBLE_SITE_ID || "buildaring.online", ...params })
  const res = await fetch(`${base}/api/v1/stats/${path}?${q}`, {
    headers: { Authorization: `Bearer ${env.PLAUSIBLE_API_KEY}` },
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`Plausible v1 ${res.status}: ${text}`)
  return JSON.parse(text)
}

function base64url(input) {
  return Buffer.from(input).toString("base64url")
}

async function getGoogleAccessToken(scopes) {
  const credPath = env.GOOGLE_APPLICATION_CREDENTIALS
  if (!credPath || !existsSync(credPath)) return null
  const cred = JSON.parse(readFileSync(credPath, "utf8"))
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claim = base64url(
    JSON.stringify({
      iss: cred.client_email,
      scope: scopes.join(" "),
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  )
  const signInput = `${header}.${claim}`
  const sign = createSign("RSA-SHA256")
  sign.update(signInput)
  const signature = sign.sign(cred.private_key).toString("base64url")
  const jwt = `${signInput}.${signature}`

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  })
  const data = await res.json()
  if (!data.access_token) throw new Error(`Google auth: ${JSON.stringify(data)}`)
  return data.access_token
}

async function ga4Report(accessToken, body) {
  const propertyId = env.GA4_PROPERTY_ID
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
  const text = await res.text()
  if (!res.ok) throw new Error(`GA4 ${res.status}: ${text}`)
  return JSON.parse(text)
}

async function gscQuery(accessToken, siteUrl, body) {
  const enc = encodeURIComponent(siteUrl)
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${enc}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
  const text = await res.text()
  if (!res.ok) throw new Error(`GSC ${res.status}: ${text}`)
  return JSON.parse(text)
}

/** GSC domain properties use sc-domain: — not https:// */
async function resolveGscSiteUrl(accessToken) {
  if (env.GSC_SITE_URL) return env.GSC_SITE_URL
  const res = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`GSC sites list ${res.status}: ${text}`)
  const data = JSON.parse(text)
  const entries = data.siteEntry ?? []
  const match =
    entries.find((e) => e.siteUrl === "sc-domain:buildaring.online") ??
    entries.find((e) => e.siteUrl?.includes("buildaring.online"))
  if (!match) {
    throw new Error(
      `No GSC property for buildaring.online. Available: ${entries.map((e) => e.siteUrl).join(", ") || "none"}`
    )
  }
  return match.siteUrl
}

function fmtDate(d) {
  return d.toISOString().slice(0, 10)
}

export async function pullAnalyticsReport() {
  const today = new Date()
  const d28 = new Date(today)
  d28.setDate(d28.getDate() - 28)
  const d7 = new Date(today)
  d7.setDate(d7.getDate() - 7)
  const d14 = new Date(today)
  d14.setDate(d14.getDate() - 14)

  const report = { generatedAt: new Date().toISOString(), plausible: null, ga4: null, gsc: null, errors: [] }

try {
  const [agg28, pages28, sources28, goals28, timeseries28] = await Promise.all([
    plausibleQuery({
      metrics: ["visitors", "visits", "pageviews", "bounce_rate", "visit_duration"],
      date_range: "28d",
    }),
    plausibleQuery({
      metrics: ["visitors", "pageviews"],
      date_range: "28d",
      dimensions: ["event:page"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 15 },
    }),
    plausibleQuery({
      metrics: ["visitors"],
      date_range: "28d",
      dimensions: ["visit:source"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 10 },
    }),
    plausibleQuery({
      metrics: ["events", "conversion_rate"],
      date_range: "28d",
      dimensions: ["event:goal"],
      order_by: [["events", "desc"]],
      pagination: { limit: 20 },
    }),
    plausibleQuery({
      metrics: ["visitors", "pageviews"],
      date_range: [fmtDate(d28), fmtDate(today)],
      dimensions: ["time:day"],
      order_by: [["time:day", "asc"]],
    }),
  ])

  report.plausible = {
    aggregate28d: agg28.results?.[0]?.metrics,
    topPages: pages28.results?.map((r) => ({
      page: r.dimensions[0],
      visitors: r.metrics[0],
      pageviews: r.metrics[1],
    })),
    topSources: sources28.results?.map((r) => ({
      source: r.dimensions[0],
      visitors: r.metrics[0],
    })),
    goals28d: goals28.results?.map((r) => ({
      goal: r.dimensions[0],
      events: r.metrics[0],
      conversionRate: r.metrics[1],
    })),
    dailyTrend: timeseries28.results?.map((r) => ({
      day: r.dimensions[0],
      visitors: r.metrics[0],
      pageviews: r.metrics[1],
    })),
  }
} catch (e) {
  report.errors.push(`Plausible: ${e.message}`)
}

try {
  const token = await getGoogleAccessToken(["https://www.googleapis.com/auth/analytics.readonly"])
  if (!token) throw new Error("No GOOGLE_APPLICATION_CREDENTIALS")

  const [gaAgg, gaPages, gaSources, gaDevices] = await Promise.all([
    ga4Report(token, {
      dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
    }),
    ga4Report(token, {
      dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 15,
    }),
    ga4Report(token, {
      dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    }),
    ga4Report(token, {
      dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
    }),
  ])

  const row = (r) => r.metricValues?.map((m) => m.value) ?? []
  report.ga4 = {
    aggregate28d: {
      activeUsers: row(gaAgg.rows?.[0])[0],
      sessions: row(gaAgg.rows?.[0])[1],
      pageviews: row(gaAgg.rows?.[0])[2],
      bounceRate: row(gaAgg.rows?.[0])[3],
      avgSessionSec: row(gaAgg.rows?.[0])[4],
    },
    topPages: gaPages.rows?.map((r) => ({
      path: r.dimensionValues[0].value,
      users: r.metricValues[0].value,
      pageviews: r.metricValues[1].value,
    })),
    channels: gaSources.rows?.map((r) => ({
      channel: r.dimensionValues[0].value,
      users: r.metricValues[0].value,
      sessions: r.metricValues[1].value,
    })),
    devices: gaDevices.rows?.map((r) => ({
      device: r.dimensionValues[0].value,
      users: r.metricValues[0].value,
    })),
  }
} catch (e) {
  report.errors.push(`GA4: ${e.message}`)
}

try {
  const token = await getGoogleAccessToken(["https://www.googleapis.com/auth/webmasters.readonly"])
  if (!token) throw new Error("No GOOGLE_APPLICATION_CREDENTIALS")

  const siteUrl = await resolveGscSiteUrl(token)
  const start = fmtDate(d28)
  const end = fmtDate(today)
  const mid = fmtDate(d14)

  const [gsc28, gscRecent7, gscPrior7, gscQueries, gscPages] = await Promise.all([
    gscQuery(token, siteUrl, { startDate: start, endDate: end, rowLimit: 1 }),
    gscQuery(token, siteUrl, {
      startDate: fmtDate(d7),
      endDate: end,
      rowLimit: 1,
    }),
    gscQuery(token, siteUrl, {
      startDate: fmtDate(d14),
      endDate: fmtDate(d7),
      rowLimit: 1,
    }),
    gscQuery(token, siteUrl, {
      startDate: start,
      endDate: end,
      dimensions: ["query"],
      rowLimit: 20,
    }),
    gscQuery(token, siteUrl, {
      startDate: start,
      endDate: end,
      dimensions: ["page"],
      rowLimit: 15,
    }),
  ])

  const sum = (rows) =>
    rows?.reduce(
      (a, r) => ({
        clicks: a.clicks + (r.clicks || 0),
        impressions: a.impressions + (r.impressions || 0),
      }),
      { clicks: 0, impressions: 0 }
    ) ?? { clicks: 0, impressions: 0 }

  const s28 = sum(gsc28.rows)
  const sRecent = sum(gscRecent7.rows)
  const sPrior = sum(gscPrior7.rows)

  report.gsc = {
    siteUrl,
    last28d: {
      ...s28,
      ctr: s28.impressions ? ((s28.clicks / s28.impressions) * 100).toFixed(2) + "%" : "n/a",
    },
    last7d: {
      ...sRecent,
      ctr: sRecent.impressions
        ? ((sRecent.clicks / sRecent.impressions) * 100).toFixed(2) + "%"
        : "n/a",
    },
    prior7d: {
      ...sPrior,
      ctr: sPrior.impressions ? ((sPrior.clicks / sPrior.impressions) * 100).toFixed(2) + "%" : "n/a",
    },
    topQueries: gscQueries.rows?.map((r) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: ((r.ctr || 0) * 100).toFixed(2) + "%",
      position: (r.position || 0).toFixed(1),
    })),
    topPages: gscPages.rows?.map((r) => ({
      page: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: ((r.ctr || 0) * 100).toFixed(2) + "%",
      position: (r.position || 0).toFixed(1),
    })),
  }
} catch (e) {
  report.errors.push(`GSC: ${e.message}`)
}

  return report
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
  const report = await pullAnalyticsReport()
  console.log(JSON.stringify(report, null, 2))
}
