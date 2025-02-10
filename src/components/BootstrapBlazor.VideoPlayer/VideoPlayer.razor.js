import './video.min.js';
import { addLink, addScript } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';

export async function init(id, options) {
    await addLink('./_content/BootstrapBlazor.VideoPlayer/video-js.min.css');

    const { language } = options;
    if (language) {
        await addScript(`./_content/BootstrapBlazor.VideoPlayer/lang/${language}.js`);
    }

    const player = videojs(id, options);
    player.ready(async () => {
        if (options.autoplay) {
            await player.play();
        }
        else if (options.poster) {
            player.poster(options.poster);
        }
    });
    Data.set(id, player);
}

export function setPoster(id, poster) {
    const player = Data.get(id);
    if (player && poster) {
        player.poster(poster);
    }
}

export function reloadPlayer(id, videoSource, type) {
    const player = Data.get(id);
    if (player) {
        if (!player.paused) {
            player.pause();
        }

        // 更新资源
        player.src({ src: videoSource, type: type });
        player.load();
        player.play();
    }
}

export function dispose(id) {
    Data.remove(id);
}
