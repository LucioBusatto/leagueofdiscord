import {Client} from "discord.js";
import Discord from "discord.js"
import {Command} from "../models/Command";

export const commandList : Command = {
    name: "commands",
    alias: ["comandos","commands","list","command","comando","commandos"],
    description: "Commands List",
    action: (client:Client, message:any) => {
        const embed = new Discord.MessageEmbed() .setTitle('COMANDOS - KEY: !')
        .addField('comandos', 'listado de comandos')
        .addField('me', 'muestra el perfil de un invocador, el formato es (prefijo)me serverCode nombre de invocador (ex: !me la2 batin)')
        .addField('serverList', 'Muestra la lista de codigos de servidores')
        return message.channel.send(embed);
    }
}