const router = require('express').Router();

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    about: (req, res) => {
        res.render('home/about');
    },

};