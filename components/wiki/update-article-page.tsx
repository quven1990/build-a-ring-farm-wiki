import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/wiki/page-hero"
import { PageTableOfContents } from "@/components/wiki/page-table-of-contents"
import { WhatYouCanDo } from "@/components/wiki/what-you-can-do"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"
import { PageFaqSection } from "@/components/wiki/page-faq-section"
import { RelatedGuides } from "@/components/wiki/related-guides"
import { getUpdateArticleRelatedKey } from "@/lib/related-guides"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { AdsenseAd } from "@/components/wiki/adsense-ad"
import type { UpdateArticle, UpdateArticleBlock } from "@/lib/updates/types"
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/json-ld"
import { getSitemapLastModified } from "@/lib/sitemap"
import { Calendar, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

type UpdateArticlePageProps = {
  article: UpdateArticle
}

function renderBlocks(blocks: UpdateArticleBlock[]) {
  return blocks.map((block, index) => {
    if (block.type === "h2") {
      return (
        <h2 key={index} id={block.id} className="scroll-mt-24 text-balance">
          {block.text}
        </h2>
      )
    }
    if (block.type === "h3") {
      return <h3 key={index}>{block.text}</h3>
    }
    if (block.type === "image") {
      return (
        <figure
          key={index}
          className="not-prose my-8 overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} className="h-auto w-full" loading="lazy" />
          {block.caption ? (
            <figcaption className="border-t border-border/60 px-4 py-3 text-sm text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    }
    return <p key={index}>{block.text}</p>
  })
}

function formatPublished(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`))
}

export function UpdateArticlePage({ article }: UpdateArticlePageProps) {
  const path = `/updates/${article.slug}`
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Updates", href: "/updates" },
    { label: article.meta.breadcrumb },
  ]

  const jsonLd: Record<string, unknown>[] = [
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Updates", url: "/updates" },
      { name: article.meta.breadcrumb, url: path },
    ]),
    articleJsonLd({
      headline: article.meta.h1,
      description: article.meta.description,
      path,
      dateModified: getSitemapLastModified().toISOString(),
      datePublished: `${article.publishedAt}T12:00:00.000Z`,
    }),
  ]

  if (article.faq?.length) {
    jsonLd.push(faqPageJsonLd(article.faq))
  }

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <PageHero
        title={article.meta.h1}
        description={article.meta.heroDescription}
        breadcrumbs={breadcrumbs}
        showLastUpdated
        sharePath={path}
        shareTitle={article.meta.title}
        shareText={article.meta.description}
      />
      <section className={cn("border-b border-border bg-muted/20 py-10 sm:py-12")}>
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {article.updateLabel ? <Badge variant="secondary">{article.updateLabel}</Badge> : null}
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {formatPublished(article.publishedAt)}
            </Badge>
            {article.featuredCodes?.map((code) => (
              <Badge
                key={code}
                className="border border-emerald-500/40 bg-emerald-500/15 font-mono text-emerald-700 dark:text-emerald-300"
              >
                {code}
              </Badge>
            ))}
          </div>

          <LastUpdatedBadge />
          <WhatYouCanDo items={article.whatYouCanDo} />

          {article.featuredCodes?.length ? (
            <div className="mb-8 rounded-lg border border-border bg-card p-4 sm:p-5">
              <p className="mb-3 text-sm font-medium text-foreground">Copy active codes</p>
              <p className="mb-4 text-sm text-muted-foreground">
                Full list with sync status and archived codes on the codes page.
              </p>
              <Button asChild>
                <Link href="/codes">
                  <Gift className="mr-2 h-4 w-4" />
                  Open active codes
                </Link>
              </Button>
            </div>
          ) : null}

          <AdsenseAd placement="article" />
          <PageTableOfContents blocks={article.blocks.filter((b): b is Extract<UpdateArticleBlock, { type: "h2" }> => b.type === "h2")} />
          <article className="prose prose-sm max-w-none sm:prose-base dark:prose-invert prose-headings:scroll-mt-24 prose-h2:text-balance prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-base sm:prose-h3:text-lg prose-p:text-pretty prose-p:text-muted-foreground prose-p:leading-relaxed">
            {renderBlocks(article.blocks)}
          </article>
          {article.faq?.length ? <PageFaqSection items={article.faq} /> : null}
        </div>
      </section>
      <RelatedGuides pageKey={getUpdateArticleRelatedKey(article.slug)} />
    </>
  )
}
