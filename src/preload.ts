import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  executeCode: (code: string, language: string) => 
    ipcRenderer.invoke('execute-code', code, language),
  
  minimizeWindow: () => 
    ipcRenderer.invoke('minimize-window'),
  
  maximizeWindow: () => 
    ipcRenderer.invoke('maximize-window'),
  
  closeWindow: () => 
    ipcRenderer.invoke('close-window'),
  
  // NPM Package Manager
  npmSearch: (query: string) => 
    ipcRenderer.invoke('npm-search', query),
  
  npmInstall: (packageName: string) => 
    ipcRenderer.invoke('npm-install', packageName),
  
  npmUninstall: (packageName: string) => 
    ipcRenderer.invoke('npm-uninstall', packageName),
  
  npmList: () => 
    ipcRenderer.invoke('npm-list'),
  
  // Package metadata and IntelliSense
  getPackageMetadata: (packageName: string) => 
    ipcRenderer.invoke('get-package-metadata', packageName),
  
  getPackageExports: (packageName: string) => 
    ipcRenderer.invoke('get-package-exports', packageName),
  
  getAllPackagesMetadata: () => 
    ipcRenderer.invoke('get-all-packages-metadata')
});

// Type definitions for TypeScript
declare global {
  interface Window {
    electronAPI: {
      executeCode: (code: string, language: string) => Promise<{
        success: boolean;
        result?: {
          output: string[];
          errors: string[];
          returnValue: any;
        };
        error?: string;
        stack?: string;
      }>;
      minimizeWindow: () => Promise<void>;
      maximizeWindow: () => Promise<void>;
      closeWindow: () => Promise<void>;
      npmSearch: (query: string) => Promise<{
        success: boolean;
        packages?: any[];
        error?: string;
      }>;
      npmInstall: (packageName: string) => Promise<{
        success: boolean;
        message?: string;
        output?: string;
        error?: string;
        stderr?: string;
      }>;
      npmUninstall: (packageName: string) => Promise<{
        success: boolean;
        message?: string;
        output?: string;
        error?: string;
        stderr?: string;
      }>;
      npmList: () => Promise<{
        success: boolean;
        packages?: any[];
        error?: string;
      }>;
      getPackageMetadata: (packageName: string) => Promise<{
        success: boolean;
        metadata?: any;
        error?: string;
      }>;
      getPackageExports: (packageName: string) => Promise<{
        success: boolean;
        exports?: {
          packageExports: any;
          mainExports: string[];
          hasTypes: boolean;
        };
        error?: string;
      }>;
      getAllPackagesMetadata: () => Promise<{
        success: boolean;
        packages?: any[];
        error?: string;
      }>;
    };
  }
}

