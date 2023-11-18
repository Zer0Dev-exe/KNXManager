const { SlashCommandBuilder, EmbedBuilder, WebhookClient, Collection } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

module.exports = {
 data: new SlashCommandBuilder()
    .setName('preguntar')
    .setDescription('Pregunta algo a KNX Manager!')
    .addStringOption(option =>
      option
        .setName('mensaje')
        .setDescription('Qué deseas preguntar')
        .setRequired(true)
    ),
 async execute(interaction) {

    const message = interaction.options.getString('mensaje');

    // Make sure the interaction remains alive until the response is ready
    await interaction.deferReply();

    const tlnxURL = `https://gpt4.lavadev.online/?q=${encodeURIComponent(message)}`;

    try {
      const response = await axios.get(tlnxURL);
      let content = response.data;

      const maxChars = 1000; 

      if (content.length <= maxChars) {
        await interaction.editReply({ content: `${content}` });
      } else {
        while (content.length > 0) {
          await interaction.editReply({
            content: `${content}`,
          });
          break;
        }
      }
    } catch (error) {
      interaction.channel.send(error)
      await interaction.editReply({ content: 'Un error ha ocurrido...' })
    }
 }
}