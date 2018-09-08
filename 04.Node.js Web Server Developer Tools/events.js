
let events = require('events');

const emitter = new events.EventEmitter();

emitter.on('fireAlarm', (data) => {
    console.log('The roof is on fire!');   
});

emitter.emit('fireAlarm');