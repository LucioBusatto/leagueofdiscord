const Discord = require("discord.js");
const Summoner = require("../models/Summoner");

module.exports = {
  name: "test",
  alias: ["test", "t"],
  description: "Test command",
  action: async (client, message, args) => {
    const summoner = await new Summoner(message.content).init();
    const messageEmbed = createSummonerProfileEmbedMessage(summoner);

    return message.channel.send(messageEmbed);
  },
};

function createSummonerProfileEmbedMessage(summoner) {
  const { name, level, iconID, ranking } = summoner;

  const embed = new Discord.MessageEmbed()
    .setTitle("League's API by Batin")
    .addField("Summoner Name:", name)
    .setThumbnail(
      `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${iconID}.png`
    );

  if (!ranking) {
    embed
        .addField("Rank","Unranked")
  } else {
    const { tier, rank, lp, wins, losses, streak } = ranking;
    embed
      .addField("Summoner Level", level)
      .addField("Rank", `${tier} ${rank} - ${lp}LP`)
      .addField("History", `W: ${wins} L: ${losses}`)
      .addField("Win Rate", `Wr: ${(wins / (wins + losses)*100).toFixed(1)}%`)
      .addField("Streak", streak ? "🔥🔥🔥" : "❄❄❄");
  }

  return embed;
}
