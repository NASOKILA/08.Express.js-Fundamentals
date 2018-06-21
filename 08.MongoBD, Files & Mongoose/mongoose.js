

let mongoose = require('mongoose');

let connectionString = 'mongodb://localhost:27017/cars';

//suzdavame si mongoose MODEL po koito da si pravim obekti v bazata
// i tuk hubavoto e che mojem da kazvame kakuv da bude 
let carModel = mongoose.model('Car', {
    brand: { type: String, requred: true },
    model: { type: String, requred: true },
    year: { type: Number, requred: true },
    color: { type: String, requred: true }
});

//shte imat nakraq i masiv ot koli
let driverModel = mongoose.model('Driver', {
    name: { type: String, requred: true },
    surename: { type: String, requred: true },
    age: { type: Number, requred: true, min: 0, max: 100 },
    cars: [carModel.schema]
});


//podavame baza koqto q nqmame i shte q suzdade
mongoose.connect(connectionString)
    .then(() => {

        //Tuk si pravim obkti sprqmo modelite koito si pravim izvun mongoose.connect
        let bmw = new carModel({ brand: 'BMW', model: 'X5', year: 2008, color: 'Black' });
        let opel = new carModel({ brand: 'Opel', model: 'Astra', year: 1998, color: 'White' });
        let fiat = new carModel({ brand: 'Fiat', model: 'Punto', year: 1991, color: 'Grey' });

        let driver = new driverModel({ name: 'Atanas', surename: 'Kambitov', age: 25, cars: [bmw, opel] });


        //Zapazvame gi v bazata no predi tova dannite se validirat sprqmo modela
        bmw.save().then();
        opel.save().then();
        fiat.save().then();

        driver.save().then();


        //SUS .exec() SE RUNVAT QUERITATA NO STAWA I S THEN

        //iztrivame kotka
        carModel.find({ brand: 'BMW' }).remove().exec();

        carModel.findByIdAndRemove('5b108a35f18f982ba49fd436').exec();

        carModel.find({ brand: 'Fiat' }).remove((err, removed) => {
        });

        driverModel.find({ name: 'Atanas' }).remove((err, removed) => {
        });

    });


mongoose.connect(connectionString)
    .then(() => {

        //mojem da namirame danni sus find() OBACHE TRQBVA DA E 
        //OTDELNO INACHE NE MI VRUSHTA NISHTO NE ZNAM ZASHTO
        carModel.find({ brand: 'Fiat' }).then((cars) => {
            // console.log(cars);
        });

        //mojem da namerim vsichki koli i da suzdadem nov driver i da mu gi podadem kato masiv 

        carModel.find({ brand: 'Fiat' }).then((cars) => {

            let driver = new driverModel({ name: 'Anton', surename: 'Stoqnov', age: 25, cars: [cars] });
            driver.save();
        });

        //Triem GO za da ne go dobavq vseki put
        driverModel.find({ name: 'Anton' }).remove((err, removed) => {
        });


    });




//MOJEM I DA ZAKACHAME FUNKCII
//NO PURVO NI TRQBVA MODEL NA SCHEMA
let carSchema = new mongoose.Schema({
    brand: { type: String, requred: true },
    model: { type: String, requred: true },
    year: { type: Number, requred: true },
    color: { type: String, requred: true }
});

//ZAKACHAME FUNKCIQ NO NE TRQBVA DA E ARROW FUNKCIQ
carSchema.methods.driveCar = function () {
    return `Drive car ${this.brand} ${this.model}`;
}
//TEZI FUNKCII N SE ZAKACHAT ZA BAZATA


//MOJEM DA IMAME VIRTUALNI PROPERTITA KOITO NE ISKAME DA OTIVAT V BAZATA NO ISKAME DA RABOTIM S TQH
carSchema.virtual('BrandAndModel').get(function () {
    return this.brand + " " + this.model;
});



//Pravim si obekt na tazi shema
let CarObj = mongoose.model('CarObj', carSchema);


mongoose.connect(connectionString)
    .then(() => {

        //NESHTO NE RABOTI I NE NI DAVA DA ZAKACHIM FUNKCIQ
        //Triem GO za da ne go dobavq vseki put
        /*  
          CarObj.findOne().then((car) => {
              console.log(car);
              console.log(car.driveCar());
          });
  */

        //TEZI FUNKCII NE OTIVAT V BAZATA.

        //I SUS VIRTUALNITE PROPERTITA NESHTO NE STAWA
        /*
        CarObj.findOne().then((car) => {
            console.log(err);
           // console.log(car.driveCar());
        });
        */

    });





/*
    VALIDACIQ:
        AKO OPITAME DA DOBAVIM KOLA KOQTO PRIMERNO NE SUVPADA S MODELA NI DAVA VALIDATION ERROR
        KOITO MOJEM DA GO PRINTIRAME.
        MOJEM SUSHTO TUKA I DA ZAKACHAME NASHI SI DOPULNITELNI VALIDACII ZA DADENITE POLETA.
        
*/


//RAZLICHNITE MODELI I SHEMI MOJEM DA GI SLOJIM V OTDELNI JS FAILOVE I DA SI GI EXPORTNEM V GLAVNIQ FAIL.    



//.findOne() NAMIRA PURVIQ KOIT ODA OTGOVARQ NA TOVA USLOVIE    


/*
    MODIFICIRANE NA DANNI, UPDEITVANE:
        Prosto vzimame neshto ot bazata, promenqme go i mu davame .save();
*/

mongoose.connect(connectionString)
    .then(() => {


        driverModel.update({"name":"Bobi"}, { $set: {
            "name": "Bobi",
            "age": 5,
        }}, function(err, driver){});


        //AKO NQMAME TAKOVA ID NI GENERIRA NOV DRIVER
        driverModel.findByIdAndUpdate('5b10fdc701a3760c8cda52d8', {
            $set: { "name": 'Todor', "age": 30 }
        }).exec();

        //AKO NQMAME TAKOVA ID NI GENERIRA NOV DRIVER
        
    });

    
    
/*
    QUERITA ZA TURSENE I RABOTA S DANNI:
        Raboti malko kato SQL i e mnogo udobno, mojem da tursim danni koito da 
        otgovarqt na mnogo usloviq

*/

mongoose.connect(connectionString)
.then(() => {

    //$gt  OZNACHAVA Greather Than
    //.lt ONACHAVA LEssTHEN

    //MNOGO PO LESNO E S MONGOOSE, TOVA GO NQMA V MONGODB
    driverModel.find({})
        .where('age')
        .gt(15)  //age < 15
        .lt(37)  //age < 27
        .sort('name')  //sortirame po ime
        .select('name age')  //vzimame samo name i age propertita
        .limit(10)   //purvite 10 shofiora             
        .then((drivers) => {
        console.log(drivers);
    });

    //IMAME I NESHTA KATO .Skip()
    //ANTON NE GO NAMIRA ZASHTOTO RABOTIHME S NEGO PO VREME NA IZPULNENIE

});


