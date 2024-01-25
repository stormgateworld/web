/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchResult } from './MatchResult';
import type { Race } from './Race';
export type PlayerMatchResponse = {
    player_id?: string | null;
    nickname?: string | null;
    nickname_discriminator?: string | null;
    steam_id?: string | null;
    race: Race;
    team: number;
    party: number;
    rating: number;
    rating_updated?: number | null;
    rating_diff?: number | null;
    result?: MatchResult | null;
    ping?: number | null;
    scores?: any;
};

