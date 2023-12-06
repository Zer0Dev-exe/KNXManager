const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ruleta')
    .setDescription('Usa la ruleta magica')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
    .addSubcommand(subcommand =>
        subcommand
        .setName('plateada')
        .setDescription('Ruleta de Tickets Plateada')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('diamante')
        .setDescription('Ruleta de Tickets Diamante')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('dorada')
        .setDescription('Ruleta de Tickets Dorada')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('embrujada')
        .setDescription('Ruleta de Tickets Embrujadas')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('millonaria')
        .setDescription('Ruleta de Tickets Millonaria')
    )
    ,
    async execute(interaction) {

        if(interaction.options.getSubcommand() === 'plateada') {

            const { options } = interaction;

            const opciones = ['1 cofre', 'fragmento épico', '100.000', '2 cofres', '125.000', '2 cofres', '110.000', 'fragmento especial', 'fragmento común' ]

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Plateada')
            .addFields(
                { name: 'Opciones', value: `- 1 cofre\n- fragmento épico\n- 100.000\n- 2 cofres\n- 125.000\n- 2 cofres\n- 110.000\n- fragmento especial\n- fragmento común` },
                { name: 'Organizado Por:', value: `- ${interaction.user}` }
            )
            .setColor('#c4c1c1')

            const embed2 = new EmbedBuilder()
            .setTitle('Ruleta Plateada')
            .addFields({
                name: 'Premioo!', value: `- ${opciones[ball]}`
            })
            .setColor('#c4c1c1')

            const boton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ruleta')
                .setLabel('Rula la bola')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🥈')
            )

            const boton2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ruleta')
                .setLabel('Rula la bola')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🥈')
                .setDisabled(true)
            )

            const msg = await interaction.reply({ embeds: [embed], components: [boton] });

            const collector = msg.createMessageComponentCollector()

            collector.on('collect', async i => {

                if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                }
            })

        } else if(interaction.options.getSubcommand() === 'dorada') {

            const { options } = interaction;

            const opciones = [ '2 cofres', 'fragmento común', '150.000', '200.000', '3 cofres', 'fragmento especial', '2 fragmentos épicos', '175.000']

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Dorada')
            .addFields(
                { name: 'Opciones', value: `- 2 cofres\n- fragmento común\n- 150.000\n- 200.000\n- 3 cofres\n- fragmento especial\n- 2 fragmentos épicos\n- 175.000` },
                { name: 'Organizado Por:', value: `- ${interaction.user}` }
            )
            .setColor('#ffef37')

            const embed2 = new EmbedBuilder()
            .setTitle('Ruleta Dorada')
            .addFields({
                name: 'Premioo!', value: `- ${opciones[ball]}`
            })
            .setColor('#ffef37')

            const boton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ruleta')
                .setLabel('Rula la bola')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('918935214577815592')
            )

            const boton2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ruleta')
                .setLabel('Rula la bola')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('918935214577815592')
                .setDisabled(true)
            )

            const msg = await interaction.reply({ embeds: [embed], components: [boton] });

            const collector = msg.createMessageComponentCollector()

            collector.on('collect', async i => {

                if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                }
            })

        } else if(interaction.options.getSubcommand() === 'diamante') {

            const { options } = interaction;

            const opciones = ['400.000', '4 cofres', '5 cofres', '2 fragmentos especiales', '450.000', '500.000', '200.000 + 3 cofres', '2 fragmentos épicos', '1 fragmento mítico']

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Diamante')
            .addFields(
                { name: 'Opciones', value: `- 400.000\n- 4 cofres\n- 5 cofres\n- 2 fragmentos especiales\n- 450.000\n- 500.000\n- 200.000 + 3 cofres\n- 2 fragmentos épicos\n- 1 fragmento mítico` },
                { name: 'Organizado Por:', value: `- ${interaction.user}` }
            )
            .setColor('#15cfeb')

            const embed2 = new EmbedBuilder()
            .setTitle('Ruleta Diamante')
            .addFields({
                name: 'Premioo!', value: `- ${opciones[ball]}`
            })
            .setColor('#15cfeb')

            const boton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ruleta')
                .setLabel('Rula la bola')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('💎')
            )

            const boton2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ruleta')
                .setLabel('Rula la bola')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('💎')
                .setDisabled(true)
            )

            const msg = await interaction.reply({ embeds: [embed], components: [boton] });

            const collector = msg.createMessageComponentCollector()

            collector.on('collect', async i => {

                if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                }
            })

        } else if(interaction.options.getSubcommand() === 'millonaria') {

            const { options } = interaction;

            const opciones = ['1.000.000', '1.500.000', '2.000.000', '30 cofres', '1 fragmento legendario', '2 fragmentos míticos', '10 fragmentos especiales', '5 fragmentos épicos', '3.000.000', '1.000.000 + 5 cofres']

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Millonaria')
            .addFields(
                { name: 'Opciones', value: `- 1.000.000\n- 1.500.000\n- 2.000.000\n- 30 cofres\n- 1 fragmento legendario\n- 2 fragmentos míticos\n- 10 fragmentos especiales\n- 5 fragmentos épicos\n- 3.000.000\n- 1.000.000 + 5 cofres` },
                { name: 'Organizado Por:', value: `- ${interaction.user}` }
            )
            .setColor('#75e97a')

            const embed2 = new EmbedBuilder()
            .setTitle('Ruleta Millonaria')
            .addFields({
                name: 'Premioo!', value: `- ${opciones[ball]}`
            })
            .setColor('#75e97a')

            const boton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ruleta')
                .setLabel('Rula la bola')
                .setStyle(ButtonStyle.Success)
                .setEmoji('💸')
            )

            const boton2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ruleta')
                .setLabel('Rula la bola')
                .setStyle(ButtonStyle.Success)
                .setEmoji('💸')
                .setDisabled(true)
            )

            const msg = await interaction.reply({ embeds: [embed], components: [boton] });

            const collector = msg.createMessageComponentCollector()

            collector.on('collect', async i => {

                if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                }
            })

        } else if(interaction.options.getSubcommand() === 'embrujada') {

            const { options } = interaction;

            const opciones = ['Duplicas tu dinero', '20 cofres', '1.000.000', 'Se divide tu dinero en 2', 'Pierdes todos tus fragmentos comunes', 'Pierdes todos tus fragmentos especiales', 'Pierdes 5 fragmentos épicos', 'Ganas 7 fragmentos comunes y 5 especiales', 'Ganas 3 fragmentos míticos y 4 épicos', 'Pierdes todos tus fragmentos (menos legendarios y arcoíris)', 'Triplicas tu dinero' ]

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Embrujada')
            .setFooter({ text: 'Puedes encontrar cosas misteriosas!'})
            .setThumbnail('https://www.icegif.com/wp-content/uploads/halloween-icegif-5.gif')
            .setImage('https://i.pinimg.com/originals/3f/51/4e/3f514e184c16d2efeb0d27cc800cf84e.gif')
            .addFields(
                { name: 'Opciones', value: `- Duplicas tu dinero\n- 20 cofres\n- 1.000.000\n- Se divide tu dinero en 2\n- Pierdes todos tus fragmentos comunes\n- Pierdes todos tus fragmentos especiales\n- Pierdes 5 fragmentos épicos\n- Ganas 7 fragmentos comunes y 5 especiales\n- Ganas 3 fragmentos míticos y 4 épicos\n- Pierdes todos tus fragmentos (menos legendarios y arcoíris)\n- Triplicas tu dinero` },
                { name: 'Organizado Por:', value: `- ${interaction.user}` }
            )
            .setColor('#fe4444')

            const embed2 = new EmbedBuilder()
            .setTitle('Ruleta Embrujada Roja')
            .addFields({
                name: 'Premioo!', value: `- ${opciones[ball]}`
            })
            .setColor('#fe4444')

            const boton = new ActionRowBuilder()
            .addComponents(
            new ButtonBuilder()
            .setCustomId('ruleta')
            .setLabel('Rula la bola')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('1164622789047750746')
            )

            const boton2 = new ActionRowBuilder()
            .addComponents(
            new ButtonBuilder()
            .setCustomId('ruleta')
            .setLabel('Rula la bola')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('1164622789047750746')
            .setDisabled(true)
            )

            const msg = await interaction.reply({ embeds: [embed], components: [boton] });

            const collector = msg.createMessageComponentCollector()

            collector.on('collect', async i => {

                if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                }
            })
        }
    }
}