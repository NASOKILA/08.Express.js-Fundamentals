
let express = require('express');

let handlebars = require('express-handlebars');

let port = 8888;

let app = express();


const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const formidable = require('formidable');


//PRAVIM SI BAZATA I SI Q REQUIRVAME
let mongoose = require('mongoose');
//Vij dbConfig faila za konfiguraciqta na bazata da raboti s mongoose
let database = require('./config/dbConfig');
database();



let bookSchema = require('./schemas/bookSchema');



//BODY PARSER
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));




//SETVAME SI GLAVNIQ TEMLEIT
app.engine('.hbs', handlebars({
    extname: '.hbs',
    layoutsDir: 'views/layouts', //setvame papkata na layoutite
    defaultLayout: 'main',   //defautniq ni layout shte se kazva 'main'
}));    //defaultniq layout vinagi shte se izpulnqva
app.set('view engine', 'hbs');



//ZARaJDAME PAPKAta Kudeto e CSS-a,  
//VAJNOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//PROVERI SI VUV SAMITE VIWTA KAKUV E src="..." NA CSS-a
app.use('/content', express.static('content'));
app.use(express.static('static'));  

//VAJNOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!
//PRI RENDERIRANE NA PARTIALS AVTOMATICHNO GI TURSI PAPKA views/partials 



app.get('/', (req, res) => {

    //POLZVAI 3 PUTI {{{}}} inache dava greshka v brawsera
    bookSchema.find({})
        .then((books) => {
            res.render('index', {
                booksCount: books.length
            });
        });

});

app.get('/viewAllbooks', (req, res) => {

    //POLZVAI 3 PUTI {{{}}} inache dava greshka v brawsera
    
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
    
    //POLZVAI 3 PUTI {{{}}} inache dava greshka v brawsera
    res.render('addBook');
});

app.post('/addBook', (req, res) => {

    let success = '<div id="succssesBox"><h2 id="succssesMsg">Book Added</h2></div>';
    let error = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>';
    
   
    let bookTitle = req.body.bookTitle;
    let bookYear = req.body.bookYear;
    let bookPoster = req.body.bookPoster;
    let bookAuthor = req.body.bookAuthor;
    
    //Za data sum polzval STRING
    
    let book = new bookSchema({
        title: bookTitle,
        year: bookYear,
        poster: bookPoster,
        author: bookAuthor
    });

    
    //VALIDACIQ
    if (bookTitle === "" || bookPoster === "") {

        res.render('addBook', {
            message: error
        });
     
    }
    else {

        

        //vkarvame knigat v bazata
        book.save().then(() => {

            console.log('book saved in db!');
            res.render('addBook', {
                message: success
            });

        });

    }
    //POLZVAI 3 PUTI {{{}}} inache dava greshka v brawsera

});

app.get('/book/details/:id', (req, res) => {

    let id = req.params.id;

    bookSchema.findById(id).then((book) => {
        
        res.render('details', book);

        /*
        MOJE I DA MU PODADEM NESHTATA EDNO PO EDNO
        {
            id: book.id,
            poster: book.poster,
            title: book.title,
            author: book.author,
            year: book.year,
        }
        */
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
