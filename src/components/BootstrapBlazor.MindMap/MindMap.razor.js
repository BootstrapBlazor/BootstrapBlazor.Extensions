import { addLink } from '../BootstrapBlazor/modules/utility.js'
import MindMap from "./simpleMindMap.esm.min.js"
import Data from '../BootstrapBlazor/modules/data.js'

export async function init(id, data, options) {
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
    Data.set(id, { el, mindMap });
}

export function dispose(id) {
    Data.remove(id);
}

export function saveAs(id, type = 'png', isDownload = true, fileName = 'temp', withConfig = true) {
    var ret = mindMap.export(type, isDownload, fileName, withConfig)
    if (!isDownload) instance.invokeMethodAsync('ReceiveData', ret);
}

export async function getData(instance, fullData = true) {
    instance.invokeMethodAsync('ReceiveData', JSON.stringify(mindMap.getData(fullData)));
}

export function setData(jsondata) {

    let data = JSON.parse(jsondata)
    if (data.root) {
        mindMap.setFullData(data)
    } else {
        mindMap.setData(data)
    }
    mindMap.view.reset()
}

export function reset() {
    mindMap.view.reset()
}

export function setTheme(theme) {
    if (optionsCache.theme == undefined || optionsCache.theme != theme) {
        optionsCache.theme = theme;
        mindMap.setTheme(theme);
    }
}

export function setLayout(layout) {
    if (optionsCache.layout == undefined || optionsCache.layout != layout) {
        optionsCache.layout = layout;
        mindMap.setLayout(layout);
    }
}

export function search(searchInputRef) {
    mindMap.search.search(this.searchText, () => {
        searchInputRef.focus()
    })
}

export function replace(replaceAll = false) {
    if (!replaceAll) {
        mindMap.search.replace(this.replaceText, true)
    }
    else {
        mindMap.search.replaceAll(this.replaceText)
    }
}
