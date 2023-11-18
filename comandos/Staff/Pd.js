const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pd')
    .setDescription('Comando para pregunta diaria')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
    .addStringOption(option =>
        option
        .setName('opcion')
        .setDescription('Deseas abrir o cerrar')
        .addChoices(
            { name: 'Abrir', value: 'a' },
            { name: 'Cerrar', value: 'c' }
        )
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('pregunta')
        .setDescription('Pon la pregunta')
    ),

    async execute(interaction, client) {
        const pregunta = interaction.options.getString('pregunta')
        const tipo = interaction.options.getString('opcion');
        const canal = client.channels.cache.get('1109224777593405510')

        if(tipo=== "a") {

            if(!pregunta) {
                interaction.reply({ content: `Se ha abierto el canal de ${canal}`})
                canal.send({ content: '<@&1109225987432001586>', allowedMentions:{parse: ['roles']}})
            } 

            if (pregunta) {
                const embed = new EmbedBuilder()
                .setTitle('La pregunta de hoy es:')
                .setColor('#41faef')
                .setDescription(`${pregunta}`)

                interaction.reply({ content: `Se ha abierto el canal de ${canal}`})
                canal.send({ embeds: [embed], content: '<@&1109225987432001586>', allowedMentions:{parse: ['roles']}})
            }

            canal.edit({
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        allow:[PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: '713630122141286440',
                        allow:[PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    },
                    {
                        id: '700884332759482409',
                        allow:[PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels],
                    }
                ]
            })

        } else if(tipo=== "c") {
            const embed = new EmbedBuilder()
            .setTitle('Se ha cerrado este canal')
            .setDescription(`Se ha cerrado ${canal} hasta el día de mañana. Muchas gracias a todos por participar en la pregunta diaria de hoy, no olviden que mañana seguirémos con las preguntas, estén pendientes mañana.`)
            .setColor('#41faef')
            interaction.reply({ embeds: [embed]})

            canal.edit({
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny:[PermissionFlagsBits.SendMessages],
                        allow:[PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: '713630122141286440',
                        allow:[PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    },
                    {
                        id: '700889141340143616',
                        allow:[PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels],
                    },
                    {
                        id: '700884332759482409',
                        allow:[PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels],
                    }
                ]
            })
        }
    }
}