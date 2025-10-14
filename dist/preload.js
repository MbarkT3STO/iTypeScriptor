"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    executeCode: (code, language) => electron_1.ipcRenderer.invoke('execute-code', code, language),
    minimizeWindow: () => electron_1.ipcRenderer.invoke('minimize-window'),
    maximizeWindow: () => electron_1.ipcRenderer.invoke('maximize-window'),
    closeWindow: () => electron_1.ipcRenderer.invoke('close-window'),
    // NPM Package Manager
    npmSearch: (query) => electron_1.ipcRenderer.invoke('npm-search', query),
    npmInstall: (packageName) => electron_1.ipcRenderer.invoke('npm-install', packageName),
    npmUninstall: (packageName) => electron_1.ipcRenderer.invoke('npm-uninstall', packageName),
    npmList: () => electron_1.ipcRenderer.invoke('npm-list')
});
