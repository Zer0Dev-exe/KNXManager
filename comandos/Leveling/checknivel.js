const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js')
const userSchema = require('../../Schemas/nivelUsuarioSchema')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('checknivel')
  .setDescription('Mira tu nivel')
  .addUserOption(option => 
    option
    .setName('usuario')
    .setDescription('Usuario que quieras ver el nivel')
  ),

  async execute(interaction, client) {

    const usuario = await interaction.options.getUser('usuario')

    if(usuario) {
      const user = await userSchema.findOne({ guildID: interaction.guild.id, usuarioId: usuario.id })
      if(!user) {
        interaction.reply({ content: 'Este usuario no tiene aún niveles', ephemeral: true })
      } else if(user) {
        const embed = new EmbedBuilder()
        .setTitle('Tu nivel es:')
        .addFields(
          { name: 'XP', value: `${user.usuarioXp}` },
          { name: 'XP Total', value: `${user.usuarioXpTotal}` },
          { name: 'Nivel', value: `${user.usuarioNivel}`}
        )
        .setColor('Random')
        .setTimestamp()

        interaction.reply({ embeds: [embed]})
      }
    } else if(!usuario) {
      const user = await userSchema.findOne({ guildID: interaction.guild.id, usuarioId: interaction.user.id })
      if(!user) {
        interaction.reply({ content: 'Este usuario no tiene aún niveles', ephemeral: true })
      } else if(user) {
        const embed = new EmbedBuilder()
        .setTitle('Tu nivel es:')
        .addFields(
          { name: 'XP', value: `${user.usuarioXp}/${user.usuarioXpCheck}` },
          { name: 'XP Total', value: `${user.usuarioXpTotal}` },
          { name: 'Nivel', value: `${user.usuarioNivel}`}
        )
        .setColor('Random')
        .setTimestamp()

        interaction.reply({ embeds: [embed]})
      }
    }
  }
}