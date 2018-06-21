
let mongodb = require('mongodb');

//default mongoDB connectionString, kato nakraq mu podavame imeto na bazata
//ako nqmame takava baza to avtomatichno q suzdava
let connectionString = 'mongodb://localhost:27017/cats';

mongodb.MongoClient.connect(connectionString)
    .then(client => {


        //vzimame si bazata
        let db = client.db('cats');

        //ako nqma takava kolekciq q suzdavame
        let ownerCollection = db.collection('owners');

        //dobavqme si JSON danni v kolekciqta
        //SAMOCHE VSEKI PUT KATO RUNNA PROGRAMATA SHTE SE DOBAVQ
        ownerCollection.insert({
            'name': 'Anton',
            'age': 26
        });

        //Triem owner s ime 'Anton' koito toku shto dobavihme
        ownerCollection.findOneAndDelete({ 'name': 'Anton' });

        //taka namirame vsichki owneri
        ownerCollection.find()
            .toArray((err, owners) => {
                console.log(owners);
            });


            //IMA I DRUGI NACHINI ZA RABOTA S MONGO DB BAZI, MOJE I S MONGOOSE
        
    });





