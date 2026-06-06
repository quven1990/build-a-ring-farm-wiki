import type { MetadataRoute } from "next"
import { navItems, siteConfig, sitemapRouteSettings } from "@/lib/site-config"
import { guideRoutes, guideSitemapSettings } from "@/lib/seo-routes"
import { updateArticleSlugs } from "@/lib/updates/articles"

/** Canonical absolute URL for sitemap, robots, and metadata */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "")
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

/** Start of the current UTC day — sitemap lastmod advances daily without manual edits. */
export function getSitemapLastModified(): Date {
  const now = new Date()
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )
}

/** Human-readable label for “Last updated” UI (matches sitemap day). */
export function formatSiteLastUpdatedLabel(date = getSitemapLastModified()): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const lastModified = getSitemapLastModified()

  const toolEntries = navItems.map((item) => {
    const settings = sitemapRouteSettings[item.href]
    if (!settings) {
      throw new Error(`Missing sitemap settings for route: ${item.href}`)
    }

    return {
      url: absoluteUrl(item.href),
      lastModified,
      changeFrequency: settings.changeFrequency,
      priority: settings.priority,
    }
  })

  const guideEntries = guideRoutes.map((path) => {
    const settings = guideSitemapSettings[path]
    return {
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: settings.changeFrequency,
      priority: settings.priority,
    }
  })

  const updateHubEntry = {
    url: absoluteUrl("/updates"),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }

  const updateArticleEntries = updateArticleSlugs.map((slug) => ({
    url: absoluteUrl(`/updates/${slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }))

  /** Legal pages use noindex — omit from sitemap to avoid low-value URL noise in Search Console. */
  return [...toolEntries, ...guideEntries, updateHubEntry, ...updateArticleEntries]
}
