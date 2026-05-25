import type { MetadataRoute } from "next"
import { navItems, siteConfig, sitemapRouteSettings } from "@/lib/site-config"
import { guideRoutes, guideSitemapSettings } from "@/lib/seo-routes"

/** Canonical absolute URL for sitemap, robots, and metadata */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "")
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function getSitemapLastModified(): Date {
  return new Date(siteConfig.siteLastModified)
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

  return [...toolEntries, ...guideEntries]
}
