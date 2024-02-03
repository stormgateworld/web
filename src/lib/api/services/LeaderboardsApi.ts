/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeaderboardDumpResponse } from '../models/LeaderboardDumpResponse';
import type { LeaderboardResponse } from '../models/LeaderboardResponse';
import type { Race } from '../models/Race';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeaderboardsApi {
    /**
     * @returns LeaderboardResponse Leaderboard
     * @throws ApiError
     */
    public static getLeaderboard({
        race,
        page,
        count,
        query,
    }: {
        race?: Race | null,
        page?: number | null,
        count?: number | null,
        query?: string | null,
    }): CancelablePromise<LeaderboardResponse> {
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
    /**
     * @returns LeaderboardDumpResponse Leaderboard
     * @throws ApiError
     */
    public static getLeaderboardDump(): CancelablePromise<LeaderboardDumpResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/leaderboards/ranked_1v1/dump',
        });
    }
}
