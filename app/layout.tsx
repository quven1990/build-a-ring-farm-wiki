import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { PlausibleAnalytics } from '@/components/wiki/plausible-analytics'
import { ThirdPartyScripts } from '@/components/wiki/third-party-scripts'
import { siteConfig } from '@/lib/site-config'
import { createPageMetadata } from '@/lib/metadata'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

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
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <PlausibleAnalytics />
        <ThirdPartyScripts />
      </body>
    </html>
  )
}
