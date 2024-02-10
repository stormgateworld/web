export const prerender = false

import satori from "satori"
import sharp from "sharp"
import { html } from "satori-html"
import { readFileSync } from "node:fs"
import { Buffer } from "node:buffer"
import process from "node:process"

export async function GET({ params, request }) {
  const key = params.key
  const value = params.value

  const fontFilePath = `${process.cwd()}/src/assets/fonts/NunitoSans_7pt-Regular.ttf`
  const fontFile = readFileSync(fontFilePath)

  const markup = html(`<div style="background: red; height: 100%;">Hi, this is your key: ${key} value: ${value}</div>`)
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Sans",
        style: "normal",
        data: fontFile,
      },
    ],
  })

  const sharpSvg = Buffer.from(svg)
  const buffer = await sharp(sharpSvg).toBuffer()

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  })
}
