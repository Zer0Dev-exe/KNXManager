const { model, Schema} = require('mongoose');

const ticketSetup = new Schema({
    guildId: String,
    channelId: String,
    categoriaVacaciones: String,
    supervisor: String,
    admin: String,
})

module.exports = model("tickets", ticketSetup)