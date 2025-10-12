// JavaScript Example - Modern ES6+ Features

console.log("=== JavaScript Demo ===\n");

// Arrow functions
const greet = (name) => `Hello, ${name}!`;
console.log(greet("World"));

// Array methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("\n--- Array Operations ---");
console.log("Numbers:", numbers);

const evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers:", evens);

const squared = numbers.map(n => n ** 2);
console.log("Squared:", squared);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

// Object destructuring
const person = {
    name: "John Doe",
    age: 30,
    city: "New York",
    occupation: "Developer"
};

console.log("\n--- Object Operations ---");
const { name, age, city } = person;
console.log(`${name} is ${age} years old and lives in ${city}`);

// Spread operator
const morePerson = {
    ...person,
    country: "USA",
    hobby: "Coding"
};
console.log("Extended person:", morePerson);

// Array spread
const moreNumbers = [...numbers, 11, 12, 13];
console.log("Extended array:", moreNumbers);

// Template literals
const message = `
╔════════════════════════════════╗
║   JavaScript is Awesome! 🚀   ║
╔════════════════════════════════╗
`;
console.log(message);

// Async operations (with setTimeout)
console.log("\n--- Async Demo ---");
console.log("Starting timer...");

setTimeout(() => {
    console.log("⏰ Timer finished after 1 second!");
}, 1000);

setTimeout(() => {
    console.log("⏰ Another timer at 2 seconds!");
}, 2000);

// Higher-order functions
const multiply = (factor) => (number) => number * factor;
const double = multiply(2);
const triple = multiply(3);

console.log("\n--- Higher-Order Functions ---");
console.log("Double 5:", double(5));
console.log("Triple 5:", triple(5));

// Class example
class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }
    
    makeSound() {
        return `${this.name} says ${this.sound}!`;
    }
}

console.log("\n--- Classes ---");
const dog = new Animal("Dog", "Woof");
const cat = new Animal("Cat", "Meow");
console.log(dog.makeSound());
console.log(cat.makeSound());

console.log("\n✨ JavaScript execution completed!");

