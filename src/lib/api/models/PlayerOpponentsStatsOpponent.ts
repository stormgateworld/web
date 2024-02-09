/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchParticipantPlayerResponse } from "./MatchParticipantPlayerResponse"
import type { PlayerStatsEntryNumBreakdown } from "./PlayerStatsEntryNumBreakdown"
export type PlayerOpponentsStatsOpponent = {
  player: MatchParticipantPlayerResponse
  matches_count: number
  wins_count: number
  losses_count: number
  win_rate: number
  match_length: PlayerStatsEntryNumBreakdown
}
