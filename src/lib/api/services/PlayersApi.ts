/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchResponse } from "../models/MatchResponse"
import type { PlayerMatchesResponse } from "../models/PlayerMatchesResponse"
import type { PlayerPreferences } from "../models/PlayerPreferences"
import type { PlayerResponse } from "../models/PlayerResponse"
import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"
export class PlayersApi {
  /**
   * @returns PlayerResponse Player found successfully
   * @throws ApiError
   */
  public static getPlayer({
    playerId,
  }: {
    /**
     * Player ID
     */
    playerId: string
  }): CancelablePromise<PlayerResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}",
      path: {
        player_id: playerId,
      },
      errors: {
        404: `Player was not found`,
      },
    })
  }
  /**
   * @returns PlayerMatchesResponse Player found successfully
   * @throws ApiError
   */
  public static getPlayerMatches({
    playerId,
  }: {
    /**
     * Player ID
     */
    playerId: string
  }): CancelablePromise<PlayerMatchesResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}/matches",
      path: {
        player_id: playerId,
      },
      errors: {
        404: `Player was not found`,
      },
    })
  }
  /**
   * @returns MatchResponse Player found successfully
   * @throws ApiError
   */
  public static getPlayerLastMatch({
    playerId,
  }: {
    /**
     * Player ID
     */
    playerId: string
  }): CancelablePromise<MatchResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}/matches/last",
      path: {
        player_id: playerId,
      },
      errors: {
        404: `Player was not found`,
      },
    })
  }
  /**
   * @returns PlayerPreferences Player found successfully
   * @throws ApiError
   */
  public static getPlayerPreferences({
    playerId,
  }: {
    /**
     * Player ID
     */
    playerId: string
  }): CancelablePromise<PlayerPreferences> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}/preferences",
      path: {
        player_id: playerId,
      },
      errors: {
        404: `Player was not found`,
      },
    })
  }
  /**
   * @returns PlayerPreferences Player preferences updated successfully
   * @throws ApiError
   */
  public static updatePlayerPreferences({
    playerId,
    requestBody,
  }: {
    /**
     * Player ID
     */
    playerId: string
    requestBody: PlayerPreferences
  }): CancelablePromise<PlayerPreferences> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/v0/players/{player_id}/preferences",
      path: {
        player_id: playerId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `Player was not found`,
      },
    })
  }
  /**
   * @returns MatchResponse Player found successfully
   * @throws ApiError
   */
  public static getPlayerStatisticsActivity({
    playerId,
  }: {
    /**
     * Player ID
     */
    playerId: string
  }): CancelablePromise<MatchResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}/statistics/activity",
      path: {
        player_id: playerId,
      },
      errors: {
        404: `Player was not found`,
      },
    })
  }
}
