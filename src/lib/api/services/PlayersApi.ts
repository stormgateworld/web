/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerMatchesResponse } from '../models/PlayerMatchesResponse';
import type { PlayerResponse } from '../models/PlayerResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlayersApi {
    /**
     * @returns PlayerResponse Player found successfully
     * @throws ApiError
     */
    public static call({
        playerId,
    }: {
        /**
         * Player database id
         */
        playerId: number,
    }): CancelablePromise<PlayerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/players/{player_id}',
            path: {
                'player_id': playerId,
            },
            errors: {
                404: `Player was not found`,
            },
        });
    }
    /**
     * @returns PlayerMatchesResponse Player found successfully
     * @throws ApiError
     */
    public static call1({
        playerId,
    }: {
        /**
         * Player database id
         */
        playerId: number,
    }): CancelablePromise<PlayerMatchesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/players/{player_id}/matches',
            path: {
                'player_id': playerId,
            },
            errors: {
                404: `Player was not found`,
            },
        });
    }
}
