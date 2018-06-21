


let express = require('express');
let handlebars = require('express-handlebars');
let port = 8888;

let app = express();



//setvame si i handlebars
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

//kazvam na express che iskame da go polzvame kato view engine
app.set('view engine', '.hbs');


app.get('/', (req, res) => {

    //Prosto podavame ot servera dadena promenliva koqto shte se obraboti ot samiq .hbs fail
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
