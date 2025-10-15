// UI Elements
const consoleOutput = document.getElementById('console-output');
const runBtn = document.getElementById('run-btn');
const clearBtn = document.getElementById('clear-btn');
const formatBtn = document.getElementById('format-btn');
const clearConsoleBtn = document.getElementById('clear-console-btn');
// Line/column display removed with status bar
const lineNumberDisplay = null; // document.getElementById('line-number');
const colNumberDisplay = null; // document.getElementById('col-number');
// Status bar elements removed for cleaner UI
const statusText = null; // document.getElementById('status-text');
const statusDot = null; // document.getElementById('status-dot');
const languageDisplay = null; // document.getElementById('language-display');
const charCount = document.getElementById('char-count');
const editorTitle = document.getElementById('editor-title');
const langBtns = document.querySelectorAll('.lang-btn-compact');
const minimizeBtn = document.getElementById('minimize-btn');
const maximizeBtn = document.getElementById('maximize-btn');
const closeBtn = document.getElementById('close-btn');
const resizer = document.getElementById('resizer');
const editorPanel = document.querySelector('.editor-panel');
const consolePanel = document.querySelector('.console-panel');
const themeToggle = document.getElementById('theme-toggle');

// State
let currentLanguage = 'typescript';
let isExecuting = false;
let editor;
let currentTheme = 'dark'; // 'dark' or 'light'

// Sample code
const sampleTypeScriptCode = `// TypeScript Example - Elegant & Beautiful ✨
interface Person {
    name: string;
    age: number;
    email?: string;
}

function greet(person: Person): string {
    return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}

const user: Person = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"
};

console.log(greet(user));

// Array operations with modern syntax
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Object destructuring
const { name, age } = user;
console.log(\`\${name} is \${age} years old\`);`;

const sampleJavaScriptCode = `// JavaScript Example - Beautiful Code
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));

// Modern array operations
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
const average = sum / numbers.length;

console.log("Sum:", sum);
console.log("Average:", average);

// Object operations
const person = {
    name: "Bob",
    age: 25,
    city: "New York",
    hobbies: ["coding", "reading", "gaming"]
};

console.log("Person:", person);
console.log("Hobbies:", person.hobbies.join(", "));`;

