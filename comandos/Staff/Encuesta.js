const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, PermissionsBitField, ButtonStyle, ButtonBuilder } = require('discord.js');
const encuesta = require('../../Schemas/voteSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('encuesta')
    .setDescription('Envia una encuesta al canal')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
    .addStringOption(option => 
        option
        .setName('topico')
        .setDescription('El topico de la encuesta')
        .setMinLength(1)
        .setMaxLength(2000)
        .setRequired(true)
    ),

    async execute(interaction) {

        await interaction.reply({ content: 'La encuesta ha empezado abajo', ephemeral: true });
        const topico = await interaction.options.getString('topico');

        const embed = new EmbedBuilder()
        .setColor('#ff3d40')
        .setFooter({ text: 'Sistema de encuestas KNX', iconURL: `${interaction.guild.iconURL()}`})
        .setTimestamp()
        .setDescription(`> ${topico}`)
        .setTitle('📌 Encuesta Empezada')
        .addFields({ name: 'Votos a favor', value: `> **Sin votos**`, inline: true })
        .addFields({ name: 'Votos en contra', value: `> **Sin votos**`, inline: true })
        .addFields({ name: 'Autor', value: `${interaction.user}`, inline: false })

        const botones = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('arriba')
            .setEmoji('957238576511340604')
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId('abajo')
            .setEmoji('957238576528105482')
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId('votos')
            .setLabel('Votos')
            .setStyle(ButtonStyle.Secondary),
        )

        const msg = await interaction.channel.send({ embeds: [embed], components: [botones]});
        msg.createMessageComponentCollector();

        await encuesta.create({
            Msg: msg.id,
            Upvote: 0,
            Downvote: 0,
            UpMembers: [],
            DownMembers: [],
            Guild: interaction.guild.id,
            Owner: interaction.user.id
        })
    }
}