import { init as initVision, login, logout, startRealPlay, stopRealPlay, dispose as disposeVision } from '../hikvision.js';
import EventHandler from '../../BootstrapBlazor/modules/event-handler.js';

export async function init(id, invoke) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const inited = await initVision(id);
    await invoke.invokeMethodAsync('TriggerInited', inited);
}

export { login, logout, startRealPlay, stopRealPlay }

export function dispose(id) {
    disposeVision(id);
}
