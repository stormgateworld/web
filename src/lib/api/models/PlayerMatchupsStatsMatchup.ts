/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerMatchupsStatsEntry } from "./PlayerMatchupsStatsEntry"
import type { Race } from "./Race"
export type PlayerMatchupsStatsMatchup = {
  race: Race
  opponent_race: Race
  aggregated: PlayerMatchupsStatsEntry
  match_length: Array<PlayerMatchupsStatsEntry>
}
