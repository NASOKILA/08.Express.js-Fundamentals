

const fs = require('fs');

// exportirame samo funkciqt koqto shte se polzva ot servera
module.exports = (req, res) => {
    if (req.path === '/aboutUs') {

        fs.readFile('./lesson/aboutUs.html', (err, data) => {
            //Ako imame error prosto go logvame i returnvame
            if (err) {
                console.log(err.message);
                return;
            }

            //OPREDELQME TIPUT NA HEADERA
            res.writeHead(200, {
                'content-type': 'text/html'
            });

            //I PODAVAME NA RESPONSA POLUCHENOTO OT HTML-a
            res.write(data);
            res.end();
        });
    }
    else
    {
        return true;
    }

}