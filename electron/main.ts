import { app, BrowserWindow } from 'electron';
import path from 'node:path';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const assetsPath: string = process.env.NODE_ENV === 'production'
    ? path.join(process.resourcesPath, 'assets')
    : path.join(app.getAppPath(), 'assets');

function createWindow(): void {
    mainWindow = new BrowserWindow({
        icon: path.join(assetsPath, 'icon.png'),

        maxWidth: 1100,
        minWidth: 800,

        maxHeight: 700,
        minHeight: 500,

        maximizable: false,
        fullscreenable: false,
        
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // mainWindow.setMenu(null);

    mainWindow.on('closed', function(): void {
        mainWindow = null;
    });
}

app.on('ready', createWindow)
    .whenReady()
    
    .catch(function(e: any): void { 
        console.error(e); 
    });

app.on('window-all-closed', function(): void {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function(): void {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});
