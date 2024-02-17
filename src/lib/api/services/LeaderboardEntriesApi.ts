/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Aggregation } from "../models/Aggregation"
import type { LeaderboardEntryHistory } from "../models/LeaderboardEntryHistory"
import type { Resolution } from "../models/Resolution"
import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"
export class LeaderboardEntriesApi {
  /**
   * @returns LeaderboardEntryHistory Player leaderboard entry found successfully
   * @throws ApiError
   */
  public static getLeaderboardEntryHistory({
    leaderboardEntryId,
    resolution,
    aggregation,
  }: {
    /**
     * Player Leaderboard Entry ID
     */
    leaderboardEntryId: string
    resolution?: Resolution | null
    aggregation?: Aggregation | null
  }): CancelablePromise<LeaderboardEntryHistory> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/leaderboard-entries/{leaderboard_entry_id}/history",
      path: {
        leaderboard_entry_id: leaderboardEntryId,
      },
      query: {
        resolution: resolution,
        aggregation: aggregation,
      },
      errors: {
        404: `Player leaderboard entry was not found`,
        500: `Server error`,
      },
    })
  }
}
