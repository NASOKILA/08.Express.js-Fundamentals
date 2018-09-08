
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {type: mongoose.SchemaTypes.String, required: true},
    title: {type: mongoose.SchemaTypes.String, required: true},
    creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now},
    description: {type: mongoose.SchemaTypes.String, required:true},
    tags: [mongoose.SchemaTypes.ObjectId]  
});

mongoose.model('Image', imageSchema)
module.exports = mongoose.model('Image', imageSchema);
