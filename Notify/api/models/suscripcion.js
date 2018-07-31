const mongoose = require('mongoose');

const suscripcionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required:true},
    artistId:{type:mongoose.Schema.Types.ObjectId, ref:'Artist', required:true}
});
module.exports = mongoose.model('Suscripcion', suscripcionSchema);