import type { Metadata } from "next"
import { SeedDatabase } from "@/components/wiki/seed-database"
import { SeoArticle } from "@/components/wiki/seo-article"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("seeds", "/seeds")

export default function SeedsPage() {
  return (
    <WikiPageShell pageKey="seeds" showHero={false}>
      <SeedDatabase />
      <SeoArticle pageKey="seeds" />
    </WikiPageShell>
  )
}
