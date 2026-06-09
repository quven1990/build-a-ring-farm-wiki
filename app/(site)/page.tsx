import { HeroSectionStatic } from "@/components/wiki/hero-section-static"
import { heroLcpImage } from "@/components/wiki/hero-lcp-fallback"
import { LatestCodeSyncBanner } from "@/components/wiki/latest-code-sync-banner"
import { HomeWikiSections } from "@/components/wiki/home-wiki-sections"
import { QuickNavigation } from "@/components/wiki/quick-navigation"
import { HomeHubSection } from "@/components/wiki/home-hub-section"
import { HomeFaqSection } from "@/components/wiki/home-faq-section"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import {
  HomeCodesSectionDeferred,
  HomeMidAdDeferred,
} from "@/components/wiki/home-page-deferred"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { getFaqForPage } from "@/lib/faq-data"
import { faqPageJsonLd, webSiteJsonLd } from "@/lib/json-ld"

/** Static HTML at the edge — root layout no longer calls cookies(). */
export const dynamic = "force-static"
export const revalidate = 3600

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/home-hero-farm-640.webp"
        media="(max-width: 640px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={heroLcpImage.src}
        media="(min-width: 641px)"
        fetchPriority="high"
      />
      <JsonLdScript data={webSiteJsonLd()} />
      <JsonLdScript data={faqPageJsonLd(getFaqForPage("home"))} />
      <HeroSectionStatic />
      <LatestCodeSyncBanner />
      <HomeCodesSectionDeferred />
      <HomeWikiSections />
      <QuickNavigation />
      <div className="container mx-auto max-w-3xl px-4">
        <HomeMidAdDeferred />
      </div>
      <HomeHubSection />
      <HomeFaqSection />
      <EnhancedSeoSection pageKey="home" relatedKey="home" showFaq={false} />
    </>
  )
}
