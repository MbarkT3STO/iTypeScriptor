"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs = __importStar(require("fs"));
const codeExecutor_1 = require("./codeExecutor");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
let mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 600,
        titleBarStyle: 'hiddenInset',
        transparent: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false
        },
        backgroundColor: '#1a1a1a',
        frame: false,
        hasShadow: true
    });
    mainWindow.loadFile(path.join(__dirname, '../src/renderer/index.html'));
    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// IPC Handlers
electron_1.ipcMain.handle('execute-code', async (_event, code, language) => {
    try {
        const result = await (0, codeExecutor_1.executeCode)(code, language);
        return { success: true, result };
    }
    catch (error) {
        return {
            success: false,
            error: error.message || 'An error occurred during execution',
            stack: error.stack
        };
    }
});
electron_1.ipcMain.handle('minimize-window', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});
electron_1.ipcMain.handle('maximize-window', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        }
        else {
            mainWindow.maximize();
        }
    }
});
electron_1.ipcMain.handle('close-window', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});
// NPM Package Manager Handlers
electron_1.ipcMain.handle('npm-search', async (_event, query) => {
    try {
        // Use NPM registry API for searching
        const https = require('https');
        const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`;
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        const result = JSON.parse(data);
                        const packages = result.objects.map((obj) => ({
                            name: obj.package.name,
                            version: obj.package.version,
                            description: obj.package.description || 'No description',
                            downloads: obj.package.links?.npm || '',
                            author: obj.package.author?.name || obj.package.publisher?.username || 'Unknown'
                        }));
                        resolve({ success: true, packages });
                    }
                    catch (error) {
                        reject({ success: false, error: error.message });
                    }
                });
            }).on('error', (error) => {
                reject({ success: false, error: error.message });
            });
        });
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
electron_1.ipcMain.handle('npm-install', async (_event, packageName) => {
    try {
        const workDir = electron_1.app.getPath('userData');
        const packageJsonPath = path.join(workDir, 'package.json');
        // Create package.json if it doesn't exist
        if (!fs.existsSync(packageJsonPath)) {
            const initialPackageJson = {
                name: "itypescriptor-workspace",
                version: "1.0.0",
                description: "iTypeScriptor workspace for npm packages",
                dependencies: {}
            };
            fs.writeFileSync(packageJsonPath, JSON.stringify(initialPackageJson, null, 2));
        }
        // Install the package
        const { stdout, stderr } = await execAsync(`npm install ${packageName}`, {
            cwd: workDir,
            timeout: 60000 // 60 second timeout
        });
        return {
            success: true,
            message: `Successfully installed ${packageName}`,
            output: stdout
        };
    }
    catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to install package',
            stderr: error.stderr
        };
    }
});
electron_1.ipcMain.handle('npm-uninstall', async (_event, packageName) => {
    try {
        const workDir = electron_1.app.getPath('userData');
        const { stdout, stderr } = await execAsync(`npm uninstall ${packageName}`, {
            cwd: workDir,
            timeout: 30000
        });
        return {
            success: true,
            message: `Successfully uninstalled ${packageName}`,
            output: stdout
        };
    }
    catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to uninstall package',
            stderr: error.stderr
        };
    }
});
electron_1.ipcMain.handle('npm-list', async () => {
    try {
        const workDir = electron_1.app.getPath('userData');
        const packageJsonPath = path.join(workDir, 'package.json');
        // Check if package.json exists
        if (!fs.existsSync(packageJsonPath)) {
            return { success: true, packages: [] };
        }
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        const dependencies = packageJson.dependencies || {};
        const packages = Object.keys(dependencies).map(name => ({
            name,
            version: dependencies[name]
        }));
        return { success: true, packages };
    }
    catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to list packages'
        };
    }
});
// Get package metadata and exports for IntelliSense
electron_1.ipcMain.handle('get-package-metadata', async (_event, packageName) => {
    try {
        const workDir = electron_1.app.getPath('userData');
        const nodeModulesPath = path.join(workDir, 'node_modules', packageName);
        const packageJsonPath = path.join(nodeModulesPath, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            return { success: false, error: 'Package not found' };
        }
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        // Extract main exports and types
        const metadata = {
            name: packageJson.name,
            version: packageJson.version,
            description: packageJson.description || '',
            main: packageJson.main || 'index.js',
            types: packageJson.types || packageJson.typings || null,
            exports: packageJson.exports || null,
            dependencies: packageJson.dependencies || {},
            peerDependencies: packageJson.peerDependencies || {},
            keywords: packageJson.keywords || [],
            author: packageJson.author || '',
            license: packageJson.license || '',
            repository: packageJson.repository || null,
            homepage: packageJson.homepage || null
        };
        return { success: true, metadata };
    }
    catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to get package metadata'
        };
    }
});
// Get package exports for IntelliSense
electron_1.ipcMain.handle('get-package-exports', async (_event, packageName) => {
    try {
        const workDir = electron_1.app.getPath('userData');
        const nodeModulesPath = path.join(workDir, 'node_modules', packageName);
        const packageJsonPath = path.join(nodeModulesPath, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            return { success: false, error: 'Package not found' };
        }
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        const exports = {};
        // Parse package.json exports field
        if (packageJson.exports) {
            if (typeof packageJson.exports === 'string') {
                exports['.'] = packageJson.exports;
            }
            else if (typeof packageJson.exports === 'object') {
                Object.keys(packageJson.exports).forEach(key => {
                    const exportValue = packageJson.exports[key];
                    if (typeof exportValue === 'string') {
                        exports[key] = exportValue;
                    }
                    else if (typeof exportValue === 'object' && exportValue.import) {
                        exports[key] = exportValue.import;
                    }
                });
            }
        }
        // If no exports field, use main field
        if (Object.keys(exports).length === 0 && packageJson.main) {
            exports['.'] = packageJson.main;
        }
        // Try to read the main file to extract available exports
        let mainExports = [];
        try {
            const mainFile = exports['.'] || packageJson.main || 'index.js';
            const mainFilePath = path.join(nodeModulesPath, mainFile);
            if (fs.existsSync(mainFilePath)) {
                const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');
                // Extract exports using regex patterns
                const exportPatterns = [
                    /export\s+(?:const|let|var|function|class|interface|type|enum)\s+(\w+)/g,
                    /export\s*\{\s*([^}]+)\s*\}/g,
                    /export\s+default\s+(\w+)/g,
                    /module\.exports\s*\.\s*(\w+)/g,
                    /exports\.(\w+)/g
                ];
                const foundExports = new Set();
                exportPatterns.forEach(pattern => {
                    let match;
                    while ((match = pattern.exec(mainFileContent)) !== null) {
                        if (match[1]) {
                            // Handle multiple exports in one line
                            const exportNames = match[1].split(',').map(name => name.trim().split(' as ')[0].trim());
                            exportNames.forEach(name => {
                                if (name && name !== 'default') {
                                    foundExports.add(name);
                                }
                            });
                        }
                    }
                });
                mainExports = Array.from(foundExports);
            }
        }
        catch (error) {
            console.log('Could not parse main file for exports:', error);
        }
        return {
            success: true,
            exports: {
                packageExports: exports,
                mainExports: mainExports,
                hasTypes: !!(packageJson.types || packageJson.typings)
            }
        };
    }
    catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to get package exports'
        };
    }
});
// Get all installed packages with their metadata for IntelliSense
electron_1.ipcMain.handle('get-all-packages-metadata', async () => {
    try {
        const workDir = electron_1.app.getPath('userData');
        const packageJsonPath = path.join(workDir, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            return { success: true, packages: [] };
        }
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        const dependencies = packageJson.dependencies || {};
        const packagesWithMetadata = [];
        for (const [name, version] of Object.entries(dependencies)) {
            try {
                const nodeModulesPath = path.join(workDir, 'node_modules', name);
                const packageJsonPath = path.join(nodeModulesPath, 'package.json');
                if (fs.existsSync(packageJsonPath)) {
                    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
                    const packageJson = JSON.parse(packageJsonContent);
                    packagesWithMetadata.push({
                        name,
                        version,
                        description: packageJson.description || '',
                        main: packageJson.main || 'index.js',
                        types: packageJson.types || packageJson.typings || null,
                        hasTypes: !!(packageJson.types || packageJson.typings),
                        keywords: packageJson.keywords || [],
                        author: packageJson.author || '',
                        license: packageJson.license || ''
                    });
                }
            }
            catch (error) {
                console.log(`Could not get metadata for ${name}:`, error);
                // Still include the package even if metadata extraction fails
                packagesWithMetadata.push({
                    name,
                    version,
                    description: '',
                    main: 'index.js',
                    types: null,
                    hasTypes: false,
                    keywords: [],
                    author: '',
                    license: ''
                });
            }
        }
        return { success: true, packages: packagesWithMetadata };
    }
    catch (error) {
        return {
            success: false,
            error: error.message || 'Failed to get packages metadata'
        };
    }
});