// Elegant Beautiful Monaco Themes
function defineCustomThemes() {
    // Elegant Dark Theme - Premium Beautiful
    monaco.editor.defineTheme('elegant-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', foreground: 'FAF5FF' },
            { token: 'comment', foreground: '9F9FA3', fontStyle: 'italic' },
            { token: 'comment.doc', foreground: 'A78BFA', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'C4B5FD', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: 'A78BFA', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: 'C4B5FD' },
            { token: 'string', foreground: '34D399' },
            { token: 'string.escape', foreground: 'A78BFA' },
            { token: 'string.template', foreground: '34D399' },
            { token: 'number', foreground: '818CF8' },
            { token: 'regexp', foreground: '34D399' },
            { token: 'type', foreground: 'F0ABFC' },
            { token: 'type.identifier', foreground: 'F0ABFC' },
            { token: 'class', foreground: 'C4B5FD' },
            { token: 'class.identifier', foreground: 'C4B5FD' },
            { token: 'interface', foreground: 'F0ABFC' },
            { token: 'function', foreground: 'A5B4FC' },
            { token: 'function.call', foreground: 'A5B4FC' },
            { token: 'variable', foreground: 'FAF5FF' },
            { token: 'variable.parameter', foreground: 'E9D5FF' },
            { token: 'variable.predefined', foreground: 'F0ABFC' },
            { token: 'constant', foreground: 'DDD6FE', fontStyle: 'italic' },
            { token: 'operator', foreground: 'C4B5FD' },
            { token: 'delimiter', foreground: 'A78BFA' },
            { token: 'delimiter.bracket', foreground: 'C4B5FD' },
            { token: 'delimiter.parenthesis', foreground: 'C4B5FD' },
            { token: 'delimiter.square', foreground: 'C4B5FD' },
            { token: 'tag', foreground: 'F0ABFC' },
            { token: 'attribute.name', foreground: 'A78BFA' },
            { token: 'attribute.value', foreground: '34D399' },
            { token: 'meta', foreground: 'A78BFA' },
            { token: 'annotation', foreground: 'A78BFA' },
        ],
        colors: {
            'editor.background': '#0a0118',
            'editor.foreground': '#FAF5FF',
            'editorLineNumber.foreground': '#6d28d9',
            'editorLineNumber.activeForeground': '#A78BFA',
            'editor.lineHighlightBackground': '#1a0f2e',
            'editor.selectionBackground': '#A78BFA30',
            'editor.inactiveSelectionBackground': '#A78BFA15',
            'editorCursor.foreground': '#F0ABFC',
            'editorWhitespace.foreground': '#2a1d4a',
            'editorIndentGuide.background': '#2a1d4a',
            'editorIndentGuide.activeBackground': '#3a2d5a',
            'editor.selectionHighlightBackground': '#A78BFA20',
            'editorBracketMatch.background': '#A78BFA30',
            'editorBracketMatch.border': '#A78BFA',
            'scrollbarSlider.background': '#3a2d5a60',
            'scrollbarSlider.hoverBackground': '#A78BFA60',
            'scrollbarSlider.activeBackground': '#A78BFA80',
            'minimap.background': '#0a0118',
            'editorGutter.background': '#0a0118',
            'editorWidget.background': '#1a0f2e',
            'editorSuggestWidget.background': '#1a0f2e',
            'editorSuggestWidget.selectedBackground': '#2a1d4a',
            'editorHoverWidget.background': '#1a0f2e',
            'editorHoverWidget.border': '#3a2d5a',
        }
    });

    // Elegant Light Theme - Premium Beautiful
    monaco.editor.defineTheme('elegant-light', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: '', foreground: '1e1b2e' },
            { token: 'comment', foreground: '9F9FA3', fontStyle: 'italic' },
            { token: 'comment.doc', foreground: '7c3aed', fontStyle: 'italic' },
            { token: 'keyword', foreground: '7c3aed', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: '6d28d9', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: '7c3aed' },
            { token: 'string', foreground: '10b981' },
            { token: 'string.escape', foreground: '7c3aed' },
            { token: 'string.template', foreground: '10b981' },
            { token: 'number', foreground: '6366f1' },
            { token: 'regexp', foreground: '10b981' },
            { token: 'type', foreground: 'd946ef' },
            { token: 'type.identifier', foreground: 'd946ef' },
            { token: 'class', foreground: '7c3aed' },
            { token: 'class.identifier', foreground: '7c3aed' },
            { token: 'interface', foreground: 'd946ef' },
            { token: 'function', foreground: '6366f1' },
            { token: 'function.call', foreground: '6366f1' },
            { token: 'variable', foreground: '1e1b2e' },
            { token: 'variable.parameter', foreground: '4a4560' },
            { token: 'variable.predefined', foreground: 'd946ef' },
            { token: 'constant', foreground: '7c3aed', fontStyle: 'italic' },
            { token: 'operator', foreground: '7c3aed' },
            { token: 'delimiter', foreground: 'a78bfa' },
            { token: 'delimiter.bracket', foreground: 'a78bfa' },
            { token: 'delimiter.parenthesis', foreground: 'a78bfa' },
            { token: 'delimiter.square', foreground: 'a78bfa' },
            { token: 'tag', foreground: 'd946ef' },
            { token: 'attribute.name', foreground: '7c3aed' },
            { token: 'attribute.value', foreground: '10b981' },
            { token: 'meta', foreground: 'a78bfa' },
            { token: 'annotation', foreground: 'a78bfa' },
        ],
        colors: {
            'editor.background': '#FFFFFF',
            'editor.foreground': '#1e1b2e',
            'editorLineNumber.foreground': '#a78bfa',
            'editorLineNumber.activeForeground': '#7c3aed',
            'editor.lineHighlightBackground': '#faf5ff',
            'editor.selectionBackground': '#ede9fe80',
            'editor.inactiveSelectionBackground': '#ede9fe40',
            'editorCursor.foreground': '#d946ef',
            'editorWhitespace.foreground': '#f3e8ff',
            'editorIndentGuide.background': '#f3e8ff',
            'editorIndentGuide.activeBackground': '#ede9fe',
            'editor.selectionHighlightBackground': '#ede9fe60',
            'editorBracketMatch.background': '#ede9fe',
            'editorBracketMatch.border': '#7c3aed',
            'scrollbarSlider.background': '#ede9fe80',
            'scrollbarSlider.hoverBackground': '#ddd6fe',
            'scrollbarSlider.activeBackground': '#c4b5fd',
            'minimap.background': '#FAFAFA',
            'editorGutter.background': '#FFFFFF',
            'editorWidget.background': '#FFFFFF',
            'editorSuggestWidget.background': '#FFFFFF',
            'editorSuggestWidget.selectedBackground': '#f5f0ff',
            'editorHoverWidget.background': '#FFFFFF',
            'editorHoverWidget.border': '#ede9fe',
        }
    });

    // Midnight Blue Theme - Deep Ocean Vibes
    monaco.editor.defineTheme('midnight-blue', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', foreground: 'E1E8ED' },
            { token: 'comment', foreground: '5A6C7D', fontStyle: 'italic' },
            { token: 'comment.doc', foreground: '4A90E2', fontStyle: 'italic' },
            { token: 'keyword', foreground: '7BB3F0', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: '4A90E2', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: '7BB3F0' },
            { token: 'string', foreground: '50C878' },
            { token: 'string.escape', foreground: '4A90E2' },
            { token: 'string.template', foreground: '50C878' },
            { token: 'number', foreground: '87CEEB' },
            { token: 'regexp', foreground: '50C878' },
            { token: 'type', foreground: 'FFB6C1' },
            { token: 'type.identifier', foreground: 'FFB6C1' },
            { token: 'class', foreground: '7BB3F0' },
            { token: 'class.identifier', foreground: '7BB3F0' },
            { token: 'interface', foreground: 'FFB6C1' },
            { token: 'function', foreground: '98D8E8' },
            { token: 'function.call', foreground: '98D8E8' },
            { token: 'variable', foreground: 'E1E8ED' },
            { token: 'variable.parameter', foreground: 'B8D4F0' },
            { token: 'variable.predefined', foreground: 'FFB6C1' },
            { token: 'constant', foreground: 'A8D8EA', fontStyle: 'italic' },
            { token: 'operator', foreground: '7BB3F0' },
            { token: 'delimiter', foreground: '4A90E2' },
            { token: 'delimiter.bracket', foreground: '7BB3F0' },
            { token: 'delimiter.parenthesis', foreground: '7BB3F0' },
            { token: 'delimiter.square', foreground: '7BB3F0' },
            { token: 'tag', foreground: 'FFB6C1' },
            { token: 'attribute.name', foreground: '4A90E2' },
            { token: 'attribute.value', foreground: '50C878' },
            { token: 'meta', foreground: '4A90E2' },
            { token: 'annotation', foreground: '4A90E2' },
        ],
        colors: {
            'editor.background': '#0B1426',
            'editor.foreground': '#E1E8ED',
            'editorLineNumber.foreground': '#4A90E2',
            'editorLineNumber.activeForeground': '#7BB3F0',
            'editor.lineHighlightBackground': '#1A2332',
            'editor.selectionBackground': '#4A90E230',
            'editor.inactiveSelectionBackground': '#4A90E215',
            'editorCursor.foreground': '#FFB6C1',
            'editorWhitespace.foreground': '#2A3441',
            'editorIndentGuide.background': '#2A3441',
            'editorIndentGuide.activeBackground': '#3A4451',
            'editor.selectionHighlightBackground': '#4A90E220',
            'editorBracketMatch.background': '#4A90E230',
            'editorBracketMatch.border': '#4A90E2',
            'scrollbarSlider.background': '#3A445160',
            'scrollbarSlider.hoverBackground': '#4A90E260',
            'scrollbarSlider.activeBackground': '#4A90E280',
            'minimap.background': '#0B1426',
            'editorGutter.background': '#0B1426',
            'editorWidget.background': '#1A2332',
            'editorSuggestWidget.background': '#1A2332',
            'editorSuggestWidget.selectedBackground': '#2A3441',
            'editorHoverWidget.background': '#1A2332',
            'editorHoverWidget.border': '#3A4451',
        }
    });

    // Cyberpunk Theme - Neon Future
    monaco.editor.defineTheme('cyberpunk', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', foreground: '00FF41' },
            { token: 'comment', foreground: '7A7A7A', fontStyle: 'italic' },
            { token: 'comment.doc', foreground: 'FF0080', fontStyle: 'italic' },
            { token: 'keyword', foreground: '00FFFF', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: 'FF0080', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: '00FFFF' },
            { token: 'string', foreground: 'FFFF00' },
            { token: 'string.escape', foreground: 'FF0080' },
            { token: 'string.template', foreground: 'FFFF00' },
            { token: 'number', foreground: 'FF8000' },
            { token: 'regexp', foreground: 'FFFF00' },
            { token: 'type', foreground: 'FF00FF' },
            { token: 'type.identifier', foreground: 'FF00FF' },
            { token: 'class', foreground: '00FFFF' },
            { token: 'class.identifier', foreground: '00FFFF' },
            { token: 'interface', foreground: 'FF00FF' },
            { token: 'function', foreground: '00FF80' },
            { token: 'function.call', foreground: '00FF80' },
            { token: 'variable', foreground: '00FF41' },
            { token: 'variable.parameter', foreground: '80FF80' },
            { token: 'variable.predefined', foreground: 'FF00FF' },
            { token: 'constant', foreground: '00FF80', fontStyle: 'italic' },
            { token: 'operator', foreground: '00FFFF' },
            { token: 'delimiter', foreground: 'FF0080' },
            { token: 'delimiter.bracket', foreground: '00FFFF' },
            { token: 'delimiter.parenthesis', foreground: '00FFFF' },
            { token: 'delimiter.square', foreground: '00FFFF' },
            { token: 'tag', foreground: 'FF00FF' },
            { token: 'attribute.name', foreground: 'FF0080' },
            { token: 'attribute.value', foreground: 'FFFF00' },
            { token: 'meta', foreground: 'FF0080' },
            { token: 'annotation', foreground: 'FF0080' },
        ],
        colors: {
            'editor.background': '#0D1117',
            'editor.foreground': '#00FF41',
            'editorLineNumber.foreground': '#FF0080',
            'editorLineNumber.activeForeground': '#00FFFF',
            'editor.lineHighlightBackground': '#161B22',
            'editor.selectionBackground': '#FF008030',
            'editor.inactiveSelectionBackground': '#FF008015',
            'editorCursor.foreground': '#00FFFF',
            'editorWhitespace.foreground': '#21262D',
            'editorIndentGuide.background': '#21262D',
            'editorIndentGuide.activeBackground': '#30363D',
            'editor.selectionHighlightBackground': '#FF008020',
            'editorBracketMatch.background': '#FF008030',
            'editorBracketMatch.border': '#FF0080',
            'scrollbarSlider.background': '#30363D60',
            'scrollbarSlider.hoverBackground': '#FF008060',
            'scrollbarSlider.activeBackground': '#FF008080',
            'minimap.background': '#0D1117',
            'editorGutter.background': '#0D1117',
            'editorWidget.background': '#161B22',
            'editorSuggestWidget.background': '#161B22',
            'editorSuggestWidget.selectedBackground': '#21262D',
            'editorHoverWidget.background': '#161B22',
            'editorHoverWidget.border': '#30363D',
        }
    });

    // Forest Dark Theme - Nature Vibes
    monaco.editor.defineTheme('forest-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', foreground: 'E8F5E8' },
            { token: 'comment', foreground: '6B8E6B', fontStyle: 'italic' },
            { token: 'comment.doc', foreground: '4CAF50', fontStyle: 'italic' },
            { token: 'keyword', foreground: '81C784', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: '4CAF50', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: '81C784' },
            { token: 'string', foreground: 'FFD54F' },
            { token: 'string.escape', foreground: '4CAF50' },
            { token: 'string.template', foreground: 'FFD54F' },
            { token: 'number', foreground: 'A5D6A7' },
            { token: 'regexp', foreground: 'FFD54F' },
            { token: 'type', foreground: 'FFAB91' },
            { token: 'type.identifier', foreground: 'FFAB91' },
            { token: 'class', foreground: '81C784' },
            { token: 'class.identifier', foreground: '81C784' },
            { token: 'interface', foreground: 'FFAB91' },
            { token: 'function', foreground: '90EE90' },
            { token: 'function.call', foreground: '90EE90' },
            { token: 'variable', foreground: 'E8F5E8' },
            { token: 'variable.parameter', foreground: 'C8E6C9' },
            { token: 'variable.predefined', foreground: 'FFAB91' },
            { token: 'constant', foreground: 'A5D6A7', fontStyle: 'italic' },
            { token: 'operator', foreground: '81C784' },
            { token: 'delimiter', foreground: '4CAF50' },
            { token: 'delimiter.bracket', foreground: '81C784' },
            { token: 'delimiter.parenthesis', foreground: '81C784' },
            { token: 'delimiter.square', foreground: '81C784' },
            { token: 'tag', foreground: 'FFAB91' },
            { token: 'attribute.name', foreground: '4CAF50' },
            { token: 'attribute.value', foreground: 'FFD54F' },
            { token: 'meta', foreground: '4CAF50' },
            { token: 'annotation', foreground: '4CAF50' },
        ],
        colors: {
            'editor.background': '#1B2B1B',
            'editor.foreground': '#E8F5E8',
            'editorLineNumber.foreground': '#4CAF50',
            'editorLineNumber.activeForeground': '#81C784',
            'editor.lineHighlightBackground': '#2B3B2B',
            'editor.selectionBackground': '#4CAF5030',
            'editor.inactiveSelectionBackground': '#4CAF5015',
            'editorCursor.foreground': '#FFAB91',
            'editorWhitespace.foreground': '#3B4B3B',
            'editorIndentGuide.background': '#3B4B3B',
            'editorIndentGuide.activeBackground': '#4B5B4B',
            'editor.selectionHighlightBackground': '#4CAF5020',
            'editorBracketMatch.background': '#4CAF5030',
            'editorBracketMatch.border': '#4CAF50',
            'scrollbarSlider.background': '#4B5B4B60',
            'scrollbarSlider.hoverBackground': '#4CAF5060',
            'scrollbarSlider.activeBackground': '#4CAF5080',
            'minimap.background': '#1B2B1B',
            'editorGutter.background': '#1B2B1B',
            'editorWidget.background': '#2B3B2B',
            'editorSuggestWidget.background': '#2B3B2B',
            'editorSuggestWidget.selectedBackground': '#3B4B3B',
            'editorHoverWidget.background': '#2B3B2B',
            'editorHoverWidget.border': '#4B5B4B',
        }
    });

    // Ocean Breeze Light Theme - Calm Blue
    monaco.editor.defineTheme('ocean-breeze', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: '', foreground: '2C3E50' },
            { token: 'comment', foreground: '7F8C8D', fontStyle: 'italic' },
            { token: 'comment.doc', foreground: '3498DB', fontStyle: 'italic' },
            { token: 'keyword', foreground: '2980B9', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: '1F4E79', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: '2980B9' },
            { token: 'string', foreground: '27AE60' },
            { token: 'string.escape', foreground: '3498DB' },
            { token: 'string.template', foreground: '27AE60' },
            { token: 'number', foreground: '8E44AD' },
            { token: 'regexp', foreground: '27AE60' },
            { token: 'type', foreground: 'E74C3C' },
            { token: 'type.identifier', foreground: 'E74C3C' },
            { token: 'class', foreground: '2980B9' },
            { token: 'class.identifier', foreground: '2980B9' },
            { token: 'interface', foreground: 'E74C3C' },
            { token: 'function', foreground: '16A085' },
            { token: 'function.call', foreground: '16A085' },
            { token: 'variable', foreground: '2C3E50' },
            { token: 'variable.parameter', foreground: '34495E' },
            { token: 'variable.predefined', foreground: 'E74C3C' },
            { token: 'constant', foreground: '2980B9', fontStyle: 'italic' },
            { token: 'operator', foreground: '2980B9' },
            { token: 'delimiter', foreground: '3498DB' },
            { token: 'delimiter.bracket', foreground: '2980B9' },
            { token: 'delimiter.parenthesis', foreground: '2980B9' },
            { token: 'delimiter.square', foreground: '2980B9' },
            { token: 'tag', foreground: 'E74C3C' },
            { token: 'attribute.name', foreground: '3498DB' },
            { token: 'attribute.value', foreground: '27AE60' },
            { token: 'meta', foreground: '3498DB' },
            { token: 'annotation', foreground: '3498DB' },
        ],
        colors: {
            'editor.background': '#F8FCFD',
            'editor.foreground': '#2C3E50',
            'editorLineNumber.foreground': '#3498DB',
            'editorLineNumber.activeForeground': '#2980B9',
            'editor.lineHighlightBackground': '#EBF3FD',
            'editor.selectionBackground': '#3498DB40',
            'editor.inactiveSelectionBackground': '#3498DB20',
            'editorCursor.foreground': '#E74C3C',
            'editorWhitespace.foreground': '#D5DBDB',
            'editorIndentGuide.background': '#D5DBDB',
            'editorIndentGuide.activeBackground': '#AEB6B6',
            'editor.selectionHighlightBackground': '#3498DB30',
            'editorBracketMatch.background': '#3498DB40',
            'editorBracketMatch.border': '#2980B9',
            'scrollbarSlider.background': '#D5DBDB80',
            'scrollbarSlider.hoverBackground': '#AEB6B6',
            'scrollbarSlider.activeBackground': '#85C1E9',
            'minimap.background': '#F8FCFD',
            'editorGutter.background': '#F8FCFD',
            'editorWidget.background': '#FFFFFF',
            'editorSuggestWidget.background': '#FFFFFF',
            'editorSuggestWidget.selectedBackground': '#EBF3FD',
            'editorHoverWidget.background': '#FFFFFF',
            'editorHoverWidget.border': '#D5DBDB',
        }
    });

    // Sunset Warm Light Theme - Cozy Orange
    monaco.editor.defineTheme('sunset-warm', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: '', foreground: '2D1B1B' },
            { token: 'comment', foreground: '8B6F6F', fontStyle: 'italic' },
            { token: 'comment.doc', foreground: 'FF6B35', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'E74C3C', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: 'C0392B', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: 'E74C3C' },
            { token: 'string', foreground: '27AE60' },
            { token: 'string.escape', foreground: 'FF6B35' },
            { token: 'string.template', foreground: '27AE60' },
            { token: 'number', foreground: '8E44AD' },
            { token: 'regexp', foreground: '27AE60' },
            { token: 'type', foreground: 'D35400' },
            { token: 'type.identifier', foreground: 'D35400' },
            { token: 'class', foreground: 'E74C3C' },
            { token: 'class.identifier', foreground: 'E74C3C' },
            { token: 'interface', foreground: 'D35400' },
            { token: 'function', foreground: 'E67E22' },
            { token: 'function.call', foreground: 'E67E22' },
            { token: 'variable', foreground: '2D1B1B' },
            { token: 'variable.parameter', foreground: '4A2C2C' },
            { token: 'variable.predefined', foreground: 'D35400' },
            { token: 'constant', foreground: 'E74C3C', fontStyle: 'italic' },
            { token: 'operator', foreground: 'E74C3C' },
            { token: 'delimiter', foreground: 'FF6B35' },
            { token: 'delimiter.bracket', foreground: 'E74C3C' },
            { token: 'delimiter.parenthesis', foreground: 'E74C3C' },
            { token: 'delimiter.square', foreground: 'E74C3C' },
            { token: 'tag', foreground: 'D35400' },
            { token: 'attribute.name', foreground: 'FF6B35' },
            { token: 'attribute.value', foreground: '27AE60' },
            { token: 'meta', foreground: 'FF6B35' },
            { token: 'annotation', foreground: 'FF6B35' },
        ],
        colors: {
            'editor.background': '#FFF8F5',
            'editor.foreground': '#2D1B1B',
            'editorLineNumber.foreground': '#FF6B35',
            'editorLineNumber.activeForeground': '#E74C3C',
            'editor.lineHighlightBackground': '#FFF0E6',
            'editor.selectionBackground': '#FF6B3540',
            'editor.inactiveSelectionBackground': '#FF6B3520',
            'editorCursor.foreground': '#D35400',
            'editorWhitespace.foreground': '#F5E6E0',
            'editorIndentGuide.background': '#F5E6E0',
            'editorIndentGuide.activeBackground': '#E8D5CC',
            'editor.selectionHighlightBackground': '#FF6B3530',
            'editorBracketMatch.background': '#FF6B3540',
            'editorBracketMatch.border': '#E74C3C',
            'scrollbarSlider.background': '#F5E6E080',
            'scrollbarSlider.hoverBackground': '#E8D5CC',
            'scrollbarSlider.activeBackground': '#FFB366',
            'minimap.background': '#FFF8F5',
            'editorGutter.background': '#FFF8F5',
            'editorWidget.background': '#FFFFFF',
            'editorSuggestWidget.background': '#FFFFFF',
            'editorSuggestWidget.selectedBackground': '#FFF0E6',
            'editorHoverWidget.background': '#FFFFFF',
            'editorHoverWidget.border': '#F5E6E0',
        }
    });

    // Mint Fresh Light Theme - Cool Green
    monaco.editor.defineTheme('mint-fresh', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: '', foreground: '1B2B1B' },
            { token: 'comment', foreground: '6B8E6B', fontStyle: 'italic' },
            { token: 'comment.doc', foreground: '2ECC71', fontStyle: 'italic' },
            { token: 'keyword', foreground: '27AE60', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: '1E8449', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: '27AE60' },
            { token: 'string', foreground: 'E67E22' },
            { token: 'string.escape', foreground: '2ECC71' },
            { token: 'string.template', foreground: 'E67E22' },
            { token: 'number', foreground: '8E44AD' },
            { token: 'regexp', foreground: 'E67E22' },
            { token: 'type', foreground: 'E74C3C' },
            { token: 'type.identifier', foreground: 'E74C3C' },
            { token: 'class', foreground: '27AE60' },
            { token: 'class.identifier', foreground: '27AE60' },
            { token: 'interface', foreground: 'E74C3C' },
            { token: 'function', foreground: '16A085' },
            { token: 'function.call', foreground: '16A085' },
            { token: 'variable', foreground: '1B2B1B' },
            { token: 'variable.parameter', foreground: '2C3E50' },
            { token: 'variable.predefined', foreground: 'E74C3C' },
            { token: 'constant', foreground: '27AE60', fontStyle: 'italic' },
            { token: 'operator', foreground: '27AE60' },
            { token: 'delimiter', foreground: '2ECC71' },
            { token: 'delimiter.bracket', foreground: '27AE60' },
            { token: 'delimiter.parenthesis', foreground: '27AE60' },
            { token: 'delimiter.square', foreground: '27AE60' },
            { token: 'tag', foreground: 'E74C3C' },
            { token: 'attribute.name', foreground: '2ECC71' },
            { token: 'attribute.value', foreground: 'E67E22' },
            { token: 'meta', foreground: '2ECC71' },
            { token: 'annotation', foreground: '2ECC71' },
        ],
        colors: {
            'editor.background': '#F8FDF8',
            'editor.foreground': '#1B2B1B',
            'editorLineNumber.foreground': '#2ECC71',
            'editorLineNumber.activeForeground': '#27AE60',
            'editor.lineHighlightBackground': '#F0F8F0',
            'editor.selectionBackground': '#2ECC7140',
            'editor.inactiveSelectionBackground': '#2ECC7120',
            'editorCursor.foreground': '#E74C3C',
            'editorWhitespace.foreground': '#E8F5E8',
            'editorIndentGuide.background': '#E8F5E8',
            'editorIndentGuide.activeBackground': '#D5E8D5',
            'editor.selectionHighlightBackground': '#2ECC7130',
            'editorBracketMatch.background': '#2ECC7140',
            'editorBracketMatch.border': '#27AE60',
            'scrollbarSlider.background': '#E8F5E880',
            'scrollbarSlider.hoverBackground': '#D5E8D5',
            'scrollbarSlider.activeBackground': '#A9DFBF',
            'minimap.background': '#F8FDF8',
            'editorGutter.background': '#F8FDF8',
            'editorWidget.background': '#FFFFFF',
            'editorSuggestWidget.background': '#FFFFFF',
            'editorSuggestWidget.selectedBackground': '#F0F8F0',
            'editorHoverWidget.background': '#FFFFFF',
            'editorHoverWidget.border': '#E8F5E8',
        }
    });
}

