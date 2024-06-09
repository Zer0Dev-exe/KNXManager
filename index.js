require('dotenv').config()
const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ChannelType,
    PermissionsBitField,
    GatewayDispatchEvents,
    AttachmentBuilder,
    SelectMenuBuilder
  } = require("discord.js");
  
  const { loadEvents } = require("./Handlers/cargarEventos");
  const { loadCommands } = require("./Handlers/cargarComandos");
  const { loadPrefix } = require('./Handlers/cargarPrefix');
  const { readdirSync } = require("fs");
  const process = require('node:process');
  const token = process.env.TOKEN;
  const voiceData = new Collection();
  const { welcomeCard } = require('greetify')
  const fs = require("fs");
  const wait = require('node:timers/promises').setTimeout;
  const BrawlStars = require("brawlstars.js")
  const tokenbrawl = process.env.APITOKEN
  const cliente = new BrawlStars.Client(tokenbrawl)
  const Twit = require('twit');
  const clubSchema = require('./Schemas/clubLogsSchema.js')

  process.on('unhandledRejection', async (reason, promise) => {
    console.log('Unhandled Rejection error at:', promise, 'reason', reason);
  });

  process.on('uncaughtException', (err) => {
    console.log('Uncaught Expection', err);
  });

  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('Uncaught Expection Monitor', err, origin);
  });

  const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials), Partials.Channel],
    allowedMentions: {
        parse: ["users"]
      },

  });

  client.snipes = new Map()
  client.on('messageDelete', function(message, channel) {
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
  })
  client.commands = new Collection();
  client.prefixs = new Collection();
  client.aliases = new Collection();
  
  client.login(token).then(() => {
    loadEvents(client);
    loadCommands(client);
    loadPrefix(client)
  });

  module.exports = client;

  client.on(Events.GuildMemberAdd, async member => {

    if(member.guild.id === '698544143403581501') {

      const cantidad = client.guilds.cache.get('698544143403581501').memberCount
      const vc = client.channels.cache.get('1086073757883432990')

      const canal = client.channels.cache.get('1023384595208601684')

      canal.send({ content: `- ${member} Bienvenido a **Team KNX** <:knx:908715123034689596>\n- Recuerda leer las <#700911264645513226> <:KNX_PinGood:775086872850333726>\n- Visita <#1016169722296938517> para obtener información sobre el servidor <:KNX_PinThanks:775086795851038740>.` })
      
      member.roles.add('756836206083309568') // Colores
      member.roles.add('713630239653363755') // Aportación
      member.roles.add('729529480531542107') // Niveles
      member.roles.add('713630239363956806') // Basico
      member.roles.add('754816313775489154') // Autoroles
      member.roles.add('1023271152753319967') // Atunero

      vc.setName(`Miembros: ${cantidad}`)
    } else {
      return;
    }
  })

  client.on(Events.GuildMemberRemove, member => {

    if(member.guild.id === '698544143403581501') {
      const cantidad = client.guilds.cache.get('698544143403581501').memberCount
      const vc = client.channels.cache.get('1086073757883432990')
      vc.setName(`Miembros: ${cantidad}`)
    } else {
      return;
    }
  })

  const encuestaSchema = require('./Schemas/voteSchema.js');

  client.on(Events.InteractionCreate, async i => {

    if (!i.guildId) return;
    if (!i.message) return;
    if (!i.isButton) return;

    const data = await encuestaSchema.findOne({ Guild: i.guild.id, Msg: i.message.id })
    if (!data) return;
    const msg = await i.channel.messages.fetch(data.Msg);

    if (i.customId === 'arriba') {
      if (data.UpMembers.includes(i.user.id)) return await i.reply({ content: 'No puedes votar denuevo en esta encuesta', ephemeral: true });

      let downvotes = data.Downvote;
      if (data.DownMembers.includes(i.user.id)) {
        downvotes = downvotes -1;
      }

      const newembed = EmbedBuilder.from(msg.embeds[0])
      .setFields(
        { name: 'Votos a favor', value: `> **${data.Upvote + 1} Votos**`, inline: true }, 
        { name: 'Votos en contra', value: `> **${downvotes}** Votos`, inline: true }, 
        { name: 'Autor', value: `> <@${data.Owner}>`})

      const botones = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('arriba')
            .setEmoji('957238576511340604')
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId('abajo')
            .setEmoji('957238576528105482')
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId('votos')
            .setLabel('Votos')
            .setStyle(ButtonStyle.Secondary),
      )

      await i.update({ embeds: [newembed], components: [botones] });

      data.Upvote++;

      if (data.DownMembers.includes(i.user.id)) {
        data.Downvote = data.Downvote - 1;
      }

      data.UpMembers.push(i.user.id);
      data.DownMembers.pull(i.user.id);
      data.save();
    }

    if (i.customId === 'abajo') {

      if (data.DownMembers.includes(i.user.id)) return await i.reply({ content: 'No puedes votar denuevo en esta encuesta', ephemeral: true });

      let upvotes = data.Upvote;
      if (data.UpMembers.includes(i.user.id)) {
        upvotes = upvotes -1;
      }

      const newembed = EmbedBuilder.from(msg.embeds[0])
      .setFields(
        { name: 'Votos a favor', value: `> **${upvotes} Votos**`, inline: true }, 
        { name: 'Votos en contra', value: `> **${data.Downvote + 1}** Votos`, inline: true }, 
        { name: 'Autor', value: `> <@${data.Owner}>`})

      const botones = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('arriba')
            .setEmoji('957238576511340604')
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId('abajo')
            .setEmoji('957238576528105482')
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId('votos')
            .setLabel('Votos')
            .setStyle(ButtonStyle.Secondary),
      )

      await i.update({ embeds: [newembed], components: [botones] });

      data.Downvote++;

      if (data.UpMembers.includes(i.user.id)) {
        data.Upvote = data.Upvote - 1;
      }

      data.DownMembers.push(i.user.id);
      data.UpMembers.pull(i.user.id);
      data.save();
    }

    if (i.customId === 'votos') {

      let upvoters = [];
      await data.UpMembers.forEach(async member => {
        upvoters.push(`<@${member}>`)
      });

      let downvoters = [];
      await data.DownMembers.forEach(async member => {
        downvoters.push(`<@${member}>`)
      });

      const embed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: '✋ Sistema de encuestas'})
        .setFooter({ text: '✋ Miembros de encuesta'})
        .setTimestamp()
        .setTitle('📌 Votos de encuesta')
        .addFields({ name: `Votos a favor (${upvoters.length})`, value: `> ${upvoters.join(', ').slice(0, 1020) || `Sin votantes`}`, inline: true })
        .addFields({ name: `Votos en contra (${downvoters.length})`, value: `> ${downvoters.join(', ').slice(0, 1020) || `Sin votantes`}`, inline: true })

        await i.reply({ embeds: [embed], ephemeral: true })
    }
  })

  client.on(Events.MessageCreate, async (message) => {
    if(message.author.id === '946554175037276190') return;
    if (message.content.includes('Sia')) {
      const opciones = ['Odiar a Sia es significado de saber de música.', 'https://media.discordapp.net/attachments/1016170618720354394/1217982945978093750/image.png?ex=666596c3&is=66644543&hm=006f50eab0faadfcfb822ff4ff40fa010cca3f34820dd1707c289c290cfe054d&=&format=webp&quality=lossless&width=222&height=96', 'https://media.discordapp.net/attachments/1016170618720354394/1173284393855504496/resultado.png?ex=6665227e&is=6663d0fe&hm=fddb289cf075b0dd39c9067f63e0779946520918cc7ba4a7b31e0563fece47e5&=&format=webp&quality=lossless&width=473&height=473', 'https://media.discordapp.net/attachments/1023384595208601684/1215451664451117106/opera_AO0c7EmKKH.png?ex=66659bd2&is=66644a52&hm=14ba69cf6f457a1cf677de1537e5c1b857fde0d750e000b187341251c0d0fe21&=&format=webp&quality=lossless&width=224&height=37']
      const ball = Math.floor(Math.random() * opciones.length);

      message.reply({ content: `${opciones[ball]}`})
    } else if (message.content.includes('sia')) {
      const opciones = ['Odiar a Sia es significado de saber de música.', 'https://media.discordapp.net/attachments/1016170618720354394/1217982945978093750/image.png?ex=666596c3&is=66644543&hm=006f50eab0faadfcfb822ff4ff40fa010cca3f34820dd1707c289c290cfe054d&=&format=webp&quality=lossless&width=222&height=96', 'https://media.discordapp.net/attachments/1016170618720354394/1173284393855504496/resultado.png?ex=6665227e&is=6663d0fe&hm=fddb289cf075b0dd39c9067f63e0779946520918cc7ba4a7b31e0563fece47e5&=&format=webp&quality=lossless&width=473&height=473', 'https://media.discordapp.net/attachments/1023384595208601684/1215451664451117106/opera_AO0c7EmKKH.png?ex=66659bd2&is=66644a52&hm=14ba69cf6f457a1cf677de1537e5c1b857fde0d750e000b187341251c0d0fe21&=&format=webp&quality=lossless&width=224&height=37']
      const ball = Math.floor(Math.random() * opciones.length);

      message.reply({ content: `${opciones[ball]}`})
    } else if (message.content.includes('Coneja')) {
      message.reply({ content: 'Odiar a Sia es significado de saber de música.'})
    } else if (message.content.includes('coneja')) {
      message.reply({ content: 'Odiar a Sia es significado de saber de música.'})
    } else if (message.content == 'kiri'){
      message.reply({ content: 'El más calbo del mundo <:KNX_Monito:1138851761675841676>'})
    } else if (message.content == 'Kiri'){
      message.reply({ content: 'El más calbo del mundo <:KNX_Monito:1138851761675841676>'})
    } else if (message.content == 'Marvos') {
      message.reply({ content: 'Es Markos monguer'})
    } else if (message.content  == 'zero'){
      message.reply({ content: 'Es Zer0, no Zero'})
    } else if (message.content  == 'zer0'){
      message.react('1190423169127940286')
    } else if (message.content == 'Zero'){
      message.reply({ content: 'Es Zer0, no Zero'})
    } else if (message.content  == 'Zer0'){
      message.react('1190423169127940286')
    } else if (message.content == 'Sara'){
      message.reply({ content: 'La q lo deja todo pal final'})
    } else if (message.content == 'Sara'){
      message.reply({ content: 'La q lo deja todo pal final'})
    } else if (message.content.includes('club')){
      const boton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('Team KNX')
        .setURL('https://bit.ly/42cng2y')
        .setEmoji('1202734474664870029'),
        new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('Crew KNX')
        .setURL('https://bit.ly/3HwGoyK')
        .setEmoji('1202734474664870029'),
      )
      message.reply({ content: 'Puedes unirte a nuestras linea de clubes, en <#1090102018305175552> tendrán la información sobre los clubes y pueden ver los logs de los clubes en <#1213245501621674066>', components: [boton]})
    }
});
// RESETEO AUTOMATICO XP
const msgLbSchema = require('./Schemas/msgLbSchema');
const interactionCreate = require('./Eventos/Interaction/interactionCreate');

