import type { SeoBlock } from "@/lib/seo-article-content"

export type GuidePageId =
  | "build-a-ring-farm"
  | "build-a-ring-guide"
  | "build-a-ring-beginner-mistakes"
  | "build-a-ring-codes"
  | "build-a-ring-calculator"
  | "build-a-ring-wiki"
  | "build-a-ring-faq"
  | "build-a-ring-tier-list"
  | "build-a-ring-best-rings"
  | "build-a-ring-update-log"

export type GuidePageConfig = {
  id: GuidePageId
  path: `/${GuidePageId}`
  metaKey: GuidePageId
  schema: "Article" | "HowTo" | "FAQPage" | "WebApplication"
  toolCta?: { href: string; label: string; description: string }
  whatYouCanDo: string[]
  blocks: SeoBlock[]
  howToSteps?: { name: string; text: string }[]
}
