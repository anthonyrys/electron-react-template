import { BridgeAPI } from '../../electron/bridge';

declare global {
    interface Window {
        Bridge: typeof BridgeAPI;
    }
}
