import { u as i, B as p, a6 as m, l as e, m as d, T as x } from "./init-tVr9KnGC.js";
import { u as f, a as u, b as g } from "./redaction-DIV-C4iV.js";
import { AnnotationToken as h, annotationKey as b } from "@embedpdf/plugin-annotation";
function k() {
  const a = i(), l = f(), s = u((t) => t.applying), n = g(), o = p(h), c = m("redact-confirm");
  return /* @__PURE__ */ e("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [/* @__PURE__ */ e("div", {
      className: "min-h-0 flex-1 overflow-y-auto p-2",
      children: n.length === 0 ? /* @__PURE__ */ e("div", {
        className: "flex flex-col items-center gap-3 px-4 py-10 text-center",
        children: [/* @__PURE__ */ e(d, {
          name: "redactionSidebar",
          size: 32,
          className: "text-fg-muted"
        }), /* @__PURE__ */ e("p", {
          className: "text-fg-muted text-sm",
          children: a("demo.redactionEmpty")
        })]
      }) : /* @__PURE__ */ e("ul", {
        className: "flex flex-col gap-1",
        children: n.map((t) => /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("div", {
          role: "button",
          tabIndex: 0,
          onClick: () => o.selection.select([t.ref]),
          onKeyDown: (r) => r.key === "Enter" && o.selection.select([t.ref]),
          className: "hover:bg-hover group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-start",
          children: [
            /* @__PURE__ */ e(d, {
              name: t.kind === "area" ? "redactArea" : "redact",
              size: 16,
              className: "text-fg-muted shrink-0"
            }),
            /* @__PURE__ */ e("span", {
              className: "text-fg min-w-0 flex-1 truncate text-sm",
              children: t.overlayText ?? a(t.kind === "area" ? "demo.redactionArea" : "demo.redactionText")
            }),
            /* @__PURE__ */ e("span", {
              className: "text-fg-muted shrink-0 text-xs",
              children: a("demo.pageBadge", { params: { page: t.pageIndex >= 0 ? String(t.pageIndex + 1) : "?" } })
            }),
            /* @__PURE__ */ e(x, {
              label: a("demo.redactionRemove"),
              onClick: (r) => {
                r.stopPropagation(), o.delete(t.ref);
              },
              className: "text-fg-muted hover:text-fg grid h-6 w-6 shrink-0 place-items-center rounded opacity-0 group-hover:opacity-100",
              children: /* @__PURE__ */ e(d, {
                name: "trash",
                size: 14
              })
            })
          ]
        }) }, b(t.ref)))
      })
    }), /* @__PURE__ */ e("div", {
      className: "border-border-subtle flex shrink-0 gap-2 border-t p-3",
      children: [/* @__PURE__ */ e("button", {
        type: "button",
        disabled: n.length === 0,
        onClick: () => {
          for (const t of n) o.delete(t.ref);
        },
        className: "border-border text-fg hover:bg-hover flex-1 rounded-md border px-3 py-1.5 text-sm disabled:opacity-40",
        children: a("commands.redact.clearAll")
      }), /* @__PURE__ */ e("button", {
        type: "button",
        disabled: n.length === 0 || !l.canApply() || s,
        onClick: () => c.open(),
        className: "flex-1 rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-40",
        children: a("commands.redact.applyAll")
      })]
    })]
  });
}
export {
  k as RedactionPanel
};
//# sourceMappingURL=redaction-panel-Djm12Ydh-CzJptj00.js.map
