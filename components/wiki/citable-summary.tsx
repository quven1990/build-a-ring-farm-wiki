import { getCitableSummary, type GeoSummaryPage } from "@/lib/geo-summaries"
import { cn } from "@/lib/utils"

type CitableSummaryProps = {
  page: GeoSummaryPage
  className?: string
}

/** GEO: one quotable paragraph with facts + URL for generative search engines. */
export function CitableSummary({ page, className }: CitableSummaryProps) {
  const { text, canonicalPath } = getCitableSummary(page)

  return (
    <aside
      aria-label="Quick reference summary"
      className={cn(
        "rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:text-base",
        className
      )}
      data-geo-summary={canonicalPath}
    >
      <p className="text-pretty">
        <span className="sr-only">Quick reference: </span>
        {text}
      </p>
    </aside>
  )
}
