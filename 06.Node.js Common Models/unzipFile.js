
const fs = require('fs');

const zlib = require('zlib');

//ZA UNZIPVANE CHETEM ZIPNATIQ FAIL I GO PISHEM V NOVIQ FAIL KOITO ISKAME DA IMAME
let readStream = fs.createReadStream('./testDir/bigFile.txt.gz');

//AKO VECHE IMAME FAIL S TAKOVA IME NQMA DA STANE.
let writeStream = fs.createWriteStream('./testDir/bigFile.txt');

//TOVA E ZA UNZIPVANE
let unzip = zlib.createGunzip();

readStream.pipe(unzip).pipe(writeStream);

