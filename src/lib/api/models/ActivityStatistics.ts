/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityStatisticsActivity } from "./ActivityStatisticsActivity"
import type { ActivityStatisticsServerEntry } from "./ActivityStatisticsServerEntry"
export type ActivityStatistics = {
  cached_at: string
  since: string
  until: string
  activity: ActivityStatisticsActivity
  servers: Array<ActivityStatisticsServerEntry>
}
