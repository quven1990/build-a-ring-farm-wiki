import type { Metadata } from "next"
import { CodesSection } from "@/components/wiki/codes-section"
import { SeoArticle } from "@/components/wiki/seo-article"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("codes", "/codes")

export default function CodesPage() {
  return (
    <WikiPageShell pageKey="codes">
      <CodesSection showTitle={false} />
      <SeoArticle pageKey="codes" />
    </WikiPageShell>
  )
}
