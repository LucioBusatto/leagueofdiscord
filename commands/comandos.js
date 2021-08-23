const Discord = require ("discord.js");

module.exports = {
    name: "comandos",
    alias: ["comandos","commands","list","command","comando","commandos"],
    description: "Commands List",
    action: (client, message, args) => {
        const embed = new Discord.MessageEmbed() .setTitle('COMANDOS - KEY: !')
        .addField('comandos', 'listado de comandos')
        .addField('me', 'muestra el perfil de un invocador, el formato es (prefijo)me serverCode nombre de invocador (ex: !me la2 batin)')
        .addField('serverList', 'Muestra la lista de codigos de servidores')
        return message.channel.send(embed);
    }
}