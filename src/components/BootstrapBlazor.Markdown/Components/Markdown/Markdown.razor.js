import '../../lib/tui.editor/toastui-editor-all.min.js'
import '../../lib/tui.editor/zh-cn.min.js'
import '../../lib/tui.highlight/toastui-editor-plugin-code-syntax-highlight-all.min.js'
import { addLink } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'

export async function init(id, invoker, options, callback) {
    await addLink('./_content/BootstrapBlazor.Markdown/css/bootstrap.blazor.markdown.min.css')

    const el = document.getElementById(id)
    const md = {}
    Data.set(id, md)

    md._invoker = invoker
    md._options = options
    md._invokerMethod = callback
    md._element = el
    md._options.el = el
    md._options.plugins = [];
    if (md._options.enableHighlight) {
        md._options.plugins.push(toastui.Editor.plugin.codeSyntaxHighlight)
    }
    md._editor = toastui.Editor.factory(md._options)
    md._editor.on('blur', () => {
        const val = md._editor.getMarkdown()
        const html = md._editor.getHTML()
        md._invoker.invokeMethodAsync(md._invokerMethod, [val, html])
    })
}

export function update(id, val) {
    const md = Data.get(id)
    md._editor.setMarkdown(val)
}

export function invoke(id, method, parameters) {
    const md = Data.get(id)
    md._editor[method](...parameters);
    const val = md._editor.getMarkdown()
    const html = md._editor.getHTML()
    md._invoker.invokeMethodAsync('Update', [val, html])
}

export function dispose(id) {
    const md = Data.get(id)
    Data.remove(id)
    md._editor.off('blur')
    md._editor.destroy()
}
