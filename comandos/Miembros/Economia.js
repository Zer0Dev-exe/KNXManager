const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, messageLink } = require('discord.js')
const ecoSchema = require('../../Schemas/ecoSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('economia')
    .setDescription('Crea una cuenta de Economía'),
    async execute(interaction) {

        const { user, guild } = interaction;

        const errorVIP = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('Para obtener el rol VIP puedes participar en Eventos, Sorteos y estar activo en el chat para en un futuro obtenerlo y tener acceso a la Economía')
        .setTitle('No puedes acceder a este comando')
        .setThumbnail(`${interaction.user.avatarURL()}`)

        if(!interaction.member.roles.cache.has("700889155038609430")) return interaction.reply({ embeds: [errorVIP], ephemeral: true })  

        let Data = ecoSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle('Cuenta')
        .setDescription('Crea una cuenta de Economía para jugar en ella, para registrarte no te va a pedir ni una contraseña ni nada, solo tendrás que tocar en el boton de "Crear Cuenta" y podrás empezar a jugar en la Economía del servidor, mucha suerte atunero.')
        .addFields({ name: 'Crear', value: 'Crear una cuenta' })
        .addFields({ name: 'Eliminar', value: 'Eliminar tu cuenta' })

        const embed2 = new EmbedBuilder()
        .setColor("Blue")
        .setTitle('Cuenta creada')
        .setDescription('Tu cuenta ha sido creada')
        .addFields({ name: 'Éxito', value: 'Tu cuenta ha sido creada exitosamente y se te ha añadido $1000 por crear la cuenta' })
        .setFooter({ text: `Solicitado por ${interaction.user.username}`})

        const embed3 = new EmbedBuilder()
        .setColor("Red")
        .setTitle('Cuenta eliminada')
        .setDescription('Tu cuenta ha sido eliminada')
        .addFields({ name: 'Éxito', value: 'Tu cuenta ha sido eliminada exitosamente' })
        .setFooter({ text: `Solicitado por ${interaction.user.username}`})

        const boton = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('page1')
            .setEmoji('1112736971522060312')
            .setLabel('Crear Cuenta')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId('page2')
            .setEmoji('1112737064639791127')
            .setLabel('Eliminar Cuenta')
            .setStyle(ButtonStyle.Danger),
        )

        const message = await interaction.reply({ embeds: [embed], components: [boton]})

        const collector = await message.createMessageComponentCollector()

        collector.on('collect', async i => {
            
            if (i.customId === 'page1') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Solo ${interaction.user.tag} puede usar este botón`, ephemeral: true })
                }

                const cuenta = await ecoSchema.findOne({ Guild: interaction.guild.id, User: user.id })

                if (cuenta) {
                    return i.reply({ content: `Ya tienes una cuenta creada.`, ephemeral: true })
                }

                if (!cuenta) {
                    console.log('no hay cuenta creada')

                    Data = new ecoSchema({
                        Guild: interaction.guild.id,
                        User: user.id,
                        Bank: 0,
                        Wallet: 1000
                    })
    
                    await Data.save();
    
                    await i.update({ embeds: [embed2], components: []})
                }
            }

            if (i.customId === 'page2') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Solo ${interaction.user.tag} puede usar este botón`, ephemeral: true })
                }

                await Data.deleteMany();

                await i.update({ embeds: [embed3], components: []})
            }
        })
    }
}