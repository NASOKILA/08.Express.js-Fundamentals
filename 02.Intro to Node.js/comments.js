

/*
    Kakvo e node.js ? 
    Suzdaen e 2009 ot nqkkuv student koito go e napravil kato diplomna rabota.

    Na vremeto Apache se e polzvalo poveche obache zaqvkite e trqbvalo da se izhakvat edna sled druga.
    Dokato s Node.js zaqvkite sa asinhromni, t.e. dokato se izpulnqva ednata zaqvka da zapochne da se izpulnqva 
    i druga zaqvka bez da chakame da zavurshi purvata.
    Tova e asinhromno programirane, da se izpulnqvat nqkolko zaqvki na vednuj vmesto da se izchakvat.

    VAJNOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Ako obrabotvame mnogo mnogo danni e nai dobre da polzvame Python zashtoto tova mu e specializaciqta.


    S Node.js zaqvkite sa asinhromni, samo s javascript mojem da si suzdadem server i REST API.
    Mojem da polzvame package manager t.e. nmp paketa. 


    LTS - Long Term Support

    VAJNO !!!
    Mojem da si suzdavame .txt i .js failove i da gi runvame s node.js
    IZPULNQVA SE KATO NAPISHEM V KONZOLATA : "node nameOfTheFile"

    Imame fail text.txt koito kato go pusnem ni dawa pravilen otgovor 15 !!!


    POWERSHELL - e konzola koqto zarejda malko po bavno, obache tam mojem da polzvame linux,
    vsichko svurzano s linu mojem da go polzvame tam.


    NODE.jS PAKETI:
    Te sa kato npm paketi pak se instalirat taka.

    Otivame v proekta kooti iskame i pishem cher konzolata
    npn init
        posle otgovarqme na vuprosite i inicilizirame proekt
    ZA DA IZBEGNEM VSICHKI VUPROSI PROSTO PISHEM
        npn init -y    
        TAKA SHTE VZEME DEFAULT OTGOVORI !!!



    VAJNOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Ako sme v dadena papka i otgore kudeto i sedi url-a prosto napishem 'cmd' 
    shte ni se otvori conzola veche vlezla v tazi papka.

    VAJNOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Ako v cmd-to sme otvorili dadena papka i napushem 'code .'    
    Shte ni otvori visualStudio Code veche s tazi papka otvorena.


    VAJNOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    vs code NE suzdava dopulnitelni papki pri otvarqne na daden proekt kakto 
    WEBSTORM i Visual Studio pravat.



    Linters:
        Lintovete kato ESLint, JSHint ili StandartJS PROVERQVAT ZA GRESHKI,
        GRAMATICHNI SINTAKTICHNI, ZABRAVENI ZAPERAI DVE TOCHKI I t.n.
        INSTALIRAT SE VUV vsCode I SE DOSTUPVAT OT PADASTOTO MENIU V 
        KONZOLATA ZA DEBUGVANE NO AZ VECHE IMAM.

        ESLint i JSHint vurvat zaedno a StandartJS e otdelno.



    EVENT LOOP:
        Kak raboti node.js v backgounda ?
        Mogat da se puskat nqkolko nishki (zaqvki) koito sa nezavisimi edna ot druga.
        I kogato sa gotovi prosto da vrushtat rezltat.

        Moje primerno da imame 3 zaqvki i purvata da prikluchi posledna.
        
        

    VAJNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Stack and Heap - TAKA RABOTI VSQKA EDNA PROGRAMA.
        
        Stack - Slagame v nego danni koito polzvame v momenta, funkcii, dannni koito prehvurlqme 
            mejdu funkciite.
            V stack-a mojem da imame funkciq koqto da izvikva druga funkciq koqto i tq da izvikva druga i t.n.
            Kogato se sluchi tova funkciite se narejdat edna vurhu dtruga v stacka dokato ne se izpulnqt.
            
            KOGATO POSLEDNATA FUNKCIQT IZCHEZNE OT STACKA ZNACHI PROGRAMATA E PRIKLUCHILA.

            Ako nqkoq funkciq povdigne event toi se zapazva v EVENT QUEUE (event kiuto) BEZ DA SE IZPULNQVA NA MOMENTA.
            Sled kato programata prikluchi chak toga va se izpulnqva s callback funkciq.
            I ako imame nqkolko eventa sled kato e QUEUE (opashka) znaem che koito purvi vlezne toi purvi shte izlezne. 


        Heap - Mqsto v pametta v koeto mojem da zapazvame danni i da si gi 
            polzvame kogato si iskame.


        Callback funkciq:
            Tq vinagi a e poleden parametur na druga funkciq i priema (error, result)
            i se izvikva nakraq.
            NO SEGA VECHE NQMA NUJDA OT TOVA ZASHTOTO MOJEM DA POLZVAME Aysync & Await.

        Aysync Await:
            Await ne moje bez async, sus await zaqvkite se izchakvat .

            AKO E PO STAR PROEKT SHTE TRQBVA DA SE POLZVA CALLBACK FUNKCII !!!




    Modules (Moduli) ZNAEM GI:
        Tova e nachin da si razdelim prilojenieto na poveche chasti.
        Taka shte bude po lesno za debugvane.
        
        Kogato imame daden klas ili funkciq v daden fail i iskame da go polzvame v drug fail.
        
        Tova stava sus export i import:
            module.exports = ClassName;
            let ClassName = require('./PathToFail');   //TOVA GO PISHEM VUV FAILA V KOITO ISKAME DA GO POLZVAME.
        
        TOVA E 'Common.js' FORMAT, IMA I DRUGI FORMATI ZA MODULI !!!
            mojem da exportvame mnogo obekti, klasove ili funkciii na vednuj;
            module.exports = { class1, class2, class3 };
        
        Mojem da gi vzimame vsichki zaedno ili samo ediniq klas
            let class3 = require('./PathToFail').class3;


*/

