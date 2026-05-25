import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-wiki")

export default function BuildARingWikiIndexPage() {
  return <GuidePage pageId="build-a-ring-wiki" />
}
