const { model, Schema } = require('mongoose');

let estrellasSchema = new Schema({
    Usuario: String,
    EstrellaKNX: Number,
    KNXComun: Number,
    KNXEspecial: Number,
    KNXEpica: Number,
    KNXMitica: Number,
    KNXLegendaria: Number,
    EstrellasUsadas: Number,
})

module.exports = model('estrellasData', estrellasSchema);