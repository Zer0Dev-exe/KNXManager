const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const lb = require('../../Schemas/msgLbSchema');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clasificacion')
    .setDescription('Clasificacion de mensajes')
    .addSubcommand(command => 
        command
        .setName('usuario')
        .setDescription('Clasificacion del usuario')
        .addUserOption(option =>
            option
            .setName('miembro')
            .setDescription('El miembro que deseas filtrar')
            .setRequired(true))
    )
    .addSubcommand(command =>
        command
        .setName('servidor')
        .setDescription('Clasificacion total del servidor')
    )
    .addSubcommand(command => 
        command
        .setName('reset')
        .setDescription('Resetea la clasificación')
    ),

    async execute(interaction, client) {

        const { options } = interaction;
        const sub = options.getSubcommand();

        switch(sub) {
            case 'usuario':

            async function servidor() {
                var data = await lb.find({ Guild: interaction.guild.id })
                var standings = [];
                await data.forEach(async d => {
                    standings.push({
                        user: d.User,
                        messages: d.Messages
                    })
                });

                return standings
            }

            async function lbUser(user) {
                var data = await lb.find({ Guild: interaction.guild.id });
                if(!data) return 'No hay data';

                if(user) {
                    var standings = await servidor();
                    standings.sort((a, b) => b.messages - a.messages);
                    return standings.findIndex((item) => item.user === user) + 1;

                }
            }

            const usuario = options.getUser('miembro');
            const data = await lb.findOne({ Guild: interaction.guild.id, User: usuario.id })
            if (!data) return await interaction.reply({ content: 'Parece que tienes 0 mensajes'})
            else {
                var t = await servidor().then(async data => { return data.length})

                const embed = new EmbedBuilder()
                .setColor('Purple')
                .setTitle(`Mensajes de ${interaction.user.username}`)
                .setThumbnail(usuario.avatarURL())
                .addFields({ name: '<:KNX_PinThanks:775086795851038740> Mensajes totales', value: `\`${data.Messages}\``})
                .addFields({ name: '<:KNX_PinGood:775086872850333726> Clasificación', value: `\`#${await lbUser(usuario.id)}/${t}\``})
                .setTimestamp();

                await interaction.reply({ embeds: [embed]})
            }
            break;
            case 'servidor':
                const data2 = await lb.findOne({ Guild: interaction.guild.id});
                if(!data2) return await interaction.reply({ content: 'Parece que el servidor no tiene mensajes, si crees que es un problema contate con @zer0dev'})
                else {
                    var clasificacion = await servidor();
                    clasificacion.sort((a, b) => b.messages - a.messages);
                    var output = clasificacion.slice(0, 10);

                    var string;
                    var num = 1;
                    await output.forEach(async value => {
                        const miembro = await interaction.guild.members.cache.get(value.user);
                        string += `#${num} Miembro: **${miembro.user.username}**, Mensajes: \`${value.messages}\`\n`;
                        num++;
                    });

                    string = string.replace('undefined', '');

                    const embed = new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle(`Clasificación de ${interaction.guild.name}`)
                    .setDescription(`${string}`)

                    await interaction.reply({ embeds: [embed] })
                }
            break;
            case 'reset':

                if(!interaction.member.roles.cache.has("713630122141286440")) return await interaction.reply({ content: 'No eres director para ejecutar este comando', ephemeral: true })

                const data3 = await lb.findOne({ Guild: interaction.guild.id});
                if(!data3) return await interaction.reply({ content: 'Parece que el servidor no tiene mensajes, si crees que es un problema contate con @zer0dev'})
                else {
                    await interaction.deferReply()
                    var clasificacion = await servidor();
                    clasificacion.sort((a, b) => b.messages - a.messages);
                    var output = clasificacion.slice(0, 10);

                    var string;
                    var num = 1;
                    await output.forEach(async value => {
                        const miembro = await interaction.guild.members.cache.get(value.user);
                        string += `#${num} Miembro: **${miembro.user.username}**, Mensajes: \`${value.messages}\`\n`;
                        num++;
                    });

                    string = string.replace('undefined', '');

                    const embed = new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle(`Clasificación de ${interaction.guild.name}`)
                    .setDescription(`${string}`)
                    
                    const canal = await client.channels.cache.get('708049123147776112')

                    await canal.send({ embeds: [embed], content: '<@&936405936610889738>' })

                    await wait(3000)
                    await lb.deleteMany()
                    const reset = new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle('Reseteado Semanal de experiencia')
                    .setDescription(':white_check_mark: el comando se ha ejecutado correctamente!')
                    .addFields(
                        { name: 'Ejecutado por:', value: `${interaction.user.username}`}
                    )
                    .setTimestamp()
                    await interaction.editReply({ embeds: [reset] })
                }
        }
    }
}