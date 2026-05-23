import { defineCloudflareConfig } from "@opennextjs/cloudflare"

export default {
  // `pnpm run build` runs OpenNext; invoke Next directly to avoid recursion.
  buildCommand: "pnpm exec next build",
  ...defineCloudflareConfig({}),
}
