/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Leaderboard } from "./Leaderboard"
import type { Race } from "./Race"
export type LeaderboardEntryResponse = {
  leaderboard_entry_id: string
  leaderboard: Leaderboard
  player_id?: string | null
  anonymous: boolean
  nickname?: string | null
  nickname_discriminator?: string | null
  rank?: number | null
  race: Race
  league?: string | null
  tier?: number | null
  mmr: number
  max_confirmed_mmr?: number | null
  points?: number | null
  wins: number
  losses: number
  ties?: number | null
  matches: number
  win_rate: number
}
