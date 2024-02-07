/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerActivityStatsRace } from "./PlayerActivityStatsRace"
import type { PlayerStatsEntry } from "./PlayerStatsEntry"
import type { PlayerStatsEntryAggregated } from "./PlayerStatsEntryAggregated"
export type PlayerActivityStats = {
  cached_at: string
  aggregated?: PlayerStatsEntryAggregated | null
  history: Array<PlayerStatsEntry>
  races: Array<PlayerActivityStatsRace>
}
