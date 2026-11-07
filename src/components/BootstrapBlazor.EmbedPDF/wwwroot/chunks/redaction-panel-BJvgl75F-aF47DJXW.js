import { u as i, r as p, s as m, a5 as x, e, I as s, T as f, w as u } from "./wasm-url-asset-DQFmMC86.js";
import { u as g, a as h, b } from "./redaction-fOC9I-lM.js";
function N() {
  const a = i(), d = g(), l = h((t) => t.applying), n = b(), r = p(m), c = x("redact-confirm");
  return /* @__PURE__ */ e("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [/* @__PURE__ */ e("div", {
      className: "min-h-0 flex-1 overflow-y-auto p-2",
      children: n.length === 0 ? /* @__PURE__ */ e("div", {
        className: "flex flex-col items-center gap-3 px-4 py-10 text-center",
        children: [/* @__PURE__ */ e(s, {
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
          onClick: () => r.selection.select([t.ref]),
          onKeyDown: (o) => o.key === "Enter" && r.selection.select([t.ref]),
          className: "hover:bg-hover group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-start",
          children: [
            /* @__PURE__ */ e(s, {
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
            /* @__PURE__ */ e(f, {
              label: a("demo.redactionRemove"),
              onClick: (o) => {
                o.stopPropagation(), r.delete(t.ref);
              },
              className: "text-fg-muted hover:text-fg grid h-6 w-6 shrink-0 place-items-center rounded opacity-0 group-hover:opacity-100",
              children: /* @__PURE__ */ e(s, {
                name: "trash",
                size: 14
              })
            })
          ]
        }) }, u(t.ref)))
      })
    }), /* @__PURE__ */ e("div", {
      className: "border-border-subtle flex shrink-0 gap-2 border-t p-3",
      children: [/* @__PURE__ */ e("button", {
        type: "button",
        disabled: n.length === 0,
        onClick: () => {
          for (const t of n) r.delete(t.ref);
        },
        className: "border-border text-fg hover:bg-hover flex-1 rounded-md border px-3 py-1.5 text-sm disabled:opacity-40",
        children: a("commands.redact.clearAll")
      }), /* @__PURE__ */ e("button", {
        type: "button",
        disabled: n.length === 0 || !d.canApply() || l,
        onClick: () => c.open(),
        className: "flex-1 rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-40",
        children: a("commands.redact.applyAll")
      })]
    })]
  });
}
export {
  N as RedactionPanel
};
//# sourceMappingURL=redaction-panel-BJvgl75F-aF47DJXW.js.map
