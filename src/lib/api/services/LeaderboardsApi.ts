/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerResponse } from '../models/PlayerResponse';
import type { QueryParamsRace } from '../models/QueryParamsRace';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeaderboardsApi {
    /**
     * @returns PlayerResponse Player found successfully
     * @throws ApiError
     */
    public static call({
        race,
        page,
        count,
    }: {
        race: QueryParamsRace | null,
        page: number | null,
        count: number | null,
    }): CancelablePromise<PlayerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/leaderboards/ranked_1v1',
            path: {
                'race': race,
                'page': page,
                'count': count,
            },
            errors: {
                404: `Player was not found`,
            },
        });
    }
}
