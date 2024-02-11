const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["p"],
    args: false,
    run: async(message, client, args) => {
      message.reply(`Pong ${client.ws.ping} ms! 🏓`)
    }
 };