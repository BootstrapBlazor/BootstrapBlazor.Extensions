import '../../js/cherry-markdown.core.js'
import { addLink, addScript } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'

export async function init(id, invoke, options, callback) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addLink('./_content/BootstrapBlazor.CherryMarkdown/css/cherry-markdown.min.css')
    if (options.isSupportMath) {
        await addScript('./_content/BootstrapBlazor.CherryMarkdown/js/katex.min.js')
        await addLink('./_content/BootstrapBlazor.CherryMarkdown/css/katex.min.css')
        options.engine = {
            syntax: {
                mathBlock: { engine: 'katex', },
                inlineMath: { engine: 'katex' }
            }
        }
        options.externals = { katex: window.katex };
        delete options.isSupportMath;
    }
    if (options.isViewer) {
        options.editor.defaultModel = 'previewOnly';
        options.toolbars.Toolbar = false;
    }

    const fileUpload = (file, cb) => {
        md.file = file
        invoke.invokeMethodAsync(callback, {
            fileName: file.name,
            fileSize: file.size,
            contentType: file.type,
            lastModified: new Date(file.lastModified).toISOString(),
        }).then(data => {
            if (data !== "") {
                cb(data)
            }
        })
    }

    options.editor = {
        theme: 'Default',
        height: '100%',
        defaultModel: 'edit&preview',
        convertWhenPaste: true,
        ...options.editor
    }

    const op = {
        el,
        ...options,
        callback: {
            afterChange: (markdown, html) => {
                invoke.invokeMethodAsync('Update', [markdown, html])
            }
        },
        fileUpload: fileUpload
    };

    if (op.locale) {
        op.locale = op.locale.replace('-', '_');
    }

    const editor = new Cherry(op);
    const md = { invoke, editor };
    Data.set(id, md);
}

export function update(id, val) {
    const md = Data.get(id);
    const { editor } = md;
    if (md) {
        editor.setMarkdown(val, true)
    }
}

export function fetch(id) {
    const md = Data.get(id)
    const { file } = md;
    return file
}

export function invoke(id, method, parameters) {
    const md = Data.get(id)
    const { editor, invoke } = md;

    if (method.indexOf('.') < 0) {
        editor[method](...parameters)
    }
    else {
        const methods = method.split('.');
        let m = editor[methods[0]];
        for (let i = 1; i < methods.length; i++) {
            m = m[methods[i]]
        }
        m(...parameters);
    }
    const val = editor.getMarkdown();
    const html = editor.getHtml();
    invoke.invokeMethodAsync('Update', [val, html]);
}

export function dispose(id) {
    Data.remove(id)
}
