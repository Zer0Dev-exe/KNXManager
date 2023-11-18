const { EmbedBuilder, userMention } = require("discord.js")
const emoji = require("../../emoji.json")
/**
 * 
 * @param {import("discord.js").EmbedData} oldData 
 * @param {*} options 
 * @param {*} type 
 * @returns 
 */
module.exports = function generateGawEmbed(oldData, options, type = "main") {
    const embed = new EmbedBuilder(oldData)
    if (type && !["noEntries", "End"].includes(type)) {

        embed.setColor('#07d4eb')
            .setAuthor(options.EmbedAuthor || null)
            .setImage(options.banner || null)
            .setThumbnail(`https://media.discordapp.net/attachments/936591912079618089/1093175474068402360/a_2b9433848fa66b6b3e66b08f7ac67247.gif?width=102&height=102`)
            .setDescription(`
    ## ${emoji.point} **Detalles Sorteo**
    ${emoji.blankspace}${emoji.replyc} Premio: **${options.prize}**
    ${emoji.blankspace}${emoji.replyc} Numero Ganadores: ${options.winnerCount}
    ${emoji.blankspace}${emoji.replyc} Patrocinador: ${options.host} ${options.entriesLimit != 'infinite' ? `\n ${emoji.blankspace}${emoji.replyc} Las entradas se pararán en ${options.entriesLimit} Entradas` : ``}
    ${emoji.blankspace}${emoji.reply} Termina: <t:${((Date.now() + options.time) / 1000).toFixed(0)}>  [<t:${((Date.now() + options.time) / 1000).toFixed(0)}:R>]
    ${options?.multi?.length == 0 ? `` : `\n${emoji.point} **Multiplicador**\n`.concat(options.multi)}
    ${options?.requirements?.length == 0 ? `` : `${emoji.point} **Requisitos**\n`.concat(options.requirements)}
    `)

        return embed;
    }
    /**
     * generates Giveaway noEntries Embed
     */
    else if (type && type == "noEntries") {
        embed.setColor('#07d4eb')
            .setAuthor(typeof oldData == "undefined" ? options.EmbedAuthor ?? null : oldData.author ?? null)
            .setImage(typeof oldData == "undefined" ? options.banner ?? null : oldData.image ?? null)
            .setThumbnail(`https://media.discordapp.net/attachments/936591912079618089/1093175474068402360/a_2b9433848fa66b6b3e66b08f7ac67247.gif?width=102&height=102`)
            .setDescription(`
    ${emoji.point} **Detalles Sorteo**
    ${emoji.blankspace}${emoji.replyc} Premio: **${options.prize}**
    ${emoji.blankspace}${emoji.replyc} Ganadores: **No**
    ${emoji.blankspace}${emoji.replyc} Patrocinador: ${userMention(options.host)} ${options.entriesLimit != 'infinite' ? `\n ${emoji.blankspace}${emoji.replyc} Entradas paradas en ${options.entriesLimit} Entradas` : ``}
    ${emoji.blankspace}${emoji.reply} Termina: Sorteo cancelado
    ${options.multi.length == 0 ? `` : `\n${emoji.point} **Multiplicador**\n`.concat(options.multi)}
    ${options.requirements.length == 0 ? `` : `${emoji.point} **Requisitos**\n`.concat(options.requirements)}
    `).setFooter(typeof oldData == "undefined" ? options.footer ?? { text: "El sorteo ha sido parado por falta de participantes" } : oldData.footer ?? { text: "El sorteo ha sido parado por falta de participantes" })

        return embed;
    }
    /**
     * Generates Giveaway End Embed
     */
    else if (type && type == "End") {
        embed.setColor('#07d4eb')
            .setAuthor(typeof oldData == "undefined" ? options.EmbedAuthor ?? null : oldData.author ?? null)
            .setImage(typeof oldData == "undefined" ? options.banner ?? null : oldData.image ?? null)
            .setThumbnail(`https://media.discordapp.net/attachments/936591912079618089/1093175474068402360/a_2b9433848fa66b6b3e66b08f7ac67247.gif?width=102&height=102`)
            .setDescription(`
    ## ${emoji.point} **Detalles Sorteo**
    ${emoji.blankspace}${emoji.replyc} Premio: **${options.prize}**
    ${emoji.blankspace}${emoji.replyc} Ganadores: ${options.winners.length != 0 ? options.winners : '\`Error\` :skull:'}
    ${emoji.blankspace}${emoji.replyc} Patrocinador: ${userMention(options.host)} ${options.entriesLimit != 'infinite' ? `\n ${emoji.blankspace}${emoji.replyc} Entradas paradas en ${options.entriesLimit} Entradas` : ``}
    ${emoji.blankspace}${emoji.reply} Termina: <t:${((Date.now()) / 1000).toFixed(0)}>  [<t:${((Date.now()) / 1000).toFixed(0)}:R>]
    ${options.multi.length == 0 ? `` : `\n${emoji.point} **Multiplicador**\n`.concat(options.multi)}
    ${options.requirements.length == 0 ? `` : `${emoji.point} **Requisitos**\n`.concat(options.requirements)}
    `).setFooter(typeof oldData == "undefined" ? options.footer ?? { text: "El sorteo ha terminado." } : oldData.footer ?? { text: "El sorteo se ha terminado." })

        return embed
    }
}