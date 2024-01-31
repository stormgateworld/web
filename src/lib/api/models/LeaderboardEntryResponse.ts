/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchResponse } from './MatchResponse';
import type { Race } from './Race';
export type LeaderboardEntryResponse = {
    player_id?: string | null;
    anynymous: boolean;
    nickname?: string | null;
    nickname_discriminator?: string | null;
    steam_id?: string | null;
    rank?: number | null;
    race: Race;
    league: string;
    tier: number;
    mmr: number;
    points: number;
    wins: number;
    losses: number;
    ties: number;
    matches: number;
    win_rate: number;
    last_match?: MatchResponse | null;
};

