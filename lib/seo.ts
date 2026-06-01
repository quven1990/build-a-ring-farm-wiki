import { siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/sitemap"

export const SEO_BRAND = "Build A Ring Farm"
export const SEO_SITE_NAME = siteConfig.name

export function getSiteHostname(): string {
  try {
    return new URL(siteConfig.url).hostname
  } catch {
    return "buildaring.online"
  }
}

/** Title: main keyword + page name + site name (50–60 chars target) */
export function buildSeoTitle(pageName: string): string {
  const base = pageName ? `${SEO_BRAND} ${pageName}` : SEO_BRAND
  const full = `${base} | ${SEO_SITE_NAME}`
  return full.length <= 60 ? full : `${base} | ${getSiteHostname()}`
}

export const defaultOgImage = "/images/home-hero-farm-2.webp"

export function getOgImageUrl(path: string = defaultOgImage): string {
  return absoluteUrl(path)
}

export function truncateMetaDescription(text: string, max = 160): string {
  const trimmed = text.trim().replace(/\s+/g, " ")
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max - 3).trimEnd()}...`
}
