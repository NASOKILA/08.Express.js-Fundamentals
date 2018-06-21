
const fs = require('fs');
const favIvonFilePath = './public/images/favicon.ico';
const cssFilePath = './public/css/main.css';
const pngFilePath = './public/images/nodeLogo.png';

   let dataTypes = {
        '.css' : 'text/css',
        '.js' : 'appication/javascript',
        'png' : 'image/png',
        'jpg' : 'image/jpg',
        '.ico' : 'image/x-icon'
    }

module.exports = (req, res) => {
   
    if(req.path.endsWith('favicon.ico') && req.method === 'GET'){
        
        fs.readFile(favIvonFilePath, (err, data) => {

            if(err){
                console.log(err);
                return;
            }
    
            res.writeHead(200, {
                'content-type' : 'image/x-icon'
            })
    
            res.write(data);
            res.end();
        });
    }
    else if(req.path.endsWith('main.css') && req.method === 'GET'){

        
        fs.readFile(cssFilePath, (err, data) => {

            if(err){
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'content-type' : 'text/css'
            })

            res.write(data);
            res.end();
        });

    }
    else if(req.path.endsWith('nodeLogo.png') && req.method === 'GET'){

        fs.readFile(pngFilePath, (err, data) => {

            if(err){
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'content-type' : 'image/png' 
            });

            res.write(data);
            res.end();

        });

    }
    else if(req.path.endsWith('.jpg') && req.method === 'GET'){

        
        console.log('JPG FORMAT')
        fs.readlink(req.path, (err, data) => {

            if(err){
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'content-type' : 'image/jpg'
            });

            console.log('JPG FORMAT')
            res.write(data);
            res.end();

        });

    }
    else {
        return true;
    }

}