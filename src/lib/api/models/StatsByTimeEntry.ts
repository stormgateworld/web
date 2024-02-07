/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Race } from "./Race"
import type { StatsByTimeHistoryPoint } from "./StatsByTimeHistoryPoint"
export type StatsByTimeEntry = {
  race: Race
  aggregated: StatsByTimeHistoryPoint
  history: Array<StatsByTimeHistoryPoint>
}
