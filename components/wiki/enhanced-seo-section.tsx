import Link from "next/link"
import { seoArticles, type SeoPageKey } from "@/lib/seo-article-content"
import { pageIntros } from "@/lib/seo-article-intros"
import { PageTableOfContents } from "@/components/wiki/page-table-of-contents"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"
import { PageFaqSection } from "@/components/wiki/page-faq-section"
import { RelatedGuides } from "@/components/wiki/related-guides"
import { getFaqForPage } from "@/lib/faq-data"
import type { RelatedPageKey } from "@/lib/related-guides"
import { cn } from "@/lib/utils"

type EnhancedSeoSectionProps = {
  pageKey: SeoPageKey
  relatedKey?: RelatedPageKey
  showFaq?: boolean
  className?: string
}

function renderParagraph(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (match) {
      return (
        <Link key={i} href={match[2]} className="font-medium text-primary underline-offset-4 hover:underline">
          {match[1]}
        </Link>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function EnhancedSeoSection({
  pageKey,
  relatedKey,
  showFaq = true,
  className,
}: EnhancedSeoSectionProps) {
  const blocks = seoArticles[pageKey]
  if (!blocks?.length) return null

  const intro = pageIntros[pageKey]
  const faqItems = getFaqForPage(pageKey)
  const related = relatedKey ?? (pageKey as RelatedPageKey)

  return (
    <>
      <section
        className={cn("border-t border-border bg-muted/30 py-14 sm:py-16", className)}
        aria-label="Guide overview"
      >
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <LastUpdatedBadge />
          {intro && (
            <p className="mb-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {renderParagraph(intro)}
            </p>
          )}
          <PageTableOfContents blocks={blocks} />
          <article className="prose prose-sm max-w-none sm:prose-base dark:prose-invert prose-headings:scroll-mt-24 prose-h2:text-balance prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-base sm:prose-h3:text-lg prose-p:text-pretty prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:break-words">
            {blocks.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2 key={index} id={block.id}>
                    {block.text}
                  </h2>
                )
              }
              if (block.type === "h3") {
                return <h3 key={index}>{block.text}</h3>
              }
              return <p key={index}>{renderParagraph(block.text)}</p>
            })}
          </article>
          {showFaq && faqItems.length > 0 && <PageFaqSection items={faqItems} />}
        </div>
      </section>
      <RelatedGuides pageKey={related} />
    </>
  )
}
