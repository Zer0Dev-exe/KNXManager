const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, CommandInteractionOptionResolver } = require('discord.js')
const Reputation = require('../../Schemas/repSchema.js');


// Map to track last reputation and super rep given time for each user
const cooldowns = new Map();
const targetCooldowns = new Map();
const superRepCooldowns = new Map();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('puntos')
    .setDescription('Sistema de puntos')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
    .addSubcommand(subcommand =>
        subcommand
        .setName('ranking')
        .setDescription('Ranking de reputación')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('perfil')
        .setDescription('Perfil de reputación')
        .addUserOption(option =>
            option
            .setName('staff')
            .setDescription('Elige el Staff')
        )
    ),

    async execute(interaction, client) {

        
        if (interaction.options.getSubcommand() == 'ranking') {

            if(!interaction.member.roles.cache.has("713630122141286440")) return interaction.reply({ content: "No eres staff para usar este comando", ephemeral: true })

            const guildId = interaction.guild.id;
            try {
                const leaderboard = await Reputation.find({ guildId: guildId, }).sort({ reputationPoints: -1 }).limit(10);

                const embed = new EmbedBuilder()
                    .setTitle('Ranking Puntos')
                    .setURL(`https://www.twitch.tv/kirinuxx`)
                    .setFooter({ text: `2023 © ${interaction.guild.name} - Tabla de puntos`, iconURL: `${interaction.guild.iconURL()}`})
                    .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
                    .setDescription('<a:Estrellas7:1154899760310923384> *En esta lista de mostrará el top de puntos de Staff, estará limitada a un máximo de diez staffs que tengan más puntos* <a:Estrellas7:1154899760310923384>')
                    .setColor('#5a81ff');

                for (let i = 0; i < leaderboard.length; i++) {
                    const user = await client.users.fetch(leaderboard[i].userId);
                    embed.addFields({
                        name: `<a:Estrellas4:1074117320865230919> ${i + 1}. ${user.username}`,
                        value: `> <a:Estrellas7:1154899760310923384> **__Puntos Staff:__** ${leaderboard[i].reputationPoints}\n> <a:Estrellas7:1154899760310923384> **__Superpuntos Staff:__** ${leaderboard[i].superRepReceived}`,
                    });
                }

                await interaction.reply({ embeds: [embed] });
            } catch (err) {
                console.error(err);
            }

        } else if (interaction.options.getSubcommand() == 'perfil') {

            const usuario = interaction.options.getUser('staff')

            if(!usuario) {
                const guildId = interaction.guild.id;
                const userReputation = await Reputation.findOne({ guildId: guildId, userId: interaction.user.id });

                if (!userReputation) return await interaction.reply({ content: 'Necesitas tener puntos para usar este comando.' });
                const rank = await Reputation.find({ guildId: guildId, reputationPoints: { $gt: userReputation.reputationPoints } }).countDocuments() + 1;

                if (!rank) return await interaction.reply({ content: 'Necesitas tener puntos para usar este comando.' });
                const puntos = await Reputation.findOne({ guildId: interaction.guild.id, userId: interaction.user.id })

                if (!puntos) return await interaction.reply({ content: 'Necesitas tener puntos para usar este comando.' });

                const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
                .setTitle(`Estadisticas Staff de ${interaction.user.username} `)
                .setURL(`https://www.twitch.tv/kirinuxx`)
                .setColor('Random')
                .setThumbnail(`${interaction.user.avatarURL()}`)
                .setFooter({ text: `2023 © ${interaction.guild.name} - Stats de ${interaction.user.username}`, iconURL: `${interaction.guild.iconURL()}`})
                .setDescription(`<a:Estrellas4:1074117320865230919> **Puntos Staff:**\n> <a:Estrellas2:1074116785713983600> **__Puntos Totales:__** ${puntos.reputationPoints}\n> <a:Estrellas2:1074116785713983600> **__Superpuntos:__** ${puntos.superRepReceived}\n\n<a:Estrellas4:1074117320865230919> **Datos Extra:**\n> <a:Estrellas7:1154899760310923384> **__Rank:__** ${rank}\n> <a:Estrellas7:1154899760310923384> **__Último Punto:__** <t:${puntos.ultimoRep}> `)
                
                interaction.reply({ embeds: [embed]})

            } else if(usuario) {

                const guildId = interaction.guild.id;
                const userReputation = await Reputation.findOne({ guildId: guildId, userId: usuario.id });
                const leaderboard = await Reputation.find({ guildId: guildId, reputationPoints: { $gt: userReputation.reputationPoints } }).countDocuments() + 1;

                const puntos = await Reputation.findOne({ userId: usuario.id })

                const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
                .setTitle(`Estadisticas Staff de ${usuario.username} `)
                .setThumbnail(`${usuario.avatarURL()}`)
                .setURL(`https://www.twitch.tv/kirinuxx`)
                .setColor('Random')
                .setFooter({ text: `2023 © ${interaction.guild.name} - Stats de ${usuario.username}`, iconURL: `${interaction.guild.iconURL()}`})
                .setDescription(`<a:Estrellas4:1074117320865230919> **Puntos Staff:**\n> <a:Estrellas2:1074116785713983600> **__Puntos Totales:__** ${puntos.reputationPoints}\n> <a:Estrellas2:1074116785713983600> **__Superpuntos:__** ${puntos.superRepReceived}\n\n<a:Estrellas4:1074117320865230919> **Datos Extra:**\n> <a:Estrellas7:1154899760310923384> **__Rank:__** ${leaderboard}\n> <a:Estrellas7:1154899760310923384> **__Último Punto:__** <t:${puntos.ultimoRep}> `)
                interaction.reply({ embeds: [embed]})
            }
        }
    }
}