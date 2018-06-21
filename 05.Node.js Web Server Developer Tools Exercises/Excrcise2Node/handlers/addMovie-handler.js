

const fs = require('fs');
const filePath = './views/addMovie.html';
const db = require('../config/dataBase.js');
const qs = require('querystring');

module.exports = (req, res) => {

    if (req.path === '/addMovie' && req.method === 'GET') {
        fs.readFile(filePath, (err, data) => {

            if (err) {
                console.log(err.massage);
                return
            }

            res.writeHead(200, {
                'content-type': 'text/html'
            });

            res.write(data);
            res.end();
        });

    }
    else if (req.path === '/addMovie' && req.method === 'POST') {

        let replacement = '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>';
                
        let error = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>';

        //VZIMAME SUBMITNATITE DANNI OT FORMICHKATA

        //zapisvame vsichko v masiv body
        let body = [];

        req.on('data', chunk => {
            body.push(chunk);
        })
            .on('end', () => {

                body = Buffer.concat(body).toString();

                //VMESTO DA SPLITVAME MOJEM DA POLZVAME 'querystring'
                //Prosto go requirvame i pishem qs.parse(body); I NI GO PRAVI NA JSON OBEKT

                let newMovie = qs.parse(body);

                let validMovieFlag = true;

                //Proverqvame dali ima prazni poleta
                //I ako ima si vkarvame greshkata v 'replaceMe'
                for (const prop in newMovie) {

                    if (newMovie[prop] === '') {
                        validMovieFlag = false;
                        replacement = error;
                    }
                }

                
                if (validMovieFlag) {

                    console.log(newMovie);
                    newMovie.movieTitle = newMovie.movieTitle.replace(/ /gm, '%20');
                    newMovie.movieTitle = newMovie.movieTitle.replace(/:/gm, '%3A');
                    
                    db.push(newMovie);

                    let data = 'db = ' + JSON.stringify(db)
                        + '\n module.exports = db;';

                    //Zapisvame gi vuv dataBase.js
                    //purvo dobavqme noviq film i nakraq prezapisvame vsichko v dataBase.js

                    fs.writeFile('./config/dataBase.js', data);

                    //Nakraq redirektvame kum viewAll movies                    
                }

            });

            fs.readFile(filePath, (err, data) => {

                if (err) {
                    console.log(err);
                    return
                }
                console.log(replacement)
                //ZAMESTVAME EDNA CHAST NA HTML-a SUS success PROMENLIVATA
                data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replacement)

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })

                res.write(data)        
                res.end()                

            });

            
          

    }
    else {
        return true;
    }

}
