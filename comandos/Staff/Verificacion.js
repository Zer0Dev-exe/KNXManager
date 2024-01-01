const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('verificacion')
    .setDescription('Verificacion')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
        .setTitle(`Sistema Verificación ${interaction.guild.name}`)
        .setColor('#0c7df7')
        .setFooter({ text: `Si no juegas al Brawl Stars porfavor presiona en, Acceder como Miembro.`})
        .setImage('https://media.discordapp.net/attachments/936591912079618089/1186050030222712954/Verificacion.png?ex=6591d62a&is=657f612a&hm=f136cb7e0ffb8ef905b0b0c46ac0ee594ab2ac7eb6d66a5d4e44749ea6f0bb73&=&format=webp&quality=lossless&width=768&height=344')
        .setDescription(`<a:Estrellas10:1156946836691619930> Bienvenido al servidor, para verificarte deberás de copiar el ID de tu juego y insertar el texto sin el **#** en el botón de Sincronizar, **solo números y letras** <a:Estrellas10:1156946836691619930>\n\n<a:Estrellas10:1156946836691619930> Sigue los pasos de la imagen que se muestra abajo del texto para obtener tu ID y poder vincularla con el bot. <a:Estrellas10:1156946836691619930>\n\n<a:Estrellas10:1156946836691619930> En caso de cualquier bug, porfavor presiona en el botón de **Soporte Sincronización** y se abrirá un canal con los staffs del servidor.`)

        const boton = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('sync')
            .setLabel('Sincroniza Cuenta')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('935956023242543195'),
            new ButtonBuilder()
            .setCustomId('member')
            .setLabel('Accede como Miembro')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('775086872850333726')
        )
        const soportesync = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('sup-sync')
            .setLabel('Soporte Sincronización')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('775087027942719518')
        )
        interaction.channel.send({ embeds: [embed], components: [boton, soportesync] })
        interaction.reply({ content: 'Enviado', ephemeral: true })
        
    }
}