import { u as G, aJ as we, aK as ve, aL as ke, h as Te, E as ce, aM as Ce, d as D, i as re, a5 as Se, aN as Me, m as H, e as g, au as Re, A as K, aO as ae, f as De, I as Oe, S as Pe, F as Ke } from "./wasm-url-asset-DQFmMC86.js";
function ue(e, i) {
  const r = e[i].depth;
  for (let l = i - 1; l >= 0; l -= 1) if (e[l].depth < r) return l;
  return -1;
}
function Ne(e, i) {
  const r = e[i].depth, l = [];
  for (let o = ue(e, i) + 1; o < e.length && !(e[o].depth < r); o += 1)
    e[o].depth === r && l.push(o);
  return l;
}
function Ee(e, i, r, l = {}) {
  if (e.length === 0) return null;
  const o = e.length - 1;
  if (i < 0 || i > o)
    return r === "ArrowDown" || r === "Home" ? { type: "focus", row: 0 } : r === "ArrowUp" || r === "End" ? { type: "focus", row: o } : null;
  const c = e[i], h = (d) => d === i ? null : { type: "focus", row: d };
  switch (r) {
    case "ArrowDown":
      return h(Math.min(i + 1, o));
    case "ArrowUp":
      return h(Math.max(i - 1, 0));
    case "Home":
      return h(0);
    case "End":
      return h(o);
    case "ArrowRight":
      return c.hasChildren ? c.expanded ? h(i + 1) : { type: "expand", rows: [i] } : null;
    case "ArrowLeft": {
      if (c.hasChildren && c.expanded) return { type: "collapse", row: i };
      const d = ue(e, i);
      return d < 0 ? null : h(d);
    }
    case "*": {
      const d = Ne(e, i).filter(
        (u) => e[u].hasChildren && !e[u].expanded
      );
      return d.length > 0 ? { type: "expand", rows: d } : null;
    }
    case "Enter":
      return { type: "activate", row: i };
    case "F2":
      return l.editable ? { type: "rename", row: i } : null;
    case "Delete":
      return l.editable ? { type: "delete", row: i } : null;
    default:
      return null;
  }
}
const m = (e) => e ? String(e.objectNumber) : "top";
function Ie(e, i) {
  const r = i.trim().toLocaleLowerCase();
  if (!r) return [];
  const l = new Map(e.map((u) => [m(u.ref), u])), o = /* @__PURE__ */ new Set();
  for (const u of e)
    if (u.title.toLocaleLowerCase().includes(r))
      for (let f = u; f; ) {
        const b = m(f.ref);
        if (o.has(b)) break;
        o.add(b), f = f.parent ? l.get(m(f.parent)) : void 0;
      }
  const c = /* @__PURE__ */ new Map(), h = new Set(e.flatMap((u) => u.parent ? [m(u.parent)] : [])), d = [];
  for (const u of e) {
    const f = m(u.ref), b = u.parent ? (c.get(m(u.parent)) ?? -1) + 1 : 0;
    if (c.set(f, b), !o.has(f)) continue;
    const y = h.has(f);
    d.push({
      item: u,
      depth: b,
      hasChildren: y,
      expanded: y
    });
  }
  return d;
}
const Ae = {
  light: "#ffffff",
  dark: "#1f2937"
}, Le = 3;
function oe(e) {
  const i = Number.parseInt(e.slice(1), 16), r = (l) => {
    const o = (i >> l & 255) / 255;
    return o <= 0.04045 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * r(16) + 0.7152 * r(8) + 0.0722 * r(0);
}
function $e(e, i) {
  if (!e || !/^#[0-9a-fA-F]{6}$/.test(e)) return null;
  const [r, l] = [oe(e), oe(Ae[i])].sort((o, c) => c - o);
  return (r + 0.05) / (l + 0.05) >= Le ? e : null;
}
function Xe(e, i) {
  const r = /* @__PURE__ */ new Set();
  let l = -1;
  for (const o of e) {
    const c = m(o.item.ref);
    if (l >= 0 && o.depth > l) {
      r.add(c);
      continue;
    }
    l = -1, i.has(c) && (r.add(c), l = o.depth);
  }
  return r;
}
function Fe(e, i, r, l) {
  const o = e.filter((v) => !i.has(m(v.item.ref)));
  if (o.length === 0) return null;
  const c = e.slice(0, r).filter((v) => !i.has(m(v.item.ref))).length, h = o[c - 1], d = o[c], u = h ? h.depth + 1 : 0, f = d ? Math.min(d.depth, u) : 0, b = Math.max(f, Math.min(u, Math.round(l)));
  let y = null, p = null;
  for (let v = c - 1; v >= 0; v -= 1) {
    const R = o[v];
    if (R.depth < b) {
      y = R.item.ref;
      break;
    }
    R.depth === b && p === null && (p = R.item.ref);
  }
  return {
    parent: y,
    position: p ? { after: p } : "start",
    depth: b
  };
}
const ie = 8, He = 4, Ye = 450, le = 28, de = 13, se = 16;
function _e(e) {
  const { outline: i, rows: r, currentKey: l, selected: o, editable: c, filtering: h, renamingKey: d, onRename: u } = e, f = G(), b = Re(), y = K(null), [p, v] = D(0), [R, N] = D(0), [O, T] = D(null), [$, C] = D(null), [k, P] = D(null), [S, M] = D(!1), Y = K(null);
  Y.current = k;
  const _ = K(null), B = K(!1), X = new Set(o.map(m)), E = (t) => t === null ? -1 : r.findIndex((n) => m(n.item.ref) === t), z = E(O) >= 0 ? O : l ?? (o[0] ? m(o[0]) : null), J = E(z);
  ae(() => {
    const t = y.current;
    if (!t) return;
    const n = new ResizeObserver(() => N(t.clientHeight));
    return n.observe(t), N(t.clientHeight), () => n.disconnect();
  }, []);
  const j = (t) => {
    const n = y.current;
    if (!n || t < 0) return;
    const s = t * 30;
    s < n.scrollTop ? n.scrollTop = s : s + 30 > n.scrollTop + n.clientHeight && (n.scrollTop = s + 30 - n.clientHeight);
  }, V = E(l);
  H(() => j(V), [V]);
  const W = E(d);
  H(() => j(W), [W]);
  const Q = Math.max(0, Math.floor(p / 30) - ie), fe = Math.min(r.length, Math.ceil((p + R) / 30) + ie), Z = (t) => {
    const { item: n } = t;
    !n.target && !n.action || (i.activate(n.ref), e.onPicked());
  }, he = (t, n) => {
    const s = r[t];
    if (!s) return;
    const a = m(s.item.ref);
    T(a), C(a), i.select([s.item.ref]), j(t);
  }, me = (t) => {
    switch (t.type) {
      case "focus":
        he(t.row);
        return;
      case "expand":
        for (const n of t.rows) {
          const s = r[n];
          s && i.expand(s.item.ref);
        }
        return;
      case "collapse": {
        const n = r[t.row];
        n && i.collapse(n.item.ref);
        return;
      }
      case "activate": {
        const n = r[t.row];
        n && Z(n);
        return;
      }
      case "rename": {
        const n = r[t.row];
        n && u(m(n.item.ref));
        return;
      }
      case "delete":
        o.length > 0 && i.delete(o).catch(() => {
        });
        return;
    }
  }, pe = (t) => {
    if (t.target !== t.currentTarget) return;
    M(!0);
    const n = t.key === "Backspace" ? "Delete" : t.key, s = Ee(r, J, n, { editable: c });
    !s || h && (s.type === "expand" || s.type === "collapse") || (t.preventDefault(), me(s));
  }, ge = (t, n, s) => {
    if (B.current) {
      B.current = !1;
      return;
    }
    const a = m(t.item.ref);
    if (T(a), s.metaKey || s.ctrlKey) {
      i.select(X.has(a) ? o.filter((x) => m(x) !== a) : [...o, t.item.ref]), C(a);
      return;
    }
    if (s.shiftKey && $ !== null && E($) >= 0) {
      const x = E($), [I, F] = x < n ? [x, n] : [n, x];
      i.select(r.slice(I, F + 1).map((w) => w.item.ref));
      return;
    }
    C(a), i.select([t.item.ref]), Z(t);
  }, q = () => {
    _.current !== null && clearTimeout(_.current), _.current = null;
  }, ee = (t, n, s) => {
    const a = y.current;
    if (!a) return null;
    const x = s - a.getBoundingClientRect().top + a.scrollTop, I = Math.max(0, Math.min(r.length, Math.round(x / 30))), F = getComputedStyle(a).direction === "rtl", w = (n - t.startX) * (F ? -1 : 1), A = Fe(r, t.moving, I, t.startDepth + w / 16);
    return A ? {
      ...A,
      gap: I
    } : null;
  }, te = (t, n, s) => {
    const a = {
      ...t,
      active: !0,
      drop: ee(t, n, s)
    };
    P(a), y.current?.setPointerCapture(t.pointerId);
  }, be = (t, n) => {
    if (!c || h || n.button !== 0 || d !== null || n.target.closest("button, input")) return;
    const s = m(t.item.ref), a = X.has(s) ? X : /* @__PURE__ */ new Set([s]), x = Xe(r, a), I = r.filter((w) => a.has(m(w.item.ref))).filter((w) => {
      const A = m(w.item.ref), L = w.item.parent ? m(w.item.parent) : null;
      return !(L !== null && x.has(L) && x.has(A));
    }).map((w) => w.item.ref), F = {
      pointerId: n.pointerId,
      startX: n.clientX,
      startY: n.clientY,
      startDepth: t.depth,
      moving: x,
      refs: I,
      active: !1,
      drop: null
    };
    if (P(F), n.pointerType !== "mouse") {
      const { clientX: w, clientY: A } = n;
      _.current = setTimeout(() => {
        const L = Y.current;
        L && !L.active && te(L, w, A);
      }, Ye);
    }
  }, U = k?.active === !0;
  H(() => {
    if (!U) return;
    const t = (n) => n.preventDefault();
    return document.addEventListener("touchmove", t, { passive: !1 }), () => document.removeEventListener("touchmove", t);
  }, [U]);
  const ye = (t) => {
    const n = Y.current;
    if (!n || t.pointerId !== n.pointerId) return;
    const s = Math.hypot(t.clientX - n.startX, t.clientY - n.startY);
    if (!n.active) {
      if (s <= He) return;
      t.pointerType === "mouse" ? te(n, t.clientX, t.clientY) : (q(), P(null));
      return;
    }
    const a = y.current;
    if (a) {
      const x = a.getBoundingClientRect();
      t.clientY < x.top + le ? a.scrollTop -= 8 : t.clientY > x.bottom - le && (a.scrollTop += 8);
    }
    P({
      ...n,
      drop: ee(n, t.clientX, t.clientY)
    });
  }, ne = (t, n) => {
    q();
    const s = Y.current;
    !s || t.pointerId !== s.pointerId || (P(null), s.active && (B.current = !0, setTimeout(() => {
      B.current = !1;
    }, 0), n && s.drop && s.refs.length > 0 && i.move(s.refs, s.drop.parent, s.drop.position).catch(() => {
    })));
  };
  H(() => q, []);
  const xe = r.slice(Q, fe);
  return /* @__PURE__ */ g("div", {
    ref: y,
    role: "tree",
    "aria-label": e.label,
    "aria-multiselectable": !0,
    tabIndex: 0,
    "aria-activedescendant": J >= 0 ? `${b}-${z}` : void 0,
    onKeyDown: pe,
    onFocus: (t) => t.target === t.currentTarget && M(t.currentTarget.matches(":focus-visible")),
    onBlur: (t) => t.target === t.currentTarget && M(!1),
    onScroll: (t) => v(t.currentTarget.scrollTop),
    onPointerMove: ye,
    onPointerUp: (t) => ne(t, !0),
    onPointerCancel: (t) => ne(t, !1),
    className: "focus-visible:ring-accent relative min-h-0 flex-1 overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-inset",
    children: /* @__PURE__ */ g("div", {
      style: {
        height: r.length * 30,
        position: "relative"
      },
      children: [xe.map((t, n) => {
        const s = Q + n, a = m(t.item.ref);
        return /* @__PURE__ */ g(Be, {
          id: `${b}-${a}`,
          outline: i,
          row: t,
          index: s,
          current: a === l,
          selected: X.has(a),
          focused: S && a === z,
          moving: U && k.moving.has(a),
          editable: c,
          foldable: !h,
          renaming: a === d,
          mode: e.mode,
          untitled: f("outline.untitled"),
          onClick: (x) => ge(t, s, x),
          onPointerDown: (x) => be(t, x),
          onRenameStart: () => u(a),
          onRenameEnd: () => {
            u(null), T(a), y.current?.focus({ preventScroll: !0 });
          },
          onMenu: () => {
            T(a), X.has(a) || i.select([t.item.ref]);
          }
        }, a);
      }), U && k.drop && /* @__PURE__ */ g("div", {
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
function Be(e) {
  const { row: i, outline: r } = e, { item: l, depth: o, hasChildren: c, expanded: h } = i, d = K(null), u = De({
    label: l.title || e.untitled,
    labelShown: !0
  }, { clipped: (p) => p }), f = !l.target && !l.action, b = $e(l.color, e.mode), y = e.selected ? "bg-accent-light text-fg" : e.current ? "bg-hover text-fg" : "text-fg-secondary hover:bg-hover";
  return /* @__PURE__ */ g("div", {
    id: e.id,
    role: "treeitem",
    "aria-level": o + 1,
    "aria-expanded": c ? h : void 0,
    "aria-selected": e.selected,
    "aria-current": e.current ? "location" : void 0,
    onClick: e.onClick,
    onDoubleClick: () => e.editable && e.onRenameStart(),
    onContextMenu: (p) => {
      e.editable && (p.preventDefault(), e.onMenu(), d.current?.querySelector("button")?.click());
    },
    onPointerDown: e.onPointerDown,
    className: `group absolute inset-x-0 flex cursor-default select-none items-center gap-0.5 rounded pe-1 ${y} ${e.focused ? "ring-accent/60 ring-1 ring-inset" : ""} ${e.moving ? "opacity-40" : ""}`,
    style: {
      top: e.index * 30,
      height: 30,
      paddingInlineStart: 4 + o * 16
    },
    children: [
      e.current && /* @__PURE__ */ g("span", {
        "aria-hidden": !0,
        className: "bg-accent absolute inset-y-1 start-0 w-0.5 rounded-full"
      }),
      /* @__PURE__ */ g("button", {
        type: "button",
        tabIndex: -1,
        "aria-hidden": !0,
        disabled: !c || !e.foldable,
        onClick: (p) => {
          p.stopPropagation(), h ? r.collapse(l.ref) : r.expand(l.ref);
        },
        className: "text-fg-muted flex h-5 w-5 shrink-0 items-center justify-center rounded disabled:cursor-default",
        children: c && /* @__PURE__ */ g(Oe, {
          name: "chevronRight",
          size: 14,
          className: `transition-transform rtl:-scale-x-100 ${h ? "rotate-90 rtl:-rotate-90" : ""}`
        })
      }),
      e.renaming ? /* @__PURE__ */ g(ze, {
        title: l.title,
        onDone: (p) => {
          e.onRenameEnd(), p !== null && p !== l.title && r.update(l.ref, { title: p }).catch(() => {
          });
        }
      }) : /* @__PURE__ */ g(Pe, { children: [/* @__PURE__ */ g("span", {
        ...u.trigger,
        className: `min-w-0 flex-1 truncate ${f ? "opacity-60" : ""}`,
        style: {
          fontSize: de,
          color: b ?? void 0,
          fontWeight: l.bold ? 600 : void 0,
          fontStyle: l.italic ? "italic" : void 0
        },
        children: l.title || e.untitled
      }), u.element] }),
      e.editable && !e.renaming && /* @__PURE__ */ g("span", {
        ref: d,
        onClick: (p) => p.stopPropagation(),
        onPointerDownCapture: e.onMenu,
        className: `shrink-0 ${e.selected || e.focused ? "" : "opacity-0 focus-within:opacity-100 group-hover:opacity-100"}`,
        children: /* @__PURE__ */ g(Ue, {})
      })
    ]
  });
}
function Ue() {
  const e = ce("menu:outline-item");
  return e.visible ? /* @__PURE__ */ g(Ke, {
    cmd: e,
    variant: "icon",
    run: () => void e.run()
  }) : null;
}
function ze({ title: e, onDone: i }) {
  const r = G(), l = K(null), o = K(!1), [c, h] = D(e);
  ae(() => {
    l.current?.focus(), l.current?.select();
  }, []);
  const d = (f) => {
    o.current || (o.current = !0, i(f));
  }, u = de / se;
  return /* @__PURE__ */ g("span", {
    className: "relative min-w-0 flex-1",
    style: { height: 24 },
    children: /* @__PURE__ */ g("input", {
      ref: l,
      type: "text",
      value: c,
      "aria-label": r("commands.outline.rename"),
      maxLength: 32767,
      onChange: (f) => h(f.target.value),
      onKeyDown: (f) => {
        f.stopPropagation(), f.key === "Enter" ? d(c) : f.key === "Escape" && d(null);
      },
      onBlur: () => d(c),
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
function je(e, i, r) {
  if (!e) return null;
  const l = new Map(r.map((o) => [m(o.ref), o]));
  for (let o = m(e); o !== null; ) {
    if (i.has(o)) return o;
    const c = l.get(o)?.parent ?? null;
    o = c ? m(c) : null;
  }
  return null;
}
function Ge() {
  const e = G(), i = we(), { items: r, rows: l, current: o, selected: c, status: h, incomplete: d } = ve(), { mode: u } = ke(), f = Te(), b = ce("outline:add"), y = b.visible && b.enabled, [p, v] = Ce(), [R, N] = D(null), O = p.trim() !== "", T = re(() => O ? Ie(r, p) : l, [
    O,
    r,
    p,
    l
  ]), $ = je(o, re(() => new Set(T.map((S) => m(S.item.ref))), [T]), r), C = Se(Me);
  H(() => {
    if (!C.isOpen) return;
    const S = C.props;
    if (S.item !== void 0) {
      N(String(S.item)), C.close();
      return;
    }
    const [M] = c;
    !M || M.objectNumber === S.after || (v(""), N(m(M)), C.close());
  }, [
    C,
    c,
    v
  ]);
  const k = (S, M = !1) => /* @__PURE__ */ g("div", {
    className: "text-fg-muted flex flex-col items-center gap-3 p-6 text-center text-sm",
    children: [/* @__PURE__ */ g("p", { children: S }), M && y && /* @__PURE__ */ g("button", {
      type: "button",
      onClick: () => void b.run(),
      className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
      children: b.label
    })]
  }), P = r.length === 0 ? h === "idle" || h === "loading" ? k(e("outline.loading")) : h === "forbidden" || h === "error" ? k(e("outline.failed")) : k(e("outline.empty"), !0) : O && T.length === 0 ? k(e("outline.noMatches")) : /* @__PURE__ */ g(_e, {
    outline: i,
    rows: T,
    currentKey: $,
    selected: c,
    editable: y,
    filtering: O,
    renamingKey: R,
    onRename: N,
    mode: u,
    onPicked: f,
    label: e("panels.outline")
  });
  return /* @__PURE__ */ g("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [d && /* @__PURE__ */ g("p", {
      className: "text-fg-muted border-border-subtle border-b px-3 py-2 text-xs",
      children: e("outline.incomplete")
    }), P]
  });
}
export {
  Ge as OutlinePanel
};
//# sourceMappingURL=outline-panel-BgbrOoBa-DCb1Oxsu.js.map
