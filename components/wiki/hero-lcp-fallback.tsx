import Image from "next/image"

/** Static LCP image shown while the carousel client bundle loads. */
export function HeroLcpFallback() {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/15 blur-2xl" />
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border/70 bg-card/40 shadow-lg ring-1 ring-black/[0.04] sm:aspect-[2/1]">
        <Image
          src="/images/home-hero-farm.webp"
          alt="Build A Ring Farm — farmer in the crop field with a glowing ring portal"
          width={1024}
          height={512}
          priority
          fetchPriority="high"
          className="h-full w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
        />
      </div>
    </div>
  )
}
