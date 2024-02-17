/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Aggregation } from "./Aggregation"
import type { LeaderboardEntryHistoryRow } from "./LeaderboardEntryHistoryRow"
import type { Resolution } from "./Resolution"
export type LeaderboardEntryHistory = {
  cached_at: string
  resolution: Resolution
  aggregation: Aggregation
  history: Array<LeaderboardEntryHistoryRow>
}
