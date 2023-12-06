const { IntegrationExpireBehavior } = require('discord.js')
const { model, Schema } = require('mongoose')

const fragmentosSchema = new Schema({
  Usuario: String,
  Comunes: Number,
  Especiales: Number,
  Epicos: Number,
  Miticos: Number,
  Legendarios: Number,
  Arcoiris: Number,
})

module.exports = model("fragmentos", fragmentosSchema)