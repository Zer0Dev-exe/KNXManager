const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('topico')
    .setDescription('Comando para ver el topico del chat'),
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        async function topic(messages) {

            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            await page.goto('https://chat-app-f2d296.zapier.app/');

            const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]';
            await page.waitForSelector(textBoxSelector);

            var textInput = `Dame tres temas de discusión basados ​​en algunos mensajes recientes del canal. No dudes en hacer que la última sugerencia no tenga nada que ver con los mensajes anteriores. TUS IDEAS DE TEMA NO DEBEN BASARSE 100% EN LOS MENSAJES. SI UN MENSAJE NO TIENE SENTIDO O NO SE ADAPTA A NINGÚN CONTEXTO, DÉJALO FUERA ${messages}`

            await page.type(textBoxSelector, textInput);
            await page.keyboard.press("Enter");

            await page.waitForSelector('[data-testid="final-bot-response"] p').catch(err => {
                return;
            })

            value = await page.$$eval('[data-testid="final-bot-response"]', async (elements) => {
                return elements.map((element) => element.textContent);
            });

            await browser.close();

            value.shift();
            return value.join('\n\n\n\n');
        }

        var messages = await interaction.channel.messages.fetch({ limit: 10 });
        var content = [];
        await messages.forEach(async message => {
            content.push(`${message.content}`);
        });

        await content.reverse();
        var output = await topic(content.join(', '));

        const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle(`Topico:`)
        .setDescription(output)
        .setTimestamp()

        await interaction.editReply({ embeds: [embed]})
    }
}