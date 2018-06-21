
/*
    Za kriptirane polzvame vgradeniq modul 'crypto'
    keshiraneto stava kato zadadem parola koqto minava prez funkciq koqto q kriptira
    dori i da imame dve mnogo podobni paroli shte ima obromna razlika v keshiraneto.

    Polzvame funkciqt koqto generira sol t.e. koqto uslojnqva oshte poveche keshiraneto.
*/

var crypto = require('crypto');

//generira sol za da stane oshte po slojno kriptiraneto
function generateSalt(){

    //vrushtame nqkkuv stream na koito mu podavame baitovete na nashata parola
    return crypto.randomBytes(128).toString('base64');
}

//priema solta i parolata i q vrushta kriptirana
function generateHash(salt, password){

    //zadavame vida na algorituma koito iskame da kriptira neshata
    //imamae mnogo algoritmi no nai dobrite sa sha1, sha256, sha512
    let hmac = crypto.createHmac('sha1', salt);

    //podavame parolata na hmac i mu kazvame da ni q izkata v 16tichen vid:
    let result = hmac.update(password).digest('hex');
    return result;
}

let salt = generateSalt();
let password = '123456';

let hashedPassword = generateHash(salt, password);

console.log(hashedPassword); //c3d211a0a342faa60e73b29133d51b67595d69bb

/*
    Tova se aricha 'one way crypting' koeto oznachava che ne mojem da 
    decriptirame generiranata parola.

    No imame i drugi nachini s koito poluchavame kluch s koito mojem da 
    dekriptirame veche kriptiranata parola.

*/

