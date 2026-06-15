import { partnerFanWikis } from "@/lib/site-config"

/** External Roblox fan wikis — single-page placement only (not sitewide footer). */
export function RelatedFanWikis() {
  if (partnerFanWikis.length === 0) return null

  return (
    <section className="border-t border-border bg-muted/30 py-10" aria-label="Related Roblox wikis">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">More Roblox Wikis</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Independent companion sites for other Roblox games — not affiliated with this wiki.
        </p>
        <ul className="space-y-3">
          {partnerFanWikis.map((site) => (
            <li key={site.href} className="rounded-lg border border-border/70 bg-card px-4 py-3">
              <a
                href={site.href}
                className="font-medium text-primary underline-offset-4 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                {site.label}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">{site.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
