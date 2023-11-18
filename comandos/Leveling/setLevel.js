const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js')
const userSchema = require('../../Schemas/nivelUsuarioSchema')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('setlevel')
  .setDescription('Cambia el nivel de un usuario')
  .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
  .addIntegerOption(option =>
    option
    .setName('nivel')
    .setDescription('El nivel que deseas establecer')
    .setMinValue(1)
    .setMaxValue(300)
    .setRequired(true)
  )
  .addUserOption(option =>
    option
    .setName('usuario')
    .setDescription('El usuario al que quieras establecer el nivel')
    .setRequired(true)
  ),

  async execute(interaction, client) {

    const nivel = interaction.options.getInteger('nivel')
    const user = interaction.options.getUser('usuario')

    const cuser = await userSchema.findOne({ guildID: interaction.guild.id, usuarioId: user.id })

    cuser.usuarioNivel = nivel
    cuser.usuarioXpCheck = 
    cuser.save()

    interaction.reply({ content: `Se ha establecido el nivel de ${user} en ${nivel}`})
  }
}