
let http = require("http");
let fs = require("fs");
let url = require("url");
let formidable = require("formidable");

let port = "5000";

let server = http.createServer((req, res) => {

    let urlObj = url.parse(req.url);
    let path = urlObj.pathname;

    console.log(path);
    console.log(req.method);

    if (path === "/") {

        if(req.method === "GET"){
            
            fs.readFile('./views/index.html', 'utf8', (err, data) => {

                if (err) {
                    console.log(err.message);
                }

                res.writeHead(200, {
                    "content-type": "text/html"
                });

                res.write(data);
                res.end();
            });

        }
        else if (req.method === "POST") {

            console.log('FILE UPLOADED')

            //TAKA SI VZIMAME POST FORMATA
            let form = new formidable.IncomingForm();

            //VAJNO TRQBVA NI enctype="multipart/form-data" VUV FORMATA ZADULJITELNOOOOOOOOOOOOOO
            
            //VAJNOOOOOOOOOOOOOOOOOOOOO!
            
            //FORMIDABLE VZIMA KACHENIQ OT NAS FAIL I GO SLAGA V 
            //C:\Users\user\AppData\Local\Temp\
            //NIE MOJE PROSTO DA SI GO PREMESTIM KUDETO SI ISKAME
            
            //parsvame po tozi nachin
            form.parse(req, (err, fields, files) => {
                if (err)
                    console.log(err);

                //VAJNO TRQBVA NI enctype="multipart/form-data" VUV FORMATA ZADULJITELNOOOOOOOOOOOOOO                
                //console.log(fields);
                //console.log(files);

                //Vzimame si faila
                let file = files["upload"];
                
                //Vzimame putq i imeto mu
                let filePath = file.path;
                let fileName = file.name;
                
                //ZA DA PREMESTIM FAILA TRQBVA DA NAPRAVIM RENAME NA PUTQ I TO SI GO MESTI AVTOMATICHNO
                fs.rename(filePath, './files/' + fileName);
                
                //PREMESTIHME FAILA V PAPKA Files
                res.write('THANKYOU !');
                res.end();
            });
        }

    }
    else if (path === "/favicon.ico") {

        fs.readFile('./images/icons8-google-filled-50.png', (err, data) => {
            if (err) {
                console.log(err.message)
            }

            res.writeHead(200, {
                "content-type": "image/x-icon"
            });

            res.write(data);
            res.end();
        });

    }
    else if (path.endsWith('like_dogs.jpg')) {

        fs.readFile('./images/1024px-Dogs_like_cucumbers_&_cucumbers_like_dogs.jpg',
            (err, data) => {

                if (err) {
                    console.log(err.message)
                }

                res.writeHead(200, {
                    "content-type": "image/jpg"
                });

                res.write(data);
                res.end();

            });
    }
    else if (path.endsWith('.css')) {

        fs.readFile('./styles/style.css', 'utf8', (err, data) => {
            if (err) {
                console.log(err.message)
            }

            res.writeHead(200, {
                "content-type": "text/css"
            });

            res.write(data);
            res.end();
        });
    }
});

server.listen(port);
console.log(`Server listening on port: ${port}`);