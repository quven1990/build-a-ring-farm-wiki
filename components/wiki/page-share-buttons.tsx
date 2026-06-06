"use client"

import { startTransition, useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { buildShareUrl, getShareUrl, type SharePlatform } from "@/lib/share-links"
import { PLAUSIBLE_GOALS, trackPlausibleEvent } from "@/lib/plausible-events"
import { scheduleIdle } from "@/lib/schedule-idle"
import { cn } from "@/lib/utils"
import { Copy, Facebook, Share2, Send } from "lucide-react"

type PageShareButtonsProps = {
  path: string
  title: string
  text?: string
  className?: string
}

const PLATFORMS: { id: SharePlatform; label: string; shortLabel: string }[] = [
  { id: "twitter", label: "Share on X (Twitter)", shortLabel: "X" },
  { id: "facebook", label: "Share on Facebook", shortLabel: "Facebook" },
  { id: "reddit", label: "Share on Reddit", shortLabel: "Reddit" },
  { id: "whatsapp", label: "Share on WhatsApp", shortLabel: "WhatsApp" },
  { id: "telegram", label: "Share on Telegram", shortLabel: "Telegram" },
]

function trackShare(platform: string, path: string) {
  scheduleIdle(() => {
    trackPlausibleEvent(PLAUSIBLE_GOALS.pageShare, {
      props: { platform, path },
      interactive: true,
    })
  })
}

export function PageShareButtons({ path, title, text, className }: PageShareButtonsProps) {
  const [canNativeShare, setCanNativeShare] = useState(false)
  const shareUrl = useMemo(() => getShareUrl(path), [path])
  const shareText = text ?? title

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function")
  }, [])

  const copyLink = useCallback(() => {
    startTransition(() => {
      void navigator.clipboard.writeText(shareUrl).then(
        () => {
          trackShare("copy", path)
          void import("sonner").then(({ toast }) =>
            toast("Link copied — paste in Discord or chat")
          )
        },
        () => {
          void import("sonner").then(({ toast }) => toast.error("Could not copy link"))
        }
      )
    })
  }, [path, shareUrl])

  const nativeShare = useCallback(async () => {
    if (typeof navigator.share !== "function") return
    try {
      await navigator.share({ title, text: shareText, url: shareUrl })
      trackShare("native", path)
    } catch {
      // User cancelled
    }
  }, [path, shareText, shareUrl, title])

  return (
    <div
      className={cn("flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center", className)}
      aria-label="Share this page"
    >
      <span className="text-sm font-medium text-muted-foreground">Share</span>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" variant="outline" onClick={copyLink} aria-label="Copy page link">
          <Copy className="mr-1.5 h-3.5 w-3.5" aria-hidden />
          Copy link
        </Button>

        {canNativeShare ? (
          <Button type="button" size="sm" variant="outline" onClick={nativeShare} aria-label="Share via device">
            <Share2 className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Share
          </Button>
        ) : null}

        {PLATFORMS.map((platform) => {
          const href = buildShareUrl(platform.id, shareUrl, title, shareText)
          const Icon =
            platform.id === "facebook" ? Facebook : platform.id === "telegram" ? Send : Share2
          return (
            <Button key={platform.id} size="sm" variant="outline" asChild className="px-2.5 sm:px-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform.label}
                onClick={() => trackShare(platform.id, path)}
              >
                {platform.id === "twitter" ? (
                  <span className="text-xs font-bold">𝕏</span>
                ) : (
                  <Icon className="mr-1 h-3.5 w-3.5 max-sm:mr-0 sm:inline" aria-hidden />
                )}
                <span className="hidden sm:inline">{platform.shortLabel}</span>
              </a>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
