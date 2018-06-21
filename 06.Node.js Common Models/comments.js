

const fs = require('fs')


/*
    Shte govorim za:
        1.CHESTO IZPOLZVANI MODULI
        2.File sistemata,
        3.Streamove,
        4.Eventi,
        5.Debugvane




        File System:
            dostupva se sus modula 'fs'
            i mojem da pishem, chetem i manipulirame failove.

            'fs' ima dva vida funcii:
                sinhromni - Nqmat nujd ot callback funkciq, napravo se zapisva rezultata v promenliva.
                    let data = fs.readFileSync('fileName.js', 'utf8');
                    console.log(data);
                asinhromni - imat nujda ot callback funkciq: 
                    fs.readFile('fileName.js', 'utf8', (err, data) => { console.log(data); });

                PO CHESTO ZA WEb SE POLZVA ASINHROMNATA VERSIQ.
*/

let file1Data = fs.readFileSync('./testDir/file1.txt', 'utf8');
console.log(file1Data);

fs.readFile('./testDir/file2.js', 'utf8', (err, data) => {
    console.log(data);
});

console.log();
/*
            PROCHITANE NA FAILOVE V PAPKA:
                fs.readdir('./myDir', 'utf8', (err, data) => {
                    console.log(data);
                });

*/

let dataSinc = fs.readdirSync('./testDir', 'utf8');
console.log(dataSinc);//vrushta spisuk s imenata na failovete

fs.readdir('./testDir', 'utf8', (err, data) => {
    console.log(data); //vrushta spisuk s imenata na failovete
});



//Create a directory: SUZDAVA PAPKI

fs.mkdirSync('./testPapka1');

fs.mkdir('./testPapka2', (err) => {
    if (err) {
        console.log(err);
        return;
    }
});


//Rename File or directory: PREZAPISVAME PAPKI ILI FAILOVE    

fs.renameSync('./testPapka1', 'testFolder1_Renamed');

fs.renameSync('./testPapka2', 'testFolder2_Renamed', err => {
    if (err) {
        console.log(err);
        return;
    }
});




//Pisane po failove: PISHEM PO DADEN FAIL NO PREDI TOVA TRIE VSICHKO V NEGO.

let file1Path = './testDir/file1.txt';
let file2Path = './testDir/file2.js';
let text = 'Some text';
let text2 = '//Some text';

fs.writeFileSync(file1Path, text);

fs.writeFile(file2Path, text2, (err) => {
    if (err) {
        console.log(err);
        return;
    }
});


//Delete file : TRIEM FAILOVE NO NE I PAPKI.   

