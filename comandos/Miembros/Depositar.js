const { SlashCommandBuilder, EmbedBuilder, AutoModerationRuleTriggerType } = require('discord.js')
const ecoSchema = require('../../Schemas/ecoSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('depositar')
    .setDescription('Depositar Dinero de Economía')
    .addStringOption(option => 
        option
        .setName('cantidad')
        .setDescription('La cantidad de dinero que quieres depositar')
        .setRequired(true)
    ),

    async execute(interaction) {
        const { options, user, guild } = interaction;

        const cantidad = interaction.options.getString('cantidad');
        const Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: user.id });

        if (!Data) return await interaction.reply({ content: 'No tienes una cuenta creada', ephemeral: true });
        if (amount.startsWith('-')) return interaction.reply({ content: 'No puedes depositar una cantidad de dinero negativa'})

        if (cantidad.toLowerCase() === 'todo') {
            if (Data.Wallet === 0) return await interaction.reply({ content: 'No tienes dinero para depositar', ephemeral: true });

            Data.Bank += Data.Wallet;
            Data.Wallet = 0;
            
            await Data.save();

            return await interaction.reply({ content: 'Todo tu dinero ha sido depositado', ephemeral: true });
        } else {
            const Convertido = Number(amount)

            if (isNaN(Convertido) === true) return await interaction.reply({ content: 'La cantidad tiene que ser un numero o **todo**', ephemeral: true});

            if (Data.Wallet < parseInt(Convertido) || Convertido === Infinity) return await interaction.reply({ content: 'No tienes suficiente dinero para depositar', ephemeral: true });

            Data.Bank += parseInt(Convertido);
            Data.Wallet -= parseInt(Convertido);
            Data.Wallet = Math.abs(Data.Wallet)

            await Data.save();

            const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription('Dinero depositado exitosamente')
            .setDescription(`Has depositado $${parseInt(Convertido)} en tu banco.`)

            await interaction.reply({ embeds: [embed]})
        }
    }
}