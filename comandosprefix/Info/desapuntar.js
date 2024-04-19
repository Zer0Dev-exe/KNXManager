const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const clubSchema = require('../../Schemas/clubLogsSchema.js')
module.exports = {
    name: "desapuntar",
    run: async (message, client, args) => {

      const data = await clubSchema.findOne({ Servidor: '1213245501621674066'})

      if(args.includes('team')) {

        if(!data.MiembrosTeam.includes(message.author.id)) return message.reply({ content: 'No estabas inscrito en la lista de espera.'})
        data.MiembrosTeam.splice(data.MiembrosTeam.indexOf(message.author.id), 1)
        await data.save()
        message.reply({ content: `Te he removido de la lista de espera, esperamos que te hayas unido a Team KNX <:KNX_catwink:1055250357749551127>`})

      } else if(args.includes('crew')) {

        if(!data.MiembrosCrew.includes(message.author.id)) return message.reply({ content: 'No estabas inscrito en la lista de espera.'})
        data.MiembrosCrew.splice(data.MiembrosCrew.indexOf(message.author.id), 1)
        await data.save()
        message.reply({ content: `Te he removido de la lista de espera, esperamos que te hayas unido a Crew KNX <:KNX_catwink:1055250357749551127>`})

      } else {
        message.reply({ content: 'El uso del comando está mal usa `k!desapuntar team` o `k!desapuntar crew` '})
      }
    }
 };