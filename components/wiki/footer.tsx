import Link from "next/link"
import { SiteLogo } from "@/components/wiki/site-logo"
import { footerDirectoryBadges, footerGuideLinks, footerLinks, siteConfig } from "@/lib/site-config"
import { formatSiteLastUpdatedLabel } from "@/lib/sitemap"

const footerLinkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <SiteLogo size={36} />
              <span className="font-bold text-foreground">
                Build A Ring Farm Wiki
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              {siteConfig.description}
            </p>
            <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This is an independent fan-made guide, not affiliated with Roblox Corporation or the game developers. All trademarks belong to their respective owners.
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Guides</h3>
            <ul className="space-y-2">
              {footerLinks.guides.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Player Guides</h3>
            <ul className="space-y-2">
              {footerGuideLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <p className="text-sm text-muted-foreground">
              Last updated: {formatSiteLastUpdatedLabel()}
            </p>
            {footerDirectoryBadges.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {footerDirectoryBadges.map((badge) => (
                  <a
                    key={badge.href}
                    href={badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block opacity-90 transition-opacity hover:opacity-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- third-party verification badge */}
                    <img
                      src={badge.src}
                      alt={badge.alt}
                      height={badge.height}
                      style={{ height: badge.height, width: "auto" }}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <a
              href="mailto:contact@buildaring.online"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
            <Link href="/terms" className={footerLinkClass}>
              Terms
            </Link>
            <Link href="/cookie-policy" className={footerLinkClass}>
              Cookie Policy
            </Link>
            <Link href="/privacy" className={footerLinkClass}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
