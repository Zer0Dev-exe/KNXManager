const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chatgpt')
        .setDescription('Chatea con GPT-3')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('El mensaje que deseas enviar')
                .setRequired(true)
        ),
    async execute(interaction, client) {
      
        await interaction.deferReply();

        
        const mensaje = interaction.options.getString('mensaje');

        
        const apiUrl = `https://ts.azury.cc/api/v1/gp4?q=${encodeURIComponent(mensaje)}`;

        try {
            
            const response = await axios.get(apiUrl);

            
            if (response.status === 200) {
                const chatData = response.data.chat; 

                
                const embed = new EmbedBuilder()
                .setColor('Random')
                .setThumbnail(client.user.avatarURL())
                .setTitle(`Chatea con ${client.user.username}`)
                .setDescription(chatData)
                .setFooter({ text: `Generado por ${interaction.user.displayName}`, iconURL: interaction.user.avatarURL() })

                await interaction.followUp({ embeds: [embed] });
            } else {
                await interaction.followUp('Un error inesperado a ocurrido.');
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp('Un error inesperado a ocurrido.');
        }
    },
};