const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ruleta')
    .setDescription('Usa la ruleta magica')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
    .addSubcommand(subcommand =>
        subcommand
        .setName('plateada1')
        .setDescription('Ruleta de Tickets Nivel1')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('plateada2')
        .setDescription('Ruleta de Tickets Nivel2')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('diamante')
        .setDescription('Ruleta de Tickets Nivel3')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('dorada1')
        .setDescription('Ruleta de Tickets Nivel3')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('dorada2')
        .setDescription('Ruleta de Tickets Nivel3')
    )
    .addSubcommandGroup(subcommand =>
        subcommand
        .setName('embrujada')
        .setDescription('Ruleta de Tickets Nivel3')
        .addSubcommand(subcommand =>
            subcommand
            .setName('verde')
            .setDescription('Ruleta embrujada Verde')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('roja')
            .setDescription('Ruleta embrujada Roja')
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('millonaria')
        .setDescription('Ruleta de Tickets Millonaria')
    )
    ,
    async execute(interaction) {

        if(interaction.options.getSubcommand() === 'plateada1') {

            const { options } = interaction;

            const opciones = ["65.500 + 2 cofres", "66.000", "5 cofres" ,"70.000","68.500","69.000 + 4 cofres"]

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Plateada 1')
            .addFields(
                { name: 'Opciones', value: `- 65.500\n- 2 cofres\n- 66.000\n- 5 cofres\n- 70.000\n- 68.500\n- 69.000 + 4 cofres` },
                { name: 'Organizado Por:', value: `- ${interaction.user}` }
            )
            .setColor('#c4c1c1')

            const embed2 = new EmbedBuilder()
            .setTitle('Ruleta Plateada 1')
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

        } else if(interaction.options.getSubcommand() === 'plateada2') {

            const { options } = interaction;

            const opciones = ["86.000", "77.000 + 3 cofres", "88.000", "90.000 + 2 cofres" , "89.000", "7 cofres"]

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Plateada 2')
            .addFields(
                { name: 'Opciones', value: `- 86.000\n- 77.000 + 3 cofres\n- 88.000\n- 90.000 + 2 cofres\n- 89.000\n- 7 cofres` },
                { name: 'Organizado Por:', value: `- ${interaction.user}` }
            )
            .setColor('#c4c1c1')

            const embed2 = new EmbedBuilder()
            .setTitle('Ruleta Plateada 2')
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

        } else if(interaction.options.getSubcommand() === 'diamante') {

            const { options } = interaction;

            const opciones = ["375.000", "358.500 + " , "402.000 y 5 cofres", "380.000 + 10 cofres", "360.000", "355.750 + 5 cofres"]

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Diamante')
            .addFields(
                { name: 'Opciones', value: `- 375.000\n- 358.500\n- 402.000 y 5 cofres\n- 380.000 + 10 cofres\n- 360.000\n- 355.750 + 5 cofres` },
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

            const opciones = ["1.800.000   y 10 cofres", "3 ruletas de diamante", "30 cofres", "1.185.000 y 5 cofres", "1.150.000 y una ruleta dorada #1", "1.200.000 y 9 cofres ", "2.375.000 y 13 cofres"]

            const ball = Math.floor(Math.random() * opciones.length);

            const embed = new EmbedBuilder()
            .setTitle('Ruleta Millonaria')
            .addFields(
                { name: 'Opciones', value: `- 1.800.000 y 10 cofres\n- 3 ruletas de diamante\n- 30 cofres\n- 1.185.000 y 5 cofres\n- 1.150.000 y una ruleta dorada #1\n- 1.200.000 y 9 cofres\n- 2.375.000 y 13 cofres` },
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
        }

        if(interaction.options.getSubcommandGroup() === 'embrujada') {

            if(interaction.options.getSubcommand() === 'roja') {

                const { options } = interaction;

                const opciones = ["reroll y x2", "reroll y ÷2", "LA BRUJAA", "2.800.000 Y 20 cofres", "X3 de tu total", "÷2,5 del total de economía", "÷2 del total de economia", "÷1,5 del total de economia", "÷1.25 del total de tu economia", "Pierdes un rol exclusivo al azar","X2 del tu economia"]

                const ball = Math.floor(Math.random() * opciones.length);

                const embed = new EmbedBuilder()
                .setTitle('Ruleta Embrujada Roja')
                .setFooter({ text: 'Puedes encontrar cosas misteriosas!'})
                .setThumbnail('https://www.icegif.com/wp-content/uploads/halloween-icegif-5.gif')
                .setImage('https://i.pinimg.com/originals/3f/51/4e/3f514e184c16d2efeb0d27cc800cf84e.gif')
                .addFields(
                    { name: 'Opciones', value: `- reroll y x2\n- reroll y ÷2\n- LA BRUJAA\n- 2.800.000 Y 20 cofres\n- X3 de tu total" "÷2,5 del total de economía\n- ÷2 del total de economia\n- ÷1,5 del total de economia\n- ÷1.25 del total de tu economia\n- Pierdes un rol exclusivo al azar\n- X2 del tu economia` },
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

            } else if(interaction.options.getSubcommand() === 'verde') {

                const { options } = interaction;

                const opciones = ["reroll y x2", "reroll y ÷2", "590.000 y 15  cofres", "675.000 y 10 cofres", "30 cofres", "x1.25 de el total de economía", "÷1,5 del total de economia", "-20% de tu total", "-12% de tu total", "LA BRUJAA"]

                const ball = Math.floor(Math.random() * opciones.length);

                const embed = new EmbedBuilder()
                .setTitle('Ruleta Embrujada Verde')
                .addFields(
                    { name: 'Opciones', value: `- reroll y x2\n- reroll y ÷2\n- 590.000 y 15  cofres\n- 675.000 y 10 cofres\n- 30 cofres\n- x1.25 de el total de economía\n- ÷1,5 del total de economia\n- -20% de tu total\n- -12% de tu total\n- LA BRUJAA` },
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setImage('https://49.media.tumblr.com/b319e944ed10ccf7eb155098ced22ccb/tumblr_nt93p5fP141sicazoo1_500.gif')
                .setFooter({ text: 'Puedes encontrar cosas misteriosas!'})
                .setThumbnail(`https://media3.giphy.com/media/65HOeb1Vi8LLh16UFS/giphy.gif`)
                .setColor('#60a74a')

                const embed2 = new EmbedBuilder()
                .setTitle('Ruleta Embrujada Verde')
                .addFields({
                    name: 'Premioo!', value: `- ${opciones[ball]}`
                })
                .setColor('#60a74a')

                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('1164622789047750746')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Success)
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
}