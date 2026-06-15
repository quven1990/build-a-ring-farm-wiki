"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

const PLAUSIBLE_SRC =
  "https://plausible.shipsolo.io/js/pa-fRMIEoUqLkrWCpfCd6Q0h.js"
const CLARITY_ID = "wx6wv9epyf"
const AHREFS_ANALYTICS_KEY = "GW8Ndre3F4aXvFiywGTmgQ"

/** Non-blocking analytics — client-only to avoid Script hydration mismatch. */
export function DeferredAnalytics() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Script
        id="plausible-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init()`,
        }}
      />
      <Script src={PLAUSIBLE_SRC} strategy="lazyOnload" />
      <Script
        id="microsoft-clarity"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_ID}");`,
        }}
      />
      <Script
        id="ahrefs-analytics"
        src="https://analytics.ahrefs.com/analytics.js"
        data-key={AHREFS_ANALYTICS_KEY}
        strategy="lazyOnload"
      />
    </>
  )
}