async function servidor() {
 var data = await msgLbSchema.find({ Guild: '698544143403581501' })
 var standings = [];
  
 await data.forEach(async d => {
    var miembro = await client.members.get(d.User);
    standings.push({
      user: d.User,
      messages: d.Messages,
      username: miembro.user.username
    })
 });

 return standings
}

setInterval(async () => {
  const canal = await client.channels.cache.get('1213245501621674066')
  const team = await cliente.getClub('#CV8QU2VC')
  const crew = await cliente.getClub('#29VL2Q2P2')
  const data = await clubSchema.findOne({ Servidor: '1213245501621674066'})
  if(team.memberCount == 30) {
    const embed = new EmbedBuilder()
    .setColor('Red')
    .setTitle(`${team.name} : Lleno :red_circle:`)
    .setThumbnail(`https://cdn-old.brawlify.com/club/${team.badgeId}.png`)
    .setDescription('Si deseas unirte a este club una vez haya hueco libre porfavor usa **k!apuntar team** en <#1016171578771374131>')
    .setFooter({ text: 'Dentro de 1 hora se actualizará el estado de este club, si estás en la lista de espera serás notificado.'})
    await canal.send({ embeds: [embed] })
    data.CantidadTeam = 30
    data.UltimaTeam = true
    await data.save()
  }

  if(crew.memberCount == 30) {
    const embed = new EmbedBuilder()
    .setColor('Red')
    .setTitle(`${crew.name} : Lleno :red_circle:`)
    .setThumbnail(`https://cdn-old.brawlify.com/club/${crew.badgeId}.png`)
    .setDescription('Si deseas unirte a este club una vez haya hueco libre porfavor usa **k!apuntar crew** en <#1016171578771374131>')
    .setFooter({ text: 'Dentro de 1 hora se actualizará el estado de este club, si estás en la lista de espera serás notificado.'})
    await canal.send({ embeds: [embed] })
    data.CantidadCrew = 30
    data.UltimaCrew = true
    await data.save()
  }

  if(team.memberCount < 30) {

    if(data.UltimaTeam = 'true') {
      console.log('A')
      const cantidadLibre = 30 - team.memberCount
      const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle(`${team.name} : Abierto :green_circle:`)
      .setThumbnail(`https://cdn-old.brawlify.com/club/${team.badgeId}.png`)
      .setDescription('Team KNX ha abierto sus puertas para nuevos miembros, usa **k!desapuntar-team** en <#1016171578771374131> en caso que ya hayas entrado al club.')
      .addFields(
        { name: 'Cantidad de hueco:', value: `${cantidadLibre}`}
      )
      .setFooter({ text: 'Dentro de 1 hora se actualizará el estado de este club.'})
      await canal.send({ embeds: [embed] })
      data.CantidadTeam = team.memberCount
      data.UltimaTeam = false
      await data.save()
    }

    if(data.UltimaTeam = 'true') {
      console.log('B')
      
      let cantidadTeam = [];
        await data.MiembrosTeam.forEach(async member => {
            cantidadTeam.push(`<@${member}>`)
        });

      const cantidadLibre = 30 - team.memberCount
      const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle(`${team.name} : Abierto :green_circle:`)
      .setThumbnail(`https://cdn-old.brawlify.com/club/${team.badgeId}.png`)
      .setDescription('Team KNX ha abierto sus puertas para nuevos miembros, usa **k!desapuntar team** en <#1016171578771374131> en caso que ya hayas entrado al club.')
      .addFields(
        { name: 'Cantidad de hueco:', value: `${cantidadLibre}`}
      )
      .setFooter({ text: 'Dentro de 1 hora se actualizará el estado de este club.'})
      await canal.send({ content: `> ${cantidadTeam.join(' ').slice(0, 1020) || `No hay nadie en la lista de espera`}`, embeds: [embed] })

      data.CantidadTeam = team.memberCount
      data.UltimaTeam = false
      await data.save()
    }
  }

  if(crew.memberCount < 30) {

    if(data.UltimaTeam = 'false') {
      const cantidadLibre = 30 - crew.memberCount
      const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle(`${crew.name} : Abierto :green_circle:`)
      .setThumbnail(`https://cdn-old.brawlify.com/club/${crew.badgeId}.png`)
      .setDescription('Crew KNX ha abierto sus puertas para nuevos miembros, usa **k!desapuntar crew** en <#1016171578771374131> en caso que ya hayas entrado al club.')
      .addFields(
        { name: 'Cantidad de hueco:', value: `${cantidadLibre}`}
      )
      .setFooter({ text: 'Dentro de 1 hora se actualizará el estado de este club.'})
      await canal.send({ embeds: [embed] })
      data.CantidadCrew = crew.memberCount
      data.UltimaCrew = false
      await data.save()
    }

    if(data.UltimaCrew = 'true') {

      let cantidadCrew = [];
        await data.MiembrosCrew.forEach(async member => {
            cantidadCrew.push(`<@${member}>`)
        });

      const cantidadLibre = 30 - crew.memberCount
      const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle(`${crew.name} : Abierto :green_circle:`)
      .setThumbnail(`https://cdn-old.brawlify.com/club/${crew.badgeId}.png`)
      .setDescription('Crew KNX ha abierto sus puertas para nuevos miembros, usa **k!desapuntar crew** en <#1016171578771374131> en caso que ya hayas entrado al club.')
      .addFields(
        { name: 'Cantidad de hueco:', value: `${cantidadLibre}`}
      )
      .setFooter({ text: 'Dentro de 1 hora se actualizará el estado de este club.'})
      await canal.send({ content: `> ${cantidadCrew.join(' ').slice(0, 1020) || `No hay nadie en la lista de espera`}`, embeds: [embed] })
      data.CantidadCrew = team.memberCount
      data.UltimaCrew = false
      await data.save()
    }
  }

}, 3600000)