// Initialize Monaco Editor
function initializeEditor() {
    const loadingScreen = document.getElementById('monaco-loading');
    
    require.config({ paths: { vs: '../../node_modules/monaco-editor/min/vs' } });

    require(['vs/editor/editor.main'], function () {
        // Define custom themes
        defineCustomThemes();

        // Create the editor with optimized settings
        const initialTheme = editorSettings.syntaxTheme || (currentTheme === 'light' ? 'elegant-light' : 'elegant-dark');
        console.log('🎨 Creating editor with theme:', initialTheme);
        
        editor = monaco.editor.create(document.getElementById('monaco-editor'), {
            value: sampleTypeScriptCode,
            language: 'typescript',
            theme: initialTheme,
            automaticLayout: true,
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace",
            fontLigatures: false,
            lineHeight: 22,
            lineNumbers: 'on',
            contextmenu: false,
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: true,
            roundedSelection: false,
            scrollBeyondLastLine: false,
            // Optimized minimap
            minimap: {
                enabled: true,
                scale: 1,
                showSlider: 'mouseover',
                renderCharacters: false,
                maxColumn: 80,
                side: 'right'
            },
            // Ultra-fast suggestions
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
                other: true,
                comments: false,
                strings: false
            },
            quickSuggestionsDelay: 200,
            // No formatting on type/paste
            formatOnType: false,
            formatOnPaste: false,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            wrappingIndent: 'indent',
            // Fast cursor
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: false,
            smoothScrolling: false,
            padding: { top: 8, bottom: 8 },
            // Minimal rendering
            bracketPairColorization: { enabled: false },
            guides: {
                bracketPairs: false,
                indentation: true,
                highlightActiveIndentation: false
            },
            renderLineHighlight: 'none',
            renderWhitespace: 'none',
            // Fast scrollbar
            scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
                useShadows: false,
                vertical: 'auto',
                horizontal: 'auto'
            },
            // Maximum performance
            disableLayerHinting: true,
            largeFileOptimizations: true,
            mouseWheelScrollSensitivity: 1,
            fastScrollSensitivity: 5,
            occurrencesHighlight: false,
            selectionHighlight: false,
            codeLens: false,
            colorDecorators: false,
            links: false,
            matchBrackets: 'never',
            renderControlCharacters: false,
            renderIndentGuides: true,
            renderValidationDecorations: 'off',
            hover: {
                enabled: true,
                delay: 600,
                sticky: false
            },
            parameterHints: {
                enabled: true,
                cycle: false
            },
            accessibilitySupport: 'off',
            // Reduce DOM updates
            wordBasedSuggestions: false,
            wordBasedSuggestionsMode: 'currentDocument',
            // Disable expensive features
            foldingStrategy: 'indentation',
            showFoldingControls: 'mouseover',
            unfoldOnClickAfterEndOfLine: false,
            selectOnLineNumbers: false
        });

        // Update cursor position
        editor.onDidChangeCursorPosition((e) => {
            updateCursorPosition(e.position);
        });

        // Update character count and auto-save
        editor.onDidChangeModelContent(() => {
            updateCharCount();
            scheduleAutoSave(); // Auto-save with debouncing
        });

        // Add keyboard shortcuts
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            runCode();
        });

        editor.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, () => {
            formatCode();
        });

        // Initial updates
        updateCharCount();
        updateCursorPosition(editor.getPosition());
        
        // Apply saved settings
        applyEditorSettings();
        
        // Update toggle button states
        updateToggleStates();
        
        // Load auto-saved code
        setTimeout(() => {
            loadAutoSavedCode();
        }, 200);

        // Welcome message
        setTimeout(() => {
            // Hide loading screen after everything is ready
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => loadingScreen.remove(), 400);
            }
        }, 300);
        
        // Initialize IntelliSense for installed packages
        initializePackageIntelliSense();
    });
}

