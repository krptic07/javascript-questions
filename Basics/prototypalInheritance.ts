// Explain how prototypal inheritance works in JavaScript
// and how a child inherits properties from a parent using prototype.

interface IAnimal {
  legs: number;
}

class Animal implements IAnimal {
  public legs: number;

  constructor(legs: number) {
    this.legs = legs;
  }

  returnLegs(): number {
    return this.legs;
  }
}

interface IGene {
  name: string;
  home: string;
}

class Gene extends Animal implements IGene {
  public name: string;
  public home: string;

  constructor(legs, name, home) {
    super(legs);
    this.name = name;
    this.home = home;
  }

  makeSound(): string {
    if (this.name === "dog") {
      return `Woof${this.legs}`;
    } else if (this.name === "cat") {
      return `Meow${this.legs}`;
    }
  }
}

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hello ${this.name}`;
};

function Developer(name, domain) {
  Person.call(this, name);
  //Here Developer only has access to the Person constructor variables
  this.domain = domain;
}

//Assign Person's Prototype to Developer Protype, now Developer has access to the Person methods.
Developer.prototype = Object.create(Person.prototype);
// Developer.prototype = Person.prototype;
//  (if we directly do this, then Developer and Person prototypes will be directly linked and any cahnges to Developer protoype will be applied to Person)

//Due to the previous step the contructor property was reset, so we have to do this
// Developer.prototype.constructor = Developer;

Developer.prototype.getDomain = function () {
  return this.domain;
};

const devF = new Developer("Abhishek", "fe");
const newPerson = new Person("Abhishe");

console.log(devF.getDomain(), devF.sayHello(), devF.domain);
// console.log(newPerson.getDomain());
