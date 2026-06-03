"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type LazyOnViewProps = {
  children: ReactNode
  fallback: ReactNode
  rootMargin?: string
  /** Reserved height prevents CLS while the fallback is shown. */
  minHeight?: number | string
}

/**
 * Mount children (and their JS chunks) only when near the viewport.
 * SSR + first client paint always show `fallback` to avoid hydration swaps.
 */
export function LazyOnView({
  children,
  fallback,
  rootMargin = "280px 0px",
  minHeight,
}: LazyOnViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  const style = minHeight !== undefined ? { minHeight } : undefined

  return (
    <div ref={ref} style={style}>
      {visible ? children : fallback}
    </div>
  )
}
