import type { Metadata } from "next"
import { FAQSection } from "@/components/wiki/faq-section"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"
import { faqPageJsonLd } from "@/lib/json-ld"
import { getFaqForPage } from "@/lib/faq-data"

export const metadata: Metadata = createPageMetadata("faq", "/faq")

export default function FAQPage() {
  return (
    <WikiPageShell pageKey="faq">
      <JsonLdScript data={faqPageJsonLd(getFaqForPage("faq"))} />
      <FAQSection showTitle={false} />
      <EnhancedSeoSection pageKey="faq" relatedKey="faq" showFaq={false} />
    </WikiPageShell>
  )
}
