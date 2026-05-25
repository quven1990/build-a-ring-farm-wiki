import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-codes")

export default function BuildARingCodesGuidePage() {
  return <GuidePage pageId="build-a-ring-codes" />
}
