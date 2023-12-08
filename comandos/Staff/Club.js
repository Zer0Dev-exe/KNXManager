require('dotenv').config()
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
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
    let vicepresidente = club.members.find(member => member.role === 'vicePresident');
        
      const miembrosplus = club.members.sort((a, b) => b.trophies - a.trophies).slice(0, 5)
      const miembrosminus = club.members.sort((a, b) => a.trophies - b.trophies).slice(0, 5)

      // SI HAY PLAZAS
      if(club.memberCount < 30) {
        const boton = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setLabel(`Estado: Abierto`)
          .setCustomId('test1')
          .setEmoji('957238576511340604')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
        )
        const embed = new EmbedBuilder()
        .setDescription(` \`\`\`${club.description}\`\`\` `)
        .setThumbnail(`https://cdn-old.brawlify.com/club/${club.badgeId}.png`)
        .setColor('#b96eff')
        .addFields(
          { name: 'Trofeos Totales', value: `<:trophy:1178100595530420355> \`${club.trophies}\``, inline: true },
          { name: 'Trofeos Requeridos', value: `<:reseteo:1178100588114882652> \`${club.requiredTrophies}\``, inline: true},
          { name: 'Media Trofeos', value: `<:trophy:1178100595530420355> \`${Math.floor(club.trophies/club.memberCount)}\``, inline: true},
          { name: 'Miembros', value: `<:BrawlStars:1001445217993498634> \`${club.memberCount}/30\``, inline: true },
          { name: 'Estado', value: `<:1110136571400831037:1165754219203149915> \`${club.type}\``, inline: true },
          { name: 'Presidente', value: `<:StaffWarnIcon:1074154030173003826> \`${presidente.trophies}\` **|** \`${presidente.name}\``, inline: true },
          { name: 'VicePresidente', value: `<:Utilidad:1074137802620551321> \`${vicepresidente.trophies}\` **|** \`${vicepresidente.name}\``, inline: true },
          { name: ' ', value: ' ', inline: false }
        )
        .setAuthor({ name: `${club.name} ${club.tag}`, iconURL: `https://cdn-old.brawlify.com/club/${club.badgeId}.png`})

        const membersField = miembrosplus.map((member) => {
          const { name, trophies } = member
          return `<:reseteo:1178100588114882652> \`${trophies}\` | \`${name}\``
        }).join('\n')

        const membersField2 = miembrosminus.map((member) => {
          const { name, trophies } = member
          return `<:reseteo:1178100588114882652> \`${trophies}\` | \`${name}\``
        }).join('\n')
    
        embed.addFields(
          { name: 'Miembros Altos', value: `${membersField}`, inline: true },
          { name: 'Miembros Bajos', value: `${membersField2}`, inline: true }
        )

        interaction.reply({ embeds: [embed], components: [boton]})
      } 

      // SI ESTA LLENO
      if(club.memberCount === 30) {

        const boton = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setLabel(`Estado: Lleno`)
          .setCustomId('test1')
          .setEmoji('957238576528105482')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
        )
        const boton2 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setLabel(`Miembros Club`)
          .setCustomId('lista-miembros')
          .setEmoji('907339654850809916')
          .setStyle(ButtonStyle.Success)
        )
        const embed = new EmbedBuilder()
        .setDescription(` \`\`\`${club.description}\`\`\` `)
        .setThumbnail(`https://cdn-old.brawlify.com/club/${club.badgeId}.png`)
        .setColor('#b96eff')
        .addFields(
          { name: 'Trofeos Totales', value: `<:trophy:1178100595530420355> \`${club.trophies}\``, inline: true },
          { name: 'Trofeos Requeridos', value: `<:reseteo:1178100588114882652> \`${club.requiredTrophies}\``, inline: true},
          { name: 'Media Trofeos', value: `<:trophy:1178100595530420355> \`${Math.floor(club.trophies/club.memberCount)}\``, inline: true},
          { name: 'Miembros', value: `<:BrawlStars:1001445217993498634> \`${club.memberCount}/30\``, inline: true },
          { name: 'Estado', value: `<:1110136571400831037:1165754219203149915> \`${club.type}\``, inline: true },
          { name: 'Presidente', value: `<:StaffWarnIcon:1074154030173003826> \`${presidente.trophies}\` **|** \`${presidente.name}\``, inline: true },
          { name: 'VicePresidente', value: `<:Utilidad:1074137802620551321> \`${vicepresidente.trophies}\` **|** \`${vicepresidente.name}\``, inline: true },
          { name: ' ', value: ' ', inline: false }
        )
        .setAuthor({ name: `${club.name} ${club.tag}`, iconURL: `https://cdn-old.brawlify.com/club/${club.badgeId}.png`})

        const membersField = miembrosplus.map((member) => {
          const { name, trophies } = member
          return `<:reseteo:1178100588114882652> \`${trophies}\` | \`${name}\``
        }).join('\n')

        const membersField2 = miembrosminus.map((member) => {
          const { name, trophies } = member
          return `<:reseteo:1178100588114882652> \`${trophies}\` | \`${name}\``
        }).join('\n')
    
        embed.addFields(
          { name: 'Miembros Altos', value: `${membersField}`, inline: true },
          { name: 'Miembros Bajos', value: `${membersField2}`, inline: true }
        )

        interaction.reply({ embeds: [embed], components: [boton, boton2]})
      }
  } 
}