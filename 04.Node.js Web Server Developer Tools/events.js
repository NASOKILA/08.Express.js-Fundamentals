
//EVENTITE NE SA ASIHROMNI, IZPULNQVAT SE EDIN SLED DRUG

//vzimame si modula
let events = require('events');

//suzdavame si emmiter
const emitter = new events.EventEmitter();

//krushtavame si eventa 'FireAlarm' i kogato se reizne da napihe neshto na konzolata
emitter.on('fireAlarm', (data) => {
    //mojem da imame po nqkolko parametura
    console.log('The roof is on fire!');   
});

//reizvame si eventa
emitter.emit('fireAlarm');

