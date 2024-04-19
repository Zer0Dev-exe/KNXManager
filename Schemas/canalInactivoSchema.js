const { model, Schema } = require('mongoose')

const canalInactivo = new Schema({
  Canal: String,
  Mensaje: String
})

module.exports = model("canaldata", canalInactivo)