const { model, Schema } = require('mongoose')

const nivelServidor = new Schema({
  guildID: String,
  canalId: String
})

module.exports = model("nivelservidor", nivelServidor)