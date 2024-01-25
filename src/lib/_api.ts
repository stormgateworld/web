import type { PlayerResponse } from "./api"

export async function getLeaderboard(mode: string) {
    const result = await fetch(`https://api.stormgateworld.com/v0/leaderboards/${mode}`).then((res) => res.json() as Promise<Leaderboard>)
    return {
        ...result,
        entries: result.entries.map((entry, i) => ({
            ...entry,
            rank: i + 1
        }))
    }
}

export async function getPlayerMatches(playerId: string) {
    return fetch(`https://api.stormgateworld.com/v0/players/${playerId}/matches`).then((res) => res.json() as Promise<Matches>)
}


export async function getPlayer(playerId: string) {
    const player = await fetch(`https://api.stormgateworld.com/v0/players/${playerId}`).then((res) => res.json() as Promise<PlayerResponse>)
    const matches = await getPlayerMatches(playerId)
    return {
        ...player,
        matches: matches.matches,
        leaderboardEntries: player.leaderboard_entries
    }
}

interface Leaderboard {
    count: number
    page: number
    entries: LeaderboardEntry[]
}

interface LeaderboardEntry {
    player_id: number
    nickname: string
    nickname_discriminator: string
    steam_id: string
    race: 'infernals' | 'vanguard'
    mmr: number
    wins: number
    losses: number
    win_rate: number
}

interface Matches {
    count: number;
    page: number;
    matches: Match[];
}

interface Match {
    match_id: number;
    leaderboard: string;
    server: string;
    players: Player[];
    created_at: string;
    ended_at: string;
    scores: Map<string, number>;
    ping: number;
}

interface Player {
    player_id: number;
    nickname: string;
    nickname_discriminator: string;
    steam_id: string;
    race: string;
    team: number;
    party: number;
    rating: number;
    rating_updated: number;
    rating_diff: number;
    result: string;
}
