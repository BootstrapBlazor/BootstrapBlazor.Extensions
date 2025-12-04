import { init as initVision, login, logout, startRealPlay, stopRealPlay, dispose as disposeVision } from '../hikvision.js';
import EventHandler from '../../BootstrapBlazor/modules/event-handler.js';

export async function init(id) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const previewId = `${id}_preview`;
    await initVision(previewId);

    const controls = el.querySelector('.bb-hik-controls');
    if (controls) {
        EventHandler.on(controls, 'click', '.bb-hik-login', async e => {
            console.log('login');
            await login(previewId, '47.121.113.151', 9980, 'admin', 'vhbn8888', 1)
        });
        EventHandler.on(controls, 'click', '.bb-hik-logout', e => {
            console.log('logout');
            logout(previewId);
        });
        EventHandler.on(controls, 'click', '.bb-hik-start', e => {
            console.log('start');
            startRealPlay(previewId);
        });
        EventHandler.on(controls, 'click', '.bb-hik-stop', e => {
            console.log('stop');
            stopRealPlay(previewId);
        });
    }
}

export function dispose(id) {
    const el = document.getElementById(id);
    if (el !== null) {
        const controls = el.querySelector('.bb-hik-controls');
        if (controls) {
            EventHandler.off(controls, 'click');
        }
    }

    const previewId = `${id}_preview`;
    disposeVision(previewId);
}
