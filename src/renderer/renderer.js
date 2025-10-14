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
}

// Initialize Monaco Editor
function initializeEditor() {
    const loadingScreen = document.getElementById('monaco-loading');
    
    require.config({ paths: { vs: '../../node_modules/monaco-editor/min/vs' } });

    require(['vs/editor/editor.main'], function () {
        // Define custom themes
        defineCustomThemes();

        // Create the editor with optimized settings
        const initialTheme = currentTheme === 'light' ? 'elegant-light' : 'elegant-dark';
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

// Default settings
const defaultSettings = {
    fontSize: 14,
    tabSize: 4,
    lineHeight: 22,
    fontWeight: 400,
    cursorStyle: 'line',
    cursorBlink: 'smooth',
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
    
    // Update AI settings
    aiSettings.provider = settingAiProvider.value;
    aiSettings.apiKey = settingAiKey.value;
    aiSettings.enabled = settingAiEnabled.checked;
    
    // Apply to editor
    applyEditorSettings();
    
    // Save to localStorage
    saveSettings();
    saveAiSettings();
    
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
// AI Code Assistant
// ========================================
const aiBtn = document.getElementById('ai-btn');
const aiOverlay = document.getElementById('ai-overlay');
const aiClose = document.getElementById('ai-close');
const aiResponse = document.getElementById('ai-response');
const aiResponseTitle = document.getElementById('ai-response-title');
const aiResponseContent = document.getElementById('ai-response-content');
const aiCopyBtn = document.getElementById('ai-copy');
const aiApplyBtn = document.getElementById('ai-apply');
const aiCancelBtn = document.getElementById('ai-cancel');

// AI Input Modal
const aiInputOverlay = document.getElementById('ai-input-overlay');
const aiInputClose = document.getElementById('ai-input-close');
const aiQuestionInput = document.getElementById('ai-question-input');
const aiInputCancel = document.getElementById('ai-input-cancel');
const aiInputSubmit = document.getElementById('ai-input-submit');

// AI Settings
const settingAiProvider = document.getElementById('setting-ai-provider');
const settingAiKey = document.getElementById('setting-ai-key');
const settingAiEnabled = document.getElementById('setting-ai-enabled');

let aiSettings = {
    provider: 'demo',
    apiKey: '',
    enabled: true
};

let currentAiResponse = '';

// Load AI settings
function loadAiSettings() {
    try {
        const saved = localStorage.getItem('aiSettings');
        if (saved) {
            aiSettings = { ...aiSettings, ...JSON.parse(saved) };
        }
    } catch (error) {
        console.error('Failed to load AI settings:', error);
    }
}

// Save AI settings
function saveAiSettings() {
    try {
        localStorage.setItem('aiSettings', JSON.stringify(aiSettings));
    } catch (error) {
        console.error('Failed to save AI settings:', error);
    }
}

// Update AI settings UI
function updateAiSettingsUI() {
    if (settingAiProvider) settingAiProvider.value = aiSettings.provider;
    if (settingAiKey) settingAiKey.value = aiSettings.apiKey;
    if (settingAiEnabled) settingAiEnabled.checked = aiSettings.enabled;
}

// Open AI assistant
function openAiAssistant() {
    if (!aiSettings.enabled) {
        alert('AI features are disabled. Enable them in Settings.');
        return;
    }
    aiOverlay.classList.add('active');
    aiResponse.style.display = 'none';
}

// Close AI assistant
function closeAiAssistant() {
    aiOverlay.classList.remove('active');
    aiResponse.style.display = 'none';
}

// Mock AI responses for demo mode
const demoResponses = {
    explain: (code) => `This code performs the following operations:

1. **Function/Variable Declarations**: The code defines variables and functions using TypeScript/JavaScript syntax.

2. **Type Safety**: ${code.includes(':') ? 'TypeScript types are used to ensure type safety and better IDE support.' : 'Dynamic typing allows for flexible variable assignments.'}

3. **Execution Flow**: The code executes sequentially from top to bottom, with any async operations being handled appropriately.

4. **Best Practices**: ${code.includes('const') ? 'Uses const for immutable variables, promoting safer code.' : 'Variable declarations follow standard JavaScript patterns.'}

This is a demo response. Connect an AI API for real analysis!`,
    
    generate: (description) => `// Generated code based on: "${description.substring(0, 50)}..."

function generatedFunction(param) {
    // TODO: Implement based on description
    console.log('Processing:', param);
    
    const result = {
        status: 'success',
        data: param
    };
    
    return result;
}

// Example usage
const output = generatedFunction('example');
console.log(output);

// This is demo code. Connect an AI API for real generation!`,
    
    improve: (code) => `// Improved version with optimizations:

${code}

// Suggested improvements:
// 1. Add error handling with try-catch
// 2. Use TypeScript types for better safety
// 3. Add JSDoc comments for documentation
// 4. Consider using async/await for promises
// 5. Extract magic numbers into constants

// This is a demo response. Connect an AI API for real suggestions!`,
    
    fix: (code) => `// Bug fixes and improvements:

${code}

// Potential issues found:
// ⚠️ Check for null/undefined values
// ⚠️ Add input validation
// ⚠️ Handle edge cases
// ⚠️ Consider memory leaks in async operations

// This is a demo response. Connect an AI API for real bug detection!`,
    
    document: (code) => `/**
 * Function documentation
 * 
 * @description Performs operations on the provided data
 * @param {any} param - The input parameter
 * @returns {any} The processed result
 * @throws {Error} If processing fails
 * @example
 * const result = functionName(data);
 */
${code}

// This is demo documentation. Connect an AI API for accurate JSDoc!`,
    
    chat: (question) => `Based on your question: "${question.substring(0, 100)}..."

Here's what I can help you with:
- I can explain code concepts
- Suggest best practices
- Help debug issues
- Provide learning resources

This is a demo chat. Connect an AI API for intelligent conversations!`
};

// Handle AI action
async function handleAiAction(action) {
    if (!editor) return;
    
    let code = editor.getSelection().isEmpty() ? editor.getValue() : 
               editor.getModel().getValueInRange(editor.getSelection());
    
    if (!code.trim() && action !== 'chat') {
        alert('Please select some code or write code in the editor first.');
        return;
    }
    
    // Special handling for chat - show input modal
    if (action === 'chat') {
        currentAiAction = 'chat';
        aiInputOverlay.classList.add('active');
        aiQuestionInput.value = '';
        aiQuestionInput.focus();
        return;
    }
    
    // Show loading
    aiResponse.style.display = 'block';
    aiResponseContent.innerHTML = `
        <div class="ai-loading">
            <div class="ai-loading-spinner"></div>
            <span>AI is thinking...</span>
        </div>
    `;
    
    // Update title
    const titles = {
        explain: '💡 Code Explanation',
        generate: '✨ Generated Code',
        improve: '🚀 Code Improvements',
        fix: '🔧 Bug Fixes',
        document: '📝 Documentation',
        chat: '💬 AI Chat'
    };
    aiResponseTitle.textContent = titles[action] || 'AI Response';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get response
    let response = '';
    
    if (aiSettings.provider === 'demo') {
        // Demo mode
        if (action === 'generate') {
            // For generate, use the code as description
            response = demoResponses.generate(code || 'Create a function');
        } else {
            response = demoResponses[action](code);
        }
    } else {
        // Real AI would go here
        response = `AI Provider "${aiSettings.provider}" not yet implemented.
        
Please use Demo Mode or add your API key in Settings.

Your code:
${code}`;
    }
    
    currentAiResponse = response;
    aiResponseContent.textContent = response;
}

let currentAiAction = null;

// Handle chat question submission
async function handleChatSubmit() {
    const question = aiQuestionInput.value.trim();
    if (!question) return;
    
    // Close input modal
    aiInputOverlay.classList.remove('active');
    
    // Show AI modal with loading
    aiResponse.style.display = 'block';
    aiResponseContent.innerHTML = `
        <div class="ai-loading">
            <div class="ai-loading-spinner"></div>
            <span>AI is thinking...</span>
        </div>
    `;
    
    aiResponseTitle.textContent = '💬 AI Chat';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get response
    let response = '';
    
    if (aiSettings.provider === 'demo') {
        response = demoResponses.chat(question);
    } else {
        response = `AI Provider "${aiSettings.provider}" not yet implemented.
        
Please use Demo Mode or add your API key in Settings.

Your question: ${question}`;
    }
    
    currentAiResponse = response;
    aiResponseContent.textContent = response;
}

// Copy AI response
function copyAiResponse() {
    navigator.clipboard.writeText(currentAiResponse).then(() => {
        const originalText = aiCopyBtn.innerHTML;
        aiCopyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;
        setTimeout(() => {
            aiCopyBtn.innerHTML = originalText;
        }, 2000);
    });
}

// Apply AI response to editor
function applyAiResponse() {
    if (!editor || !currentAiResponse) return;
    
    const selection = editor.getSelection();
    const id = { major: 1, minor: 1 };
    const op = {
        identifier: id,
        range: selection,
        text: currentAiResponse,
        forceMoveMarkers: true
    };
    
    editor.executeEdits('ai-assistant', [op]);
    editor.focus();
    closeAiAssistant();
    
    setStatus('AI code applied! ✨', 'success');
}

// Event listeners for AI
if (aiBtn) aiBtn.addEventListener('click', openAiAssistant);
if (aiClose) aiClose.addEventListener('click', closeAiAssistant);
if (aiCancelBtn) aiCancelBtn.addEventListener('click', closeAiAssistant);
if (aiCopyBtn) aiCopyBtn.addEventListener('click', copyAiResponse);
if (aiApplyBtn) aiApplyBtn.addEventListener('click', applyAiResponse);

// Event listeners for AI input modal
if (aiInputClose) aiInputClose.addEventListener('click', () => aiInputOverlay.classList.remove('active'));
if (aiInputCancel) aiInputCancel.addEventListener('click', () => aiInputOverlay.classList.remove('active'));
if (aiInputSubmit) aiInputSubmit.addEventListener('click', handleChatSubmit);
if (aiQuestionInput) {
    aiQuestionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleChatSubmit();
        }
    });
}

// AI action buttons
document.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('.ai-action-btn');
    if (actionBtn) {
        const action = actionBtn.getAttribute('data-action');
        if (action) handleAiAction(action);
    }
});

// AI overlay click
if (aiOverlay) {
    aiOverlay.addEventListener('click', (e) => {
        if (e.target === aiOverlay) closeAiAssistant();
    });
}

// AI input overlay click
if (aiInputOverlay) {
    aiInputOverlay.addEventListener('click', (e) => {
        if (e.target === aiInputOverlay) aiInputOverlay.classList.remove('active');
    });
}

// Ctrl/Cmd+I shortcut for AI
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        openAiAssistant();
    }
});

// Initialize the editor when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 App starting (DOMContentLoaded)...');
        detectPlatform();
        loadThemePreference();
        loadSettings();
        loadAiSettings();
        updateAiSettingsUI();
        initializeEditor();
    });
} else {
    console.log('🚀 App starting (DOM already ready)...');
    detectPlatform();
    loadThemePreference();
    loadSettings();
    loadAiSettings();
    updateAiSettingsUI();
    initializeEditor();
}
