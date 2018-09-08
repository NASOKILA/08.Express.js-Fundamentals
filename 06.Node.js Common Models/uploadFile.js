
const http = require('http');
const port = '1010';

const util = require('util');

const formidable = require('formidable');

const form = formidable.IncomingForm();

form.on('fileBegin', (name, fileObj) => {

    fileObj.path = './testDir/' + fileObj.name;
});

const server = http.createServer();
server.on('request', (req, res) => {


    if(req.url === '/upload' && req.method === 'POST'){

        form.parse(req, function(err, fields, files){

            res.writeHead(200, { 'content-type' : 'text/plane'});
            res.write('FIle Uploaded !\n\n');
            
            res.end(util.inspect({fields, files}))
        });   
    }
    else 
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
