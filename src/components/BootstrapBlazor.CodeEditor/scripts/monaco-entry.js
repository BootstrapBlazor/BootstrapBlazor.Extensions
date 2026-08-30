import * as monaco from "monaco-editor";

const workerUrls = {
    editorWorkerService: new URL("./editor.worker.js", import.meta.url),
    json: new URL("./json.worker.js", import.meta.url),
    css: new URL("./css.worker.js", import.meta.url),
    scss: new URL("./css.worker.js", import.meta.url),
    less: new URL("./css.worker.js", import.meta.url),
    html: new URL("./html.worker.js", import.meta.url),
    handlebars: new URL("./html.worker.js", import.meta.url),
    razor: new URL("./html.worker.js", import.meta.url),
    typescript: new URL("./ts.worker.js", import.meta.url),
    javascript: new URL("./ts.worker.js", import.meta.url)
};

globalThis.MonacoEnvironment = {
    getWorker(_, label) {
        return new Worker(workerUrls[label] ?? workerUrls.editorWorkerService, { type: "module" });
    }
};

export { monaco };
