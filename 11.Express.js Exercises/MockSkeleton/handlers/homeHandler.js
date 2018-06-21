const fs = require('fs')
const express = require('express');
const memeSchema = require('./schemas/memeSchema');



module.exports = (req, res) => {
  
  
    if (req.pathname === '/' && req.method === 'GET') {
        app.get('/', (req, res) => {

            //POLZVAI 3 PUTI {{{}}} inache dava greshka v brawsera
            res.render('home');
            
        });
    }
    else{
      return true
  }
}
