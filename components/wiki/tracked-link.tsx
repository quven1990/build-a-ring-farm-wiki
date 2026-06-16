"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import {
  trackCtaClick,
  trackNavClick,
  trackRelatedGuideClick,
  type NavLocation,
} from "@/lib/plausible-events"

type LinkProps = ComponentProps<typeof Link>

type CtaTracking = { kind: "cta"; source: string; label?: string }
type NavTracking = { kind: "nav"; location: NavLocation }
type RelatedTracking = { kind: "related"; fromPage: string }

export type TrackedLinkProps = LinkProps & {
  tracking: CtaTracking | NavTracking | RelatedTracking
}

function destinationFromHref(href: LinkProps["href"]): string {
  if (typeof href === "string") return href
  const pathname = href.pathname ?? "/"
  const query = href.query
  if (!query) return pathname
  if (typeof query === "string") return `${pathname}?${query}`
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value == null) continue
    params.set(key, Array.isArray(value) ? value.join(",") : String(value))
  }
  const qs = params.toString()
  return qs ? `${pathname}?${qs}` : pathname
}

/** Next.js Link with Plausible click tracking — safe to use inside server components. */
export function TrackedLink({ tracking, onClick, href, ...props }: TrackedLinkProps) {
  const destination = destinationFromHref(href)

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        if (tracking.kind === "cta") {
          trackCtaClick(tracking.source, destination, tracking.label)
        } else if (tracking.kind === "nav") {
          trackNavClick(tracking.location, destination)
        } else {
          trackRelatedGuideClick(tracking.fromPage, destination)
        }
        onClick?.(event)
      }}
    />
  )
}
