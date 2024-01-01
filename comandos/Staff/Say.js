const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Di algo')
    .addStringOption(option =>
        option
        .setName('que')
        .setDescription('Quieres')
        .setRequired(true)
    ),

    async execute(interaction, client) {
        const say = interaction.options.getString('que')
        interaction.reply({ content: 'Listo', ephemeral: true })
        interaction.channel.send({ content: `${say}`})
    }
}