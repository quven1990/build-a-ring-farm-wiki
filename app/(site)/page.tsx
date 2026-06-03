import { preload } from "react-dom"
import { HeroSectionStatic } from "@/components/wiki/hero-section-static"
import { HomeWikiSections } from "@/components/wiki/home-wiki-sections"
import { QuickNavigation } from "@/components/wiki/quick-navigation"
import { HomeHubSection } from "@/components/wiki/home-hub-section"
import { HomeFaqSection } from "@/components/wiki/home-faq-section"
import {
  HomeCodesSectionDeferred,
  HomeMidAdDeferred,
  HomeSeoDeferred,
} from "@/components/wiki/home-page-deferred"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { getFaqForPage } from "@/lib/faq-data"
import { faqPageJsonLd, webSiteJsonLd } from "@/lib/json-ld"

/** Static HTML at the edge — root layout no longer calls cookies(). */
export const dynamic = "force-static"
export const revalidate = 3600

export default function HomePage() {
  preload("/images/home-hero-farm.webp", { as: "image", fetchPriority: "high" })

  return (
    <>
      <JsonLdScript data={webSiteJsonLd()} />
      <JsonLdScript data={faqPageJsonLd(getFaqForPage("home"))} />
      <HeroSectionStatic />
      <HomeCodesSectionDeferred />
      <HomeWikiSections />
      <QuickNavigation />
      <div className="container mx-auto max-w-3xl px-4">
        <HomeMidAdDeferred />
      </div>
      <HomeHubSection />
      <HomeFaqSection />
      <HomeSeoDeferred />
    </>
  )
}
