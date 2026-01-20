import "../../lib/xterm/xterm.js";
import "../../lib/xterm/xterm-addon-fit.js";

export function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    // Load CSS
    const linkId = "bb-term-css";
    if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = './_content/BootstrapBlazor.Term/lib/xterm/xterm.css';
        document.head.appendChild(link);
    }

    const term = new Terminal({
        fontFamily: options.fontFamily || "Consolas, 'Courier New', monospace",
        fontSize: options.fontSize || 14,
        cursorBlink: options.cursorBlink,
        lineHeight: options.lineHeight || 1.0,
        theme: options.theme || {}
    });

    const fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);

    term.open(el);
    fitAddon.fit();

    term.onData(data => {
        invoke.invokeMethodAsync("OnDataAsync", data);
    });

    term.onResize(size => {
        invoke.invokeMethodAsync("OnResizeAsync", size.rows, size.cols);
    });

    // Store instance
    el.term = term;
    el.fitAddon = fitAddon;
    el.invoke = invoke;

    // Window resize handling
    const resizeHandler = () => {
        try {
            fitAddon.fit();
            const dims = fitAddon.proposeDimensions();
            if (dims) {
               invoke.invokeMethodAsync("OnResizeAsync", dims.rows, dims.cols);
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
