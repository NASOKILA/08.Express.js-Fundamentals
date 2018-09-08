
const express = require('express');

const app = express();

const port = 1337;

let bodyParser = require('body-parser');

let catsRouterController = require('./cats/cats-router-controler');

app.use('/Cats', catsRouterController);

app.use(express.static('public'));

app.use(express.static('views'));

app.use('/static', express.static('public'));

app.get('/', (req, res) => {

    res.status(200);

    res.send('Welcome to Express.js !')
});

app.get('/Home', (req, res) => {
    res.status(200);
    res.send('Welcome to the Home page !')
});

app.get('/About', (req, res) => {
    res.status(200);
    res.send('Welcome to the About page !')
});

app.post('/Create', (req, res) => {
    res.send('<h1>SOMETHING CREATED, POST REQUEST WAS SENT FROM POSTMAN !!!  </h1>');
});

app.get('/RedirectHome', (req, res) => {
    res.status(301);

    res.redirect('/Home');
});


let CheckAuthentication = (req, res, next) => {

    console.log('Authentication Made ...');
    next();
};

app.get('/Contact', CheckAuthentication, (req, res) => {
    res.status(200);
    res.send('<h2>Authntication made with additional MIDDLEWARE FUNKTION WITCH CALLS Next() !!!!!</h2>');
});

app.get('/Middlewares', (req, res) => {
    res.status(200);
    res.send('This is a middleware chain, we have 3 funktion calling eachother. check your Console !!!')
});

app.get('/Users/:userId', (req, res) => {
    let paramsObj = req.params.userId;
    res.status(200);
    res.send('<h1>' + paramsObj + '</h1>');
});

app.get('/Courses/:courseId/:title/:date/', (req, res) => {

    let courseId = req.params.courseId;
    let courseTitle = req.params.title;
    let courseDate = req.params.date;

    res.status(200);
    res.send(`<h2>Id: ${courseId} / Title: ${courseTitle} /  Date: ${courseDate}</h2>`);

});

app.get('/Images', (req, res) => {
    res.send('IMAGES GET REQUSEST HANDLED !!!');
})
    .post('/Images', (req, res) => {
        res.send('IMAGES POST REQUSEST HANDLED !!!');
    });


app.get('/Download/:id', (req, res) => {

    let id = req.params.id;
    res.status(200);
    res.download('downloads\\' + id);
});

app.get('/JSON', (req, res) => {

    let result = {
        name: 'Atanas',
        surename: 'Kambitov',
        age: 25
    }

    res.json(result);
});


app.use(bodyParser.urlencoded( {extended:true} ));

app.post('/formView.html', (req, res) => {
    res.redirect('/');
});

app.get('*', (req, res) => {
    res.status(200);
    res.send('<h1>Matches all urls</h1>')
});

app.listen(port, () => console.log('Express running on port ' + port))
