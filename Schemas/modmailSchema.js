const Schema = require("mongoose").Schema;

const modmailSchema = new Schema({
    usuarioId: {type: String, required: true, unique: true},
    canalId: {type: String, required: true}
});

module.exports = require("mongoose").model("modmail", modmailSchema);