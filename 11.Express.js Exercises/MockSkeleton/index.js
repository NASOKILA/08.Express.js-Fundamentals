const http = require('http')

const qs = require('querystring')

const port = 2323

let express = require('express');

let handlebars = require('express-handlebars');

let app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

let mongoose = require('mongoose');
let database = require('./config/dbConfig');
database();

let memeSchema = require('./schemas/memeSchema');

app.set('views', __dirname + '\\views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('./public', express.static('public'));
app.use(express.static('static'));
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port);
console.log(`Server listening on port ${port} !`);