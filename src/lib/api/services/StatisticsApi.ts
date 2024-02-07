/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatsByTime } from "../models/StatsByTime"
import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"
export class StatisticsApi {
  /**
   * @returns StatsByTime Stats
   * @throws ApiError
   */
  public static getStatistics({ league }: { league?: string | null }): CancelablePromise<StatsByTime> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/statistics/ranked_1v1",
      query: {
        league: league,
      },
    })
  }
}
