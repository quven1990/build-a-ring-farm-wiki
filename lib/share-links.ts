import { getPublicSiteOrigin } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/sitemap"

export type SharePlatform = "twitter" | "facebook" | "reddit" | "whatsapp" | "telegram"

/** Canonical URL for social share buttons — never localhost (useful in local dev). */
export function getShareUrl(path: string): string {
  const base = getPublicSiteOrigin()
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

/** Absolute URL for meta tags — respects configured site URL (incl. staging). */
export function getCanonicalShareUrl(path: string): string {
  return absoluteUrl(path)
}

export function buildShareUrl(
  platform: SharePlatform,
  url: string,
  title: string,
  text?: string
): string {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const message = text ?? title
  const encodedText = encodeURIComponent(message)

  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case "reddit":
      return `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`
    case "telegram":
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
  }
}
