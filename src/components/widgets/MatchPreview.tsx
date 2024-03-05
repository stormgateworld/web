import type { MatchResponse } from "../../lib/api"
import infernals from "../../assets/game/factions/infernals-small-glow.png"
import vanguard from "../../assets/game/factions/vanguard-small-glow.png"
import FormatDate from "./FormatDate"
import { formatDuration, urlencode } from "../../lib/utils"
import { Tooltip } from "../ui/Tooltip"
import { RankedBadge } from "../ui/RankedBadge"
import { classes } from "../../lib/theme"
import { raceLabels } from "../../lib/labels"

export default function MatchPreview(props: { match: MatchResponse; mainPlayerId: string }) {
  const { match, mainPlayerId } = props
  const mainPlayer = match.players.find((player) => player.player?.player_id === mainPlayerId) ?? { result: "unknown" }

  return (
    <div class="flex items-center gap-4 border-b border-gray-700/50 px-3 py-2.5 last:border-b-0 sm:px-4">
      <div
        class={classes(
          "ml-1 flex size-6 items-center justify-center rounded text-sm font-extrabold uppercase text-gray-800",
          mainPlayer.result === "win" ? "bg-green-600" : mainPlayer.result === "loss" ? "bg-red-600" : "bg-gray-500"
        )}
      >
        {mainPlayer.result === "win" ? "W" : mainPlayer.result === "loss" ? "L" : "-"}
      </div>
      <div class="flex-auto">
        {match.players
          .sort((player) => (player.player?.player_id === mainPlayerId ? 1 : -1))
          .map((player, pos) => (
            <div class="flex items-center gap-3">
              <span
                class={classes(
                  "w-8 flex-none whitespace-nowrap text-right text-xs",
                  player.mmr_diff! > 0 ? "text-green-600" : player.mmr_diff! < 0 ? "text-red-600" : "text-gray-500"
                )}
              >
                {player.mmr_diff! > 0 ? "↑" : "↓"}
                {Math.abs(Math.round(player.mmr_diff!))}
              </span>
              <Tooltip content={raceLabels[player.race]}>
                <img
                  src={player.race === "infernals" ? infernals.src : vanguard.src}
                  alt={player.race}
                  class="size-7 min-w-7 flex-none object-contain"
                />
              </Tooltip>
              <div
                class={classes(
                  "flex flex-auto items-center gap-2 py-1.5",
                  pos > 0 ? "border-t border-gray-600/50" : ""
                )}
              >
                {player.player?.nickname ? (
                  <a
                    href={`/players/${player.player.player_id}-${urlencode(player.player.nickname!)}`}
                    class="truncate font-semibold text-gray-50 hover:underline"
                  >
                    {player.player.nickname}
                  </a>
                ) : (
                  <em class="text-gray-300">Unknown</em>
                )}
                <div class="hidden items-center text-sm md:flex">
                  <span class="inline-flex items-center text-gray-500">
                    {player.player_leaderboard_entry ? (
                      <>
                        <RankedBadge entry={player.player_leaderboard_entry!} class="mr-1 w-4" />
                        {/* TODO: remove when more data is available */}
                        {player.player_leaderboard_entry?.rank ? (
                          `#${player.player_leaderboard_entry?.rank}`
                        ) : (
                          <a href="/faq/#why-is-my-rank-1000">#&gt;1000</a>
                        )}
                      </>
                    ) : (
                      <>
                        <RankedBadge unranked class="mr-1 w-4" />
                      </>
                    )}
                  </span>
                </div>
                {player.scores?.resources_mined > 0 && (
                  <div class="hidden flex-auto justify-end gap-1.5 text-sm font-bold text-gray-100 xs:flex">
                    <Tooltip content="Total Units killed">{player.scores?.units_killed}</Tooltip>
                    <span class="text-gray-600">/</span>
                    <Tooltip content="Total Structures Destroyed">{player.scores?.structures_killed}</Tooltip>
                    <span class="text-gray-600">/</span>
                    <Tooltip content="Total Resources Mined">
                      {Math.round(player.scores?.resources_mined / 100) / 10}k
                    </Tooltip>
                    <span class="text-gray-600">/</span>
                    <Tooltip content="Total Creep Resources Collected">
                      {player.scores?.creep_resources_collected}
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <div class="hidden basis-1/6 text-right text-xs text-gray-400 sm:block">
        <p>{formatDuration(match.duration)}</p>
        <p>
          <FormatDate format="shortdatetime" date={match.created_at} />
        </p>
        <p>{match.server.replaceAll("_", " ")}</p>
      </div>
    </div>
  )
}
