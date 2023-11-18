const { model, Schema } = require('mongoose')

const nivelUsuario = new Schema({
  guildID: String,
  usuarioId: String,
  usuarioXp: Number,
  usuarioXpTotal: Number,
  usuarioXpCheck: Number,
  usuarioNivel: Number,
})

module.exports = model("nivelusuario", nivelUsuario)