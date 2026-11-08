import { U as x, ap as u, Z as h, e, u as N, I as p, an as T, i as w, s as O, aq as v, ar as F, as as I, at as A, o as L, T as $, d as j, m as z } from "./wasm-url-asset-DQFmMC86.js";
import { u as B } from "./labels-C6_i87Oj-BwatX9VH.js";
const D = "border-border bg-surface text-fg w-full rounded-md border px-2 py-1.5 text-sm";
function E({ field: t }) {
  const n = x(u), s = h(u, (c) => c.getFieldSettings(t.ref), null);
  if (!n || !s || !n.canDesign()) return null;
  const r = (c) => void n.update(t.ref, c).catch(() => {
  });
  return /* @__PURE__ */ e("div", { children: s.properties.map((c) => /* @__PURE__ */ e(M, {
    fieldKey: JSON.stringify(t.ref),
    spec: c,
    value: s.values[c.key],
    onChange: (a) => r({ [c.key]: a })
  }, `${c.key}:${c.control}`)) });
}
function M({ fieldKey: t, spec: n, value: s, onChange: r }) {
  const c = N(), a = B();
  switch (n.control) {
    case "flag":
      return /* @__PURE__ */ e("label", {
        className: "text-fg mb-2 flex items-center gap-2 text-sm",
        children: [/* @__PURE__ */ e("input", {
          type: "checkbox",
          checked: s === !0,
          onChange: (o) => r(o.target.checked)
        }), a(n)]
      });
    case "text":
      return /* @__PURE__ */ e(b, {
        label: a(n),
        children: /* @__PURE__ */ e(g, {
          value: typeof s == "string" ? s : "",
          onCommit: r
        }, t)
      });
    case "number":
      return /* @__PURE__ */ e(b, {
        label: a(n),
        children: /* @__PURE__ */ e(g, {
          type: "number",
          min: n.min,
          placeholder: c("demo.fieldNone"),
          value: typeof s == "number" ? String(s) : "",
          onCommit: (o) => r(o === "" ? null : Math.max(n.min, Number(o)))
        }, t)
      });
    case "choice":
      return n.free ? /* @__PURE__ */ e(b, {
        label: a(n),
        children: [/* @__PURE__ */ e(g, {
          list: `${t}-choices`,
          value: typeof s == "string" ? s : "",
          onCommit: r
        }, t), /* @__PURE__ */ e("datalist", {
          id: `${t}-choices`,
          children: n.options.map((o) => /* @__PURE__ */ e("option", { value: o }, o))
        })]
      }) : /* @__PURE__ */ e(b, {
        label: a(n),
        children: /* @__PURE__ */ e("select", {
          className: D,
          value: typeof s == "string" ? s : "",
          onChange: (o) => r(o.target.value === "" ? null : o.target.value),
          children: [/* @__PURE__ */ e("option", {
            value: "",
            children: c("demo.fieldNone")
          }), n.options.map((o) => /* @__PURE__ */ e("option", {
            value: o,
            children: o
          }, o))]
        })
      });
    case "choices": {
      const o = new Set(Array.isArray(s) ? s : []);
      return /* @__PURE__ */ e(b, {
        label: a(n),
        children: n.options.map((i) => /* @__PURE__ */ e("label", {
          className: "text-fg mb-1 flex items-center gap-2 text-sm",
          children: [/* @__PURE__ */ e("input", {
            type: "checkbox",
            checked: o.has(i),
            onChange: (d) => r(n.options.filter((l) => l === i ? d.target.checked : o.has(l)))
          }), i]
        }, i))
      });
    }
    case "options":
      return /* @__PURE__ */ e(b, {
        label: a(n),
        children: /* @__PURE__ */ e(K, {
          options: Array.isArray(s) ? s : [],
          onCommit: r
        }, t)
      });
  }
}
function b({ label: t, children: n }) {
  return /* @__PURE__ */ e("section", {
    className: "mb-3",
    children: [/* @__PURE__ */ e("span", {
      className: "text-fg mb-1 block text-sm font-medium",
      children: t
    }), n]
  });
}
function g({ value: t, onCommit: n, ...s }) {
  const [r, c] = j(null);
  z(() => c(null), [t]);
  const a = () => {
    r === null || r === t || n(r);
  };
  return /* @__PURE__ */ e("input", {
    ...s,
    className: D,
    value: r ?? t,
    onChange: (o) => c(o.target.value),
    onBlur: a,
    onKeyDown: (o) => o.key === "Enter" && a()
  });
}
function K({ options: t, onCommit: n }) {
  const s = N(), r = t.map((a) => ({
    label: a.label,
    value: a.value
  })), c = (a, o) => n(o === null ? r.filter((i, d) => d !== a) : r.map((i, d) => d === a ? o : i));
  return /* @__PURE__ */ e("div", { children: [r.map((a, o) => /* @__PURE__ */ e("div", {
    className: "mb-1 flex gap-1",
    children: [
      /* @__PURE__ */ e(g, {
        "aria-label": s("demo.fieldOptionLabel"),
        value: a.label,
        onCommit: (i) => c(o, {
          ...a,
          label: i
        })
      }),
      /* @__PURE__ */ e(g, {
        "aria-label": s("demo.fieldOptionValue"),
        value: a.value,
        onCommit: (i) => c(o, {
          ...a,
          value: i
        })
      }),
      /* @__PURE__ */ e($, {
        label: s("demo.fieldOptionRemove"),
        className: "text-fg-muted hover:text-fg px-1",
        onClick: () => c(o, null),
        children: "×"
      })
    ]
  }, `${o}:${a.value}`)), /* @__PURE__ */ e("button", {
    type: "button",
    className: "text-accent text-sm",
    onClick: () => {
      const a = `Option ${r.length + 1}`;
      n([...r, {
        label: a,
        value: a
      }]);
    },
    children: s("demo.fieldOptionAdd")
  })] });
}
const S = {
  text: {
    icon: "formTextfield",
    labelKey: "commands.form.textfield"
  },
  checkbox: {
    icon: "formCheckbox",
    labelKey: "commands.form.checkbox"
  },
  radio: {
    icon: "formRadio",
    labelKey: "commands.form.radio"
  },
  combobox: {
    icon: "formSelect",
    labelKey: "commands.form.select"
  },
  listbox: {
    icon: "formListbox",
    labelKey: "commands.form.listbox"
  },
  pushbutton: {
    icon: "formButton",
    labelKey: "commands.form.button"
  },
  signature: {
    icon: "signature",
    labelKey: "commands.form.signature"
  }
}, _ = [], R = [], y = (t) => t.ref.kind === "objectNumber" ? t.ref.objectNumber : -1;
function k() {
  const t = x(O), n = x(v), s = F(), r = h(v, (c) => c.getActiveToolId(), null);
  return {
    select(c) {
      I(r) || n?.activateTool(A), t?.selection.select([c.ref]), s.reveal(c.page, { rect: c.box });
    },
    clear() {
      t?.selection.select([]);
    }
  };
}
function J() {
  const t = x(u), n = h(u, (s) => s.getSelectedField(), null);
  return t ? n ? /* @__PURE__ */ e(P, { field: n }) : /* @__PURE__ */ e(W, {}) : null;
}
function W() {
  const t = N(), n = k(), s = T(), r = x(u), c = h(u, (o) => o.list(), _), a = w(() => {
    const o = new Map(s.map((l) => [l.ref.objectNumber, l.index])), i = c.flatMap((l) => {
      const m = r?.getWidgets(l.ref)[0], f = m ? o.get(m.page.objectNumber) : void 0;
      return m && f !== void 0 ? [{
        field: l,
        place: m,
        index: f
      }] : [];
    });
    i.sort((l, m) => l.index - m.index || l.place.box.y - m.place.box.y || l.place.box.x - m.place.box.x);
    const d = /* @__PURE__ */ new Map();
    for (const l of i) d.set(l.index, [...d.get(l.index) ?? [], l]);
    return [...d];
  }, [
    c,
    r,
    s
  ]);
  return a.length === 0 ? /* @__PURE__ */ e("div", {
    className: "flex flex-col items-center gap-3 px-4 py-10 text-center",
    children: [/* @__PURE__ */ e(p, {
      name: "formDesign",
      size: 32,
      className: "text-fg-muted"
    }), /* @__PURE__ */ e("p", {
      className: "text-fg-muted text-sm",
      children: t("formDesign.empty")
    })]
  }) : /* @__PURE__ */ e("div", {
    className: "min-h-0 flex-1 overflow-y-auto p-2",
    children: a.map(([o, i]) => /* @__PURE__ */ e("section", {
      className: "mb-3",
      children: [/* @__PURE__ */ e("h3", {
        className: "text-fg-muted px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide",
        children: t("formDesign.page", { params: { page: o + 1 } })
      }), /* @__PURE__ */ e("ul", {
        className: "flex flex-col",
        children: i.map(({ field: d, place: l }) => {
          const m = S[d.kind];
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("button", {
            type: "button",
            onClick: () => n.select(l),
            className: "hover:bg-hover flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start",
            children: [
              /* @__PURE__ */ e(p, {
                name: m?.icon ?? "formTextfield",
                size: 16,
                className: "text-fg-muted shrink-0"
              }),
              /* @__PURE__ */ e("span", {
                className: "text-fg min-w-0 flex-1 truncate text-sm",
                children: d.name
              }),
              m && /* @__PURE__ */ e("span", {
                className: "sr-only",
                children: t(m.labelKey)
              })
            ]
          }) }, d.name);
        })
      })]
    }, o))
  });
}
function P({ field: t }) {
  const n = N(), s = k(), r = S[t.kind];
  return /* @__PURE__ */ e("div", {
    className: "min-h-0 flex-1 overflow-y-auto p-4",
    children: [
      /* @__PURE__ */ e("button", {
        type: "button",
        onClick: s.clear,
        className: "text-accent mb-3 flex items-center gap-1 text-sm",
        children: [/* @__PURE__ */ e(p, {
          name: "chevronLeft",
          size: 14
        }), n("formDesign.allFields")]
      }),
      /* @__PURE__ */ e("p", {
        className: "text-fg mb-4 flex items-center gap-2 text-sm font-semibold",
        children: [/* @__PURE__ */ e(p, {
          name: r?.icon ?? "formTextfield",
          size: 16,
          className: "text-fg-muted shrink-0"
        }), /* @__PURE__ */ e("span", {
          className: "min-w-0 truncate",
          children: t.name
        })]
      }),
      /* @__PURE__ */ e("p", {
        className: "text-fg-muted mb-3 text-[11px] font-semibold uppercase tracking-wide",
        children: n("demo.fieldSettingsTitle")
      }),
      /* @__PURE__ */ e(E, { field: t }),
      (t.kind === "radio" || t.kind === "checkbox") && /* @__PURE__ */ e(V, { field: t })
    ]
  });
}
function V({ field: t }) {
  const n = N(), s = k(), r = x(u), c = h(u, (l) => l.getWidgets(t.ref), R), a = L((l) => l.selected), o = (l) => a.some((m) => m.ref.kind === "objectNumber" && m.ref.objectNumber === y(l)), i = t.kind === "radio", d = async () => {
    if (!r) return;
    const { widget: l } = await r.addWidget(t.ref);
    s.select(l);
  };
  return /* @__PURE__ */ e("section", {
    className: "border-border-subtle mt-4 border-t pt-4",
    children: [
      /* @__PURE__ */ e("p", {
        className: "text-fg-muted mb-2 text-[11px] font-semibold uppercase tracking-wide",
        children: n(i ? "formDesign.buttons" : "formDesign.boxes")
      }),
      /* @__PURE__ */ e("ul", {
        className: "mb-2 flex flex-col",
        children: c.map((l, m) => {
          const f = t.widgets.find((C) => C.objectNumber === y(l));
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("button", {
            type: "button",
            "aria-pressed": o(l),
            onClick: () => s.select(l),
            className: `hover:bg-hover flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-sm ${o(l) ? "bg-selected text-accent" : "text-fg"}`,
            children: [/* @__PURE__ */ e(p, {
              name: i ? "formRadio" : "formCheckbox",
              size: 14,
              className: "shrink-0"
            }), /* @__PURE__ */ e("span", {
              className: "min-w-0 flex-1 truncate",
              children: i && f && "exportValue" in f ? f.exportValue : n("formDesign.box", { params: { number: m + 1 } })
            })]
          }) }, y(l));
        })
      }),
      /* @__PURE__ */ e("button", {
        type: "button",
        onClick: () => void d().catch(() => {
        }),
        className: "text-accent flex items-center gap-1 text-sm",
        children: [/* @__PURE__ */ e(p, {
          name: "plus",
          size: 14
        }), n(i ? "formDesign.addButton" : "formDesign.addBox")]
      })
    ]
  });
}
export {
  J as FormDesignPanel
};
//# sourceMappingURL=form-design-panel-wzDO2bUT-GN0HL8gx.js.map
