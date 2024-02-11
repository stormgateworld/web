/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { League } from "./League"
export type MatchParticipantPlayerLeaderboardEntryResponse = {
  leaderboard_entry_id: string
  league?: League | null
  tier?: number | null
  rank?: number | null
  wins: number
  losses: number
  ties?: number | null
  win_rate: number
}
