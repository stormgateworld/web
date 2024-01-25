/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeaderboardResponse } from '../models/LeaderboardResponse';
import type { QueryParamsRace } from '../models/QueryParamsRace';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeaderboardsService {
    /**
     * @param race
     * @param page
     * @param count
     * @param query
     * @returns LeaderboardResponse Leaderboard
     * @throws ApiError
     */
    public static getLeaderboard(
        race?: QueryParamsRace | null,
        page?: number | null,
        count?: number | null,
        query?: string | null,
    ): CancelablePromise<LeaderboardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/leaderboards/ranked_1v1',
            query: {
                'race': race,
                'page': page,
                'count': count,
                'query': query,
            },
        });
    }
}
