"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Gift,
  AlertCircle,
  HelpCircle,
  Copy,
  RefreshCw,
  ExternalLink,
} from "lucide-react"
import { toast } from "sonner"
import {
  codesSyncMeta,
  formatSyncDate,
  wikiCodesArchived,
  wikiCodesSorted,
  type CodeStatus,
} from "@/lib/codes-data"
import { PLAUSIBLE_GOALS, trackPlausibleEvent } from "@/lib/plausible-events"

const statusConfig: Record<
  CodeStatus,
  { label: string; variant: "default" | "secondary" | "outline"; icon: typeof AlertCircle }
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

  const latestSync = codesSyncMeta.changelog[0]

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
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Aggregated from public community lists — synced automatically each week. We do not
              play-test every code; always confirm rewards in-game.
            </p>
          </div>
        )}

        <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">
            Last synced: {formatSyncDate(codesSyncMeta.lastSyncedAt)} UTC
          </p>
          {latestSync && <p className="mt-1">{latestSync.summary}</p>}
          <p className="mt-2">
            Sources scanned:{" "}
            {codesSyncMeta.sources.map((source, index) => (
              <span key={source.id}>
                {index > 0 ? " · " : ""}
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {source.name}
                </a>
              </span>
            ))}
          </p>
        </div>

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
                  <p className="mb-3 text-sm text-muted-foreground">
                    Reward: <span className="font-medium text-foreground">{item.reward}</span>
                  </p>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Listed on {item.sourceCount} public source
                    {item.sourceCount === 1 ? "" : "s"}: {item.sources.join(", ")}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      First seen here: {item.firstSeen}
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

        {wikiCodesArchived.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Removed from public lists
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              These codes disappeared from our scanned sources. They may still work or may be
              expired — try in-game before deleting from your notes.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {wikiCodesArchived.map((item) => (
                <li key={item.code} className="rounded-lg border border-border/70 px-3 py-2">
                  <span className="font-mono font-semibold text-foreground">{item.code}</span>
                  {" — "}
                  {item.reward}. Removed {item.removedAt}.
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Status labels reflect how many public lists included each code — not in-game verification.
          See the{" "}
          <Link href="/build-a-ring-update-log" className="text-primary underline-offset-4 hover:underline">
            update log
          </Link>{" "}
          for sync history, or{" "}
          <a
            href="https://github.com/quven1990/build-a-ring-farm-wiki/blob/main/scripts/codes-sync-sources.mjs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
          >
            view sync sources
            <ExternalLink className="h-3 w-3" />
          </a>
          .
        </p>
      </div>
    </section>
  )
}
