import { Card, CardContent } from "@/components/ui/card"
import type { FAQEntry } from "@/lib/faq-data"
import { cn } from "@/lib/utils"

type PageFaqSectionProps = {
  items: FAQEntry[]
  title?: string
}

export function PageFaqSection({
  items,
  title = "Frequently Asked Questions",
}: PageFaqSectionProps) {
  if (!items.length) return null

  return (
    <section className="mt-10 border-t border-border pt-10" aria-label="FAQ">
      <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <Card key={item.question} className="overflow-hidden py-0">
            <CardContent className="p-0">
              <details
                className="group"
                open={index === 0}
              >
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-medium text-foreground",
                    "[&::-webkit-details-marker]:hidden"
                  )}
                >
                  <span className="pr-4">{item.question}</span>
                  <span
                    className="text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    ▾
                  </span>
                </summary>
                <div className="border-t px-4 pb-4 pt-2">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
