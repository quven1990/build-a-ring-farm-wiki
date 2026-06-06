import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/sitemap"
import { defaultOgImage, getOgImageUrl, truncateMetaDescription } from "@/lib/seo"

export type SocialMetaInput = {
  title: string
  description: string
  ogTitle?: string
  ogImage?: string
  ogImageAlt: string
  path: string
  openGraphType?: "website" | "article"
  robots?: Metadata["robots"]
}

/** Shared Open Graph + Twitter Card fields for all public pages. */
export function buildSocialMetadata(input: SocialMetaInput): Metadata {
  const url = absoluteUrl(input.path)
  const description = truncateMetaDescription(input.description)
  const ogTitle = input.ogTitle ?? input.title
  const ogImagePath = input.ogImage ?? defaultOgImage
  const ogImage = getOgImageUrl(ogImagePath)

  const image = {
    url: ogImage,
    secureUrl: ogImage,
    width: 1200,
    height: 630,
    alt: input.ogImageAlt,
    type: ogImagePath.endsWith(".png") ? "image/png" : "image/jpeg",
  }

  const twitter: NonNullable<Metadata["twitter"]> = {
    card: "summary_large_image",
    title: ogTitle,
    description,
    images: [image],
  }

  if (siteConfig.twitterSite) {
    twitter.site = siteConfig.twitterSite
  }

  return {
    title: input.title,
    description,
    robots: input.robots ?? { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: input.openGraphType ?? "website",
      locale: `${siteConfig.locale}_US`,
      siteName: siteConfig.name,
      images: [image],
    },
    twitter,
  }
}
