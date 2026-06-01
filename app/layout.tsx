import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import { ClientConsentScripts } from "@/components/wiki/client-consent-scripts"
import { DeferredAnalytics } from "@/components/wiki/deferred-analytics"
import { siteConfig } from "@/lib/site-config"
import { createPageMetadata } from "@/lib/metadata"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`} suppressHydrationWarning>
      <body className={`${geist.className} font-sans antialiased`}>
        {children}
        <Toaster richColors position="bottom-center" />
        <DeferredAnalytics />
        <ClientConsentScripts />
      </body>
    </html>
  )
}
