const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "knx",
    async execute(interaction, client) {
        /* Embeds */
        const embedPrevio = new EmbedBuilder()
            .setAuthor({ name: 'Team KNX'})
            .setColor('Orange')
            .setTitle('Error')
            .setDescription(`No se te ha entregado el rol porque ya lo tenías.\n¡Gracias por apoyar al servidor!`)
            .setFooter({ text: 'BETA | Etiqueta - Team KNX', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedFalse = new EmbedBuilder()
            .setAuthor({ name: 'Team KNX' })
            .setColor('Red')
            .setTitle('Error')
            .setDescription(`¡Tu nombre de usuario no contiene la etiqueta del servidor!\nNo se te ha entregado el rol.\nNombre de usuario actual: ${interaction.user.username}#${interaction.member.user.discriminator}`)
            .setFooter({ text: 'BETA | Etiqueta - Team KNX', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedTrue = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom' })
            .setColor('Green')
            .setTitle('Rol entregado')
            .setDescription('¡Gracias por apoyar al servidor!')
            .setFooter({ text: 'BETA | Etiqueta - Team KNX', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        /* Rol del servidor */
        const { roles } = interaction.member;
        const role = await interaction.guild.roles.fetch('936994434195783701');
        const nombreUser = interaction.user.username;

        /* Tiene el rol */
        if (roles.cache.has('936994434195783701')) {
            return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [embedPrevio], ephemeral: true });
        }

        /* Tiene alguna de las etiquetas */
        const listaEtiquetas = ['knx', 'KNX', 'KnX']
        for (const etiquetas of listaEtiquetas) {
            console.log(`Checando ${etiquetas} de ${nombreUser}`);
            if ((interaction.user.username).includes(etiquetas)) {
                await interaction.deferReply({ fetchReply: true, ephemeral: true });

                await roles.add(role).catch(console.error);
                console.log(`${etiquetas} no fue encontrado!`);
                
		await client.channels.fetch;
                const channel = await client.channels.cache.get('1041332048838791188');
                channel.send({ content: `<@${interaction.user.id}>`, embeds: [embedTrue] });

                return interaction.editReply({ content: `<@${interaction.user.id}>`, embeds: [embedTrue], ephemeral: true });
            }
            console.log(`Nope. (${etiquetas})`);
        }

        /* No tiene la etiqueta del servidor */
        return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [embedFalse], ephemeral: true });
    }
}