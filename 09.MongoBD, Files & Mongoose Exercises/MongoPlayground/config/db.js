
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/mongoplayground';

require('../models/ImageSchema');
require('../models/TagSchema');

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(connectionString);