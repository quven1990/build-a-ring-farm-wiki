import type { Metadata } from "next"
import { ProgressionGuide } from "@/components/wiki/progression-guide"
import { SeoArticle } from "@/components/wiki/seo-article"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("progression", "/progression")

export default function ProgressionPage() {
  return (
    <WikiPageShell pageKey="progression">
      <ProgressionGuide showTitle={false} />
      <SeoArticle pageKey="progression" />
    </WikiPageShell>
  )
}
