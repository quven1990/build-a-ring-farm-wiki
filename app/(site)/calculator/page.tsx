import type { Metadata } from "next"
import { ProfitCalculator } from "@/components/wiki/profit-calculator"
import { EnhancedSeoSection } from "@/components/wiki/enhanced-seo-section"
import { JsonLdScript } from "@/components/wiki/json-ld-script"
import { createPageMetadata } from "@/lib/metadata"
import { WikiPageShell } from "@/lib/page-shell"
import { webApplicationJsonLd } from "@/lib/json-ld"

export const metadata: Metadata = createPageMetadata("calculator", "/calculator")

export default function CalculatorPage() {
  return (
    <WikiPageShell pageKey="calculator" showHero={false}>
      <JsonLdScript
        data={webApplicationJsonLd({
          name: "Build A Ring Farm Profit Calculator",
          description:
            "Free profit calculator using the community-verified Build A Ring Farm harvest formula.",
          path: "/calculator",
        })}
      />
      <ProfitCalculator />
      <EnhancedSeoSection pageKey="calculator" relatedKey="calculator" />
    </WikiPageShell>
  )
}
