import { u as p, b as Z, x as G, N as H, O as U, c as P, P as V, o as z, Q as B, e as t, I as y, U as W, V as X, d as C, m as D, w as Y, T as j, X as Q, Y as I, Z as J, _ as ee, W as te, A as ne, $ as le } from "./wasm-url-asset-DQFmMC86.js";
import { u as x } from "./labels-C6_i87Oj-BwatX9VH.js";
const ae = [
  "#000000",
  "#5f6368",
  "#e44234",
  "#ff8b00",
  "#ffd500",
  "#00cc66",
  "#00b8d9",
  "#4a90e2",
  "#9b51e0",
  "#f272c8",
  "#a0522d",
  "#ffffff"
], re = [
  "helvetica",
  "helvetica-bold",
  "times-roman",
  "courier"
], oe = [
  ["not-embedded", "notEmbedded"],
  ["subset", "subset"],
  ["preview-and-print", "previewAndPrint"],
  ["unsupported-format", "unsupportedFormat"],
  ["no-unicode-map", "noUnicodeMap"]
], se = [
  8,
  9,
  10,
  11,
  12,
  14,
  16,
  18,
  24,
  36,
  48,
  72
], ie = [
  {
    key: "solid",
    make: () => ({ kind: "solid" })
  },
  {
    key: "dashed-6-2",
    make: () => ({
      kind: "dashed",
      dash: [6, 2]
    })
  },
  {
    key: "dashed-3-3",
    make: () => ({
      kind: "dashed",
      dash: [3, 3]
    })
  },
  {
    key: "dashed-1-2",
    make: () => ({
      kind: "dashed",
      dash: [1, 2]
    })
  },
  {
    key: "cloudy-1",
    make: () => ({
      kind: "cloudy",
      intensity: 1
    })
  },
  {
    key: "cloudy-2",
    make: () => ({
      kind: "cloudy",
      intensity: 2
    })
  }
], de = (e) => e.kind === "cloudy" ? `cloudy-${e.intensity >= 2 ? 2 : 1}` : e.kind === "dashed" ? `dashed-${e.dash.join("-")}` : "solid", ce = (e) => {
  const l = e.cloudyIntensity;
  if (l) return {
    kind: "cloudy",
    intensity: l
  };
  const n = e.dashArray;
  return e.borderStyle === "dashed" ? {
    kind: "dashed",
    dash: n?.length ? n : [3, 3]
  } : { kind: "solid" };
}, ue = (e) => ({
  borderStyle: e.kind === "dashed" ? "dashed" : "solid",
  dashArray: e.kind === "dashed" ? e.dash : null,
  cloudyIntensity: e.kind === "cloudy" ? e.intensity : null
}), E = (e, l) => e.find((n) => n.value === l), me = {
  highlight: "highlight",
  underline: "underline",
  squiggly: "squiggly",
  strikeout: "strikethrough",
  square: "square",
  circle: "circle"
};
function g({ label: e, mixed: l, children: n }) {
  const a = p();
  return /* @__PURE__ */ t("section", {
    className: "mb-5",
    children: [/* @__PURE__ */ t("label", {
      className: "text-fg mb-2 block text-sm font-medium",
      children: [e, l && /* @__PURE__ */ t("span", {
        className: "text-fg-muted ms-1.5 text-xs font-normal",
        children: a("stylePanel.mixed")
      })]
    }), n]
  });
}
const T = (e) => e == null || e === "transparent" || /^#([0-9a-f]{8})$/i.test(e) && e.slice(-2).toLowerCase() === "00";
function $({ color: e, active: l, onSelect: n }) {
  const a = p(), o = T(e) ? {
    backgroundColor: "#fff",
    backgroundImage: "linear-gradient(45deg, transparent 40%, #ef4444 40%, #ef4444 60%, transparent 60%)",
    backgroundSize: "100% 100%"
  } : { backgroundColor: e };
  return /* @__PURE__ */ t(j, {
    label: T(e) ? a("stylePanel.transparent") : e,
    onClick: () => n(e),
    className: `border-border-strong h-5 w-5 rounded-full border ${l ? "outline-accent outline outline-2 outline-offset-2" : ""}`,
    style: o
  });
}
function fe({ value: e, onSelect: l, allowTransparent: n }) {
  const a = (o) => o.toLowerCase() === (e ?? "").toLowerCase();
  return /* @__PURE__ */ t("div", {
    className: "grid grid-cols-6 gap-x-1 gap-y-3",
    children: [ae.map((o) => /* @__PURE__ */ t($, {
      color: o,
      active: a(o),
      onSelect: l
    }, o)), n && /* @__PURE__ */ t($, {
      color: "transparent",
      active: T(e ?? null),
      onSelect: l
    })]
  });
}
function M({ value: e, min: l, max: n, step: a, onChange: o }) {
  return /* @__PURE__ */ t("input", {
    type: "range",
    className: "accent-accent mb-1.5 h-1 w-full cursor-pointer",
    value: e,
    min: l,
    max: n,
    step: a,
    onChange: (i) => o(parseFloat(i.target.value))
  });
}
function K(e, l) {
  const n = ne(null);
  return D(() => {
    const a = n.current;
    return e && a ? le(a, l) : void 0;
  }, [e, l]), n;
}
function O({ trigger: e, children: l }) {
  const [n, a] = C(!1);
  return /* @__PURE__ */ t("div", {
    ref: K(n, () => a(!1)),
    className: "relative w-full",
    children: [/* @__PURE__ */ t("button", {
      type: "button",
      onClick: () => a((o) => !o),
      className: "border-border bg-surface text-fg flex w-full items-center justify-between gap-2 rounded border px-3 py-1.5",
      children: [e, /* @__PURE__ */ t(y, {
        name: "chevronDown",
        size: 16,
        className: "text-fg-secondary shrink-0"
      })]
    }), n && /* @__PURE__ */ t("div", {
      className: "border-border bg-elevated absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border p-1 shadow-lg",
      children: l(() => a(!1))
    })]
  });
}
function L({ selected: e, title: l, disabled: n, hint: a, onClick: o, children: i }) {
  return /* @__PURE__ */ t(te, {
    content: l ? { label: l } : null,
    options: { inMenu: !0 },
    children: (s) => /* @__PURE__ */ t("button", {
      ...s,
      type: "button",
      "aria-label": l,
      disabled: n,
      onClick: o,
      className: `flex w-full flex-col items-start rounded px-2 py-1.5 text-start text-sm ${n ? "text-fg-muted cursor-not-allowed" : "hover:bg-hover"} ${e ? "bg-selected" : ""} ${e && !n ? "text-accent" : ""} ${!e && !n ? "text-fg" : ""}`,
      children: [i, a && /* @__PURE__ */ t("span", {
        className: "text-fg-muted text-xs",
        children: a
      })]
    })
  });
}
function R(e) {
  if (e.kind === "cloudy") {
    const l = e.intensity >= 2 ? 5 : 3, n = Math.ceil(80 / (l * 2)), a = 80 / n, o = l + 1, i = l * 2 + 2, s = [`M 0 ${o}`];
    for (let d = 0; d < n; d++) s.push(`A ${l} ${l} 0 0 1 ${a * (d + 1)} ${o}`);
    return /* @__PURE__ */ t("svg", {
      width: "80",
      height: i,
      viewBox: `0 0 80 ${i}`,
      children: /* @__PURE__ */ t("path", {
        d: s.join(" "),
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinejoin: "round",
        strokeLinecap: "round"
      })
    });
  }
  return /* @__PURE__ */ t("svg", {
    width: "80",
    height: "8",
    viewBox: "0 0 80 8",
    children: /* @__PURE__ */ t("line", {
      x1: "0",
      y1: "4",
      x2: "80",
      y2: "4",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeDasharray: e.kind === "dashed" ? e.dash.join(" ") : void 0
    })
  });
}
function he({ value: e, styles: l, onChange: n }) {
  const a = x(), o = ie.filter((i) => E(l, i.make().kind));
  return /* @__PURE__ */ t(O, {
    trigger: /* @__PURE__ */ t("span", {
      className: "text-fg-secondary",
      children: R(e)
    }),
    children: (i) => o.map((s) => {
      const d = s.make();
      return /* @__PURE__ */ t(L, {
        selected: de(e) === s.key,
        title: a(E(l, d.kind)),
        onClick: () => {
          n(d), i();
        },
        children: /* @__PURE__ */ t("span", {
          className: "text-fg-secondary",
          children: R(d)
        })
      }, s.key);
    })
  });
}
const ge = {
  square: /* @__PURE__ */ t("path", { d: "M68 -4 L76 -4 L76 4 L68 4 Z" }),
  circle: /* @__PURE__ */ t("circle", {
    cx: "72",
    cy: "0",
    r: "4"
  }),
  diamond: /* @__PURE__ */ t("path", { d: "M72 -5 L77 0 L72 5 L67 0 Z" }),
  "open-arrow": /* @__PURE__ */ t("path", {
    d: "M67 -5 L77 0 L67 5",
    fill: "none"
  }),
  "closed-arrow": /* @__PURE__ */ t("path", { d: "M67 -5 L77 0 L67 5 Z" }),
  "r-open-arrow": /* @__PURE__ */ t("path", {
    d: "M77 -5 L67 0 L77 5",
    fill: "none"
  }),
  "r-closed-arrow": /* @__PURE__ */ t("path", { d: "M77 -5 L67 0 L77 5 Z" }),
  butt: /* @__PURE__ */ t("path", {
    d: "M72 -5 L72 5",
    fill: "none"
  }),
  slash: /* @__PURE__ */ t("path", {
    d: "M67 -5 L77 5",
    fill: "none"
  })
}, be = {
  square: 68,
  circle: 68,
  diamond: 67,
  "open-arrow": 76,
  "closed-arrow": 67,
  "r-open-arrow": 67,
  "r-closed-arrow": 67,
  butt: 72,
  slash: 72
};
function A({ name: e, side: l }) {
  const n = ge[e], a = be[e] ?? 77;
  return /* @__PURE__ */ t("svg", {
    width: "80",
    height: "20",
    viewBox: "0 0 80 20",
    className: "text-fg",
    children: /* @__PURE__ */ t("g", {
      transform: l === "start" ? "rotate(180 40 10)" : void 0,
      children: [/* @__PURE__ */ t("line", {
        x1: "4",
        y1: "10",
        x2: a,
        y2: "10",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }), n && /* @__PURE__ */ t("g", {
        transform: "translate(0, 10)",
        fill: "currentColor",
        stroke: "currentColor",
        strokeWidth: "1.5",
        children: n
      })]
    })
  });
}
function _({ side: e, value: l, options: n, onChange: a }) {
  const o = x();
  return /* @__PURE__ */ t(O, {
    trigger: /* @__PURE__ */ t(A, {
      name: l,
      side: e
    }),
    children: (i) => n.map((s) => /* @__PURE__ */ t(L, {
      selected: l === s.value,
      title: o(s),
      onClick: () => {
        a(s.value), i();
      },
      children: /* @__PURE__ */ t(A, {
        name: s.value,
        side: e
      })
    }, s.value))
  });
}
function pe({ value: e, standard: l, onChange: n }) {
  const a = x(), o = p(), i = Q(), s = W(I), d = J(I, (c) => c.getFontList(), null), r = B((c) => ee(c.engine));
  D(() => {
    s?.ensureLoaded().catch(() => {
    });
  }, [s]);
  const h = (c) => {
    const f = c.weight >= 600 ? c.italic ? "boldItalic" : "bold" : c.italic ? "italic" : null, b = f ? `${c.familyName} ${o(`stylePanel.fontStyles.${f}`)}` : c.familyName, S = oe.find(([w]) => c.restrictions.includes(w))?.[1];
    return {
      value: c.name,
      label: i.find((w) => w.key === c.name)?.label ?? b,
      ...c.canChoose ? {} : { reason: o(`stylePanel.fontRestrictions.${S ?? "other"}`) }
    };
  }, m = (c) => (d?.fonts ?? []).filter((f) => f.source === c && (f.canChoose && !f.builtIn || f.name === e)).map(h), k = [
    {
      title: o("stylePanel.fontGroups.document"),
      options: m("document")
    },
    {
      title: o(r ? "stylePanel.fontGroups.yours" : "stylePanel.fontGroups.server"),
      options: m("engine")
    },
    {
      title: o("stylePanel.fontGroups.standard"),
      options: l.filter((c) => re.includes(c.value)).map((c) => ({
        value: c.value,
        label: a(c)
      }))
    }
  ].filter((c) => c.options.length > 0), v = E(l, e);
  return /* @__PURE__ */ t(O, {
    trigger: /* @__PURE__ */ t("span", {
      className: "text-fg truncate text-sm",
      children: k.flatMap((c) => c.options).find((c) => c.value === e)?.label ?? (v ? a(v) : e)
    }),
    children: (c) => k.map((f) => /* @__PURE__ */ t("div", {
      role: "group",
      "aria-label": f.title,
      children: [k.length > 1 && /* @__PURE__ */ t("div", {
        className: "text-fg-muted px-2 pb-1 pt-2 text-xs font-medium",
        children: f.title
      }), f.options.map((b) => /* @__PURE__ */ t(L, {
        selected: b.value === e,
        disabled: b.reason !== void 0,
        hint: b.reason,
        onClick: () => {
          n(b.value), c();
        },
        children: b.label
      }, b.value))]
    }, f.title))
  });
}
function ye({ value: e, onChange: l }) {
  const [n, a] = C(!1), o = K(n, () => a(!1)), [i, s] = C(null), d = () => {
    if (i === null) return;
    const r = parseInt(i, 10);
    s(null), Number.isFinite(r) && r > 0 && r !== e && l(r);
  };
  return /* @__PURE__ */ t("div", {
    ref: o,
    className: "relative w-full",
    children: [
      /* @__PURE__ */ t("input", {
        type: "number",
        min: 1,
        value: i ?? e,
        onChange: (r) => s(r.target.value),
        onBlur: d,
        onKeyDown: (r) => {
          r.key === "Enter" ? (r.preventDefault(), d(), a(!1)) : r.key === "Escape" && (s(null), a(!1));
        },
        onClick: () => a(!0),
        className: "border-border bg-surface text-fg w-full rounded border px-2 py-1.5 pe-7 text-sm"
      }),
      /* @__PURE__ */ t("button", {
        type: "button",
        tabIndex: -1,
        onClick: () => a((r) => !r),
        className: "absolute inset-y-0 end-1 flex items-center",
        children: /* @__PURE__ */ t(y, {
          name: "chevronDown",
          size: 16,
          className: "text-fg-secondary"
        })
      }),
      n && /* @__PURE__ */ t("div", {
        className: "border-border bg-elevated absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded border p-1 shadow-lg",
        children: se.map((r) => /* @__PURE__ */ t(L, {
          selected: r === e,
          onClick: () => {
            s(null), l(r), a(!1);
          },
          children: r
        }, r))
      })
    ]
  });
}
function xe({ value: e, options: l, name: n, onChange: a }) {
  const o = x();
  return /* @__PURE__ */ t("select", {
    value: e,
    "aria-label": n,
    onChange: (i) => a(i.target.value),
    className: "border-border bg-surface text-fg w-full rounded border px-3 py-1.5 text-sm",
    children: l.map((i) => /* @__PURE__ */ t("option", {
      value: i.value,
      children: o(i)
    }, i.value))
  });
}
function F({ active: e, title: l, onClick: n, keepFocus: a, children: o }) {
  return /* @__PURE__ */ t(j, {
    label: l,
    "aria-pressed": e,
    onClick: n,
    onMouseDown: a ? (i) => i.preventDefault() : void 0,
    className: `flex h-9 w-9 items-center justify-center rounded border transition-colors ${e ? "border-accent bg-accent text-on-accent" : "border-border bg-surface text-fg hover:bg-hover"}`,
    children: o
  });
}
const ke = (e) => e.key === "bold" || e.key === "italic" || e.key === "underline";
function ve({ specs: e, values: l, mixed: n, onToggle: a }) {
  const o = p(), i = x();
  return /* @__PURE__ */ t(g, {
    label: o("demo.formatLabel"),
    mixed: e.some((s) => n.includes(s.key)),
    children: /* @__PURE__ */ t("div", {
      className: "flex gap-2",
      children: e.map((s) => {
        const d = l[s.key] === !0 && !n.includes(s.key);
        return /* @__PURE__ */ t(F, {
          title: i(s),
          active: d,
          keepFocus: !0,
          onClick: () => a(s.key, !d),
          children: /* @__PURE__ */ t(y, {
            name: s.key,
            size: 18
          })
        }, s.key);
      })
    })
  });
}
function we({ spec: e, values: l, mixed: n, onChange: a, onChangeEach: o }) {
  const i = p(), s = x(), d = l[e.key];
  switch (e.key) {
    case "color":
    case "fontColor":
    case "interiorColor":
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: /* @__PURE__ */ t(fe, {
          value: d,
          allowTransparent: e.allowsNone,
          onSelect: (r) => a({ [e.key]: r === "transparent" ? null : r })
        })
      });
    case "opacity": {
      const r = d ?? 1;
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: [/* @__PURE__ */ t(M, {
          value: r,
          min: e.min,
          max: e.max,
          step: e.step,
          onChange: (h) => a({ opacity: h })
        }), /* @__PURE__ */ t("span", {
          className: "text-fg-muted text-xs",
          children: [Math.round(r * 100), "%"]
        })]
      });
    }
    case "strokeWidth": {
      const r = d ?? e.min;
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: [/* @__PURE__ */ t(M, {
          value: r,
          min: e.min,
          max: e.max,
          step: e.step,
          onChange: (h) => a({ strokeWidth: h })
        }), /* @__PURE__ */ t("span", {
          className: "text-fg-muted text-xs",
          children: `${r}px`
        })]
      });
    }
    case "fontSize":
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: /* @__PURE__ */ t(ye, {
          value: d ?? 12,
          onChange: (r) => a({ fontSize: r })
        })
      });
    case "borderStyle":
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: /* @__PURE__ */ t(he, {
          value: ce(l),
          styles: e.options,
          onChange: (r) => a(ue(r))
        })
      });
    case "lineEndings": {
      const r = d ?? {
        start: "none",
        end: "none"
      };
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: /* @__PURE__ */ t("div", {
          className: "grid grid-cols-2 gap-3",
          children: [/* @__PURE__ */ t("div", { children: [/* @__PURE__ */ t("div", {
            className: "text-fg-muted mb-1.5 text-xs",
            children: i("stylePanel.lineStart")
          }), /* @__PURE__ */ t(_, {
            side: "start",
            value: r.start,
            options: e.options,
            onChange: (h) => o((m) => ({ lineEndings: {
              ...m.lineEndings,
              start: h
            } }))
          })] }), /* @__PURE__ */ t("div", { children: [/* @__PURE__ */ t("div", {
            className: "text-fg-muted mb-1.5 text-xs",
            children: i("stylePanel.lineEnd")
          }), /* @__PURE__ */ t(_, {
            side: "end",
            value: r.end,
            options: e.options,
            onChange: (h) => o((m) => ({ lineEndings: {
              ...m.lineEndings,
              end: h
            } }))
          })] })]
        })
      });
    }
    case "fontFamily":
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: /* @__PURE__ */ t(pe, {
          value: d ?? "helvetica",
          standard: e.options,
          onChange: (r) => a({ fontFamily: r })
        })
      });
    case "subtype":
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: /* @__PURE__ */ t("div", {
          className: "flex gap-2",
          children: e.options.map((r) => /* @__PURE__ */ t(F, {
            title: s(r),
            active: !n && d === r.value,
            onClick: () => a({ subtype: r.value }),
            children: /* @__PURE__ */ t(y, {
              name: me[r.value] ?? "palette",
              size: 18
            })
          }, r.value))
        })
      });
    case "textAlign": {
      const r = {
        left: "alignLeft",
        center: "alignCenter",
        right: "alignRight"
      };
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: /* @__PURE__ */ t("div", {
          className: "flex gap-2",
          children: e.options.map((h) => {
            const m = h.value;
            return /* @__PURE__ */ t(F, {
              title: s(h),
              active: d === m,
              onClick: () => a({ textAlign: m }),
              children: /* @__PURE__ */ t(y, {
                name: r[m],
                size: 18
              })
            }, m);
          })
        })
      });
    }
    case "bold":
    case "italic":
    case "underline":
      return null;
    case "blendMode":
      return /* @__PURE__ */ t(g, {
        label: s(e),
        mixed: n,
        children: /* @__PURE__ */ t(xe, {
          value: d ?? "normal",
          options: e.options,
          name: s(e),
          onChange: (r) => a({ blendMode: r })
        })
      });
    case "link":
      return null;
    default:
      return null;
  }
}
function Ne() {
  const e = p();
  return /* @__PURE__ */ t("div", {
    className: "text-fg-muted flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center",
    children: [/* @__PURE__ */ t(y, {
      name: "palette",
      size: 40,
      className: "text-fg-disabled"
    }), /* @__PURE__ */ t("p", {
      className: "max-w-[180px] text-sm",
      children: e("stylePanel.empty")
    })]
  });
}
const Ce = {
  bold: (e) => ({ weight: e ? 700 : 400 }),
  italic: (e) => ({ italic: e }),
  underline: (e) => ({ decoration: e ? ["underline"] : [] })
};
function Te() {
  const e = p(), l = Z(), n = G(), a = H() ?? void 0, o = U((u) => u.activeToolId) ?? "pointer", i = P(), s = P(o), d = V(o), r = z((u) => u.selected), h = B(() => n.resolveCommand(`tool:${o}`, a)?.label ?? null, Object.is), m = i.properties.length > 0, { properties: k, values: v, mixed: c } = m ? i : s, f = k.filter((u) => u.control !== "flag" && u.control !== "text"), b = (u) => m ? l.selection.update(u) : l.tools.updateDefaults(o, u), S = (u) => m ? l.selection.update((N) => u(N)) : l.tools.updateDefaults(o, u(d)), w = (u, N) => {
    if (m) return void l.text.toggleFormat(u);
    const q = d.richText?.body;
    l.tools.updateDefaults(o, { richText: { body: {
      ...q,
      ...Ce[u](N)
    } } });
  };
  return f.length === 0 ? /* @__PURE__ */ t(Ne, {}) : /* @__PURE__ */ t("div", {
    className: "flex-1 overflow-y-auto p-4",
    children: [
      /* @__PURE__ */ t("p", {
        className: "text-fg-muted mb-4 text-[11px] font-semibold uppercase tracking-wide",
        children: m ? e("stylePanel.selected", { params: { count: r.length } }) : h === null ? e("stylePanel.defaults") : e("stylePanel.toolDefaults", { params: { tool: h } })
      }),
      f.map((u) => u.key === "bold" ? /* @__PURE__ */ t(ve, {
        specs: f.filter((N) => ke(N)),
        values: v,
        mixed: c,
        onToggle: w
      }, "format") : /* @__PURE__ */ t(we, {
        spec: u,
        values: v,
        mixed: c.includes(u.key),
        onChange: b,
        onChangeEach: S
      }, u.key)),
      /* @__PURE__ */ t(Le, {})
    ]
  });
}
function Le() {
  const e = p(), l = W(X), n = z((r) => r.selected), a = n.length === 1 && n[0].subtype === "redact" ? n[0] : null, [o, i] = C(null);
  if (D(() => i(null), [a?.ref && Y(a.ref)]), !l || !a || a.subtype !== "redact") return null;
  const s = o ?? a.overlayText ?? "", d = () => {
    o !== null && (l.updateLabel(a.ref, { overlayText: o.length > 0 ? o : null }), i(null));
  };
  return /* @__PURE__ */ t("div", {
    className: "border-border-subtle mt-4 border-t pt-4",
    children: [
      /* @__PURE__ */ t("p", {
        className: "text-fg-muted mb-2 text-[11px] font-semibold uppercase tracking-wide",
        children: e("demo.redactLabelTitle")
      }),
      /* @__PURE__ */ t("input", {
        type: "text",
        value: s,
        placeholder: e("demo.redactLabelPlaceholder"),
        onChange: (r) => i(r.target.value),
        onBlur: d,
        onKeyDown: (r) => r.key === "Enter" && d(),
        className: "border-border bg-surface text-fg w-full rounded-md border px-2 py-1.5 text-sm"
      }),
      /* @__PURE__ */ t("label", {
        className: "text-fg mt-2 flex items-center gap-2 text-sm",
        children: [/* @__PURE__ */ t("input", {
          type: "checkbox",
          checked: a.repeat,
          onChange: (r) => void l.updateLabel(a.ref, { repeat: r.target.checked })
        }), e("demo.redactLabelRepeat")]
      })
    ]
  });
}
export {
  Te as AnnotationStylePanel
};
//# sourceMappingURL=annotation-style-CF_uQ82y-CngnKxKD.js.map
