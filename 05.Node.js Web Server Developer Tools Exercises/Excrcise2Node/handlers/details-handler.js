
const fs = require('fs');
const db = require('../config/dataBase');

module.exports = (req, res) => {

    if (req.path.startsWith('/details') && req.method === 'GET') {

       
        let tokens = req.path.split('/');
        let movieName = tokens[tokens.length - 1];

        let movieDataObj = '';
        for (const key in db) {

            let movie = db[key];
            if (movie.movieTitle === movieName) {
                movieDataObj = movie;
            }
        }

        if (movieDataObj === '') {
            res.write('<h1>Movie not found</h1>')
            res.end()
        }
        else {


            fs.readFile('./views/details.html', (err, data) => {

                if (err) {
                    console.log(err);
                    return;
                }

                res.writeHead(200, {
                    'content-type': 'text/html'
                })
                
                let showingName = movieDataObj.movieTitle.replace(/%20/gm, ' ');
                showingName = showingName.replace(/\+/gm, ' ');
                showingName = showingName.replace(/%/gm, ' - ');
                
                
                let description = movieDataObj.movieDescription.replace(/%/gm, '.');
                description = description.replace(/\+/gm, ' ');

                let replacement = `<div class="content">
                <a href="${movieDataObj.moviePoster}">
                    <img src="${movieDataObj.moviePoster}" alt="image unavaliable" width="333" height="500"/>
                </a>
                <h3>Title:  ${showingName}</h3>
                <h3>Year: ${movieDataObj.movieYear}</h3>
                <p> ${description}</p>
            </div>`;

                data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replacement)
                res.write(data);
                res.end();
            });

        }

    }
    else {
        return true;
    }
}

