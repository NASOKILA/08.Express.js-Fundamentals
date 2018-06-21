


/*
    Shte govorim za authentikaciq i sigurnost,
    kookita i sessioni.

    Mojem da gi polzvame mejdu razlichni zaqvki.


    01.Cookita i sesii
    02.Authentikaciq
    03.Passport - Middleware za Authentikaciq v Express
    04.Strategiq za authentikaciq
    05.JSON Web Token




    HTTP protokola e stateless, mejdu dve zaqvki ne e znae koi koi e, vse edno nikoga 
    ne sa komunikirali predi.


    V ssiqta mojem da zapazim informaciq za usera, dali e admin, dali edi kakvo si.
    Sesiqta polzva kookito kto tazi informaciq se zapazvva tam.
    V express za parvane na kookita se polzva cookie-parser paketa
    trqbva da go instalirame i da go requirenem i da go registrirame.
    Polzva se kato middleware.
    



VAJNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!
    KOOKITO JIVEE V LIENTA A SESIQTA JIVEE V SERVERA,
    KOGATO DADEN USER SE LOGNE V SAIT SERVERA PROVERQVA KOOKITo I 
    MU VRUHTA DADENA SESIQ KOQTO SI E ZA TOVA KOOKIE t.e. ZA TOZI USER.




//KOOKIE:

    npm install cookie-parser -save
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());

    //KAK SETVAME KOOKITO ?        
    app.get('/setCookie', (req, res) => {
        res.cookie('KLUCH', 'STOINOST')
            res.end();
    });
    
    //KAK DA POKAJEM KOOKITo NA EKRANA KATO JSON ?
    app.get('/getCookie', (req, res) => {
        res.json(req.cookies);
    });



//SESII:   TE POLZVAT KOOKITO.

    npm install express-session --save

    const session = require('express-session');
    app.use(session({secret: 'NQKKUV KLUCH'}));  //Tozi kluch e edin i susht za vseki user.

    //SETVANE NA SESIQTA:
    app.get('/setSession', (req, res) => {
        req.session.message = "hello session";
        res.end();
    });

    //CHETENE NA SESIQTA
    app.get('/getSession', (req, res) => {
        res.json(req.session);
    });




    Za vseki user mojem da zapazvame informaciq i ako izlezne i pak
    vlezne tazi informaciq trqbva da si e tam.

    Ako restartirame servera tazi informaciq izchezva

    Kookito startira sesiqta za tozi user, ako se lognem ot 2 razlichni
    kompiutura ili brawsera kookito shte e razlichno obache sesiqta za 
    usera  shte e edna i sushta.

    Chesto se slaga jivot na kookito, v smisul takuv che ako ne vleznem do 1 sedmica 
    to se refreshva. 
    Tova stawa sus maxAge: age  i  expires: DateOfExpire
    Sus destroy mojem da iztriem samoto kookie

*/



/*
    Authentication:
        Ideqta e da proverim potrebitelq i da vidim do kakvo ima dostup.
        Authentikaciqta uchastva v buisness logikata.
        Dobre e da q opredelqme q v nachaloto.

        ZA kroptirane na paroli pri registraciq na user polzvame paketa 'crypto'
        tova Heshirane ne moje da se vurne obratno.




    Passport:

        npm install passport --g
        const passport = require('passport');
        

        Tova e Middleware za Express koito ni pomaga a authentikaciqta.
        nego validirame dali nqkoi klient e validen potrebitel.


        Strategii:
            Polzva razlichni strategii i vrushta ERRPR i SUCCESS.
            STRATEGIQTA E FUNKCIQ KOEto VRUSHta true ILI false.

            Local STRATEGY: 
                Nai mnogo se polzva no ima i drugi strategii.
                Local - oznachava che nie v tova prilojenie shte reshim dali tezi credentiali sa validni.
                Kato strategiq shte pozlvame paketa : passport-local
                npm install passport-local --g



            Ako imame greeshka ni vruhta pak na login stranicata
            AKO VSICHKO E NARED I STRATEGIQTA NI DAVA SUCCESS PRODULJAVAME NAPRED I PROVERQVAME ZA COOKIE.
                Ako nqmame takova: Polzvame metoda Serialize() na passport.

        Polzva metodi:
            Serialize - prevrushta dannite kum vid udoben za sesiqta i gi zapazva v sesiqta.
            Deserialize - 

        Kogato se zapazvat dannite v sesiqta chak togava passport podava requesta na usera kum buissness logikata
        Sled koeto nie si generirame response i slagame COOKIE KUM SAMIQ USER.


        Pri vtori opit veche usera ima zakacheno kookie sledovtelno passporta ne pozlva veche strategiq a direktno polzva
            funkciqta Deserialize() koqto :
                Ako ima greshka ni vrushta kum login stranicata, ako li ne VZIMA 
                PRAVILNATA SESSIQ I BURKA V BAZATA ZA DA VZEME USERA.

                SLED KOETO PRODULJAVAME NAPRED KATO PODAVAME REQUESTA KUM BUISNESS LOGIKATA.
                I VECHE MOJEM DA VURNEM NQKKUV RESPONSE



        PASSPORT AUTHENTIKIRA USERA I SEDI MEJDU USERA I BUISNESS LOGIKATA

    VAJNOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //PASSPORT ZAKACHA ZA requesta DVE FUNKCII Login(); I Logout();


        */




/*
    JSON Web Token:
        Tova e authentikaiq za REST API's.

        JWT e metod za obmqna na sigurni danni, 
            polzva se glavno za authentikaciq na klienti v REST API - Konvenciq za CRUD operacii o oshte.

        Edin token sudurja :
            Header - Sudurkja nqkakva informaciq,
            Payload - dannite koito iskame da izpratim MOJEM DA SLOJIM FAILOVE I MNOGO DRUGI NESHTA,
            Signature - Kriptiran podpis

            I TRITE SA NQKAKVO DULJI NERAZBIRAEMI STRINGOVE

        Pak e polzva strategiq, JwtStrategy({...})
            i encodirame i decodirame 
            DAJE MOJEM DAPOLZVAME  SAITA www.jtw.io I TAM DA GO NAPRAVIM MNOGO E LESNO !!!


        POLZVA SE GLAVNO OT PASSPORT !!!


        //VRUSHTA NI TOKEN KOITO MOJEM DA POLZVAME 
        const token = jwt.sign('NashiteDanni', 'NashKluch');
        const data = {
            name: jwt.name
        }
*/

/*
    Summary:
        Cookies & Session - Nashin za zapazvane na informaciq mejdu zaqvkite na edin potrebitel
            servera pomni dadeniq user.
        
        Parolite se heshirat.
        
        Passport - verificira usera za na na gotovo. 

        JSON Web Tocken - Mojem  s  nego da obmenqme informacia po siguren nachin, polzva se ot passport i e glavno za REST API.
*/











