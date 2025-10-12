// Algorithms & Data Structures Examples in TypeScript

console.log("=== Algorithms Demo ===\n");

// 1. Fibonacci Sequence
function fibonacci(n: number): number[] {
    const fib: number[] = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, n);
}

console.log("--- Fibonacci Sequence ---");
console.log("First 10 numbers:", fibonacci(10));

// 2. Prime Numbers
function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function getPrimes(limit: number): number[] {
    const primes: number[] = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}

console.log("\n--- Prime Numbers ---");
console.log("Primes up to 30:", getPrimes(30));

// 3. Factorial
function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log("\n--- Factorial ---");
console.log("5! =", factorial(5));
console.log("10! =", factorial(10));

// 4. Binary Search
function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

console.log("\n--- Binary Search ---");
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Array:", sortedArray);
console.log("Find 7:", binarySearch(sortedArray, 7));
console.log("Find 13:", binarySearch(sortedArray, 13));
console.log("Find 20:", binarySearch(sortedArray, 20));

// 5. Bubble Sort
function bubbleSort(arr: number[]): number[] {
    const sorted = [...arr];
    const n = sorted.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }
    return sorted;
}

console.log("\n--- Bubble Sort ---");
const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log("Before:", unsorted);
console.log("After:", bubbleSort(unsorted));

// 6. Palindrome Check
function isPalindrome(str: string): boolean {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

console.log("\n--- Palindrome Check ---");
console.log("'racecar':", isPalindrome("racecar"));
console.log("'hello':", isPalindrome("hello"));
console.log("'A man a plan a canal Panama':", isPalindrome("A man a plan a canal Panama"));

// 7. Array Statistics
interface Stats {
    min: number;
    max: number;
    mean: number;
    median: number;
}

function getStats(numbers: number[]): Stats {
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const median = sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];
    
    return {
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        mean: sum / numbers.length,
        median
    };
}

console.log("\n--- Statistics ---");
const data = [23, 45, 12, 67, 34, 89, 23, 56, 78, 90];
console.log("Data:", data);
console.log("Stats:", getStats(data));

console.log("\n✨ Algorithms demo completed!");

