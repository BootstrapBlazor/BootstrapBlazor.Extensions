﻿import '../../js/cherry-markdown.min.js'
import { addLink } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'

export async function init(id, invoker, options, callback) {
    await addLink('./_content/BootstrapBlazor.CherryMarkdown/css/cherry-markdown.min.css')

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }
    const md = {}
    Data.set(id, md)

    md._invoker = invoker
    md._invokerMethod = callback
    md._element = el
    md._options = options

    if (md._options.toolbars.toolbar === null) {
        delete md._options.toolbars.toolbar
    }
    if (md._options.toolbars.bubble === null) {
        delete md._options.toolbars.bubble
    }
    if (md._options.toolbars.float === null) {
        delete md._options.toolbars.float
    }

    const fileUpload = (file, callback) => {
        md._file = file
        md._invoker.invokeMethodAsync(md._invokerMethod, {
            fileName: file.name,
            fileSize: file.size,
            contentType: file.type,
            lastModified: new Date(file.lastModified).toISOString(),
        }).then(data => {
            if (data !== "") {
                callback(data)
            }
        })
    }

    md._editor = new Cherry({
        el: md._element,
        value: md._options.value,
        editor: md._options.editor,
        toolbars: md._options.toolbars,
        callback: {
            afterChange: (markdown, html) => {
                md._invoker.invokeMethodAsync('Update', [markdown, html])
            }
        },
        fileUpload: fileUpload
    });
}

export function update(id, val) {
    const md = Data.get(id)
    md._editor.setMarkdown(val, true)
}

export function fetch(id) {
    const md = Data.get(id)
    return md._file
}

export function invoke(id, method, parameters) {
    const md = Data.get(id)
    if (method.indexOf('.') < 0) {
        md._editor[method](...parameters)
    }
    else {
        const methods = method.split('.');
        let m = md._editor[methods[0]];
        for (let i = 1; i < methods.length; i++) {
            m = m[methods[i]]
        }
        m(...parameters);
    }
    const val = md._editor.getMarkdown();
    const html = md._editor.getHtml();
    md._invoker.invokeMethodAsync('Update', [val, html]);
}

export function dispose(id) {
    Data.remove(id)
}
