

const http = require('http'); 
    
let app = http.createServer((req, res) => {
    
    res.write('Hi, I am a new server!' + '\n');
    res.write('Method: ' + req.method + '\n'); 
    res.write('Url: ' + req.url + '\n'); 
    
    if(req.method === 'GET')
    {
        switch(req.url)
        {
            case '/':
                res.write('Welcome page !' + '\n');
            break;
            case '/home':
                res.write('Home page !' + '\n');
            break;
            case '/about':
                res.write('About page !' + '\n');
            break;
            case '/contact':
                res.write('Contact page !' + '\n');
            break;
            default:
                res.write('404 - Page not found !' + '\n');            
            break;
        }
    }

    res.end();

});

let port = '5000';
app.listen(port); 

console.log(`Node.js server running on port ${port}`);
