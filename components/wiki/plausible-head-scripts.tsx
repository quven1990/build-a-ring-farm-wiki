import { isPlausibleEnabled } from "@/lib/plausible-config"

const PLAUSIBLE_SCRIPT_SRC =
  "https://plausible.shipsolo.io/js/pa-fRMIEoUqLkrWCpfCd6Q0h.js"

const PLAUSIBLE_INLINE_INIT = `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init()`

/** Privacy-friendly Plausible — loaded in <head> per dashboard snippet. */
export function PlausibleHeadScripts() {
  if (!isPlausibleEnabled()) return null

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script async src={PLAUSIBLE_SCRIPT_SRC} />
      <script dangerouslySetInnerHTML={{ __html: PLAUSIBLE_INLINE_INIT }} />
    </>
  )
}
