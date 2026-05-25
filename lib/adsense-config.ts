/** Google AdSense publisher ID (ca-pub-… without prefix). */
export const ADSENSE_CLIENT_ID = "ca-pub-9101692675645964"

export const ADSENSE_PUBLISHER_ID = "pub-9101692675645964"

export type AdsensePlacement = "article" | "home"

/** Ad unit slot from AdSense dashboard → Ads → By ad unit. */
export function getAdsenseSlot(placement: AdsensePlacement): string | undefined {
  const article = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE?.trim()
  const home = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME?.trim()

  if (placement === "home") return home || article || undefined
  return article || undefined
}

export function isAdsenseSlotConfigured(placement: AdsensePlacement): boolean {
  return Boolean(getAdsenseSlot(placement))
}
