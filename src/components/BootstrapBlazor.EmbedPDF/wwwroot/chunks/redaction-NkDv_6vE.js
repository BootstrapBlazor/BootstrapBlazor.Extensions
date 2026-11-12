import { aP as s, X as t, r as i, aQ as o, aR as u, U as l } from "./wasm-url-asset-BJXsMWLm.js";
const p = s(t, {
  read: (e) => ({
    pendingCount: e.getPendingCount(),
    applying: e.isApplying(),
    lastResult: e.getLastResult()
  }),
  empty: {
    pendingCount: 0,
    applying: !1,
    lastResult: null
  }
});
function r() {
  return i(t);
}
const g = o(p), c = Object.freeze([]);
function R(e) {
  const n = u();
  return l(
    (a) => a.tryCapability(t, n ?? void 0)?.listPending(void 0) ?? c
  );
}
export {
  g as a,
  R as b,
  r as u
};
//# sourceMappingURL=redaction-NkDv_6vE.js.map
