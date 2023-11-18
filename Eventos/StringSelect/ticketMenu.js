const {PermissionFlagsBits, ButtonStyle, ActionRowBuilder, ButtonBuilder, ChannelType, EmbedBuilder } = require('discord.js')

const ticketSchema = require('../../Schemas/ticketGuildSchema')
const ticketSoporte = require('../../Schemas/ticketSupportSchema.js')
const ticketReporte = require('../../Schemas/ticketReportSchema.js')
const ticketSorteo = require('../../Schemas/ticketSorteoSchema.js')

const client = require("../../index.js")
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const {customId} = interaction

        if (interaction.customId == "claim-support") {

            if(!interaction.member.roles.cache.get('713630122141286440')) return interaction.reply({ content: 'No tienes permisos para usar este boton', ephemeral: true })
            let data = await ticketSoporte.findOne({ channelId: interaction.channel.id })

            if (data && data?.channelId == interaction.channel.id) {
                    if (data.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true })

                    data.claimed = true
                    data.claimer = interaction.user.id
                    await data.save()
                    data = await ticketSoporte.findOne({ channelId: interaction.channel.id })
            }

    
            const embed = new EmbedBuilder()
            .setTitle(`Ticket Reclamado por ${interaction.user.username}`)
            .setDescription(`${interaction.user.username} será el encargado de este Ticket, te guiará con tus dudas hasta el final de este ticket, gracias por contactarnos.`)
            .setColor('#4decfe')
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
            interaction.reply({ embeds: [embed] })

            let username = interaction.guild.members.cache.get(data.openBy).user.username

            let openBy = interaction.guild.members.cache.get(data.openBy)

            interaction.channel.edit({
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny:[PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: interaction.member.id,
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: '713630122141286440',
                        deny:[PermissionFlagsBits.SendMessages],
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: openBy.id,
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: '713630122141286440',
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages]
                    },
                ]
            })

            interaction.channel.setName(`📌・soporte-${username}`)

        }
        //RECLAMAR REPORTE
        if (interaction.customId == "claim-reporte") {

            if(!interaction.member.roles.cache.get('713630122141286440')) return interaction.reply({ content: 'No tienes permisos para usar este boton', ephemeral: true })

            let data2 = await ticketReporte.findOne({ channelId: interaction.channel.id })

            if (data2 && data2?.channelId == interaction.channel.id) {
                if (data2.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true  })

                data2.claimed = true
                data2.claimer = interaction.user.id
                await data2.save()
                data2 = await ticketReporte.findOne({ channelId: interaction.channel.id })
            }

    
            const embed = new EmbedBuilder()
            .setTitle(`Ticket Reclamado por ${interaction.user.username}`)
            .setDescription(`${interaction.user.username} será el encargado de este Ticket, te guiará con tus dudas hasta el final de este ticket, gracias por contactarnos.`)
            .setColor('#4decfe')
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
            interaction.reply({ embeds: [embed] })

            let username = interaction.guild.members.cache.get(data2.openBy).user.username

            let openBy = interaction.guild.members.cache.get(data2.openBy)

            interaction.channel.edit({
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny:[PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: interaction.member.id,
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: '713630122141286440',
                        deny:[PermissionFlagsBits.SendMessages],
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: openBy.id,
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: '713630122141286440',
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages]
                    },
                ]
            })

            interaction.channel.setName(`📌・reporte-${username}`)
        }  

        if (interaction.customId == "claim-sorteo") {

            if(!interaction.member.roles.cache.get('713630122141286440')) return interaction.reply({ content: 'No tienes permisos para usar este boton', ephemeral: true })

            let data4 = await ticketSorteo.findOne({ channelId: interaction.channel.id })

            if (data4 && data4?.channelId == interaction.channel.id) {
                if (data4.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true  })

                data4.claimed = true
                data4.claimer = interaction.user.id
                await data4.save()
                data4 = await ticketSorteo.findOne({ channelId: interaction.channel.id })
            }
    
            const embed = new EmbedBuilder()
            .setTitle(`Ticket Reclamado por ${interaction.user.username}`)
            .setDescription(`${interaction.user.username} será el encargado de este Ticket, te guiará con tus dudas hasta el final de este ticket, gracias por contactarnos.`)
            .setColor('#4decfe')
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
            interaction.reply({ embeds: [embed] })

            let username = interaction.guild.members.cache.get(data4.openBy).user.username

            let openBy = await interaction.guild.members.cache.get(data4.openBy)

            interaction.channel.edit({
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny:[PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: interaction.member.id,
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: '713630122141286440',
                        deny:[PermissionFlagsBits.SendMessages],
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: openBy.id,
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: '713630122141286440',
                        allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages]
                    },
                ]
            })

            interaction.channel.setName(`📌・sorteo-${username}`)
        }

        if (interaction.customId == "ping-staff-soporte") {
            let data = await ticketSoporte.findOne({ channelId: interaction.channel.id })

            if (data && data?.channelId == interaction.channel.id) {
                    if (data.pinged == true) return interaction.reply({ content: `Ya has usado una vez este botón`, ephemeral: true })

                    data.pinged = true
                    await data.save()
                    data = await ticketSoporte.findOne({ channelId: interaction.channel.id })
            }

            await interaction.reply({ content: 'Mencionando a los Staff...', ephemeral: true })
            await wait(5000);
            await interaction.editReply({ content: 'Mencionado exitosamente, espera un poco.', ephemeral: true })
            await interaction.channel.send({ content: '<@&713630122141286440>', allowedMentions:{parse: ['roles']} })
        }

        if (interaction.customId == "ping-staff-reporte") {
            let data2 = await ticketReporte.findOne({ channelId: interaction.channel.id })

            if (data2 && data2?.channelId == interaction.channel.id) {
                    if (data2.pinged == true) return interaction.reply({ content: `Ya has usado una vez este botón`, ephemeral: true })

                    data2.pinged = true
                    await data2.save()
                    data2 = await ticketReporte.findOne({ channelId: interaction.channel.id })
            }

            await interaction.reply({ content: 'Mencionando a los Staff...', ephemeral: true })
            await wait(5000);
            await interaction.editReply({ content: 'Mencionado exitosamente, espera un poco.', ephemeral: true })
            await interaction.channel.send({ content: '<@&713630122141286440>', allowedMentions:{parse: ['roles']} })
        }

        if (interaction.customId == "ping-staff-sorteo") {
            let data3 = await ticketSorteo.findOne({ channelId: interaction.channel.id })

            if (data3 && data3?.channelId == interaction.channel.id) {
                    if (data3.pinged == true) return interaction.reply({ content: `Ya has usado una vez este botón`, ephemeral: true })

                    data3.pinged = true
                    await data3.save()
                    data3 = await ticketReporte.findOne({ channelId: interaction.channel.id })
            }

            await interaction.reply({ content: 'Mencionando a los Staff...', ephemeral: true })
            await wait(5000);
            await interaction.editReply({ content: 'Mencionado exitosamente, espera un poco.', ephemeral: true })
            await interaction.channel.send({ content: '<@&713630122141286440>', allowedMentions:{parse: ['roles']} })
        }

        if(interaction.isStringSelectMenu && customId === 'tickets'){
            const valor = interaction.values[0]
            const ticketData = await ticketSchema.findOne({guildId: interaction.guild.id})
            if(!ticketData) return interaction.reply({ content: 'No se ha creado el sistema de Tickets', ephemeral: true })
            switch (valor) {
                case 'soporte':
                    const soporteData = await ticketSoporte.findOne({guildId: interaction.guild.id, openBy: interaction.user.id, open: true })
                    if(soporteData) {
                        return interaction.reply({ content: 'Tienes un ticket creado desde antes', ephemeral: true })
                    } else {
                        const ticketSoporteUser = await interaction.guild.channels.create({
                            name:`🔰・soporte-${interaction.user.username}`,
                            type:ChannelType.GuildText,
                            parent:ticketData.categorySoporte,
                            permissionOverwrites: [
                                {
                                    id: ticketData.everyoneRol,
                                    deny:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: interaction.guild.roles.everyone.id,
                                    deny:[PermissionFlagsBits.ViewChannel]
                                },
                                {
                                    id: interaction.member.id,
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: ticketData.handlerRol,
                                    deny:[PermissionFlagsBits.SendMessages],
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: ticketData.supervisor,
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages]
                                },

                            ],
                        }).then(async (channel) => {
                            const newTicketSchema = await ticketSoporte.create({
                                guildId: interaction.guild.id,
                                membersId: interaction.member.id,
                                channelId: channel.id,
                                openBy: interaction.user.id,
                            })
                            const embed = new EmbedBuilder()
                            .setColor("#fa494c")
                            .setDescription(`## Ticket de ${interaction.user.username}\n\n<a:Estrellas3:1074116929029144706> En un momento un staff atenderá tu ticket, mientras tanto ve describiendo en que te podemos ayudar <a:Estrellas3:1074116929029144706>\n\n <:Hola:1131272271332376667> **Pulsa en Ping Staff si deseas mencionar a los Staff.**`)
                            .setThumbnail(`${interaction.user.avatarURL()}`)
                            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` })
    
                            const button = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId('claim-support')
                                .setLabel('Reclamar Ticket')
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji('📌'),
                                new ButtonBuilder()
                                .setCustomId('ping-staff-soporte')
                                .setLabel('Ping Staff')
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji('🔔')
                            )

                            interaction.reply({ content: `Tu ticket ha sido exitosamente creado en ${channel}`, ephemeral: true })
    
                            await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [button], allowedMentions:{parse: ['users'] } }).then(async (msg) => {
                                    await ticketSoporte.findOneAndUpdate({ channelId: channel.id }, { $set: { messageID: msg.id } })
                            })
                        })


                    break;
                    }
            
                case 'reporte':

                const reporteData = await ticketReporte.findOne({guildId: interaction.guild.id, openBy: interaction.user.id, open: true })
                    if(reporteData) {
                        return interaction.reply({ content: `Tienes un ticket creado actualmente.`, ephemeral: true })
                    } else {
                        await interaction.guild.channels.create({
                            name:`⛔・reporte-${interaction.user.username}`,
                            type:ChannelType.GuildText,
                            parent:ticketData.categoryReporte,
                            permissionOverwrites: [
                                {
                                    id: ticketData.everyoneRol,
                                    deny:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: interaction.guild.roles.everyone.id,
                                    deny:[PermissionFlagsBits.ViewChannel]
                                },
                                {
                                    id: interaction.member.id,
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: ticketData.handlerRol,
                                    deny:[PermissionFlagsBits.SendMessages],
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                }
                            ],
                        }).then(async (channel) => {
                            const newTicketSchema = await ticketReporte.create({
                                guildId: interaction.guild.id,
                                membersId: interaction.member.id,
                                channelId: channel.id,
                                closed: false,
                                open: true,
                                openBy: interaction.user.id
                            })
                            const embed = new EmbedBuilder()
                            .setColor("#4673fc")
                            .setTitle(`Ticket de ${interaction.user.username}`)
                            .setThumbnail(`${interaction.user.avatarURL()}`)
                            .setDescription(`Bienvenido al ticket **${interaction.user.username}**, espera a que un miembro del staff te atienda el ticket, de mientras yo mencionaré a los Staff para que vengan a ayudarte con tu motivo de ticket.`)
                            .addFields(
                                {
                                    name: '<a:Estrellas2:1074116785713983600> ¿ID del usuario? <a:Estrellas5:1074117495079833703> ',
                                    value: 'Esto ayudará a acelerar el proceso'
                                },
                                {
                                    name: '<a:Estrellas5:1074117495079833703> ¿Pruebas? <a:Estrellas2:1074116785713983600>',
                                    value: 'Para asegurarnos de que realmente es real el caso'
                                }
                            )
                            .setFooter({ text: `Sistema de Tickets ${interaction.guild.name}.`, iconURL: `${interaction.guild.iconURL()}` })
    
                            const button = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId('claim-reporte')
                                .setLabel('Reclamar Ticket')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji('📌'),
                                new ButtonBuilder()
                                .setCustomId('ping-staff-reporte')
                                .setLabel('Ping Staff')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji('🔔')
                            )

                            interaction.reply({ content: `Tu ticket ha sido exitosamente creado en ${channel}`, ephemeral: true })
    
                            await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [button], allowedMentions:{parse: ['users'] } }).then(async (msg) => {
                                await ticketReporte.findOneAndUpdate({ channelId: channel.id }, { $set: { messageID: msg.id } })
                        })
                        })
                    break;
                    }

                case 'sorteo' :
                    const sorteoData = await ticketSorteo.findOne({guildId: interaction.guild.id, openBy: interaction.user.id, open: true })
                    if(sorteoData) {
                        return interaction.reply({ content: 'Tienes un ticket creado desde antes', ephemeral: true })
                    } else {
                        await interaction.guild.channels.create({
                            name:`🎉・sorteo-${interaction.user.username}`,
                            type:ChannelType.GuildText,
                            parent:ticketData.categorySorteos,
                            permissionOverwrites: [
                                {
                                    id: ticketData.everyoneRol,
                                    deny:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: interaction.guild.roles.everyone.id,
                                    deny:[PermissionFlagsBits.ViewChannel]
                                },
                                {
                                    id: interaction.member.id,
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: ticketData.handlerRol,
                                    deny:[PermissionFlagsBits.SendMessages],
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: ticketData.supervisor,
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages]
                                },

                            ],
                        }).then(async (channel) => {
                            const newTicketSchema = await ticketSorteo.create({
                                guildId: interaction.guild.id,
                                membersId: interaction.member.id,
                                channelId: channel.id,
                                openBy: interaction.user.id,
                            })
                            const embed = new EmbedBuilder()
                            .setColor("#f29c67")
                            .setDescription(`## Ticket de ${interaction.user.username}\n\n<a:Estrellas5:1074117495079833703> En un momento serás atendido por un Staff, por abrir el ticket ya se te dará por valido el tiempo de reclamo en el sorteo, por lo que no debes de preocuparte en ese aspecto. <a:Estrellas5:1074117495079833703>`)
                            .setThumbnail(`${interaction.user.avatarURL()}`)
                            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.user.avatarURL()}` })
    
                            const button = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId('claim-sorteo')
                                .setLabel('Reclamar Ticket')
                                .setStyle(ButtonStyle.Success)
                                .setEmoji('📌'),
                                new ButtonBuilder()
                                .setCustomId('ping-staff-sorteo')
                                .setLabel('Ping Staff')
                                .setStyle(ButtonStyle.Success)
                                .setEmoji('🔔')
                            )

                            interaction.reply({ content: `Tu ticket ha sido exitosamente creado en ${channel}`, ephemeral: true })
    
                            await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [button], allowedMentions:{parse: ['users'] } }).then(async (msg) => {
                                    await ticketSoporte.findOneAndUpdate({ channelId: channel.id }, { $set: { messageID: msg.id } })
                            })
                        })

                    break;
                    }
            }

        }
    }
}