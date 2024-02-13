/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchResponse } from "../models/MatchResponse"
import type { PlayerActivityStats } from "../models/PlayerActivityStats"
import type { PlayerMatchesResponse } from "../models/PlayerMatchesResponse"
import type { PlayerMatchupsStats } from "../models/PlayerMatchupsStats"
import type { PlayerOpponentsStats } from "../models/PlayerOpponentsStats"
import type { PlayerPreferences } from "../models/PlayerPreferences"
import type { PlayerResponse } from "../models/PlayerResponse"
import type { Race } from "../models/Race"
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
        500: `Server error`,
      },
    })
  }
  /**
   * @returns PlayerMatchesResponse Player found successfully
   * @throws ApiError
   */
  public static getPlayerMatches({
    playerId,
    race,
    page,
    count,
  }: {
    /**
     * Player ID
     */
    playerId: string
    race?: Race | null
    page?: number | null
    count?: number | null
  }): CancelablePromise<PlayerMatchesResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}/matches",
      path: {
        player_id: playerId,
      },
      query: {
        race: race,
        page: page,
        count: count,
      },
      errors: {
        404: `Player was not found`,
        500: `Server error`,
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
        500: `Server error`,
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
        500: `Server error`,
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
        500: `Server error`,
      },
    })
  }
  /**
   * @returns PlayerActivityStats Player found successfully
   * @throws ApiError
   */
  public static getPlayerStatisticsActivity({
    playerId,
  }: {
    /**
     * Player ID
     */
    playerId: string
  }): CancelablePromise<PlayerActivityStats> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}/statistics/activity",
      path: {
        player_id: playerId,
      },
      errors: {
        404: `Player was not found`,
        500: `Server error`,
      },
    })
  }
  /**
   * @returns PlayerMatchupsStats Player found successfully
   * @throws ApiError
   */
  public static getPlayerStatisticsMatchups({
    playerId,
  }: {
    /**
     * Player ID
     */
    playerId: string
  }): CancelablePromise<PlayerMatchupsStats> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}/statistics/matchups",
      path: {
        player_id: playerId,
      },
      errors: {
        404: `Player was not found`,
        500: `Server error`,
      },
    })
  }
  /**
   * @returns PlayerOpponentsStats Player found successfully
   * @throws ApiError
   */
  public static getPlayerStatisticsOpponents({
    playerId,
    count,
  }: {
    /**
     * Player ID
     */
    playerId: string
    count?: number | null
  }): CancelablePromise<PlayerOpponentsStats> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v0/players/{player_id}/statistics/opponents",
      path: {
        player_id: playerId,
      },
      query: {
        count: count,
      },
      errors: {
        404: `Player was not found`,
        500: `Server error`,
      },
    })
  }
}
