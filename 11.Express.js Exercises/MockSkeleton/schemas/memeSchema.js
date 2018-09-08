
let mongoose = require('mongoose');

let memeModel =
    mongoose.model('Meme', {
        title: { type: String, requred: true },
        poster: { type: String, requred: true },
        status: { type: String },
        description: { type: String },
    });

module.exports = memeModel;