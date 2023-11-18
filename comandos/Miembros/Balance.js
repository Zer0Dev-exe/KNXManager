const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionResponse } = require('discord.js');
const ecoSchema = require('../../Schemas/ecoSchema.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Balance de cuenta'),
    async execute(interaction) {

        const { user, guild } = interaction;

        let Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: user.id });

        if (!Data) return await interaction.reply({ content:'No tienes una cuenta de Economía creada', ephemeral: true});

        const wallet = Math.round(Data.Wallet);
        const bank = Math.round(Data.Bank);
        const total = Math.round(Data.Wallet + Data.Bank);

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Balance de cuenta')
        .addFields({ name: 'Balance', value: `**Banco:** $${bank}\n**Cartera:** $${wallet}\n **Total:** $${total}`})

        await interaction.reply({ embeds: [embed]})

    }
}