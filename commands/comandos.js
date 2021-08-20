const Discord = require ("discord.js");

module.exports = {
    name: "comandos",
    alias: ["comandos","commands","list","command","comando","commandos"],
    description: "Commands List",
    action: (client, message, args) => {
        const embed = new Discord.MessageEmbed() .setTitle('COMANDOS - KEY: &')
        .addField('comandos', 'listado de comandos')
        .addField('me / yo', 'Crea el perfil o muestra uno si ya existe')
        .addField('play / jugar', 'Agrega el usuario a la Queue')
        .addField('ranks', 'Muestra el sistema de Ranks')
        .addField('elo', 'Muestra el elo del jugador')
        .addField('win victoria', 'El jugador ganador indica que ha ganado el encuentro')
        .addField('batin', 'twitter del creador')
        return message.channel.send(embed);
    }
}