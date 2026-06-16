import type { Metadata } from "next"
import { CitableSummary } from "@/components/wiki/citable-summary"
import { MutationGuide } from "@/components/wiki/mutation-guide"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { MutationMatrix } from "@/components/wiki/mutation-matrix"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"
import { faqPageJsonLd } from "@/lib/json-ld"
import { getFaqForPage } from "@/lib/faq-data"

export const metadata: Metadata = createPageMetadata("mutations", "/mutations")

export default function MutationsPage() {
  return (
    <WikiPageShell pageKey="mutations" showHero={false} showShare={false}>
      <JsonLdScript data={faqPageJsonLd(getFaqForPage("mutations"))} />
      <MutationMatrix />
      <div className="container mx-auto px-4 pb-4">
        <CitableSummary page="mutations" />
      </div>
      <MutationGuide />
      <EnhancedSeoSection pageKey="mutations" relatedKey="mutations" />
    </WikiPageShell>
  )
}
