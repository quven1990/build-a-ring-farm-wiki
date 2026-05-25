import { siteConfig } from "@/lib/site-config"

/** Plausible site domain (must match dashboard settings). */
export function getPlausibleDomain(): string {
  const fromEnv = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim()
  if (fromEnv) return fromEnv

  try {
    return new URL(siteConfig.url).hostname
  } catch {
    return "buildaring.online"
  }
}

export function isPlausibleEnabled(): boolean {
  return process.env.NEXT_PUBLIC_PLAUSIBLE_DISABLED !== "true"
}

export function getPlausibleInitConfig() {
  if (!isPlausibleEnabled()) return null

  const domain = getPlausibleDomain()
  const endpoint = process.env.NEXT_PUBLIC_PLAUSIBLE_ENDPOINT?.trim()

  return {
    domain,
    ...(endpoint ? { endpoint } : {}),
    autoCapturePageviews: true,
    hashBasedRouting: false,
    outboundLinks: true,
    fileDownloads: true,
    formSubmissions: false,
    captureOnLocalhost:
      process.env.NEXT_PUBLIC_PLAUSIBLE_CAPTURE_LOCALHOST === "true",
    logging: process.env.NODE_ENV === "development",
    bindToWindow: true,
  }
}
