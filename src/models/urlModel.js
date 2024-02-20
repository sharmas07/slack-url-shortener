const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    urlCode:{
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    }
});

const URLModel = mongoose.model('UrlModel', URLSchema);
module.exports = URLModel;