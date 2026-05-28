"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, AlertCircle, HelpCircle, Check, Copy } from "lucide-react"
import { toast } from "sonner"
import { formatLastCheckedDate, wikiCodesSorted, type CodeStatus } from "@/lib/codes-data"
import { PLAUSIBLE_GOALS, trackPlausibleEvent } from "@/lib/plausible-events"

const statusConfig: Record<CodeStatus, { label: string; variant: "default" | "secondary" | "outline"; icon: typeof AlertCircle }> = {
  verified: { label: "Verified", variant: "default", icon: Check },
  community: { label: "Community Reported", variant: "secondary", icon: AlertCircle },
  "needs-testing": { label: "Needs Testing", variant: "outline", icon: HelpCircle },
}

type CodesSectionProps = {
  showTitle?: boolean
}

export function CodesSection({ showTitle = true }: CodesSectionProps) {
  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      trackPlausibleEvent(PLAUSIBLE_GOALS.codeCopy, {
        props: { code },
        interactive: true,
      })
      toast("✅ Code copied to clipboard!")
    } catch {
      toast.error("Could not copy code. Please copy manually.")
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-2">
              <Gift className="mr-1 h-3 w-3" />
              Redeem Codes
            </Badge>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Active redeem codes</h2>
            <p className="text-muted-foreground">
              Claim free rewards — codes may expire at any time
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wikiCodesSorted.map((item) => {
            const status = statusConfig[item.status]
            const StatusIcon = status.icon
            return (
              <Card key={item.code} className="group relative overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <code className="rounded bg-muted px-2 py-1 font-mono text-lg font-bold text-foreground">
                      {item.code}
                    </code>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {item.isNew && (
                        <Badge className="border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                          New
                        </Badge>
                      )}
                      <Badge variant={status.variant} className="flex items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Reward: <span className="font-medium text-foreground">{item.reward}</span>
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Last checked: {formatLastCheckedDate(item.lastChecked)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(item.code)}
                      className="transition-all"
                      aria-label={`Copy code ${item.code}`}
                    >
                      <Copy className="mr-1 h-3.5 w-3.5" />
                      Copy code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Code status is community-reported and may change with game updates. Let us know if a code stops working.
        </p>
      </div>
    </section>
  )
}
