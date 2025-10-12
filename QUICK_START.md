# 🚀 Quick Start Guide

## Get Started in 3 Steps!

### 1️⃣ Start the App

```bash
cd /Users/mbvrk/Desktop/iTypeScriptor
npm start
```

Or use the quick start script:
```bash
./start.sh
```

### 2️⃣ Write Some Code

The app opens with sample TypeScript code. Try modifying it or write your own!

**Quick example:**
```typescript
const greeting = (name: string) => `Hello, ${name}!`;
console.log(greeting("World"));

const numbers = [1, 2, 3, 4, 5];
console.log("Sum:", numbers.reduce((a, b) => a + b));
```

### 3️⃣ Run Your Code

Click the **Run** button or press `Cmd/Ctrl + Enter`

That's it! 🎉

---

## Essential Features

### 🎨 Monaco Editor
- **IntelliSense**: Start typing and see suggestions
- **Syntax Highlighting**: Beautiful color-coded syntax
- **Multi-cursor**: Hold Cmd/Ctrl and click to add cursors
- **Find & Replace**: Press Cmd/Ctrl + F

### 📐 Resize Panels
Drag the vertical divider between editor and console to adjust sizes.

### 🎯 Language Switching
Click the **TypeScript** or **JavaScript** button to switch languages.

### 🔍 Format Code
Click **Format** button or press `Shift + Alt + F` to auto-format your code.

---

## Keyboard Shortcuts Cheat Sheet

| Action | Shortcut |
|--------|----------|
| Run code | `Cmd/Ctrl + Enter` |
| Format code | `Shift + Alt + F` |
| Find | `Cmd/Ctrl + F` |
| Replace | `Cmd/Ctrl + H` |
| Multi-cursor | `Cmd/Ctrl + D` |
| Comment line | `Cmd/Ctrl + /` |
| Move line up/down | `Alt + ↑/↓` |

---

## Tips & Tricks

### 💡 Tip 1: Use IntelliSense
Start typing and Monaco will suggest completions. Press `Tab` or `Enter` to accept.

### 💡 Tip 2: Multi-cursor Editing
Press `Cmd/Ctrl + D` repeatedly to select multiple occurrences of the same word, then type to edit them all at once!

### 💡 Tip 3: Format Your Code
Messy code? Press `Shift + Alt + F` and Monaco will beautify it instantly.

### 💡 Tip 4: Use the Minimap
See the minimap on the right side of the editor? Click on it to quickly navigate through your code.

### 💡 Tip 5: Resize for Your Workflow
Prefer more console space? Drag the divider to the left. Need more editor space? Drag it to the right.

---

## Common Tasks

### Task 1: Test an Algorithm
```typescript
function fibonacci(n: number): number[] {
    const fib: number[] = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
}

console.log("Fibonacci:", fibonacci(10));
```

Click **Run** to see the output!

### Task 2: Debug with Console
```javascript
const data = [1, 2, 3, 4, 5];

console.log("Original:", data);
console.log("Doubled:", data.map(x => x * 2));
console.log("Filtered:", data.filter(x => x > 2));

console.table(data); // Shows as table
```

### Task 3: Work with Objects
```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

const users: User[] = [
    { name: "Alice", age: 28, email: "alice@example.com" },
    { name: "Bob", age: 35, email: "bob@example.com" }
];

console.log("Users:", users);
console.log("Names:", users.map(u => u.name));
```

---

## Need Help?

### 📖 Documentation
- **README.md** - Full documentation
- **MONACO_UPGRADE.md** - Monaco Editor features
- **USAGE.md** - Detailed usage guide
- **CHANGELOG.md** - Version history

### 🔧 Troubleshooting

**App won't start?**
```bash
npm install
npm run build
npm start
```

**Editor looks wrong?**
```bash
rm -rf node_modules
npm install
npm start
```

**Code won't run?**
- Check for syntax errors (Monaco will show red squiggles)
- Make sure you clicked **Run** or pressed `Cmd/Ctrl + Enter`
- Check the console for error messages

---

## What's Next?

### Explore the Samples
Check out the `samples/` folder for more examples:
- `typescript-example.ts` - TypeScript features
- `javascript-example.js` - JavaScript examples
- `algorithms.ts` - Common algorithms

### Customize Your Experience
- Adjust panel sizes to your liking
- Try both TypeScript and JavaScript
- Experiment with Monaco's features

### Build Something Cool!
Now that you know the basics, start building:
- Test algorithms
- Practice TypeScript
- Try new JavaScript features
- Learn by doing!

---

## 🎉 Enjoy Coding!

You now have a powerful code editor with:
- ✨ Beautiful dark mode UI
- 🚀 Monaco Editor (from VS Code)
- 💡 IntelliSense & syntax highlighting
- 📐 Resizable panels
- ⚡ Instant code execution

**Happy coding!** 🎨

---

*iTypeScriptor - Your beautiful TypeScript/JavaScript playground*

