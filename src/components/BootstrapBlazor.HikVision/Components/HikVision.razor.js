import { init as initVision, login, logout, startRealPlay, stopRealPlay, dispose as disposeVision } from '../hikvision.js';
import EventHandler from '../../BootstrapBlazor/modules/event-handler.js';

export async function init(id) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await initVision(id);
}

export { login, logout, startRealPlay, stopRealPlay }

export function dispose(id) {
    disposeVision(id);
}
