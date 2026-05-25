"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import type { FAQEntry } from "@/lib/faq-data"

type PageFaqSectionProps = {
  items: FAQEntry[]
  title?: string
}

export function PageFaqSection({
  items,
  title = "Frequently Asked Questions",
}: PageFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items.length) return null

  return (
    <section className="mt-10 border-t border-border pt-10" aria-label="FAQ">
      <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <Card
            key={item.question}
            className={`cursor-pointer transition-all ${openIndex === index ? "border-primary/30" : ""}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <CardContent className="p-0">
              <div className="flex items-center justify-between gap-4 p-4">
                <h3 className="text-left font-medium text-foreground">{item.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </div>
              {openIndex === index && (
                <div className="border-t px-4 pb-4 pt-2">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
