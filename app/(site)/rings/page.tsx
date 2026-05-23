import type { Metadata } from "next"
import { RingsGuide } from "@/components/wiki/rings-guide"
import { SeoArticle } from "@/components/wiki/seo-article"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("rings", "/rings")

export default function RingsPage() {
  return (
    <WikiPageShell pageKey="rings">
      <RingsGuide showTitle={false} />
      <SeoArticle pageKey="rings" />
    </WikiPageShell>
  )
}
