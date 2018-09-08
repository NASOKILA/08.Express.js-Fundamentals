
var crypto = require('crypto');

function generateSalt(){

    return crypto.randomBytes(128).toString('base64');
}

function generateHash(salt, password){

    let hmac = crypto.createHmac('sha1', salt);

    let result = hmac.update(password).digest('hex');
    return result;
}

let salt = generateSalt();
let password = '123456';

let hashedPassword = generateHash(salt, password);

console.log(hashedPassword); 
