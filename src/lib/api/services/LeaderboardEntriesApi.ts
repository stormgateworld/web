/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeaderboardEntryHistory } from "../models/LeaderboardEntryHistory"
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
  }: {
    /**
     * Player Leaderboard Entry ID
     */
    leaderboardEntryId: string
  }): CancelablePromise<LeaderboardEntryHistory> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/leaderboard-enties/{leaderboard_entry_id}/history",
      path: {
        leaderboard_entry_id: leaderboardEntryId,
      },
      errors: {
        404: `Player leaderboard entry was not found`,
      },
    })
  }
}
