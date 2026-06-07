import type { Metadata } from "next"
import { DeferredClientShell } from "@/components/wiki/deferred-client-shell"
import { siteConfig } from "@/lib/site-config"
import { createPageMetadata } from "@/lib/metadata"
import "./globals.css"

const homeMetadata = createPageMetadata("home", "/")

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s",
    default: homeMetadata.title as string,
  },
  description: homeMetadata.description,
  keywords: homeMetadata.keywords,
  alternates: homeMetadata.alternates,
  openGraph: homeMetadata.openGraph,
  twitter: homeMetadata.twitter,
  robots: homeMetadata.robots,
  other: {
    "google-adsense-account": "ca-pub-9101692675645964",
    /** Discourage Chrome translate — it mutates the DOM and breaks React (removeChild errors). */
    google: "notranslate",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      translate="no"
      className="notranslate bg-background"
      suppressHydrationWarning
    >
      <body className="notranslate font-sans antialiased" suppressHydrationWarning>
        {children}
        <DeferredClientShell />
      </body>
    </html>
  )
}
