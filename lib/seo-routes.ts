import { navItems, sitemapRouteSettings } from "@/lib/site-config"

/** Tool & database routes (existing app pages) */
export const toolRoutes = navItems.map((item) => item.href)

/** SEO guide routes — unique landing pages, not redirects */
export const guideRoutes = [
  "/build-a-ring-farm",
  "/build-a-ring-guide",
  "/build-a-ring-codes",
  "/build-a-ring-calculator",
  "/build-a-ring-wiki",
  "/build-a-ring-faq",
  "/build-a-ring-tier-list",
  "/build-a-ring-best-rings",
  "/build-a-ring-update-log",
] as const

export type GuideRoute = (typeof guideRoutes)[number]

export const allPublicRoutes = [...toolRoutes, ...guideRoutes] as const

/** Sitemap-only settings for guide pages */
export const guideSitemapSettings: Record<
  GuideRoute,
  { priority: number; changeFrequency: "daily" | "weekly" | "monthly" }
> = {
  "/build-a-ring-farm": { priority: 0.88, changeFrequency: "weekly" },
  "/build-a-ring-guide": { priority: 0.88, changeFrequency: "monthly" },
  "/build-a-ring-codes": { priority: 0.92, changeFrequency: "weekly" },
  "/build-a-ring-calculator": { priority: 0.87, changeFrequency: "monthly" },
  "/build-a-ring-wiki": { priority: 0.86, changeFrequency: "weekly" },
  "/build-a-ring-faq": { priority: 0.75, changeFrequency: "monthly" },
  "/build-a-ring-tier-list": { priority: 0.84, changeFrequency: "weekly" },
  "/build-a-ring-best-rings": { priority: 0.83, changeFrequency: "monthly" },
  "/build-a-ring-update-log": { priority: 0.8, changeFrequency: "weekly" },
}

export function isGuideRoute(path: string): path is GuideRoute {
  return (guideRoutes as readonly string[]).includes(path)
}

export function getToolSitemapSettings(href: (typeof navItems)[number]["href"]) {
  return sitemapRouteSettings[href]
}
