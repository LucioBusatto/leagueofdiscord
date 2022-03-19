export enum Division {
    IRON = "IRON",
    BRONZE = "BRONZE",
    SILVER = "SILVER",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM",
    DIAMOND = "DIAMOND",
    MASTER = "MASTER",
    GRANDMASTER = "GRANDMASTER",
    CHALLENGER = "CHALLENGER"
}

export type Ranking = {
    tier: string;
    lp: number,
    elo: number,
    rank: string,
    wins: number,
    losses: number,
    streak: boolean,
}