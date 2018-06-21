
const fs = require('fs')
const addMemefilePath = './views/addMeme.html';
const viewAllfilePath = './views/viewAll.html';
const dataBase = './config/dataBase.js';


module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    
    fs.readFile(viewAllfilePath, (err, data) => {

      if (err) {
        console.log(err)
        return
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', dataBase.load);
      res.end(data)

    })

  } else if (req.pathname === '/addMeme' && req.method === 'GET') {

    fs.readFile(addMemefilePath, (err, data) => {

      if (err) {
        console.log(err)
        return
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.end(data)

    })

  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}
