import type { MetadataRoute } from "next"
import { buildSitemapEntries } from "@/lib/sitemap"

/** Refresh sitemap daily; avoid force-dynamic (full SSR per hit blows CPU on Workers). */
export const revalidate = 86400

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries()
}
