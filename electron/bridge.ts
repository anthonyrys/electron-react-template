import { contextBridge } from 'electron';
import path from 'node:path';

const assetsPath: string = process.env.NODE_ENV === 'production'
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../..', 'assets');

interface BridgeAPI {
    assetsPath: string;

    helloWorld(message: string): void;
}

export const BridgeAPI: BridgeAPI = {
    assetsPath: assetsPath,

    helloWorld: function(message: string): void {
        console.log(message);
    }
};

contextBridge.exposeInMainWorld('Bridge', BridgeAPI);
