
let mongoose = require('mongoose');

let connectionString = 'mongodb://localhost:27017/cars';

let carModel = mongoose.model('Car', {
    brand: { type: String, requred: true },
    model: { type: String, requred: true },
    year: { type: Number, requred: true },
    color: { type: String, requred: true }
});

let driverModel = mongoose.model('Driver', {
    name: { type: String, requred: true },
    surename: { type: String, requred: true },
    age: { type: Number, requred: true, min: 0, max: 100 },
    cars: [carModel.schema]
});

mongoose.connect(connectionString)
    .then(() => {

        let bmw = new carModel({ brand: 'BMW', model: 'X5', year: 2008, color: 'Black' });
        let opel = new carModel({ brand: 'Opel', model: 'Astra', year: 1998, color: 'White' });
        let fiat = new carModel({ brand: 'Fiat', model: 'Punto', year: 1991, color: 'Grey' });
        let driver = new driverModel({ name: 'Atanas', surename: 'Kambitov', age: 25, cars: [bmw, opel] });

        bmw.save().then();
        opel.save().then();
        fiat.save().then();

        driver.save().then();

        carModel.find({ brand: 'BMW' }).remove().exec();

        carModel.findByIdAndRemove('5b108a35f18f982ba49fd436').exec();

        carModel.find({ brand: 'Fiat' }).remove((err, removed) => {
        });

        driverModel.find({ name: 'Atanas' }).remove((err, removed) => {
        });

    });


mongoose.connect(connectionString)
    .then(() => {

        carModel.find({ brand: 'Fiat' }).then((cars) => {});

        carModel.find({ brand: 'Fiat' }).then((cars) => {

            let driver = new driverModel({ name: 'Anton', surename: 'Stoqnov', age: 25, cars: [cars] });
            driver.save();
        });

        driverModel.find({ name: 'Anton' }).remove((err, removed) => {
        });
    });

let carSchema = new mongoose.Schema({
    brand: { type: String, requred: true },
    model: { type: String, requred: true },
    year: { type: Number, requred: true },
    color: { type: String, requred: true }
});

carSchema.methods.driveCar = function () {
    return `Drive car ${this.brand} ${this.model}`;
}
carSchema.virtual('BrandAndModel').get(function () {
    return this.brand + " " + this.model;
});

let CarObj = mongoose.model('CarObj', carSchema);

mongoose.connect(connectionString)
    .then(() => {});

mongoose.connect(connectionString)
    .then(() => {

        driverModel.update({"name":"Bobi"}, { $set: {
            "name": "Bobi",
            "age": 5,
        }}, function(err, driver){});


        driverModel.findByIdAndUpdate('5b10fdc701a3760c8cda52d8', {
            $set: { "name": 'Todor', "age": 30 }
        }).exec();
        
    });

mongoose.connect(connectionString)
.then(() => {

    driverModel.find({})
        .where('age')
        .gt(15)  
        .lt(37)  
        .sort('name') 
        .select('name age')  
        .limit(10)                
        .then((drivers) => {
    });
});