import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
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
    <html lang="en" className="bg-background">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9101692675645964" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9101692675645964"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
