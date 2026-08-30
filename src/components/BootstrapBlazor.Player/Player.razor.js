import './plyr.js';
import './hls.js';
import { addLink, addScript } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';

export async function init(id, invoke, method, options) {
    await addLink('./_content/BootstrapBlazor.Player/plyr.css');
    await addScript('./_content/BootstrapBlazor.Player/plyr-plugin-thumbnail.js');

    const el = document.getElementById(id);
    const p = { el, invoke, method };
    Data.set(id, p);

    if (options.language === 'zh-CN') {
        setLang(options);
    }

    if (options.isHls === true) {
        delete options.isHls;
        initHls(p, options)
    }
    else {
        const source = options.source;
        delete options.source;

        const config = {
            keyboard: {
                global: true,
            },
            tooltips: {
                controls: true,
            },
            captions: {
                active: true,
            },
            ...options
        }
        p.player = new Plyr(el, config);
        handlerEvents(p);

        if (source.sources.length === 0) {
            return;
        }
        p.player.source = source;
    }
}

const initHls = (p, options) => {
    if (Hls.isSupported()) {
        const { el } = p;
        const hls = new Hls();
        const source = options.source.sources;
        if (source.length > 0) {
            const src = source[0].src;
            hls.loadSource(src)
            hls.attachMedia(el);
        }
        p.hls = hls;

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            const player = new Plyr(el, options);
            player.poster = source.poster ?? options.poster;
            player.on('languagechange', () => {
                setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
            });
            p.player = player;
            handlerEvents(p);
        });
    }
}

export function reload(id, options) {
    const p = Data.get(id);
    if (p === null) {
        return;
    }

    const { player, hls } = p;
    const source = options.source.sources;
    delete options.source;
    if (hls) {
        if (source.length > 0) {
            const src = source[0].src;
            hls.loadSource(src);
        }
    }
    else {
        player.poster = source.poster ?? options.poster;
        player.source = source;
    }
}

export function setPoster(id, poster) {
    const p = Data.get(id);
    if (p) {
        const { player } = p;
        player.poster = poster;
    }
}

export function dispose(id) {
    const p = Data.get(id);
    Data.remove(id);

    if (p) {
        const { player } = p;
        if (player) {
            player.destroy();
            delete p.player;
        }
    }
}

const handlerEventName = (name, p) => {
    const { el, invoke, method, player } = p;
    player.on(name, () => {
        const fire = el.getAttribute('data-bb-event') === 'true';
        if (fire) {
            invoke.invokeMethodAsync(method, name);
        }
    });
}

const handlerEvents = p => {
    ['ready', 'play', 'pause', 'ended', 'enterfullscreen', 'exitfullscreen', 'languagechange'].forEach(name => {
        handlerEventName(name, p);
    });
}

const setLang = (option) => {
    option.i18n = {
        restart: '重启',
        rewind: '后退 {seektime}s',
        play: '播放',
        pause: '暂停',
        fastForward: '前进 {seektime}s',
        seek: '进度',
        seekLabel: '{currentTime} of {duration}',
        played: '已播放',
        buffered: '已缓冲',
        currentTime: '当前时间',
        duration: '时长',
        volume: '音量',
        mute: '静音',
        unmute: '取消静音',
        enableCaptions: '开启字幕',
        disableCaptions: '禁用字幕',
        download: '下载',
        enterFullscreen: '全屏',
        exitFullscreen: '退出全屏',
        frameTitle: 'Player for {title}',
        captions: '字幕',
        settings: '设置',
        menuBack: '返回上级菜单',
        speed: '倍速',
        normal: '正常',
        quality: '清晰度',
        loop: '循环',
        start: '开始',
        end: '结束',
        all: '所有',
        reset: '重置',
        disabled: '禁用',
        enabled: '启用',
        advertisement: '广告',
        qualityBadge: {
            2160: '4K',
            1440: 'HD',
            1080: 'HD',
            720: 'HD',
            576: 'SD',
            480: 'SD',
        }
    }
}
