import type { Metadata } from "next"
import { SeedDatabase } from "@/components/wiki/seed-database"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("seeds", "/seeds")

export default function SeedsPage() {
  return (
    <WikiPageShell pageKey="seeds" showHero={false}>
      <SeedDatabase />
      <EnhancedSeoSection pageKey="seeds" relatedKey="seeds" />
    </WikiPageShell>
  )
}
