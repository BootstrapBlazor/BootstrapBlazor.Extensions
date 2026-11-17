import { E as s, i as a } from "./init-D01edhbm.js";
function o(i, r = {}) {
  s.defaultEngineProvider = (n) => {
    const e = { ...n };
    return r.wasmUrl && !e.wasmUrl && !e.wasmBinary && !e.assetsUrl && (e.wasmUrl = r.wasmUrl), { engine: () => i(e) };
  };
}
const t = a, l = { init: t };
export {
  l as E,
  o as r
};
//# sourceMappingURL=surface-Br1_XJP4.js.map
