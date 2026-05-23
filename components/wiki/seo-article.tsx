import { seoArticles, type SeoPageKey } from "@/lib/seo-article-content"
import { cn } from "@/lib/utils"

type SeoArticleProps = {
  pageKey: SeoPageKey
  className?: string
}

export function SeoArticle({ pageKey, className }: SeoArticleProps) {
  const blocks = seoArticles[pageKey]
  if (!blocks?.length) return null

  return (
    <section
      className={cn("border-t border-border bg-muted/30 py-14 sm:py-16", className)}
      aria-label="Guide overview"
    >
      <div className="container mx-auto max-w-3xl px-4">
        <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h3:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed">
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
            return <p key={index}>{block.text}</p>
          })}
        </article>
      </div>
    </section>
  )
}
