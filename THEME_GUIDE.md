# 🎨 Theme Guide - Light & Dark Modes

## Overview

iTypeScriptor now features **beautiful light and dark modes** with custom Monaco Editor themes! Switch between modes with a single click.

---

## ✨ Features

### 🌙 Dark Mode (Default)
- **GitHub-inspired dark palette**
- **Animated gradient orbs** (blue, green, purple)
- **Custom "iTypeScriptor Dark" Monaco theme**
- **Easy on the eyes** for long coding sessions
- **Professional look** with subtle animations

### ☀️ Light Mode
- **Clean, bright interface**
- **Soft color palette** optimized for daylight
- **Custom "iTypeScriptor Light" Monaco theme**
- **High contrast** for excellent readability
- **Subtle gradient effects**

---

## 🎯 How to Toggle Themes

### Toggle Button
Click the **theme toggle button** in the toolbar (between language selector and editor info).

- **Dark Mode Active**: Button shows ☀️ and says "Light"
- **Light Mode Active**: Button shows ☀️ and says "Dark"

### Keyboard
While there's no keyboard shortcut by default, you can click the button at any time.

### Theme Persistence
Your theme choice is automatically saved and will persist across app restarts!

---

## 🎨 Custom Monaco Themes

### iTypeScriptor Dark Theme

**Color Palette:**
```
Background:  #0d1117 (Deep dark blue-gray)
Foreground:  #e6edf3 (Light gray-white)
Comments:    #6b737c (Muted gray, italic)
Keywords:    #ff7b72 (Soft red, bold)
Strings:     #a5d6ff (Light blue)
Numbers:     #79c0ff (Bright blue)
Functions:   #d2a8ff (Purple)
Types:       #ffa657 (Orange)
Cursor:      #58a6ff (Bright blue)
Selection:   #1f6feb (GitHub blue, transparent)
```

**Highlights:**
- Syntax highlighting optimized for TypeScript/JavaScript
- Smooth cursor animation
- Beautiful bracket pair colorization
- Active line highlighting
- Minimap integration

### iTypeScriptor Light Theme

**Color Palette:**
```
Background:  #ffffff (Pure white)
Foreground:  #24292e (Near black)
Comments:    #6a737d (Medium gray, italic)
Keywords:    #d73a49 (Red, bold)
Strings:     #032f62 (Dark blue)
Numbers:     #005cc5 (Bright blue)
Functions:   #6f42c1 (Purple)
Types:       #e36209 (Orange)
Cursor:      #0969da (GitHub blue)
Selection:   #0969da (Blue, transparent)
```

**Highlights:**
- High contrast for daytime use
- Clear, readable syntax colors
- Professional GitHub aesthetic
- Optimized for LCD displays
- Clean minimap appearance

---

## 🌈 UI Enhancements

### Dark Mode UI
- **Background**: Deep dark (`#0d1117`)
- **Panels**: Slightly lighter (`#161b22`)
- **Borders**: Subtle gray (`#30363d`)
- **Accent**: GitHub blue (`#58a6ff`)
- **Shadows**: Deep, atmospheric

### Light Mode UI
- **Background**: Pure white (`#ffffff`)
- **Panels**: Soft gray (`#f6f8fa`)
- **Borders**: Light gray (`#d0d7de`)
- **Accent**: GitHub blue (`#0969da`)
- **Shadows**: Light, subtle

### Animated Gradient Orbs

**Dark Mode:**
- Blue orb (top-right)
- Green orb (bottom-left)
- Purple orb (center)
- Opacity: 25%, Blur: 100px

**Light Mode:**
- Same colors, lighter opacity (15%)
- More blur (120px)
- Subtler animation

---

## 📐 Layout Improvements

### Editor Width
- **Editor Panel**: 75% width (default)
- **Console Panel**: 25% width (default)
- **Resizable**: Drag the divider to adjust
- **Minimum widths**: 300px (editor), 250px (console)

### Responsive Design
- Automatically adjusts on smaller screens
- Switches to vertical layout on screens < 1200px
- Maintains usability on all sizes

---

## 🎨 Design Details

### Typography
**UI Text:**
- Font: System default (San Francisco, Segoe UI, etc.)
- Sizes: 11px (status) to 13px (buttons)
- Weights: 500 (medium) to 700 (bold)

