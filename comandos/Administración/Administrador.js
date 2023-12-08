const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('administrador')
    .setDescription('Comandos de Administrador')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommandGroup(group => 
        group
        .setName('rol')
        .setDescription('Comandos de Rol')
        .addSubcommand(subcommand => 
            subcommand
            .setName('agregar')
            .setDescription('Agrega rol a miembro')
            .addRoleOption(option =>
                option
                .setName('rol')
                .setDescription('Rol que deseas agregar')
                .setRequired(true)
            )
            .addUserOption(option =>
                option
                .setName('miembro')
                .setDescription('El miembro al que deseas agregar')
            )
        )
    ),

    async execute(interaction, client) {

        if (interaction.options.getSubcommandGroup() == 'rol') {

            if (interaction.options.getSubcommand() == 'agregar') {

                const miembro = interaction.options.getMember('miembro')
                const rol = interaction.options.getRole('rol')

                const embed = new EmbedBuilder()
                .setTitle(`Agregado rol a ${miembro.user.displayName}`)
                .setDescription(`Se ha agregado ${rol} a ${miembro}`)
                .setColor('Blurple')
                miembro.roles.add(rol.id)
                interaction.reply({ embeds: [embed]})
            }
        }
    }
}