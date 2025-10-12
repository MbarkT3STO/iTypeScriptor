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
    ipcRenderer.invoke('close-window')
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
    };
  }
}

