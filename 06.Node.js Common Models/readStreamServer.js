
//serverut trqbva da prochita daden fail i da go izprashta na klienta

const http = require('http');
const fs = require('fs');
const port = '9999';

//MOJEM PURVO DA SUZDAEM SAMO SERVERA I POSLE DA MU KAJEM KAKVO DA PRAVI
let server = http.createServer();

//POLZVAME .on() FUNKCIQTA
server.on('request', (req, res) => {

    //OBACHE FAILUT E DOSTA GOLQM ZA DA GO NAPSHEM SUS FileSystemata, 
    //AKO GO ZAPISHEM SUS STREAM SHTE E PO DOBRE I SHTE ZAEMA PO MALKO PAMET
    const src = fs.createReadStream('./testDir/bigFile.txt');
    
    //ReadStream() ima 'data' event kakto i 'end' event.
    src.on('data', data => res.write(data));

    //spirame go za da ne cikli za vinagi sus end eventa
    src.on('end', () => res.end());
    

    //RENDERIRAIKI GO TAKA NI ZAEMA PONE 2 PUTI PO MALKO PAMET OT KOLKOTO KATO GO PROCHETEM CHREZ FAILOVATA SISTEMA
    /*
    fs.readFile('./testDir/bigFile.txt', 'utf8', (err, data) => {
        
        if(err){
            console.log(err.message)
            return;
        }

        res.writeHead(200, {'content-type' : 'text/html'});

        res.write('<h2>' + data + '</h2>');
        res.end();
    });
    */

});

server.listen(port);
console.log(`Server listening on port ${port}.`)
