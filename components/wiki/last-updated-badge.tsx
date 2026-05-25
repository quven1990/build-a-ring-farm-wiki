import { formatSiteLastUpdatedLabel } from "@/lib/sitemap"
import { Calendar } from "lucide-react"

export function LastUpdatedBadge() {
  return (
    <p className="mb-6 inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground sm:text-sm">
      <Calendar className="h-3.5 w-3.5" aria-hidden />
      Last updated: {formatSiteLastUpdatedLabel()}
    </p>
  )
}
