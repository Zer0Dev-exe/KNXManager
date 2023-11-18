const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ia')
    .setDescription('Usa los comandos de la IA de Kirinuxx Manager.')
    .addSubcommand(command =>
        command
            .setName('configurar')
            .setDescription('Configura tu llave de la ia IA')
            .addStringOption(option =>
                option
                .setName('key')
                .setDescription('La llave')
                .setRequired(true)
            )
    )
    .addSubcommand(command =>
        command
            .setName('tutorial')
            .setDescription('Configura tu llave de la ia IA')
    ),
    async execute(interaction, client) {

        if(interaction.options.getSubcommand() === 'configurar') {

            const key = interaction.options.getString("key")


            const canal = client.channels.cache.get('1116393257971236966')
            if(key === "null") {
    
        
            await interaction.reply("👍")
    
            client.settings.set(interaction.user.id, "none", "aichat.key")
            return;
        
            // client.settings.ensure(interaction.user.id, {
            //     key: "none"
            // }, "aichat")
            }
            
            if(!client.settings.has(interaction.user.id)) {
                client.settings.ensure(interaction.user.id, {
                    key: key
                }, "aichat")
                return await interaction.reply("👍")
            } else {
                client.settings.set(interaction.user.id, key, "aichat.key")
                canal.send({ content: `Llave de ${interaction.user.username} establecida con exito`})
                return await interaction.reply({ content: 'Tu llave ha sido establecida con exito', ephemeral: true })
            }

        } else if(interaction.options.getSubcommand() === 'tutorial') {

            const embed = new EmbedBuilder()
            .setTitle('Tutorial de IA! <a:Estrellas2:1074116785713983600>')
            .setColor('#6f6ff7')
            .setDescription('Bienvenidos a la IA de Kirinuxx Manager, en este bot hemos añadido una función para que podáis usar una inteligencia artificial como la de CHAT GPT pero integrado en nuestro bot, el proceso es muy facil por lo que invitamos a todos a probarlo, crea una cuenta en la pagina web de https://platform.openai.com y luego sigue los pasos del GIF adjuntado en la imagen, cualquier duda haz ping a <@817515739711406140>.\n\n**PD:** El bot tiene un máximo de usos por lo que recomiendo si vas a usar algún emoji o frase para hablar usar una ! antes de las palabras para que consuma de la llave.')
            .setImage('https://media.discordapp.net/attachments/1102694244713500674/1106219324496150539/Tutorial_IA.gif?width=768&height=365')
            .setFooter({ text: 'Sistema de IA de Kirinuxx Manager', iconURL: `${client.user.avatarURL() }`})

            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    }
}