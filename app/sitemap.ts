import type { MetadataRoute } from "next"
import { buildSitemapEntries } from "@/lib/sitemap"

/** Regenerate sitemap at most once per day so lastmod stays current. */
export const revalidate = 86400

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries()
}
