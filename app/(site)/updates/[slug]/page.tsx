import { notFound } from "next/navigation"
import { UpdateArticlePage } from "@/components/wiki/update-article-page"
import { getUpdateArticle, updateArticleSlugs } from "@/lib/updates/articles"
import { createUpdateArticleMetadata } from "@/lib/updates/metadata"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return updateArticleSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  return createUpdateArticleMetadata(slug) ?? {}
}

export default async function UpdateArticleRoute({ params }: PageProps) {
  const { slug } = await params
  const article = getUpdateArticle(slug)
  if (!article) notFound()
  return <UpdateArticlePage article={article} />
}