// Theme Toggle
themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('🎨 Switching theme to:', currentTheme);
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        if (editor) {
            monaco.editor.setTheme('elegant-light');
            console.log('✅ Monaco editor theme set to: elegant-light');
        }
    } else {
        document.body.classList.remove('light-mode');
        if (editor) {
            monaco.editor.setTheme('elegant-dark');
            console.log('✅ Monaco editor theme set to: elegant-dark');
        }
    }
    
    // Save preference
    localStorage.setItem('theme', currentTheme);
    console.log('💾 Theme preference saved:', currentTheme);
}

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    console.log('🔍 Loading theme preference. Saved:', savedTheme, 'Current:', currentTheme);
    
    if (savedTheme) {
        currentTheme = savedTheme;
        
        // Apply theme to body
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        
        console.log('✅ Theme preference loaded:', currentTheme);
    }
}

// Window Controls
minimizeBtn.addEventListener('click', () => {
    window.electronAPI.minimizeWindow();
});

maximizeBtn.addEventListener('click', () => {
    window.electronAPI.maximizeWindow();
});

closeBtn.addEventListener('click', () => {
    window.electronAPI.closeWindow();
});

// Language Selection
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        switchLanguage(lang);
    });
});

function switchLanguage(lang) {
    currentLanguage = lang;
    langBtns.forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        // Add JavaScript-specific yellow styling
        if (isActive && lang === 'javascript') {
            btn.classList.add('js-active');
        } else {
            btn.classList.remove('js-active');
        }
    });
    
    const displayLang = lang === 'typescript' ? 'TypeScript' : 'JavaScript';
    if (languageDisplay) languageDisplay.textContent = displayLang;
    editorTitle.textContent = `Code Editor - ${displayLang}`;
    
    if (editor) {
        const model = editor.getModel();
        monaco.editor.setModelLanguage(model, lang);
        
        // Update sample code if editor is empty or has default content
        const currentCode = editor.getValue().trim();
        if (!currentCode || currentCode === sampleTypeScriptCode.trim() || currentCode === sampleJavaScriptCode.trim()) {
            editor.setValue(lang === 'typescript' ? sampleTypeScriptCode : sampleJavaScriptCode);
        }
    }
    
    setStatus('Ready ✨', 'success');
}

function updateCursorPosition(position) {
    if (position) {
        // Status bar removed - safely update if elements exist
        if (lineNumberDisplay) lineNumberDisplay.textContent = position.lineNumber;
        if (colNumberDisplay) colNumberDisplay.textContent = position.column;
    }
}

function updateCharCount() {
    if (editor) {
        const count = editor.getValue().length;
        charCount.textContent = `${count} char${count !== 1 ? 's' : ''}`;
    }
}

// Format Code
formatBtn.addEventListener('click', formatCode);

function formatCode() {
    if (editor) {
        editor.getAction('editor.action.formatDocument').run();
        setStatus('Code formatted ✨', 'success');
        setTimeout(() => setStatus('Ready', 'success'), 2000);
    }
}

// Clear Editor
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the editor?')) {
        if (editor) {
            editor.setValue('');
            setStatus('Editor cleared', 'success');
        }
    }
});

// Clear Console
clearConsoleBtn.addEventListener('click', clearConsole);

function clearConsole() {
    consoleOutput.innerHTML = '';
}

// Run Code
runBtn.addEventListener('click', runCode);

async function runCode() {
    if (isExecuting || !editor) {
        return;
    }
    
    const code = editor.getValue().trim();
    
    if (!code) {
        addConsoleEntry('⚠️ No code to execute', 'warning');
        return;
    }
    
    isExecuting = true;
    setStatus('Executing...', 'executing');
    runBtn.disabled = true;
    runBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="loading">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M12 2 A10 10 0 0 1 22 12" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
        Running...
    `;
    
    try {
        // Clear previous output
        clearConsole();
        
        const result = await window.electronAPI.executeCode(code, currentLanguage);
        
        if (result.success) {
            const { output, errors } = result.result;
            
            // Display output only
            if (output && output.length > 0) {
                output.forEach(line => {
                    addConsoleEntry(line, 'output');
                });
            }
            
            // Display errors
            if (errors && errors.length > 0) {
                errors.forEach(error => {
                    addConsoleEntry(error, 'error');
                });
            }
            
            setStatus('Execution completed', 'success');
        } else {
            addConsoleEntry(result.error || 'Execution failed', 'error');
            if (result.stack) {
                addConsoleEntry(result.stack, 'error');
            }
            setStatus('Execution failed', 'error');
        }
    } catch (error) {
        addConsoleEntry(error.message, 'error');
        setStatus('Execution failed', 'error');
    } finally {
        isExecuting = false;
        runBtn.disabled = false;
        runBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            Run
        `;
    }
}

