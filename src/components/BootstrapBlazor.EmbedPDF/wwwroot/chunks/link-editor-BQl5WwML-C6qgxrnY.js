import { u as h, c as x, d as v, e as y, g as d, h as e, i as N, j as E, k as w, S as C } from "./wasm-url-asset-C3FjD8P-.js";
function b({ active: r, title: t, onClick: l, children: i }) {
  const o = w({ label: t });
  return /* @__PURE__ */ e(C, { children: [/* @__PURE__ */ e("button", {
    ...o.trigger,
    type: "button",
    onClick: l,
    className: `rounded border px-2.5 py-1 text-xs font-medium transition-colors ${r ? "border-accent bg-accent text-on-accent" : "border-border bg-surface text-fg hover:bg-hover"}`,
    children: i
  }), o.element] });
}
function T({ onClose: r }) {
  const t = h(), l = x(), i = v(), o = y().values.link ?? null, [a, c] = d(o?.kind === "goto" ? "page" : "uri"), [u, k] = d(o?.kind === "uri" ? o.uri : ""), [p, f] = d("1"), s = () => {
    if (a === "uri") {
      const m = u.trim();
      if (!m) return;
      i.selection.updateLink({
        kind: "uri",
        uri: m
      }), r();
      return;
    }
    const n = l.documents.getPage(Math.max(0, Number(p) - 1));
    n && (i.selection.updateLink({
      kind: "goto",
      destination: {
        kind: "fit",
        page: n.ref
      }
    }), r());
  }, g = "border-border bg-surface text-fg focus:border-accent w-full rounded border px-2.5 py-1.5 text-sm outline-none";
  return /* @__PURE__ */ e("div", {
    className: "border-border bg-surface w-64 rounded-lg border p-3 shadow-lg",
    children: [
      /* @__PURE__ */ e("div", {
        className: "mb-2 flex items-center justify-between",
        children: [/* @__PURE__ */ e("span", {
          className: "text-fg text-sm font-semibold",
          children: t("commands.annotate.link")
        }), /* @__PURE__ */ e(N, {
          label: t("panel.close"),
          onClick: r,
          className: "text-fg-muted hover:bg-hover grid h-6 w-6 place-items-center rounded",
          children: /* @__PURE__ */ e(E, {
            name: "x",
            size: 14
          })
        })]
      }),
      /* @__PURE__ */ e("div", {
        className: "mb-2 flex gap-1.5",
        children: [/* @__PURE__ */ e(b, {
          title: t("linkEditor.toUrl"),
          active: a === "uri",
          onClick: () => c("uri"),
          children: t("linkEditor.url")
        }), /* @__PURE__ */ e(b, {
          title: t("linkEditor.toPage"),
          active: a === "page",
          onClick: () => c("page"),
          children: t("linkEditor.page")
        })]
      }),
      a === "uri" ? /* @__PURE__ */ e("input", {
        type: "url",
        className: g,
        placeholder: t("linkEditor.urlPlaceholder"),
        autoFocus: !0,
        value: u,
        onChange: (n) => k(n.target.value),
        onKeyDown: (n) => n.key === "Enter" && s()
      }) : /* @__PURE__ */ e("input", {
        type: "number",
        min: 1,
        className: g,
        placeholder: t("linkEditor.pagePlaceholder"),
        autoFocus: !0,
        value: p,
        onChange: (n) => f(n.target.value),
        onKeyDown: (n) => n.key === "Enter" && s()
      }),
      /* @__PURE__ */ e("button", {
        type: "button",
        className: "bg-accent text-on-accent mt-2.5 w-full rounded px-2 py-1.5 text-sm font-medium",
        onClick: s,
        children: o == null ? t("linkEditor.add") : t("linkEditor.update")
      })
    ]
  });
}
export {
  T as LinkEditorCard
};
//# sourceMappingURL=link-editor-BQl5WwML-C6qgxrnY.js.map
