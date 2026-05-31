import type { LucideIcon } from "lucide-react"
import { AlertTriangle, CheckCircle2, HelpCircle, RefreshCw } from "lucide-react"

/** Matches codes tier labels — shared across seeds, mutations, and codes. */
export type DataConfidence = "verified" | "community" | "conflicting" | "needs-testing"

export type DataConfidenceConfig = {
  label: string
  shortLabel: string
  variant: "default" | "secondary" | "outline" | "destructive"
  icon: LucideIcon
  description: string
}

export const dataConfidenceConfig: Record<DataConfidence, DataConfidenceConfig> = {
  verified: {
    label: "Verified in-game",
    shortLabel: "Verified",
    variant: "default",
    icon: CheckCircle2,
    description: "Checked against live harvest or shop UI after a recent patch.",
  },
  community: {
    label: "Community data",
    shortLabel: "Community",
    variant: "secondary",
    icon: RefreshCw,
    description: "Matches multiple public guides — confirm before big purchases.",
  },
  conflicting: {
    label: "Sources disagree",
    shortLabel: "Conflict",
    variant: "destructive",
    icon: AlertTriangle,
    description: "Public sources report different values — in-game check recommended.",
  },
  "needs-testing": {
    label: "Incomplete / TBA",
    shortLabel: "TBA",
    variant: "outline",
    icon: HelpCircle,
    description: "Missing stats or single unconfirmed report — treat as placeholder.",
  },
}

export function formatReviewDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return isoDate
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed)
}
