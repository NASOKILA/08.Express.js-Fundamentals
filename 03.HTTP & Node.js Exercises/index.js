


let storage = require('./storage');

/*
storage.put('first','firstValue')
storage.put('second','secondValue')
storage.put('third','thirdValue')
console.log(storage.getAll());
storage.save();
storage.clear();
storage.load();
*/

storage.load();
storage.put('first','firstValue')
storage.put('second','secondValue')
storage.put('third','thirdValue')
storage.put('fouth','fourthValue')
console.log(storage.get('first'))
console.log(storage.getAll())
storage.delete('second')
storage.update('first','updatedFirst')
storage.save()
storage.clear()
console.log(storage.getAll())
storage.load()
console.log(storage.getAll())


/*
storage.put('first','firstValue')
storage.put('second','secondValue')
storage.delete('second')
storage.delete('second')
storage.put(2,'someValue')
storage.put('cat','dog')
storage.put('cat','anotherDog');
*/
