const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ecoSchema = require('../../Schemas/ecoSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('apostar')
    .setDescription('Apuesta tu dinero'),
    async execute(interaction) {

        const { user, guild } = interaction;

        let Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });

        let negative = Math.round((Math.random() * -300) - 10)
        let positivo = Math.round((Math.random() * 300) + 10)

        const posN = [negative, positivo];

        const cantidad = Math.round((Math.random() * posN.length));
        const value = posN[cantidad];

        if (!value) return await interaction.reply({ content: 'No hay dinero para ti', ephemeral: true })

        if (Data) {
            Data.Wallet += value;
            await Data.save();
        }

        if (value > 0) {
            const positiveChoices = [
                "Kirinuxx te ha dado",
                "Por tu actividad te han dado",
                "Team KNX te ha dado",
            ]

            const posName = Math.floor(Math.random() * positiveChoices.length);

            const embed1 = new EmbedBuilder()
            .setColor("Red")
            .setTitle('Comando Apostar')
            .addFields({ name: 'Resultado Apuesta', value: `${positiveChoices[posName]} $${value}`})

            await interaction.reply({ embeds: [embed1]})
        } else {
            const negativeChoices = [
                "Has perdido tu cartera y has perdido",
                "Has fallado en robar un banco",
                "Te has intentado escapar de la carcel y has perdido",
            ]

            const negName = Math.floor(Math.random() * negativeChoices.length);

            const stringV = `${value}`;

            const nonSymbol = await stringV.slice(1);

            const embed2 = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Comando Apostar')
            .addFields({ name: 'Resultado Apuesta', value: `${negativeChoices[negName]} - $${nonSymbol}`})

            await interaction.reply({ embeds: [embed2]})
        }
    }
}