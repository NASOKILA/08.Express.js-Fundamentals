const fs = require('fs')
const express = require('express');
const memeSchema = require('./schemas/memeSchema');

module.exports = (req, res) => {

    if (req.pathname === '/' && req.method === 'GET') {
        app.get('/', (req, res) => {

            res.render('home');

        });
    }
    else {
        return true
    }
}
