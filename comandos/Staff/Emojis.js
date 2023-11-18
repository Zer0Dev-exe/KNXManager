const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js")
const { default: axios } = require(`axios`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('iconos')
    .setDescription('Comandos de Sticker y Emojis.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
    .addSubcommandGroup(group =>
        group
            .setName('emoji')
            .setDescription(`lista de comandos del bot.`)
            .addSubcommand(subcommand =>
                subcommand
                .setName('añadir')
                .setDescription('Añade el emoji por imagen.')
                .addAttachmentOption(option =>
                    option
                    .setName('emoji')
                    .setDescription('El emoji que quieras añadir al servidor.')
                    .setRequired(true)
                )
                .addStringOption(option =>
                    option
                    .setName('nombre')
                    .setDescription('El nombre que le quieras añadir al emoji').setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('robar')
                .setDescription("Añade el emoji que elijas")
                .addStringOption(option => 
                    option
                    .setName("emote")
                    .setDescription("El emoji que quieras añadir al servidor.")
                    .setRequired(true))
                .addStringOption(option => 
                    option
                    .setName("nombre")
                    .setDescription("El nombre que deseas ponerle al nuevo sticker.")
                    .setRequired(true))
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('jumbo')
                .setDescription("Alarga el emoji que quieras")
                .setName("jumbo")
                .addStringOption(option => 
                    option
                    .setName(`emoji`)
                    .setDescription(`El emoji que deseas hacer grande`)
                    .setRequired(true)),
            )
    )
    .addSubcommandGroup(group =>
        group
            .setName('sticker')
            .setDescription(`lista de comandos del bot.`)
            .addSubcommand(subcommand =>
                subcommand
                .setName('añadir')
                .setDescription('Añade el emoji por imagen.')
                .addAttachmentOption(option =>
                    option
                    .setName('sticker')
                    .setDescription('Añade una imagen para añadir como sticker como png/jpeg')
                    .setRequired(true)
                    )
                .addStringOption(option => 
                    option
                    .setName('nombre')
                    .setDescription('El nombre del sticker')
                    .setRequired(true)
                    )
            )
    ),

    async execute(interaction, client) {
        //EJECUTAR PROMOTES
        if (interaction.options.getSubcommandGroup() == 'emoji') {

            if(interaction.options.getSubcommand() === 'añadir') {

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return interaction.reply({ content: `No tienes dichos permisos`, ephemeral: true })

                const archivo = interaction.options.getAttachment('emoji');
                const nombre = interaction.options.getString('nombre');

                await interaction.reply(`Cargando el emoji...`);

                const emoji = await interaction.guild.emojis.create({ attachment: `${archivo.attachment}`, name: `${nombre}`}).catch(err => {
                    setTimeout(() => {
                        console.log(err);
                        return interaction.editReply({ content: `${err.rawError.name}`})
                    }, 2000)
                })

                setTimeout(() => {
                    if (!emoji) return;

                    const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setTitle(`El emoji ha sido añadido ${emoji} con el nombre **${nombre}** `)

                    interaction.editReply({ content: ``, embeds: [embed] });
                }, 3000);

            } else if(interaction.options.getSubcommand() === 'robar') {
            
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return await interaction.reply({ content: "Necesitas tener el permiso de gestionar emotes y stickers para ello", ephemeral: true });

                let emote = interaction.options.getString(`emote`)?.trim();
                const nombre = interaction.options.getString('nombre');

                if (emote.startsWith("<") && emote.endsWith(">")) {
                    const id = emote.match(/\d{15,}/g)[0];

                    const tipo = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
                    .then(image => {
                        if (image) return "gif"
                        else return "png"
                    }).catch(err => {
                        return "png"
                    })

                    emote = `https://cdn.discordapp.com/emojis/${id}.${tipo}?quality=lossless`
                }

                if (!emote.startsWith("http")) {
                    return await interaction.reply({ content: "No puedes robar emojis preterminados del teclado"})
                }
                if (!emote.startsWith("https")) {
                    return await interaction.reply({ content: "No puedes robar emojis preterminados del teclado"})
                }

                interaction.guild.emojis.create({ attachment: `${emote}`, name: `${nombre}`})
                .then(emote => {
                    const embed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`Añadido ${emote} con el nombre de **${nombre}**`)

                    return interaction.reply({ embeds: [embed] });
                }).catch(err => {
                    interaction.reply({ content: "No puedes añadir un emoji porque llegaste al límite de emotes en el servidor", ephemeral: true})  
                })

            } else if(interaction.options.getSubcommand() === 'jumbo') {

                let emoji = interaction.options.getString('emoji')?.trim();

                if (emoji.startsWith("<") && emoji.endsWith(">")) {

                    const id = emoji.match(/\d{15,}/g)[0];

                    const tipo = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
                    .then(image => {
                        if (image) return "gif"
                        else return "png"
                    }).catch(err => {
                        return "png"
                    })

                    emoji = `https://cdn.discordapp.com/emojis/${id}.${tipo}?quality=lossless`
                }

                if (!emoji.startsWith("http")) {
                    return await interaction.reply({ content: "No puedes usar jumbo en emojis preterminados", ephemeral: true})
                }

                if (!emoji.startsWith("https")) {
                    return await interaction.reply({ content: "No puedes usar jumbo en emojis preterminados", ephemeral: true})
                }

                const embed = new EmbedBuilder()
                .setColor("#6832e3")
                .setDescription(`:white_check_mark: **El emoji ha sido transferido a imagen.**`)
                .setImage(emoji)
                .setTimestamp()
                .setFooter({
                    text: `Ejecutado por ${interaction.user.username}`,
                    iconURL: `${interaction.user.avatarURL()}`
                })

                const boton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel(`Descargable`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(`${emoji}`)
                    )

                await interaction.reply({ content: "Emoji convertido", embeds: [embed], components: [boton] });
            }
        }

        if (interaction.options.getSubcommandGroup() == 'sticker') {

            if(interaction.options.getSubcommand() === 'añadir') {
                
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return interaction.reply({ content: `No tienes dichos permisos`, ephemeral: true })

                const archivo = interaction.options.getAttachment('sticker');
                const nombre = interaction.options.getString('nombre');

                if (nombre.length <= 2) return await interaction.reply({ content: `El nombre no puede tener más de 2 caracteres`, ephemeral: true });
                if (archivo.contentType === 'image/gif') return  interaction.reply({ content: `No puedes añadir en modo gif`, ephemeral: true });

                await interaction.reply(`Cargando el sticker...`);

                const sticker = await interaction.guild.stickers.create({ file: `${archivo.attachment}`, name: `${nombre} `}).catch(err => (
                    setTimeout(() => {
                        return interaction.editReply({ content: `${err.rawError.message}`});
                    }, 20000)));;

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`Tu sticker ha sido añadido con el nombre \`${nombre}\``)

                setTimeout(() => {
                    if (!sticker) return;

                    interaction.editReply({ content: ``, embeds: [embed] });
                }, 3000);
            }
        }
    }
}