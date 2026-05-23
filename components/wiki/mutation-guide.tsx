import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const faqItems = [
  {
    question: "Which mutation should early players care about first?",
    answer:
      "Wet is the most practical early mutation because Rain is common and the 1.5x boost appears often enough to improve normal harvest rhythm without forcing long waits.",
  },
  {
    question: "What is the common mistake with Rainbow?",
    answer:
      "Rainbow has a strong 5x multiplier, but the Galaxy event path is rare. Chasing it too early can delay steady seed and ring progression, so test the value in the calculator before waiting on it.",
  },
  {
    question: "Why are Alien, Farm, and Honeycomb marked Event Only?",
    answer:
      "They are not sold in the Gear Shop at any price. The page lists them as Event Only instead of showing a purchasable shop cost.",
  },
  {
    question: "How do mutations fit into late-game strategy?",
    answer:
      "Late-game setups benefit most when high-value seeds are already placed under stronger rings. The mutation multiplies a larger base, so absolute gains increase with seed level and ring tier.",
  },
]

export function MutationGuide() {
  return (
    <section className="border-t border-border bg-muted/40 py-14 sm:py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="space-y-6">
          <Card className="border-border/80 bg-card shadow-sm">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground">
                Multipliers &amp; cash buffs explained
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Mutations are the primary income multiplier in Build A Ring Farm — from Wet at
                1.5x to Honeycomb at 6.5x. Six can be bought in the Gear Shop (Wet $10M through
                Rainbow $1T); Alien, Farm, and Honeycomb are event-exclusive only.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Use the{" "}
                <Link href="/calculator" className="font-medium text-primary hover:underline">
                  profit calculator
                </Link>{" "}
                to model income at your seed level and ring tier before saving for expensive sprays.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card shadow-sm">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Weather &amp; roll rates</h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Effective mutation rate is event chance × roll chance. Galaxy + Rainbow is roughly
                0.04% per cycle; Rain + Wet is about 3.2% — an 80× gap that explains why Rainbow
                feels much rarer in normal play.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                More detail on the{" "}
                <Link href="/events" className="font-medium text-primary hover:underline">
                  events page
                </Link>
                , plus{" "}
                <Link href="/seeds" className="font-medium text-primary hover:underline">
                  seeds
                </Link>{" "}
                and{" "}
                <Link href="/rings" className="font-medium text-primary hover:underline">
                  rings
                </Link>{" "}
                for full-farm planning.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-foreground">Mutation FAQ</h2>
          <Accordion type="single" collapsible className="rounded-2xl border border-border/80 bg-card px-2 shadow-sm">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="border-border/60 px-2">
                <AccordionTrigger className="text-left text-sm font-medium hover:text-primary sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
