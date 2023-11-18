const { model, Schema} = require('mongoose');

const ticketReporte = new Schema({
    guildId: { type: String },
    membersId: { type: String },
    channelId: { type: String },
    closed: { type: Boolean, default: false },
    open: { type: Boolean, default: true },
    openBy: { type: String },
    claimer: { type: String },
    claimed: Boolean,
    pinged: Boolean
})

module.exports = model("treport", ticketReporte)