const {PermissionFlagsBits, ButtonStyle, ActionRowBuilder, ButtonBuilder, ChannelType, EmbedBuilder } = require('discord.js')

const ticketSchema = require('../../Schemas/ticketGuildPostulaciones.js')
const ticketTwitch = require('../../Schemas/ticketTwitchSchema.js')
const ticketDiscord = require('../../Schemas/ticketDiscordSchema.js')

const client = require("../../index.js")
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const {customId} = interaction

        if (interaction.customId == "claim-discord") {

            const directorstaff = new EmbedBuilder()
            .setAuthor({ name: `Tu Ticket Ha Sido Asignado`, iconURL: `${interaction.user.avatarURL()}`})
            .setTitle(`*El Ticket ha sido Asignado a un Director de Staff*`)
            .setDescription(`*Director Staff:* ${interaction.user.username}`)
            .addFields(
                { name: 'Rol', value: `<@&1126220413584818236>`}
            )
            .setColor(interaction.member.displayColor)
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            const director = new EmbedBuilder()
            .setAuthor({ name: `Tu Ticket Ha Sido Asignado`, iconURL: `${interaction.user.avatarURL()}`})
            .setTitle(`*El Ticket ha sido Asignado a un miembro de la Dirección*`)
            .setDescription(`*Dirección:* ${interaction.user.username}`)
            .addFields(
                { name: 'Rol', value: `<@&725731790333149197>`}
            )
            .setColor(interaction.member.displayColor)
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            const admin = new EmbedBuilder()
            .setAuthor({ name: `Tu Ticket Ha Sido Asignado`, iconURL: `${interaction.user.avatarURL()}`})
            .setTitle(`*El Ticket ha sido Asignado a un Administrador*`)
            .setDescription(`*Administrador:* ${interaction.user.username}`)
            .addFields(
                { name: 'Rol', value: `<@&700884332759482409>`}
            )
            .setColor(interaction.member.displayColor)
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            if(!interaction.member.roles.cache.get('700884332759482409'))  {
                interaction.reply({ content: 'No tienes permisos para usar este boton', ephemeral: true})

            } else if(interaction.member.roles.cache.get('1126220413584818236'))  {
                let data = await ticketDiscord.findOne({ channelId: interaction.channel.id })

                if (data && data?.channelId == interaction.channel.id) {
                if (data.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true })

                data.claimed = true
                await data.save()
                data = await ticketDiscord.findOne({ channelId: interaction.channel.id })
                }
                interaction.reply({ embeds: [directorstaff]})

                //PARTE PERMISOS

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
                            id: openBy.id,
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                        },
                        {
                            id: '700884332759482409',
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages],
                            deny:[PermissionFlagsBits.SendMessages]
                        },
                    ]
                })

            } else if(interaction.member.roles.cache.get('725731790333149197'))  {
                let data = await ticketDiscord.findOne({ channelId: interaction.channel.id })

                if (data && data?.channelId == interaction.channel.id) {
                if (data.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true })

                data.claimed = true
                await data.save()
                data = await ticketDiscord.findOne({ channelId: interaction.channel.id })
                }
                interaction.reply({ embeds: [director]})

                //PARTE PERMISOS

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
                            id: openBy.id,
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                        },
                        {
                            id: '700884332759482409',
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages],
                            deny:[PermissionFlagsBits.SendMessages]
                        },
                    ]
                })

            } else if(interaction.member.roles.cache.get('700884332759482409'))  {
                let data = await ticketDiscord.findOne({ channelId: interaction.channel.id })

                if (data && data?.channelId == interaction.channel.id) {
                if (data.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true })

                data.claimed = true
                await data.save()
                data = await ticketDiscord.findOne({ channelId: interaction.channel.id })
                }
                interaction.reply({ embeds: [admin]})

                //PARTE PERMISOS

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
                            id: openBy.id,
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                        },
                        {
                            id: '700884332759482409',
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages],
                            deny:[PermissionFlagsBits.SendMessages]
                        },
                    ]
                })

            }
        } else if (interaction.customId == "claim-twitch") {

            const directorstaff = new EmbedBuilder()
            .setAuthor({ name: `Tu Ticket Ha Sido Asignado`, iconURL: `${interaction.user.avatarURL()}`})
            .setTitle(`*El Ticket ha sido Asignado a un Director de Staff*`)
            .setDescription(`*Director Staff:* ${interaction.user.username}`)
            .addFields(
                { name: 'Rol', value: `<@&1126220413584818236>`}
            )
            .setColor(interaction.member.displayColor)
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            const director = new EmbedBuilder()
            .setAuthor({ name: `Tu Ticket Ha Sido Asignado`, iconURL: `${interaction.user.avatarURL()}`})
            .setTitle(`*El Ticket ha sido Asignado a un miembro de la Dirección*`)
            .setDescription(`*Dirección:* ${interaction.user.username}`)
            .addFields(
                { name: 'Rol', value: `<@&725731790333149197>`}
            )
            .setColor(interaction.member.displayColor)
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            const admin = new EmbedBuilder()
            .setAuthor({ name: `Tu Ticket Ha Sido Asignado`, iconURL: `${interaction.user.avatarURL()}`})
            .setTitle(`*El Ticket ha sido Asignado a un Administrador*`)
            .setDescription(`*Administrador:* ${interaction.user.username}`)
            .addFields(
                { name: 'Rol', value: `<@&700884332759482409>`}
            )
            .setColor(interaction.member.displayColor)
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            const modtwitch = new EmbedBuilder()
            .setAuthor({ name: `Tu Ticket Ha Sido Asignado`, iconURL: `${interaction.user.avatarURL()}`})
            .setTitle(`*El Ticket ha sido Asignado a un Administrador*`)
            .setDescription(`*Administrador:* ${interaction.user.username}`)
            .addFields(
                { name: 'Rol', value: `<@&861560973198753803>`}
            )
            .setColor(interaction.member.displayColor)
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            if(!interaction.member.roles.cache.get('861560973198753803'))  {
                interaction.reply({ content: 'No tienes permisos para usar este boton', ephemeral: true})

            } else if(interaction.member.roles.cache.get('1126220413584818236'))  {

                let data = await ticketTwitch.findOne({ channelId: interaction.channel.id })

                if (data && data?.channelId == interaction.channel.id) {
                if (data.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true })

                data.claimed = true
                await data.save()
                data = await ticketTwitch.findOne({ channelId: interaction.channel.id })
                }
                interaction.reply({ embeds: [directorstaff]})

                //PARTE PERMISOS

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
                            id: openBy.id,
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                        },
                        {
                            id: '700884332759482409',
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages],
                            deny:[PermissionFlagsBits.SendMessages]
                        },
                    ]
                })

            } else if(interaction.member.roles.cache.get('725731790333149197'))  {
                let data = await ticketTwitch.findOne({ channelId: interaction.channel.id })

                if (data && data?.channelId == interaction.channel.id) {
                if (data.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true })

                data.claimed = true
                await data.save()
                data = await ticketTwitch.findOne({ channelId: interaction.channel.id })
                }
                interaction.reply({ embeds: [director]})

                //PARTE PERMISOS

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
                            id: openBy.id,
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                        },
                        {
                            id: '700884332759482409',
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages],
                            deny:[PermissionFlagsBits.SendMessages]
                        },
                    ]
                })
            } else if(interaction.member.roles.cache.get('700884332759482409'))  { //ADMin
                let data = await ticketTwitch.findOne({ channelId: interaction.channel.id })

                if (data && data?.channelId == interaction.channel.id) {
                if (data.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true })

                data.claimed = true
                await data.save()
                data = await ticketTwitch.findOne({ channelId: interaction.channel.id })
                }
                interaction.reply({ embeds: [admin]})

                //PARTE PERMISOS

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
                            id: openBy.id,
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                        },
                        {
                            id: '700884332759482409',
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages],
                            deny:[PermissionFlagsBits.SendMessages]
                        },
                    ]
                })
            } else if(interaction.member.roles.cache.get('861560973198753803'))  { // MOD TWITCh 
                let data = await ticketTwitch.findOne({ channelId: interaction.channel.id })

                if (data && data?.channelId == interaction.channel.id) {
                if (data.claimed == true) return interaction.reply({ content: `Este ticket ya está reclamado por otra persona`, ephemeral: true })

                data.claimed = true
                await data.save()
                data = await ticketTwitch.findOne({ channelId: interaction.channel.id })
                }
                interaction.reply({ embeds: [modtwitch]})

                //PARTE PERMISOS

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
                            id: openBy.id,
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                        },
                        {
                            id: '700884332759482409',
                            allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages],
                            deny:[PermissionFlagsBits.SendMessages]
                        },
                    ]
                })
            }
        }

        if(interaction.isStringSelectMenu && customId === 'ticketspsot'){
            const valor = interaction.values[0]
            const ticketData = await ticketSchema.findOne({guildId: interaction.guild.id})
            if(!ticketData) return interaction.reply({ content: 'No se ha creado el sistema de Tickets', ephemeral: true })
            switch (valor) {
                case 'twitch':
                    
                const twitchData = await ticketTwitch.findOne({guildId: interaction.guild.id, openBy: interaction.user.id, open: true })
                if(twitchData) {
                    return interaction.reply({ content: `Tienes un ticket creado desde antes`, ephemeral: true })
                } else {
                    const tTwitch = await interaction.guild.channels.create({
                        name:`❯「🟣」⠂${interaction.user.username}`,
                        type:ChannelType.GuildText,
                        parent:ticketData.categoryPostulacion,
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
                                id: ticketData.stafftwitch,
                                deny:[PermissionFlagsBits.SendMessages],
                                allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                            },
                            {
                                id: ticketData.admin,
                                allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages]
                            },
                            {
                                id: ticketData.direccion,
                                allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages]
                            },

                        ]
                        
                        ,
                    }).then(async (channel) => {
                        const newTicketSchema = await ticketTwitch.create({
                            guildId: interaction.guild.id,
                            membersId: interaction.member.id,
                            channelId: channel.id,
                            closed: false,
                            open: true,
                            openBy: interaction.user.id
                        })
                        const embed = new EmbedBuilder()
                        .setDescription(`## Ticket Postulación Staff Twitch\n\n${interaction.user} Bienvenido a las postulaciones de Staff de Twitch, a continuación encontrarás un botón donde tendrás que pulsar Postularse para empezar con la ronda de preguntas, no hay un tiempo definido por lo que tienes libertad a alargar cuanto quieras, recuerda ser profesional con las respuestas incluso si no tienes experiencia previa en Moderación de Twitch.`)
                        .setThumbnail(`${interaction.user.avatarURL()}`)
                        .setColor('#497efa')

                        const button = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setCustomId('p1-t')
                            .setLabel('Postularse')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji('1139226012048171140'),
                        )
                        interaction.reply({ content: `Tu ticket ha sido exitosamente creado en ${channel}`, ephemeral: true })

                        await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [button], allowedMentions:{parse: ['users'] } }).then(async (msg) => {
                        await ticketTwitch.findOneAndUpdate({ channelId: channel.id }, { $set: { messageID: msg.id } })
                        })
                    })

                break;
                }
                case 'discord':

                const discordData = await ticketDiscord.findOne({guildId: interaction.guild.id, openBy: interaction.user.id, open: true })
                    if(discordData) {
                        return interaction.reply({ content: `Tienes un ticket creado actualmente.`, ephemeral: true })
                    } else {
                        await interaction.guild.channels.create({
                            name:`❯「🔵」⠂${interaction.user.username}`,
                            type:ChannelType.GuildText,
                            parent:ticketData.categoryPostulacion,
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
                                    id: ticketData.admin,
                                    deny:[PermissionFlagsBits.SendMessages],
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                },
                                {
                                    id: ticketData.direccion,
                                    deny:[PermissionFlagsBits.SendMessages],
                                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                }
                            ],
                        }).then(async (channel) => {
                            const newTicketSchema = await ticketDiscord.create({
                                guildId: interaction.guild.id,
                                membersId: interaction.member.id,
                                channelId: channel.id,
                                closed: false,
                                open: true,
                                openBy: interaction.user.id
                            })
                            const embed = new EmbedBuilder()
                            .setDescription(`## Ticket Postulación Staff Discord\n\nAntes de contestar las preguntas es importante que tengas suficiente tiempo para contestar las preguntas, no se admitirá cualquier tipo de respuestas, las respuestas deberán de ser coherentes y lo suficiente explicado para que puedas ser aceptad@ en el Equipo de Staff, la disponibilidad que cuentes a la hora de rellenar este formulario también influirá mucho en el resultado, mucha suerte, empieza pulsando en el boton de Postularse.`)
                            .setThumbnail(`${interaction.user.avatarURL()}`)
                            .setColor('#1d68f0')
    
                            const button = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId('p1-d')
                                .setLabel('Postularse')
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji('1139226067454926878'),
                            )

                            interaction.reply({ content: `Tu ticket ha sido exitosamente creado en ${channel}`, ephemeral: true })
    
                            await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [button], allowedMentions:{parse: ['users'] } }).then(async (msg) => {
                                await ticketDiscord.findOneAndUpdate({ channelId: channel.id }, { $set: { messageID: msg.id } })
                        })
                        })
                    break;
                    }
                }
        }
    }
}