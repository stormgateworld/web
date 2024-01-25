/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchResponse } from './MatchResponse';
import type { Race } from './Race';
export type LeaderboardEntryResponse = {
    player_id?: string | null;
    nickname?: string | null;
    nickname_discriminator?: string | null;
    steam_id?: string | null;
    rank?: number | null;
    mmr: number;
    race: Race;
    wins: number;
    losses?: number | null;
    matches?: number | null;
    win_rate?: number | null;
    last_match?: MatchResponse | null;
};