setInterval(async () => {

  const canal = client.channels.cache.get('1090102018305175552')
  const mensaje = await canal.messages.fetch('1203753016625340446')
  const guild = client.guilds.cache.get('698544143403581501')

  const team = await cliente.getClub('#CV8QU2VC')
  const crew = await cliente.getClub('#29VL2Q2P2')

  let presiteam = team.members.find(member => member.role === 'president');
  let viceteam = team.members.find(member => member.role === 'vicePresident');

  let presicrew = crew.members.find(member => member.role === 'president');
  let vicecrew = crew.members.find(member => member.role === 'vicePresident');

  var typeTeam = team.type
  if(typeTeam === "inviteOnly") typeTeam = "Solo Invitacion"
  if(typeTeam === "open") typeTeam = "Abierto"
  if(typeTeam === "closed") typeTeam = "Cerrado"

  var typeCrew = crew.type
  if(typeCrew === "inviteOnly") typeCrew = "Solo Invitacion"
  if(typeCrew === "open") typeCrew = "Abierto"
  if(typeCrew === "closed") typeCrew = "Cerrado"

  const embed = new EmbedBuilder()
  .setTitle('Clubes de Team KNX <:club:1178100590002307122>')
  .addFields(
    { name: '<:IconKNX:1202734474664870029> TEAM KNX', value: `**:dart: ${team.tag}\n<:trophy:1178100595530420355> ${team.trophies}\n<:MiembrosClan:1202693897306898492> ${team.memberCount}/30\n<:reseteo:1178100588114882652> ${Math.floor(team.trophies/team.memberCount)}\n:warning: ${typeTeam}\n<:Presi:1202692085019447377> ${presiteam.name}\n<:VicePresi:1202692129827328082> ${viceteam.name}**`, inline: true },
    { name: '<:IconKNX:1202734474664870029> CREW KNX', value: `**:dart: ${crew.tag}\n<:trophy:1178100595530420355> ${crew.trophies}\n<:MiembrosClan:1202693897306898492> ${crew.memberCount}/30\n<:reseteo:1178100588114882652> ${Math.floor(crew.trophies/crew.memberCount)}\n:warning: ${typeCrew}\n<:Presi:1202692085019447377> ${presicrew.name}\n<:VicePresi:1202692129827328082> ${vicecrew.name}**`, inline: true }
  )
  .setThumbnail(guild.iconURL())
  .setColor('#25fff8')

  const botones = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel('Team KNX')
    .setURL('https://bit.ly/42cng2y')
    .setEmoji('1202734474664870029'),
    new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel('Crew KNX')
    .setURL('https://bit.ly/3HwGoyK')
    .setEmoji('1202734474664870029'),
  )
  const clubes = new ActionRowBuilder()
  .addComponents(
  new SelectMenuBuilder()
  .setCustomId('infoclubs')
  .setPlaceholder('Ver informacion completa de Clubes ⚔️')
  .addOptions([
    {
      label: 'Team KNX',
      emoji: '1202734474664870029',
      description: 'Información del club Team KNX',
      value: 'team-knx',
    },
    {
      label: 'Crew KNX',
      emoji: '1202734474664870029',
      description: 'Información del club Crew KNX',
      value: 'crew-knx',
    },
  ]),
  )
  mensaje.edit({ embeds: [embed], components: [clubes, botones] })
}, 5000);

