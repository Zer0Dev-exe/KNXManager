const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('staffrank')
    .setDescription('Abre las opciones de Promote y Demote')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption(option =>
        option
        .setName('tipo')
        .setDescription('Tipo de Gestión de Rango')
        .addChoices(
            { name: 'Promote', value: 'p' },
            { name: 'Demote', value: 'd' }
        )
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('rol')
        .setDescription('Que rol debería de tener?')
        .addChoices(
            { name: 'Director de Staff', value: 'ds' },
            { name: 'Dirección', value: 'd' },
            { name: 'Administración', value: 'a'},
            { name: 'Supervisor', value: 's' },
            { name: 'Moderador', value: 'm' },
        )
        .setRequired(true)
    )
    .addUserOption(option =>
        option
        .setName('staff')
        .setDescription('Selecciona el Staff')
        .setRequired(true)
    ),

    async execute(interaction, client) {

        const tipo = interaction.options.getString('tipo');
        const rol = interaction.options.getString('rol');
        const staf = interaction.options.getUser('staff')

        const knx = client.guilds.cache.get("698544143403581501")
        const ds = interaction.guild.roles.cache.get('1126220413584818236')
        const d = interaction.guild.roles.cache.get('725731790333149197')
        const a = interaction.guild.roles.cache.get('700884332759482409')
        const s = interaction.guild.roles.cache.get('700889141340143616')
        const m = interaction.guild.roles.cache.get('713630122141286440')
        const ap = interaction.guild.roles.cache.get('1119746672076017674')
        const staff = interaction.guild.members.cache.get(staf.id)
        const canal = interaction.guild.channels.cache.get('958306591873052682')

        if(tipo=== "p") {

            if(rol=== 'ds') {
                
                if(!interaction.member.roles.cache.has("952233735162581102")) return interaction.reply({ content: "Necesitas tener el rol de <@&952233735162581102> para usar este comando", ephemeral: true })

                await staff.roles.add(ds)
                await interaction.reply({ content: `Has ascendido a ${staf} al rango Director Staff`, ephemeral: true })
                await canal.send({ content: `${staf} ha sido ascendido a ${ds}, denle las felicidades! :tada:`})
            } else if(rol=== 'd') {
                
                if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "Necesitas tener el rol de <@&725731790333149197> para usar este comando", ephemeral: true })

                await staff.roles.add(d)
                await interaction.reply({ content: `Has ascendido a ${staf} al rango Dirección`, ephemeral: true })
                await canal.send({ content: `${staf} ha sido ascendido a ${d}, denle las felicidades! :tada:`})
            } else if(rol=== 'a') {
                
                if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "Necesitas tener el rol de <@&725731790333149197> para usar este comando", ephemeral: true })

                await staff.roles.add(a)
                await interaction.reply({ content: `Has ascendido a ${staf} al rango Administración`, ephemeral: true })
                await canal.send({ content: `${staf} ha sido ascendido a ${a}, denle las felicidades! :tada:`})
            } else if(rol=== 's') {
                
                if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "Necesitas tener el rol de <@&725731790333149197> para usar este comando", ephemeral: true })

                await staff.roles.add(s)
                await interaction.reply({ content: `Has ascendido a ${staf} al rango Supervisor`, ephemeral: true })
                await canal.send({ content: `${staf} ha sido ascendido a ${s}, denle las felicidades! :tada:`})
            } else if(rol=== 'm') {
                
                if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "Necesitas tener el rol de <@&725731790333149197> para usar este comando", ephemeral: true })

                await staff.roles.add(m)
                await staff.roles.remove(ap)
                await interaction.reply({ content: `Has ascendido a ${staf} al rango Moderador`, ephemeral: true })
                await canal.send({ content: `${staf} ha sido ascendido a ${m}, denle las felicidades! :tada:`})
            }
        } else if(tipo=== "d") {
            if(rol=== 'ds') {
                
                interaction.reply({ content: 'Esto no es posible realizar', ephemeral: true })
            } else if(rol=== 'd') {
                
                if(!interaction.member.roles.cache.has("952233735162581102")) return interaction.reply({ content: "Necesitas tener el rol de <@&952233735162581102> para usar este comando", ephemeral: true })

                await staff.roles.remove(ds)
                await staff.roles.add(d)
                await interaction.reply({ content: `${staf} has sido demoteado al rango Dirección`, ephemeral: true })
                await canal.send({ content: `${staf} ha sido descendido a ${d}, recuerda no deprimirte y usarlo para mejorarlo, cualquier duda sobre esto pregunta al Owner!`})
            } else if(rol=== 'a') {
                
                if(!interaction.member.roles.cache.has("1126220413584818236")) return interaction.reply({ content: "Necesitas tener el rol de <@&1126220413584818236> para usar este comando", ephemeral: true })

                await staff.roles.remove(d)
                await staff.roles.add(a)
                await interaction.reply({ content: `${staf} ha sido demoteado a Administrador`, ephemeral: true })
                await canal.send({ content: `${staf} has sido Demoteado a ${a}, no bajes la cabeza y sigue, aún eres importante para nosotros en Team KNX`})
            } else if(rol=== 's') {
                
                if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "Necesitas tener el rol de <@&725731790333149197> para usar este comando", ephemeral: true })

                await staff.roles.add(s)
                await staff.roles.remove(a)
                await staff.roles.remove(d)
                await interaction.reply({ content: `${staf} ha sido demoteado a Supervisor`, ephemeral: true })
                await canal.send({ content: `${staf} ha sido demoteado a ${s}, tristes noticias, recuerda ser activo y volver a intentar dar lo maximo`})

            } else if(rol=== 'm') {
                
                if(!interaction.member.roles.cache.has("725731790333149197")) return interaction.reply({ content: "Necesitas tener el rol de <@&725731790333149197> para usar este comando", ephemeral: true })

                await staff.roles.add(m)
                await staff.roles.remove(s)
                await staff.roles.remove(a)
                await staff.roles.remove(d)
                await interaction.reply({ content: `${staf} ha sido Demoteado a Moderador`, ephemeral: true })
                await canal.send({ content: `${staf} ha sido demoteado a ${m}, recuerda dar lo maximo que puedas y no cometer los mismos errores`})
            }
        }
    }
}