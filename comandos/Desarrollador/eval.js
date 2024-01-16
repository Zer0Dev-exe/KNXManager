const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evalua Código')
    .addStringOption(option => 
        option
        .setName('codigo')
        .setDescription('El código para evaluar')
        .setRequired(true)
    ),

    async execute(interaction, client) {

        async function sendMessage (message) {
            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(message);

            await interaction.reply({ embeds: [embed] });
        }

        if(interaction.member.id !== '817515739711406140') return await sendMessage(`Solo el desarrollador puede usar este comando`)

        const { options } = interaction;

        var code = options.getString('codigo');
        var output;

        try {
            output = await eval(code);
        } catch (error) {
            output = error.toString();
        }

        var replyString = `**Input:**\n\`\`\`js\n${code}\n\`\`\`\n\n**Output:**\n\`\`\`js\n${output}\n\`\`\``;

        if (interaction.replied) {
            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(replyString);

            await interaction.editReply({ content: ``, embeds: [embed] })
        } else {
            await sendMessage(replyString);
        }
    }
}