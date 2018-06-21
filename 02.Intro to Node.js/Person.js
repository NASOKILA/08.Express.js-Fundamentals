
class Person {
    
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    SayHello(){
        console.log(`Hello, my name is ${this.name}, my gender is ${this.gender} and I am ${this.age} years old.`);
    }
}


module.exports = Person;