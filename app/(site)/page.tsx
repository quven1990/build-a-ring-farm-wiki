import { HeroSection } from "@/components/wiki/hero-section"
import { HomeHubSection } from "@/components/wiki/home-hub-section"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { QuickNavigation } from "@/components/wiki/quick-navigation"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { webSiteJsonLd } from "@/lib/json-ld"

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={webSiteJsonLd()} />
      <HeroSection />
      <QuickNavigation />
      <HomeHubSection />
      <EnhancedSeoSection pageKey="home" relatedKey="home" />
    </>
  )
}
