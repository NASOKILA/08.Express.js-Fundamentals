
let mongoose = require('mongoose');

//pravim si modela
let memeModel = 
    mongoose.model('Meme', {
    title: { type: String, requred: true },
    poster: { type: String, requred: true },
    status: { type: String},
    description: { type: String},
});

//registrirame go v mongoose i go exportvame
module.exports = memeModel;
