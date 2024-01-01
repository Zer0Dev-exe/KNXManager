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
    AttachmentBuilder
  } = require("discord.js");
  
  const { loadEvents } = require("./Handlers/cargarEventos");
  const { loadCommands } = require("./Handlers/cargarComandos");
  const { readdirSync } = require("fs");
  const process = require('node:process');
  const token = process.env.TOKEN;
  const voiceData = new Collection();
  const { welcomeCard } = require('greetify')
  const fs = require("fs");
  const wait = require('node:timers/promises').setTimeout;

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
  //client.commandaliases = new Collection(); // prefix
  
  
  client.login(token).then(() => {
    loadEvents(client);
    loadCommands(client);
  });

  //readdirSync('./comandosprefix').forEach((file) => {
    //const command = require(`./comandosprefix/${file}`);
        //if (command) {
            //client.commands.set(command.name, command);
        //if (command.aliases && Array.isArray(command.aliases)) {
            //command.aliases.forEach((alias) => {
            //client.commandaliases.set(alias, command.name);
        //});
    //}
    //}
    //});

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
    if (message.content == 'Sia') {
      if(message.author.id === '946554175037276190') return;
      message.reply({ content: 'Odiar a Sia es significado de saber de música.'})
    } else if (message.content == 'Coneja'){
      if(message.author.id === '946554175037276190') return;
      message.reply({ content: 'Odiar a Sia es significado de saber de música.'})
    } else if (message.content == 'kiri'){
      if(message.author.id === '946554175037276190') return;
      message.reply({ content: 'El más calbo del mundo <:KNX_Monito:1138851761675841676>'})
    } else if (message.content == 'Kiri'){
      if(message.author.id === '946554175037276190') return;
      message.reply({ content: 'El más calbo del mundo <:KNX_Monito:1138851761675841676>'})
    } else if (message.content == 'Marvos') {
      if(message.author.id === '946554175037276190') return;
      message.reply({ content: 'Es Markos monguer'})
    } else if (message.content  == 'zero'){
      if(message.author.id === '946554175037276190') return;
      message.reply({ content: 'Es Zer0, no Zero'})
    } else if (message.content == 'Zero'){
      if(message.author.id === '946554175037276190') return;
      message.reply({ content: 'Es Zer0, no Zero'})
    } else if (message.content == 'Hola'){
      if(message.author.id === '946554175037276190') return;
      message.reply({ content: 'Tu nariz contra mis bolas'})
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