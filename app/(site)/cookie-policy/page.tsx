import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/wiki/page-hero"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { breadcrumbJsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/sitemap"
import { truncateMetaDescription } from "@/lib/seo"
import { formatSiteLastUpdatedLabel } from "@/lib/sitemap"

const description = truncateMetaDescription(
  "Cookie Policy for buildaring.online: what cookies are used for analytics and advertising, and how to manage your preferences."
)

export const metadata: Metadata = {
  title: "Cookie Policy | Build A Ring Farm Wiki",
  description,
  alternates: { canonical: absoluteUrl("/cookie-policy") },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cookie Policy | Build A Ring Farm Wiki",
    description,
    url: absoluteUrl("/cookie-policy"),
    siteName: siteConfig.name,
    type: "website",
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Cookie Policy", url: "/cookie-policy" },
        ])}
      />
      <PageHero
        title="Cookie Policy"
        description="What cookies we use and how to control them."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]}
      />
      <section className="border-b border-border py-10 sm:py-14">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <article className="prose prose-sm max-w-none sm:prose-base dark:prose-invert">
            <p className="text-sm text-muted-foreground sm:text-base">
              Last updated: {formatSiteLastUpdatedLabel()}.
            </p>

            <h2>Overview</h2>
            <p>
              This site (<strong>{siteConfig.url.replace(/^https?:\/\//, "")}</strong>) uses cookies
              and similar technologies to help us understand site usage (analytics) and, if enabled,
              to display ads (advertising). Cookies are small text files stored on your device.
            </p>

            <h2>Types of cookies we use</h2>
            <ul>
              <li>
                <strong>Essential</strong>: required for core site functionality and security. These
                cannot be disabled from within the site.
              </li>
              <li>
                <strong>Analytics</strong>: help us measure traffic and improve content (for example
                Google Analytics and/or Plausible, depending on deployment).
              </li>
              <li>
                <strong>Advertising</strong>: used by Google AdSense to serve and measure ads, and
                potentially personalize ads.
              </li>
            </ul>

            <h2>Your choices</h2>
            <p>
              You can accept or reject non-essential cookies using the consent banner. If you change
              your mind, clear your browser storage for this site and reload to see the banner again.
            </p>
            <p>
              You can also control cookies through your browser settings. For Google advertising
              controls, visit{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
                Google Ads Settings
              </a>
              .
            </p>

            <h2>Learn more</h2>
            <p>
              For more details on data use and sharing, see our{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}

