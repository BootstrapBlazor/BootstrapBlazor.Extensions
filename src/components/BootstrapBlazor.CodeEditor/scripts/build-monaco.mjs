import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { build } from "esbuild";

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectDirectory, "wwwroot", "monaco-editor");
const monacoDirectory = path.join(projectDirectory, "node_modules", "monaco-editor", "esm", "vs");

await rm(outputDirectory, { recursive: true, force: true });

const commonOptions = {
    bundle: true,
    format: "esm",
    minify: true,
    target: "es2022",
    legalComments: "eof",
    logLevel: "info"
};

await build({
    ...commonOptions,
    entryPoints: [path.join(projectDirectory, "scripts", "monaco-entry.js")],
    outfile: path.join(outputDirectory, "monaco.js"),
    assetNames: "[name]",
    loader: {
        ".ttf": "file"
    }
});

await build({
    ...commonOptions,
    entryPoints: {
        "editor.worker": path.join(monacoDirectory, "editor", "editor.worker.js"),
        "json.worker": path.join(monacoDirectory, "language", "json", "json.worker.js"),
        "css.worker": path.join(monacoDirectory, "language", "css", "css.worker.js"),
        "html.worker": path.join(monacoDirectory, "language", "html", "html.worker.js"),
        "ts.worker": path.join(monacoDirectory, "language", "typescript", "ts.worker.js")
    },
    outdir: outputDirectory
});
