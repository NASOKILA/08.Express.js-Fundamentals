
const http = require('http');
const url = require('url');
const port = '5555';

const handlers = require('./handlers/handlers.js');

const server = http.createServer((req, res) => {

    //parsing URLs
    let objUrl = url.parse(req.url);

    //vzimame si putq
    let path = objUrl.pathname;

    //zakachame go za req za da moje da go polzvat handlerite
    req.path = path;

    for (let index = 0; index < handlers.length; index++) {
        
        const currentHandler = handlers[index];

        //izvikvame handlera kato mu podavame (req, res)
        let result = currentHandler(req, res);

        if(!result)
            break;
        
    }
});

server.listen(port);
console.log('Server is listening on port ' + port)
