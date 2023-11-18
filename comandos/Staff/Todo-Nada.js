const { SlashCommandBuilder, ButtonType, ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ton')
    .setDescription('Comandos de Todo o nada')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
    .addSubcommandGroup(group =>
        group
        .setName('nivel1')
        .setDescription('Todo o Nada Nivel 1')
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda1')
            .setDescription('Todo o Nada N1 Ronda 1')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda2')
            .setDescription('Todo o Nada N1 Ronda 2')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda3')
            .setDescription('Todo o Nada N1 Ronda 3')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda4')
            .setDescription('Todo o Nada N1 Ronda 4')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda5')
            .setDescription('Todo o Nada N1 Ronda 5')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda6')
            .setDescription('Todo o Nada N1 Ronda 6')
        )
    )
    .addSubcommandGroup(group =>
        group
        .setName('nivel2')
        .setDescription('Todo o Nada Nivel 2')
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda1')
            .setDescription('Todo o Nada N2 Ronda 1')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda2')
            .setDescription('Todo o Nada N2 Ronda 2')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda3')
            .setDescription('Todo o Nada N2 Ronda 3')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda4')
            .setDescription('Todo o Nada N2 Ronda 4')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda5')
            .setDescription('Todo o Nada N2 Ronda 5')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda6')
            .setDescription('Todo o Nada N2 Ronda 6')
        )
    )
    .addSubcommandGroup(group =>
        group
        .setName('nivel3')
        .setDescription('Todo o Nada Nivel 3')
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda1')
            .setDescription('Todo o Nada N1 Ronda 1')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda2')
            .setDescription('Todo o Nada N1 Ronda 2')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda3')
            .setDescription('Todo o Nada N1 Ronda 3')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda4')
            .setDescription('Todo o Nada N1 Ronda 4')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda5')
            .setDescription('Todo o Nada N1 Ronda 5')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('ronda6')
            .setDescription('Todo o Nada N1 Ronda 6')
        )
    )
    ,

    async execute(interaction) {
        
        if (interaction.options.getSubcommandGroup() == 'nivel1') {

            if (interaction.options.getSubcommand() == 'ronda1') {
        
                const { options } = interaction;
        
                const opciones = ["Se multiplica x 1.25 (X1.25)", "Se suman 5.500", "Se suman 10 cofres", "Todo o Nada Nivel 2", " Pierdes todo", "Se suman 4.500", "Se suman 7 cofres"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 1')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica x 1.25 (X1.25)\n- Se suman 5.500\n- Se suman 10 cofres\n- Todo o Nada Nivel 2\n- Pierdes todo\n- Se suman 4.500\n- Se suman 7 cofres` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fe263f')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 1')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#fe263f')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } else if (interaction.options.getSubcommand() == 'ronda2') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica x 1.30 (X1.30)", "Se suman 5.500", "Se suman 10 cofres", "Todo o Nada Nivel 2", " Pierdes todo", "Se suman 4.500", "Se suman 7 cofres", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 2')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica x 1.30 (X1.30)\n- Se suman 5.500\n- Se suman 10 cofres\n- Todo o Nada Nivel 2\n- Pierdes todo\n- Se suman 4.500\n- Se suman 7 cofres\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fe263f')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 2')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#fe263f')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } else if (interaction.options.getSubcommand() == 'ronda3') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica x 1.35 (X1.35)", "Se suman 5.500", "Se suman 10 cofres", "Todo o Nada Nivel 2", " Pierdes todo", "Se suman 4.500", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 3')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica x 1.35 (X1.35)\n- Se suman 5.500\n- Se suman 10 cofres\n- Todo o Nada Nivel 2\n- Pierdes todo\n- Se suman 4.500\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fe263f')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 3')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#fe263f')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } else if (interaction.options.getSubcommand() == 'ronda4') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica x 1.40 (X1.40)", "Se suman 5.500", "Se suman 10 cofres", "Todo o Nada Nivel 2", " Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 4')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica x 1.40 (X1.40)\n - Se suman 5.500\n - Se suman 10 cofres\n - Todo o Nada Nivel 2\n - Pierdes todo\n - Pierdes todo\n - Pierdes todo\n - Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fe263f')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 4')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#fe263f')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } else if (interaction.options.getSubcommand() == 'ronda5') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica x 1.5 (X1.5)", "Pierdes todo", "Se suman 10 cofres", "Todo o Nada Nivel 2", " Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 5')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica x 1.5 (X1.5)\n- Pierdes todo\n- Se suman 10 cofres\n- Todo o Nada Nivel 2\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fe263f')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 5')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#fe263f')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } else if (interaction.options.getSubcommand() == 'ronda6') {

                const { options } = interaction;
        
                const opciones = ["600.000 + 15 cofres", "Pierdes todo", "Pierdes todo", "Pierde todo", "Pierdes todo","Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 6')
                .addFields(
                    { name: 'Opciones', value: `- 600.000 + 15 cofres\n- Pierdes todo\n- Pierdes todo\n- Pierde todo\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fe263f')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 6')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#fe263f')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('1132741492067279009')
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

        } else if (interaction.options.getSubcommandGroup() == 'nivel2') {

            if (interaction.options.getSubcommand() == 'ronda1') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica por 1.5 (X1.5)", "Se suman 7.000", "Se suman 7 cofres", "Todo o nada Nivel 3", "Pierdes todo", "Se suman 6.500", "Se suman 10 cofres"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 1')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica por 1.5 (X1.5)\n- Se suman 7.000\n- Se suman 7 cofres\n- Todo o nada Nivel 3\n- Pierdes todo\n- Se suman 6.500\n- Se suman 10 cofres` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#64f09e')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 1')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#64f09e')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } if (interaction.options.getSubcommand() == 'ronda2') {

                const { options } = interaction;
        
                const opciones = ["Pierdes todo", "Se multiplica por 1.75 (X1.75)", "Se suman 8.500", "Se suman 15 cofres", "Todo o nada Nivel 3", "Pierdes todo", "Se suman 7.500"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 2')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Se multiplica por 1.75 (X1.75)\n- Se suman 8.500\n- Se suman 15 cofres\n- Todo o nada Nivel 3\n- Pierdes todo\n- Se suman 7.500` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#64f09e')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 2')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#64f09e')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } if (interaction.options.getSubcommand() == 'ronda3') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica por 2.25 (X2.25)", "Se suman 9.000", "Se suman 18 cofres", "Pierdes todo", "Se suman 12.000", "Se suman 25 cofres", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 3')
                .addFields(
                    { name: 'Opciones', value: `Pierdes todo\n- Se multiplica por 1.75 (X1.75)\n- Se suman 8.500\n- Se suman 15 cofres\n- Todo o nada Nivel 3\n- Pierdes todo\n- Se suman 7.500\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#64f09e')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 3')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#64f09e')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } if (interaction.options.getSubcommand() == 'ronda4') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica por 2.25 (X2.25)", "Se suman 9.000", "Se suman 18 cofres", "Pierdes todo", "Se suman 12.000", "Se suman 25 cofres", "Pierdes todo", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 4')
                .addFields(
                    { name: 'Opciones', value: `Pierdes todo\n- Se multiplica por 2 (X2)\n- Se suman 8.500\n- Se suman 15 cofres\n- Todo o nada Nivel 3\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#64f09e')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 4')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#64f09e')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } if (interaction.options.getSubcommand() == 'ronda5') {

                const { options } = interaction;
        
                const opciones = ["Pierdes todo", "Se multiplica por 2 (X2)", "Se suman 7.000", "Se suman 20 cofres", "Todo o nada Nivel 3", "Pierdes todo", "Se suman 6.500", "Pierdes todo", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 5')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Se multiplica por 2 (X2)\n- Se suman 7.000\n- Se suman 20 cofres\n- Todo o nada Nivel 3\n- Pierdes todo\n- Se suman 6.500\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#64f09e')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 5')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#64f09e')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } if (interaction.options.getSubcommand() == 'ronda6') {

                const { options } = interaction;
        
                const opciones = ["885.000 + 20 cofres", "Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 6')
                .addFields(
                    { name: 'Opciones', value: `- 885.000 + 20 cofres\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#64f09e')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 6')
                .addFields({
                    name: 'Y el premio esss!', value: `- ${opciones[ball]}`
                })
                .setColor('#64f09e')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Tira la superbola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1133019428934664243')
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

        } else if (interaction.options.getSubcommandGroup() == 'nivel3') {

            if (interaction.options.getSubcommand() == 'ronda1') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica por 1.75 (X1.75)", "Se suman 9.000", "Se suman 18 cofres", "Pierdes todo", "Se suman 7.500", "Se suman 25 cofres"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 1')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica por 1.75 (X1.75)\n- Se suman 9.000\n- Se suman 18 cofres\n- Pierdes todo\n- Se suman 7.500\n- Se suman 25 cofres` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fa5255')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 1')
                .addFields({
                    name: 'Has conseguido!', value: `- ${opciones[ball]}`
                })
                .setColor('#fa5255')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })

            } else if (interaction.options.getSubcommand() == 'ronda2') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica por 2 (X2)", "Se suman 9.000", "Se suman 18 cofres", "Pierdes todo", "Se suman 12.000", "Se suman 25 cofres", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 2')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica por 2 (X2)\n- Se suman 9.000\n- Se suman 18 cofres\n- Pierdes todo\n- Se suman 12.000\n- Se suman 25 cofres\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fa5255')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 2')
                .addFields({
                    name: 'Has conseguido!', value: `- ${opciones[ball]}`
                })
                .setColor('#fa5255')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
                
            } else if (interaction.options.getSubcommand() == 'ronda3') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica por 2.25 (X2.25)", "Se suman 9.000", "Se suman 18 cofres", "Pierdes todo", "Se suman 12.000", "Se suman 25 cofres", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 3')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica por 2.25 (X2.25)\n- Se suman 9.000\n- Se suman 18 cofres\n- Pierdes todo\n- Se suman 12.000\n- Se suman 25 cofres\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fa5255')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 3')
                .addFields({
                    name: 'Has conseguido!', value: `- ${opciones[ball]}`
                })
                .setColor('#fa5255')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
                
            } else if (interaction.options.getSubcommand() == 'ronda4') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica por 2.25 (X2.25)", "Se suman 9.000", "Se suman 18 cofres", "Pierdes todo", "Se suman 12.000", "Se suman 25 cofres", "Pierdes todo", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 4')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica por 2.25 (X2.25)\n- Se suman 9.000\n- Se suman 18 cofres\n- Pierdes todo\n- Se suman 12.000\n- Se suman 25 cofres\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fa5255')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 4')
                .addFields({
                    name: 'Has conseguido!', value: `- ${opciones[ball]}`
                })
                .setColor('#fa5255')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
                
            } else if (interaction.options.getSubcommand() == 'ronda5') {

                const { options } = interaction;
        
                const opciones = ["Se multiplica por 2.5 (X2.5)", "Se suman 9.000", "Se suman 18 cofres", "Pierdes todo", "Se suman 12.000", "Se suman 25 cofres", "Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 5')
                .addFields(
                    { name: 'Opciones', value: `- Se multiplica por 2.5 (X2.5)\n- Se suman 9.000\n- Se suman 18 cofres\n- Pierdes todo\n- Se suman 12.000\n- Se suman 25 cofres\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fa5255')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 5')
                .addFields({
                    name: 'Has conseguido!', value: `- ${opciones[ball]}`
                })
                .setColor('#fa5255')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                    .setDisabled(true)
                )
        
                const msg = await interaction.reply({ embeds: [embed], components: [boton] });
        
                const collector = msg.createMessageComponentCollector()
        
                collector.on('collect', async i => {
        
                    if (i.customId == 'ruleta' ) {
                    i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
                
            } else if (interaction.options.getSubcommand() == 'ronda6') {
                
                const { options } = interaction;
        
                const opciones = ["1.200.000 y 50 cofres", "Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo", "Pierdes todo"]
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 6')
                .addFields(
                    { name: 'Opciones', value: `- 1.200.000 y 50 cofres\n- Pierdes todo\n- Pierdes todo"\n- Pierdes todo"\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('#fa5255')
        
                const embed2 = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 6')
                .addFields({
                    name: 'Has conseguido!', value: `- ${opciones[ball]}`
                })
                .setColor('#fa5255')
        
                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Gira la ruleta')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('935957089409450022')
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
}