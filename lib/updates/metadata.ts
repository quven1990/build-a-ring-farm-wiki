import type { Metadata } from "next"
import { updatesHubMeta, getUpdateArticle } from "@/lib/updates/articles"
import { buildSocialMetadata } from "@/lib/social-metadata"
import { defaultOgImage } from "@/lib/seo"

function buildUpdateMetadata(
  meta: {
    title: string
    description: string
    ogTitle: string
    ogImageAlt: string
  },
  path: string
): Metadata {
  return buildSocialMetadata({
    title: meta.title,
    description: meta.description,
    ogTitle: meta.ogTitle,
    ogImage: defaultOgImage,
    ogImageAlt: meta.ogImageAlt,
    path,
    openGraphType: "article",
  })
}

export function createUpdatesHubMetadata(): Metadata {
  return buildUpdateMetadata(
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
  return buildUpdateMetadata(
    {
      title: article.meta.title,
      description: article.meta.description,
      ogTitle: article.meta.ogTitle,
      ogImageAlt: article.meta.ogImageAlt,
    },
    `/updates/${slug}`
  )
}
