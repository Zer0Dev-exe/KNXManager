const { CommandInteraction, EmbedBuilder, ActionRowBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, TextInputStyle, ChannelType, PermissionsBitField, ModalBuilder, TextInputBuilder, CommandInteractionOptionResolver, InteractionResponse } = require("discord.js");
const blacklist = require('../../Schemas/blacklist');
const ticketDiscord = require('../../Schemas/ticketDiscordSchema.js')
const ticketTwitch = require('../../Schemas/ticketTwitchSchema.js')
const dropSchema = require('../../Schemas/dropSchema.js')
const tDrop = require('../../Schemas/ticketDropSchema.js')

const wait = require('node:timers/promises').setTimeout;

var timeout = []

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {

        return interaction.reply({ content: "Este comando no furula, dale restart amigo" })
      }
      else {
        
         const data = await blacklist.findOne ({ User: interaction.user.id});

         const canal = await client.channels.cache.get('1112722545305718816')
         const servidor = interaction.guild.name;
         const usuario = interaction.user.username;
         const canalsv = interaction.channel
         const usuarioID = interaction.user.id;

         const embed = new EmbedBuilder()
         .setColor('Blue')
         .setTitle('Comando usado!')
         .addFields({ name: 'Nombre de servidor', value: `${servidor}`})
         .addFields({ name: 'Nombre comando', value: `${interaction}`})
         .addFields({ name: 'Canal', value: `${canalsv}`})
         .addFields({ name: 'Usuario', value: `${usuario} / ${usuarioID} `})
         .setTimestamp()
         .setFooter({ text: 'Comando ejecutado'})

         await canal.send({ embeds: [embed] })

         if (data) return interaction.reply({ content: 'Estás **blacklisteado** de usar el sistema esto significa que el desarrollador ha prohibido que uses los comandos', ephemeral: true })
      }
      command.execute(interaction, client);

    } else if (interaction.isSelectMenu()) { // Changed here

      if(interaction.customId === "guia") {
        const values = interaction.values[0];

        const canales = new EmbedBuilder()
            .setDescription('# GUÍA CANALES TEAM KNX\n\n**Aquí se encuentra la información tanto de canales de interacción, sociales y a su vez de los roles disponibles en el servidor.**\n\n>>> <#700911264645513226> Normas del servidor.\n<#1016169782854295594> Anuncios del servidor, tanto de novedades, cambios y eventos. \n<#1016169843441008650> Todas las redes de Kirinuxx.\n<#1020324112729636975> Anuncios streams de Kirinuxx.\n<#1016170761968431217> Sorteos del servidor. \n<#1016170169766260856> Sistema de ayuda para contactar staffs. \n<#1016170386414633091> Canal de autoroles (Menciones, entretenimiento, juegos e información) \n<#1016170431394365502> Canal para elegir colores. \n<#1016696225468252170> Colores exclusivos. \n<#1016170529553645610> Anuncios subida de nivel.\n<#1023384595208601684> Conoce y habla con los demás. \n<#1016170618720354394> Envía imágenes o videos.\n<#1020301991261507606> Crea o participa en un debate.\n<#1016170652778102835> Envía tus memes. \n<#1016170729785544814> Anota tu fecha de cumpleaños para que se recuerde. \n<#1016372022797938768> Encuestas del servidor. \n<#1016171578771374131> Canal para los comandos de bots.')
            .setColor('#0be4db')
            .setThumbnail(`${interaction.guild.iconURL()}`)
            .setImage('https://media.discordapp.net/attachments/936591912079618089/1023343030348038256/Informacion_Canales.png?width=450&height=45')
            .setFooter({ text: `Información de canales de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            const roles = new EmbedBuilder()
            .setDescription('# GUÍA ROLES TEAM KNX\n\n## __Roles Staff__\n\n> <@&700872939041718356> Dueño del servidor. \n> <@&725731790333149197> Administradores del servidor, encargados de supervisar el servidor.\n> <@&700884332759482409> Moderadores avanzados del servidor.\n> <@&700889141340143616> Moderadores principiantes del servidor.\n> <@&700889142107832330> Rol miembros del staff.\n> <@&861560973198753803> Moderadores canal de Twitch.  \n\n## __Roles VIP__\n\n> <@&746749042536480919> Boosters del servidor. \n> <@&700889155038609430> Rol por actividad en el servidor.\n> <@&700889143403872318> Rol para streamers de Twitch seleccionados por Kirinuxx.\n> <@&700936465848205342> Rol para streamers de Youtube seleccionados por Kirinuxx.\n\n## __Roles Niveles__\n\n> **Nivel 5**: <@&1016369058679099544>  Ventaja de cambiarse el apodo.  \n> **Nivel 10**: <@&1016369368327794789> Poder reaccionar a mensajes.\n> **Nivel 20**: <@&1016369712344612917> Dinero en economía y usar pegatinas externas.\n> **Nivel 30**: <@&1016369883191185488> Crear hilos públicos.\n> **Nivel 40**: <@&1016370073826492466> Crear hilos privados. \n> **Nivel 50**: <@&1016370245365157938> Acceso a colores exclusivos. \n> **Nivel 70**: <@&1016370407244312636> Acceso a sorteos exclusivos.\n> **Nivel 100**: <@&1016370567978422453> Podrás postularte al staff [Aunque estén cerradas] + Tarjeta Google Play 5€\n> **Nivel 120**: <@&1016370861516783768> Acceso a logs del servidor. \n> **Nivel 150**: <@&1016371051317428255> Tarjeta de 10€ Google Play\n\n\n## __Roles Comunes__\n\n> <@&1023271152753319967> Miembros del servidor. \n> <@&700932292813783040> Bots del servidor.')
            .setColor('#10fc78')
            .setThumbnail(`${interaction.guild.iconURL()}`)
            .setImage('https://media.discordapp.net/attachments/936591912079618089/1023343029886668870/Informacion_Roles.png?width=450&height=45')
            .setFooter({ text: `Información de canales de ${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})

            const claimButton = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setLabel('Reclamar KNX')
              .setCustomId('knxrol')
              .setStyle(ButtonStyle.Success)
            )

        if (values === "canal") {

          interaction.reply({ embeds: [canales], ephemeral: true})

        } else if (values === "rol") {

          interaction.reply({ embeds: [roles], components: [claimButton], ephemeral: true})
        }


      } else if(interaction.customId === "normas") {
        const values = interaction.values[0];

        const uno = new EmbedBuilder()
        .setTitle('**❓ ¿Para qué sirven las normas?**')
        .setColor('#2d2c2c')
        .setThumbnail(`${interaction.guild.iconURL()}`)
        .setDescription('A pesar de que Discord ya cuenta con unas normativas establecidas ([puedes revisarlas aquí](https://discord.com/guidelines)), como comunidad, nos gusta explicar de manera concreta cómo queremos que nuestros usuarios disfruten de los servicios y de El Servidor. El único fin que tiene el presente Texto es ordenar la comunidad y permitir que continúe la armonía que deseamos entre todos los miembros.')

        const dos = new EmbedBuilder()
        .setTitle('**🌐 Derechos y obligaciones**')
        .setColor('#2d2c2c')
        .setThumbnail(`${interaction.guild.iconURL()}`)
        .setDescription('Nos importa manteneros informados, es por esto que la administración ha redactado un apartado en el que explicamos cómo tratamos los datos y qué procedimientos podemos ejercer como servidor público dentro de Discord. Es importante tener en cuenta que las leyes aplican de manera distinta dependiendo de lugar donde residas, por ejemplo, en España se encuentra vigente la LOPD ([Ley Orgánica de Protección de Datos) sumada a la RGPD (Reglamento General de Protección de Datos) que es válido en todos los países de la Unión Europea. Dicho esto, nos hemos basado en unos cuantos artículos importantes para explicar y enseñar qué hacemos con los datos que recolectamos y cuáles son específicamente.\n\nNos movemos de acuerdo con la GDPR (General Data Protection Regulation) de la UE*, con matices de la COPPA (Childrens Online Privacy Protection Rule) y teniendo siempre en cuenta lo permitido en los Términos del Servicio y la Política de Privacidad aplicable en toda la plataforma.')

        const boton = new ActionRowBuilder()
          .addComponents(
          new ButtonBuilder()
            .setLabel(`LOPD`)
            .setStyle(ButtonStyle.Link)
            .setURL('https://protecciondatos-lopd.com/empresas/nueva-ley-proteccion-datos-2018/#:~:text=La%20ley%20orgánica%20de%20protección%20de%20datos%20establece%20que%20la,sus%20padres%20o%20tutores%20legales'),
          new ButtonBuilder()
            .setLabel(`RGDP`)
            .setStyle(ButtonStyle.Link)
            .setURL('https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_es#:~:text=El%20Reglamento%20general%20de%20protección%20de%20datos%20(RGPD)&text=El%20Reglamento%20es%20una%20medida,en%20el%20mercado%20único%20digital'),
          new ButtonBuilder()
            .setLabel(`GDPR`)
            .setStyle(ButtonStyle.Link)
            .setURL('https://gdpr-info.eu'),
          new ButtonBuilder()
            .setLabel(`COPPA`)
            .setStyle(ButtonStyle.Link)
            .setURL('https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa')
          )

          const boton2 = new ActionRowBuilder()
          .addComponents(
          new ButtonBuilder()
            .setLabel(`Guidelines Discord`)
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/guidelines'),
          new ButtonBuilder()
            .setLabel(`Terminos Discord`)
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/terms')
          )
        
        const tres = new EmbedBuilder()
        .setTitle('**📘 Normas Generales**')
        .setColor('#2d2c2c')
        .setThumbnail(`${interaction.guild.iconURL()}`)
        .setDescription('Estas normas aplican a todos los canales del servidor.\n\n**1.1  `✅` Aceptación de las reglas**\nAl acceder al servidor, aceptas las condiciones que planteamos como comunidad y confirmas que has leído y estás de acuerdo con las normativas que hemos establecido. Cualquier molestia, duda o corrección se puede hacer mediante una solicitud en nuestros tickets directamente.\n\n**1.2 `📖`  Respeto a los miembros de la comunidad**\n¡Somos todos personas!, bueno, algunos gatos… Pero todos merecemos respeto.\nPor ende: la incitación al odio, los comentarios xenofóbicos, las apologías al uso de terminología que denote cualquier comportamiento el cual aísle a un grupo de personas por cualquier motivo o cualquier clase de conducta que discrimine a una entidad o creencia, están completamente vetadas.\n\n**1.3 `📱`  Uso correcto de la organización del servidor**\nRecuerda que cada canal tiene una función concreta, la cual debe ser considerada durante su utilización. Es necesario revisar el tópico de cada uno de los lugares a los que te metas para asegurarte de que los estás empleando correctamente.\n\n**1.4 `👤` Suplantación de identidad**\nCero tolerancia ante intentos de hacerse pasar por cualquier persona, figura o colectivo: tanto personajes públicos como individuales desconocidos. Aclaramos que tener el nombre o foto de perfil a modo de broma, por un meme o únicamente por fanatismo está permitido siempre y cuando se mantenga claro y no se pueda desencadenar ninguna duda.\n\n**1.5 `🎤` Temas controvertidos**\nIncentivar o llevar a cabo conversaciones relacionadas con temas delicados como política, asuntos religiosos u otros, es muy poco recomendable por los desacuerdos a los que puede derivar. Siempre animamos a hacerlo en un entorno de confianza y cerrado para que se pueda mantener su control.\n\n**1.6 `📜` Tu perfil**\nA pesar de que tu cuenta es tuya, debes tener presente que en la plataforma hay personas de mucha variedad, con diferentes edades, por consiguiente, procesos mentales y como añadido, múltiples procedencias y pensamientos.\nConsidera que el contenido de tu perfil cumpla las reglas de TeamKNX, así como también lo dictaminado en la aplicación.')

        const cuatro = new EmbedBuilder()
        .setTitle('**📗 Normas Canales de Texto**')
        .setDescription('Sección destinada a directivas que aplican a los diferentes canales de texto del servidor.\n\n**2.1 `☎️` Cadenas de texto, flood y Spam**\nEl flood, y las cadenas no se admiten en los canales debido a que interrumpen la experiencia de los usuarios. Estas prácticas pueden resultar molestas y dificultar la conversación en el servidor. Contemplamos y vetamos los siguientes conceptos:\n\n**Cadenas:** ASCII art, mensajes con caracteres innecesarios o saturados, encadenamiento de mensajes relacionados entre sí sin un propósito acorde con la temática del chat.\n\n**Flood:** término que se deriva de la palabra inglesa «cascada», enviar mensajes en grandes cantidades o de forma repetitiva. Esto significa que enviar un mensaje o una serie de mensajes similares varias veces seguidas se considerará como flood.\n\n**Spam:** promoción de un servidor, red social, grupo, etc.\n\n**2.2 `📸` Difusión de imágenes y multimedia**\n\n➔Multimedia pornográfica de cualquier clase y formato.\n➔ Contenido de actos de violencia armada o robos con violencia, además de contenido gore o sangriento.\n\n**2.3 `❌` Spam de Servidores o Redes Sociales**\n➔De ninguna manera se puede enviar publicidad no deseada en el servidor; independientemente de cual fuera.')
        .setColor('#2d2c2c')
        .setThumbnail(`${interaction.guild.iconURL()}`)

        const cinco = new EmbedBuilder()
        .setTitle('**📙 Normas Canales de Voz**')
        .setDescription('Estas reglas se aplican a los canales de voz del servidor, tanto los canales personalizados como los canales públicos.\n\n**3.1 `☁️` Canales de voz Personalizados**\nEvita crearlos con términos inadecuados que infrinjan las reglas de conducta o usen palabros que estén en la lista negra de Discord.\n\n**3.2 `📢` Sonidos molestos**\nAbarca desde lanzar gritos, saturar, soplar el micrófono a reproducir canciones o efectos de sonido disruptivos, gemir y/o hablar con voces incómodas para los presentes.')
        .setColor('#2d2c2c')
        .setThumbnail(`${interaction.guild.iconURL()}`)

        const seis = new EmbedBuilder()
        .setTitle('**📚 Datos Extra**')
        .setColor('#2d2c2c')
        .setThumbnail(`${interaction.guild.iconURL()}`)
        .setDescription('La decisión final sobre todos los disturbios, alteraciones de la tranquilidad pública o perturbación, es decir, sobre cualquier desorden queda a merced de nuestro equipo de moderación y sus integrantes.\nLos procedimientos no necesariamente tienen que obedecer siempre las mismas pautas y estarán supervisados en todo momento. Si se encuentra cualquier obstáculo o perjuicio en un veredicto, estaremos abiertos a discutirlo mediante una solicitud formal.')

        if (values === "1") { // Change here
          return interaction.reply({ embeds: [uno], ephemeral: true})
        } else if (values === "2") { // Change here
          return interaction.reply({ embeds: [dos], components: [boton, boton2], ephemeral: true})
        } else if (values === "3") { // Change here
          return interaction.reply({ embeds: [tres], ephemeral: true})
        } else if (values === "4") { // Change here
          return interaction.reply({ embeds: [cuatro], ephemeral: true})
        } else if (values === "5") { // Change here
          return interaction.reply({ embeds: [cinco], ephemeral: true})
        } else if (values === "6") { // Change here
          return interaction.reply({ embeds: [seis], ephemeral: true})
        }

      } else if(interaction.customId === "osoporte") {
        const values = interaction.values[0];
        const canal = client.channels.cache.get('1131272774233632869')

        if (values === "1") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, por lo que parece en este ticket no has recibido el soporte adecuado, por lo que nos veremos obligados a corregir la forma de atender de nuestro staff, muchas gracias por la valoración', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })

        } else if (values === "2") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, por lo que parece en este ticket no has recibido el soporte adecuado, por lo que nos veremos obligados a corregir la forma de atender de nuestro staff, muchas gracias por la valoración', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })

        } else if (values === "3") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, trataremos de ver como mejorar para la próxima vez tu opinión será tomado en cuenta', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        } else if (values === "4") { 

          interaction.reply({ content: 'Muchas gracias por tu opinión, parece que estás satisfech@ con el staff que ha atendido el ticket, gracias por contactarnos.', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        } else if (values === "5") { 

          interaction.reply({ content: 'Muchas gracias por tu opinión, parece que estás satisfech@ con el staff que ha atendido el ticket, gracias por contactarnos.', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        }
      } else if(interaction.customId === "oreporte") {
        const values = interaction.values[0];
        const canal = client.channels.cache.get('1131272774233632869')

        if (values === "1") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, por lo que parece en este ticket no has recibido el soporte adecuado, por lo que nos veremos obligados a corregir la forma de atender de nuestro staff, muchas gracias por la valoración', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })

        } else if (values === "2") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, por lo que parece en este ticket no has recibido el soporte adecuado, por lo que nos veremos obligados a corregir la forma de atender de nuestro staff, muchas gracias por la valoración', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })

        } else if (values === "3") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, trataremos de ver como mejorar para la próxima vez tu opinión será tomado en cuenta', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        } else if (values === "4") { 

          interaction.reply({ content: 'Muchas gracias por tu opinión, parece que estás satisfech@ con el staff que ha atendido el ticket, gracias por contactarnos.', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        } else if (values === "5") { 

          interaction.reply({ content: 'Muchas gracias por tu opinión, parece que estás satisfech@ con el staff que ha atendido el ticket, gracias por contactarnos.', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        }
      } else if(interaction.customId === "osorteo") {
        const values = interaction.values[0];
        const canal = client.channels.cache.get('1131272774233632869')

        if (values === "1") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, por lo que parece en este ticket no has recibido el soporte adecuado, por lo que nos veremos obligados a corregir la forma de atender de nuestro staff, muchas gracias por la valoración', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })

        } else if (values === "2") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, por lo que parece en este ticket no has recibido el soporte adecuado, por lo que nos veremos obligados a corregir la forma de atender de nuestro staff, muchas gracias por la valoración', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })

        } else if (values === "3") { 

          interaction.reply({ content: 'Muchas gracias por tu valoración, trataremos de ver como mejorar para la próxima vez tu opinión será tomado en cuenta', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        } else if (values === "4") { 

          interaction.reply({ content: 'Muchas gracias por tu opinión, parece que estás satisfech@ con el staff que ha atendido el ticket, gracias por contactarnos.', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        } else if (values === "5") { 

          interaction.reply({ content: 'Muchas gracias por tu opinión, parece que estás satisfech@ con el staff que ha atendido el ticket, gracias por contactarnos.', ephemeral: true })

          const embed = new EmbedBuilder()
          .setTitle(`Valoración de Ticket de ${interaction.user.username}`)
          .setDescription(` \`\`\`⭐⭐⭐⭐⭐\`\`\` `)
          .addFields(
            {
              name: 'Canal',
              value: `${interaction.channel.name}`
            }
          )
          .setColor('#3deb82')
          interaction.channel.send({ content: 'Valoración enviada, muchas gracias por enviar tu opinión se tendrá en cuenta.'})
          canal.send({ embeds: [embed] })
          
        }
      } else if(interaction.customId === "colores") {

        const values = interaction.values[0];

        if(values === "azul") {
          await interaction.deferReply({ ephemeral: true })
          await interaction.member.roles.add('815957337877512263')
          await interaction.member.roles.remove('964534602502926367')
          await interaction.member.roles.remove('815960018997870663')
          await interaction.member.roles.remove('815957002470686721')
          await interaction.member.roles.remove('815962176023035905')
          await interaction.member.roles.remove('756838157638565930')
          await interaction.member.roles.remove('815961558022750208')

          await interaction.editReply({ content: 'Has elegido el rol de <@&815957337877512263>', ephemeral: true })

        } else if(values === "negro") {
          await interaction.deferReply({ ephemeral: true })

          await interaction.member.roles.add('964534602502926367')
          await interaction.member.roles.remove('815957337877512263')
          await interaction.member.roles.remove('815960018997870663')
          await interaction.member.roles.remove('815957002470686721')
          await interaction.member.roles.remove('815962176023035905')
          await interaction.member.roles.remove('756838157638565930')
          await interaction.member.roles.remove('815961558022750208')

          await interaction.editReply({ content: 'Has elegido el rol de <@&964534602502926367>', ephemeral: true })

        } else if(values === "morado") {
          
          await interaction.deferReply({ ephemeral: true })
          await interaction.member.roles.add('815960018997870663')
          await interaction.member.roles.remove('815957337877512263')
          await interaction.member.roles.remove('964534602502926367')
          await interaction.member.roles.remove('815957002470686721')
          await interaction.member.roles.remove('815962176023035905')
          await interaction.member.roles.remove('756838157638565930')
          await interaction.member.roles.remove('815961558022750208')

          await interaction.editReply({ content: 'Has elegido el rol de <@&815960018997870663>', ephemeral: true })

        } else if(values === "verde") {

          await interaction.deferReply({ ephemeral: true })
          await interaction.member.roles.add('815957002470686721')
          await interaction.member.roles.remove('815957337877512263')
          await interaction.member.roles.remove('964534602502926367')
          await interaction.member.roles.remove('815960018997870663')
          await interaction.member.roles.remove('815962176023035905')
          await interaction.member.roles.remove('756838157638565930')
          await interaction.member.roles.remove('815961558022750208')

          await interaction.editReply({ content: 'Has elegido el rol de <@&815957002470686721>', ephemeral: true })

        } else if(values === "amarillo") {

          await interaction.deferReply({ ephemeral: true })
          await interaction.member.roles.add('815962176023035905')
          await interaction.member.roles.remove('815957337877512263')
          await interaction.member.roles.remove('964534602502926367')
          await interaction.member.roles.remove('815960018997870663')
          await interaction.member.roles.remove('815957002470686721')
          await interaction.member.roles.remove('756838157638565930')
          await interaction.member.roles.remove('815961558022750208')

          await interaction.editReply({ content: 'Has elegido el rol de <@&815962176023035905>', ephemeral: true })

        } else if(values === "marron") {
          await interaction.deferReply({ ephemeral: true })
          await interaction.member.roles.add('756838157638565930')
          await interaction.member.roles.remove('815957337877512263')
          await interaction.member.roles.remove('964534602502926367')
          await interaction.member.roles.remove('815960018997870663')
          await interaction.member.roles.remove('815957002470686721')
          await interaction.member.roles.remove('815962176023035905')
          await interaction.member.roles.remove('815961558022750208')

          await interaction.editReply({ content: 'Has elegido el rol de <@&756838157638565930>', ephemeral: true })

        } else if(values === "blanco") {

          await interaction.deferReply({ ephemeral: true })
          await interaction.member.roles.add('815961558022750208')
          await interaction.member.roles.remove('815957337877512263')
          await interaction.member.roles.remove('964534602502926367')
          await interaction.member.roles.remove('815960018997870663')
          await interaction.member.roles.remove('815957002470686721')
          await interaction.member.roles.remove('815962176023035905')
          await interaction.member.roles.remove('756838157638565930')

          await interaction.editReply({ content: 'Has elegido el rol de <@&815961558022750208>', ephemeral: true })

        } else if(values === "nada") {
          await interaction.reply({ content: 'Ahora puedes pulsar en cualquier otro botón', ephemeral: true })
        }

      }

    } else if (interaction.isButton()) {

      if (interaction.customId == "knxrol") {
        const embedPrevio = new EmbedBuilder()
        .setAuthor({ name: 'Team KNX'})
        .setColor('Orange')
        .setTitle('Error')
        .setDescription(`No se te ha entregado el rol porque ya lo tenías.\n¡Gracias por apoyar al servidor!`)
        .setFooter({ text: 'BETA | Etiqueta - Team KNX', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedFalse = new EmbedBuilder()
          .setAuthor({ name: 'Team KNX' })
          .setColor('Red')
          .setTitle('Error')
          .setDescription(`¡Tu nombre de usuario no contiene la etiqueta del servidor!\nNo se te ha entregado el rol.\nNombre de usuario actual: ${interaction.user.username}#${interaction.member.user.discriminator}`)
          .setFooter({ text: 'BETA | Etiqueta - Team KNX', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedTrue = new EmbedBuilder()
          .setAuthor({ name: 'Team KNX' })
          .setColor('Green')
          .setTitle('Rol entregado')
          .setDescription('¡Gracias por apoyar al servidor!')
          .setFooter({ text: 'BETA | Etiqueta - Team KNX', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

          /* Rol del servidor */
        const { roles } = interaction.member;
        const role = await interaction.guild.roles.fetch('936994434195783701');
        const nombreUser = interaction.user.username;

          /* Tiene el rol */
        if (roles.cache.has('936994434195783701')) {
          return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [embedPrevio], ephemeral: true });
        }

          /* Tiene alguna de las etiquetas */
        const listaEtiquetas = ['knx', 'KNX', 'KnX']
        for (const etiquetas of listaEtiquetas) {
        console.log(`Checando ${etiquetas} de ${nombreUser}`);
        if ((interaction.user.username).includes(etiquetas)) {
        await interaction.deferReply({ fetchReply: true, ephemeral: true });

        await roles.add(role).catch(console.error);
                  
        await client.channels.fetch;
          const channel = await client.channels.cache.get('942082996771639327');
          channel.send({ content: `<@${interaction.user.id}>`, embeds: [embedTrue] });

          return interaction.editReply({ content: `<@${interaction.user.id}>`, embeds: [embedTrue], ephemeral: true });
          }
          console.log(`Nope. (${etiquetas})`);
        }

          /* No tiene la etiqueta del servidor */
        return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [embedFalse], ephemeral: true });

      } else if (interaction.customId == "p1-d") {

        const modal = new ModalBuilder({
          customId: `myModal-${interaction.user.id}`,
          title: 'Primeras Preguntas',
        })

        const porque = new TextInputBuilder({
          customId: 'porqueStaff',
          label: "¿Porqué quieres ser Staff?",
          style: TextInputStyle.Paragraph,
        })

        const tiempo = new TextInputBuilder({
          customId: 'tiempoStaff',
          label: "¿Cuanto tiempo puedes estar activo?",
          style: TextInputStyle.Short,
        })

        const firstActionRow = new ActionRowBuilder().addComponents(porque)
        const secondActionRow = new ActionRowBuilder().addComponents(tiempo)

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal)

        // Esperar
        const filter = (interaction) => interaction.customId === `myModal-${interaction.user.id}`

        interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const porque = modalInteraction.fields.getTextInputValue('porqueStaff')
            const tiempo = modalInteraction.fields.getTextInputValue('tiempoStaff')

            const button = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('p2-d')
              .setLabel('Seguir Postulación')
              .setStyle(ButtonStyle.Secondary),
            )

            const embed = new EmbedBuilder()
            .setColor('#497efa')
            .setDescription(`# Respuestas Primeras Preguntas\n\n### ¿Porqué quieres ser Staff?\n\n${porque}\n\n### ¿Cuanto tiempo puedes estar activo?\n\n${tiempo}`)
            .setFooter({ text: `Ahora puedes seguir con las preguntas secundarias`, iconURL: `${interaction.guild.iconURL()}`})

            //interaction.channel.send({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas secundarias`, components: [button]})
            modalInteraction.reply({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas secundarias`, components: [button]})
          })
          .catch((err) => {
            console.log(`Error: ${err}`)
          })
        } else if (interaction.customId == "p2-d") {

          const modal = new ModalBuilder({
            customId: `myModal2-${interaction.user.id}`,
            title: 'Preguntas Secundarias',
          })
  
          const chat = new TextInputBuilder({
            customId: 'chatStaff',
            label: "Sugiere maneras para activar el chat general",
            style: TextInputStyle.Paragraph,
          })
  
          const mod = new TextInputBuilder({
            customId: 'modStaff',
            label: "¿Si hay más de 2 tickets como atenderías?",
            style: TextInputStyle.Paragraph,
          })
  
          const firstActionRow = new ActionRowBuilder().addComponents(chat)
          const secondActionRow = new ActionRowBuilder().addComponents(mod)
  
          modal.addComponents(firstActionRow, secondActionRow);
  
          await interaction.showModal(modal)
  
          // Esperar
          const filter = (interaction) => interaction.customId === `myModal2-${interaction.user.id}`
  
          interaction
            .awaitModalSubmit({ filter, time: 300_000 })
            .then((modalInteraction) => {
              const chat = modalInteraction.fields.getTextInputValue('chatStaff')
              const mod = modalInteraction.fields.getTextInputValue('modStaff')
  
              const button = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setCustomId('p3-d')
                .setLabel('Preguntas Complementarias')
                .setStyle(ButtonStyle.Secondary),
              )

              const embed = new EmbedBuilder()
            .setColor('#497efa')
            .setDescription(`# Respuestas Preguntas Secundarias\n\n### Sugiere maneras para activar el chat general\n\n${chat}\n\n### ¿Si hay más de 2 tickets como atenderías?\n\n${mod}`)
            .setFooter({ text: `Ahora puedes seguir con las preguntas secundarias`, iconURL: `${interaction.guild.iconURL()}`})

            //interaction.channel.send({ embeds: [embed], content: `Ya estamos en la recta final ahora tendrás que contestar las preguntas complementarias`, components: [button]})
            modalInteraction.reply({ embeds: [embed], content: `Ya estamos en la recta final ahora tendrás que contestar las preguntas complementarias`, components: [button]})
            })
            .catch((err) => {
              console.log(`Error: ${err}`)
            })

      } else if (interaction.customId == "p3-d") {

        const modal = new ModalBuilder({
          customId: `myModal3-${interaction.user.id}`,
          title: 'Preguntas Complementarias',
        })

        const xp = new TextInputBuilder({
          customId: 'xpStaff',
          label: "¿Experiencia como Staff? Tiempo y Donde",
          style: TextInputStyle.Paragraph,
        })

        const desc = new TextInputBuilder({
          customId: 'descStaff',
          label: "Describe de que trata el servidor",
          style: TextInputStyle.Paragraph,
        })

        const firstActionRow = new ActionRowBuilder().addComponents(xp)
        const secondActionRow = new ActionRowBuilder().addComponents(desc)

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal)

        // Esperar
        const filter = (interaction) => interaction.customId === `myModal3-${interaction.user.id}`

        interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const xp = modalInteraction.fields.getTextInputValue('xpStaff')
            const desc = modalInteraction.fields.getTextInputValue('descStaff')

            const embed = new EmbedBuilder()
            .setColor('#497efa')
            .setDescription(`# Respuestas Preguntas Complementarias\n\n### ¿Experiencia como Staff? Tiempo y Donde\n\n${xp}\n\n### Describe de que trata el servidor\n\n${desc}`)
            .setFooter({ text: `Postulación Terminada`, iconURL: `${interaction.guild.iconURL()}`})

            const final = new ActionRowBuilder()
            .addComponents(
            new ButtonBuilder()
            .setCustomId('claim-discord')
            .setLabel('Reclamar Ticket')
            .setStyle(ButtonStyle.Success)
            .setEmoji('1025179417451958272'),
            new ButtonBuilder()
            .setCustomId('final-a')
            .setLabel('Aceptar Postulación')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1139226067454926878'),
            new ButtonBuilder()
            .setCustomId('final-b')
            .setLabel('Denegar Postulación')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1139226067454926878'),
            )

            modalInteraction.reply({ embeds: [embed], components: [final], content: `<@&725731790333149197> <@&700884332759482409>`, allowedMentions:{parse: ['roles']}})
          })
          .catch((err) => {
            console.log(`Error: ${err}`)
          })
      } else if (interaction.customId == "final-a") {

        if(!interaction.member.roles.cache.get('700884332759482409'))  {
          interaction.reply({ content: 'No puedes usar este botón', ephemeral: true })
        } else {
          data = await ticketDiscord.findOne({ channelId: interaction.channel.id })
          let openBy = interaction.guild.members.cache.get(data.openBy)

          openBy.roles.add('1119746672076017674')
          openBy.roles.add('713630122141286440')

          const embed = new EmbedBuilder()
          .setTitle(`Felicidades ${openBy.user.username} !`)
          .setThumbnail(`${openBy.user.avatarURL()}`)
          .setColor('#faf4f4')
          .setDescription('Aún hayas sido aceptado recuerda que estarás en un periodo de prueba de maximo de 2 semanas, en esas semanas tendrás que demostrar de lo que eres capaz. Tu disciplina será valorada por los miembros de nuestro staff mediante la actividad en chat general, realización de eventos o soporte a los usuarios mediante ticket / canales del servidor, no olvides dar lo máximo de ti en estas 2 semanas y no te rindas hasta el final.\n\n*La Administración de Team KNX te da la bienvenida*')
          .setFooter({ text: `Administración de Team KNX`, iconURL: `${interaction.guild.iconURL()}`})

          const canal = interaction.guild.channels.cache.get('942082996771639327')

          canal.send({ content: `Denle una calida bienvenida a ${openBy} <a:Estrellas5:1074117495079833703>`, allowedMentions:{parse: ['users']}})

          interaction.reply({ content: `<a:Estrellas5:1074117495079833703> ${openBy} <a:Estrellas5:1074117495079833703>`, embeds: [embed], allowedMentions:{parse: ['users']}})
        }

      } else if (interaction.customId == "final-b") {

        if(!interaction.member.roles.cache.get('700884332759482409'))  {
          interaction.reply({ content: 'No puedes usar este botón', ephemeral: true })
        } else {
          data = await ticketDiscord.findOne({ channelId: interaction.channel.id })
          let openBy = interaction.guild.members.cache.get(data.openBy)
          console.log(openBy.id)

          const modal = new ModalBuilder({
            customId: `denegado-d-${interaction.user.id}`,
            title: 'Postulación Denegada',
          })

          const razon = new TextInputBuilder({
            customId: 'staff-denegado-discord',
            label: "Razón de denegación",
            style: TextInputStyle.Paragraph,
          })

          const firstActionRow = new ActionRowBuilder().addComponents(razon)

          modal.addComponents(firstActionRow);

          await interaction.showModal(modal)

          // Esperar
          const filter = (interaction) => interaction.customId === `denegado-d-${interaction.user.id}`

          interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const razon = modalInteraction.fields.getTextInputValue('staff-denegado-discord')

            const embed = new EmbedBuilder()
            .setTitle(`Postulación Denegada ${openBy.user.username}`)
            .addFields(
              { name: 'Razón', value: `${razon}`}
            )
            .setThumbnail(`${openBy.user.avatarURL()}`)
            .setColor('#ff5458')
            .setFooter({ text: `Administración de Team KNX`, iconURL: `${interaction.guild.iconURL()}`})

            
            modalInteraction.reply({ embeds: [embed], content: `${openBy}`, allowedMentions:{parse: ['users']}})
          })
        }
      } else if (interaction.customId == "p1-t") {

        const modal = new ModalBuilder({
          customId: `ronda1-${interaction.user.id}`,
          title: 'Primeras Preguntas',
        })

        const xp = new TextInputBuilder({
          customId: 'xpS-t',
          label: "¿Conoces los comandos básicos de moderador?",
          style: TextInputStyle.Paragraph,
        })

        const tiempo = new TextInputBuilder({
          customId: 'tempS-T',
          label: "¿Cuánta disponibilidad tienes?",
          style: TextInputStyle.Short,
        })

        const firstActionRow = new ActionRowBuilder().addComponents(xp)
        const secondActionRow = new ActionRowBuilder().addComponents(tiempo)

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal)

        // Esperar
        const filter = (interaction) => interaction.customId === `ronda1-${interaction.user.id}`

        interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const xp = modalInteraction.fields.getTextInputValue('xpS-t')
            const tiempo = modalInteraction.fields.getTextInputValue('tempS-T')

            const button = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('p2-t')
              .setLabel('Seguir Postulación')
              .setStyle(ButtonStyle.Secondary),
            )

            const embed = new EmbedBuilder()
            .setColor('#8351f7')
            .setDescription(`# Respuestas Primeras Preguntas\n\n### ¿Conoces los comandos básicos de Moderación?\n\n${xp}\n\n### ¿Cuanta Disponibilidad tienes?\n\n${tiempo}`)
            .setFooter({ text: `Ahora puedes seguir con las preguntas secundarias`, iconURL: `${interaction.guild.iconURL()}`})

            //interaction.channel.send({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas secundarias`, components: [button]})
            modalInteraction.reply({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas secundarias`, components: [button]})
          })
          .catch((err) => {
            console.log(`Error: ${err}`)
          })

      } else if (interaction.customId == "p2-t") {

        const modal = new ModalBuilder({
          customId: `ronda2-${interaction.user.id}`,
          title: 'Ronda de Preguntas 2',
        })

        const s = new TextInputBuilder({
          customId: 'sS-t',
          label: "¿Tienes experiencia como moderador de Twitch?",
          style: TextInputStyle.Paragraph,
        })

        const tox = new TextInputBuilder({
          customId: 'toxS-t',
          label: "¿Qué harías en casos ofensivos/tóxicos? ",
          style: TextInputStyle.Paragraph,
        })

        const firstActionRow = new ActionRowBuilder().addComponents(s)
        const secondActionRow = new ActionRowBuilder().addComponents(tox)

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal)

        // Esperar
        const filter = (interaction) => interaction.customId === `ronda2-${interaction.user.id}`

        interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const s = modalInteraction.fields.getTextInputValue('sS-t')
            const tox = modalInteraction.fields.getTextInputValue('toxS-t')

            const button = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('p3-t')
              .setLabel('Seguir Postulación')
              .setStyle(ButtonStyle.Secondary),
            )

            const embed = new EmbedBuilder()
            .setColor('#8351f7')
            .setDescription(`# Respuestas Segundo Formulario\n\n### ¿Tienes experiencia como moderador de Twitch?\n\n${s}\n\n### ¿Qué harías en caso de comportamientos ofensivos/tóxicos?\n\n${tox}`)
            .setFooter({ text: `Ahora puedes seguir con la ronda de preguntas tercera`, iconURL: `${interaction.guild.iconURL()}`})

            //interaction.channel.send({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas secundarias`, components: [button]})
            modalInteraction.reply({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas 3`, components: [button]})
          })
          .catch((err) => {
            console.log(`Error: ${err}`)
          })

      } else if (interaction.customId == "p3-t") {

        const modal = new ModalBuilder({
          customId: `ronda3-${interaction.user.id}`,
          title: 'Ronda de Preguntas 3',
        })

        const cr = new TextInputBuilder({
          customId: 'crS-t',
          label: "Criterios para aceptar solicitud desban",
          style: TextInputStyle.Paragraph,
        })

        const pr = new TextInputBuilder({
          customId: 'prS-t',
          label: "¿Cómo funcionan las predicciones y encuestas?",
          style: TextInputStyle.Paragraph,
        })

        const firstActionRow = new ActionRowBuilder().addComponents(cr)
        const secondActionRow = new ActionRowBuilder().addComponents(pr)

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal)

        // Esperar
        const filter = (interaction) => interaction.customId === `ronda3-${interaction.user.id}`

        interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const cr = modalInteraction.fields.getTextInputValue('crS-t')
            const pr = modalInteraction.fields.getTextInputValue('prS-t')

            const button = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('p4-t')
              .setLabel('Seguir Postulación')
              .setStyle(ButtonStyle.Secondary),
            )

            const embed = new EmbedBuilder()
            .setColor('#8351f7')
            .setDescription(`# Respuestas Tercer Formulario\n\n### Criterios para aceptar solicitud desban\n\n${cr}\n\n### ¿Cómo funcionan las predicciones y encuestas?\n\n${pr}`)
            .setFooter({ text: `Ahora puedes seguir con la cuarta ronda de preguntas`, iconURL: `${interaction.guild.iconURL()}`})

            //interaction.channel.send({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas secundarias`, components: [button]})
            modalInteraction.reply({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas 4`, components: [button]})
          })
          .catch((err) => {
            console.log(`Error: ${err}`)
          })

      } else if (interaction.customId == "p4-t") {

        const modal = new ModalBuilder({
          customId: `ronda4-${interaction.user.id}`,
          title: 'Ronda de Preguntas 4',
        })

        const le = new TextInputBuilder({
          customId: 'leS-t',
          label: "Te ves capaz de leer la mayoria de mensajes",
          style: TextInputStyle.Short,
        })

        const mod = new TextInputBuilder({
          customId: 'modS-t',
          label: "¿Razón por la que quieres ser Mod?",
          style: TextInputStyle.Paragraph,
        })

        const firstActionRow = new ActionRowBuilder().addComponents(le)
        const secondActionRow = new ActionRowBuilder().addComponents(mod)

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal)

        // Esperar
        const filter = (interaction) => interaction.customId === `ronda4-${interaction.user.id}`

        interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const le = modalInteraction.fields.getTextInputValue('leS-t')
            const mod = modalInteraction.fields.getTextInputValue('modS-t')

            const button = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('p5-t')
              .setLabel('Seguir Postulación')
              .setStyle(ButtonStyle.Secondary),
            )

            const embed = new EmbedBuilder()
            .setColor('#8351f7')
            .setDescription(`# Respuestas Cuarto Formulario\n\n### ¿Te crees capaz de poder leer la mayoria del chat?\n\n${le}\n\n### ¿Por qué quieres ser moderador del canal?\n\n${mod}`)
            .setFooter({ text: `Ahora puedes seguir con la quinta ronda de preguntas`, iconURL: `${interaction.guild.iconURL()}`})

            //interaction.channel.send({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas secundarias`, components: [button]})
            modalInteraction.reply({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas 5`, components: [button]})
          })
          .catch((err) => {
            console.log(`Error: ${err}`)
          })

      } else if (interaction.customId == "p5-t") {

        const modal = new ModalBuilder({
          customId: `ronda5-${interaction.user.id}`,
          title: 'Ronda de Preguntas 5',
        })

        const active = new TextInputBuilder({
          customId: 'activeS-t',
          label: "¿Cómo mantendrías activo el chat?",
          style: TextInputStyle.Short,
        })

        const capaz = new TextInputBuilder({
          customId: 'capazS-t',
          label: "Te ves capaz de cumplir con las necesidades",
          style: TextInputStyle.Short,
        })

        const firstActionRow = new ActionRowBuilder().addComponents(active)
        const secondActionRow = new ActionRowBuilder().addComponents(capaz)

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal)

        // Esperar
        const filter = (interaction) => interaction.customId === `ronda5-${interaction.user.id}`

        interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const active = modalInteraction.fields.getTextInputValue('activeS-t')
            const capaz = modalInteraction.fields.getTextInputValue('capazS-t')

            const reclamar = new ActionRowBuilder()
            .addComponents(
            new ButtonBuilder()
            .setCustomId('claim-twitch')
            .setLabel('Reclamar Ticket')
            .setStyle(ButtonStyle.Success)
            .setEmoji('1025179417451958272'),
            new ButtonBuilder()
            .setCustomId('final-a-t')
            .setLabel('Aceptar Postulación')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('1014991607998730361'),
            new ButtonBuilder()
            .setCustomId('final-b-t')
            .setLabel('Denegar Postulación')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('1014991607998730361')
            )

            const embed = new EmbedBuilder()
            .setColor('#8351f7')
            .setDescription(`# Respuestas Último Formulario\n\n### ¿Cómo mantendrías activo el chat? \n\n${active}\n\n### ¿Te ves capaz de cumplir todas las necesidades para ser mod?\n\n${capaz}`)
            .setFooter({ text: `Postulación Completada`, iconURL: `${interaction.guild.iconURL()}`})

            //interaction.channel.send({ embeds: [embed], content: `Para seguir con la postulación tendrás que completar ahora la fase de preguntas secundarias`, components: [button]})
            modalInteraction.reply({ embeds: [embed], content: `<@&861560973198753803> <@&1140706711078977666>`, components: [reclamar], allowedMentions:{parse: ['roles']}})
          })
          .catch((err) => {
            console.log(`Error: ${err}`)
          })

      } else if (interaction.customId == "final-a-t") {

        if(!interaction.member.roles.cache.get('1140706711078977666'))  {
          interaction.reply({ content: 'Solo los Mods Managers de Twitch pueden usar este botón', ephemeral: true })
        } else {
          data = await ticketTwitch.findOne({ channelId: interaction.channel.id })
          let openBy = interaction.guild.members.cache.get(data.openBy)

          openBy.roles.add('861560973198753803')

          const embed = new EmbedBuilder()
          .setTitle(`Felicidades ${openBy.user.username} !`)
          .setThumbnail(`${openBy.user.avatarURL()}`)
          .setColor('#faf4f4')
          .setDescription('Pronto la Administración de Twitch te dará las indicaciones, antes de obtener los permisos en Twitch te guiarán para que puedas rendir de mejor forma.')
          .setFooter({ text: `Administración de Team KNX`, iconURL: `${interaction.guild.iconURL()}`})

          const canal = interaction.guild.channels.cache.get('861382536822390784')

          canal.send({ content: `Denle una calida bienvenida a ${openBy} <a:Estrellas5:1074117495079833703>`, allowedMentions:{parse: ['users']}})

          interaction.reply({ content: `<a:Estrellas5:1074117495079833703> ${openBy} <a:Estrellas5:1074117495079833703>`, embeds: [embed], allowedMentions:{parse: ['users']}})
        }

      } else if (interaction.customId == "final-b-t") {

        if(!interaction.member.roles.cache.get('1140706711078977666'))  {
          interaction.reply({ content: 'Solo los Mods Managers de Twitch pueden usar este botón', ephemeral: true })
        } else {

          data = await ticketTwitch.findOne({ channelId: interaction.channel.id })
          let openBy = interaction.guild.members.cache.get(data.openBy)
          console.log(openBy.id)

          const modal = new ModalBuilder({
            customId: `denegado-t-${interaction.user.id}`,
            title: 'Postulación Denegada',
          })

          const razon = new TextInputBuilder({
            customId: 'staff-denegado-twitch',
            label: "Razón de denegación",
            style: TextInputStyle.Paragraph,
          })

          const firstActionRow = new ActionRowBuilder().addComponents(razon)

          modal.addComponents(firstActionRow);

          await interaction.showModal(modal)

          // Esperar
          const filter = (interaction) => interaction.customId === `denegado-t-${interaction.user.id}`

          interaction
          .awaitModalSubmit({ filter, time: 300_000 })
          .then((modalInteraction) => {
            const razon = modalInteraction.fields.getTextInputValue('staff-denegado-twitch')

            const embed = new EmbedBuilder()
            .setTitle(`Postulación Denegada ${openBy.user.username}`)
            .addFields(
              { name: 'Razón', value: `${razon}`}
            )
            .setThumbnail(`${openBy.user.avatarURL()}`)
            .setColor('#ff5458')
            .setFooter({ text: `Administración de Team KNX`, iconURL: `${interaction.guild.iconURL()}`})

            
            modalInteraction.reply({ embeds: [embed], content: `${openBy}`, allowedMentions:{parse: ['users']}})
          })
        }
      } else if (interaction.customId == "checkcolor") {
        interaction.reply({ content: 'En mantenimiento', ephemeral: true })

      } else if (interaction.customId == "reclamar-drop") {

        const data = await dropSchema.findOne({ guildId: interaction.guild.id, canal: interaction.channel.id });

        if(data.claim == true ) {
          return interaction.reply({content: 'Este Drop ya fue reclamado!', ephemeral: true});
        } else {
          await interaction.deferReply({ ephemeral: true })
          const data = await dropSchema.findOne({ guildId: interaction.guild.id, canal: interaction.channel.id})
          const prevmensaje = data.msgId
          const mensaje = await interaction.channel.messages.fetch(prevmensaje)
          data.claim = true
          await data.save()

          const embed = new EmbedBuilder()
          .setTitle(data.item)
          .setDescription('<a:Estrellas5:1074117495079833703> Acaba de empezar un drop, pulsa en **"Reclamar"** para reclamar el drop, mucha suerte a todos del servidor y que gane la persona que más reflejos de notificaciones que tenga, al reclamar se abrirá un ticket automaticamente para el ganador. <a:Estrellas5:1074117495079833703>')
          .setColor('#1df5fa')
          .setFooter({ text: `Reclamado por ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}`})
          await mensaje.edit({ embeds: [embed]})

          await interaction.guild.channels.create({
            name:`🎁・drop-${interaction.user.username}`,
            type:ChannelType.GuildText,
            parent:'1132045544248848599',
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone.id,
                    deny:[PermissionFlagsBits.ViewChannel]
                },
                {
                    id: interaction.member.id,
                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                },
                {
                    id: '713630122141286440', // Staff
                    allow:[PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                },
            ]
            }).then(async (channel) => {
                await tDrop.create({
                    guildId: interaction.guild.id,
                    membersId: interaction.member.id,
                    channelId: channel.id,
                    openBy: interaction.user.id,
                })

                const embed = new EmbedBuilder()
                .setTitle(`Reclamar ${data.item}`)
                .setColor('#f74444')
                .setDescription(`<a:Estrellas3:1074116929029144706> Bienvenido al ticket **${interaction.user.username}**, felicidades por ser la persona más rapida en reclamar el drop, en un momento serás atendido por uno de los miembros de nuestro staff, esperamos que la atención sea la adecuada y no dudes en preguntar cualquier duda que tengas. <a:Estrellas3:1074116929029144706>\n\n- Administración de Team KNX`)
                .setFooter({ text: `Reclamado por ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}`})

                const msg = await channel.send({ embeds: [embed], content: `${interaction.user}\n<@&713630122141286440>`, allowedMentions:{parse: ['users', 'roles'] } }).then((msg) => msg.pin())
              })
          await dropSchema.deleteMany({ guildId: interaction.guild.id})
          await wait(2000)
          await interaction.editReply({ content: 'Listo', ephemeral: true })
        }
      } else if (interaction.customId == "lista-miembros") {

        require('dotenv').config()
        const token = process.env.APITOKEN
        const BrawlStars = require("brawlstars.js")
        const cliente = new BrawlStars.Client(token)
        const club = await cliente.getClub('#CV8QU2VC')
        
        const miembrosplus = club.members.sort((a, b) => b.trophies - a.trophies)

        const membersField = miembrosplus.map((member) => {
          const { name, trophies } = member
          return `<:reseteo:1178100588114882652> \`${trophies}\` | \`${name}\``
        }).join('\n')

        const embed = new EmbedBuilder()
        .setTitle('Miembros Club KNX')
        .setDescription(membersField)
        .setColor('#b96eff')
        .setThumbnail(`${interaction.guild.iconURL()}`)
        .setFooter({ text: 'Esta es la lista extraida del Club', iconURL: `${interaction.guild.iconURL()}`})

        interaction.reply({ embeds: [embed], ephemeral: true  })

      } else {
        return;
      }
    }
  },
};