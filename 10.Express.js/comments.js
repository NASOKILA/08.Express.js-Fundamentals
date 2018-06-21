
/*
    S express.js vsichko stawa mnogo po lesno ako rabotim s node.js.

    ulesnqva ni mnogo samata rabota sus servera.

    tuk nie se zanimavame samo s buisnes logikata a ne s parsvane na requesti i 
    drugi takiva raboti
    vdigat se surveri i prilojeniq za 10 minuti.


    Shte razgledame :
        01.Express.js    
        02.Router - preprashrta putishtata kum funkcii i za nas stawa mnogo po lesno
        03.Statichni failove - Kak da rabotim s failove bez failovata sistema, tuk e mnogo po lesno
        04.Middleware - kakvo e i za kakvo se polzva
        05.REST Services - Kakvo sa, kakva im e ideqta i za kakvo se polzvat


    VAJNO E DA NAUCHIM KONCEPCIITE ZASHTOTO SA EDNI I SUSHTI ZA VSICHKI TEHNOLOGII

*/






















/*
    01. Express.js  &  Routing

    PURVO SI PRAVIM PROEKTCHE SUS npm init ZA DA NI SE SUZDADE package.json fail:
        npm init
    Posle si instalirame globalno INTELLISENSE VUV VS Code.
        npm install typings --g
        Typings ni dava intellicence na vsqkude, v mongo, mongoose i drugi
    POSLE instalirame intellicence za express.js:
        typings install express --g


    VAJNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Mnogo puti ima suzdadeni paketi koito spirat da se poddurjat 
            ZA TOVA E DOBRE DA POLZVAME --save --save-exact ZA DA SE ZAPAZI LOKALNO NA NASHIQ PROEKT I SUS -exact
            VZIMAME EDNA VERSIQ I AKO TAZI VERSIQ NA DADENIQ PRODUKT SE PODOBRI NIE SI OSTAVQME VINAGI SUS STARATA
            ZA DA NE NI AFEKTIRA KODA.

        Ako polzvame samo --save ili -g V package.json faila otiva znakut "^" koito oznachava SAVE AND UPDATA PACKAGES.


    VAJNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        VERSII NA SOFTUER PRODUKT:
            Primerno imame versiq:  0.1.2
            Poslednata cifra (Dvoikata) ako se uvelichi oznachava che imame samo BUG FIKSING, t.e. realno sa opravene sam nqkkvi bugove
            Srednata cifra (Edinicata) ako se uvelichi oznachava che imame novi featuring kato nova funkcionalkost i t.n.
            Purvcata cirfa (Nulata) ako se uvelichi ozn che imame BREAKIN CHANGES t.e. AKO IMAME DADEN KOD NA TAZI VERSIQ I INSTALIRAME PO NOVATA VERSIQ TO TQ NQMA DA RABOTI. 


    NAKRAQ si Instalirame i EXPRESS.JS
        npm installexpress --save --save-exact 





    ROUTING v Express.js:
        Handelva requesti, GET, POST, PUT, PATCH, DELETE
        Kak se polzva:
            app.METHOD(PATH, (req,res) => {...})
        VIJ FAILA expressApp.js

        Hvashta daden put i ni vrushta response izpulnqvasht se ot funkciq.


    MOJEM DA TESTVAME POST PUT i drugi zaqvki bez da imame forma  AKO POLZVAME POSTMAN !!!!!
    VIJ FAILA expressApp.js



    VAJNOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Imame app.All(...) KOETO HANDELVA VSICHKI TIPOVE ZAQVKI, NO NE SE POLZVA POCHTI NIKADE, DOBRE E SAMO DA GO ZNAEM

        Kato routing mojemd da napishem primerno app.get('*', (req, res) => {...});
            ZVEZDICHKATA MATCHVA VSEKI URL



    '*' MATH VSICHKI URL-li
    app.All(...) OTGOVARQ ZA VSICHKI ZAQVKI OBACHE NE SE POLZVA MNOGO 


    Sus res.redirect('path') REDIREKVAME KU DADENIQ PATH


    VAJNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!
    MOJEM DA IMAME SLEDNATA FUNKCIQ KOQto PROVERQVA DALI SME AUTHENTIKIRANI,
    AKO NE SME ZNACHI NI REDIREKTVA kum HOME PAGE, AKO SME AUTHENTiKIRANI ZNACHI 
    IZVIKVAME Next() FUNKCIQTA S KOQTO PRODULJAVAME NAPRED V (req, res) FUNKCIQT :
    
    let CheckAuthentication = (req, res, next) => {
        if(!user.isAuthenticated()){
            res.redirect('/');
        }
        else{
            next();
        }
    };
    
    //POLZVAME FUNKCIQTA CheckAuthentication MEJDU ROUTA I (req, res) FUNKCIQTA
    
    app.get('/About', CheckAuthentication (req, res) => {
        res.status(200);
        res.send('USER AUTHENTICATED !')
    });

    IMAME FUNCKCIQ CheckAuthentication MEJDU ROUTA I (req, res) FUNKCIQTA KOQTO PROVERQVA
    DALI DADEN USER E AUTHENTIKRAN,
    AKO NE E NI REDIREKTVA KU HOME PAGE !!!!
    AKO SMA


    VAJNOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        FUNKCIQTA Next() KAZVA KOGA DA SE IZVIKA SLEDVASHTIQ HANDLER
        AKO NE IZVIKAME Next() ILI NE VURNEM NQKKUV RESPONSE TAZI FUNKCIQ ZACEPVA I NE PRODKJAVAME NAPRED


*/



//VAJNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//MOJEM DA SI RAZDELIM LOGIKATA NA OTDELNI PAPKI S KONTROLLERI



















/*
    02.ROUTER:
        Mojem da si zapishem daden router koito da ni pomaza za routinga i putishtata.      
        Vij v express.app faila



        
//MOJEM DA IZVEDEM ROUTERA V OTDELEN FAIL DA DEISTVA KATO KONTROLLER.
//ROUTER: POMAGA NI ZA ROUTOVETE I PUTISHTATA
//Stawa po sledniq nachin KATO POLZVAME express ZA RA SUZDADEM Router:
let router = express.Router();

//Regsttrirame nqkolko putishta
router.get('/create', (req, res) => {
    res.send('Cat Created !')
});

router.get('/delete', (req, res) => {
    res.send('Cat Deleted !')
});

router.get('/details/:id', (req, res) => {

    let id = req.params.id;
    res.send(`<h1>Cat Id: ${id}</h1><br/>` + 'Cat Details !')
});


//ZADULJITELNO REGISTRIRAME ROUTERA  ZA da raboti na put '/Cats'
//Sega primerno ako otiden na /Cats/Details/:id ili nqkoi ot drugite shte proraboti
app.use('/Cats', router);


*/

















/*
    Static Fails: 
        Tova sa statichnite failove kato '.css', '.ico', nqkkvi kartinki 
        koito se tursqt ot brawsera ili 
        ot drugi failove.
        V EXPRESS.JS TE IDVAT NA GOTOVO BEZ DA E NUJNO DA POLZVAME FAILOVATA SISTEMA.

        
//ZADULJITELNO REGISTRIRAME ROUTERA  ZA da raboti na put '/Cats'
app.use('/Cats', catsRouterController);



//Zarejdame statichnite failove:  PROSTO MU KAZVAME KUDE E PAPKATA I TO PRAVI VSICHKO NA GOTOVO ZA NAS.
app.use(express.static('public'));



*/


















    /*
        04. MIDDLEWARE'S
            MiddleWarite sa  takiva reuqsti koito imat 'next' funkciqta 

            MIDDLEWARE E NACHIN DA SE ZKACHAME MEJDU VSICHKITE ZAQVKI
            Primerno :
                app.get('/Path', (req, res, next) => {
                    
                    next();
                });



        VAJNOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        MOJEM DA IMAME MNOGO NAREDENI MIDDLEWARI I SUS NEXT() PROSTO IZVIKAVAME SLEDVASHTIQ,
        I CHAK SLED POSLEDNIQ SE OTIVA NA (req, res) FUNKCIATQ !!!!!!!!

                app.get('/Path', (req, res, next) => {
                    console.log('First Middleware');    
                    next();
                });
                app.get('/Path', (req, res, next) => {
                    console.log('Second Middleware');    
                    next();
                });
                app.get('/Path', (req, res, next) => {
                    console.log('Third Middleware');                        
                    next();
                });        







//KAKVO E MIDDLEWARE ? Tova sa requesti koito imat Funkciqta 'next'. 
//Ideqta e che mojem da dobavqme dopulnitelna logika koqto da se izpulnqva predi (req, res) funkciite
//SLEDNOTO E MIDDLEWARE FUNKCIQ KOQTO PRIEMA req, res, next KATO PARAMETRI
let CheckAuthentication = (req, res, next) => {
    if(!user.isAuthenticated()){
        res.redirect('/');
    }
    else{
        next();
    }
};

app.get('/Contact', CheckAuthentication, (req, res) => {
    res.status(200);
    res.send('<h2>Authntication made with additional MIDDLEWARE FUNKTION WITCH CALLS Next() !!!!!</h2>');
});

        */





