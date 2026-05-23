import { PageHero } from "@/components/wiki/page-hero"
import { pageMeta } from "@/lib/site-config"

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
}: {
  pageKey: Exclude<PageKey, "home">
  children: React.ReactNode
  showHero?: boolean
}) {
  const meta = pageMeta[pageKey]

  return (
    <>
      {showHero && (
        <PageHero
          title={meta.h1}
          description={meta.heroDescription ?? meta.description}
          breadcrumbs={getPageBreadcrumbs(pageKey)}
        />
      )}
      {children}
    </>
  )
}
