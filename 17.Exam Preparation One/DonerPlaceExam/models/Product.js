const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    category: {type: String, required: true, enum:["chicken", "lamb", "beef"]},
    size: {type: Number, min:17, max:23,required: true},
    imageUrl : {type: String, require: true},
    toppings: {type:[String], default: []},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
