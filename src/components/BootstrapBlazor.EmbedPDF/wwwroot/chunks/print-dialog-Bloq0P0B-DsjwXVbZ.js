import { a5 as T, aC as q, e as n, u as E, au as P, aD as G, N as J, an as K, aE as Q, d as N, A as w, m as j, S as _, K as z } from "./wasm-url-asset-DQFmMC86.js";
function H(t, e) {
  const s = t.split(/[,，、،]/).map((a) => a.trim()).filter((a) => a !== "");
  if (s.length === 0) return null;
  const l = /* @__PURE__ */ new Set();
  for (const a of s) {
    const o = /^(\d+)(?:\s*[-–]\s*(\d+))?$/.exec(a);
    if (!o) return null;
    const d = Number(o[1]), u = o[2] === void 0 ? d : Number(o[2]);
    if (d < 1 || d > u || u > e) return null;
    for (let m = d; m <= u; m += 1) l.add(m);
  }
  return [...l].sort((a, o) => a - o);
}
function U(t, e, s, l) {
  if (t !== "all") {
    if (t === "current") {
      const a = e[s];
      return a ? [a.ref] : null;
    }
    return H(l, e.length)?.map((a) => e[a - 1].ref) ?? null;
  }
}
function L(t) {
  t.current?.cancel.abort(), t.current?.prepared?.destroy(), t.current = null;
}
function Y() {
  const t = T(q);
  return t.isOpen ? /* @__PURE__ */ n(V, { onClose: t.close }) : null;
}
function V({ onClose: t }) {
  const e = E(), s = P(), l = P(), a = P(), o = G(), d = J(), u = K(), m = Q((i) => i.currentPageIndex), [p, b] = N("all"), [y, $] = N(""), [R, F] = N(!0), [r, g] = N({ kind: "choosing" }), v = w(null), D = w(null), S = w(null), x = o.getPrintQuality(d ?? void 0), f = U(p, u, m, y);
  j(() => () => L(v), []);
  const A = (i) => {
    g({ kind: "printing" }), i.print().then(t, (h) => {
      console.warn("[embedpdf] print failed", h), g({ kind: "failed" });
    });
  }, M = (i) => {
    L(v);
    const h = {
      cancel: new AbortController(),
      prepared: null
    }, { signal: k } = h.cancel;
    v.current = h, g({
      kind: "preparing",
      progress: null
    }), o.preparePrint(d ?? void 0, {
      ...i ? { pages: i } : {},
      includeAnnotations: R,
      signal: k,
      onProgress: (c) => {
        k.aborted || g({
          kind: "preparing",
          progress: c
        });
      }
    }).then((c) => {
      if (k.aborted) return c.destroy();
      h.prepared = c, c.needsTap ? g({
        kind: "ready",
        prepared: c
      }) : A(c);
    }, (c) => {
      k.aborted || (console.warn("[embedpdf] preparing the printout failed", c), g({ kind: "failed" }));
    });
  };
  j(() => {
    r.kind === "preparing" && r.progress === null && D.current?.focus(), r.kind === "ready" && S.current?.focus();
  }, [r]);
  const C = r.kind === "choosing" || r.kind === "failed", O = r.kind === "preparing" ? r.progress && r.progress.pagesRendered > 0 ? e("print.preparingPage", { params: {
    page: Math.min(r.progress.pagesRendered + 1, r.progress.pageCount),
    total: r.progress.pageCount
  } }) : e("print.preparing") : r.kind === "ready" ? e("print.ready") : r.kind === "failed" ? e("print.failed") : null, B = x?.kind !== "images" ? null : x.dpi < 300 ? e("print.lowResolution", { params: { dpi: x.dpi } }) : e("print.images", { params: { dpi: x.dpi } });
  return /* @__PURE__ */ n(z, {
    labelledBy: s,
    onClose: () => {
      r.kind !== "printing" && t();
    },
    className: "border-border bg-surface w-96 rounded-lg border p-4 shadow-xl",
    children: /* @__PURE__ */ n("form", {
      onSubmit: (i) => {
        i.preventDefault(), r.kind === "ready" ? A(r.prepared) : C && f !== null && M(f);
      },
      children: [
        /* @__PURE__ */ n("h2", {
          id: s,
          className: "text-fg text-base font-semibold",
          children: e("print.title")
        }),
        C ? /* @__PURE__ */ n(_, { children: [
          /* @__PURE__ */ n("fieldset", {
            className: "mt-3",
            children: [/* @__PURE__ */ n("legend", {
              className: "text-fg-secondary text-sm font-medium",
              children: e("print.pages")
            }), /* @__PURE__ */ n("div", {
              className: "mt-1 flex flex-col gap-1",
              children: [
                /* @__PURE__ */ n(I, {
                  name: a,
                  checked: p === "all",
                  onChoose: () => b("all"),
                  label: e("print.allPages")
                }),
                /* @__PURE__ */ n(I, {
                  name: a,
                  checked: p === "current",
                  onChoose: () => b("current"),
                  label: e("print.currentPage")
                }),
                /* @__PURE__ */ n("div", {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */ n(I, {
                    name: a,
                    checked: p === "range",
                    onChoose: () => b("range"),
                    label: e("print.range"),
                    controls: l
                  }), /* @__PURE__ */ n("input", {
                    id: l,
                    type: "text",
                    inputMode: "numeric",
                    "aria-label": e("print.rangeLabel"),
                    "aria-invalid": p === "range" && f === null,
                    placeholder: e("print.rangePlaceholder"),
                    value: y,
                    onFocus: () => b("range"),
                    onChange: (i) => $(i.target.value),
                    className: "border-border bg-surface text-fg focus:border-accent focus:ring-accent min-w-0 flex-1 rounded-md border px-1.5 py-1 text-sm tabular-nums outline-none focus:ring-1 aria-[invalid=true]:border-red-600"
                  })]
                }),
                p === "range" && f === null && y.trim() !== "" ? /* @__PURE__ */ n("p", {
                  className: "text-xs text-red-600",
                  children: e("print.rangeInvalid", { params: { total: u.length } })
                }) : null
              ]
            })]
          }),
          /* @__PURE__ */ n("label", {
            className: "mt-3 flex cursor-pointer items-center gap-2 text-sm",
            children: [/* @__PURE__ */ n("input", {
              type: "checkbox",
              className: "accent-accent",
              checked: R,
              onChange: (i) => F(i.target.checked)
            }), /* @__PURE__ */ n("span", {
              className: "text-fg",
              children: e("print.annotations")
            })]
          }),
          B ? /* @__PURE__ */ n("p", {
            className: "text-fg-muted mt-3 text-xs",
            children: B
          }) : null
        ] }) : /* @__PURE__ */ n(W, {
          progress: r.kind === "preparing" ? r.progress : null,
          done: r.kind !== "preparing"
        }),
        /* @__PURE__ */ n("p", {
          role: "status",
          className: "text-fg-muted mt-2 min-h-5 text-sm",
          children: O
        }),
        /* @__PURE__ */ n("div", {
          className: "mt-3 flex justify-end gap-2",
          children: [/* @__PURE__ */ n("button", {
            ref: D,
            type: "button",
            disabled: r.kind === "printing",
            onClick: t,
            className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
            children: e("print.cancel")
          }), /* @__PURE__ */ n("button", {
            ref: S,
            type: "submit",
            disabled: C ? f === null : r.kind !== "ready",
            className: "bg-accent text-on-accent hover:bg-accent-hover rounded-md px-3 py-1.5 text-sm disabled:opacity-60",
            children: e("print.print")
          })]
        })
      ]
    })
  });
}
function W({ progress: t, done: e }) {
  const s = e ? 1 : t && t.pagesRendered > 0 ? t.pagesRendered / t.pageCount : null;
  return /* @__PURE__ */ n("div", {
    "aria-hidden": "true",
    className: "bg-hover mt-4 h-1.5 overflow-hidden rounded-full",
    children: /* @__PURE__ */ n("div", {
      className: `bg-accent h-full rounded-full transition-[width] ${s === null ? "w-full animate-pulse" : ""}`,
      style: s === null ? void 0 : { width: `${s * 100}%` }
    })
  });
}
function I({ name: t, checked: e, onChoose: s, label: l, controls: a }) {
  return /* @__PURE__ */ n("label", {
    className: "text-fg flex cursor-pointer items-center gap-2 text-sm",
    children: [/* @__PURE__ */ n("input", {
      type: "radio",
      name: t,
      className: "accent-accent",
      checked: e,
      onChange: s,
      "aria-controls": a
    }), l]
  });
}
export {
  Y as PrintDialog
};
//# sourceMappingURL=print-dialog-Bloq0P0B-DsjwXVbZ.js.map
