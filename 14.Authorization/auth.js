

//'passsport' Tova e paket za authentikaciq na useri 
const passport = require('passport');

//strategiq polzvana ot 'passport' !
const LocalPassport = require('passport-local');

//s tozi fail si generirame heshirana parola za registraciq na userite 
const encryption = require('./encryption');

//Vzimme si router kato go izvikame pravim nova instanciq
const router = require('express').Router();


//Imame si masiv koito shte pulnim s useri
const users = [];


//CONFIGURACIQ NA STRATEGIQTA NA 'passport', POLZVAME LocalPassport();
//TRQBVA DA VRUSHTA TRUE ILI FALSE, POLUCHAVAME USERNAME I PAROLATA NA GOTOVO
passport.use(new LocalPassport((username, password, done) => {

    //vzimame usera
    const user = users.filter(u => u.username === username)[0];
    
    //proverqvame dali go ima
    if (user !== undefined) {

        //vzimame heshirana parola suzdadena s podadenata parola
        const hashedPass = encryption.generateHashedPassword(user.salt, password);
        if (user.hashedPass === hashedPass) {
            //ako parolite sa ednakvi vrusthame true
            return done(null, user);
        }
    }

    //ako nqmame user ili parolite ne suvpadat vrushtame false.
    return done(null, false);
}));


//Ako ne polzvahme sesiq nqmshe da ima nujda ot Serializaciq i Deserializaciq

//Implementirame funkciata za serializaciq KOQTO SLAGA USERID V SESIQTA
passport.serializeUser((user, done) => {
    
    //ako imame user setvame Id-to
    if (user) 
        return done(null, user._id);
});

//Tazi funkciq e za deserializaciq i sluji za da durpa usera ot bazata  
passport.deserializeUser((id, done) => {

    //polzvaiki Id-to vzimame usera ot bazata. 
    const user = users.filter(u => u._id === id)[0];
    
    if (user) 
        return done(null, user);
    
    return done(null, false);

});



//pokazvame login stranicata kato chistim suobshtenieto ako ima takova
router.get('/login', (req, res) => {
    const message = req.session.message;
    req.session.message = '';
    res.render('login', {
        message,
        inputData: req.session.inputData
    });
});

//Polzvame middleware koito e funkciq ot paketa 'passport' koqto da ni logne usera ako iamme takuv 
//Ako nqma takuv user samiq paket znae i ni vrusha 'unauthorized' .
router.post('/login', passport.authenticate('local'), (req, res) => {
    req.session.message = "Login succesfull !";    
    res.redirect('/');
});

//logoutvame se 
router.get('/logout', (req, res) => {
    req.logout();
    req.session.cart = [];
    delete req.session.user;
    req.session.message = "Logout succesfull !";
    res.redirect('/');
});

//pokazvame register stranicata kato chistim suobshtenieto ako ima takova
router.get('/register', (req, res) => {
    const message = req.session.message;
    req.session.message = '';
    res.render('register', {
        message,
        inputData: req.session.inputData
    });
});

//registrirame se kapo polzvame PASSPORT ZA Authentikaciq
router.post('/register', (req, res) => {

    //vzimame si podadenoto ot formichkata
    const {
        username,
        password,
        repeat
    } = req.body;

    //proverqvame parolite dali suvpadat
    if (password !== repeat) {
        //ako imame greshka vikame error funkciqta koqto ni zakacha message i redirektva pak na register stranicata
        return error("Passwords don't match");
    }

    //proverqvame dali imame takuv user
    if (users.filter(u => u.username === username).length > 0) {
        //ako imame greshka vikame error funkciqta koqto ni zakacha message i redirektva pak na register stranicata
        return error("Username is taken");
    }


    //Ako vsichko e nared


    //generirame sol za da keshirame parolata
    const salt = encryption.generateSalt();

    //generirame heshiranata parola
    const hashedPass = encryption.generateHashedPassword(salt, password);

    //suzdaveme usera kato obekt i mu dobavqme ID kato polzvame ot encription faila edna funkciq
    const user = {
        _id: encryption.generateId(),
        username,
        salt,
        hashedPass
    };


    //zapazvame go v masiva 'users'
    users.push(user);

    //PASSPORT ZAKACHA ZA requesta DVE FUNKCII Login(); I Logout();

    //i direktno se logvame sled registraciq
    req.login(user, err => {
        if (err) {
            return error("Something went wrong");
        }
        req.session.message = "Registration successful";
        console.log(user);
        return res.redirect('/');
    });


    //funkciqta koqto ni zakacha message i redirektva pak na register stranicata
    function error(message) {
        req.session.inputData = {
            username,
            password,
            repeat
        };
        req.session.message = message;
        return res.redirect('/auth/register');
    }
});

module.exports = router;