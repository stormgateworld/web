/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeaderboardEntryResponse } from './LeaderboardEntryResponse';
export type PlayerResponse = {
    id: string;
    nickname: string;
    nickname_discriminator: string;
    steam_id: string;
    leaderboard_entries: Array<LeaderboardEntryResponse>;
};

