import type { Metadata } from "next"
import { MutationGuide } from "@/components/wiki/mutation-guide"
import { SeoArticle } from "@/components/wiki/seo-article"
import { MutationMatrix } from "@/components/wiki/mutation-matrix"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("mutations", "/mutations")

export default function MutationsPage() {
  return (
    <WikiPageShell pageKey="mutations" showHero={false}>
      <MutationMatrix />
      <MutationGuide />
      <SeoArticle pageKey="mutations" />
    </WikiPageShell>
  )
}
