const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('herramientas')
    .setDescription('Utilidades para los miembros.')
    .addSubcommand(command =>
        command
        .setName('sugerir')
        .setDescription('Sugiere algo para el servidor')
        .addStringOption(option =>
            option
            .setName('sugerencia')
            .setDescription('Describe tu sugerencia')
            .setRequired(true)
        )
    ),

    async execute(interaction, client) {

        if(interaction.options.getSubcommand() === 'sugerir') {

            const sugerencia = interaction.options.getString('sugerencia')
            const canal = client.channels.cache.get('1060688571314479225')

            const embed = new EmbedBuilder()
            .setColor('#f8b45a')
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setTitle(`<:Sugerencia:1112738994158051409> Nueva Sugerencia de ${interaction.user.username}`)
            .addFields(
                { name: 'Sugerencia:', value: `${sugerencia}`}
            )

            const hilo = await canal.threads.create({
                name: `Sugerencia-${interaction.user.username}`,
                autoArchiveDuration: 60,
                reason: 'Sistema de sugerencias',
            });

            canal.send({ content: '<@&1112737673740816445>', embeds: [embed]}).then(sentMessage => {
                sentMessage.react('1112736971522060312')
                sentMessage.react('1112737064639791127')
            })

            interaction.reply({ threads: [hilo], content: 'Sugerencia enviada!', ephemeral: true })

        }

    }
}