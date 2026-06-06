import type { Metadata } from "next"
import { updatesHubMeta, getUpdateArticle } from "@/lib/updates/articles"
import { siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/sitemap"
import { getOgImageUrl, truncateMetaDescription } from "@/lib/seo"
import { pageMeta } from "@/lib/site-config"

function buildArticleMetadata(
  meta: {
    title: string
    description: string
    ogTitle: string
    ogImageAlt: string
  },
  path: string
): Metadata {
  const url = absoluteUrl(path)
  const description = truncateMetaDescription(meta.description)
  const ogImage = getOgImageUrl(pageMeta.home.ogImage)

  return {
    title: meta.title,
    description,
    keywords: undefined,
    alternates: { canonical: url },
    openGraph: {
      title: meta.ogTitle,
      description,
      url,
      type: "article",
      locale: `${siteConfig.locale}_US`,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description,
      images: [ogImage],
    },
  }
}

export function createUpdatesHubMetadata(): Metadata {
  return buildArticleMetadata(
    {
      title: updatesHubMeta.title,
      description: updatesHubMeta.description,
      ogTitle: updatesHubMeta.ogTitle,
      ogImageAlt: updatesHubMeta.ogImageAlt,
    },
    "/updates"
  )
}

export function createUpdateArticleMetadata(slug: string): Metadata | null {
  const article = getUpdateArticle(slug)
  if (!article) return null
  return buildArticleMetadata(
    {
      title: article.meta.title,
      description: article.meta.description,
      ogTitle: article.meta.ogTitle,
      ogImageAlt: article.meta.ogImageAlt,
    },
    `/updates/${slug}`
  )
}
