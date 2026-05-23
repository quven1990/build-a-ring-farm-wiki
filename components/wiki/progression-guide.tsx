import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Sprout, Target, Crown } from "lucide-react"

const stages = [
  {
    icon: Sprout,
    stage: "Early Game",
    title: "Getting Started",
    description: "Build your first cash stack and core upgrades",
    tips: [
      "Keep every plot planted at all times",
      "Farm common seeds for steady income",
      "Reinvest in basic upgrades",
      "Unlock more planting slots",
    ],
    color: "text-primary bg-primary/10 border-primary/30",
  },
  {
    icon: TrendingUp,
    stage: "Mid Game",
    title: "Scaling Up",
    description: "Optimize your farm strategy and efficiency",
    tips: [
      "Unlock higher-tier seeds",
      "Compare earnings across rings",
      "Use the earnings calculator",
      "Watch for mutation opportunities",
    ],
    color: "text-chart-4 bg-chart-4/10 border-chart-4/30",
  },
  {
    icon: Target,
    stage: "Late Game",
    title: "Optimization",
    description: "Fine-tune for maximum profit",
    tips: [
      "Time mutations with events",
      "Upgrade saw level",
      "Focus on high-rarity seeds",
      "Plan around special events",
    ],
    color: "text-chart-5 bg-chart-5/10 border-chart-5/30",
  },
  {
    icon: Crown,
    stage: "Endgame",
    title: "Master Farmer",
    description: "Push peak earnings and rare collections",
    tips: [
      "Prioritize the Outer Ring",
      "Chase rare mutation combos",
      "Max out high-tier seed levels",
      "Hit special events at the right time",
    ],
    color: "text-secondary bg-secondary/20 border-secondary",
  },
]

type ProgressionGuideProps = {
  showTitle?: boolean
}

export function ProgressionGuide({ showTitle = true }: ProgressionGuideProps) {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-2">
              <TrendingUp className="mr-1 h-3 w-3" />
              Progression
            </Badge>
            <h2 className="mb-2 text-3xl font-bold text-foreground">Progression Guide</h2>
            <p className="text-muted-foreground">
              Best upgrade paths from beginner to endgame
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <Card key={stage.stage} className={`relative overflow-hidden border-2 ${stage.color.split(" ")[2]}`}>
              <div className="absolute -right-4 -top-4 text-8xl font-bold text-muted/20">
                {index + 1}
              </div>

              <CardHeader className="relative">
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${stage.color.split(" ").slice(0, 2).join(" ")}`}>
                  <stage.icon className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="w-fit mb-1">
                  {stage.stage}
                </Badge>
                <CardTitle>{stage.title}</CardTitle>
                <CardDescription>{stage.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {stage.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
