import { HeroSection } from "@/components/wiki/hero-section"
import { SeoArticle } from "@/components/wiki/seo-article"
import { QuickNavigation } from "@/components/wiki/quick-navigation"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickNavigation />
      <SeoArticle pageKey="home" />
    </>
  )
}
