import type { SeoBlock } from "@/lib/seo-article-content"
import { cn } from "@/lib/utils"

type PageTableOfContentsProps = {
  blocks: SeoBlock[]
  className?: string
}

export function PageTableOfContents({ blocks, className }: PageTableOfContentsProps) {
  const headings = blocks.filter(
    (block): block is Extract<SeoBlock, { type: "h2"; id?: string }> =>
      block.type === "h2" && Boolean(block.id)
  )

  if (headings.length < 3) return null

  return (
    <nav
      aria-label="On this page"
      className={cn(
        "mb-8 rounded-lg border border-border bg-card/60 p-4 sm:p-5",
        className
      )}
    >
      <p className="mb-3 text-sm font-semibold text-foreground">On this page</p>
      <ol className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
