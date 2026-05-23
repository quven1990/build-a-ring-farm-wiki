"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const heroSlides = [
  {
    src: "/images/home-hero-farm.png",
    alt: "Build A Ring Farm — farmer in the crop field with a glowing ring portal",
    width: 1024,
    height: 512,
  },
  {
    src: "/images/home-hero-farm-2.png",
    alt: "Build A Ring Farm — wiki overview with seeds, mutations, codes, and calculator",
    width: 1672,
    height: 941,
  },
  {
    src: "/images/home-hero-farm-3.png",
    alt: "Build A Ring Farm — colorful farm with glowing ring portals and crystal crops",
    width: 1672,
    height: 941,
  },
] as const

const AUTOPLAY_MS = 5000

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    setActiveIndex(carouselApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  useEffect(() => {
    if (!api) return
    const timer = setInterval(() => {
      api.scrollNext()
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [api])

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/15 blur-2xl" />

      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 shadow-lg ring-1 ring-black/[0.04] backdrop-blur-sm"
      >
        <CarouselContent className="-ml-0">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.src} className="basis-full pl-0">
              <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  priority={index === 0}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          variant="secondary"
          className="left-3 size-9 border-border/80 bg-background/90 shadow-md backdrop-blur-sm"
        />
        <CarouselNext
          variant="secondary"
          className="right-3 size-9 border-border/80 bg-background/90 shadow-md backdrop-blur-sm"
        />

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-6 bg-primary"
                  : "w-2 bg-background/80 ring-1 ring-border/80 hover:bg-primary/60"
              )}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