// Console Functions
function addConsoleEntry(text, type = 'output') {
    // Remove welcome message if it exists
    const welcome = consoleOutput.querySelector('.console-welcome');
    if (welcome) {
        welcome.remove();
    }
    
    const entry = document.createElement('div');
    entry.className = `console-entry ${type}`;
    
    const pre = document.createElement('pre');
    pre.textContent = text;
    entry.appendChild(pre);
    
    consoleOutput.appendChild(entry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function setStatus(text, type = 'info') {
    // Status bar removed - log to console instead
    if (type === 'error') {
        console.error('Status:', text);
    } else {
        console.log('Status:', text);
    }
    
    // Keep for backward compatibility but do nothing if elements don't exist
    if (statusText) statusText.textContent = text;
    
    if (statusDot) {
        statusDot.className = 'status-dot';
        if (type === 'executing') {
            statusDot.classList.add('executing');
        } else if (type === 'error') {
            statusDot.classList.add('error');
        }
    }
}

// Optimized Resizer functionality with RAF
let isResizing = false;
let startX = 0;
let startWidth = 0;
let rafId = null;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    startX = e.clientX;
    startWidth = editorPanel.offsetWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    
    // Use requestAnimationFrame for smooth resizing
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    
    rafId = requestAnimationFrame(() => {
        const diff = e.clientX - startX;
        const newWidth = startWidth + diff;
        const containerWidth = editorPanel.parentElement.offsetWidth;
        const minWidth = 300;
        const minConsoleWidth = 250;
        const maxWidth = containerWidth - minConsoleWidth - 40;
        
        if (newWidth >= minWidth && newWidth <= maxWidth) {
            const percentage = (newWidth / containerWidth) * 100;
            editorPanel.style.flex = `0 0 ${percentage}%`;
        }
    });
});

document.addEventListener('mouseup', () => {
    if (isResizing) {
        isResizing = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }
});

// Settings Modal
const settingsBtn = document.getElementById('settings-btn');
const settingsOverlay = document.getElementById('settings-overlay');
const settingsClose = document.getElementById('settings-close');
const settingsCancel = document.getElementById('settings-cancel');
const settingsSave = document.getElementById('settings-save');

// Settings inputs
const settingFontSize = document.getElementById('setting-font-size');
const settingTabSize = document.getElementById('setting-tab-size');
const settingLineHeight = document.getElementById('setting-line-height');
const settingFontWeight = document.getElementById('setting-font-weight');
const settingCursorStyle = document.getElementById('setting-cursor-style');
const settingCursorBlink = document.getElementById('setting-cursor-blink');
const settingMinimap = document.getElementById('setting-minimap');
const settingLineNumbers = document.getElementById('setting-line-numbers');
const settingWordWrap = document.getElementById('setting-word-wrap');
const settingBracketPair = document.getElementById('setting-bracket-pair');
const settingIndentGuides = document.getElementById('setting-indent-guides');
const settingFolding = document.getElementById('setting-folding');
const settingRenderWhitespace = document.getElementById('setting-render-whitespace');
const settingAutoSave = document.getElementById('setting-auto-save');
const settingFormatOnPaste = document.getElementById('setting-format-on-paste');
const settingAutoClosing = document.getElementById('setting-auto-closing');
const settingAutoIndent = document.getElementById('setting-auto-indent');
const settingSnippets = document.getElementById('setting-snippets');
const settingHighlightActive = document.getElementById('setting-highlight-active');
const settingScrollSensitivity = document.getElementById('setting-scroll-sensitivity');
const settingSyntaxTheme = document.getElementById('setting-syntax-theme');

// Default settings
const defaultSettings = {
    fontSize: 14,
    tabSize: 4,
    lineHeight: 22,
    fontWeight: 400,
    cursorStyle: 'line',
    cursorBlink: 'smooth',
    syntaxTheme: 'elegant-dark',
    minimap: true,
    lineNumbers: true,
    wordWrap: true,
    bracketPair: false,
    indentGuides: true,
    folding: true,
    renderWhitespace: 'none',
    autoSave: false,
    formatOnPaste: false,
    autoClosing: true,
    autoIndent: true,
    snippets: true,
    highlightActive: false,
    scrollSensitivity: 1
};

let editorSettings = { ...defaultSettings };

// Load settings from localStorage
function loadSettings() {
    try {
        const saved = localStorage.getItem('editorSettings');
        if (saved) {
            const parsed = JSON.parse(saved);
            editorSettings = { ...defaultSettings, ...parsed };
            console.log('✅ Settings loaded from localStorage:', editorSettings);
        } else {
            console.log('ℹ️ No saved settings found, using defaults');
            editorSettings = { ...defaultSettings };
        }
    } catch (error) {
        console.error('❌ Failed to load settings:', error);
        editorSettings = { ...defaultSettings };
    }
    
    // Update UI with loaded settings
    updateSettingsUI();
}

// Update settings UI with current values
function updateSettingsUI() {
    if (!settingFontSize) {
        console.log('⚠️ Settings UI elements not ready yet');
        return;
    }
    
    console.log('🔄 Updating settings UI with:', editorSettings);
    
    settingFontSize.value = editorSettings.fontSize;
    settingTabSize.value = editorSettings.tabSize;
    settingLineHeight.value = editorSettings.lineHeight;
    settingFontWeight.value = editorSettings.fontWeight;
    settingCursorStyle.value = editorSettings.cursorStyle;
    settingCursorBlink.value = editorSettings.cursorBlink;
    settingSyntaxTheme.value = editorSettings.syntaxTheme;
    settingMinimap.checked = editorSettings.minimap;
    settingLineNumbers.checked = editorSettings.lineNumbers;
    settingWordWrap.checked = editorSettings.wordWrap;
    settingBracketPair.checked = editorSettings.bracketPair;
    settingIndentGuides.checked = editorSettings.indentGuides;
    settingFolding.checked = editorSettings.folding;
    settingRenderWhitespace.value = editorSettings.renderWhitespace;
    settingAutoSave.checked = editorSettings.autoSave;
    settingFormatOnPaste.checked = editorSettings.formatOnPaste;
    settingAutoClosing.checked = editorSettings.autoClosing;
    settingAutoIndent.checked = editorSettings.autoIndent;
    settingSnippets.checked = editorSettings.snippets;
    settingHighlightActive.checked = editorSettings.highlightActive;
    settingScrollSensitivity.value = editorSettings.scrollSensitivity;
    
    console.log('✅ Settings UI updated');
}

// Apply settings to editor
function applyEditorSettings() {
    if (!editor) {
        console.log('⚠️ Cannot apply settings: editor not initialized yet');
        return;
    }
    
    console.log('🎨 Applying settings to editor:', editorSettings);
    
    // Apply syntax theme
    if (editorSettings.syntaxTheme) {
        monaco.editor.setTheme(editorSettings.syntaxTheme);
        console.log('🎨 Applied syntax theme:', editorSettings.syntaxTheme);
    }

    editor.updateOptions({
        fontSize: parseInt(editorSettings.fontSize),
        tabSize: parseInt(editorSettings.tabSize),
        lineHeight: parseInt(editorSettings.lineHeight),
        fontWeight: editorSettings.fontWeight.toString(),
        cursorStyle: editorSettings.cursorStyle,
        cursorBlinking: editorSettings.cursorBlink,
        minimap: { 
            enabled: editorSettings.minimap, 
            renderCharacters: false,
            maxColumn: 80,
            showSlider: 'mouseover'
        },
        lineNumbers: editorSettings.lineNumbers ? 'on' : 'off',
        wordWrap: editorSettings.wordWrap ? 'on' : 'off',
        bracketPairColorization: { enabled: editorSettings.bracketPair },
        guides: {
            indentation: editorSettings.indentGuides,
            bracketPairs: editorSettings.bracketPair,
            highlightActiveIndentation: false // Performance
        },
        folding: editorSettings.folding,
        renderWhitespace: editorSettings.renderWhitespace,
        formatOnPaste: editorSettings.formatOnPaste,
        autoClosingBrackets: editorSettings.autoClosing ? 'always' : 'never',
        autoClosingQuotes: editorSettings.autoClosing ? 'always' : 'never',
        autoIndent: editorSettings.autoIndent ? 'full' : 'none',
        suggest: {
            snippetsPreventQuickSuggestions: !editorSettings.snippets,
            showSnippets: editorSettings.snippets
        },
        renderLineHighlight: editorSettings.highlightActive ? 'line' : 'none',
        mouseWheelScrollSensitivity: parseFloat(editorSettings.scrollSensitivity),
        fastScrollSensitivity: parseFloat(editorSettings.scrollSensitivity) * 5,
        // Performance settings
        occurrencesHighlight: false,
        selectionHighlight: false,
        roundedSelection: false,
        scrollbar: {
            useShadows: false
        }
    });
    
    console.log('✅ Settings applied successfully');
}

// Save settings to localStorage
function saveSettings() {
    try {
        const settingsJson = JSON.stringify(editorSettings);
        localStorage.setItem('editorSettings', settingsJson);
        console.log('💾 Settings saved to localStorage:', editorSettings);
        console.log('📦 Saved JSON:', settingsJson);
        setStatus('Settings saved! ✨', 'success');
    } catch (error) {
        console.error('❌ Failed to save settings:', error);
        setStatus('Failed to save settings', 'error');
    }
}

// Open settings modal
function openSettings() {
    updateSettingsUI();
    settingsOverlay.classList.add('active');
}

// Close settings modal
function closeSettings() {
    settingsOverlay.classList.remove('active');
}

