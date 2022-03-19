import {Client} from "discord.js";
import {Division} from "../types";
import {Summoner} from "../models/Summoner";
import Discord from "discord.js"
import {Command} from "../models/Command";


const axios = require("axios");

export const me : Command = {
    name: "me",
    alias: ["summoner", "show", "profile"],
    description: "Show a summoner's profile",
    action:
        async (client: Client, message: any) => {
        const {name, region} = parseSummonerFromMessage(message.content);
        const summoner = new Summoner(name, region);
        await summoner.init();
        if(summoner.id){
            const messageEmbed = await createSummonerProfileEmbedMessage(summoner);
            return message.channel.send(messageEmbed);

        }else{
            message.channel.send("Can't find this summoner name");
        }


    },
};

async function createSummonerProfileEmbedMessage(summoner: Summoner) {
    const {name, level, iconID, ranking, champions} = summoner;
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
        const {tier, rank, lp, wins, losses, streak, elo} = ranking;
        embed
            .addField("Summoner Level", level)
            .addField("Rank", `${tier} ${rank} - ${lp}LP`)
            .addField("History", `W: ${wins} L: ${losses}`)
            .addField("Elo", `${elo}`)
            .addField("Win Rate", `Wr: ${(wins / (wins + losses) * 100).toFixed(1)}%`)
            .addField(`${capitalizedName}'s Most Played Champions`, "------------------")
            .addFields(
                {
                    name: await getChampName(champions[0].championId),
                    value: `Mastery Points ${champions[0].championPoints}`,
                    inline: true
                },
                {
                    name: await getChampName(champions[1].championId),
                    value: `Mastery Points ${champions[1].championPoints}`,
                    inline: true
                },
                {
                    name: await getChampName(champions[2].championId),
                    value: `Mastery Points ${champions[2].championPoints}`,
                    inline: true
                },
            )
            .setColor(getColorFromDivision(Division[tier as keyof typeof Division]))
            .setImage(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${await getChampName(champions[0].championId)}_0.jpg`)
        if (streak) {
            embed
                .setFooter("THIS PLAYER IS ON A STREAK 🔥🔥🔥", "")
        }
    }
    return embed;
}

async function getChampName(id: any) {
    const version = "11.16.1"
    const {data} = await axios.get(
        `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );

    for (let i in data.data) {
        if (data.data[i].key == id) {
            return (data.data[i].id)
        }
    }
}


const getColorFromDivision = (division:Division): string => {
    return {
        [Division.IRON]: '0xa19d94',
        [Division.BRONZE]: '0xa37753',
        [Division.SILVER]: '0xbec2cb',
        [Division.GOLD]: '0xe6c615',
        [Division.PLATINUM]: '0x07ba6a',
        [Division.DIAMOND]: '0x50edf2',
        [Division.MASTER]: '0xb50cc4',
        [Division.GRANDMASTER]: '0xe61515',
        [Division.CHALLENGER]: '0x3e71de',
    }[division] || "#FFF";
}

const parseSummonerFromMessage = (message: any) => {
    const explodedMessage = message.split(" ");
    const region = explodedMessage[1];
    const name = explodedMessage.slice(2).join(" ");
    return {name, region}
}


