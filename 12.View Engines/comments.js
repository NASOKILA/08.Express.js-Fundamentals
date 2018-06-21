

/*

    VIEW ENGINES:
        MOjem da vmukvame neshta v templeita vmesto da pravime nov HTML fail.
        V saitovete imame obshta chast kato navigaciqta.
        
        Ima mnogo view engini koito pravqt edno i sushto neshtoo, podpuhvat i repleizvat parcheta kod,
            obache sintaksisa im e razlichen.
        V handlebars sintaksisa e {{replaceContent}} 

        Po lesno e da zamenqme danni v edin i sushti HTML fail.


    VAJNOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Imame:
            01.Serveren View Engine - TOVA PODPUHVANE MOJEM DA GO PRAVIM PO VRemE NA RENDERIRANE NA SERVERA.
                Servera vrushta direktno HTML-a na brawsera koito prosto go renderira.
                Mojem da generirame HTML failove direktno ot servera.

            02.ClientSiede View Engine - TOva e pirmerno kakto e FaceBook,
                Kogato skrolvame nadolo se zarejdat novi neshta no ne se refreshva 
                stranicata. Kogato komentirame neshto primerno to vednaga se poqvqva bez da se
                refreshva stranicata, tova stawa zashtoto dannite se renderirat na momenta.
                Nqkkuv JavaScript gi hvashta tezi danni i gi podpuhva v HTML-a.
                Tova SA SINGLE PAGE APPLICATIONS I IMAT CLIENTSIDE RENDERING !!!!!!!!!!!!!!
            


    POPULQRNI VIEW ENGINI SA:
        01.Mustache  -  Podobno e na Handlebars, 
        02.Handlebrs  -  Znaem go polzvahme go mnogo v JS CORE. 
        03.EJS ili (Jade), 
        04.Vash.


        05.Pug  -  Tova e serveren view engine koito mojem da go instalirame leno v EXPRESS, generira HTML failove,
            Instalirame go GLOBALNO: npm install pug -g   
            I instalirame pug-cli GLOBALNO: npm install pub-cli -g
      
            POLZVANETO E MNOGO DO HTML-a OBACHE NI TRQBVA .pug FAIL: 
                
                ul val in [1,2,3,4,5]
                li= 'Item ' + val

                pub index.pug

                //GENERIRA SLEDNOTO:
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>

                //VIJ index.pug FAILA V view PAPKATA

                //KOGATO PUSNEM.pug FAILA OT TERMINALA:  pug pugFile.pug SHTE SE IZPULNI KODA V NEGO I SHTE NI GENERIRA
                    //HTML FAILOVE V SUSHTATA PAPKA, DAJE I S KOMENTARI AKO MU SLOJIM 

                //KOGATO PROMENIM .pug FAILA SE PROMENQ DINAMICHNO I HTML FAILA !!!!!
                
                //AKO NQKUDE SBURKAMe SI NI HVURLQ EXCEPTION I KUDE SE NAMIra NARAVENATA GRESHKA

            KOGATO PROMENQME .pug FAILOVETE NE E NUJNO DA RESTARtIRAME SERVERA ZASHTOTO te SA STATiCHNI FAILOVE
            I VIJDAME DIREKTNO PROMQNATA V BRAWSERA KATO GO REFRESHNEM !!!!!!!


            NE MOJEM DA PISHEM PULEN JS KOD OBACHE MOJEM DA RENDERIRAME MNOGO PODOBEN KOD.
                Imame for cikli, if, else i dr:

            each number in myArray
                div.some-class= number

            if condition
                h1.success
                    | Is true !
            else
                h1.error
                    | Is false !







            HANDLEBARS:
                Po polzvano e zashtoto e po lesno,
                prosto podpuhvame danni v samiq HTML fail
                {{SomeVariableName}}

                Za da go polzvame s express :
                    npm install handlebrs -save
                    npm install express-handlebrs -save

                
                
                
            KAK SE SETVA HANDLEBARS V SERVER FAILA ?
                
                app.engine('.hbs', handlebars({
                    extname: '.hbs'
                }));

                app.set('view engine', '.hbs');

                PO DEFAULT TURsi PAPka views
    
    
    
    
    
    
    VAJNOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Sus .render() kazvame na express che shte polzvame view engina ako sme setnali takuv.
        Po default view enginite eskeipvat html-a zashtoto primerno nqkoi moje da se registrira kato 'alert("Hello!")'
            i kogato si vlezne v profila da mu izliza alert-a.

*/




































