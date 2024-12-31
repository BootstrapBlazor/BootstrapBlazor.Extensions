import { addLink } from '../BootstrapBlazor/modules/utility.js'
import MindMap from "./simpleMindMap.esm.min.js"
import Data from '../BootstrapBlazor/modules/data.js'

export async function init(id, invoke, data, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }
    await addLink('./_content/BootstrapBlazor.MindMap/mindmap.css');

    options ??= {};
    options.el = el;
    options.data = data;

    const mindMap = new MindMap({
        el: el,
        layout: options.layout,
        theme: options.theme,
        data: data
    });
    Data.set(id, { el, invoke, mindMap });
}

export function execute(id, method, args) {
    const mm = Data.get(id);
    const { mindMap } = mm;
    const fn = mindMap[method];
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

export function exportAs(id, type = 'png', isDownload = true, fileName = 'temp', withConfig = true) {
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

export function dispose(id) {
    Data.remove(id);
}
