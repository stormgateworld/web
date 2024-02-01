import { type JSX, createResource, splitProps, Suspense } from "solid-js"
import { leagues } from "../../assets/game/leagues/leagues"
import type { LeaderboardEntryResponse, MatchParticipantPlayerLeaderboardEntryResponse } from "../../lib/api"
import { getImage } from "astro:assets"
import { Tooltip } from "./Tooltip"

const sizes = { s: 32, m: 64, l: 128, xl: 256 }

export function RankedBadge(
  props: {
    entry?: MatchParticipantPlayerLeaderboardEntryResponse | LeaderboardEntryResponse
    unranked?: boolean
    size?: keyof typeof sizes
  } & JSX.ImgHTMLAttributes<HTMLImageElement>
) {
  const [local, rest] = splitProps(props, ["entry", "unranked", "size"])
  const src =
    local.unranked || !local.entry
      ? leagues.unranked
      : leagues[(local.entry.league + local.entry.tier) as keyof typeof leagues] ?? leagues.unranked
  const size = sizes[local.size ?? "m"]
  const [image] = createResource(src, () => getImage({ src, sizes: [32, 64, 128, 256] }))

  const label = () =>
    local.unranked || !local.entry
      ? "Unranked"
      : `${local.entry.league.charAt(0).toUpperCase() + local.entry.league.substring(1)} ${local.entry.tier}`

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tooltip content={label()}>
        <img alt={label()} src={image()?.src} srcSet={image()?.srcSet.attribute} {...rest} {...image()?.attributes} />
      </Tooltip>
    </Suspense>
  )
}
