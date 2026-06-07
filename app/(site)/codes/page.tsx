import type { Metadata } from "next"
import { CitableSummary } from "@/components/wiki/citable-summary"
import { CodesSection } from "@/components/wiki/codes-section"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("codes", "/codes")

export default function CodesPage() {
  return (
    <WikiPageShell pageKey="codes" showHero={false} showShare={false}>
      <CodesSection
        showTitle={false}
        afterIntro={<CitableSummary page="codes" className="mt-6 text-left" />}
      />
      <EnhancedSeoSection pageKey="codes" relatedKey="codes" />
    </WikiPageShell>
  )
}
