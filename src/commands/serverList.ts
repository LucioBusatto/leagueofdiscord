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
            .addField("π¦π· Latin America South:", "la2")
            .addField("π²π½ Latin America North:", "la1")
            .addField("π§π· Brazil:", "br1")
            .addField("πΊπΈ North America", "na1")
            .addField("π°π· South Korea", "kr")
            .addField("πͺπΊ Europa East", "eun1")
            .addField("πͺπΊ Europa West", "euw1")
            .addField("π Oceania","oc1")
            .addField("π·πΊ Russia", "ru")
            .addField("π―π΅ Japan", "jp1")
            .addField("πΉπ· Turkey", "tr1")
        return message.channel.send(embed);

    }
};