const { Permissions } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Desbanea a un usuario del servidor especificado.",
    args: true,
    run: async (message, client, args) => {
        // Verifica si el usuario tiene permisos para desbanear

        // Obtiene el ID del usuario a desbanear
        const userId = args[0];
        if (!userId) {
            return message.reply("Por favor, proporciona el ID del usuario a desbanear.");
        }

        // Obtiene el servidor específico (guild) por ID
        const guildId = "698544143403581501"; // ID del servidor
        const guild = message.client.guilds.cache.get(guildId);
        if (!guild) {
            return message.reply("No se encontró el servidor especificado.");
        }

        // Desbanea al usuario en el servidor especificado
        guild.members.unban(userId, args.slice(1).join(" "))
            .then(() => {
                message.reply(`El usuario con ID ${userId} ha sido desbaneado en el servidor especificado.`);
            })
            .catch(error => {
                console.error("Error al desbanear al usuario en el servidor especificado:", error);
                message.reply("Ocurrió un error al desbanear al usuario en el servidor especificado.");
            });
    },
};