/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchParticipantPlayerLeaderboardEntryResponse } from "./MatchParticipantPlayerLeaderboardEntryResponse"
import type { MatchParticipantPlayerResponse } from "./MatchParticipantPlayerResponse"
import type { MatchResult } from "./MatchResult"
import type { Race } from "./Race"
export type MatchParticipantResponse = {
  player?: MatchParticipantPlayerResponse | null
  player_leaderboard_entry?: MatchParticipantPlayerLeaderboardEntryResponse | null
  race: Race
  team: number
  party: number
  mmr: number
  mmr_updated?: number | null
  mmr_diff?: number | null
  result?: MatchResult | null
  ping?: number | null
  scores?: any
}
