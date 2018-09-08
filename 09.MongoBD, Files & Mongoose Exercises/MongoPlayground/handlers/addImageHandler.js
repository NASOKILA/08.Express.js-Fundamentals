
const Image = require('mongoose').model('Image');
const formidable = require('formidable');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}

function addImage(req, res) {

  let form = formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {

    if (err)
      throw err;

    let imageUrl = fields.imageUrl;
    let imageTitle = fields.imageTitle;
    let description = fields.description;

    let tags = fields.tagsID.split(',')
      .filter(t => t !== "")
      .filter((v, i, a) => a.indexOf(v) === i)
      .map(ObjectId);

    Image.create({
      url: imageUrl,
      title: imageTitle,
      creationDate: Date.now(),
      description: description,
      tags: tags
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

}


function deleteImg(req, res) {

  let form = formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {

    if (err)
      throw err;

    let imageId = ObjectId(req.pathquery.id);
    let imageIdString = req.pathquery.id;

    Image.findByIdAndRemove({ '_id': imageId }).then(() => {

      res.writeHead(302, {
        location: '/'
      });

      res.end();

    })
      .catch(err => {
        console.log(err)
      });

  });

}
