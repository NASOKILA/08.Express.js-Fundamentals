
let express = require('express');
let handlebars = require('express-handlebars');
let port = 1337;

let app = express();

//Trqbva da kajem da express da polzva View Engina: 
app.set('view engine', 'pug');

//kazvame mu i kude se namirat view-tata:
app.set('views', __dirname + '/views');


//setvame si i handlebars
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');


app.get('/', (req, res) => {
    //renderirame si index.pug faila
    res.render('index.pug');
})

app.get('/home', (req, res) => {
    
    //PODAVAME MU DANNItE KATO OBEKT I headers.pug FAILA SI GI POEMA I OBRABOTva
    //NE E ZADULJITELNO DA PUSHEM NA KAKVO ZAVURSHVA FAILUT, TO SAMO SE DOSESHTA NALI GO SEtNaHME PO OTGORE.
    
    res.render('headers.pug', {
        title: "Welcome !",
        subtitle: "This is the home page !",
        myArray: [1,2,3,4,5], //mojem da renderirame i for cikul
        condition: true
    });
})


app.listen(port);
console.log(`Server listening on port ${port} !`)
