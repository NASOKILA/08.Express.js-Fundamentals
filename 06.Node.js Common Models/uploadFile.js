
//ZA DA UPLOADNEM EDIN FAIL E QSNO CHE NI TRQBVA SERVER. 

const http = require('http');
const port = '1010';

//util modula ni pozvolqva da go fidim v po dobur vid.
const util = require('util');

//Sled kato sme instalirali ot terminala paketa formittable si go requirvame.
const formidable = require('formidable');

//Pravim si forma
const form = formidable.IncomingForm();

//IMAME EVENT ZA ZAPISVANE NA POLUCHENIQ FAIL V DADENA DIREKtoriQ ILI MQSTO:
form.on('fileBegin', (name, fileObj) => {

    //KAZVAME DA ZAPAMETI POLUCHNIQ FAIL V PAPKATA testDir
    fileObj.path = './testDir/' + fileObj.name;
    //console.log(fileObj.path);
});

const server = http.createServer();
server.on('request', (req, res) => {

    //TRQBVA url-a DA E '/upload' I METODA DA E 'POST'

    if(req.url === '/upload' && req.method === 'POST'){

        form.parse(req, function(err, fields, files){

            //console.log(fields);
            //console.log(files);

            res.writeHead(200, { 'content-type' : 'text/plane'});
            res.write('FIle Uploaded !\n\n');
            
            //util modula ni pozvolqva da go fidim v po dobur vid.
            res.end(util.inspect({fields, files}))

        });   
    }
    else //AKO NE SME NA UPLOAD SUS POST METOD DA SE VURNE FORMICHKATA
    {
        res.writeHead(200, { 'content-type' : 'text/html' });

        res.end(`
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="text" name="title"><br>
                    <input type="file" name="upload" multiple="multiple"><br>
                    <input type="submit" value="Upload"><br>
                </form>
                `);
    }

});

server.listen(port);
console.log(`Server listening on port ${port}.`)


