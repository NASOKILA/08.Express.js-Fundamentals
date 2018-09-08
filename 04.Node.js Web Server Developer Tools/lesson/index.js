
const http = require('http');
const url = require('url');
const port = '5555';

const handlers = require('./handlers/handlers.js');

const server = http.createServer((req, res) => {

    let objUrl = url.parse(req.url);

    let path = objUrl.pathname;

    req.path = path;

    for (let index = 0; index < handlers.length; index++) {
        
        const currentHandler = handlers[index];

        let result = currentHandler(req, res);

        if(!result)
            break;        
    }
});

server.listen(port);
console.log('Server is listening on port ' + port)
