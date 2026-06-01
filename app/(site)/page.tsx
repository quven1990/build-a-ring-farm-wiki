import { preload } from "react-dom"
import { HeroSection } from "@/components/wiki/hero-section"
import { HomeCodesPreview } from "@/components/wiki/home-codes-preview"
import { HomeFaqSection } from "@/components/wiki/home-faq-section"
import { HomeHubSection } from "@/components/wiki/home-hub-section"
import { HomeWikiSections } from "@/components/wiki/home-wiki-sections"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { QuickNavigation } from "@/components/wiki/quick-navigation"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { AdsenseAd } from "@/components/wiki/adsense-ad"
import { getFaqForPage } from "@/lib/faq-data"
import { faqPageJsonLd, webSiteJsonLd } from "@/lib/json-ld"

export default function HomePage() {
  preload("/images/home-hero-farm.webp", { as: "image", fetchPriority: "high" })
  return (
    <>
      <JsonLdScript data={webSiteJsonLd()} />
      <JsonLdScript data={faqPageJsonLd(getFaqForPage("home"))} />
      <HeroSection />
      <HomeCodesPreview />
      <HomeWikiSections />
      <QuickNavigation />
      <div className="container mx-auto max-w-3xl px-4">
        <AdsenseAd placement="home" />
      </div>
      <HomeHubSection />
      <HomeFaqSection />
      <EnhancedSeoSection pageKey="home" relatedKey="home" showFaq={false} />
    </>
  )
}
