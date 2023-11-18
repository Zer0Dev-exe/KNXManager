const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const ServidorSchema = require('../../Schemas/nivelServidorSchema.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('setup-nivel')
  .setDescription('Setup de nivel'),

  async execute(interaction, client) {

    const data = await ServidorSchema.findOne({ guildID: interaction.guild.id })
    if(!data) {
      await ServidorSchema.create({
        guildID: interaction.guild.id,
        canalId: interaction.channel.id,
      })
      console.log('Hecho')
      interaction.reply({ content: 'Nuevo', ephemeral: true })
    }

    if(data) {
      await ServidorSchema.findOneAndUpdate({
        guildID: interaction.guild.id,
        canalId: interaction.channel.id,
      })
      console.log('Recargado')
      interaction.reply({ content: 'Recargado', ephemeral: true })
    }
  }
}