const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, TextInputBuilder } = require('discord.js');
const blacklist = require('../../Schemas/blacklist');

const ticketSchema = require('../../Schemas/ticketGuildSchema.js')
const ticketSchemaPost = require('../../Schemas/ticketGuildPostulaciones.js')

/**
     * 
     * //
     * 
     */
//@param {ChatInputCommandInteraction} interaction 


module.exports = {
    data: new SlashCommandBuilder()
    .setName('dev')
    .setDescription('Comandos de Desarrollo')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommandGroup(group =>
        group
        .setName('blacklist')
        .setDescription('Añade o remueve de la blacklist')
        .addSubcommand(command => 
            command
            .setName('agregar')
            .setDescription('Agrega un usuario a la blacklist')
            .addStringOption(option =>
                option
                    .setName('usuario')
                    .setDescription('El ID del usuario que quieras añadir a la blacklist')
                    .setRequired(true)
            )
        )
        .addSubcommand(command => 
            command
            .setName('eliminar')
            .setDescription('Elimina un usuario a la blacklist')
            .addStringOption(option =>
                option
                    .setName('usuario')
                    .setDescription('El ID del usuario que quieras eliminar de la blacklist')
                    .setRequired(true)
            )
        )
    )
    .addSubcommand(command => 
        command
        .setName('eliminar')
        .setDescription('Elimina un usuario a la blacklist')
        .addStringOption(option =>
            option
                .setName('usuario')
                .setDescription('El ID del usuario que quieras eliminar de la blacklist')
                .setRequired(true)
        )
    )
    .addSubcommandGroup(group =>
        group
        .setName('proceso')
        .setDescription('Añade o remueve de la blacklist')
        .addSubcommand(subcommand =>
        subcommand
            .setName('apagar')
            .setDescription('Apaga el bot')
        )
    )
    .addSubcommandGroup(group =>
        group
        .setName('soporte')
        .setDescription('Crea un sistema de Tickets para el servidor')
        .addSubcommand(subcommand =>
            subcommand
            .setName('configurar')
            .setDescription('Configura sistema Tickets')
            .addChannelOption(option =>
                option
                .setName('canal')
                .setDescription('Elige el canal donde se despliegen los tickets')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
            .addChannelOption(option =>
                option
                .setName('categoriasoporte')
                .setDescription('Elige la categoría de Soporte')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true)
            )
            .addChannelOption(option =>
                option
                .setName('categoriareporte')
                .setDescription('Elige la categoría de Reporte')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true)
            )
            .addChannelOption(option =>
                option
                .setName('categoriasorteo')
                .setDescription('Elige la categoría de Sorteo')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true)
            )
            .addRoleOption(option =>
                option
                .setName('everyone')
                .setDescription('El rol de everyone')
                .setRequired(true)
            )
            .addRoleOption(option =>
                option
                .setName('staff')
                .setDescription('El rol de Staff')
                .setRequired(true)
            )
            .addRoleOption(option =>
                option
                .setName('moderador')
                .setDescription('El rol de Moderador')
                .setRequired(true)
            )
            .addRoleOption(option =>
                option
                .setName('supervisor')
                .setDescription('El rol de Supervisor')
                .setRequired(true)
            )
        )
    )
    .addSubcommandGroup(group =>
        group
        .setName('postulaciones')
        .setDescription('Crea un sistema de Tickets de Postulaciones')
        .addSubcommand(subcommand =>
            subcommand
            .setName('configurar')
            .setDescription('Configura sistema Tickets Postulacion')
            .addChannelOption(option =>
                option
                .setName('canal')
                .setDescription('Elige el canal donde se despliegen los tickets')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
            .addChannelOption(option =>
                option
                .setName('categoriapost')
                .setDescription('Elige la categoría de Postulaciones')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true)
            )
            .addRoleOption(option =>
                option
                .setName('everyone')
                .setDescription('El rol de everyone')
                .setRequired(true)
            )
            .addRoleOption(option =>
                option
                .setName('stafftwitch')
                .setDescription('El rol de Staff Twitch')
                .setRequired(true)
            )
            .addRoleOption(option =>
                option
                .setName('administrador')
                .setDescription('El rol de Administrador')
                .setRequired(true)
            )
            .addRoleOption(option =>
                option
                .setName('direccion')
                .setDescription('El rol de Dirección')
                .setRequired(true)
            )
        )
    ),

    async execute(interaction, client) {

        if (interaction.options.getSubcommandGroup() == 'proceso') {

            if(interaction.options.getSubcommand() === 'apagar') {

                if (interaction.user.id != '817515739711406140') return;
                else {
                    await interaction.reply({ content: 'Apagando el bot...', ephemeral: true})
                    
                    setTimeout(async () => {
                        await interaction.editReply({ content: 'El bot ha sido apagado'});
                        process.exit();
                    }, 2000);
                }
            }

        } else if (interaction.options.getSubcommandGroup() == 'blacklist') {

            const { options } = interaction;
            if (interaction.user.id !== '817515739711406140') return await interaction.reply({ content: 'Solo el desarrollador puede usar este comando', ephemeral: true });

            const usuario = options.getString('usuario');

            const data = await blacklist.findOne({ User: usuario});
            const sub = options.getSubcommand();

            switch (sub) {
                case 'agregar':
                if (!data) {
                    await blacklist.create({
                        User: usuario,
                    })

                    const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setDescription(`El usuario ${usuario} ha sido blacklisteado del sistema del bot`)

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                } else if (data) {
                    return await interaction.reply({ content: `El usuario **${usuario}** ya esta en la **blacklist** desde antes`, ephemeral: true });
                }

                break;
                case 'eliminar':

                if (!data) {
                    return await interaction.reply({ content: `El usuario **${usuario}** no está en la **blacklist**`, ephemeral: true });
                } else if (data) {
                    await blacklist.deleteMany({ User: usuario});

                    const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setDescription(`El usuario ${usuario} ha sido removido de la **blacklist**`)

                    await interaction.reply({ embeds: [embed], ephemeral: true })
                }
            }
        } else if (interaction.options.getSubcommandGroup() == 'soporte') {

            if (interaction.options.getSubcommand() == 'configurar') {

                const { options } = interaction;
                const canalDisplay = options.getChannel('canal')
                const cSoporte = options.getChannel('categoriasoporte')
                const cReporte = options.getChannel('categoriareporte')
                const cSorteo = options.getChannel('categoriasorteo')
                const everyone = options.getRole('everyone')
                const staff = options.getRole('staff')
                const moderador = options.getRole('moderador')
                const supervisor = options.getRole('supervisor')

                const menu = new StringSelectMenuBuilder()
                .setCustomId('tickets')
                .setPlaceholder('Elige el tipo de Ticket que desees')
                .setMinValues(1)
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setDescription('Si necesitas soporte presiona aquí')
                    .setLabel('Ticket Soporte')
                    .setEmoji('994189584021856317')
                    .setValue('soporte'),
                    new StringSelectMenuOptionBuilder()
                    .setDescription('Si deseas reportar presiona aquí')
                    .setLabel('Ticket Reporte')
                    .setEmoji('994189586119020584')
                    .setValue('reporte'),
                    new StringSelectMenuOptionBuilder()
                    .setDescription('Si necesitas reclamar sorteo presiona')
                    .setLabel('Ticket Sorteo')
                    .setEmoji('1079721896968458334')
                    .setValue('sorteo'),
                )
                const row = new ActionRowBuilder().addComponents(menu)

                const embed = new EmbedBuilder()
                .setDescription('# <a:Estrellas5:1074117495079833703> __Sistema Soporte TEAM KNX__ <a:Estrellas5:1074117495079833703>\n\n- Para una mejor organización de Tickets, hemos pensando en crear categorías de tickets, donde solamente los miembros de <@&713630122141286440> puedan atenderte los tickets. El uso de los tickets es privado para una mejor asistencia a los miembros del servidor y más personalizada.')
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .setFooter({ text: 'El mal uso de tickets puede ser sancionado de parte de los staffs del servidor.', iconURL: `${interaction.guild.iconURL()}`})
                .setColor('#26dcf7')
                
                const data = await ticketSchema.findOne({guildId:interaction.guild.id})
                if(!data) {
                    await canalDisplay.send({ embeds: [embed], components: [row] })
                    await ticketSchema.create({
                        guildId: interaction.guild.id,
                        channelId: canalDisplay.id,
                        categorySoporte: cSoporte.id,
                        categoryReporte: cReporte.id,
                        categorySorteos: cSorteo.id,
                        handlerRol: staff.id,
                        everyoneRol: everyone.id,
                        moderador: moderador.id,
                        supervisor: supervisor.id
                    })

                    return interaction.reply({ content: 'Se ha creado el sistema de tickets', ephemeral: true })
                }
                if (data) {
                    await ticketSchema.findOneAndUpdate({
                        guildId: interaction.guild.id,
                        channelId: canalDisplay.id,
                        categorySoporte: cSoporte.id,
                        categoryReporte: cReporte.id,
                        categorySorteos: cSorteo.id,
                        handlerRol: staff.id,
                        everyoneRol: everyone.id
                    })
                    await data.save()
                    return interaction.reply({ content: 'Se modifico el sistema de Tickets', ephemeral: true })
                }
            }
        } else if (interaction.options.getSubcommandGroup() == 'postulaciones') {

            if (interaction.options.getSubcommand() == 'configurar') {

                const { options } = interaction;
                const canalDisplay = options.getChannel('canal')
                const cPost = options.getChannel('categoriapost')
                const everyone = options.getRole('everyone')
                const stafftwitch = options.getRole('stafftwitch')
                const admin = options.getRole('administrador')
                const direccion = options.getRole('direccion')

                const menu = new StringSelectMenuBuilder()
                .setCustomId('ticketspsot')
                .setPlaceholder('Elige el tipo de Ticket que desees')
                .setMinValues(1)
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setDescription('Si deseas postularte para Twitch pulsa aquí')
                    .setLabel('Staff Twitch')
                    .setEmoji('1139226012048171140')
                    .setValue('twitch'),
                    new StringSelectMenuOptionBuilder()
                    .setDescription('Si deseas postularte para Discord pulsa aquí')
                    .setLabel('Staff Discord')
                    .setEmoji('1139226067454926878')
                    .setValue('discord'),
                )
                const row = new ActionRowBuilder().addComponents(menu)

                const embed = new EmbedBuilder()
                .setColor('#ab5bfc')
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .setFooter({ text: `No abrir ticket con tal de hacer la gracia`, iconURL: `${interaction.guild.iconURL()}`})
                .setDescription(`# <a:Estrellas5:1074117495079833703> Postulaciones Twitch/Discord\n\n > Mediante estos tipos de tickets tendréis la opción de postularos al Staff, tener en cuenta que antes de postularos es obligatorio tener un tiempo mínimo como de 10m para completar las preguntas bien y con tranquilidad, cada tres semanas tendréis la oportunidad de volver a postularos por lo que pensd bien antes de pulsar en el boton.\n\n## Postulaciones Twitch <:StaffTwitch:1139226012048171140>\n\n > Buscamos moderadores dispuestoa a ayudar en los streams de Kirinuxx, esto significa estar activo/a en los directos y estar disponible para ayudar, tendréis una sala de mods donde os comunicarán las actualizaciones de los streams y la organización de dichos streams.\n\n## Postulaciones Discord <:StaffDiscord:1139226067454926878>\n\n> En Discord buscamos personal para que nos ayudeis con la realización de Eventos, Sorteos, Moderación de Chat y atención al cliente de Tickets. Será muy importante la actividad en el servidor ya que el objetivo queda en mantener un ambiente sano, activo y divertido.`)
                
                const data = await ticketSchemaPost.findOne({guildId:interaction.guild.id})
                if(!data) {
                    await canalDisplay.send({ embeds: [embed], components: [row] })
                    await ticketSchemaPost.create({
                        guildId: interaction.guild.id,
                        channelId: canalDisplay.id,
                        categoryPostulacion: cPost.id,
                        everyoneRol: everyone.id,
                        stafftwitch: stafftwitch.id,
                        admin: admin.id,
                        direccion: direccion.id
                    })

                    return interaction.reply({ content: 'Se ha creado el sistema de tickets', ephemeral: true })
                }
                if (data) {
                    await ticketSchemaPost.findOneAndUpdate({
                        guildId: interaction.guild.id,
                        channelId: canalDisplay.id,
                        categoryPostulacion: cPost.id,
                        everyoneRol: everyone.id,
                        stafftwitch: stafftwitch.id,
                        admin: admin.id,
                        direccion: direccion.id
                    })
                    await data.save()
                    return interaction.reply({ content: 'Se modifico el sistema de Tickets', ephemeral: true })
                }
            }
        }
    }

}