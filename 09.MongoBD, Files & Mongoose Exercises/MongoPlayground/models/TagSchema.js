
//vzimame si mongoose
const mongoose = require('mongoose');

//pravim si shemata
const tagSchema = new mongoose.Schema({
    name: {type: String, required: true},
    creationDate: {type: Date, required: true, default: Date.now}, //kato default podavame samata funkciq a ne rezulatata ot neq
    images : [{type: mongoose.SchemaTypes.ObjectId}] //TUK MOJESHE I DA E STRING ZASHTOTo SHTe SLAGAME IDta na Tagove 
});
    
//REGSTRIRAME Q V MONGOOSE INACHE NQMA DA RABOTI I Q EXPORTVAME DIREKTNO
//zapazvame kolekciqta s ime 'Tag'
module.exports = mongoose.model('Tag', tagSchema);

