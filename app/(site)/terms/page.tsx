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
  "Terms of Service for buildaring.online: acceptable use, disclaimers, intellectual property, and limitations of liability."
)

export const metadata: Metadata = {
  title: "Terms of Service | Build A Ring Farm Wiki",
  description,
  alternates: { canonical: absoluteUrl("/terms") },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Terms of Service | Build A Ring Farm Wiki",
    description,
    url: absoluteUrl("/terms"),
    siteName: siteConfig.name,
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ])}
      />
      <PageHero
        title="Terms of Service"
        description="Rules for using this fan-made wiki and toolkit."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />
      <section className="border-b border-border py-10 sm:py-14">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <article className="prose prose-sm max-w-none sm:prose-base dark:prose-invert">
            <p className="text-sm text-muted-foreground sm:text-base">
              Last updated: {formatSiteLastUpdatedLabel()}.
            </p>

            <h2>1. About this site</h2>
            <p>
              {siteConfig.name} is an independent, fan-made resource for the Roblox experience
              &quot;Build A Ring Farm&quot;. It is not affiliated with Roblox Corporation or the game
              developers.
            </p>

            <h2>2. Acceptable use</h2>
            <p>You agree not to misuse the site, including by:</p>
            <ul>
              <li>attempting to disrupt or overload the service</li>
              <li>scraping in a way that harms availability</li>
              <li>using the site for unlawful purposes</li>
              <li>posting or sending us content that infringes others&apos; rights</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>
              The site is provided for informational purposes only. Game data, multipliers, and
              codes may change without notice. We do not guarantee accuracy, completeness, or
              availability.
            </p>

            <h2>4. Intellectual property</h2>
            <p>
              Site content (text and original layout) is owned by the site operator unless stated
              otherwise. Roblox and game-related trademarks belong to their respective owners.
            </p>

            <h2>5. Third-party services</h2>
            <p>
              We may use third-party services for analytics and advertising. See{" "}
              <Link href="/privacy">Privacy Policy</Link> and{" "}
              <Link href="/cookie-policy">Cookie Policy</Link> for details.
            </p>

            <h2>6. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by applicable law, the site operator is not liable for
              any indirect, incidental, special, consequential, or punitive damages arising from
              your use of the site.
            </p>

            <h2>7. Changes</h2>
            <p>
              We may update these Terms from time to time. Continued use of the site after changes
              means you accept the updated Terms.
            </p>

            <h2>8. Contact</h2>
            <p>
              For questions, contact{" "}
              <a href="mailto:contact@buildaring.online">contact@buildaring.online</a>. For privacy
              requests, email{" "}
              <a href="mailto:privacy@buildaring.online">privacy@buildaring.online</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}

