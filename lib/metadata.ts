import type { Metadata } from "next"
import { guidePageMeta, pageMeta, siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/sitemap"
import { getOgImageUrl, truncateMetaDescription } from "@/lib/seo"
import type { GuidePageId } from "@/lib/seo-pages/types"

function buildMetadata(
  meta: (typeof pageMeta)[string],
  path: string,
  options?: { robots?: Metadata["robots"]; openGraphType?: "website" | "article" }
): Metadata {
  const url = absoluteUrl(path)
  const description = truncateMetaDescription(meta.description)
  const ogImage = getOgImageUrl(meta.ogImage)
  const ogTitle = meta.ogTitle ?? meta.title

  return {
    title: meta.title,
    description,
    keywords: meta.keywords,
    robots: options?.robots ?? { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: options?.openGraphType ?? "website",
      locale: `${siteConfig.locale}_US`,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
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
  return buildMetadata(guidePageMeta[pageId], `/${pageId}`, { openGraphType: "article" })
}
