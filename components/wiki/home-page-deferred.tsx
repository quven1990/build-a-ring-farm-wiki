"use client"

import dynamic from "next/dynamic"
import { LazyOnView } from "@/components/wiki/lazy-on-view"
import { HomeCodesPreviewStatic } from "@/components/wiki/home-codes-preview-static"

const HomeCodesPreview = dynamic(
  () =>
    import("@/components/wiki/home-codes-preview").then((m) => ({
      default: m.HomeCodesPreview,
    })),
  { ssr: false }
)

const LazyAdsenseAd = dynamic(
  () =>
    import("@/components/wiki/lazy-adsense-ad").then((m) => ({
      default: m.LazyAdsenseAd,
    })),
  { ssr: false }
)

export function HomeCodesSectionDeferred() {
  return (
    <LazyOnView fallback={<HomeCodesPreviewStatic />} minHeight={420}>
      <HomeCodesPreview />
    </LazyOnView>
  )
}

export function HomeMidAdDeferred() {
  return (
    <LazyOnView
      fallback={
        <div
          className="my-8 min-h-[250px] rounded-lg border border-border/60 bg-muted/20"
          aria-hidden
        />
      }
      minHeight={250}
    >
      <LazyAdsenseAd placement="home" />
    </LazyOnView>
  )
}
