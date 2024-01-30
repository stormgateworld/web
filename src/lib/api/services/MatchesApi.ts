/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchesResponse } from '../models/MatchesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MatchesApi {
    /**
     * @returns MatchesResponse Matches found successfully
     * @throws ApiError
     */
    public static getMatches(): CancelablePromise<MatchesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v0/matches',
        });
    }
}
