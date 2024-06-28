const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder} = require('discord.js');
const schema = require('../../Schemas/estrellasSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('estrellas')
    .setDescription('Comando para gestionar')
    .addSubcommand(subcommand =>
        subcommand
        .setName('ver')
        .setDescription('Ver Estrellas')
        .addUserOption(option => 
            option
            .setName('usuario')
            .setDescription('Usuario que seas mirar')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('agregar')
        .setDescription('Agregar Estrellas')
        .addUserOption(option => 
            option
            .setName('usuario')
            .setDescription('Usuario que seas mirar')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('tipo')
            .setDescription('Tipo de Estrella')
            .addChoices(
                { name: 'Estrella KNX', value: 'knx' },
                { name: 'Estrella KNX Común 🟦', value: 'knxc' },
                { name: 'Estrella KNX Especial 🟧', value: 'knxes' },
                { name: 'Estrella KNX Épica 🟪', value: 'knxep' },
                { name: 'Estrella KNX Mítica 🟥', value: 'knxm' },
                { name: 'Estrella KNX Legendaria 🟨', value: 'knxl' },
            )
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option
            .setName('cantidad')
            .setDescription('Cantidad Estrellas')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('remover')
        .setDescription('Remover Estrellas')
        .addUserOption(option => 
            option
            .setName('usuario')
            .setDescription('Usuario que seas mirar')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('tipo')
            .setDescription('Tipo de Estrella')
            .addChoices(
                { name: 'Estrella KNX', value: 'knx' },
                { name: 'Estrella KNX Común 🟦', value: 'knxc' },
                { name: 'Estrella KNX Especial 🟧', value: 'knxes' },
                { name: 'Estrella KNX Épica 🟪', value: 'knxep' },
                { name: 'Estrella KNX Mítica 🟥', value: 'knxm' },
                { name: 'Estrella KNX Legendaria 🟨', value: 'knxl' },
            )
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option
            .setName('cantidad')
            .setDescription('Cantidad Estrellas')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('usar')
        .setDescription('Usar Estrellas')
        .addStringOption(option =>
            option
            .setName('tipo')
            .setDescription('Tipo de Estrella')
            .addChoices(
                { name: 'Estrella KNX', value: 'knx' },
                { name: 'Estrella KNX Común 🟦', value: 'knxc' },
                { name: 'Estrella KNX Especial 🟧', value: 'knxes' },
                { name: 'Estrella KNX Épica 🟪', value: 'knxep' },
                { name: 'Estrella KNX Mítica 🟥', value: 'knxm' },
                { name: 'Estrella KNX Legendaria 🟨', value: 'knxl' },
            )
            .setRequired(true)
        )
    ),
    async execute(interaction, client) {

        if(interaction.options.getSubcommand() === 'ver') {

            const usuario = interaction.options.getUser('usuario')

            const data = await schema.findOne({ Usuario: usuario.id })

            if(!data) {
                interaction.reply('No tienes ningúna estrella!')
            } else {
                const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`Estrellas de ${usuario.displayName}`)
                .setThumbnail(usuario.displayAvatarURL())
                .setDescription('<a:Estrellas10:1156946836691619930> *Colecciona la mayor cantidad de estrellas posibles y obtén recompensas especiales* <a:Estrellas10:1156946836691619930>')
                .addFields(
                    { name: 'Estrellas KNX ', value: `- <a:Estrellas10:1156946836691619930> ${data.EstrellaKNX}`, inline: true },
                    { name: 'Estrellas KNX Común 🟦', value: `- <a:Estrellas2:1074116785713983600> ${data.KNXComun}`, inline: true },
                    { name: 'Estrella KNX Especial 🟧', value: `- <a:Estrellas3:1074116929029144706> ${data.KNXEspecial}`, inline: true },
                    { name: 'Estrella KNX Épica 🟪', value: `- <a:Estrellas10:1156946836691619930> ${data.KNXEpica}`, inline: true },   
                    { name: 'Estrella KNX Mítica 🟥', value: `- <a:Estrellas2:1074116785713983600> ${data.KNXMitica}`, inline: true },
                    { name: 'Estrella KNX Legendaria 🟨', value: `- <a:Estrellas3:1074116929029144706> ${data.KNXLegendaria}`, inline: true },
                    { name: 'Estrellas Usadas', value: `- <a:Estrellas3:1074116929029144706> ${data.EstrellasUsadas}`, inline: true}
                )
                interaction.reply({ embeds: [embed]})
            }

        } else if(interaction.options.getSubcommand() === 'agregar') {
            if(!interaction.member.roles.cache.get('713630122141286440')) return interaction.reply({ content: 'No tienes permisos para usar este comando', ephemeral: true })

            const tipo = await interaction.options.getString('tipo')
            const usuario = await interaction.options.getUser('usuario')
            const cantidad = await interaction.options.getInteger('cantidad')
            const data = await schema.findOne({ Usuario: usuario.id })

            if(tipo=== "knx") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        EstrellaKNX: cantidad,
                        KNXComun: 0,
                        KNXEspecial: 0,
                        KNXEpica: 0,
                        KNXMitica: 0,
                        KNXLegendaria: 0,
                        EstrellasUsadas: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX a ${usuario.username}`})
                } 

                if(data) {
                    data.EstrellaKNX = data.EstrellaKNX + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX a ${usuario.username}`})
                }

            } else if(tipo=== "knxc") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        EstrellaKNX: 0,
                        KNXComun: cantidad,
                        KNXEspecial: 0,
                        KNXEpica: 0,
                        KNXMitica: 0,
                        KNXLegendaria: 0,
                        EstrellasUsadas: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX Común a ${usuario.username}`})
                } 

                if(data) {
                    data.KNXComun = data.KNXComun + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de de Estrellas KNX Común a ${usuario.username}`})
                }
            } else if(tipo=== "knxes") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        EstrellaKNX: 0,
                        KNXComun: 0,
                        KNXEspecial: cantidad,
                        KNXEpica: 0,
                        KNXMitica: 0,
                        KNXLegendaria: 0,
                        EstrellasUsadas: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX Especiales a ${usuario.username}`})
                } 

                if(data) {
                    data.KNXEspecial = data.KNXEspecial + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX Especiales a ${usuario.username}`})
                }

            } else if(tipo=== "knxep") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        EstrellaKNX: 0,
                        KNXComun: 0,
                        KNXEspecial: 0,
                        KNXEpica: cantidad,
                        KNXMitica: 0,
                        KNXLegendaria: 0,
                        EstrellasUsadas: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX Épicas a ${usuario.username}`})
                } 

                if(data) {
                    data.KNXEpica = data.KNXEpica + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX Épicas a ${usuario.username}`})
                }

            } else if(tipo=== "knxm") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        EstrellaKNX: 0,
                        KNXComun: 0,
                        KNXEspecial: 0,
                        KNXEpica: 0,
                        KNXMitica: cantidad,
                        KNXLegendaria: 0,
                        EstrellasUsadas: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX Míticas a ${usuario.username}`})
                } 

                if(data) {
                    data.KNXMitica = data.KNXMitica + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX Míticas a ${usuario.username}`})
                }

            } else if(tipo=== "knxl") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        EstrellaKNX: 0,
                        KNXComun: 0,
                        KNXEspecial: 0,
                        KNXEpica: 0,
                        KNXMitica: 0,
                        KNXLegendaria: cantidad,
                        EstrellasUsadas: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Estrellas KNX Legendarias a ${usuario.username}`})
                } 

                if(data) {
                    data.KNXLegendaria = data.KNXLegendaria + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de de Estrellas KNX Legendarias a ${usuario.username}`})
                }

            }

        } else if(interaction.options.getSubcommand() === 'remover') {
            if(!interaction.member.roles.cache.get('713630122141286440')) return interaction.reply({ content: 'No tienes permisos para usar este comando', ephemeral: true })
            const tipo = interaction.options.getString('tipo')
            const usuario = interaction.options.getUser('usuario')
            const cantidad = interaction.options.getInteger('cantidad')
            const data = await schema.findOne({ Usuario: usuario.id })
            if(!data) {
                interaction.reply({ content: 'Este usuario no tiene data, por lo que no puedes remover.'})
            }

            if(data) {
                if(tipo=== "knx") {
                    data.EstrellaKNX = data.EstrellaKNX  - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Estrellas KNX a ${usuario.username}`})
                } else if(tipo=== "knxc") {
                    data.KNXComun = data.KNXComun - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Estrellas Comunes a ${usuario.username}`})
                } else if(tipo=== "knxes") {
                    data.KNXEspecial = data.KNXEspecial - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Estrellas Especiales a ${usuario.username}`})
                } else if(tipo=== "knxep") {
                    data.KNXEpica = data.KNXEpica - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Estrellas Épicas a ${usuario.username}`})
                } else if(tipo=== "knxm") {
                    data.KNXMitica = data.KNXMitica - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Estrellas Míticas a ${usuario.username}`})
                } else if(tipo=== "knxl") {
                    data.KNXLegendaria = data.KNXLegendaria - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Estrellas Legendarias a ${usuario.username}`})
                }
            }
            
        } else if(interaction.options.getSubcommand() === 'usar') {

            const tipo = await interaction.options.getString('tipo')
            const data = await schema.findOne({ Usuario: interaction.user.id })

            if(tipo=== 'knx') {
                if (!data) return interaction.reply('no tienes estrellas');
                if (data.EstrellasKNX < 0) return interaction.reply('No tienes suficientes estrellas.');
                data.EstrellasKNX = data.EstrellasKNX - 1
                data.EstrellasUsadas = data.EstrellasUsadas + 1
                data.save()
                const { options } = interaction;

                const opciones = ['Legendario', 'Común', 'Mítico', 'Épico', 'Especial', 'Especial', 'Especial', 'Común', 'Épico', 'Épico', 'Mítico', 'Común', 'Especial', 'Común', 'Épico', 'Común', 'Especial', 'Común', 'Especial', 'Común' ]

                const ball = Math.floor(Math.random() * opciones.length);

                const embed = new EmbedBuilder()
                .setTitle('Estrellas KNX <:KNX_PinThanks:775086795851038740>')
                .addFields(
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('Random')

                const embed2 = new EmbedBuilder()
                .setTitle('Estrellas KNX <:KNX_PinThanks:775086795851038740>')
                .addFields({
                    name: 'Premioo!', value: `- ${opciones[ball]}`
                })
                .setColor('Random')

                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                    .setDisabled(true)
                )

                const msg = await interaction.reply({ embeds: [embed], components: [boton] });

                const collector = msg.createMessageComponentCollector()

                collector.on('collect', async i => {

                    if (i.customId == 'ruleta' ) {
                        i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
            } else if(tipo=== 'knxc') {
                if (!data) return interaction.reply('no tienes estrellas');
                if (data.KNXComun < 0) return interaction.reply('No tienes suficientes estrellas.');
                data.KNXComun = data.KNXComun - 1
                data.EstrellasUsadas = data.EstrellasUsadas + 1
                data.save()
                const { options } = interaction;

                const opciones = ['1 cofre streamLoots', '20.000 Economía', '1 fragmento común', '1 fragmento especial', '1 cofre StreamLoots', '50.000 Economía', '2 cofres StreamLoots']

                const ball = Math.floor(Math.random() * opciones.length);

                const embed = new EmbedBuilder()
                .setTitle('Estella KNX Común 🟦')
                .addFields(
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('Blue')

                const embed2 = new EmbedBuilder()
                .setTitle('Estella KNX Común 🟦')
                .addFields({
                    name: 'Premioo!', value: `- ${opciones[ball]}`
                })
                .setColor('Blue')

                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                    .setDisabled(true)
                )

                const msg = await interaction.reply({ embeds: [embed], components: [boton] });

                const collector = msg.createMessageComponentCollector()

                collector.on('collect', async i => {

                    if (i.customId == 'ruleta' ) {
                        i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
            } else if(tipo=== 'knxes') {
                if (!data) return interaction.reply('no tienes estrellas');
                if (data.KNXEspecial < 0) return interaction.reply('No tienes suficientes estrellas.');
                data.KNXEspecial = data.KNXEspecial - 1
                data.EstrellasUsadas = data.EstrellasUsadas + 1
                data.save()
                const { options } = interaction;

                const opciones = ['2 cofres StreamLoots', '75.000 Economía', '2 fragmentos especiales', '2 fragmentos épicos', '2 cofres StreamLoots', '1 fragmento épico', '100.000 Economía', '3 cofres StreamLoots']

                const ball = Math.floor(Math.random() * opciones.length);

                const embed = new EmbedBuilder()
                .setTitle('Estrella KNX Especial 🟧')
                .addFields(
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('Orange')

                const embed2 = new EmbedBuilder()
                .setTitle('Estrella KNX Especial 🟧')
                .addFields({
                    name: 'Premioo!', value: `- ${opciones[ball]}`
                })
                .setColor('Orange')

                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                    .setDisabled(true)
                )

                const msg = await interaction.reply({ embeds: [embed], components: [boton] });

                const collector = msg.createMessageComponentCollector()

                collector.on('collect', async i => {

                    if (i.customId == 'ruleta' ) {
                        i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
            } else if(tipo=== 'knxep') {
                if (!data) return interaction.reply('no tienes estrellas');
                if (data.KNXEpica < 0) return interaction.reply('No tienes suficientes estrellas.');
                data.KNXEpica = data.KNXEpica - 1
                data.EstrellasUsadas = data.EstrellasUsadas + 1
                data.save()
                const { options } = interaction;

                const opciones = ['4 cofres StreamLoots', '125.000 Economía', '3 fragmentos Épicos', '1 fragmento mítico', '5 fragmentos Épicos', '5 fragmentos especiales', '5 cofres StreamLoots', '200.000 Economía']

                const ball = Math.floor(Math.random() * opciones.length);

                const embed = new EmbedBuilder()
                .setTitle('Estrella KNX Épica 🟪')
                .addFields(
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('Purple')

                const embed2 = new EmbedBuilder()
                .setTitle('Estrella KNX Épica 🟪')
                .addFields({
                    name: 'Premioo!', value: `- ${opciones[ball]}`
                })
                .setColor('Purple')

                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                    .setDisabled(true)
                )

                const msg = await interaction.reply({ embeds: [embed], components: [boton] });

                const collector = msg.createMessageComponentCollector()

                collector.on('collect', async i => {

                    if (i.customId == 'ruleta' ) {
                        i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
            } else if(tipo=== 'knxm') {
                if (!data) return interaction.reply('no tienes estrellas');
                if (data.KNXMitica < 0) return interaction.reply('No tienes suficientes estrellas.');
                data.KNXMitica = data.KNXMitica - 1
                data.EstrellasUsadas = data.EstrellasUsadas + 1
                data.save()
                const { options } = interaction;

                const opciones = ['5 cofres StreamLoots', '250.000 Economía', '3 fragmentos míticos', '1 fragmento legendario', '275.000 Economía', '10 fragmentos épicos', '7 cofres StreamLoots', '350.000 Economía', '10 cofres StreamLoots', '5 fragmentos míticos', '500.000 Economía']

                const ball = Math.floor(Math.random() * opciones.length);

                const embed = new EmbedBuilder()
                .setTitle('Estrella KNX Mítica 🟥')
                .addFields(
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('Red')

                const embed2 = new EmbedBuilder()
                .setTitle('Estrella KNX Mítica 🟥')
                .addFields({
                    name: 'Premioo!', value: `- ${opciones[ball]}`
                })
                .setColor('Red')

                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                    .setDisabled(true)
                )

                const msg = await interaction.reply({ embeds: [embed], components: [boton] });

                const collector = msg.createMessageComponentCollector()

                collector.on('collect', async i => {

                    if (i.customId == 'ruleta' ) {
                        i.update({ embeds: [embed2], components: [boton2]})
                    }
                })
            } else if(tipo=== 'knxl') {
                if (!data) return interaction.reply('no tienes estrellas');
                if (data.KNXLegendaria < 0) return interaction.reply('No tienes suficientes estrellas.');
                data.KNXLegendaria = data.KNXLegendaria - 1
                data.EstrellasUsadas = data.EstrellasUsadas + 1
                data.save()
                const { options } = interaction;

                const opciones = ['15 cofres StreamLoots', '750.000 Economía', '1 fragmento legendario', '15 cofres StreamLoots', '1 fragmento arcoíris', '1.000.000 Economía', '20 cofres StreamLoots', '1 fragmento mutado', '2.000.000', '2 fragmentos legendarios']

                const ball = Math.floor(Math.random() * opciones.length);

                const embed = new EmbedBuilder()
                .setTitle('Estrella KNX Legendaria 🟨')
                .addFields(
                    { name: 'Organizado Por:', value: `- ${interaction.user}` }
                )
                .setColor('Yellow')

                const embed2 = new EmbedBuilder()
                .setTitle('Estrella KNX Legendaria 🟨')
                .addFields({
                    name: 'Premioo!', value: `- ${opciones[ball]}`
                })
                .setColor('Yellow')

                const boton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
                )

                const boton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ruleta')
                    .setLabel('Rula la bola')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('1055250357749551127')
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