**Code Editor:**
- Font: SF Mono, Monaco, Consolas (monospace)
- Size: 15px
- Ligatures: Enabled
- Line height: Optimized for readability

### Animations
- **Theme transition**: 0.3s ease
- **Button hover**: 0.2s cubic-bezier
- **Gradient orbs**: 25-35s floating animation
- **Console entries**: Slide-in animation (0.3s)
- **Status dot**: 2s pulse animation

### Shadows & Effects
- **Buttons**: Subtle elevation shadows
- **Panels**: Soft depth shadows
- **Glow effects**: Accent-colored glows on focus
- **Backdrop blur**: 10px on toolbars (subtle)

---

## 🎯 Theme Color Reference

### Dark Mode Colors
```css
--bg-primary:       #0d1117
--bg-secondary:     #161b22
--bg-tertiary:      #1c2128
--bg-elevated:      #21262d
--accent-primary:   #58a6ff
--accent-secondary: #1f6feb
--text-primary:     #e6edf3
--text-secondary:   #8b949e
--text-muted:       #484f58
--border-default:   #30363d
```

### Light Mode Colors
```css
--bg-primary:       #ffffff
--bg-secondary:     #f6f8fa
--bg-tertiary:      #ffffff
--bg-elevated:      #ffffff
--accent-primary:   #0969da
--accent-secondary: #0550ae
--text-primary:     #1f2328
--text-secondary:   #656d76
--text-muted:       #8c959f
--border-default:   #d0d7de
```

### Status Colors (Both Modes)
```css
Success:  Dark: #3fb950  Light: #1a7f37
Error:    Dark: #f85149  Light: #cf222e
Warning:  Dark: #d29922  Light: #9a6700
```

---

## 💡 Tips & Tricks

### 1. Choose the Right Mode
- **Dark Mode**: Best for evening/night coding, reduced eye strain
- **Light Mode**: Best for daytime, well-lit environments

### 2. Theme Persistence
Your choice is saved automatically - no need to toggle every time!

### 3. Beautiful Code
Both themes are optimized for TypeScript and JavaScript syntax highlighting.

### 4. Accessibility
- High contrast in both modes
- Clear visual hierarchy
- Readable at all sizes

### 5. Customize Further
The themes are defined in `renderer.js` - you can modify colors to your preference!

---

## 🔧 Technical Details

### Theme Definition
Themes are defined using Monaco's `defineTheme` API in `renderer.js`:

```javascript
monaco.editor.defineTheme('itypescriptor-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [ /* syntax colors */ ],
    colors: { /* editor colors */ }
});
```

### Theme Storage
Theme preference is stored in `localStorage`:

```javascript
localStorage.setItem('theme', 'dark'); // or 'light'
```

### Theme Application
Themes are applied via:
1. CSS class on `<body>` element (`light-mode`)
2. Monaco theme: `monaco.editor.setTheme('theme-name')`
3. CSS variables update automatically

---

## 🎨 Comparison

| Feature | Dark Mode | Light Mode |
|---------|-----------|------------|
| **Best For** | Night coding | Daytime work |
| **Eye Strain** | Low | Medium |
| **Battery** | Better (OLED) | Standard |
| **Contrast** | Medium-High | High |
| **Atmosphere** | Professional | Clean |
| **Colors** | Vibrant | Balanced |

---

## 🚀 Quick Start

1. **Launch the app**: `npm start`
2. **Click theme button** in the toolbar
3. **Watch the magic** as everything transitions smoothly!
4. **Your preference is saved** automatically

---

## 📸 Visual Features

### Dark Mode
- Deep, immersive background
- Glowing accent colors
- Floating gradient orbs
- Subtle shadows
- Professional aesthetic

### Light Mode
- Clean, bright interface
- Clear text hierarchy
- Soft gradient effects
- Minimal shadows
- Modern design

---

## 🎉 Summary

Your app now has:
- ✅ **Two beautiful themes** (light & dark)
- ✅ **Custom Monaco themes** for each mode
- ✅ **One-click theme toggle**
- ✅ **Automatic theme persistence**
- ✅ **Smooth transitions** throughout
- ✅ **Optimized colors** for TypeScript/JavaScript
- ✅ **75/25 editor layout** (adjustable)
- ✅ **Enhanced UI beauty** across the board

**Switch themes and find your perfect coding environment!** 🎨✨

---

*Designed with love for beautiful code editing experiences.*

