import type { Metadata } from "next"
import { ProfitCalculator } from "@/components/wiki/profit-calculator"
import { SeoArticle } from "@/components/wiki/seo-article"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"

export const metadata: Metadata = createPageMetadata("calculator", "/calculator")

export default function CalculatorPage() {
  return (
    <WikiPageShell pageKey="calculator" showHero={false}>
      <ProfitCalculator />
      <SeoArticle pageKey="calculator" />
    </WikiPageShell>
  )
}
