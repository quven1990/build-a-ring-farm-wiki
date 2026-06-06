import { PageHero } from "@/components/wiki/page-hero"
import { PageShareButtons } from "@/components/wiki/page-share-buttons"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { pageMeta } from "@/lib/site-config"
import { breadcrumbJsonLd } from "@/lib/json-ld"

type PageKey = keyof typeof pageMeta

export function getPageBreadcrumbs(key: PageKey) {
  const meta = pageMeta[key]
  return [
    { label: "Home", href: "/" },
    { label: meta.breadcrumb },
  ]
}

export function WikiPageShell({
  pageKey,
  children,
  showHero = true,
  showLastUpdated = false,
  showShare = true,
}: {
  pageKey: Exclude<PageKey, "home">
  children: React.ReactNode
  showHero?: boolean
  showLastUpdated?: boolean
  /** Share row when hero is hidden (default true). Set false if the page renders its own share block. */
  showShare?: boolean
}) {
  const meta = pageMeta[pageKey]
  const breadcrumbs = getPageBreadcrumbs(pageKey)

  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: meta.breadcrumb, url: `/${pageKey}` },
        ])}
      />
      {showHero && (
        <PageHero
          title={meta.h1}
          description={meta.heroDescription ?? meta.description}
          breadcrumbs={getPageBreadcrumbs(pageKey)}
          showLastUpdated={showLastUpdated}
          sharePath={`/${pageKey}`}
          shareTitle={meta.title}
          shareText={meta.description}
        />
      )}
      {!showHero && showShare ? (
        <div className="border-b border-border bg-muted/10 py-4">
          <div className="container mx-auto px-4">
            <PageShareButtons
              path={`/${pageKey}`}
              title={meta.title}
              text={meta.description}
            />
          </div>
        </div>
      ) : null}
      {children}
    </>
  )
}
