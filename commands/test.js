const Discord = require("discord.js");
const axios = require("axios");
const Summoner = require("../models/Summoner");

module.exports = {
    name: "test",
    alias: ["test", "t", "me"],
    description: "Test command",
    action: async (client, message, args) => {
        const summoner = await new Summoner(message.content).init();
        const messageEmbed = await createSummonerProfileEmbedMessage(summoner);
        return message.channel.send(messageEmbed);
    },
};

async function createSummonerProfileEmbedMessage(summoner) {
    const {name, level, iconID, ranking,champions} = summoner;
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    const embed = new Discord.MessageEmbed()
        .setTitle("League's API by Batin")
        .addField("Summoner Name:", capitalizedName)
        .setThumbnail(
            `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${iconID}.png`
        );

    if (!ranking) {
        embed
            .addField("Rank", "Unranked")
    } else {
        const {tier, rank, lp, wins, losses, streak} = ranking;
        embed
            .addField("Summoner Level", level)
            .addField("Rank", `${tier} ${rank} - ${lp}LP`)
            .addField("History", `W: ${wins} L: ${losses}`)
            .addField("Win Rate", `Wr: ${(wins / (wins + losses) * 100).toFixed(1)}%`)
            .addField(`${capitalizedName}'s Most Played Champions`,"------------------")
            .addFields(
                {name: await getChampName(champions[0].championId), value: `Mastery Points ${champions[0].championPoints}`, inline: true},
                {name: await getChampName(champions[1].championId), value: `Mastery Points ${champions[1].championPoints}`, inline: true},
                {name: await getChampName(champions[2].championId), value: `Mastery Points ${champions[2].championPoints}`, inline: true},
            )
            .setColor(getColorFromDivision(tier))
            .setImage(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${await getChampName(champions[0].championId)}_0.jpg`)
            if (streak){
                embed
                    .setFooter("THIS PLAYER IS ON A STREAK 🔥🔥🔥",  "")
            }
    }
    return embed;
}
async function getChampName(id) {
    const version = "11.16.1"
    const {data} = await axios.get(
        `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );

    for (let i in data.data) {
        if (data.data[i].key == id) {
            return(data.data[i].id)
        }
    }
}
function getColorFromDivision(division){
    switch (true) {
        case division == "CHALLENGER":
            color = '0x3e71de';
            break;
        case division == "GRANDMASTER":
            color = '0xe61515';
            break;
        case division == "MASTER":
            color = '0xb50cc4';
            break;
        case division == "DIAMOND":
            color = '0x50edf2';
            break;
        case division == "PLATINUM":
            color = '0x07ba6a';
            break;
        case division == "GOLD":
            color = '0xe6c615';
            break;
        case division == "SILVER":
            color = '0xbec2cb';
            break;
        case division == "BRONZE":
            color = '0xa37753';
            break;
        case division == "IRON":
            color = '0xa19d94';
            break;
    }
    return color;
}


