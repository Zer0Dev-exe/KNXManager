const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["p"],
    cooldown: 50000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
      message.reply(`Pong ${client.ws.ping} ms! 🏓`)
    }
 };