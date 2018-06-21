const fs = require('fs');
const db = require('../config/dataBase');
const filePath = './views/viewAll.html';

module.exports = (req, res) => {
    if (req.path === '/viewAllMovies' && req.method === 'GET') {

        fs.readFile(filePath, (err, data) => {

            if (err) {
                console.log(err);
                return
            }
   
            res.writeHead(200, {
                'content-type': 'text/html'
            })
            
            let noMovies = 'No Movies in the database.';
            let replacement = '';
            db.forEach(movie => {
                
                let showingName = movie.movieTitle.replace(/%/gm, ' - ');
                showingName = showingName.replace(/\+/gm, ' ');
                
                replacement += `<a href="/details/${movie.movieTitle}"><div class="movie"><img class="moviePoster" href="/details/${movie.movieTitle}" src="${movie.moviePoster}" alt=":(" height="220" width="140"/></div></a>`;
            });

            if(replacement === '')
                replacement = noMovies;

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replacement);
            
            res.write(data)
            res.end()
        });
    
    }
    else 
    {
        return true;
    }
}

