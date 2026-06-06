import { GuidePage } from "@/components/wiki/guide-page"
import { createGuidePageMetadata } from "@/lib/metadata"

export const metadata = createGuidePageMetadata("build-a-ring-beginner-mistakes")

export default function BuildARingBeginnerMistakesPage() {
  return <GuidePage pageId="build-a-ring-beginner-mistakes" />
}
