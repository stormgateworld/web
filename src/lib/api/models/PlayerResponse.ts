/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeaderboardEntryResponse } from "./LeaderboardEntryResponse"
export type PlayerResponse = {
  id: string
  anonymous: boolean
  nickname?: string | null
  nickname_discriminator?: string | null
  avatar_url?: string | null
  leaderboard_entries: Array<LeaderboardEntryResponse>
  last_match_ended_at?: string | null
}
