
const homeHandler = require('./home-handler');
const staticHandler = require('./static-handler');
const statusHandler = require('./status-handler');
const addMovieHandler = require('./addMovie-handler');
const viewAllMoviesHandler = require('./viewAllMovies-handler');
const detailsHandler = require('./details-handler');
const pageNotFoundHandler = require('./pageNotFound-handler');

module.exports = [ 
    homeHandler, 
    staticHandler,
    statusHandler, 
    addMovieHandler, 
    viewAllMoviesHandler,
    detailsHandler,
    pageNotFoundHandler
]


