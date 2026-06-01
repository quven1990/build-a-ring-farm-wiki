import type { Metadata } from "next"
import { PageHero } from "@/components/wiki/page-hero"
import { PrivacyPolicyContent } from "@/components/wiki/privacy-policy-content"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { breadcrumbJsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/sitemap"
import { truncateMetaDescription } from "@/lib/seo"

const description = truncateMetaDescription(
  "Privacy Policy for Build A Ring Farm Wiki (buildaring.online): cookies, Google Analytics, AdSense ads, data retention, and contact."
)

export const metadata: Metadata = {
  title: "Privacy Policy | Build A Ring Farm Wiki",
  description,
  alternates: { canonical: absoluteUrl("/privacy") },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Privacy Policy | Build A Ring Farm Wiki",
    description,
    url: absoluteUrl("/privacy"),
    siteName: siteConfig.name,
    type: "website",
  },
}

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy" },
  ]

  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ])}
      />
      <PageHero
        title="Privacy Policy"
        description="How we handle cookies, analytics, advertising, and your choices on this fan wiki."
        breadcrumbs={breadcrumbs}
      />
      <section className="border-b border-border py-10 sm:py-14">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <PrivacyPolicyContent />
        </div>
      </section>
    </>
  )
}
