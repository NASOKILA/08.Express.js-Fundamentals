let mongoose = require('mongoose');

module.exports = 
    mongoose.model('Book', {
    title: { type: String, requred: true },
    year: { type: String },
    poster: { type: String, requred: true },
    author: { type: String }
});
