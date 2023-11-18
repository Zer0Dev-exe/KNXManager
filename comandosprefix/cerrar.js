const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "cerrar",
    aliases: ["c"],
    cooldown: 5000,
    run: async (client, message, args) => {
      const canal = message.mentions.channels.first() || message.channel;

      if(canal.parentId == "1144028273861480478") {

        const embed = new EmbedBuilder()
        .setTitle(`Canal ${canal}`)

        message.channel.send({ embeds: [embed]})
      } else {
        message.reply('No es ticket')
      }
    }
 };