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

    options = {
        ... {
            fontFamily: "Consolas, 'Courier New', monospace",
            fontSize: 14,
            lineHeight: 1.0,
        },
        ...options
    };

    const term = new Terminal(options);
    const fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);

    term.open(el);
    fitAddon.fit();

    const encoder = new TextEncoder();
    term.onData(data => {
        invoke.invokeMethodAsync("TriggerReceiveDataAsync", encoder.encode(data));
    });

    term.onResize(size => {
        invoke.invokeMethodAsync("TriggerResizeAsync", size.rows, size.cols);
    });

    const resizeHandler = () => {
        try {
            fitAddon.fit();
            const dims = fitAddon.proposeDimensions();
            if (dims) {
                invoke.invokeMethodAsync("TriggerResizeAsync", dims.rows, dims.cols);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    window.addEventListener('resize', resizeHandler);

    Data.set(id, {
        term,
        resizeHandler
    });
}

export function write(id, data) {
    const terminal = Data.get(id);
    const { term } = terminal;
    if (term) {
        term.write(data);
    }
}

export function writeln(id, data) {
    const terminal = Data.get(id);
    const { term } = terminal;
    if (term) {
        term.writeln(data);
    }
}

export function clear(id) {
    const terminal = Data.get(id);
    const { term } = terminal;
    if (term) {
        term.clear();
    }
}

export function dispose(id) {
    const terminal = Data.get(id);
    Data.remove(id);

    const { term, resizeHandler } = terminal;
    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
    }
    if (term) {
        term.dispose();
    }
}
