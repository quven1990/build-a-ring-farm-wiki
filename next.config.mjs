import { execSync } from "node:child_process"
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

/** workerd (Wrangler dev) requires macOS 13.5+; skip on older systems unless forced on. */
function shouldInitCloudflareDev() {
  const flag = process.env.OPENNEXT_CLOUDFLARE_DEV
  if (flag === "0" || flag === "false") return false
  if (flag === "1" || flag === "true") return true

  if (process.platform !== "darwin") return true

  try {
    const [major, minor = 0] = execSync("sw_vers -productVersion", { encoding: "utf8" })
      .trim()
      .split(".")
      .map(Number)
    if (major < 13) return false
    if (major === 13 && minor < 5) return false
    return true
  } catch {
    return false
  }
}

if (process.env.NODE_ENV === "development" && shouldInitCloudflareDev()) {
  initOpenNextCloudflareForDev()
} else if (process.env.NODE_ENV === "development" && process.platform === "darwin") {
  console.warn(
    "[opennext] Skipping Cloudflare dev runtime (macOS < 13.5). `pnpm dev` runs as plain Next.js — fine for this wiki. Deploy/preview still use CI or a newer OS."
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
  async redirects() {
    const ytCodes =
      "/codes?utm_source=youtube&utm_medium=comment&utm_campaign=yt_codes"
    const ytCalculator =
      "/calculator?utm_source=youtube&utm_medium=comment&utm_campaign=yt_calculator"
    const redditCodes =
      "/codes?utm_source=reddit&utm_medium=post&utm_campaign=reddit_codes"
    const redditCalculator =
      "/calculator?utm_source=reddit&utm_medium=post&utm_campaign=reddit_calculator"
    const discordCodes =
      "/codes?utm_source=discord&utm_medium=message&utm_campaign=discord_codes"
    const discordCalculator =
      "/calculator?utm_source=discord&utm_medium=message&utm_campaign=discord_calculator"
    const forumCodes =
      "/codes?utm_source=forum&utm_medium=comment&utm_campaign=forum_codes"
    const forumCalculator =
      "/calculator?utm_source=forum&utm_medium=comment&utm_campaign=forum_calculator"

    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/build-a-ring", destination: "/build-a-ring-farm", permanent: true },
      { source: "/build-a-ring/", destination: "/build-a-ring-farm", permanent: true },
      /** Short links for outreach — UTM tracked in Plausible. */
      { source: "/yt", destination: ytCodes, permanent: false },
      { source: "/yt/codes", destination: ytCodes, permanent: false },
      { source: "/yt/calculator", destination: ytCalculator, permanent: false },
      { source: "/reddit", destination: redditCodes, permanent: false },
      { source: "/reddit/codes", destination: redditCodes, permanent: false },
      { source: "/reddit/calculator", destination: redditCalculator, permanent: false },
      { source: "/discord", destination: discordCodes, permanent: false },
      { source: "/discord/codes", destination: discordCodes, permanent: false },
      { source: "/discord/calculator", destination: discordCalculator, permanent: false },
      { source: "/forum", destination: forumCodes, permanent: false },
      { source: "/forum/codes", destination: forumCodes, permanent: false },
      { source: "/forum/calculator", destination: forumCalculator, permanent: false },
    ]
  },
}

export default nextConfig
