
const http = require('http');
const fs = require('fs');
const port = '1010';

let server = http.createServer();

server.on('request', (req, res) => {

    const src = fs.createReadStream('./testDir/bigFile.txt');
    src.on('data', data => res.write(data));
    src.on('end', () => res.end());
    
    server.on('request', (req, res) => {
        const src = fs.createReadStream('./testDir/bigFile.txt');
        src.pipe(res);
    });
});

server.listen(port);
console.log(`Server listening on port ${port}.`)

