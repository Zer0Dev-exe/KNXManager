const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const clubSchema = require('../../Schemas/clubLogsSchema.js')
module.exports = {
    name: "apuntar",
    run: async (message, client, args) => {

      const data = await clubSchema.findOne({ Servidor: '1213245501621674066'})

      if(args.includes('team')) {

        if(data.MiembrosTeam.includes(message.author.id)) return message.reply({ content: 'Ya estás inscrito en la lista de espera.'})
        data.MiembrosTeam.push(message.author.id)
        await data.save()
        message.reply({ content: `Ahora estás en la lista de espera, serás notificado en <#1213245501621674066> cuando haya espacios libre <:KNX_catwink:1055250357749551127> `})

      } else if(args.includes('crew')) {

        if(data.MiembrosCrew.includes(message.author.id)) return message.reply({ content: 'Ya estás inscrito en la lista de espera.'})
        data.MiembrosCrew.push(message.author.id)
        await data.save()
        message.reply({ content: `Ahora estás en la lista de espera, serás notificado en <#1213245501621674066> cuando haya espacios libre <:KNX_catwink:1055250357749551127> `})

      } else {
        message.reply({ content: 'El uso del comando está mal usa `k!apuntar team` o `k!apuntar crew` '})
      }
    }
 };