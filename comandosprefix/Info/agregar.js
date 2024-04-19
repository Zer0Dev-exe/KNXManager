const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Schema = require('../../Schemas/preguntasChat.js')
module.exports = {
    name: "agregar",
    run: async (message, client, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply({ content: `No tienes permisos suficientes para usar este comando`})
        if(!args) return message.reply({ content: 'Sin argumento válido no puedo ejecutar este comando'})
        const pregunta = await args.toString(true).replace(/,/g, ' ');
        await Schema.create({
            Pregunta: pregunta
        })

        await message.reply({ content: `Se ha agregado la pregunta:\n${pregunta}`})
    }
}