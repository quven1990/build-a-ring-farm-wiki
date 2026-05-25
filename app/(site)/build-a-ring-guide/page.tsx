import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-guide")

export default function BuildARingBeginnerGuidePage() {
  return <GuidePage pageId="build-a-ring-guide" />
}
