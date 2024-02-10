export const prerender = false

import satori from "satori"
import sharp from "sharp"
import { html } from "satori-html"
import { readFileSync } from "node:fs"
import { Buffer } from "node:buffer"
import process from "node:process"
import { parse } from "node:url"
import type { Leaderboard, LeaderboardEntryResponse, Race } from "../../../lib/api"

export async function GET({ params, request }) {

  const id = params.id

  const { query, host } = parse(request.url, true);
  const infernalsBadge = `https://${host}/images/infernals-small-glow.png`
  const vanguardBadge = `https://${host}/images/vanguard-small-glow.png`

  const fontFilePath = `${process.cwd()}/src/assets/fonts/NunitoSans_7pt-Regular.ttf`
  const fontFile = readFileSync(fontFilePath)

  const markup = html(`
    <div style="background: transparent; padding: 1rem;display: flex; height: 100%;">
      <div style="
        background: #343434;
        border-radius: 25px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;"
      >
        <h1>${ query.nickname }</h1>
        <img src=${infernalsBadge} width="100" height="100" />
      </div>
    </div>`)

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
