

let mongoose = require('mongoose');


module.exports = 
    mongoose.model('Car', {
    make: { type: String, requred: true },
    model: { type: String, requred: true },
    imageUrl: { type: String, requred: true },
    price: { type: Number, requred: true },
    rented : {type: Boolean },
    duration : { type: Number },
    rentedTimes : { type: Number, requred: true },
    color: { type: String }
});

