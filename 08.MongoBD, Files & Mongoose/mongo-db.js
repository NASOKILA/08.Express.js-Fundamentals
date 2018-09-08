
let mongodb = require('mongodb');
let connectionString = 'mongodb://localhost:27017/cats';

mongodb.MongoClient.connect(connectionString)
    .then(client => {

        let db = client.db('cats');

        let ownerCollection = db.collection('owners');

        ownerCollection.insert({
            'name': 'Anton',
            'age': 26
        });

        ownerCollection.findOneAndDelete({ 'name': 'Anton' });

        ownerCollection.find()
            .toArray((err, owners) => {
                console.log(owners);
            });        
    });