setInterval(async () => {
  const userSchema = require('./Schemas/msgLbSchema')
  const users = await userSchema.find({ Guild: '698544143403581501'}).sort({Messages: -1}).limit(10);
 
  const embed = new EmbedBuilder()
  .setTitle('Top de Experiencia')
  .setDescription('A continuación se muestra el top de experiencia:')
  .setColor('Random')
  const data = await userSchema.findOne({ Guild: '698544143403581501'})

  if(!data) {
    return;
  } else {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const server = await client.guilds.cache.get('1145307912785383455')
      const member = server.members.cache.get(user.User);
      embed.addFields({ name: `${i + 1}. ${member ? member.displayName : 'Usuario desconocido'}`, value: `<:KNX_PinThanks:775086795851038740> Mensajes: \`${user.Messages}\`` });
    }
  
   const canal = client.channels.cache.get('936594555715858442')
   canal.send({ content: '<@&936405936610889738>', embeds: [embed], allowedMentions:{parse: ['users', 'roles'] } });
   await userSchema.deleteMany()
  }
}, 604800000);

const inaData = require('./Schemas/canalInactivoSchema.js')
const preguntas = require('./Schemas/preguntasChat.js')
setInterval(async () => {
  const data = await inaData.findOne({ Canal: '942082996771639327'})
  const pregunta = await preguntas.findOne()

  const canal = await client.channels.fetch('1023384595208601684')
  await canal.messages.fetch({ limit: 1 }).then(async messages => {
    let UltimoMensaje = messages.first()
    if(UltimoMensaje.id === data.Mensaje) {
      await canal.send({ content: `${pregunta.Pregunta}`, allowedMentions:{parse: ['roles'] } })
    } else {
      data.Mensaje = UltimoMensaje.id
      await data.save()
    }
  })
}, 7200000);