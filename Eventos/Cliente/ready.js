require('dotenv').config()
const {Client, ActivityType, GatewayDispatchEvents, EmbedBuilder} = require('discord.js');
const mongoose = require('mongoose')
const mongodbURL = process.env.MONGODBURL;
const wait = require('node:timers/promises').setTimeout;
var colors = require('colors');
const { musicCard } = require('musicard')
const { Riffy } = require("riffy");
// keep yourself safe
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        const targetGuild = client.guilds.cache.get('698544143403581501')
        
        await wait(3000);
        await console.log(`[   KIRI-EVREADY     ]`.underline.red + " --- Empezando ".red + `  ${client.user.tag}`.red);

        if (!mongodbURL) return;
        const nodes = [
            {
                host: "185.255.5.126",
                password: "blubpubliclava",
                port: "5500",
                secure: false
            },
          ];
        
          client.riffy = new Riffy(client, nodes, {
              send: (payload) => {
                  const guild = client.guilds.cache.get(payload.d.guild_id);
                  if (guild) guild.shard.send(payload);
              },
              defaultSearchPlatform: "ytsearch", // <--- Change here
              restVersion: "v3" // or v3 based on your lavalink version
          });

        client.riffy.init(client.user.id);

        // This will send log when the lavalink node is connected.
client.riffy.on("nodeConnect", node => {
    console.log(`[   KIRI-LAVALINK    ]`.underline.yellow + " --- Empezando ".yellow + `  ${node.name}`.yellow)
})

// This will send log when the lavalink node faced an error.
client.riffy.on("nodeError", (node, error) => {
    console.log(`Node "${node.name}" encountered an error: ${error.message}.`)
})

// This is the event handler for track start.
client.riffy.on("trackStart", async (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);

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

    const cardBuffer = await card.build();
    fs.writeFileSync(`musicCard.png`, cardBuffer);

    channel.send({ files: [card]});
});

// This is the event handler for queue end.
client.riffy.on("queueEnd", async (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    
	// Set this to true if you want to enable autoplay.
	const autoplay = false;

    if (autoplay) {
        player.autoplay(player)
    } else {
        const embed = new EmbedBuilder()
        .setTitle('La cola ha sido acabada')
        .setDescription('Pon una canción o escribe !parar para sacar el bot del canal')
        .setColor('#4180fa')
        channel.send({ embeds: [embed]});
    }
})

// This will update the voice state of the player.
client.on("raw", (d) => {
    if (![GatewayDispatchEvents.VoiceStateUpdate, GatewayDispatchEvents.VoiceServerUpdate,].includes(d.t)) return;
    client.riffy.updateVoiceState(d);
});

        mongoose.set('strictQuery', true)

        await mongoose.connect(mongodbURL || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if (mongoose.connect) {
            console.log(`[   KIRI-MONGOBD     ]`.underline.blue + " --- Empezando  ".blue + ` Base de Datos en Funcionamiento`.blue);
        } else {
            console.log('No pude conectarme a la base de datos.')
        }

        const activities = [
            `Vigilando ${targetGuild.memberCount} miembros`,
            `twitch.tv/kirinuxx`
        ];

        setInterval(() => {
            const status = activities[Math.floor(Math.random() * activities.length)];
            client.user.setPresence({ 
            status: 'idle',
            activities: [{
                type: ActivityType.Custom,
                name: `Prueba`,
                state: `${status}`
            }]
            });
        }, 20000);
        
    },
};