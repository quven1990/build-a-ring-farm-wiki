import type { Metadata } from "next"
import { guidePageMeta, pageMeta } from "@/lib/site-config"
import { buildSocialMetadata } from "@/lib/social-metadata"
import type { GuidePageId } from "@/lib/seo-pages/types"

function buildMetadata(
  meta: (typeof pageMeta)[string],
  path: string,
  options?: { robots?: Metadata["robots"]; openGraphType?: "website" | "article" }
): Metadata {
  return {
    ...buildSocialMetadata({
      title: meta.title,
      description: meta.description,
      ogTitle: meta.ogTitle,
      ogImage: meta.ogImage,
      ogImageAlt: meta.ogImageAlt,
      path,
      openGraphType: options?.openGraphType,
      robots: options?.robots,
    }),
    keywords: meta.keywords,
  }
}

export function createPageMetadata(
  key: keyof typeof pageMeta,
  path: string,
  options?: { robots?: Metadata["robots"] }
): Metadata {
  return buildMetadata(pageMeta[key], path, options)
}

export function createGuidePageMetadata(pageId: GuidePageId): Metadata {
  const meta = guidePageMeta[pageId]
  return {
    ...buildSocialMetadata({
      title: meta.title,
      description: meta.description,
      ogTitle: meta.ogTitle,
      ogImage: meta.ogImage,
      ogImageAlt: meta.ogImageAlt,
      path: `/${pageId}`,
      openGraphType: "article",
    }),
    keywords: meta.keywords,
  }
}
