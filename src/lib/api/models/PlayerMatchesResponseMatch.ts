/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayerMatchesResponseMatchPlayer } from './PlayerMatchesResponseMatchPlayer';
export type PlayerMatchesResponseMatch = {
    created_at: string;
    ended_at?: string | null;
    id: number;
    leaderboard: string;
    players: Array<PlayerMatchesResponseMatchPlayer>;
    server: string;
};

