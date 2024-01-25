/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerMatchResponse } from './PlayerMatchResponse';
export type MatchResponse = {
    match_id: string;
    leaderboard: string;
    server: string;
    players: Array<PlayerMatchResponse>;
    created_at: string;
    ended_at?: string | null;
    duration?: number | null;
};

