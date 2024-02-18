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

      const card = new welcomeCard()
      .setName(member.user.username)
      .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
      .setMessage(`Atunero número ${cantidad}`)
      .setBackground('https://media.discordapp.net/attachments/936591912079618089/1182724414744318172/Plantilla_KNXSecond.png?ex=6585bcf2&is=657347f2&hm=1715a710ed7939c3845acea0d5dc7d181150b6996a5d96a9d467461973b03d9c&=&format=webp&quality=lossless&width=768&height=432')
      .setColor('f9f9f9')
      .setTitle('Bienvenido!')

      const output = await card.build();
      fs.writeFileSync("card.png", output);

      const canal = client.channels.cache.get('1023384595208601684')

      canal.send({ files: [{ attachment: output, name: `${member.id}.png`}], content: `- ${member} Bienvenido a **Team KNX** <:knx:908715123034689596>\n- Recuerda leer las <#700911264645513226> <:KNX_PinGood:775086872850333726>\n- Visita <#1016169722296938517> para obtener información sobre el servidor <:KNX_PinThanks:775086795851038740>.` })
      
      member.roles.add('756836206083309568') // Colores
      member.roles.add('713630239653363755') // Aportación
      member.roles.add('729529480531542107') // Niveles
      member.roles.add('713630239363956806') // Basico
      member.roles.add('754816313775489154') // Autoroles

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
    if (message.content == 'Sia') {
      message.reply({ content: 'Odiar a Sia es significado de saber de música.'})
    } else if (message.content == 'Coneja'){
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
    }else if (message.content == 'Hola'){
      message.reply({ content: 'Tu nariz contra mis bolas'})
    } else if (message.content == 'Sara'){
      message.reply({ content: 'La q lo deja todo pal final'})
    } else if (message.content == 'Sara'){
      message.reply({ content: 'La q lo deja todo pal final'})
    }
});
// RESETEO AUTOMATICO XP
const msgLbSchema = require('./Schemas/msgLbSchema')

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