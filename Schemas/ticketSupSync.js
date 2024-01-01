const { model, Schema} = require('mongoose');

const ticketSupSchema = new Schema({
    guildId: { type: String },
    membersId: { type: String },
    channelId: { type: String },
    closed: { type: Boolean, default: false },
    open: { type: Boolean, default: true },
    openBy: { type: String },
})

module.exports = model("synchelp", ticketSupSchema)