import { contextBridge, ipcRenderer } from 'electron';

interface BridgeInterface {
    hello(): void;
}

export const Bridge: BridgeInterface = {
    hello: function(): void {
        ipcRenderer.send('hello');
    }
};

contextBridge.exposeInMainWorld('Bridge', Bridge);
