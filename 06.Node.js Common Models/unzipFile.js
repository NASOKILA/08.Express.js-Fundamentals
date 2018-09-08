
const fs = require('fs');

const zlib = require('zlib');

let readStream = fs.createReadStream('./testDir/bigFile.txt.gz');

let writeStream = fs.createWriteStream('./testDir/bigFile.txt');

let unzip = zlib.createGunzip();

readStream.pipe(unzip).pipe(writeStream);

