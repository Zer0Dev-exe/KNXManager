const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, AttachmentBuilder } = require('discord.js')
const userSchema = require('../../Schemas/nivelUsuarioSchema')
const canvacord = require('canvacord')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('rank')
  .setDescription('Mira tu rank')
  .addUserOption(option => 
    option
    .setName('usuario')
    .setDescription('Usuario que quieras ver el nivel')
  ),

  async execute(interaction, client) {

    // Ejemplo Gradient .setProgressBar([`#FD1C14`, `#14FDC7`], `GRADIENT`)

    const usuario = await interaction.options.getUser('usuario')
  
    if(usuario) {
      const user = await userSchema.findOne({ guildID: interaction.guild.id, usuarioId: usuario.id })
      if(!user) {
        interaction.reply({ content: 'Este usuario no tiene aún niveles', ephemeral: true })
      } else if(user) {
        await interaction.deferReply()

        const todosNiveles = await userSchema.find({ guildID: interaction.guild.id }).select(
          '-_id usuarioId usuarioNivel usuarioXpTotal'
        )
        todosNiveles.sort((a, b) => {
          if(a.usuarioNivel === b.usuarioNivel) {
            return b.usuarioXp - a.usuarioXp;
          } else {
            return b.usuarioNivel - a.usuarioNivel
          }
        });
        let actualRank = todosNiveles.findIndex((lvl) => lvl.usuarioId === usuario.id) + 1;

        const rank = new canvacord.Rank()
        .setAvatar(usuario.displayAvatarURL({ size: 256 }) )
        .setRank(actualRank)
        .setLevel(user.usuarioNivel, 'NIVEL')
        .setLevelColor('#14FDC7', '#F9FCF8')
        .setCurrentXP(user.usuarioXp)
        .setRequiredXP(user.usuarioXpCheck)
        //.setBackground('IMAGE', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvUCBMyZAzYoFAU3ZjrsyqljP4hzEBYcu5vA&usqp=CAU')
        .setProgressBar('#4EEEF6', 'COLOR')
        .setUsername(usuario.displayName)
        .renderEmojis(true)

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data)
        await interaction.editReply({ files: [attachment] });
      }
    } else if(!usuario) {
      const user = await userSchema.findOne({ guildID: interaction.guild.id, usuarioId: interaction.user.id })
      if(!user) {
        interaction.reply({ content: 'Este usuario no tiene aún niveles', ephemeral: true })
      } else if(user) {
        await interaction.deferReply()
        
        const todosNiveles = await userSchema.find({ guildID: interaction.guild.id }).select(
          '-_id usuarioId usuarioNivel usuarioXpTotal'
        )
        todosNiveles.sort((a, b) => {
          if(a.usuarioNivel === b.usuarioNivel) {
            return b.usuarioXp - a.usuarioXp;
          } else {
            return b.usuarioNivel - a.usuarioNivel
          }
        });
        let actualRank = todosNiveles.findIndex((lvl) => lvl.usuarioId === interaction.user.id) + 1;

        const rank = new canvacord.Rank()
        .setAvatar(interaction.user.displayAvatarURL({ size: 256 }) )
        .setRank(actualRank)
        .setLevel(user.usuarioNivel, 'NIVEL')
        .setCurrentXP(user.usuarioXp)
        .setRequiredXP(user.usuarioXpCheck)
        //.setBackground('IMAGE', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvUCBMyZAzYoFAU3ZjrsyqljP4hzEBYcu5vA&usqp=CAU')
        .setProgressBar([`#FD1C14`, `#14FDC7`], `GRADIENT`)
        .setUsername(interaction.user.displayName)
        .renderEmojis(true)

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data)
        await interaction.editReply({ files: [attachment] });
      }
    }
  }
}