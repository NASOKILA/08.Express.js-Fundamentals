
const formidable = require('formidable');
const util = require('util');

const Tag = require('mongoose').model('Tag');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {

/*
    const cache = []; //zapazvame vsqka namerena stoinost tuka
    
    //ako imame dadeno properti v masiva i pak go namerim v kesh-a, tazi funkciqta go skipva
    //funkciqta polzva kesha, slagame q v write
    res.write(JSON.stringify(req, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {

          try {


            return JSON.parse(JSON.stringify(value));
          } catch(error) {


            return;
          }
        }
        cache.push(value);
      }
      return value;
    }));
*/

    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {

        //console.log(fields)    
        //console.log(files)    
        let tagname = fields.tagName;
        
        //suzdavame noviq tag po Tag shemata i go zapisvame v bazata
        //Ako polzvame .create() pri suzdvane avtomatichno ni go zapazva v bazata.
        //Ako polzvame new Tag(...) trqbva nakraq da mu dadem .save()
        Tag.create({
          name: tagname,
          creationDate: Date.now(),
          images: []
        })
        .then(tag => {
          //sled zapisvaneto v bazata redirektvame kum home-a
          res.writeHead(302, {
            location : '/'
          })
          
          res.end();
          
        }).catch(err => {
          res.writeHead(500, {
            'content-type': 'text/plane'
          })
            console.log(err)
          res.write('Servar error !');
          res.end();
        });

    });



  } else {
    return true
  }
}
