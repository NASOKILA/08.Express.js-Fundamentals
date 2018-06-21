 

//Vzimame si shemite kato ne e zaduljitelno da rquirvame samite failove
//tui kato shemite sa registrirani v mongoose 
//zapisvam gi v mongoose i sega mojem da si gi polzvame kato gi vemem direktno ot mongoose.model()
require('../models/ImageSchema');
require('../models/TagSchema');

let Tag = require('mongoose').model('Tag');
let Image = require('mongoose').model('Image');

const fs = require('fs')

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
    fs.readFile('./views/index.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      let dispalyTags = ''

      //za vseki tag vzimame idto i imeto i go zakachame za div
      //nakraq repleisvame repleiceme diva

      Tag.find({}).then(tags => {
        //console.log(tags)
        for (let tag of tags) {
          dispalyTags += `<div class='tag' id="${tag._id}">${tag.name}</div>`
        }
        data = data
          .toString()
          .replace(`<div class='replaceMe'></div>`, dispalyTags)
        
        res.end(data)
      })
     
    })
  } else {
    return true
  }
}
