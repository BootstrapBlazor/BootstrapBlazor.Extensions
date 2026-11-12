import { V as h, an as f, _ as v, e, u as w, I as p, al as I, i as $, s as E, ao as F, ap as M, aq as A, ar as z, o as _, T as B, d as K, m as P } from "./wasm-url-asset-BJXsMWLm.js";
import { u as G } from "./labels-C6_i87Oj-CUYif8yN.js";
const j = "border-border bg-surface text-fg w-full rounded-md border px-2 py-1.5 text-sm";
function R({ field: t }) {
  const n = h(f), s = v(f, (c) => c.getFieldSettings(t.ref), null);
  if (!n || !s || !n.canDesign()) return null;
  const r = (c) => void n.update(t.ref, c).catch(() => {
  });
  return /* @__PURE__ */ e("div", { children: s.properties.map((c) => /* @__PURE__ */ e(V, {
    fieldKey: JSON.stringify(t.ref),
    spec: c,
    value: s.values[c.key],
    onChange: (a) => r({ [c.key]: a })
  }, `${c.key}:${c.control}`)) });
}
function V({ fieldKey: t, spec: n, value: s, onChange: r }) {
  const c = w(), a = G();
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
      return /* @__PURE__ */ e(g, {
        label: a(n),
        children: /* @__PURE__ */ e(k, {
          value: typeof s == "string" ? s : "",
          onCommit: r
        }, t)
      });
    case "number":
      return /* @__PURE__ */ e(g, {
        label: a(n),
        children: /* @__PURE__ */ e(k, {
          type: "number",
          min: n.min,
          placeholder: c("demo.fieldNone"),
          value: typeof s == "number" ? String(s) : "",
          onCommit: (o) => r(o === "" ? null : Math.max(n.min, Number(o)))
        }, t)
      });
    case "choice":
      return n.free ? /* @__PURE__ */ e(g, {
        label: a(n),
        children: [/* @__PURE__ */ e(k, {
          list: `${t}-choices`,
          value: typeof s == "string" ? s : "",
          onCommit: r
        }, t), /* @__PURE__ */ e("datalist", {
          id: `${t}-choices`,
          children: n.options.map((o) => /* @__PURE__ */ e("option", { value: o }, o))
        })]
      }) : /* @__PURE__ */ e(g, {
        label: a(n),
        children: /* @__PURE__ */ e("select", {
          className: j,
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
      return /* @__PURE__ */ e(g, {
        label: a(n),
        children: n.options.map((l) => /* @__PURE__ */ e("label", {
          className: "text-fg mb-1 flex items-center gap-2 text-sm",
          children: [/* @__PURE__ */ e("input", {
            type: "checkbox",
            checked: o.has(l),
            onChange: (d) => r(n.options.filter((i) => i === l ? d.target.checked : o.has(i)))
          }), l]
        }, l))
      });
    }
    case "options":
      return /* @__PURE__ */ e(g, {
        label: a(n),
        children: /* @__PURE__ */ e(W, {
          options: Array.isArray(s) ? s : [],
          onCommit: r
        }, t)
      });
  }
}
function g({ label: t, children: n }) {
  return /* @__PURE__ */ e("section", {
    className: "mb-3",
    children: [/* @__PURE__ */ e("span", {
      className: "text-fg mb-1 block text-sm font-medium",
      children: t
    }), n]
  });
}
function k({ value: t, onCommit: n, ...s }) {
  const [r, c] = K(null);
  P(() => c(null), [t]);
  const a = () => {
    r === null || r === t || n(r);
  };
  return /* @__PURE__ */ e("input", {
    ...s,
    className: j,
    value: r ?? t,
    onChange: (o) => c(o.target.value),
    onBlur: a,
    onKeyDown: (o) => o.key === "Enter" && a()
  });
}
function W({ options: t, onCommit: n }) {
  const s = w(), r = t.map((a) => ({
    label: a.label,
    value: a.value
  })), c = (a, o) => n(o === null ? r.filter((l, d) => d !== a) : r.map((l, d) => d === a ? o : l));
  return /* @__PURE__ */ e("div", { children: [r.map((a, o) => /* @__PURE__ */ e("div", {
    className: "mb-1 flex gap-1",
    children: [
      /* @__PURE__ */ e(k, {
        "aria-label": s("demo.fieldOptionLabel"),
        value: a.label,
        onCommit: (l) => c(o, {
          ...a,
          label: l
        })
      }),
      /* @__PURE__ */ e(k, {
        "aria-label": s("demo.fieldOptionValue"),
        value: a.value,
        onCommit: (l) => c(o, {
          ...a,
          value: l
        })
      }),
      /* @__PURE__ */ e(B, {
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
const L = {
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
}, q = [], J = [], C = (t) => t.ref.kind === "objectNumber" ? t.ref.objectNumber : -1;
function S() {
  const t = h(E), n = h(F), s = M(), r = v(F, (c) => c.getActiveToolId(), null);
  return {
    select(c) {
      A(r) || n?.activateTool(z), t?.selection.select([c.ref]), s.reveal(c.page, { rect: c.box });
    },
    /** Several widgets as the selection (a group just copied), so one drag moves them all. */
    selectAll(c) {
      const [a] = c;
      a && (A(r) || n?.activateTool(z), t?.selection.select(c.map((o) => o.ref)), s.reveal(a.page, { rect: a.box }));
    },
    clear() {
      t?.selection.select([]);
    }
  };
}
const D = 10;
function Z() {
  const t = h(f), n = v(f, (s) => s.getSelectedField(), null);
  return t ? n ? /* @__PURE__ */ e(H, { field: n }) : /* @__PURE__ */ e(Y, {}) : null;
}
function Y() {
  const t = w(), n = S(), s = I(), r = h(f), c = v(f, (o) => o.list(), q), a = $(() => {
    const o = new Map(s.map((i) => [i.ref.objectNumber, i.index])), l = c.flatMap((i) => {
      const u = r?.getWidgets(i.ref)[0], m = u ? o.get(u.page.objectNumber) : void 0;
      return u && m !== void 0 ? [{
        field: i,
        place: u,
        index: m
      }] : [];
    });
    l.sort((i, u) => i.index - u.index || i.place.box.y - u.place.box.y || i.place.box.x - u.place.box.x);
    const d = /* @__PURE__ */ new Map();
    for (const i of l) d.set(i.index, [...d.get(i.index) ?? [], i]);
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
    children: a.map(([o, l]) => /* @__PURE__ */ e("section", {
      className: "mb-3",
      children: [/* @__PURE__ */ e("h3", {
        className: "text-fg-muted px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide",
        children: t("formDesign.page", { params: { page: o + 1 } })
      }), /* @__PURE__ */ e("ul", {
        className: "flex flex-col",
        children: l.map(({ field: d, place: i }) => {
          const u = L[d.kind];
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("button", {
            type: "button",
            onClick: () => n.select(i),
            className: "hover:bg-hover flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start",
            children: [
              /* @__PURE__ */ e(p, {
                name: u?.icon ?? "formTextfield",
                size: 16,
                className: "text-fg-muted shrink-0"
              }),
              /* @__PURE__ */ e("span", {
                className: "text-fg min-w-0 flex-1 truncate text-sm",
                children: d.name
              }),
              u && /* @__PURE__ */ e("span", {
                className: "sr-only",
                children: t(u.labelKey)
              })
            ]
          }) }, d.name);
        })
      })]
    }, o))
  });
}
function H({ field: t }) {
  const n = w(), s = S(), r = L[t.kind];
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
      /* @__PURE__ */ e(R, { field: t }),
      (t.kind === "radio" || t.kind === "checkbox") && /* @__PURE__ */ e(Q, { field: t })
    ]
  });
}
function Q({ field: t }) {
  const n = w(), s = S(), r = h(f), c = v(f, (m) => m.getWidgets(t.ref), J), a = _((m) => m.selected), o = (m) => a.some((b) => b.ref.kind === "objectNumber" && b.ref.objectNumber === C(m)), l = t.kind === "radio", d = I(), i = async () => {
    if (!r) return;
    const { widget: m } = await r.addWidget(t.ref);
    s.select(m);
  }, u = async () => {
    if (!r) return;
    const m = new Map(d.map((x) => [x.ref.objectNumber, x.size])), b = (x, T) => c.some((y) => {
      const O = m.get(y.page.objectNumber);
      return !!O && y.box[x] + y.box[T] + D > O[T];
    }) && c.every((y) => y.box[x] - D >= 0) ? -10 : D, { widgets: N } = await r.duplicate([t.ref], { offset: {
      x: b("x", "width"),
      y: b("y", "height")
    } });
    s.selectAll(N);
  };
  return /* @__PURE__ */ e("section", {
    className: "border-border-subtle mt-4 border-t pt-4",
    children: [
      /* @__PURE__ */ e("p", {
        className: "text-fg-muted mb-2 text-[11px] font-semibold uppercase tracking-wide",
        children: n(l ? "formDesign.buttons" : "formDesign.boxes")
      }),
      /* @__PURE__ */ e("ul", {
        className: "mb-2 flex flex-col",
        children: c.map((m, b) => {
          const N = t.widgets.find((x) => x.objectNumber === C(m));
          return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("button", {
            type: "button",
            "aria-pressed": o(m),
            onClick: () => s.select(m),
            className: `hover:bg-hover flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-sm ${o(m) ? "bg-selected text-accent" : "text-fg"}`,
            children: [/* @__PURE__ */ e(p, {
              name: l ? "formRadio" : "formCheckbox",
              size: 14,
              className: "shrink-0"
            }), /* @__PURE__ */ e("span", {
              className: "min-w-0 flex-1 truncate",
              children: l && N && "exportValue" in N ? N.exportValue : n("formDesign.box", { params: { number: b + 1 } })
            })]
          }) }, C(m));
        })
      }),
      /* @__PURE__ */ e("button", {
        type: "button",
        onClick: () => void i().catch(() => {
        }),
        className: "text-accent flex items-center gap-1 text-sm",
        children: [/* @__PURE__ */ e(p, {
          name: "plus",
          size: 14
        }), n(l ? "formDesign.addButton" : "formDesign.addBox")]
      }),
      l && /* @__PURE__ */ e("button", {
        type: "button",
        onClick: () => void u().catch(() => {
        }),
        className: "text-accent mt-2 flex items-center gap-1 text-sm",
        children: [/* @__PURE__ */ e(p, {
          name: "duplicate",
          size: 14
        }), n("formDesign.duplicateGroup")]
      })
    ]
  });
}
export {
  Z as FormDesignPanel
};
//# sourceMappingURL=form-design-panel-BLoqGIJY-DEciaS3X.js.map
