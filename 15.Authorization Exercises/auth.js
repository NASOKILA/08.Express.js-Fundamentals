

const passport = require('passport');

const LocalPassport = require('passport-local');

const mongoose = require('mongoose');

const userSchema = require('./schemas/userSchema');

const encryption = require('./encryption');

const router = require('express').Router();

passport.use(new LocalPassport((username, password, done) => {

    userSchema.find({})
        .then((users) => {

            const user = users.filter(u => u.username === username)[0];

            if (user !== undefined) {
                return done(null, user);
            }

            return done(null, false);
        });
}));

passport.serializeUser((user, done) => {

    if (user) {
        return done(null, user._id);
    }
});

passport.deserializeUser((id, done) => {

    userSchema.find({})
        .then((users) => {

            const user = users.filter(u => u._id === id)[0];

            if (user)
                return done(null, user);

            return done(null, false);

        });
});

router.get('/logout', (req, res) => {
    
    let success = '<div class="notification success">Logout Successfull !</h2></div>';
    
    req.logout();
    delete req.session.user;
    res.render('home', {
        message: success,
        role : "anonymous",
        username :  "user"
    });
});

router.get('/register', (req, res) => {
    const message = req.session.message;
    req.session.message = '';
    res.render('users/register', {
        message,
        inputData: req.session.inputData
    });
});

router.post('/register', (req, res) => {


    let success = '<div class="notification success">User Registered Successfully, Please Log in!</h2></div>';

    let error = '<div class="notification error">Something Went Wrong !</h2></div>';

    const {
        username,
        password,
        repeat
    } = req.body;



    if (password !== repeat) {
        return error("Passwords don't match");
    }

    userSchema.find({}).then((users) => {

        if (users.filter(u => u.username === username).length > 0) {
            return error("Username is taken");
        }

        const salt = encryption.generateSalt();

        const hashedPass = encryption.generateHashedPassword(salt, password);

        
        const user = new userSchema({
            username,
            hashedPass,
        });
        
        if(users.length < 1)
        {
            user.role = "admin";
        }
        else
        {
            user.role = "user";            
        }        

        user
            .save()
            .then(() => {

            console.log('User saved in db!');
            res.render('home', {
                message: success,
                role : "anonymous",
                username :  "user"
            });
        });

    });


});

function error(message) {
    req.session.inputData = {
        username,
        password,
        repeat
    };
    req.session.message = message;
    return res.redirect('/auth/register');
}



module.exports = router;