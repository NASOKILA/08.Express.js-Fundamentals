
const fs = require('fs');

module.exports = (req, res) => {

    fs.readFile('./views/pageNotFound.html', (err, data) => {
        
        if (err) {
            console.log(err);
            return
        }
        
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.write(data)
        res.end()
    });
    
}
