
let express = require('express');
let handlebars = require('express-handlebars');
let port = 1337;

let app = express();

app.set('view engine', 'pug');

app.set('views', __dirname + '/views');

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index.pug');
})

app.get('/home', (req, res) => {
    
    res.render('headers.pug', {
        title: "Welcome !",
        subtitle: "This is the home page !",
        myArray: [1,2,3,4,5], 
        condition: true
    });
})

app.listen(port);
console.log(`Server listening on port ${port} !`)