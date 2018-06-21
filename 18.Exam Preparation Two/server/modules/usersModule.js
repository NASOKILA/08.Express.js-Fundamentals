const router = require('express').Router();
const passport = require('passport');

const encryption = require('../infrastructure/encryption')
const User = require('../models/User');



module.exports = {

    logout: (req, res) => {
        req.logout()
        res.redirect('/')
    },
    loginGet: (req, res) => {
        res.render('users/login')
    },
    loginPost: (req, res) => {

        let loginArgs = req.body;

        User.findOne({ username: loginArgs.username }).then(user => {

            if (!user || !user.authenticate(loginArgs.password)) {
                let errorMsg = 'Either username or password is invalid!';
                loginArgs.error = errorMsg;
                res.render('user/login', loginArgs);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    res.render('/user/login', { error: err.message });
                    return;
                }

                let returnUrl = '/';
                if (req.session.returnUrl) {
                    returnUrl = req.session.returnUrl;
                    delete req.session.returnUrl;
                }

                res.redirect(returnUrl);
            })
        })

    },
    registerGet: (req, res) => {
        res.render('users/register')
    },
    registerPost: (req, res) => {
        
        let reqUser = req.body
        
        User.findOne({ username: reqUser.username }).then(user => {

            let errorMsg = '';

            //validation
            if (user) {
                res.redirect('/');
                errorMsg = 'User with the same username exists!';
            } else if (reqUser.password !== reqUser.confirmpassword) {
                req.redirect('/');
                errorMsg = 'Passwords do not match!'
            }




            let salt = encryption.generateSalt()
            let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

            User.create({
                username: reqUser.username,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                salt: salt,
                hashedPass: hashedPassword
            }).then(user => {
                req.logIn(user, (err, user) => {
                    if (err) {
                        res.locals.globalError = err
                        res.render('users/register', user)
                    }

                    res.redirect('/')
                })
            })

        })
    },

};
