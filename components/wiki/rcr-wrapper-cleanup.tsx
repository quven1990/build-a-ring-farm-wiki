"use client"

import { useEffect } from "react"

/**
 * Some privacy/cookie browser extensions inject #rcr-wrapper and inline body/header
 * offsets before React hydrates. DOM mutation must run only after hydration — never
 * in a beforeInteractive script (causes React 19 hydration mismatch).
 */
export function RcrWrapperCleanup() {
  useEffect(() => {
    function cleanup() {
      try {
        const wrapper = document.getElementById("rcr-wrapper")
        if (wrapper) {
          wrapper.removeAttribute("id")
          wrapper.removeAttribute("class")
          wrapper.hidden = true
        }

        const body = document.body
        if (body) {
          const style = body.getAttribute("style") ?? ""
          if (/margin-top:\s*36px/i.test(style) || /position:\s*absolute/i.test(style)) {
            body.removeAttribute("style")
          }
        }

        document.querySelectorAll("header").forEach((header) => {
          const top = header.style?.top
          if (top && /calc\(36px\)/i.test(top)) {
            header.style.removeProperty("top")
          }
        })
      } catch {
        // Extension DOM shapes vary — ignore
      }
    }

    cleanup()
  }, [])

  return null
}
