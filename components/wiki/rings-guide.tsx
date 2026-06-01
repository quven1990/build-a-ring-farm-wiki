import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Circle } from "lucide-react"
import Link from "next/link"
import { pageMeta } from "@/lib/site-config"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"

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
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/0.1,transparent)]"
        aria-hidden
      />
      <div className="container relative mx-auto px-4">
        {!showTitle && (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {pageMeta.rings.h1}
            </h1>
            <div className="mb-4 flex justify-center">
              <LastUpdatedBadge />
            </div>
            <p className="text-pretty text-muted-foreground sm:text-lg">
              {pageMeta.rings.heroDescription}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Placement strategy and unlock order:{" "}
              <Link
                href="/build-a-ring-best-rings"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                best rings guide
              </Link>
            </p>
          </div>
        )}

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
                  Select this ring in the{" "}
                  <Link href="/calculator" className="text-primary underline-offset-4 hover:underline">
                    calculator
                  </Link>{" "}
                  to see per-plant price at that multiplier.
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
