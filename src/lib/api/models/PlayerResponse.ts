/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerResponseLeaderboardEntry } from './PlayerResponseLeaderboardEntry';
export type PlayerResponse = {
    id: number;
    leaderboard_entries: Array<PlayerResponseLeaderboardEntry>;
    nickname: string;
    nickname_discriminator: string;
    steam_id: string;
};

