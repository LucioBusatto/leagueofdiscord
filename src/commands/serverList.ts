import {Client} from "discord.js";
import Discord from "discord.js"
import {Command} from "../models/Command";

export const serverList: Command = {
    name: "server",
    alias: ["servers", "list", "serverList"],
    description: "Available servers code list",
    action: async (client:Client, message:any) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("Server Code List")
            .addField("🇦🇷 Latin America South:", "la2")
            .addField("🇲🇽 Latin America North:", "la1")
            .addField("🇧🇷 Brazil:", "br1")
            .addField("🇺🇸 North America", "na1")
            .addField("🇰🇷 South Korea", "kr")
            .addField("🇪🇺 Europa East", "eun1")
            .addField("🇪🇺 Europa West", "euw1")
            .addField("🌏 Oceania","oc1")
            .addField("🇷🇺 Russia", "ru")
            .addField("🇯🇵 Japan", "jp1")
            .addField("🇹🇷 Turkey", "tr1")
        return message.channel.send(embed);

    }
};