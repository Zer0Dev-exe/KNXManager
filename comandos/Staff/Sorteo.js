const { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ms = require('ms');
const emoji = require(`../../emoji.json`);
const gawModel = require('../../Schemas/giveawaySchema.js');
const config = require(`../../giveaway.json`);
const generateGawEmbed = require('../../Eventos/Funciones/generateGawEmbed');
const roll = require("../../Eventos/Funciones/roll.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sorteo')
    .setDescription('Comandos de Sorteos')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
    .addSubcommand(subcommand =>
        subcommand
        .setName('empezar')
        .setDescription('Empieza un sorteo en el servidor')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('terminar')
        .setDescription('Termina un sorteo en el servidor')
        .addStringOption(option =>
            option
            .setName('id-sorteo')
            .setDescription('El id del sorteo')
            .setRequired(true)
        ) 
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('reroll')
        .setDescription('Saca un nuevo ganador del sorteo')
        .addStringOption(option =>
            option
            .setName('id-sorteo')
            .setDescription('El id del sorteo')
            .setRequired(true)
        ) 
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('lista')
        .setDescription('Lislta de todos los sorteos activos')
    ),
    async execute(interaction, client) {

        var exe = false;

        let l = config.managerroles;
        l.forEach(r => {
            if (interaction.member.roles.cache.has(r)) exe = true;
        });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers) && !exe)
        return interaction.reply({ embeds: [new EmbedBuilder().setColor('Blue').setDescription('No puedes usar este comando')], fetchReply: true });

        if (interaction.options.getSubcommand() == 'empezar') {
            await interaction.deferReply({ fetchReply: true }).catch(e => null);
            const gembed = new EmbedBuilder().setThumbnail('https://media.discordapp.net/attachments/1020736180976890020/1041868280736010340/my-icon_1.png').setColor(interaction.guild.members.me.displayHexColor).setFooter({ text: 'Escribe Cancel para cancelar el sorteo' });
            let cancel = false;
            var prize = null;
            var time = 60 * 1000;
            var host = interaction.member;
            var channel = interaction.channel;
            var limit = 'infinite';
            var winnerCount = 1;
            var req = new Map();
            var multi = new Map();

            await interaction.editReply({ embeds: [gembed.setTitle('Premio Sorteo').setDescription(`Cual es el premio del sorteo?\n> Ejemplo: \`XBOX Game Pass\`\n_ _`).setColor(config.color)] });

            await interaction.channel.awaitMessages({
                filter: (i) => i.author.id == interaction.user.id,
                idle: 60000,
                max: 1
            }).then(async collected => {
                let got = collected.first();
                if (!got) {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    return;
                }
                if (got.content.toLowerCase() == 'cancel') {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                prize = got.content.slice(0, 256);
                got.delete().catch(e => null);
            });

            if (cancel) return;
            await interaction.editReply({ embeds: [gembed.setTitle('Tiempo Sorteo').setDescription(`El premio será **${prize}**\n\n Por **cuanto** tiempo quieres que el sorteo esté activo?\n> Ejemplo: 2w 5d 4h 57m 2s\n> w = semana, d = dias, h = horas, m = minutos, s = segundos`)] });

            await interaction.channel.awaitMessages({
                filter: (i) => i.author.id == interaction.user.id,
                idle: 60000,
                max: 1
            }).then(async collected => {
                let got = collected.first();
                if (!got) {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    return;
                }
                if (got.content.toLowerCase() == 'cancel') {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                if (!ms(got.content)) {
                    interaction.editReply({ embeds: [gembed.setDescription('El tiempo dado no es valido').setFooter({ text: 'La creación ha sido cancelada' })] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                if (ms(got.content) > 2419200000) {
                    interaction.editReply({ embeds: [gembed.setDescription('El tiempo dado es muy largo').setFooter({ text: 'La creación ha sido cancelada' })] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                if (ms(got.content) && ms(got.content) > 5000) time = ms(got.content);
                got.delete().catch(e => null);
            });

            if (cancel) return;
            await interaction.editReply({ embeds: [gembed.setTitle('Patrocinador Sorteo').setDescription(`El sorteo será de ${ms(time)}.\n\nQuien es el patrocinador del sorteo?\n> Ejemplo: \`<@817515739711406140>\`, \`@zer0dev\`, \`817515739711406140\`\n\nEnter \`skip\` para elegirte a ti mismo`)] })

            await interaction.channel.awaitMessages({
                filter: (i) => i.author.id == interaction.user.id,
                idle: 60000,
                max: 1
            }).then(async collected => {
                let got = collected.first();
                if (!got) {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    return;
                }
                if (got.content.toLowerCase() == 'cancel') {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                await interaction.guild.members.fetch(got.content).catch(e => null);

                if (!got.mentions.members.first() && !interaction.guild.members.cache.get(got.content) && got.content != 'skip') {
                    interaction.editReply({ embeds: [gembed.setFooter({ text: 'La creación ha sido cancelada' }).setDescription('Respuesta no valida')] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                if (got.content == 'skip') host = interaction.member;
                else host = got.mentions.members.first() || interaction.guild.members.cache.get(got.content);
                got.delete().catch(e => null);
            });

            if (cancel) return;
            await interaction.editReply({ embeds: [gembed.setTitle('Canal de Sorteo').setDescription(`El patrocinador es ${host}\n\nEn que canal deseas que se haga el sorteo?\n> Ejemplo: ${interaction.channel}`)] });

            await interaction.channel.awaitMessages({
                filter: (i) => i.author.id == interaction.user.id,
                idle: 60000,
                max: 1
            }).then(async collected => {
                let got = collected.first();
                if (!got) {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    return;
                }
                if (got.content.toLowerCase() == 'cancel') {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                await interaction.guild.channels.fetch(got.content).catch(e => null);

                if (!got.mentions.channels.first() && !interaction.guild.channels.cache.get(got.content) && got.content != 'skip') {
                    interaction.editReply({ embeds: [gembed.setDescription('Este canal no es valido.').setFooter({ text: 'La creación ha sido cancelada' })] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                if (![0, 5].includes(got.mentions.channels.first()?.type) && ![0, 5].includes(interaction.guild.channels.cache.get(got.content)?.type)) {
                    interaction.editReply({ embeds: [gembed.setDescription('Este canal no es valido.').setFooter({ text: 'La creación ha sido cancelada' })] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                if (got.content == 'skip') channel = interaction.channel;
                else channel = got.mentions.channels.first() || interaction.guild.channels.cache.get(got.content);
                got.delete().catch(e => null);
            });

            if (cancel) return;
            await interaction.editReply({ embeds: [gembed.setTitle('Limite Participantes').setDescription(`El sorteo será anunciado en ${channel}\n\nQue cantidad maxima deseas establecer?\n> Ejemplo: 1, 5, 10\n\nEnter \`skip\` para entradas infinitas.`)] });

            await interaction.channel.awaitMessages({
                filter: (i) => i.author.id == interaction.user.id,
                idle: 60000,
                max: 1
            }).then(async collected => {
                let got = collected.first();
                if (!got) {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    return;
                }
                if (got.content.toLowerCase() == 'cancel') {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                }
                if (got.content != 'skip' && Number.isInteger(Number(got.content)) && Number(got.content) > 0) limit = `${Number(got.content) || 'infinite'}`
                got.delete().catch(e => null);
            });

            if (cancel) return;
            await interaction.editReply({ embeds: [gembed.setTitle('Contar Entradas Sorteo').setDescription(`Las entradas que pasen de ${limit} entradas serán filtradas\n\nCuantos ganadores quieres que haya?\n> Ejemplo: 1, 5, 10`)] });

            await interaction.channel.awaitMessages({
                filter: (i) => i.author.id == interaction.user.id,
                idle: 60000,
                max: 1
            }).then(async collected => {
                let got = collected.first();
                if (!got) {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    return;
                }
                if (got.content.toLowerCase() == 'cancel') {
                    interaction.editReply({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                    cancel = true;
                    got.delete().catch(e => null);
                    return;
                };
                if (got.content != 'skip' && Number.isInteger(Number(got.content)) && Number(got.content) > 0) winnerCount = `${Number(got.content) || 1}`
                got.delete().catch(e => null);
            });

            if (cancel) return;
            let msg = await interaction.editReply({
                embeds: [gembed.setTitle('Preview Sorteo').setFooter({ text: 'Clickea cuando tengas preparado' })
                    .setDescription(`
${emoji.point} **Detalles basicos**
${emoji.blankspace}${emoji.replyc} Premio: **${prize}**
${emoji.blankspace}${emoji.replyc} Ganadores: ${winnerCount}
${emoji.blankspace}${emoji.replyc} Termina: <t:${((Date.now() + time) / 1000).toFixed(0)}>  [<t:${((Date.now() + time) / 1000).toFixed(0)}:R>]
${emoji.blankspace}${emoji.replyc} Canal: ${channel}
${emoji.blankspace}${emoji.replyc} Patrocinador: ${host}
${emoji.blankspace}${emoji.reply} Termina a ${limit} entradas

${emoji.point} **Multiplicador**
${emoji.blankspace}${emoji.reply} No hay multiplicadores añadidos
`)],
                components: [new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId('gaw-addmulti').setLabel('Añadir Multiplicador').setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId('gaw-rmvmulti').setLabel('Remover multiplicador').setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId('gaw-nextmulti').setLabel('Siguente').setStyle(ButtonStyle.Success),
                )]
            });

            const collector = msg.createMessageComponentCollector({ filter: (i) => i.isButton(), time: 120000 });
            collector.on('end', async collected => {
                await interaction.editReply({ components: [] });
            });
            collector.on('collect', async i => {
                collector.resetTimer();
                if (i.user.id != interaction.user.id)
                    return i.reply({ content: ':x: Estos botones no son para ti', ephemeral: true });

                if (i.customId == 'gaw-addmulti') {
                    i.deferUpdate();
                    await interaction.editReply({ components: [] });
                    var role = null;
                    var entries = 2;
                    var can = false;

                    let ms = await interaction.followUp({ embeds: [new EmbedBuilder().setColor('Blue').setDescription('Menciona un rol para multiplicar entradas')] })
                    await interaction.channel.awaitMessages({
                        filter: (m) => m.author.id == interaction.user.id,
                        idle: 60000,
                        max: 1
                    }).then(async collected => {
                        let got = collected.first();
                        if (!got) {
                            ms.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Sin respuesta')] });
                            can = true;
                            return
                        };
                        role = got.mentions.roles.first() || interaction.guild.roles.cache.get(got.content);
                        if (!role) {
                            got.delete().catch(e => null);
                            ms.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Sin respuesta')] });
                            can = true;
                            return;
                        }
                        got.delete().catch(e => null);
                    });
                    if (can) return await interaction.editReply({
                        components: [new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('gaw-addmulti').setLabel('Añadir Multiplicador').setStyle(ButtonStyle.Primary),
                            new ButtonBuilder().setCustomId('gaw-rmvmulti').setLabel('Remover Multiplicador').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-nextmulti').setLabel('Siguente').setStyle(ButtonStyle.Success)
                        )]
                    });
                    ms.edit({ embeds: [new EmbedBuilder().setColor('Blue').setDescription('Cuantos multiplicadores quieres que tenga ??')] });

                    await interaction.channel.awaitMessages({
                        filter: (i) => i.author.id == interaction.user.id,
                        idle: 60000,
                        max: 1
                    }).then(async collected => {
                        let got = collected.first();
                        if (!got) {
                            ms.edit({ embeds: [gembed.setDescription('Cancelado').setFooter(null)] });
                            can = true;
                            return;
                        }
                        if (Number(got.content) && Number.isInteger(Number(got.content)) && Number(got.content) > 0) entries = Number(got.content);
                        got.delete().catch(e => null);
                    });

                    if (can) return await interaction.editReply({
                        components: [new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('gaw-addmulti').setLabel('Añadir Multiplicador').setStyle(ButtonStyle.Primary),
                            new ButtonBuilder().setCustomId('gaw-rmvmulti').setLabel('Remover Multiplicador').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-nextmulti').setLabel('Siguente').setStyle(ButtonStyle.Success)
                        )]
                    });
                    ms.delete().catch(e => null);
                    multi.set(role.id, entries);

                    // RELOAD -------------------------------------------
                    let desc = '';

                    multi.forEach(function (value, key) {
                        desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entradas.\n`;
                    });

                    await interaction.editReply({
                        embeds: [gembed
                            .setDescription(`
${emoji.point} **Detalles basicos**
${emoji.blankspace}${emoji.replyc} Premio: **${prize}**
${emoji.blankspace}${emoji.replyc} Ganadores: ${winnerCount}
${emoji.blankspace}${emoji.replyc} Termina: <t:${((Date.now() + time) / 1000).toFixed(0)}>  [<t:${((Date.now() + time) / 1000).toFixed(0)}:R>]
${emoji.blankspace}${emoji.replyc} Canal: ${channel}
${emoji.blankspace}${emoji.replyc} Patrocinador: ${host}
${emoji.blankspace}${emoji.reply} Termina en ${limit} Entradas
                
${emoji.point} **Multiplicadores**
${desc.length == 0 ? `${emoji.blankspace}${emoji.reply} No hay multiplicadores añadidos` : desc}
`)],
                        components: [new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('gaw-addmulti').setLabel('Añadir Multiplicador').setStyle(ButtonStyle.Primary),
                            new ButtonBuilder().setCustomId('gaw-rmvmulti').setLabel('Remover Multiplicador').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-nextmulti').setLabel('Siguente').setStyle(ButtonStyle.Success)
                        )]
                    });

                } else if (i.customId == 'gaw-rmvmulti') {
                    i.deferUpdate();
                    await interaction.editReply({ components: [] });
                    var can = false;

                    let ms = await interaction.followUp({ embeds: [new EmbedBuilder().setColor('Blue').setDescription('Menciona un rol o envia su ID')] })
                    await interaction.channel.awaitMessages({
                        filter: (m) => m.author.id == interaction.user.id,
                        idle: 60000,
                        max: 1
                    }).then(async collected => {
                        let got = collected.first();
                        if (!got) {
                            ms.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Sin respuesta')] });
                            can = true;
                            return
                        };
                        role = got.mentions.roles.first() || interaction.guild.roles.cache.get(got.content);
                        if (!role) {
                            got.delete().catch(e => null);
                            ms.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Sin respuesta')] });
                            can = true;
                            return;
                        }
                        got.delete().catch(e => null);

                        if (!multi.has(role.id)) {
                            ms.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Sin respuesta')] });
                            can = true;
                            return;
                        }
                        multi.delete(role.id);
                    });
                    if (can) return await interaction.editReply({
                        components: [new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('gaw-addmulti').setLabel('Añadir Multiplicador').setStyle(ButtonStyle.Primary),
                            new ButtonBuilder().setCustomId('gaw-rmvmulti').setLabel('Remover Multiplicador').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-nextmulti').setLabel('Siguente').setStyle(ButtonStyle.Success)
                        )]
                    });
                    ms.delete().catch(e => null);

                    // RELOAD -------------------------------------------
                    let desc = '';

                    multi.forEach(function (value, key) {
                        desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entradas.\n`;
                    });

                    await interaction.editReply({
                        embeds: [gembed
                            .setDescription(`
${emoji.point} **Detalles basicos**
${emoji.blankspace}${emoji.replyc} Premio: **${prize}**
${emoji.blankspace}${emoji.replyc} Ganadores: ${winnerCount}
${emoji.blankspace}${emoji.replyc} Termina: <t:${((Date.now() + time) / 1000).toFixed(0)}>  [<t:${((Date.now() + time) / 1000).toFixed(0)}:R>]
${emoji.blankspace}${emoji.replyc} Canal: ${channel}
${emoji.blankspace}${emoji.replyc} Patrocinador: ${host}
${emoji.blankspace}${emoji.reply} Termina en ${limit} Entradas
                
${emoji.point} **Multiplicador**
${desc.length == 0 ? `${emoji.blankspace}${emoji.reply} No hay multiplicadores añadidos` : desc}
`)],
                        components: [new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('gaw-addmulti').setLabel('Add Multiplier').setStyle(ButtonStyle.Primary),
                            new ButtonBuilder().setCustomId('gaw-rmvmulti').setLabel('Remove Multiplier').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancel').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gaw-nextmulti').setLabel('Next').setStyle(ButtonStyle.Success),
                        )]
                    });
                } else if (i.customId == 'gaw-nextmulti') {
                    i.deferUpdate();
                    let desc = '';

                    multi.forEach(function (value, key) {
                        desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entries.\n`;
                    });
                    await interaction.editReply({
                        embeds: [gembed
                            .setDescription(`
${emoji.point} **Detalles Basicos**
${emoji.blankspace}${emoji.replyc} Premio: **${prize}**
${emoji.blankspace}${emoji.replyc} Ganadores: ${winnerCount}
${emoji.blankspace}${emoji.replyc} Termina: <t:${((Date.now() + time) / 1000).toFixed(0)}>  [<t:${((Date.now() + time) / 1000).toFixed(0)}:R>]
${emoji.blankspace}${emoji.replyc} Canal: ${channel}
${emoji.blankspace}${emoji.replyc} Patrocinador: ${host}
${emoji.blankspace}${emoji.reply} Termina a ${limit} entradas
                        
${emoji.point} **Multiplier**
${desc.length == 0 ? `${emoji.blankspace}${emoji.reply} No hay multiplicadores añadidos\n` : desc}
${emoji.point} **Requisitos**
${emoji.blankspace}${emoji.reply} No hay requisitos añadidos
`)], components: [new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Añadir Requisitos').setStyle(ButtonStyle.Primary),
                                new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remover Requisitos').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Empezar').setEmoji('🎉').setStyle(ButtonStyle.Success),
                            )]
                    });

                } else if (i.customId == 'gaw-cancel') {
                    i.deferUpdate();
                    interaction.editReply({ embeds: [gembed.setFooter({ text: 'Creation has been Cancelado' })] });
                    collector.stop();
                } else if (i.customId == 'gaw-addreq') {
                    i.deferUpdate();
                    await interaction.editReply({ components: [] });
                    var type = null;
                    var det = [];
                    var can = false;

                    let msg = await interaction.followUp({
                        embeds: [new EmbedBuilder().setColor('Red').setDescription('Selecciona un tipo')], components: [new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('gawreq1').setLabel('Roles Requeridos').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gawreq2').setLabel('Roles Prohibidos').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gawreq3').setLabel('Union al servidor').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gawreq4').setLabel('Edad Cuenta').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gawreq5').setLabel('Cancelar').setStyle(ButtonStyle.Secondary)
                        )], fetchReply: true
                    });
                    await msg.awaitMessageComponent({ filter: (i) => i.user.id == interaction.user.id, time: 45000 })
                        .catch(async e => {
                            can = true;
                            msg.delete().catch(e => null);
                            await interaction.editReply({
                                components: [new ActionRowBuilder().addComponents(
                                    new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Add Requirements').setStyle(ButtonStyle.Primary),
                                    new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remove Requirements').setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Start').setEmoji('🎉').setStyle(ButtonStyle.Success),
                                    new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancel').setStyle(ButtonStyle.Danger)
                                )]
                            });
                        })
                        .then(async i => {
                            if (i.customId == 'gawreq1') {
                                i.deferUpdate();
                                type = 'role';
                            } else if (i.customId == 'gawreq2') {
                                i.deferUpdate();
                                type = 'blackrole';
                            } else if (i.customId == 'gawreq3') {
                                i.deferUpdate();
                                type = 'join';
                            } else if (i.customId == 'gawreq4') {
                                i.deferUpdate();
                                type = 'age';
                            } else if (i.customId == 'gawreq5') {
                                i.deferUpdate();
                                type = 'cancel';
                            }
                        });

                    msg.edit({ components: [] });

                    if (!type || type == null) {
                        msg.delete().catch(e => null);
                        await interaction.editReply({
                            components: [new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Añadir Requisito').setStyle(ButtonStyle.Primary),
                                new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remover Requisito').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Empezar').setEmoji('🎉').setStyle(ButtonStyle.Success),
                                new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Danger)
                            )]
                        });
                        can = true;
                    } else if (type == 'role') {
                        msg.edit({ embeds: [new EmbedBuilder().setColor('White').setDescription('Menciona un rol o su ID')] });
                    } else if (type == 'blackrole') {
                        msg.edit({ embeds: [new EmbedBuilder().setColor('White').setDescription('Menciona un rol o su ID')] });
                    } else if (type == 'join') {
                        msg.edit({ embeds: [new EmbedBuilder().setColor('White').setDescription('Cuanto tiempo debería de estar el miembro en el servidor ?')] });
                    } else if (type == 'age') {
                        msg.edit({ embeds: [new EmbedBuilder().setColor('White').setDescription(`Cuanto de viejo debe de ser la cuenta para entrar al sorteo?`)] });
                    } else {
                        msg.delete().catch(e => null);
                        await interaction.editReply({
                            components: [new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Añadir Requisitos').setStyle(ButtonStyle.Primary),
                                new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remover Requisitos').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Empezar').setEmoji('🎉').setStyle(ButtonStyle.Success),
                                new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Danger)
                            )]
                        });
                        can = true;
                    }

                    if (can) {
                        await interaction.editReply({
                            components: [new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Add Requirements').setStyle(ButtonStyle.Primary),
                                new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remove Requirements').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancel').setStyle(ButtonStyle.Danger),
                                new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Start').setEmoji('🎉').setStyle(ButtonStyle.Success),
                            )]
                        });
                        msg.delete().catch(e => null);
                        return;
                    }

                    await interaction.channel.awaitMessages({
                        filter: (m) => m.author.id == interaction.user.id,
                        idle: 60000,
                        max: 1
                    }).then(async collected => {
                        let got = collected.first();
                        if (!got) {
                            msg.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Sin respuesta')] });
                            can = true;
                            return
                        };

                        if (type == 'role') {
                            role = got.mentions.roles.first() || interaction.guild.roles.cache.get(got.content);
                            if (!role) {
                                got.delete().catch(e => null);
                                msg.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Respuesta Invalida')] });
                                can = true;
                                return;
                            }
                            if (req.has('role')) {
                                let l = req.get('role');
                                l.push(role.id);
                                req.set('role', l);
                            } else {
                                req.set('role', [role.id])
                            }
                            got.delete().catch(e => null);
                        } else if (type == 'blackrole') {
                            role = got.mentions.roles.first() || interaction.guild.roles.cache.get(got.content);
                            if (!role) {
                                got.delete().catch(e => null);
                                msg.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Respuesta Invalida')] });
                                can = true;
                                return;
                            }
                            if (req.has('blackrole')) {
                                let l = req.get('blackrole');
                                l.push(role.id);
                                req.set('blackrole', l);
                            } else {
                                req.set('blackrole', [role.id])
                            }
                            got.delete().catch(e => null);
                        } else if (type == 'join') {
                            if (!ms(got.content) || ms(got.content) < 0) {
                                got.delete().catch(e => null);
                                msg.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Input Invalido')] })
                                can = true;
                                return;
                            }
                            req.set('join', ms(got.content))
                            got.delete().catch(e => null);
                        } else if (type == 'age') {
                            if (!ms(got.content) || ms(got.content) < 0) {
                                got.delete().catch(e => null);
                                msg.edit({ embeds: [new EmbedBuilder().setColor('Red').setDescription('Input Invalido')] })
                                can = true;
                                return;
                            }
                            req.set('age', ms(got.content));
                            got.delete().catch(e => null);
                        }
                        msg.delete().catch(e => null);
                    });

                    // RELOAD
                    let desc = '';

                    multi.forEach(function (value, key) {
                        desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entradas.\n`;
                    });

                    let desc2 = '';
                    let rolelist = [];
                    let brolelist = [];
                    req.forEach(function (value, key) {
                        if (key == 'role') {
                            value.forEach(i => rolelist.push(interaction.guild.roles.cache.get(i)))
                        }
                        if (key == 'blackrole') {
                            value.forEach(i => brolelist.push(interaction.guild.roles.cache.get(i)))
                        }
                        if (key == 'join') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tienes que tener ${ms(value)} en el servidor`;
                        if (key == 'age') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tu cuenta tiene que tener más tiempo que ${ms(value)}\n`;
                    });

                    if (rolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Cualquiera de los siguentes roles - ${rolelist.join(', ')}\n`;
                    if (brolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles prohibidos - ${brolelist.join(', ')}\n`

                    await interaction.editReply({
                        embeds: [gembed
                            .setDescription(`
${emoji.point} **Detalles basicos**
${emoji.blankspace}${emoji.replyc} Premio: **${prize}**
${emoji.blankspace}${emoji.replyc} Ganadores: ${winnerCount}
${emoji.blankspace}${emoji.replyc} Termina: <t:${((Date.now() + time) / 1000).toFixed(0)}>  [<t:${((Date.now() + time) / 1000).toFixed(0)}:R>]
${emoji.blankspace}${emoji.replyc} Canal: ${channel}
${emoji.blankspace}${emoji.replyc} Patrocinador: ${host}
${emoji.blankspace}${emoji.reply} Termina en ${limit} Entradas
                        
${emoji.point} **Multiplicador**
${desc.length == 0 ? `${emoji.blankspace}${emoji.reply} No hay multiplicadores añadidos\n` : desc}
${emoji.point} **Requisitos**
${desc2.length == 0 ? `${emoji.blankspace}${emoji.reply} No hay requisitos añadidos` : desc2}
`)], components: [new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Añadir Requisitos').setStyle(ButtonStyle.Primary),
                                new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remover Requisitos').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Empezar').setEmoji('🎉').setStyle(ButtonStyle.Success),
                            )]
                    });

                } else if (i.customId == 'gaw-rmvreq') {
                    i.deferUpdate();
                    await interaction.editReply({ components: [] });

                    var type = null;
                    var det = [];
                    var can = false;

                    let msg = await interaction.followUp({
                        embeds: [new EmbedBuilder().setColor('Red').setDescription('Selecciona uno de abajo')], components: [new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('gawreq1').setLabel('Rol requerido').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gawreq2').setLabel('Rol prohibido').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gawreq3').setLabel('Unión al servidor').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gawreq4').setLabel('Tiempo de cuenta').setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('gawreq5').setLabel('Cancelar').setStyle(ButtonStyle.Secondary)
                        )], fetchReply: true
                    });

                    await msg.awaitMessageComponent({ filter: (i) => i.user.id == interaction.user.id, time: 45000 })
                        .catch(async e => {
                            can = true;
                            msg.delete().catch(e => null);
                            await interaction.editReply({
                                components: [new ActionRowBuilder().addComponents(
                                    new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Añadir Requisito').setStyle(ButtonStyle.Primary),
                                    new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remover Requisito').setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Danger),
                                    new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Empezar').setEmoji('🎉').setStyle(ButtonStyle.Success),
                                )]
                            });
                        })
                        .then(async i => {
                            if (i.customId == 'gawreq1') {
                                i.deferUpdate();
                                type = 'role';
                            } else if (i.customId == 'gawreq2') {
                                i.deferUpdate();
                                type = 'blackrole';
                            } else if (i.customId == 'gawreq3') {
                                i.deferUpdate();
                                type = 'join';
                            } else if (i.customId == 'gawreq4') {
                                i.deferUpdate();
                                type = 'age';
                            } else if (i.customId == 'gawreq5') {
                                i.deferUpdate();
                                type = 'cancel';
                            }
                        });

                    if (can || type == 'cancel') {
                        msg.delete().catch(e => null);
                        return await interaction.editReply({
                            components: [new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Añadir Requisito').setStyle(ButtonStyle.Primary),
                                new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remover Requisito').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Danger),
                                new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Empezar').setEmoji('🎉').setStyle(ButtonStyle.Success),
                            )]
                        });
                    }

                    if (req.has(type)) {
                        req.delete(type);
                        msg.delete().catch(e => null)
                    } else {
                        msg.edit({ embeds: [new EmbedBuilder().setColor('White').setDescription('No such requirement has been added')], components: [] });
                    };

                    // RELOAD
                    let desc = '';

                    multi.forEach(function (value, key) {
                        desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entradas.\n`;
                    });

                    let desc2 = '';
                    let rolelist = [];
                    let brolelist = [];
                    req.forEach(function (value, key) {
                        //khe
                        if (key == 'role') {
                            value.forEach(i => rolelist.push(interaction.guild.roles.cache.get(i)))
                        }
                        if (key == 'blackrole') {
                            value.forEach(i => brolelist.push(interaction.guild.roles.cache.get(i)))
                        }
                        if (key == 'join') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tienes que haber estado ${ms(value)} en el servidor\n`;
                        if (key == 'age') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tu cuenta debe de ser mayor que ${ms(value)}\n`;
                    });

                    if (rolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles requeridos - ${rolelist.join(', ')}\n`;
                    if (brolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles bloqueados - ${brolelist.join(', ')}\n`

                    await interaction.editReply({
                        embeds: [gembed
                            .setDescription(`
${emoji.point} **Detalles basicos**
${emoji.blankspace}${emoji.replyc} Premio: **${prize}**
${emoji.blankspace}${emoji.replyc} Ganadores: ${winnerCount}
${emoji.blankspace}${emoji.replyc} Termina: <t:${((Date.now() + time) / 1000).toFixed(0)}>  [<t:${((Date.now() + time) / 1000).toFixed(0)}:R>]
${emoji.blankspace}${emoji.replyc} Canal: ${channel}
${emoji.blankspace}${emoji.replyc} Patrocinador: ${host}
${emoji.blankspace}${emoji.reply} Termina en ${limit} Entradas
                        
${emoji.point} **Multiplicador**
${desc.length == 0 ? `${emoji.blankspace}${emoji.reply} No hay multiplicadores añadidosd\n` : desc}
${emoji.point} **Requisitos**
${desc2.length == 0 ? `${emoji.blankspace}${emoji.reply} No hay requisitos añadidos` : desc2}
`)], components: [new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setCustomId('gaw-addreq').setLabel('Añadir Requisitos').setStyle(ButtonStyle.Primary),
                                new ButtonBuilder().setCustomId('gaw-rmvreq').setLabel('Remover Requisitos').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-cancel').setLabel('Cancelar').setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId('gaw-nextreq').setLabel('Empezar').setEmoji('🎉').setStyle(ButtonStyle.Success),
                            )]
                    });
                } else if (i.customId == 'gaw-nextreq') {
                    i.deferUpdate();
                    var canc = false;
                    let desc = '';
                    let desc2 = '';
                    let rolelist = [];
                    let brolelist = [];

                    multi.forEach(function (value, key) {
                        desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entradas.\n`;
                    });

                    req.forEach(function (value, key) {
                        if (key == 'role') {
                            value.forEach(i => rolelist.push(interaction.guild.roles.cache.get(i)))
                        }
                        if (key == 'blackrole') {
                            value.forEach(i => brolelist.push(interaction.guild.roles.cache.get(i)))
                        }
                        if (key == 'join') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tienes que haber estado más de ${ms(value)} en este servidor\n`;
                        if (key == 'age') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tu cuenta debe de ser mayor que ${ms(value)}\n`;
                    });

                    if (rolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles permitidos - ${rolelist.join(', ')}\n`;
                    if (brolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles bloqueados - ${brolelist.join(', ')}\n`;

                    let button = new ButtonBuilder().setCustomId('gaw-enter').setStyle(ButtonStyle.Success).setLabel('0').setEmoji(config.emote.startsWith('<:') ? config.emote : '🎉');
                    let gmsg = await channel.send({
                        content: `${config.pingrole != null ? `<@&${config.pingrole}>` : ''}${config.gawmsg != null ? ': '.concat(config.gawmsg) : ''}`, embeds: [generateGawEmbed(undefined, { EmbedAuthor: { name: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}`  }, prize: prize, winnerCount, host, entriesLimit: limit, time, multi: desc, requirements: desc2 })], components: [new ActionRowBuilder().addComponents(button)], allowedMentions: { parse: ['roles'] }
                    }).catch(e => {
                        canc = true;
                        interaction.followUp({ embeds: [new EmbedBuilder().setColor('Green').setDescription('No tengo permisos en ese canal')] });
                    });

                    if (canc) return;

                    let gentry = await gawModel.create({
                        msgid: gmsg.id,
                        serverID: interaction.guildId,
                        status: true,
                        chId: channel.id,
                        host: host.id,
                        prize: prize,
                        winCount: winnerCount,
                        endtime: Date.now() + time,
                        req: req,
                        multi: multi,
                        entrylimit: limit
                    });

                    gentry.save();

                    interaction.editReply({ embeds: [gembed.setTitle(null).setDescription('El sorteo ha comenzado').setThumbnail(null).setFooter(null)], components: [] });

                    // Ending..
                    setTimeout(async () => {
                        let id = gmsg.id;
                        if (!id) return;

                        let entry = await gawModel.findOne({ msgid: id, serverID: interaction.guildId });
                        if (!entry) return;

                        if (!entry.status) return;

                        await interaction.guild.channels.cache.get(entry.chId).messages.fetch(entry.msgid).catch(e => null);

                        const { multi, req } = entry;
                        let desc = '';
                        let desc2 = '';
                        let rolelist = [];
                        let brolelist = [];

                        multi.forEach(function (value, key) {
                            desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entradas.\n`;
                        });

                        req.forEach(function (value, key) {
                            if (key == 'role') {
                                value.forEach(i => rolelist.push(interaction.guild.roles.cache.get(i)))
                            }
                            if (key == 'blackrole') {
                                value.forEach(i => brolelist.push(interaction.guild.roles.cache.get(i)))
                            }
                            if (key == 'join') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tienes que haber estado más de ${ms(value)} en este servidor\n`;
                            if (key == 'age') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tu cuenta debe de ser mayor que ${ms(value)}\n`;
                    });

                    if (rolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles permitidos - ${rolelist.join(', ')}\n`;
                    if (brolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles bloqueados - ${brolelist.join(', ')}\n`;

                        let msg = interaction.guild.channels.cache.get(entry.chId).messages.cache.get(entry.msgid);
                        if (!msg) return;

                        if (!entry.entries || entry.entries?.length == 0) {
                            //                     await msg.edit({components: [], embeds: [new EmbedBuilder(msg.embeds[0].data).setDescription(`
                            // ${emoji.point} **Giveaway Details**
                            // ${emoji.blankspace}${emoji.replyc} Prize: **${entry.prize}**
                            // ${emoji.blankspace}${emoji.replyc} Winners: 
                            // ${emoji.blankspace}${emoji.replyc} Host: <@${entry.host}> ${entry.entrylimit != 'infinite'?`\n${emoji.blankspace}${emoji.replyc} Entry stopped at ${entry.entrylimit} Entries`:``}
                            // ${emoji.blankspace}${emoji.reply} Ends: Giveaway Cancelado
                            // ${desc.length == 0?``:`\n${emoji.point} **Multiplier**\n`.concat(desc)}
                            // ${desc2.length == 0?``:`${emoji.point} **Requirements**\n`.concat(desc2)}
                            // `).setFooter({text: 'Giveaway has been Cancelado due to no participation'})]});

                            await msg.edit({ components: [], embeds: [generateGawEmbed(msg.embeds[0].data, { prize: entry.prize, host: entry.host, entriesLimit: entry.entrylimit, multi: desc, requirements: desc2 }, "sinEntradas")] });
                            entry.status = false;
                            entry.save();
                            return;
                        }

                        // Drawing winner(s)
                        let list = entry.entries;
                        // var winnerId = ``;
                        // let winners = [];
                        // let no = Number(entry.winCount) || 1;
                        // try{
                        //     for (let i = 0; i < no && list?.length != 0; i++){
                        //         let rid = list[Math.floor(Math.random() * list?.length)];
                        //         if(winnerId.length == 0) winnerId = winnerId + `<@${rid}>`;
                        //         else winnerId = winnerId + `, <@${rid}>`;

                        //         winners.push(rid);
                        //         entry.winners.push(rid);

                        //         let r = [];
                        //         list.forEach(x => {
                        //             if(x != rid) r.push(x)
                        //         });
                        //         list = r;
                        //     };
                        // } catch (error){};
                        const rolledData = roll(list, Number(entry.winCount) || 1)
                        list = rolledData.entries
                        entry.winners.push(...rolledData.winners)

                        let role = interaction.guild.roles.cache.get(config.winrole);

                        rolledData.winners.forEach(async i => {
                            if (role) {
                                await interaction.guild.members.fetch(i).catch(e => null);
                                await interaction.guild.members.cache.get(i).roles.add(role, 'Rol de ganador sorteo').catch(e => null);
                            }
                        });

                        //                 await msg.edit({components: [], embeds: [new EmbedBuilder(msg.embeds[0].data).setFooter({text:`Giveaway has been ended.`}).setDescription(`
                        // ${emoji.point} **Giveaway Details**
                        // ${emoji.blankspace}${emoji.replyc} Prize: **${entry.prize}**
                        // ${emoji.blankspace}${emoji.replyc} Winners: ${winnerId.length != 0?winnerId:'\`Error came\` :skull:'}
                        // ${emoji.blankspace}${emoji.replyc} Host: <@${entry.host}> ${entry.entrylimit != 'infinite'?`\n${emoji.blankspace}${emoji.replyc} Entry stopped at ${entry.entrylimit} Entries`:``}
                        // ${emoji.blankspace}${emoji.reply} Ends: <t:${((Date.now())/1000).toFixed(0)}>  [<t:${((Date.now())/1000).toFixed(0)}:R>]
                        // ${desc.length == 0?``:`\n${emoji.point} **Multiplier**\n`.concat(desc)}
                        // ${desc2.length == 0?``:`${emoji.point} **Requirements**\n`.concat(desc2)}
                        // `)]});
                        await msg.edit({ components: [], embeds: [generateGawEmbed(msg.embeds[0].data, { prize: entry.prize, winners: rolledData.winnerId, host: entry.host, entriesLimit: entry.entrylimit, multi: desc, requirements: desc2 }, "End")] });

                        entry.status = false;
                        entry.save();

                        msg.channel.send({ content: `${config.emote} Felicidades, ${rolledData.winnerId}! Ganaste **${entry.prize}** ${config.emote}`, embeds: [new EmbedBuilder().setColor('White').setDescription(`[**Link al sorteo**](${msg.url})`)] }).catch(e => null);
                    }, time);
                }
            });
        // TERMINA EMPEZAR
        }  else if (interaction.options.getSubcommand() == 'terminar') {

            await interaction.deferReply();
            let id = interaction.options.getString('id-sorteo');
            if (!id) {
                await interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setDescription('Este ID no es valido')] });
                return;
            }

            let entry = await gawModel.findOne({ msgid: id, serverID: interaction.guildId });
            if (!entry) {
                await interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setDescription('No hay ningun sorteo con esa ID registrada')] });
                return;
            }

            if (!entry.status) {
                await interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setTitle('Este sorteo ya está terminado desde antes').setDescription('Deseas sacar otro ganador? Usa /sorteo reroll')] });
                return;
            }

            await interaction.guild.channels.cache.get(entry.chId).messages.fetch(entry.msgid).catch(e => null);

            const { multi, req } = entry;
            let desc = '';
            let desc2 = '';
            let rolelist = [];
            let brolelist = [];

            multi.forEach(function (value, key) {
                desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entradas.\n`;
            });

            req.forEach(function (value, key) {
                if (key == 'role') {
                    value.forEach(i => rolelist.push(interaction.guild.roles.cache.get(i)))
                }
                if (key == 'blackrole') {
                    value.forEach(i => brolelist.push(interaction.guild.roles.cache.get(i)))
                }
                if (key == 'join') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Deberías de estar más de ${ms(value)} en este servidor\n`;
                if (key == 'age') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tu cuenta debe de ser más vieja que ${ms(value)}\n`;
            });

            if (rolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles Requeridos - ${rolelist.join(', ')}\n`;
            if (brolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles Blacklist - ${brolelist.join(', ')}\n`;

            let msg = interaction.guild.channels.cache.get(entry.chId).messages.cache.get(entry.msgid);
            if (!msg) {
                await interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setDescription('No hay ningún sorteo con esa ID')] });
                return;
            }
            if (!entry.entries || entry.entries?.length == 0) {
                await interaction.deleteReply().catch(e => null);

                //                 await msg.edit({
                //                     components: [], embeds: [new EmbedBuilder(msg.embeds[0].data).setDescription(`
                // ${emoji.point} **Giveaway Details**
                // ${emoji.blankspace}${emoji.replyc} Prize: **${entry.prize}**
                // ${emoji.blankspace}${emoji.replyc} Winners: 
                // ${emoji.blankspace}${emoji.replyc} Host: <@${entry.host}> ${entry.entrylimit != 'infinite' ? `\n${emoji.blankspace}${emoji.replyc} Entry stopped at ${entry.entrylimit} Entries` : ``}
                // ${emoji.blankspace}${emoji.reply} Ends: Giveaway Cancelled
                // ${desc.length == 0 ? `` : `\n${emoji.point} **Multiplier**\n`.concat(desc)}
                // ${desc2.length == 0 ? `` : `${emoji.point} **Requirements**\n`.concat(desc2)}
                // `).setFooter({ text: 'Giveaway has been cancelled due to no participation' })]
                //                 });
                await msg.edit({
                    components: [], embeds: [generateGawEmbed(msg.embeds[0].data, { prize: entry.prize, host: entry.host, entriesLimit: entry.entrylimit, multi: desc, requirements: desc2 }, "sinEntradas")]
                });
                entry.status = false;
                entry.save();
                return;
            }

            // Drawing winner(s)
            let list = entry.entries;
            // var winnerId = ``;
            // let winners = [];
            // let no = Number(entry.winCount) || 1;
            // try {
            //     for (let i = 0; i < no && list?.length != 0; i++) {
            //         let rid = list[Math.floor(Math.random() * list?.length)];
            //         if (winnerId.length == 0) winnerId = winnerId + `<@${rid}>`;
            //         else winnerId = winnerId + `, <@${rid}>`;

            //         winners.push(rid);
            //         entry.winners.push(rid);

            //         let r = [];
            //         list.forEach(x => {
            //             if (x != rid) r.push(x)
            //         });
            //         list = r;
            //     };
            // } catch (error) { };
            const rolledData = roll(list, Number(entry.winCount) || 1)
            list = rolledData.entries
            entry.winners.push(...rolledData.winners)

            let role = interaction.guild.roles.cache.get(config.winrole);
            rolledData.winners.forEach(async i => {
                if (role) {
                    await interaction.guild.members.fetch(i).catch(e => null);
                    await interaction.guild.members.cache.get(i).roles.add(role, 'Rol Ganador Sorteo').catch(e => null);
                }
            });

            //             await msg.edit({
            //                 components: [], embeds: [new EmbedBuilder(msg.embeds[0].data).setFooter({ text: `Giveaway has been ended.` }).setDescription(`
            // **Giveaway Details**
            // ${emoji.blankspace}${emoji.replyc} Prize: **${entry.prize}**
            // ${emoji.blankspace}${emoji.replyc} Winners: ${winnerId.length != 0 ? winnerId : '\`Error came\` :skull:'}
            // ${emoji.blankspace}${emoji.replyc} Host: <@${entry.host}> ${entry.entrylimit != 'infinite' ? `\n${emoji.blankspace}${emoji.replyc} Entry stopped at ${entry.entrylimit} Entries` : ``}
            // ${emoji.blankspace}${emoji.reply} Ends: <t:${((Date.now()) / 1000).toFixed(0)}>  [<t:${((Date.now()) / 1000).toFixed(0)}:R>]
            // ${desc.length == 0 ? `` : `\n${emoji.point} **Multiplier**\n`.concat(desc)}
            // ${desc2.length == 0 ? `` : `${emoji.point} **Requirements**\n`.concat(desc2)}
            // `)]
            //             });
            await msg.edit({
                components: [], embeds: [generateGawEmbed(msg.embeds[0].data, { prize: entry.prize, winners: rolledData.winnerId, host: entry.host, entriesLimit: entry.entrylimit, multi: desc, requirements: desc2 }, "End")]
            });

            entry.status = false;
            entry.save();

            msg.channel.send({ content: `${config.emote} Felicidades, ${rolledData.winnerId}! Has ganado **${entry.prize}** ${config.emote}`, embeds: [new EmbedBuilder().setColor('White').setDescription(`[**Link al Sorteo**](${msg.url})`)] }).catch(e => null);

            interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setDescription('Sorteo terminado con éxito.')] });
        // REROLL SORTEO
        
        } else if (interaction.options.getSubcommand() == 'reroll') {
            await interaction.deferReply();
            let id = interaction.options.getString('id-sorteo');
            if (!id) {
                await interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setDescription('El ID no es valido')] });
                return;
            }

            let entry = await gawModel.findOne({ msgid: id, serverID: interaction.guildId });
            if (!entry) {
                await interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setDescription('No hay ID-s con ese sorteo en la base de datos')] });
                return;
            }

            if (entry.status) {
                await interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setTitle('El sorteo aún no ha terminado').setDescription('Termina el sorteo antes de usar esto')] });
                return;
            }

            await interaction.guild.channels.cache.get(entry.chId).messages.fetch(entry.msgid).catch(e => null);

            const { multi, req } = entry;
            let desc = '';
            let desc2 = '';
            let rolelist = [];
            let brolelist = [];

            multi.forEach(function (value, key) {
                desc = desc + `${emoji.blankspace} :white_medium_small_square: ${interaction.guild.roles.cache.get(key) || '@deletedRole'} - \`x${value}\` Entradas.\n`;
            });

            req.forEach(function (value, key) {
                if (key == 'role') {
                    value.forEach(i => rolelist.push(interaction.guild.roles.cache.get(i)))
                }
                if (key == 'blackrole') {
                    value.forEach(i => brolelist.push(interaction.guild.roles.cache.get(i)))
                }
                if (key == 'join') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Deberías de estar más de ${ms(value)} en este servidor\n`;
                if (key == 'age') desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Tu cuenta debe de ser más vieja que ${ms(value)}\n`;
            });

            if (rolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles Requeridos - ${rolelist.join(', ')}\n`;
            if (brolelist.length > 0) desc2 = desc2 + `${emoji.blankspace} :white_medium_small_square: Roles Blacklist - ${brolelist.join(', ')}\n`;

            let msg = interaction.guild.channels.cache.get(entry.chId).messages.cache.get(entry.msgid);
            if (!msg) {
                await interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setDescription('No hay ningún sorteo con esa ID')] });
                return;
            }

            if (entry.winners?.length > 0) {
                let role1 = interaction.guild.roles.cache.get(config.winrole);
                if (role1) {
                    entry.winners.forEach(async i => {
                        await interaction.guild.members.fetch(i).catch(e => null);
                        await interaction.guild.members.cache.get(i).roles.remove(role1, 'Sorteo hecho reroll').catch(e => null);
                    });
                }
            }

            // Drawing winner(s)
            let list = entry.entries.filter(nik => !entry.winners.includes(nik));
            // var winnerId = ``;
            // let winners = [];
            // let no = Number(entry.winCount) || 1;
            // try {
            //     for (let i = 0; i < no && list?.length != 0; i++) {
            //         let rid = list[Math.floor(Math.random() * list?.length)];
            //         if (winnerId.length == 0) winnerId = winnerId + `<@${rid}>`;
            //         else winnerId = winnerId + `, <@${rid}>`;

            //         winners.push(rid);
            //         entry.winners.push(rid);

            //         let r = [];
            //         list.forEach(x => {
            //             if (x != rid) r.push(x)
            //         });
            //         list = r;
            //     };
            // } catch (error) { };
            const rolledData = roll(list, Number(entry.winCount) || 1)
            list = rolledData.entries
            entry.winners.push(...rolledData.winners)

            let role = interaction.guild.roles.cache.get(config.winrole);
            rolledData.winners.forEach(async i => {
                if (role) {
                    await interaction.guild.members.fetch(i).catch(e => null);
                    await interaction.guild.members.cache.get(i).roles.add(role, 'Rol de ganador sorteo').catch(e => null);
                }
            });

            await msg.edit({
                components: [], embeds: [new EmbedBuilder(msg.embeds[0].data).setFooter({ text: `Se ha terminado el sorteo.` }).setDescription(`
${emoji.point} **Detalles Sorteo**
${emoji.blankspace}${emoji.replyc} Premio: **${entry.prize}**
${emoji.blankspace}${emoji.replyc} Ganadores: ${rolledData.winnerId.length != 0 ? rolledData.winnerId.concat(' *(reroll)*') : '\`Error came\` :skull:'}
${emoji.blankspace}${emoji.replyc} Patrocinador: <@${entry.host}> ${entry.entrylimit != 'infinito' ? `\n${emoji.blankspace}${emoji.replyc} Entradas paradas en ${entry.entrylimit}` : ``}
${emoji.blankspace}${emoji.reply} Reroleado: <t:${((Date.now()) / 1000).toFixed(0)}>  [<t:${((Date.now()) / 1000).toFixed(0)}:R>]
${desc.length == 0 ? `` : `\n${emoji.point} **Multiplicador**\n`.concat(desc)}
${desc2.length == 0 ? `` : `${emoji.point} **Requisitos**\n`.concat(desc2)}
`)]
            });

            entry.status = false;
            entry.save();

            msg.channel.send({ content: `${config.emote} Felicidades, ${rolledData.winnerId}! Has ganado **${entry.prize}** ${config.emote} *[reroll]*`, embeds: [new EmbedBuilder().setColor('White').setDescription(`[**Link al Sorteo**](${msg.url})`)] }).catch(e => null);

            interaction.editReply({ embeds: [new EmbedBuilder().setColor('White').setDescription('Rerolleado el sorteo exitosamente.')] });
        }
        //TERMINA REROLL
        }
}