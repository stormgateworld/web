/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Leaderboard } from './Leaderboard';
import type { Race } from './Race';
export type LeaderboardEntryResponse = {
  leaderboard_entry_id: string;
  leaderboard: Leaderboard;
  player_id?: string | null;
  anynymous: boolean;
  nickname?: string | null;
  nickname_discriminator?: string | null;
  rank?: number | null;
  race: Race;
  league: string;
  tier: number;
  mmr: number;
  max_confirmed_mmr: number;
  points: number;
  wins: number;
  losses: number;
  ties: number;
  matches: number;
  win_rate: number;
};

