
//Tova ni e vruzkata s bazata i trqbva da q vurjem za mongoose sus konektionstring

const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/mongoplayground';

//Trqbva da reuirnem modelita za da se registrirat v mongoose z da gi polzvame navsqkude
require('../models/ImageSchema');
require('../models/TagSchema');

//mongoose si polzva nqkkuv si negov tip promise, za da me konsistentni trqbva da go prezapishem kum normalen promise
mongoose.Promise = global.Promise;

//exportvame direktno samata vruzka koqto e promise
module.exports = mongoose.connect(connectionString);
    
