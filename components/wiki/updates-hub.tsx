import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHero } from "@/components/wiki/page-hero"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { RelatedGuides } from "@/components/wiki/related-guides"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld"
import { getSitemapLastModified } from "@/lib/sitemap"
import { updateArticlesSorted, updatesHubMeta } from "@/lib/updates/articles"
import { Calendar, Tag } from "lucide-react"

const tagLabels: Record<string, string> = {
  codes: "Codes",
  patch: "Patch",
  pets: "Pets",
  site: "Site",
}

function formatPublished(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`))
}

export function UpdatesHub() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: updatesHubMeta.breadcrumb },
  ]

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: updatesHubMeta.breadcrumb, url: "/updates" },
    ]),
    articleJsonLd({
      headline: updatesHubMeta.h1,
      description: updatesHubMeta.description,
      path: "/updates",
      dateModified: getSitemapLastModified().toISOString(),
    }),
  ]

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <PageHero
        title={updatesHubMeta.h1}
        description={updatesHubMeta.heroDescription}
        breadcrumbs={breadcrumbs}
        showLastUpdated
        sharePath="/updates"
        shareTitle={updatesHubMeta.title}
        shareText={updatesHubMeta.description}
      />
      <section className="border-b border-border bg-muted/20 py-10 sm:py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <LastUpdatedBadge />
          <p className="mb-8 text-pretty text-muted-foreground leading-relaxed">
            Each major code drop or community-reported patch gets a dedicated page — easier to
            bookmark and share than scrolling a single changelog. For site maintenance history, see
            the{" "}
            <Link href="/build-a-ring-update-log" className="text-primary underline-offset-4 hover:underline">
              update log
            </Link>
            . For copy-paste strings, open{" "}
            <Link href="/codes" className="text-primary underline-offset-4 hover:underline">
              active codes
            </Link>
            .
          </p>

          <ul className="space-y-4">
            {updateArticlesSorted.map((article) => (
              <li key={article.slug}>
                <Card className="transition-colors hover:border-primary/40">
                  <Link href={`/updates/${article.slug}`} className="group block">
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        {article.updateLabel ? (
                          <Badge variant="secondary">{article.updateLabel}</Badge>
                        ) : null}
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="mr-1 h-3 w-3" aria-hidden />
                            {tagLabels[tag] ?? tag}
                          </Badge>
                        ))}
                        {article.featuredCodes?.map((code) => (
                          <Badge
                            key={code}
                            className="border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          >
                            {code}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary sm:text-xl">
                        {article.meta.h1}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1.5 pt-1 text-sm">
                        <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        Published {formatPublished(article.publishedAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{article.meta.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <RelatedGuides pageKey="updates" />
    </>
  )
}
