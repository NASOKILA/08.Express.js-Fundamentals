

const app = require('express')();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');

const port = 3000;

//auth faila shte ni trqbva zashtoto tam si pravi cqlata authorizaciq na userite
const authRouter = require('./auth');


const products = [
    {
        name: 'Apple',
        cost: 10
    },
    {
        name: 'Banana',
        cost: 12
    }, {
        name: 'Orange',
        cost: 8
    }
];

//setvame viewEngina da ni  handlebars
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//kazvame na aplikaciqta da polzva cookieParser() OBACHE GO IZVIKVAME  
app.use(cookieParser());

//kazvame na aplikaciqta da polzva sesiqta kato i setvame tova zaduljitelno property  
app.use(session({
    secret: 'keyboard cat !@#'
}));

//polzvam bodyParsera
app.use(bodyParser.urlencoded({extended: true}));

//Kazvame na applikaciqta da polzva passport kato go iniciqlizira i mu kazvame da polzva sessiqta za da setva kookite i dr.
app.use(passport.initialize());
app.use(passport.session());



//SLED SUZDAVANETO NA SESSIQTA VKLUCHVAM RUTERA, ZASHTOTO TOI POLZVA SESIQTA
//kazvame che shte polzvame rutera na daden adress
//SEGA KATO OTIDEM NA '/auth/...' POLZVAME RUTERA
app.use('/auth', authRouter);


//Tazi funkciq shte q polzvame kato middleware za stranicite kudeto trqbva da sme lognati za da vleznem
function isAuthenticated(req, res, next) {

    //ako nqmame registriran user redirektvame kum login stranicata
    if (req.user === undefined) {
        return res.redirect('/auth/login');
    }

    //ako sme veche lognati produljavame kum (req, res) => {...}
    next();
}



/*
app.use((req, res, next) => {
    if (req.session.user === undefined) {
        return res.redirect('/auth/login');
    }
    next();
});
*/

app.get('/', (req, res) => {

    //ako imame user go vzimame ako li ne 'anonymous'
    const username = (req.user || {username: 'anonymous'}).username;
    
    //ako imame broi itemi ok ako li ne vzimame duljinata na prazen masiv t.e. 0
    const numItems = (req.session.cart || []).length;
    
    //vzimame suobshtenieto ot sessiqta
    const message = req.session.message;
    req.session.message = '';

    //proverqvame dali sme lognati ako ne sme vrushtame false
    const loggedIn = req.user 
        ? false 
        : true;

    //renderirame index viewto kato mu podadem vsichki tezi neshta
    res.render('index', {
        products,
        numItems,
        message,
        username,
        loggedIn
    });

});

app.get('/add/:id', (req, res) => {

    //ako nqmame sesiq suzdavame nova
    if (req.session.cart === undefined) {
        req.session.cart = [];
    }

    //vzimame produkta ot gorniq obekt
    const product = products[Number(req.params.id)];

    //dobavqme go kum cart
    req.session.cart.push(product);

    //smenqme suobshtenieto v sesiqta
    req.session.message = "Product added to cart";
    
    //redirektvame kum '/'
    res.redirect('/');
});

app.get('/readSession', (req, res) => {
    
    //taka prochitame sesiqta v json format
    res.json(req.session);
});

//isAuthenticated e Middlewre koito proverqva dali sme lognati, ako ne sme ni preprashta kum /auth/login
app.get('/cart', isAuthenticated, (req, res) => {

    //vzimame itemite ot kolichkata ako ima takava, ako ne []
    const items = req.session.cart || [];
    
    //vzimame broq na itemite
    const numItems = items.length;

    //vzimame total-a ot cenata vsichki produkti
    const total = items.reduce((p, c) => p + c.cost, 0);
    
    //renderirame catd viewto kato mu podavame vsichki neshta
    res.render('cart', {
        items,
        numItems,
        total
    });
});

//i tuk proverqvame dali sme lognati ako ne sme nqma da mojem da otidem do stranicata
app.get('/remove/:id', isAuthenticated, (req, res) => {

    //vzimame si cqlata koshnica ako imame takava ako ne vzimame [] 
    const items = req.session.cart || [];
    
    //vzimame si podadenoto id 
    const id = Number(req.params.id);
    
    //kazvame na cart che e = na vsichki itemi bez tozi koito e s podadenoto id
    req.session.cart = items.filter((p, i) => i != id);
    
    //redirektvame pak kum sushtata stranica
    res.redirect('/cart');
});

app.listen(port);
console.log('Server listening on port ' + port);