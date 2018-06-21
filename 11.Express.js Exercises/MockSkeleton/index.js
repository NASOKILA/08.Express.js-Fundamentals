const http = require('http')

const qs = require('querystring')

const port = 2323

let express = require('express');

let handlebars = require('express-handlebars');



let app = express();



//BODY PARSER
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


//PRAVIM SI BAZATA I SI Q REQUIRVAME
let mongoose = require('mongoose');
//Vij dbConfig faila za konfiguraciqta na bazata da raboti s mongoose
let database = require('./config/dbConfig');
database();


//meme schema
let memeSchema = require('./schemas/memeSchema');


//include folders
//OPRAVQME SI DA POLZVAME html failov vuv View papkata
app.set('views', __dirname + '\\views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('./public', express.static('public'));
app.use(express.static('static'));  
app.use(express.static('public'))


app.get('/', (req, res) => {

  //POLZVAI 3 PUTI {{{}}} inache dava greshka v brawsera
  res.render('home');
});








app.listen(port);
console.log(`Server listening on port ${port} !`);