// Save and apply settings
function saveAndApplySettings() {
    // Get values from UI
    editorSettings.fontSize = parseInt(settingFontSize.value);
    editorSettings.tabSize = parseInt(settingTabSize.value);
    editorSettings.lineHeight = parseInt(settingLineHeight.value);
    editorSettings.fontWeight = parseInt(settingFontWeight.value);
    editorSettings.cursorStyle = settingCursorStyle.value;
    editorSettings.cursorBlink = settingCursorBlink.value;
    editorSettings.syntaxTheme = settingSyntaxTheme.value;
    editorSettings.minimap = settingMinimap.checked;
    editorSettings.lineNumbers = settingLineNumbers.checked;
    editorSettings.wordWrap = settingWordWrap.checked;
    editorSettings.bracketPair = settingBracketPair.checked;
    editorSettings.indentGuides = settingIndentGuides.checked;
    editorSettings.folding = settingFolding.checked;
    editorSettings.renderWhitespace = settingRenderWhitespace.value;
    editorSettings.autoSave = settingAutoSave.checked;
    editorSettings.formatOnPaste = settingFormatOnPaste.checked;
    editorSettings.autoClosing = settingAutoClosing.checked;
    editorSettings.autoIndent = settingAutoIndent.checked;
    editorSettings.snippets = settingSnippets.checked;
    editorSettings.highlightActive = settingHighlightActive.checked;
    editorSettings.scrollSensitivity = parseFloat(settingScrollSensitivity.value);
    
    // Apply to editor
    applyEditorSettings();
    
    // Save to localStorage
    saveSettings();
    
    // Close modal
    closeSettings();
}

// Settings event listeners
settingsBtn.addEventListener('click', openSettings);
settingsClose.addEventListener('click', closeSettings);
settingsCancel.addEventListener('click', closeSettings);
settingsSave.addEventListener('click', saveAndApplySettings);

// Close modal when clicking outside
settingsOverlay.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) {
        closeSettings();
    }
});

// Detect platform and add class to body
function detectPlatform() {
    const platform = window.navigator.platform.toLowerCase();
    if (platform.includes('win')) {
        document.body.classList.add('platform-windows');
    } else if (platform.includes('mac')) {
        document.body.classList.add('platform-mac');
    } else if (platform.includes('linux')) {
        document.body.classList.add('platform-linux');
    }
}

// Custom Context Menu - Ultra Performance Optimized
const customContextMenu = document.getElementById('custom-context-menu');

// Show context menu on right-click in editor
function showContextMenu(e) {
    e.preventDefault();
    
    if (!customContextMenu) return;
    
    // Calculate position
    const x = e.clientX;
    const y = e.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Use estimated dimensions for positioning
    const menuWidth = 240;
    const menuHeight = 400;
    
    // Adjust position if menu would go off screen
    let posX = x;
    let posY = y;
    
    if (x + menuWidth > windowWidth) {
        posX = windowWidth - menuWidth - 10;
    }
    
    if (y + menuHeight > windowHeight) {
        posY = windowHeight - menuHeight - 10;
    }
    
    // Apply position using transform for GPU acceleration
    customContextMenu.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    
    // Show the menu
    customContextMenu.classList.add('active');
}

// Hide context menu
function hideContextMenu() {
    if (!customContextMenu) return;
    customContextMenu.classList.remove('active');
}

// Handle context menu actions
function handleContextMenuAction(action) {
    if (!editor) return;
    
    switch (action) {
        case 'cut':
            document.execCommand('cut');
            editor.focus();
            break;
            
        case 'copy':
            document.execCommand('copy');
            editor.focus();
            break;
            
        case 'paste':
            navigator.clipboard.readText().then(text => {
                const selection = editor.getSelection();
                const id = { major: 1, minor: 1 };
                const op = { identifier: id, range: selection, text: text, forceMoveMarkers: true };
                editor.executeEdits('context-menu', [op]);
                editor.focus();
            });
            break;
            
        case 'selectAll':
            const model = editor.getModel();
            const fullRange = model.getFullModelRange();
            editor.setSelection(fullRange);
            editor.focus();
            break;
            
        case 'format':
            formatCode();
            break;
            
        case 'run':
            runCode();
            break;
            
        case 'delete':
            const position = editor.getPosition();
            const lineNumber = position.lineNumber;
            const model2 = editor.getModel();
            const lineContent = model2.getLineContent(lineNumber);
            const lineLength = lineContent.length;
            
            editor.executeEdits('context-menu', [{
                range: {
                    startLineNumber: lineNumber,
                    startColumn: 1,
                    endLineNumber: lineNumber,
                    endColumn: lineLength + 1
                },
                text: '',
                forceMoveMarkers: true
            }]);
            editor.focus();
            break;
            
        case 'clear':
            if (confirm('Clear all code in the editor?')) {
                editor.setValue('');
                clearConsole();
                editor.focus();
            }
            break;
    }
    
    hideContextMenu();
}

// Add event listeners for context menu (optimized with event delegation)
document.addEventListener('DOMContentLoaded', () => {
    // Listen for right-click on editor (passive for better performance)
    const editorContainer = document.getElementById('monaco-editor');
    if (editorContainer) {
        editorContainer.addEventListener('contextmenu', showContextMenu, { passive: false });
    }
    
    // Hide menu on click outside (passive event)
    document.addEventListener('click', hideContextMenu, { passive: true });
    
    // Use event delegation for better performance (single listener)
    if (customContextMenu) {
        customContextMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            // Find the clicked menu item
            const menuItem = e.target.closest('.context-menu-item');
            if (menuItem) {
                const action = menuItem.getAttribute('data-action');
                if (action) {
                    handleContextMenuAction(action);
                }
            }
        }, { passive: false });
    }
});

// ========================================
// Code Snippets Library
// ========================================
const snippetsBtn = document.getElementById('snippets-btn');
const snippetsOverlay = document.getElementById('snippets-overlay');
const snippetsClose = document.getElementById('snippets-close');

// Snippet templates
const snippetTemplates = {
    // TypeScript snippets
    'ts-interface': `interface MyInterface {
    property: string;
    optionalProperty?: number;
    method(): void;
}`,
    'ts-class': `class MyClass {
    private property: string;
    
    constructor(property: string) {
        this.property = property;
    }
    
    public method(): void {
        console.log(this.property);
    }
}`,
    'ts-async': `async function fetchData(): Promise<void> {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}`,
    'ts-type': `type MyType = {
    id: number;
    name: string;
    createdAt: Date;
};`,
    'ts-enum': `enum Status {
    Pending = 'PENDING',
    Active = 'ACTIVE',
    Completed = 'COMPLETED'
}`,
    // JavaScript snippets
    'js-function': `function myFunction(param) {
    // Function body
    return param;
}`,
    'js-arrow': `const myArrowFunction = (param) => {
    // Function body
    return param;
};`,
    'js-async': `async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}`,
    'js-class': `class MyClass {
    constructor(property) {
        this.property = property;
    }
    
    method() {
        console.log(this.property);
    }
}`,
    'js-promise': `const myPromise = new Promise((resolve, reject) => {
    // Async operation
    const success = true;
    if (success) {
        resolve('Success!');
    } else {
        reject('Error!');
    }
});

myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error));`,
    'js-try': `try {
    // Code that may throw an error
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    console.error('Error caught:', error);
} finally {
    // Cleanup code
    console.log('Cleanup');
}`
};

// Open snippets modal
function openSnippets() {
    snippetsOverlay.classList.add('active');
}

// Close snippets modal
function closeSnippets() {
    snippetsOverlay.classList.remove('active');
}

// Insert snippet
function insertSnippet(snippetKey) {
    if (!editor || !snippetTemplates[snippetKey]) return;
    
    const snippet = snippetTemplates[snippetKey];
    const selection = editor.getSelection();
    const id = { major: 1, minor: 1 };
    const op = { 
        identifier: id, 
        range: selection, 
        text: snippet, 
        forceMoveMarkers: true 
    };
    
    editor.executeEdits('snippets', [op]);
    editor.focus();
    closeSnippets();
    
    setStatus('Snippet inserted! ✨', 'success');
    setTimeout(() => setStatus('Ready', 'success'), 2000);
}

// Event listeners for snippets
if (snippetsBtn) {
    snippetsBtn.addEventListener('click', openSnippets);
}

if (snippetsClose) {
    snippetsClose.addEventListener('click', closeSnippets);
}

if (snippetsOverlay) {
    snippetsOverlay.addEventListener('click', (e) => {
        if (e.target === snippetsOverlay) closeSnippets();
    });
    
    // Event delegation for snippet items
    snippetsOverlay.addEventListener('click', (e) => {
        const snippetItem = e.target.closest('.snippet-item');
        if (snippetItem) {
            const snippetKey = snippetItem.getAttribute('data-snippet');
            if (snippetKey) insertSnippet(snippetKey);
        }
    });
}

// ========================================
// Keyboard Shortcuts Panel
// ========================================
const shortcutsBtn = document.getElementById('shortcuts-btn');
const shortcutsOverlay = document.getElementById('shortcuts-overlay');
const shortcutsClose = document.getElementById('shortcuts-close');

// Open shortcuts modal
function openShortcuts() {
    shortcutsOverlay.classList.add('active');
}

// Close shortcuts modal
function closeShortcuts() {
    shortcutsOverlay.classList.remove('active');
}

// Event listeners for shortcuts
if (shortcutsBtn) {
    shortcutsBtn.addEventListener('click', openShortcuts);
}

if (shortcutsClose) {
    shortcutsClose.addEventListener('click', closeShortcuts);
}

if (shortcutsOverlay) {
    shortcutsOverlay.addEventListener('click', (e) => {
        if (e.target === shortcutsOverlay) closeShortcuts();
    });
}

// Add Ctrl/Cmd+K shortcut for keyboard shortcuts panel
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openShortcuts();
    }
});

// ========================================
// NPM Package Manager
// ========================================
const packagesBtn = document.getElementById('packages-btn');
const packagesOverlay = document.getElementById('packages-overlay');
const packagesClose = document.getElementById('packages-close');
const packageSearchInput = document.getElementById('package-search-input');
const packageSearchBtn = document.getElementById('package-search-btn');
const packageSearchResults = document.getElementById('package-search-results');
const installedPackagesList = document.getElementById('installed-packages-list');
const refreshPackagesBtn = document.getElementById('refresh-packages-btn');

