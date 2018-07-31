const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    country: {type: String, required:true},
});
module.exports = mongoose.model('Artist', artistSchema);