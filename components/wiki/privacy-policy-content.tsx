import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { formatSiteLastUpdatedLabel } from "@/lib/sitemap"

const sectionClass = "mb-10"
const headingClass = "mb-3 text-xl font-semibold text-foreground scroll-mt-24"
const paragraphClass = "mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base"

export function PrivacyPolicyContent() {
  const lastUpdated = formatSiteLastUpdatedLabel()
  const siteUrl = siteConfig.url

  return (
    <article className="prose prose-sm max-w-none sm:prose-base dark:prose-invert">
      <p className={paragraphClass}>
        This Privacy Policy describes how <strong>{siteConfig.name}</strong> (
        <a href={siteUrl} className="text-primary underline-offset-4 hover:underline">
          {siteUrl.replace(/^https?:\/\//, "")}
        </a>
        ) collects, uses, and shares information when you visit our website. Last updated:{" "}
        {lastUpdated}.
      </p>

      <section id="who-we-are" className={sectionClass}>
        <h2 className={headingClass}>Who we are</h2>
        <p className={paragraphClass}>
          {siteConfig.name} is an independent, fan-made wiki and player toolkit for the Roblox
          experience &quot;Build A Ring Farm.&quot; We are not affiliated with, endorsed by, or
          sponsored by Roblox Corporation or the game&apos;s developers.
        </p>
      </section>

      <section id="information-we-collect" className={sectionClass}>
        <h2 className={headingClass}>Information we collect</h2>
        <p className={paragraphClass}>
          We do not require an account to browse this site. We may automatically receive
          technical information when you visit, such as:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground sm:text-base">
          <li>IP address, browser type, device type, and general location (country/region)</li>
          <li>Pages viewed, referral URLs, and approximate visit time</li>
          <li>Cookie or similar identifiers set by analytics or advertising partners (see below)</li>
        </ul>
        <p className={paragraphClass}>
          If you contact us by email, we process the information you choose to send (for example,
          your email address and message content) only to respond to your inquiry.
        </p>
      </section>

      <section id="cookies-analytics" className={sectionClass}>
        <h2 className={headingClass}>Cookies and analytics</h2>
        <p className={paragraphClass}>We use third-party services that may set cookies or use similar technologies:</p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground sm:text-base">
          <li>
            <strong>Google Analytics</strong> — helps us understand traffic and how visitors use
            the site. See{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-primary underline-offset-4 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Plausible Analytics</strong> — privacy-oriented usage statistics (if enabled
            on our deployment).
          </li>
        </ul>
        <p className={paragraphClass}>
          You can limit cookies through your browser settings. Blocking cookies may affect some
          site features but core wiki content remains available.
        </p>
      </section>

      <section id="advertising" className={sectionClass}>
        <h2 className={headingClass}>Advertising (Google AdSense)</h2>
        <p className={paragraphClass}>
          We may display ads served by <strong>Google AdSense</strong>. Google and its partners may
          use cookies to serve ads based on your prior visits to this or other websites. You can
          opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="text-primary underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Ads Settings
          </a>{" "}
          or{" "}
          <a
            href="https://optout.aboutads.info/"
            className="text-primary underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            aboutads.info
          </a>
          .
        </p>
        <p className={paragraphClass}>
          For publisher verification, we host an{" "}
          <a href="/ads.txt" className="text-primary underline-offset-4 hover:underline">
            ads.txt
          </a>{" "}
          file at the root of this domain. AdSense data practices are described in{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            className="text-primary underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            How Google uses information from sites that use its services
          </a>
          .
        </p>
      </section>

      <section id="children" className={sectionClass}>
        <h2 className={headingClass}>Children&apos;s privacy</h2>
        <p className={paragraphClass}>
          Our content relates to a Roblox game, which may appeal to younger players. We do not
          knowingly collect personal information from children under 13. If you believe a child has
          provided personal data to us, please contact us so we can delete it.
        </p>
      </section>

      <section id="retention" className={sectionClass}>
        <h2 className={headingClass}>Data retention</h2>
        <p className={paragraphClass}>
          Analytics and ad partners retain data according to their own policies. We do not store
          visitor account profiles on this wiki. Server and CDN logs may be retained for a limited
          period for security and performance.
        </p>
      </section>

      <section id="your-rights" className={sectionClass}>
        <h2 className={headingClass}>Your choices and rights</h2>
        <p className={paragraphClass}>
          Depending on where you live, you may have rights to access, correct, or delete personal
          data held about you by service providers we use. Because we do not operate user accounts,
          most requests should be directed to the relevant third party (for example, Google) or
          sent to us using the contact method below for questions about this site.
        </p>
      </section>

      <section id="changes" className={sectionClass}>
        <h2 className={headingClass}>Changes to this policy</h2>
        <p className={paragraphClass}>
          We may update this page when our practices or legal requirements change. The &quot;Last
          updated&quot; date at the top reflects the latest revision. Continued use of the site
          after changes means you accept the updated policy.
        </p>
      </section>

      <section id="contact" className={sectionClass}>
        <h2 className={headingClass}>Contact</h2>
        <p className={paragraphClass}>
          For privacy-related questions about {siteConfig.name}, email the site operator at{" "}
          <a
            href="mailto:privacy@buildaring.online"
            className="text-primary underline-offset-4 hover:underline"
          >
            privacy@buildaring.online
          </a>{" "}
          (replace with your active inbox if different). You can also return to the{" "}
          <Link href="/" className="text-primary underline-offset-4 hover:underline">
            home page
          </Link>{" "}
          or{" "}
          <Link href="/faq" className="text-primary underline-offset-4 hover:underline">
            FAQ
          </Link>
          .
        </p>
      </section>
    </article>
  )
}
