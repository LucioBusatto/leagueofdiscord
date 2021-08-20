const axios = require("axios");
const apiKey = process.env.LEAGUE_API_KEY;

class Summoner {
  region;
  id;
  name;
  level;
  iconID;

  ranking;

  constructor(messageInput) {
    this.parseSummonerFromMessage(messageInput);

    if (!this.name || !this.region) {
      throw new Error("Cant instantiate a summoner without ID or region");
    }
  }

  async init() {
    await this.fetchSummoner();
    await this.fetchSummonerLeague();

    return this;
  }

  parseSummonerFromMessage(message) {
    const explodedMessage = message.split(" ");
    const region = explodedMessage[1];
    const summonerName = explodedMessage.slice(2).join(" ");

    this.name = summonerName;
    this.region = region;
  }

  async fetchSummoner() {
    try {
      const { data } = await axios.get(
        `https://${this.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.name}?api_key=${apiKey}`
      );

      this.id = data.id;
      this.level = data.summonerLevel;
      this.iconID = data.profileIconId;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  }

  async fetchSummonerLeague() {
    try {
      const { data } = await axios.get(
        `https://${this.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.id}?api_key=${apiKey}`
      );

      const soloQData = (data || []).find(
        (queue) => queue.queueType === "RANKED_SOLO_5x5"
      );

      if (!soloQData) {
        return;
      }

      const { tier, leaguePoints, rank, wins, losses, hotStreak } = soloQData;
      this.ranking = {
        tier,
        lp: leaguePoints,
        rank,
        wins,
        losses,
        streak: hotStreak,
      };
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  }
}

module.exports = Summoner;