/*
    EXTRACT PATH PARAMETERS:
        Putishtata mogat da imat parametri koito da se extrktvat i da se pozvat:
        app.get('/users/:userId', (req, res) => {

            let paramsObj = req.params;
            res.send(paramsObj); 
        });

*/






/*

//MOJEM DA IMAME MNOGO TAKIVA PARAMETRI:
app.get('/Courses/:courseId/:title/:date/', (req, res) => {
    
    let courseId = req.params.courseId;
    let courseTitle = req.params.title;
    let courseDate = req.params.date;

    res.status(200);
    res.send( `<h2>Id: ${courseId} / Title: ${courseTitle} /  Date: ${courseDate}</h2>`);

});

*/





/*
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

*/




/*

VAJNOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!
IMAME RESPONSI KOITO NI SE DAVAT NA GOTOVO OT EXPRESS.JS
    Primerno: res.download('path');
    FORSIRA BRAWSERA DA SVALI DADEN FAIL !!!!!!!!

*/






//VAJNOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I TUK AKO ISKAME DA PRIKLUCHIM RESPONS PISEM .end() NO NE E ZDULJITELNO
//POLZVAME GO AKO ISKAME DA PRIKLUCHIM RESPONSA PO RANO.




/*
    FORMAT:
    res.json(object);
        SETVAME Content-Type DA E applcation/json I VRUSHTAME DADENIQ OBEKT

    res.sendFile('pathToFile' + FileNme);
        VRUSHTA NI FAIL KATO NQKKUV STREAM  
        I TRQBVA D AMU SE POKAJE PULNIQT PUT DO SaMIQ FAIL.
        IMA RAZLIKA OT .download(); Zashtoto tuk ne go svalqme a samo go pokazvame na brawzera
*/




/*
    res.render('pathToView');
         tova mojem da renderirame dadeno view.  

*/





/*
    OBRABOTVANE NA FORMI S 'BODY PARSER':
    Tova e paket koito trqbva d ainstalirame i da go requirnem
    Posle trqbva da GO REGISTRIRAME express.js che iskame da go polzvame 
    i sme gotovi.

        npm install body-parser --save-exact


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

*/







/*

    05.REST API:
        Tova e server koito vrushta danni i izpulnqva PULEN CRUD OPERACII, t.e. 
        ima authentikaciq na useri, adminite imat poveche prava.


        PROSTO PRAVI:
             GET, POST, PUT, DELETE zaqvki na razlichni url-li 

        VAJNOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!
        REST E PROSTO KONVENCIQ NA PRAVENE NA SAITOVE.
*/













