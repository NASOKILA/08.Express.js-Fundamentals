
//vzimame si bibliotekata
const events = require('events');

//pravim si eventEmitter
eventEmitter = new events.EventEmitter();

//Sus funkciqta .on() se abonirame kum nego: 
//ZA TOZI PRIMER SHTE GO NAPRAVIM DA IMA DVA PARAMETURA, NO MOJEM DA MU PODADEM KOLKOTO SI ISKAME.
//DAVAME MU KAKVOTO IME SI POISKAME 
eventEmitter.on('moqtEvent', (a, b) => {
    console.log(`Event excecuted!`)
    console.log(a + ' ' + b) //Pechata Hello World!
});



//ZA TOZI PRIMER SHTE POLZVAME FUNCKCIQ KOQTO DA POLZVA SETTIMEOUT ZA DA. 
//IZPRASHTA DADEN EVENT OT VREME NA VREME.
(function emitEvents() {

    let eventsCounter = 1; //counter

    //na vseki 3 sekundi shte izprashta event
    let t = setInterval(() => {

        //Sus .emit() pokazvame suobshtenieto koeto iskame :
        //Purvo imeto trqbva da suvpad s tova na eventa i posle zapulvame parametrite! 
        eventEmitter.emit('moqtEvent', 'Hello Event - ', eventsCounter);

        eventsCounter++;

        if (eventsCounter === 4) {
            clearInterval(t);
            eventEmitter.emit('end'); //EMITVAME END SUBITIETO
        }

    }, 1000);

})();


//Kogato poluchim 'end' subitieto
eventEmitter.on('end', () => {
    console.log('\nEvents ended !');
});

//LESNO E, PROSTO EMITVAME I SUS .on() POLUCHAVAME SUBITIETO I IZPULNQVAME NESHTO :)



//ZA DA GO VIDIM PROSTO PUSKAME FAILA

/**
 Chrez eventite moje da se napravi taka che dva modula da si 
 komunikirat bez da sa zavisimi edin ot drug.
 */