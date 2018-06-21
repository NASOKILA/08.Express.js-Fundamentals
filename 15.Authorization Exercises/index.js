
const express = require('express');
const handlebars = require('express-handlebars');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const port = 3000;

let app = express();


//Mongoose DB
let mongoose = require('mongoose');
let database = require('./config/dbConfig');
database();


//schemas
let carSchema = require('./schemas/carSchema');
let userSchema = require('./schemas/userSchema');


//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


//Handlebars
app.engine('.hbs', handlebars({
    extname: '.hbs',
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');


//Cookie
app.use(cookieParser());


//Session
app.use(session({
    secret: 'keyboard cat !@#'
}));


//Passport
app.use(passport.initialize());
app.use(passport.session());

//public folder 
app.use('/public', express.static('public'));
app.use(express.static('static'));

//cars folder
app.use('/cars', express.static('cars'));
app.use(express.static('static'));

//users folder
app.use('/users', express.static('users'));
app.use(express.static('static'));


//router
const authRouter = require('./auth');
app.use('/users', authRouter);


//authentication function
function isAuthenticated(req, res, next) {

    //ako nqmame registriran user redirektvame kum login stranicata
    if (req.session.user === undefined) {
        return res.redirect('/login');
    }

    //ako sme veche lognati produljavame kum (req, res) => {...}
    next();
}


//home
app.get('/', (req, res) => {

    if (req.session.user !== undefined) {
        res.render('home', {
            userIsLoggedIn: true,
            role : req.session.user.role,
            username : req.session.user.username,

        });
    }
    else {
        res.render('home',{
            userIsLoggedIn: false,
            role : "anonymous",
            username :  "user"
        });
    }

});


//add
app.get('/cars/add', isAuthenticated, (req, res) => {

    res.render('cars/create', {
        userIsLoggedIn: true
    });

});

app.post('/cars/add', (req, res) => {

    let success = '<div class="notification success">Car Added !</h2></div>';
    let error = '<div class="notification error">Please fill all fields !</h2></div>';
    let adminError = '<div class="notification error">You have to be an administrator to add cars !</h2></div>';

    let carMake = req.body.make;
    let carModel = req.body.model;
    let carImageUrl = req.body.imageUrl;
    let carPrice = req.body.price;
    let carColor = req.body.color;

    let car = new carSchema({
        make: carMake,
        model: carModel,
        imageUrl: carImageUrl,
        price: carPrice,
        rented: false,
        rentedTimes: 0,
        duration: 0,
        color: carColor
    });

    //validation
    if (carMake === "" || carModel === "" || carImageUrl === "" || carPrice === "") {

        res.render('cars/create', {
            userIsLoggedIn: true,
            message: error
        });

    }
    else {

        if (req.session.user.role !== "admin") {
            res.render('cars/create', {
                userIsLoggedIn: true,
                message: adminError
            });
        }
        else {
            car.save().then(() => {

                console.log('car saved in db!');
                res.render('cars/create', {
                    message: success,
                    userIsLoggedIn: true
                });

            });
        }
    }

});


//edit
app.get('/edit/:id', isAuthenticated, (req, res) => {


    let id = req.params.id;

    carSchema.findById(id).then((car) => {

        res.render('cars/edit', {
            userIsLoggedIn: true,
            car
        });
    });


});

app.post('/edit/:id', isAuthenticated, (req, res) => {

    let success = '<div class="notification success">Car Updated !</h2></div>';
    let error = '<div class="notification error">Please fill all fields !</h2></div>';
    let adminError = '<div class="notification error">You have to be an administrator to update cars !</h2></div>';

    let id = req.params.id;

    let carMake = req.body.make;
    let carModel = req.body.model;
    let carImageUrl = req.body.imageUrl;
    let carPrice = req.body.price;
    let carColor = req.body.color;

    //validation
    if (carMake === "" || carModel === "" || carImageUrl === "" || carPrice === "") {

        res.render('cars/edit', {
            userIsLoggedIn: true,
            message: error
        });

    }
    else {

        if (req.session.user.role !== "admin") {

            carSchema.findById(id).then((car) => {

                res.render('cars/edit', {
                    userIsLoggedIn: true,
                    message: adminError,
                    car
                });
            });

        }
        else {
            carSchema.findByIdAndUpdate(id, {
                "$set": {
                    "make": carMake,
                    "model": carModel,
                    "imageUrl": carImageUrl,
                    "price": carPrice,
                    "color": carColor,
                }
            })
                .then(() => {

                    console.log('car updated in db!');
                    res.render('cars/edit', {
                        message: success,
                        userIsLoggedIn: true
                    });

                });
        }
    }

});


//details
app.get('/details/:id', (req, res) => {

    let id = req.params.id;

    carSchema.findById(id).then((car) => {

        res.render('cars/details', {
            userIsLoggedIn: true,
            car
        });
    });
});

//seeDetails
app.get('/seeDetails/:id', isAuthenticated,  (req, res) => {

    let id = req.params.id;

    carSchema.findById(id).then((car) => {

        res.render('cars/seeDetails', {
            userIsLoggedIn: true,
            car
        });
    });
});

//delete
app.get('/delete/:id', isAuthenticated, (req, res) => {


    let id = req.params.id;

    carSchema.findById(id).then((car) => {

        res.render('cars/delete', {
            userIsLoggedIn: true,
            car
        });
    });


});

app.post('/delete/:id', isAuthenticated, (req, res) => {

    let adminError = '<div class="notification error">You have to be an administrator to delete cars !</h2></div>';

    let id = req.params.id;

    //validation


    if (req.session.user.role !== "admin") {

        carSchema.findById(id).then((car) => {

            res.render('cars/delete', {
                userIsLoggedIn: true,
                message: adminError,
                car
            });

        });

    }
    else {
        carSchema.findByIdAndRemove(id)
            .then(() => {

                console.log('car deleted from db!');
                res.redirect('/cars/all');

            });
    }


});


//all cars
app.get('/cars/all', (req, res) => {

    //take all cars from db
    carSchema.find({})
        .then((cars) => {

            let carsArray = []
            for (const index in cars) {

                let car = cars[index];

                if (car.rented !== true) {
                    carsArray.push({
                        id: car.id,
                        imageUrl: car.imageUrl,
                        make: car.make,
                        model: car.model,
                        rentedCount: car.rentedTimes
                    });
                }

            }

            let loggedIn = req.session.user !== undefined;
            //if we are logged
            if (loggedIn) {

                let isAdmin = req.session.user.role === "admin";
                if(isAdmin)
                {
                    carsArray.forEach(car => {
                        car.isAdmin = true;
                    });
                }

                res.render('cars/all', {
                    cars: carsArray,    
                    userIsLoggedIn: true,
                });
            }
            else {
                res.render('cars/all', {
                    cars: carsArray
                });
            }
        });


});

//read session
app.get('/readSession', (req, res) => {
    res.json(req.session);
});


//rent
app.get('/rent/:id', isAuthenticated, (req, res) => {

    let id = req.params.id;

    carSchema.findById(id).then((car) => {

        res.render('cars/rent', {
            userIsLoggedIn: true,
            car
        });
    });

});

app.post('/rent/:id', isAuthenticated, (req, res) => {

    let id = req.params.id;
    let numberOfDays = req.body.numberOfDays;

    if (numberOfDays === "" || Number(numberOfDays) <= 0) {
        
        let message = '<div class="notification success">Input days is not valid !</h2></div>';
        
        let id = req.params.id;

        carSchema.findById(id).then((car) => {

            res.render('cars/rent', {
                userIsLoggedIn: true,
                car,
                message
            });
        });
    }

    carSchema.findById(id).then((car) => {

        //Update Car First
        carSchema.findByIdAndUpdate(id, {
            "$set": {
                "rented": true,
                "rentedTimes": car.rentedTimes + 1,
                "duration": Number(numberOfDays)
            }
        })
            .then(() => {


                carSchema.findById(id).then((currentCar) => {


                    console.log("Car updated")
                    //push car to rentedCars
                    let userId = req.session.user._id;
                    let rentedCars = req.session.user.rentedCars;

                    rentedCars.push(currentCar);



                    //update user
                    userSchema.findByIdAndUpdate(userId, {
                        "$set": {
                            "rentedCars": rentedCars,
                        }
                    })
                        .then((user) => {


                            console.log("User Updated");
                            res.redirect('/cars/all');
                        });
                });
            });
    });

});


//profile
app.get('/users/me', isAuthenticated, (req, res) => {

    let user = req.session.user;

    if (user.rentedCars.length < 1) {
        res.render('users/profile', {
            username: user.username,
            rentedCars: user.rentedCars,
            userIsLoggedIn: true
        });
    }
    else {


        let carsArray = []

        for (const index in user.rentedCars) {

            let id = user.rentedCars[index];

            carSchema.findById(id).then((car) => {

                carsArray.push(car);

                if(Number(index) === user.rentedCars.length -1)
                {
                res.render('users/profile', {
                    username: user.username,
                    rentedCars: carsArray,
                    userIsLoggedIn: true
                });
                }
            });

        }


    }
});


//additional login routes
app.get('/login', (req, res) => {
    const message = req.session.message;
    req.session.message = '';
    res.render('users/login', {
        message,
        inputData: req.session.inputData
    });
});

app.post('/login', (req, res) => {


    let success = '<div class="notification success">User Login successfull !</h2></div>';
    let error = '<div class="notification error">Something Went Wrong !</h2></div>';

    const {
        username,
        password
    } = req.body;

    userSchema.find({})
        .then((users) => {

            const user = users.filter(u => u.username === username)[0];
            if (user !== undefined) {


                req.session.user = {
                    _id: user.id,
                    username,
                    role: user.role,
                    rentedCars: user.rentedCars
                };

                req.user = user;
                return res.render('home', {
                    message: success,
                    userIsLoggedIn: true,
                    username,
                    role: user.role
                });
            }
            req.session.inputData = {
                username,
                password
            };

            res.render('users/login', {
                message: error
            });
        });

});


app.listen(port);
console.log(`Server listening on port ${port} !`);



