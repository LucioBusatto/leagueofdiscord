import {config} from "dotenv";
const axios = require("axios");
import {tierValue, rankValue} from "../tierAndRankValues";
import {Division, Ranking} from "../types";
import {AxiosError, AxiosResponse} from "axios";

config();
const apiKey = process.env.LEAGUE_API_KEY;

export class Summoner {
    region: string;
    id?: number | undefined;
    name: string;
    level?: number;
    iconID?: number;
    ranking?: Ranking;
    champions: any;

    constructor(name: string,region:string) {
        this.name = name;
        this.region = region;
        if (!this.name || !this.region) {
            throw new Error("Cant instantiate a summoner without ID or region");
        }
    }

    async init() {
        await this.fetchSummoner();
        if (this.id != undefined){
            await this.fetchSummonerLeague();
            await this.fetchSummonerChampions();
        }

        return this;
    }

    calculateSummonerElo(lp: number, tier: string, rank: string) {
        const elo = lp + tierValue(Division[tier as keyof typeof Division]) + rankValue(rank);
        return elo

    }

    private async fetchSummoner() {
        const url = `https://${this.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.name}?api_key=${apiKey}`;
        await axios
            .get(url)
            .then((response: AxiosResponse) => {
                this.id = response.data.id;
                this.level = response.data.summonerLevel;
                this.iconID = response.data.profileIconId;
            })
            .catch((error: any) => {
                console.log(error.message)
            })
    }

    private async fetchSummonerLeague() {
        const url = `https://${this.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.id}?api_key=${apiKey}`;
        try {
            const {data} = await axios.get(url);

            const soloQData = (data || []).find(
                (queue: any) => queue.queueType === "RANKED_SOLO_5x5"
            );

            if (!soloQData) {
                return;
            }

            const {tier, leaguePoints, rank, wins, losses, hotStreak} = soloQData;
            this.ranking = {
                tier,
                lp: leaguePoints,
                elo: this.calculateSummonerElo(leaguePoints, tier, rank),
                rank,
                wins,
                losses,
                streak: hotStreak,
            };
        } catch (err: any) {
            throw new Error("Something went wrong: " + err.message);
        }
    }

    private async fetchSummonerChampions() {
        const url = `https://${this.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.id}?api_key=${apiKey}`;
        try {
            const {data} = await axios.get(url);
            this.champions = data.slice(0, 3);
        } catch (err: any) {
            throw new Error("Something went wrong: " + err.message);
        }
    }
}
