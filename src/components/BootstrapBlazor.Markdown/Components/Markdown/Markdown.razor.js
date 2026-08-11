import '../../lib/tui.editor/toastui-editor-all.min.js'
import '../../lib/tui.editor/zh-cn.min.js'
import '../../lib/tui.highlight/toastui-editor-plugin-code-syntax-highlight-all.min.js'
import { addLink } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'
import EventHandler from '../../../BootstrapBlazor/modules/event-handler.js'

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

    md._modal = el.closest('.modal')
    if (md._modal) {
        md._modalHideHandler = () => disposeEditor(id)
        EventHandler.on(md._modal, 'hidden.bs.modal', md._modalHideHandler)
    }
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
    disposeEditor(id)
}

function disposeEditor(id) {
    const md = Data.get(id)
    Data.remove(id)

    if (md) {
        const { _modal, _editor, _modalHideHandler } = md;
        if (_modal && _modalHideHandler) {
            EventHandler.off(_modal, 'hidden.bs.modal', _modalHideHandler)
        }
        if (_editor) {
            _editor.off('blur')
            _editor.destroy()
        }
    }
}
