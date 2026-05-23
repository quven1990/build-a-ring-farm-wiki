import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Circle } from "lucide-react"
import Link from "next/link"

const rings = [
  {
    name: "Base Ring",
    multiplier: "7x",
    description:
      "Innermost ring with the lowest multiplier — best for early-game, fast-turnover common crops.",
  },
  {
    name: "Middle Ring",
    multiplier: "13x",
    description:
      "Mid-game sweet spot balancing plot count and per-plant profit — great for epic-tier seeds.",
  },
  {
    name: "Outer Ring",
    multiplier: "19x",
    description:
      "Highest multiplier — prioritize long grow-time, high unit-price secret and exotic crops here.",
  },
]

type RingsGuideProps = {
  showTitle?: boolean
}

export function RingsGuide({ showTitle = true }: RingsGuideProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-2">
              <Circle className="mr-1 h-3 w-3" />
              Ring System
            </Badge>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Rings Guide</h2>
            <p className="text-muted-foreground">
              Each ring has a different multiplier — placing high-value crops on the Outer Ring boosts total profit
            </p>
          </div>
        )}

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {rings.map((ring) => (
            <Card key={ring.name} className="border-primary/20">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <CardTitle className="text-lg">{ring.name}</CardTitle>
                  <Badge className="font-mono text-base">{ring.multiplier}</Badge>
                </div>
                <CardDescription>{ring.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Select this ring in the calculator to see per-plant price at that multiplier.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Layout tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Outer Ring first: Dragon Fruit, Golden Apple, and other high unit-price, long grow-time crops.</p>
            <p>• Middle Ring: Corn, Strawberry, and other mid-game staples.</p>
            <p>• Base Ring: Carrot, Pumpkin, and other short-cycle crops for quick cash.</p>
            <p>
              Compare setups with the{" "}
              <Link href="/seeds" className="text-primary underline-offset-4 hover:underline">
                Seeds database
              </Link>{" "}
              and{" "}
              <Link href="/calculator" className="text-primary underline-offset-4 hover:underline">
                Earnings calculator
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
