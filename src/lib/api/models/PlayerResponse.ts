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
  leaderboard_entries: Array<LeaderboardEntryResponse>
}
