
let mongoose = require('mongoose');

module.exports = 
    mongoose.model('Book', {
    title: { type: String, requred: true },
    year: { type: String },
    poster: { type: String, requred: true },
    author: { type: String }
});

/*
let mongoose = require('mongoose');

//pravim si modela
let bookModel = 
    mongoose.model('Book', {
    title: { type: String, requred: true },
    author: { type: String},
    year: { type: Date},
    poster: { type: String, requred: true },
});

//registrirame go v mongoose i go exportvame
module.exports = mongoose.model('Book', bookModel);

 */