//Purvo proverqvame dali sushtestvuvat failovete za da ne grumne i posle gi triem
let dataInFolder = fs.readdirSync('./testDir');
if (dataInFolder.includes('file4.js') && dataInFolder.includes('file5.js')) {

    fs.unlinkSync('./file4.js');

    fs.unlink('./file5.js', err => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

//Delete Directory: TRIENE NA PAPKI
fs.rmdirSync('./testFolder1_Renamed');

fs.rmdir('./testFolder2_Renamed', (err) => {
    if (err) {
        console.log(err);
        return;
    }
});


//READ THE JSON FILE

//purvo si tursim faila v papkata
fs.readdir('./testDir', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    //vzimame si faila, toi e posleden
    let personJsonFile = data[data.length - 1];

    //chetem si kaktoto ima vuv faila
    fs.readFile('testDir/' + personJsonFile, 'utf8', (err1, data1) => {
        if (err1) {
            console.log(err1);
            return;
        }

        //promenqme go malko
        let content = JSON.parse(data1);
        content.friends = ["Goshkata", "Rusnaka", "Ovidiu"];

        let readyToWrite = JSON.stringify(content)
        .replace(/,/g, ',\n\t')
        .replace(/{/g, '{\n\t')
        .replace(/}/g, '\n}')
        //I si zapisvame vsichko na novo vuv faila.
        fs.writeFile('./testDir/person.json', readyToWrite, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
});


//KOGATO RABOTIM S MNOGO ASINHROMNI METoDI KODUT NI STAVA GROZEN NO TOVA E PRAVILNO
//GLEDAI NA POLZVASH POVECHE ASINHROMNITE FUNKCII !!!



//VAJNOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!
//IMA FUNKCII V node.js KOITO NI PREVRUSHTET FUNKCII V PROMISI,
//TOVA SE NARICHA PRIMISIFY  !!!





//CRYPTO:   Modul koito ni kriptira parolite:

//IMA MNOGO FUNKCII V TOZI MODUL I MOJEM DA GI POLZVAME ZA RAZLICHNI VIDOVE KRIPTIRANE

const crypto = require('crypto');

let pass = '123456';
let salt = crypto.randomBytes(128);
let hmac = crypto.createHmac('sha1', salt);
let hashedPass = hmac.update(pass).digest('hex');

console.log(hashedPass); //POKAZVAME Q KRIPTIRANA




//Cluster moudle: S nego mojem da klonirame glavniq trend
//S node.js mojem da burkame v sistemata na nashiq kompiutur






//STREAMS:
/*
    Tova sa kolekcii ot danni koito idvat na parcheta.
    Ne mojem da dostupim tzi danni v edin i sushti moment zashtoo ne sa dostupni.
    Tipove danni:
        Readable: samo mogat da se chetat (.stdin)   PTIMERNO KOGATO PISHEM NESHTO V TERMINALA, NA KONZOLATA
        Writable: mogat samo da se pishat (.stdout)  PRIMERNO console.log();
        Duplex: mogat da se chetat i da se pishat  (TCP sockets)  TOVA  VRUZKA MEJDU KLIENT I SERVER.
        Transform: pak e Duplex obache se transformira koda.  ( zlip - kompresira failove, crypto - klonira failove )


    ZA KAKVO SA POLEZNI ?
        Kogato trqbva da izprashtame kum klienta golqm fail moje da se precakat mnogo neshta.
        Za tova chrez streamove mojem da go pratim na chasti.
        
        VIJ createBigFile.js FAILA !!!


        KATO OTVORIM Task Manager MOJEM DA VIDIM KOI APP KOLKO PAMET IZRAZHODVA.
        I MOJEM DA VIDIM SAMIQT SERVER KOLKO PAMET IZRAZHODVA KATO GO PUSNEM.
        KOGATO OBACHE REQUESTNEM NQKOI MNOGO GOLQM FAIL, SERVERA IZRAZHODVA MNOGO POVECHE PAMET,
        I AKO SI PREDSTAVIM CHE PRIMERNO 50 CHOVEKA GO REQUESTNAT TOZI FAIL.
        VIJ server.js FAILA.
        
        
        'PIPING STREAM' : PO BURZ E I OT PREDISHNIQ
            RABOti SUS READABLESTREAM

*/


/*
    'zlib' module:
        
    SUS STREAMOVE MOJEM DA SI NAPRAVIM ARHIVATOR, TOEST SISTEMA KOQTO DA NI 
    ARHIVIRA FAILOVE.

    Vij createZip.js !!!


    MOJEM I DA GI UNZIPVAME !!!
    Vij unzipFile.js
*/



/*
    Uploadvane na failove:
        Pravi se s bibliotekata 'formittable' KOQTO SE INSTALIRA OT 'npm'
        npm install --save formittable

        I POSLE SI GO REQUIRVAME SUS:
        const formidable = require('formittable'); 


    vij upload.js faila !!!

*/




/*
    Events:
        Gledali sme click eventi, change eventi i dr v predishniq modul.
        Obache v node.js eventite sa razlichni, tuk nie mojem da si suzdadem kakuvto si iskame event
        i da se abonirame kum nego. 
        Kogato tozi event se izpulni vsichki abonati na tozi event poluchavat dadeno suobshtenie.
        TOVA STAVA CHREZ EVENT EMMITERI.
        
        POLZVA SE VGRADENA BIBLIOTEKA 'events' I SE PRAVI EventEmitter KOITO DA emitva SUOBSHTENIE PRI IZPULNEN EVENT.

        TUK MOJEM DA ZAKACHAME EVENTI NA KAKVOTO SI ISKAME I TE DA BUDAT KAKVITO NIE SI ISKAME.
        NQMAME NIKAKVI OGRANICHENIQ KAKTO PRI BRAWSERSKITE EVENTI.

        EVENTITE NE SA ASINHROMNI, POLZVAT SE MNOZO ZA MODULI.
*/

/*
    DEBUGVANE VUV  VS Code:
        Polzvame chervenata tochka i cukvame na bubolechkata ili natiskame F5.
        Posle s F10 davame na dolo i sus F11 vlizame navutre vuv funkcii.

        Mojem da debugvame chrez brawsera kato polzvame dumichkata 'debugger' !!!

*/





/*
    Summary:
        Razgledahme :
            01 - File sistemata, s neq mojem da si napravim i prilojenie
            02 - Nqkoi ot vgradenite mduli na node.js NO IMA I OSHTE MNOGO
            03 - Streamovete s koito mojem da obrabotvame golqmi danni i da pestim pamet 
            04 - Eventi v node.js, razlichni sa ot tezi na front end-a.
                 s tqb imame mnogo svoboda, ne sa trudni.

*/