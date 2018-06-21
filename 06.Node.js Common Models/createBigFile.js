
//Tuk polzvame stream za da zapishem mnogo informaciq v edin fail.

const fs = require('fs');

//kazvame che shte pishem vurhu daden fail sus WriteStream()
const file = fs.createWriteStream('./testDir/bigFile.txt');

//Zapisvame 100 000 0 puti vuv nashiq fail "Hello World!" I FAILUT STVA DOSTA GOLQM
for (let index = 0; index <= 1000000; index++) {
    file.write('Hello World!');
}

file.end();
