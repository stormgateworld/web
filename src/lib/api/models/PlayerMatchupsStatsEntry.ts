/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerStatsEntryNumBreakdown } from "./PlayerStatsEntryNumBreakdown"
export type PlayerMatchupsStatsEntry = {
  match_length_range?: string | null
  matches_count: number
  wins_count: number
  losses_count: number
  wins: number
  losses: number
  ties: number
  win_rate?: number | null
  match_length: PlayerStatsEntryNumBreakdown
}
