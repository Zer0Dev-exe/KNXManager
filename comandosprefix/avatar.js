const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "avatar",
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
      const usuario = message.mentions.members.first() || message.member;

      const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${usuario.user.tag}`)
      .setImage(usuario.user.displayAvatarURL({ dynamic: true, size: 512 }))

      message.channel.send({ embeds: [embed]})
    }
 };