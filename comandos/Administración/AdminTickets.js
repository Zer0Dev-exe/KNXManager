const { SlashCommandBuilder, ButtonStyle, PermissionFlagsBits, ActionRowBuilder, EmbedBuilder, SelectMenuBuilder, ButtonBuilder, PermissionsBitField } = require('discord.js');

const ticketSchema = require('../../Schemas/ticketGuildSchema.js')
const ticketSoporte = require('../../Schemas/ticketSupportSchema.js')
const ticketReporte = require('../../Schemas/ticketReportSchema.js')
const ticketSorteo = require('../../Schemas/ticketSorteoSchema.js')
const ticketDiscord = require('../../Schemas/ticketDiscordSchema.js')
const ticketTwitch = require('../../Schemas/ticketTwitchSchema.js')
const ticketDrop = require('../../Schemas/ticketDropSchema.js')
const { createTranscript } = require('discord-html-transcripts');

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Comandos de Ticket')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
    .addSubcommand(subcommand =>
        subcommand
        .setName('cerrar')
        .setDescription('Cerrar Ticket')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('eliminar')
        .setDescription('Eliminar Ticket')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('deletedata')
        .setDescription('Eliminar data de ticket')
        .addStringOption(option =>
            option
            .setName('tipo-ticket')
            .setDescription('El tipo de ticket que se cerro mal')
            .addChoices(
                { name: 'Ticket Soporte', value: 'tdsoporte' },
                { name: 'Ticket Reporte', value: 'tdreporte' },
                { name: 'Ticket Sorteo', value: 'tdsorteo' },
                { name: 'Ticket Drop', value: 'tdrop' },
                { name: 'Ticket Postulacion', value: 'tpost'}
            )
            .setRequired(true)
        )
        .addUserOption(option =>
            option
            .setName('usuario')
            .setDescription('Usuario que no puede abrir ticket')
            .setRequired(true)
        )
    ),

    async execute(interaction, client) {

        if (interaction.options.getSubcommand() == 'cerrar') {

            if(!interaction.member.roles.cache.has("713630122141286440")) return interaction.reply({ content: "No eres staff para usar este comando", ephemeral: true })

            if(interaction.channel.parentId == "1130881317886775337") { //SOPORTE

                let data2 = await ticketSoporte.findOne({ channelId: interaction.channel.id })
                let username = interaction.guild.members.cache.get(data2.openBy).user.username
                let openBy = interaction.guild.members.cache.get(data2.openBy)

                await interaction.channel.setName(`❌・soporte-${username}`)
                await interaction.reply({ content: 'Ticket cerrado exitosamente', ephemeral: true })
                await wait(1000)
                const opiniones = new ActionRowBuilder()
                    .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('osorteo')
                    .setPlaceholder('Califica el soporte recibido ⭐')
                    .addOptions([
                    {
                        label: '1',
                        emoji: '⭐',
                        value: '1',
                    },
                    {
                        label: '2',
                        emoji: '⭐',
                        value: '2',
                    },
                    {
                        label: '3',
                        emoji: '⭐',
                        value: '3',
                    },
                    {
                        label: '4',
                        emoji: '⭐',
                        value: '4'
                    },
                    {
                        label: '5',
                        emoji: '⭐',
                        value: '5'
                    }


                    ]),
                    )

                await interaction.channel.send({ content: `Ya hemos casi terminado de atenderte ${openBy} pon la valoración de ticket que desees.`, components: [opiniones], allowedMentions:{parse: ['users']}})
                await wait(5000)
                await ticketSoporte.findOneAndDelete({guildId: interaction.guild.id, channelId: interaction.channel.id})
                

            } else if(interaction.channel.parentId == "1130881362191196181") { //SORTEOS

                let data2 = await ticketSorteo.findOne({ channelId: interaction.channel.id })
                let username = interaction.guild.members.cache.get(data2.openBy).user.username
                let openBy = interaction.guild.members.cache.get(data2.openBy)

                await interaction.channel.setName(`❌・sorteo-${username}`)
                await interaction.reply({ content: 'Ticket cerrado exitosamente', ephemeral: true })
                await wait(1000)
                const opiniones = new ActionRowBuilder()
                    .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('osorteo')
                    .setPlaceholder('Califica el soporte recibido ⭐')
                    .addOptions([
                    {
                        label: '1',
                        emoji: '⭐',
                        value: '1',
                    },
                    {
                        label: '2',
                        emoji: '⭐',
                        value: '2',
                    },
                    {
                        label: '3',
                        emoji: '⭐',
                        value: '3',
                    },
                    {
                        label: '4',
                        emoji: '⭐',
                        value: '4'
                    },
                    {
                        label: '5',
                        emoji: '⭐',
                        value: '5'
                    }


                    ]),
                    )

                await interaction.channel.send({ content: `Ya hemos casi terminado de atenderte ${openBy} pon la valoración de ticket que desees.`, components: [opiniones], allowedMentions:{parse: ['users']}})
                await wait(5000)
                await ticketSorteo.findOneAndDelete({guildId: interaction.guild.id, channelId: interaction.channel.id})


            } else if(interaction.channel.parentId == "1131148371508330497") { // REPORTES

                let data2 = await ticketReporte.findOne({ channelId: interaction.channel.id })
                let username = interaction.guild.members.cache.get(data2.openBy).user.username
                let openBy = interaction.guild.members.cache.get(data2.openBy)

                await interaction.channel.setName(`❌・reporte-${username}`)
                await interaction.reply({ content: 'Ticket cerrado exitosamente', ephemeral: true })
                await wait(1000)
                const opiniones = new ActionRowBuilder()
                    .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('osorteo')
                    .setPlaceholder('Califica el soporte recibido ⭐')
                    .addOptions([
                    {
                        label: '1',
                        emoji: '⭐',
                        value: '1',
                    },
                    {
                        label: '2',
                        emoji: '⭐',
                        value: '2',
                    },
                    {
                        label: '3',
                        emoji: '⭐',
                        value: '3',
                    },
                    {
                        label: '4',
                        emoji: '⭐',
                        value: '4'
                    },
                    {
                        label: '5',
                        emoji: '⭐',
                        value: '5'
                    }


                    ]),
                    )

                await interaction.channel.send({ content: `Ya hemos casi terminado de atenderte ${openBy} pon la valoración de ticket que desees.`, components: [opiniones], allowedMentions:{parse: ['users']}})
                await wait(5000)
                await ticketReporte.findOneAndDelete({guildId: interaction.guild.id, channelId: interaction.channel.id})

            } else {

                interaction.reply({ content: 'Este canal no es un ticket', ephemeral: true })

            }
        //ELIMINAR 
        } else if (interaction.options.getSubcommand() == 'eliminar') {

            const canalLogs = client.channels.cache.get('856197363781074944')
            const canalPost = client.channels.cache.get('1093188404415570002')
            const espera = require('node:timers/promises').setTimeout;

            if(interaction.channel.parentId == "1132045544248848599") { // DROP

                if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "No tienes suficientes permisos, necesitas tener <@&725731790333149197>.", ephemeral: true })

                const transcript = await createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    filename: `${interaction.channel.name}.html`,
                });

                const log = new EmbedBuilder()
                    .setTitle(`Ticket cerrado por ${interaction.user.username}`)
                    .addFields(
                        { name: 'Nombre', value: `${interaction.channel.name}`}
                    )
                    .setTimestamp()
                
                const msg = await canalLogs.send({ files: [transcript]})

                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel('Abrir')
                        .setURL(`https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link),
    
                        new ButtonBuilder()
                        .setLabel('Descargar')
                        .setURL(`${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link)
                    )

                interaction.reply({ content: 'Eliminando canal en 10segundos' })
                await canalLogs.send({ embeds: [log], components: [boton] }).catch(err => {
                return;
                })
                await espera(10000)
                await ticketDrop.findOneAndDelete({guildId: interaction.guild.id, channelId: interaction.channel.id})
                await interaction.channel.delete()
                
            } else if(interaction.channel.parentId == "1130881317886775337") { // SOPORTE

                if(!interaction.member.roles.cache.has("700889141340143616")) return interaction.reply({ content: "No tienes suficientes permisos, necesitas tener <@&700889141340143616>.", ephemeral: true })

                const transcript = await createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    filename: `${interaction.channel.name}.html`,
                });

                const log = new EmbedBuilder()
                    .setTitle(`Ticket cerrado por ${interaction.user.username}`)
                    .addFields(
                        { name: 'Nombre', value: `${interaction.channel.name}`}
                    )
                    .setTimestamp()
                
                const msg = await canalLogs.send({ files: [transcript]})

                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel('Abrir')
                        .setURL(`https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link),
    
                        new ButtonBuilder()
                        .setLabel('Descargar')
                        .setURL(`${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link)
                    )

                interaction.reply({ content: 'Eliminando canal en 10segundos' })
                await canalLogs.send({ embeds: [log], components: [boton] }).catch(err => {
                return;
                })
                await espera(10000)
                await interaction.channel.delete()



            } else if(interaction.channel.parentId == "1131148371508330497") { // REPORTE

                if(!interaction.member.roles.cache.has("700889141340143616")) return interaction.reply({ content: "No tienes suficientes permisos, necesitas tener <@&700889141340143616>.", ephemeral: true })

                const transcript = await createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    filename: `${interaction.channel.name}.html`,
                });

                const log = new EmbedBuilder()
                    .setTitle(`Ticket cerrado por ${interaction.user.username}`)
                    .addFields(
                        { name: 'Nombre', value: `${interaction.channel.name}`}
                    )
                    .setTimestamp()
                
                const msg = await canalLogs.send({ files: [transcript]})

                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel('Abrir')
                        .setURL(`https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link),
    
                        new ButtonBuilder()
                        .setLabel('Descargar')
                        .setURL(`${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link)
                    )

                interaction.reply({ content: 'Eliminando canal en 10segundos' })
                await canalLogs.send({ embeds: [log], components: [boton] }).catch(err => {
                return;
                })
                await espera(10000)
                await interaction.channel.delete()

            } else if(interaction.channel.parentId == "1130881362191196181") { // SORTEO

                if(!interaction.member.roles.cache.has("700889141340143616")) return interaction.reply({ content: "No tienes suficientes permisos, necesitas tener <@&700889141340143616>.", ephemeral: true })

                const transcript = await createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    filename: `${interaction.channel.name}.html`,
                });

                const log = new EmbedBuilder()
                    .setTitle(`Ticket cerrado por ${interaction.user.username}`)
                    .addFields(
                        { name: 'Nombre', value: `${interaction.channel.name}`}
                    )
                    .setTimestamp()
                
                const msg = await canalLogs.send({ files: [transcript]})

                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel('Abrir')
                        .setURL(`https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link),
    
                        new ButtonBuilder()
                        .setLabel('Descargar')
                        .setURL(`${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link)
                    )

                interaction.reply({ content: 'Eliminando canal en 10segundos' })
                await canalLogs.send({ embeds: [log], components: [boton] }).catch(err => {
                return;
                })
                await espera(10000)
                await interaction.channel.delete()
                
            } else if(interaction.channel.parentId == "1130881384710406144") { // POSTULACION

                if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "No tienes suficientes permisos, necesitas tener <@&725731790333149197>.", ephemeral: true })

                const transcript = await createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    filename: `${interaction.channel.name}.html`,
                });

                const log = new EmbedBuilder()
                    .setTitle(`Ticket cerrado por ${interaction.user.username}`)
                    .addFields(
                        { name: 'Nombre', value: `${interaction.channel.name}`}
                    )
                    .setTimestamp()
                
                const msg = await canalPost.send({ files: [transcript]})

                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel('Abrir')
                        .setURL(`https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link),
    
                        new ButtonBuilder()
                        .setLabel('Descargar')
                        .setURL(`${msg.attachments.first()?.url}`)
                        .setStyle(ButtonStyle.Link)
                    )

                interaction.reply({ content: 'Eliminando canal en 10segundos' })
                await ticketDiscord.deleteMany({guildId: interaction.guild.id, channelId: interaction.channel.id})
                await ticketTwitch.deleteMany({guildId: interaction.guild.id, channelId: interaction.channel.id})
                await canalPost.send({ embeds: [log], components: [boton] })
                await espera(10000)
                await interaction.channel.delete()
                
            } else {
                interaction.reply({ content: 'Este canal no es un ticket', ephemeral: true })
            }

        } else if (interaction.options.getSubcommand() == 'deletedata') {

            if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "No tienes suficientes permisos, necesitas tener <@&713630122141286440>.", ephemeral: true })

            const tipo = interaction.options.getString('tipo-ticket')
            const usuario = interaction.options.getUser('usuario')

            if(tipo == 'tdsoporte' ) {

                const data = await ticketSoporte.findOne({ guildId: interaction.guild.id, openBy: usuario.id })

                if(!data) {
                    interaction.reply({ content: 'No tiene tickets mal cerrados este usuario', ephemeral: true })
                }

                if(data) {
                    await ticketSoporte.deleteMany({ guildId: interaction.guild.id, openBy: usuario.id })
                    await interaction.reply({ content: 'Se ha removido todos los tickets mal cerrados de este usuario', ephemeral: true })
                }

            } else if(tipo == 'tdreporte' ) {
                
                const data = await ticketReporte.findOne({ guildId: interaction.guild.id, openBy: usuario.id })

                if(!data) {
                    interaction.reply({ content: 'No tiene tickets mal cerrados este usuario', ephemeral: true })
                }

                if(data) {
                    await ticketReporte.deleteMany({ guildId: interaction.guild.id, openBy: usuario.id })
                    await interaction.reply({ content: 'Se ha removido todos los tickets mal cerrados de este usuario', ephemeral: true })
                }

            } else if(tipo == 'tdsorteo' ) {
                
                const data = await ticketSorteo.deleteMany({ guildId: interaction.guild.id, openBy: usuario.id })

                if(!data) {
                    interaction.reply({ content: 'No tiene tickets mal cerrados este usuario', ephemeral: true })
                }

                if(data) {
                    await ticketSorteo.findOneAndDelete({ guildId: interaction.guild.id, openBy: usuario.id })
                    await interaction.reply({ content: 'Se ha removido todos los tickets mal cerrados de este usuario', ephemeral: true })
                }

            } else if(tipo == 'tdrop' ) {

                const data = await ticketDrop.findOne({ guildId: interaction.guild.id, openBy: usuario.id })

                if(!data) {
                    interaction.reply({ content: 'No tiene tickets mal cerrados este usuario', ephemeral: true })
                }

                if(data) {
                    await ticketDrop.deleteMany({ guildId: interaction.guild.id, openBy: usuario.id })
                    await interaction.reply({ content: 'Se ha removido todos los tickets mal cerrados de este usuario', ephemeral: true })
                }
            } else if(tipo == 'tpost' ) {

                await ticketDiscord.deleteMany({ guildId: interaction.guild.id, openBy: usuario.id })
                await ticketTwitch.deleteMany({ guildId: interaction.guild.id, openBy: usuario.id })
                await interaction.reply({ content: 'Se ha removido todos los tickets mal cerrados de este usuario', ephemeral: true })
            }
        }
    }
}