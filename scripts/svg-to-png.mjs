#!/usr/bin/env node
/** Rasterize article SVG infographics to PNG for broad browser/CDN compatibility. */

import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { Resvg } from "@resvg/resvg-js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = join(__dirname, "../public/images/articles")

const files = [
  "money-method-ring-priority.svg",
  "money-method-pet-mutations.svg",
  "money-method-fertilizer-loop.svg",
]

for (const svgName of files) {
  const svgPath = join(ARTICLES_DIR, svgName)
  const pngPath = svgPath.replace(/\.svg$/, ".png")
  const svg = readFileSync(svgPath)
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 960 },
    font: { loadSystemFonts: true },
  })
  const png = resvg.render().asPng()
  writeFileSync(pngPath, png)
  console.log(`Wrote ${pngPath} (${png.byteLength} bytes)`)
}
