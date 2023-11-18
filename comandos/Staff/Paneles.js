const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('panel')
    .setDescription('Panel de normas')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommand(subcommand =>
        subcommand
        .setName('normas')
        .setDescription('Panel de Normas')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('guia')
        .setDescription('Panel de Guia')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('redes')
        .setDescription('Panel de Redes')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('streamloots')
        .setDescription('Panel de Streamloots')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('autoroles')
        .setDescription('Panel de Autoroles')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('colores')
        .setDescription('Panel de Colores')
    ),

    async execute(interaction, client) {

        if(interaction.options.getSubcommand() === 'normas') {

            const embed = new EmbedBuilder()
            .setTitle('Normas del servidor')
            .setColor('#2d2c2c')
            .setDescription('¡Haz click en el menú desplegable que encontrarás abajo para ver las reglas del servidor!')
            .setThumbnail(`${interaction.guild.iconURL()}`)

            const menu = new ActionRowBuilder()
            .addComponents(
            new SelectMenuBuilder()
                .setCustomId("normas")
                .setPlaceholder("Selecciona una opción")
                    .addOptions(
                        {
                            label: "¿Para qué normas?",
                            description: "La importancia de las normas",
                            emoji: '❓',
                            value: "1"
                        },
                        {
                            label: "Derechos y obligaciones",
                            description: "Informate más acerca del uso",
                            emoji: '🌐',
                            value: "2"
                        },
                        {
                            label: "Normas Globales",
                            description: "Crea un ticket de Debate",
                            emoji: '📘',
                            value: "3"
                        },
                        {
                            label: "Normas Canales Texto",
                            description: "Las reglas en canales de texto",
                            emoji: '📗',
                            value: "4"
                        },
                        {
                            label: "Normas Canales Voz",
                            description: "Las reglas en canales de voz",
                            emoji: '📙',
                            value: "5"
                        },
                        {
                            label: "Datos Extra",
                            description: "Importantes datos para tener en cuenta",
                            emoji: '📚',
                            value: "6"
                        },
    
                        )
                    )
            interaction.reply({ content: 'Enviado', ephemeral: true })
            interaction.channel.send({ embeds: [embed], components: [menu]})

        } else if(interaction.options.getSubcommand() === 'guia') {

            const guia = new ActionRowBuilder()
            .addComponents(
            new SelectMenuBuilder()
                .setCustomId("guia")
                .setPlaceholder("Selecciona roles o canales")
                    .addOptions(
                        {
                            label: "Información Canales",
                            description: "Despliega la información de canales",
                            emoji: '1132687579490291814',
                            value: "canal"
                        },
                        {
                            label: "Información Roles",
                            description: "Despliega la información de roles",
                            emoji: '1132687645076627547',
                            value: "rol"
                        },
                        )
            )

            const embed = new EmbedBuilder()
            .setTitle('Guia del servidor')
            .setDescription('¡Haz click en el menú desplegable que encontrarás abajo la información de roles y los canales del servidor!')
            .setThumbnail(`${interaction.guild.iconURL()}`)
            .setColor('#2d2c2c')


            interaction.channel.send({ components: [guia], embeds: [embed] })
            interaction.reply({ content: 'Guia enviada', ephemeral: true })

        } else if(interaction.options.getSubcommand() === 'redes') {

            const embed = new EmbedBuilder()
            .setDescription('# Redes @kirinuxx\n\n- En este canal podrás encontrar todas las redes sociales de Kirinuxx donde sube publicaciones, pulsando en cada botón podrás acceder al link de dicha plataforma, se agradece el apoyo que se de.')
            .setImage('https://media.discordapp.net/attachments/936591912079618089/1022805999922462780/Redes_Sociales.png?width=450&height=45')
            .setColor('#09fadd')
            .setThumbnail(`${interaction.guild.iconURL()}`)

            const redes = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Twitter')
                .setURL('https://twitter.com/kirinuxx')
                .setEmoji('936327481617682432')
                .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                .setLabel('Twitch')
                .setURL('https://twitch.tv/kirinuxx')
                .setEmoji('936327481860980766')
                .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                .setLabel('Instagram')
                .setURL('https://www.instagram.com/kirinuxxofficial/')
                .setEmoji('1020541782708203582')
                .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                .setLabel('Tiktok')
                .setURL('https://www.tiktok.com/@kirinuxxtwitch')
                .setEmoji('1132694911792185449')
                .setStyle(ButtonStyle.Link),
            )
            interaction.reply({ content: 'Panel de redes enviado', ephemeral: true })
            interaction.channel.send({ components: [redes], embeds: [embed] })

        } else if(interaction.options.getSubcommand() === 'streamloots') {

            const embed = new EmbedBuilder()
            .setDescription('# Cofres de Streamloots\n### __¿Cómo se consiguen los cofres?__\n\n- Eventos y sorteos en el servidor de Discord.\n- Suscripción, amistosas y otros eventos en el canal de Twitch.\n### __¿Para qué sirven los cofres?__\n\n- En los cofres obtendrás 3 cartas por cada uno de ellos.\n- En ellos puedes obtener recompensas de todo tipo y de diferentes rangos, ya sea desde un saludo, hasta 50€ en Amazon.\n- Dependiendo del rango de las cartas tendrás muchas o escasas posibilidades de conseguirlas (todas tienen un mínimo %).\n### __¿Cómo me uno a Streamloots?__\n\n- Muy fácil, clica el enlace de abajo y asocia tu cuenta de Twitch a Streamloots, así de fácil.\n- Puedes echarle un vistazo a las cartas que tenemos disponibles desde el mismo enlace.')
            .setColor('#39c7fa')

            const boton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Streamloots')
                .setURL('https://www.streamloots.com/kirinuxx')
                .setStyle(ButtonStyle.Link),
            )

            interaction.reply({ content: 'Enviado panel', ephemeral: true })
            interaction.channel.send({ embeds: [embed], components: [boton] })
    
        } else if(interaction.options.getSubcommand() === 'colores') {
            const embed = new EmbedBuilder()
            .setTitle("<a:Estrellas4:1074117320865230919> Menú de Colores <a:Estrellas4:1074117320865230919>")
            .setDescription('<a:Estrellas3:1074116929029144706> Pulsando en el menu de selección podrás elegir tu color preferido, si deseas remover alguno de esos roles deverás de pulsar otra vez en el color y te saldrá una opción para remover dicho color. <a:Estrellas3:1074116929029144706>')
            .setColor('#fc5286')
            .setImage('https://media.tenor.com/eA3SPPa8nowAAAAC/spike-brawl-stars.gif')
            .setFooter({ text: 'Sistema de colores personalizado', iconURL: `${interaction.guild.iconURL()}`})

            const colores = new ActionRowBuilder()
            .addComponents(
            new SelectMenuBuilder()
            .setCustomId("colores")
            .setPlaceholder("Selecciona tu color favorito")
                .addOptions(
                    {
                        label: "Azul Oscuro VIP",
                        description: "Un azul oscuro",
                        emoji: "1076288846158905427",
                        value: "azul"
                    },
                    {
                        label: "Negro VIP",
                        description: "Un color muy oscuro",
                        emoji: "957238576494563418",
                        value: "negro"
                    },
                    {
                        label: "Morado Rosado VIP",
                        description: "Un morado un tanto especial",
                        emoji: "853018409784049694",
                        value: "morado"
                    },
                    {
                        label: "Verde Amarillo VIP",
                        description: "Verde pero amarillo, pruebalo!",
                        emoji: "953369428798623865",
                        value: "verde"
                    },
                    {
                        label: "Amarillo Oro VIP",
                        description: "Un color un tanto especial",
                        emoji: "918935214720421948",
                        value: "amarillo"
                    },
                    {
                        label: "Marron VIP",
                        description: "Un color un tanto triste",
                        emoji: "941757485218426950",
                        value: "marron",
                    },
                    {
                        label: "Blanco Azulado VIP",
                        description: "Como las nubes",
                        emoji: "812665510248316928",
                        value: "blanco"
                    },
                    {
                        label: "Dejar de seleccionar",
                        description: 'Para que puedas elegir denuevo',
                        emoji: '❌',
                        value: 'nada'
                    }
                )

            )

            const check = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Chequea tus Roles')
                .setCustomId('checkcolor')
                .setStyle(ButtonStyle.Danger),
            )

            interaction.channel.send({ embeds: [embed], components: [colores, check] })
            interaction.reply({ content: 'El embed ha sido enviado', ephemeral: true })
        }
    }
}