"use client"

import { startTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Copy, Gift } from "lucide-react"
import { toast } from "sonner"
import {
  codesSyncMeta,
  formatSyncDate,
  wikiCodesSorted,
} from "@/lib/codes-data"
import { getLatestUpdateArticle, getUpdateArticleByCode } from "@/lib/updates/articles"
import { trackCodeCopy } from "@/lib/plausible-events"
import { TrackedLink } from "@/components/wiki/tracked-link"
import { scheduleIdle } from "@/lib/schedule-idle"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"

const PREVIEW_COUNT = 8

function shortenReward(reward: string, max = 56): string {
  if (reward.length <= max) return reward
  return `${reward.slice(0, max).trim()}…`
}

export function HomeCodesPreview() {
  const previewCodes = wikiCodesSorted.slice(0, PREVIEW_COUNT)
  const headlineNewCode = wikiCodesSorted.find((c) => c.isNew)
  const headlineUpdate = getLatestUpdateArticle()
  const codeMatchedUpdate = headlineNewCode
    ? getUpdateArticleByCode(headlineNewCode.code)
    : undefined

  const copyToClipboard = (code: string) => {
    startTransition(() => {
      void navigator.clipboard.writeText(code).then(
        () => {
          scheduleIdle(() => {
            trackCodeCopy(code, "home-preview")
            toast("✅ Code copied to clipboard!")
          })
        },
        () => {
          toast.error("Could not copy code. Please copy manually.")
        }
      )
    })
  }

  return (
    <section
      id="latest-codes"
      className="border-b border-border bg-muted/20 py-12 sm:py-14"
      aria-labelledby="home-codes-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <Badge variant="outline" className="mb-3">
            <Gift className="mr-1 h-3 w-3" aria-hidden />
            Latest working codes
          </Badge>
          <h2
            id="home-codes-heading"
            className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Build A Ring Farm Codes
          </h2>
          <LastUpdatedBadge />
          <p className="text-pretty text-muted-foreground sm:text-lg">
            Free redeem codes for seed packs, sprays, fertilizers, and time skips. Copy a code,
            open Settings in-game, and redeem before it expires.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Synced {formatSyncDate(codesSyncMeta.lastSyncedAt)} · {wikiCodesSorted.length} active
            codes on the full list
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Code</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewCodes.map((item) => (
                <TableRow key={item.code}>
                  <TableCell className="font-mono font-semibold">{item.code}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {shortenReward(item.reward)}
                  </TableCell>
                  <TableCell>
                    {item.isNew ? (
                      <Badge className="border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                        NEW
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(item.code)}
                      aria-label={`Copy code ${item.code}`}
                    >
                      <Copy className="mr-1 h-3.5 w-3.5" aria-hidden />
                      Copy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
          <TrackedLink
            href="/codes"
            tracking={{ kind: "cta", source: "home-codes-preview", label: "full-codes-list" }}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            View full Build A Ring Farm codes list →
          </TrackedLink>
          {headlineUpdate ? (
            <>
              {" · "}
              <TrackedLink
                href={`/updates/${headlineUpdate.slug}`}
                tracking={{ kind: "cta", source: "home-codes-preview", label: "update-article" }}
                className="text-primary underline-offset-4 hover:underline"
              >
                {headlineUpdate.updateLabel ?? "Update"} article
                {codeMatchedUpdate?.slug === headlineUpdate.slug && headlineNewCode
                  ? ` (${headlineNewCode.code})`
                  : ""}
              </TrackedLink>
            </>
          ) : null}
          {" · "}
          <TrackedLink
            href="/build-a-ring-codes"
            tracking={{ kind: "cta", source: "home-codes-preview", label: "how-to-redeem" }}
            className="text-primary underline-offset-4 hover:underline"
          >
            How to redeem
          </TrackedLink>
        </p>
      </div>
    </section>
  )
}
