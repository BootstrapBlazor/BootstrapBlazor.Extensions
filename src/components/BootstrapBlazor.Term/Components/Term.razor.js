import "../lib/xterm.js";
import "../lib/xterm-addon-fit.js";
import { addLink } from '../../BootstrapBlazor/modules/utility.js'
import Data from '../../BootstrapBlazor/modules/data.js'

export async function init(id, invoke, options) {
    await addLink('./_content/BootstrapBlazor.Term/lib/xterm.css');

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const term = new Terminal({
        fontFamily: options.fontFamily || "Consolas, 'Courier New', monospace",
        fontSize: options.fontSize || 14,
        cursorBlink: options.cursorBlink,
        lineHeight: options.lineHeight || 1.0,
        theme: options.theme || {},
        convertEol: options.convertEol
    });

    const fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);

    term.open(el);
    fitAddon.fit();

    const encoder = new TextEncoder();
    term.onData(data => {
        el.term.write(data);
        console.log(data);
        //invoke.invokeMethodAsync("TriggerReceiveDataAsync", encoder.encode(data));
    });

    term.onResize(size => {
        invoke.invokeMethodAsync("TriggerResizeAsync", size.rows, size.cols);
    });

    el.term = term;
    el.fitAddon = fitAddon;
    el.invoke = invoke;

    const resizeHandler = () => {
        try {
            fitAddon.fit();
            const dims = fitAddon.proposeDimensions();
            if (dims) {
                invoke.invokeMethodAsync("TriggerResizeAsync", dims.rows, dims.cols);
            }
        } catch (e) { }
    };
    window.addEventListener('resize', resizeHandler);
    el.resizeHandler = resizeHandler;
}

export function write(id, data) {
    const el = document.getElementById(id);
    if (el && el.term) {
        el.term.write(data);
    }
}

export function writeln(id, data) {
    const el = document.getElementById(id);
    if (el && el.term) {
        el.term.writeln(data);
    }
}

export function clear(id) {
    const el = document.getElementById(id);
    if (el && el.term) {
        el.term.clear();
    }
}

export function dispose(id) {
    const el = document.getElementById(id);
    if (el) {
        if (el.resizeHandler) {
            window.removeEventListener('resize', el.resizeHandler);
        }
        if (el.term) {
            el.term.dispose();
            delete el.term;
        }
        if (el.fitAddon) {
            delete el.fitAddon;
        }
    }
}
