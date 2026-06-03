"use client"

import { startTransition, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { PLAUSIBLE_GOALS, trackPlausibleEvent } from "@/lib/plausible-events"
import { scheduleIdle } from "@/lib/schedule-idle"

type HeroCopyLatestProps = {
  code: string
}

export function HeroCopyLatest({ code }: HeroCopyLatestProps) {
  const copyLatestCode = useCallback(() => {
    startTransition(() => {
      void navigator.clipboard.writeText(code).then(
        () => {
          scheduleIdle(() => {
            trackPlausibleEvent(PLAUSIBLE_GOALS.codeCopy, {
              props: { code, placement: "hero" },
              interactive: true,
            })
            void import("sonner").then(({ toast }) => toast(`✅ Copied ${code}`))
          })
        },
        () => {
          void import("sonner").then(({ toast }) =>
            toast.error("Could not copy code. Please copy manually.")
          )
        }
      )
    })
  }, [code])

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto"
      variant="secondary"
      type="button"
      onClick={copyLatestCode}
    >
      <Copy className="mr-2 h-5 w-5" />
      Copy latest code
    </Button>
  )
}
