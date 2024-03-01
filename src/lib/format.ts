import type { LeaderboardEntryResponse, PlayerResponse } from "./api"
import { leagueLabels } from "./labels"
import { urlencode } from "./utils"

export function formatDateRelative(date: Date, format: "short" | "medium" = "medium") {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12))
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))
  if (format == "short") {
    if (years > 0) return `${years}y`
    else if (months > 0) return `${months}mo`
    else if (days > 0) return `${days}d`
    else if (hours > 0) return `${hours}h`
    else return `${minutes}m`
  }
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`
  else if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`
  else if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
  else if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  else if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  else return "today"
}

export function formatLeague(entry: Pick<LeaderboardEntryResponse, "league" | "tier">) {
  const tier = ["I", "II", "III"][(entry.tier ?? 0) - 1] ?? ""

  if (entry.league) {
    return `${leagueLabels[entry.league]} ${tier}`
  }
  return "Unranked"
}

export function getPlayerSlug(player: Pick<PlayerResponse, "id" | "nickname">) {
  return player.nickname ? `${player.id}-${urlencode(player.nickname)}` : player.id
}
