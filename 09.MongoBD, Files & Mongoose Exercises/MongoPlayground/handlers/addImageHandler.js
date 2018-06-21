
const Image = require('mongoose').model('Image');
const formidable = require('formidable');

//vzimame si ObjctId za da si parsnem vseki takuv obekt
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

    //
    let tags = fields.tagsID.split(',')
      .filter(t => t !== "")
      .filter((v, i, a) => a.indexOf(v) === i)
      .map(ObjectId);    //PARSVAME VSEKI EDIN ELEMENT KUM ObjectId, vikame go kato funkciq
    //NO MOJEM I DA GO SLOJIM KATO STRING PAK MINAVA

    Image.create({
      url: imageUrl,
      title: imageTitle,
      creationDate: Date.now(),
      description: description,
      tags: tags
    })
      .then(tag => {

        //sled zapisvaneto v bazata redirektvame kum home-a
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
    //console.log(imageId);

    Image.findByIdAndRemove({ '_id': imageId }).then(() => {

      //redirektvame kum home
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





