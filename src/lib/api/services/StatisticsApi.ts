/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityStatistics } from "../models/ActivityStatistics"
import type { StatsByTime } from "../models/StatsByTime"
import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"
export class StatisticsApi {
  /**
   * @returns ActivityStatistics Stats
   * @throws ApiError
   */
  public static getStatisticsActivity(): CancelablePromise<ActivityStatistics> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/statistics/activity",
      errors: {
        500: `Server error`,
      },
    })
  }
  /**
   * @returns StatsByTime Stats
   * @throws ApiError
   */
  public static getStatistics({
    league,
    count,
  }: {
    league?: string | null
    count?: number | null
  }): CancelablePromise<StatsByTime> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/statistics/ranked_1v1",
      query: {
        league: league,
        count: count,
      },
      errors: {
        500: `Server error`,
      },
    })
  }
}
