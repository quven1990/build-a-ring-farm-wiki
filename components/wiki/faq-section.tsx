import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is Build A Ring Farm?",
    answer:
      "Build A Ring Farm is a Roblox farming simulator where you grow crops, harvest, and upgrade to earn cash. The game features three ring zones (Base, Middle, Outer), a deep mutation system, and many seed rarities.",
  },
  {
    question: "Are the codes on this wiki verified?",
    answer:
      'We label codes in three tiers: "Verified" means confirmed by multiple sources; "Community Reported" means player-submitted and may expire; "Needs Testing" is unconfirmed. Codes can break after updates — always check in-game.',
  },
  {
    question: "What is the best seed?",
    answer:
      "It depends on your stage. Early on, use common seeds like Carrot and Pumpkin for steady cash. Mid-game, aim for Corn and Strawberry. Endgame, Golden Apple and Dragon Fruit pay the most but are much harder to obtain.",
  },
  {
    question: "How do mutations work?",
    answer:
      "Mutations add price multipliers to crops. Weather and events trigger them — e.g. Rain gives Wet (1.5x), Blizzard gives Frozen (1.75x). Rare ones like Rainbow (5x) and Honeycomb (6.5x) can massively boost earnings.",
  },
  {
    question: "Which ring is best?",
    answer:
      "Each ring trades unlock cost for multiplier: Base Ring (7x) is easiest; Middle Ring (13x) is a solid mid-game choice; Outer Ring (19x) pays the most but costs the most to unlock. Endgame players usually focus on the Outer Ring.",
  },
  {
    question: "How do I use the earnings calculator?",
    answer:
      "Pick a seed, enter seed and saw levels, choose ring and mutation, then set plant count and cash multiplier. The tool estimates per-plant and total harvest using seed level scaling (1.25^(level-1)), saw bonus (1 + floor(level*2/3)/7), and other multipliers.",
  },
  {
    question: "Is this the official website?",
    answer:
      "No. This is an independent fan-made guide, not affiliated with Roblox or the game developers. All data is community-sourced and may be outdated or inaccurate — use in-game values as the source of truth.",
  },
]

type FAQSectionProps = {
  showTitle?: boolean
}

export function FAQSection({ showTitle = true }: FAQSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-2">
              <HelpCircle className="mr-1 h-3 w-3" />
              Help Center
            </Badge>
            <h2 className="mb-2 text-3xl font-bold text-foreground">FAQ</h2>
            <p className="text-muted-foreground">
              Common questions about the game and this wiki
            </p>
          </div>
        )}

        <div className="mx-auto max-w-3xl space-y-3">
          {faqItems.map((item, index) => (
            <Card key={item.question} className="overflow-hidden py-0">
              <CardContent className="p-0">
                <details className="group" open={index === 0}>
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
                  <div className="border-t px-4 pb-4 pt-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
