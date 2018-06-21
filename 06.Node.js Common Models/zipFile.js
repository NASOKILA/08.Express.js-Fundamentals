

const fs = require('fs');
const zlib = require('zlib');

let readStream = fs.createReadStream('./testDir/bigFile.txt');

let writeStream = fs.createWriteStream('./testDir/bigFile.txt.gz');

let gzip = zlib.createGzip();

//TOVA E ZA UNZIPVANE
let unzip = zlib.createGunzip();

readStream.pipe(gzip).pipe(writeStream);

//SLED KATO GO KOMPRESIRAME FAILUT STAVA MNOGO PO MALUK VIJ V SAMATA PAPKA KOLKO E RAZLIKATA V GOLEMINATA.
