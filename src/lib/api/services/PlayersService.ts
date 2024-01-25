/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerMatchesResponse } from '../models/PlayerMatchesResponse';
import type { PlayerResponse } from '../models/PlayerResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlayersService {
    /**
     * @param playerId Player database id
     * @returns PlayerResponse Player found successfully
     * @throws ApiError
     */
    public static getPlayer(
        playerId: string,
    ): CancelablePromise<PlayerResponse> {
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
     * @param playerId Player database id
     * @returns PlayerMatchesResponse Player found successfully
     * @throws ApiError
     */
    public static getPlayerMatches(
        playerId: string,
    ): CancelablePromise<PlayerMatchesResponse> {
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