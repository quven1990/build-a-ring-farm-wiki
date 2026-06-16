"use client"

import type { ComponentProps } from "react"
import { siteConfig } from "@/lib/site-config"
import { trackPlayOnRoblox, type PlayOnRobloxLocation } from "@/lib/plausible-events"

type PlayOnRobloxLinkProps = Omit<ComponentProps<"a">, "href"> & {
  location: PlayOnRobloxLocation
}

export function PlayOnRobloxLink({ location, onClick, ...props }: PlayOnRobloxLinkProps) {
  return (
    <a
      href={siteConfig.robloxGameUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...props}
      onClick={(event) => {
        trackPlayOnRoblox(location)
        onClick?.(event)
      }}
    />
  )
}
