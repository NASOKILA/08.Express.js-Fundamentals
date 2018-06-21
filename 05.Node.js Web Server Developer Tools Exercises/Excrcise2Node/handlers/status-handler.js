
    const fs = require('fs');
    const db = require('../config/dataBase');

    const filePath = './views/status.html';

    module.exports = (req, res) => {
        if ((req.path === '/StatusHeader/Full' || req.path === '/moviesCount') && req.method === 'GET') {

            fs.readFile(filePath, (err, data) => {

                if (err) {
                    console.log(err);
                    return
                }

                res.writeHead(200, {
                    'content-type': 'text/html'
                })

                let moviesCount = db.length;
                data = data.toString().replace('{{replaceMe}}', 'Avaliable movies: ' + moviesCount)
                res.write(data)
                res.end()
            });
        }
        else 
        {
            return true;
        }
    }