"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, ExternalLink } from "lucide-react"
import { PlayOnRobloxLink } from "@/components/wiki/play-on-roblox-link"
import { SiteLogo } from "@/components/wiki/site-logo"
import { TrackedLink } from "@/components/wiki/tracked-link"
import { navItems } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const HeaderMobileSheet = dynamic(
  () =>
    import("@/components/wiki/header-mobile-sheet").then((m) => ({
      default: m.HeaderMobileSheet,
    })),
  { ssr: false }
)

const navLinkClass =
  "relative z-[1] shrink-0 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground xl:px-3"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileNavReady, setMobileNavReady] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileNavReady(true)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-card/80"
      suppressHydrationWarning
    >
      <div className="container mx-auto flex h-16 items-center gap-2 px-4 sm:gap-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <SiteLogo size={36} className="shrink-0" />
          <span className="max-w-[9.5rem] truncate font-bold text-sm text-foreground sm:max-w-none sm:text-base">
            Build A Ring Farm
          </span>
        </Link>

        {/* Full nav only on xl+ — lg–xl uses the sheet to avoid Play-button overlap */}
        <nav
          aria-label="Main"
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto [scrollbar-width:none] xl:flex [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {navItems.map((item) => (
            <TrackedLink
              key={item.label}
              href={item.href}
              tracking={{ kind: "nav", location: "header" }}
              className={cn(
                navLinkClass,
                isActive(item.href)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            asChild
            size="icon"
            className="xl:hidden"
            variant="secondary"
            title="Play on Roblox"
          >
            <PlayOnRobloxLink location="header-compact">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Play on Roblox</span>
            </PlayOnRobloxLink>
          </Button>
          <Button asChild className="hidden xl:flex" variant="secondary">
            <PlayOnRobloxLink location="header">
              <ExternalLink className="mr-2 h-4 w-4" />
              Play on Roblox
            </PlayOnRobloxLink>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-expanded={isOpen}
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileNavReady ? (
        <HeaderMobileSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          isActive={isActive}
        />
      ) : null}
    </header>
  )
}
