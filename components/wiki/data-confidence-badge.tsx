import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  dataConfidenceConfig,
  type DataConfidence,
} from "@/lib/data-confidence"

type DataConfidenceBadgeProps = {
  confidence: DataConfidence
  /** Compact label for seed/mutation cards */
  compact?: boolean
  className?: string
}

export function DataConfidenceBadge({
  confidence,
  compact = false,
  className,
}: DataConfidenceBadgeProps) {
  const config = dataConfidenceConfig[confidence]
  const Icon = config.icon
  const label = compact ? config.shortLabel : config.label

  return (
    <Badge
      variant={config.variant}
      className={cn("gap-1 font-normal", compact && "px-1.5 py-0 text-[10px]", className)}
      title={config.description}
    >
      <Icon className={cn(compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      {label}
    </Badge>
  )
}

type DataConfidenceLegendProps = {
  lastReviewed: string
  summary: string
  className?: string
}

export function DataConfidenceLegend({
  lastReviewed,
  summary,
  className,
}: DataConfidenceLegendProps) {
  const tiers: DataConfidence[] = ["verified", "community", "needs-testing", "conflicting"]

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-muted/30 px-4 py-3 text-sm sm:px-5",
        className
      )}
    >
      <p className="text-center text-muted-foreground sm:text-left">
        {summary}{" "}
        <span className="whitespace-nowrap font-medium text-foreground">
          Last reviewed {lastReviewed}.
        </span>
      </p>
      <ul className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        {tiers.map((tier) => (
          <li key={tier}>
            <DataConfidenceBadge confidence={tier} compact />
          </li>
        ))}
      </ul>
    </div>
  )
}
