import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PageFaqSection } from "@/components/wiki/page-faq-section"
import { getFaqForPage } from "@/lib/faq-data"
import { HelpCircle } from "lucide-react"

export function HomeFaqSection() {
  const items = getFaqForPage("home")

  return (
    <section
      id="faq"
      className="border-b border-border bg-background py-12 sm:py-14"
      aria-labelledby="home-faq-heading"
    >
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-6 text-center">
          <Badge variant="outline" className="mb-3">
            <HelpCircle className="mr-1 h-3 w-3" aria-hidden />
            FAQ
          </Badge>
          <h2
            id="home-faq-heading"
            className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Build A Ring Farm Wiki — FAQ
          </h2>
          <p className="text-sm text-muted-foreground">
            Quick answers for codes, mutations, rings, and progression.{" "}
            <Link
              href="/build-a-ring-faq"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              More questions in the FAQ hub →
            </Link>
          </p>
        </div>
        <PageFaqSection items={items} title="Frequently Asked Questions" />
      </div>
    </section>
  )
}
