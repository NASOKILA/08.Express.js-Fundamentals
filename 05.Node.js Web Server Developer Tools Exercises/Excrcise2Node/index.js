
const http = require('http');
const url = require('url');

const handlers = require('./handlers');
const port = '4567';    


http.createServer((req, res) => {

    //console.log(url.parse(req.url));
    req.path = url.parse(req.url).pathname;
   
    
    for (const handler of handlers) {
        
        let result = handler(req, res);

        if(result !== true){
            handlers.pageNotFoundHandler;
            break;
        }   

    }
    

}).listen(port);

console.log(`Server running on port ${port}.`)
