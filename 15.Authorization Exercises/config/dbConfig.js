const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/CarRentingSystem';

module.exports = () => {
    mongoose.connect(connectionString, (err) => {
    
        if(err){
            console.log(err);
            return;
        }

        console.log('MongoDb up and running...');
    });
}