const http = require('http')
const url = require('url')
const qs = require('querystring')
const port = process.env.PORT || 5000
const handlers = require('./handlers/handlerBlender')

//Nie exportvame promise na koito mojem da kajem then():
require('./config/db').then(() => {
  console.log('Database ready !')

  
  //tuk ni e servera
  http.createServer((req, res) => {
      req.pathname = url.parse(req.url).pathname
      req.pathquery = qs.parse(url.parse(req.url).query)
      for (let handler of handlers) {
        if (!handler(req, res)) {
          break
        }
      }
    }).listen(port)
  console.log(`Server runing on port ${port} !`);


}).catch(err => {

  //DIREKTNO HVURLQME POLUCHENATA GRESHKA AKO IMA TAKAVA ZA DA NI SPRE PRILOJENIETO.
  //SMISULA DA HVASHTAME I DA HVYRLQME NANOVO GRSHKA E CHE TQ SHTE IMA SUOBSHTENIE KATO Q HVURLIM NIE.
  throw err;
});
