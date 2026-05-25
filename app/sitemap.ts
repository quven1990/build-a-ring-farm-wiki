import type { MetadataRoute } from "next"
import { buildSitemapEntries } from "@/lib/sitemap"

/** Compute lastmod at request time (avoids build-time freeze on Cloudflare). */
export const dynamic = "force-dynamic"

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries()
}
