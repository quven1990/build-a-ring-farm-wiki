"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, HelpCircle, Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import {
  codesSyncMeta,
  formatSyncDate,
  wikiCodesArchived,
  wikiCodesSorted,
  type CodeStatus,
} from "@/lib/codes-data"
import { PLAUSIBLE_GOALS, trackPlausibleEvent } from "@/lib/plausible-events"
import { pageMeta } from "@/lib/site-config"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"

const statusConfig: Record<
  CodeStatus,
  { label: string; variant: "default" | "secondary" | "outline"; icon: typeof HelpCircle }
> = {
  verified: { label: "Verified in-game", variant: "default", icon: HelpCircle },
  community: {
    label: "Community sync",
    variant: "secondary",
    icon: RefreshCw,
  },
  "needs-testing": { label: "Single source", variant: "outline", icon: HelpCircle },
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
        {!showTitle && (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {pageMeta.codes.h1}
            </h1>
            <div className="mb-4 flex justify-center">
              <LastUpdatedBadge />
            </div>
            <p className="text-pretty text-muted-foreground sm:text-lg">
              {pageMeta.codes.heroDescription}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              New to redeeming? Read the{" "}
              <Link
                href="/build-a-ring-codes"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                step-by-step codes guide
              </Link>{" "}
              (how-to only — this page is the live copy list).
            </p>
          </div>
        )}

        {showTitle && (
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-2">
              <Gift className="mr-1 h-3 w-3" />
              Redeem Codes
            </Badge>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Active redeem codes</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Copy a code, redeem in-game via Settings, and confirm the reward — codes can expire
              after updates.
            </p>
          </div>
        )}

        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">
          Updated {formatSyncDate(codesSyncMeta.lastSyncedAt)} · {wikiCodesSorted.length} active
          codes · weekly sync from {codesSyncMeta.sourceCount} public gaming lists (not play-tested)
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wikiCodesSorted.map((item) => {
            const status = statusConfig[item.status]
            const StatusIcon = status.icon
            return (
              <Card key={item.code} className="group relative overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
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
                  <p className="mb-4 text-sm text-muted-foreground">
                    Reward: <span className="font-medium text-foreground">{item.reward}</span>
                  </p>
                  <div className="flex items-center justify-end">
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

        {wikiCodesArchived.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Recently dropped codes</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              No longer on our synced lists — may still work in-game.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {wikiCodesArchived.map((item) => (
                <li key={item.code} className="rounded-lg border border-border/70 px-3 py-2">
                  <span className="font-mono font-semibold text-foreground">{item.code}</span>
                  {" — "}
                  {item.reward}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-muted-foreground">
          Community sync labels mean multiple gaming sites listed this code — not an in-game test.
          See the{" "}
          <Link href="/build-a-ring-update-log" className="text-primary underline-offset-4 hover:underline">
            update log
          </Link>{" "}
          for site changes.
        </p>
      </div>
    </section>
  )
}
