import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const CANONICAL_HOST = "buildaring.online"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase()
  if (!host || host === "localhost" || host === "127.0.0.1") {
    return NextResponse.next()
  }

  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim()
  const isHttps =
    forwardedProto === "https" || request.nextUrl.protocol === "https:"

  if (host === CANONICAL_HOST && isHttps) {
    return NextResponse.next()
  }

  const destination = request.nextUrl.clone()
  destination.protocol = "https:"
  destination.host = CANONICAL_HOST

  return NextResponse.redirect(destination, 301)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
}
