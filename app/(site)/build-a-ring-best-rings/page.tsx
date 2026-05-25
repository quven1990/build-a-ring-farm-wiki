import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-best-rings")

export default function BuildARingBestRingsPage() {
  return <GuidePage pageId="build-a-ring-best-rings" />
}
