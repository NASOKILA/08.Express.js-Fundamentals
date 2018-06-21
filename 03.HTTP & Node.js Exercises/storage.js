
var fs = require('fs');

let memory = {};

let storage = {

    put: (key, value) => {
        if (typeof key !== 'string') {
            return 'Key should be a String';
            //throw Error('Key should be a String !');
        }

        if (key in memory) {
            return 'Key already exists in storage';
            //throw Error('Key already exists in storage !');
        }

        memory[`${key}`] = value;
    },

    get: (key) => {
        checkKey(key);
        return memory[`${key}`];
    },

    getAll: () => {
        if (Object.keys(memory).length === 0) {    
            return 'There are no items in the storage';
            //throw Error('Storage is Empty !');
        }

        return memory;
    },

    update: (key, newValue) => {
        checkKey(key);
        memory[`${key}`] = newValue;
    },  

    delete: (key) => {
        checkKey(key);
        delete memory[`${key}`];
    },

    clear: () => {
        memory = {};
    },

    save: () => {
        //Tova e sinhromniq variqnt
        fs.writeFileSync("./storage.json", JSON.stringify(memory), 'utf8');
    },

    load: () => {
        //Moje da polzvame Promise da raboti asinhromno
        let data = fs.readFileSync("./storage.json", 'utf8', (err, data) => {
            if(err)
                return;
        });
        
        memory = JSON.parse(data);
    }

    
};


function checkKey(key) {
    if (typeof key !== 'string') {
        return 'Key should be a String';
        //throw Error('Key should be a String !');
    }
    if (!(key in memory)) {
        return 'Key does not exist in storage';
        //throw Error('Key does not exist in storage !');
    }
}


module.exports = storage;


