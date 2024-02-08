/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import type { PlayerStatsMatchupAggregated } from "./PlayerStatsMatchupAggregated"
import type { PlayerStatsMatchupByLength } from "./PlayerStatsMatchupByLength"
import type { Race } from "./Race"

/* eslint-disable */
export type PlayerStatsMatchupEntry = {
  race: Race
  opponent_race: Race
  aggregated: PlayerStatsMatchupAggregated
  match_length: Array<PlayerStatsMatchupByLength>
}
