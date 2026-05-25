import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-faq")

export default function BuildARingFaqHubPage() {
  return <GuidePage pageId="build-a-ring-faq" />
}
