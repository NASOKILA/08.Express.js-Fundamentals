
let express = require('express');
let handlebars = require('express-handlebars');
let port = 8888;

let app = express();

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {

    res.render('./partials/home.hbs', {
        username: "Atanas",
        authenticated: true,
        collection : [
            {
                name:"Atanas", 
                age:25
            }, 
            {
                name:"Asen", 
                age:26
            }
        ]

    });
})

app.listen(port);
console.log(`Server listening on port ${port} !`)