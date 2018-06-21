

/*she govorim za:
    1.web server po podrobno,
    2.Parsing URLs
    3.Kak deistvat req u res
    4.Routing requests
    5.Additional web server tools
*/


/*
    WEB SERVER:
        Tova e prilojenie.
        MODUL E PAKET OT SKRIPTOVE.
        
        suzdava se surver s 'http' modula, sus .createServer() funkciqta,
        trqbva i da zadadem port.
        
        
    Parsing URL's:
        Purvo ni eqbva samiq MODUL 'url' 
            const url = reauire('url');
        Sledkoeto go polzvame za da parsnem url-a koito idva ot samiq request
            let urlObj = url.parse(req.url);
        
        POLUCHIHME SLEDNIQ OBEKT ZA VSQKA ZAQVKA:
            Url {
            protocol: null,
            slashes: null,
            auth: null,
            host: null,
            port: null,
            hostname: null,
            hash: null,
            search: null,
            query: null,
            pathname: '/',
            path: '/',
            href: '/' 
        }


        NAI MNOGO SHTE POLZVAME pathname, search i query.
        pathname e suotvetniq rout (link)

        search i query sa razlichni NO I DVETE SA OBEKTI.


        Req u Res:
            TOVA SA GOQLMI OBEKTI !!!
            request e tova koeto poluchavame ot usera,
            response e tova koeto mu vrushtame.

            SUS EXPRESS JS NQMA DIREKTNO DA RABOTIM S req i res !!!


        Routing:
            Mojem da proverqvame kakuv e url-a koito poluchavame ot requesta i
            da VZEMEM KONTENTA OT DADEN NASH FAIL POLZVAIKI FAILOVATA SISTEMA,
            .readFile() FUNKCIQTA. 
            I da go podadem na res.write(...);


        File System:
            let fs = require('fs');
            S TAZI SISTEMA SHTE MOJEM DA CHETEM I DA PISHEM OT DADENI FAILOVE

            Read File:
                'fs' Ima dve funkcii:
                    1. readFile()  -   Asinhromna funkciq, ima callback funkciq
                    2. readFileSync()  -  Sinhromna funkciq na koqto ne i trqbva callback funkciq  
                
                PO DOBRE E DA SE POLZVA ASINHROMNIQ NACHIN.




            VMESTO DA PISHEM VSICHKO V EDIN FAIL MOJEM DA POLZVAME MODULI ZA DA SI 
            RAZPREDELIM LOGIKATA POLZVANA OT SERVERA ZA DA IZGLEJDA PO DOBRE
   
   
   
   
   
   

    ADDITIONAL TOOLS:
        instrumenti za podobrqvane na nashata rabota.

        01.YEOMAN - npm install -g yo
            inicializira ni VECHE GOtoV proekt za da ne polzvame npm init
            Posle ni trqbva generator koito da ni dade nov proekt obache trqbva da mu kajem 
            kakuv iskame, dali she e Angular, React ili dr.
                npm install -g generator-express
                VZIMAME GENERATORA ZA Express Prilojenie

            NAKRAQ PROSTO SI SUZDAVAME PROEKTA SUS: 'yo express' V KONZOLATA !
            
            OBACHE POSLE IMAME PO MALKO KONTrOL VURHU PROEKTA ZAtoVA NE E PREPORUCHITELNO 
            DA SE POLZVA. 


        02.Gulp - npm install -g gulp      &      npm install -save gulp   
            TOVA E TASK RUNNER, T.E. AKO ISKAME DA NAPRAVIM NESHTO MNOGO PUTI
            MOJEM DA POLZVAME TASK RUNNERA ZA DA SI AVtoMAtiZIRaME toVA DEISTVIE
            I DA NE GO PISHEM NA RUKA VSEKI PUT.
            Mojem da go polzvame za kakvito si iskame taskove.

            OBACHE LOShOTO E CHE TRQBVA DA GO INSTALIRAME LOKALNO I GLOBALNO ZA DA RABORI.
                npm install -g gulp & npm install -save gulp
            
            Pravim si gulpfile.js FAIL V PROEKTA V KOITO DA SI PISHEM LOGIKATa ZA TASKA.
            
            TRQBVA NI I GULP-UGLIFY I DEL:
                npm install gulp-uglify --save
                npm install del --save
                'del' ni trie vsichki redishni zapisani failove

            IMA I PO DOBRI TASK RUNNERI OT Gulp, kato 'WEBPACK' KOITO SHTE POLZVAME ZA NAPRED.


        03.Bower - npm install -g bower
            Tova e kato npm, t.e. package manager console i e za instalirane na stranichni 
            biblioteki kato jquery, angular, mocha, chai i dr.

            POlzva se po sushtiq nachin kato npm samoce predi da instalirame neshto ne pishem 'npm'
            a pishem 'bower' !!!

            Za konfiguraciq ni trqbva '.boewrrc' file v glavnata direktoria koito e neshto kato 
            package.json faila.
            Kogato suzdadem neshto s bower se suzdava papka bower-components koqto sudurja vsichki svaleni neshta.


            NO MOJEM I DA SI POLZVAME 'npm' NAI SPOKOINO 


        
            
    HESHIRANE NA PAROLI: 
        VIJ encryptingPasswords.js FAILA



    Forking:
        imame modul 'cluster' s koito mojem da si klonirame prilojenieto.
        Vzima se broq na procesorite i se klonirat.


        Events:
            MOJEM DA SE ZAKACHAME ZA EVENTI
            I DA SI GI PRAVIM KAKVTO I ISKAME NIE.

    */  


