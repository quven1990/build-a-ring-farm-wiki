import type { Metadata } from "next"
import { FAQSection } from "@/components/wiki/faq-section"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("faq", "/faq")

export default function FAQPage() {
  return (
    <WikiPageShell pageKey="faq">
      <FAQSection showTitle={false} />
    </WikiPageShell>
  )
}
