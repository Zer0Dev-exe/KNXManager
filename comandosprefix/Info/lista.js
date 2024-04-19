const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const clubSchema = require('../../Schemas/clubLogsSchema.js')
module.exports = {
    name: "lista",
    run: async (message, client, args) => {

      const data = await clubSchema.findOne({ Servidor: '1213245501621674066'})

      let cantidadTeam = [];
        await data.MiembrosTeam.forEach(async member => {
            cantidadTeam.push(`<@${member}>`)
        });

      let cantidadCrew = [];
        await data.MiembrosCrew.forEach(async member => {
            cantidadCrew.push(`<@${member}>`)
        });
    
      const embed = new EmbedBuilder()
      .setTitle('Lista de espera de Clubes')
      .setThumbnail(message.guild.iconURL())
      .addFields({ name: `Team KNX (${cantidadTeam.length})`, value: `> ${cantidadTeam.join('\n > ').slice(0, 1020) || `No hay nadie en la lista de espera`}`, inline: true })
      .addFields({ name: `Crew KNX (${cantidadCrew.length})`, value: `> ${cantidadCrew.join('\n > ').slice(0, 1020) || `No hay nadie en la lista de espera`}`, inline: true })

      await message.reply({ embeds: [embed]})
    }
 };