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
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){function c(){try{var e=document.getElementById("rcr-wrapper");e&&(e.removeAttribute("id"),e.removeAttribute("class"),e.hidden=!0);var t=document.body;if(t){var s=t.getAttribute("style")||"";(/margin-top:\\s*36px/i.test(s)||/position:\\s*absolute/i.test(s))&&t.removeAttribute("style")}document.querySelectorAll("header").forEach(function(h){var o=h.style&&h.style.top;if(o&&/calc\\(36px\\)/i.test(o))h.style.removeProperty("top")})}catch(r){}}c()})();`,
          }}
        />
        {children}
        <DeferredClientShell />
      </body>
    </html>
  )
}
