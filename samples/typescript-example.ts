// TypeScript Example - Demonstrating Type Safety

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

// Function with typed parameters and return type
function createUser(name: string, email: string, age: number): User {
    return {
        id: Math.floor(Math.random() * 10000),
        name,
        email,
        age
    };
}

// Generic function
function getFirstElement<T>(array: T[]): T | undefined {
    return array[0];
}

// Main execution
console.log("=== TypeScript Demo ===\n");

// Create users
const user1 = createUser("Alice Johnson", "alice@example.com", 28);
const user2 = createUser("Bob Smith", "bob@example.com", 35);

console.log("Created users:");
console.log(user1);
console.log(user2);

// Array operations with types
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map((n: number) => n * 2);
console.log("\nOriginal numbers:", numbers);
console.log("Doubled numbers:", doubled);

// Object operations
const products: Product[] = [
    { id: 1, name: "Laptop", price: 999.99, inStock: true },
    { id: 2, name: "Mouse", price: 29.99, inStock: true },
    { id: 3, name: "Keyboard", price: 79.99, inStock: false }
];

console.log("\nProducts in stock:");
const inStockProducts = products.filter(p => p.inStock);
inStockProducts.forEach(p => {
    console.log(`- ${p.name}: $${p.price}`);
});

// Using generics
const firstProduct = getFirstElement(products);
console.log("\nFirst product:", firstProduct?.name);

// Type inference
const sum = numbers.reduce((a, b) => a + b, 0);
console.log("\nSum of numbers:", sum);
console.log("Average:", sum / numbers.length);

console.log("\n✨ TypeScript execution completed!");

