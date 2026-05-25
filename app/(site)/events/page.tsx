import type { Metadata } from "next"
import { EventsGuide } from "@/components/wiki/events-guide"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("events", "/events")

export default function EventsPage() {
  return (
    <WikiPageShell pageKey="events" showHero={false}>
      <EventsGuide />
      <EnhancedSeoSection pageKey="events" relatedKey="events" />
    </WikiPageShell>
  )
}
