/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerStatsEntryNumBreakdown } from "./PlayerStatsEntryNumBreakdown"
export type PlayerStatsEntryAggregated = {
  matches: number
  matches_per_day: PlayerStatsEntryNumBreakdown
  wins: number
  losses: number
  ties: number
  win_rate?: number | null
  mmr: PlayerStatsEntryNumBreakdown
  points: PlayerStatsEntryNumBreakdown
  match_length: PlayerStatsEntryNumBreakdown
}
