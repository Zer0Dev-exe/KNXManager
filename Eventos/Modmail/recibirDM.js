const client = require('../../index.js')
const { ChannelType, EmbedBuilder } = require('discord.js')
const schema = require('../../Schemas/modmailSchema.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {

    if(message.channel.type !== ChannelType.DM) return;
    if(message.author.bot) return;

    const categoria = client.channels.cache.get('1186822523455819859');
    if(categoria.type !== ChannelType.GuildCategory) return;

    let doc = await schema.findOne({ usuarioId: message.author.id });
    if(!doc) {
        const servidor = await client.guilds.cache.get('698544143403581501')

        const canal = await categoria.guild.channels.create({
            name: `${message.author.username}`,
            type: ChannelType.GuildText,
            parent: '1186822523455819859',
            permissionOverwrites: [
                {
                    id: servidor.roles.everyone.id,
                    deny: ['ViewChannel'],
                },
                {
                    id: '817515739711406140',
                    allow: ['ViewChannel', 'SendMessages', 'AttachFiles', 'EmbedLinks']
                }
            ]
        }).then(async (channel) => {
            const embed = new EmbedBuilder()
            .setTitle(`Nuevo Modmail de ${message.author.displayName}`)
            .setThumbnail(`${message.author.avatarURL()}`)
            .setDescription(`${message.content}`)
            .setColor('Blue')
            .addFields(
                { 
                    name: 'Id',
                    value: `${message.author.id}`,
                },
                {
                    name: 'Creado En',
                    value: `${message.author.createdAt.toLocaleString()}`
                }
            )

            await channel.send({ embeds: [embed]})
            doc = await schema.create({ usuarioId: message.author.id, canalId: channel.id})
            await doc.save();
        })

    } else {

        message.react('✉️')
        const canal = client.channels.cache.get(doc.canalId);
        if(!canal) return;
        if(canal.type !== ChannelType.GuildText) return;

        const embed = new EmbedBuilder()
        .setAuthor({ name: message.author.username , iconURL: message.author.avatarURL() })
        .setDescription(`${message.content}`)
        .setColor('#14d2f0')

        await canal.send({ embeds: [embed], files: message.attachments.map(a => a.url )});
    }
 }
}