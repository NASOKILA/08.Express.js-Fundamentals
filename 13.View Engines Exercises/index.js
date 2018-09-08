let express = require('express');
let handlebars = require('express-handlebars');
let port = 8888;
let app = express();

const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const formidable = require('formidable');

let mongoose = require('mongoose');
let database = require('./config/dbConfig');
database();

let bookSchema = require('./schemas/bookSchema');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', handlebars({
    extname: '.hbs',
    layoutsDir: 'views/layouts', 
    defaultLayout: 'main',   
}));    
app.set('view engine', 'hbs');

app.use('/content', express.static('content'));
app.use(express.static('static'));  


app.get('/', (req, res) => {

    bookSchema.find({})
        .then((books) => {
            res.render('index', {
                booksCount: books.length
            });
        });
});

app.get('/viewAllbooks', (req, res) => {

    bookSchema.find({})
        .sort('year')
        .then((books) => {

        let booksArray = []
        for (const index in books) {
            
            let book = books[index];

            booksArray.push({id:book.id, poster: book.poster})
        }

        res.render('viewAll', {
            books: books,
        });
    
    });
    
});

app.get('/addBook', (req, res) => {
    
    res.render('addBook');
});

app.post('/addBook', (req, res) => {

    let success = '<div id="succssesBox"><h2 id="succssesMsg">Book Added</h2></div>';
    let error = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>';
    
    let bookTitle = req.body.bookTitle;
    let bookYear = req.body.bookYear;
    let bookPoster = req.body.bookPoster;
    let bookAuthor = req.body.bookAuthor;
    
    let book = new bookSchema({
        title: bookTitle,
        year: bookYear,
        poster: bookPoster,
        author: bookAuthor
    });

    if (bookTitle === "" || bookPoster === "") {

        res.render('addBook', {
            message: error
        });
    }
    else {

        book.save().then(() => {

            console.log('book saved in db!');
            res.render('addBook', {
                message: success
            });
        });
    }
});

app.get('/book/details/:id', (req, res) => {

    let id = req.params.id;

    bookSchema.findById(id).then((book) => {
        res.render('details', book);
    });
});

app.get('/book/delete/:id', (req, res) => {

    let id = req.params.id;

    bookSchema.findByIdAndRemove(id).then(() => {
        console.log('Book deleted !');
        res.redirect('/viewAllbooks');
    });
});

app.listen(port);
console.log(`Server listening on port ${port} !`);