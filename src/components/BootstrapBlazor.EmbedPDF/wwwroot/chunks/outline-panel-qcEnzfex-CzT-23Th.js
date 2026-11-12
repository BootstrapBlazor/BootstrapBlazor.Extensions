import { u as G, ah as ve, ai as we, aj as xe, p as ke, L as ce, ak as Te, k as P, q as re, a6 as Se, al as Ce, v as Y, l as h, am as Me, A as O, an as ae, n as Re, m as Pe, S as De, M as Ke } from "./init-tVr9KnGC.js";
import { treeKeyAction as Oe } from "@embedpdf/core-ui";
const d = (t) => t ? String(t.objectNumber) : "top";
function Ne(t, a) {
  const r = a.trim().toLocaleLowerCase();
  if (!r) return [];
  const l = new Map(t.map((u) => [d(u.ref), u])), o = /* @__PURE__ */ new Set();
  for (const u of t)
    if (u.title.toLocaleLowerCase().includes(r))
      for (let f = u; f; ) {
        const g = d(f.ref);
        if (o.has(g)) break;
        o.add(g), f = f.parent ? l.get(d(f.parent)) : void 0;
      }
  const c = /* @__PURE__ */ new Map(), p = new Set(t.flatMap((u) => u.parent ? [d(u.parent)] : [])), b = [];
  for (const u of t) {
    const f = d(u.ref), g = u.parent ? (c.get(d(u.parent)) ?? -1) + 1 : 0;
    if (c.set(f, g), !o.has(f)) continue;
    const y = p.has(f);
    b.push({
      item: u,
      depth: g,
      hasChildren: y,
      expanded: y
    });
  }
  return b;
}
const Ie = {
  light: "#ffffff",
  dark: "#1f2937"
}, Ee = 3;
function oe(t) {
  const a = Number.parseInt(t.slice(1), 16), r = (l) => {
    const o = (a >> l & 255) / 255;
    return o <= 0.04045 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * r(16) + 0.7152 * r(8) + 0.0722 * r(0);
}
function $e(t, a) {
  if (!t || !/^#[0-9a-fA-F]{6}$/.test(t)) return null;
  const [r, l] = [oe(t), oe(Ie[a])].sort((o, c) => c - o);
  return (r + 0.05) / (l + 0.05) >= Ee ? t : null;
}
function Le(t, a) {
  const r = /* @__PURE__ */ new Set();
  let l = -1;
  for (const o of t) {
    const c = d(o.item.ref);
    if (l >= 0 && o.depth > l) {
      r.add(c);
      continue;
    }
    l = -1, a.has(c) && (r.add(c), l = o.depth);
  }
  return r;
}
function Xe(t, a, r, l) {
  const o = t.filter((x) => !a.has(d(x.item.ref)));
  if (o.length === 0) return null;
  const c = t.slice(0, r).filter((x) => !a.has(d(x.item.ref))).length, p = o[c - 1], b = o[c], u = p ? p.depth + 1 : 0, f = b ? Math.min(b.depth, u) : 0, g = Math.max(f, Math.min(u, Math.round(l)));
  let y = null, m = null;
  for (let x = c - 1; x >= 0; x -= 1) {
    const R = o[x];
    if (R.depth < g) {
      y = R.item.ref;
      break;
    }
    R.depth === g && m === null && (m = R.item.ref);
  }
  return {
    parent: y,
    position: m ? { after: m } : "start",
    depth: g
  };
}
const ie = 8, Ae = 4, Fe = 450, le = 28, ue = 13, se = 16;
function Ye(t) {
  const { outline: a, rows: r, currentKey: l, selected: o, editable: c, filtering: p, renamingKey: b, onRename: u } = t, f = G(), g = Me(), y = O(null), [m, x] = P(0), [R, N] = P(0), [D, T] = P(null), [X, S] = P(null), [k, K] = P(null), [C, M] = P(!1), _ = O(null);
  _.current = k;
  const B = O(null), H = O(!1), A = new Set(o.map(d)), I = (e) => e === null ? -1 : r.findIndex((n) => d(n.item.ref) === e), q = I(D) >= 0 ? D : l ?? (o[0] ? d(o[0]) : null), V = I(q);
  ae(() => {
    const e = y.current;
    if (!e) return;
    const n = new ResizeObserver(() => N(e.clientHeight));
    return n.observe(e), N(e.clientHeight), () => n.disconnect();
  }, []);
  const z = (e) => {
    const n = y.current;
    if (!n || e < 0) return;
    const i = e * 30;
    i < n.scrollTop ? n.scrollTop = i : i + 30 > n.scrollTop + n.clientHeight && (n.scrollTop = i + 30 - n.clientHeight);
  }, W = I(l);
  Y(() => z(W), [W]);
  const J = I(b);
  Y(() => z(J), [J]);
  const Q = Math.max(0, Math.floor(m / 30) - ie), fe = Math.min(r.length, Math.ceil((m + R) / 30) + ie), Z = (e) => {
    const { item: n } = e;
    !n.target && !n.action || (a.activate(n.ref), t.onPicked());
  }, de = (e, n) => {
    const i = r[e];
    if (!i) return;
    const s = d(i.item.ref);
    T(s), S(s), a.select([i.item.ref]), z(e);
  }, me = (e) => {
    switch (e.type) {
      case "focus":
        de(e.row);
        return;
      case "expand":
        for (const n of e.rows) {
          const i = r[n];
          i && a.expand(i.item.ref);
        }
        return;
      case "collapse": {
        const n = r[e.row];
        n && a.collapse(n.item.ref);
        return;
      }
      case "activate": {
        const n = r[e.row];
        n && Z(n);
        return;
      }
      case "rename": {
        const n = r[e.row];
        n && u(d(n.item.ref));
        return;
      }
      case "delete":
        o.length > 0 && a.delete(o).catch(() => {
        });
        return;
    }
  }, he = (e) => {
    if (e.target !== e.currentTarget) return;
    M(!0);
    const n = e.key === "Backspace" ? "Delete" : e.key, i = Oe(r, V, n, { editable: c });
    !i || p && (i.type === "expand" || i.type === "collapse") || (e.preventDefault(), me(i));
  }, pe = (e, n, i) => {
    if (H.current) {
      H.current = !1;
      return;
    }
    const s = d(e.item.ref);
    if (T(s), i.metaKey || i.ctrlKey) {
      a.select(A.has(s) ? o.filter((v) => d(v) !== s) : [...o, e.item.ref]), S(s);
      return;
    }
    if (i.shiftKey && X !== null && I(X) >= 0) {
      const v = I(X), [E, F] = v < n ? [v, n] : [n, v];
      a.select(r.slice(E, F + 1).map((w) => w.item.ref));
      return;
    }
    S(s), a.select([e.item.ref]), Z(e);
  }, U = () => {
    B.current !== null && clearTimeout(B.current), B.current = null;
  }, ee = (e, n, i) => {
    const s = y.current;
    if (!s) return null;
    const v = i - s.getBoundingClientRect().top + s.scrollTop, E = Math.max(0, Math.min(r.length, Math.round(v / 30))), F = getComputedStyle(s).direction === "rtl", w = (n - e.startX) * (F ? -1 : 1), $ = Xe(r, e.moving, E, e.startDepth + w / 16);
    return $ ? {
      ...$,
      gap: E
    } : null;
  }, te = (e, n, i) => {
    const s = {
      ...e,
      active: !0,
      drop: ee(e, n, i)
    };
    K(s), y.current?.setPointerCapture(e.pointerId);
  }, ge = (e, n) => {
    if (!c || p || n.button !== 0 || b !== null || n.target.closest("button, input")) return;
    const i = d(e.item.ref), s = A.has(i) ? A : /* @__PURE__ */ new Set([i]), v = Le(r, s), E = r.filter((w) => s.has(d(w.item.ref))).filter((w) => {
      const $ = d(w.item.ref), L = w.item.parent ? d(w.item.parent) : null;
      return !(L !== null && v.has(L) && v.has($));
    }).map((w) => w.item.ref), F = {
      pointerId: n.pointerId,
      startX: n.clientX,
      startY: n.clientY,
      startDepth: e.depth,
      moving: v,
      refs: E,
      active: !1,
      drop: null
    };
    if (K(F), n.pointerType !== "mouse") {
      const { clientX: w, clientY: $ } = n;
      B.current = setTimeout(() => {
        const L = _.current;
        L && !L.active && te(L, w, $);
      }, Fe);
    }
  }, j = k?.active === !0;
  Y(() => {
    if (!j) return;
    const e = (n) => n.preventDefault();
    return document.addEventListener("touchmove", e, { passive: !1 }), () => document.removeEventListener("touchmove", e);
  }, [j]);
  const be = (e) => {
    const n = _.current;
    if (!n || e.pointerId !== n.pointerId) return;
    const i = Math.hypot(e.clientX - n.startX, e.clientY - n.startY);
    if (!n.active) {
      if (i <= Ae) return;
      e.pointerType === "mouse" ? te(n, e.clientX, e.clientY) : (U(), K(null));
      return;
    }
    const s = y.current;
    if (s) {
      const v = s.getBoundingClientRect();
      e.clientY < v.top + le ? s.scrollTop -= 8 : e.clientY > v.bottom - le && (s.scrollTop += 8);
    }
    K({
      ...n,
      drop: ee(n, e.clientX, e.clientY)
    });
  }, ne = (e, n) => {
    U();
    const i = _.current;
    !i || e.pointerId !== i.pointerId || (K(null), i.active && (H.current = !0, setTimeout(() => {
      H.current = !1;
    }, 0), n && i.drop && i.refs.length > 0 && a.move(i.refs, i.drop.parent, i.drop.position).catch(() => {
    })));
  };
  Y(() => U, []);
  const ye = r.slice(Q, fe);
  return /* @__PURE__ */ h("div", {
    ref: y,
    role: "tree",
    "aria-label": t.label,
    "aria-multiselectable": !0,
    tabIndex: 0,
    "aria-activedescendant": V >= 0 ? `${g}-${q}` : void 0,
    onKeyDown: he,
    onFocus: (e) => e.target === e.currentTarget && M(e.currentTarget.matches(":focus-visible")),
    onBlur: (e) => e.target === e.currentTarget && M(!1),
    onScroll: (e) => x(e.currentTarget.scrollTop),
    onPointerMove: be,
    onPointerUp: (e) => ne(e, !0),
    onPointerCancel: (e) => ne(e, !1),
    className: "focus-visible:ring-accent relative min-h-0 flex-1 overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-inset",
    children: /* @__PURE__ */ h("div", {
      style: {
        height: r.length * 30,
        position: "relative"
      },
      children: [ye.map((e, n) => {
        const i = Q + n, s = d(e.item.ref);
        return /* @__PURE__ */ h(_e, {
          id: `${g}-${s}`,
          outline: a,
          row: e,
          index: i,
          current: s === l,
          selected: A.has(s),
          focused: C && s === q,
          moving: j && k.moving.has(s),
          editable: c,
          foldable: !p,
          renaming: s === b,
          mode: t.mode,
          untitled: f("outline.untitled"),
          onClick: (v) => pe(e, i, v),
          onPointerDown: (v) => ge(e, v),
          onRenameStart: () => u(s),
          onRenameEnd: () => {
            u(null), T(s), y.current?.focus({ preventScroll: !0 });
          },
          onMenu: () => {
            T(s), A.has(s) || a.select([e.item.ref]);
          }
        }, s);
      }), j && k.drop && /* @__PURE__ */ h("div", {
        "aria-hidden": !0,
        className: "bg-accent pointer-events-none absolute h-0.5 rounded-full",
        style: {
          top: k.drop.gap * 30 - 1,
          insetInlineStart: 24 + k.drop.depth * 16,
          insetInlineEnd: 4
        }
      })]
    })
  });
}
function _e(t) {
  const { row: a, outline: r } = t, { item: l, depth: o, hasChildren: c, expanded: p } = a, b = O(null), u = Re({
    label: l.title || t.untitled,
    labelShown: !0
  }, { clipped: (m) => m }), f = !l.target && !l.action, g = $e(l.color, t.mode), y = t.selected ? "bg-accent-light text-fg" : t.current ? "bg-hover text-fg" : "text-fg-secondary hover:bg-hover";
  return /* @__PURE__ */ h("div", {
    id: t.id,
    role: "treeitem",
    "aria-level": o + 1,
    "aria-expanded": c ? p : void 0,
    "aria-selected": t.selected,
    "aria-current": t.current ? "location" : void 0,
    onClick: t.onClick,
    onDoubleClick: () => t.editable && t.onRenameStart(),
    onContextMenu: (m) => {
      t.editable && (m.preventDefault(), t.onMenu(), b.current?.querySelector("button")?.click());
    },
    onPointerDown: t.onPointerDown,
    className: `group absolute inset-x-0 flex cursor-default select-none items-center gap-0.5 rounded pe-1 ${y} ${t.focused ? "ring-accent/60 ring-1 ring-inset" : ""} ${t.moving ? "opacity-40" : ""}`,
    style: {
      top: t.index * 30,
      height: 30,
      paddingInlineStart: 4 + o * 16
    },
    children: [
      t.current && /* @__PURE__ */ h("span", {
        "aria-hidden": !0,
        className: "bg-accent absolute inset-y-1 start-0 w-0.5 rounded-full"
      }),
      /* @__PURE__ */ h("button", {
        type: "button",
        tabIndex: -1,
        "aria-hidden": !0,
        disabled: !c || !t.foldable,
        onClick: (m) => {
          m.stopPropagation(), p ? r.collapse(l.ref) : r.expand(l.ref);
        },
        className: "text-fg-muted flex h-5 w-5 shrink-0 items-center justify-center rounded disabled:cursor-default",
        children: c && /* @__PURE__ */ h(Pe, {
          name: "chevronRight",
          size: 14,
          className: `transition-transform rtl:-scale-x-100 ${p ? "rotate-90 rtl:-rotate-90" : ""}`
        })
      }),
      t.renaming ? /* @__PURE__ */ h(He, {
        title: l.title,
        onDone: (m) => {
          t.onRenameEnd(), m !== null && m !== l.title && r.update(l.ref, { title: m }).catch(() => {
          });
        }
      }) : /* @__PURE__ */ h(De, { children: [/* @__PURE__ */ h("span", {
        ...u.trigger,
        className: `min-w-0 flex-1 truncate ${f ? "opacity-60" : ""}`,
        style: {
          fontSize: ue,
          color: g ?? void 0,
          fontWeight: l.bold ? 600 : void 0,
          fontStyle: l.italic ? "italic" : void 0
        },
        children: l.title || t.untitled
      }), u.element] }),
      t.editable && !t.renaming && /* @__PURE__ */ h("span", {
        ref: b,
        onClick: (m) => m.stopPropagation(),
        onPointerDownCapture: t.onMenu,
        className: `shrink-0 ${t.selected || t.focused ? "" : "opacity-0 focus-within:opacity-100 group-hover:opacity-100"}`,
        children: /* @__PURE__ */ h(Be, {})
      })
    ]
  });
}
function Be() {
  const t = ce("menu:outline-item");
  return t.visible ? /* @__PURE__ */ h(Ke, {
    cmd: t,
    variant: "icon",
    run: () => void t.run()
  }) : null;
}
function He({ title: t, onDone: a }) {
  const r = G(), l = O(null), o = O(!1), [c, p] = P(t);
  ae(() => {
    l.current?.focus(), l.current?.select();
  }, []);
  const b = (f) => {
    o.current || (o.current = !0, a(f));
  }, u = ue / se;
  return /* @__PURE__ */ h("span", {
    className: "relative min-w-0 flex-1",
    style: { height: 24 },
    children: /* @__PURE__ */ h("input", {
      ref: l,
      type: "text",
      value: c,
      "aria-label": r("commands.outline.rename"),
      maxLength: 32767,
      onChange: (f) => p(f.target.value),
      onKeyDown: (f) => {
        f.stopPropagation(), f.key === "Enter" ? b(c) : f.key === "Escape" && b(null);
      },
      onBlur: () => b(c),
      onClick: (f) => f.stopPropagation(),
      className: "border-accent bg-surface text-fg absolute start-0 top-0 origin-top-left rounded border px-1 outline-none rtl:origin-top-right",
      style: {
        fontSize: se,
        width: `${100 / u}%`,
        height: `${100 / u}%`,
        transform: `scale(${u})`
      }
    })
  });
}
function je(t, a, r) {
  if (!t) return null;
  const l = new Map(r.map((o) => [d(o.ref), o]));
  for (let o = d(t); o !== null; ) {
    if (a.has(o)) return o;
    const c = l.get(o)?.parent ?? null;
    o = c ? d(c) : null;
  }
  return null;
}
function Ue() {
  const t = G(), a = ve(), { items: r, rows: l, current: o, selected: c, status: p, incomplete: b } = we(), { mode: u } = xe(), f = ke(), g = ce("outline:add"), y = g.visible && g.enabled, [m, x] = Te(), [R, N] = P(null), D = m.trim() !== "", T = re(() => D ? Ne(r, m) : l, [
    D,
    r,
    m,
    l
  ]), X = je(o, re(() => new Set(T.map((C) => d(C.item.ref))), [T]), r), S = Se(Ce);
  Y(() => {
    if (!S.isOpen) return;
    const C = S.props;
    if (C.item !== void 0) {
      N(String(C.item)), S.close();
      return;
    }
    const [M] = c;
    !M || M.objectNumber === C.after || (x(""), N(d(M)), S.close());
  }, [
    S,
    c,
    x
  ]);
  const k = (C, M = !1) => /* @__PURE__ */ h("div", {
    className: "text-fg-muted flex flex-col items-center gap-3 p-6 text-center text-sm",
    children: [/* @__PURE__ */ h("p", { children: C }), M && y && /* @__PURE__ */ h("button", {
      type: "button",
      onClick: () => void g.run(),
      className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
      children: g.label
    })]
  }), K = r.length === 0 ? p === "idle" || p === "loading" ? k(t("outline.loading")) : p === "forbidden" || p === "error" ? k(t("outline.failed")) : k(t("outline.empty"), !0) : D && T.length === 0 ? k(t("outline.noMatches")) : /* @__PURE__ */ h(Ye, {
    outline: a,
    rows: T,
    currentKey: X,
    selected: c,
    editable: y,
    filtering: D,
    renamingKey: R,
    onRename: N,
    mode: u,
    onPicked: f,
    label: t("panels.outline")
  });
  return /* @__PURE__ */ h("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [b && /* @__PURE__ */ h("p", {
      className: "text-fg-muted border-border-subtle border-b px-3 py-2 text-xs",
      children: t("outline.incomplete")
    }), K]
  });
}
export {
  Ue as OutlinePanel
};
//# sourceMappingURL=outline-panel-qcEnzfex-CzT-23Th.js.map
