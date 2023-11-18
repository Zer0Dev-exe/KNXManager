const { SlashCommandBuilder, EmbedBuilder, AutoModerationRuleTriggerType } = require('discord.js')
const ecoSchema = require('../../Schemas/ecoSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sacar')
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
        if (amount.startsWith('-')) return interaction.reply({ content: 'No puedes sacar una cantidad de dinero negativa'})

        if (cantidad.toLowerCase() === 'todo') {
            if (Data.Bank === 0) return await interaction.reply({ content: 'No tienes dinero para sacar', ephemeral: true });

            Data.Wallet += Data.Bank;
            Data.Bank = 0;
            
            await Data.save();

            return await interaction.reply({ content: 'Todo tu dinero ha sido transferido a tu cartera', ephemeral: true });
        } else {
            const Convertido = Number(amount)

            if (isNaN(Convertido) === true) return await interaction.reply({ content: 'La cantidad tiene que ser un numero o **todo**', ephemeral: true});

            if (Data.Bank < parseInt(Convertido) || Convertido === Infinity) return await interaction.reply({ content: 'No tienes suficiente dinero en el banco para pasar a la cartera', ephemeral: true });

            Data.Wallet += parseInt(Convertido);
            Data.Bank -= parseInt(Convertido);
            Data.Bank = Math.abs(Data.Bank)

            await Data.save();

            const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription('Dinero sacado exitosamente')
            .setDescription(`Has sacado $${parseInt(Convertido)} de tu banco.`)

            await interaction.reply({ embeds: [embed]})
        }
    }
}