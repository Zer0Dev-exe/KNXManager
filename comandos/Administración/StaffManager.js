const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js')
const Reputation = require('../../Schemas/repSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('direccion')
    .setDescription('Comandos para Direccion')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommandGroup(group => 
        group
        .setName('puntos')
        .setDescription('Sistema de puntos Staff')
        .addSubcommand(subcommand =>
            subcommand
            .setName('añadir')
            .setDescription('Añadir puntos de Staff a un Staff')
            .addUserOption(option => 
                option
                .setName('usuario')
                .setDescription('The user you want to remove reputation from')
                .setRequired(true)
            )
            .addIntegerOption(option =>
                option
                .setName('puntos')
                .setDescription('Cantidad de puntos que quieras entregar')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName('remover')
            .setDescription('Remover puntos de un usuario')
            .addUserOption(option => 
                option
                .setName('usuario')
                .setDescription('The user you want to remove reputation from')
                .setRequired(true)
            )
            .addIntegerOption(option => 
                option
                .setName('puntos')
                .setDescription('The number of reputation points to remove')
                .setRequired(true)
            )
        )
    ),

    async execute(interaction, client) {

        if (interaction.options.getSubcommandGroup() == 'puntos') {

            if (interaction.options.getSubcommand() == 'añadir') {

                const user = interaction.options.getUser('usuario');
                const cantidad = interaction.options.getInteger('puntos')
                const authorId = interaction.user.id;
                const guildId = interaction.guild.id;
                let userRep = await Reputation.findOne({ guildId: guildId, userId: user.id }) || new Reputation({ guildId: guildId, userId: user.id });
                if (user.id === authorId) {
                    await interaction.reply("No puedes darte puntos a ti mismo.");
                    return;
                }

                userRep.reputationPoints = (userRep.reputationPoints || 0) + cantidad;
                userRep.lastRepTime = Date.now();
                userRep.ultimoRep = Math.round(Date.now() / 1000)

                await userRep.save();
                const puntos = await Reputation.findOne({ guildId: interaction.guild.id, userId: user.id })

                const embed = new EmbedBuilder()
                .setTitle(`Añadido correctamente ${cantidad} puntos a ${user.username}`)
                .setURL(`https://twitch.tv/kirinuxx`)
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .setFooter({ text: `2023 © ${interaction.guild.name} - Sistema Puntos`, iconURL: `${interaction.guild.iconURL()}`})
                .setDescription(`**__${user} Nuevos Puntos:__**\n> <a:KNX_Yes:957238576511340604> **Puntos Totales:** ${puntos.reputationPoints}\n> <a:KNX_Yes:957238576511340604> **Superpuntos Totales:** ${puntos.superRepReceived}\n> <a:KNX_Yes:957238576511340604> **Últimos Puntos:** <t:${puntos.ultimoRep}>`)
                .setColor('Random');

                await interaction.reply({ embeds: [embed] });

            } else if (interaction.options.getSubcommand() == 'remover') {

                const user = interaction.options.getUser('usuario');
                const cantidad = interaction.options.getInteger('puntos')
                const authorId = interaction.user.id;
                const guildId = interaction.guild.id;
                let userRep = await Reputation.findOne({ guildId: guildId, userId: user.id });
                if (!userRep) return interaction.reply({ content: 'Este staff no tiene puntos'})
                if (user.id === authorId) {
                    await interaction.reply("No puedes darte puntos a ti mismo.");
                    return;
                }

                userRep.reputationPoints = (userRep.reputationPoints || 0) - cantidad;

                await userRep.save();
                const puntos = await Reputation.findOne({ guildId: interaction.guild.id, userId: user.id })

                const embed = new EmbedBuilder()
                .setTitle(`Removido correctamente ${cantidad} puntos a ${user.username}`)
                .setURL(`https://twitch.tv/kirinuxx`)
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .setFooter({ text: `2023 © ${interaction.guild.name} - Sistema Puntos`, iconURL: `${interaction.guild.iconURL()}`})
                .setDescription(`**__${user} Nuevos Puntos:__**\n> <a:KNX_Noo:957238576528105482> **Puntos Totales:** ${puntos.reputationPoints}\n> <a:KNX_Noo:957238576528105482> **Superpuntos Totales:** ${puntos.superRepReceived}\n> <a:KNX_Noo:957238576528105482> **Últimos Puntos:** <t:${puntos.ultimoRep}>`)
                .setColor('Random');

                await interaction.reply({ embeds: [embed] });
            }
        }
    }
}