const { SlashCommandBuilder, EmbedBuilder, CommandInteractionOptionResolver } = require('discord.js')
const { Riffy } = require("riffy");
const { musicCard } = require("musicard");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('musica')
    .setDescription('Comandos relacionados a la música')
    .addSubcommand(subcommand =>
        subcommand
        .setName('reproducir')
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
        .setName('detener')
        .setDescription('Detén la música')
    )
    .addSubcommandGroup(group =>
        group
        .setName('loop')
        .setDescription('Comandos de loop')
        .addSubcommand(subcommand =>
            subcommand
            .setName('cancion')
            .setDescription('Pon en modo repetición la canción actual')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('playlist')
            .setDescription('Pon en modo repetición la playlist actual')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('remover')
            .setDescription('Remueve todo el loop')
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('skipear')
        .setDescription('Skipea la canción que reproduce ahora.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('pausar')
        .setDescription('Pausa la canción que reproduce ahora.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('reanudar')
        .setDescription('Reanuda la canción que reproduce ahora.')
    )
    ,

    async execute(interaction, client) {

        if(interaction.options.getSubcommand() === 'reproducir') {

            const cancion = interaction.options.getString('cancion')

            if(!interaction.member.voice.channel) return interaction.reply('Debes de estar en el mismo canal de voz para poder ejecutar este comando')
            //if(interaction.member.voice.channelId != client.member.voice.channelId) return interaction.reply('No estás instalado en el mismo canal de voz')
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
    
            if (loadType === 'playlist') {
                for (const track of resolve.tracks) {
                    track.info.requester = interaction.member;
                    player.queue.add(track);
                }
    
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
                .setTitle('Cargando Playlist')
                .addFields(
                  { name: 'Cantidad', value: `${tracks.length}`},
                  { name: 'Nombre Playlist', value: `${playlistInfo.name}`}
                )
                .setColor('Random')
    
                interaction.reply({ embeds: [embed]});
                if (!player.playing && !player.paused) return player.play();
    
            } else if (loadType === 'search' || loadType === 'track') {
                const track = tracks.shift();
                track.info.requester = interaction.member;
    
                player.queue.add(track);
                const url = await track.info.thumbnail;
                const tiempo = await track.info.length
    
                const dias = Math.floor(tiempo / 86400000)
                const horas = Math.floor(tiempo / 3600000) % 24
                const minutos = Math.floor(tiempo / 60000) % 60
                const segundos = Math.floor(tiempo / 1000) % 60
    
                const card = new musicCard()
                .setName(`${track.info.title}`)
                .setAuthor(`By ${track.info.author}`)
                .setColor("auto") // or hex color without # (default: auto) (auto: dominant color from thumbnail)
                .setBrightness(50)
                .setThumbnail(`${url}`)
                .setProgress(0)
                .setStartTime("0:00")
                .setEndTime(`${minutos}:${segundos}`)

                // Build the card
                const cardBuffer = await card.build();
                fs.writeFileSync(`musicCard.png`, cardBuffer);

                interaction.reply({ content: `**Añadido ${track.info.title}** de **${track.info.author}** a la lista de reproducción`, files: [cardBuffer] });
                if (!player.playing && !player.paused) return player.play();
            } else {
                return interaction.reply('Resultados no encontrados.');
            }
        } else if(interaction.options.getSubcommand() === 'detener') {

            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true
              });
            
              const embed = new EmbedBuilder()
                .setTitle('Retirandome del canal')
                .setDescription('Has decidido expulsarme del canal de voz, recuerda que estaré siempre disponible para reproducir la música que te guste.')
                .setColor('Blurple')
                interaction.reply({ embeds: [embed]});
              player.destroy();

        } else if(interaction.options.getSubcommandGroup() === 'loop') {

            if(interaction.options.getSubcommand() === 'cancion') {
                const player = client.riffy.createConnection({
                    guildId: interaction.guild.id,
                    voiceChannel: interaction.member.voice.channel.id,
                    textChannel: interaction.channel.id,
                    deaf: true
                  });
            
                  const embed = new EmbedBuilder()
                  .setTitle('Activado modo repetición')
                  .setColor('Blurple')
                  .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
                  .addFields(
                    { name: 'Tipo', value: 'Auto repetición de canción'}
                  )
            
                  interaction.reply({ embeds: [embed]});    
                  player.setLoop("track")

            } else if(interaction.options.getSubcommand() === 'playlist') {
                const player = client.riffy.createConnection({
                    guildId: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                    deaf: true
                  });
            
                  const embed = new EmbedBuilder()
                  .setTitle('Activado modo repetición')
                  .setColor('Blurple')
                  .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
                  .addFields(
                    { name: 'Tipo', value: 'Auto repetición de playlist'}
                  )
            
                  interaction.reply({ embeds: [embed]});
                  player.setLoop("queue")
            } else if(interaction.options.getSubcommand() === 'remover') {
                const player = client.riffy.createConnection({
                    guildId: interaction.guild.id,
                    voiceChannel: interaction.member.voice.channel.id,
                    textChannel: interaction.channel.id,
                    deaf: true
                  });
            
                  const embed = new EmbedBuilder()
                  .setTitle('Desactivado Modo Repetición')
                  .setColor('Blurple')
                  .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            
                  interaction.reply({ embeds: [embed]});
                  player.setLoop("none")
            }

        } else if(interaction.options.getSubcommand() === 'skipear') {
            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true
              });
        
              const embed = new EmbedBuilder()
              .setTitle('Pasando a la siguente canción')
              .setColor('#f9f5f5')
              .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        
              interaction.reply({ embeds: [embed]});
              player.stop()
        } else if(interaction.options.getSubcommand() === 'pausar') {
            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true
            });
              
            const embed = new EmbedBuilder()
            .setTitle('Pausada la música')
            .setColor('#fa916b')
            .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        
            interaction.reply({ embeds: [embed]});
            player.pause(true); // pause

        } else if(interaction.options.getSubcommand() === 'reanudar') {
            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true
            });
        
            const embed = new EmbedBuilder()
            .setTitle('Resumida la música')
            .setColor('#faef6b')
            .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}`})
        
            interaction.reply({ embeds: [embed]});
            player.pause(false); // resumir
        }
    }
}