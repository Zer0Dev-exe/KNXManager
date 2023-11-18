const { SlashCommandBuilder, ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const cpuStat = require("cpu-stat");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Comandos relacionados con el bot directamente')
    .addSubcommand(subcommand =>
        subcommand 
        .setName("actividad")
        .setDescription("Enseña el tiempo que el bot lleva encendido.")
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("help")
        .setDescription("Te devuelve una lista con los comandos del bot.")
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("info")
        .setDescription("Devuelve la información acerca del bot.")
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('ping')
        .setDescription('Comando de ping')
    ),

    async execute(interaction, client) {

            if(interaction.options.getSubcommand() === 'actividad') {

                const dias = Math.floor(client.uptime / 86400000)
                const horas = Math.floor(client.uptime / 3600000) % 24
                const minutos = Math.floor(client.uptime / 60000) & 60
                const segundos = Math.floor(client.uptime / 1000) % 60

                const embed = new EmbedBuilder()
                .setTitle(`Actividad de __${client.user.username}__`)
                .setColor("Random")
                .setTimestamp()
                .addFields(
                    { name: "Actividad", value: ` \`${dias}\` días, \`${horas}\` horas, \`${minutos}\` minutos y \`${segundos}\` segundos.`}
                )

                interaction.reply({ embeds: [embed] })

            } else if(interaction.options.getSubcommand() === 'help') {

                const emojis = {
                    bot: "1074133200877650020",
                    entretenimiento: "1055250360102572092",
                    utilidad: "1074137802620551321",
                    moderación: "1014991607998730361",
                };
              
                const directories = [
                    ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
                ];
              
                const formatString = (str) =>
                `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
              
                const categories = directories.map((dir) => {
                    const getCommands = interaction.client.commands
                    .filter((cmd) => cmd.folder === dir)
                    .map((cmd) => {
                    return {
                        name: cmd.data.name,
                        description:
                        cmd.data.description ||
                        "There is no description for this command.",
                    };
                });
              
                return {
                    directory: formatString(dir),
                    commands: getCommands,
                };
                });
              
                const embed = new EmbedBuilder()
                .setAuthor({ name: 'Kirinuxx Manager', iconURL: 'https://media.discordapp.net/attachments/936591912079618089/1079950482799333496/png_20230228_031722_0000.png?width=499&height=499', url: 'https://twitch.tv/kirinuxx' })
                .setTitle("<a:KNX_Welcome:953369429062848522>  Lista de Comandos de Kirinuxx Manager")
                .setDescription("<a:Estrellas4:1074117320865230919> **〉Información**\n> <a:Estrellas5:1074117495079833703> **Kirinuxx Manager** solo tiene uso para miembros del staff de Kirinuxx Stars con varias funcionalidad para mejor uso y manejo de sistemas normalmente usados en el servidor.\n\n***`- Cualquier tipo de copyright de este bot puede acabar en una suspensión de uso del bot.`***")
                .setColor("#4b6ff7")
                .setFooter({ text: `Desarrollado por Developers de Kirinuxx Stars` });

                const components = (state) => [
                new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId("help-menu")
                .setPlaceholder("Porfavor escoje una categoría de comandos")
                .setDisabled(state)
                .addOptions(
                    categories.map((cmd) => {
                    return {
                        label: cmd.directory,
                        value: cmd.directory.toLowerCase(),
                        description: `Comandos del directorio ${cmd.directory}.`,
                        emoji: emojis[cmd.directory.toLowerCase() || null],
                    };
                })
                    )
                ),
                ];
              
                const initialMessage = await interaction.reply({
                embeds: [embed],
                components: components(false),
                });
              
                const filter = (interaction) =>
                interaction.user.id === interaction.member.id;
              
                const collector = interaction.channel.createMessageComponentCollector({
                    filter,
                    componentType: ComponentType.SelectMenu,
                });
              
                collector.on("collect", (interaction) => {
                    const [directory] = interaction.values;
                    const category = categories.find(
                      (x) => x.directory.toLowerCase() === directory
                    );
              
                const categoryEmbed = new EmbedBuilder()
                .setColor('#4b6ff7')
                .setTitle(`${formatString(directory)} comandos`)
                .setDescription(
                `Lista de comandos del directorio ${directory}`
                )
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                        name: `\`${cmd.name}\``,
                        value: cmd.description,
                        inline: true,
                    };
                })
                );
              
                interaction.update({ embeds: [categoryEmbed] });
                });
              
                collector.on("end", () => {
                initialMessage.edit({ components: components(true) });
                });

            } else if(interaction.options.getSubcommand() === 'ping') {

                await interaction.reply(`Pong! ${client.ws.ping}ms :ping_pong:`);

            } else if(interaction.options.getSubcommand() === 'info') {

                const dias = Math.floor(client.uptime / 86400000)
                const horas = Math.floor(client.uptime / 3600000) % 24
                const minutos = Math.floor(client.uptime / 60000) & 60
                const segundos = Math.floor(client.uptime / 1000) % 60

                cpuStat.usagePercent(function (error, percent) {
                if(error) return interaction.reply({ content: `${error}` })

                const memoryUsage = formatBytes = formatBytes(process.memoryUsage().heapUsed)
                const node = process.version
                const cpu = percent.toFixed(2)

                const embed = new EmbedBuilder()

                .setTitle(":robot: Información acerca del bot")
                .setColor("#4b6ff7")
                .setThumbnail('https://media.discordapp.net/attachments/936591912079618089/1079793826467676280/KiriPNG.png?width=192&height=192')
                .addFields(
                    { name: "<:Dev:1065385607775408148> Desarrollador", value: "! Zer0 🥀 |ᵖᵏ#9999", inline: true },
                    { name: "<:Miembro:1065385705548828762> Usuario", value: `${client.user.username}`, inline: true },
                    { name: "<:ID:1065385749899395142> ID", value: `${client.user.id}`, inline: true },
                    { name: "<:Crear:1065385806572834867> Creación", value: "21/12/2022" },
                    { name: "<:Help:1065385854450794537> Comando Help", value: "Slash `/ayuda`"},
                    { name: "<:Enviado:1058059054842400848> Actividad", value: `\`${dias}\` días, \`${horas}\` horas, \`${minutos}\` minutos y \`${segundos}\` segundos.` },
                    { name: "🏓 Ping", value: `${client.ws.ping}ms` },
                    { name: "<:Node:1065386307532111965> Versión Node", value: `${node}` },
                    { name: "<:CPU:1065392218908676186> Uso CPU", value: `${cpu}%` },
                    { name: "<a:Cargando:1058058544571760670> Memoria Usada", value: `${memoryUsage}` },
                )
                .setFooter({
                    text: `Ejecutado por ${interaction.user.username}`,
                    iconURL: `${interaction.user.avatarURL()}`
                })

                interaction.reply({ embeds: [embed] })
                })

                function formatBytes(a, b) {
                    let c = 1024
                    d = b || 2
                    e = ['B', 'KB', 'MB', 'GB', 'TB']
                    f = Math.floor(Math.log(a) / Math.log(c))

                    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
                }
            }
    }
}