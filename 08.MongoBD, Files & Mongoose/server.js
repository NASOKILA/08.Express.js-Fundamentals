let http = require("http");
let fs = require("fs");
let url = require("url");
let formidable = require("formidable");
let port = "5000";
let server = http.createServer((req, res) => {
let urlObj = url.parse(req.url);
let path = urlObj.pathname;

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

            let form = new formidable.IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (err)
                    console.log(err);

                let file = files["upload"];
                let filePath = file.path;
                let fileName = file.name;

                fs.rename(filePath, './files/' + fileName);
                
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
