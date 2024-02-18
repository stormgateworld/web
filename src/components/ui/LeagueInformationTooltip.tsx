import { Tooltip as KTooltip } from "@kobalte/core"
import helpCircle from "lucide-static/icons/help-circle.svg?raw"
import type { LeaderboardEntryResponse } from "../../lib/api"
import { Tier, leagueInformations } from "../../lib/leagues"
import { formatLeague } from "../../lib/format"
import { RankedBadge } from "./RankedBadge"

type LeagueInformationTooltipProps = {
  leaderboard: LeaderboardEntryResponse
}

export function LeagueInformationTooltip({ leaderboard }: LeagueInformationTooltipProps) {
  if (!leaderboard.league || !leaderboard.tier) {
    return <></>
  }
  const information = leagueInformations[leaderboard.league][leaderboard.tier as Tier]
  const points = leaderboard.points ? Math.round(leaderboard.points) : information.minPoint

  return (
    <KTooltip.Root gutter={2} openDelay={0.1} closeDelay={0} ignoreSafeArea={true}>
      <KTooltip.Trigger class="outline-none">
        <span innerHTML={helpCircle} class="text-gray-200 *:w-4" />
      </KTooltip.Trigger>
      <KTooltip.Portal>
        <KTooltip.Content class=" rounded-sm border border-gray-700/50 bg-gray-800 px-1.5 py-1 text-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-1">
          <KTooltip.Arrow />
          {information.maxPoint && information.nextLeague && information.nextTier ? (
            <div class="m-2">
              <p class="mb-1 whitespace-nowrap text-sm font-black text-white  xs:text-base">
                Next league: {formatLeague({ league: information.nextLeague, tier: information.nextTier })}
              </p>
              <div class="flex justify-between">
                <div class="flex items-center gap-1">
                  <RankedBadge class="w-8" entry={{ league: leaderboard.league, tier: leaderboard.tier }} />
                  <p>{information.minPoint}</p>
                </div>

                <div class="mr-1 flex items-center gap-1">
                  <RankedBadge class="w-8" entry={{ league: information.nextLeague, tier: information.nextTier }} />
                  <p>{information.maxPoint}</p>
                </div>
              </div>
              <div class="relative mx-1 mt-2 h-1.5 flex-auto rounded-sm bg-gray-500/80">
                <div
                  class="absolute inset-0  rounded-l-sm bg-green-600"
                  style={{
                    width: `${
                      ((points - information.minPoint) * 100) / (information.maxPoint - information.minPoint)
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div class="m-2">
              <p class="mb-1 whitespace-nowrap text-sm font-black text-white  xs:text-base">Highest league reached!</p>
              <div class="w-100 relative mx-1 mt-2 h-1.5 flex-auto rounded-sm bg-green-600" />
            </div>
          )}
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip.Root>
  )
}
