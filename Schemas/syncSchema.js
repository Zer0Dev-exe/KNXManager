const { model, Schema } = require('mongoose')

const syncSchema = new Schema({
  usuariodc: String,
  usuariobs: String,
  fecha: String,
})

module.exports = model("syncbrawl", syncSchema)