
let mongoose = require('mongoose');
const Types  = mongoose.Schema.Types;

module.exports = 
    mongoose.model('User', {
    username: { type: String, requred: true },
    role: { type: String, requred: true },
    hashedPass: { type: String, requred: true },
    rentedCars: [{type: Types.ObjectId, ref: 'Car', default:[] }]
});
