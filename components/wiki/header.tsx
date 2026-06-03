"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, ExternalLink } from "lucide-react"
import { SiteLogo } from "@/components/wiki/site-logo"
import { navItems, siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const HeaderMobileSheet = dynamic(
  () =>
    import("@/components/wiki/header-mobile-sheet").then((m) => ({
      default: m.HeaderMobileSheet,
    })),
  { ssr: false }
)

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
      suppressHydrationWarning
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <SiteLogo size={36} className="shrink-0" />
          <span className="max-w-[9.5rem] truncate font-bold text-sm text-foreground sm:max-w-none sm:text-base">
            Build A Ring Farm
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                navLinkClass,
                isActive(item.href)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button asChild size="icon" className="sm:hidden" variant="secondary" title="Play on Roblox">
            <a
              href={siteConfig.robloxGameUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Play on Roblox</span>
            </a>
          </Button>
          <Button asChild className="hidden sm:flex" variant="secondary">
            <a
              href={siteConfig.robloxGameUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Play on Roblox
            </a>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={isOpen}
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          {isOpen ? (
            <HeaderMobileSheet
              open={isOpen}
              onOpenChange={setIsOpen}
              isActive={isActive}
            />
          ) : null}
        </div>
      </div>
    </header>
  )
}
