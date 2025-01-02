import { addLink } from '../BootstrapBlazor/modules/utility.js'
import MindMap from "./simpleMindMap.esm.min.js"
import Themes from "./themes.esm.min.js"
import Data from '../BootstrapBlazor/modules/data.js'

if (window.BootstrapBlazor === void 0) {
    window.BootstrapBlazor = {};
}

export async function init(id, invoke, data, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }
    await addLink('./_content/BootstrapBlazor.MindMap/mindmap.css');

    Themes.init(MindMap);

    options ??= {};
    options.el = el;
    const d = JSON.parse(data);
    if (d.root === null) {
        options.data = d;
    }
    const mindMap = new MindMap(options);
    if (d.root) {
        mindMap.setFullData(d)
    }

    const observer = new ResizeObserver(e => {
        mindMap.resize();
    });
    observer.observe(el);
    Data.set(id, { el, invoke, mindMap, observer });
}

export function update(id, options) {
    const mm = Data.get(id);
    const { mindMap } = mm;
    const { layout, theme } = options;
    if (layout !== mindMap.opt.layout) {
        mindMap.setLayout(layout);
    }
    if (theme !== mindMap.opt.theme) {
        mindMap.setTheme(theme);
    }
}

export function execute(id, method, args) {
    const mm = Data.get(id);
    const { mindMap } = mm;
    const fn = BootstrapBlazor.MindMap?.callbacks[method] ?? mindMap[method];
    if (fn) {
        fn.apply(mindMap, args);
    }
}

export function getData(id, withConfig = false) {
    const mm = Data.get(id);
    const { mindMap } = mm;
    const data = mindMap.getData(withConfig);
    return JSON.stringify(data);
}

export function setData(id, jsondata) {
    const mm = Data.get(id);
    const { mindMap } = mm;

    let data = JSON.parse(jsondata)
    if (data.root) {
        mindMap.setFullData(data)
    }
    else {
        mindMap.setData(data)
    }
    mindMap.view.reset()
}

export function exportAs(id, type = 'png', isDownload = true, fileName = 'mindMap', withConfig = true) {
    const mm = Data.get(id);
    const { mindMap } = mm;
    return mindMap.export(type, isDownload, fileName, withConfig)
}

export function reset(id) {
    const mm = Data.get(id);
    const { mindMap } = mm;
    mindMap.view.reset()
}

export function fit(id) {
    const mm = Data.get(id);
    const { mindMap } = mm;
    mindMap.view.fit()
}

export function scale(id, scale, cx, cy) {
    const mm = Data.get(id);
    const { mindMap } = mm;
    mindMap.view.setScale(scale, cx, cy)
}

export function dispose(id) {
    const mm = Data.get(id);
    Data.remove(id);

    const { observer } = mm;
    if (observer) {
        observer.disconnect();
        delete mm.observer;
    }
}
