import type { SeoBlock } from "@/lib/seo-article-content"

export type UpdateArticleTag = "codes" | "patch" | "pets" | "site"

export type UpdateArticleMeta = {
  title: string
  h1: string
  description: string
  heroDescription: string
  ogTitle: string
  ogImageAlt: string
  breadcrumb: string
  keywords: string[]
}

export type UpdateArticle = {
  slug: string
  publishedAt: string
  tags: UpdateArticleTag[]
  /** Codes highlighted in this article — links banner + article */
  featuredCodes?: string[]
  updateLabel?: string
  meta: UpdateArticleMeta
  whatYouCanDo: string[]
  blocks: SeoBlock[]
  faq?: { question: string; answer: string }[]
}
