import Link from "next/link"
import { PageHero } from "@/components/wiki/page-hero"
import { PageTableOfContents } from "@/components/wiki/page-table-of-contents"
import { WhatYouCanDo } from "@/components/wiki/what-you-can-do"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"
import { PageFaqSection } from "@/components/wiki/page-faq-section"
import { RelatedGuides } from "@/components/wiki/related-guides"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { Button } from "@/components/ui/button"
import { guidePages } from "@/lib/seo-pages/guides"
import { guidePageMeta } from "@/lib/site-config"
import type { GuidePageId } from "@/lib/seo-pages/types"
import { getFaqForPage } from "@/lib/faq-data"
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  webApplicationJsonLd,
} from "@/lib/json-ld"
import { siteConfig } from "@/lib/site-config"
import { getSitemapLastModified } from "@/lib/sitemap"
import { cn } from "@/lib/utils"
import { AdsenseAd } from "@/components/wiki/adsense-ad"
import { ArrowRight } from "lucide-react"

type GuidePageProps = {
  pageId: GuidePageId
}

function renderBlocks(blocks: (typeof guidePages)[GuidePageId]["blocks"]) {
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
    return <p key={index}>{block.text}</p>
  })
}

export function GuidePage({ pageId }: GuidePageProps) {
  const config = guidePages[pageId]
  const meta = guidePageMeta[pageId]
  const faqItems = getFaqForPage(pageId)

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: meta.breadcrumb },
  ]

  const jsonLd: Record<string, unknown>[] = [
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: meta.breadcrumb, url: config.path },
    ]),
  ]

  if (config.schema === "Article") {
    jsonLd.push(
      articleJsonLd({
        headline: meta.h1,
        description: meta.description,
        path: config.path,
        dateModified: getSitemapLastModified().toISOString(),
      })
    )
  } else if (config.schema === "HowTo" && config.howToSteps) {
    jsonLd.push(
      howToJsonLd({
        name: meta.h1,
        description: meta.description,
        path: config.path,
        steps: config.howToSteps,
      })
    )
  } else if (config.schema === "WebApplication") {
    jsonLd.push(
      webApplicationJsonLd({
        name: meta.h1,
        description: meta.description,
        path: config.path,
      })
    )
  }

  if (config.schema === "FAQPage") {
    jsonLd.push(faqPageJsonLd(faqItems))
  } else if (faqItems.length > 0) {
    jsonLd.push(faqPageJsonLd(faqItems))
  }

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <PageHero title={meta.h1} description={meta.heroDescription ?? meta.description} breadcrumbs={breadcrumbs} />
      <section className={cn("border-b border-border bg-muted/20 py-10 sm:py-12")}>
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <LastUpdatedBadge />
          <WhatYouCanDo items={config.whatYouCanDo} />
          {config.toolCta && (
            <div className="mb-8 rounded-lg border border-border bg-card p-4 sm:p-5">
              <p className="mb-3 text-sm font-medium text-foreground">Open the live tool</p>
              <p className="mb-4 text-sm text-muted-foreground">{config.toolCta.description}</p>
              <Button asChild>
                <Link href={config.toolCta.href}>
                  {config.toolCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
          <AdsenseAd placement="article" />
          <PageTableOfContents blocks={config.blocks} />
          <article className="prose prose-sm max-w-none sm:prose-base dark:prose-invert prose-headings:scroll-mt-24 prose-h2:text-balance prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-base sm:prose-h3:text-lg prose-p:text-pretty prose-p:text-muted-foreground prose-p:leading-relaxed">
            {renderBlocks(config.blocks)}
          </article>
          <PageFaqSection items={faqItems} />
        </div>
      </section>
      <RelatedGuides pageKey={pageId} />
    </>
  )
}
