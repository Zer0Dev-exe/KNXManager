const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('informacion')
    .setDescription('Información sobre usuarios y avatares.')
    //SERVIDOR
    .addSubcommandGroup(group =>
		group
            .setName('servidor')
            .setDescription('Comandos relacionados con el servidor')
            .addSubcommand(subcommand => 
                subcommand
                    .setName('info')
                    .setDescription('Información sobre el servidor.')
            )
            .addSubcommand(subcommand => 
                subcommand
                    .setName('icono')
                    .setDescription('Te devuelve el icono del servidor.')
            )
            .addSubcommand(subcommand => 
                subcommand
                    .setName('banner')
                    .setDescription('Te devuelve el banner del servidor.')
            )
    )
    //USUARIO
    .addSubcommandGroup(group =>
        group
            .setName('usuario')
            .setDescription('Comandos relacionados con el usuario del servidor.')
            .addSubcommand(subcommand => 
                subcommand 
                .setName('info')
                .setDescription('Información sobre el usuario')
                .addUserOption(option =>
                    option
                    .setName("usuario")
                    .setDescription("Elige el usuario")
                )
            )
            .addSubcommand(subcommand => 
                subcommand
                .setName('avatar')
                .setDescription('Muestra el avatar del usuario')
                .addUserOption(option =>
                    option
                    .setName("usuario")
                    .setDescription("Elige el usuario")
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand => 
                subcommand
                .setName('banner')
                .setDescription('Muestra el banner del usuario')
                .addUserOption(option =>
                    option
                    .setName("usuario")
                    .setDescription("Elige el usuario")
                    .setRequired(true)
                )
            )
    )
    .addSubcommandGroup(group =>
        group
            .setName('rol')
            .setDescription('Comandos relacionados con el rol del servidor.')
            .addSubcommand(subcommand =>
                subcommand
                .setName("mostrar")
                .setDescription("Recibe informacion sobre el rol del servidor de Discord.")
                .addRoleOption(option =>
                    option
                    .setName('rol')
                    .setDescription('Muestra la información del rol')
                    .setRequired(true)
                )
            )
    ),
            
    async execute(interaction, client) {

        if (interaction.options.getSubcommandGroup() == 'usuario') {

            
            if(interaction.options.getSubcommand() === 'info') {

                const user = interaction.options.getUser('usuario');
                const miembro = await interaction.guild.members.fetch(user.id);

                const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setThumbnail(user.displayAvatarURL())
                    .setAuthor({
                        name: user.tag,
                        iconURL: user.displayAvatarURL(),
                    })
                    .addFields(
                        {
                            name: 'Cuenta creada el',
                            value: `${user.createdAt.toLocaleString()}`,
                            inline: true
                        },
                        {
                            name: 'Unión al servidor:',
                            value: `${interaction.guild.joinedAt.toLocaleString()}`,
                            inline: true
                        },
                        {
                            name: 'ID usuario',
                            value: `${user.id}`,
                            inline: true,
                        },
                        {
                            name: 'Tag usuario',
                            value: `${user.username}`,
                            inline: true,
                        },
                        {
                            name: 'El usuario es bot?',
                            value: `${user.bot}`,
                            inline: true,
                        },
                    )
                    .setFooter({
                        text: `Ejecutado por ${interaction.user.username}`,
                        iconURL: `${interaction.user.avatarURL()}`
                    })

                    await interaction.reply({ embeds: [embed] });

            } else if(interaction.options.getSubcommand() === 'avatar') {

                let user = interaction.options.getUser('usuario');
                const miembro = await interaction.guild.members.fetch(user.id);

                const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setImage(user.displayAvatarURL({size: 1024}))
                    .setAuthor({
                        name: user.tag,
                        iconURL: user.displayAvatarURL(),
                    })
                    .setFooter({
                        text: `Ejecutado por ${interaction.user.username}`,
                        iconURL: `${interaction.user.avatarURL()}`
                    })
                
                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`PNG`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(user.displayAvatarURL({size: 1024,extension: 'png', dynamic: true}))
                    )
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`JPG`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(user.displayAvatarURL({size: 1024,extension: 'jpg', dynamic: true}))
                    )
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`GIF`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(user.displayAvatarURL({size: 1024,extension: 'gif', dynamic: true}))
                    )


                    await interaction.reply({ embeds: [embed], components: [boton] });
            
            } else if(interaction.options.getSubcommand() === 'banner') {

                const user = interaction.options.getUser('usuario');
                const miembro = await interaction.guild.members.fetch(user.id);
                let member = await user.fetch({ force: true})

                const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setImage(user.bannerURL({ size: 1024 }))
                    .setAuthor({
                        name: user.tag,
                        iconURL: user.displayAvatarURL(),
                    })
                    .addFields(
                        {
                            name: 'Banner:',
                            value: user.bannerURL() ? "** **" : "El usuario no tiene banner"
                        }
                    )
                    .setFooter({
                        text: `Ejecutado por ${interaction.user.username}`,
                        iconURL: `${interaction.user.avatarURL()}`
                    })

                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`PNG [ Si es GIF solo saldrá como GIF ]`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(user.bannerURL({size: 1024,extension: 'png', dynamic: false}))
                    )
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`GIF`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(user.bannerURL({size: 1024,extension: 'gif', dynamic: true}))
                    )

                    await interaction.reply({ embeds: [embed], components: [boton] });
            }

        } else if (interaction.options.getSubcommandGroup() == 'servidor') {

            if(interaction.options.getSubcommand() === 'info') {

                const { guild } = interaction;
                const { members } = guild;
                const { name, ownerId, createdTimestamp, memberCount } = guild;
                const icon = guild.iconURL()
                const roles = guild.roles.cache.size;
                const emojis = guild.emojis.cache.size;
                const id = guild.id;

                let baseVerification = guild.VerificationLevel;

                if (baseVerification == 0) baseVerification = "Nada"
                if (baseVerification == 1) baseVerification = "Bajo"
                if (baseVerification == 2) baseVerification = "Medio"
                if (baseVerification == 3) baseVerification = "Alto"
                if (baseVerification == 4) baseVerification = "Muy Alto"

                const embed = new EmbedBuilder()
                .setColor("#fa3939")
                .setThumbnail(icon)
                .setAuthor({ name: name, iconURL: icon})
                .setFooter({ text: `ID Servidor: ${id}`})
                .setTimestamp()
                .addFields(
                    { name: "Nombre", value: `${name}`, inline: false },
                    { name: "Fecha Creada", value: `<t:${parseInt(createdTimestamp / 1000)}:R> <pulsa para fecha concreta>`, inline: true },
                    { name: "Owner", value: `<@${ownerId}>`, inline: true },
                    { name: "Miembros", value: `${memberCount}`, inline: true },
                    { name: "Roles", value: `${roles}`, inline: true },
                    { name: "Emojis", value: `${emojis}`, inline: true },
                    { name: "Nivel Verificación", value: `${baseVerification}`, inline: true },
                    { name: "Server Boosts", value: `${guild.premiumSubscriptionCount}`, inline: true },

                )

                await interaction.reply({ embeds: [embed]})
            
            } if(interaction.options.getSubcommand() === 'icono') {

                const { guild } = interaction;
                const { name, ownerId, createdTimestamp, memberCount } = guild;
                const icon = guild.iconURL()
                const id = guild.id;

                const embed = new EmbedBuilder()
                .setColor("#fa3939")
                .setImage(guild.iconURL({ size: 1024, dynamic: true }))
                .setAuthor({ name: name, iconURL: icon})
                .setFooter({ text: `ID Servidor: ${id}`})
                .setTimestamp()

                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`PNG`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(guild.iconURL({size: 1024,extension: 'png', dynamic: true}))
                    )
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`JPG`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(guild.iconURL({size: 1024,extension: 'jpg', dynamic: true}))
                    )
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`GIF`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(guild.iconURL({size: 1024,extension: 'gif', dynamic: true}))
                    )

                await interaction.reply({ embeds: [embed], components: [boton]})
            
            } else if(interaction.options.getSubcommand() === 'banner') {

                const { guild } = interaction;
                const { members } = guild;
                const { name, ownerId, createdTimestamp, memberCount } = guild;
                const icon = guild.iconURL()
                let server = await guild.fetch({ force: true})

                const embed = new EmbedBuilder()
                .setColor("#fa3939")
                .setImage(guild.bannerURL({ size: 1024 }))
                .setAuthor({ name: name, iconURL: icon})
                .setFooter({ text: `Servidor: ${name}`})
                .addFields(
                    {
                        name: 'Server Banner',
                        value: guild.bannerURL() ? "** **" : "El servidor no tiene banner"
                    },

                )

                await interaction.reply({ embeds: [embed]})
            
            }
        
        } else if (interaction.options.getSubcommandGroup() == 'rol') {

            if(interaction.options.getSubcommand() === 'mostrar') {

                const rol = interaction.options.getRole('rol');

                if (!rol || !rol.id) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(warningColor)
                            .setDescription(`\`⚠️\` **•** El rol especificado no existe.`)
                    ],
                        ephemeral: true
                    })

                    if (rol.name === "@everyone") return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(warningColor)
                                .setDescription(`\`⚠️\` **•** El rol ${rol.name} no esta permitido. El rol no puede ser \`@everyone\`.`)
                        ],
                        ephemeral: true
                    }) 

                    const fechaCreada = parseInt(rol.createdTimestamp / 1000);
                    const mencionable = rol.mentionable ? "true" : "false";
                    const manejado = rol.managed ? "true" : "false";
                    const elevado = rol.hoisted ? "true" : "false";
                    const posicion = rol.position
                    const botrol = rol.botrole ? "true" : "false";
                    const permisos = rol.permissions

                    .toArray()
                    .map((P) => `${P}`)
                    .join(", ");

                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `@${rol.name} | Información del rol` })
                    .setColor(rol.color)
                    .addFields(
                        { name: "Nombre", value: `${rol.name}`, inline: true },
                        { name: "Color", value: `${rol.hexColor}`, inline: true },
                        { name: "Mención", value: `\`<@&${rol.id}>\``, inline: true },
                        { name: "Elevado", value: `${elevado}`, inline: true },
                        { name: "Posición", value: `${posicion}`, inline: true },
                        { name: "Mencionable", value: `${mencionable}`, inline: true },
                        { name: "Manejado", value: `${manejado}`, inline: true },
                        { name: "Bot Rol", value: `${botrol}`, inline: true },
                        { name: "Creado", value: `<t:${fechaCreada}:R>`, inline: true },
                        { name: "Permisos", value: `${permisos}`, inline: false },
                    )
                    .setFooter({ text: `ID Rol: ${rol.id}` })
                    .setTimestamp()

                await interaction.reply({ embeds: [embed], ephemeral: true })
            }
        }
    }
}