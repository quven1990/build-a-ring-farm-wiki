import type { Metadata } from "next"
import { CodesSection } from "@/components/wiki/codes-section"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("codes", "/codes")

export default function CodesPage() {
  return (
    <WikiPageShell pageKey="codes" showLastUpdated>
      <CodesSection showTitle={false} />
      <EnhancedSeoSection pageKey="codes" relatedKey="codes" />
    </WikiPageShell>
  )
}
