import { UpdatesHub } from "@/components/wiki/updates-hub"
import { createUpdatesHubMetadata } from "@/lib/updates/metadata"

export const metadata = createUpdatesHubMetadata()

export default function UpdatesPage() {
  return <UpdatesHub />
}
