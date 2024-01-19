
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

export async function getPlayerMatches(playerId: number) {
    return fetch(`https://api.stormgateworld.com/v0/players/${playerId}/matches`).then((res) => res.json() as Promise<Matches>)
}

export async function getPlayer(playerId: number) {
    const matches = await getPlayerMatches(playerId)
    const leaderboard = await getLeaderboard("ranked_1v1")
    const leaderboardEntries = leaderboard.entries.filter((entry) => entry.id === playerId)
    const player = leaderboardEntries[0]
    return {
        ...player,
        matches: matches.matches,
        leaderboardEntries
    }
}

interface Leaderboard {
    count: number
    page: number
    entries: LeaderboardEntry[]
}

interface LeaderboardEntry {
    id: number
    nickname: string
    nickname_discriminator: string
    steam_id: string
    race: string
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
    id: number;
    leaderboard: string;
    server: string;
    players: Player[];
    created_at: string;
    ended_at: string;
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