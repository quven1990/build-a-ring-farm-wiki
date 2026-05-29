import { NextResponse } from "next/server"
import { COOKIE_CONSENT_COOKIE, isValidCookieConsentValue } from "@/lib/cookie-consent"
import { siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/sitemap"

function resolveRedirectTarget(request: Request): string {
  const fallback = absoluteUrl("/")
  const referer = request.headers.get("referer")
  if (!referer) return fallback

  try {
    const refererUrl = new URL(referer)
    const siteOrigin = new URL(siteConfig.url).origin
    if (refererUrl.origin !== siteOrigin) return fallback
    return referer
  } catch {
    return fallback
  }
}

export function GET(request: Request) {
  const url = new URL(request.url)
  const value = url.searchParams.get("value")

  if (!isValidCookieConsentValue(value)) {
    return NextResponse.json(
      { error: "Invalid value. Use accepted|rejected." },
      { status: 400 }
    )
  }

  const response = NextResponse.redirect(resolveRedirectTarget(request), 302)
  response.cookies.set({
    name: COOKIE_CONSENT_COOKIE,
    value,
    httpOnly: false,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}
