
const events = require('events');

eventEmitter = new events.EventEmitter();

eventEmitter.on('moqtEvent', (a, b) => {
    console.log(`Event excecuted!`)
    console.log(a + ' ' + b) 
});


(function emitEvents() {

    let eventsCounter = 1; 

    let t = setInterval(() => {

        eventEmitter.emit('moqtEvent', 'Hello Event - ', eventsCounter);

        eventsCounter++;

        if (eventsCounter === 4) {
            clearInterval(t);
            eventEmitter.emit('end'); 
        }

    }, 1000);

})();


eventEmitter.on('end', () => {
    console.log('\nEvents ended !');
});
