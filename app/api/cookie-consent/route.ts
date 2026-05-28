import { NextResponse } from "next/server"
import { COOKIE_CONSENT_COOKIE, isValidCookieConsentValue } from "@/lib/cookie-consent"

export function GET(request: Request) {
  const url = new URL(request.url)
  const value = url.searchParams.get("value")

  if (!isValidCookieConsentValue(value)) {
    return NextResponse.json(
      { error: "Invalid value. Use accepted|rejected." },
      { status: 400 }
    )
  }

  const redirectTo = request.headers.get("referer") ?? "/"
  const response = NextResponse.redirect(redirectTo, 302)
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

