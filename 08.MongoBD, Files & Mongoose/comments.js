

/*
    Shte razgledame :
        01.Failova sistema
        02.Relacionni i Ne relacionni bazi danni
        03.Mongo DB & Mongoose - NErelacionna baza danni polzvane 
            ot node.js, Mongoose e ulesnenie za polzvane na MongoDB


    FAILOVATA SISTEMA Q GLEDAHME NA DRUGA LEKCIQ

    Mojem da chetem, pishem, suzdavame, mestim, triem failove sinhromno i asinhromno v node.js
    modem da suzdavame i triem papki

    V NODE IMAM SINHromNI I ASINHROMNI FUNKII NO E PO DOBre dA POLZVAME SAMO ASINHROMNIte,
    TE PRIEMAT DOPULNETLNA CALLBAK FUNKCIQ (ree, data) TOVA E RAZLIKATA, V DATA NI IDVAT DANNITE.



    ENCODINGA KATO 'UTF8' POMAGA NA BRAWSERA DA RAZCHETE NULI I EDINICI V SINVOLI,
        PRIMERNO 1010101010001010  -  %
        UTF8 E KATO ASCII TABLICA SAMOCHE E PO GOQMA   
        
        
        TAKA HODIM S PAPKI NAZAD !!!
            ../../.././fileName


    ZA OBRABOTVANE NA UPLOAD FAILOVE IMAME 'FORMIDABLE NODE' PAKET KOITO MOJEM DA SI INSTALIRAME.
    INSTALIRAME MODULA I GO REQUIREvame 


            //TAKA SI VZIMAME POST FORMATA
            let form = new formidable.IncomingForm();

            //parsvame po tozi nachin
            //VAJNO TRQBVA NI enctype="multipart/form-data" VUV FORMATA ZADULJITELNOOOOOOOOOOOOOO


            //VAJNOOOOOOOOOOOOOOOOOOOOO!
            
            FORMIDABLE VZIMA KACHENIQ OT NAS FAIL I GO SLAGA V 
                C:\Users\user\AppData\Local\Temp\
                NIE MOJE PROSTO DA SI GO PREMESTIM KUDETO SI ISKAME
            
           form.parse(req, (err, fields, files) => {
            if (err)
                console.log(err);

            console.log(fields);
            console.log(files);
        });


    */


    /*
    Relacionni i Neralacionni bazi danni:
        
        Relacionnite bazi danni kato SQL bazita organizirat dannite si v tablichi s koloni i redove
            na koito mojem da pravim vruzki edno  drugo.
            Tezi danni trqbva da imat specialen tip i format inache nqma da se zapishat.
            
            Poslzvat SQL ili MSSQL ezici za kontrol i manipulaciq na dannite.
            Takiva bazi sa Oracle, MySQL, SQL Server.

            Dannite sa navurzani i ne mojem prosto da iztriem danni ot koito zavisqt drugi danni
            zatova purvo trqbva da iztriem tqh,
            no ima neshta kato kaskadno iztrivane s koeto ako imame primerno kursove i studenti i ako iztriem 
            daden kurs se iztrivat i studentite navurzani za nego.

            Imame tipove kato number, text, NULL i drugi,
            Mojem da imame PRIMATY_KEY i FOREIGN_KEY.



        Nerelacionnite bazi kato MONGOBD gi durjat v JSON stringove i ne sa svurzani edno s drugo
            no mojem da slagame ID-ta i taka da gi dostupvame.
            TUK IMAME POVECHE SVOBODA, MOJEM DA SI SLAGAME KAKVITO SI ISKAME DANNI.
            MOJEM DA DOBAVQME RAZLICHNI DANNI KOITO NE SUVPADAT I SA RAZLICHNI,
            DANNITE SE PAZQT V JSON Format koeto prilicha na JavaScript Obekt.

            Tezi danni imat po dobur performance pri chetene i dobavqne na obekti.
            Performance oznachava burzinata na operaciqta.
            
            TOVA NE ZNACHI CHE RELACIONNITE BAZI SA BAVNI.

            Nerelacionni bazi sa:
                MongoDB, CAssandra, Redis.

            LOSHOTO NA NE RELIONNITE BAZI E CHE AKO IMAME DADENA GEESHKA PRI ZAPISVANE, 
            TAZI BAZA NQMA DA GRUMNE I NIE NQMA DA ZNAEM CHE IMA GRESHKA, MNOGO E SVOBODNA I NE NI ZASHTITAVA,
            DOKATO RELACIONNITE NI ZASHTITAVAT.

            AKO POLZVAME NODE.JS, NAI DOBROTO NESHTO E DA POLZVAME MONGODB ZASHToTo SI PASVAT EDNO S DRUGO 
            RUKA ZA RUKA, PO BURZO STAWAT NESHTATA.

            */
           
           
           
            /*

            Instalaciq na MOngo DB:
                https://www.mongodb.com/download-center#community
                Svalq me si bezplatnata versiq i go namirame na C/programfiles/mongoDb
                Poluchavame prosto edna papka s ne mnogo failove v neq

                ZA DA GO STARTIRAME NI TRQBVA DRIVER ZA Node.js
                Primerno za node.js PAKETA KOITO NI TRQBVA E 'mongodb'
                    npm install mongodb -g
                
                INSTALIRAME GO GLOBALNO NO MOJE I LOCALNO ZA VSEKI INDIVIDUALEN PROEKT
                    npm install mongodb -save

                ZA DA ZARABOTI TRQBVA DA GO STARTIRAME CHREZ CMD KONZOLA:
                    1.OTIVAME V PAPKATA V KOQTO E ZAPISAN MongoDB
                        C:\Program Files\MongoDB\Server\3.4\bin  TRQBVA ZADULJITELNO DA E V BIN
                    2.Otvarqme CMD KONZOLA i pishem:
                        mongod --dbpth ImeNaPapka
                        OPISVAME I IMA NA PAPKA V KOQTO DA DURJIM DANNITE

                    Ako ne stane pishem samo mongod i ni zapisva dannite kudeto si reshi po default

                    TRQBVA NAKRAQ NA KONZOLATA DA IZPISHE:
                    'WAITING FOR CONNECTION ON PORT 27017'  Toi e po default.
                    Po default ni slaga dannite v C:/data/db

                    KONZOLATA TRQBVA DA E VINAGI OTVORENA INACHE
                    SPIRAME MONGO DB KOGATO ZTVORIM KONZOLTA.

                    VAJNO !!!
                        MOJEM DA INSTAIRAME I STARTIRAME MONGO DB KATO SERVICE OT TASK MANAGER-a


                    MOJEM DA RABOTIM S MONGO DIreKTNO CHREZ TERMINALA S KOMANDI, PODOBNO E NA JAVASCRIPT.
                    


            VAJNOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!
                www.mlab.com    E KLOUD BAZA DANNI 
        


            Servera sudurja bazi s imena koito imat kolekcii s obekti 

            MOJEM DA POLZVAME MONGODB CHREZ VS CODE !!!!!!!!!!!
                VIJ mongo-db.js FAILA
                
    */


/*
        MONGOOSE:
            Tova e modul v node.js koito ni dava 
            Raboti po sushtiq nachin purvo go instaliram i posle 
            go requirvame i nakraq go polzvame.
            Mongoose ni dava i poveche kontrol na dannite

            VIJ FAILA mongoose.js


            mongoose predlaga neshto kato SQL ili kontrol nad dannite,
            koito go nqma samo v mongodb.
            
*/

