import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-calculator")

export default function BuildARingCalculatorGuidePage() {
  return <GuidePage pageId="build-a-ring-calculator" />
}
