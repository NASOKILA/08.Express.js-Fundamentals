
//tova  modul koito e za kriptirane
const crypto = require('crypto');

//exportirame nqkolko funkcii koito sa za generirane na sol, heshirana parola koqto polzva solta i id
module.exports = {
    generateSalt: () =>
        crypto.randomBytes(128).toString('base64'),
    generateHashedPassword: (salt, password) =>
        crypto.createHmac('sha256', salt).update(password).digest('hex'),
    generateId: () =>
        crypto.randomBytes(16).toString('hex'),
};


