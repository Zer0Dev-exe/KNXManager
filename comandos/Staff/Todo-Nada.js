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
        
                const opciones = ['Sumas 5 cofres', 'Sumas 1 fragmento épico', 'Se multiplica por 1.5 (todo) ', 'Sumas 1 fragmento mítico',  'Sumas 500.000', 'Sumas 10 cofres', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 1')
                .addFields(
                    { name: 'Opciones', value: `- Sumas 5 cofres\n- Sumas 1 fragmento épico\n- Se multiplica por 1.5 (todo)\n- Sumas 1 fragmento mítico\n- Sumas 500.000\n- Sumas 10 cofres\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes Todo', 'Sumas 1 fragmento épico', 'Se multiplica por 1.5 (todo)', 'Sumas 1 fragmento mítico', 'Sumas 500.000', 'Sumas 10 cofres', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 2')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes Todo\n- Sumas 1 fragmento épico\n- Se multiplica por 1.5 (todo)\n- Sumas 1 fragmento mítico\n- Sumas 500.000\n- Sumas 10 cofres\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes Todo', 'Sumas 1 fragmento épico', 'Se multiplica por 1.5 (todo)', 'Sumas 1 fragmento mítico', 'Sumas 500.000', 'Sumas 10 cofres', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 3')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes Todo\n- Sumas 1 fragmento épico\n- Se multiplica por 1.5 (todo)\n- Sumas 1 fragmento mítico\n- Sumas 500.000\n- Sumas 10 cofres\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes Todo', 'Pierdes todo', 'Se multiplica por 1.5 (todo)', 'Sumas 1 fragmento mítico', 'Sumas 500.000', 'Sumas 10 cofres', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 4')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes Todo\n- Pierdes todo\n- Se multiplica por 1.5 (todo)\n- Sumas 1 fragmento mítico\n- Sumas 500.000\n- Sumas 10 cofres\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes Todo', 'Pierdes todo', 'Se multiplica por 1.5 (todo)', 'Sumas 1 fragmento mítico', 'Sumas 500.000', 'Pierdes todo', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 5')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes Todo\n- Pierdes todo\n- Se multiplica por 1.5 (todo)\n- Sumas 1 fragmento mítico\n- Sumas 500.000\n- Pierdes todo\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes Todo', 'Pierdes todo', 'Se multiplica por 1.5 (todo)', 'Pierdes todo', 'Pierdes todo', 'Pierdes todo', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 1 Ronda 6')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes Todo\n- Pierdes todo\n- Se multiplica por 1.5 (todo)\n-Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
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
        
                const opciones = ['Sumas 750.000', 'Sumas 10 cofres', 'Se multiplica por 2 (todo) ', 'Sumas 2 fragmentos épicos', 'Pierdes todo', 'Sumas 1.000.000', 'Sumas 1 fragmento legendario']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 1')
                .addFields(
                    { name: 'Opciones', value: `- Sumas 750.000\n- Sumas 10 cofres\n- Se multiplica por 2 (todo)\n- Sumas 2 fragmentos épicos\n- Pierdes todo\n- Sumas 1.000.000\n- Sumas 1 fragmento legendario` },
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
        
                const opciones = ['Pierdes todo', 'Sumas 10 cofres', 'Se multiplica por 2 (todo)', 'Sumas 2 fragmentos épicos', 'Pierdes todo', 'Sumas 1.000.000', 'Sumas 1 fragmento legendario']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 2')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Sumas 10 cofres\n- Se multiplica por 2 (todo)\n- Sumas 2 fragmentos épicos\n- Pierdes todo\n- Sumas 1.000.000\n- Sumas 1 fragmento legendario` },
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
        
                const opciones = ['Pierdes todo', 'Pierdes todo', 'Se multiplica por 2 (todo) ', 'Sumas 2 fragmentos épicos', 'Pierdes todo', 'Sumas 1.000.000', 'Sumas 1 fragmento legendario']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 3')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Pierdes todo\n- Se multiplica por 2 (todo)\n- Sumas 2 fragmentos épicos\n- Pierdes todo\n- Sumas 1.000.000\n- Sumas 1 fragmento legendario` },
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
        
                const opciones = ['Pierdes todo', 'Pierdes todo', 'Se multiplica por 2 (todo) ', 'Sumas 2 fragmentos épicos', 'Pierdes todo', 'Pierdes todo', 'Sumas 1 fragmento legendario']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 4')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Pierdes todo\n- Se multiplica por 2 (todo)\n- Sumas 2 fragmentos épicos\n- Pierdes todo\n- Pierdes todo\n- Sumas 1 fragmento legendario` },
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
        
                const opciones = ['Pierdes todo', 'Pierdes todo', 'Se multiplica por 2 (todo) ', 'Pierdes todo', 'Pierdes todo', 'Pierdes todo', 'Sumas 1 fragmento legendario']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 5')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Pierdes todo\n- Se multiplica por 2 (todo)\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Sumas 1 fragmento legendario` },
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
        
                const opciones = ['Pierdes todo', 'Pierdes todo', 'Se multiplica por 2 (todo) ', 'Pierdes todo', 'Pierdes todo', 'Pierdes todo', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 2 Ronda 6')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Pierdes todo\n- Se multiplica por 2 (todo)\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Pierdes todo` },
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
        
                const opciones = ['Sumas 1.500.000 + 5 cofres', 'Sumas 1 fragmento arcoíris', 'Sumas 2 fragmentos míticos', 'Se multiplica por 2.5 (todo)', 'Sumas 2 fragmentos legendarios', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 1')
                .addFields(
                    { name: 'Opciones', value: `- Sumas 1.500.000 + 5 cofres\n- Sumas 1 fragmento arcoíris\n- Sumas 2 fragmentos míticos\n- Se multiplica por 2.5 (todo)\n- Sumas 2 fragmentos legendarios\n- Pierdes todo` },
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
        
                const opciones = ['Sumas 1.500.000 + 5 cofres', 'Sumas 1 fragmento arcoíris', 'Pierdes todo', 'Se multiplica por 2.5 (todo)', 'Sumas 2 fragmentos legendarios', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 2')
                .addFields(
                    { name: 'Opciones', value: `- Sumas 1.500.000 + 5 cofres\n- Sumas 1 fragmento arcoíris\n- Pierdes todo\n- Se multiplica por 2.5 (todo)\n- Sumas 2 fragmentos legendarios\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes todo', 'Sumas 1 fragmento arcoíris', 'Pierdes todo', 'Se multiplica por 2.5 (todo)', 'Sumas 2 fragmentos legendarios', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 3')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Sumas 1 fragmento arcoíris\n- Pierdes todo\n- Se multiplica por 2.5 (todo)\n- Sumas 2 fragmentos legendarios\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes todo', 'Sumas 1 fragmento arcoíris', 'Pierdes todo', 'Se multiplica por 2.5 (todo)', 'Pierdes todo', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 4')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Sumas 1 fragmento arcoíris\n- Pierdes todo\n- Se multiplica por 2.5 (todo)\n- Pierdes todo\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes todo', 'Pierdes todo', 'Pierdes todo', 'Se multiplica por 2.5 (todo)', 'Pierdes todo', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 5')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Se multiplica por 2.5 (todo)\n- Pierdes todo\n- Pierdes todo` },
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
        
                const opciones = ['Pierdes todo', 'Pierdes todo', 'Pierdes todo', 'Se multiplica por 3 (todo)', 'Pierdes todo', 'Pierdes todo']
        
                const ball = Math.floor(Math.random() * opciones.length);
        
                const embed = new EmbedBuilder()
                .setTitle('Todo o Nada Nivel 3 Ronda 6')
                .addFields(
                    { name: 'Opciones', value: `- Pierdes todo\n- Pierdes todo\n- Pierdes todo\n- Se multiplica por 3 (todo)\n- Pierdes todo\n- Pierdes todo` },
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