import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { guideCards } from "@/lib/site-config"
import {
  Sprout,
  GitBranch,
  Calendar,
  Circle,
  Calculator,
  TrendingUp,
  Gift,
  HelpCircle,
} from "lucide-react"

const iconMap = {
  Seeds: Sprout,
  Mutations: GitBranch,
  Events: Calendar,
  Rings: Circle,
  Calculator: Calculator,
  Progression: TrendingUp,
  Codes: Gift,
  FAQ: HelpCircle,
} as const

export function QuickNavigation() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-2">
            Quick Navigation
          </Badge>
          <h2 className="mb-2 text-balance text-2xl font-bold text-foreground sm:text-3xl">Explore the Wiki</h2>
          <p className="text-muted-foreground">
            Jump to any section of the wiki
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guideCards.map((guide) => {
            const Icon = iconMap[guide.title as keyof typeof iconMap]
            return (
              <Link key={guide.title} href={guide.href} className="block group">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/30 cursor-pointer">
                  <CardHeader className="pb-2">
                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${guide.color} transition-transform group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
