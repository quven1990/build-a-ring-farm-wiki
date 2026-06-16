import { Sparkles } from "lucide-react"
import { TrackedLink } from "@/components/wiki/tracked-link"
import { codesSyncMeta, formatSyncDate, wikiCodesSorted } from "@/lib/codes-data"
import { getLatestUpdateArticle, getUpdateArticleByCode } from "@/lib/updates/articles"

function getBannerCode() {
  return wikiCodesSorted.find((c) => c.isNew) ?? wikiCodesSorted[0]
}

export function LatestCodeSyncBanner() {
  const codeEntry = getBannerCode()
  if (!codeEntry) return null

  const latestArticle = getLatestUpdateArticle()
  const codeMatchedArticle = getUpdateArticleByCode(codeEntry.code)
  const updateArticle = latestArticle ?? codeMatchedArticle
  const newCount = wikiCodesSorted.filter((c) => c.isNew).length

  return (
    <div className="border-b border-primary/20 bg-primary/5">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 py-3 text-center sm:flex-row sm:gap-4 sm:text-left">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span>
            New update{" "}
            <strong className="font-semibold text-primary">{codeEntry.code}</strong>
            {newCount > 1 ? (
              <span className="text-muted-foreground"> · {newCount} fresh codes on list</span>
            ) : (
              <span className="text-muted-foreground"> · fresh code on list</span>
            )}
          </span>
        </div>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Synced {formatSyncDate(codesSyncMeta.lastSyncedAt)} from {codesSyncMeta.sourceCount}{" "}
          public lists
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {updateArticle ? (
            <TrackedLink
              href={`/updates/${updateArticle.slug}`}
              tracking={{ kind: "cta", source: "sync-banner", label: "update-article" }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Read {updateArticle.updateLabel ?? "Update"} article →
            </TrackedLink>
          ) : null}
          <TrackedLink
            href="/codes"
            tracking={{ kind: "cta", source: "sync-banner", label: "all-codes" }}
            className="text-primary underline-offset-4 hover:underline"
          >
            All active codes
          </TrackedLink>
          <TrackedLink
            href="/updates"
            tracking={{ kind: "cta", source: "sync-banner", label: "updates-hub" }}
            className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Updates hub
          </TrackedLink>
        </div>
      </div>
    </div>
  )
}
