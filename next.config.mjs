import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  async redirects() {
    const ytCodes =
      "/codes?utm_source=youtube&utm_medium=comment&utm_campaign=yt_codes"
    const ytCalculator =
      "/calculator?utm_source=youtube&utm_medium=comment&utm_campaign=yt_calculator"

    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/build-a-ring", destination: "/build-a-ring-farm", permanent: true },
      { source: "/build-a-ring/", destination: "/build-a-ring-farm", permanent: true },
      /** Short links for YouTube comments — tracks campaign in Plausible. */
      { source: "/yt", destination: ytCodes, permanent: false },
      { source: "/yt/codes", destination: ytCodes, permanent: false },
      { source: "/yt/calculator", destination: ytCalculator, permanent: false },
    ]
  },
}

export default nextConfig
