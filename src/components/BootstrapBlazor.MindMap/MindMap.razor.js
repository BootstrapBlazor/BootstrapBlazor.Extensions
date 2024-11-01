import MindMap from "./simpleMindMap.esm.min.js"

var mindMap = null;
var optionsCache = null; 

export function Init(element, data,options) {

    var el = element.querySelector("[data-action=mindMapContainer]");

    if (mindMap == undefined) {
        mindMap = new MindMap({
            el: el,
            layout: options.layout,
            theme: options.theme,
            data: data
        });
        optionsCache = options;
    } else {
        SetLayout(options.layout);
        SetTheme(options.theme);
        return;
    }

    return {
        dispose: () => {
            element.cloneNode(true);
        }
    }

}

export function Export(instance, type = 'png', isDownload = true, fileName = 'temp', withConfig = true) {  
    var ret=mindMap.export(type, isDownload, fileName, withConfig)
    if (!isDownload) instance.invokeMethodAsync('ReceiveData', ret);
}

export async function GetData(instance, fullData = true) {
    instance.invokeMethodAsync('ReceiveData', JSON.stringify(mindMap.getData(fullData)));
}

export function SetData(jsondata) {

    let data = JSON.parse(jsondata)
    if (data.root) {
        mindMap.setFullData(data)
    } else {
        mindMap.setData(data)
    }
    mindMap.view.reset()
}

export function Reset() {
    mindMap.view.reset()
}

export function SetTheme(theme) {
    if (optionsCache.theme == undefined || optionsCache.theme != theme) {
        optionsCache.theme = theme;
        mindMap.setTheme(theme);
    }
}

export function SetLayout(layout) {
    if (optionsCache.layout == undefined || optionsCache.layout != layout) {
        optionsCache.layout = layout;
    mindMap.setLayout(layout);
    }
}

export function Search(searchInputRef) {
    mindMap.search.search(this.searchText, () => {
        searchInputRef.focus()
    })
}

export function Replace(replaceAll = false) {
    if (!replaceAll) {
        mindMap.search.replace(this.replaceText, true)
    } else {
        mindMap.search.replaceAll(this.replaceText)
    }
}
