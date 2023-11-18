const { model, Schema} = require('mongoose');

const ticketSetup = new Schema({
    guildId: String,
    channelId: String,
    categorySoporte: String,
    categoryReporte: String,
    categorySorteos: String,
    categoryPostulacion: String,
    handlerRol: String,
    everyoneRol: String,
    moderador: String,
    supervisor: String
})

module.exports = model("tickets", ticketSetup)