import { HeroResponsiveImage } from "@/components/wiki/hero-responsive-image"

export const heroLcpImage = {
  src: "/images/home-hero-farm.webp",
  mobileSrc: "/images/home-hero-farm-640.webp",
  width: 1024,
  height: 512,
  alt: "Build A Ring Farm — farmer in the crop field with a glowing ring portal",
} as const

/** Static LCP image shown while the carousel client bundle loads. */
export function HeroLcpFallback() {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/15 blur-2xl" />
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border/70 bg-card/40 shadow-lg ring-1 ring-black/[0.04] sm:aspect-[2/1]">
        <HeroResponsiveImage
          src={heroLcpImage.src}
          mobileSrc={heroLcpImage.mobileSrc}
          alt={heroLcpImage.alt}
          width={heroLcpImage.width}
          height={heroLcpImage.height}
          priority
        />
      </div>
    </div>
  )
}
