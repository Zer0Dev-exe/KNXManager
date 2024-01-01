require('dotenv').config()
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const BrawlStars = require("brawlstars.js")
const token = process.env.APITOKEN
const cliente = new BrawlStars.Client(token)
// JJJYLG09 Dydins
// 8GC9PQVQQ Kiri

module.exports = {
  data: new SlashCommandBuilder()
  .setName('brawl')
  .setDescription('Stats de Brawl'),

  async execute(interaction, client) {
    await interaction.deferReply({ content: 'Obteniendo las estadisticas de este usuario, actualizando mensaje...' })
    const player = await cliente.getPlayer("#2U8P8QUUY")
    const club = await cliente.getClub(player.club.tag)

    const embed = new EmbedBuilder()
    .setAuthor({ name: `${player.name} ${player.tag}`, iconURL: `https://cdn-old.brawlify.com/profile/${player.icon}.png`})
    .setColor(player.hexColor)
    .addFields(
      { name: 'Trofeos', value: `<:reseteo:1178100588114882652> ${player.trophies}`, inline: true },
      { name: 'Max Trofeos', value: `<:trofeosmasaltos:1178100593181601812> ${player.highestTrophies}`, inline: true },
      { name: 'Nivel', value: `<:nivel:1178100580888088586> ${player.expLevel}`, inline: true },
      { name: 'Club', value: `<:club:1178100590002307122> ${player.club.name}`, inline: true },
      { name: 'Rol', value: club.getMemberRole(player.tag) === 'vicePresident' ? '<:roles:1170835674061099078> Vice Presidente' : `${club.getMemberRole(player.tag)}`, inline: true },
      { name: 'Wins Supervivencia', value: `<:solo:1178100584994316368> ${player.soloVictories} <:trio:1178100583245287424> ${player.trioVictories}`, inline: true },
      { name: 'Max Demencial', value:  `<:robotica:1178100585917071361> Demencial ${player.bestRoboRumbleTime}`, inline: true },
      //{ name: 'Reset Temporada', value: },
      { name: 'Campeonato', value: `:x: ${player.isQualifiedFromChampionshipChallenge}`, inline: true }
    )
    .setThumbnail(`https://cdn-old.brawlify.com/profile/${player.icon}.png`)
    .setFooter({ text: `Ejecutado por ${interaction.member.displayName} || Stats de ${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})

    console.log(club.tag)
    await interaction.editReply({ embeds: [embed]})
  } 
}