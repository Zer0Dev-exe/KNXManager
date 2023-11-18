const {Message} = require('discord.js')
const levelSchema = require('../../Schemas/nivelServidorSchema')
const levelUserSchema = require('../../Schemas/nivelUsuarioSchema')

module.exports = {
  name: 'messageCreate',
  /**
    *
    * @param {Message} message
    */
  async execute(message, client) {
    if(message.author.bot || !message.guild || !message.channel) return;

    const nivelData = await levelSchema.findOne({ guildID: message.guild.id })

    if(!nivelData) return;

    const canal = message.guild.channels.cache.get(nivelData.canalId)
    if(!canal) return;

    const nivelUser = await levelUserSchema.findOne({ guildID: message.guild.id, usuarioId: message.author.id })
    if(!nivelUser) {
      return await levelUserSchema.create({
        guildID: message.guild.id,
        usuarioId: message.author.id,
        usuarioXp: 0,
        usuarioXpTotal: 0,
        usuarioXpCheck: 100,
        usuarioNivel: 0,
      })
    } else if(nivelUser.usuarioXp >= nivelUser.usuarioXpCheck){
      const resetXp = nivelUser.usuarioXp = 0;
      const checkXp = nivelUser.usuarioXpCheck * 1.5;
      const nuevoNivel = nivelUser.usuarioNivel + 1;
      
      await levelUserSchema.findOneAndUpdate({ guildID: message.guild.id, usuarioId: message.author.id }, {
        usuarioXp: resetXp,
        usuarioXpCheck: checkXp,
        usuarioNivel: nuevoNivel
      })

      const channel = await client.channels.cache.get('1169237875888496640');

      await channel.send({ content: `${message.author} Has subido de nivel a ${nuevoNivel}`})
      
    }

    //if(message.content < 6) return;

    //if(nivelUser.usuarioNivel == 5){
      //await message.member.roles.add('')
    //}
    const xpRandom = Math.floor(Math.random() * 30)
    const xpPuntos = nivelUser.usuarioXp + xpRandom;
    const xpTotal = nivelUser.usuarioXpTotal + xpRandom;

    await levelUserSchema.findOneAndUpdate({ guildID: message.guild.id, usuarioId: message.author.id }, {
      usuarioXp: xpPuntos,
      usuarioXpTotal: xpTotal,
    })
    
  }
}