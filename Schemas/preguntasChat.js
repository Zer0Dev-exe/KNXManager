const { model, Schema } = require('mongoose')

const preguntasChat = new Schema({
  Pregunta: String,
})

module.exports = model("preguntaschat", preguntasChat)