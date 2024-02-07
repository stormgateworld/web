/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatsByTimeEntry } from "./StatsByTimeEntry"
import type { StatsByTimeMatchLength } from "./StatsByTimeMatchLength"
export type StatsByTime = {
  updated_at: string
  period: string
  count: number
  league?: string | null
  races: Array<StatsByTimeEntry>
  match_length: StatsByTimeMatchLength
}
