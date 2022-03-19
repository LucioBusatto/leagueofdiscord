import {Client} from "discord.js";
import Discord from "discord.js"
import {Command} from "../models/Command";

export const commandList : Command = {
    name: "commands",
    alias: ["comandos","commands","commandList","command","comando","commandos"],
    description: "Commands List",
    action: (client:Client, message:any) => {
        const embed = new Discord.MessageEmbed() .setTitle('COMANDOS - KEY: !')
        .addField('commands', 'list of available commands')
        .addField('me', "shows a summoner's profile, format should be (prefix)me serverCode (see in !serverList) summonerName (ex: !me la2 batin)")
        .addField('serverList', 'Show the list of server codes')
        return message.channel.send(embed);
    }
}