const { model, Schema} = require('mongoose');

const ticketSetupPost = new Schema({
    guildId: String,
    channelId: String,
    categoryPostulacion: String,
    everyoneRol: String,
    stafftwitch: String,
    admin: String,
    direccion: String
})

module.exports = model("ticketspost", ticketSetupPost)