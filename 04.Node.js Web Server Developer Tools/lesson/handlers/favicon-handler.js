

const fs = require('fs');
let favicon = '/favicon.ico';

module.exports = ((req, res) => {

    if (req.path === favicon) {

        fs.readFile('./lesson/' + favicon, (err, data) => {

            if (err) {
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                'content-type': 'image/x-icon'
            });

            res.write(data);
            res.end()
        });
    }
    else
    {
        return true;
    }

});
