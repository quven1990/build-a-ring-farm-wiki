import { cn } from "@/lib/utils"

type HeroResponsiveImageProps = {
  src: string
  mobileSrc?: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

/** Native picture/img — Next.js Image omits srcSet; we need explicit mobile/desktop assets for LCP. */
export function HeroResponsiveImage({
  src,
  mobileSrc,
  alt,
  width,
  height,
  priority = false,
  className,
}: HeroResponsiveImageProps) {
  return (
    <picture className="block h-full w-full">
      {mobileSrc ? (
        <source media="(max-width: 640px)" srcSet={mobileSrc} type="image/webp" />
      ) : null}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", className)}
      />
    </picture>
  )
}
