const { SlashCommandBuilder, ButtonBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, EmbedBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
const dropSchema = require('../../Schemas/dropSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('drop')
    .setDescription('Dropea algo')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
    .addStringOption(option =>
        option
        .setName('item')
        .setDescription('Que quieres dropear?')
        .setRequired(true)
    )
    .addChannelOption(channel =>
        channel
        .setName('canal')
        .setDescription('Canal donde quieres que spamee el drop')
        .setRequired(true)
    ),

    async execute(interaction, client) {

        const canal = interaction.options.getChannel('canal')
        const item = interaction.options.getString('item')


        await interaction.deferReply({ ephemeral: true })
        const embed = new EmbedBuilder()
        .setTitle(`${item}`)
        .setDescription('<a:Estrellas5:1074117495079833703> Acaba de empezar un drop, pulsa en **"Reclamar"** para reclamar el drop, mucha suerte a todos del servidor y que gane la persona que más reflejos de notificaciones que tenga, al reclamar se abrirá un ticket automaticamente para el ganador. <a:Estrellas5:1074117495079833703>')
        .setColor('#1df5fa')

        const boton = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
            .setLabel('Reclamar')
            .setCustomId('reclamar-drop')
            .setEmoji('1170764835814912131')
            .setStyle(ButtonStyle.Secondary)
        )

        const msg = await canal.send({ embeds: [embed], content: '<@&1170784253110403224>', components: [boton], allowedMentions: {parse: ['roles']}})

        await dropSchema.create({
            guildId: interaction.guild.id,
            canal: canal.id,
            msgId: msg.id,
            item: item
        })

        await interaction.editReply({ content: 'Drop creado', ephemeral: true })
    }
}