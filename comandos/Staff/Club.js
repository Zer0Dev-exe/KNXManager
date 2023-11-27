require('dotenv').config()
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const BrawlStars = require("brawlstars.js")
const token = process.env.APITOKEN
const cliente = new BrawlStars.Client(token)
// JJJYLG09 Dydins
// 8GC9PQVQQ Kiri

module.exports = {
  data: new SlashCommandBuilder()
  .setName('club')
  .setDescription('Club Brawl'),

  async execute(interaction, client) {
    const club = await cliente.getClub('#CV8QU2VC')
    console.log(club)
    let presidente = club.members.find(member => member.role === 'president');
    if(presidente) {
      const nombrepresidente = presidente.name
      const copaspresidente = presidente.trophies

      const embed = new EmbedBuilder()
      .setDescription(` \`\`\`${club.description}\`\`\` `)
      .setThumbnail(`https://cdn-old.brawlify.com/club/${club.badgeId}.png`)
      .setColor('Random')
      .addFields(
        { name: 'Trofeos Totales', value: `<:trophy:1178100595530420355> \`${club.trophies}\``, inline: true },
        { name: 'Trofeos Requeridos', value: `<:reseteo:1178100588114882652> \`${club.requiredTrophies}\``, inline: true},
        { name: 'Media Trofeos', value: `<:trophy:1178100595530420355> \`${Math.floor(club.trophies/club.memberCount)}\``, inline: true},
        { name: 'Miembros', value: `<:BrawlStars:1001445217993498634> \`${club.memberCount}/30\``, inline: true },
        { name: 'Estado', value: `<:1110136571400831037:1165754219203149915> \`${club.type}\``, inline: true },
        { name: 'Presidente', value: `<a:BoosterC:1079712554785452032> \`${copaspresidente}\` **|** \`${nombrepresidente}\``, inline: true }
      )
      .setAuthor({ name: `${club.name} ${club.tag}`, iconURL: `https://cdn-old.brawlify.com/club/${club.badgeId}.png`})
      interaction.reply({ embeds: [embed]})
    }
  } 
}