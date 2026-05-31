import { PageHero } from "@/components/wiki/page-hero"
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
}: {
  pageKey: Exclude<PageKey, "home">
  children: React.ReactNode
  showHero?: boolean
  showLastUpdated?: boolean
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
        />
      )}
      {children}
    </>
  )
}
