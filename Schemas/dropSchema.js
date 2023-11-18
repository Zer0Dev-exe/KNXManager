const { model, Schema } = require('mongoose')

const dropSchema = new Schema({
  guildId: String,
  canal: String,
  msgId: String,
  item: String,
  claim: Boolean
})

module.exports = model("dropschema", dropSchema)