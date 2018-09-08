
const formidable = require('formidable');
const util = require('util');

const Tag = require('mongoose').model('Tag');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {

    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      let tagname = fields.tagName;

      Tag.create({
        name: tagname,
        creationDate: Date.now(),
        images: []
      })
        .then(tag => {

          res.writeHead(302, {
            location: '/'
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
