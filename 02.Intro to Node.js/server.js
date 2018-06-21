

//purvo trqbva da si vkluchim http modula koito e vgraden v node.js
const http = require('http'); 

//s http modula mojem da otgovarqme na vsqkukvi zaqvki.
//http modula ima funkciq .createServer() s koqto suzdavame web server 
//.createServer() funkciqta e callBack funkciq koqto shte se izvika kogato poluchim zaqvka
//priema request - sudurja headeri, metadanni i dr, i response - koito e edin obekt ot 'http' modula 
    //s koito nie pishem otgovorite
//v req imame vsichko za pusnatata zaqvka kum nashiq server.

//sus res.write('...'); pishem otgovor vurhu responsa
//res.end() izprasta responsa na klienta    
    
let app = http.createServer((req, res) => {
    
    res.write('Hi, I am a new server!' + '\n');
    res.write('Method: ' + req.method + '\n'); //metodut
    res.write('Url: ' + req.url + '\n'); // linkut
    
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
app.listen(port); //sus .listen(portNumber) GO PUSKAME kato mu kazvame na koi port da slusha.


console.log(`Node.js server running on port ${port}`);

//za dad refreshnem servera trqbva da go restartirame OBACHE 
//Ima neshta koito ni refreshvat servera avtomatichno sled vsqko seivane
