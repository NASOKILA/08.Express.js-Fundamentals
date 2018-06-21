
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const formidable = require('formidable');
const shortUniqueId = require('short-unique-id');
const download = require('download-file')


const allMemesfilePath = './views/viewAll.html';
const getDetailsfilePath = './views/details.html';
const viewAddfilePath = './views/addMeme.html';
const dbPath = './db/db.json';

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else if (req.pathname.startsWith('/download') && req.method === 'GET') {
    downloadFile(req, res);
  } else {
    return true
  }
}


function viewAll(req, res) {
  fs.readFile(allMemesfilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    fs.readFile(dbPath, 'utf8', (err, memeData) => {
      if (err)
        console.log(err);

      let memes = JSON.parse(memeData);

      let result = '';

      function compare(a, b) {
        if (a.dateStamp < b.dateStamp)
          return -1;
        if (a.dateStamp > b.dateStamp)
          return 1;
        return 0;
      }
      for (const memeIndex in memes.sort(compare)) {

        let meme = memes[memeIndex];
        if(meme.privacy !== "on")
          continue;
        result +=
          `<div class="meme">` +
          `<a href="/getDetails?id=${meme.id}">` +
          `<img class="memePoster" src="${meme.memeSrc}"/>` +
          `</a>` +
          `</div>`;
      }

      data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', result);
      res.end(data)
    });
  });
}

function viewAddMeme(req, res) {

  fs.readFile(viewAddfilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    res.end(data);
  });
}

function addMeme(req, res) {


  let replacement = '<div id="succssesBox"><h2 id="succssesMsg">Meme Added</h2></div>';

  let error = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>';

  let validMovieFlag = true;

  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err)
      console.log(err);


    let description = fields.memeDescription;
    let title = fields.memeTitle;
    let status = fields.status;


    //Vzimame si faila
    let file = files["meme"];

    //Vzimame putq i imeto mu
    let filePath = file.path;
    let fileName = file.name;

    if (description === "" || title === "" || fileName === "") {
      replacement = error;
      validMovieFlag = false;
    }




    //Definirame pravilnata papka

    //vzimame tekushtata posledna papka v mameStorage
    let folderNumber = 0;
    fs.readdir('./public/memeStorage', (err, files) => {
      console.log(files.length);
      folderNumber = files.length - 1;



      //ako ima nad 1000 elementa v neq znachi dobavqme 1 kum teushtata papka
      let dir = './public/memeStorage/' + folderNumber.toString();
      fs.readdir(dir, (err, files) => {
        console.log(files.length);
        if (files.length === 1000)
        {
          folderNumber++
          
          //vzimame si noviqt put i si pravim novata papka
          let newdirPath = './public/memeStorage/' + folderNumber.toString();
          fs.mkdirSync(newdirPath);
        }


        //polzvame tazi papka za da mestim snimki v neq
        let folder = folderNumber.toString();

        fs.rename(filePath, `./public/memeStorage/${folder}/` + fileName, () => {


          if (validMovieFlag) {
            //generate new meme obj


            //generate short unique id: 
            let suid = new shortUniqueId();
            let id = suid.randomUUID(9);
            let privacy = status;
            let memeSrc = `./public/memeStorage/${folder}/` + fileName;
            let dateStamp = Date.now();

            let newMemeObj = {
              id,
              title,
              memeSrc,
              description,
              privacy,
              dateStamp
            }

            //REGISTER THE OBJECT IN THE db.json
            fs.readFile(dbPath, 'utf8', (err, data) => {

              if (err) {
                console.log(err);
                return
              }

              let dataArray = JSON.parse(data);

              dataArray.push(newMemeObj);

              let dataString = JSON.stringify(dataArray);

              fs.writeFile(dbPath, dataString);

            });

          }

        });


      });


    });



    //redirectvame kum sushtata stranica
    fs.readFile(viewAddfilePath, (err, data) => {

      if (err) {
        console.log(err);
        return
      }
      console.log(replacement)
      //ZAMESTVAME EDNA CHAST NA HTML-a SUS success PROMENLIVATA
      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replacement)

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      res.write(data)
      res.end()

    });


  });

}

function getDetails(req, res) {

  fs.readFile(getDetailsfilePath, 'utf8', (err, data) => {

    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })


    let query = url.parse(req.url).query;

    let query_id = query.split('=')[1];

    fs.readFile('./db/db.json', 'utf8', (err, memeData) => {
      if (err)
        console.log(err);

      let memes = JSON.parse(memeData);

      let result = '';
      let targetedMeme = '';

      for (const memeIndex in memes) {

        let meme = memes[memeIndex];

        if (meme.id === query_id) {
          targetedMeme = meme;
          break;
        }
      }


      result +=
        `<div class="content">
      <img src="${targetedMeme.memeSrc}" alt=""/>
      <h3>Title  ${targetedMeme.title}</h3>
      <p> ${targetedMeme.description}</p>
      <button><a href="download/${targetedMeme.memeSrc}">Download Meme</a></button>
      </div>`

      data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', result);
      res.end(data);

    });
  });

}

function downloadFile(req, res){

  let replacement = '<div id="succssesBox"><h2 id="succssesMsg">Meme Downloaded</h2></div>';
  let error = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>';
  
  let url  = '.' + req.pathname.substr(9);
  
  

  fs.readFile(url, (err, data) => {

    if (err) {
      console.log(err)
      return
    }
      res.writeHead(200, {
      'Content-Type': 'application/x-please-download-me'
    })

  res.write(data);
  res.end();
  });

}