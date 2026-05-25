/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid 304 + stale RSC payloads on Cloudflare (opennextjs/cloudflare#517).
  generateEtag: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/build-a-ring", destination: "/build-a-ring-farm", permanent: true },
      { source: "/build-a-ring/", destination: "/build-a-ring-farm", permanent: true },
    ]
  },
}

export default nextConfig

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
initOpenNextCloudflareForDev()
