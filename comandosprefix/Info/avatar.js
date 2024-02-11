const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "avatar",
    run: async (message, client, args) => {
      const usuario = message.mentions.members.first() || message.member;

      const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${usuario.user.tag}`)
      .setImage(usuario.user.displayAvatarURL({ dynamic: true, size: 512 }))

      message.channel.send({ embeds: [embed]})
    }
 };