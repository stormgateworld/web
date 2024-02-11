export const prerender = false

import { PlayersApi } from "../../../lib/api"
import { readFileSync } from "node:fs"
import { Buffer } from "node:buffer"
import process from "node:process"
import { parse } from "node:url"
import { html } from "satori-html"
import satori from "satori"
import sharp from "sharp"

export async function GET({ params, request }) {
  const { host } = parse(request.url, true)
  const playerId = params.id
  const player = await PlayersApi.getPlayer({ playerId })

  const getCardHTML = () => {
    let cardHTML: string = ""

    // We might want to display more in the future, but for now let's just use the player's best
    const highestLeague = player?.leaderboard_entries?.reduce(
      (acc, entry) => ((entry.points ?? 0) > (acc.points ?? 0) ? entry : acc),
      player.leaderboard_entries[0]
    )

    if (highestLeague?.rank) {
      const badge = `https://${host}/images/game/factions/${highestLeague.race}-small-glow.png`
      const leagueIcon = `https://${host}/images/game/leagues/${highestLeague.league}-${highestLeague.tier}.png`
      const banner = `https://${host}/images/game/factions/${highestLeague.race}-portrait.png`
      const color = highestLeague.race === "infernals" ? "red" : "blue"
      const backgroundColor =
        highestLeague.race === "infernals"
          ? "background: rgb(45,5,4);background: linear-gradient(250deg, rgba(71,11,10,1) 0%, rgba(38,5,4,0.9317927854735644) 100%);"
          : " background: rgb(12,34,79);background: linear-gradient(250deg, rgba(12,34,79,0.8785714969581583) 0%, rgba(2,7,25,1) 100%); "

      const winRateGreenBar = Math.round(highestLeague.win_rate).toString()[0]
      const winRateRedBar = (10 - parseInt(winRateGreenBar)).toString()

      cardHTML += `
        <div 
          style="${backgroundColor} height:430px;"
          class="flex border-2 rounded-xl border-${color}-500/20 overflow-hidden"
        >
          <div class="flex w-full">
            <div class="flex flex-col w-3/4">
              <div class="flex items-center px-7 pt-4 ">
                <img src="${badge}" class="w-16 mr-4 -mt-5" />
                <div class="flex flex-col my-2">
                  <p class="w-full text-gray-400 text-2xl capitalize -mt-1 -mb-1 font-bold">
                  ${highestLeague.league} ${highestLeague.tier}</p>
                  <h1 class="w-full text-gray-200 text-4xl capitalize m-0 pb-3">${player.nickname}</h1>
                </div>
              </div>
              <div class="flex items-center bg-${color}-800/10 border-l border-${color}-500/50 py-3">
                <div class="flex flex-col w-1/4 items-center">
                  <img src="${leagueIcon}" width="150" />
                </div>
                <div class="flex flex-col w-1/3 ml-16">
                  <p class="m-0 text-gray-400 text-4xl font-bold min-w-32 mb-1">Rank</p>
                  <p class="m-0 text-gray-100 text-5xl font-bold"># ${highestLeague.rank}</p>
                </div>
                <div class="flex flex-col w-1/3">
                  <p class="m-0 text-gray-400 text-4xl font-bold mb-1">Points</p>
                  <p class="m-0 text-gray-100 text-5xl font-bold">${highestLeague?.points?.toFixed()}</p>
                </div>
              </div>
              <div class="flex mt-6 w-full">
                <div class="flex flex-col pl-8 mr-20">
                  <p class="m-0 text-gray-400 font-bold text-2xl">MMR</p>
                  <p class="m-0 text-gray-100 text-3xl font-bold">${highestLeague?.mmr?.toFixed()}</p>
                </div>
                <div class="flex flex-col mr-13">
                  <p class="m-0 text-gray-400 font-bold text-2xl">Win Rate</p>
                  <p class="m-0 text-gray-100 text-3xl font-bold">${highestLeague?.win_rate?.toFixed()}%</p>
                </div>
                <div class="flex flex-col w-72 h-16 mt-2 -ml-5">
                  <p class="m-0 -mb-2 text-gray-400 font-bold text-3xl flex self-end">
                    <span style="color:#55EA00;">${highestLeague.wins}</span> 
                    <span class="mx-2"> - </span>
                    <span style="color:#EA0000;">${highestLeague.losses}</span>
                  </p>
                  <div class="flex h-4 mt-4">
                    <div class="flex" style="width: ${winRateGreenBar}0%;background-color:#55EA00;" />
                    <div class="flex" style="width: ${winRateRedBar}0%;background-color:#EA0000;" />
                  </div>
                </div>
              </div>
            </div>
            <div 
              style="background: url('${banner}');background-size:250px 425px;background-repeat:no-repeat;"
              class="flex w-full h-full border-l border-${color}-800/50" />
          </div>
        </div>
      `
    }

    return cardHTML
  }

  const markup = html(`
    <div class="flex bg-transparent w-full h-full items-center">
      <div class="flex rounded-xl h-full w-full border-2 px-2 items-center" style="background-color: #030303;">
        <div class="flex flex-col w-full">
        ${getCardHTML()}
        </div>
      </div>
    </div>`)

  const svg = await satori(markup, {
    width: 900,
    height: 450,
    fonts: [
      {
        name: "Nunito",
        style: "normal",
        weight: 400,
        data: readFileSync(`${process.cwd()}/src/assets/fonts/NunitoSans_7pt-Regular.ttf`),
      },
      {
        name: "Nunito",
        style: "normal",
        weight: 700,
        data: readFileSync(`${process.cwd()}/src/assets/fonts/NunitoSans_7pt-Bold.ttf`),
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
