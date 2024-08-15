import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';

declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const ASSETS_PATH: string = process.env.NODE_ENV === 'production'
    ? path.join(process.resourcesPath, 'assets')
    : path.join(app.getAppPath(), 'assets');

let appWindow: BrowserWindow | null;

function createAppWindow(): void {
    appWindow = new BrowserWindow({
        icon: path.join(ASSETS_PATH, 'icon.png'),
        show: false,

        webPreferences: {
            devTools: process.env.NODE_ENV === 'development',
            preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    });

    appWindow?.loadURL(APP_WINDOW_WEBPACK_ENTRY);

    appWindow?.on('ready-to-show', function(): void {
        appWindow?.show();
        appWindow?.focus();
    });

    appWindow.on('closed', function(): void {
        appWindow = null;
    });
}

async function registerListeners(): Promise<void> {
    ipcMain.on('hello', function(_): void {
        console.log('Hello, World!');
    });
}

const appLock: boolean = app.requestSingleInstanceLock();

if (!appLock) {
    app.quit();

} else {
    app.on('second-instance', function(_event: Electron.Event, _argv: string[], _workingDirectory: string, _additionalData: any): void {
        if (appWindow?.isVisible()) {
            if (appWindow.isMinimized()) appWindow.restore();
            appWindow.focus();
        }
    });

    app.on('ready', createAppWindow)
        .whenReady()

        .then(registerListeners)

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
            createAppWindow();
        }
    });
}
