/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerStatsEntryNumBreakdown } from "./PlayerStatsEntryNumBreakdown"
import type { Race } from "./Race"
export type PlayerStatsEntry = {
  date?: string | null
  race?: Race | null
  matches: number
  wins: number
  losses: number
  ties: number
  win_rate?: number | null
  mmr: PlayerStatsEntryNumBreakdown
  points: PlayerStatsEntryNumBreakdown
  match_length: PlayerStatsEntryNumBreakdown
}
