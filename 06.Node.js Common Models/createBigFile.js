
const fs = require('fs');

const file = fs.createWriteStream('./testDir/bigFile.txt');

for (let index = 0; index <= 1000000; index++) {
    file.write('Hello World!');
}

file.end();
