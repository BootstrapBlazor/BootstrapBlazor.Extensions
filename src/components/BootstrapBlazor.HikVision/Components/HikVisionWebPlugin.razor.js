import { init as initVision, login as loginVision, logout, startRealPlay, stopRealPlay, dispose as disposeVision } from '../hikvision.js';
import Data from '../../BootstrapBlazor/modules/data.js';
import EventHandler from '../../BootstrapBlazor/modules/event-handler.js';

export async function init(id, invoke) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    Data.set(id, {
        invoke
    });

    const inited = await initVision(id);
    await invoke.invokeMethodAsync('TriggerInited', inited);
}

export async function login(id, ip, port, userName, password, loginType) {
    const vision = Data.get(id);
    await loginVision(id, ip, port, userName, password, loginType);
    const { logined, invoke } = vision;
    if (logined) {
        await invoke.invokeMethodAsync('TriggerGetChannelList', {
            analogChannels: vision.analogChannels,
            digitalChannels: vision.digitalChannels,
            zeroChannels: vision.zeroChannels
        });
    }
    return logined;
}

export { logout, startRealPlay, stopRealPlay }

export function dispose(id) {
    disposeVision(id);
}
