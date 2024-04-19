const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'help',
    run: async(message, client, args) => {
        const embed = new EmbedBuilder()
        .setTitle('Menú de ayuda Prefix')
        .setDescription('Estos son los comandos ')
        message.channel.send('Estamos en directo! https://twitch.tv/kirinuxx')
    }
}