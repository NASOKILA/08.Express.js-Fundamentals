const mongoose = require('mongoose');

let orderSchema = mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
    date: {type: String, required: true},
    toppings: {type: [String], default: []},
    status: {type: String, enum: ["Pending", "In Progress", "In Transit", "Delivered"], default: "Pending"}
});

//["Pending","In Progress","In transit","Delivered"]

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
    