let installedPackages = [];

// Open packages modal
function openPackages() {
    packagesOverlay.classList.add('active');
    loadInstalledPackages();
}

// Close packages modal
function closePackages() {
    packagesOverlay.classList.remove('active');
    packageSearchInput.value = '';
    packageSearchResults.innerHTML = '';
}

// Search for NPM packages
async function searchPackages() {
    const query = packageSearchInput.value.trim();
    if (!query) return;

    packageSearchResults.innerHTML = `
        <div class="package-loading">
            <div class="package-loading-spinner"></div>
            <span>Searching packages...</span>
        </div>
    `;

    try {
        const result = await window.electronAPI.npmSearch(query);
        
        if (result.success && result.packages) {
            if (result.packages.length === 0) {
                packageSearchResults.innerHTML = `
                    <div class="packages-empty">
                        <p>No packages found for "${query}"</p>
                    </div>
                `;
                return;
            }

            packageSearchResults.innerHTML = result.packages.map(pkg => {
                const isInstalled = installedPackages.some(p => p.name === pkg.name);
                return `
                    <div class="search-result-item">
                        <div class="search-result-info">
                            <div>
                                <span class="search-result-name">${pkg.name}</span>
                                <span class="search-result-version">v${pkg.version}</span>
                            </div>
                            <div class="search-result-description">${pkg.description}</div>
                            <div class="search-result-stats">
                                <span class="search-stat">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                        <circle cx="8.5" cy="7" r="4"/>
                                    </svg>
                                    ${pkg.author}
                                </span>
                            </div>
                        </div>
                        <button class="install-package-btn ${isInstalled ? 'installed' : ''}" 
                                data-package="${pkg.name}" 
                                ${isInstalled ? 'disabled' : ''}>
                            ${isInstalled ? '✓ Installed' : 'Install'}
                        </button>
                    </div>
                `;
            }).join('');

            // Add event listeners to install buttons
            document.querySelectorAll('.install-package-btn:not(.installed)').forEach(btn => {
                btn.addEventListener('click', () => installPackage(btn.dataset.package, btn));
            });
        } else {
            packageSearchResults.innerHTML = `
                <div class="packages-empty">
                    <p>Error: ${result.error || 'Failed to search packages'}</p>
                </div>
            `;
        }
    } catch (error) {
        packageSearchResults.innerHTML = `
            <div class="packages-empty">
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
}

// Install a package
async function installPackage(packageName, buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add('installing');
    buttonElement.textContent = 'Installing...';

    try {
        const result = await window.electronAPI.npmInstall(packageName);
        
        if (result.success) {
            buttonElement.textContent = '✓ Installed';
            buttonElement.classList.remove('installing');
            buttonElement.classList.add('installed');
            
            // Reload installed packages
            await loadInstalledPackages();
            
            // Refresh IntelliSense cache
            await refreshPackageCache();
            
            // Show success in console
            addConsoleEntry(`✓ Successfully installed ${packageName}`, 'success');
        } else {
            buttonElement.textContent = 'Install Failed';
            buttonElement.disabled = false;
            buttonElement.classList.remove('installing');
            
            addConsoleEntry(`✗ Failed to install ${packageName}: ${result.error}`, 'error');
            
            setTimeout(() => {
                buttonElement.textContent = 'Install';
            }, 2000);
        }
    } catch (error) {
        buttonElement.textContent = 'Install Failed';
        buttonElement.disabled = false;
        buttonElement.classList.remove('installing');
        
        addConsoleEntry(`✗ Error installing ${packageName}: ${error.message}`, 'error');
        
        setTimeout(() => {
            buttonElement.textContent = 'Install';
        }, 2000);
    }
}

// Uninstall a package
async function uninstallPackage(packageName, buttonElement) {
    buttonElement.disabled = true;
    buttonElement.textContent = 'Uninstalling...';

    try {
        const result = await window.electronAPI.npmUninstall(packageName);
        
        if (result.success) {
            // Reload installed packages
            await loadInstalledPackages();
            
            // Refresh IntelliSense cache
            await refreshPackageCache();
            
            // Show success in console
            addConsoleEntry(`✓ Successfully uninstalled ${packageName}`, 'success');
        } else {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Uninstall';
            
            addConsoleEntry(`✗ Failed to uninstall ${packageName}: ${result.error}`, 'error');
        }
    } catch (error) {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Uninstall';
        
        addConsoleEntry(`✗ Error uninstalling ${packageName}: ${error.message}`, 'error');
    }
}

// Load installed packages
async function loadInstalledPackages() {
    try {
        const result = await window.electronAPI.npmList();
        
        if (result.success) {
            installedPackages = result.packages || [];
            
            if (installedPackages.length === 0) {
                installedPackagesList.innerHTML = `
                    <div class="packages-empty">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                            <line x1="12" y1="22.08" x2="12" y2="12"/>
                        </svg>
                        <p>No packages installed yet</p>
                        <p class="hint">Search and install packages above</p>
                    </div>
                `;
            } else {
                installedPackagesList.innerHTML = installedPackages.map(pkg => `
                    <div class="package-item">
                        <div class="package-info">
                            <span class="package-name">${pkg.name}</span>
                            <span class="package-version">${pkg.version}</span>
                        </div>
                        <div class="package-actions">
                            <button class="uninstall-package-btn" data-package="${pkg.name}">
                                Uninstall
                            </button>
                        </div>
                    </div>
                `).join('');

                // Add event listeners to uninstall buttons
                document.querySelectorAll('.uninstall-package-btn').forEach(btn => {
                    btn.addEventListener('click', () => uninstallPackage(btn.dataset.package, btn));
                });
            }
        } else {
            installedPackagesList.innerHTML = `
                <div class="packages-empty">
                    <p>Error loading packages: ${result.error}</p>
                </div>
            `;
        }
    } catch (error) {
        installedPackagesList.innerHTML = `
            <div class="packages-empty">
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
}

// Event listeners for packages modal
if (packagesBtn) {
    packagesBtn.addEventListener('click', openPackages);
}

if (packagesClose) {
    packagesClose.addEventListener('click', closePackages);
}

if (packagesOverlay) {
    packagesOverlay.addEventListener('click', (e) => {
        if (e.target === packagesOverlay) closePackages();
    });
}

if (packageSearchBtn) {
    packageSearchBtn.addEventListener('click', searchPackages);
}

if (packageSearchInput) {
    packageSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPackages();
        }
    });
}

if (refreshPackagesBtn) {
    refreshPackagesBtn.addEventListener('click', loadInstalledPackages);
}

// ========================================
// Quick Toggles (Line Numbers, Word Wrap, Minimap)
// ========================================
const lineNumbersToggle = document.getElementById('line-numbers-toggle');
const wordWrapToggle = document.getElementById('word-wrap-toggle');
const minimapToggle = document.getElementById('minimap-toggle');

// Toggle line numbers
function toggleLineNumbers() {
    if (!editor) return;
    
    const currentSetting = editor.getRawOptions().lineNumbers;
    const newSetting = currentSetting === 'on' ? 'off' : 'on';
    
    editor.updateOptions({ lineNumbers: newSetting });
    editorSettings.lineNumbers = newSetting === 'on';
    saveSettings();
    
    lineNumbersToggle.classList.toggle('active', newSetting === 'on');
    setStatus(`Line numbers ${newSetting === 'on' ? 'enabled' : 'disabled'}`, 'success');
    setTimeout(() => setStatus('Ready', 'success'), 1500);
}

// Toggle word wrap
function toggleWordWrap() {
    if (!editor) return;
    
    const currentSetting = editor.getRawOptions().wordWrap;
    const newSetting = currentSetting === 'on' ? 'off' : 'on';
    
    editor.updateOptions({ wordWrap: newSetting });
    editorSettings.wordWrap = newSetting === 'on';
    saveSettings();
    
    wordWrapToggle.classList.toggle('active', newSetting === 'on');
    setStatus(`Word wrap ${newSetting === 'on' ? 'enabled' : 'disabled'}`, 'success');
    setTimeout(() => setStatus('Ready', 'success'), 1500);
}

// Toggle minimap
function toggleMinimap() {
    if (!editor) return;
    
    const currentSetting = editor.getRawOptions().minimap.enabled;
    const newSetting = !currentSetting;
    
    editor.updateOptions({ 
        minimap: { 
            enabled: newSetting,
            renderCharacters: false,
            maxColumn: 80,
            showSlider: 'mouseover'
        } 
    });
    editorSettings.minimap = newSetting;
    saveSettings();
    
    minimapToggle.classList.toggle('active', newSetting);
    setStatus(`Minimap ${newSetting ? 'enabled' : 'disabled'}`, 'success');
    setTimeout(() => setStatus('Ready', 'success'), 1500);
}

// Event listeners for toggles
if (lineNumbersToggle) {
    lineNumbersToggle.addEventListener('click', toggleLineNumbers);
}

if (wordWrapToggle) {
    wordWrapToggle.addEventListener('click', toggleWordWrap);
}

if (minimapToggle) {
    minimapToggle.addEventListener('click', toggleMinimap);
}

