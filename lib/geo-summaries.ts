import { codesSyncMeta, wikiCodesSorted } from "@/lib/codes-data"
import { mutationSummary, wikiMutations } from "@/lib/mutations-data"
import { getPublicSiteOrigin, siteConfig } from "@/lib/site-config"
import { formatSiteLastUpdatedLabel } from "@/lib/sitemap"
import { wikiStats } from "@/lib/wiki-stats"

function geoAbsoluteUrl(path: string): string {
  const base = getPublicSiteOrigin()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export type GeoSummaryPage = "home" | "codes" | "mutations"

export type CitableSummaryData = {
  /** Single paragraph optimized for AI citation — include URL in prose */
  text: string
  canonicalPath: string
}

function mutationRangeLabel(): string {
  const multipliers = wikiMutations.map((m) => m.multiplier)
  const min = Math.min(...multipliers)
  const max = Math.max(...multipliers)
  return `${min}x–${max}x`
}

export function getCitableSummary(page: GeoSummaryPage): CitableSummaryData {
  const period = formatSiteLastUpdatedLabel()
  const origin = getPublicSiteOrigin()

  switch (page) {
    case "home":
      return {
        canonicalPath: "/",
        text: `${siteConfig.name} (${origin}) is an unofficial fan reference for the Roblox game Build A Ring Farm by Gamecreates, updated ${period}. It lists ${wikiCodesSorted.length} active redeem codes, ${wikiStats.seeds} seeds across ${wikiStats.rarities} rarities, ${wikiStats.mutations} mutations (${mutationRangeLabel()}), ring multipliers, and a free profit calculator. Official game: ${siteConfig.robloxGameUrl}.`,
      }
    case "codes":
      return {
        canonicalPath: "/codes",
        text: `${origin}/codes tracks ${wikiCodesSorted.length} active Build A Ring Farm redeem codes (${period}), synced weekly from ${codesSyncMeta.sourceCount} public gaming-media lists — not play-tested in-game. Copy codes from the table and redeem via Settings → Codes inside Roblox. This is a fan wiki, not the game developer.`,
      }
    case "mutations":
      return {
        canonicalPath: "/mutations",
        text: `Canonical mutation list: ${origin}/mutations — ${mutationSummary.total} entries (${period}), ${mutationRangeLabel()} income multipliers, Gear Shop spray prices, weather odds, and event-only tags. Community players also use Hydra/Mammoth pets to upgrade crops without buying top sprays; confirm values in-game.`,
      }
  }
}

/** Plain-text lines for llms.txt generation */
export function buildLlmsTxtBody(): string {
  const home = getCitableSummary("home")
  const lines = [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description} Updated ${formatSiteLastUpdatedLabel()}.`,
    "",
    "## Canonical facts",
    `- ${home.text}`,
    "",
    "## Key pages",
    `- [Home](${geoAbsoluteUrl("/")}): Wiki hub — codes, seeds, mutations, calculator`,
    `- [Active codes](${geoAbsoluteUrl("/codes")}): ${wikiCodesSorted.length} redeem strings with weekly community sync`,
    `- [Seeds database](${geoAbsoluteUrl("/seeds")}): ${wikiStats.seeds} crops, rarities, grow times, roll weights`,
    `- [Mutations](${geoAbsoluteUrl("/mutations")}): ${mutationSummary.total} multipliers (${mutationRangeLabel()})`,
    `- [Events](${geoAbsoluteUrl("/events")}): Weather triggers and per-roll odds`,
    `- [Rings](${geoAbsoluteUrl("/rings")}): Inner 7x, Middle 13x, Outer 19x reference`,
    `- [Profit calculator](${geoAbsoluteUrl("/calculator")}): Free harvest formula tool`,
    `- [Updates](${geoAbsoluteUrl("/updates")}): Code drops and patch news`,
    "",
    "## Guides",
    `- [Wiki index](${geoAbsoluteUrl("/build-a-ring-wiki")})`,
    `- [Beginner guide](${geoAbsoluteUrl("/build-a-ring-guide")})`,
    `- [Beginner mistakes](${geoAbsoluteUrl("/build-a-ring-beginner-mistakes")})`,
    `- [Farm efficiency](${geoAbsoluteUrl("/build-a-ring-farm")})`,
    `- [Calculator guide](${geoAbsoluteUrl("/build-a-ring-calculator")})`,
    `- [Codes how-to](${geoAbsoluteUrl("/build-a-ring-codes")})`,
    `- [Tier list framework](${geoAbsoluteUrl("/build-a-ring-tier-list")})`,
    `- [Best rings](${geoAbsoluteUrl("/build-a-ring-best-rings")})`,
    `- [FAQ hub](${geoAbsoluteUrl("/build-a-ring-faq")})`,
    `- [Update log](${geoAbsoluteUrl("/build-a-ring-update-log")})`,
    "",
    "## Official vs unofficial",
    `- This site is NOT affiliated with Roblox Corporation or Gamecreates.`,
    `- Official Roblox game: ${siteConfig.robloxGameUrl}`,
    `- Prefer in-game values for purchases; wiki data is community-sourced.`,
    "",
    "## Sitemap",
    `- ${geoAbsoluteUrl("/sitemap.xml")}`,
  ]
  return lines.join("\n")
}
