

//Purvo si requirvame express.js
const express = require('express');

//posle go izvikvame kato funckciq za da suzdadem aplikaciq, tova 'app' sudurja vsichki funkcionalnosti
const app = express();

//porta
const port = 1337;


//Vzimame si body parsera sled kato sme instalirali paketa
let bodyParser = require('body-parser');

//Vzimame si exportnatiq roter OBACHE TRQBVA DA GO REGISTRIRAME NQKUDE 
let catsRouterController = require('./cats/cats-router-controler');

//ZADULJITELNO REGISTRIRAME ROUTERA  ZA da raboti na put '/Cats'
app.use('/Cats', catsRouterController);



//Zarejdame statichnite failove:  PROSTO MU KAZVAME KUDE E PAPKATA I TO PRAVI VSICHKO NA GOTOVO ZA NAS.
app.use(express.static('public'));

app.use(express.static('views'));



//MOJEM DA MU SLOJIM I PUT PREDI TOVA:
app.use('/static', express.static('public'));
//SEGA za da vizualizirame faila trqbva da otidem na /static/FILENAME




//kazvame mu na kakuv vid zaqvka da otgovarq i kakvo da vrueshta
//KATO ROUT MOJEM I DA PODADEM REGEX
app.get('/', (req, res) => {

    //setvame status koda
    res.status(200);

    //sus sen izprashtame responsa
    res.send('Welcome to Express.js !')
});


//MOJEM DA SI REGISTRIRAME MNOGO ROUTOVE
//PO DOBRE DA IMAME MNOGO ELEMENTARNI ROUTOVE OTKOLKOTO MALKO OBACHE SLOJNI 
app.get('/Home', (req, res) => {
    res.status(200);
    res.send('Welcome to the Home page !')
});

app.get('/About', (req, res) => {
    res.status(200);
    res.send('Welcome to the About page !')
});

//MOJEM DA TESTVAME POST, PUT i drugi zaqvki bez da imame forma AKO POLZVAME POSTMAN:
//OT POSTMANA MOJEM DA SI VIDIM RESULTATA KOITO VRUSHTAME OT NASHIQ SERVER
app.post('/Create', (req, res) => {
    res.send('<h1>SOMETHING CREATED, POST REQUEST WAS SENT FROM POSTMAN !!!  </h1>');
});

app.get('/RedirectHome', (req, res) => {
    res.status(301);

    res.redirect('/Home');
});


//KAKVO E MIDDLEWARE ? Tova sa requesti koito imat Funkciqta 'next'. 
//Ideqta e che mojem da dobavqme dopulnitelna logika koqto da se izpulnqva predi (req, res) funkciite
//SLEDNOTO E MIDDLEWARE FUNKCIQ KOQTO PRIEMA req, res, next KATO PARAMETRI
let CheckAuthentication = (req, res, next) => {
    /*if(!user.isAuthenticated()){
        res.redirect('/');
    }
    else{
        next();
    }*/

    console.log('Authentication Made ...');

    //TOVA E SMO SIMULACIQ NA AUTHENTIKACIQ !!!
    //AKO NE SME AUTHENTIKIRANI MOJEM DA REDIREKTNEM KUM HOME AGE-a
    //res.redirect('/');

    //INACHE AKO SME AUTHENTIKIRANI MOJEM Da IZVIKAME Next() FUNKCIQTA S KOQTO DA PRODULJavaME nPRED KUM (req, res) 
    next();

};

app.get('/Contact', CheckAuthentication, (req, res) => {
    res.status(200);
    res.send('<h2>Authntication made with additional MIDDLEWARE FUNKTION WITCH CALLS Next() !!!!!</h2>');
});




//MOJEM DA IMAME MNOGO MIDDLEWARE FUNKCII KOITO DA SE IZVIKVAT EDNA S DRUGA,
//IZPULNQVAT SE PO REDA NA NAPISVANE
/*
app.use((req, res, next) => {
    console.log('First Middleware');
    next();
});
app.use((req, res, next) => {
    console.log('Second Middleware');
    next();
});
app.use((req, res, next) => {
    console.log('Third Middleware');
    next();
});
*/

app.get('/Middlewares', (req, res) => {
    res.status(200);
    res.send('This is a middleware chain, we have 3 funktion calling eachother. check your Console !!!')
});






//MOJEM DA POLZVAME  app.get('/Users/:Id', (req, res) => {...}; 
app.get('/Users/:userId', (req, res) => {
    let paramsObj = req.params.userId;
    res.status(200);
    res.send('<h1>' + paramsObj + '</h1>');
});


//MOJEM DA IMAME MNOGO TAKIVA PARAMETRI:
app.get('/Courses/:courseId/:title/:date/', (req, res) => {

    let courseId = req.params.courseId;
    let courseTitle = req.params.title;
    let courseDate = req.params.date;

    res.status(200);
    res.send(`<h2>Id: ${courseId} / Title: ${courseTitle} /  Date: ${courseDate}</h2>`);

});



//VAJNOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//MOJEM DA MATCHVAME RAZLICHNI ZAQVKI NA VEDNUJ
app.get('/Images', (req, res) => {

    //TUK NI E GET ZAQVKATA ZA TOZI URL

    res.send('IMAGES GET REQUSEST HANDLED !!!');
})
    .post('/Images', (req, res) => {

        //TUK NI E POST ZAQVKATA ZA TOZI URL
        res.send('IMAGES POST REQUSEST HANDLED !!!');
    });



//MOJEM DA SVALQME FAILOVE SUS DEFAULTNI RESPONSI KATO .download()
app.get('/Download/:id', (req, res) => {

    //VZIMME IDTO PODADENO NA TOVA KOETO ISKAME DA SVALIM, TO E PODADENO SLED /Download
    //I FORSIRAMEBRAWSERA DA GO DOWNLOADNE.
    let id = req.params.id;
    res.status(200);
    res.download('downloads\\' + id);
});


/*
FORMAT:
res.json(object);
    SETVAME Content-Type DA E applcation/json I VRUSHTAME DADENIQ OBEKT
*/
app.get('/JSON', (req, res) => {

    let result = {
        name: 'Atanas',
        surename: 'Kambitov',
        age: 25
    }

    res.json(result);
});





/*
    OBRABOTVANE NA FORMI S 'BODY PARSER':
    Tova e paket koito trqbva d ainstalirame i da go requirnem
    Posle trqbva da GO REGISTRIRAME express.js che iskame da go polzvame 
    i sme gotovi.

        npm install body-parser --save-exact
*/

//Sled kato sme go requirnali go Registrirame:  SEGA VECHE MOJEM DA OBRABOTVAME FORMI
app.use(bodyParser.urlencoded( {extended:true} ));

//purvo pokazvame formata kato otidem na Form.js zashtoto veche imame 
//app.use(express.static('views'));


app.post('/formView.html', (req, res) => {
    
    //VTOMATICHNO GI PARSVA ZA NAS NA GOTOVO 
    console.log(req.body);
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.age);


    res.redirect('/');
});





//ZVAZDICHKATA MATCHVA VSEKI URL, SLAGAME GO NAKRAQ ZA D ANE ZASQGA DRUGITE PREDI NE GO
app.get('*', (req, res) => {
    res.status(200);
    res.send('<h1>Matches all urls</h1>')
});

//kazvame mu na koi port da raboti
app.listen(port, () => console.log('Express running on port ' + port))


/*
    Ako otidem na greshen put ni dava avtomatichno 404 not found get
*/