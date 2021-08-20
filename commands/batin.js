const Discord = require ("discord.js");

module.exports = {
    name: "batin",
    alias: ["batin","b","beitin","difenileter","lucio"],
    description: "Twitter",
    action: (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setAuthor('Batin','https://pbs.twimg.com/profile_images/1277345432042119168/E_QQ7ZVt_400x400.jpg')
        .addField('🐸 Twitter','https://www.twitter.com/BatinKilla'); 
        return message.channel.send(embed);
    }
}