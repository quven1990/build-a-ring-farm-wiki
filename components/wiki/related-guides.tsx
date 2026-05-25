import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { relatedGuidesByPage, type RelatedPageKey } from "@/lib/related-guides"
import { ArrowRight } from "lucide-react"

type RelatedGuidesProps = {
  pageKey: RelatedPageKey
  title?: string
}

export function RelatedGuides({
  pageKey,
  title = "Related Guides & Tools",
}: RelatedGuidesProps) {
  const links = relatedGuidesByPage[pageKey]
  if (!links?.length) return null

  return (
    <section className="border-t border-border bg-background py-12 sm:py-14" aria-label="Related guides">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
        <p className="mb-6 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Continue planning with these internal resources — each page covers a different part of Build A Ring Farm.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Card className="h-full transition-colors hover:border-primary/40 hover:bg-muted/30">
                <Link href={link.href} className="group block h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between gap-2 text-base group-hover:text-primary">
                      {link.title}
                      <ArrowRight className="h-4 w-4 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{link.description}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
