import { u as b, a5 as y, d as p, au as g, e, K as x } from "./wasm-url-asset-DQFmMC86.js";
import { u as h } from "./redaction-fOC9I-lM.js";
function v() {
  const t = b(), r = y("redact-confirm"), a = h(), [s, n] = p(!1), [d, c] = p(null), i = g();
  if (!r.isOpen) return null;
  const o = r.props.refs, m = o ? o.length : a.getPendingCount(), u = a.estimateCollateral(o).count, f = async () => {
    n(!0), c(null);
    try {
      await (o ? a.apply(o) : a.applyAll()), r.close();
    } catch (l) {
      c(l instanceof Error ? l.message : String(l));
    } finally {
      n(!1);
    }
  };
  return /* @__PURE__ */ e(x, {
    labelledBy: i,
    onClose: () => {
      s || r.close();
    },
    className: "border-border bg-surface w-96 rounded-lg border p-4 shadow-xl",
    children: [
      /* @__PURE__ */ e("h2", {
        id: i,
        className: "text-fg text-base font-semibold",
        children: t("demo.redactConfirmTitle", { params: { count: m } })
      }),
      /* @__PURE__ */ e("p", {
        className: "text-fg-muted mt-2 text-sm",
        children: t("demo.redactConfirmBody", { params: { count: m } })
      }),
      u > 0 ? /* @__PURE__ */ e("p", {
        className: "mt-2 text-sm font-medium text-red-600",
        children: t("demo.redactConfirmCollateral", { params: { count: u } })
      }) : null,
      d ? /* @__PURE__ */ e("p", {
        className: "mt-2 text-sm text-red-600",
        children: d
      }) : null,
      /* @__PURE__ */ e("div", {
        className: "mt-4 flex justify-end gap-2",
        children: [/* @__PURE__ */ e("button", {
          type: "button",
          disabled: s,
          onClick: r.close,
          className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
          children: t("demo.cancel")
        }), /* @__PURE__ */ e("button", {
          type: "button",
          disabled: s,
          onClick: () => void f(),
          className: "rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-60",
          children: t(s ? "demo.redactApplying" : "demo.redactApply")
        })]
      })
    ]
  });
}
export {
  v as RedactConfirmModal
};
//# sourceMappingURL=redact-confirm-C0AI8Tbt-BKs7oimi.js.map
