const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('animateav')
    .setDescription('Pon un avatar animado a tu bot')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addAttachmentOption(option =>
        option
        .setName('avatar')
        .setDescription('El avatar que quieres ponerle')
    ),

    async execute(interaction, client) {

        const {options} = interaction;
        const avatar = options.getAttachment('avatar');

        async function sendMessage(message) {
            const embed = new EmbedBuilder()
            .setColor('Blue')
            .setDescription(message)

            await interaction.reply({ embeds: [embed], ephemeral: true })

        }

        if (avatar.contentType !== "image/gif") return await sendMessage(`Porfavor usa un formato gif`)

        var error;
        await client.user.setAvatar(avatar.url).catch(async err => {
            error = true;
            console.log(err);
            return await sendMessage(`Error ${err.toString()}`)
        });

        if(error) return;
        await sendMessage(`He actualizado tu avatar`)
    }
}