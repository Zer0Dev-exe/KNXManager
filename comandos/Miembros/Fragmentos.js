const { SlashCommandBuilder, EmbedBuilder, InteractionResponse } = require('discord.js')
const schema = require('../../Schemas/fragmentosSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('fragmentos')
    .setDescription('Comandos relacionados a Fragmentos')
    .addSubcommand(subcommand =>
        subcommand
        .setName('ver')
        .setDescription('Ver Fragmentos')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('agregar')
        .setDescription('Agregar Fragmentos')
        .addUserOption(option => 
            option
            .setName('usuario')
            .setDescription('Usuario que seas mirar')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('tipo')
            .setDescription('Tipo de Fragmento')
            .addChoices(
                { name: 'Comun', value: 'c' },
                { name: 'Especiales', value: 'es' },
                { name: 'Epicos', value: 'ep' },
                { name: 'Miticos', value: 'm' },
                { name: 'Legendario', value: 'l' },
                { name: 'Arcoiris', value: 'a' },
            )
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option
            .setName('cantidad')
            .setDescription('Cantidad Fragmentos')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('remover')
        .setDescription('Remover Fragmentos')
        .addUserOption(option => 
            option
            .setName('usuario')
            .setDescription('Usuario que seas mirar')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('tipo')
            .setDescription('Tipo de Fragmento')
            .addChoices(
                { name: 'Comun', value: 'c' },
                { name: 'Especiales', value: 'es' },
                { name: 'Epicos', value: 'ep' },
                { name: 'Miticos', value: 'm' },
                { name: 'Legendario', value: 'l' },
                { name: 'Arcoiris', value: 'a' },
            )
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option
            .setName('cantidad')
            .setDescription('Cantidad Fragmentos')
            .setRequired(true)
        )
    ),

    async execute(interaction, client) {

        if(interaction.options.getSubcommand() === 'ver') {

            const data = await schema.findOne({ Usuario: interaction.user.id })

            if(!data) {
                interaction.reply('No tienes ningún fragmento!')
            } else {
                const embed = new EmbedBuilder()
                .setColor('#c03498')
                .setTitle(`Fragmentos de ${interaction.user.displayName}`)
                .setImage('https://media.discordapp.net/attachments/936591912079618089/1182060021253669026/Fragmentos_KNX.png?ex=6583522e&is=6570dd2e&hm=a43c6a2e66911fd664ce122352fe45f56c73868476eb35ea6b4012c265580ab4&=&format=webp&quality=lossless&width=768&height=256')
                .setThumbnail(interaction.member.displayAvatarURL())
                .setDescription('<a:Estrellas10:1156946836691619930> *Colecciona la mayor cantidad de fragmentos posibles y obtén recompensas especiales* <a:Estrellas10:1156946836691619930>')
                .addFields(
                    { name: 'Fragmentos Comunes', value: `- <a:Estrellas10:1156946836691619930> ${data.Comunes}`, inline: true },
                    { name: 'Fragmentos Especiales', value: `- <a:Estrellas2:1074116785713983600> ${data.Especiales}`, inline: true },
                    { name: 'Fragmentos Epicos', value: `- <a:Estrellas3:1074116929029144706> ${data.Epicos}`, inline: true },
                    { name: 'Fragmentos Miticos', value: `- <a:Estrellas10:1156946836691619930> ${data.Miticos}`, inline: true },   
                    { name: 'Fragmentos Legendarios', value: `- <a:Estrellas2:1074116785713983600> ${data.Legendarios}`, inline: true },
                    { name: 'Fragmentos Arcoiris', value: `- <a:Estrellas3:1074116929029144706> ${data.Arcoiris}`, inline: true },
                )
                interaction.reply({ embeds: [embed]})
            }

        } else if(interaction.options.getSubcommand() === 'agregar') {
            if(!interaction.member.roles.cache.get('713630122141286440')) return interaction.reply({ content: 'No tienes permisos para usar este comando', ephemeral: true })

            const tipo = await interaction.options.getString('tipo')
            const usuario = await interaction.options.getUser('usuario')
            const cantidad = await interaction.options.getInteger('cantidad')
            const data = await schema.findOne({ Usuario: usuario.id })

            if(tipo=== "c") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        Comunes: cantidad,
                        Especiales: 0,
                        Epicos: 0,
                        Miticos: 0,
                        Legendarios: 0,
                        Arcoiris: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Comunes a ${usuario.username}`})
                } 

                if(data) {
                    data.Comunes = data.Comunes + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Comunes a ${usuario.username}`})
                }

            } else if(tipo=== "es") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        Comunes: 0,
                        Especiales: cantidad,
                        Epicos: 0,
                        Miticos: 0,
                        Legendarios: 0,
                        Arcoiris: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Especiales a ${usuario.username}`})
                } 

                if(data) {
                    data.Especiales = data.Especiales + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Especiales a ${usuario.username}`})
                }

            } else if(tipo=== "ep") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        Comunes: 0,
                        Especiales: 0,
                        Epicos: cantidad,
                        Miticos: 0,
                        Legendarios: 0,
                        Arcoiris: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Epicos a ${usuario.username}`})
                } 

                if(data) {
                    data.Epicos = data.Epicos + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Epicos a ${usuario.username}`})
                }

            } else if(tipo=== "m") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        Comunes: 0,
                        Especiales: 0,
                        Epicos: 0,
                        Miticos: cantidad,
                        Legendarios: 0,
                        Arcoiris: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Miticos a ${usuario.username}`})
                } 

                if(data) {
                    data.Miticos = data.Miticos + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Miticos a ${usuario.username}`})
                }

            } else if(tipo=== "l") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        Comunes: 0,
                        Especiales: 0,
                        Epicos: 0,
                        Miticos: 0,
                        Legendarios: cantidad,
                        Arcoiris: 0,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Legendarios a ${usuario.username}`})
                } 

                if(data) {
                    data.Legendarios = data.Legendarios + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Legendarios a ${usuario.username}`})
                }

            } else if(tipo=== "a") {
                if(!data) {
                    await schema.create({
                        Usuario: usuario.id,
                        Comunes: 0,
                        Especiales: 0,
                        Epicos: 0,
                        Miticos: 0,
                        Legendarios: 0,
                        Arcoiris: cantidad,
                    })

                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Arcoiris a ${usuario.username}`})
                } 

                if(data) {
                    data.Arcoiris = data.Arcoiris + cantidad;
                    data.save()
                    interaction.reply({ content: `Agregado **${cantidad}** de Fragmentos Arcoiris a ${usuario.username}`})
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
                if(tipo=== "c") {
                    data.Comunes = data.Comunes - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Fragmentos Comunes a ${usuario.username}`})
                } else if(tipo=== "es") {
                    data.Especiales = data.Especiales - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Fragmentos Especiales a ${usuario.username}`})
                } else if(tipo=== "ep") {
                    data.Epicos = data.Epicos - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Fragmentos Epicos a ${usuario.username}`})
                } else if(tipo=== "m") {
                    data.Miticos = data.Miticos - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Fragmentos Miticos a ${usuario.username}`})
                } else if(tipo=== "l") {
                    data.Legendarios = data.Legendarios - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Fragmentos Legendarios a ${usuario.username}`})
                } else if(tipo=== "a") {
                    data.Arcoiris = data.Arcoiris - cantidad;
                    data.save()
                    interaction.reply({ content: `Removido **${cantidad}** de Fragmentos Arcoiris a ${usuario.username}`})
                }
            }
            
        }
    }
}