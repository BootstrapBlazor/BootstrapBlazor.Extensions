import { aP as s, V as t, r as i, aQ as o, aR as u, Q as l } from "./wasm-url-asset-DQFmMC86.js";
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
//# sourceMappingURL=redaction-fOC9I-lM.js.map
