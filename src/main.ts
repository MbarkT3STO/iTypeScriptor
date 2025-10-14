import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import { executeCode } from './codeExecutor';

const execAsync = promisify(exec);

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    transparent: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    backgroundColor: '#00000000',
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

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('execute-code', async (_event, code: string, language: string) => {
  try {
    const result = await executeCode(code, language);
    return { success: true, result };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'An error occurred during execution',
      stack: error.stack
    };
  }
});

ipcMain.handle('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

// NPM Package Manager Handlers
ipcMain.handle('npm-search', async (_event, query: string) => {
  try {
    // Use NPM registry API for searching
    const https = require('https');
    const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`;
    
    return new Promise((resolve, reject) => {
      https.get(url, (res: any) => {
        let data = '';
        res.on('data', (chunk: any) => data += chunk);
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            const packages = result.objects.map((obj: any) => ({
              name: obj.package.name,
              version: obj.package.version,
              description: obj.package.description || 'No description',
              downloads: obj.package.links?.npm || '',
              author: obj.package.author?.name || obj.package.publisher?.username || 'Unknown'
            }));
            resolve({ success: true, packages });
          } catch (error: any) {
            reject({ success: false, error: error.message });
          }
        });
      }).on('error', (error: any) => {
        reject({ success: false, error: error.message });
      });
    });
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('npm-install', async (_event, packageName: string) => {
  try {
    const workDir = app.getPath('userData');
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
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to install package',
      stderr: error.stderr
    };
  }
});

ipcMain.handle('npm-uninstall', async (_event, packageName: string) => {
  try {
    const workDir = app.getPath('userData');
    
    const { stdout, stderr } = await execAsync(`npm uninstall ${packageName}`, { 
      cwd: workDir,
      timeout: 30000
    });
    
    return { 
      success: true, 
      message: `Successfully uninstalled ${packageName}`,
      output: stdout
    };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to uninstall package',
      stderr: error.stderr
    };
  }
});

ipcMain.handle('npm-list', async () => {
  try {
    const workDir = app.getPath('userData');
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
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to list packages'
    };
  }
});

