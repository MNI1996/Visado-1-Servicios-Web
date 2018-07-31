const mongoose = require('mongoose');
//POST body{artistId:"", name:"", year:""}

const albumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    artistId: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required:true},
    name: {type: String, required:true},
    year: {type: Number, required:true}
});

module.exports = mongoose.model('Album', albumSchema);