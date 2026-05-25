import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-tier-list")

export default function BuildARingTierListPage() {
  return <GuidePage pageId="build-a-ring-tier-list" />
}