// Update toggle button states after editor initializes
function updateToggleStates() {
    if (!editor) return;
    
    const lineNumbers = editor.getRawOptions().lineNumbers === 'on';
    const wordWrap = editor.getRawOptions().wordWrap === 'on';
    const minimap = editor.getRawOptions().minimap.enabled;
    
    if (lineNumbersToggle) lineNumbersToggle.classList.toggle('active', lineNumbers);
    if (wordWrapToggle) wordWrapToggle.classList.toggle('active', wordWrap);
    if (minimapToggle) minimapToggle.classList.toggle('active', minimap);
}

// ========================================
// Auto-Save Feature
// ========================================
let autoSaveTimeout = null;
const AUTO_SAVE_DELAY = 2000; // 2 seconds debounce

// Auto-save function with debouncing
function autoSaveCode() {
    if (!editor) return;
    
    const code = editor.getValue();
    const language = currentLanguage;
    
    try {
        localStorage.setItem('autoSavedCode', code);
        localStorage.setItem('autoSavedLanguage', language);
        
        // Show auto-save indicator briefly
        const statusItem = document.createElement('span');
        statusItem.className = 'status-item auto-save';
        statusItem.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
            </svg>
            Auto-saved
        `;
        
        const statusRight = document.querySelector('.status-right');
        if (statusRight) {
            statusRight.insertBefore(statusItem, statusRight.firstChild);
            setTimeout(() => statusItem.remove(), 2000);
        }
    } catch (error) {
        console.error('Auto-save failed:', error);
    }
}

// Debounced auto-save on code change
function scheduleAutoSave() {
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    autoSaveTimeout = setTimeout(() => {
        autoSaveCode();
    }, AUTO_SAVE_DELAY);
}

// Load auto-saved code
function loadAutoSavedCode() {
    try {
        const savedCode = localStorage.getItem('autoSavedCode');
        const savedLanguage = localStorage.getItem('autoSavedLanguage');
        
        if (savedCode && editor) {
            // Only load if editor is empty or has sample code
            const currentCode = editor.getValue().trim();
            const isSampleCode = currentCode === sampleTypeScriptCode.trim() || 
                                currentCode === sampleJavaScriptCode.trim();
            
            if (!currentCode || isSampleCode) {
                editor.setValue(savedCode);
                
                if (savedLanguage && savedLanguage !== currentLanguage) {
                    switchLanguage(savedLanguage);
                }
                
                console.log('✅ Auto-saved code restored');
            }
        }
    } catch (error) {
        console.error('Failed to load auto-saved code:', error);
    }
}

// ========================================
// Enhanced IntelliSense for Installed Packages
// ========================================

let installedPackagesCache = [];
let packageExportsCache = new Map();

// Initialize package IntelliSense
async function initializePackageIntelliSense() {
    try {
        console.log('🔍 Initializing package IntelliSense...');
        
        // Load all installed packages metadata
        const result = await window.electronAPI.getAllPackagesMetadata();
        
        if (result.success && result.packages) {
            installedPackagesCache = result.packages;
            console.log('✅ Loaded packages for IntelliSense:', installedPackagesCache.length);
            
            // Set up Monaco editor IntelliSense
            setupMonacoIntelliSense();
        } else {
            console.log('⚠️ No packages found for IntelliSense');
        }
    } catch (error) {
        console.error('❌ Failed to initialize package IntelliSense:', error);
    }
}

// Set up Monaco editor IntelliSense
function setupMonacoIntelliSense() {
    if (!editor) return;
    
    // Register completion provider for import statements
    monaco.languages.registerCompletionItemProvider('typescript', {
        provideCompletionItems: async (model, position) => {
            const textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column
            });
            
            const suggestions = [];
            
            // Check if we're in an import statement
            const importMatch = textUntilPosition.match(/import\s*\{?\s*([^}]*?)\s*\}?\s*from\s*['"`]([^'"`]*?)$/);
            
            if (importMatch) {
                const packageName = importMatch[2];
                const currentImport = importMatch[1];
                
                // If we're importing from an installed package
                if (installedPackagesCache.some(pkg => pkg.name === packageName)) {
                    try {
                        // Get package exports
                        const exportsResult = await window.electronAPI.getPackageExports(packageName);
                        
                        if (exportsResult.success && exportsResult.exports) {
                            const { mainExports, hasTypes } = exportsResult.exports;
                            
                            // Add export suggestions
                            mainExports.forEach(exportName => {
                                if (exportName.toLowerCase().includes(currentImport.toLowerCase())) {
                                    suggestions.push({
                                        label: exportName,
                                        kind: monaco.languages.CompletionItemKind.Function,
                                        insertText: exportName,
                                        detail: `From ${packageName}`,
                                        documentation: hasTypes ? 'TypeScript support available' : 'JavaScript only',
                                        sortText: '1' + exportName
                                    });
                                }
                            });
                        }
                    } catch (error) {
                        console.log('Could not get exports for', packageName, error);
                    }
                }
            }
            
            // Check if we're typing a package name in import
            const packageImportMatch = textUntilPosition.match(/import\s*.*?\s*from\s*['"`]([^'"`]*?)$/);
            if (packageImportMatch) {
                const partialPackageName = packageImportMatch[1];
                
                // Suggest installed packages
                installedPackagesCache.forEach(pkg => {
                    if (pkg.name.toLowerCase().includes(partialPackageName.toLowerCase())) {
                        suggestions.push({
                            label: pkg.name,
                            kind: monaco.languages.CompletionItemKind.Module,
                            insertText: pkg.name,
                            detail: pkg.description || 'No description',
                            documentation: `Version: ${pkg.version}${pkg.hasTypes ? ' | TypeScript support' : ''}`,
                            sortText: '0' + pkg.name
                        });
                    }
                });
            }
            
            return { suggestions };
        }
    });
    
    // Register hover provider for package information
    monaco.languages.registerHoverProvider('typescript', {
        provideHover: async (model, position) => {
            const word = model.getWordAtPosition(position);
            if (!word) return null;
            
            const wordText = word.word;
            
            // Check if it's an installed package
            const packageInfo = installedPackagesCache.find(pkg => pkg.name === wordText);
            if (packageInfo) {
                return {
                    range: new monaco.Range(
                        position.lineNumber,
                        word.startColumn,
                        position.lineNumber,
                        word.endColumn
                    ),
                    contents: [
                        { value: `**${packageInfo.name}** v${packageInfo.version}` },
                        { value: packageInfo.description || 'No description available' },
                        { value: `Author: ${packageInfo.author || 'Unknown'}` },
                        { value: `License: ${packageInfo.license || 'Unknown'}` },
                        { value: packageInfo.hasTypes ? '✅ TypeScript support' : '⚠️ JavaScript only' }
                    ]
                };
            }
            
            return null;
        }
    });
    
    // Register completion provider for JavaScript as well
    monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: async (model, position) => {
            const textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column
            });
            
            const suggestions = [];
            
            // Check if we're in an import statement
            const importMatch = textUntilPosition.match(/import\s*\{?\s*([^}]*?)\s*\}?\s*from\s*['"`]([^'"`]*?)$/);
            
            if (importMatch) {
                const packageName = importMatch[2];
                const currentImport = importMatch[1];
                
                // If we're importing from an installed package
                if (installedPackagesCache.some(pkg => pkg.name === packageName)) {
                    try {
                        // Get package exports
                        const exportsResult = await window.electronAPI.getPackageExports(packageName);
                        
                        if (exportsResult.success && exportsResult.exports) {
                            const { mainExports } = exportsResult.exports;
                            
                            // Add export suggestions
                            mainExports.forEach(exportName => {
                                if (exportName.toLowerCase().includes(currentImport.toLowerCase())) {
                                    suggestions.push({
                                        label: exportName,
                                        kind: monaco.languages.CompletionItemKind.Function,
                                        insertText: exportName,
                                        detail: `From ${packageName}`,
                                        documentation: 'JavaScript export',
                                        sortText: '1' + exportName
                                    });
                                }
                            });
                        }
                    } catch (error) {
                        console.log('Could not get exports for', packageName, error);
                    }
                }
            }
            
            // Check if we're typing a package name in import
            const packageImportMatch = textUntilPosition.match(/import\s*.*?\s*from\s*['"`]([^'"`]*?)$/);
            if (packageImportMatch) {
                const partialPackageName = packageImportMatch[1];
                
                // Suggest installed packages
                installedPackagesCache.forEach(pkg => {
                    if (pkg.name.toLowerCase().includes(partialPackageName.toLowerCase())) {
                        suggestions.push({
                            label: pkg.name,
                            kind: monaco.languages.CompletionItemKind.Module,
                            insertText: pkg.name,
                            detail: pkg.description || 'No description',
                            documentation: `Version: ${pkg.version}`,
                            sortText: '0' + pkg.name
                        });
                    }
                });
            }
            
            return { suggestions };
        }
    });
    
    console.log('✅ Monaco IntelliSense configured for installed packages');
}

// Refresh package cache when packages are installed/uninstalled
async function refreshPackageCache() {
    try {
        const result = await window.electronAPI.getAllPackagesMetadata();
        if (result.success && result.packages) {
            installedPackagesCache = result.packages;
            packageExportsCache.clear(); // Clear exports cache
            console.log('✅ Package cache refreshed:', installedPackagesCache.length, 'packages');
        }
    } catch (error) {
        console.error('❌ Failed to refresh package cache:', error);
    }
}

// Initialize the editor when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 App starting (DOMContentLoaded)...');
        detectPlatform();
        loadThemePreference();
        loadSettings();
        initializeEditor();
    });
} else {
    console.log('🚀 App starting (DOM already ready)...');
    detectPlatform();
    loadThemePreference();
    loadSettings();
    initializeEditor();
}
