import { preload } from "react-dom"
import { HeroSection } from "@/components/wiki/hero-section"
import { HomeHubSection } from "@/components/wiki/home-hub-section"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { QuickNavigation } from "@/components/wiki/quick-navigation"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { AdsenseAd } from "@/components/wiki/adsense-ad"
import { webSiteJsonLd } from "@/lib/json-ld"

export default function HomePage() {
  preload("/images/home-hero-farm.webp", { as: "image", fetchPriority: "high" })
  return (
    <>
      <JsonLdScript data={webSiteJsonLd()} />
      <HeroSection />
      <QuickNavigation />
      <div className="container mx-auto max-w-3xl px-4">
        <AdsenseAd placement="home" />
      </div>
      <HomeHubSection />
      <EnhancedSeoSection pageKey="home" relatedKey="home" />
    </>
  )
}
