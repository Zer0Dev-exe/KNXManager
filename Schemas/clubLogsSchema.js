const { model, Schema} = require('mongoose');

const clubLogs = new Schema({
    Servidor: String,
    MiembrosTeam: Array,
    MiembrosCrew: Array,
    CantidadTeam: Number,
    CantidadCrew: Number,
    UltimaTeam: Boolean,
    UltimaCrew: Boolean,
})

module.exports = model("clubData", clubLogs)