let Person = require('./Person');

let nasko = new Person('Atanas', 25, 'Male');
nasko.SayHello();

let goshko = new Person('Georgi', 20, 'Male');
goshko.SayHello();


    /*
        MOJEM DA EXPORTNEM OBEKT S 3 FUNKCII V NEGO.

        node.js ima vgradeni moduli kato vgradenata failova sistema.

    */

    let fileSystem = require('fs'); //vzimame si failovata sistema 
    let text = fileSystem.readFileSync('./test.js', 'utf8'); //chetem udurjanieto na failat test.js
    console.log(text);//i go printirame



    //Unit testove - polzvame chai i mocha, pisali sme v minaloto.




    /*
    VAJNOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Node.js Web Server:
    shte go razgledame naburzo, za napred shte si pravim web serveri
    koeto e malko trudno NO EPRESS.JS ulesnqva neshtata.
    
    
    SERVER: Tova e Kompiuter, t.e. HARDWARE upravlqvan ot operacionna sistema.

    WEB SERVER: tova e programa ili aplikaciq, software koito vurvi na tozi server kompiuter koito se zanimava 
        s razlichni zaqvki. 
    
    Mojem da vdignem web server s node.js mnogo burzo, stawa tochno s 6 reda kod.

    VIJ server.js FAILA



Summary:
    Node.js e suzdaden ot student kato proekt za diplomna rabota,
    toi predostavq asinhromen back-end, mojem da pravim serveri po mnogo burz nachin.
    Raboti asinhromno t.e. moje da se polzva async & await, za da se izchakvat zaqvkite.
    
    Stack - pulni se s funkcii i se izpulnqvat edna sled druga, kogato staka e 
        prazen togava programata prikluchva, izpulnqva se urvi vliza posleden izliza.
    
    Heap - mqsto v pametta v koeto mojem da zapazvame danni i da gi dostupvame kogato 
        ni trqbvat.
    
    Event queue - pulni se s eventi hvurleni ot funkciite v staka, izpulnqvat 
        se : purvi vliza purvi izliza. IZPULNQVAT SE EVENTITE KOGATO STAKA OSTANE PRAZEN.

    Event loopa & threadPool - vidqhme kak stawa sus nishkite, vij si prezentaciqta


    Modules - S tqh mojem da si podredim proekta da e po lesen za debugvan i prerazglejdane.
        Polzva se export i require.
        Mojem i sami da si gi pishem a mojem i da gi svalqme ot npm managera

    */





