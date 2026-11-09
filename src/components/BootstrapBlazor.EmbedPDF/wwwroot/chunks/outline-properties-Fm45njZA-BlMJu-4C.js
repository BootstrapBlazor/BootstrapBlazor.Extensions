import { a5 as B, aH as D, U as R, e as t, u as G, a as U, au as z, d as o, K as W, aI as M } from "./wasm-url-asset-DQFmMC86.js";
const Y = [
  "#000000",
  "#c92a2a",
  "#e8590c",
  "#2b8a3e",
  "#1864ab",
  "#6741d9",
  "#868e96"
], y = [
  "NextPage",
  "PrevPage",
  "FirstPage",
  "LastPage"
], q = {
  NextPage: "commands.page.next",
  PrevPage: "commands.page.previous",
  FirstPage: "commands.page.first",
  LastPage: "commands.page.last"
};
function X() {
  const d = B(D), r = R(M), i = d.props.item, l = r && i !== void 0 ? r.get({
    kind: "objectNumber",
    objectNumber: i
  }) : null;
  return !d.isOpen || !r || !l ? null : /* @__PURE__ */ t(J, {
    outline: r,
    item: l,
    hasChildren: r.getChildren(l.ref).length > 0,
    onClose: d.close
  }, i);
}
function J({ outline: d, item: r, hasChildren: i, onClose: l }) {
  const n = G(), P = U(), C = z(), a = r.target, E = (e) => P.documents.getPage(e)?.index ?? 0, [p, S] = o(r.title), [s, g] = o(r.color), [m, T] = o(r.bold), [b, H] = o(r.italic), [f, F] = o(r.open), [c, K] = o(() => a ? a.kind === "goto" ? "page" : a.kind === "uri" ? "uri" : a.kind === "named" && y.includes(a.name) ? "named" : "kept" : "none"), [O, L] = o(() => String(a?.kind === "goto" ? E(a.destination.page) + 1 : 1)), h = a?.kind === "goto" && (a.destination.kind === "fit" || a.destination.kind === "fitH") ? a.destination.kind : "kept", [k, V] = o(h), [w, _] = o(a?.kind === "uri" ? a.uri : ""), [x, $] = o(a?.kind === "named" && y.includes(a.name) ? a.name : "NextPage"), j = () => {
    switch (c) {
      case "none":
        return a ? null : void 0;
      case "view":
        return d.getCurrentViewTarget() ?? void 0;
      case "page": {
        const e = P.documents.getPage(Math.max(0, Number(O) - 1));
        return !e || a?.kind === "goto" && E(a.destination.page) === e.index && k === h ? void 0 : {
          kind: "goto",
          destination: k === "fitH" ? {
            kind: "fitH",
            page: e.ref,
            y: 0
          } : {
            kind: "fit",
            page: e.ref
          }
        };
      }
      case "uri": {
        const e = w.trim();
        return !e || a?.kind === "uri" && a.uri === e ? void 0 : {
          kind: "uri",
          uri: e
        };
      }
      case "named":
        return a?.kind === "named" && a.name === x ? void 0 : {
          kind: "named",
          name: x
        };
      case "kept":
        return;
    }
  }, A = () => {
    const e = {
      ...p !== r.title ? { title: p } : {},
      ...s !== r.color ? { color: s } : {},
      ...m !== r.bold ? { bold: m } : {},
      ...b !== r.italic ? { italic: b } : {},
      ...i && f !== r.open ? { open: f } : {}
    }, I = j();
    I !== void 0 && (e.target = I), Object.keys(e).length > 0 && d.update(r.ref, e).catch(() => {
    }), l();
  }, u = "border-border bg-surface text-fg focus:border-accent w-full rounded border px-2.5 py-1.5 text-sm outline-none", v = "text-fg-secondary mb-1 block text-xs font-medium", N = "text-fg-secondary flex items-center gap-2 text-sm";
  return /* @__PURE__ */ t(W, {
    labelledBy: C,
    onClose: l,
    className: "border-border bg-surface w-96 max-w-[calc(100vw-2rem)] rounded-lg border p-4 shadow-xl",
    children: /* @__PURE__ */ t("form", {
      onSubmit: (e) => {
        e.preventDefault(), A();
      },
      className: "flex flex-col gap-3",
      children: [
        /* @__PURE__ */ t("h2", {
          id: C,
          className: "text-fg text-base font-semibold",
          children: n("outline.properties.title")
        }),
        /* @__PURE__ */ t("label", { children: [/* @__PURE__ */ t("span", {
          className: v,
          children: n("outline.properties.name")
        }), /* @__PURE__ */ t("input", {
          type: "text",
          value: p,
          maxLength: 32767,
          onChange: (e) => S(e.target.value),
          className: u
        })] }),
        /* @__PURE__ */ t("fieldset", { children: [/* @__PURE__ */ t("legend", {
          className: v,
          children: n("outline.properties.color")
        }), /* @__PURE__ */ t("div", {
          className: "flex flex-wrap items-center gap-1.5",
          children: [
            /* @__PURE__ */ t("button", {
              type: "button",
              "aria-pressed": s === null,
              onClick: () => g(null),
              className: `border-border text-fg rounded border px-2 py-0.5 text-xs ${s === null ? "ring-accent ring-2" : ""}`,
              children: n("outline.properties.noColor")
            }),
            Y.map((e) => /* @__PURE__ */ t("button", {
              type: "button",
              "aria-label": e,
              "aria-pressed": s === e,
              onClick: () => g(e),
              className: `border-border h-6 w-6 rounded-full border ${s === e ? "ring-accent ring-2 ring-offset-1" : ""}`,
              style: { background: e }
            }, e)),
            /* @__PURE__ */ t("input", {
              type: "color",
              "aria-label": n("outline.properties.customColor"),
              value: s ?? "#000000",
              onChange: (e) => g(e.target.value),
              className: "h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
            })
          ]
        })] }),
        /* @__PURE__ */ t("div", {
          className: "flex gap-4",
          children: [/* @__PURE__ */ t("label", {
            className: N,
            children: [/* @__PURE__ */ t("input", {
              type: "checkbox",
              checked: m,
              onChange: (e) => T(e.target.checked)
            }), /* @__PURE__ */ t("span", {
              className: "font-semibold",
              children: n("outline.properties.bold")
            })]
          }), /* @__PURE__ */ t("label", {
            className: N,
            children: [/* @__PURE__ */ t("input", {
              type: "checkbox",
              checked: b,
              onChange: (e) => H(e.target.checked)
            }), /* @__PURE__ */ t("span", {
              className: "italic",
              children: n("outline.properties.italic")
            })]
          })]
        }),
        /* @__PURE__ */ t("label", {
          className: `${N} ${i ? "" : "opacity-50"}`,
          children: [/* @__PURE__ */ t("input", {
            type: "checkbox",
            disabled: !i,
            checked: i && f,
            onChange: (e) => F(e.target.checked)
          }), n("outline.properties.open")]
        }),
        /* @__PURE__ */ t("fieldset", {
          className: "flex flex-col gap-2",
          children: [
            /* @__PURE__ */ t("legend", {
              className: v,
              children: n("outline.properties.target")
            }),
            /* @__PURE__ */ t("select", {
              value: c,
              onChange: (e) => K(e.target.value),
              className: u,
              children: [
                /* @__PURE__ */ t("option", {
                  value: "none",
                  children: n("outline.properties.targetNone")
                }),
                /* @__PURE__ */ t("option", {
                  value: "view",
                  children: n("outline.properties.targetView")
                }),
                /* @__PURE__ */ t("option", {
                  value: "page",
                  children: n("linkEditor.page")
                }),
                /* @__PURE__ */ t("option", {
                  value: "uri",
                  children: n("linkEditor.url")
                }),
                /* @__PURE__ */ t("option", {
                  value: "named",
                  children: n("outline.properties.targetNamed")
                }),
                c === "kept" && /* @__PURE__ */ t("option", {
                  value: "kept",
                  children: n("outline.properties.targetKept")
                })
              ]
            }),
            c === "page" && /* @__PURE__ */ t("div", {
              className: "flex gap-2",
              children: [/* @__PURE__ */ t("input", {
                type: "number",
                min: 1,
                value: O,
                "aria-label": n("linkEditor.pagePlaceholder"),
                onChange: (e) => L(e.target.value),
                className: `${u} w-24`
              }), /* @__PURE__ */ t("select", {
                value: k,
                "aria-label": n("outline.properties.fit"),
                onChange: (e) => V(e.target.value),
                className: u,
                children: [
                  h === "kept" && /* @__PURE__ */ t("option", {
                    value: "kept",
                    children: n("outline.properties.fitKept")
                  }),
                  /* @__PURE__ */ t("option", {
                    value: "fit",
                    children: n("commands.zoom.fitPage")
                  }),
                  /* @__PURE__ */ t("option", {
                    value: "fitH",
                    children: n("commands.zoom.fitWidth")
                  })
                ]
              })]
            }),
            c === "uri" && /* @__PURE__ */ t("input", {
              type: "url",
              value: w,
              placeholder: n("linkEditor.urlPlaceholder"),
              onChange: (e) => _(e.target.value),
              className: u
            }),
            c === "named" && /* @__PURE__ */ t("select", {
              value: x,
              "aria-label": n("outline.properties.targetNamed"),
              onChange: (e) => $(e.target.value),
              className: u,
              children: y.map((e) => /* @__PURE__ */ t("option", {
                value: e,
                children: n(q[e])
              }, e))
            }),
            c === "kept" && /* @__PURE__ */ t("p", {
              className: "text-fg-muted text-xs",
              children: n("outline.properties.keptNote")
            })
          ]
        }),
        /* @__PURE__ */ t("div", {
          className: "mt-1 flex justify-end gap-2",
          children: [/* @__PURE__ */ t("button", {
            type: "button",
            onClick: l,
            className: "border-border text-fg hover:bg-hover rounded border px-3 py-1.5 text-sm",
            children: n("outline.properties.cancel")
          }), /* @__PURE__ */ t("button", {
            type: "submit",
            className: "bg-accent text-on-accent rounded px-3 py-1.5 text-sm font-medium",
            children: n("outline.properties.save")
          })]
        })
      ]
    })
  });
}
export {
  X as OutlinePropertiesDialog
};
//# sourceMappingURL=outline-properties-Fm45njZA-BlMJu-4C.js.map
