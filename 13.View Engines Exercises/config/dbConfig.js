

//Tuk si pravim samata baza da raboti s mongoose. 

const mongoose = require('mongoose')
const connectionString = 'mongodb://localhost:27017/booklibrary';

//exportirame samata vruzka s mongose bazata
module.exports = () => {
    mongoose.connect(connectionString, (err) => {
    
        if(err){
            console.log(err);
            return;
        }

        console.log('MongoDb up and running...')
    });
}