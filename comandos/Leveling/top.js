const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const userSchema = require('../../Schemas/nivelUsuarioSchema');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('top')
  .setDescription('Mira el top de niveles'),
  
  async execute(interaction, client) {
    
    const users = await userSchema.find({ guildID: interaction.guild.id }).sort({ usuarioNivel: -1, usuarioXp: -1 }).limit(10);
    const embed = new EmbedBuilder()
    .setTitle('Top de Niveles')
    .setDescription('A continuación se muestra el top de niveles:')
    .setColor('Random')
    
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const member = interaction.guild.members.cache.get(user.usuarioId);
      embed.addFields({ name: `${i + 1}. ${member ? member.displayName : 'Usuario desconocido'}`, value: `Nivel: ${user.usuarioNivel} | XP: ${user.usuarioXp}/${user.usuarioXpCheck}` });
    }
    interaction.reply({ content: 'Aquí te adjunto el top:', embeds: [embed] });
    //cuser.usuarioXp = 0
  },
  
};