/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { League } from "./League"
import type { StatsByTimeEntry } from "./StatsByTimeEntry"
import type { StatsByTimeMatchLength } from "./StatsByTimeMatchLength"
export type StatsByTime = {
  cached_at: string
  updated_at: string
  period: string
  count: number
  league?: League | null
  races: Array<StatsByTimeEntry>
  match_length: StatsByTimeMatchLength
}
