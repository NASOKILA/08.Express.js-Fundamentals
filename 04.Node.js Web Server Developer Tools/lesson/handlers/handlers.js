
const homeHandler = require('./home-handler');
const aboutHandler = require('./about-handler');
const faviconHandler = require('./favicon-handler');
const staticFileHandler = require('./static-file-handler');

module.exports = [
    homeHandler, 
    aboutHandler, 
    faviconHandler, 
    staticFileHandler
];


