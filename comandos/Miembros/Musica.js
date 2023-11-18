const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Riffy } = require("riffy");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('musica')
    .setDescription('Comandos relacionados a la música')
    .addSubcommand(subcommand =>
        subcommand
        .setName('play')
        .setDescription('Reproduce la música que desees.')
        .addStringOption(option =>
            option
            .setName('cancion')
            .setDescription('Pon la canción que desees.')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('stop')
        .setDescription('Para la música')
    ),

    async execute(interaction, client) {

        if(interaction.options.getSubcommand() === 'play') {

            const cancion = interaction.options.getString('cancion')
    
            // Create a player.
            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true
            });
    
            const resolve = await client.riffy.resolve({ query: cancion, requester: interaction.member });
            const { loadType, tracks, playlistInfo } = resolve;
    
            /**
             * Important: If you are using Lavalink V3, here are the changes you need to make:
             * 
             * 1. Replace "playlist" with "PLAYLIST_LOADED"
             * 2. Replace "search" with "SEARCH_RESULT"
             * 3. Replace "track" with "TRACK_LOADED" 
             */
    
            if (loadType === 'PLAYLIST_LOADED') {
                for (const track of resolve.tracks) {
                    track.info.requester = interaction.member;
                    player.queue.add(track);
                }
    
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.avatarURL()}`})
                .setTitle('Cargando Playlist')
                .addFields(
                  { name: 'Cantidad', value: `${tracks.length}`},
                  { name: 'Nombre Playlist', value: `${playlistInfo.name}`}
                )
                .setColor('Random')
    
                message.channel.send({ embeds: [embed]});
                if (!player.playing && !player.paused) return player.play();
    
            } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
                const track = tracks.shift();
                track.info.requester = interaction.member;
    
                player.queue.add(track);
                const url = await track.info.thumbnail;
                const tiempo = await track.info.length
    
                const dias = Math.floor(tiempo / 86400000)
                const horas = Math.floor(tiempo / 3600000) % 24
                const minutos = Math.floor(tiempo / 60000) % 60
                const segundos = Math.floor(tiempo / 1000) % 60
    
                const embed2 = new EmbedBuilder()
                .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.avatarURL()}`})
                .setColor(`Random`)
                .addFields(
                  { name: 'Cantante', value: `${track.info.author}`, inline: true},
                  { name: `Duración`, value: `${horas} Horas ${minutos} Minutos y ${segundos} Segundos`, inline: true}
                )
                .setDescription(`## Añadido a la cola:\n **${track.info.title}**`)
                .setImage(`${url}`)
                interaction.reply({ embeds: [embed2]});
                if (!player.playing && !player.paused) return player.play();
            } else {
                return message.channel.send('Resultados no encontrados.');
            }
        } else if(interaction.options.getSubcommand() === 'stop') {

            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true
              });
            
              const embed = new EmbedBuilder()
                .setTitle('Retirandome del canal')
                .setDescription('Espero que hayas disfrutado de la música que he puesto, aquí estaré si necesitas oir más temazos :sunglasses:')
                .setColor('Red')
                interaction.reply({ embeds: [embed]});
              player.destroy();
        }
    }
}