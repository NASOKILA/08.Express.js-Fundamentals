

const fs = require('fs');
const formidable = require('formidable');
const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');


module.exports = (req, res) => {
  if (req.pathname === '/search') {
    search(req, res);
  } else {
    return true
  }
}

function search(req, res) {

  fs.readFile('./views/results.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })



    //parsvame formata
    let form = formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {

      if (err)
        throw err;

      let tagName = req.pathquery.tagName;
      let afterDate = req.pathquery.afterDate;
      let beforeDate = req.pathquery.beforeDate;
      let limit = req.pathquery.Limit;

      let result = '';

      //ako imame limit go setvame 
      let limitNumber = 100000000000;
      if (limit) {
        limitNumber = Number(limit);
      }


      //empty search
      if ((tagName === 'Write tags separted by ,' || tagName === '')
        && afterDate === ""
        && beforeDate === ""
        && limit === "") {



        //vzimame ot bazata vsichki snimki
        Image.find({}).then(images => {
          //console.log(tags)
          for (let image of images) {
            result += imageTemplate(image);
          }

          data = data
            .toString()
            .replace(`<div class='replaceMe'></div>`, result);

          res.end(data);
        });
      }
      //samo s limit
      else if ((tagName === 'Write tags separted by ,' || tagName === '')
        && afterDate === ""
        && beforeDate === "") {

        //vzimame ot bazata vsichki snimki
        Image.find({})
          .limit(limitNumber)
          .then(images => {
            //console.log(tags)
            for (let image of images.sort(i => i.creationDate)) {
              result += imageTemplate(image);
            }

            data = data
              .toString()
              .replace(`<div class='replaceMe'></div>`, result);

            res.end(data);
          });
      }
      //tagove i limiti
      else {

        const params = {};

        
        const tags = req.pathquery.tagName
          .split(',')
          .filter(e => e.length > 0);

        if (tags.length > 0) {

          Tag.find({ name: { $in: tags } })
            .then(tags => {

              const tagIds = tags.map(m => m._id);
              params.tags = tagIds;
              getImagsAndRespond(params, limitNumber, data, res);
            })
            .catch(err => {
              console.log(err);
            });



        }

      }

    });


    //res.end(data);
  });

}


function getImagsAndRespond(params, limitNumber, data, res) {

  //NE ISKA DA NAMERI TAGOVETE !!!
  Image.find(params)
    .limit(limitNumber)
    .then(images => {

      let resultHtml = '';
      for (let image of images) {
        result += imageTemplate(image);
      }

      if (images.length < 1) {
        resultHtml = '<h1>No images found.</h1>'
      }
      data = data
        .toString()
        .replace(`<div class='replaceMe'></div>`, resultHtml);

      res.writeHead(200, {
        'content-type': 'text/html'
      });

      res.end(data);
    });

}

function imageTemplate(image) {
  return `<fieldset id => <legend>${image.title}:</legend> 
                <img src="${image.url}"></img>
                <p>${image.description}<p/>
                <button onclick=location.href="/delete?id=${image._id}" class='deleteBtn'>Delete</button> 
              </fieldset>`;
}
