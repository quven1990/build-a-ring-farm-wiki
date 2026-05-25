import type { Metadata } from "next"
import { ProgressionGuide } from "@/components/wiki/progression-guide"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("progression", "/progression")

export default function ProgressionPage() {
  return (
    <WikiPageShell pageKey="progression">
      <ProgressionGuide showTitle={false} />
      <EnhancedSeoSection pageKey="progression" relatedKey="progression" />
    </WikiPageShell>
  )
}
