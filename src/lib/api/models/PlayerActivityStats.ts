/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerActivityStatsRace } from "./PlayerActivityStatsRace"
import type { PlayerStatsEntry } from "./PlayerStatsEntry"
export type PlayerActivityStats = {
  updated_at: string
  aggregated?: PlayerStatsEntry | null
  history: Array<PlayerStatsEntry>
  races: Array<PlayerActivityStatsRace>
}
