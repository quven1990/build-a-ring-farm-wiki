import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-farm")

export default function BuildARingFarmGuidePage() {
  return <GuidePage pageId="build-a-ring-farm" />
}
