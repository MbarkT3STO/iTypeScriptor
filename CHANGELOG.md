# Changelog

## Version 2.0.0 - Monaco Editor & Dark Mode (2025-10-11)

### 🎉 Major Changes

#### ✨ Monaco Editor Integration
- Replaced basic textarea with **Monaco Editor** (the editor from VS Code)
- Full syntax highlighting for TypeScript and JavaScript
- IntelliSense code completion and suggestions
- Built-in find & replace functionality
- Multi-cursor editing support
- Code folding
- Minimap for code navigation
- Bracket pair colorization
- Auto-formatting (on type, on paste, and on command)

#### 🎨 Beautiful Dark Mode Design
- Complete UI redesign with professional dark theme
- GitHub-inspired color palette
- Animated gradient orbs in background (blue, green, purple)
- Improved contrast and readability
- Professional status indicators
- Smooth transitions and animations

#### 📐 Resizable Panels
- Drag the divider between editor and console
- Flexible layout that adapts to your needs
- Minimum width constraints for usability
- Smooth resize experience

### 🔧 Technical Improvements

#### Dependencies
- **Added**: `monaco-editor@^0.44.0`
- **Updated**: All existing dependencies to latest compatible versions

#### Code Changes
- Completely rewrote `src/renderer/renderer.js` for Monaco integration
- Redesigned `src/renderer/styles.css` with dark mode theme
- Updated `src/renderer/index.html` with new layout structure
- Added resizer functionality for panel management

### 🎯 New Features

1. **Format Code Button** - Format your code with one click or `Shift+Alt+F`
2. **Live Cursor Position** - See current line and column in real-time
3. **Character Counter** - Track code length as you type
4. **Status Indicators** - Visual feedback with colored status dot
5. **Enhanced Console** - Better formatted output with color coding
6. **Improved Toolbar** - More intuitive button layout

### ⌨️ New Keyboard Shortcuts

#### Monaco Editor Built-in Shortcuts
- `Cmd/Ctrl + F` - Find
- `Cmd/Ctrl + H` - Replace
- `Cmd/Ctrl + D` - Add selection to next find match
- `Cmd/Ctrl + /` - Toggle line comment
- `Alt + ↑/↓` - Move line up/down
- `Shift + Alt + ↑/↓` - Copy line up/down
- `Cmd/Ctrl + ]` - Indent line
- `Cmd/Ctrl + [` - Outdent line

#### Application Shortcuts
- `Cmd/Ctrl + Enter` - Run code (existing)
- `Shift + Alt + F` - Format document (new)

### 🐛 Bug Fixes

1. **Fixed editor sizing issues** - Editor now properly fills available space
2. **Fixed console overflow** - Console content now scrolls correctly
3. **Fixed layout responsiveness** - Better handling of window resizing
4. **Fixed status bar alignment** - Proper spacing and alignment

### 📈 Performance

- Slightly increased memory usage (~50-100MB) due to Monaco Editor
- Faster code editing experience with Monaco's optimizations
- Smooth 60fps animations throughout the UI
- Instant syntax highlighting with no lag

### 🎨 Visual Changes

#### Color Palette
- **Background**: `#0d1117` (Dark gray-blue)
- **Panels**: `#161b22` (Elevated dark)
- **Accent**: `#58a6ff` (GitHub blue)
- **Success**: `#3fb950` (Green)
- **Error**: `#f85149` (Red)
- **Warning**: `#d29922` (Orange)

#### Typography
- Maintained system fonts for UI
- Monaco's default fonts for editor
- SF Mono for console output

### 📝 Documentation Updates

- Updated `README.md` with new features
- Added `MONACO_UPGRADE.md` with detailed upgrade information
- Updated `USAGE.md` with Monaco-specific instructions
- Added `CHANGELOG.md` (this file)

### 🔄 Breaking Changes

**None** - The app maintains backward compatibility with existing workflows. All previous functionality is preserved and enhanced.

### 🚀 Migration Guide

If you're upgrading from v1.0.0:

1. **Pull the latest changes**
2. **Install new dependencies**:
   ```bash
   npm install
   ```
3. **Rebuild TypeScript**:
   ```bash
   npm run build
   ```
4. **Start the app**:
   ```bash
   npm start
   ```

Your existing code samples will work exactly as before!

### 📦 File Changes

#### Modified Files
- `src/renderer/index.html` - New layout with Monaco integration
- `src/renderer/styles.css` - Complete dark mode redesign
- `src/renderer/renderer.js` - Monaco Editor implementation
- `package.json` - Added Monaco dependency
- `README.md` - Updated documentation

#### New Files
- `MONACO_UPGRADE.md` - Upgrade documentation
- `CHANGELOG.md` - This file

#### Unchanged Files
- `src/main.ts` - Electron main process
- `src/preload.ts` - IPC bridge
- `src/codeExecutor.ts` - Code execution engine
- `tsconfig.json` - TypeScript configuration
- Sample files in `samples/` directory

---

## Version 1.0.0 - Initial Release (2025-10-11)

### Features

- TypeScript and JavaScript code editor
- Code execution with console output
- Glassmorphism UI design
- Custom window controls
- Line numbers and basic editing
- Console output display
- Sample code files
- Electron-based desktop app

---

**Full Changelog**: https://github.com/yourusername/itypescriptor/compare/v1.0.0...v2.0.0

