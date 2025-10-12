# iTypeScriptor Usage Guide

## Getting Started

### 1. First Launch

After installing dependencies and building the project, launch the app:

```bash
./start.sh
```

Or:

```bash
npm start
```

### 2. Interface Overview

The app interface consists of four main sections:

#### 🎨 Title Bar
- **Window Controls**: Minimize, Maximize, and Close buttons
- **App Title**: Shows "iTypeScriptor" with logo

#### 🛠️ Toolbar
- **Language Selector**: Switch between TypeScript and JavaScript
- **Clear Button**: Clear the editor content
- **Run Button**: Execute your code (or use `Cmd/Ctrl + Enter`)

#### 📝 Editor Panel (Left Side)
- **Line Numbers**: Automatically updated as you type
- **Code Editor**: Write your TypeScript or JavaScript code
- **Cursor Position**: Line and column indicators at the top

#### 📺 Console Panel (Right Side)
- **Output Display**: See console.log() results
- **Error Messages**: View compilation and runtime errors
- **Clear Console**: Remove all output with the trash icon

#### 📊 Status Bar
- **Status Indicator**: Shows current state (Ready, Executing, etc.)
- **Language Display**: Current language mode
- **Character Count**: Total characters in your code

## Features

### Code Execution

1. **TypeScript Code**:
   - Automatically compiled to JavaScript
   - Full type checking
   - Modern ES6+ features supported

2. **JavaScript Code**:
   - Direct execution
   - ES6+ syntax supported
   - No compilation needed

### Keyboard Shortcuts

- **`Cmd/Ctrl + Enter`** - Run code
- **`Tab`** - Insert 4 spaces (proper indentation)

### Console API Support

The app supports most console methods:

```javascript
console.log("Hello, World!");        // Standard output
console.error("Error message");      // Error output (red)
console.warn("Warning message");     // Warning output (yellow)
console.info("Info message");        // Info output with icon
console.debug("Debug message");      // Debug output with icon
console.table({ a: 1, b: 2 });      // Table format
console.dir(object);                 // Object inspection
```

## Example Workflows

### Workflow 1: Quick Calculation

```typescript
// Switch to TypeScript
const numbers: number[] = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);
```

Press **Run** or **`Cmd/Ctrl + Enter`**

### Workflow 2: Test an Algorithm

```typescript
function isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

for (let i = 1; i <= 20; i++) {
    if (isPrime(i)) {
        console.log(`${i} is prime`);
    }
}
```

### Workflow 3: Object Manipulation

```javascript
const users = [
    { name: "Alice", age: 28 },
    { name: "Bob", age: 35 },
    { name: "Charlie", age: 23 }
];

const adults = users.filter(u => u.age >= 25);
console.log("Adults:", adults);

const names = users.map(u => u.name);
console.log("Names:", names);
```

## Sample Files

The `samples/` folder contains ready-to-use examples:

### 1. `typescript-example.ts`
Demonstrates TypeScript features:
- Interfaces
- Type annotations
- Generic functions
- Type inference

### 2. `javascript-example.js`
Shows modern JavaScript:
- Arrow functions
- Array methods
- Object destructuring
- Classes

### 3. `algorithms.ts`
Common algorithms:
- Fibonacci sequence
- Prime numbers
- Factorial
- Binary search
- Bubble sort
- Palindrome check
- Statistics calculations

**To use a sample:**
1. Open the sample file in a text editor
2. Copy the code
3. Paste into iTypeScriptor
4. Click **Run**

## Tips & Tricks

### 1. Line Numbers
Line numbers update automatically as you type. Use them for debugging and reference.

### 2. Error Messages
- **Compilation errors** appear in red before execution
- **Runtime errors** show the error type and message
- **Stack traces** help you debug issues

### 3. Performance
- Code execution has a **5-second timeout** to prevent infinite loops
- Memory is managed automatically
- Each execution runs in an isolated environment

### 4. Code Organization
- Use comments liberally (`//` or `/* */`)
- Format your code with proper indentation (Tab key)
- Break complex logic into functions

### 5. Console Output
- Objects are automatically formatted as JSON
- Arrays display nicely
- Multiple values in one log statement work perfectly

### 6. Clearing
- **Clear Editor**: Remove all code (with confirmation)
- **Clear Console**: Remove output but keep code
- Both help you start fresh quickly

## Limitations

1. **No File I/O**: Cannot read/write files (security restriction)
2. **No Network**: Cannot make HTTP requests
3. **No Node Modules**: Cannot import external packages
4. **Timeout**: Code must complete within 5 seconds
5. **Browser APIs**: No DOM, window, or document objects

## Troubleshooting

### App Won't Start
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build

# Try starting again
npm start
```

### TypeScript Errors
- Check your syntax
- Ensure type annotations are correct
- Look at the console for specific error messages

### Code Not Running
- Verify you clicked **Run** or pressed **Cmd/Ctrl + Enter**
- Check for syntax errors (shown in console)
- Make sure code is not empty

### Console Not Showing Output
- Check if you're using `console.log()`
- Clear console and try again
- Restart the app if needed

## Advanced Usage

### Type Definitions

You can use TypeScript interfaces and types:

```typescript
type Point = { x: number; y: number };

interface Shape {
    area(): number;
}

class Circle implements Shape {
    constructor(private radius: number) {}
    
    area(): number {
        return Math.PI * this.radius ** 2;
    }
}

const circle = new Circle(5);
console.log("Area:", circle.area());
```

### Async Code

Timeouts work as expected:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("After 1 second");
}, 1000);

setTimeout(() => {
    console.log("After 2 seconds");
}, 2000);

console.log("End");
// Output order: Start, End, After 1 second, After 2 seconds
```

### Complex Data Structures

```typescript
// Maps
const map = new Map<string, number>();
map.set("a", 1);
map.set("b", 2);
console.log("Map:", Array.from(map.entries()));

// Sets
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log("Set:", Array.from(set));

// Nested structures
const data = {
    users: [
        { id: 1, posts: ["post1", "post2"] },
        { id: 2, posts: ["post3"] }
    ]
};
console.log("Data:", data);
```

## Getting Help

If you encounter issues:

1. Check this guide
2. Look at the sample files
3. Read error messages carefully
4. Try simplifying your code
5. Restart the app

## Enjoy Coding! 🚀

iTypeScriptor is designed to make TypeScript and JavaScript development fun and beautiful. Experiment, learn, and create amazing code!

