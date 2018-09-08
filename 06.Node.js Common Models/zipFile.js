

const fs = require('fs');
const zlib = require('zlib');

let readStream = fs.createReadStream('./testDir/bigFile.txt');

let writeStream = fs.createWriteStream('./testDir/bigFile.txt.gz');

let gzip = zlib.createGzip();

let unzip = zlib.createGunzip();

readStream.pipe(gzip).pipe(writeStream);

