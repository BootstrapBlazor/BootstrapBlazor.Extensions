var Ze = Object.defineProperty;
var be = (f) => {
  throw TypeError(f);
};
var Je = (f, t, i) => t in f ? Ze(f, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : f[t] = i;
var c = (f, t, i) => Je(f, typeof t != "symbol" ? t + "" : t, i), le = (f, t, i) => t.has(f) || be("Cannot " + i);
var L = (f, t, i) => (le(f, t, "read from private field"), i ? i.call(f) : t.get(f)), P = (f, t, i) => t.has(f) ? be("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(f) : t.set(f, i), W = (f, t, i, n) => (le(f, t, "write to private field"), n ? n.call(f, i) : t.set(f, i), i), S = (f, t, i) => (le(f, t, "access private method"), i);
var Ie = (f, t, i, n) => ({
  set _(s) {
    W(f, t, s, i);
  },
  get _() {
    return L(f, t, n);
  }
});
import { addLink } from "../../BootstrapBlazor/modules/utility.js";
var Dt, qt, At;
class InputIndicators {
  constructor(t) {
    // #region config
    c(this, "radius", 8);
    c(this, "startAngle", 0);
    c(this, "endAngle", Math.PI * 2);
    c(this, "inactiveColour", "#ffffff10");
    c(this, "colour1", "#ff5f00");
    c(this, "colour2", "#00ff7c");
    c(this, "colour3", "#dea7ff");
    c(this, "fontString", "bold 12px Arial");
    // #endregion
    // #region state
    c(this, "enabled", !0);
    c(this, "shiftDown", !1);
    c(this, "undoDown", !1);
    c(this, "redoDown", !1);
    c(this, "ctrlDown", !1);
    c(this, "altDown", !1);
    c(this, "mouse0Down", !1);
    c(this, "mouse1Down", !1);
    c(this, "mouse2Down", !1);
    c(this, "x", 0);
    c(this, "y", 0);
    // #endregion
    c(this, "controller");
    P(this, Dt, this.onPointerDownOrMove.bind(this));
    P(this, qt, this.onPointerUp.bind(this));
    P(this, At, this.onKeyDownOrUp.bind(this));
    this.canvas = t, this.controller = new AbortController();
    const { signal: i } = this.controller, n = t.canvas, s = { capture: !0, signal: i };
    n.addEventListener("pointerdown", L(this, Dt), s), n.addEventListener("pointermove", L(this, Dt), s), n.addEventListener("pointerup", L(this, qt), s), n.addEventListener("keydown", L(this, At), s), document.addEventListener("keyup", L(this, At), s);
    const o = t.drawFrontCanvas.bind(t);
    i.addEventListener("abort", () => {
      t.drawFrontCanvas = o;
    }), t.drawFrontCanvas = () => {
      o(), this.draw();
    };
  }
  onPointerDownOrMove(t) {
    this.mouse0Down = (t.buttons & 1) === 1, this.mouse1Down = (t.buttons & 4) === 4, this.mouse2Down = (t.buttons & 2) === 2, this.x = t.clientX, this.y = t.clientY, this.canvas.setDirty(!0);
  }
  onPointerUp() {
    this.mouse0Down = !1, this.mouse1Down = !1, this.mouse2Down = !1;
  }
  onKeyDownOrUp(t) {
    this.ctrlDown = t.ctrlKey, this.altDown = t.altKey, this.shiftDown = t.shiftKey, this.undoDown = t.ctrlKey && t.code === "KeyZ" && t.type === "keydown", this.redoDown = t.ctrlKey && t.code === "KeyY" && t.type === "keydown";
  }
  draw() {
    const {
      canvas: { ctx: t },
      radius: i,
      startAngle: n,
      endAngle: s,
      x: o,
      y: r,
      inactiveColour: l,
      colour1: a,
      colour2: h,
      colour3: u,
      fontString: d
    } = this, { fillStyle: p, font: g } = t, y = o, _ = r - 80, m = y, w = _ - 15;
    t.font = d, T(m + 0, w, "Shift", this.shiftDown ? a : l), T(m + 45, w + 20, "Alt", this.altDown ? h : l), T(m + 30, w, "Control", this.ctrlDown ? u : l), T(m - 30, w, "↩️", this.undoDown ? "#000" : "transparent"), T(m + 45, w, "↪️", this.redoDown ? "#000" : "transparent"), t.beginPath(), A(y, _), A(y + 15, _), A(y + 30, _), t.fillStyle = l, t.fill();
    const k = this.mouse0Down ? a : l, I = this.mouse1Down ? h : l, N = this.mouse2Down ? u : l;
    this.mouse0Down && O(y, _, k), this.mouse1Down && O(y + 15, _, I), this.mouse2Down && O(y + 30, _, N), t.fillStyle = p, t.font = g;
    function T(G, b, R, C) {
      t.fillStyle = C, t.fillText(R, G, b);
    }
    function O(G, b, R) {
      t.beginPath(), t.fillStyle = R, A(G, b), t.fill();
    }
    function A(G, b) {
      t.arc(G, b, i, n, s);
    }
  }
  dispose() {
    var t;
    (t = this.controller) == null || t.abort(), this.controller = void 0;
  }
  [Symbol.dispose]() {
    this.dispose();
  }
}
Dt = new WeakMap(), qt = new WeakMap(), At = new WeakMap();
class ContextMenu {
  /**
   * @todo Interface for values requires functionality change - currently accepts
   * an array of strings, functions, objects, nulls, or undefined.
   * @param values (allows object { title: "Nice text", callback: function ... })
   * @param options [optional] Some options:\
   * - title: title to show on top of the menu
   * - callback: function to call when an option is clicked, it receives the item information
   * - ignore_item_callbacks: ignores the callback inside the item, it just calls the options.callback
   * - event: you can pass a MouseEvent, this way the ContextMenu appears in that position
   */
  constructor(t, i) {
    c(this, "options");
    c(this, "parentMenu");
    c(this, "root");
    c(this, "current_submenu");
    c(this, "lock");
    c(this, "controller", new AbortController());
    var g, y, _;
    i || (i = {}), this.options = i;
    const n = i.parentMenu;
    n && (n instanceof ContextMenu ? (this.parentMenu = n, this.parentMenu.lock = !0, this.parentMenu.current_submenu = this) : (console.error("parentMenu must be of class ContextMenu, ignoring it"), i.parentMenu = void 0), ((g = n.options) == null ? void 0 : g.className) === "dark" && (i.className = "dark"));
    const s = i.event ? i.event.constructor.name : null;
    s !== "MouseEvent" && s !== "CustomEvent" && s !== "PointerEvent" && (console.error(`Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it. (${s})`), i.event = void 0);
    const o = document.createElement("div");
    let r = "litegraph litecontextmenu litemenubar-panel";
    i.className && (r += ` ${i.className}`), o.className = r, o.style.minWidth = "100", o.style.minHeight = "100";
    const { signal: l } = this.controller, a = { capture: !0, signal: l };
    if (this.parentMenu || document.addEventListener("pointerdown", (m) => {
      m.target instanceof Node && !this.containsNode(m.target) && this.close();
    }, a), o.addEventListener("pointerup", (m) => m.preventDefault(), a), o.addEventListener(
      "contextmenu",
      (m) => {
        m.button === 2 && m.preventDefault();
      },
      a
    ), o.addEventListener(
      "pointerdown",
      (m) => {
        m.button == 2 && (this.close(), m.preventDefault());
      },
      a
    ), this.root = o, i.title) {
      const m = document.createElement("div");
      m.className = "litemenu-title", m.innerHTML = i.title, o.append(m);
    }
    for (let m = 0; m < t.length; m++) {
      const w = t[m];
      let k = Array.isArray(t) ? w : String(m);
      typeof k != "string" && (k = k != null ? k.content === void 0 ? String(k) : k.content : k), this.addItem(k, w, i);
    }
    const u = ((_ = (y = i.event) == null ? void 0 : y.target) == null ? void 0 : _.ownerDocument) || document;
    u.fullscreenElement ? u.fullscreenElement.append(o) : u.body.append(o);
    let d = i.left || 0, p = i.top || 0;
    if (i.event) {
      if (d = i.event.clientX - 10, p = i.event.clientY - 10, i.title && (p -= 20), n) {
        const k = n.root.getBoundingClientRect();
        d = k.left + k.width;
      }
      const m = document.body.getBoundingClientRect(), w = o.getBoundingClientRect();
      m.height == 0 && console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }"), m.width && d > m.width - w.width - 10 && (d = m.width - w.width - 10), m.height && p > m.height - w.height - 10 && (p = m.height - w.height - 10);
    }
    o.style.left = `${d}px`, o.style.top = `${p}px`, LiteGraph.context_menu_scaling && i.scale && (o.style.transform = `scale(${Math.round(i.scale * 4) * 0.25})`);
  }
  /**
   * Checks if {@link node} is inside this context menu or any of its submenus
   * @param node The {@link Node} to check
   * @param visited A set of visited menus to avoid circular references
   * @returns `true` if {@link node} is inside this context menu or any of its submenus
   */
  containsNode(t, i = /* @__PURE__ */ new Set()) {
    var n;
    return i.has(this) ? !1 : (i.add(this), ((n = this.current_submenu) == null ? void 0 : n.containsNode(t, i)) || this.root.contains(t));
  }
  addItem(t, i, n) {
    n || (n = {});
    const s = document.createElement("div");
    s.className = "litemenu-entry submenu";
    let o = !1;
    if (i === null)
      s.classList.add("separator");
    else {
      const u = t === null ? "" : String(t);
      typeof i == "string" ? s.innerHTML = u : (s.innerHTML = (i == null ? void 0 : i.title) ?? u, i.disabled && (o = !0, s.classList.add("disabled"), s.setAttribute("aria-disabled", "true")), (i.submenu || i.has_submenu) && (s.classList.add("has_submenu"), s.setAttribute("aria-haspopup", "true"), s.setAttribute("aria-expanded", "false")), i.className && (s.className += ` ${i.className}`)), s.value = i, s.setAttribute("role", "menuitem"), typeof i == "function" ? (s.dataset.value = String(t), s.onclick_callback = i) : s.dataset.value = String(i);
    }
    this.root.append(s), o || s.addEventListener("click", h), !o && n.autoopen && s.addEventListener("pointerenter", l);
    const r = () => {
      const u = this.root.querySelectorAll("div.litemenu-entry.has_submenu");
      if (u)
        for (const d of u)
          d.setAttribute("aria-expanded", "false");
      s.setAttribute("aria-expanded", "true");
    };
    function l(u) {
      const d = this.value;
      !d || !d.has_submenu || (h.call(this, u), r());
    }
    const a = this;
    function h(u) {
      var g;
      const d = this.value;
      let p = !0;
      if ((g = a.current_submenu) == null || g.close(u), (d != null && d.has_submenu || d != null && d.submenu) && r(), n.callback && n.callback.call(
        this,
        d,
        n,
        u,
        a,
        n.node
      ) === !0 && (p = !1), typeof d == "object" && (d.callback && !n.ignore_item_callbacks && d.disabled !== !0 && d.callback.call(
        this,
        d,
        n,
        u,
        a,
        n.extra
      ) === !0 && (p = !1), d.submenu)) {
        if (!d.submenu.options) throw "ContextMenu submenu needs options";
        new a.constructor(d.submenu.options, {
          callback: d.submenu.callback,
          event: u,
          parentMenu: a,
          ignore_item_callbacks: d.submenu.ignore_item_callbacks,
          title: d.submenu.title,
          extra: d.submenu.extra,
          autoopen: n.autoopen
        }), p = !1;
      }
      p && !a.lock && a.close();
    }
    return s;
  }
  close(t, i) {
    var n;
    this.controller.abort(), this.root.remove(), this.parentMenu && !i && (this.parentMenu.lock = !1, this.parentMenu.current_submenu = void 0, t === void 0 ? this.parentMenu.close() : t && !ContextMenu.isCursorOverElement(t, this.parentMenu.root) && ContextMenu.trigger(
      this.parentMenu.root,
      `${LiteGraph.pointerevents_method}leave`,
      t
    )), (n = this.current_submenu) == null || n.close(t, !0);
  }
  /** @deprecated Likely unused, however code search was inconclusive (too many results to check by hand). */
  // this code is used to trigger events easily (used in the context menu mouseleave
  static trigger(t, i, n) {
    const s = document.createEvent("CustomEvent");
    return s.initCustomEvent(i, !0, !0, n), t.dispatchEvent && t.dispatchEvent(s), s;
  }
  // returns the top most menu
  getTopMenu() {
    return this.options.parentMenu ? this.options.parentMenu.getTopMenu() : this;
  }
  getFirstEvent() {
    return this.options.parentMenu ? this.options.parentMenu.getFirstEvent() : this.options.event;
  }
  /** @deprecated Unused. */
  static isCursorOverElement(t, i) {
    const n = t.clientX, s = t.clientY, o = i.getBoundingClientRect();
    return o ? s > o.top && s < o.top + o.height && n > o.left && n < o.left + o.width : !1;
  }
}
var NodeSlotType = /* @__PURE__ */ ((f) => (f[f.INPUT = 1] = "INPUT", f[f.OUTPUT = 2] = "OUTPUT", f))(NodeSlotType || {}), RenderShape = /* @__PURE__ */ ((f) => (f[f.BOX = 1] = "BOX", f[f.ROUND = 2] = "ROUND", f[f.CIRCLE = 3] = "CIRCLE", f[f.CARD = 4] = "CARD", f[f.ARROW = 5] = "ARROW", f[f.GRID = 6] = "GRID", f[f.HollowCircle = 7] = "HollowCircle", f))(RenderShape || {}), CanvasItem = /* @__PURE__ */ ((f) => (f[f.Nothing = 0] = "Nothing", f[f.Node = 1] = "Node", f[f.Group = 2] = "Group", f[f.Reroute = 4] = "Reroute", f[f.Link = 8] = "Link", f[f.ResizeSe = 16] = "ResizeSe", f[f.RerouteSlot = 32] = "RerouteSlot", f))(CanvasItem || {}), LinkDirection = /* @__PURE__ */ ((f) => (f[f.NONE = 0] = "NONE", f[f.UP = 1] = "UP", f[f.DOWN = 2] = "DOWN", f[f.LEFT = 3] = "LEFT", f[f.RIGHT = 4] = "RIGHT", f[f.CENTER = 5] = "CENTER", f))(LinkDirection || {}), LinkRenderType = /* @__PURE__ */ ((f) => (f[f.HIDDEN_LINK = -1] = "HIDDEN_LINK", f[f.STRAIGHT_LINK = 0] = "STRAIGHT_LINK", f[f.LINEAR_LINK = 1] = "LINEAR_LINK", f[f.SPLINE_LINK = 2] = "SPLINE_LINK", f))(LinkRenderType || {}), LinkMarkerShape = /* @__PURE__ */ ((f) => (f[f.None = 0] = "None", f[f.Circle = 1] = "Circle", f[f.Arrow = 2] = "Arrow", f))(LinkMarkerShape || {}), TitleMode = /* @__PURE__ */ ((f) => (f[f.NORMAL_TITLE = 0] = "NORMAL_TITLE", f[f.NO_TITLE = 1] = "NO_TITLE", f[f.TRANSPARENT_TITLE = 2] = "TRANSPARENT_TITLE", f[f.AUTOHIDE_TITLE = 3] = "AUTOHIDE_TITLE", f))(TitleMode || {}), LGraphEventMode = /* @__PURE__ */ ((f) => (f[f.ALWAYS = 0] = "ALWAYS", f[f.ON_EVENT = 1] = "ON_EVENT", f[f.NEVER = 2] = "NEVER", f[f.ON_TRIGGER = 3] = "ON_TRIGGER", f[f.BYPASS = 4] = "BYPASS", f))(LGraphEventMode || {}), EaseFunction = /* @__PURE__ */ ((f) => (f.LINEAR = "linear", f.EASE_IN_QUAD = "easeInQuad", f.EASE_OUT_QUAD = "easeOutQuad", f.EASE_IN_OUT_QUAD = "easeInOutQuad", f))(EaseFunction || {});
function distance(f, t) {
  return Math.sqrt(
    (t[0] - f[0]) * (t[0] - f[0]) + (t[1] - f[1]) * (t[1] - f[1])
  );
}
function dist2(f, t, i, n) {
  return (i - f) * (i - f) + (n - t) * (n - t);
}
function isInRectangle(f, t, i, n, s, o) {
  return f >= i && f < i + s && t >= n && t < n + o;
}
function isPointInRect(f, t) {
  return f[0] >= t[0] && f[0] < t[0] + t[2] && f[1] >= t[1] && f[1] < t[1] + t[3];
}
function isInRect(f, t, i) {
  return f >= i[0] && f < i[0] + i[2] && t >= i[1] && t < i[1] + i[3];
}
function isInsideRectangle(f, t, i, n, s, o) {
  return i < f && i + s > f && n < t && n + o > t;
}
function overlapBounding(f, t) {
  const i = f[0] + f[2], n = f[1] + f[3], s = t[0] + t[2], o = t[1] + t[3];
  return !(f[0] > s || f[1] > o || i < t[0] || n < t[1]);
}
function getCentre(f) {
  return [
    f[0] + f[2] * 0.5,
    f[1] + f[3] * 0.5
  ];
}
function containsCentre(f, t) {
  const i = t[0] + t[2] * 0.5, n = t[1] + t[3] * 0.5;
  return isInRect(i, n, f);
}
function containsRect(f, t) {
  const i = f[0] + f[2], n = f[1] + f[3], s = t[0] + t[2], o = t[1] + t[3];
  return !(f[0] === t[0] && f[1] === t[1] && i === s && n === o) && f[0] <= t[0] && f[1] <= t[1] && i >= s && n >= o;
}
function findPointOnCurve(f, t, i, n, s, o = 0.5) {
  const r = 1 - o, l = r * r * r, a = 3 * (r * r) * o, h = 3 * r * (o * o), u = o * o * o;
  f[0] = l * t[0] + a * n[0] + h * s[0] + u * i[0], f[1] = l * t[1] + a * n[1] + h * s[1] + u * i[1];
}
function createBounds(f, t = 10) {
  const i = new Float32Array([1 / 0, 1 / 0, -1 / 0, -1 / 0]);
  for (const n of f) {
    const s = n.boundingRect;
    i[0] = Math.min(i[0], s[0]), i[1] = Math.min(i[1], s[1]), i[2] = Math.max(i[2], s[0] + s[2]), i[3] = Math.max(i[3], s[1] + s[3]);
  }
  return i.every((n) => isFinite(n)) ? [
    i[0] - t,
    i[1] - t,
    i[2] - i[0] + 2 * t,
    i[3] - i[1] + 2 * t
  ] : null;
}
function snapPoint(f, t) {
  return t ? (f[0] = t * Math.round(f[0] / t), f[1] = t * Math.round(f[1] / t), !0) : !1;
}
class CurveEditor {
  constructor(t) {
    c(this, "points");
    c(this, "selected");
    c(this, "nearest");
    c(this, "size");
    c(this, "must_update");
    c(this, "margin");
    c(this, "_nearest");
    this.points = t, this.selected = -1, this.nearest = -1, this.size = null, this.must_update = !0, this.margin = 5;
  }
  static sampleCurve(t, i) {
    if (i) {
      for (let n = 0; n < i.length - 1; ++n) {
        const s = i[n], o = i[n + 1];
        if (o[0] < t) continue;
        const r = o[0] - s[0];
        if (Math.abs(r) < 1e-5) return s[1];
        const l = (t - s[0]) / r;
        return s[1] * (1 - l) + o[1] * l;
      }
      return 0;
    }
  }
  draw(t, i, n, s, o, r = !1) {
    const l = this.points;
    if (!l) return;
    this.size = i;
    const a = i[0] - this.margin * 2, h = i[1] - this.margin * 2;
    o = o || "#666", t.save(), t.translate(this.margin, this.margin), s && (t.fillStyle = "#111", t.fillRect(0, 0, a, h), t.fillStyle = "#222", t.fillRect(a * 0.5, 0, 1, h), t.strokeStyle = "#333", t.strokeRect(0, 0, a, h)), t.strokeStyle = o, r && (t.globalAlpha = 0.5), t.beginPath();
    for (const u of l)
      t.lineTo(u[0] * a, (1 - u[1]) * h);
    if (t.stroke(), t.globalAlpha = 1, !r)
      for (const [u, d] of l.entries())
        t.fillStyle = this.selected == u ? "#FFF" : this.nearest == u ? "#DDD" : "#AAA", t.beginPath(), t.arc(d[0] * a, (1 - d[1]) * h, 2, 0, Math.PI * 2), t.fill();
    t.restore();
  }
  // localpos is mouse in curve editor space
  onMouseDown(t, i) {
    const n = this.points;
    if (!n || t[1] < 0) return;
    if (this.size == null) throw new Error("CurveEditor.size was null or undefined.");
    const s = this.size[0] - this.margin * 2, o = this.size[1] - this.margin * 2, r = t[0] - this.margin, l = t[1] - this.margin, a = [r, l], h = 30 / i.ds.scale;
    if (this.selected = this.getCloserPoint(a, h), this.selected == -1) {
      const u = [r / s, 1 - l / o];
      n.push(u), n.sort(function(d, p) {
        return d[0] - p[0];
      }), this.selected = n.indexOf(u), this.must_update = !0;
    }
    if (this.selected != -1) return !0;
  }
  onMouseMove(t, i) {
    const n = this.points;
    if (!n) return;
    const s = this.selected;
    if (s < 0) return;
    if (this.size == null) throw new Error("CurveEditor.size was null or undefined.");
    const o = (t[0] - this.margin) / (this.size[0] - this.margin * 2), r = (t[1] - this.margin) / (this.size[1] - this.margin * 2), l = [
      t[0] - this.margin,
      t[1] - this.margin
    ], a = 30 / i.ds.scale;
    this._nearest = this.getCloserPoint(l, a);
    const h = n[s];
    if (h) {
      const u = s == 0 || s == n.length - 1;
      if (!u && (t[0] < -10 || t[0] > this.size[0] + 10 || t[1] < -10 || t[1] > this.size[1] + 10)) {
        n.splice(s, 1), this.selected = -1;
        return;
      }
      u ? h[0] = s == 0 ? 0 : 1 : h[0] = clamp(o, 0, 1), h[1] = 1 - clamp(r, 0, 1), n.sort(function(d, p) {
        return d[0] - p[0];
      }), this.selected = n.indexOf(h), this.must_update = !0;
    }
  }
  // Former params: localpos, graphcanvas
  onMouseUp() {
    return this.selected = -1, !1;
  }
  getCloserPoint(t, i) {
    const n = this.points;
    if (!n) return -1;
    if (i = i || 30, this.size == null) throw new Error("CurveEditor.size was null or undefined.");
    const s = this.size[0] - this.margin * 2, o = this.size[1] - this.margin * 2, r = n.length, l = [0, 0];
    let a = 1e6, h = -1;
    for (let u = 0; u < r; ++u) {
      const d = n[u];
      l[0] = d[0] * s, l[1] = (1 - d[1]) * o;
      const p = distance(t, l);
      p > a || p > i || (h = u, a = p);
    }
    return h;
  }
}
class DragAndScale {
  constructor(t) {
    /**
     * The state of this DragAndScale instance.
     *
     * Implemented as a POCO that can be proxied without side-effects.
     */
    c(this, "state");
    /** Maximum scale (zoom in) */
    c(this, "max_scale");
    /** Minimum scale (zoom out) */
    c(this, "min_scale");
    c(this, "enabled");
    c(this, "last_mouse");
    c(this, "element");
    c(this, "visible_area");
    c(this, "dragging");
    c(this, "viewport");
    this.state = {
      offset: new Float32Array([0, 0]),
      scale: 1
    }, this.max_scale = 10, this.min_scale = 0.1, this.enabled = !0, this.last_mouse = [0, 0], this.visible_area = new Float32Array(4), this.element = t;
  }
  get offset() {
    return this.state.offset;
  }
  set offset(t) {
    this.state.offset = t;
  }
  get scale() {
    return this.state.scale;
  }
  set scale(t) {
    this.state.scale = t;
  }
  computeVisibleArea(t) {
    if (!this.element) {
      this.visible_area[0] = this.visible_area[1] = this.visible_area[2] = this.visible_area[3] = 0;
      return;
    }
    let i = this.element.width, n = this.element.height, s = -this.offset[0], o = -this.offset[1];
    t && (s += t[0] / this.scale, o += t[1] / this.scale, i = t[2], n = t[3]);
    const r = s + i / this.scale, l = o + n / this.scale;
    this.visible_area[0] = s, this.visible_area[1] = o, this.visible_area[2] = r - s, this.visible_area[3] = l - o;
  }
  toCanvasContext(t) {
    t.scale(this.scale, this.scale), t.translate(this.offset[0], this.offset[1]);
  }
  convertOffsetToCanvas(t) {
    return [
      (t[0] + this.offset[0]) * this.scale,
      (t[1] + this.offset[1]) * this.scale
    ];
  }
  convertCanvasToOffset(t, i) {
    return i = i || [0, 0], i[0] = t[0] / this.scale - this.offset[0], i[1] = t[1] / this.scale - this.offset[1], i;
  }
  /** @deprecated Has not been kept up to date */
  mouseDrag(t, i) {
    var n;
    this.offset[0] += t / this.scale, this.offset[1] += i / this.scale, (n = this.onredraw) == null || n.call(this, this);
  }
  changeScale(t, i, n = !0) {
    var h;
    if (t < this.min_scale ? t = this.min_scale : t > this.max_scale && (t = this.max_scale), t == this.scale || !this.element) return;
    const s = this.element.getBoundingClientRect();
    if (!s) return;
    i = i ?? [s.width * 0.5, s.height * 0.5];
    const o = [
      i[0] - s.x,
      i[1] - s.y
    ], r = this.convertCanvasToOffset(o);
    this.scale = t, n && Math.abs(this.scale - 1) < 0.01 && (this.scale = 1);
    const l = this.convertCanvasToOffset(o), a = [
      l[0] - r[0],
      l[1] - r[1]
    ];
    this.offset[0] += a[0], this.offset[1] += a[1], (h = this.onredraw) == null || h.call(this, this);
  }
  changeDeltaScale(t, i) {
    this.changeScale(this.scale * t, i);
  }
  /**
   * Starts an animation to fit the view around the specified selection of nodes.
   * @param bounds The bounds to animate the view to, defined by a rectangle.
   */
  animateToBounds(t, i, {
    duration: n = 350,
    zoom: s = 0.75,
    easing: o = EaseFunction.EASE_IN_OUT_QUAD
  } = {}) {
    if (!(n > 0)) throw new RangeError("Duration must be greater than 0");
    const r = {
      linear: (b) => b,
      easeInQuad: (b) => b * b,
      easeOutQuad: (b) => b * (2 - b),
      easeInOutQuad: (b) => b < 0.5 ? 2 * b * b : -1 + (4 - 2 * b) * b
    }, l = r[o] ?? r.linear, a = performance.now(), h = this.element.width / window.devicePixelRatio, u = this.element.height / window.devicePixelRatio, d = this.offset[0], p = this.offset[1], g = d - h / this.scale, y = p - u / this.scale;
    let m = this.scale;
    if (s > 0) {
      const b = s * h / Math.max(t[2], 300), R = s * u / Math.max(t[3], 300);
      m = Math.min(b, R, this.max_scale);
    }
    const w = h / m, k = u / m, I = -t[0] - t[2] * 0.5 + w * 0.5, N = -t[1] - t[3] * 0.5 + k * 0.5, T = I - w, O = N - k, A = (b) => {
      const R = b - a, C = Math.min(R / n, 1), F = l(C), B = d + (I - d) * F, H = p + (N - p) * F;
      if (this.offset[0] = B, this.offset[1] = H, s > 0) {
        const K = g + (T - g) * F, Le = y + (O - y) * F, oe = Math.abs(K - B), U = Math.abs(Le - H);
        this.scale = Math.min(h / oe, u / U);
      }
      i(), C < 1 ? G = requestAnimationFrame(A) : cancelAnimationFrame(G);
    };
    let G = requestAnimationFrame(A);
  }
  reset() {
    this.scale = 1, this.offset[0] = 0, this.offset[1] = 0;
  }
}
const ELLIPSIS = "…", TWO_DOT_LEADER = "‥", ONE_DOT_LEADER = "․";
var SlotType = /* @__PURE__ */ ((f) => (f.Array = "array", f[f.Event = -1] = "Event", f))(SlotType || {}), SlotShape = ((f) => (f[f.Box = RenderShape.BOX] = "Box", f[f.Arrow = RenderShape.ARROW] = "Arrow", f[f.Grid = RenderShape.GRID] = "Grid", f[f.Circle = RenderShape.CIRCLE] = "Circle", f[f.HollowCircle = RenderShape.HollowCircle] = "HollowCircle", f))(SlotShape || {}), SlotDirection = ((f) => (f[f.Up = LinkDirection.UP] = "Up", f[f.Right = LinkDirection.RIGHT] = "Right", f[f.Down = LinkDirection.DOWN] = "Down", f[f.Left = LinkDirection.LEFT] = "Left", f))(SlotDirection || {}), LabelPosition = /* @__PURE__ */ ((f) => (f.Left = "left", f.Right = "right", f))(LabelPosition || {});
function strokeShape(f, t, {
  shape: i = RenderShape.BOX,
  round_radius: n,
  title_height: s,
  title_mode: o = TitleMode.NORMAL_TITLE,
  color: r,
  padding: l = 6,
  collapsed: a = !1,
  lineWidth: h = 1
} = {}) {
  if (n ?? (n = LiteGraph.ROUND_RADIUS), r ?? (r = LiteGraph.NODE_BOX_OUTLINE_COLOR), o === TitleMode.TRANSPARENT_TITLE) {
    const m = s ?? LiteGraph.NODE_TITLE_HEIGHT;
    t[1] -= m, t[3] += m;
  }
  const { lineWidth: u, strokeStyle: d } = f;
  f.lineWidth = h, f.globalAlpha = 0.8, f.strokeStyle = r, f.beginPath();
  const [p, g, y, _] = t;
  switch (i) {
    case RenderShape.BOX: {
      f.rect(
        p - l,
        g - l,
        y + 2 * l,
        _ + 2 * l
      );
      break;
    }
    case RenderShape.ROUND:
    case RenderShape.CARD: {
      const m = n + l, k = i === RenderShape.CARD && a || i === RenderShape.ROUND ? [m] : [m, 2, m, 2];
      f.roundRect(
        p - l,
        g - l,
        y + 2 * l,
        _ + 2 * l,
        k
      );
      break;
    }
    case RenderShape.CIRCLE: {
      const m = p + y / 2, w = g + _ / 2, k = Math.max(y, _) / 2 + l;
      f.arc(m, w, k, 0, Math.PI * 2);
      break;
    }
  }
  f.stroke(), f.lineWidth = u, f.strokeStyle = d, f.globalAlpha = 1;
}
function truncateTextToWidth(f, t, i) {
  if (!(i > 0)) return "";
  if (f.measureText(t).width <= i) return t;
  const s = f.measureText(ELLIPSIS).width * 0.75;
  if (s > i)
    return f.measureText(TWO_DOT_LEADER).width * 0.75 < i ? TWO_DOT_LEADER : f.measureText(ONE_DOT_LEADER).width * 0.75 < i ? ONE_DOT_LEADER : "";
  let o = 0, r = t.length, l = 0;
  for (; o <= r; ) {
    const a = Math.floor((o + r) * 0.5);
    if (a === 0) {
      o = a + 1;
      continue;
    }
    const h = t.substring(0, a);
    f.measureText(h).width + s <= i ? (l = a, o = a + 1) : r = a - 1;
  }
  return l === 0 ? ELLIPSIS : t.substring(0, l) + ELLIPSIS;
}
function drawTextInArea({ ctx: f, text: t, area: i, align: n = "left" }) {
  const { left: s, right: o, bottom: r, width: l, centreX: a } = i;
  if (f.measureText(t).width <= l) {
    f.textAlign = n;
    const p = n === "left" ? s : n === "right" ? o : a;
    f.fillText(t, p, r);
    return;
  }
  const u = truncateTextToWidth(f, t, l);
  if (u.length === 0) return;
  f.textAlign = "left", f.fillText(u.slice(0, -1), s, r), f.rect(s, r, l, 1), f.textAlign = "right";
  const d = u.at(-1);
  f.fillText(d, o, r, f.measureText(d).width * 0.75);
}
const zeroUuid = "00000000-0000-0000-0000-000000000000", randomStorage = new Uint32Array(31);
function createUuidv4() {
  if (typeof (crypto == null ? void 0 : crypto.randomUUID) == "function") return crypto.randomUUID();
  if (typeof (crypto == null ? void 0 : crypto.getRandomValues) == "function") {
    const f = crypto.getRandomValues(randomStorage);
    let t = 0;
    return "10000000-1000-4000-8000-100000000000".replaceAll(/[018]/g, (i) => (Number(i) ^ f[t++] * 3725290298461914e-24 >> Number(i) * 0.25).toString(16));
  }
  return "10000000-1000-4000-8000-100000000000".replaceAll(/[018]/g, (f) => (Number(f) ^ Math.random() * 16 >> Number(f) * 0.25).toString(16));
}
class CustomEventTarget extends EventTarget {
  dispatch(t, i) {
    const n = new CustomEvent(t, { detail: i, cancelable: !0 });
    return super.dispatchEvent(n);
  }
  addEventListener(t, i, n) {
    super.addEventListener(t, i, n);
  }
  removeEventListener(t, i, n) {
    super.removeEventListener(t, i, n);
  }
  /** @deprecated Use {@link dispatch}. */
  dispatchEvent(t) {
    return super.dispatchEvent(t);
  }
}
var Rt;
const lt = class lt {
  constructor(t, i, n, s, o, r, l) {
    /** Link ID */
    c(this, "id");
    c(this, "parentId");
    c(this, "type");
    /** Output node ID */
    c(this, "origin_id");
    /** Output slot index */
    c(this, "origin_slot");
    /** Input node ID */
    c(this, "target_id");
    /** Input slot index */
    c(this, "target_slot");
    c(this, "data");
    c(this, "_data");
    /** Centre point of the link, calculated during render only - can be inaccurate */
    c(this, "_pos");
    /** @todo Clean up - never implemented in comfy. */
    c(this, "_last_time");
    /** The last canvas 2D path that was used to render this link */
    c(this, "path");
    /** @inheritdoc */
    c(this, "_centreAngle");
    /** @inheritdoc */
    c(this, "_dragging");
    P(this, Rt);
    this.id = t, this.type = i, this.origin_id = n, this.origin_slot = s, this.target_id = o, this.target_slot = r, this.parentId = l, this._data = null, this._pos = new Float32Array(2);
  }
  /** Custom colour for this link only */
  get color() {
    return L(this, Rt);
  }
  set color(t) {
    W(this, Rt, t === "" ? null : t);
  }
  get isFloatingOutput() {
    return this.origin_id === -1 && this.origin_slot === -1;
  }
  get isFloatingInput() {
    return this.target_id === -1 && this.target_slot === -1;
  }
  get isFloating() {
    return this.isFloatingOutput || this.isFloatingInput;
  }
  /** @deprecated Use {@link LLink.create} */
  static createFromArray(t) {
    return new lt(t[0], t[5], t[1], t[2], t[3], t[4]);
  }
  /**
   * LLink static factory: creates a new LLink from the provided data.
   * @param data Serialised LLink data to create the link from
   * @returns A new LLink
   */
  static create(t) {
    return new lt(
      t.id,
      t.type,
      t.origin_id,
      t.origin_slot,
      t.target_id,
      t.target_slot,
      t.parentId
    );
  }
  /**
   * Gets all reroutes from the output slot to this segment.  If this segment is a reroute, it will not be included.
   * @returns An ordered array of all reroutes from the node output to
   * this reroute or the reroute before it.  Otherwise, an empty array.
   */
  static getReroutes(t, i) {
    var n;
    return i.parentId ? ((n = t.reroutes.get(i.parentId)) == null ? void 0 : n.getReroutes()) ?? [] : [];
  }
  static getFirstReroute(t, i) {
    return lt.getReroutes(t, i).at(0);
  }
  /**
   * Finds the reroute in the chain after the provided reroute ID.
   * @param network The network this link belongs to
   * @param linkSegment The starting point of the search (input side).
   * Typically the LLink object itself, but can be any link segment.
   * @param rerouteId The matching reroute will have this set as its {@link parentId}.
   * @returns The reroute that was found, `undefined` if no reroute was found, or `null` if an infinite loop was detected.
   */
  static findNextReroute(t, i, n) {
    var s;
    if (i.parentId)
      return (s = t.reroutes.get(i.parentId)) == null ? void 0 : s.findNextReroute(n);
  }
  /**
   * Gets the origin node of a link.
   * @param network The network to search
   * @param linkId The ID of the link to get the origin node of
   * @returns The origin node of the link, or `undefined` if the link is not found or the origin node is not found
   */
  static getOriginNode(t, i) {
    var s;
    const n = (s = t.links.get(i)) == null ? void 0 : s.origin_id;
    return t.getNodeById(n) ?? void 0;
  }
  /**
   * Gets the target node of a link.
   * @param network The network to search
   * @param linkId The ID of the link to get the target node of
   * @returns The target node of the link, or `undefined` if the link is not found or the target node is not found
   */
  static getTargetNode(t, i) {
    var s;
    const n = (s = t.links.get(i)) == null ? void 0 : s.target_id;
    return t.getNodeById(n) ?? void 0;
  }
  /**
   * Resolves a link ID to the link, node, and slot objects.
   * @param linkId The {@link id} of the link to resolve
   * @param network The link network to search
   * @returns An object containing the input and output nodes, as well as the input and output slots.
   * @remarks This method is heavier than others; it will always resolve all objects.
   * Whilst the performance difference should in most cases be negligible,
   * it is recommended to use simpler methods where appropriate.
   */
  static resolve(t, i) {
    var n;
    return (n = i.getLink(t)) == null ? void 0 : n.resolve(i);
  }
  /**
   * Resolves a list of link IDs to the link, node, and slot objects.
   * Discards invalid link IDs.
   * @param linkIds An iterable of link {@link id}s to resolve
   * @param network The link network to search
   * @returns An array of resolved connections.  If a link is not found, it is not included in the array.
   * @see {@link LLink.resolve}
   */
  static resolveMany(t, i) {
    var s;
    const n = [];
    for (const o of t) {
      const r = (s = i.getLink(o)) == null ? void 0 : s.resolve(i);
      r && n.push(r);
    }
    return n;
  }
  /**
   * Resolves the primitive ID values stored in the link to the referenced objects.
   * @param network The link network to search
   * @returns An object containing the input and output nodes, as well as the input and output slots.
   * @remarks This method is heavier than others; it will always resolve all objects.
   * Whilst the performance difference should in most cases be negligible,
   * it is recommended to use simpler methods where appropriate.
   */
  resolve(t) {
    const i = this.target_id === -1 ? void 0 : t.getNodeById(this.target_id) ?? void 0, n = this.origin_id === -1 ? void 0 : t.getNodeById(this.origin_id) ?? void 0, s = i == null ? void 0 : i.inputs[this.target_slot], o = n == null ? void 0 : n.outputs[this.origin_slot];
    return { inputNode: i, outputNode: n, input: s, output: o, link: this };
  }
  configure(t) {
    Array.isArray(t) ? (this.id = t[0], this.origin_id = t[1], this.origin_slot = t[2], this.target_id = t[3], this.target_slot = t[4], this.type = t[5]) : (this.id = t.id, this.type = t.type, this.origin_id = t.origin_id, this.origin_slot = t.origin_slot, this.target_id = t.target_id, this.target_slot = t.target_slot, this.parentId = t.parentId);
  }
  /**
   * Checks if the specified node id and output index are this link's origin (output side).
   * @param nodeId ID of the node to check
   * @param outputIndex The array index of the node output
   * @returns `true` if the origin matches, otherwise `false`.
   */
  hasOrigin(t, i) {
    return this.origin_id === t && this.origin_slot === i;
  }
  /**
   * Checks if the specified node id and input index are this link's target (input side).
   * @param nodeId ID of the node to check
   * @param inputIndex The array index of the node input
   * @returns `true` if the target matches, otherwise `false`.
   */
  hasTarget(t, i) {
    return this.target_id === t && this.target_slot === i;
  }
  /**
   * Creates a floating link from this link.
   * @param slotType The side of the link that is still connected
   * @param parentId The parent reroute ID of the link
   * @returns A new LLink that is floating
   */
  toFloating(t, i) {
    const n = this.asSerialisable();
    return n.id = -1, n.parentId = i, t === "input" ? (n.origin_id = -1, n.origin_slot = -1) : (n.target_id = -1, n.target_slot = -1), lt.create(n);
  }
  /**
   * Disconnects a link and removes it from the graph, cleaning up any reroutes that are no longer used
   * @param network The container (LGraph) where reroutes should be updated
   * @param keepReroutes If `undefined`, reroutes will be automatically removed if no links remain.
   * If `input` or `output`, reroutes will not be automatically removed, and retain a connection to the input or output, respectively.
   */
  disconnect(t, i) {
    const n = lt.getReroutes(t, this), s = n.at(-1);
    if (i === "output" && (s == null ? void 0 : s.linkIds.size) === 1 && s.floatingLinkIds.size === 0 || i === "input" && s) {
      const r = lt.create(this);
      r.id = -1, i === "input" ? (r.origin_id = -1, r.origin_slot = -1, s.floating = { slotType: "input" }) : (r.target_id = -1, r.target_slot = -1, s.floating = { slotType: "output" }), t.addFloatingLink(r);
    }
    for (const r of n)
      r.linkIds.delete(this.id), !i && !r.totalLinks && t.reroutes.delete(r.id);
    t.links.delete(this.id);
  }
  /**
   * @deprecated Prefer {@link LLink.asSerialisable} (returns an object, not an array)
   * @returns An array representing this LLink
   */
  serialize() {
    return [
      this.id,
      this.origin_id,
      this.origin_slot,
      this.target_id,
      this.target_slot,
      this.type
    ];
  }
  asSerialisable() {
    const t = {
      id: this.id,
      origin_id: this.origin_id,
      origin_slot: this.origin_slot,
      target_id: this.target_id,
      target_slot: this.target_slot,
      type: this.type
    };
    return this.parentId && (t.parentId = this.parentId), t;
  }
};
Rt = new WeakMap();
let LLink = lt;
class FloatingRenderLink {
  constructor(t, i, n, s, o = LinkDirection.CENTER) {
    c(this, "node");
    c(this, "fromSlot");
    c(this, "fromPos");
    c(this, "fromDirection");
    c(this, "fromSlotIndex");
    c(this, "outputNodeId", -1);
    c(this, "outputNode");
    c(this, "outputSlot");
    c(this, "outputIndex", -1);
    c(this, "outputPos");
    c(this, "inputNodeId", -1);
    c(this, "inputNode");
    c(this, "inputSlot");
    c(this, "inputIndex", -1);
    c(this, "inputPos");
    this.network = t, this.link = i, this.toType = n, this.fromReroute = s, this.dragDirection = o;
    const {
      origin_id: r,
      target_id: l,
      origin_slot: a,
      target_slot: h
    } = i;
    if (r !== -1) {
      const u = t.getNodeById(r) ?? void 0;
      if (!u) throw new Error(`Creating DraggingRenderLink for link [${i.id}] failed: Output node [${r}] not found.`);
      const d = u == null ? void 0 : u.outputs.at(a);
      if (!d) throw new Error(`Creating DraggingRenderLink for link [${i.id}] failed: Output slot [${a}] not found.`);
      this.outputNodeId = r, this.outputNode = u, this.outputSlot = d, this.outputIndex = a, this.outputPos = u.getOutputPos(a), this.node = u, this.fromSlot = d, this.fromPos = (s == null ? void 0 : s.pos) ?? this.outputPos, this.fromDirection = LinkDirection.LEFT, this.dragDirection = LinkDirection.RIGHT, this.fromSlotIndex = a;
    } else {
      const u = t.getNodeById(l) ?? void 0;
      if (!u) throw new Error(`Creating DraggingRenderLink for link [${i.id}] failed: Input node [${l}] not found.`);
      const d = u == null ? void 0 : u.inputs.at(h);
      if (!d) throw new Error(`Creating DraggingRenderLink for link [${i.id}] failed: Input slot [${h}] not found.`);
      this.inputNodeId = l, this.inputNode = u, this.inputSlot = d, this.inputIndex = h, this.inputPos = u.getInputPos(h), this.node = u, this.fromSlot = d, this.fromDirection = LinkDirection.RIGHT, this.fromSlotIndex = h;
    }
    this.fromPos = s.pos;
  }
  canConnectToInput() {
    return this.toType === "input";
  }
  canConnectToOutput() {
    return this.toType === "output";
  }
  canConnectToReroute(t) {
    var i, n;
    if (this.toType === "input") {
      if (t.origin_id === ((i = this.inputNode) == null ? void 0 : i.id)) return !1;
    } else if (t.origin_id === ((n = this.outputNode) == null ? void 0 : n.id)) return !1;
    return !0;
  }
  connectToInput(t, i, n) {
    var o;
    const s = this.link;
    s.target_id = t.id, s.target_slot = t.inputs.indexOf(i), t.disconnectInput(t.inputs.indexOf(i)), (o = this.fromSlot._floatingLinks) == null || o.delete(s), i._floatingLinks ?? (i._floatingLinks = /* @__PURE__ */ new Set()), i._floatingLinks.add(s);
  }
  connectToOutput(t, i, n) {
    var o;
    const s = this.link;
    s.origin_id = t.id, s.origin_slot = t.outputs.indexOf(i), (o = this.fromSlot._floatingLinks) == null || o.delete(s), i._floatingLinks ?? (i._floatingLinks = /* @__PURE__ */ new Set()), i._floatingLinks.add(s);
  }
  connectToRerouteInput(t, { node: i, input: n }, s) {
    var r;
    const o = this.link;
    o.target_id = i.id, o.target_slot = i.inputs.indexOf(n), (r = this.fromSlot._floatingLinks) == null || r.delete(o), n._floatingLinks ?? (n._floatingLinks = /* @__PURE__ */ new Set()), n._floatingLinks.add(o), s.dispatch("input-moved", this);
  }
  connectToRerouteOutput(t, i, n, s) {
    var r;
    const o = this.link;
    o.origin_id = i.id, o.origin_slot = i.outputs.indexOf(n), (r = this.fromSlot._floatingLinks) == null || r.delete(o), n._floatingLinks ?? (n._floatingLinks = /* @__PURE__ */ new Set()), n._floatingLinks.add(o), s.dispatch("output-moved", this);
  }
}
class MovingLinkBase {
  constructor(t, i, n, s, o = LinkDirection.CENTER) {
    c(this, "outputNodeId");
    c(this, "outputNode");
    c(this, "outputSlot");
    c(this, "outputIndex");
    c(this, "outputPos");
    c(this, "inputNodeId");
    c(this, "inputNode");
    c(this, "inputSlot");
    c(this, "inputIndex");
    c(this, "inputPos");
    this.network = t, this.link = i, this.toType = n, this.fromReroute = s, this.dragDirection = o;
    const {
      origin_id: r,
      target_id: l,
      origin_slot: a,
      target_slot: h
    } = i, u = t.getNodeById(r) ?? void 0;
    if (!u) throw new Error(`Creating MovingRenderLink for link [${i.id}] failed: Output node [${r}] not found.`);
    const d = u.outputs.at(a);
    if (!d) throw new Error(`Creating MovingRenderLink for link [${i.id}] failed: Output slot [${a}] not found.`);
    this.outputNodeId = r, this.outputNode = u, this.outputSlot = d, this.outputIndex = a, this.outputPos = u.getOutputPos(a);
    const p = t.getNodeById(l) ?? void 0;
    if (!p) throw new Error(`Creating DraggingRenderLink for link [${i.id}] failed: Input node [${l}] not found.`);
    const g = p.inputs.at(h);
    if (!g) throw new Error(`Creating DraggingRenderLink for link [${i.id}] failed: Input slot [${h}] not found.`);
    this.inputNodeId = l, this.inputNode = p, this.inputSlot = g, this.inputIndex = h, this.inputPos = p.getInputPos(h);
  }
}
class MovingInputLink extends MovingLinkBase {
  constructor(i, n, s, o = LinkDirection.CENTER) {
    super(i, n, "input", s, o);
    c(this, "toType", "input");
    c(this, "node");
    c(this, "fromSlot");
    c(this, "fromPos");
    c(this, "fromDirection");
    c(this, "fromSlotIndex");
    this.node = this.outputNode, this.fromSlot = this.outputSlot, this.fromPos = (s == null ? void 0 : s.pos) ?? this.outputPos, this.fromDirection = LinkDirection.NONE, this.fromSlotIndex = this.outputIndex;
  }
  canConnectToInput(i, n) {
    return this.node.canConnectTo(i, n, this.outputSlot);
  }
  canConnectToOutput() {
    return !1;
  }
  canConnectToReroute(i) {
    return i.origin_id !== this.inputNode.id;
  }
  connectToInput(i, n, s) {
    var r;
    if (n === this.inputSlot) return;
    this.inputNode.disconnectInput(this.inputIndex, !0);
    const o = this.outputNode.connectSlots(this.outputSlot, i, n, (r = this.fromReroute) == null ? void 0 : r.id);
    return o && s.dispatch("input-moved", this), o;
  }
  connectToOutput() {
    throw new Error("MovingInputLink cannot connect to an output.");
  }
  connectToRerouteInput(i, { node: n, input: s, link: o }, r, l) {
    const { outputNode: a, outputSlot: h, fromReroute: u } = this;
    for (const p of l) {
      if (p.id === this.link.parentId) break;
      p.totalLinks === 1 && p.remove();
    }
    i.parentId = u == null ? void 0 : u.id, a.connectSlots(h, n, s, o.parentId) && r.dispatch("input-moved", this);
  }
  connectToRerouteOutput() {
    throw new Error("MovingInputLink cannot connect to an output.");
  }
  disconnect() {
    return this.inputNode.disconnectInput(this.inputIndex, !0);
  }
}
class MovingOutputLink extends MovingLinkBase {
  constructor(i, n, s, o = LinkDirection.CENTER) {
    super(i, n, "output", s, o);
    c(this, "toType", "output");
    c(this, "node");
    c(this, "fromSlot");
    c(this, "fromPos");
    c(this, "fromDirection");
    c(this, "fromSlotIndex");
    this.node = this.inputNode, this.fromSlot = this.inputSlot, this.fromPos = (s == null ? void 0 : s.pos) ?? this.inputPos, this.fromDirection = LinkDirection.LEFT, this.fromSlotIndex = this.inputIndex;
  }
  canConnectToInput() {
    return !1;
  }
  canConnectToOutput(i, n) {
    return i.canConnectTo(this.node, this.inputSlot, n);
  }
  canConnectToReroute(i) {
    return i.origin_id !== this.outputNode.id;
  }
  connectToInput() {
    throw new Error("MovingOutputLink cannot connect to an input.");
  }
  connectToOutput(i, n, s) {
    if (n === this.outputSlot) return;
    const o = i.connectSlots(n, this.inputNode, this.inputSlot, this.link.parentId);
    return o && s.dispatch("output-moved", this), o;
  }
  connectToRerouteInput() {
    throw new Error("MovingOutputLink cannot connect to an input.");
  }
  connectToRerouteOutput(i, n, s, o) {
    var u;
    const { inputNode: r, inputSlot: l, fromReroute: a } = this, h = ((u = i == null ? void 0 : i.floating) == null ? void 0 : u.slotType) === "output";
    a ? a.parentId = i.id : this.link.parentId = i.id, n.connectSlots(s, r, l, this.link.parentId), h && i.removeAllFloatingLinks(), o.dispatch("output-moved", this);
  }
  disconnect() {
    return this.outputNode.disconnectOutput(this.outputIndex, this.inputNode);
  }
}
class ToInputRenderLink {
  constructor(t, i, n, s, o = LinkDirection.CENTER) {
    c(this, "toType", "input");
    c(this, "fromPos");
    c(this, "fromSlotIndex");
    c(this, "fromDirection", LinkDirection.RIGHT);
    this.network = t, this.node = i, this.fromSlot = n, this.fromReroute = s, this.dragDirection = o;
    const r = i.outputs.indexOf(n);
    if (r === -1) throw new Error(`Creating render link for node [${this.node.id}] failed: Slot index not found.`);
    this.fromSlotIndex = r, this.fromPos = s ? s.pos : this.node.getOutputPos(r);
  }
  canConnectToInput(t, i) {
    return this.node.canConnectTo(t, i, this.fromSlot);
  }
  canConnectToOutput() {
    return !1;
  }
  connectToInput(t, i, n) {
    const { node: s, fromSlot: o, fromReroute: r } = this;
    if (t === s) return;
    const l = s.connectSlots(o, t, i, r == null ? void 0 : r.id);
    n.dispatch("link-created", l);
  }
  connectToRerouteInput(t, {
    node: i,
    input: n,
    link: s
  }, o, r) {
    var p;
    const { node: l, fromSlot: a, fromReroute: h } = this, u = ((p = h == null ? void 0 : h.floating) == null ? void 0 : p.slotType) === "output";
    t.parentId = h == null ? void 0 : h.id;
    const d = l.connectSlots(a, i, n, s.parentId);
    u && h.removeAllFloatingLinks();
    for (const g of r) {
      if (g.id === (h == null ? void 0 : h.id)) break;
      if (g.removeLink(s), g.totalLinks === 0)
        if (s.isFloating)
          g.remove();
        else {
          const y = s.toFloating("output", g.id);
          this.network.addFloatingLink(y), g.floating = { slotType: "output" };
        }
    }
    o.dispatch("link-created", d);
  }
  connectToOutput() {
    throw new Error("ToInputRenderLink cannot connect to an output.");
  }
  connectToRerouteOutput() {
    throw new Error("ToInputRenderLink cannot connect to an output.");
  }
}
class ToOutputRenderLink {
  constructor(t, i, n, s, o = LinkDirection.CENTER) {
    c(this, "toType", "output");
    c(this, "fromPos");
    c(this, "fromSlotIndex");
    c(this, "fromDirection", LinkDirection.LEFT);
    this.network = t, this.node = i, this.fromSlot = n, this.fromReroute = s, this.dragDirection = o;
    const r = i.inputs.indexOf(n);
    if (r === -1) throw new Error(`Creating render link for node [${this.node.id}] failed: Slot index not found.`);
    this.fromSlotIndex = r, this.fromPos = s ? s.pos : this.node.getInputPos(r);
  }
  canConnectToInput() {
    return !1;
  }
  canConnectToOutput(t, i) {
    return this.node.canConnectTo(t, this.fromSlot, i);
  }
  canConnectToReroute(t) {
    return t.origin_id !== this.node.id;
  }
  connectToOutput(t, i, n) {
    const { node: s, fromSlot: o, fromReroute: r } = this;
    if (!s) return;
    const l = t.connectSlots(i, s, o, r == null ? void 0 : r.id);
    n.dispatch("link-created", l);
  }
  connectToRerouteOutput(t, i, n, s) {
    const { node: o, fromSlot: r } = this, l = i.connectSlots(n, o, r, t == null ? void 0 : t.id);
    s.dispatch("link-created", l);
  }
  connectToInput() {
    throw new Error("ToOutputRenderLink cannot connect to an input.");
  }
  connectToRerouteInput() {
    throw new Error("ToOutputRenderLink cannot connect to an input.");
  }
}
class ToOutputFromRerouteLink extends ToOutputRenderLink {
  constructor(t, i, n, s, o) {
    super(t, i, n, s), this.fromReroute = s, this.linkConnector = o;
  }
  canConnectToReroute() {
    return !1;
  }
  connectToOutput(t, i) {
    const n = new ToInputRenderLink(this.network, t, i);
    this.linkConnector._connectOutputToReroute(this.fromReroute, n);
  }
}
var Gt, X, he, ce, at;
class LinkConnector {
  constructor(t) {
    P(this, X);
    /**
     * Link connection state POJO. Source of truth for state of link drag operations.
     *
     * Can be replaced or proxied to allow notifications.
     * Is always dereferenced at the start of an operation.
     */
    c(this, "state", {
      connectingTo: void 0,
      multi: !1,
      draggingExistingLinks: !1,
      snapLinksPos: void 0
    });
    c(this, "events", new CustomEventTarget());
    /** Contains information for rendering purposes only. */
    c(this, "renderLinks", []);
    /** Existing links that are being moved **to** a new input slot. */
    c(this, "inputLinks", []);
    /** Existing links that are being moved **to** a new output slot. */
    c(this, "outputLinks", []);
    /** Existing floating links that are being moved to a new slot. */
    c(this, "floatingLinks", []);
    c(this, "hiddenReroutes", /* @__PURE__ */ new Set());
    /** The widget beneath the pointer, if it is a valid connection target. */
    c(this, "overWidget");
    /** The type (returned by downstream callback) for {@link overWidget} */
    c(this, "overWidgetType");
    /** The reroute beneath the pointer, if it is a valid connection target. */
    c(this, "overReroute");
    P(this, Gt);
    W(this, Gt, t);
  }
  get isConnecting() {
    return this.state.connectingTo !== void 0;
  }
  get draggingExistingLinks() {
    return this.state.draggingExistingLinks;
  }
  /** Drag an existing link to a different input. */
  moveInputLink(t, i) {
    var l;
    if (this.isConnecting) throw new Error("Already dragging links.");
    const { state: n, inputLinks: s, renderLinks: o } = this, r = i.link;
    if (r == null) {
      const a = (l = i._floatingLinks) == null ? void 0 : l.values().next().value;
      if ((a == null ? void 0 : a.parentId) == null) return;
      try {
        const h = t.reroutes.get(a.parentId);
        if (!h) throw new Error(`Invalid reroute id: [${a.parentId}] for floating link id: [${a.id}].`);
        const u = new FloatingRenderLink(t, a, "input", h);
        if (this.events.dispatch("before-move-input", u) === !1) return;
        o.push(u);
      } catch (h) {
        console.warn(`Could not create render link for link id: [${a.id}].`, a, h);
      }
      a._dragging = !0, this.floatingLinks.push(a);
    } else {
      const a = t.links.get(r);
      if (!a) return;
      try {
        const h = t.getReroute(a.parentId), u = new MovingInputLink(t, a, h);
        if (this.events.dispatch("before-move-input", u) === !1) return;
        o.push(u), this.listenUntilReset("input-moved", (p) => {
          p.detail.link.disconnect(t, "output");
        });
      } catch (h) {
        console.warn(`Could not create render link for link id: [${a.id}].`, a, h);
        return;
      }
      a._dragging = !0, s.push(a);
    }
    n.connectingTo = "input", n.draggingExistingLinks = !0, S(this, X, at).call(this, !1);
  }
  /** Drag all links from an output to a new output. */
  moveOutputLink(t, i) {
    var o, r;
    if (this.isConnecting) throw new Error("Already dragging links.");
    const { state: n, renderLinks: s } = this;
    if ((o = i._floatingLinks) != null && o.size)
      for (const l of i._floatingLinks.values())
        try {
          const a = LLink.getFirstReroute(t, l);
          if (!a) throw new Error(`Invalid reroute id: [${l.parentId}] for floating link id: [${l.id}].`);
          const h = new FloatingRenderLink(t, l, "output", a);
          if (this.events.dispatch("before-move-output", h) === !1) continue;
          s.push(h), this.floatingLinks.push(l);
        } catch (a) {
          console.warn(`Could not create render link for link id: [${l.id}].`, l, a);
        }
    if ((r = i.links) != null && r.length)
      for (const l of i.links) {
        const a = t.links.get(l);
        if (!a) continue;
        const h = LLink.getFirstReroute(t, a);
        h ? (h._dragging = !0, this.hiddenReroutes.add(h)) : a._dragging = !0, this.outputLinks.push(a);
        try {
          const u = new MovingOutputLink(t, a, h, LinkDirection.RIGHT);
          if (this.events.dispatch("before-move-output", u) === !1) continue;
          s.push(u);
        } catch (u) {
          console.warn(`Could not create render link for link id: [${a.id}].`, a, u);
          continue;
        }
      }
    s.length !== 0 && (n.draggingExistingLinks = !0, n.multi = !0, n.connectingTo = "output", S(this, X, at).call(this, !0));
  }
  /**
   * Drags a new link from an output slot to an input slot.
   * @param network The network that the link being connected belongs to
   * @param node The node the link is being dragged from
   * @param output The output slot that the link is being dragged from
   */
  dragNewFromOutput(t, i, n, s) {
    if (this.isConnecting) throw new Error("Already dragging links.");
    const { state: o } = this, r = new ToInputRenderLink(t, i, n, s);
    this.renderLinks.push(r), o.connectingTo = "input", S(this, X, at).call(this, !1);
  }
  /**
   * Drags a new link from an input slot to an output slot.
   * @param network The network that the link being connected belongs to
   * @param node The node the link is being dragged from
   * @param input The input slot that the link is being dragged from
   */
  dragNewFromInput(t, i, n, s) {
    if (this.isConnecting) throw new Error("Already dragging links.");
    const { state: o } = this, r = new ToOutputRenderLink(t, i, n, s);
    this.renderLinks.push(r), o.connectingTo = "output", S(this, X, at).call(this, !0);
  }
  /**
   * Drags a new link from a reroute to an input slot.
   * @param network The network that the link being connected belongs to
   * @param reroute The reroute that the link is being dragged from
   */
  dragFromReroute(t, i) {
    if (this.isConnecting) throw new Error("Already dragging links.");
    const n = i.firstLink ?? i.firstFloatingLink;
    if (!n) {
      console.warn("No link found for reroute.");
      return;
    }
    const s = t.getNodeById(n.origin_id);
    if (!s) {
      console.warn("No output node found for link.", n);
      return;
    }
    const o = s.outputs.at(n.origin_slot);
    if (!o) {
      console.warn("No output slot found for link.", n);
      return;
    }
    const r = new ToInputRenderLink(t, s, o, i);
    r.fromDirection = LinkDirection.NONE, this.renderLinks.push(r), this.state.connectingTo = "input", S(this, X, at).call(this, !1);
  }
  /**
   * Drags a new link from a reroute to an output slot.
   * @param network The network that the link being connected belongs to
   * @param reroute The reroute that the link is being dragged from
   */
  dragFromRerouteToOutput(t, i) {
    if (this.isConnecting) throw new Error("Already dragging links.");
    const n = i.firstLink ?? i.firstFloatingLink;
    if (!n) {
      console.warn("No link found for reroute.");
      return;
    }
    const s = t.getNodeById(n.target_id);
    if (!s) {
      console.warn("No input node found for link.", n);
      return;
    }
    const o = s.inputs.at(n.target_slot);
    if (!o) {
      console.warn("No input slot found for link.", n);
      return;
    }
    const r = new ToOutputFromRerouteLink(t, s, o, i, this);
    r.fromDirection = LinkDirection.LEFT, this.renderLinks.push(r), this.state.connectingTo = "output", S(this, X, at).call(this, !0);
  }
  dragFromLinkSegment(t, i) {
    if (this.isConnecting) throw new Error("Already dragging links.");
    const { state: n } = this;
    if (i.origin_id == null || i.origin_slot == null) return;
    const s = t.getNodeById(i.origin_id);
    if (!s) return;
    const o = s.outputs.at(i.origin_slot);
    if (!o) return;
    const r = t.getReroute(i.parentId), l = new ToInputRenderLink(t, s, o, r);
    l.fromDirection = LinkDirection.NONE, this.renderLinks.push(l), n.connectingTo = "input", S(this, X, at).call(this, !1);
  }
  /**
   * Connects the links being droppe
   * @param event Contains the drop location, in canvas space
   */
  dropLinks(t, i) {
    if (!this.isConnecting) {
      console.warn("Attempted to drop links when not connecting to anything.");
      return;
    }
    const { renderLinks: n } = this;
    if (this.events.dispatch("before-drop-links", { renderLinks: n, event: i }) === !1) return;
    const { canvasX: o, canvasY: r } = i, l = t.getNodeOnPos(o, r) ?? void 0;
    if (l)
      this.dropOnNode(l, i);
    else {
      const a = t.getRerouteOnPos(o, r);
      a && this.isRerouteValidDrop(a) ? this.dropOnReroute(a, i) : this.dropOnNothing(i);
    }
    this.events.dispatch("after-drop-links", { renderLinks: n, event: i });
  }
  dropOnNode(t, i) {
    const { renderLinks: n, state: s } = this, { connectingTo: o } = s, { canvasX: r, canvasY: l } = i;
    if (!n.every((a) => a.node === t)) {
      if (o === "output") {
        const a = t.getOutputOnPos([r, l]);
        a ? S(this, X, ce).call(this, t, a) : this.connectToNode(t, i);
      } else if (o === "input") {
        const a = t.getInputOnPos([r, l]);
        a ? S(this, X, he).call(this, t, a) : this.overWidget && n[0] instanceof ToInputRenderLink ? (this.events.dispatch("dropped-on-widget", {
          link: n[0],
          node: t,
          widget: this.overWidget
        }), this.overWidget = void 0) : this.connectToNode(t, i);
      }
    }
  }
  dropOnReroute(t, i) {
    if (this.events.dispatch("dropped-on-reroute", { reroute: t, event: i }) !== !1) {
      if (this.state.connectingTo === "input") {
        if (this.renderLinks.length !== 1) throw new Error(`Attempted to connect ${this.renderLinks.length} input links to a reroute.`);
        const s = this.renderLinks[0];
        this._connectOutputToReroute(t, s);
        return;
      }
      for (const s of this.renderLinks) {
        if (s.toType !== "output") continue;
        const o = t.findSourceOutput();
        if (!o) continue;
        const { node: r, output: l } = o;
        s.canConnectToOutput(r, l) && s.connectToRerouteOutput(t, r, l, this.events);
      }
    }
  }
  /** @internal Temporary workaround - requires refactor. */
  _connectOutputToReroute(t, i) {
    const n = t.findTargetInputs();
    if (!(n != null && n.length)) return;
    const s = t.getReroutes();
    if (s === null) throw new Error("Reroute loop detected.");
    const o = s.slice(0, -1).reverse();
    if (i instanceof ToInputRenderLink) {
      const { node: l, fromSlot: a, fromSlotIndex: h, fromReroute: u } = i;
      if (t.setFloatingLinkOrigin(l, a, h), u != null)
        for (const d of o) {
          if (d.id === u.id) break;
          for (const p of t.floatingLinkIds)
            d.floatingLinkIds.delete(p);
        }
    }
    const r = n.filter((l) => i.toType === "input" && canConnectInputLinkToReroute(i, l.node, l.input, t));
    for (const l of r)
      i.connectToRerouteInput(t, l, this.events, o);
  }
  dropOnNothing(t) {
    this.events.dispatch("dropped-on-canvas", t) !== !1 && this.disconnectLinks();
  }
  /**
   * Disconnects all moving links.
   * @remarks This is called when the links are dropped on the canvas.
   * May be called by consumers to e.g. drag links into a bin / void.
   */
  disconnectLinks() {
    for (const t of this.renderLinks)
      t instanceof MovingLinkBase && t.disconnect();
  }
  /**
   * Connects the links being dropped onto a node to the first matching slot.
   * @param node The node that the links are being dropped on
   * @param event Contains the drop location, in canvas space
   */
  connectToNode(t, i) {
    var r, l;
    const { state: { connectingTo: n } } = this;
    if (this.events.dispatch("dropped-on-node", { node: t, event: i }) === !1) return;
    const o = this.renderLinks[0];
    if (o) {
      if (n === "output") {
        const a = (r = t.findOutputByType(o.fromSlot.type)) == null ? void 0 : r.slot;
        if (!a) {
          console.warn(`Could not find slot for link type: [${o.fromSlot.type}].`);
          return;
        }
        S(this, X, ce).call(this, t, a);
      } else if (n === "input") {
        const a = (l = t.findInputByType(o.fromSlot.type)) == null ? void 0 : l.slot;
        if (!a) {
          console.warn(`Could not find slot for link type: [${o.fromSlot.type}].`);
          return;
        }
        S(this, X, he).call(this, t, a);
      }
    }
  }
  isNodeValidDrop(t) {
    var i;
    return this.state.connectingTo === "output" ? t.outputs.some((n) => this.renderLinks.some((s) => s.canConnectToOutput(t, n))) : (i = t.widgets) != null && i.length ? !0 : t.inputs.some((n) => this.renderLinks.some((s) => s.canConnectToInput(t, n)));
  }
  /**
   * Checks if a reroute is a valid drop target for any of the links being connected.
   * @param reroute The reroute that would be dropped on.
   * @returns `true` if any of the current links being connected are valid for the given reroute.
   */
  isRerouteValidDrop(t) {
    if (this.state.connectingTo === "input") {
      const i = t.findTargetInputs();
      if (!(i != null && i.length)) return !1;
      for (const { node: n, input: s } of i)
        for (const o of this.renderLinks)
          if (o.toType === "input" && canConnectInputLinkToReroute(o, n, s, t))
            return !0;
    } else {
      const i = t.findSourceOutput();
      if (!i) return !1;
      const { node: n, output: s } = i;
      for (const o of this.renderLinks)
        if (o.toType === "output" && o.canConnectToReroute(t) && o.canConnectToOutput(n, s))
          return !0;
    }
    return !1;
  }
  /**
   * Exports the current state of the link connector.
   * @param network The network that the links being connected belong to.
   * @returns A POJO with the state of the link connector, links being connected, and their network.
   * @remarks Other than {@link network}, all properties are shallow cloned.
   */
  export(t) {
    return {
      renderLinks: [...this.renderLinks],
      inputLinks: [...this.inputLinks],
      outputLinks: [...this.outputLinks],
      floatingLinks: [...this.floatingLinks],
      state: { ...this.state },
      network: t
    };
  }
  /**
   * Adds an event listener that will be automatically removed when the reset event is fired.
   * @param eventName The event to listen for.
   * @param listener The listener to call when the event is fired.
   */
  listenUntilReset(t, i, n) {
    this.events.addEventListener(t, i, n), this.events.addEventListener("reset", () => this.events.removeEventListener(t, i), { once: !0 });
  }
  /**
   * Resets everything to its initial state.
   *
   * Effectively cancels moving or connecting links.
   */
  reset(t = !1) {
    if (this.events.dispatch("reset", t) === !1) return;
    const { state: n, outputLinks: s, inputLinks: o, hiddenReroutes: r, renderLinks: l, floatingLinks: a } = this;
    if (!(!t && n.connectingTo === void 0)) {
      n.connectingTo = void 0;
      for (const h of s) delete h._dragging;
      for (const h of o) delete h._dragging;
      for (const h of a) delete h._dragging;
      for (const h of r) delete h._dragging;
      l.length = 0, o.length = 0, s.length = 0, a.length = 0, r.clear(), n.multi = !1, n.draggingExistingLinks = !1, n.snapLinksPos = void 0;
    }
  }
}
Gt = new WeakMap(), X = new WeakSet(), he = function(t, i) {
  for (const n of this.renderLinks)
    n.canConnectToInput(t, i) && n.connectToInput(t, i, this.events);
}, ce = function(t, i) {
  for (const n of this.renderLinks) {
    if (!n.canConnectToOutput(t, i)) {
      n instanceof MovingOutputLink && n.link.parentId !== void 0 && n.outputNode.connectSlots(n.outputSlot, n.inputNode, n.inputSlot, void 0);
      continue;
    }
    n.connectToOutput(t, i, this.events);
  }
}, /** Sets connecting_links, used by some extensions still. */
at = function(t) {
  const i = this.renderLinks.map((n) => {
    var l, a;
    const s = t ? n.fromSlot : null, o = t ? null : n.fromSlot, r = n instanceof MovingLinkBase ? (l = n.link) == null ? void 0 : l.parentId : (a = n.fromReroute) == null ? void 0 : a.id;
    return {
      node: n.node,
      slot: n.fromSlotIndex,
      input: s,
      output: o,
      pos: n.fromPos,
      afterRerouteId: r
    };
  });
  L(this, Gt).call(this, i);
};
function canConnectInputLinkToReroute(f, t, i, n) {
  var o, r, l;
  const { fromReroute: s } = f;
  if (!f.canConnectToInput(t, i) || // Would result in no change
  (s == null ? void 0 : s.id) === n.id || // Cannot connect from child to parent reroute
  (o = s == null ? void 0 : s.getReroutes()) != null && o.includes(n))
    return !1;
  if (f instanceof ToInputRenderLink) {
    if (n.parentId == null) {
      if ((r = n.firstLink) != null && r.hasOrigin(f.node.id, f.fromSlotIndex)) return !1;
    } else if (((l = f.fromReroute) == null ? void 0 : l.id) === n.parentId)
      return !1;
  }
  return !0;
}
function getNodeInputOnPos(f, t, i) {
  var s, o, r;
  const { inputs: n } = f;
  if (n)
    for (const [l, a] of n.entries()) {
      const h = f.getInputPos(l), d = 20 + ((((s = a.label) == null ? void 0 : s.length) ?? ((o = a.localized_name) == null ? void 0 : o.length) ?? ((r = a.name) == null ? void 0 : r.length)) || 3) * 7;
      if (isInRectangle(
        t,
        i,
        h[0] - 10,
        h[1] - 10,
        d,
        20
      ))
        return { index: l, input: a, pos: h };
    }
}
function getNodeOutputOnPos(f, t, i) {
  const { outputs: n } = f;
  if (n)
    for (const [s, o] of n.entries()) {
      const r = f.getOutputPos(s);
      if (isInRectangle(
        t,
        i,
        r[0] - 10,
        r[1] - 10,
        40,
        20
      ))
        return { index: s, output: o, pos: r };
    }
}
function isOverNodeInput(f, t, i, n) {
  const s = getNodeInputOnPos(f, t, i);
  return s ? (n && (n[0] = s.pos[0], n[1] = s.pos[1]), s.index) : -1;
}
function isOverNodeOutput(f, t, i, n) {
  const s = getNodeOutputOnPos(f, t, i);
  return s ? (n && (n[0] = s.pos[0], n[1] = s.pos[1]), s.index) : -1;
}
var pt, Pt, Tt, $, ue, Yt, Se, de;
const et = class et {
  constructor(t) {
    P(this, $);
    /** The element this PointerState should capture input against when dragging. */
    c(this, "element");
    /** Pointer ID used by drag capture. */
    c(this, "pointerId");
    /** Set to true when if the pointer moves far enough after a down event, before the corresponding up event is fired. */
    c(this, "dragStarted", !1);
    /** The {@link eUp} from the last successful click */
    c(this, "eLastDown");
    /** Used downstream for touch event support. */
    c(this, "isDouble", !1);
    /** Used downstream for touch event support. */
    c(this, "isDown", !1);
    /**
     * If `true`, {@link eDown}, {@link eMove}, and {@link eUp} will be set to
     * `undefined` when {@link reset} is called.
     *
     * Default: `true`
     */
    c(this, "clearEventsOnReset", !0);
    /** The last pointerdown event for the primary button */
    c(this, "eDown");
    /** The last pointermove event for the primary button */
    c(this, "eMove");
    /** The last pointerup event for the primary button */
    c(this, "eUp");
    P(this, Tt);
    this.element = t;
  }
  /** Maximum offset from click location */
  static get maxClickDrift() {
    return L(this, pt);
  }
  static set maxClickDrift(t) {
    W(this, pt, t), W(this, Pt, t * t);
  }
  /**
   * Run-once callback, called at the end of any click or drag, whether or not it was successful in any way.
   *
   * The setter of this callback will call the existing value before replacing it.
   * Therefore, simply setting this value twice will execute the first callback.
   */
  get finally() {
    return L(this, Tt);
  }
  set finally(t) {
    var i;
    try {
      (i = L(this, Tt)) == null || i.call(this);
    } finally {
      W(this, Tt, t);
    }
  }
  /**
   * Callback for `pointerdown` events.  To be used as the event handler (or called by it).
   * @param e The `pointerdown` event
   */
  down(t) {
    this.reset(), this.eDown = t, this.pointerId = t.pointerId, this.element.setPointerCapture(t.pointerId);
  }
  /**
   * Callback for `pointermove` events.  To be used as the event handler (or called by it).
   * @param e The `pointermove` event
   */
  move(t) {
    var s;
    const { eDown: i } = this;
    if (!i) return;
    if (!t.buttons) {
      this.reset();
      return;
    }
    if (!(t.buttons & i.buttons)) {
      S(this, $, ue).call(this, t), this.reset();
      return;
    }
    if (this.eMove = t, (s = this.onDrag) == null || s.call(this, t), this.dragStarted) return;
    (t.timeStamp - i.timeStamp > et.bufferTime || !S(this, $, Yt).call(this, t, i)) && S(this, $, de).call(this, t);
  }
  /**
   * Callback for `pointerup` events.  To be used as the event handler (or called by it).
   * @param e The `pointerup` event
   */
  up(t) {
    var n;
    if (t.button !== ((n = this.eDown) == null ? void 0 : n.button)) return !1;
    S(this, $, ue).call(this, t);
    const { dragStarted: i } = this;
    return this.reset(), !i;
  }
  /**
   * Resets the state of this {@link CanvasPointer} instance.
   *
   * The {@link finally} callback is first executed, then all callbacks and intra-click
   * state is cleared.
   */
  reset() {
    this.finally = void 0, delete this.onClick, delete this.onDoubleClick, delete this.onDragStart, delete this.onDrag, delete this.onDragEnd, this.isDown = !1, this.isDouble = !1, this.dragStarted = !1, this.clearEventsOnReset && (this.eDown = void 0, this.eMove = void 0, this.eUp = void 0);
    const { element: t, pointerId: i } = this;
    this.pointerId = void 0, typeof i == "number" && t.hasPointerCapture(i) && t.releasePointerCapture(i);
  }
};
pt = new WeakMap(), Pt = new WeakMap(), Tt = new WeakMap(), $ = new WeakSet(), ue = function(t) {
  var n, s, o;
  const { eDown: i } = this;
  i && (this.eUp = t, this.dragStarted ? (n = this.onDragEnd) == null || n.call(this, t) : S(this, $, Yt).call(this, t, i) ? this.onDoubleClick && S(this, $, Se).call(this) ? (this.onDoubleClick(t), this.eLastDown = void 0) : ((o = this.onClick) == null || o.call(this, t), this.eLastDown = i) : (S(this, $, de).call(this), (s = this.onDragEnd) == null || s.call(this, t)));
}, /**
 * Checks if two events occurred near each other - not further apart than the maximum click drift.
 * @param a The first event to compare
 * @param b The second event to compare
 * @param tolerance2 The maximum distance (squared) before the positions are considered different
 * @returns `true` if the two events were no more than {@link maxClickDrift} apart, otherwise `false`
 */
Yt = function(t, i, n = L(et, Pt)) {
  return dist2(t.clientX, t.clientY, i.clientX, i.clientY) <= n;
}, /**
 * Checks whether the pointer is currently past the max click drift threshold.
 * @returns `true` if the latest pointer event is past the the click drift threshold
 */
Se = function() {
  const { eDown: t, eLastDown: i } = this;
  if (!t || !i) return !1;
  const n = (3 * L(et, pt)) ** 2, s = t.timeStamp - i.timeStamp;
  return s > 0 && s < et.doubleClickTime && S(this, $, Yt).call(this, t, i, n);
}, de = function(t) {
  var i;
  this.dragStarted = !0, (i = this.onDragStart) == null || i.call(this, this, t), delete this.onDragStart;
}, /** Maximum time in milliseconds to ignore click drift */
c(et, "bufferTime", 150), /** Maximum gap between pointerup and pointerdown events to be considered as a double click */
c(et, "doubleClickTime", 300), P(et, pt, 6), /** {@link maxClickDrift} squared.  Used to calculate click drift without `sqrt`. */
P(et, Pt, L(et, pt) ** 2);
let CanvasPointer = et;
class NullGraphError extends Error {
  constructor(t = "Attempted to access LGraph reference that was null or undefined.", i) {
    super(t, { cause: i }), this.name = "NullGraphError";
  }
}
class LGraphIcon {
  constructor({
    unicode: t,
    fontFamily: i = "PrimeIcons",
    color: n = "#e6c200",
    bgColor: s,
    fontSize: o = 16,
    circlePadding: r = 2,
    xOffset: l = 0,
    yOffset: a = 0
  }) {
    c(this, "unicode");
    c(this, "fontFamily");
    c(this, "color");
    c(this, "bgColor");
    c(this, "fontSize");
    c(this, "circlePadding");
    c(this, "xOffset");
    c(this, "yOffset");
    this.unicode = t, this.fontFamily = i, this.color = n, this.bgColor = s, this.fontSize = o, this.circlePadding = r, this.xOffset = l, this.yOffset = a;
  }
  draw(t, i, n) {
    i += this.xOffset, n += this.yOffset;
    const { font: s, textBaseline: o, textAlign: r, fillStyle: l } = t;
    t.font = `${this.fontSize}px '${this.fontFamily}'`, t.textBaseline = "middle", t.textAlign = "center";
    const a = this.fontSize / 2 + this.circlePadding;
    this.bgColor && (t.beginPath(), t.arc(i + a, n, a, 0, 2 * Math.PI), t.fillStyle = this.bgColor, t.fill()), t.fillStyle = this.color, t.fillText(this.unicode, i + a, n), t.font = s, t.textBaseline = o, t.textAlign = r, t.fillStyle = l;
  }
}
var BadgePosition = /* @__PURE__ */ ((f) => (f.TopLeft = "top-left", f.TopRight = "top-right", f))(BadgePosition || {});
class LGraphBadge {
  constructor({
    text: t,
    fgColor: i = "white",
    bgColor: n = "#0F1F0F",
    fontSize: s = 12,
    padding: o = 6,
    height: r = 20,
    cornerRadius: l = 5,
    iconOptions: a,
    xOffset: h = 0,
    yOffset: u = 0
  }) {
    c(this, "text");
    c(this, "fgColor");
    c(this, "bgColor");
    c(this, "fontSize");
    c(this, "padding");
    c(this, "height");
    c(this, "cornerRadius");
    c(this, "icon");
    c(this, "xOffset");
    c(this, "yOffset");
    this.text = t, this.fgColor = i, this.bgColor = n, this.fontSize = s, this.padding = o, this.height = r, this.cornerRadius = l, a && (this.icon = new LGraphIcon(a)), this.xOffset = h, this.yOffset = u;
  }
  get visible() {
    return this.text.length > 0 || !!this.icon;
  }
  getWidth(t) {
    if (!this.visible) return 0;
    const { font: i } = t;
    let n = 0;
    this.icon && (t.font = `${this.icon.fontSize}px '${this.icon.fontFamily}'`, n = t.measureText(this.icon.unicode).width + this.padding), t.font = `${this.fontSize}px sans-serif`;
    const s = this.text ? t.measureText(this.text).width : 0;
    return t.font = i, n + s + this.padding * 2;
  }
  draw(t, i, n) {
    if (!this.visible) return;
    i += this.xOffset, n += this.yOffset;
    const { font: s, fillStyle: o, textBaseline: r, textAlign: l } = t;
    t.font = `${this.fontSize}px sans-serif`;
    const a = this.getWidth(t), h = 0;
    t.fillStyle = this.bgColor, t.beginPath(), t.roundRect ? t.roundRect(i + h, n, a, this.height, this.cornerRadius) : t.rect(i + h, n, a, this.height), t.fill();
    let u = i + h + this.padding;
    const d = n + this.height / 2;
    this.icon && (this.icon.draw(t, u, d), u += this.icon.fontSize + this.padding / 2 + 4), this.text && (t.fillStyle = this.fgColor, t.textBaseline = "middle", t.textAlign = "left", t.fillText(this.text, u, d + 1)), t.font = s, t.fillStyle = o, t.textBaseline = r, t.textAlign = l;
  }
}
class SlotBase {
  constructor(t, i, n) {
    c(this, "name");
    c(this, "localized_name");
    c(this, "label");
    c(this, "type");
    c(this, "dir");
    c(this, "removable");
    c(this, "shape");
    c(this, "color_off");
    c(this, "color_on");
    c(this, "locked");
    c(this, "nameLocked");
    c(this, "widget");
    c(this, "_floatingLinks");
    c(this, "hasErrors");
    c(this, "boundingRect");
    this.name = t, this.type = i, this.boundingRect = n;
  }
  renderingColor(t) {
    return this.isConnected ? this.color_on || t.getConnectedColor(this.type) : this.color_off || t.getDisconnectedColor(this.type);
  }
}
var Zt, Oe, Mt;
class NodeSlot extends SlotBase {
  constructor(i, n) {
    super(i.name, i.type, i.boundingRect ?? [0, 0, 0, 0]);
    P(this, Zt);
    c(this, "pos");
    P(this, Mt);
    Object.assign(this, i), W(this, Mt, n);
  }
  get node() {
    return L(this, Mt);
  }
  get highlightColor() {
    return LiteGraph.NODE_TEXT_HIGHLIGHT_COLOR ?? LiteGraph.NODE_SELECTED_TITLE_COLOR ?? LiteGraph.NODE_TEXT_COLOR;
  }
  /**
   * The label to display in the UI.
   */
  get renderingLabel() {
    return this.label || this.localized_name || this.name || "";
  }
  draw(i, {
    colorContext: n,
    labelPosition: s = LabelPosition.Right,
    lowQuality: o = !1,
    highlight: r = !1,
    doStroke: l = !1
  }) {
    const a = i.fillStyle, h = i.strokeStyle, u = i.lineWidth, d = r ? this.highlightColor : LiteGraph.NODE_TEXT_COLOR, p = L(this, Zt, Oe), g = this.type, y = g === SlotType.Array ? SlotShape.Grid : this.shape;
    i.beginPath();
    let _ = !0;
    if (i.fillStyle = this.renderingColor(n), i.lineWidth = 1, g === SlotType.Event || y === SlotShape.Box)
      i.rect(p[0] - 6 + 0.5, p[1] - 5 + 0.5, 14, 10);
    else if (y === SlotShape.Arrow)
      i.moveTo(p[0] + 8, p[1] + 0.5), i.lineTo(p[0] - 4, p[1] + 6 + 0.5), i.lineTo(p[0] - 4, p[1] - 6 + 0.5), i.closePath();
    else if (y === SlotShape.Grid) {
      for (let N = 0; N < 3; N++)
        for (let T = 0; T < 3; T++)
          i.rect(
            p[0] - 4 + N * 3,
            p[1] - 4 + T * 3,
            2,
            2
          );
      l = !1;
    } else if (o)
      i.rect(p[0] - 4, p[1] - 4, 8, 8);
    else {
      let w;
      y === SlotShape.HollowCircle ? (_ = !1, l = !0, i.lineWidth = 3, i.strokeStyle = i.fillStyle, w = r ? 4 : 3) : w = r ? 5 : 4, i.arc(p[0], p[1], w, 0, Math.PI * 2);
    }
    if (_ && i.fill(), !o && l && i.stroke(), !(o || this.isWidgetInputSlot)) {
      const w = this.renderingLabel;
      w && (i.fillStyle = d, s === LabelPosition.Right ? this.dir == LinkDirection.UP ? i.fillText(w, p[0], p[1] - 10) : i.fillText(w, p[0] + 10, p[1] + 5) : this.dir == LinkDirection.DOWN ? i.fillText(w, p[0], p[1] - 8) : i.fillText(w, p[0] - 10, p[1] + 5));
    }
    this.hasErrors && (i.lineWidth = 2, i.strokeStyle = "red", i.beginPath(), i.arc(p[0], p[1], 12, 0, Math.PI * 2), i.stroke()), i.fillStyle = a, i.strokeStyle = h, i.lineWidth = u;
  }
  drawCollapsed(i) {
    const [n, s] = this.collapsedPos, { fillStyle: o } = i;
    i.fillStyle = "#686", i.beginPath(), this.type === SlotType.Event || this.shape === RenderShape.BOX ? i.rect(n - 7 + 0.5, s - 4, 14, 8) : this.shape === RenderShape.ARROW ? (this instanceof NodeInputSlot ? (i.moveTo(n + 8, s), i.lineTo(n - 4, s - 4), i.lineTo(n - 4, s + 4)) : (i.moveTo(n + 6, s), i.lineTo(n - 6, s - 4), i.lineTo(n - 6, s + 4)), i.closePath()) : i.arc(n, s, 4, 0, Math.PI * 2), i.fill(), i.fillStyle = o;
  }
}
Zt = new WeakSet(), Oe = function() {
  const i = this.node.pos, { boundingRect: n } = this, s = n[3];
  return getCentre([
    n[0] - i[0],
    n[1] - i[1],
    s,
    s
  ]);
}, Mt = new WeakMap();
class NodeInputSlot extends NodeSlot {
  constructor(i, n) {
    super(i, n);
    c(this, "link");
    this.link = i.link;
  }
  get isWidgetInputSlot() {
    return !!this.widget;
  }
  get collapsedPos() {
    return [0, LiteGraph.NODE_TITLE_HEIGHT * -0.5];
  }
  get isConnected() {
    return this.link != null;
  }
  isValidTarget(i) {
    return "links" in i && LiteGraph.isValidConnection(this.type, i.type);
  }
  draw(i, n) {
    const { textAlign: s } = i;
    i.textAlign = "left", super.draw(i, {
      ...n,
      labelPosition: LabelPosition.Right,
      doStroke: !1
    }), i.textAlign = s;
  }
}
var Ft;
class NodeOutputSlot extends NodeSlot {
  constructor(i, n) {
    super(i, n);
    P(this, Ft);
    c(this, "links");
    c(this, "_data");
    c(this, "slot_index");
    this.links = i.links, this._data = i._data, this.slot_index = i.slot_index, W(this, Ft, n);
  }
  get isWidgetInputSlot() {
    return !1;
  }
  get collapsedPos() {
    return [
      L(this, Ft)._collapsed_width ?? LiteGraph.NODE_COLLAPSED_WIDTH,
      LiteGraph.NODE_TITLE_HEIGHT * -0.5
    ];
  }
  isValidTarget(i) {
    return "link" in i && LiteGraph.isValidConnection(this.type, i.type);
  }
  get isConnected() {
    return this.links != null && this.links.length > 0;
  }
  draw(i, n) {
    const { textAlign: s, strokeStyle: o } = i;
    i.textAlign = "right", i.strokeStyle = "black", super.draw(i, {
      ...n,
      labelPosition: LabelPosition.Left,
      doStroke: !0
    }), i.textAlign = s, i.strokeStyle = o;
  }
}
Ft = new WeakMap();
function shallowCloneCommonProps(f) {
  const { color_off: t, color_on: i, dir: n, label: s, localized_name: o, locked: r, name: l, nameLocked: a, removable: h, shape: u, type: d } = f;
  return { color_off: t, color_on: i, dir: n, label: s, localized_name: o, locked: r, name: l, nameLocked: a, removable: h, shape: u, type: d };
}
function inputAsSerialisable(f) {
  const { link: t } = f, i = f.widget ? { widget: { name: f.widget.name } } : { pos: f.pos };
  return {
    ...shallowCloneCommonProps(f),
    ...i,
    link: t
  };
}
function outputAsSerialisable(f) {
  const { pos: t, slot_index: i, links: n, widget: s } = f, o = s ? { widget: { name: s.name } } : null;
  return {
    ...shallowCloneCommonProps(f),
    ...o,
    pos: t,
    slot_index: i,
    links: n
  };
}
function isINodeInputSlot(f) {
  return "link" in f;
}
function isWidgetInputSlot(f) {
  return !!f.widget;
}
function stringOrEmpty(f) {
  return f == null ? "" : String(f);
}
function parseSlotTypes(f) {
  return f == "" || f == "0" ? ["*"] : String(f).toLowerCase().split(",");
}
function getAllNestedItems(f) {
  const t = /* @__PURE__ */ new Set();
  if (f)
    for (const n of f) i(n, t);
  return t;
  function i(n, s) {
    if (!(s.has(n) || n.pinned) && (s.add(n), n.children))
      for (const o of n.children) i(o, s);
  }
}
function findFirstNode(f) {
  for (const t of f)
    if (t instanceof LGraphNode) return t;
}
function findFreeSlotOfType(f, t) {
  var r, l;
  if (!(f != null && f.length)) return;
  let i, n, s;
  const o = parseSlotTypes(t);
  for (const [a, h] of f.entries()) {
    const u = parseSlotTypes(h.type);
    for (const d of o)
      for (const p of u)
        if (p === d) {
          if (h.link == null && !((r = h.links) != null && r.length))
            return { index: a, slot: h };
          i ?? (i = { index: a, slot: h });
        } else !n && (d === "*" || p === "*") && (h.link == null && !((l = h.links) != null && l.length) ? n = { index: a, slot: h } : s ?? (s = { index: a, slot: h }));
  }
  return n ?? i ?? s;
}
function distributeSpace(f, t) {
  if (t.length === 0) return [];
  const i = t.reduce((o, r) => o + r.minSize, 0);
  if (f < i)
    return t.map((o) => o.minSize);
  let n = t.map((o) => ({
    computedSize: o.minSize,
    maxSize: o.maxSize ?? 1 / 0,
    remaining: (o.maxSize ?? 1 / 0) - o.minSize
  })), s = f - i;
  for (; s > 0 && n.some((o) => o.remaining > 0); ) {
    const o = n.filter(
      (a) => a.remaining > 0
    ).length;
    if (o === 0) break;
    const r = s / o;
    let l = 0;
    if (n = n.map((a) => {
      if (a.remaining <= 0) return a;
      const h = Math.min(r, a.remaining);
      return l += h, {
        ...a,
        computedSize: a.computedSize + h,
        remaining: a.remaining - h
      };
    }), s -= l, l === 0) break;
  }
  return n.map(({ computedSize: o }) => o);
}
function toClass(f, ...t) {
  return t[0] instanceof f ? t[0] : new f(...t);
}
var Wt, Bt;
class Rectangle extends Float64Array {
  constructor(i = 0, n = 0, s = 0, o = 0) {
    super(4);
    P(this, Wt);
    P(this, Bt);
    this[0] = i, this[1] = n, this[2] = s, this[3] = o;
  }
  subarray(i, n) {
    return new Float64Array(this.buffer, i, n);
  }
  /**
   * A reference to the position of the top-left corner of this rectangle.
   *
   * Updating the values of the returned object will update this rectangle.
   */
  get pos() {
    return L(this, Wt) ?? W(this, Wt, this.subarray(0, 2)), L(this, Wt);
  }
  set pos(i) {
    this[0] = i[0], this[1] = i[1];
  }
  /**
   * A reference to the size of this rectangle.
   *
   * Updating the values of the returned object will update this rectangle.
   */
  get size() {
    return L(this, Bt) ?? W(this, Bt, this.subarray(2, 4)), L(this, Bt);
  }
  set size(i) {
    this[2] = i[0], this[3] = i[1];
  }
  // #region Property accessors
  /** The x co-ordinate of the top-left corner of this rectangle. */
  get x() {
    return this[0];
  }
  set x(i) {
    this[0] = i;
  }
  /** The y co-ordinate of the top-left corner of this rectangle. */
  get y() {
    return this[1];
  }
  set y(i) {
    this[1] = i;
  }
  /** The width of this rectangle. */
  get width() {
    return this[2];
  }
  set width(i) {
    this[2] = i;
  }
  /** The height of this rectangle. */
  get height() {
    return this[3];
  }
  set height(i) {
    this[3] = i;
  }
  /** The x co-ordinate of the left edge of this rectangle. */
  get left() {
    return this[0];
  }
  set left(i) {
    this[0] = i;
  }
  /** The y co-ordinate of the top edge of this rectangle. */
  get top() {
    return this[1];
  }
  set top(i) {
    this[1] = i;
  }
  /** The x co-ordinate of the right edge of this rectangle. */
  get right() {
    return this[0] + this[2];
  }
  set right(i) {
    this[0] = i - this[2];
  }
  /** The y co-ordinate of the bottom edge of this rectangle. */
  get bottom() {
    return this[1] + this[3];
  }
  set bottom(i) {
    this[1] = i - this[3];
  }
  /** The x co-ordinate of the centre of this rectangle. */
  get centreX() {
    return this[0] + this[2] * 0.5;
  }
  /** The y co-ordinate of the centre of this rectangle. */
  get centreY() {
    return this[1] + this[3] * 0.5;
  }
  // #endregion Property accessors
  /**
   * Updates the rectangle to the values of {@link rect}.
   * @param rect The rectangle to update to.
   */
  updateTo(i) {
    this[0] = i[0], this[1] = i[1], this[2] = i[2], this[3] = i[3];
  }
  /**
   * Checks if the point [{@link x}, {@link y}] is inside this rectangle.
   * @param x The x-coordinate to check
   * @param y The y-coordinate to check
   * @returns `true` if the point is inside this rectangle, otherwise `false`.
   */
  containsXy(i, n) {
    const { x: s, y: o, width: r, height: l } = this;
    return s <= i && o <= n && s + r >= i && o + l >= n;
  }
  /**
   * Checks if {@link point} is inside this rectangle.
   * @param point The point to check
   * @returns `true` if {@link point} is inside this rectangle, otherwise `false`.
   */
  containsPoint(i) {
    return this.x <= i[0] && this.y <= i[1] && this.x + this.width >= i[0] && this.y + this.height >= i[1];
  }
  /**
   * Checks if {@link rect} is inside this rectangle.
   * @param rect The rectangle to check
   * @returns `true` if {@link rect} is inside this rectangle, otherwise `false`.
   */
  containsRect(i) {
    return this.x <= i[0] && this.y <= i[1] && this.x + this.width >= i[0] + i[2] && this.y + this.height >= i[1] + i[3];
  }
  /**
   * Checks if {@link rect} overlaps with this rectangle.
   * @param rect The rectangle to check
   * @returns `true` if {@link rect} overlaps with this rectangle, otherwise `false`.
   */
  overlaps(i) {
    return this.x < i[0] + i[2] && this.y < i[1] + i[3] && this.x + this.width > i[0] && this.y + this.height > i[1];
  }
  /** @returns The centre point of this rectangle, as a new {@link Point}. */
  getCentre() {
    return [this.centreX, this.centreY];
  }
  /** @returns The area of this rectangle. */
  getArea() {
    return this.width * this.height;
  }
  /** @returns The perimeter of this rectangle. */
  getPerimeter() {
    return 2 * (this.width + this.height);
  }
  /** @returns The top-left corner of this rectangle, as a new {@link Point}. */
  getTopLeft() {
    return [this[0], this[1]];
  }
  /** @returns The bottom-right corner of this rectangle, as a new {@link Point}. */
  getBottomRight() {
    return [this.right, this.bottom];
  }
  /** @returns The width and height of this rectangle, as a new {@link Size}. */
  getSize() {
    return [this[2], this[3]];
  }
  /** @returns The offset from the top-left of this rectangle to the point [{@link x}, {@link y}], as a new {@link Point}. */
  getOffsetTo([i, n]) {
    return [i - this[0], n - this[1]];
  }
  /** @returns The offset from the point [{@link x}, {@link y}] to the top-left of this rectangle, as a new {@link Point}. */
  getOffsetFrom([i, n]) {
    return [this[0] - i, this[1] - n];
  }
  /** Sets the width without moving the right edge (changes position) */
  setWidthRightAnchored(i) {
    const n = this[2];
    this[2] = i, this[0] += n - i;
  }
  /** Sets the height without moving the bottom edge (changes position) */
  setHeightBottomAnchored(i) {
    const n = this[3];
    this[3] = i, this[1] += n - i;
  }
  /** Alias of {@link export}. */
  toArray() {
    return this.export();
  }
  /** @returns A new, untyped array (serializable) containing the values of this rectangle. */
  export() {
    return [this[0], this[1], this[2], this[3]];
  }
  /** Draws a debug outline of this rectangle. */
  _drawDebug(i, n = "red") {
    const { strokeStyle: s, lineWidth: o } = i;
    try {
      i.strokeStyle = n, i.lineWidth = 0.5, i.beginPath(), i.strokeRect(this[0], this[1], this[2], this[3]);
    } finally {
      i.strokeStyle = s, i.lineWidth = o;
    }
  }
}
Wt = new WeakMap(), Bt = new WeakMap();
const st = class st {
  constructor(t) {
    c(this, "linkedWidgets");
    c(this, "name");
    c(this, "options");
    c(this, "label");
    c(this, "type");
    c(this, "value");
    c(this, "y", 0);
    c(this, "last_y");
    c(this, "width");
    c(this, "disabled");
    c(this, "computedDisabled");
    c(this, "hidden");
    c(this, "advanced");
    c(this, "tooltip");
    c(this, "element");
    Object.assign(this, t), this.name = t.name, this.options = t.options, this.type = t.type;
  }
  get outline_color() {
    return this.advanced ? LiteGraph.WIDGET_ADVANCED_OUTLINE_COLOR : LiteGraph.WIDGET_OUTLINE_COLOR;
  }
  get background_color() {
    return LiteGraph.WIDGET_BGCOLOR;
  }
  get height() {
    return LiteGraph.NODE_WIDGET_HEIGHT;
  }
  get text_color() {
    return LiteGraph.WIDGET_TEXT_COLOR;
  }
  get secondary_text_color() {
    return LiteGraph.WIDGET_SECONDARY_TEXT_COLOR;
  }
  get disabledTextColor() {
    return LiteGraph.WIDGET_DISABLED_TEXT_COLOR;
  }
  get displayName() {
    return this.label || this.name;
  }
  get displayValue() {
    return String(this.value);
  }
  get labelBaseline() {
    return this.y + this.height * 0.7;
  }
  /**
   * Draws the standard widget shape - elongated capsule. The path of the widget shape is not
   * cleared, and may be used for further drawing.
   * @param ctx The canvas context
   * @param options The options for drawing the widget
   * @remarks Leaves {@link ctx} dirty.
   */
  drawWidgetShape(t, { width: i, showText: n }) {
    const { height: s, y: o } = this, { margin: r } = st;
    t.textAlign = "left", t.strokeStyle = this.outline_color, t.fillStyle = this.background_color, t.beginPath(), n ? t.roundRect(r, o, i - r * 2, s, [s * 0.5]) : t.rect(r, o, i - r * 2, s), t.fill(), n && !this.computedDisabled && t.stroke();
  }
  /**
   * A shared routine for drawing a label and value as text, truncated
   * if they exceed the available width.
   */
  drawTruncatingText({
    ctx: t,
    width: i,
    leftPadding: n = 5,
    rightPadding: s = 20
  }) {
    const { height: o, y: r } = this, { margin: l } = st, { displayName: a, displayValue: h } = this, u = t.measureText(a).width, d = t.measureText(h).width, p = st.labelValueGap, g = l * 2 + n, y = i - g - 2 * l - s, _ = u + p + d, m = new Rectangle(g, r, y, o * 0.7);
    if (t.fillStyle = this.secondary_text_color, _ <= y)
      drawTextInArea({ ctx: t, text: a, area: m, align: "left" });
    else if (LiteGraph.truncateWidgetTextEvenly) {
      const w = (y - p) / (_ - p);
      m.width = u * w, drawTextInArea({ ctx: t, text: a, area: m, align: "left" }), m.right = g + y, m.setWidthRightAnchored(d * w);
    } else if (LiteGraph.truncateWidgetValuesFirst) {
      const w = Math.min(u, y);
      m.width = w, drawTextInArea({ ctx: t, text: a, area: m, align: "left" }), m.right = g + y, m.setWidthRightAnchored(Math.max(y - p - w, 0));
    } else {
      const w = Math.min(d, y);
      m.width = Math.max(y - p - w, 0), drawTextInArea({ ctx: t, text: a, area: m, align: "left" }), m.right = g + y, m.setWidthRightAnchored(w);
    }
    t.fillStyle = this.text_color, drawTextInArea({ ctx: t, text: h, area: m, align: "right" });
  }
  /**
   * Sets the value of the widget
   * @param value The value to set
   * @param options The options for setting the value
   */
  setValue(t, { e: i, node: n, canvas: s }) {
    var a, h, u;
    const o = this.value;
    if (t === this.value) return;
    const r = this.type === "number" ? Number(t) : t;
    this.value = r, (a = this.options) != null && a.property && n.properties[this.options.property] !== void 0 && n.setProperty(this.options.property, r);
    const l = s.graph_mouse;
    (h = this.callback) == null || h.call(this, this.value, s, n, l, i), (u = n.onWidgetChanged) == null || u.call(n, this.name ?? "", r, o, this), n.graph && n.graph._version++;
  }
};
/** From node edge to widget edge */
c(st, "margin", 15), /** From widget edge to tip of arrow button */
c(st, "arrowMargin", 6), /** Arrow button width */
c(st, "arrowWidth", 10), /** Absolute minimum display width of widget values */
c(st, "minValueWidth", 42), /** Minimum gap between label and value */
c(st, "labelValueGap", 5);
let BaseWidget = st;
class BooleanWidget extends BaseWidget {
  constructor(t) {
    super(t), this.type = "toggle", this.value = t.value;
  }
  drawWidget(t, {
    width: i,
    showText: n = !0
  }) {
    const { height: s, y: o } = this, { margin: r } = BaseWidget;
    this.drawWidgetShape(t, { width: i, showText: n }), t.fillStyle = this.value ? "#89A" : "#333", t.beginPath(), t.arc(
      i - r * 2,
      o + s * 0.5,
      s * 0.36,
      0,
      Math.PI * 2
    ), t.fill(), n && (this.drawLabel(t, r * 2), this.drawValue(t, i - 40));
  }
  drawLabel(t, i) {
    t.fillStyle = this.secondary_text_color;
    const { displayName: n } = this;
    n && t.fillText(n, i, this.labelBaseline);
  }
  drawValue(t, i) {
    t.fillStyle = this.value ? this.text_color : this.secondary_text_color, t.textAlign = "right";
    const n = this.value ? this.options.on || "true" : this.options.off || "false";
    t.fillText(n, i, this.labelBaseline);
  }
  onClick(t) {
    this.setValue(!this.value, t);
  }
}
class ButtonWidget extends BaseWidget {
  constructor(t) {
    super(t), this.type = "button", this.clicked = t.clicked ?? !1;
  }
  /**
   * Draws the widget
   * @param ctx The canvas context
   * @param options The options for drawing the widget
   */
  drawWidget(t, {
    width: i,
    showText: n = !0
  }) {
    const { fillStyle: s, strokeStyle: o, textAlign: r } = t, { height: l, y: a } = this, { margin: h } = BaseWidget;
    t.fillStyle = this.background_color, this.clicked && (t.fillStyle = "#AAA", this.clicked = !1), t.fillRect(h, a, i - h * 2, l), n && !this.computedDisabled && (t.strokeStyle = this.outline_color, t.strokeRect(h, a, i - h * 2, l)), n && this.drawLabel(t, i * 0.5), Object.assign(t, { textAlign: r, strokeStyle: o, fillStyle: s });
  }
  drawLabel(t, i) {
    t.textAlign = "center", t.fillStyle = this.text_color, t.fillText(this.displayName, i, this.y + this.height * 0.7);
  }
  onClick({ e: t, node: i, canvas: n }) {
    var o;
    const s = n.graph_mouse;
    this.clicked = !0, n.setDirty(!0), (o = this.callback) == null || o.call(this, this, n, i, s, t);
  }
}
const UNIQUE_MESSAGE_LIMIT = 1e4, sentWarnings = /* @__PURE__ */ new Set();
function warnDeprecated(f, t) {
  if (!LiteGraph.alwaysRepeatWarnings) {
    if (sentWarnings.has(f) || sentWarnings.size > UNIQUE_MESSAGE_LIMIT) return;
    sentWarnings.add(f);
  }
  for (const i of LiteGraph.onDeprecationWarning)
    i(f, t);
}
class BaseSteppedWidget extends BaseWidget {
  /**
   * Draw the arrow buttons for the widget
   * @param ctx The canvas rendering context
   * @param width The width of the widget
   */
  drawArrowButtons(t, i) {
    const { height: n, text_color: s, disabledTextColor: o, y: r } = this, { arrowMargin: l, arrowWidth: a, margin: h } = BaseWidget, u = h + l, d = u + a;
    t.fillStyle = this.canDecrement() ? s : o, t.beginPath(), t.moveTo(d, r + 5), t.lineTo(u, r + n * 0.5), t.lineTo(d, r + n - 5), t.fill(), t.fillStyle = this.canIncrement() ? s : o, t.beginPath(), t.moveTo(i - d, r + 5), t.lineTo(i - u, r + n * 0.5), t.lineTo(i - d, r + n - 5), t.fill();
  }
  drawWidget(t, i) {
    const { fillStyle: n, strokeStyle: s, textAlign: o } = t;
    this.drawWidgetShape(t, i), i.showText && (this.computedDisabled || this.drawArrowButtons(t, i.width), this.drawTruncatingText({ ctx: t, width: i.width })), Object.assign(t, { textAlign: o, strokeStyle: s, fillStyle: n });
  }
}
function toArray(f) {
  return Array.isArray(f) ? f : Object.keys(f);
}
var nt, fe, pe, ge;
class ComboWidget extends BaseSteppedWidget {
  constructor(i) {
    super(i);
    P(this, nt);
    this.type = "combo", this.value = i.value;
  }
  get displayValue() {
    const { values: i } = this.options;
    if (i) {
      const n = typeof i == "function" ? i() : i;
      if (n && !Array.isArray(n))
        return n[this.value];
    }
    return typeof this.value == "number" ? String(this.value) : this.value;
  }
  /**
   * Returns `true` if the current value is not the last value in the list.
   * Handles edge case where the value is both the first and last item in the list.
   */
  canIncrement() {
    return S(this, nt, pe).call(this, !0);
  }
  canDecrement() {
    return S(this, nt, pe).call(this, !1);
  }
  incrementValue(i) {
    S(this, nt, ge).call(this, 1, i);
  }
  decrementValue(i) {
    S(this, nt, ge).call(this, -1, i);
  }
  onClick({ e: i, node: n, canvas: s }) {
    const o = i.canvasX - n.pos[0], r = this.width || n.size[0];
    if (typeof this.options.values == "function" && warnDeprecated("Using a function for values is deprecated. Use an array of unique values instead."), o < 40) return this.decrementValue({ e: i, node: n, canvas: s });
    if (o > r - 40) return this.incrementValue({ e: i, node: n, canvas: s });
    const l = S(this, nt, fe).call(this, n), a = toArray(l), h = l != a ? Object.values(l) : l;
    new LiteGraph.ContextMenu(h, {
      scale: Math.max(1, s.ds.scale),
      event: i,
      className: "dark",
      callback: (u) => {
        this.setValue(
          l != a ? h.indexOf(u) : u,
          { e: i, node: n, canvas: s }
        );
      }
    });
  }
}
nt = new WeakSet(), fe = function(i) {
  const { values: n } = this.options;
  if (n == null) throw new Error("[ComboWidget]: values is required");
  return typeof n == "function" ? n(this, i) : n;
}, /**
 * Checks if the value is {@link Array.at at} the given index in the combo list.
 * @param increment `true` if checking the use of the increment button, `false` for decrement
 * @returns `true` if the value is at the given index, otherwise `false`.
 */
pe = function(i) {
  const { values: n } = this.options;
  if (typeof n == "function") return !1;
  const s = toArray(n);
  if (!(s.length > 1)) return !1;
  const o = s.at(0), r = s.at(-1);
  return o === r ? !0 : this.value !== (i ? r : o);
}, ge = function(i, n) {
  const s = S(this, nt, fe).call(this, n.node), o = toArray(s);
  n.canvas.last_mouseclick = 0;
  const r = typeof s == "object" ? o.indexOf(String(this.value)) + i : o.indexOf(this.value) + i, l = clamp(r, 0, o.length - 1), a = Array.isArray(s) ? s[l] : l;
  this.setValue(a, n);
};
function getWidgetStep(f) {
  return f.step2 || (f.step || 10) * 0.1;
}
class KnobWidget extends BaseWidget {
  constructor(i) {
    super(i);
    c(this, "computedHeight");
    c(this, "current_drag_offset", 0);
    this.type = "knob", this.value = i.value, this.options = i.options;
  }
  /**
   * Compute the layout size of the widget.
   * @returns The layout size of the widget.
   */
  computeLayoutSize() {
    return {
      minHeight: 60,
      minWidth: 20,
      maxHeight: 1e6,
      maxWidth: 1e6
    };
  }
  get height() {
    return this.computedHeight || super.height;
  }
  drawWidget(i, {
    width: n,
    showText: s = !0
  }) {
    const { fillStyle: o, strokeStyle: r, textAlign: l } = i, { y: a } = this, { margin: h } = BaseWidget, { gradient_stops: u = "rgb(14, 182, 201); rgb(0, 216, 72)" } = this.options, d = this.computedHeight || this.height, p = Math.min(this.computedHeight || this.height, this.width || 20) / 20, g = { x: n / 2, y: d / 2 + a };
    i.lineWidth = (Math.min(n, d) - h * p) / 6;
    const y = (Math.min(n, d) - h * p - i.lineWidth) / 2;
    {
      const T = i.createRadialGradient(
        g.x,
        g.y,
        y + i.lineWidth,
        0,
        0,
        y + i.lineWidth
      );
      T.addColorStop(0, "rgb(29, 29, 29)"), T.addColorStop(1, "rgb(116, 116, 116)"), i.fillStyle = T;
    }
    i.beginPath(), i.arc(
      g.x,
      g.y,
      y + i.lineWidth / 2,
      0,
      Math.PI * 2,
      !1
    ), i.fill(), i.closePath();
    const _ = {
      start_angle: Math.PI * 0.6,
      end_angle: Math.PI * 2.4
    };
    i.beginPath();
    {
      const T = i.createRadialGradient(
        g.x,
        g.y,
        y + i.lineWidth,
        0,
        0,
        y + i.lineWidth
      );
      T.addColorStop(0, "rgb(99, 99, 99)"), T.addColorStop(1, "rgb(36, 36, 36)"), i.strokeStyle = T;
    }
    i.arc(
      g.x,
      g.y,
      y,
      _.start_angle,
      _.end_angle,
      !1
    ), i.stroke(), i.closePath();
    const m = this.options.max - this.options.min;
    let w = (this.value - this.options.min) / m;
    w = clamp(w, 0, 1), i.beginPath();
    const k = i.createConicGradient(
      _.start_angle,
      g.x,
      g.y
    ), I = u.split(";");
    for (const [T, O] of I.entries())
      k.addColorStop(T, O.trim());
    i.strokeStyle = k;
    const N = (_.end_angle - _.start_angle) * w + _.start_angle;
    if (i.arc(
      g.x,
      g.y,
      y,
      _.start_angle,
      N,
      !1
    ), i.stroke(), i.closePath(), s && !this.computedDisabled && (i.strokeStyle = this.outline_color, i.beginPath(), i.strokeStyle = this.outline_color, i.arc(
      g.x,
      g.y,
      y + i.lineWidth / 2,
      0,
      Math.PI * 2,
      !1
    ), i.lineWidth = 1, i.stroke(), i.closePath()), s) {
      i.textAlign = "center", i.fillStyle = this.text_color;
      const T = Number(this.value).toFixed(this.options.precision ?? 3);
      i.fillText(
        `${this.label || this.name}
${T}`,
        n * 0.5,
        a + d * 0.5
      );
    }
    Object.assign(i, { textAlign: l, strokeStyle: r, fillStyle: o });
  }
  onClick() {
    this.current_drag_offset = 0;
  }
  onDrag(i) {
    if (this.options.read_only) return;
    const { e: n } = i, s = getWidgetStep(this.options), o = this.options.max - this.options.min, r = o / 10, l = o / 100, a = {
      shift: r > s ? r - r % s : s,
      delta_y: l > s ? l - l % s : s
      // 1% increments
    }, h = Math.abs(n.movementY) > Math.abs(n.movementX), u = h ? -n.movementY : n.movementX, d = 15;
    this.current_drag_offset += u;
    let p = 0;
    this.current_drag_offset > d ? (p += 1, this.current_drag_offset -= d) : this.current_drag_offset < -15 && (p -= 1, this.current_drag_offset += d);
    const g = n.shiftKey ? a.shift : h ? a.delta_y : s, y = p * g, _ = clamp(
      this.value + y,
      this.options.min,
      this.options.max
    );
    _ !== this.value && this.setValue(_, i);
  }
}
class NumberWidget extends BaseSteppedWidget {
  get displayValue() {
    return Number(this.value).toFixed(
      this.options.precision !== void 0 ? this.options.precision : 3
    );
  }
  constructor(f) {
    super(f), this.type = "number", this.value = f.value;
  }
  canIncrement() {
    const { max: f } = this.options;
    return f == null || this.value < f;
  }
  canDecrement() {
    const { min: f } = this.options;
    return f == null || this.value > f;
  }
  incrementValue(f) {
    this.setValue(this.value + getWidgetStep(this.options), f);
  }
  decrementValue(f) {
    this.setValue(this.value - getWidgetStep(this.options), f);
  }
  setValue(f, t) {
    let i = f;
    this.options.min != null && i < this.options.min && (i = this.options.min), this.options.max != null && i > this.options.max && (i = this.options.max), super.setValue(i, t);
  }
  onClick({ e, node, canvas }) {
    const x = e.canvasX - node.pos[0], width = this.width || node.size[0], delta = x < 40 ? -1 : x > width - 40 ? 1 : 0;
    if (delta) {
      this.setValue(this.value + delta * getWidgetStep(this.options), { e, node, canvas });
      return;
    }
    canvas.prompt("Value", this.value, (v) => {
      if (/^[\d\s()*+/-]+|\d+\.\d+$/.test(v))
        try {
          v = eval(v);
        } catch {
        }
      const newValue = Number(v);
      isNaN(newValue) || this.setValue(newValue, { e, node, canvas });
    }, e);
  }
  /**
   * Handles drag events for the number widget
   * @param options The options for handling the drag event
   */
  onDrag({ e: f, node: t, canvas: i }) {
    const n = this.width || t.width, s = f.canvasX - t.pos[0];
    (s < 40 || s > n - 40) && s > -3 && s < n + 3 || this.setValue(this.value + (f.deltaX ?? 0) * getWidgetStep(this.options), { e: f, node: t, canvas: i });
  }
}
class SliderWidget extends BaseWidget {
  constructor(i) {
    super(i);
    c(this, "marker");
    this.type = "slider", this.value = i.value, this.options = i.options, this.marker = i.marker;
  }
  /**
   * Draws the widget
   * @param ctx The canvas context
   * @param options The options for drawing the widget
   */
  drawWidget(i, {
    width: n,
    showText: s = !0
  }) {
    const { fillStyle: o, strokeStyle: r, textAlign: l } = i, { height: a, y: h } = this, { margin: u } = BaseWidget;
    i.fillStyle = this.background_color, i.fillRect(u, h, n - u * 2, a);
    const d = this.options.max - this.options.min;
    let p = (this.value - this.options.min) / d;
    if (p = clamp(p, 0, 1), i.fillStyle = this.options.slider_color ?? "#678", i.fillRect(u, h, p * (n - u * 2), a), s && !this.computedDisabled && (i.strokeStyle = this.outline_color, i.strokeRect(u, h, n - u * 2, a)), this.marker != null) {
      let g = (this.marker - this.options.min) / d;
      g = clamp(g, 0, 1), i.fillStyle = this.options.marker_color ?? "#AA9", i.fillRect(
        u + g * (n - u * 2),
        h,
        2,
        a
      );
    }
    if (s) {
      i.textAlign = "center", i.fillStyle = this.text_color;
      const g = Number(this.value).toFixed(this.options.precision ?? 3);
      i.fillText(
        `${this.label || this.name}  ${g}`,
        n * 0.5,
        h + a * 0.7
      );
    }
    Object.assign(i, { textAlign: l, strokeStyle: r, fillStyle: o });
  }
  /**
   * Handles click events for the slider widget
   */
  onClick(i) {
    if (this.options.read_only) return;
    const { e: n, node: s } = i, o = this.width || s.size[0], r = n.canvasX - s.pos[0], l = clamp((r - 15) / (o - 30), 0, 1), a = this.options.min + (this.options.max - this.options.min) * l;
    a !== this.value && this.setValue(a, i);
  }
  /**
   * Handles drag events for the slider widget
   */
  onDrag(i) {
    if (this.options.read_only) return !1;
    const { e: n, node: s } = i, o = this.width || s.size[0], r = n.canvasX - s.pos[0], l = clamp((r - 15) / (o - 30), 0, 1), a = this.options.min + (this.options.max - this.options.min) * l;
    a !== this.value && this.setValue(a, i);
  }
}
class TextWidget extends BaseWidget {
  constructor(t) {
    var i;
    super(t), this.type = t.type ?? "string", this.value = ((i = t.value) == null ? void 0 : i.toString()) ?? "";
  }
  /**
   * Draws the widget
   * @param ctx The canvas context
   * @param options The options for drawing the widget
   */
  drawWidget(t, {
    width: i,
    showText: n = !0
  }) {
    const { fillStyle: s, strokeStyle: o, textAlign: r } = t;
    this.drawWidgetShape(t, { width: i, showText: n }), n && this.drawTruncatingText({ ctx: t, width: i, leftPadding: 0, rightPadding: 0 }), Object.assign(t, { textAlign: r, strokeStyle: o, fillStyle: s });
  }
  onClick({ e: t, node: i, canvas: n }) {
    var s;
    n.prompt(
      "Value",
      this.value,
      (o) => {
        o !== null && this.setValue(o, { e: t, node: i, canvas: n });
      },
      t,
      ((s = this.options) == null ? void 0 : s.multiline) ?? !1
    );
  }
}
const WIDGET_TYPE_MAP = {
  // @ts-expect-error https://github.com/Comfy-Org/litegraph.js/issues/616
  button: ButtonWidget,
  // @ts-expect-error #616
  toggle: BooleanWidget,
  // @ts-expect-error #616
  slider: SliderWidget,
  // @ts-expect-error #616
  knob: KnobWidget,
  // @ts-expect-error #616
  combo: ComboWidget,
  // @ts-expect-error #616
  number: NumberWidget,
  // @ts-expect-error #616
  string: TextWidget,
  // @ts-expect-error #616
  text: TextWidget
};
var ht, gt, zt, Ht, M, Ne, Ce, _e, Nt, me, ye, $t, De, Ae, Re, Ge, Pe, Me;
const J = class J {
  constructor(t, i) {
    P(this, M);
    /** The title text of the node. */
    c(this, "title");
    c(this, "graph", null);
    c(this, "id");
    c(this, "type", "");
    c(this, "inputs", []);
    c(this, "outputs", []);
    P(this, ht, []);
    P(this, gt, []);
    c(this, "properties", {});
    c(this, "properties_info", []);
    c(this, "flags", {});
    c(this, "widgets");
    /**
     * The amount of space available for widgets to grow into.
     * @see {@link layoutWidgets}
     */
    c(this, "freeWidgetSpace");
    c(this, "locked");
    /** Execution order, automatically computed during run @see {@link LGraph.computeExecutionOrder} */
    c(this, "order", 0);
    c(this, "mode", LGraphEventMode.ALWAYS);
    c(this, "last_serialization");
    c(this, "serialize_widgets");
    /**
     * The overridden fg color used to render the node.
     * @see {@link renderingColor}
     */
    c(this, "color");
    /**
     * The overridden bg color used to render the node.
     * @see {@link renderingBgColor}
     */
    c(this, "bgcolor");
    /**
     * The overridden box color used to render the node.
     * @see {@link renderingBoxColor}
     */
    c(this, "boxcolor");
    /**
     * The stroke styles that should be applied to the node.
     */
    c(this, "strokeStyles");
    /**
     * The progress of node execution. Used to render a progress bar. Value between 0 and 1.
     */
    c(this, "progress");
    c(this, "exec_version");
    c(this, "action_call");
    c(this, "execute_triggered");
    c(this, "action_triggered");
    c(this, "widgets_up");
    c(this, "widgets_start_y");
    c(this, "lostFocusAt");
    c(this, "gotFocusAt");
    c(this, "badges", []);
    c(this, "badgePosition", BadgePosition.TopLeft);
    /**
     * The width of the node when collapsed.
     * Updated by {@link LGraphCanvas.drawNode}
     */
    c(this, "_collapsed_width");
    c(this, "console");
    c(this, "_level");
    c(this, "_shape");
    c(this, "mouseOver");
    c(this, "redraw_on_mouse");
    c(this, "resizable");
    c(this, "clonable");
    c(this, "_relative_id");
    c(this, "clip_area");
    c(this, "ignore_remove");
    c(this, "has_errors");
    c(this, "removable");
    c(this, "block_delete");
    c(this, "selected");
    c(this, "showAdvanced");
    /** @inheritdoc {@link renderArea} */
    P(this, zt, new Float32Array(4));
    /** @inheritdoc {@link boundingRect} */
    P(this, Ht, new Float32Array(4));
    /** {@link pos} and {@link size} values are backed by this {@link Rect}. */
    c(this, "_posSize", new Float32Array(4));
    c(this, "_pos", this._posSize.subarray(0, 2));
    c(this, "_size", this._posSize.subarray(2, 4));
    this.id = LiteGraph.use_uuids ? LiteGraph.uuidv4() : -1, this.title = t || "Unnamed", this.type = i ?? "", this.size = [LiteGraph.NODE_WIDTH, 60], this.pos = [10, 10], this.strokeStyles = {
      error: S(this, M, Ne),
      selected: S(this, M, Ce)
    };
  }
  /**
   * The font style used to render the node's title text.
   */
  get titleFontStyle() {
    return `${LiteGraph.NODE_TEXT_SIZE}px ${LiteGraph.NODE_FONT}`;
  }
  get innerFontStyle() {
    return `normal ${LiteGraph.NODE_SUBTEXT_SIZE}px ${LiteGraph.NODE_FONT}`;
  }
  /** The fg color used to render the node. */
  get renderingColor() {
    return this.color || this.constructor.color || LiteGraph.NODE_DEFAULT_COLOR;
  }
  /** The bg color used to render the node. */
  get renderingBgColor() {
    return this.bgcolor || this.constructor.bgcolor || LiteGraph.NODE_DEFAULT_BGCOLOR;
  }
  /** The box color used to render the node. */
  get renderingBoxColor() {
    if (this.boxcolor) return this.boxcolor;
    if (LiteGraph.node_box_coloured_when_on) {
      if (this.action_triggered) return "#FFF";
      if (this.execute_triggered) return "#AAA";
    }
    if (LiteGraph.node_box_coloured_by_mode) {
      const t = LiteGraph.NODE_MODES_COLORS[this.mode ?? LGraphEventMode.ALWAYS];
      if (t) return t;
    }
    return LiteGraph.NODE_DEFAULT_BOXCOLOR;
  }
  /** @inheritdoc {@link IColorable.setColorOption} */
  setColorOption(t) {
    t == null ? (delete this.color, delete this.bgcolor) : (this.color = t.color, this.bgcolor = t.bgcolor);
  }
  /** @inheritdoc {@link IColorable.getColorOption} */
  getColorOption() {
    return Object.values(LGraphCanvas.node_colors).find(
      (t) => t.color === this.color && t.bgcolor === this.bgcolor
    ) ?? null;
  }
  /**
   * Rect describing the node area, including shadows and any protrusions.
   * Determines if the node is visible.  Calculated once at the start of every frame.
   */
  get renderArea() {
    return L(this, zt);
  }
  /**
   * Cached node position & area as `x, y, width, height`.  Includes changes made by {@link onBounding}, if present.
   *
   * Determines the node hitbox and other rendering effects.  Calculated once at the start of every frame.
   */
  get boundingRect() {
    return L(this, Ht);
  }
  get pos() {
    return this._pos;
  }
  /** Node position does not necessarily correlate to the top-left corner. */
  set pos(t) {
    !t || t.length < 2 || (this._pos[0] = t[0], this._pos[1] = t[1]);
  }
  get size() {
    return this._size;
  }
  set size(t) {
    !t || t.length < 2 || (this._size[0] = t[0], this._size[1] = t[1]);
  }
  /**
   * The size of the node used for rendering.
   */
  get renderingSize() {
    return this.flags.collapsed ? [this._collapsed_width ?? 0, 0] : this._size;
  }
  get shape() {
    return this._shape;
  }
  set shape(t) {
    switch (t) {
      case "default":
        delete this._shape;
        break;
      case "box":
        this._shape = RenderShape.BOX;
        break;
      case "round":
        this._shape = RenderShape.ROUND;
        break;
      case "circle":
        this._shape = RenderShape.CIRCLE;
        break;
      case "card":
        this._shape = RenderShape.CARD;
        break;
      default:
        this._shape = t;
    }
  }
  /**
   * The shape of the node used for rendering. @see {@link RenderShape}
   */
  get renderingShape() {
    return this._shape || this.constructor.shape || LiteGraph.NODE_DEFAULT_SHAPE;
  }
  get is_selected() {
    return this.selected;
  }
  set is_selected(t) {
    this.selected = t;
  }
  get title_mode() {
    return this.constructor.title_mode ?? TitleMode.NORMAL_TITLE;
  }
  /**
   * configure a node from an object containing the serialized info
   */
  configure(t) {
    var i, n, s, o, r, l, a, h, u;
    this.graph && this.graph._version++;
    for (const d in t) {
      if (d == "properties") {
        for (const p in t.properties)
          this.properties[p] = t.properties[p], (i = this.onPropertyChanged) == null || i.call(this, p, t.properties[p]);
        continue;
      }
      t[d] != null && (typeof t[d] == "object" ? (n = this[d]) != null && n.configure ? (s = this[d]) == null || s.configure(t[d]) : this[d] = LiteGraph.cloneObject(t[d], this[d]) : this[d] = t[d]);
    }
    t.title || (this.title = this.constructor.title), this.inputs ?? (this.inputs = []), this.inputs = this.inputs.map((d) => toClass(NodeInputSlot, d, this));
    for (const [d, p] of this.inputs.entries()) {
      const g = this.graph && p.link != null ? this.graph._links.get(p.link) : null;
      (o = this.onConnectionsChange) == null || o.call(this, NodeSlotType.INPUT, d, !0, g, p), (r = this.onInputAdded) == null || r.call(this, p);
    }
    this.outputs ?? (this.outputs = []), this.outputs = this.outputs.map((d) => toClass(NodeOutputSlot, d, this));
    for (const [d, p] of this.outputs.entries())
      if (p.links) {
        for (const g of p.links) {
          const y = this.graph ? this.graph._links.get(g) : null;
          (l = this.onConnectionsChange) == null || l.call(this, NodeSlotType.OUTPUT, d, !0, y, p);
        }
        (a = this.onOutputAdded) == null || a.call(this, p);
      }
    if (this.widgets) {
      for (const d of this.widgets)
        d && (h = d.options) != null && h.property && this.properties[d.options.property] != null && (d.value = JSON.parse(JSON.stringify(this.properties[d.options.property])));
      if (t.widgets_values) {
        const d = this.widgets.filter((p) => p.serialize !== !1);
        for (let p = 0; p < t.widgets_values.length; ++p) {
          const g = d[p];
          g && (g.value = t.widgets_values[p]);
        }
      }
    }
    this.pinned && (this.resizable = !1), (u = this.onConfigure) == null || u.call(this, t);
  }
  /**
   * serialize the content
   */
  serialize() {
    var n;
    const t = {
      id: this.id,
      type: this.type,
      pos: [this.pos[0], this.pos[1]],
      size: [this.size[0], this.size[1]],
      flags: LiteGraph.cloneObject(this.flags),
      order: this.order,
      mode: this.mode,
      showAdvanced: this.showAdvanced
    };
    if (this.constructor === J && this.last_serialization)
      return this.last_serialization;
    this.inputs && (t.inputs = this.inputs.map((s) => inputAsSerialisable(s))), this.outputs && (t.outputs = this.outputs.map((s) => outputAsSerialisable(s))), this.title && this.title != this.constructor.title && (t.title = this.title), this.properties && (t.properties = LiteGraph.cloneObject(this.properties));
    const { widgets: i } = this;
    if (i && this.serialize_widgets) {
      t.widgets_values = [];
      for (const [s, o] of i.entries())
        o.serialize !== !1 && (t.widgets_values[s] = o ? o.value : null);
    }
    return t.type || (t.type = this.constructor.type), this.color && (t.color = this.color), this.bgcolor && (t.bgcolor = this.bgcolor), this.boxcolor && (t.boxcolor = this.boxcolor), this.shape && (t.shape = this.shape), (n = this.onSerialize) != null && n.call(this, t) && console.warn("node onSerialize shouldnt return anything, data should be stored in the object pass in the first parameter"), t;
  }
  /* Creates a clone of this node */
  clone() {
    if (this.type == null) return null;
    const t = LiteGraph.createNode(this.type);
    if (!t) return null;
    const i = LiteGraph.cloneObject(this.serialize()), { inputs: n, outputs: s } = i;
    if (n)
      for (const o of n)
        o.link = null;
    if (s)
      for (const { links: o } of s)
        o && (o.length = 0);
    return delete i.id, LiteGraph.use_uuids && (i.id = LiteGraph.uuidv4()), t.configure(i), t;
  }
  /**
   * serialize and stringify
   */
  toString() {
    return JSON.stringify(this.serialize());
  }
  /**
   * get the title string
   */
  getTitle() {
    return this.title || this.constructor.title;
  }
  /**
   * sets the value of a property
   * @param name
   * @param value
   */
  setProperty(t, i) {
    var s;
    if (this.properties || (this.properties = {}), i === this.properties[t]) return;
    const n = this.properties[t];
    if (this.properties[t] = i, ((s = this.onPropertyChanged) == null ? void 0 : s.call(this, t, i, n)) === !1 && (this.properties[t] = n), this.widgets) {
      for (const o of this.widgets)
        if (o && o.options.property == t) {
          o.value = i;
          break;
        }
    }
  }
  /**
   * sets the output data
   * @param slot
   * @param data
   */
  setOutputData(t, i) {
    const { outputs: n } = this;
    if (!n || t == -1 || t >= n.length) return;
    const s = n[t];
    if (!s) return;
    if (s._data = i, !this.graph) throw new NullGraphError();
    const { links: o } = n[t];
    if (o)
      for (const r of o) {
        const l = this.graph._links.get(r);
        l && (l.data = i);
      }
  }
  /**
   * sets the output data type, useful when you want to be able to overwrite the data type
   */
  setOutputDataType(t, i) {
    const { outputs: n } = this;
    if (!n || t == -1 || t >= n.length) return;
    const s = n[t];
    if (!s) return;
    if (s.type = i, !this.graph) throw new NullGraphError();
    const { links: o } = n[t];
    if (o)
      for (const r of o) {
        const l = this.graph._links.get(r);
        l && (l.type = i);
      }
  }
  /**
   * Retrieves the input data (data traveling through the connection) from one slot
   * @param slot
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @returns data or if it is not connected returns undefined
   */
  getInputData(t, i) {
    var r;
    if (!this.inputs || t >= this.inputs.length || this.inputs[t].link == null) return;
    if (!this.graph) throw new NullGraphError();
    const n = this.inputs[t].link, s = this.graph._links.get(n);
    if (!s) return null;
    if (!i) return s.data;
    const o = this.graph.getNodeById(s.origin_id);
    return o && (o.updateOutputData ? o.updateOutputData(s.origin_slot) : (r = o.onExecute) == null || r.call(o)), s.data;
  }
  /**
   * Retrieves the input data type (in case this supports multiple input types)
   * @param slot
   * @returns datatype in string format
   */
  getInputDataType(t) {
    if (!this.inputs || t >= this.inputs.length || this.inputs[t].link == null) return null;
    if (!this.graph) throw new NullGraphError();
    const i = this.inputs[t].link, n = this.graph._links.get(i);
    if (!n) return null;
    const s = this.graph.getNodeById(n.origin_id);
    if (!s) return n.type;
    const o = s.outputs[n.origin_slot];
    return o ? o.type : null;
  }
  /**
   * Retrieves the input data from one slot using its name instead of slot number
   * @param slot_name
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @returns data or if it is not connected returns null
   */
  getInputDataByName(t, i) {
    const n = this.findInputSlot(t);
    return n == -1 ? null : this.getInputData(n, i);
  }
  /**
   * tells you if there is a connection in one input slot
   * @param slot The 0-based index of the input to check
   * @returns `true` if the input slot has a link ID (does not perform validation)
   */
  isInputConnected(t) {
    return this.inputs ? t < this.inputs.length && this.inputs[t].link != null : !1;
  }
  /**
   * tells you info about an input connection (which node, type, etc)
   * @returns object or null { link: id, name: string, type: string or 0 }
   */
  getInputInfo(t) {
    return !this.inputs || !(t < this.inputs.length) ? null : this.inputs[t];
  }
  /**
   * Returns the link info in the connection of an input slot
   * @returns object or null
   */
  getInputLink(t) {
    if (!this.inputs) return null;
    if (t < this.inputs.length) {
      if (!this.graph) throw new NullGraphError();
      const i = this.inputs[t];
      if (i.link != null)
        return this.graph._links.get(i.link) ?? null;
    }
    return null;
  }
  /**
   * returns the node connected in the input slot
   * @returns node or null
   */
  getInputNode(t) {
    if (!this.inputs || t >= this.inputs.length) return null;
    const i = this.inputs[t];
    if (!i || i.link === null) return null;
    if (!this.graph) throw new NullGraphError();
    const n = this.graph._links.get(i.link);
    return n ? this.graph.getNodeById(n.origin_id) : null;
  }
  /**
   * returns the value of an input with this name, otherwise checks if there is a property with that name
   * @returns value
   */
  getInputOrProperty(t) {
    const { inputs: i } = this;
    if (!(i != null && i.length))
      return this.properties ? this.properties[t] : null;
    if (!this.graph) throw new NullGraphError();
    for (const n of i)
      if (t == n.name && n.link != null) {
        const s = this.graph._links.get(n.link);
        if (s) return s.data;
      }
    return this.properties[t];
  }
  /**
   * tells you the last output data that went in that slot
   * @returns object or null
   */
  getOutputData(t) {
    return !this.outputs || t >= this.outputs.length ? null : this.outputs[t]._data;
  }
  /**
   * tells you info about an output connection (which node, type, etc)
   * @returns object or null { name: string, type: string, links: [ ids of links in number ] }
   */
  getOutputInfo(t) {
    return !this.outputs || !(t < this.outputs.length) ? null : this.outputs[t];
  }
  /**
   * tells you if there is a connection in one output slot
   */
  isOutputConnected(t) {
    var i;
    return this.outputs ? t < this.outputs.length && Number((i = this.outputs[t].links) == null ? void 0 : i.length) > 0 : !1;
  }
  /**
   * tells you if there is any connection in the output slots
   */
  isAnyOutputConnected() {
    var i;
    const { outputs: t } = this;
    if (!t) return !1;
    for (const n of t)
      if ((i = n.links) != null && i.length) return !0;
    return !1;
  }
  /**
   * retrieves all the nodes connected to this output slot
   */
  getOutputNodes(t) {
    const { outputs: i } = this;
    if (!i || i.length == 0 || t >= i.length) return null;
    const { links: n } = i[t];
    if (!n || n.length == 0) return null;
    if (!this.graph) throw new NullGraphError();
    const s = [];
    for (const o of n) {
      const r = this.graph._links.get(o);
      if (r) {
        const l = this.graph.getNodeById(r.target_id);
        l && s.push(l);
      }
    }
    return s;
  }
  addOnTriggerInput() {
    const t = this.findInputSlot("onTrigger");
    return t == -1 ? (this.addInput("onTrigger", LiteGraph.EVENT, {
      nameLocked: !0
    }), this.findInputSlot("onTrigger")) : t;
  }
  addOnExecutedOutput() {
    const t = this.findOutputSlot("onExecuted");
    return t == -1 ? (this.addOutput("onExecuted", LiteGraph.ACTION, {
      nameLocked: !0
    }), this.findOutputSlot("onExecuted")) : t;
  }
  onAfterExecuteNode(t, i) {
    const n = this.findOutputSlot("onExecuted");
    n != -1 && this.triggerSlot(n, t, null, i);
  }
  changeMode(t) {
    switch (t) {
      case LGraphEventMode.ON_EVENT:
        break;
      case LGraphEventMode.ON_TRIGGER:
        this.addOnTriggerInput(), this.addOnExecutedOutput();
        break;
      case LGraphEventMode.NEVER:
        break;
      case LGraphEventMode.ALWAYS:
        break;
      // @ts-expect-error Not impl.
      case LiteGraph.ON_REQUEST:
        break;
      default:
        return !1;
    }
    return this.mode = t, !0;
  }
  /**
   * Triggers the node code execution, place a boolean/counter to mark the node as being executed
   */
  doExecute(t, i) {
    var n;
    if (i = i || {}, this.onExecute) {
      if (i.action_call || (i.action_call = `${this.id}_exec_${Math.floor(Math.random() * 9999)}`), !this.graph) throw new NullGraphError();
      this.graph.nodes_executing[this.id] = !0, this.onExecute(t, i), this.graph.nodes_executing[this.id] = !1, this.exec_version = this.graph.iteration, i != null && i.action_call && (this.action_call = i.action_call, this.graph.nodes_executedAction[this.id] = i.action_call);
    }
    this.execute_triggered = 2, (n = this.onAfterExecuteNode) == null || n.call(this, t, i);
  }
  /**
   * Triggers an action, wrapped by logics to control execution flow
   * @param action name
   */
  actionDo(t, i, n) {
    var s;
    if (n = n || {}, this.onAction) {
      if (n.action_call || (n.action_call = `${this.id}_${t || "action"}_${Math.floor(Math.random() * 9999)}`), !this.graph) throw new NullGraphError();
      this.graph.nodes_actioning[this.id] = t || "actioning", this.onAction(t, i, n), this.graph.nodes_actioning[this.id] = !1, n != null && n.action_call && (this.action_call = n.action_call, this.graph.nodes_executedAction[this.id] = n.action_call);
    }
    this.action_triggered = 2, (s = this.onAfterExecuteNode) == null || s.call(this, i, n);
  }
  /**
   * Triggers an event in this node, this will trigger any output with the same name
   * @param action name ( "on_play", ... ) if action is equivalent to false then the event is send to all
   */
  trigger(t, i, n) {
    const { outputs: s } = this;
    if (!(!s || !s.length)) {
      this.graph && (this.graph._last_trigger_time = LiteGraph.getTime());
      for (const [o, r] of s.entries())
        !r || r.type !== LiteGraph.EVENT || t && r.name != t || this.triggerSlot(o, i, null, n);
    }
  }
  /**
   * Triggers a slot event in this node: cycle output slots and launch execute/action on connected nodes
   * @param slot the index of the output slot
   * @param link_id [optional] in case you want to trigger and specific output link in a slot
   */
  triggerSlot(t, i, n, s) {
    var l;
    if (s = s || {}, !this.outputs) return;
    if (t == null) {
      console.error("slot must be a number");
      return;
    }
    typeof t != "number" && console.warn("slot must be a number, use node.trigger('name') if you want to use a string");
    const o = this.outputs[t];
    if (!o) return;
    const r = o.links;
    if (!(!r || !r.length)) {
      if (!this.graph) throw new NullGraphError();
      this.graph._last_trigger_time = LiteGraph.getTime();
      for (const a of r) {
        if (n != null && n != a) continue;
        const h = this.graph._links.get(a);
        if (!h) continue;
        h._last_time = LiteGraph.getTime();
        const u = this.graph.getNodeById(h.target_id);
        if (u) {
          if (u.mode === LGraphEventMode.ON_TRIGGER)
            s.action_call || (s.action_call = `${this.id}_trigg_${Math.floor(Math.random() * 9999)}`), (l = u.doExecute) == null || l.call(u, i, s);
          else if (u.onAction) {
            s.action_call || (s.action_call = `${this.id}_act_${Math.floor(Math.random() * 9999)}`);
            const d = u.inputs[h.target_slot];
            u.actionDo(d.name, i, s);
          }
        }
      }
    }
  }
  /**
   * clears the trigger slot animation
   * @param slot the index of the output slot
   * @param link_id [optional] in case you want to trigger and specific output link in a slot
   */
  clearTriggeredSlot(t, i) {
    if (!this.outputs) return;
    const n = this.outputs[t];
    if (!n) return;
    const s = n.links;
    if (!(!s || !s.length)) {
      if (!this.graph) throw new NullGraphError();
      for (const o of s) {
        if (i != null && i != o) continue;
        const r = this.graph._links.get(o);
        r && (r._last_time = 0);
      }
    }
  }
  /**
   * changes node size and triggers callback
   */
  setSize(t) {
    var i;
    this.size = t, (i = this.onResize) == null || i.call(this, this.size);
  }
  /**
   * Expands the node size to fit its content.
   */
  expandToFitContent() {
    const t = this.computeSize();
    this.setSize([
      Math.max(this.size[0], t[0]),
      Math.max(this.size[1], t[1])
    ]);
  }
  /**
   * add a new property to this node
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of the property (like values, etc)
   */
  addProperty(t, i, n, s) {
    const o = { name: t, type: n, default_value: i };
    return s && Object.assign(o, s), this.properties_info || (this.properties_info = []), this.properties_info.push(o), this.properties || (this.properties = {}), this.properties[t] = i, o;
  }
  /**
   * add a new output slot to use in this node
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of an output (label, special color, position, etc)
   */
  addOutput(t, i, n) {
    var o;
    const s = new NodeOutputSlot({ name: t, type: i, links: null }, this);
    return n && Object.assign(s, n), this.outputs || (this.outputs = []), this.outputs.push(s), (o = this.onOutputAdded) == null || o.call(this, s), LiteGraph.auto_load_slot_types && LiteGraph.registerNodeAndSlotType(this, i, !0), this.expandToFitContent(), this.setDirtyCanvas(!0, !0), s;
  }
  /**
   * remove an existing output slot
   */
  removeOutput(t) {
    var n;
    this.disconnectOutput(t);
    const { outputs: i } = this;
    i.splice(t, 1);
    for (let s = t; s < i.length; ++s) {
      const o = i[s];
      if (!(!o || !o.links))
        for (const r of o.links) {
          if (!this.graph) throw new NullGraphError();
          const l = this.graph._links.get(r);
          l && l.origin_slot--;
        }
    }
    (n = this.onOutputRemoved) == null || n.call(this, t), this.setDirtyCanvas(!0, !0);
  }
  /**
   * add a new input slot to use in this node
   * @param type string defining the input type ("vec3","number",...), it its a generic one use 0
   * @param extra_info this can be used to have special properties of an input (label, color, position, etc)
   */
  addInput(t, i, n) {
    var o;
    i = i || 0;
    const s = new NodeInputSlot({ name: t, type: i, link: null }, this);
    return n && Object.assign(s, n), this.inputs || (this.inputs = []), this.inputs.push(s), this.expandToFitContent(), (o = this.onInputAdded) == null || o.call(this, s), LiteGraph.registerNodeAndSlotType(this, i), this.setDirtyCanvas(!0, !0), s;
  }
  /**
   * remove an existing input slot
   */
  removeInput(t) {
    var s;
    this.disconnectInput(t, !0);
    const { inputs: i } = this, n = i.splice(t, 1);
    for (let o = t; o < i.length; ++o) {
      const r = i[o];
      if (!(r != null && r.link)) continue;
      if (!this.graph) throw new NullGraphError();
      const l = this.graph._links.get(r.link);
      l && l.target_slot--;
    }
    (s = this.onInputRemoved) == null || s.call(this, t, n[0]), this.setDirtyCanvas(!0, !0);
  }
  /**
   * computes the minimum size of a node according to its inputs and output slots
   * @returns the total size
   */
  computeSize(t) {
    const i = this.constructor.size;
    if (i) return [i[0], i[1]];
    const { inputs: n, outputs: s, widgets: o } = this;
    let r = Math.max(
      n ? n.filter((O) => !isWidgetInputSlot(O)).length : 1,
      s ? s.length : 1
    );
    const l = t || new Float32Array([0, 0]);
    r = Math.max(r, 1);
    const a = LiteGraph.NODE_TEXT_SIZE, h = LiteGraph.NODE_TITLE_HEIGHT, u = h * 0.33, d = h + T(this.title, this.titleFontStyle) + u;
    let p = 0, g = 0, y = 0;
    if (n)
      for (const O of n) {
        const A = O.label || O.localized_name || O.name || "", G = T(A, this.innerFontStyle);
        if (isWidgetInputSlot(O)) {
          const b = this.getWidgetFromSlot(O);
          if (b && !this.isWidgetVisible(b)) continue;
          G > g && (g = G);
        } else
          G > p && (p = G);
      }
    if (s)
      for (const O of s) {
        const A = O.label || O.localized_name || O.name || "", G = T(A, this.innerFontStyle);
        y < G && (y = G);
      }
    const _ = LiteGraph.NODE_WIDTH * (o != null && o.length ? 1.5 : 1), m = p && y ? 5 : 0, w = p + y + 2 * LiteGraph.NODE_SLOT_HEIGHT + m, k = BaseWidget.margin + BaseWidget.arrowMargin + BaseWidget.arrowWidth, I = BaseWidget.minValueWidth + 2 * k;
    g && (g += I), l[0] = Math.max(w, g, d, _), l[1] = (this.constructor.slot_start_y || 0) + r * LiteGraph.NODE_SLOT_HEIGHT;
    let N = 0;
    if (o != null && o.length) {
      for (const O of o) {
        if (!this.isWidgetVisible(O)) continue;
        let A = 0;
        if (O.computeSize)
          A += O.computeSize(l[0])[1];
        else if (O.computeLayoutSize) {
          const { minHeight: G, minWidth: b } = O.computeLayoutSize(this), R = b + I;
          R > l[0] && (l[0] = R), A += G;
        } else
          A += LiteGraph.NODE_WIDGET_HEIGHT;
        N += A + 4;
      }
      N += 8;
    }
    this.widgets_up ? l[1] = Math.max(l[1], N) : this.widgets_start_y != null ? l[1] = Math.max(l[1], N + this.widgets_start_y) : l[1] += N;
    function T(O, A) {
      var G;
      return ((G = LGraphCanvas._measureText) == null ? void 0 : G.call(LGraphCanvas, O, A)) ?? a * ((O == null ? void 0 : O.length) ?? 0) * 0.6;
    }
    return this.constructor.min_height && l[1] < this.constructor.min_height && (l[1] = this.constructor.min_height), l[1] += 6, l;
  }
  inResizeCorner(t, i) {
    const n = this.outputs ? this.outputs.length : 1, s = (this.constructor.slot_start_y || 0) + n * LiteGraph.NODE_SLOT_HEIGHT;
    return isInRectangle(
      t,
      i,
      this.pos[0] + this.size[0] - 15,
      this.pos[1] + Math.max(this.size[1] - 15, s),
      20,
      20
    );
  }
  /**
   * returns all the info available about a property of this node.
   * @param property name of the property
   * @returns the object with all the available info
   */
  getPropertyInfo(t) {
    var s;
    let i = null;
    const { properties_info: n } = this;
    if (n) {
      for (const o of n)
        if (o.name == t) {
          i = o;
          break;
        }
    }
    return this.constructor[`@${t}`] && (i = this.constructor[`@${t}`]), (s = this.constructor.widgets_info) != null && s[t] && (i = this.constructor.widgets_info[t]), !i && this.onGetPropertyInfo && (i = this.onGetPropertyInfo(t)), i || (i = {}), i.type || (i.type = typeof this.properties[t]), i.widget == "combo" && (i.type = "enum"), i;
  }
  /**
   * Defines a widget inside the node, it will be rendered on top of the node, you can control lots of properties
   * @param type the widget type
   * @param name the text to show on the widget
   * @param value the default value
   * @param callback function to call when it changes (optionally, it can be the name of the property to modify)
   * @param options the object that contains special properties of this widget
   * @returns the created widget object
   */
  addWidget(t, i, n, s, o) {
    this.widgets || (this.widgets = []), !o && s && typeof s == "object" && (o = s, s = null), o || (o = {}), typeof o == "string" && (o = { property: o }), s && typeof s == "string" && (o.property = s, s = null);
    const r = {
      // @ts-expect-error Type check or just assert?
      type: t.toLowerCase(),
      name: i,
      value: n,
      callback: typeof s != "function" ? void 0 : s,
      options: o,
      y: 0
    };
    if (r.options.y !== void 0 && (r.y = r.options.y), !s && !r.options.callback && !r.options.property && console.warn("LiteGraph addWidget(...) without a callback or property assigned"), t == "combo" && !r.options.values)
      throw "LiteGraph addWidget('combo',...) requires to pass values in options: { values:['red','blue'] }";
    const l = this.addCustomWidget(r);
    return this.expandToFitContent(), l;
  }
  addCustomWidget(t) {
    this.widgets || (this.widgets = []);
    const i = WIDGET_TYPE_MAP[t.type], n = i ? new i(t) : t;
    return this.widgets.push(n), n;
  }
  move(t, i) {
    this.pinned || (this.pos[0] += t, this.pos[1] += i);
  }
  /**
   * Internal method to measure the node for rendering.  Prefer {@link boundingRect} where possible.
   *
   * Populates {@link out} with the results in graph space.
   * Populates {@link _collapsed_width} with the collapsed width if the node is collapsed.
   * Adjusts for title and collapsed status, but does not call {@link onBounding}.
   * @param out `x, y, width, height` are written to this array.
   * @param ctx The canvas context to use for measuring text.
   */
  measure(t, i) {
    var r;
    const n = this.title_mode, o = n != TitleMode.TRANSPARENT_TITLE && n != TitleMode.NO_TITLE ? LiteGraph.NODE_TITLE_HEIGHT : 0;
    t[0] = this.pos[0], t[1] = this.pos[1] + -o, (r = this.flags) != null && r.collapsed ? (i.font = this.innerFontStyle, this._collapsed_width = Math.min(
      this.size[0],
      i.measureText(this.getTitle() ?? "").width + LiteGraph.NODE_TITLE_HEIGHT * 2
    ), t[2] = this._collapsed_width || LiteGraph.NODE_COLLAPSED_WIDTH, t[3] = LiteGraph.NODE_TITLE_HEIGHT) : (t[2] = this.size[0], t[3] = this.size[1] + o);
  }
  /**
   * returns the bounding of the object, used for rendering purposes
   * @param out {Float32Array[4]?} [optional] a place to store the output, to free garbage
   * @param includeExternal {boolean?} [optional] set to true to
   * include the shadow and connection points in the bounding calculation
   * @returns the bounding box in format of [topleft_cornerx, topleft_cornery, width, height]
   */
  getBounding(t, i) {
    t || (t = new Float32Array(4));
    const n = i ? this.renderArea : this.boundingRect;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t;
  }
  /**
   * Calculates the render area of this node, populating both {@link boundingRect} and {@link renderArea}.
   * Called automatically at the start of every frame.
   */
  updateArea(t) {
    var s;
    const i = L(this, Ht);
    this.measure(i, t), (s = this.onBounding) == null || s.call(this, i);
    const n = L(this, zt);
    n.set(i), n[0] -= 4, n[1] -= 4, n[2] += 10, n[3] += 9;
  }
  /**
   * checks if a point is inside the shape of a node
   */
  isPointInside(t, i) {
    return isInRect(t, i, this.boundingRect);
  }
  /**
   * Checks if the provided point is inside this node's collapse button area.
   * @param x X co-ordinate to check
   * @param y Y co-ordinate to check
   * @returns true if the x,y point is in the collapse button area, otherwise false
   */
  isPointInCollapse(t, i) {
    const n = LiteGraph.NODE_TITLE_HEIGHT;
    return isInRectangle(
      t,
      i,
      this.pos[0],
      this.pos[1] - n,
      n,
      n
    );
  }
  /**
   * Returns the input slot at the given position. Uses full 20 height, and approximates the label length.
   * @param pos The graph co-ordinates to check
   * @returns The input slot at the given position if found, otherwise `undefined`.
   */
  getInputOnPos(t) {
    var i;
    return (i = getNodeInputOnPos(this, t[0], t[1])) == null ? void 0 : i.input;
  }
  /**
   * Returns the output slot at the given position. Uses full 20x20 box for the slot.
   * @param pos The graph co-ordinates to check
   * @returns The output slot at the given position if found, otherwise `undefined`.
   */
  getOutputOnPos(t) {
    var i;
    return (i = getNodeOutputOnPos(this, t[0], t[1])) == null ? void 0 : i.output;
  }
  /**
   * Returns the input or output slot at the given position.
   *
   * Tries {@link getNodeInputOnPos} first, then {@link getNodeOutputOnPos}.
   * @param pos The graph co-ordinates to check
   * @returns The input or output slot at the given position if found, otherwise `undefined`.
   */
  getSlotOnPos(t) {
    if (isPointInRect(t, this.boundingRect))
      return this.getInputOnPos(t) ?? this.getOutputOnPos(t);
  }
  /**
   * @deprecated Use {@link getSlotOnPos} instead.
   * checks if a point is inside a node slot, and returns info about which slot
   * @param x
   * @param y
   * @returns if found the object contains { input|output: slot object, slot: number, link_pos: [x,y] }
   */
  getSlotInPosition(t, i) {
    const { inputs: n, outputs: s } = this;
    if (n)
      for (const [o, r] of n.entries()) {
        const l = this.getInputPos(o);
        if (isInRectangle(t, i, l[0] - 10, l[1] - 10, 20, 20))
          return { input: r, slot: o, link_pos: l };
      }
    if (s)
      for (const [o, r] of s.entries()) {
        const l = this.getOutputPos(o);
        if (isInRectangle(t, i, l[0] - 10, l[1] - 10, 20, 20))
          return { output: r, slot: o, link_pos: l };
      }
    return null;
  }
  /**
   * Gets the widget on this node at the given co-ordinates.
   * @param canvasX X co-ordinate in graph space
   * @param canvasY Y co-ordinate in graph space
   * @returns The widget found, otherwise `null`
   */
  getWidgetOnPos(t, i, n = !1) {
    var u;
    const { widgets: s, pos: o, size: r } = this;
    if (!(s != null && s.length)) return null;
    const l = t - o[0], a = i - o[1], h = r[0];
    for (const d of s) {
      if (d.computedDisabled && !n || !this.isWidgetVisible(d))
        continue;
      const p = d.computedHeight ?? ((u = d.computeSize) == null ? void 0 : u.call(d, h)[1]) ?? LiteGraph.NODE_WIDGET_HEIGHT, g = d.width || h;
      if (d.last_y !== void 0 && isInRectangle(l, a, 6, d.last_y, g - 12, p))
        return d;
    }
    return null;
  }
  findInputSlot(t, i = !1) {
    const { inputs: n } = this;
    if (!n) return -1;
    for (const [s, o] of n.entries())
      if (t == o.name)
        return i ? o : s;
    return -1;
  }
  findOutputSlot(t, i = !1) {
    const { outputs: n } = this;
    if (!n) return -1;
    for (const [s, o] of n.entries())
      if (t == o.name)
        return i ? o : s;
    return -1;
  }
  findInputSlotFree(t) {
    return S(this, M, _e).call(this, this.inputs, t);
  }
  findOutputSlotFree(t) {
    return S(this, M, _e).call(this, this.outputs, t);
  }
  findInputSlotByType(t, i, n, s) {
    return S(this, M, Nt).call(this, this.inputs, t, i, n, s);
  }
  findOutputSlotByType(t, i, n, s) {
    return S(this, M, Nt).call(this, this.outputs, t, i, n, s);
  }
  findSlotByType(t, i, n, s, o) {
    return t ? S(this, M, Nt).call(this, this.inputs, i, n, s, o) : S(this, M, Nt).call(this, this.outputs, i, n, s, o);
  }
  /**
   * Determines the slot index to connect to when attempting to connect by type.
   * @param findInputs If true, searches for an input.  Otherwise, an output.
   * @param node The node at the other end of the connection.
   * @param slotType The type of slot at the other end of the connection.
   * @param options Search restrictions to adhere to.
   * @see {connectByType}
   * @see {connectByTypeOutput}
   */
  findConnectByTypeSlot(t, i, n, s) {
    s && typeof s == "object" && ("firstFreeIfInputGeneralInCase" in s && (s.wildcardToTyped = !!s.firstFreeIfInputGeneralInCase), "firstFreeIfOutputGeneralInCase" in s && (s.wildcardToTyped = !!s.firstFreeIfOutputGeneralInCase), "generalTypeInCase" in s && (s.typedToWildcard = !!s.generalTypeInCase));
    const r = Object.assign({
      createEventInCase: !0,
      wildcardToTyped: !0,
      typedToWildcard: !0
    }, s);
    if (!this.graph) throw new NullGraphError();
    if (i && typeof i == "number") {
      const a = this.graph.getNodeById(i);
      if (!a) return;
      i = a;
    }
    const l = i.findSlotByType(t, n, !1, !0);
    if (l >= 0 && l !== null) return l;
    if (r.createEventInCase && n == LiteGraph.EVENT) {
      if (t) return -1;
      if (LiteGraph.do_add_triggers_slots) return i.addOnExecutedOutput();
    }
    if (r.typedToWildcard) {
      const a = i.findSlotByType(t, 0, !1, !0, !0);
      if (a >= 0) return a;
    }
    if (r.wildcardToTyped && (n == 0 || n == "*" || n == "")) {
      const a = { typesNotAccepted: [LiteGraph.EVENT] }, h = t ? i.findInputSlotFree(a) : i.findOutputSlotFree(a);
      if (h >= 0) return h;
    }
  }
  /**
   * Finds the first free output slot with any of the comma-delimited types in {@link type}.
   *
   * If no slots are free, falls back in order to:
   * - The first free wildcard slot
   * - The first occupied slot
   * - The first occupied wildcard slot
   * @param type The {@link ISlotType type} of slot to find
   * @returns The index and slot if found, otherwise `undefined`.
   */
  findOutputByType(t) {
    return findFreeSlotOfType(this.outputs, t);
  }
  /**
   * Finds the first free input slot with any of the comma-delimited types in {@link type}.
   *
   * If no slots are free, falls back in order to:
   * - The first free wildcard slot
   * - The first occupied slot
   * - The first occupied wildcard slot
   * @param type The {@link ISlotType type} of slot to find
   * @returns The index and slot if found, otherwise `undefined`.
   */
  findInputByType(t) {
    return findFreeSlotOfType(this.inputs, t);
  }
  /**
   * connect this node output to the input of another node BY TYPE
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param target_node the target node
   * @param target_slotType the input slot type of the target node
   * @returns the link_info is created, otherwise null
   */
  connectByType(t, i, n, s) {
    const o = this.findConnectByTypeSlot(
      !0,
      i,
      n,
      s
    );
    return o !== void 0 ? this.connect(t, i, o, s == null ? void 0 : s.afterRerouteId) : (console.debug("[connectByType]: no way to connect type:", n, "to node:", i), null);
  }
  /**
   * connect this node input to the output of another node BY TYPE
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param source_node the target node
   * @param source_slotType the output slot type of the target node
   * @returns the link_info is created, otherwise null
   */
  connectByTypeOutput(t, i, n, s) {
    typeof s == "object" && ("firstFreeIfInputGeneralInCase" in s && (s.wildcardToTyped = !!s.firstFreeIfInputGeneralInCase), "generalTypeInCase" in s && (s.typedToWildcard = !!s.generalTypeInCase));
    const o = this.findConnectByTypeSlot(
      !1,
      i,
      n,
      s
    );
    return o !== void 0 ? i.connect(o, this, t, s == null ? void 0 : s.afterRerouteId) : (console.debug("[connectByType]: no way to connect type:", n, "to node:", i), null);
  }
  canConnectTo(t, i, n) {
    return this.id !== t.id && LiteGraph.isValidConnection(n.type, i.type);
  }
  /**
   * Connect an output of this node to an input of another node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param target_node the target node
   * @param target_slot the input slot of the target node (could be the number of the slot or the string with the name of the slot, or -1 to connect a trigger)
   * @returns the link_info is created, otherwise null
   */
  connect(t, i, n, s) {
    var d;
    let o;
    const { graph: r, outputs: l } = this;
    if (!r)
      return console.log("Connect: Error, node doesn't belong to any graph. Nodes must be added first to a graph before connecting them."), null;
    if (typeof t == "string") {
      if (t = this.findOutputSlot(t), t == -1)
        return LiteGraph.debug && console.log(`Connect: Error, no slot of name ${t}`), null;
    } else if (!l || t >= l.length)
      return LiteGraph.debug && console.log("Connect: Error, slot number not found"), null;
    if (i && typeof i == "number") {
      const p = r.getNodeById(i);
      if (!p) throw "target node is null";
      i = p;
    }
    if (!i) throw "target node is null";
    if (i == this) return null;
    if (typeof n == "string") {
      if (o = i.findInputSlot(n), o == -1)
        return LiteGraph.debug && console.log(`Connect: Error, no slot of name ${o}`), null;
    } else if (n === LiteGraph.EVENT)
      if (LiteGraph.do_add_triggers_slots)
        i.changeMode(LGraphEventMode.ON_TRIGGER), o = i.findInputSlot("onTrigger");
      else
        return null;
    else typeof n == "number" ? o = n : o = 0;
    if (i.onBeforeConnectInput) {
      const p = i.onBeforeConnectInput(o, n);
      o = typeof p == "number" ? p : null;
    }
    if (o === null || !i.inputs || o >= i.inputs.length)
      return LiteGraph.debug && console.log("Connect: Error, slot number not found"), null;
    const a = i.inputs[o], h = l[t];
    return h ? ((d = h.links) != null && d.length && h.type === LiteGraph.EVENT && !LiteGraph.allow_multi_output_for_events && (r.beforeChange(), this.disconnectOutput(t, !1, { doProcessChange: !1 })), this.connectSlots(h, i, a, s) ?? null) : null;
  }
  /**
   * Connect two slots between two nodes
   * @param output The output slot to connect
   * @param inputNode The node that the input slot is on
   * @param input The input slot to connect
   * @param afterRerouteId The reroute ID to use for the link
   * @returns The link that was created, or null if the connection was blocked
   */
  connectSlots(t, i, n, s) {
    var d, p, g, y, _;
    const { graph: o } = this;
    if (!o) throw new NullGraphError();
    const r = this.outputs.indexOf(t);
    if (r === -1) {
      console.warn("connectSlots: output not found");
      return;
    }
    const l = i.inputs.indexOf(n);
    if (l === -1) {
      console.warn("connectSlots: input not found");
      return;
    }
    if (!LiteGraph.isValidConnection(t.type, n.type))
      return this.setDirtyCanvas(!1, !0), null;
    if (((d = i.onConnectInput) == null ? void 0 : d.call(i, l, t.type, t, this, r)) === !1 || ((p = this.onConnectOutput) == null ? void 0 : p.call(this, r, n.type, n, i, l)) === !1)
      return null;
    ((g = i.inputs[l]) == null ? void 0 : g.link) != null && (o.beforeChange(), i.disconnectInput(l, !0));
    const a = new LLink(
      ++o.state.lastLinkId,
      n.type || t.type,
      this.id,
      r,
      i.id,
      l,
      s
    );
    o._links.set(a.id, a), t.links ?? (t.links = []), t.links.push(a.id), i.inputs[l].link = a.id;
    const h = LLink.getReroutes(o, a);
    for (const m of h)
      m.linkIds.add(a.id), m.floating && delete m.floating, m._dragging = void 0;
    const u = h.at(-1);
    if (u)
      for (const m of u.floatingLinkIds) {
        const w = o.floatingLinks.get(m);
        (w == null ? void 0 : w.parentId) === u.id && o.removeFloatingLink(w);
      }
    return o._version++, (y = this.onConnectionsChange) == null || y.call(
      this,
      NodeSlotType.OUTPUT,
      r,
      !0,
      a,
      t
    ), (_ = i.onConnectionsChange) == null || _.call(
      i,
      NodeSlotType.INPUT,
      l,
      !0,
      a,
      n
    ), this.setDirtyCanvas(!1, !0), o.afterChange(), o.connectionChange(this), a;
  }
  connectFloatingReroute(t, i, n) {
    var g, y;
    const { graph: s, id: o } = this;
    if (!s) throw new NullGraphError();
    const r = this.inputs.indexOf(i), l = this.outputs.indexOf(i);
    if (r === -1 && l === -1) throw new Error("Invalid slot");
    const a = l === -1 ? "input" : "output", h = s.setReroute({
      pos: t,
      parentId: n,
      linkIds: [],
      floating: { slotType: a }
    }), u = s.getReroute(n), d = ((g = u == null ? void 0 : u.floating) == null ? void 0 : g.slotType) === "output";
    if (n == null || !d) {
      const _ = new LLink(
        -1,
        i.type,
        l === -1 ? -1 : o,
        l,
        r === -1 ? -1 : o,
        r
      );
      return _.parentId = h.id, s.addFloatingLink(_), h;
    }
    if (!u) throw new Error("[connectFloatingReroute] Parent reroute not found");
    const p = (y = u.getFloatingLinks("output")) == null ? void 0 : y[0];
    if (!p) throw new Error("[connectFloatingReroute] Floating link not found");
    return h.floatingLinkIds.add(p.id), p.parentId = h.id, delete u.floating, h;
  }
  /**
   * disconnect one output to an specific node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param target_node the target node to which this slot is connected [Optional,
   * if not target_node is specified all nodes will be disconnected]
   * @returns if it was disconnected successfully
   */
  disconnectOutput(t, i) {
    var r, l, a, h, u;
    if (typeof t == "string") {
      if (t = this.findOutputSlot(t), t == -1)
        return LiteGraph.debug && console.log(`Connect: Error, no slot of name ${t}`), !1;
    } else if (!this.outputs || t >= this.outputs.length)
      return LiteGraph.debug && console.log("Connect: Error, slot number not found"), !1;
    const n = this.outputs[t];
    if (!n) return !1;
    if (n._floatingLinks)
      for (const d of n._floatingLinks)
        d.hasOrigin(this.id, t) && ((r = this.graph) == null || r.removeFloatingLink(d));
    if (!n.links || n.links.length == 0) return !1;
    const { links: s } = n, o = this.graph;
    if (!o) throw new NullGraphError();
    if (i) {
      const d = typeof i == "number" ? o.getNodeById(i) : i;
      if (!d) throw "Target Node not found";
      for (const [p, g] of s.entries()) {
        const y = o._links.get(g);
        if ((y == null ? void 0 : y.target_id) != d.id) continue;
        s.splice(p, 1);
        const _ = d.inputs[y.target_slot];
        _.link = null, y.disconnect(o, "input"), o._version++, (l = d.onConnectionsChange) == null || l.call(
          d,
          NodeSlotType.INPUT,
          y.target_slot,
          !1,
          y,
          _
        ), (a = this.onConnectionsChange) == null || a.call(
          this,
          NodeSlotType.OUTPUT,
          t,
          !1,
          y,
          n
        );
        break;
      }
    } else {
      for (const d of s) {
        const p = o._links.get(d);
        if (!p) continue;
        const g = o.getNodeById(p.target_id);
        if (o._version++, g) {
          const y = g.inputs[p.target_slot];
          y.link = null, (h = g.onConnectionsChange) == null || h.call(
            g,
            NodeSlotType.INPUT,
            p.target_slot,
            !1,
            p,
            y
          );
        }
        p.disconnect(o, "input"), (u = this.onConnectionsChange) == null || u.call(
          this,
          NodeSlotType.OUTPUT,
          t,
          !1,
          p,
          n
        );
      }
      n.links = null;
    }
    return this.setDirtyCanvas(!1, !0), o.connectionChange(this), !0;
  }
  /**
   * Disconnect one input
   * @param slot Input slot index, or the name of the slot
   * @param keepReroutes If `true`, reroutes will not be garbage collected.
   * @returns true if disconnected successfully or already disconnected, otherwise false
   */
  disconnectInput(t, i) {
    var r, l, a, h;
    if (typeof t == "string") {
      if (t = this.findInputSlot(t), t == -1)
        return LiteGraph.debug && console.log(`Connect: Error, no slot of name ${t}`), !1;
    } else if (!this.inputs || t >= this.inputs.length)
      return LiteGraph.debug && console.log("Connect: Error, slot number not found"), !1;
    const n = this.inputs[t];
    if (!n) return !1;
    const { graph: s } = this;
    if (!s) throw new NullGraphError();
    if ((r = n._floatingLinks) != null && r.size)
      for (const u of n._floatingLinks)
        s.removeFloatingLink(u);
    const o = this.inputs[t].link;
    if (o != null) {
      this.inputs[t].link = null;
      const u = s._links.get(o);
      if (u) {
        const d = s.getNodeById(u.origin_id);
        if (!d) return !1;
        const p = d.outputs[u.origin_slot];
        if (!((l = p == null ? void 0 : p.links) != null && l.length)) return !1;
        let g = 0;
        for (const y = p.links.length; g < y; g++)
          if (p.links[g] == o) {
            p.links.splice(g, 1);
            break;
          }
        u.disconnect(s, i ? "output" : void 0), s && s._version++, (a = this.onConnectionsChange) == null || a.call(
          this,
          NodeSlotType.INPUT,
          t,
          !1,
          u,
          n
        ), (h = d.onConnectionsChange) == null || h.call(
          d,
          NodeSlotType.OUTPUT,
          g,
          !1,
          u,
          p
        );
      }
    }
    return this.setDirtyCanvas(!1, !0), s == null || s.connectionChange(this), !0;
  }
  /**
   * @deprecated Use {@link getInputPos} or {@link getOutputPos} instead.
   * returns the center of a connection point in canvas coords
   * @param is_input true if if a input slot, false if it is an output
   * @param slot_number (could be the number of the slot or the string with the name of the slot)
   * @param out [optional] a place to store the output, to free garbage
   * @returns the position
   */
  getConnectionPos(t, i, n) {
    var p, g;
    n || (n = new Float32Array(2));
    const { pos: [s, o], inputs: r, outputs: l } = this;
    if (this.flags.collapsed) {
      const y = this._collapsed_width || LiteGraph.NODE_COLLAPSED_WIDTH;
      return n[0] = t ? s : s + y, n[1] = o - LiteGraph.NODE_TITLE_HEIGHT * 0.5, n;
    }
    if (t && i == -1)
      return n[0] = s + LiteGraph.NODE_TITLE_HEIGHT * 0.5, n[1] = o + LiteGraph.NODE_TITLE_HEIGHT * 0.5, n;
    const a = (p = r == null ? void 0 : r[i]) == null ? void 0 : p.pos, h = (g = l == null ? void 0 : l[i]) == null ? void 0 : g.pos;
    if (t && a)
      return n[0] = s + a[0], n[1] = o + a[1], n;
    if (!t && h)
      return n[0] = s + h[0], n[1] = o + h[1], n;
    const u = LiteGraph.NODE_SLOT_HEIGHT * 0.5, d = t ? L(this, M, me).indexOf(this.inputs[i]) : L(this, M, ye).indexOf(this.outputs[i]);
    return n[0] = t ? s + u : s + this.size[0] + 1 - u, n[1] = o + (d + 0.7) * LiteGraph.NODE_SLOT_HEIGHT + (this.constructor.slot_start_y || 0), n;
  }
  /**
   * Gets the position of an input slot, in graph co-ordinates.
   *
   * This method is preferred over the legacy {@link getConnectionPos} method.
   * @param slot Input slot index
   * @returns Position of the input slot
   */
  getInputPos(t) {
    var u;
    const { pos: [i, n], inputs: s } = this;
    if (this.flags.collapsed) {
      const d = LiteGraph.NODE_TITLE_HEIGHT * 0.5;
      return [i, n - d];
    }
    const o = (u = s == null ? void 0 : s[t]) == null ? void 0 : u.pos;
    if (o) return [i + o[0], n + o[1]];
    const r = LiteGraph.NODE_SLOT_HEIGHT * 0.5, l = this.constructor.slot_start_y || 0, h = (L(this, M, me).indexOf(this.inputs[t]) + 0.7) * LiteGraph.NODE_SLOT_HEIGHT;
    return [i + r, n + h + l];
  }
  /**
   * Gets the position of an output slot, in graph co-ordinates.
   *
   * This method is preferred over the legacy {@link getConnectionPos} method.
   * @param slot Output slot index
   * @returns Position of the output slot
   */
  getOutputPos(t) {
    var d;
    const { pos: [i, n], outputs: s, size: [o] } = this;
    if (this.flags.collapsed) {
      const p = this._collapsed_width || LiteGraph.NODE_COLLAPSED_WIDTH, g = LiteGraph.NODE_TITLE_HEIGHT * 0.5;
      return [i + p, n - g];
    }
    const r = (d = s == null ? void 0 : s[t]) == null ? void 0 : d.pos;
    if (r) return [i + r[0], n + r[1]];
    const l = LiteGraph.NODE_SLOT_HEIGHT * 0.5, a = this.constructor.slot_start_y || 0, u = (L(this, M, ye).indexOf(this.outputs[t]) + 0.7) * LiteGraph.NODE_SLOT_HEIGHT;
    return [i + o + 1 - l, n + u + a];
  }
  /** @inheritdoc */
  snapToGrid(t) {
    return this.pinned ? !1 : snapPoint(this.pos, t);
  }
  /** @see {@link snapToGrid} */
  alignToGrid() {
    this.snapToGrid(LiteGraph.CANVAS_GRID_SIZE);
  }
  /* Console output */
  trace(t) {
    this.console || (this.console = []), this.console.push(t), this.console.length > J.MAX_CONSOLE && this.console.shift();
  }
  /* Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(t, i) {
    var n;
    (n = this.graph) == null || n.canvasAction((s) => s.setDirty(t, i));
  }
  loadImage(t) {
    const i = new Image();
    i.src = LiteGraph.node_images_path + t, i.ready = !1;
    const n = () => this.setDirtyCanvas(!0);
    return i.addEventListener("load", function() {
      this.ready = !0, n();
    }), i;
  }
  /* Allows to get onMouseMove and onMouseUp events even if the mouse is out of focus */
  captureInput(t) {
    if (!this.graph || !this.graph.list_of_graphcanvas) return;
    const i = this.graph.list_of_graphcanvas;
    for (const n of i)
      !t && n.node_capturing_input != this || (n.node_capturing_input = t ? this : null);
  }
  get collapsed() {
    return !!this.flags.collapsed;
  }
  get collapsible() {
    return !this.pinned && this.constructor.collapsable !== !1;
  }
  /**
   * Toggle node collapse (makes it smaller on the canvas)
   */
  collapse(t) {
    if (!(!this.collapsible && !t)) {
      if (!this.graph) throw new NullGraphError();
      this.graph._version++, this.flags.collapsed = !this.flags.collapsed, this.setDirtyCanvas(!0, !0);
    }
  }
  /**
   * Toggles advanced mode of the node, showing advanced widgets
   */
  toggleAdvanced() {
    var t;
    if ((t = this.widgets) != null && t.some((i) => i.advanced)) {
      if (!this.graph) throw new NullGraphError();
      this.graph._version++, this.showAdvanced = !this.showAdvanced, this.expandToFitContent(), this.setDirtyCanvas(!0, !0);
    }
  }
  get pinned() {
    return !!this.flags.pinned;
  }
  /**
   * Prevents the node being accidentally moved or resized by mouse interaction.
   * Toggles pinned state if no value is provided.
   */
  pin(t) {
    if (!this.graph) throw new NullGraphError();
    this.graph._version++, this.flags.pinned = t ?? !this.flags.pinned, this.resizable = !this.pinned, this.pinned || delete this.flags.pinned;
  }
  unpin() {
    this.pin(!1);
  }
  localToScreen(t, i, n) {
    return [
      (t + this.pos[0]) * n.scale + n.offset[0],
      (i + this.pos[1]) * n.scale + n.offset[1]
    ];
  }
  get width() {
    return this.collapsed ? this._collapsed_width || LiteGraph.NODE_COLLAPSED_WIDTH : this.size[0];
  }
  /**
   * Returns the height of the node, including the title bar.
   */
  get height() {
    return LiteGraph.NODE_TITLE_HEIGHT + this.bodyHeight;
  }
  /**
   * Returns the height of the node, excluding the title bar.
   */
  get bodyHeight() {
    return this.collapsed ? 0 : this.size[1];
  }
  drawBadges(t, { gap: i = 2 } = {}) {
    const n = this.badges.map((l) => l instanceof LGraphBadge ? l : l());
    let o = this.badgePosition === BadgePosition.TopLeft ? 0 : this.width - n.reduce((l, a) => l + a.getWidth(t) + i, 0);
    const r = -(LiteGraph.NODE_TITLE_HEIGHT + i);
    for (const l of n)
      l.draw(t, o, r - l.height), o += l.getWidth(t) + i;
  }
  /**
   * Renders the node's title bar background
   */
  drawTitleBarBackground(t, {
    scale: i,
    title_height: n = LiteGraph.NODE_TITLE_HEIGHT,
    low_quality: s = !1
  }) {
    const o = this.renderingColor, r = this.renderingShape, l = this.renderingSize;
    if (this.onDrawTitleBar) {
      this.onDrawTitleBar(t, n, l, i, o);
      return;
    }
    this.title_mode !== TitleMode.TRANSPARENT_TITLE && (this.collapsed && (t.shadowColor = LiteGraph.DEFAULT_SHADOW_COLOR), t.fillStyle = this.constructor.title_color || o, t.beginPath(), r == RenderShape.BOX || s ? t.rect(0, -n, l[0], n) : (r == RenderShape.ROUND || r == RenderShape.CARD) && t.roundRect(
      0,
      -n,
      l[0],
      n,
      this.collapsed ? [LiteGraph.ROUND_RADIUS] : [LiteGraph.ROUND_RADIUS, LiteGraph.ROUND_RADIUS, 0, 0]
    ), t.fill(), t.shadowColor = "transparent");
  }
  /**
   * Renders the node's title box, i.e. the dot in front of the title text that
   * when clicked toggles the node's collapsed state. The term `title box` comes
   * from the original LiteGraph implementation.
   */
  drawTitleBox(t, {
    scale: i,
    low_quality: n = !1,
    title_height: s = LiteGraph.NODE_TITLE_HEIGHT,
    box_size: o = 10
  }) {
    const r = this.renderingSize, l = this.renderingShape;
    if (this.onDrawTitleBox) {
      this.onDrawTitleBox(t, s, r, i);
      return;
    }
    [RenderShape.ROUND, RenderShape.CIRCLE, RenderShape.CARD].includes(l) ? (n && (t.fillStyle = "black", t.beginPath(), t.arc(
      s * 0.5,
      s * -0.5,
      o * 0.5 + 1,
      0,
      Math.PI * 2
    ), t.fill()), t.fillStyle = this.renderingBoxColor, n ? t.fillRect(
      s * 0.5 - o * 0.5,
      s * -0.5 - o * 0.5,
      o,
      o
    ) : (t.beginPath(), t.arc(
      s * 0.5,
      s * -0.5,
      o * 0.5,
      0,
      Math.PI * 2
    ), t.fill())) : (n && (t.fillStyle = "black", t.fillRect(
      (s - o) * 0.5 - 1,
      (s + o) * -0.5 - 1,
      o + 2,
      o + 2
    )), t.fillStyle = this.renderingBoxColor, t.fillRect(
      (s - o) * 0.5,
      (s + o) * -0.5,
      o,
      o
    ));
  }
  /**
   * Renders the node's title text.
   */
  drawTitleText(t, {
    scale: i,
    default_title_color: n,
    low_quality: s = !1,
    title_height: o = LiteGraph.NODE_TITLE_HEIGHT
  }) {
    const r = this.renderingSize, l = this.selected;
    if (this.onDrawTitleText) {
      this.onDrawTitleText(
        t,
        o,
        r,
        i,
        this.titleFontStyle,
        l
      );
      return;
    }
    if (s)
      return;
    t.font = this.titleFontStyle;
    const a = this.getTitle() ?? `❌ ${this.type}`, h = String(a) + (this.pinned ? "📌" : "");
    h && (l ? t.fillStyle = LiteGraph.NODE_SELECTED_TITLE_COLOR : t.fillStyle = this.constructor.title_text_color || n, this.collapsed ? (t.textAlign = "left", t.fillText(
      // avoid urls too long
      h.substr(0, 20),
      o,
      LiteGraph.NODE_TITLE_TEXT_Y - o
    ), t.textAlign = "left") : (t.textAlign = "left", t.fillText(
      h,
      o,
      LiteGraph.NODE_TITLE_TEXT_Y - o
    )));
  }
  /**
   * Attempts to gracefully bypass this node in all of its connections by reconnecting all links.
   *
   * Each input is checked against each output.  This is done on a matching index basis, i.e. input 3 -> output 3.
   * If there are any input links remaining,
   * and {@link flags}.{@link INodeFlags.keepAllLinksOnBypass keepAllLinksOnBypass} is `true`,
   * each input will check for outputs that match, and take the first one that matches
   * `true`: Try the index matching first, then every input to every output.
   * `false`: Only matches indexes, e.g. input 3 to output 3.
   *
   * If {@link flags}.{@link INodeFlags.keepAllLinksOnBypass keepAllLinksOnBypass} is `undefined`, it will fall back to
   * the static {@link keepAllLinksOnBypass}.
   * @returns `true` if any new links were established, otherwise `false`.
   * @todo Decision: Change API to return array of new links instead?
   */
  connectInputToOutput() {
    const { inputs: t, outputs: i, graph: n } = this;
    if (!t || !i) return;
    if (!n) throw new NullGraphError();
    const { _links: s } = n;
    let o = !1;
    for (const [l, a] of t.entries()) {
      if (a.link == null) continue;
      const h = i[l];
      if (!h || !LiteGraph.isValidConnection(a.type, h.type)) continue;
      const u = s.get(a.link);
      if (!u) continue;
      const d = n.getNodeById(u == null ? void 0 : u.origin_id);
      d && r(h, d, u, n);
    }
    if (!(this.flags.keepAllLinksOnBypass ?? J.keepAllLinksOnBypass))
      return o;
    for (const l of t) {
      if (l.link == null) continue;
      const a = s.get(l.link);
      if (!a) continue;
      const h = n.getNodeById(a == null ? void 0 : a.origin_id);
      if (h) {
        for (const u of i)
          if (LiteGraph.isValidConnection(l.type, u.type)) {
            r(u, h, a, n);
            break;
          }
      }
    }
    return o;
    function r(l, a, h, u) {
      var p;
      const d = (p = l.links) == null ? void 0 : p.map((g) => s.get(g)).filter((g) => !!g);
      if (d != null && d.length)
        for (const g of d) {
          const y = u.getNodeById(g.target_id);
          if (!y) continue;
          const _ = a.connect(
            h.origin_slot,
            y,
            g.target_slot,
            h.parentId
          );
          o || (o = !!_);
        }
    }
  }
  /**
   * Returns `true` if the widget is visible, otherwise `false`.
   */
  isWidgetVisible(t) {
    return !(this.collapsed || t.hidden || t.advanced && !this.showAdvanced);
  }
  drawWidgets(t, {
    lowQuality: i = !1,
    editorAlpha: n = 1
  }) {
    var a, h;
    if (!this.widgets) return;
    const s = this.size[0], { widgets: o } = this, r = LiteGraph.NODE_WIDGET_HEIGHT, l = !i;
    t.save(), t.globalAlpha = n;
    for (const u of o) {
      if (!this.isWidgetVisible(u)) continue;
      const { y: d } = u, p = u.advanced ? LiteGraph.WIDGET_ADVANCED_OUTLINE_COLOR : LiteGraph.WIDGET_OUTLINE_COLOR;
      u.last_y = d, u.computedDisabled = u.disabled || ((a = this.getSlotFromWidget(u)) == null ? void 0 : a.link) != null, t.strokeStyle = p, t.fillStyle = "#222", t.textAlign = "left", u.computedDisabled && (t.globalAlpha *= 0.5);
      const g = u.width || s, y = WIDGET_TYPE_MAP[u.type];
      y ? toClass(y, u).drawWidget(t, { width: g, showText: l }) : (h = u.draw) == null || h.call(u, t, this, g, d, r, i), t.globalAlpha = n;
    }
    t.restore();
  }
  /**
   * When {@link LGraphNode.collapsed} is `true`, this method draws the node's collapsed slots.
   */
  drawCollapsedSlots(t) {
    var i;
    for (const n of L(this, ht))
      if (n.link != null) {
        n.drawCollapsed(t);
        break;
      }
    for (const n of L(this, gt))
      if ((i = n.links) != null && i.length) {
        n.drawCollapsed(t);
        break;
      }
  }
  get slots() {
    return [...this.inputs, ...this.outputs];
  }
  /**
   * Returns the input slot that is associated with the given widget.
   */
  getSlotFromWidget(t) {
    return this.inputs.find((i) => isWidgetInputSlot(i) && i.widget.name === t.name);
  }
  /**
   * Returns the widget that is associated with the given input slot.
   */
  getWidgetFromSlot(t) {
    var i;
    if (isWidgetInputSlot(t))
      return (i = this.widgets) == null ? void 0 : i.find((n) => n.name === t.widget.name);
  }
  /**
   * Draws the node's input and output slots.
   */
  drawSlots(t, {
    fromSlot: i,
    colorContext: n,
    editorAlpha: s,
    lowQuality: o
  }) {
    for (const r of [...L(this, ht), ...L(this, gt)]) {
      const l = i && r.isValidTarget(i), a = S(this, M, Re).call(this, r), h = !i || l, u = h && a;
      (a || l || !r.isWidgetInputSlot || S(this, M, Ge).call(this, this.getWidgetFromSlot(r)) || r.isConnected) && (t.globalAlpha = h ? s : 0.4 * s, r.draw(t, {
        colorContext: n,
        lowQuality: o,
        highlight: u
      }));
    }
  }
  /**
   * @internal Sets the internal concrete slot arrays, ensuring they are instances of
   * {@link NodeInputSlot} or {@link NodeOutputSlot}.
   *
   * A temporary workaround until duck-typed inputs and outputs
   * have been removed from the ecosystem.
   */
  _setConcreteSlots() {
    W(this, ht, this.inputs.map((t) => toClass(NodeInputSlot, t, this))), W(this, gt, this.outputs.map((t) => toClass(NodeOutputSlot, t, this)));
  }
  /**
   * Arranges node elements in preparation for rendering (slots & widgets).
   */
  arrange() {
    const t = S(this, M, De).call(this), i = t ? t[1] + t[3] - this.pos[1] : 0;
    S(this, M, Pe).call(this, i), S(this, M, Me).call(this);
  }
  /**
   * Draws a progress bar on the node.
   * @param ctx The canvas context to draw on
   */
  drawProgressBar(t) {
    if (!this.progress) return;
    const i = t.fillStyle;
    t.fillStyle = "green", t.fillRect(
      0,
      0,
      this.width * this.progress,
      6
    ), t.fillStyle = i;
  }
};
ht = new WeakMap(), gt = new WeakMap(), zt = new WeakMap(), Ht = new WeakMap(), M = new WeakSet(), Ne = function() {
  if (this.has_errors)
    return {
      padding: 12,
      lineWidth: 10,
      color: LiteGraph.NODE_ERROR_COLOUR
    };
}, Ce = function() {
  if (this.selected)
    return {
      padding: this.has_errors ? 20 : void 0
    };
}, /**
 * Finds the next free slot
 * @param slots The slots to search, i.e. this.inputs or this.outputs
 */
_e = function(t, i) {
  var r, l, a;
  const s = Object.assign({
    returnObj: !1,
    typesNotAccepted: []
  }, i || {}), o = t == null ? void 0 : t.length;
  if (!(o > 0)) return -1;
  for (let h = 0; h < o; ++h) {
    const u = t[h];
    if (!(!u || u.link || (r = u.links) != null && r.length) && !((a = (l = s.typesNotAccepted) == null ? void 0 : l.includes) != null && a.call(l, u.type)))
      return s.returnObj ? u : h;
  }
  return -1;
}, /**
 * Finds a matching slot from those provided, returning the slot itself or its index in {@link slots}.
 * @param slots Slots to search (this.inputs or this.outputs)
 * @param type Type of slot to look for
 * @param returnObj If true, returns the slot itself.  Otherwise, the index.
 * @param preferFreeSlot Prefer a free slot, but if none are found, fall back to an occupied slot.
 * @param doNotUseOccupied Do not fall back to occupied slots.
 * @see {findSlotByType}
 * @see {findOutputSlotByType}
 * @see {findInputSlotByType}
 * @returns If a match is found, the slot if returnObj is true, otherwise the index.  If no matches are found, -1
 */
Nt = function(t, i, n, s, o) {
  var h;
  const r = t == null ? void 0 : t.length;
  if (!r) return -1;
  (i == "" || i == "*") && (i = 0);
  const l = String(i).toLowerCase().split(",");
  let a = null;
  for (let u = 0; u < r; ++u) {
    const d = t[u], p = d.type == "0" || d.type == "*" ? ["0"] : String(d.type).toLowerCase().split(",");
    for (const g of l) {
      const y = g == "_event_" ? LiteGraph.EVENT : g;
      for (const _ of p) {
        const m = _ == "_event_" ? LiteGraph.EVENT : _;
        if (y == m || y === "*" || m === "*") {
          if (s && ((h = d.links) != null && h.length || d.link != null)) {
            a ?? (a = n ? d : u);
            continue;
          }
          return n ? d : u;
        }
      }
    }
  }
  return o ? -1 : a ?? -1;
}, me = function() {
  return this.inputs.filter(
    (t) => {
      var i;
      return !t.pos && !((i = this.widgets) != null && i.length && isWidgetInputSlot(t));
    }
  );
}, ye = function() {
  return this.outputs.filter((t) => !t.pos);
}, $t = function(t, i, n) {
  const s = n ? this.getInputPos(i) : this.getOutputPos(i);
  t.boundingRect[0] = s[0] - LiteGraph.NODE_SLOT_HEIGHT * 0.5, t.boundingRect[1] = s[1] - LiteGraph.NODE_SLOT_HEIGHT * 0.5, t.boundingRect[2] = t.isWidgetInputSlot ? BaseWidget.margin : LiteGraph.NODE_SLOT_HEIGHT, t.boundingRect[3] = LiteGraph.NODE_SLOT_HEIGHT;
}, De = function() {
  var i;
  const t = [];
  for (const [n, s] of L(this, ht).entries())
    (i = this.widgets) != null && i.length && isWidgetInputSlot(s) || (S(this, M, $t).call(this, s, n, !0), t.push(s));
  for (const [n, s] of L(this, gt).entries())
    S(this, M, $t).call(this, s, n, !1), t.push(s);
  return t.length ? createBounds(t, 0) : null;
}, Ae = function(t) {
  var s;
  const i = isINodeInputSlot(t), n = ((s = this.mouseOver) == null ? void 0 : s[i ? "inputId" : "outputId"]) ?? -1;
  return n === -1 ? null : i ? this.inputs[n] : this.outputs[n];
}, Re = function(t) {
  return S(this, M, Ae).call(this, t) === t;
}, Ge = function(t) {
  var i;
  return t ? ((i = this.mouseOver) == null ? void 0 : i.overWidget) === t : !1;
}, /**
 * Arranges the node's widgets vertically.
 * Sets following properties on each widget:
 * -  {@link IBaseWidget.computedHeight}
 * -  {@link IBaseWidget.y}
 * @param widgetStartY The y-coordinate of the first widget
 */
Pe = function(t) {
  if (!this.widgets || !this.widgets.length) return;
  const i = this.bodyHeight, n = this.widgets_start_y ?? (this.widgets_up ? 0 : t) + 2;
  let s = i - n, o = 0;
  const r = [];
  for (const u of this.widgets)
    if (u.computeSize) {
      const d = u.computeSize()[1] + 4;
      u.computedHeight = d, o += d;
    } else if (u.computeLayoutSize) {
      const { minHeight: d, maxHeight: p } = u.computeLayoutSize(this);
      r.push({
        minHeight: d,
        prefHeight: p,
        w: u
      });
    } else {
      const d = LiteGraph.NODE_WIDGET_HEIGHT + 4;
      u.computedHeight = d, o += d;
    }
  s -= o, this.freeWidgetSpace = s;
  const l = r.map((u) => ({
    minSize: u.minHeight,
    maxSize: u.prefHeight
  })), a = distributeSpace(Math.max(0, s), l);
  for (const [u, d] of r.entries())
    d.w.computedHeight = a[u];
  let h = n;
  for (const u of this.widgets)
    u.y = h, h += u.computedHeight ?? 0;
  if (!this.graph) throw new NullGraphError();
  h > i && (this.setSize([this.size[0], h]), this.graph.setDirtyCanvas(!1, !0));
}, /**
 * Arranges the layout of the node's widget input slots.
 */
Me = function() {
  if (!this.widgets) return;
  const t = /* @__PURE__ */ new Map();
  for (const [i, n] of this.inputs.entries())
    isWidgetInputSlot(n) && t.set(n.widget.name, { ...n, index: i });
  if (t.size)
    for (const i of this.widgets) {
      const n = t.get(i.name);
      if (!n) continue;
      const s = L(this, ht)[n.index], o = LiteGraph.NODE_SLOT_HEIGHT * 0.5;
      s.pos = [o, i.y + o], S(this, M, $t).call(this, s, n.index, !0);
    }
}, // Static properties used by dynamic child classes
c(J, "title"), c(J, "MAX_CONSOLE"), c(J, "type"), c(J, "category"), c(J, "filter"), c(J, "skip_list"), /** Default setting for {@link LGraphNode.connectInputToOutput}. @see {@link INodeFlags.keepAllLinksOnBypass} */
c(J, "keepAllLinksOnBypass", !1);
let LGraphNode = J;
const Y = class Y {
  constructor(t, i) {
    c(this, "id");
    c(this, "color");
    c(this, "title");
    c(this, "font");
    c(this, "font_size", LiteGraph.DEFAULT_GROUP_FONT || 24);
    c(this, "_bounding", new Float32Array([
      10,
      10,
      Y.minWidth,
      Y.minHeight
    ]));
    c(this, "_pos", this._bounding.subarray(0, 2));
    c(this, "_size", this._bounding.subarray(2, 4));
    /** @deprecated See {@link _children} */
    c(this, "_nodes", []);
    c(this, "_children", /* @__PURE__ */ new Set());
    c(this, "graph");
    c(this, "flags", {});
    c(this, "selected");
    c(this, "isPointInside", LGraphNode.prototype.isPointInside);
    c(this, "setDirtyCanvas", LGraphNode.prototype.setDirtyCanvas);
    this.id = i ?? -1, this.title = t || "Group";
    const { pale_blue: n } = LGraphCanvas.node_colors;
    this.color = n ? n.groupcolor : "#AAA";
  }
  /** @inheritdoc {@link IColorable.setColorOption} */
  setColorOption(t) {
    t == null ? delete this.color : this.color = t.groupcolor;
  }
  /** @inheritdoc {@link IColorable.getColorOption} */
  getColorOption() {
    return Object.values(LGraphCanvas.node_colors).find(
      (t) => t.groupcolor === this.color
    ) ?? null;
  }
  /** Position of the group, as x,y co-ordinates in graph space */
  get pos() {
    return this._pos;
  }
  set pos(t) {
    !t || t.length < 2 || (this._pos[0] = t[0], this._pos[1] = t[1]);
  }
  /** Size of the group, as width,height in graph units */
  get size() {
    return this._size;
  }
  set size(t) {
    !t || t.length < 2 || (this._size[0] = Math.max(Y.minWidth, t[0]), this._size[1] = Math.max(Y.minHeight, t[1]));
  }
  get boundingRect() {
    return this._bounding;
  }
  get nodes() {
    return this._nodes;
  }
  get titleHeight() {
    return this.font_size * 1.4;
  }
  get children() {
    return this._children;
  }
  get pinned() {
    return !!this.flags.pinned;
  }
  /**
   * Prevents the group being accidentally moved or resized by mouse interaction.
   * Toggles pinned state if no value is provided.
   */
  pin(t) {
    (t === void 0 ? !this.pinned : t) ? this.flags.pinned = !0 : delete this.flags.pinned;
  }
  unpin() {
    this.pin(!1);
  }
  configure(t) {
    this.id = t.id, this.title = t.title, this._bounding.set(t.bounding), this.color = t.color, this.flags = t.flags || this.flags, t.font_size && (this.font_size = t.font_size);
  }
  serialize() {
    const t = this._bounding;
    return {
      id: this.id,
      title: this.title,
      bounding: [...t],
      color: this.color,
      font_size: this.font_size,
      flags: this.flags
    };
  }
  /**
   * Draws the group on the canvas
   * @param graphCanvas
   * @param ctx
   */
  draw(t, i) {
    const { padding: n, resizeLength: s, defaultColour: o } = Y, r = this.font_size || LiteGraph.DEFAULT_GROUP_FONT_SIZE, [l, a] = this._pos, [h, u] = this._size, d = this.color || o;
    i.globalAlpha = 0.25 * t.editor_alpha, i.fillStyle = d, i.strokeStyle = d, i.beginPath(), i.rect(l + 0.5, a + 0.5, h, r * 1.4), i.fill(), i.fillStyle = d, i.strokeStyle = d, i.beginPath(), i.rect(l + 0.5, a + 0.5, h, u), i.fill(), i.globalAlpha = t.editor_alpha, i.stroke(), i.beginPath(), i.moveTo(l + h, a + u), i.lineTo(l + h - s, a + u), i.lineTo(l + h, a + u - s), i.fill(), i.font = `${r}px ${LiteGraph.GROUP_FONT}`, i.textAlign = "left", i.fillText(this.title + (this.pinned ? "📌" : ""), l + n, a + r), LiteGraph.highlight_selected_group && this.selected && strokeShape(i, this._bounding, {
      title_height: this.titleHeight,
      padding: n
    });
  }
  resize(t, i) {
    return this.pinned ? !1 : (this._size[0] = Math.max(Y.minWidth, t), this._size[1] = Math.max(Y.minHeight, i), !0);
  }
  move(t, i, n = !1) {
    if (!this.pinned && (this._pos[0] += t, this._pos[1] += i, n !== !0))
      for (const s of this._children)
        s.move(t, i);
  }
  /** @inheritdoc */
  snapToGrid(t) {
    return this.pinned ? !1 : snapPoint(this.pos, t);
  }
  recomputeInsideNodes() {
    if (!this.graph) throw new NullGraphError();
    const { nodes: t, reroutes: i, groups: n } = this.graph, s = this._children;
    this._nodes.length = 0, s.clear();
    for (const o of t)
      containsCentre(this._bounding, o.boundingRect) && (this._nodes.push(o), s.add(o));
    for (const o of i.values())
      isPointInRect(o.pos, this._bounding) && s.add(o);
    for (const o of n)
      containsRect(this._bounding, o._bounding) && s.add(o);
    n.sort((o, r) => o === this ? s.has(r) ? -1 : 0 : r === this && s.has(o) ? 1 : 0);
  }
  /**
   * Resizes and moves the group to neatly fit all given {@link objects}.
   * @param objects All objects that should be inside the group
   * @param padding Value in graph units to add to all sides of the group.  Default: 10
   */
  resizeTo(t, i = 10) {
    const n = createBounds(t, i);
    n !== null && (this.pos[0] = n[0], this.pos[1] = n[1] - this.titleHeight, this.size[0] = n[2], this.size[1] = n[3] + this.titleHeight);
  }
  /**
   * Add nodes to the group and adjust the group's position and size accordingly
   * @param nodes The nodes to add to the group
   * @param padding The padding around the group
   */
  addNodes(t, i = 10) {
    !this._nodes && t.length === 0 || this.resizeTo([...this.children, ...this._nodes, ...t], i);
  }
  getMenuOptions() {
    return [
      {
        content: this.pinned ? "Unpin" : "Pin",
        callback: () => {
          this.pinned ? this.unpin() : this.pin(), this.setDirtyCanvas(!1, !0);
        }
      },
      null,
      { content: "Title", callback: LGraphCanvas.onShowPropertyEditor },
      {
        content: "Color",
        has_submenu: !0,
        callback: LGraphCanvas.onMenuNodeColors
      },
      {
        content: "Font size",
        property: "font_size",
        type: "Number",
        callback: LGraphCanvas.onShowPropertyEditor
      },
      null,
      { content: "Remove", callback: LGraphCanvas.onMenuNodeRemove }
    ];
  }
  isPointInTitlebar(t, i) {
    const n = this.boundingRect;
    return isInRectangle(t, i, n[0], n[1], n[2], this.titleHeight);
  }
  isInResize(t, i) {
    const n = this.boundingRect, s = n[0] + n[2], o = n[1] + n[3];
    return t < s && i < o && t - s + (i - o) > -Y.resizeLength;
  }
};
c(Y, "minWidth", 140), c(Y, "minHeight", 80), c(Y, "resizeLength", 10), c(Y, "padding", 4), c(Y, "defaultColour", "#335");
let LGraphGroup = Y;
var Et, V, tt, j, dt, ve, xt, _t, mt, we;
const z = class z {
  /**
   * Initialises a new link reroute object.
   * @param id Unique identifier for this reroute
   * @param network The network of links this reroute belongs to.  Internally converted to a WeakRef.
   * @param pos Position in graph coordinates
   * @param linkIds Link IDs ({@link LLink.id}) of all links that use this reroute
   */
  constructor(t, i, n, s, o, r) {
    P(this, dt);
    P(this, Et, new Float32Array(8));
    /** The network this reroute belongs to.  Contains all valid links and reroutes. */
    P(this, V);
    P(this, tt);
    /** This property is only defined on the last reroute of a floating reroute chain (closest to input end). */
    c(this, "floating");
    P(this, j, L(this, Et).subarray(0, 2));
    /** @inheritdoc */
    c(this, "selected");
    /** The ID ({@link LLink.id}) of every link using this reroute */
    c(this, "linkIds");
    /** The ID ({@link LLink.id}) of every floating link using this reroute */
    c(this, "floatingLinkIds");
    /** Cached cos */
    c(this, "cos", 0);
    c(this, "sin", 0);
    /** Bezier curve control point for the "target" (input) side of the link */
    c(this, "controlPoint", L(this, Et).subarray(4, 6));
    /** @inheritdoc */
    c(this, "path");
    /** @inheritdoc */
    c(this, "_centreAngle");
    /** @inheritdoc */
    c(this, "_pos", L(this, Et).subarray(6, 8));
    /** @inheritdoc */
    c(this, "_dragging");
    /** Colour of the first link that rendered this reroute */
    c(this, "_colour");
    /**
     * Used to ensure reroute angles are only executed once per frame.
     * @todo Calculate on change instead.
     */
    P(this, xt, -1 / 0);
    P(this, _t, new RerouteSlot(this, !0));
    P(this, mt, new RerouteSlot(this, !1));
    this.id = t, W(this, V, new WeakRef(i)), this.parentId = s, n && (this.pos = n), this.linkIds = new Set(o), this.floatingLinkIds = new Set(r);
  }
  /** Distance from reroute centre to slot centre. */
  static get slotOffset() {
    const t = z.slotRadius * 0.33;
    return z.radius + t + z.slotRadius;
  }
  get parentId() {
    return L(this, tt);
  }
  /** Ignores attempts to create an infinite loop. @inheritdoc */
  set parentId(t) {
    t !== this.id && this.getReroutes() !== null && W(this, tt, t);
  }
  get parent() {
    var t;
    return (t = L(this, V).deref()) == null ? void 0 : t.getReroute(L(this, tt));
  }
  /** @inheritdoc */
  get pos() {
    return L(this, j);
  }
  set pos(t) {
    if (!((t == null ? void 0 : t.length) >= 2))
      throw new TypeError("Reroute.pos is an x,y point, and expects an indexable with at least two values.");
    L(this, j)[0] = t[0], L(this, j)[1] = t[1];
  }
  /** @inheritdoc */
  get boundingRect() {
    const { radius: t } = z, [i, n] = L(this, j);
    return [i - t, n - t, 2 * t, 2 * t];
  }
  /** The total number of links & floating links using this reroute */
  get totalLinks() {
    return this.linkIds.size + this.floatingLinkIds.size;
  }
  /** Colour of the first link that rendered this reroute */
  get colour() {
    return this._colour ?? "#18184d";
  }
  get isSlotHovered() {
    return this.isInputHovered || this.isOutputHovered;
  }
  get isInputHovered() {
    return L(this, _t).hovering;
  }
  get isOutputHovered() {
    return L(this, mt).hovering;
  }
  get firstLink() {
    var i;
    const t = this.linkIds.values().next().value;
    return t === void 0 || (i = L(this, V).deref()) == null ? void 0 : i.links.get(t);
  }
  get firstFloatingLink() {
    var i;
    const t = this.floatingLinkIds.values().next().value;
    return t === void 0 || (i = L(this, V).deref()) == null ? void 0 : i.floatingLinks.get(t);
  }
  /** @inheritdoc */
  get origin_id() {
    var t;
    return (t = this.firstLink) == null ? void 0 : t.origin_id;
  }
  /** @inheritdoc */
  get origin_slot() {
    var t;
    return (t = this.firstLink) == null ? void 0 : t.origin_slot;
  }
  /**
   * Applies a new parentId to the reroute, and optinoally a new position and linkId.
   * Primarily used for deserialisation.
   * @param parentId The ID of the reroute prior to this reroute, or
   * `undefined` if it is the first reroute connected to a nodes output
   * @param pos The position of this reroute
   * @param linkIds All link IDs that pass through this reroute
   */
  update(t, i, n, s) {
    this.parentId = t, i && (this.pos = i), n && (this.linkIds = new Set(n)), this.floating = s;
  }
  /**
   * Validates the linkIds this reroute has.  Removes broken links.
   * @param links Collection of valid links
   * @returns true if any links remain after validation
   */
  validateLinks(t, i) {
    const { linkIds: n, floatingLinkIds: s } = this;
    for (const o of n)
      t.has(o) || n.delete(o);
    for (const o of s)
      i.has(o) || s.delete(o);
    return n.size > 0 || s.size > 0;
  }
  /**
   * Retrieves an ordered array of all reroutes from the node output.
   * @param visited Internal.  A set of reroutes that this function
   * has already visited whilst recursing up the chain.
   * @returns An ordered array of all reroutes from the node output to this reroute, inclusive.
   * `null` if an infinite loop is detected.
   * `undefined` if the reroute chain or {@link LinkNetwork} are invalid.
   */
  getReroutes(t = /* @__PURE__ */ new Set()) {
    var s;
    if (L(this, tt) === void 0) return [this];
    if (t.has(this)) return null;
    t.add(this);
    const i = (s = L(this, V).deref()) == null ? void 0 : s.reroutes.get(L(this, tt));
    if (!i)
      return W(this, tt, void 0), [this];
    const n = i.getReroutes(t);
    return n == null || n.push(this), n;
  }
  /**
   * Internal.  Called by {@link LLink.findNextReroute}.  Not intended for use by itself.
   * @param withParentId The rerouteId to look for
   * @param visited A set of reroutes that have already been visited
   * @returns The reroute that was found, `undefined` if no reroute was found, or `null` if an infinite loop was detected.
   */
  findNextReroute(t, i = /* @__PURE__ */ new Set()) {
    var n, s;
    if (L(this, tt) === t) return this;
    if (i.has(this)) return null;
    if (i.add(this), L(this, tt) !== void 0)
      return (s = (n = L(this, V).deref()) == null ? void 0 : n.reroutes.get(L(this, tt))) == null ? void 0 : s.findNextReroute(t, i);
  }
  /**
   * Finds the output node and output slot of the first link passing through this reroute.
   * @returns The output node and output slot of the first link passing through this reroute, or `undefined` if no link is found.
   */
  findSourceOutput() {
    var n;
    const t = this.firstLink ?? this.firstFloatingLink;
    if (!t) return;
    const i = (n = L(this, V).deref()) == null ? void 0 : n.getNodeById(t.origin_id);
    if (i)
      return {
        node: i,
        output: i.outputs[t.origin_slot]
      };
  }
  /**
   * Finds the inputs and nodes of (floating) links passing through this reroute.
   * @returns An array of objects containing the node and input slot of each link passing through this reroute.
   */
  findTargetInputs() {
    const t = L(this, V).deref();
    if (!t) return;
    const i = [];
    return n(t, this.linkIds, t.links), n(t, this.floatingLinkIds, t.floatingLinks), i;
    function n(s, o, r) {
      for (const l of o) {
        const a = r.get(l);
        if (!a) continue;
        const h = s.getNodeById(a.target_id), u = h == null ? void 0 : h.inputs[a.target_slot];
        u && i.push({ node: h, input: u, link: a });
      }
    }
  }
  /**
   * Retrieves all floating links passing through this reroute.
   * @param from Filters the links by the currently connected link side.
   * @returns An array of floating links
   */
  getFloatingLinks(t) {
    var o;
    const i = (o = L(this, V).deref()) == null ? void 0 : o.floatingLinks;
    if (!i) return;
    const n = t === "input" ? "origin_id" : "target_id", s = [];
    for (const r of this.floatingLinkIds) {
      const l = i.get(r);
      (l == null ? void 0 : l[n]) === -1 && s.push(l);
    }
    return s;
  }
  /**
   * Changes the origin node/output of all floating links that pass through this reroute.
   * @param node The new origin node
   * @param output The new origin output slot
   * @param index The slot index of {@link output}
   */
  setFloatingLinkOrigin(t, i, n) {
    var r, l, a;
    const s = L(this, V).deref(), o = this.getFloatingLinks("output");
    if (!o) throw new Error("[setFloatingLinkOrigin]: Invalid network.");
    if (o.length) {
      i._floatingLinks ?? (i._floatingLinks = /* @__PURE__ */ new Set());
      for (const h of o)
        i._floatingLinks.add(h), (a = (l = (r = s == null ? void 0 : s.getNodeById(h.origin_id)) == null ? void 0 : r.outputs[h.origin_slot]) == null ? void 0 : l._floatingLinks) == null || a.delete(h), h.origin_id = t.id, h.origin_slot = n;
    }
  }
  /** @inheritdoc */
  move(t, i) {
    L(this, j)[0] += t, L(this, j)[1] += i;
  }
  /** @inheritdoc */
  snapToGrid(t) {
    if (!t) return !1;
    const { pos: i } = this;
    return i[0] = t * Math.round(i[0] / t), i[1] = t * Math.round(i[1] / t), !0;
  }
  removeAllFloatingLinks() {
    for (const t of this.floatingLinkIds)
      this.removeFloatingLink(t);
  }
  removeFloatingLink(t) {
    const i = L(this, V).deref();
    if (!i) return;
    const n = i.floatingLinks.get(t);
    if (!n) {
      console.warn(`[Reroute.removeFloatingLink] Floating link not found: ${t}, ignoring and discarding ID.`), this.floatingLinkIds.delete(t);
      return;
    }
    i.removeFloatingLink(n);
  }
  /**
   * Removes a link or floating link from this reroute, by matching link object instance equality.
   * @param link The link to remove.
   * @remarks Does not remove the link from the network.
   */
  removeLink(t) {
    const i = L(this, V).deref();
    if (!i) return;
    const n = i.floatingLinks.get(t.id);
    t === n ? this.floatingLinkIds.delete(t.id) : this.linkIds.delete(t.id);
  }
  remove() {
    const t = L(this, V).deref();
    t && t.removeReroute(this.id);
  }
  calculateAngle(t, i, n) {
    if (!(t > L(this, xt))) return;
    W(this, xt, t);
    const { id: s, pos: o } = this, r = [];
    let l = 0;
    if (y(this.linkIds, i.links), y(this.floatingLinkIds, i.floatingLinks), !r.length) {
      this.cos = 0, this.sin = 0, this.controlPoint[0] = 0, this.controlPoint[1] = 0;
      return;
    }
    l /= r.length;
    const a = Math.atan2(
      L(this, j)[1] - n[1],
      L(this, j)[0] - n[0]
    );
    let h = (a - l) * 0.5;
    Math.abs(h) > Math.PI * 0.5 && (h += Math.PI);
    const u = Math.min(z.maxSplineOffset, distance(n, L(this, j)) * 0.25), d = a - h, p = Math.cos(d), g = Math.sin(d);
    this.cos = p, this.sin = g, this.controlPoint[0] = u * -p, this.controlPoint[1] = u * -g;
    function y(_, m) {
      for (const w of _) {
        const k = m.get(w), I = getNextPos(i, k, s);
        if (!I) continue;
        const N = getDirection(o, I);
        r.push(N), l += N;
      }
    }
  }
  /**
   * Renders the reroute on the canvas.
   * @param ctx Canvas context to draw on
   * @param backgroundPattern The canvas background pattern; used to make floating reroutes appear washed out.
   * @remarks Leaves {@link ctx}.fillStyle, strokeStyle, and lineWidth dirty (perf.).
   */
  draw(t, i) {
    const { globalAlpha: n } = t, { pos: s } = this;
    if (t.beginPath(), t.arc(s[0], s[1], z.radius, 0, 2 * Math.PI), this.linkIds.size === 0 && (t.fillStyle = i ?? "#797979", t.fill(), t.globalAlpha = n * 0.33), t.fillStyle = this.colour, t.lineWidth = z.radius * 0.1, t.strokeStyle = "rgb(0,0,0,0.5)", t.fill(), t.stroke(), t.fillStyle = "#ffffff55", t.strokeStyle = "rgb(0,0,0,0.3)", t.beginPath(), t.arc(s[0], s[1], z.radius * 0.8, 0, 2 * Math.PI), t.fill(), t.stroke(), this.selected && (t.strokeStyle = "#fff", t.beginPath(), t.arc(s[0], s[1], z.radius * 1.2, 0, 2 * Math.PI), t.stroke()), z.drawIdBadge) {
      const o = new LGraphBadge({ text: this.id.toString() }), r = s[0] - o.getWidth(t) * 0.5, l = s[1] - o.height - z.radius - 2;
      o.draw(t, r, l);
    }
    t.globalAlpha = n;
  }
  /**
   * Draws the input and output slots on the canvas, if the slots are visible.
   * @param ctx The canvas context to draw on.
   */
  drawSlots(t) {
    L(this, _t).draw(t), L(this, mt).draw(t);
  }
  drawHighlight(t, i) {
    const { pos: n } = this, { strokeStyle: s, lineWidth: o } = t;
    t.strokeStyle = i, t.lineWidth = 1, t.beginPath(), t.arc(n[0], n[1], z.radius * 1.5, 0, 2 * Math.PI), t.stroke(), t.strokeStyle = s, t.lineWidth = o;
  }
  /**
   * Updates visibility of the input and output slots, based on the position of the pointer.
   * @param pos The position of the pointer.
   * @returns `true` if any changes require a redraw.
   */
  updateVisibility(t) {
    const i = L(this, _t), n = L(this, mt);
    i.dirty = !1, n.dirty = !1;
    const { firstFloatingLink: s } = this, o = !!this.firstLink, r = o || (s == null ? void 0 : s.isFloatingOutput), l = o || (s == null ? void 0 : s.isFloatingInput);
    if ((r || l) && isPointInRect(t, L(this, dt, ve))) {
      const h = S(this, dt, we).call(this, t);
      r && i.update(t, h), l && n.update(t, h);
    } else
      this.hideSlots();
    return i.dirty || n.dirty;
  }
  /** Prevents rendering of the input and output slots. */
  hideSlots() {
    L(this, _t).hide(), L(this, mt).hide();
  }
  /**
   * Precisely determines if {@link pos} is inside this reroute.
   * @param pos The position to check (canvas space)
   * @returns `true` if {@link pos} is within the reroute's radius.
   */
  containsPoint(t) {
    return isPointInRect(t, L(this, dt, ve)) && S(this, dt, we).call(this, t);
  }
  /** @inheritdoc */
  asSerialisable() {
    const { id: t, parentId: i, pos: n, linkIds: s } = this;
    return {
      id: t,
      parentId: i,
      pos: [n[0], n[1]],
      linkIds: [...s],
      floating: this.floating ? { slotType: this.floating.slotType } : void 0
    };
  }
};
Et = new WeakMap(), V = new WeakMap(), tt = new WeakMap(), j = new WeakMap(), dt = new WeakSet(), ve = function() {
  const t = 2 * z.slotOffset, i = 2 * Math.max(z.radius, z.slotRadius), [n, s] = L(this, j);
  return [n - t, s - i, 2 * t, 2 * i];
}, xt = new WeakMap(), _t = new WeakMap(), mt = new WeakMap(), we = function(t) {
  return distance(this.pos, t) <= z.radius;
}, c(z, "radius", 10), /** Maximum distance from reroutes to their bezier curve control points. */
c(z, "maxSplineOffset", 80), c(z, "drawIdBadge", !1), c(z, "slotRadius", 5);
let Reroute = z;
var bt, Ut, It, St;
class RerouteSlot {
  constructor(t, i) {
    /** The reroute that the slot belongs to. */
    P(this, bt);
    P(this, Ut);
    /** Whether any changes require a redraw. */
    c(this, "dirty", !1);
    P(this, It, !1);
    P(this, St, !1);
    W(this, bt, t), W(this, Ut, i ? -1 : 1);
  }
  /** Centre point of this slot. */
  get pos() {
    const [t, i] = L(this, bt).pos;
    return [t + Reroute.slotOffset * L(this, Ut), i];
  }
  /** Whether the pointer is hovering over the slot itself. */
  get hovering() {
    return L(this, It);
  }
  set hovering(t) {
    Object.is(L(this, It), t) || (W(this, It, t), this.dirty = !0);
  }
  /** Whether the slot outline / faint background is visible. */
  get showOutline() {
    return L(this, St);
  }
  set showOutline(t) {
    Object.is(L(this, St), t) || (W(this, St, t), this.dirty = !0);
  }
  /**
   * Updates the slot's visibility based on the position of the pointer.
   * @param pos The position of the pointer.
   * @param outlineOnly If `true`, slot will display with the faded outline only ({@link showOutline}).
   */
  update(t, i) {
    if (i)
      this.hovering = !1, this.showOutline = !0;
    else {
      const n = distance(this.pos, t);
      this.hovering = n <= 2 * Reroute.slotRadius, this.showOutline = n <= 5 * Reroute.slotRadius;
    }
  }
  /** Hides the slot. */
  hide() {
    this.hovering = !1, this.showOutline = !1;
  }
  /**
   * Draws the slot on the canvas.
   * @param ctx The canvas context to draw on.
   */
  draw(t) {
    const { fillStyle: i, strokeStyle: n, lineWidth: s } = t, { showOutline: o, hovering: r, pos: [l, a] } = this;
    if (o)
      try {
        t.fillStyle = r ? L(this, bt).colour : "rgba(127,127,127,0.3)", t.strokeStyle = "rgb(0,0,0,0.5)", t.lineWidth = 1, t.beginPath(), t.arc(l, a, Reroute.slotRadius, 0, 2 * Math.PI), t.fill(), t.stroke();
      } finally {
        t.fillStyle = i, t.strokeStyle = n, t.lineWidth = s;
      }
  }
}
bt = new WeakMap(), Ut = new WeakMap(), It = new WeakMap(), St = new WeakMap();
function getNextPos(f, t, i) {
  var s, o;
  if (!t) return;
  const n = (s = LLink.findNextReroute(f, t, i)) == null ? void 0 : s.pos;
  if (n) return n;
  if (!(t.target_id === -1 || t.target_slot === -1))
    return (o = f.getNodeById(t.target_id)) == null ? void 0 : o.getInputPos(t.target_slot);
}
function getDirection(f, t) {
  return Math.atan2(t[1] - f[1], t[0] - f[0]);
}
function getBoundaryNodes(f) {
  const t = f == null ? void 0 : f.find((r) => r);
  if (!t) return null;
  let i = t, n = t, s = t, o = t;
  for (const r of f) {
    if (!r) continue;
    const [l, a] = r.pos, [h, u] = r.size;
    a < i.pos[1] && (i = r), l + h > n.pos[0] + n.size[0] && (n = r), a + u > s.pos[1] + s.size[1] && (s = r), l < o.pos[0] && (o = r);
  }
  return {
    top: i,
    right: n,
    bottom: s,
    left: o
  };
}
function distributeNodes(f, t) {
  const i = f == null ? void 0 : f.length;
  if (!(i > 1)) return;
  const n = t ? 0 : 1;
  let s = 0, o = -1 / 0;
  for (const u of f) {
    s += u.size[n];
    const d = u.pos[n] + u.size[n];
    d > o && (o = d);
  }
  const r = [...f].sort((u, d) => u.pos[n] - d.pos[n]), l = r[0].pos[n], a = (o - l - s) / (i - 1);
  let h = l;
  for (let u = 0; u < i; u++) {
    const d = r[u];
    d.pos[n] = h + a * u, h += d.size[n];
  }
}
function alignNodes(f, t, i) {
  if (!f) return;
  const n = i === void 0 ? getBoundaryNodes(f) : { top: i, right: i, bottom: i, left: i };
  if (n !== null)
    for (const s of f)
      switch (t) {
        case "right":
          s.pos[0] = n.right.pos[0] + n.right.size[0] - s.size[0];
          break;
        case "left":
          s.pos[0] = n.left.pos[0];
          break;
        case "top":
          s.pos[1] = n.top.pos[1];
          break;
        case "bottom":
          s.pos[1] = n.bottom.pos[1] + n.bottom.size[1] - s.size[1];
          break;
      }
}
var Jt, Qt, te, ct, ot, ee, ie, ne, D, Kt, ut, Vt, it, q, Xt, yt, Fe, Z, ft, We, Be, ze, He, xe, Ue, Lt, kt, Ve, Xe, Ye, $e, Ke, je, jt, Ct;
const E = class E {
  /**
   * Creates a new instance of LGraphCanvas.
   * @param canvas The canvas HTML element (or its id) to use, or null / undefined to leave blank.
   * @param graph The graph that owns this canvas.
   * @param options
   */
  constructor(t, i, n) {
    P(this, D);
    /**
     * The state of this canvas, e.g. whether it is being dragged, or read-only.
     *
     * Implemented as a POCO that can be proxied without side-effects.
     */
    c(this, "state", {
      draggingItems: !1,
      draggingCanvas: !1,
      readOnly: !1,
      hoveringOver: CanvasItem.Nothing,
      shouldSetCursor: !0
    });
    // Whether the canvas was previously being dragged prior to pressing space key.
    // null if space key is not pressed.
    c(this, "_previously_dragging_canvas", null);
    P(this, ut, 0);
    c(this, "options");
    c(this, "background_image");
    c(this, "ds");
    c(this, "pointer");
    c(this, "zoom_modify_alpha");
    c(this, "zoom_speed");
    c(this, "node_title_color");
    c(this, "default_link_color");
    c(this, "default_connection_color");
    c(this, "default_connection_color_byType");
    c(this, "default_connection_color_byTypeOff");
    /** Gets link colours. Extremely basic impl. until the legacy object dictionaries are removed. */
    c(this, "colourGetter", {
      getConnectedColor: (t) => this.default_connection_color_byType[t] || this.default_connection_color.output_on,
      getDisconnectedColor: (t) => this.default_connection_color_byTypeOff[t] || this.default_connection_color_byType[t] || this.default_connection_color.output_off
    });
    c(this, "highquality_render");
    c(this, "use_gradients");
    c(this, "editor_alpha");
    c(this, "pause_rendering");
    c(this, "clear_background");
    c(this, "clear_background_color");
    c(this, "render_only_selected");
    c(this, "show_info");
    c(this, "allow_dragcanvas");
    c(this, "allow_dragnodes");
    c(this, "allow_interaction");
    c(this, "multi_select");
    c(this, "allow_searchbox");
    c(this, "allow_reconnect_links");
    c(this, "align_to_grid");
    c(this, "drag_mode");
    c(this, "dragging_rectangle");
    c(this, "filter");
    c(this, "set_canvas_dirty_on_mouse_event");
    c(this, "always_render_background");
    c(this, "render_shadows");
    c(this, "render_canvas_border");
    c(this, "render_connections_shadows");
    c(this, "render_connections_border");
    c(this, "render_curved_connections");
    c(this, "render_connection_arrows");
    c(this, "render_collapsed_slots");
    c(this, "render_execution_order");
    c(this, "render_link_tooltip");
    /** Shape of the markers shown at the midpoint of links.  Default: Circle */
    c(this, "linkMarkerShape", LinkMarkerShape.Circle);
    c(this, "links_render_mode");
    /** Zoom threshold for low quality rendering. Zoom below this threshold will render low quality. */
    c(this, "low_quality_zoom_threshold", 0.6);
    /** mouse in canvas coordinates, where 0,0 is the top-left corner of the blue rectangle */
    c(this, "mouse");
    /** mouse in graph coordinates, where 0,0 is the top-left corner of the blue rectangle */
    c(this, "graph_mouse");
    /** @deprecated LEGACY: REMOVE THIS, USE {@link graph_mouse} INSTEAD */
    c(this, "canvas_mouse");
    /** to personalize the search box */
    c(this, "onSearchBox");
    c(this, "onSearchBoxSelection");
    c(this, "onMouse");
    /** to render background objects (behind nodes and connections) in the canvas affected by transform */
    c(this, "onDrawBackground");
    /** to render foreground objects (above nodes and connections) in the canvas affected by transform */
    c(this, "onDrawForeground");
    c(this, "connections_width");
    /** The current node being drawn by {@link drawNode}.  This should NOT be used to determine the currently selected node.  See {@link selectedItems} */
    c(this, "current_node");
    /** used for widgets */
    c(this, "node_widget");
    /** The link to draw a tooltip for. */
    c(this, "over_link_center");
    c(this, "last_mouse_position");
    /** The visible area of this canvas.  Tightly coupled with {@link ds}. */
    c(this, "visible_area");
    /** Contains all links and reroutes that were rendered.  Repopulated every render cycle. */
    c(this, "renderedPaths", /* @__PURE__ */ new Set());
    /** @deprecated Replaced by {@link renderedPaths}, but length is set to 0 by some extensions. */
    c(this, "visible_links", []);
    /** @deprecated This array is populated and cleared to support legacy extensions. The contents are ignored by Litegraph. */
    c(this, "connecting_links");
    c(this, "linkConnector", new LinkConnector((t) => this.connecting_links = t));
    /** The viewport of this canvas.  Tightly coupled with {@link ds}. */
    c(this, "viewport");
    c(this, "autoresize");
    c(this, "frame", 0);
    c(this, "last_draw_time", 0);
    c(this, "render_time", 0);
    c(this, "fps", 0);
    /** @deprecated See {@link LGraphCanvas.selectedItems} */
    c(this, "selected_nodes", {});
    /** All selected nodes, groups, and reroutes */
    c(this, "selectedItems", /* @__PURE__ */ new Set());
    /** The group currently being resized. */
    c(this, "resizingGroup", null);
    /** @deprecated See {@link LGraphCanvas.selectedItems} */
    c(this, "selected_group", null);
    /** The nodes that are currently visible on the canvas. */
    c(this, "visible_nodes", []);
    /**
     * The IDs of the nodes that are currently visible on the canvas. More
     * performant than {@link visible_nodes} for visibility checks.
     */
    P(this, Vt, /* @__PURE__ */ new Set());
    c(this, "node_over");
    c(this, "node_capturing_input");
    c(this, "highlighted_links", {});
    P(this, it, /* @__PURE__ */ new Set());
    c(this, "dirty_canvas", !0);
    c(this, "dirty_bgcanvas", !0);
    /** A map of nodes that require selective-redraw */
    c(this, "dirty_nodes", /* @__PURE__ */ new Map());
    c(this, "dirty_area");
    /** @deprecated Unused */
    c(this, "node_in_panel");
    c(this, "last_mouse", [0, 0]);
    c(this, "last_mouseclick", 0);
    c(this, "graph");
    c(this, "canvas");
    c(this, "bgcanvas");
    c(this, "ctx");
    c(this, "_events_binded");
    c(this, "bgctx");
    c(this, "is_rendering");
    /** @deprecated Panels */
    c(this, "block_click");
    /** @deprecated Panels */
    c(this, "last_click_position");
    c(this, "resizing_node");
    /** @deprecated See {@link LGraphCanvas.resizingGroup} */
    c(this, "selected_group_resizing");
    /** @deprecated See {@link pointer}.{@link CanvasPointer.dragStarted dragStarted} */
    c(this, "last_mouse_dragging");
    c(this, "onMouseDown");
    c(this, "_highlight_pos");
    c(this, "_highlight_input");
    // TODO: Check if panels are used
    /** @deprecated Panels */
    c(this, "node_panel");
    /** @deprecated Panels */
    c(this, "options_panel");
    c(this, "_bg_img");
    c(this, "_pattern");
    c(this, "_pattern_img");
    // TODO: This looks like another panel thing
    c(this, "prompt_box");
    c(this, "search_box");
    /** @deprecated Panels */
    c(this, "SELECTED_NODE");
    /** @deprecated Panels */
    c(this, "NODEPANEL_IS_OPEN");
    /** Once per frame check of snap to grid value.  @todo Update on change. */
    P(this, q);
    /** Set on keydown, keyup. @todo */
    P(this, Xt, !1);
    /** If true, enable drag zoom. Ctrl+Shift+Drag Up/Down: zoom canvas. */
    c(this, "dragZoomEnabled", !1);
    /** The start position of the drag zoom. */
    P(this, yt, null);
    c(this, "onClear");
    /** called after moving a node @deprecated Does not handle multi-node move, and can return the wrong node. */
    c(this, "onNodeMoved");
    /** @deprecated Called with the deprecated {@link selected_nodes} when the selection changes. Replacement not yet impl. */
    c(this, "onSelectionChange");
    /** called when rendering a tooltip */
    c(this, "onDrawLinkTooltip");
    /** to render foreground objects not affected by transform (for GUIs) */
    c(this, "onDrawOverlay");
    c(this, "onRenderBackground");
    c(this, "onNodeDblClicked");
    c(this, "onShowNodePanel");
    c(this, "onNodeSelected");
    c(this, "onNodeDeselected");
    c(this, "onRender");
    n || (n = {}), this.options = n, this.background_image = E.DEFAULT_BACKGROUND_IMAGE, this.ds = new DragAndScale(t), this.pointer = new CanvasPointer(t), this.linkConnector.events.addEventListener("reset", () => {
      this.connecting_links = null;
    }), this.linkConnector.events.addEventListener("dropped-on-canvas", (s) => {
      var l;
      if (!this.connecting_links) return;
      const o = s.detail;
      this.emitEvent({
        subType: "empty-release",
        originalEvent: o,
        linkReleaseContext: { links: this.connecting_links }
      });
      const r = this.linkConnector.renderLinks[0];
      if (LiteGraph.release_link_on_empty_shows_menu) {
        const a = this.linkConnector.state.connectingTo === "input" ? {
          node_from: r.node,
          slot_from: r.fromSlot,
          type_filter_in: r.fromSlot.type
        } : {
          node_to: r.node,
          slot_from: r.fromSlot,
          type_filter_out: r.fromSlot.type
        }, h = (l = r.fromReroute) == null ? void 0 : l.id;
        "shiftKey" in o && o.shiftKey ? this.allow_searchbox && this.showSearchBox(o, a) : this.linkConnector.state.connectingTo === "input" ? this.showConnectionMenu({ nodeFrom: r.node, slotFrom: r.fromSlot, e: o, afterRerouteId: h }) : this.showConnectionMenu({ nodeTo: r.node, slotTo: r.fromSlot, e: o, afterRerouteId: h });
      }
    }), this.zoom_modify_alpha = !0, this.zoom_speed = 1.1, this.node_title_color = LiteGraph.NODE_TITLE_COLOR, this.default_link_color = LiteGraph.LINK_COLOR, this.default_connection_color = {
      input_off: "#778",
      input_on: "#7F7",
      output_off: "#778",
      output_on: "#7F7"
    }, this.default_connection_color_byType = {
      /* number: "#7F7",
            string: "#77F",
            boolean: "#F77", */
    }, this.default_connection_color_byTypeOff = {
      /* number: "#474",
            string: "#447",
            boolean: "#744", */
    }, this.highquality_render = !0, this.use_gradients = !1, this.editor_alpha = 1, this.pause_rendering = !1, this.clear_background = !0, this.clear_background_color = "#222", this.render_only_selected = !0, this.show_info = !0, this.allow_dragcanvas = !0, this.allow_dragnodes = !0, this.allow_interaction = !0, this.multi_select = !1, this.allow_searchbox = !0, this.allow_reconnect_links = !0, this.align_to_grid = !1, this.drag_mode = !1, this.dragging_rectangle = null, this.filter = null, this.set_canvas_dirty_on_mouse_event = !0, this.always_render_background = !1, this.render_shadows = !0, this.render_canvas_border = !0, this.render_connections_shadows = !1, this.render_connections_border = !0, this.render_curved_connections = !1, this.render_connection_arrows = !1, this.render_collapsed_slots = !0, this.render_execution_order = !1, this.render_link_tooltip = !0, this.links_render_mode = LinkRenderType.SPLINE_LINK, this.mouse = [0, 0], this.graph_mouse = [0, 0], this.canvas_mouse = this.graph_mouse, this.connections_width = 3, this.current_node = null, this.node_widget = null, this.last_mouse_position = [0, 0], this.visible_area = this.ds.visible_area, this.connecting_links = null, this.viewport = n.viewport || null, this.graph = i, i == null || i.attachCanvas(this), this.canvas = void 0, this.bgcanvas = void 0, this.ctx = void 0, this.setCanvas(t, n.skip_events), this.clear(), E._measureText = (s, o = this.inner_text_font) => {
      const { ctx: r } = this, { font: l } = r;
      try {
        return r.font = o, r.measureText(s).width;
      } finally {
        r.font = l;
      }
    }, n.skip_render || this.startRendering(), this.autoresize = n.autoresize;
  }
  // #region Legacy accessors
  /** @deprecated @inheritdoc {@link LGraphCanvasState.readOnly} */
  get read_only() {
    return this.state.readOnly;
  }
  set read_only(t) {
    this.state.readOnly = t, S(this, D, Kt).call(this);
  }
  get isDragging() {
    return this.state.draggingItems;
  }
  set isDragging(t) {
    this.state.draggingItems = t;
  }
  get hoveringOver() {
    return this.state.hoveringOver;
  }
  set hoveringOver(t) {
    this.state.hoveringOver = t, S(this, D, Kt).call(this);
  }
  /** @deprecated Replace all references with {@link pointer}.{@link CanvasPointer.isDown isDown}. */
  get pointer_is_down() {
    return this.pointer.isDown;
  }
  /** @deprecated Replace all references with {@link pointer}.{@link CanvasPointer.isDouble isDouble}. */
  get pointer_is_double() {
    return this.pointer.isDouble;
  }
  /** @deprecated @inheritdoc {@link LGraphCanvasState.draggingCanvas} */
  get dragging_canvas() {
    return this.state.draggingCanvas;
  }
  set dragging_canvas(t) {
    this.state.draggingCanvas = t, S(this, D, Kt).call(this);
  }
  // #endregion Legacy accessors
  /**
   * @deprecated Use {@link LGraphNode.titleFontStyle} instead.
   */
  get title_text_font() {
    return `${LiteGraph.NODE_TEXT_SIZE}px ${LiteGraph.NODE_FONT}`;
  }
  get inner_text_font() {
    return `normal ${LiteGraph.NODE_SUBTEXT_SIZE}px ${LiteGraph.NODE_FONT}`;
  }
  /** Maximum frames per second to render. 0: unlimited. Default: 0 */
  get maximumFps() {
    return L(this, ut) > Number.EPSILON ? L(this, ut) / 1e3 : 0;
  }
  set maximumFps(t) {
    W(this, ut, t > Number.EPSILON ? 1e3 / t : 0);
  }
  /**
   * @deprecated Use {@link LiteGraphGlobal.ROUND_RADIUS} instead.
   */
  get round_radius() {
    return LiteGraph.ROUND_RADIUS;
  }
  /**
   * @deprecated Use {@link LiteGraphGlobal.ROUND_RADIUS} instead.
   */
  set round_radius(t) {
    LiteGraph.ROUND_RADIUS = t;
  }
  /**
   * Render low quality when zoomed out.
   */
  get low_quality() {
    return this.ds.scale < this.low_quality_zoom_threshold;
  }
  static onGroupAdd(t, i, n) {
    const s = E.active_canvas, o = new LiteGraph.LGraphGroup();
    if (o.pos = s.convertEventToCanvasOffset(n), !s.graph) throw new NullGraphError();
    s.graph.add(o);
  }
  /**
   * @deprecated Functionality moved to {@link getBoundaryNodes}.  The new function returns null on failure, instead of an object with all null properties.
   * Determines the furthest nodes in each direction
   * @param nodes the nodes to from which boundary nodes will be extracted
   * @returns
   */
  static getBoundaryNodes(t) {
    const i = Array.isArray(t) ? t : Object.values(t);
    return getBoundaryNodes(i) ?? {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
  }
  /**
   * @deprecated Functionality moved to {@link alignNodes}.  The new function does not set dirty canvas.
   * @param nodes a list of nodes
   * @param direction Direction to align the nodes
   * @param align_to Node to align to (if null, align to the furthest node in the given direction)
   */
  static alignNodes(t, i, n) {
    alignNodes(Object.values(t), i, n), E.active_canvas.setDirty(!0, !0);
  }
  static onNodeAlign(t, i, n, s, o) {
    new LiteGraph.ContextMenu(["Top", "Bottom", "Left", "Right"], {
      event: n,
      callback: r,
      parentMenu: s
    });
    function r(l) {
      alignNodes(
        Object.values(E.active_canvas.selected_nodes),
        l.toLowerCase(),
        o
      ), E.active_canvas.setDirty(!0, !0);
    }
  }
  static onGroupAlign(t, i, n, s) {
    new LiteGraph.ContextMenu(["Top", "Bottom", "Left", "Right"], {
      event: n,
      callback: o,
      parentMenu: s
    });
    function o(r) {
      alignNodes(
        Object.values(E.active_canvas.selected_nodes),
        r.toLowerCase()
      ), E.active_canvas.setDirty(!0, !0);
    }
  }
  static createDistributeMenu(t, i, n, s) {
    new LiteGraph.ContextMenu(["Vertically", "Horizontally"], {
      event: n,
      callback: o,
      parentMenu: s
    });
    function o(r) {
      const l = E.active_canvas;
      distributeNodes(Object.values(l.selected_nodes), r === "Horizontally"), l.setDirty(!0, !0);
    }
  }
  static onMenuAdd(t, i, n, s, o) {
    const r = E.active_canvas, l = r.getCanvasWindow(), { graph: a } = r;
    if (!a) return;
    return h("", s), !1;
    function h(u, d) {
      if (!a) return;
      const p = LiteGraph.getNodeTypesCategories(r.filter || a.filter).filter((_) => _.startsWith(u)), g = [];
      for (const _ of p) {
        if (!_) continue;
        const m = new RegExp(`^(${u})`), w = _.replace(m, "").split("/", 1)[0], k = u === "" ? `${w}/` : `${u}${w}/`;
        let I = w;
        I.includes("::") && (I = I.split("::", 2)[1]), g.findIndex((T) => T.value === k) === -1 && g.push({
          value: k,
          content: I,
          has_submenu: !0,
          callback: function(T, O, A, G) {
            h(T.value, G);
          }
        });
      }
      const y = LiteGraph.getNodeTypesInCategory(
        u.slice(0, -1),
        r.filter || a.filter
      );
      for (const _ of y) {
        if (_.skip_list) continue;
        const m = {
          value: _.type,
          content: _.title,
          has_submenu: !1,
          callback: function(w, k, I, N) {
            if (!r.graph) throw new NullGraphError();
            const T = N.getFirstEvent();
            r.graph.beforeChange();
            const O = LiteGraph.createNode(w.value);
            if (O) {
              if (!T) throw new TypeError("Context menu event was null. This should not occur in normal usage.");
              O.pos = r.convertEventToCanvasOffset(T), r.graph.add(O);
            } else
              console.warn("Failed to create node of type:", w.value);
            o == null || o(O), r.graph.afterChange();
          }
        };
        g.push(m);
      }
      new LiteGraph.ContextMenu(g, { event: n, parentMenu: d }, l);
    }
  }
  static onMenuCollapseAll() {
  }
  static onMenuNodeEdit() {
  }
  /** @param _options Parameter is never used */
  static showMenuNodeOptionalOutputs(t, i, n, s, o) {
    var u;
    if (!o) return;
    const r = E.active_canvas;
    let l = [];
    LiteGraph.do_add_triggers_slots && o.findOutputSlot("onExecuted") == -1 && l.push({ content: "On Executed", value: ["onExecuted", LiteGraph.EVENT, { nameLocked: !0 }], className: "event" });
    const a = (u = o.onMenuNodeOutputs) == null ? void 0 : u.call(o, l);
    if (a && (l = a), !l.length) return;
    new LiteGraph.ContextMenu(
      l,
      {
        event: n,
        callback: h,
        parentMenu: s,
        node: o
      }
    );
    function h(d, p, g) {
      var m;
      if (!o || (d.callback && d.callback.call(this, o, d, p, g), !d.value)) return;
      const y = d.value[1];
      if (y && (typeof y == "object" || Array.isArray(y))) {
        const w = [];
        for (const k in y)
          w.push({ content: k, value: y[k] });
        return new LiteGraph.ContextMenu(w, {
          event: p,
          callback: h,
          parentMenu: s,
          node: o
        }), !1;
      }
      const { graph: _ } = o;
      if (!_) throw new NullGraphError();
      _.beforeChange(), o.addOutput(d.value[0], d.value[1], d.value[2]), (m = o.onNodeOutputAdd) == null || m.call(o, d.value), r.setDirty(!0, !0), _.afterChange();
    }
    return !1;
  }
  /** @param value Parameter is never used */
  static onShowMenuNodeProperties(t, i, n, s, o) {
    if (!o || !o.properties) return;
    const r = E.active_canvas, l = r.getCanvasWindow(), a = [];
    for (const u in o.properties) {
      t = o.properties[u] !== void 0 ? o.properties[u] : " ", typeof t == "object" && (t = JSON.stringify(t));
      const d = o.getPropertyInfo(u);
      (d.type == "enum" || d.type == "combo") && (t = E.getPropertyPrintableValue(t, d.values)), t = E.decodeHTML(stringOrEmpty(t)), a.push({
        content: `<span class='property_name'>${d.label || u}</span><span class='property_value'>${t}</span>`,
        value: u
      });
    }
    if (!a.length)
      return;
    new LiteGraph.ContextMenu(
      a,
      {
        event: n,
        callback: h,
        parentMenu: s,
        allow_html: !0,
        node: o
      },
      // @ts-expect-error Unused
      l
    );
    function h(u) {
      if (!o) return;
      const d = this.getBoundingClientRect();
      r.showEditPropertyValue(o, u.value, {
        position: [d.left, d.top]
      });
    }
    return !1;
  }
  /** @deprecated */
  static decodeHTML(t) {
    const i = document.createElement("div");
    return i.textContent = t, i.innerHTML;
  }
  static onMenuResizeNode(t, i, n, s, o) {
    if (!o) return;
    const r = function(a) {
      a.setSize(a.computeSize());
    }, l = E.active_canvas;
    if (!l.selected_nodes || Object.keys(l.selected_nodes).length <= 1)
      r(o);
    else
      for (const a in l.selected_nodes)
        r(l.selected_nodes[a]);
    l.setDirty(!0, !0);
  }
  // TODO refactor :: this is used fot title but not for properties!
  static onShowPropertyEditor(t, i, n, s, o) {
    const r = t.property || "title", l = o[r], a = document.createElement("span");
    a.className = "name", a.textContent = r;
    const h = document.createElement("input");
    Object.assign(h, { type: "text", className: "value", autofocus: !0 });
    const u = document.createElement("button");
    u.textContent = "OK";
    const d = Object.assign(document.createElement("div"), {
      is_modified: !1,
      className: "graphdialog",
      close: () => d.remove()
    });
    d.append(a, h, u), h.value = String(l), h.addEventListener("blur", function() {
      this.focus();
    }), h.addEventListener("keydown", (N) => {
      if (d.is_modified = !0, N.key == "Escape")
        d.close();
      else if (N.key == "Enter")
        k();
      else if (!N.target || !("localName" in N.target) || N.target.localName != "textarea")
        return;
      N.preventDefault(), N.stopPropagation();
    });
    const p = E.active_canvas, g = p.canvas, y = g.getBoundingClientRect(), _ = y ? -20 - y.left : -20, m = y ? -20 - y.top : -20;
    if (n ? (d.style.left = `${n.clientX + _}px`, d.style.top = `${n.clientY + m}px`) : (d.style.left = `${g.width * 0.5 + _}px`, d.style.top = `${g.height * 0.5 + m}px`), u.addEventListener("click", k), g.parentNode == null) throw new TypeError("canvasEl.parentNode was null");
    g.parentNode.append(d), h.focus();
    let w;
    d.addEventListener("mouseleave", function() {
      LiteGraph.dialog_close_on_mouse_leave && !d.is_modified && LiteGraph.dialog_close_on_mouse_leave && (w = setTimeout(
        d.close,
        LiteGraph.dialog_close_on_mouse_leave_delay
      ));
    }), d.addEventListener("mouseenter", function() {
      LiteGraph.dialog_close_on_mouse_leave && w && clearTimeout(w);
    });
    function k() {
      h && I(h.value);
    }
    function I(N) {
      t.type == "Number" ? N = Number(N) : t.type == "Boolean" && (N = !!N), o[r] = N, d.remove(), p.setDirty(!0, !0);
    }
  }
  static getPropertyPrintableValue(t, i) {
    if (!i || Array.isArray(i))
      return String(t);
    if (typeof i == "object") {
      let n = "";
      for (const s in i)
        if (i[s] == t) {
          n = s;
          break;
        }
      return `${String(t)} (${n})`;
    }
  }
  static onMenuNodeCollapse(t, i, n, s, o) {
    if (!o.graph) throw new NullGraphError();
    o.graph.beforeChange();
    const r = function(a) {
      a.collapse();
    }, l = E.active_canvas;
    if (!l.selected_nodes || Object.keys(l.selected_nodes).length <= 1)
      r(o);
    else
      for (const a in l.selected_nodes)
        r(l.selected_nodes[a]);
    o.graph.afterChange();
  }
  static onMenuToggleAdvanced(t, i, n, s, o) {
    if (!o.graph) throw new NullGraphError();
    o.graph.beforeChange();
    const r = function(a) {
      a.toggleAdvanced();
    }, l = E.active_canvas;
    if (!l.selected_nodes || Object.keys(l.selected_nodes).length <= 1)
      r(o);
    else
      for (const a in l.selected_nodes)
        r(l.selected_nodes[a]);
    o.graph.afterChange();
  }
  static onMenuNodeMode(t, i, n, s, o) {
    new LiteGraph.ContextMenu(
      LiteGraph.NODE_MODES,
      { event: n, callback: r, parentMenu: s, node: o }
    );
    function r(l) {
      if (!o) return;
      const a = Object.values(LiteGraph.NODE_MODES).indexOf(l), h = function(d) {
        a !== -1 && LiteGraph.NODE_MODES[a] ? d.changeMode(a) : (console.warn(`unexpected mode: ${l}`), d.changeMode(LGraphEventMode.ALWAYS));
      }, u = E.active_canvas;
      if (!u.selected_nodes || Object.keys(u.selected_nodes).length <= 1)
        h(o);
      else
        for (const d in u.selected_nodes)
          h(u.selected_nodes[d]);
    }
    return !1;
  }
  /** @param value Parameter is never used */
  static onMenuNodeColors(t, i, n, s, o) {
    if (!o) throw "no node for color";
    const r = [];
    r.push({
      value: null,
      content: "<span style='display: block; padding-left: 4px;'>No color</span>"
    });
    for (const a in E.node_colors) {
      const h = E.node_colors[a];
      t = {
        value: a,
        content: `<span style='display: block; color: #999; padding-left: 4px; border-left: 8px solid ${h.color}; background-color:${h.bgcolor}'>${a}</span>`
      }, r.push(t);
    }
    new LiteGraph.ContextMenu(r, {
      event: n,
      callback: l,
      parentMenu: s,
      node: o
    });
    function l(a) {
      if (!o) return;
      const h = function(d) {
        const p = a.value ? E.node_colors[a.value] : null;
        d.setColorOption(p);
      }, u = E.active_canvas;
      if (!u.selected_nodes || Object.keys(u.selected_nodes).length <= 1)
        h(o);
      else
        for (const d in u.selected_nodes)
          h(u.selected_nodes[d]);
      u.setDirty(!0, !0);
    }
    return !1;
  }
  static onMenuNodeShapes(t, i, n, s, o) {
    if (!o) throw "no node passed";
    new LiteGraph.ContextMenu(LiteGraph.VALID_SHAPES, {
      event: n,
      callback: r,
      parentMenu: s,
      node: o
    });
    function r(l) {
      if (!o) return;
      if (!o.graph) throw new NullGraphError();
      o.graph.beforeChange();
      const a = function(u) {
        u.shape = l;
      }, h = E.active_canvas;
      if (!h.selected_nodes || Object.keys(h.selected_nodes).length <= 1)
        a(o);
      else
        for (const u in h.selected_nodes)
          a(h.selected_nodes[u]);
      o.graph.afterChange(), h.setDirty(!0);
    }
    return !1;
  }
  static onMenuNodeRemove() {
    E.active_canvas.deleteSelected();
  }
  static onMenuNodeClone(t, i, n, s, o) {
    const { graph: r } = o;
    if (!r) throw new NullGraphError();
    r.beforeChange();
    const l = /* @__PURE__ */ new Set(), a = function(u, d) {
      if (u.clonable === !1) return;
      const p = u.clone();
      if (p) {
        if (p.pos = [u.pos[0] + 5, u.pos[1] + 5], !u.graph) throw new NullGraphError();
        u.graph.add(p), d.add(p);
      }
    }, h = E.active_canvas;
    if (!h.selected_nodes || Object.keys(h.selected_nodes).length <= 1)
      a(o, l);
    else
      for (const u in h.selected_nodes)
        a(h.selected_nodes[u], l);
    l.size && h.selectNodes([...l]), r.afterChange(), h.setDirty(!0, !0);
  }
  /**
   * clears all the data inside
   *
   */
  clear() {
    var t, i;
    this.frame = 0, this.last_draw_time = 0, this.render_time = 0, this.fps = 0, this.dragging_rectangle = null, this.selected_nodes = {}, this.selected_group = null, this.selectedItems.clear(), (t = this.onSelectionChange) == null || t.call(this, this.selected_nodes), this.visible_nodes = [], this.node_over = void 0, this.node_capturing_input = null, this.connecting_links = null, this.highlighted_links = {}, this.dragging_canvas = !1, S(this, D, Z).call(this), this.dirty_area = null, this.node_in_panel = null, this.node_widget = null, this.last_mouse = [0, 0], this.last_mouseclick = 0, this.pointer.reset(), this.visible_area.set([0, 0, 0, 0]), (i = this.onClear) == null || i.call(this);
  }
  /**
   * Assigns a new graph to this canvas.
   */
  setGraph(t) {
    const { graph: i } = this;
    if (t === i) return;
    const n = {
      bubbles: !0,
      detail: { newGraph: t, oldGraph: i }
    };
    this.clear(), t.attachCanvas(this), this.canvas.dispatchEvent(new CustomEvent("litegraph:set-graph", n)), S(this, D, Z).call(this);
  }
  /**
   * @returns the visually active graph (in case there are more in the stack)
   */
  getCurrentGraph() {
    return this.graph;
  }
  /**
   * Sets the current HTML canvas element.
   * Calls bindEvents to add input event listeners, and (re)creates the background canvas.
   * @param canvas The canvas element to assign, or its HTML element ID.  If null or undefined, the current reference is cleared.
   * @param skip_events If true, events on the previous canvas will not be removed.  Has no effect on the first invocation.
   */
  setCanvas(t, i) {
    var o;
    const n = S(this, D, Fe).call(this, t);
    if (n === this.canvas || (!n && this.canvas && !i && this.unbindEvents(), this.canvas = n, this.ds.element = n, this.pointer.element = n, !n)) return;
    n.className += " lgraphcanvas", n.data = this, this.bgcanvas = document.createElement("canvas"), this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height;
    const s = (o = n.getContext) == null ? void 0 : o.call(n, "2d");
    if (s == null)
      throw n.localName != "canvas" ? `Element supplied for LGraphCanvas must be a <canvas> element, you passed a ${n.localName}` : "This browser doesn't support Canvas";
    this.ctx = s, i || this.bindEvents();
  }
  /** Captures an event and prevents default - returns false. */
  _doNothing(t) {
    return t.preventDefault(), !1;
  }
  /** Captures an event and prevents default - returns true. */
  _doReturnTrue(t) {
    return t.preventDefault(), !0;
  }
  /**
   * binds mouse, keyboard, touch and drag events to the canvas
   */
  bindEvents() {
    if (this._events_binded) {
      console.warn("LGraphCanvas: events already binded");
      return;
    }
    const { canvas: t } = this, { document: i } = this.getCanvasWindow();
    this._mousedown_callback = this.processMouseDown.bind(this), this._mousewheel_callback = this.processMouseWheel.bind(this), this._mousemove_callback = this.processMouseMove.bind(this), this._mouseup_callback = this.processMouseUp.bind(this), this._mouseout_callback = this.processMouseOut.bind(this), this._mousecancel_callback = this.processMouseCancel.bind(this), t.addEventListener("pointerdown", this._mousedown_callback, !0), t.addEventListener("wheel", this._mousewheel_callback, !1), t.addEventListener("pointerup", this._mouseup_callback, !0), t.addEventListener("pointermove", this._mousemove_callback), t.addEventListener("pointerout", this._mouseout_callback), t.addEventListener("pointercancel", this._mousecancel_callback, !0), t.addEventListener("contextmenu", this._doNothing), this._key_callback = this.processKey.bind(this), t.addEventListener("keydown", this._key_callback, !0), i.addEventListener("keyup", this._key_callback, !0), t.addEventListener("dragover", this._doNothing, !1), t.addEventListener("dragend", this._doNothing, !1), t.addEventListener("dragenter", this._doReturnTrue, !1), this._events_binded = !0;
  }
  /**
   * unbinds mouse events from the canvas
   */
  unbindEvents() {
    if (!this._events_binded) {
      console.warn("LGraphCanvas: no events binded");
      return;
    }
    const { document: t } = this.getCanvasWindow(), { canvas: i } = this;
    i.removeEventListener("pointercancel", this._mousecancel_callback), i.removeEventListener("pointerout", this._mouseout_callback), i.removeEventListener("pointermove", this._mousemove_callback), i.removeEventListener("pointerup", this._mouseup_callback), i.removeEventListener("pointerdown", this._mousedown_callback), i.removeEventListener("wheel", this._mousewheel_callback), i.removeEventListener("keydown", this._key_callback), t.removeEventListener("keyup", this._key_callback), i.removeEventListener("contextmenu", this._doNothing), i.removeEventListener("dragenter", this._doReturnTrue), this._mousedown_callback = void 0, this._mousewheel_callback = void 0, this._key_callback = void 0, this._events_binded = !1;
  }
  /**
   * Ensures the canvas will be redrawn on the next frame by setting the dirty flag(s).
   * Without parameters, this function does nothing.
   * @todo Impl. `setDirty()` or similar as shorthand to redraw everything.
   * @param fgcanvas If true, marks the foreground canvas as dirty (nodes and anything drawn on top of them).  Default: false
   * @param bgcanvas If true, mark the background canvas as dirty (background, groups, links).  Default: false
   */
  setDirty(t, i) {
    t && (this.dirty_canvas = !0), i && (this.dirty_bgcanvas = !0);
  }
  /**
   * Used to attach the canvas in a popup
   * @returns returns the window where the canvas is attached (the DOM root node)
   */
  getCanvasWindow() {
    if (!this.canvas) return window;
    const t = this.canvas.ownerDocument;
    return t.defaultView || t.parentWindow;
  }
  /**
   * starts rendering the content of the canvas when needed
   *
   */
  startRendering() {
    if (this.is_rendering) return;
    this.is_rendering = !0, t.call(this);
    function t() {
      this.pause_rendering || this.draw();
      const i = this.getCanvasWindow();
      if (this.is_rendering)
        if (L(this, ut) > 0) {
          const n = L(this, ut) - (LiteGraph.getTime() - this.last_draw_time);
          setTimeout(t.bind(this), Math.max(1, n));
        } else
          i.requestAnimationFrame(t.bind(this));
    }
  }
  /**
   * stops rendering the content of the canvas (to save resources)
   *
   */
  stopRendering() {
    this.is_rendering = !1;
  }
  /* LiteGraphCanvas input */
  // used to block future mouse events (because of im gui)
  blockClick() {
    this.block_click = !0, this.last_mouseclick = 0;
  }
  /**
   * Gets the widget at the current cursor position
   * @param node Optional node to check for widgets under cursor
   * @returns The widget located at the current cursor position or null
   */
  getWidgetAtCursor(t) {
    return t ?? (t = this.node_over), (t == null ? void 0 : t.getWidgetOnPos(this.graph_mouse[0], this.graph_mouse[1], !0)) ?? null;
  }
  /**
   * Clears highlight and mouse-over information from nodes that should not have it.
   *
   * Intended to be called when the pointer moves away from a node.
   * @param node The node that the mouse is now over
   * @param e MouseEvent that is triggering this
   */
  updateMouseOverNodes(t, i) {
    var s, o;
    if (!this.graph) throw new NullGraphError();
    const n = this.graph._nodes;
    for (const r of n)
      r.mouseOver && t != r && (r.mouseOver = null, this._highlight_input = void 0, this._highlight_pos = void 0, this.linkConnector.overWidget = void 0, r.lostFocusAt = LiteGraph.getTime(), (o = (s = this.node_over) == null ? void 0 : s.onMouseLeave) == null || o.call(s, i), this.node_over = void 0, this.dirty_canvas = !0);
  }
  processMouseDown(t) {
    var h, u;
    if (this.dragZoomEnabled && t.ctrlKey && t.shiftKey && !t.altKey && t.buttons) {
      W(this, yt, { pos: [t.x, t.y], scale: this.ds.scale });
      return;
    }
    const { graph: i, pointer: n } = this;
    if (this.adjustMouseEvent(t), t.isPrimary && n.down(t), this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !i) return;
    const s = this.getCanvasWindow();
    E.active_canvas = this;
    const o = t.clientX, r = t.clientY;
    if (this.ds.viewport = this.viewport, !(!this.viewport || isInRect(o, r, this.viewport))) return;
    const a = i.getNodeOnPos(t.canvasX, t.canvasY, this.visible_nodes) ?? void 0;
    if (this.mouse[0] = o, this.mouse[1] = r, this.graph_mouse[0] = t.canvasX, this.graph_mouse[1] = t.canvasY, this.last_click_position = [this.mouse[0], this.mouse[1]], n.isDouble = n.isDown && t.isPrimary, n.isDown = !0, this.canvas.focus(), LiteGraph.closeAllContextMenus(s), ((h = this.onMouse) == null ? void 0 : h.call(this, t)) != !0) {
      if (t.button === 0 && !n.isDouble)
        S(this, D, We).call(this, t, a);
      else if (t.button === 1)
        S(this, D, He).call(this, t, a);
      else if ((t.button === 2 || n.isDouble) && this.allow_interaction && !this.read_only) {
        if (a)
          this.processSelect(a, t, !0);
        else if (this.links_render_mode !== LinkRenderType.HIDDEN_LINK) {
          const d = i.getRerouteOnPos(t.canvasX, t.canvasY, L(this, it));
          d && (t.altKey ? n.onClick = (p) => {
            var g;
            p.altKey && (d.selected && (this.deselect(d), (g = this.onSelectionChange) == null || g.call(this, this.selected_nodes)), d.remove());
          } : this.processSelect(d, t, !0));
        }
        n.onClick ?? (n.onClick = () => this.processContextMenu(a, t));
      }
      this.last_mouse = [o, r], this.last_mouseclick = LiteGraph.getTime(), this.last_mouse_dragging = !0, i.change(), (!s.document.activeElement || s.document.activeElement.nodeName.toLowerCase() != "input" && s.document.activeElement.nodeName.toLowerCase() != "textarea") && t.preventDefault(), t.stopPropagation(), (u = this.onMouseDown) == null || u.call(this, t);
    }
  }
  /**
   * Called when a mouse move event has to be processed
   */
  processMouseMove(t) {
    var u, d, p, g;
    if (this.dragZoomEnabled && t.ctrlKey && t.shiftKey && L(this, yt)) {
      S(this, D, xe).call(this, t);
      return;
    }
    this.autoresize && this.resize(), this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0);
    const { graph: i, resizingGroup: n, linkConnector: s } = this;
    if (!i) return;
    E.active_canvas = this, this.adjustMouseEvent(t);
    const o = [t.clientX, t.clientY];
    this.mouse[0] = o[0], this.mouse[1] = o[1];
    const r = [
      o[0] - this.last_mouse[0],
      o[1] - this.last_mouse[1]
    ];
    if (this.last_mouse = o, this.graph_mouse[0] = t.canvasX, this.graph_mouse[1] = t.canvasY, t.isPrimary && this.pointer.move(t), this.block_click) {
      t.preventDefault();
      return;
    }
    if (t.dragging = this.last_mouse_dragging, this.node_widget) {
      const [y, _] = this.node_widget;
      if (_ != null && _.mouse) {
        const m = t.canvasX - y.pos[0], w = t.canvasY - y.pos[1], k = _.mouse(t, [m, w], y);
        k != null && (this.dirty_canvas = k);
      }
    }
    let l = CanvasItem.Nothing;
    const a = i.getNodeOnPos(
      t.canvasX,
      t.canvasY,
      this.visible_nodes
    ), h = this.dragging_rectangle;
    if (h)
      h[2] = t.canvasX - h[0], h[3] = t.canvasY - h[1], this.dirty_canvas = !0;
    else if (n)
      l |= CanvasItem.ResizeSe | CanvasItem.Group;
    else if (this.dragging_canvas)
      this.ds.offset[0] += r[0] / this.ds.scale, this.ds.offset[1] += r[1] / this.ds.scale, S(this, D, Z).call(this);
    else if ((this.allow_interaction || a != null && a.flags.allow_interaction) && !this.read_only) {
      if (s.isConnecting && (this.dirty_canvas = !0), this.updateMouseOverNodes(a, t), a) {
        l |= CanvasItem.Node, a.redraw_on_mouse && (this.dirty_canvas = !0);
        const y = [0, 0], _ = isOverNodeInput(a, t.canvasX, t.canvasY, y), m = isOverNodeOutput(a, t.canvasX, t.canvasY, y), w = a.getWidgetOnPos(t.canvasX, t.canvasY, !0);
        if (!a.mouseOver) {
          a.mouseOver = {
            inputId: null,
            outputId: null,
            overWidget: null
          }, this.node_over = a, this.dirty_canvas = !0;
          for (const k of L(this, it))
            k.hideSlots(), this.dirty_bgcanvas = !0;
          (u = a.onMouseEnter) == null || u.call(a, t);
        }
        if ((d = a.onMouseMove) == null || d.call(a, t, [t.canvasX - a.pos[0], t.canvasY - a.pos[1]], this), a.mouseOver.inputId !== _ || a.mouseOver.outputId !== m || a.mouseOver.overWidget !== w) {
          if (a.mouseOver.inputId = _, a.mouseOver.outputId = m, a.mouseOver.overWidget = w, s.overWidget = void 0, s.isConnecting) {
            const k = s.renderLinks.at(0);
            let I, N;
            if (!(!k || !s.isNodeValidDrop(a))) {
              if (s.state.connectingTo === "input")
                if (_ === -1 && m === -1) {
                  if (!s.overWidget) {
                    const T = a.findInputByType(k.fromSlot.type);
                    T && (N = T.slot, I = a.getInputPos(T.index));
                  }
                } else _ != -1 && a.inputs[_] && LiteGraph.isValidConnection(k.fromSlot.type, a.inputs[_].type) && (I = y, N = a.inputs[_]);
              else if (s.state.connectingTo === "output")
                if (_ === -1 && m === -1) {
                  const T = a.findOutputByType(k.fromSlot.type);
                  T && (I = a.getOutputPos(T.index));
                } else
                  m != -1 && a.outputs[m] && LiteGraph.isValidConnection(k.fromSlot.type, a.outputs[m].type) && (I = y);
            }
            this._highlight_pos = I, this._highlight_input = N;
          }
          this.dirty_canvas = !0;
        }
        a.inResizeCorner(t.canvasX, t.canvasY) && (l |= CanvasItem.ResizeSe);
      } else {
        l = S(this, D, Ue).call(this, l);
        const y = S(this, D, Ye).call(this, t);
        if (this.over_link_center !== y && (l |= CanvasItem.Link, this.over_link_center = y, this.dirty_bgcanvas = !0), this.canvas) {
          const _ = i.getGroupOnPos(t.canvasX, t.canvasY);
          _ && !t.ctrlKey && !this.read_only && _.isInResize(t.canvasX, t.canvasY) && (l |= CanvasItem.ResizeSe);
        }
      }
      if (this.node_capturing_input && this.node_capturing_input != a && ((g = (p = this.node_capturing_input).onMouseMove) == null || g.call(
        p,
        t,
        [
          t.canvasX - this.node_capturing_input.pos[0],
          t.canvasY - this.node_capturing_input.pos[1]
        ],
        this
      )), this.isDragging) {
        const y = this.selectedItems, _ = t.ctrlKey ? y : getAllNestedItems(y), m = r[0] / this.ds.scale, w = r[1] / this.ds.scale;
        for (const k of _)
          k.move(m, w, !0);
        S(this, D, Z).call(this);
      }
      this.resizing_node && (l |= CanvasItem.ResizeSe);
    }
    this.hoveringOver = l, t.preventDefault();
  }
  /**
   * Called when a mouse up event has to be processed
   */
  processMouseUp(t) {
    var r, l, a, h;
    if (t.isPrimary === !1) return;
    const { graph: i, pointer: n } = this;
    if (!i) return;
    E.active_canvas = this, this.adjustMouseEvent(t);
    const s = LiteGraph.getTime();
    if (t.click_time = s - this.last_mouseclick, n.up(t) === !0) {
      n.isDown = !1, n.isDouble = !1, this.connecting_links = null, this.dragging_canvas = !1, i.change(), t.stopPropagation(), t.preventDefault();
      return;
    }
    if (this.last_mouse_dragging = !1, this.last_click_position = null, this.block_click && (this.block_click = !1), t.button === 0) {
      this.selected_group = null, this.isDragging = !1;
      const u = t.canvasX, d = t.canvasY;
      this.linkConnector.isConnecting || (this.dirty_canvas = !0, (l = (r = this.node_over) == null ? void 0 : r.onMouseUp) == null || l.call(r, t, [u - this.node_over.pos[0], d - this.node_over.pos[1]], this), (h = (a = this.node_capturing_input) == null ? void 0 : a.onMouseUp) == null || h.call(a, t, [
        u - this.node_capturing_input.pos[0],
        d - this.node_capturing_input.pos[1]
      ]));
    } else t.button === 1 ? (this.dirty_canvas = !0, this.dragging_canvas = !1) : t.button === 2 && (this.dirty_canvas = !0);
    n.isDown = !1, n.isDouble = !1, i.change(), t.stopPropagation(), t.preventDefault();
  }
  /**
   * Called when the mouse moves off the canvas.  Clears all node hover states.
   * @param e
   */
  processMouseOut(t) {
    this.adjustMouseEvent(t), this.updateMouseOverNodes(null, t);
  }
  processMouseCancel() {
    console.warn("Pointer cancel!"), this.pointer.reset();
  }
  /**
   * Called when a mouse wheel event has to be processed
   */
  processMouseWheel(t) {
    if (!this.graph || !this.allow_dragcanvas) return;
    const i = t.wheelDeltaY ?? t.detail * -60;
    this.adjustMouseEvent(t);
    const n = [t.clientX, t.clientY];
    if (this.viewport && !isPointInRect(n, this.viewport)) return;
    let { scale: s } = this.ds;
    LiteGraph.macTrackpadGestures && (!LiteGraph.macGesturesRequireMac || navigator.userAgent.includes("Mac")) ? t.ctrlKey && !Number.isInteger(t.deltaY) ? (s *= 1 + t.deltaY * (1 - this.zoom_speed) * 0.18, this.ds.changeScale(s, [t.clientX, t.clientY], !1)) : (this.ds.offset[0] -= t.deltaX * 1.18 * (1 / s), this.ds.offset[1] -= t.deltaY * 1.18 * (1 / s)) : (i > 0 ? s *= this.zoom_speed : i < 0 && (s *= 1 / this.zoom_speed), this.ds.changeScale(s, [t.clientX, t.clientY])), this.graph.change(), t.preventDefault();
  }
  /**
   * process a key event
   */
  processKey(t) {
    var s, o, r, l;
    W(this, Xt, t.shiftKey);
    const { graph: i } = this;
    if (!i) return;
    let n = !1;
    if (t.target.localName != "input") {
      if (t.type == "keydown") {
        if (t.key === " ")
          this.read_only = !0, this._previously_dragging_canvas === null && (this._previously_dragging_canvas = this.dragging_canvas), this.dragging_canvas = this.pointer.isDown, n = !0;
        else if (t.key === "Escape") {
          if (this.linkConnector.isConnecting) {
            this.linkConnector.reset(), S(this, D, Z).call(this), t.preventDefault();
            return;
          }
          (s = this.node_panel) == null || s.close(), (o = this.options_panel) == null || o.close(), n = !0;
        } else if (t.keyCode === 65 && t.ctrlKey)
          this.selectItems(), n = !0;
        else if (t.keyCode === 67 && (t.metaKey || t.ctrlKey) && !t.shiftKey)
          this.selected_nodes && (this.copyToClipboard(), n = !0);
        else if (t.keyCode === 86 && (t.metaKey || t.ctrlKey))
          this.pasteFromClipboard({ connectInputs: t.shiftKey });
        else if ((t.key === "Delete" || t.key === "Backspace") && t.target.localName != "input" && t.target.localName != "textarea") {
          if (this.selectedItems.size === 0) {
            S(this, D, Ve).call(this);
            return;
          }
          this.deleteSelected(), n = !0;
        }
        for (const a of Object.values(this.selected_nodes))
          (r = a.onKeyDown) == null || r.call(a, t);
      } else if (t.type == "keyup") {
        t.key === " " && (this.read_only = !1, this.dragging_canvas = (this._previously_dragging_canvas ?? !1) && this.pointer.isDown, this._previously_dragging_canvas = null);
        for (const a of Object.values(this.selected_nodes))
          (l = a.onKeyUp) == null || l.call(a, t);
      }
      i.change(), n && (t.preventDefault(), t.stopImmediatePropagation());
    }
  }
  /**
   * Copies canvas items to an internal, app-specific clipboard backed by local storage.
   * When called without parameters, it copies {@link selectedItems}.
   * @param items The items to copy.  If nullish, all selected items are copied.
   */
  copyToClipboard(t) {
    var n, s, o;
    const i = {
      nodes: [],
      groups: [],
      reroutes: [],
      links: []
    };
    for (const r of t ?? this.selectedItems)
      if (r instanceof LGraphNode) {
        if (r.clonable === !1) continue;
        const l = (n = r.clone()) == null ? void 0 : n.serialize();
        if (!l) continue;
        if (l.id = r.id, i.nodes.push(l), r.inputs)
          for (const { link: a } of r.inputs) {
            if (a == null) continue;
            const h = (o = (s = this.graph) == null ? void 0 : s._links.get(a)) == null ? void 0 : o.asSerialisable();
            h && i.links.push(h);
          }
      } else r instanceof LGraphGroup ? i.groups.push(r.serialize()) : r instanceof Reroute && i.reroutes.push(r.asSerialisable());
    localStorage.setItem(
      "litegrapheditor_clipboard",
      JSON.stringify(i)
    );
  }
  emitEvent(t) {
    this.canvas.dispatchEvent(
      new CustomEvent("litegraph:canvas", {
        bubbles: !0,
        detail: t
      })
    );
  }
  /** @todo Refactor to where it belongs - e.g. Deleting / creating nodes is not actually canvas event. */
  emitBeforeChange() {
    this.emitEvent({
      subType: "before-change"
    });
  }
  /** @todo See {@link emitBeforeChange} */
  emitAfterChange() {
    this.emitEvent({
      subType: "after-change"
    });
  }
  /**
   * Pastes the items from the canvas "clipbaord" - a local storage variable.
   */
  _pasteFromClipboard(t = {}) {
    var y;
    const {
      connectInputs: i = !1,
      position: n = this.graph_mouse
    } = t;
    if (!LiteGraph.ctrl_shift_v_paste_connect_unselected_outputs && i) return;
    const s = localStorage.getItem("litegrapheditor_clipboard");
    if (!s) return;
    const { graph: o } = this;
    if (!o) throw new NullGraphError();
    o.beforeChange();
    const r = JSON.parse(s);
    r.nodes ?? (r.nodes = []), r.groups ?? (r.groups = []), r.reroutes ?? (r.reroutes = []), r.links ?? (r.links = []);
    let l = 1 / 0, a = 1 / 0;
    for (const _ of [...r.nodes, ...r.reroutes]) {
      if (_.pos == null) throw new TypeError("Invalid node encounterd on paste.  `pos` was null.");
      _.pos[0] < l && (l = _.pos[0]), _.pos[1] < a && (a = _.pos[1]);
    }
    if (r.groups)
      for (const _ of r.groups)
        _.bounding[0] < l && (l = _.bounding[0]), _.bounding[1] < a && (a = _.bounding[1]);
    const h = {
      created: [],
      nodes: /* @__PURE__ */ new Map(),
      links: /* @__PURE__ */ new Map(),
      reroutes: /* @__PURE__ */ new Map()
    }, { created: u, nodes: d, links: p, reroutes: g } = h;
    for (const _ of r.groups) {
      _.id = -1;
      const m = new LGraphGroup();
      m.configure(_), o.add(m), u.push(m);
    }
    for (const _ of r.nodes) {
      const m = _.type == null ? null : LiteGraph.createNode(_.type);
      m && (d.set(_.id, m), _.id = -1, m.configure(_), o.add(m), u.push(m));
    }
    for (const _ of r.reroutes) {
      const { id: m, ...w } = _, k = o.setReroute(w);
      u.push(k), g.set(m, k);
    }
    for (const _ of g.values()) {
      if (_.parentId == null) continue;
      const m = g.get(_.parentId);
      m && (_.parentId = m.id);
    }
    for (const _ of r.links) {
      let m = d.get(_.origin_id), w;
      _.parentId != null && (w = (y = g.get(_.parentId)) == null ? void 0 : y.id), i && LiteGraph.ctrl_shift_v_paste_connect_unselected_outputs && (m ?? (m = o.getNodeById(_.origin_id)), w ?? (w = _.parentId));
      const k = d.get(_.target_id);
      if (k) {
        const I = m == null ? void 0 : m.connect(
          _.origin_slot,
          k,
          _.target_slot,
          w
        );
        I && p.set(_.id, I);
      }
    }
    for (const _ of g.values()) {
      const m = [..._.linkIds].map((w) => {
        var k;
        return ((k = p.get(w)) == null ? void 0 : k.id) ?? w;
      });
      _.update(_.parentId, void 0, m, _.floating), _.validateLinks(o.links, o.floatingLinks) || o.removeReroute(_.id);
    }
    for (const _ of u)
      _.pos[0] += n[0] - l, _.pos[1] += n[1] - a;
    return this.selectItems(u), o.afterChange(), h;
  }
  pasteFromClipboard(t = {}) {
    this.emitBeforeChange();
    try {
      this._pasteFromClipboard(t);
    } finally {
      this.emitAfterChange();
    }
  }
  processNodeDblClicked(t) {
    var i, n;
    (i = this.onShowNodePanel) == null || i.call(this, t), (n = this.onNodeDblClicked) == null || n.call(this, t), this.setDirty(!0);
  }
  /**
   * Determines whether to select or deselect an item that has received a pointer event.  Will deselect other nodes if
   * @param item Canvas item to select/deselect
   * @param e The MouseEvent to handle
   * @param sticky Prevents deselecting individual nodes (as used by aux/right-click)
   * @remarks
   * Accessibility: anyone using {@link mutli_select} always deselects when clicking empty space.
   */
  processSelect(t, i, n = !1) {
    var a;
    const s = i == null ? void 0 : i.shiftKey, o = i != null && (i.metaKey || i.ctrlKey), r = s || o, l = r || this.multi_select;
    if (!t)
      (!r || this.multi_select) && this.deselectAll();
    else if (!t.selected || !this.selectedItems.has(t))
      l || this.deselectAll(t), this.select(t);
    else if (l && !n)
      this.deselect(t);
    else if (!n)
      this.deselectAll(t);
    else
      return;
    (a = this.onSelectionChange) == null || a.call(this, this.selected_nodes), this.setDirty(!0);
  }
  /**
   * Selects a {@link Positionable} item.
   * @param item The canvas item to add to the selection.
   */
  select(t) {
    var i, n;
    if (!(t.selected && this.selectedItems.has(t)) && (t.selected = !0, this.selectedItems.add(t), t instanceof LGraphNode)) {
      if ((i = t.onSelected) == null || i.call(t), this.selected_nodes[t.id] = t, (n = this.onNodeSelected) == null || n.call(this, t), t.inputs)
        for (const s of t.inputs)
          s.link != null && (this.highlighted_links[s.link] = !0);
      if (t.outputs)
        for (const s of t.outputs.flatMap((o) => o.links))
          s != null && (this.highlighted_links[s] = !0);
    }
  }
  /**
   * Deselects a {@link Positionable} item.
   * @param item The canvas item to remove from the selection.
   */
  deselect(t) {
    var n, s;
    if (!t.selected && !this.selectedItems.has(t) || (t.selected = !1, this.selectedItems.delete(t), !(t instanceof LGraphNode))) return;
    (n = t.onDeselected) == null || n.call(t), delete this.selected_nodes[t.id], (s = this.onNodeDeselected) == null || s.call(this, t);
    const { graph: i } = this;
    if (i) {
      if (t.inputs)
        for (const o of t.inputs) {
          if (o.link == null) continue;
          const r = LLink.getOriginNode(i, o.link);
          r && this.selectedItems.has(r) || delete this.highlighted_links[o.link];
        }
      if (t.outputs)
        for (const o of t.outputs.flatMap((r) => r.links)) {
          if (o == null) continue;
          const r = LLink.getTargetNode(i, o);
          r && this.selectedItems.has(r) || delete this.highlighted_links[o];
        }
    }
  }
  /** @deprecated See {@link LGraphCanvas.processSelect} */
  processNodeSelected(t, i) {
    this.processSelect(
      t,
      i,
      i && (i.shiftKey || i.metaKey || i.ctrlKey || this.multi_select)
    );
  }
  /** @deprecated See {@link LGraphCanvas.select} */
  selectNode(t, i) {
    t == null ? this.deselectAll() : this.selectNodes([t], i);
  }
  get empty() {
    if (!this.graph) throw new NullGraphError();
    return this.graph.empty;
  }
  get positionableItems() {
    if (!this.graph) throw new NullGraphError();
    return this.graph.positionableItems();
  }
  /**
   * Selects several items.
   * @param items Items to select - if falsy, all items on the canvas will be selected
   * @param add_to_current_selection If set, the items will be added to the current selection instead of replacing it
   */
  selectItems(t, i) {
    var s;
    const n = t ?? this.positionableItems;
    i || this.deselectAll();
    for (const o of n) this.select(o);
    (s = this.onSelectionChange) == null || s.call(this, this.selected_nodes), this.setDirty(!0);
  }
  /**
   * selects several nodes (or adds them to the current selection)
   * @deprecated See {@link LGraphCanvas.selectItems}
   */
  selectNodes(t, i) {
    this.selectItems(t, i);
  }
  /** @deprecated See {@link LGraphCanvas.deselect} */
  deselectNode(t) {
    this.deselect(t);
  }
  /**
   * Deselects all items on the canvas.
   * @param keepSelected If set, this item will not be removed from the selection.
   */
  deselectAll(t) {
    var o, r;
    if (!this.graph) return;
    const i = this.selectedItems;
    if (!i.size) return;
    let n;
    for (const l of i) {
      if (l === t) {
        n = l;
        continue;
      }
      (o = l.onDeselected) == null || o.call(l), l.selected = !1;
    }
    i.clear(), n && i.add(n), this.setDirty(!0);
    const s = (t == null ? void 0 : t.id) == null ? null : this.selected_nodes[t.id];
    if (this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, t instanceof LGraphNode) {
      if (s && (this.selected_nodes[s.id] = s), t.inputs)
        for (const l of t.inputs)
          l.link != null && (this.highlighted_links[l.link] = !0);
      if (t.outputs)
        for (const l of t.outputs.flatMap((a) => a.links))
          l != null && (this.highlighted_links[l] = !0);
    }
    (r = this.onSelectionChange) == null || r.call(this, this.selected_nodes);
  }
  /** @deprecated See {@link LGraphCanvas.deselectAll} */
  deselectAllNodes() {
    this.deselectAll();
  }
  /**
   * Deletes all selected items from the graph.
   * @todo Refactor deletion task to LGraph.  Selection is a canvas property, delete is a graph action.
   */
  deleteSelected() {
    var i, n;
    const { graph: t } = this;
    if (!t) throw new NullGraphError();
    this.emitBeforeChange(), t.beforeChange();
    for (const s of this.selectedItems)
      if (s instanceof LGraphNode) {
        const o = s;
        if (o.block_delete) continue;
        o.connectInputToOutput(), t.remove(o), (i = this.onNodeDeselected) == null || i.call(this, o);
      } else s instanceof LGraphGroup ? t.remove(s) : s instanceof Reroute && t.removeReroute(s.id);
    this.selected_nodes = {}, this.selectedItems.clear(), this.current_node = null, this.highlighted_links = {}, (n = this.onSelectionChange) == null || n.call(this, this.selected_nodes), this.setDirty(!0), t.afterChange(), this.emitAfterChange();
  }
  /**
   * deletes all nodes in the current selection from the graph
   * @deprecated See {@link LGraphCanvas.deleteSelected}
   */
  deleteSelectedNodes() {
    this.deleteSelected();
  }
  /**
   * centers the camera on a given node
   */
  centerOnNode(t) {
    const i = (window == null ? void 0 : window.devicePixelRatio) || 1;
    this.ds.offset[0] = -t.pos[0] - t.size[0] * 0.5 + this.canvas.width * 0.5 / (this.ds.scale * i), this.ds.offset[1] = -t.pos[1] - t.size[1] * 0.5 + this.canvas.height * 0.5 / (this.ds.scale * i), this.setDirty(!0, !0);
  }
  /**
   * adds some useful properties to a mouse event, like the position in graph coordinates
   */
  adjustMouseEvent(t) {
    let i = t.clientX, n = t.clientY;
    if (this.canvas) {
      const s = this.canvas.getBoundingClientRect();
      i -= s.left, n -= s.top;
    }
    t.safeOffsetX = i, t.safeOffsetY = n, t.deltaX === void 0 && (t.deltaX = i - this.last_mouse_position[0]), t.deltaY === void 0 && (t.deltaY = n - this.last_mouse_position[1]), this.last_mouse_position[0] = i, this.last_mouse_position[1] = n, t.canvasX = i / this.ds.scale - this.ds.offset[0], t.canvasY = n / this.ds.scale - this.ds.offset[1];
  }
  /**
   * changes the zoom level of the graph (default is 1), you can pass also a place used to pivot the zoom
   */
  setZoom(t, i) {
    this.ds.changeScale(t, i), S(this, D, Z).call(this);
  }
  /**
   * converts a coordinate from graph coordinates to canvas2D coordinates
   */
  convertOffsetToCanvas(t, i) {
    return this.ds.convertOffsetToCanvas(t, i);
  }
  /**
   * converts a coordinate from Canvas2D coordinates to graph space
   */
  convertCanvasToOffset(t, i) {
    return this.ds.convertCanvasToOffset(t, i);
  }
  // converts event coordinates from canvas2D to graph coordinates
  convertEventToCanvasOffset(t) {
    const i = this.canvas.getBoundingClientRect();
    return this.convertCanvasToOffset([
      t.clientX - i.left,
      t.clientY - i.top
    ]);
  }
  /**
   * brings a node to front (above all other nodes)
   */
  bringToFront(t) {
    const { graph: i } = this;
    if (!i) throw new NullGraphError();
    const n = i._nodes.indexOf(t);
    n != -1 && (i._nodes.splice(n, 1), i._nodes.push(t));
  }
  /**
   * sends a node to the back (below all other nodes)
   */
  sendToBack(t) {
    const { graph: i } = this;
    if (!i) throw new NullGraphError();
    const n = i._nodes.indexOf(t);
    n != -1 && (i._nodes.splice(n, 1), i._nodes.unshift(t));
  }
  /**
   * Determines which nodes are visible and populates {@link out} with the results.
   * @param nodes The list of nodes to check - if falsy, all nodes in the graph will be checked
   * @param out Array to write visible nodes into - if falsy, a new array is created instead
   * @returns Array passed ({@link out}), or a new array containing all visible nodes
   */
  computeVisibleNodes(t, i) {
    const n = i || [];
    if (n.length = 0, !this.graph) throw new NullGraphError();
    const s = t || this.graph._nodes;
    for (const o of s)
      o.updateArea(this.ctx), overlapBounding(this.visible_area, o.renderArea) && n.push(o);
    return n;
  }
  /**
   * Checks if a node is visible on the canvas.
   * @param node The node to check
   * @returns `true` if the node is visible, otherwise `false`
   */
  isNodeVisible(t) {
    return L(this, Vt).has(t.id);
  }
  /**
   * renders the whole canvas content, by rendering in two separated canvas, one containing the background grid and the connections, and one containing the nodes)
   */
  draw(t, i) {
    var s;
    if (!this.canvas || this.canvas.width == 0 || this.canvas.height == 0) return;
    const n = LiteGraph.getTime();
    this.render_time = (n - this.last_draw_time) * 1e-3, this.last_draw_time = n, this.graph && this.ds.computeVisibleArea(this.viewport), (this.dirty_canvas || t) && (this.computeVisibleNodes(void 0, this.visible_nodes), W(this, Vt, new Set(this.visible_nodes.map((o) => o.id)))), (this.dirty_bgcanvas || i || this.always_render_background || (s = this.graph) != null && s._last_trigger_time && n - this.graph._last_trigger_time < 1e3) && this.drawBackCanvas(), (this.dirty_canvas || t) && this.drawFrontCanvas(), this.fps = this.render_time ? 1 / this.render_time : 0, this.frame++;
  }
  /**
   * draws the front canvas (the one containing all the nodes)
   */
  drawFrontCanvas() {
    var o, r, l, a, h;
    this.dirty_canvas = !1;
    const { ctx: t, canvas: i, linkConnector: n } = this;
    t.start2D && !this.viewport && (t.start2D(), t.restore(), t.setTransform(1, 0, 0, 1, 0, 0));
    const s = this.viewport || this.dirty_area;
    if (s && (t.save(), t.beginPath(), t.rect(s[0], s[1], s[2], s[3]), t.clip()), W(this, q, L(this, Xt) || LiteGraph.alwaysSnapToGrid ? (o = this.graph) == null ? void 0 : o.getSnapToGridSize() : void 0), this.clear_background && (s ? t.clearRect(s[0], s[1], s[2], s[3]) : t.clearRect(0, 0, i.width, i.height)), this.bgcanvas == this.canvas)
      this.drawBackCanvas();
    else {
      const u = window.devicePixelRatio;
      t.drawImage(
        this.bgcanvas,
        0,
        0,
        this.bgcanvas.width / u,
        this.bgcanvas.height / u
      );
    }
    if ((r = this.onRender) == null || r.call(this, i, t), this.show_info && this.renderInfo(t, s ? s[0] : 0, s ? s[1] : 0), this.graph) {
      t.save(), this.ds.toCanvasContext(t);
      const { visible_nodes: u } = this, d = L(this, q) && this.isDragging;
      for (const p of u)
        t.save(), d && this.selectedItems.has(p) && this.drawSnapGuide(t, p), t.translate(p.pos[0], p.pos[1]), this.drawNode(p, t), t.restore();
      if (this.render_execution_order && this.drawExecutionOrder(t), this.graph.config.links_ontop && this.drawConnections(t), n.isConnecting) {
        const { renderLinks: p } = n, g = S(this, D, $e).call(this);
        t.lineWidth = this.connections_width;
        for (const y of p) {
          const { fromSlot: _, fromPos: m, fromDirection: w, dragDirection: k } = y, I = _.shape, N = _.type, T = N === LiteGraph.EVENT ? LiteGraph.EVENT_LINK_COLOR : LiteGraph.CONNECTING_LINK_COLOR;
          this.renderLink(
            t,
            m,
            g,
            null,
            !1,
            null,
            T,
            w,
            k
          ), t.beginPath(), N === LiteGraph.EVENT || I === RenderShape.BOX ? (t.rect(m[0] - 6 + 0.5, m[1] - 5 + 0.5, 14, 10), t.rect(
            g[0] - 6 + 0.5,
            g[1] - 5 + 0.5,
            14,
            10
          )) : I === RenderShape.ARROW ? (t.moveTo(m[0] + 8, m[1] + 0.5), t.lineTo(m[0] - 4, m[1] + 6 + 0.5), t.lineTo(m[0] - 4, m[1] - 6 + 0.5), t.closePath()) : (t.arc(m[0], m[1], 4, 0, Math.PI * 2), t.arc(g[0], g[1], 4, 0, Math.PI * 2)), t.fill();
        }
        S(this, D, Ke).call(this, t, g);
      }
      if (this.dragging_rectangle) {
        const { eDown: p, eMove: g } = this.pointer;
        if (t.strokeStyle = "#FFF", p && g) {
          const y = t.getTransform(), _ = Math.max(1, window.devicePixelRatio);
          t.setTransform(_, 0, 0, _, 0, 0);
          const m = p.safeOffsetX, w = p.safeOffsetY;
          t.strokeRect(m, w, g.safeOffsetX - m, g.safeOffsetY - w), t.setTransform(y);
        } else {
          const [y, _, m, w] = this.dragging_rectangle;
          t.strokeRect(y, _, m, w);
        }
      }
      !this.isDragging && this.over_link_center && this.render_link_tooltip ? this.drawLinkTooltip(t, this.over_link_center) : (l = this.onDrawLinkTooltip) == null || l.call(this, t, null), (a = this.onDrawForeground) == null || a.call(this, t, this.visible_area), t.restore();
    }
    (h = this.onDrawOverlay) == null || h.call(this, t), s && t.restore();
  }
  /**
   * draws some useful stats in the corner of the canvas
   */
  renderInfo(t, i, n) {
    i = i || 10, n = n || this.canvas.offsetHeight - 80, t.save(), t.translate(i, n), t.font = `10px ${LiteGraph.DEFAULT_FONT}`, t.fillStyle = "#888", t.textAlign = "left", this.graph ? (t.fillText(`T: ${this.graph.globaltime.toFixed(2)}s`, 5, 13 * 1), t.fillText(`I: ${this.graph.iteration}`, 5, 13 * 2), t.fillText(`N: ${this.graph._nodes.length} [${this.visible_nodes.length}]`, 5, 13 * 3), t.fillText(`V: ${this.graph._version}`, 5, 13 * 4), t.fillText(`FPS:${this.fps.toFixed(2)}`, 5, 13 * 5)) : t.fillText("No graph selected", 5, 13 * 1), t.restore();
  }
  /**
   * draws the back canvas (the one containing the background and the connections)
   */
  drawBackCanvas() {
    var o;
    const t = this.bgcanvas;
    (t.width != this.canvas.width || t.height != this.canvas.height) && (t.width = this.canvas.width, t.height = this.canvas.height), this.bgctx || (this.bgctx = this.bgcanvas.getContext("2d"));
    const i = this.bgctx;
    if (!i) throw new TypeError("Background canvas context was null.");
    const n = this.viewport || [0, 0, i.canvas.width, i.canvas.height];
    this.clear_background && i.clearRect(n[0], n[1], n[2], n[3]);
    const s = this.onRenderBackground ? this.onRenderBackground(t, i) : !1;
    if (!this.viewport) {
      const r = window.devicePixelRatio;
      i.restore(), i.setTransform(r, 0, 0, r, 0, 0);
    }
    if (this.graph) {
      if (i.save(), this.ds.toCanvasContext(i), this.ds.scale < 1.5 && !s && this.clear_background_color && (i.fillStyle = this.clear_background_color, i.fillRect(
        this.visible_area[0],
        this.visible_area[1],
        this.visible_area[2],
        this.visible_area[3]
      )), this.background_image && this.ds.scale > 0.5 && !s) {
        if (this.zoom_modify_alpha ? i.globalAlpha = (1 - 0.5 / this.ds.scale) * this.editor_alpha : i.globalAlpha = this.editor_alpha, i.imageSmoothingEnabled = !1, !this._bg_img || this._bg_img.name != this.background_image) {
          this._bg_img = new Image(), this._bg_img.name = this.background_image, this._bg_img.src = this.background_image;
          const l = this;
          this._bg_img.addEventListener("load", function() {
            l.draw(!0, !0);
          });
        }
        let r = this._pattern;
        r == null && this._bg_img.width > 0 && (r = i.createPattern(this._bg_img, "repeat") ?? void 0, this._pattern_img = this._bg_img, this._pattern = r), r && (i.fillStyle = r, i.fillRect(
          this.visible_area[0],
          this.visible_area[1],
          this.visible_area[2],
          this.visible_area[3]
        ), i.fillStyle = "transparent"), i.globalAlpha = 1, i.imageSmoothingEnabled = !0;
      }
      this.graph._groups.length && this.drawGroups(t, i), (o = this.onDrawBackground) == null || o.call(this, i, this.visible_area), this.render_canvas_border && (i.strokeStyle = "#235", i.strokeRect(0, 0, t.width, t.height)), this.render_connections_shadows ? (i.shadowColor = "#000", i.shadowOffsetX = 0, i.shadowOffsetY = 0, i.shadowBlur = 6) : i.shadowColor = "rgba(0,0,0,0)", this.drawConnections(i), i.shadowColor = "rgba(0,0,0,0)", i.restore();
    }
    this.dirty_bgcanvas = !1, this.dirty_canvas = !0;
  }
  /**
   * draws the given node inside the canvas
   */
  drawNode(t, i) {
    var h, u, d;
    this.current_node = t;
    const n = t.renderingColor, s = t.renderingBgColor, { low_quality: o, editor_alpha: r } = this;
    if (i.globalAlpha = r, this.render_shadows && !o ? (i.shadowColor = LiteGraph.DEFAULT_SHADOW_COLOR, i.shadowOffsetX = 2 * this.ds.scale, i.shadowOffsetY = 2 * this.ds.scale, i.shadowBlur = 3 * this.ds.scale) : i.shadowColor = "transparent", t.flags.collapsed && ((h = t.onDrawCollapsed) == null ? void 0 : h.call(t, i, this)) == !0)
      return;
    const l = t._shape || RenderShape.BOX, a = L(E, Qt);
    a.set(t.renderingSize), t.collapsed && (i.font = this.inner_text_font), t.clip_area && (i.save(), i.beginPath(), l == RenderShape.BOX ? i.rect(0, 0, a[0], a[1]) : l == RenderShape.ROUND ? i.roundRect(0, 0, a[0], a[1], [10]) : l == RenderShape.CIRCLE && i.arc(a[0] * 0.5, a[1] * 0.5, a[0] * 0.5, 0, Math.PI * 2), i.clip()), this.drawNodeShape(
      t,
      i,
      a,
      n,
      s,
      !!t.selected
    ), o || t.drawBadges(i), i.shadowColor = "transparent", i.strokeStyle = LiteGraph.NODE_BOX_OUTLINE_COLOR, (u = t.onDrawForeground) == null || u.call(t, i, this, this.canvas), i.font = this.inner_text_font, t._setConcreteSlots(), t.collapsed ? this.render_collapsed_slots && t.drawCollapsedSlots(i) : (t.arrange(), t.drawSlots(i, {
      fromSlot: (d = this.linkConnector.renderLinks[0]) == null ? void 0 : d.fromSlot,
      colorContext: this.colourGetter,
      editorAlpha: this.editor_alpha,
      lowQuality: this.low_quality
    }), i.textAlign = "left", i.globalAlpha = 1, this.drawNodeWidgets(t, null, i)), t.clip_area && i.restore(), i.globalAlpha = 1;
  }
  /**
   * Draws the link mouseover effect and tooltip.
   * @param ctx Canvas 2D context to draw on
   * @param link The link to render the mouseover effect for
   * @remarks
   * Called against {@link LGraphCanvas.over_link_center}.
   * @todo Split tooltip from hover, so it can be drawn / eased separately
   */
  drawLinkTooltip(t, i) {
    var h;
    const n = i._pos;
    if (t.fillStyle = "black", t.beginPath(), this.linkMarkerShape === LinkMarkerShape.Arrow) {
      const u = t.getTransform();
      t.translate(n[0], n[1]), Number.isFinite(i._centreAngle) && t.rotate(i._centreAngle), t.moveTo(-2, -3), t.lineTo(4, 0), t.lineTo(-2, 3), t.setTransform(u);
    } else (this.linkMarkerShape == null || this.linkMarkerShape === LinkMarkerShape.Circle) && t.arc(n[0], n[1], 3, 0, Math.PI * 2);
    t.fill();
    const { data: s } = i;
    if (s == null || ((h = this.onDrawLinkTooltip) == null ? void 0 : h.call(this, t, i, this)) == !0) return;
    let o = null;
    if (typeof s == "number" ? o = s.toFixed(2) : typeof s == "string" ? o = `"${s}"` : typeof s == "boolean" ? o = String(s) : s.toToolTip ? o = s.toToolTip() : o = `[${s.constructor.name}]`, o == null) return;
    o = o.substring(0, 30), t.font = "14px Courier New";
    const l = t.measureText(o).width + 20, a = 24;
    t.shadowColor = "black", t.shadowOffsetX = 2, t.shadowOffsetY = 2, t.shadowBlur = 3, t.fillStyle = "#454", t.beginPath(), t.roundRect(n[0] - l * 0.5, n[1] - 15 - a, l, a, [3]), t.moveTo(n[0] - 10, n[1] - 15), t.lineTo(n[0] + 10, n[1] - 15), t.lineTo(n[0], n[1] - 5), t.fill(), t.shadowColor = "transparent", t.textAlign = "center", t.fillStyle = "#CEC", t.fillText(o, n[0], n[1] - 15 - a * 0.3);
  }
  /**
   * Draws the shape of the given node on the canvas
   * @param node The node to draw
   * @param ctx 2D canvas rendering context used to draw
   * @param size Size of the background to draw, in graph units.  Differs from node size if collapsed, etc.
   * @param fgcolor Foreground colour - used for text
   * @param bgcolor Background colour of the node
   * @param _selected Whether to render the node as selected.  Likely to be removed in future, as current usage is simply the selected property of the node.
   */
  drawNodeShape(t, i, n, s, o, r) {
    var _, m;
    i.strokeStyle = s, i.fillStyle = o;
    const l = LiteGraph.NODE_TITLE_HEIGHT, { low_quality: a } = this, { collapsed: h } = t.flags, u = t.renderingShape, { title_mode: d } = t, p = !(d == TitleMode.TRANSPARENT_TITLE || d == TitleMode.NO_TITLE), g = L(E, te);
    g.set(t.boundingRect), g[0] -= t.pos[0], g[1] -= t.pos[1];
    const y = i.globalAlpha;
    i.beginPath(), u == RenderShape.BOX || a ? i.fillRect(g[0], g[1], g[2], g[3]) : u == RenderShape.ROUND || u == RenderShape.CARD ? i.roundRect(
      g[0],
      g[1],
      g[2],
      g[3],
      u == RenderShape.CARD ? [LiteGraph.ROUND_RADIUS, LiteGraph.ROUND_RADIUS, 0, 0] : [LiteGraph.ROUND_RADIUS]
    ) : u == RenderShape.CIRCLE && i.arc(n[0] * 0.5, n[1] * 0.5, n[0] * 0.5, 0, Math.PI * 2), i.fill(), !h && p && (i.shadowColor = "transparent", i.fillStyle = "rgba(0,0,0,0.2)", i.fillRect(0, -1, g[2], 2)), i.shadowColor = "transparent", (_ = t.onDrawBackground) == null || _.call(t, i), (p || d == TitleMode.TRANSPARENT_TITLE) && (t.drawTitleBarBackground(i, {
      scale: this.ds.scale,
      low_quality: a
    }), t.drawTitleBox(i, {
      scale: this.ds.scale,
      low_quality: a,
      box_size: 10
    }), i.globalAlpha = y, t.drawTitleText(i, {
      scale: this.ds.scale,
      default_title_color: this.node_title_color,
      low_quality: a
    }), (m = t.onDrawTitle) == null || m.call(t, i));
    for (const w of Object.values(t.strokeStyles)) {
      const k = w.call(t);
      k && strokeShape(i, g, {
        shape: u,
        title_height: l,
        title_mode: d,
        collapsed: h,
        ...k
      });
    }
    t.drawProgressBar(i), t.execute_triggered != null && t.execute_triggered > 0 && t.execute_triggered--, t.action_triggered != null && t.action_triggered > 0 && t.action_triggered--;
  }
  /**
   * Draws a snap guide for a {@link Positionable} item.
   *
   * Initial design was a simple white rectangle representing the location the
   * item would land if dropped.
   * @param ctx The 2D canvas context to draw on
   * @param item The item to draw a snap guide for
   * @param shape The shape of the snap guide to draw
   * @todo Update to align snapping with boundingRect
   * @todo Shapes
   */
  drawSnapGuide(t, i, n = RenderShape.ROUND) {
    const s = L(E, Jt);
    s.set(i.boundingRect);
    const { pos: o } = i, r = o[0] - s[0], l = o[1] - s[1];
    s[0] += r, s[1] += l, L(this, q) && snapPoint(s, L(this, q)), s[0] -= r, s[1] -= l;
    const { globalAlpha: a } = t;
    t.globalAlpha = 1, t.beginPath();
    const [h, u, d, p] = s;
    if (n === RenderShape.CIRCLE) {
      const g = h + d * 0.5, y = u + p * 0.5, _ = Math.min(d * 0.5, p * 0.5);
      t.arc(g, y, _, 0, Math.PI * 2);
    } else
      t.rect(h, u, d, p);
    t.lineWidth = 0.5, t.strokeStyle = "#FFFFFF66", t.fillStyle = "#FFFFFF22", t.fill(), t.stroke(), t.globalAlpha = a;
  }
  drawConnections(t) {
    if (this.renderedPaths.clear(), this.links_render_mode === LinkRenderType.HIDDEN_LINK) return;
    const { graph: i } = this;
    if (!i) throw new NullGraphError();
    const n = [], s = LiteGraph.getTime(), { visible_area: o } = this;
    L(E, ct)[0] = o[0] - 20, L(E, ct)[1] = o[1] - 20, L(E, ct)[2] = o[2] + 40, L(E, ct)[3] = o[3] + 40, t.lineWidth = this.connections_width, t.fillStyle = "#AAA", t.strokeStyle = "#AAA", t.globalAlpha = this.editor_alpha;
    const r = i._nodes;
    for (const a of r) {
      const { inputs: h } = a;
      if (h != null && h.length)
        for (const [u, d] of h.entries()) {
          if (!d || d.link == null) continue;
          const p = d.link, g = i._links.get(p);
          if (!g) continue;
          const y = a.getInputPos(u), _ = i.getNodeById(g.origin_id);
          if (_ == null) continue;
          const m = g.origin_slot, w = m === -1 ? [_.pos[0] + 10, _.pos[1] + 10] : _.getOutputPos(m), k = _.outputs[m];
          k && S(this, D, jt).call(this, t, g, w, y, n, s, k.dir, d.dir);
        }
    }
    i.floatingLinks.size > 0 && S(this, D, je).call(this, t, i, n, s);
    const l = L(this, it);
    l.clear(), n.sort((a, h) => a.linkIds.size - h.linkIds.size);
    for (const a of n)
      l.add(a), L(this, q) && this.isDragging && this.selectedItems.has(a) && this.drawSnapGuide(t, a, RenderShape.CIRCLE), a.draw(t, this._pattern), this.pointer.isDown || a.drawSlots(t);
    t.globalAlpha = 1;
  }
  /**
   * draws a link between two points
   * @param ctx Canvas 2D rendering context
   * @param a start pos
   * @param b end pos
   * @param link the link object with all the link info
   * @param skip_border ignore the shadow of the link
   * @param flow show flow animation (for events)
   * @param color the color for the link
   * @param start_dir the direction enum
   * @param end_dir the direction enum
   */
  renderLink(t, i, n, s, o, r, l, a, h, {
    startControl: u,
    endControl: d,
    reroute: p,
    num_sublines: g = 1,
    disabled: y = !1
  } = {}) {
    const _ = s != null && this.highlighted_links[s.id] ? "#FFF" : l || (s == null ? void 0 : s.color) || (s == null ? void 0 : s.type) != null && E.link_type_colors[s.type] || this.default_link_color, m = a || LinkDirection.RIGHT, w = h || LinkDirection.LEFT, k = this.links_render_mode == LinkRenderType.SPLINE_LINK && (!d || !u) ? distance(i, n) : 0;
    this.render_connections_border && !this.low_quality && (t.lineWidth = this.connections_width + 4), t.lineJoin = "round", g || (g = 1), g > 1 && (t.lineWidth = 0.5);
    const I = new Path2D(), N = p ?? s;
    N && (N.path = I);
    const T = L(E, ee), O = L(E, ie), A = (N == null ? void 0 : N._pos) ?? [0, 0];
    for (let G = 0; G < g; G++) {
      const b = (G - (g - 1) * 0.5) * 5;
      if (T[0] = i[0], T[1] = i[1], O[0] = n[0], O[1] = n[1], this.links_render_mode == LinkRenderType.SPLINE_LINK) {
        if (d ? (O[0] = n[0] + d[0], O[1] = n[1] + d[1]) : S(this, D, Ct).call(this, O, w, k), u ? (T[0] = i[0] + u[0], T[1] = i[1] + u[1]) : S(this, D, Ct).call(this, T, m, k), I.moveTo(i[0], i[1] + b), I.bezierCurveTo(
          T[0],
          T[1] + b,
          O[0],
          O[1] + b,
          n[0],
          n[1] + b
        ), findPointOnCurve(A, i, n, T, O, 0.5), N && this.linkMarkerShape === LinkMarkerShape.Arrow) {
          const R = L(E, ne);
          findPointOnCurve(R, i, n, T, O, 0.51), N._centreAngle = Math.atan2(
            R[1] - A[1],
            R[0] - A[0]
          );
        }
      } else {
        const R = this.links_render_mode == LinkRenderType.LINEAR_LINK ? 15 : 10;
        switch (m) {
          case LinkDirection.LEFT:
            T[0] += -R;
            break;
          case LinkDirection.RIGHT:
            T[0] += R;
            break;
          case LinkDirection.UP:
            T[1] += -R;
            break;
          case LinkDirection.DOWN:
            T[1] += R;
            break;
        }
        switch (w) {
          case LinkDirection.LEFT:
            O[0] += -R;
            break;
          case LinkDirection.RIGHT:
            O[0] += R;
            break;
          case LinkDirection.UP:
            O[1] += -R;
            break;
          case LinkDirection.DOWN:
            O[1] += R;
            break;
        }
        if (this.links_render_mode == LinkRenderType.LINEAR_LINK)
          I.moveTo(i[0], i[1] + b), I.lineTo(T[0], T[1] + b), I.lineTo(O[0], O[1] + b), I.lineTo(n[0], n[1] + b), A[0] = (T[0] + O[0]) * 0.5, A[1] = (T[1] + O[1]) * 0.5, N && this.linkMarkerShape === LinkMarkerShape.Arrow && (N._centreAngle = Math.atan2(
            O[1] - T[1],
            O[0] - T[0]
          ));
        else if (this.links_render_mode == LinkRenderType.STRAIGHT_LINK) {
          const C = (T[0] + O[0]) * 0.5;
          if (I.moveTo(i[0], i[1]), I.lineTo(T[0], T[1]), I.lineTo(C, T[1]), I.lineTo(C, O[1]), I.lineTo(O[0], O[1]), I.lineTo(n[0], n[1]), A[0] = C, A[1] = (T[1] + O[1]) * 0.5, N && this.linkMarkerShape === LinkMarkerShape.Arrow) {
            const F = O[1] - T[1];
            Math.abs(F) < 4 ? N._centreAngle = 0 : F > 0 ? N._centreAngle = Math.PI * 0.5 : N._centreAngle = -(Math.PI * 0.5);
          }
        } else
          return;
      }
    }
    if (this.render_connections_border && !this.low_quality && !o && (t.strokeStyle = "rgba(0,0,0,0.5)", t.stroke(I)), t.lineWidth = this.connections_width, t.fillStyle = t.strokeStyle = _, t.stroke(I), this.ds.scale >= 0.6 && this.highquality_render && N) {
      if (this.render_connection_arrows) {
        const G = this.computeConnectionPoint(i, n, 0.25, m, w), b = this.computeConnectionPoint(i, n, 0.26, m, w), R = this.computeConnectionPoint(i, n, 0.75, m, w), C = this.computeConnectionPoint(i, n, 0.76, m, w);
        let F = 0, B = 0;
        this.render_curved_connections ? (F = -Math.atan2(b[0] - G[0], b[1] - G[1]), B = -Math.atan2(C[0] - R[0], C[1] - R[1])) : B = F = n[1] > i[1] ? 0 : Math.PI;
        const H = t.getTransform();
        t.translate(G[0], G[1]), t.rotate(F), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.setTransform(H), t.translate(R[0], R[1]), t.rotate(B), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.setTransform(H);
      }
      if (t.beginPath(), this.linkMarkerShape === LinkMarkerShape.Arrow) {
        const G = t.getTransform();
        t.translate(A[0], A[1]), N._centreAngle && t.rotate(N._centreAngle), t.moveTo(-3.2, -5), t.lineTo(7, 0), t.lineTo(-3.2, 5), t.setTransform(G);
      } else (this.linkMarkerShape == null || this.linkMarkerShape === LinkMarkerShape.Circle) && t.arc(A[0], A[1], 5, 0, Math.PI * 2);
      if (y) {
        const { fillStyle: G, globalAlpha: b } = t;
        t.fillStyle = this._pattern ?? "#797979", t.globalAlpha = 0.75, t.fill(), t.globalAlpha = b, t.fillStyle = G;
      }
      t.fill();
    }
    if (r) {
      t.fillStyle = _;
      for (let G = 0; G < 5; ++G) {
        const b = (LiteGraph.getTime() * 1e-3 + G * 0.2) % 1, R = this.computeConnectionPoint(i, n, b, m, w);
        t.beginPath(), t.arc(R[0], R[1], 5, 0, 2 * Math.PI), t.fill();
      }
    }
  }
  /**
   * Finds a point along a spline represented by a to b, with spline endpoint directions dictacted by start_dir and end_dir.
   * @param a Start point
   * @param b End point
   * @param t Time: distance between points (e.g 0.25 is 25% along the line)
   * @param start_dir Spline start direction
   * @param end_dir Spline end direction
   * @returns The point at {@link t} distance along the spline a-b.
   */
  computeConnectionPoint(t, i, n, s, o) {
    s || (s = LinkDirection.RIGHT), o || (o = LinkDirection.LEFT);
    const r = distance(t, i), l = [t[0], t[1]], a = [i[0], i[1]];
    S(this, D, Ct).call(this, l, s, r), S(this, D, Ct).call(this, a, o, r);
    const h = (1 - n) * (1 - n) * (1 - n), u = 3 * ((1 - n) * (1 - n)) * n, d = 3 * (1 - n) * (n * n), p = n * n * n, g = h * t[0] + u * l[0] + d * a[0] + p * i[0], y = h * t[1] + u * l[1] + d * a[1] + p * i[1];
    return [g, y];
  }
  drawExecutionOrder(t) {
    t.shadowColor = "transparent", t.globalAlpha = 0.25, t.textAlign = "center", t.strokeStyle = "white", t.globalAlpha = 0.75;
    const { visible_nodes: i } = this;
    for (const n of i)
      t.fillStyle = "black", t.fillRect(
        n.pos[0] - LiteGraph.NODE_TITLE_HEIGHT,
        n.pos[1] - LiteGraph.NODE_TITLE_HEIGHT,
        LiteGraph.NODE_TITLE_HEIGHT,
        LiteGraph.NODE_TITLE_HEIGHT
      ), n.order == 0 && t.strokeRect(
        n.pos[0] - LiteGraph.NODE_TITLE_HEIGHT + 0.5,
        n.pos[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5,
        LiteGraph.NODE_TITLE_HEIGHT,
        LiteGraph.NODE_TITLE_HEIGHT
      ), t.fillStyle = "#FFF", t.fillText(
        stringOrEmpty(n.order),
        n.pos[0] + LiteGraph.NODE_TITLE_HEIGHT * -0.5,
        n.pos[1] - 6
      );
    t.globalAlpha = 1;
  }
  /**
   * draws the widgets stored inside a node
   * @deprecated Use {@link LGraphNode.drawWidgets} instead.
   * @remarks Currently there are extensions hijacking this function, so we cannot remove it.
   */
  drawNodeWidgets(t, i, n) {
    t.drawWidgets(n, {
      lowQuality: this.low_quality,
      editorAlpha: this.editor_alpha
    });
  }
  /**
   * draws every group area in the background
   */
  drawGroups(t, i) {
    if (!this.graph) return;
    const n = this.graph._groups;
    i.save(), i.globalAlpha = 0.5 * this.editor_alpha;
    const s = L(this, q) && this.isDragging;
    for (const o of n)
      overlapBounding(this.visible_area, o._bounding) && (s && this.selectedItems.has(o) && this.drawSnapGuide(i, o), o.draw(this, i));
    i.restore();
  }
  /**
   * resizes the canvas to a given size, if no size is passed, then it tries to fill the parentNode
   * @todo Remove or rewrite
   */
  resize(t, i) {
    if (!t && !i) {
      const n = this.canvas.parentElement;
      if (!n) throw new TypeError("Attempted to resize canvas, but parent element was null.");
      t = n.offsetWidth, i = n.offsetHeight;
    }
    this.canvas.width == t && this.canvas.height == i || (this.canvas.width = t ?? 0, this.canvas.height = i ?? 0, this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height, this.setDirty(!0, !0));
  }
  onNodeSelectionChange() {
  }
  /**
   * Determines the furthest nodes in each direction for the currently selected nodes
   */
  boundaryNodesForSelection() {
    return E.getBoundaryNodes(this.selected_nodes);
  }
  showLinkMenu(t, i) {
    var p, g;
    const { graph: n } = this;
    if (!n) throw new NullGraphError();
    const s = "data" in t && t.data != null ? t.data.constructor.name : void 0, { origin_id: o, origin_slot: r } = t;
    if (o == null || r == null)
      return new LiteGraph.ContextMenu(["Link has no origin"], {
        event: i,
        title: s
      }), !1;
    const l = n.getNodeById(o), a = (g = (p = l == null ? void 0 : l.outputs) == null ? void 0 : p[r]) == null ? void 0 : g.type, h = ["Add Node", "Add Reroute", null, "Delete", null], u = new LiteGraph.ContextMenu(h, {
      event: i,
      title: s,
      callback: d.bind(this)
    });
    return !1;
    function d(y, _, m) {
      if (!n) throw new NullGraphError();
      switch (y) {
        case "Add Node":
          E.onMenuAdd(null, null, m, u, (w) => {
            var I, N;
            if (!((I = w == null ? void 0 : w.inputs) != null && I.length) || !((N = w == null ? void 0 : w.outputs) != null && N.length) || r == null) return;
            const k = { afterRerouteId: t.parentId };
            l != null && l.connectByType(r, w, a ?? "*", k) && (w.pos[0] -= w.size[0] * 0.5);
          });
          break;
        case "Add Reroute": {
          try {
            this.emitBeforeChange(), this.adjustMouseEvent(m), n.createReroute(t._pos, t), this.setDirty(!1, !0);
          } catch (w) {
            console.error(w);
          } finally {
            this.emitAfterChange();
          }
          break;
        }
        case "Delete":
          n.removeLink(t.id);
          break;
      }
    }
  }
  createDefaultNodeForSlot(t) {
    const i = Object.assign({
      nodeFrom: null,
      slotFrom: null,
      nodeTo: null,
      slotTo: null,
      position: [0, 0],
      nodeType: void 0,
      posAdd: [0, 0],
      posSizeFix: [0, 0]
    }, t), { afterRerouteId: n } = i, s = i.nodeFrom && i.slotFrom !== null, o = !s && i.nodeTo && i.slotTo !== null;
    if (!s && !o)
      return console.warn("No data passed to createDefaultNodeForSlot", i.nodeFrom, i.slotFrom, i.nodeTo, i.slotTo), !1;
    if (!i.nodeType)
      return console.warn("No type to createDefaultNodeForSlot"), !1;
    const r = s ? i.nodeFrom : i.nodeTo;
    if (!r) throw new TypeError("nodeX was null when creating default node for slot.");
    let l = s ? i.slotFrom : i.slotTo, a = !1;
    switch (typeof l) {
      case "string":
        a = s ? r.findOutputSlot(l, !1) : r.findInputSlot(l, !1), l = s ? r.outputs[l] : r.inputs[l];
        break;
      case "object":
        if (l === null)
          return console.warn("Cant get slot information", l), !1;
        a = s ? r.findOutputSlot(l.name) : r.findInputSlot(l.name);
        break;
      case "number":
        a = l, l = s ? r.outputs[l] : r.inputs[l];
        break;
      case "undefined":
      default:
        return console.warn("Cant get slot information", l), !1;
    }
    const h = l.type == LiteGraph.EVENT ? "_event_" : l.type, u = s ? LiteGraph.slot_types_default_out : LiteGraph.slot_types_default_in;
    if (u != null && u[h]) {
      let d = !1;
      if (typeof u[h] == "object") {
        for (const p in u[h])
          if (i.nodeType == u[h][p] || i.nodeType == "AUTO") {
            d = u[h][p];
            break;
          }
      } else (i.nodeType == u[h] || i.nodeType == "AUTO") && (d = u[h]);
      if (d) {
        let p = !1;
        typeof d == "object" && d.node && (p = d, d = d.node);
        const g = LiteGraph.createNode(d);
        if (g) {
          if (p) {
            if (p.properties)
              for (const m in p.properties)
                g.addProperty(m, p.properties[m]);
            if (p.inputs) {
              g.inputs = [];
              for (const m in p.inputs)
                g.addOutput(
                  p.inputs[m][0],
                  p.inputs[m][1]
                );
            }
            if (p.outputs) {
              g.outputs = [];
              for (const m in p.outputs)
                g.addOutput(
                  p.outputs[m][0],
                  p.outputs[m][1]
                );
            }
            p.title && (g.title = p.title), p.json && g.configure(p.json);
          }
          if (!this.graph) throw new NullGraphError();
          this.graph.add(g), g.pos = [
            i.position[0] + i.posAdd[0] + (i.posSizeFix[0] ? i.posSizeFix[0] * g.size[0] : 0),
            i.position[1] + i.posAdd[1] + (i.posSizeFix[1] ? i.posSizeFix[1] * g.size[1] : 0)
          ];
          const y = { node: g, opts: i };
          if (!this.canvas.dispatchEvent(new CustomEvent("connect-new-default-node", { detail: y, cancelable: !0 }))) return !0;
          if (s) {
            if (!i.nodeFrom) throw new TypeError("createDefaultNodeForSlot - nodeFrom was null");
            i.nodeFrom.connectByType(a, g, h, { afterRerouteId: n });
          } else {
            if (!i.nodeTo) throw new TypeError("createDefaultNodeForSlot - nodeTo was null");
            i.nodeTo.connectByTypeOutput(a, g, h, { afterRerouteId: n });
          }
          return !0;
        }
        console.log(`failed creating ${d}`);
      }
    }
    return !1;
  }
  showConnectionMenu(t) {
    const i = Object.assign({
      nodeFrom: null,
      slotFrom: null,
      nodeTo: null,
      slotTo: null,
      e: void 0,
      allow_searchbox: this.allow_searchbox,
      showSearchBox: this.showSearchBox
    }, t || {}), n = () => S(this, D, Z).call(this), s = this, { graph: o } = this, { afterRerouteId: r } = i, l = i.nodeFrom && i.slotFrom, a = !l && i.nodeTo && i.slotTo;
    if (!l && !a) {
      console.warn("No data passed to showConnectionMenu");
      return;
    }
    const h = l ? i.nodeFrom : i.nodeTo;
    if (!h) throw new TypeError("nodeX was null when creating default node for slot.");
    let u = l ? i.slotFrom : i.slotTo, d;
    switch (typeof u) {
      case "string":
        d = l ? h.findOutputSlot(u, !1) : h.findInputSlot(u, !1), u = l ? h.outputs[u] : h.inputs[u];
        break;
      case "object":
        if (u === null) {
          console.warn("Cant get slot information", u);
          return;
        }
        d = l ? h.findOutputSlot(u.name) : h.findInputSlot(u.name);
        break;
      case "number":
        d = u, u = l ? h.outputs[u] : h.inputs[u];
        break;
      default:
        console.warn("Cant get slot information", u);
        return;
    }
    const p = ["Add Node", "Add Reroute", null];
    i.allow_searchbox && p.push("Search", null);
    const g = u.type == LiteGraph.EVENT ? "_event_" : u.type, y = l ? LiteGraph.slot_types_default_out : LiteGraph.slot_types_default_in;
    if (y != null && y[g])
      if (typeof y[g] == "object")
        for (const w in y[g])
          p.push(y[g][w]);
      else
        p.push(y[g]);
    const _ = new LiteGraph.ContextMenu(p, {
      event: i.e,
      extra: u,
      title: (u && u.name != "" ? u.name + (g ? " | " : "") : "") + (u && g ? g : ""),
      callback: m
    });
    return _;
    function m(w, k, I) {
      var N, T;
      switch (w) {
        case "Add Node":
          E.onMenuAdd(null, null, I, _, function(O) {
            var A, G;
            O && (l ? (A = i.nodeFrom) == null || A.connectByType(d, O, g, { afterRerouteId: r }) : (G = i.nodeTo) == null || G.connectByTypeOutput(d, O, g, { afterRerouteId: r }));
          });
          break;
        case "Add Reroute": {
          const O = l ? i.nodeFrom : i.nodeTo, A = k.extra;
          if (!o) throw new NullGraphError();
          if (!O) throw new TypeError("Cannot add reroute: node was null");
          if (!A) throw new TypeError("Cannot add reroute: slot was null");
          if (!i.e) throw new TypeError("Cannot add reroute: CanvasPointerEvent was null");
          if (!O.connectFloatingReroute([i.e.canvasX, i.e.canvasY], A, r)) throw new Error("Failed to create reroute");
          n();
          break;
        }
        case "Search":
          l ? i.showSearchBox(I, { node_from: i.nodeFrom, slot_from: u, type_filter_in: g }) : i.showSearchBox(I, { node_to: i.nodeTo, slot_from: u, type_filter_out: g });
          break;
        default: {
          const O = {
            position: [((N = i.e) == null ? void 0 : N.canvasX) ?? 0, ((T = i.e) == null ? void 0 : T.canvasY) ?? 0],
            nodeType: w,
            afterRerouteId: r
          }, A = Object.assign(i, O);
          s.createDefaultNodeForSlot(A);
          break;
        }
      }
    }
  }
  // refactor: there are different dialogs, some uses createDialog some dont
  prompt(t, i, n, s, o) {
    var O;
    const r = this;
    t = t || "";
    const l = {
      is_modified: !1,
      className: "graphdialog rounded",
      innerHTML: o ? "<span class='name'></span> <textarea autofocus class='value'></textarea><button class='rounded'>OK</button>" : "<span class='name'></span> <input autofocus type='text' class='value'/><button class='rounded'>OK</button>",
      close() {
        r.prompt_box = null, h.parentNode && h.remove();
      }
    }, a = document.createElement("div"), h = Object.assign(a, l), u = E.active_canvas, { canvas: d } = u;
    if (!d.parentNode) throw new TypeError("canvas element parentNode was null when opening a prompt.");
    d.parentNode.append(h), this.ds.scale > 1 && (h.style.transform = `scale(${this.ds.scale})`);
    let p, g = 0;
    LiteGraph.pointerListenerAdd(h, "leave", function() {
      g || LiteGraph.dialog_close_on_mouse_leave && !h.is_modified && LiteGraph.dialog_close_on_mouse_leave && (p = setTimeout(
        h.close,
        LiteGraph.dialog_close_on_mouse_leave_delay
      ));
    }), LiteGraph.pointerListenerAdd(h, "enter", function() {
      LiteGraph.dialog_close_on_mouse_leave && p && clearTimeout(p);
    });
    const y = h.querySelectorAll("select");
    if (y)
      for (const A of y)
        A.addEventListener("click", function() {
          g++;
        }), A.addEventListener("blur", function() {
          g = 0;
        }), A.addEventListener("change", function() {
          g = -1;
        });
    (O = this.prompt_box) == null || O.close(), this.prompt_box = h;
    const _ = h.querySelector(".name");
    if (!_) throw new TypeError("name_element was null");
    _.textContent = t;
    const m = h.querySelector(".value");
    if (!m) throw new TypeError("value_element was null");
    m.value = i, m.select();
    const w = m;
    w.addEventListener("keydown", function(A) {
      if (h.is_modified = !0, A.key == "Escape")
        h.close();
      else if (A.key == "Enter" && A.target.localName != "textarea")
        n && n(this.value), h.close();
      else
        return;
      A.preventDefault(), A.stopPropagation();
    });
    const k = h.querySelector("button");
    if (!k) throw new TypeError("button was null when opening prompt");
    k.addEventListener("click", function() {
      n == null || n(w.value), r.setDirty(!0), h.close();
    });
    const I = d.getBoundingClientRect();
    let N = -20, T = -20;
    return I && (N -= I.left, T -= I.top), s ? (h.style.left = `${s.clientX + N}px`, h.style.top = `${s.clientY + T}px`) : (h.style.left = `${d.width * 0.5 + N}px`, h.style.top = `${d.height * 0.5 + T}px`), setTimeout(function() {
      var b, R;
      w.focus();
      const A = Date.now();
      function G(C) {
        var F, B;
        C.target === d && Date.now() - A > 256 && (h.close(), (F = d.parentElement) == null || F.removeEventListener("click", G), (B = d.parentElement) == null || B.removeEventListener("touchend", G));
      }
      (b = d.parentElement) == null || b.addEventListener("click", G), (R = d.parentElement) == null || R.addEventListener("touchend", G);
    }, 10), h;
  }
  showSearchBox(t, i) {
    var G;
    const n = {
      slot_from: null,
      node_from: null,
      node_to: null,
      // TODO check for registered_slot_[in/out]_types not empty
      // this will be checked for functionality enabled : filter on slot type, in and out
      do_type_filter: LiteGraph.search_filter_enabled,
      // these are default: pass to set initially set values
      // @ts-expect-error
      type_filter_in: !1,
      type_filter_out: !1,
      show_general_if_none_on_typefilter: !0,
      show_general_after_typefiltered: !0,
      hide_on_mouse_leave: LiteGraph.search_hide_on_mouse_leave,
      show_all_if_empty: !0,
      show_all_on_open: LiteGraph.search_show_all_on_open
    };
    Object.assign(n, i);
    const s = this, o = E.active_canvas, { canvas: r } = o, l = r.ownerDocument || document, a = document.createElement("div"), h = Object.assign(a, {
      close() {
        s.search_box = void 0, this.blur(), r.focus(), l.body.style.overflow = "", setTimeout(() => r.focus(), 20), h.remove();
      }
    });
    h.className = "litegraph litesearchbox graphdialog rounded", h.innerHTML = "<span class='name'>Search</span> <input autofocus type='text' class='value rounded'/>", n.do_type_filter && (h.innerHTML += "<select class='slot_in_type_filter'><option value=''></option></select>", h.innerHTML += "<select class='slot_out_type_filter'><option value=''></option></select>");
    const u = document.createElement("div");
    u.className = "helper", h.append(u), l.fullscreenElement ? l.fullscreenElement.append(h) : (l.body.append(h), l.body.style.overflow = "hidden");
    let d, p;
    if (n.do_type_filter && (d = h.querySelector(".slot_in_type_filter"), p = h.querySelector(".slot_out_type_filter")), this.ds.scale > 1 && (h.style.transform = `scale(${this.ds.scale})`), n.hide_on_mouse_leave) {
      let b = !1, R = null;
      if (LiteGraph.pointerListenerAdd(h, "enter", function() {
        R && (clearTimeout(R), R = null);
      }), h.addEventListener("pointerleave", function() {
        if (b) return;
        const C = n.hide_on_mouse_leave, F = typeof C == "number" ? C : 500;
        R = setTimeout(h.close, F);
      }), n.do_type_filter) {
        if (!d) throw new TypeError("selIn was null when showing search box");
        if (!p) throw new TypeError("selOut was null when showing search box");
        d.addEventListener("click", function() {
          b++;
        }), d.addEventListener("blur", function() {
          b = 0;
        }), d.addEventListener("change", function() {
          b = -1;
        }), p.addEventListener("click", function() {
          b++;
        }), p.addEventListener("blur", function() {
          b = 0;
        }), p.addEventListener("change", function() {
          b = -1;
        });
      }
    }
    (G = s.search_box) == null || G.close(), s.search_box = h;
    let g = null, y = null, _ = null;
    const m = h.querySelector("input");
    if (!m) throw new TypeError("Could not create search input box.");
    const w = m;
    if (w && (w.addEventListener("blur", function() {
      this.focus();
    }), w.addEventListener("keydown", function(b) {
      if (b.key == "ArrowUp")
        O(!1);
      else if (b.key == "ArrowDown")
        O(!0);
      else if (b.key == "Escape")
        h.close();
      else if (b.key == "Enter")
        _ instanceof HTMLElement ? T(unescape(String(_.dataset.type))) : g ? T(g) : h.close();
      else {
        y && clearInterval(y), y = setTimeout(A, 10);
        return;
      }
      return b.preventDefault(), b.stopPropagation(), b.stopImmediatePropagation(), !0;
    })), n.do_type_filter) {
      if (d) {
        const b = LiteGraph.slot_types_in, R = b.length;
        (n.type_filter_in == LiteGraph.EVENT || n.type_filter_in == LiteGraph.ACTION) && (n.type_filter_in = "_event_");
        for (let C = 0; C < R; C++) {
          const F = document.createElement("option");
          F.value = b[C], F.innerHTML = b[C], d.append(F), // @ts-expect-error
          n.type_filter_in !== !1 && String(n.type_filter_in).toLowerCase() == String(b[C]).toLowerCase() && (F.selected = !0);
        }
        d.addEventListener("change", function() {
          A();
        });
      }
      if (p) {
        const b = LiteGraph.slot_types_out;
        (n.type_filter_out == LiteGraph.EVENT || n.type_filter_out == LiteGraph.ACTION) && (n.type_filter_out = "_event_");
        for (const R of b) {
          const C = document.createElement("option");
          C.value = R, C.innerHTML = R, p.append(C), n.type_filter_out !== !1 && String(n.type_filter_out).toLowerCase() == String(R).toLowerCase() && (C.selected = !0);
        }
        p.addEventListener("change", function() {
          A();
        });
      }
    }
    const k = r.getBoundingClientRect(), I = (t ? t.clientX : k.left + k.width * 0.5) - 80, N = (t ? t.clientY : k.top + k.height * 0.5) - 20;
    h.style.left = `${I}px`, h.style.top = `${N}px`, t.layerY > k.height - 200 && (u.style.maxHeight = `${k.height - t.layerY - 20}px`), requestAnimationFrame(function() {
      w.focus();
    }), n.show_all_on_open && A();
    function T(b) {
      if (b)
        if (s.onSearchBoxSelection)
          s.onSearchBoxSelection(b, t, o);
        else {
          if (!o.graph) throw new NullGraphError();
          o.graph.beforeChange();
          const R = LiteGraph.createNode(b);
          if (R && (R.pos = o.convertEventToCanvasOffset(t), o.graph.add(R, !1)), n.node_from) {
            let C = !1;
            switch (typeof n.slot_from) {
              case "string":
                C = n.node_from.findOutputSlot(n.slot_from);
                break;
              case "object":
                if (n.slot_from == null) throw new TypeError("options.slot_from was null when showing search box");
                C = n.slot_from.name ? n.node_from.findOutputSlot(n.slot_from.name) : -1, C == -1 && n.slot_from.slot_index !== void 0 && (C = n.slot_from.slot_index);
                break;
              case "number":
                C = n.slot_from;
                break;
              default:
                C = 0;
            }
            if (n.node_from.outputs[C] !== void 0 && C !== !1 && C > -1) {
              if (R == null) throw new TypeError("options.slot_from was null when showing search box");
              n.node_from.connectByType(C, R, n.node_from.outputs[C].type);
            }
          }
          if (n.node_to) {
            let C = !1;
            switch (typeof n.slot_from) {
              case "string":
                C = n.node_to.findInputSlot(n.slot_from);
                break;
              case "object":
                if (n.slot_from == null) throw new TypeError("options.slot_from was null when showing search box");
                C = n.slot_from.name ? n.node_to.findInputSlot(n.slot_from.name) : -1, C == -1 && n.slot_from.slot_index !== void 0 && (C = n.slot_from.slot_index);
                break;
              case "number":
                C = n.slot_from;
                break;
              default:
                C = 0;
            }
            if (n.node_to.inputs[C] !== void 0 && C !== !1 && C > -1) {
              if (R == null) throw new TypeError("options.slot_from was null when showing search box");
              n.node_to.connectByTypeOutput(C, R, n.node_to.inputs[C].type);
            }
          }
          o.graph.afterChange();
        }
      h.close();
    }
    function O(b) {
      const R = _;
      _ ? _ instanceof Element && (_.classList.remove("selected"), _ = b ? _.nextSibling : _.previousSibling, _ || (_ = R)) : _ = b ? u.childNodes[0] : u.childNodes[u.childNodes.length], _ instanceof Element && (_.classList.add("selected"), _.scrollIntoView({ block: "end", behavior: "smooth" }));
    }
    function A() {
      y = null;
      let b = w.value;
      if (g = null, u.innerHTML = "", !b && !n.show_all_if_empty) return;
      if (s.onSearchBox) {
        const C = s.onSearchBox(u, b, o);
        if (C)
          for (const F of C)
            R(F);
      } else {
        let C = function(U, re) {
          var ke, Te;
          re = re || {};
          const Ot = Object.assign({
            skipFilter: !1,
            inTypeOverride: !1,
            outTypeOverride: !1
          }, re), ae = LiteGraph.registered_node_types[U];
          if (B && ae.filter != B || (!n.show_all_if_empty || b) && !U.toLowerCase().includes(b) && (!ae.title || !ae.title.toLowerCase().includes(b)))
            return !1;
          if (n.do_type_filter && !Ot.skipFilter) {
            const Ee = U;
            let rt = Ot.inTypeOverride !== !1 ? Ot.inTypeOverride : H.value;
            if (H && rt && ((ke = LiteGraph.registered_slot_in_types[rt]) != null && ke.nodes) && LiteGraph.registered_slot_in_types[rt].nodes.includes(Ee) === !1 || (rt = K.value, Ot.outTypeOverride !== !1 && (rt = Ot.outTypeOverride), K && rt && ((Te = LiteGraph.registered_slot_out_types[rt]) != null && Te.nodes) && LiteGraph.registered_slot_out_types[rt].nodes.includes(Ee) === !1))
              return !1;
          }
          return !0;
        }, F = 0;
        if (b = b.toLowerCase(), !o.graph) throw new NullGraphError();
        const B = o.filter || o.graph.filter;
        let H = !1, K = !1;
        n.do_type_filter && s.search_box && (H = s.search_box.querySelector(".slot_in_type_filter"), K = s.search_box.querySelector(".slot_out_type_filter"));
        const oe = Object.keys(LiteGraph.registered_node_types).filter((U) => C(U));
        for (const U of oe)
          if (R(U), E.search_limit !== -1 && F++ > E.search_limit)
            break;
        if (n.show_general_after_typefiltered && (H.value || K.value)) {
          filtered_extra = [];
          for (const U in LiteGraph.registered_node_types)
            C(U, {
              inTypeOverride: H && H.value ? "*" : !1,
              outTypeOverride: K && K.value ? "*" : !1
            }) && filtered_extra.push(U);
          for (const U of filtered_extra)
            if (R(U, "generic_type"), E.search_limit !== -1 && F++ > E.search_limit)
              break;
        }
        if ((H.value || K.value) && u.childNodes.length == 0 && n.show_general_if_none_on_typefilter) {
          filtered_extra = [];
          for (const U in LiteGraph.registered_node_types)
            C(U, { skipFilter: !0 }) && filtered_extra.push(U);
          for (const U of filtered_extra)
            if (R(U, "not_in_filter"), E.search_limit !== -1 && F++ > E.search_limit)
              break;
        }
      }
      function R(C, F) {
        const B = document.createElement("div");
        g || (g = C);
        const H = LiteGraph.registered_node_types[C];
        if (H != null && H.title) {
          B.textContent = H == null ? void 0 : H.title;
          const K = document.createElement("span");
          K.className = "litegraph lite-search-item-type", K.textContent = C, B.append(K);
        } else
          B.textContent = C;
        B.dataset.type = escape(C), B.className = "litegraph lite-search-item", F && (B.className += ` ${F}`), B.addEventListener("click", function() {
          T(unescape(String(this.dataset.type)));
        }), u.append(B);
      }
    }
    return h;
  }
  showEditPropertyValue(t, i, n) {
    if (!t || t.properties[i] === void 0) return;
    n = n || {};
    const s = t.getPropertyInfo(i), { type: o } = s;
    let r = "";
    if (o == "string" || o == "number" || o == "array" || o == "object")
      r = "<input autofocus type='text' class='value'/>";
    else if ((o == "enum" || o == "combo") && s.values) {
      r = "<select autofocus type='text' class='value'>";
      for (const g in s.values) {
        const y = Array.isArray(s.values) ? s.values[g] : g, _ = y == t.properties[i] ? "selected" : "";
        r += `<option value='${y}' ${_}>${s.values[g]}</option>`;
      }
      r += "</select>";
    } else if (o == "boolean" || o == "toggle")
      r = `<input autofocus type='checkbox' class='value' ${t.properties[i] ? "checked" : ""}/>`;
    else {
      console.warn(`unknown type: ${o}`);
      return;
    }
    const l = this.createDialog(
      `<span class='name'>${s.label || i}</span>${r}<button>OK</button>`,
      n
    );
    let a;
    if ((o == "enum" || o == "combo") && s.values)
      a = l.querySelector("select"), a == null || a.addEventListener("change", function(g) {
        var y;
        l.modified(), p((y = g.target) == null ? void 0 : y.value);
      });
    else if (o == "boolean" || o == "toggle")
      a = l.querySelector("input"), a == null || a.addEventListener("click", function() {
        l.modified(), p(!!a.checked);
      });
    else if (a = l.querySelector("input"), a) {
      a.addEventListener("blur", function() {
        this.focus();
      });
      let g = t.properties[i] !== void 0 ? t.properties[i] : "";
      o !== "string" && (g = JSON.stringify(g)), a.value = g, a.addEventListener("keydown", function(y) {
        if (y.key == "Escape")
          l.close();
        else if (y.key == "Enter")
          u();
        else {
          l.modified();
          return;
        }
        y.preventDefault(), y.stopPropagation();
      });
    }
    a == null || a.focus();
    const h = l.querySelector("button");
    if (!h) throw new TypeError("Show edit property value button was null.");
    h.addEventListener("click", u);
    function u() {
      p(a == null ? void 0 : a.value);
    }
    const d = () => S(this, D, Z).call(this);
    function p(g) {
      var y, _;
      s != null && s.values && typeof s.values == "object" && s.values[g] != null && (g = s.values[g]), typeof t.properties[i] == "number" && (g = Number(g)), (o == "array" || o == "object") && (g = JSON.parse(g)), t.properties[i] = g, t.graph && t.graph._version++, (y = t.onPropertyChanged) == null || y.call(t, i, g), (_ = n.onclose) == null || _.call(n), l.close(), d();
    }
    return l;
  }
  // TODO refactor, theer are different dialog, some uses createDialog, some dont
  createDialog(t, i) {
    i = Object.assign({
      checkForInput: !1,
      closeOnLeave: !0,
      closeOnLeave_checkModified: !0
    }, i || {});
    const s = {
      className: "graphdialog",
      innerHTML: t,
      is_modified: !1,
      modified() {
        this.is_modified = !0;
      },
      close() {
        this.remove();
      }
    }, o = document.createElement("div"), r = Object.assign(o, s), l = this.canvas.getBoundingClientRect();
    let a = -20, h = -20;
    if (l && (a -= l.left, h -= l.top), i.position ? (a += i.position[0], h += i.position[1]) : i.event ? (a += i.event.clientX, h += i.event.clientY) : (a += this.canvas.width * 0.5, h += this.canvas.height * 0.5), r.style.left = `${a}px`, r.style.top = `${h}px`, !this.canvas.parentNode) throw new TypeError("Canvas parent element was null.");
    if (this.canvas.parentNode.append(r), i.checkForInput) {
      const g = r.querySelectorAll("input");
      if (g)
        for (const y of g)
          y.addEventListener("keydown", function(_) {
            if (r.modified(), _.key == "Escape")
              r.close();
            else if (_.key != "Enter")
              return;
            _.preventDefault(), _.stopPropagation();
          }), y.focus();
    }
    let u, d = 0;
    r.addEventListener("mouseleave", function() {
      d || !r.is_modified && LiteGraph.dialog_close_on_mouse_leave && (u = setTimeout(
        r.close,
        LiteGraph.dialog_close_on_mouse_leave_delay
      ));
    }), r.addEventListener("mouseenter", function() {
      (i.closeOnLeave || LiteGraph.dialog_close_on_mouse_leave) && u && clearTimeout(u);
    });
    const p = r.querySelectorAll("select");
    if (p)
      for (const g of p)
        g.addEventListener("click", function() {
          d++;
        }), g.addEventListener("blur", function() {
          d = 0;
        }), g.addEventListener("change", function() {
          d = -1;
        });
    return r;
  }
  createPanel(t, i) {
    i = i || {};
    const n = i.window || window, s = document.createElement("div");
    if (s.className = "litegraph dialog", s.innerHTML = "<div class='dialog-header'><span class='dialog-title'></span></div><div class='dialog-content'></div><div style='display:none;' class='dialog-alt-content'></div><div class='dialog-footer'></div>", s.header = s.querySelector(".dialog-header"), i.width && (s.style.width = i.width + (typeof i.width == "number" ? "px" : "")), i.height && (s.style.height = i.height + (typeof i.height == "number" ? "px" : "")), i.closable) {
      const o = document.createElement("span");
      o.innerHTML = "&#10005;", o.classList.add("close"), o.addEventListener("click", function() {
        s.close();
      }), s.header.append(o);
    }
    return s.title_element = s.querySelector(".dialog-title"), s.title_element.textContent = t, s.content = s.querySelector(".dialog-content"), s.alt_content = s.querySelector(".dialog-alt-content"), s.footer = s.querySelector(".dialog-footer"), s.close = function() {
      typeof s.onClose == "function" && s.onClose(), s.remove(), this.remove();
    }, s.toggleAltContent = function(o) {
      let r, l;
      o !== void 0 ? (r = o ? "block" : "none", l = o ? "none" : "block") : (r = s.alt_content.style.display != "block" ? "block" : "none", l = s.alt_content.style.display != "block" ? "none" : "block"), s.alt_content.style.display = r, s.content.style.display = l;
    }, s.toggleFooterVisibility = function(o) {
      let r;
      o !== void 0 ? r = o ? "block" : "none" : r = s.footer.style.display != "block" ? "block" : "none", s.footer.style.display = r;
    }, s.clear = function() {
      this.content.innerHTML = "";
    }, s.addHTML = function(o, r, l) {
      const a = document.createElement("div");
      return r && (a.className = r), a.innerHTML = o, l ? s.footer.append(a) : s.content.append(a), a;
    }, s.addButton = function(o, r, l) {
      const a = document.createElement("button");
      return a.textContent = o, a.options = l, a.classList.add("btn"), a.addEventListener("click", r), s.footer.append(a), a;
    }, s.addSeparator = function() {
      const o = document.createElement("div");
      o.className = "separator", s.content.append(o);
    }, s.addWidget = function(o, r, l, a, h) {
      a = a || {};
      let u = String(l);
      o = o.toLowerCase(), o == "number" && typeof l == "number" && (u = l.toFixed(3));
      const d = document.createElement("div");
      d.className = "property", d.innerHTML = "<span class='property_name'></span><span class='property_value'></span>";
      const p = d.querySelector(".property_name");
      if (!p) throw new TypeError("Property name element was null.");
      p.textContent = a.label || r;
      const g = d.querySelector(".property_value");
      if (!g) throw new TypeError("Property name element was null.");
      if (g.textContent = u, d.dataset.property = r, d.dataset.type = a.type || o, d.options = a, d.value = l, o == "code")
        d.addEventListener("click", function() {
          s.inner_showCodePad(this.dataset.property);
        });
      else if (o == "boolean")
        d.classList.add("boolean"), l && d.classList.add("bool-on"), d.addEventListener("click", () => {
          const _ = d.dataset.property;
          if (d.value = !d.value, d.classList.toggle("bool-on"), !g) throw new TypeError("Property name element was null.");
          g.textContent = d.value ? "true" : "false", y(_, d.value);
        });
      else if (o == "string" || o == "number") {
        if (!g) throw new TypeError("Property name element was null.");
        g.setAttribute("contenteditable", "true"), g.addEventListener("keydown", function(_) {
          _.code == "Enter" && (o != "string" || !_.shiftKey) && (_.preventDefault(), this.blur());
        }), g.addEventListener("blur", function() {
          var k, I;
          let _ = this.textContent;
          const m = (k = this.parentElement) == null ? void 0 : k.dataset.property;
          ((I = this.parentElement) == null ? void 0 : I.dataset.type) == "number" && (_ = Number(_)), y(m, _);
        });
      } else if (o == "enum" || o == "combo") {
        const _ = E.getPropertyPrintableValue(l, a.values);
        if (!g) throw new TypeError("Property name element was null.");
        g.textContent = _ ?? "", g.addEventListener("click", function(m) {
          var N;
          const w = a.values || [], k = (N = this.parentElement) == null ? void 0 : N.dataset.property, I = (T) => (this.textContent = T, y(k, T), !1);
          new LiteGraph.ContextMenu(
            w,
            {
              event: m,
              className: "dark",
              callback: I
            },
            // @ts-expect-error
            n
          );
        });
      }
      s.content.append(d);
      function y(_, m) {
        var w;
        (w = a.callback) == null || w.call(a, _, m, a), h == null || h(_, m, a);
      }
      return d;
    }, typeof s.onOpen == "function" && s.onOpen(), s;
  }
  closePanels() {
    var t, i, n, s;
    (i = (t = document.querySelector("#node-panel")) == null ? void 0 : t.close) == null || i.call(t), (s = (n = document.querySelector("#option-panel")) == null ? void 0 : n.close) == null || s.call(n);
  }
  showShowNodePanel(t) {
    this.SELECTED_NODE = t, this.closePanels();
    const i = this.getCanvasWindow(), n = this.createPanel(t.title || "", {
      closable: !0,
      window: i,
      onOpen: () => {
        this.NODEPANEL_IS_OPEN = !0;
      },
      onClose: () => {
        this.NODEPANEL_IS_OPEN = !1, this.node_panel = null;
      }
    });
    this.node_panel = n, n.id = "node-panel", n.node = t, n.classList.add("settings");
    const s = () => {
      var a, h;
      n.content.innerHTML = "", n.addHTML(`<span class='node_type'>${t.type}</span><span class='node_desc'>${t.constructor.desc || ""}</span><span class='separator'></span>`), n.addHTML("<h3>Properties</h3>");
      const o = (u, d) => {
        if (!this.graph) throw new NullGraphError();
        switch (this.graph.beforeChange(t), u) {
          case "Title":
            if (typeof d != "string") throw new TypeError("Attempting to set title to non-string value.");
            t.title = d;
            break;
          case "Mode": {
            if (typeof d != "string") throw new TypeError("Attempting to set mode to non-string value.");
            const p = Object.values(LiteGraph.NODE_MODES).indexOf(d);
            p !== -1 && LiteGraph.NODE_MODES[p] ? t.changeMode(p) : console.warn(`unexpected mode: ${d}`);
            break;
          }
          case "Color":
            if (typeof d != "string") throw new TypeError("Attempting to set colour to non-string value.");
            E.node_colors[d] ? (t.color = E.node_colors[d].color, t.bgcolor = E.node_colors[d].bgcolor) : console.warn(`unexpected color: ${d}`);
            break;
          default:
            t.setProperty(u, d);
            break;
        }
        this.graph.afterChange(), this.dirty_canvas = !0;
      };
      n.addWidget("string", "Title", t.title, {}, o);
      const r = t.mode == null ? void 0 : LiteGraph.NODE_MODES[t.mode];
      n.addWidget("combo", "Mode", r, { values: LiteGraph.NODE_MODES }, o);
      const l = t.color !== void 0 ? Object.keys(E.node_colors).filter(function(u) {
        return E.node_colors[u].color == t.color;
      }) : "";
      n.addWidget("combo", "Color", l, { values: Object.keys(E.node_colors) }, o);
      for (const u in t.properties) {
        const d = t.properties[u], p = t.getPropertyInfo(u);
        (a = t.onAddPropertyToPanel) != null && a.call(t, u, n) || n.addWidget(p.widget || p.type, u, d, p, o);
      }
      n.addSeparator(), (h = t.onShowCustomPanelInfo) == null || h.call(t, n), n.footer.innerHTML = "", n.addButton("Delete", function() {
        if (!t.block_delete) {
          if (!t.graph) throw new NullGraphError();
          t.graph.remove(t), n.close();
        }
      }).classList.add("delete");
    };
    if (n.inner_showCodePad = function(o) {
      n.classList.remove("settings"), n.classList.add("centered"), n.alt_content.innerHTML = "<textarea class='code'></textarea>";
      const r = n.alt_content.querySelector("textarea"), l = function() {
        n.toggleAltContent(!1), n.toggleFooterVisibility(!0), r.remove(), n.classList.add("settings"), n.classList.remove("centered"), s();
      };
      r.value = String(t.properties[o]), r.addEventListener("keydown", function(u) {
        u.code == "Enter" && u.ctrlKey && (t.setProperty(o, r.value), l());
      }), n.toggleAltContent(!0), n.toggleFooterVisibility(!1), r.style.height = "calc(100% - 40px)";
      const a = n.addButton("Assign", function() {
        t.setProperty(o, r.value), l();
      });
      n.alt_content.append(a);
      const h = n.addButton("Close", l);
      h.style.float = "right", n.alt_content.append(h);
    }, s(), !this.canvas.parentNode) throw new TypeError("showNodePanel - this.canvas.parentNode was null");
    this.canvas.parentNode.append(n);
  }
  checkPanels() {
    if (!this.canvas) return;
    if (!this.canvas.parentNode) throw new TypeError("checkPanels - this.canvas.parentNode was null");
    const t = this.canvas.parentNode.querySelectorAll(".litegraph.dialog");
    for (const i of t)
      i.node && (!i.node.graph || i.graph != this.graph) && i.close();
  }
  getCanvasMenuOptions() {
    var n;
    let t;
    this.getMenuOptions ? t = this.getMenuOptions() : (t = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: E.onMenuAdd
      },
      { content: "Add Group", callback: E.onGroupAdd }
      // { content: "Arrange", callback: that.graph.arrange },
      // {content:"Collapse All", callback: LGraphCanvas.onMenuCollapseAll }
    ], Object.keys(this.selected_nodes).length > 1 && t.push({
      content: "Align",
      has_submenu: !0,
      callback: E.onGroupAlign
    }));
    const i = (n = this.getExtraMenuOptions) == null ? void 0 : n.call(this, this, t);
    return Array.isArray(i) ? t.concat(i) : t;
  }
  // called by processContextMenu to extract the menu list
  getNodeMenuOptions(t) {
    var s, o, r, l;
    let i;
    t.getMenuOptions ? i = t.getMenuOptions(this) : (i = [
      {
        content: "Inputs",
        has_submenu: !0,
        disabled: !0
      },
      {
        content: "Outputs",
        has_submenu: !0,
        disabled: !0,
        callback: E.showMenuNodeOptionalOutputs
      },
      null,
      {
        content: "Properties",
        has_submenu: !0,
        callback: E.onShowMenuNodeProperties
      },
      {
        content: "Properties Panel",
        callback: function(a, h, u, d, p) {
          E.active_canvas.showShowNodePanel(p);
        }
      },
      null,
      {
        content: "Title",
        callback: E.onShowPropertyEditor
      },
      {
        content: "Mode",
        has_submenu: !0,
        callback: E.onMenuNodeMode
      }
    ], t.resizable !== !1 && i.push({
      content: "Resize",
      callback: E.onMenuResizeNode
    }), t.collapsible && i.push({
      content: t.collapsed ? "Expand" : "Collapse",
      callback: E.onMenuNodeCollapse
    }), (s = t.widgets) != null && s.some((a) => a.advanced) && i.push({
      content: t.showAdvanced ? "Hide Advanced" : "Show Advanced",
      callback: E.onMenuToggleAdvanced
    }), i.push(
      {
        content: t.pinned ? "Unpin" : "Pin",
        callback: () => {
          for (const a in this.selected_nodes)
            this.selected_nodes[a].pin();
          this.setDirty(!0, !0);
        }
      },
      {
        content: "Colors",
        has_submenu: !0,
        callback: E.onMenuNodeColors
      },
      {
        content: "Shapes",
        has_submenu: !0,
        callback: E.onMenuNodeShapes
      },
      null
    ));
    const n = (o = t.getExtraMenuOptions) == null ? void 0 : o.call(t, this, i);
    return Array.isArray(n) && n.length > 0 && (n.push(null), i = n.concat(i)), t.clonable !== !1 && i.push({
      content: "Clone",
      callback: E.onMenuNodeClone
    }), Object.keys(this.selected_nodes).length > 1 && i.push({
      content: "Align Selected To",
      has_submenu: !0,
      callback: E.onNodeAlign
    }, {
      content: "Distribute Nodes",
      has_submenu: !0,
      callback: E.createDistributeMenu
    }), i.push(null, {
      content: "Remove",
      disabled: !(t.removable !== !1 && !t.block_delete),
      callback: E.onMenuNodeRemove
    }), (l = (r = t.graph) == null ? void 0 : r.onGetNodeMenuOptions) == null || l.call(r, i, t), i;
  }
  /** @deprecated */
  getGroupMenuOptions(t) {
    return console.warn("LGraphCanvas.getGroupMenuOptions is deprecated, use LGraphGroup.getMenuOptions instead"), t.getMenuOptions();
  }
  processContextMenu(t, i) {
    var u, d, p;
    const s = E.active_canvas.getCanvasWindow();
    let o;
    const r = {
      event: i,
      callback: h,
      extra: t
    };
    if (t) {
      r.title = t.type ?? void 0, E.active_node = t;
      const g = t.getSlotInPosition(i.canvasX, i.canvasY);
      if (g) {
        if (o = [], t.getSlotMenuOptions)
          o = t.getSlotMenuOptions(g);
        else {
          ((d = (u = g.output) == null ? void 0 : u.links) != null && d.length || ((p = g.input) == null ? void 0 : p.link) != null) && o.push({ content: "Disconnect Links", slot: g });
          const y = g.input || g.output;
          if (!y) throw new TypeError("Both in put and output slots were null when processing context menu.");
          y.removable && o.push(
            y.locked ? "Cannot remove" : { content: "Remove Slot", slot: g }
          ), !y.nameLocked && !("link" in y && y.widget) && o.push({ content: "Rename Slot", slot: g }), t.getExtraSlotMenuOptions && o.push(...t.getExtraSlotMenuOptions(g));
        }
        r.title = (g.input ? g.input.type : g.output.type) || "*", g.input && g.input.type == LiteGraph.ACTION && (r.title = "Action"), g.output && g.output.type == LiteGraph.EVENT && (r.title = "Event");
      } else
        o = this.getNodeMenuOptions(t);
    } else {
      if (o = this.getCanvasMenuOptions(), !this.graph) throw new NullGraphError();
      if (this.links_render_mode !== LinkRenderType.HIDDEN_LINK) {
        const y = this.graph.getRerouteOnPos(i.canvasX, i.canvasY, L(this, it));
        y && o.unshift({
          content: "Delete Reroute",
          callback: () => {
            if (!this.graph) throw new NullGraphError();
            this.graph.removeReroute(y.id);
          }
        }, null);
      }
      const g = this.graph.getGroupOnPos(
        i.canvasX,
        i.canvasY
      );
      g && o.push(null, {
        content: "Edit Group",
        has_submenu: !0,
        submenu: {
          title: "Group",
          extra: g,
          options: g.getMenuOptions()
        }
      });
    }
    if (!o) return;
    new LiteGraph.ContextMenu(o, r, s);
    const l = (g) => this.createDialog(
      "<span class='name'>Name</span><input autofocus type='text'/><button>OK</button>",
      g
    ), a = () => this.setDirty(!0);
    function h(g, y) {
      var _;
      if (g) {
        if (g.content == "Remove Slot") {
          if (!(t != null && t.graph)) throw new NullGraphError();
          const m = g.slot;
          if (!m) throw new TypeError("Found-slot info was null when processing context menu.");
          t.graph.beforeChange(), m.input ? t.removeInput(m.slot) : m.output && t.removeOutput(m.slot), t.graph.afterChange();
          return;
        } else if (g.content == "Disconnect Links") {
          if (!(t != null && t.graph)) throw new NullGraphError();
          const m = g.slot;
          if (!m) throw new TypeError("Found-slot info was null when processing context menu.");
          t.graph.beforeChange(), m.output ? t.disconnectOutput(m.slot) : m.input && t.disconnectInput(m.slot, !0), t.graph.afterChange();
          return;
        } else if (g.content == "Rename Slot") {
          if (!t) throw new TypeError("`node` was null when processing the context menu.");
          const m = g.slot;
          if (!m) throw new TypeError("Found-slot info was null when processing context menu.");
          const w = m.input ? t.getInputInfo(m.slot) : t.getOutputInfo(m.slot), k = l(y), I = k.querySelector("input");
          I && w && (I.value = w.label || "");
          const N = function() {
            if (!t.graph) throw new NullGraphError();
            t.graph.beforeChange(), I != null && I.value && (w && (w.label = I.value), a()), k.close(), t.graph.afterChange();
          };
          if ((_ = k.querySelector("button")) == null || _.addEventListener("click", N), !I) throw new TypeError("Input element was null when processing context menu.");
          I.addEventListener("keydown", function(T) {
            if (k.is_modified = !0, T.key == "Escape")
              k.close();
            else if (T.key == "Enter")
              N();
            else if (T.target.localName != "textarea")
              return;
            T.preventDefault(), T.stopPropagation();
          }), I.focus();
        }
      }
    }
  }
  /**
   * Starts an animation to fit the view around the specified selection of nodes.
   * @param bounds The bounds to animate the view to, defined by a rectangle.
   */
  animateToBounds(t, i = {}) {
    const n = () => this.setDirty(!0, !0);
    this.ds.animateToBounds(t, n, i);
  }
  /**
   * Fits the view to the selected nodes with animation.
   * If nothing is selected, the view is fitted around all items in the graph.
   */
  fitViewToSelectionAnimated(t = {}) {
    const i = this.selectedItems.size ? Array.from(this.selectedItems) : this.positionableItems, n = createBounds(i);
    if (!n) throw new TypeError("Attempted to fit to view but could not calculate bounds.");
    const s = () => this.setDirty(!0, !0);
    this.ds.animateToBounds(n, s, t);
  }
};
Jt = new WeakMap(), Qt = new WeakMap(), te = new WeakMap(), ct = new WeakMap(), ot = new WeakMap(), ee = new WeakMap(), ie = new WeakMap(), ne = new WeakMap(), D = new WeakSet(), Kt = function() {
  if (!this.state.shouldSetCursor) return;
  let t = "default";
  this.state.draggingCanvas ? t = "grabbing" : this.state.readOnly ? t = "grab" : this.state.hoveringOver & CanvasItem.ResizeSe ? t = "se-resize" : this.state.hoveringOver & CanvasItem.Node ? t = "crosshair" : this.state.hoveringOver & CanvasItem.Reroute ? t = "grab" : this.state.hoveringOver & CanvasItem.RerouteSlot && (t = "crosshair"), this.canvas.style.cursor = t;
}, ut = new WeakMap(), Vt = new WeakMap(), it = new WeakMap(), q = new WeakMap(), Xt = new WeakMap(), yt = new WeakMap(), /**
 * Finds the canvas if required, throwing on failure.
 * @param canvas Canvas element, or its element ID
 * @returns The canvas element
 * @throws If {@link canvas} is an element ID that does not belong to a valid HTML canvas element
 */
Fe = function(t) {
  if (typeof t == "string") {
    const i = document.getElementById(t);
    if (!(i instanceof HTMLCanvasElement)) throw "Error validating LiteGraph canvas: Canvas element not found";
    return i;
  }
  return t;
}, /** Marks the entire canvas as dirty. */
Z = function() {
  this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
}, ft = function() {
  const { graph: t, linkConnector: i, pointer: n } = this;
  if (!t) throw new NullGraphError();
  n.onDragEnd = (s) => i.dropLinks(t, s), n.finally = () => {
    this.linkConnector.reset(!0), S(this, D, Z).call(this);
  };
}, We = function(t, i) {
  var h;
  const { pointer: n, graph: s, linkConnector: o } = this;
  if (!s) throw new NullGraphError();
  const r = t.canvasX, l = t.canvasY, a = t.ctrlKey || t.metaKey;
  if (a && !t.altKey) {
    const u = new Float32Array(4);
    u[0] = r, u[1] = l, u[2] = 1, u[3] = 1, n.onClick = (d) => {
      const p = i ?? s.getRerouteOnPos(d.canvasX, d.canvasY, L(this, it)) ?? s.getGroupTitlebarOnPos(d.canvasX, d.canvasY);
      this.processSelect(p, d);
    }, n.onDragStart = () => this.dragging_rectangle = u, n.onDragEnd = (d) => S(this, D, Xe).call(this, d, u), n.finally = () => this.dragging_rectangle = null;
    return;
  }
  if (this.read_only) {
    n.finally = () => this.dragging_canvas = !1, this.dragging_canvas = !0;
    return;
  }
  if (LiteGraph.alt_drag_do_clone_nodes && t.altKey && !t.ctrlKey && i && this.allow_interaction) {
    const u = (h = i.clone()) == null ? void 0 : h.serialize();
    if ((u == null ? void 0 : u.type) != null) {
      const d = LiteGraph.createNode(u.type);
      if (d) {
        d.configure(u), d.pos[0] += 5, d.pos[1] += 5, this.allow_dragnodes ? (n.onDragStart = (p) => {
          s.add(d, !1), S(this, D, Lt).call(this, d, p);
        }, n.onDragEnd = (p) => S(this, D, kt).call(this, p)) : (s.beforeChange(), s.add(d, !1), s.afterChange());
        return;
      }
    }
  }
  if (i && (this.allow_interaction || i.flags.allow_interaction))
    S(this, D, Be).call(this, t, a, i);
  else {
    if (this.links_render_mode !== LinkRenderType.HIDDEN_LINK)
      for (const g of L(this, it)) {
        const y = g.containsPoint([r, l]);
        if (!(!g.isSlotHovered && !y)) {
          y && (n.onClick = () => this.processSelect(g, t), t.shiftKey || (n.onDragStart = (_) => S(this, D, Lt).call(this, g, _, !0), n.onDragEnd = (_) => S(this, D, kt).call(this, _))), (g.isOutputHovered || y && t.shiftKey) && (o.dragFromReroute(s, g), S(this, D, ft).call(this)), g.isInputHovered && (o.dragFromRerouteToOutput(s, g), S(this, D, ft).call(this)), g.hideSlots(), this.dirty_bgcanvas = !0;
          return;
        }
      }
    const { lineWidth: u } = this.ctx;
    this.ctx.lineWidth = this.connections_width + 7;
    const d = (window == null ? void 0 : window.devicePixelRatio) || 1;
    for (const g of this.renderedPaths) {
      const y = g._pos;
      if (y) {
        if ((t.shiftKey || t.altKey) && g.path && this.ctx.isPointInStroke(g.path, r * d, l * d)) {
          if (this.ctx.lineWidth = u, t.shiftKey && !t.altKey) {
            o.dragFromLinkSegment(s, g), S(this, D, ft).call(this);
            return;
          } else if (t.altKey && !t.shiftKey) {
            const _ = s.createReroute([r, l], g);
            n.onDragStart = (m) => S(this, D, Lt).call(this, _, m), n.onDragEnd = (m) => S(this, D, kt).call(this, m);
            return;
          }
        } else if (isInRectangle(r, l, y[0] - 4, y[1] - 4, 8, 8)) {
          this.ctx.lineWidth = u, n.onClick = () => this.showLinkMenu(g, t), n.onDragStart = () => this.dragging_canvas = !0, n.finally = () => this.dragging_canvas = !1, this.over_link_center = void 0;
          return;
        }
      }
    }
    this.ctx.lineWidth = u;
    const p = s.getGroupOnPos(r, l);
    if (this.selected_group = p ?? null, p) {
      if (p.isInResize(r, l)) {
        const g = p.boundingRect, y = r - (g[0] + g[2]), _ = l - (g[1] + g[3]);
        n.onDragStart = () => this.resizingGroup = p, n.onDrag = (m) => {
          if (this.read_only) return;
          const w = [
            m.canvasX - p.pos[0] - y,
            m.canvasY - p.pos[1] - _
          ];
          L(this, q) && snapPoint(w, L(this, q)), p.resize(w[0], w[1]) && (this.dirty_bgcanvas = !0);
        }, n.finally = () => this.resizingGroup = null;
      } else {
        const y = (p.font_size || LiteGraph.DEFAULT_GROUP_FONT_SIZE) * 1.4;
        isInRectangle(
          r,
          l,
          p.pos[0],
          p.pos[1],
          p.size[0],
          y
        ) && (n.onClick = () => this.processSelect(p, t), n.onDragStart = (_) => {
          p.recomputeInsideNodes(), S(this, D, Lt).call(this, p, _, !0);
        }, n.onDragEnd = (_) => S(this, D, kt).call(this, _));
      }
      n.onDoubleClick = () => {
        this.emitEvent({
          subType: "group-double-click",
          originalEvent: t,
          group: p
        });
      };
    } else
      n.onDoubleClick = () => {
        this.allow_searchbox && (this.showSearchBox(t), t.preventDefault()), this.emitEvent({
          subType: "empty-double-click",
          originalEvent: t
        });
      };
  }
  !n.onDragStart && !n.onClick && !n.onDrag && this.allow_dragcanvas && (n.onClick = () => this.processSelect(null, t), n.finally = () => this.dragging_canvas = !1, this.dragging_canvas = !0);
}, /**
 * Processes a pointerdown event inside the bounds of a node.  Part of {@link processMouseDown}.
 * @param e The pointerdown event
 * @param ctrlOrMeta Ctrl or meta key is pressed
 * @param node The node to process a click event for
 */
Be = function(t, i, n) {
  var p, g, y, _;
  const { pointer: s, graph: o, linkConnector: r } = this;
  if (!o) throw new NullGraphError();
  const l = t.canvasX, a = t.canvasY;
  s.onClick = () => this.processSelect(n, t), n.flags.pinned || this.bringToFront(n);
  const h = n.isPointInCollapse(l, a);
  if (h)
    s.onClick = () => {
      n.collapse(), this.setDirty(!0, !0);
    };
  else if (!n.flags.collapsed) {
    if (n.resizable !== !1 && n.inResizeCorner(l, a)) {
      const k = n.boundingRect, I = l - (k[0] + k[2]), N = a - (k[1] + k[3]);
      s.onDragStart = () => {
        o.beforeChange(), this.resizing_node = n;
      }, s.onDrag = (T) => {
        if (this.read_only) return;
        const O = [
          T.canvasX - n.pos[0] - I,
          T.canvasY - n.pos[1] - N
        ];
        L(this, q) && snapPoint(O, L(this, q));
        const A = n.computeSize();
        O[0] = Math.max(A[0], O[0]), O[1] = Math.max(A[1], O[1]), n.setSize(O), S(this, D, Z).call(this);
      }, s.onDragEnd = () => {
        S(this, D, Z).call(this), o.afterChange(this.resizing_node);
      }, s.finally = () => this.resizing_node = null, this.canvas.style.cursor = "se-resize";
      return;
    }
    const { inputs: m, outputs: w } = n;
    if (w)
      for (const [k, I] of w.entries()) {
        const N = n.getOutputPos(k);
        if (isInRectangle(l, a, N[0] - 15, N[1] - 10, 30, 20)) {
          if (t.shiftKey && ((p = I.links) != null && p.length || (g = I._floatingLinks) != null && g.size)) {
            r.moveOutputLink(o, I), S(this, D, ft).call(this);
            return;
          }
          r.dragNewFromOutput(o, n, I), S(this, D, ft).call(this), LiteGraph.shift_click_do_break_link_from ? t.shiftKey && n.disconnectOutput(k) : LiteGraph.ctrl_alt_click_do_break_link && i && t.altKey && !t.shiftKey && n.disconnectOutput(k), s.onDoubleClick = () => {
            var T;
            return (T = n.onOutputDblClick) == null ? void 0 : T.call(n, k, t);
          }, s.onClick = () => {
            var T;
            return (T = n.onOutputClick) == null ? void 0 : T.call(n, k, t);
          };
          return;
        }
      }
    if (m)
      for (const [k, I] of m.entries()) {
        const N = n.getInputPos(k);
        if (I instanceof NodeInputSlot ? isInRect(l, a, I.boundingRect) : isInRectangle(l, a, N[0] - 15, N[1] - 10, 30, 20)) {
          s.onDoubleClick = () => {
            var A;
            return (A = n.onInputDblClick) == null ? void 0 : A.call(n, k, t);
          }, s.onClick = () => {
            var A;
            return (A = n.onInputClick) == null ? void 0 : A.call(n, k, t);
          };
          const O = LiteGraph.ctrl_alt_click_do_break_link && i && t.altKey && !t.shiftKey;
          (I.link !== null || (y = I._floatingLinks) != null && y.size) && (O || LiteGraph.click_do_break_link_to ? n.disconnectInput(k, !0) : (t.shiftKey || this.allow_reconnect_links) && r.moveInputLink(o, I)), r.isConnecting || r.dragNewFromInput(o, n, I), S(this, D, ft).call(this), this.dirty_bgcanvas = !0;
          return;
        }
      }
  }
  const u = [l - n.pos[0], a - n.pos[1]], d = n.getWidgetOnPos(l, a);
  if (d)
    S(this, D, ze).call(this, t, n, d), this.node_widget = [n, d];
  else {
    if (s.onDoubleClick = () => {
      var m, w;
      u[1] < 0 && !h && ((m = n.onNodeTitleDblClick) == null || m.call(n, t, u, this)), (w = n.onDblClick) == null || w.call(n, t, u, this), this.emitEvent({
        subType: "node-double-click",
        originalEvent: t,
        node: n
      }), this.processNodeDblClicked(n);
    }, (_ = n.onMouseDown) != null && _.call(n, t, u, this) || !this.allow_dragnodes)
      return;
    s.onDragStart = (m) => S(this, D, Lt).call(this, n, m, !0), s.onDragEnd = (m) => S(this, D, kt).call(this, m);
  }
  this.dirty_canvas = !0;
}, ze = function(t, i, n) {
  var u;
  const { pointer: s } = this;
  if (typeof n.onPointerDown == "function" && n.onPointerDown(s, i, this))
    return;
  const o = n.value, r = this.graph_mouse, l = r[0] - i.pos[0], a = r[1] - i.pos[1], h = WIDGET_TYPE_MAP[n.type];
  if (h) {
    const d = toClass(h, n);
    s.onClick = () => d.onClick({
      e: t,
      node: i,
      canvas: this
    }), s.onDrag = (p) => {
      var g;
      return (g = d.onDrag) == null ? void 0 : g.call(d, {
        e: p,
        node: i,
        canvas: this
      });
    };
  } else if (n.mouse) {
    const d = n.mouse(t, [l, a], i);
    d != null && (this.dirty_canvas = d);
  }
  if (o != n.value) {
    if ((u = i.onWidgetChanged) == null || u.call(i, n.name, n.value, o, n), !i.graph) throw new NullGraphError();
    i.graph._version++;
  }
  s.finally = () => {
    if (n.mouse) {
      const { eUp: d } = s;
      if (!d) return;
      const { canvasX: p, canvasY: g } = d;
      n.mouse(d, [p - i.pos[0], g - i.pos[1]], i);
    }
    this.node_widget = null;
  };
}, /**
 * Pointer middle button click processing.  Part of {@link processMouseDown}.
 * @param e The pointerdown event
 * @param node The node to process a click event for
 */
He = function(t, i) {
  const { pointer: n } = this;
  if (LiteGraph.middle_click_slot_add_default_node && i && this.allow_interaction && !this.read_only && !this.connecting_links && !i.flags.collapsed) {
    let s = !1, o = !1, r = !1;
    const { inputs: l, outputs: a } = i;
    if (a)
      for (const [h, u] of a.entries()) {
        const d = i.getOutputPos(h);
        if (isInRectangle(t.canvasX, t.canvasY, d[0] - 15, d[1] - 10, 30, 20)) {
          s = u, o = h, r = !0;
          break;
        }
      }
    if (l)
      for (const [h, u] of l.entries()) {
        const d = i.getInputPos(h);
        if (isInRectangle(t.canvasX, t.canvasY, d[0] - 15, d[1] - 10, 30, 20)) {
          s = u, o = h, r = !1;
          break;
        }
      }
    if (s && o !== !1) {
      const h = 0.5 - (o + 1) / (r ? a.length : l.length), u = i.getBounding(), d = [
        r ? u[0] + u[2] : u[0],
        t.canvasY - 80
      ];
      n.onClick = () => this.createDefaultNodeForSlot({
        nodeFrom: r ? i : null,
        slotFrom: r ? o : null,
        nodeTo: r ? null : i,
        slotTo: r ? null : o,
        position: d,
        nodeType: "AUTO",
        posAdd: [r ? 30 : -30, -h * 130],
        posSizeFix: [r ? 0 : -1, 0]
      });
    }
  }
  this.allow_dragcanvas && (n.onDragStart = () => this.dragging_canvas = !0, n.finally = () => this.dragging_canvas = !1);
}, xe = function(t) {
  if (!t.buttons) {
    W(this, yt, null);
    return;
  }
  const i = L(this, yt);
  if (!i) throw new TypeError("Drag-zoom state object was null");
  if (!this.graph) throw new NullGraphError();
  const n = t.y - i.pos[1], o = i.scale - n / 100;
  this.ds.changeScale(o, i.pos), this.graph.change();
}, /**
 * Updates the hover / snap state of all visible reroutes.
 * @returns The original value of {@link underPointer}, with any found reroute items added.
 */
Ue = function(t) {
  const { graph: i, pointer: n, linkConnector: s } = this;
  if (!i) throw new NullGraphError();
  if (n.isDown) {
    if (s.isConnecting) {
      for (const o of L(this, it))
        if (o.containsPoint(this.graph_mouse))
          return s.isRerouteValidDrop(o) && (s.overReroute = o, this._highlight_pos = o.pos), t |= CanvasItem.RerouteSlot;
    }
  } else {
    let o = !1;
    for (const r of L(this, it))
      o || (o = r.updateVisibility(this.graph_mouse)), r.isSlotHovered && (t |= CanvasItem.RerouteSlot);
    o && (this.dirty_bgcanvas = !0);
  }
  return this._highlight_pos && (this._highlight_pos = void 0), s.overReroute && (s.overReroute = void 0), t;
}, /**
 * Start dragging an item, optionally including all other selected items.
 *
 * ** This function sets the {@link CanvasPointer.finally}() callback. **
 * @param item The item that the drag event started on
 * @param pointer The pointer event that initiated the drag, e.g. pointerdown
 * @param sticky If `true`, the item is added to the selection - see {@link processSelect}
 */
Lt = function(t, i, n = !1) {
  var s;
  this.emitBeforeChange(), (s = this.graph) == null || s.beforeChange(), i.finally = () => {
    var o;
    this.isDragging = !1, (o = this.graph) == null || o.afterChange(), this.emitAfterChange();
  }, this.processSelect(t, i.eDown, n), this.isDragging = !0;
}, /**
 * Handles shared clean up and placement after items have been dragged.
 * @param e The event that completed the drag, e.g. pointerup, pointermove
 */
kt = function(t) {
  var n;
  const { graph: i } = this;
  (t.shiftKey || LiteGraph.alwaysSnapToGrid) && (i == null || i.snapToGrid(this.selectedItems)), this.dirty_canvas = !0, this.dirty_bgcanvas = !0, (n = this.onNodeMoved) == null || n.call(this, findFirstNode(this.selectedItems));
}, Ve = function() {
  const t = new CustomEvent("litegraph:no-items-selected", { bubbles: !0 });
  this.canvas.dispatchEvent(t);
}, Xe = function(t, i) {
  var u;
  const { graph: n, selectedItems: s } = this;
  if (!n) throw new NullGraphError();
  const o = Math.abs(i[2]), r = Math.abs(i[3]);
  i[2] < 0 && (i[0] -= o), i[3] < 0 && (i[1] -= r), i[2] = o, i[3] = r;
  const l = /* @__PURE__ */ new Set(), a = [];
  for (const d of n._nodes)
    overlapBounding(i, d.boundingRect) && h(d);
  for (const d of n.groups)
    containsRect(i, d._bounding) && (d.recomputeInsideNodes(), h(d));
  for (const d of n.reroutes.values())
    isPointInRect(d.pos, i) && (s.add(d), d.selected = !0, h(d));
  if (t.shiftKey)
    for (const d of a) this.select(d);
  else if (t.altKey)
    for (const d of l) this.deselect(d);
  else {
    for (const d of s.values())
      l.has(d) || this.deselect(d);
    for (const d of a) this.select(d);
  }
  (u = this.onSelectionChange) == null || u.call(this, this.selected_nodes);
  function h(d) {
    !d.selected || !s.has(d) ? a.push(d) : l.add(d);
  }
}, /** @returns If the pointer is over a link centre marker, the link segment it belongs to.  Otherwise, `undefined`.  */
Ye = function(t) {
  for (const i of this.renderedPaths) {
    const n = i._pos;
    if (n && isInRectangle(t.canvasX, t.canvasY, n[0] - 4, n[1] - 4, 8, 8))
      return i;
  }
}, /** Get the target snap / highlight point in graph space */
$e = function() {
  return LiteGraph.snaps_for_comfy ? this.linkConnector.state.snapLinksPos ?? this._highlight_pos ?? this.graph_mouse : this.graph_mouse;
}, /**
 * Renders indicators showing where a link will connect if released.
 * Partial border over target node and a highlight over the slot itself.
 * @param ctx Canvas 2D context
 */
Ke = function(t, i) {
  var b;
  const n = !!this.linkConnector.state.snapLinksPos;
  if (!this._highlight_pos && !n) return;
  t.fillStyle = "#ffcc00", t.beginPath(), ((b = this._highlight_input) == null ? void 0 : b.shape) === RenderShape.ARROW ? (t.moveTo(i[0] + 8, i[1] + 0.5), t.lineTo(i[0] - 4, i[1] + 6 + 0.5), t.lineTo(i[0] - 4, i[1] - 6 + 0.5), t.closePath()) : t.arc(i[0], i[1], 6, 0, Math.PI * 2), t.fill();
  const { linkConnector: o } = this, { overReroute: r, overWidget: l } = o;
  if (!LiteGraph.snap_highlights_node || !o.isConnecting || n) return;
  r == null || r.drawHighlight(t, "#ffcc00aa");
  const a = this.node_over;
  if (!a) return;
  const { strokeStyle: h, lineWidth: u } = t, d = a.boundingRect, p = 3, g = LiteGraph.ROUND_RADIUS + p, y = d[0] - p, _ = d[1] - p, m = d[2] + p * 2, w = d[3] + p * 2;
  t.beginPath(), t.roundRect(y, _, m, w, g);
  const k = o.state.connectingTo === "output" ? 0 : 1, I = k ? -1 : 1, N = i[0], T = i[1], O = m < w ? m : m * Math.max(w / m, 0.5), A = t.createRadialGradient(N, T, 0, N, T, O);
  A.addColorStop(1, "#00000000"), A.addColorStop(0, "#ffcc00aa");
  const G = t.createLinearGradient(y, _, y + m, _);
  if (G.addColorStop(0.5, "#00000000"), G.addColorStop(k + 0.67 * I, "#ddeeff33"), G.addColorStop(k + I, "#ffcc0055"), t.setLineDash([g, g * 1e-3]), t.lineWidth = 1, t.strokeStyle = G, t.stroke(), l) {
    const { computedHeight: R } = l;
    t.beginPath();
    const { pos: [C, F] } = a, B = LiteGraph.NODE_WIDGET_HEIGHT;
    l.type.startsWith("custom") && R != null && R > B * 2 ? t.rect(
      C + 9,
      F + l.y + 9,
      (l.width ?? d[2]) - 18,
      R - 18
    ) : t.roundRect(
      C + BaseWidget.margin,
      F + l.y,
      l.width ?? d[2],
      B,
      B * 0.5
    ), t.stroke();
  }
  t.strokeStyle = A, t.stroke(), t.setLineDash([]), t.lineWidth = u, t.strokeStyle = h;
}, je = function(t, i, n, s) {
  var r, l;
  const { globalAlpha: o } = t;
  t.globalAlpha = o * 0.33;
  for (const a of i.floatingLinks.values()) {
    const h = LLink.getReroutes(i, a), u = h[0], d = h.at(-1);
    if (!(!u || !(d != null && d.floating)))
      if (d.floating.slotType === "input") {
        const p = i.getNodeById(a.target_id);
        if (!p) continue;
        const g = u.pos, y = p.getInputPos(a.target_slot), _ = (r = p.inputs[a.target_slot]) == null ? void 0 : r.dir;
        u._dragging = !0, S(this, D, jt).call(this, t, a, g, y, n, s, LinkDirection.CENTER, _, !0);
      } else {
        const p = i.getNodeById(a.origin_id);
        if (!p) continue;
        const g = p.getOutputPos(a.origin_slot), y = d.pos, _ = (l = p.outputs[a.origin_slot]) == null ? void 0 : l.dir;
        a._dragging = !0, S(this, D, jt).call(this, t, a, g, y, n, s, _, LinkDirection.CENTER, !0);
      }
  }
  t.globalAlpha = o;
}, jt = function(t, i, n, s, o, r, l, a, h = !1) {
  var k, I, N;
  const { graph: u, renderedPaths: d } = this;
  if (!u) return;
  const p = LLink.getReroutes(u, i), g = [
    n,
    ...p.map((T) => T.pos),
    s
  ], y = g.map((T) => T[0]), _ = g.map((T) => T[1]);
  if (L(E, ot)[0] = Math.min(...y), L(E, ot)[1] = Math.min(..._), L(E, ot)[2] = Math.max(...y) - L(E, ot)[0], L(E, ot)[3] = Math.max(..._) - L(E, ot)[1], !overlapBounding(L(E, ot), L(E, ct)))
    return;
  const m = l || LinkDirection.RIGHT, w = a || LinkDirection.LEFT;
  if (p.length) {
    let T;
    const O = p.length;
    for (let G = 0; G < O; G++) {
      const b = p[G];
      if (!d.has(b)) {
        d.add(b), o.push(b), b._colour = i.color || E.link_type_colors[i.type] || this.default_link_color;
        const R = u.getReroute(b.parentId), C = (R == null ? void 0 : R.pos) ?? n;
        b.calculateAngle(this.last_draw_time, u, C), b._dragging || this.renderLink(
          t,
          C,
          b.pos,
          i,
          !1,
          0,
          null,
          T === void 0 ? m : LinkDirection.CENTER,
          LinkDirection.CENTER,
          {
            startControl: T,
            endControl: b.controlPoint,
            reroute: b,
            disabled: h
          }
        );
      }
      if (!T && ((I = (k = p.at(-1)) == null ? void 0 : k.floating) == null ? void 0 : I.slotType) === "input")
        T = [0, 0];
      else {
        const R = ((N = p[G + 1]) == null ? void 0 : N.pos) ?? s, C = Math.min(Reroute.maxSplineOffset, distance(b.pos, R) * 0.25);
        T = [C * b.cos, C * b.sin];
      }
    }
    if (i._dragging) return;
    const A = g.at(-2) ?? n;
    this.renderLink(
      t,
      A,
      s,
      i,
      !1,
      0,
      null,
      LinkDirection.CENTER,
      w,
      { startControl: T, disabled: h }
    );
  } else i._dragging || this.renderLink(
    t,
    n,
    s,
    i,
    !1,
    0,
    null,
    m,
    w
  );
  if (d.add(i), i != null && i._last_time && r - i._last_time < 1e3) {
    const T = 2 - (r - i._last_time) * 2e-3, O = t.globalAlpha;
    t.globalAlpha = O * T, this.renderLink(
      t,
      n,
      s,
      i,
      !0,
      T,
      "white",
      m,
      w
    ), t.globalAlpha = O;
  }
}, /**
 * Modifies an existing point, adding a single-axis offset.
 * @param point The point to add the offset to
 * @param direction The direction to add the offset in
 * @param dist Distance to offset
 * @param factor Distance is mulitplied by this value.  Default: 0.25
 */
Ct = function(t, i, n, s = 0.25) {
  switch (i) {
    case LinkDirection.LEFT:
      t[0] += n * -s;
      break;
    case LinkDirection.RIGHT:
      t[0] += n * s;
      break;
    case LinkDirection.UP:
      t[1] += n * -s;
      break;
    case LinkDirection.DOWN:
      t[1] += n * s;
      break;
  }
}, // Optimised buffers used during rendering
P(E, Jt, new Float32Array(4)), P(E, Qt, new Float32Array(2)), P(E, te, new Float32Array(4)), P(E, ct, new Float32Array(4)), P(E, ot, new Float32Array(4)), P(E, ee, new Float32Array(2)), P(E, ie, new Float32Array(2)), P(E, ne, new Float32Array(2)), c(E, "DEFAULT_BACKGROUND_IMAGE", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNrs1rEKwjAUhlETUkj3vP9rdmr1Ysammk2w5wdxuLgcMHyptfawuZX4pJSWZTnfnu/lnIe/jNNxHHGNn//HNbbv+4dr6V+11uF527arU7+u63qfa/bnmh8sWLBgwYJlqRf8MEptXPBXJXa37BSl3ixYsGDBMliwFLyCV/DeLIMFCxYsWLBMwSt4Be/NggXLYMGCBUvBK3iNruC9WbBgwYJlsGApeAWv4L1ZBgsWLFiwYJmCV/AK3psFC5bBggULloJX8BpdwXuzYMGCBctgwVLwCl7Be7MMFixYsGDBsu8FH1FaSmExVfAxBa/gvVmwYMGCZbBg/W4vAQYA5tRF9QYlv/QAAAAASUVORK5CYII="), c(E, "DEFAULT_EVENT_LINK_COLOR", "#A86"), /** Link type to colour dictionary. */
c(E, "link_type_colors", {
  "-1": E.DEFAULT_EVENT_LINK_COLOR,
  number: "#AAA",
  node: "#DCA"
}), c(E, "gradients", {}), c(E, "search_limit", -1), c(E, "node_colors", {
  red: { color: "#322", bgcolor: "#533", groupcolor: "#A88" },
  brown: { color: "#332922", bgcolor: "#593930", groupcolor: "#b06634" },
  green: { color: "#232", bgcolor: "#353", groupcolor: "#8A8" },
  blue: { color: "#223", bgcolor: "#335", groupcolor: "#88A" },
  pale_blue: {
    color: "#2a363b",
    bgcolor: "#3f5159",
    groupcolor: "#3f789e"
  },
  cyan: { color: "#233", bgcolor: "#355", groupcolor: "#8AA" },
  purple: { color: "#323", bgcolor: "#535", groupcolor: "#a1309b" },
  yellow: { color: "#432", bgcolor: "#653", groupcolor: "#b58b2a" },
  black: { color: "#222", bgcolor: "#000", groupcolor: "#444" }
}), /**
 * @internal Exclusively a workaround for design limitation in {@link LGraphNode.computeSize}.
 */
c(E, "_measureText"), c(E, "active_canvas"), c(E, "active_node");
let LGraphCanvas = E;
class MapProxyHandler {
  getOwnPropertyDescriptor(t, i) {
    const n = this.get(t, i);
    if (n)
      return {
        configurable: !0,
        enumerable: !0,
        value: n
      };
  }
  has(t, i) {
    if (typeof i == "symbol") return !1;
    const n = parseInt(i, 10);
    return t.has(isNaN(n) ? i : n);
  }
  ownKeys(t) {
    return [...t.keys()].map(String);
  }
  get(t, i) {
    if (i in t) return Reflect.get(t, i, t);
    if (typeof i == "symbol") return;
    const n = parseInt(i, 10);
    return t.get(isNaN(n) ? i : n);
  }
  set(t, i, n) {
    if (typeof i == "symbol") return !1;
    const s = parseInt(i, 10);
    return t.set(isNaN(s) ? i : s, n), !0;
  }
  deleteProperty(t, i) {
    return t.delete(i);
  }
  static bindAllMethods(t) {
    t.clear = t.clear.bind(t), t.delete = t.delete.bind(t), t.forEach = t.forEach.bind(t), t.get = t.get.bind(t), t.has = t.has.bind(t), t.set = t.set.bind(t), t.entries = t.entries.bind(t), t.keys = t.keys.bind(t), t.values = t.values.bind(t), t[Symbol.iterator] = t[Symbol.iterator].bind(t);
  }
}
var vt, wt, se;
const Q = class Q {
  /**
   * See {@link LGraph}
   * @param o data from previous serialization [optional]
   */
  constructor(t) {
    c(this, "id", zeroUuid);
    c(this, "revision", 0);
    c(this, "_version", -1);
    /** The backing store for links.  Keys are wrapped in String() */
    c(this, "_links", /* @__PURE__ */ new Map());
    /**
     * Indexed property access is deprecated.
     * Backwards compatibility with a Proxy has been added, but will eventually be removed.
     *
     * Use {@link Map} methods:
     * ```
     * const linkId = 123
     * const link = graph.links.get(linkId)
     * // Deprecated: const link = graph.links[linkId]
     * ```
     */
    c(this, "links");
    c(this, "list_of_graphcanvas");
    c(this, "status", Q.STATUS_STOPPED);
    c(this, "state", {
      lastGroupId: 0,
      lastNodeId: 0,
      lastLinkId: 0,
      lastRerouteId: 0
    });
    c(this, "_nodes", []);
    c(this, "_nodes_by_id", {});
    c(this, "_nodes_in_order", []);
    c(this, "_nodes_executable", null);
    c(this, "_groups", []);
    c(this, "iteration", 0);
    c(this, "globaltime", 0);
    /** @deprecated Unused */
    c(this, "runningtime", 0);
    c(this, "fixedtime", 0);
    c(this, "fixedtime_lapse", 0.01);
    c(this, "elapsed_time", 0.01);
    c(this, "last_update_time", 0);
    c(this, "starttime", 0);
    c(this, "catch_errors", !0);
    c(this, "execution_timer_id");
    c(this, "errors_in_execution");
    /** @deprecated Unused */
    c(this, "execution_time");
    c(this, "_last_trigger_time");
    c(this, "filter");
    /** Must contain serialisable values, e.g. primitive types */
    c(this, "config", {});
    c(this, "vars", {});
    c(this, "nodes_executing", []);
    c(this, "nodes_actioning", []);
    c(this, "nodes_executedAction", []);
    c(this, "extra", {});
    /** @deprecated Deserialising a workflow sets this unused property. */
    c(this, "version");
    /** Internal only.  Not required for serialisation; calculated on deserialise. */
    P(this, vt, 0);
    P(this, wt, /* @__PURE__ */ new Map());
    P(this, se, /* @__PURE__ */ new Map());
    c(this, "_input_nodes");
    LiteGraph.debug && console.log("Graph created");
    const i = this._links;
    MapProxyHandler.bindAllMethods(i);
    const n = new MapProxyHandler();
    this.links = new Proxy(i, n), this.list_of_graphcanvas = null, this.clear(), t && this.configure(t);
  }
  /** @returns Whether the graph has no items */
  get empty() {
    return this._nodes.length + this._groups.length + this.reroutes.size === 0;
  }
  /** @returns All items on the canvas that can be selected */
  *positionableItems() {
    for (const t of this._nodes) yield t;
    for (const t of this._groups) yield t;
    for (const t of this.reroutes.values()) yield t;
  }
  get floatingLinks() {
    return L(this, wt);
  }
  /** All reroutes in this graph. */
  get reroutes() {
    return L(this, se);
  }
  get rootGraph() {
    return this;
  }
  get isRootGraph() {
    return this.rootGraph === this;
  }
  /** @deprecated See {@link state}.{@link LGraphState.lastNodeId lastNodeId} */
  get last_node_id() {
    return this.state.lastNodeId;
  }
  set last_node_id(t) {
    this.state.lastNodeId = t;
  }
  /** @deprecated See {@link state}.{@link LGraphState.lastLinkId lastLinkId} */
  get last_link_id() {
    return this.state.lastLinkId;
  }
  set last_link_id(t) {
    this.state.lastLinkId = t;
  }
  /**
   * Removes all nodes from this graph
   */
  clear() {
    var t;
    if (this.stop(), this.status = Q.STATUS_STOPPED, this.id = zeroUuid, this.revision = 0, this.state = {
      lastGroupId: 0,
      lastNodeId: 0,
      lastLinkId: 0,
      lastRerouteId: 0
    }, this._version = -1, this._nodes)
      for (const i of this._nodes)
        (t = i.onRemoved) == null || t.call(i);
    this._nodes = [], this._nodes_by_id = {}, this._nodes_in_order = [], this._nodes_executable = null, this._links.clear(), this.reroutes.clear(), L(this, wt).clear(), W(this, vt, 0), this._groups = [], this.iteration = 0, this.config = {}, this.vars = {}, this.extra = {}, this.globaltime = 0, this.runningtime = 0, this.fixedtime = 0, this.fixedtime_lapse = 0.01, this.elapsed_time = 0.01, this.last_update_time = 0, this.starttime = 0, this.catch_errors = !0, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.change(), this.canvasAction((i) => i.clear());
  }
  get nodes() {
    return this._nodes;
  }
  get groups() {
    return this._groups;
  }
  /**
   * Attach Canvas to this graph
   */
  attachCanvas(t) {
    var i;
    if (!(t instanceof LGraphCanvas))
      throw new TypeError("attachCanvas expects an LGraphCanvas instance");
    this.list_of_graphcanvas ?? (this.list_of_graphcanvas = []), this.list_of_graphcanvas.includes(t) || this.list_of_graphcanvas.push(t), t.graph !== this && ((i = t.graph) == null || i.detachCanvas(t), t.graph = this);
  }
  /**
   * Detach Canvas from this graph
   */
  detachCanvas(t) {
    t.graph = null;
    const i = this.list_of_graphcanvas;
    if (i) {
      const n = i.indexOf(t);
      n !== -1 && i.splice(n, 1);
    }
  }
  /**
   * @deprecated Will be removed in 0.9
   * Starts running this graph every interval milliseconds.
   * @param interval amount of milliseconds between executions, if 0 then it renders to the monitor refresh rate
   */
  start(t) {
    var i;
    if (this.status != Q.STATUS_RUNNING)
      if (this.status = Q.STATUS_RUNNING, (i = this.onPlayEvent) == null || i.call(this), this.sendEventToAllNodes("onStart"), this.starttime = LiteGraph.getTime(), this.last_update_time = this.starttime, t || (t = 0), t == 0 && typeof window < "u" && window.requestAnimationFrame) {
        const n = () => {
          var s, o;
          this.execution_timer_id == -1 && (window.requestAnimationFrame(n), (s = this.onBeforeStep) == null || s.call(this), this.runStep(1, !this.catch_errors), (o = this.onAfterStep) == null || o.call(this));
        };
        this.execution_timer_id = -1, n();
      } else
        this.execution_timer_id = setInterval(() => {
          var n, s;
          (n = this.onBeforeStep) == null || n.call(this), this.runStep(1, !this.catch_errors), (s = this.onAfterStep) == null || s.call(this);
        }, t);
  }
  /**
   * @deprecated Will be removed in 0.9
   * Stops the execution loop of the graph
   */
  stop() {
    var t;
    this.status != Q.STATUS_STOPPED && (this.status = Q.STATUS_STOPPED, (t = this.onStopEvent) == null || t.call(this), this.execution_timer_id != null && (this.execution_timer_id != -1 && clearInterval(this.execution_timer_id), this.execution_timer_id = null), this.sendEventToAllNodes("onStop"));
  }
  /**
   * Run N steps (cycles) of the graph
   * @param num number of steps to run, default is 1
   * @param do_not_catch_errors [optional] if you want to try/catch errors
   * @param limit max number of nodes to execute (used to execute from start to a node)
   */
  runStep(t, i, n) {
    var a, h, u, d, p, g;
    t = t || 1;
    const s = LiteGraph.getTime();
    this.globaltime = 1e-3 * (s - this.starttime);
    const o = this._nodes_executable || this._nodes;
    if (!o) return;
    if (n = n || o.length, i) {
      for (let y = 0; y < t; y++) {
        for (let _ = 0; _ < n; ++_) {
          const m = o[_];
          m.mode == LGraphEventMode.ALWAYS && m.onExecute && ((a = m.doExecute) == null || a.call(m));
        }
        this.fixedtime += this.fixedtime_lapse, (h = this.onExecuteStep) == null || h.call(this);
      }
      (u = this.onAfterExecute) == null || u.call(this);
    } else
      try {
        for (let y = 0; y < t; y++) {
          for (let _ = 0; _ < n; ++_) {
            const m = o[_];
            m.mode == LGraphEventMode.ALWAYS && ((d = m.onExecute) == null || d.call(m));
          }
          this.fixedtime += this.fixedtime_lapse, (p = this.onExecuteStep) == null || p.call(this);
        }
        (g = this.onAfterExecute) == null || g.call(this), this.errors_in_execution = !1;
      } catch (y) {
        if (this.errors_in_execution = !0, LiteGraph.throw_errors) throw y;
        LiteGraph.debug && console.log("Error during execution:", y), this.stop();
      }
    const r = LiteGraph.getTime();
    let l = r - s;
    l == 0 && (l = 1), this.execution_time = 1e-3 * l, this.globaltime += 1e-3 * l, this.iteration += 1, this.elapsed_time = (r - this.last_update_time) * 1e-3, this.last_update_time = r, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [];
  }
  /**
   * Updates the graph execution order according to relevance of the nodes (nodes with only outputs have more relevance than
   * nodes with only inputs.
   */
  updateExecutionOrder() {
    this._nodes_in_order = this.computeExecutionOrder(!1), this._nodes_executable = [];
    for (const t of this._nodes_in_order)
      t.onExecute && this._nodes_executable.push(t);
  }
  // This is more internal, it computes the executable nodes in order and returns it
  computeExecutionOrder(t, i) {
    const n = [], s = [], o = {}, r = {}, l = {};
    for (const h of this._nodes) {
      if (t && !h.onExecute)
        continue;
      o[h.id] = h;
      let u = 0;
      if (h.inputs)
        for (const d of h.inputs)
          (d == null ? void 0 : d.link) != null && (u += 1);
      u == 0 ? (s.push(h), i && (h._level = 1)) : (i && (h._level = 0), l[h.id] = u);
    }
    for (; ; ) {
      const h = s.shift();
      if (h === void 0) break;
      if (n.push(h), delete o[h.id], !!h.outputs) {
        for (const u of h.outputs)
          if (!((u == null ? void 0 : u.links) == null || u.links.length == 0))
            for (const d of u.links) {
              const p = this._links.get(d);
              if (!p || r[p.id]) continue;
              const g = this.getNodeById(p.target_id);
              if (g == null) {
                r[p.id] = !0;
                continue;
              }
              i && (h._level ?? (h._level = 0), (!g._level || g._level <= h._level) && (g._level = h._level + 1)), r[p.id] = !0, l[g.id] -= 1, l[g.id] == 0 && s.push(g);
            }
      }
    }
    for (const h in o)
      n.push(o[h]);
    n.length != this._nodes.length && LiteGraph.debug && console.warn("something went wrong, nodes missing");
    function a(h) {
      const u = h.length;
      for (let d = 0; d < u; ++d)
        h[d].order = d;
    }
    return a(n), n.sort(function(h, u) {
      const d = h.constructor.priority || h.priority || 0, p = u.constructor.priority || u.priority || 0;
      return d == p ? h.order - u.order : d - p;
    }), a(n), n;
  }
  /**
   * Positions every node in a more readable manner
   */
  arrange(t, i) {
    t = t || 100;
    const n = this.computeExecutionOrder(!1, !0), s = [];
    for (const r of n) {
      const l = r._level || 1;
      s[l] || (s[l] = []), s[l].push(r);
    }
    let o = t;
    for (const r of s) {
      if (!r) continue;
      let l = 100, a = t + LiteGraph.NODE_TITLE_HEIGHT;
      for (const h of r) {
        h.pos[0] = i == LiteGraph.VERTICAL_LAYOUT ? a : o, h.pos[1] = i == LiteGraph.VERTICAL_LAYOUT ? o : a;
        const u = i == LiteGraph.VERTICAL_LAYOUT ? 1 : 0;
        h.size[u] > l && (l = h.size[u]);
        const d = i == LiteGraph.VERTICAL_LAYOUT ? 0 : 1;
        a += h.size[d] + t + LiteGraph.NODE_TITLE_HEIGHT;
      }
      o += l + t;
    }
    this.setDirtyCanvas(!0, !0);
  }
  /**
   * Returns the amount of time the graph has been running in milliseconds
   * @returns number of milliseconds the graph has been running
   */
  getTime() {
    return this.globaltime;
  }
  /**
   * Returns the amount of time accumulated using the fixedtime_lapse var.
   * This is used in context where the time increments should be constant
   * @returns number of milliseconds the graph has been running
   */
  getFixedTime() {
    return this.fixedtime;
  }
  /**
   * Returns the amount of time it took to compute the latest iteration.
   * Take into account that this number could be not correct
   * if the nodes are using graphical actions
   * @returns number of milliseconds it took the last cycle
   */
  getElapsedTime() {
    return this.elapsed_time;
  }
  /**
   * @deprecated Will be removed in 0.9
   * Sends an event to all the nodes, useful to trigger stuff
   * @param eventname the name of the event (function to be called)
   * @param params parameters in array format
   */
  sendEventToAllNodes(t, i, n) {
    n = n || LGraphEventMode.ALWAYS;
    const s = this._nodes_in_order || this._nodes;
    if (s)
      for (const o of s)
        !o[t] || o.mode != n || (i === void 0 ? o[t]() : i && i.constructor === Array ? o[t].apply(o, i) : o[t](i));
  }
  /**
   * Runs an action on every canvas registered to this graph.
   * @param action Action to run for every canvas
   */
  canvasAction(t) {
    const i = this.list_of_graphcanvas;
    if (i)
      for (const n of i) t(n);
  }
  /** @deprecated See {@link LGraph.canvasAction} */
  sendActionToCanvas(t, i) {
    var s;
    const { list_of_graphcanvas: n } = this;
    if (n)
      for (const o of n)
        (s = o[t]) == null || s.apply(o, i);
  }
  /**
   * Adds a new node instance to this graph
   * @param node the instance of the node
   */
  add(t, i) {
    var s, o;
    if (!t) return;
    const { state: n } = this;
    if (LiteGraph.alwaysSnapToGrid) {
      const r = this.getSnapToGridSize();
      r && t.snapToGrid(r);
    }
    if (t instanceof LGraphGroup) {
      (t.id == null || t.id === -1) && (t.id = ++n.lastGroupId), t.id > n.lastGroupId && (n.lastGroupId = t.id), this._groups.push(t), this.setDirtyCanvas(!0), this.change(), t.graph = this, this._version++;
      return;
    }
    if (t.id != -1 && this._nodes_by_id[t.id] != null && (console.warn(
      "LiteGraph: there is already a node with this ID, changing it"
    ), t.id = LiteGraph.use_uuids ? LiteGraph.uuidv4() : ++n.lastNodeId), this._nodes.length >= LiteGraph.MAX_NUMBER_OF_NODES)
      throw "LiteGraph: max number of nodes in a graph reached";
    return LiteGraph.use_uuids ? (t.id == null || t.id == -1) && (t.id = LiteGraph.uuidv4()) : t.id == null || t.id == -1 ? t.id = ++n.lastNodeId : typeof t.id == "number" && n.lastNodeId < t.id && (n.lastNodeId = t.id), t.graph = this, this._version++, this._nodes.push(t), this._nodes_by_id[t.id] = t, (s = t.onAdded) == null || s.call(t, this), this.config.align_to_grid && t.alignToGrid(), i || this.updateExecutionOrder(), (o = this.onNodeAdded) == null || o.call(this, t), this.setDirtyCanvas(!0), this.change(), t;
  }
  /**
   * Removes a node from the graph
   * @param node the instance of the node
   */
  remove(t) {
    var r, l, a;
    if (t instanceof LGraphGroup) {
      const h = this._groups.indexOf(t);
      h != -1 && this._groups.splice(h, 1), t.graph = void 0, this._version++, this.setDirtyCanvas(!0, !0), this.change();
      return;
    }
    if (this._nodes_by_id[t.id] == null || t.ignore_remove) return;
    this.beforeChange();
    const { inputs: i, outputs: n } = t;
    if (i)
      for (const [h, u] of i.entries())
        u.link != null && t.disconnectInput(h, !0);
    if (n)
      for (const [h, u] of n.entries())
        (r = u.links) != null && r.length && t.disconnectOutput(h);
    for (const h of this.floatingLinks.values())
      (h.origin_id === t.id || h.target_id === t.id) && this.removeFloatingLink(h);
    (l = t.onRemoved) == null || l.call(t), t.graph = null, this._version++;
    const { list_of_graphcanvas: s } = this;
    if (s)
      for (const h of s)
        h.selected_nodes[t.id] && delete h.selected_nodes[t.id];
    const o = this._nodes.indexOf(t);
    o != -1 && this._nodes.splice(o, 1), delete this._nodes_by_id[t.id], (a = this.onNodeRemoved) == null || a.call(this, t), this.canvasAction((h) => h.checkPanels()), this.setDirtyCanvas(!0, !0), this.afterChange(), this.change(), this.updateExecutionOrder();
  }
  /**
   * Returns a node by its id.
   */
  getNodeById(t) {
    return t != null ? this._nodes_by_id[t] : null;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param classObject the class itself (not an string)
   * @returns a list with all the nodes of this type
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  findNodesByClass(t, i) {
    i = i || [], i.length = 0;
    const { _nodes: n } = this;
    for (const s of n)
      s.constructor === t && i.push(s);
    return i;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @returns a list with all the nodes of this type
   */
  findNodesByType(t, i) {
    var o;
    const n = t.toLowerCase();
    i = i || [], i.length = 0;
    const { _nodes: s } = this;
    for (const r of s)
      ((o = r.type) == null ? void 0 : o.toLowerCase()) == n && i.push(r);
    return i;
  }
  /**
   * Returns the first node that matches a name in its title
   * @param title the name of the node to search
   * @returns the node or null
   */
  findNodeByTitle(t) {
    const { _nodes: i } = this;
    for (const n of i)
      if (n.title == t)
        return n;
    return null;
  }
  /**
   * Returns a list of nodes that matches a name
   * @param title the name of the node to search
   * @returns a list with all the nodes with this name
   */
  findNodesByTitle(t) {
    const i = [], { _nodes: n } = this;
    for (const s of n)
      s.title == t && i.push(s);
    return i;
  }
  /**
   * Returns the top-most node in this position of the canvas
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @param nodeList a list with all the nodes to search from, by default is all the nodes in the graph
   * @returns the node at this position or null
   */
  getNodeOnPos(t, i, n) {
    const s = n || this._nodes;
    let o = s.length;
    for (; --o >= 0; ) {
      const r = s[o];
      if (r.isPointInside(t, i)) return r;
    }
    return null;
  }
  /**
   * Returns the top-most group in that position
   * @param x The x coordinate in canvas space
   * @param y The y coordinate in canvas space
   * @returns The group or null
   */
  getGroupOnPos(t, i) {
    return this._groups.toReversed().find((n) => n.isPointInside(t, i));
  }
  /**
   * Returns the top-most group with a titlebar in the provided position.
   * @param x The x coordinate in canvas space
   * @param y The y coordinate in canvas space
   * @returns The group or null
   */
  getGroupTitlebarOnPos(t, i) {
    return this._groups.toReversed().find((n) => n.isPointInTitlebar(t, i));
  }
  /**
   * Finds a reroute a the given graph point
   * @param x X co-ordinate in graph space
   * @param y Y co-ordinate in graph space
   * @returns The first reroute under the given co-ordinates, or undefined
   */
  getRerouteOnPos(t, i, n) {
    for (const s of n ?? this.reroutes.values())
      if (s.containsPoint([t, i])) return s;
  }
  /**
   * Snaps the provided items to a grid.
   *
   * Item positions are reounded to the nearest multiple of {@link LiteGraph.CANVAS_GRID_SIZE}.
   *
   * When {@link LiteGraph.alwaysSnapToGrid} is enabled
   * and the grid size is falsy, a default of 1 is used.
   * @param items The items to be snapped to the grid
   * @todo Currently only snaps nodes.
   */
  snapToGrid(t) {
    const i = this.getSnapToGridSize();
    if (i)
      for (const n of getAllNestedItems(t))
        n.pinned || n.snapToGrid(i);
  }
  /**
   * Finds the size of the grid that items should be snapped to when moved.
   * @returns The size of the grid that items should be snapped to
   */
  getSnapToGridSize() {
    return LiteGraph.alwaysSnapToGrid ? LiteGraph.CANVAS_GRID_SIZE || 1 : LiteGraph.CANVAS_GRID_SIZE;
  }
  /**
   * @deprecated Will be removed in 0.9
   * Checks that the node type matches the node type registered,
   * used when replacing a nodetype by a newer version during execution
   * this replaces the ones using the old version with the new version
   */
  checkNodeTypes() {
    const { _nodes: t } = this;
    for (const [i, n] of t.entries()) {
      const s = LiteGraph.registered_node_types[n.type];
      if (n.constructor == s) continue;
      console.log("node being replaced by newer version:", n.type);
      const o = LiteGraph.createNode(n.type);
      o && (t[i] = o, o.configure(n.serialize()), o.graph = this, this._nodes_by_id[o.id] = o, n.inputs && (o.inputs = [...n.inputs]), n.outputs && (o.outputs = [...n.outputs]));
    }
    this.updateExecutionOrder();
  }
  // ********** GLOBALS *****************
  trigger(t, i) {
    var n;
    (n = this.onTrigger) == null || n.call(this, t, i);
  }
  /** @todo Clean up - never implemented. */
  triggerInput(t, i) {
    const n = this.findNodesByTitle(t);
    for (const s of n)
      s.onTrigger(i);
  }
  /** @todo Clean up - never implemented. */
  setCallback(t, i) {
    const n = this.findNodesByTitle(t);
    for (const s of n)
      s.setTrigger(i);
  }
  // used for undo, called before any change is made to the graph
  beforeChange(t) {
    var i;
    (i = this.onBeforeChange) == null || i.call(this, this, t), this.canvasAction((n) => {
      var s;
      return (s = n.onBeforeChange) == null ? void 0 : s.call(n, this);
    });
  }
  // used to resend actions, called after any change is made to the graph
  afterChange(t) {
    var i;
    (i = this.onAfterChange) == null || i.call(this, this, t), this.canvasAction((n) => {
      var s;
      return (s = n.onAfterChange) == null ? void 0 : s.call(n, this);
    });
  }
  connectionChange(t) {
    var i;
    this.updateExecutionOrder(), (i = this.onConnectionChange) == null || i.call(this, t), this._version++, this.canvasAction((n) => {
      var s;
      return (s = n.onConnectionChange) == null ? void 0 : s.call(n);
    });
  }
  /**
   * clears the triggered slot animation in all links (stop visual animation)
   */
  clearTriggeredSlots() {
    for (const t of this._links.values())
      t && t._last_time && (t._last_time = 0);
  }
  /* Called when something visually changed (not the graph!) */
  change() {
    var t;
    LiteGraph.debug && console.log("Graph changed"), this.canvasAction((i) => i.setDirty(!0, !0)), (t = this.on_change) == null || t.call(this, this);
  }
  setDirtyCanvas(t, i) {
    this.canvasAction((n) => n.setDirty(t, i));
  }
  addFloatingLink(t) {
    var s, o, r, l;
    t.id === -1 && (t.id = ++Ie(this, vt)._), L(this, wt).set(t.id, t);
    const i = t.target_id !== -1 ? (o = (s = this.getNodeById(t.target_id)) == null ? void 0 : s.inputs) == null ? void 0 : o[t.target_slot] : (l = (r = this.getNodeById(t.origin_id)) == null ? void 0 : r.outputs) == null ? void 0 : l[t.origin_slot];
    i ? (i._floatingLinks ?? (i._floatingLinks = /* @__PURE__ */ new Set()), i._floatingLinks.add(t)) : console.warn(`Adding invalid floating link: target/slot: [${t.target_id}/${t.target_slot}] origin/slot: [${t.origin_id}/${t.origin_slot}]`);
    const n = LLink.getReroutes(this, t);
    for (const a of n)
      a.floatingLinkIds.add(t.id);
    return t;
  }
  removeFloatingLink(t) {
    var s, o, r, l, a;
    L(this, wt).delete(t.id);
    const i = t.target_id !== -1 ? (o = (s = this.getNodeById(t.target_id)) == null ? void 0 : s.inputs) == null ? void 0 : o[t.target_slot] : (l = (r = this.getNodeById(t.origin_id)) == null ? void 0 : r.outputs) == null ? void 0 : l[t.origin_slot];
    i && ((a = i._floatingLinks) == null || a.delete(t));
    const n = LLink.getReroutes(this, t);
    for (const h of n)
      h.floatingLinkIds.delete(t.id), h.floatingLinkIds.size === 0 && delete h.floating, h.totalLinks === 0 && this.removeReroute(h.id);
  }
  getLink(t) {
    return t == null ? void 0 : this._links.get(t);
  }
  getReroute(t) {
    return t == null ? void 0 : this.reroutes.get(t);
  }
  /**
   * Configures a reroute on the graph where ID is already known (probably deserialisation).
   * Creates the object if it does not exist.
   * @param serialisedReroute See {@link SerialisableReroute}
   */
  setReroute({ id: t, parentId: i, pos: n, linkIds: s, floating: o }) {
    t ?? (t = ++this.state.lastRerouteId), t > this.state.lastRerouteId && (this.state.lastRerouteId = t);
    const r = this.reroutes.get(t) ?? new Reroute(t, this);
    return r.update(i, n, s, o), this.reroutes.set(t, r), r;
  }
  /**
   * Creates a new reroute and adds it to the graph.
   * @param pos Position in graph space
   * @param before The existing link segment (reroute, link) that will be after this reroute,
   * going from the node output to input.
   * @returns The newly created reroute - typically ignored.
   */
  createReroute(t, i) {
    const n = ++this.state.lastRerouteId, s = i instanceof Reroute ? i.linkIds : [i.id], o = i instanceof Reroute ? i.floatingLinkIds : [i.id], r = new Reroute(n, this, t, i.parentId, s, o);
    this.reroutes.set(n, r);
    for (const l of s) {
      const a = this._links.get(l);
      if (!a) continue;
      a.parentId === i.parentId && (a.parentId = n);
      const h = LLink.getReroutes(this, a);
      for (const u of h.filter((d) => d.parentId === i.parentId))
        u.parentId = n;
    }
    for (const l of o) {
      const a = this.floatingLinks.get(l);
      if (!a) continue;
      a.parentId === i.parentId && (a.parentId = n);
      const h = LLink.getReroutes(this, a);
      for (const u of h.filter((d) => d.parentId === i.parentId))
        u.parentId = n;
    }
    return r;
  }
  /**
   * Removes a reroute from the graph
   * @param id ID of reroute to remove
   */
  removeReroute(t) {
    const { reroutes: i } = this, n = i.get(t);
    if (!n) return;
    const { parentId: s, linkIds: o, floatingLinkIds: r } = n;
    for (const l of i.values())
      l.parentId === t && (l.parentId = s);
    for (const l of o) {
      const a = this._links.get(l);
      a && a.parentId === t && (a.parentId = s);
    }
    for (const l of r) {
      const a = this.floatingLinks.get(l);
      if (!a) {
        console.warn(`Removed reroute had floating link ID that did not exist [${l}]`);
        continue;
      }
      const h = LLink.getReroutes(this, a), u = h.at(-1), d = h.at(-2);
      n === u && ((d == null ? void 0 : d.totalLinks) !== 1 ? this.removeFloatingLink(a) : a.parentId === t && (a.parentId = s, d.floating = n.floating));
    }
    i.delete(t), this.setDirtyCanvas(!1, !0);
  }
  /**
   * Destroys a link
   */
  removeLink(t) {
    const i = this._links.get(t);
    if (!i) return;
    const n = this.getNodeById(i.target_id);
    n == null || n.disconnectInput(i.target_slot, !1), i.disconnect(this);
  }
  /**
   * Creates a Object containing all the info about this graph, it can be serialized
   * @deprecated Use {@link asSerialisable}, which returns the newer schema version.
   * @returns value of the node
   */
  serialize(t) {
    const { config: i, state: n, groups: s, nodes: o, reroutes: r, extra: l, floatingLinks: a } = this.asSerialisable(t), h = [...this._links.values()], u = h.map((d) => d.serialize());
    return r != null && r.length && (l.linkExtensions = h.filter((d) => d.parentId !== void 0).map((d) => ({ id: d.id, parentId: d.parentId }))), l.reroutes = r != null && r.length ? r : void 0, {
      id: this.id,
      revision: this.revision,
      last_node_id: n.lastNodeId,
      last_link_id: n.lastLinkId,
      nodes: o,
      links: u,
      floatingLinks: a,
      groups: s,
      config: i,
      extra: l,
      version: LiteGraph.VERSION
    };
  }
  /**
   * Prepares a shallow copy of this object for immediate serialisation or structuredCloning.
   * The return value should be discarded immediately.
   * @param options Serialise options = currently `sortNodes: boolean`, whether to sort nodes by ID.
   * @returns A shallow copy of parts of this graph, with shallow copies of its serialisable objects.
   * Mutating the properties of the return object may result in changes to your graph.
   * It is intended for use with {@link structuredClone} or {@link JSON.stringify}.
   */
  asSerialisable(t) {
    var y;
    const { id: i, revision: n, config: s, state: o, extra: r } = this, a = (!LiteGraph.use_uuids && (t != null && t.sortNodes) ? [...this._nodes].sort((_, m) => _.id - m.id) : this._nodes).map((_) => _.serialize()), h = this._groups.map((_) => _.serialize()), u = this._links.size ? [...this._links.values()].map((_) => _.asSerialisable()) : void 0, d = this.floatingLinks.size ? [...this.floatingLinks.values()].map((_) => _.asSerialisable()) : void 0, p = this.reroutes.size ? [...this.reroutes.values()].map((_) => _.asSerialisable()) : void 0, g = {
      id: i,
      revision: n,
      version: Q.serialisedSchemaVersion,
      config: s,
      state: o,
      groups: h,
      nodes: a,
      links: u,
      floatingLinks: d,
      reroutes: p,
      extra: r
    };
    return (y = this.onSerialize) == null || y.call(this, g), g;
  }
  /**
   * Configure a graph from a JSON string
   * @param data The deserialised object to configure this graph from
   * @param keep_old If `true`, the graph will not be cleared prior to
   * adding the configuration.
   */
  configure(t, i) {
    var l;
    if (!t) return;
    i || this.clear(), t.id ? this.id = t.id : this.id === zeroUuid && (this.id = createUuidv4());
    let n;
    if (t.version === 0.4) {
      const { extra: a } = t;
      if (Array.isArray(t.links))
        for (const h of t.links) {
          const u = LLink.createFromArray(h);
          this._links.set(u.id, u);
        }
      if (Array.isArray(a == null ? void 0 : a.linkExtensions))
        for (const h of a.linkExtensions) {
          const u = this._links.get(h.id);
          u && (u.parentId = h.parentId);
        }
      n = a == null ? void 0 : a.reroutes;
    } else {
      if (t.state) {
        const { state: { lastGroupId: a, lastLinkId: h, lastNodeId: u, lastRerouteId: d } } = t;
        a != null && (this.state.lastGroupId = a), h != null && (this.state.lastLinkId = h), u != null && (this.state.lastNodeId = u), d != null && (this.state.lastRerouteId = d);
      }
      if (Array.isArray(t.links))
        for (const a of t.links) {
          const h = LLink.create(a);
          this._links.set(h.id, h);
        }
      n = t.reroutes;
    }
    if (Array.isArray(n))
      for (const a of n)
        this.setReroute(a);
    const s = t.nodes;
    for (const a in t)
      ["nodes", "groups", "links", "state", "reroutes", "floatingLinks", "id"].includes(a) || (this[a] = t[a]);
    let o = !1;
    if (this._nodes = [], s) {
      for (const a of s) {
        let h = LiteGraph.createNode(String(a.type), a.title);
        h || (LiteGraph.debug && console.log("Node not found or has errors:", a.type), h = new LGraphNode(""), h.last_serialization = a, h.has_errors = !0, o = !0), h.id = a.id, this.add(h, !0);
      }
      for (const a of s) {
        const h = this.getNodeById(a.id);
        h == null || h.configure(a);
      }
    }
    if (Array.isArray(t.floatingLinks))
      for (const a of t.floatingLinks) {
        const h = LLink.create(a);
        this.addFloatingLink(h), h.id > L(this, vt) && W(this, vt, h.id);
      }
    for (const a of this.reroutes.values())
      a.validateLinks(this._links, this.floatingLinks) || this.reroutes.delete(a.id);
    this._groups.length = 0;
    const r = t.groups;
    if (r)
      for (const a of r) {
        const h = new LiteGraph.LGraphGroup();
        h.configure(a), this.add(h);
      }
    return this.updateExecutionOrder(), this.extra = t.extra || {}, delete this.extra.linkExtensions, (l = this.onConfigure) == null || l.call(this, t), this._version++, this.setDirtyCanvas(!0, !0), o;
  }
  load(t, i) {
    const n = this;
    if (t instanceof Blob || t instanceof File) {
      const o = new FileReader();
      o.addEventListener("load", function(r) {
        var h;
        const l = stringOrEmpty((h = r.target) == null ? void 0 : h.result), a = JSON.parse(l);
        n.configure(a), i == null || i();
      }), o.readAsText(t);
      return;
    }
    const s = new XMLHttpRequest();
    s.open("GET", t, !0), s.send(null), s.addEventListener("load", function() {
      if (s.status !== 200) {
        console.error("Error loading graph:", s.status, s.response);
        return;
      }
      const o = JSON.parse(s.response);
      n.configure(o), i == null || i();
    }), s.addEventListener("error", (o) => {
      console.error("Error loading graph:", o);
    });
  }
};
vt = new WeakMap(), wt = new WeakMap(), se = new WeakMap(), c(Q, "serialisedSchemaVersion", 1), c(Q, "STATUS_STOPPED", 1), c(Q, "STATUS_RUNNING", 2);
let LGraph = Q;
class LiteGraphGlobal {
  constructor() {
    // Enums
    c(this, "SlotShape", SlotShape);
    c(this, "SlotDirection", SlotDirection);
    c(this, "SlotType", SlotType);
    c(this, "LabelPosition", LabelPosition);
    /** Used in serialised graphs at one point. */
    c(this, "VERSION", 0.4);
    c(this, "CANVAS_GRID_SIZE", 10);
    c(this, "NODE_TITLE_HEIGHT", 30);
    c(this, "NODE_TITLE_TEXT_Y", 20);
    c(this, "NODE_SLOT_HEIGHT", 20);
    c(this, "NODE_WIDGET_HEIGHT", 20);
    c(this, "NODE_WIDTH", 140);
    c(this, "NODE_MIN_WIDTH", 50);
    c(this, "NODE_COLLAPSED_RADIUS", 10);
    c(this, "NODE_COLLAPSED_WIDTH", 80);
    c(this, "NODE_TITLE_COLOR", "#999");
    c(this, "NODE_SELECTED_TITLE_COLOR", "#FFF");
    c(this, "NODE_TEXT_SIZE", 14);
    c(this, "NODE_TEXT_COLOR", "#AAA");
    c(this, "NODE_TEXT_HIGHLIGHT_COLOR", "#EEE");
    c(this, "NODE_SUBTEXT_SIZE", 12);
    c(this, "NODE_DEFAULT_COLOR", "#333");
    c(this, "NODE_DEFAULT_BGCOLOR", "#353535");
    c(this, "NODE_DEFAULT_BOXCOLOR", "#666");
    c(this, "NODE_DEFAULT_SHAPE", RenderShape.ROUND);
    c(this, "NODE_BOX_OUTLINE_COLOR", "#FFF");
    c(this, "NODE_ERROR_COLOUR", "#E00");
    c(this, "NODE_FONT", "Arial");
    c(this, "DEFAULT_FONT", "Arial");
    c(this, "DEFAULT_SHADOW_COLOR", "rgba(0,0,0,0.5)");
    c(this, "DEFAULT_GROUP_FONT", 24);
    c(this, "DEFAULT_GROUP_FONT_SIZE");
    c(this, "GROUP_FONT", "Arial");
    c(this, "WIDGET_BGCOLOR", "#222");
    c(this, "WIDGET_OUTLINE_COLOR", "#666");
    c(this, "WIDGET_ADVANCED_OUTLINE_COLOR", "rgba(56, 139, 253, 0.8)");
    c(this, "WIDGET_TEXT_COLOR", "#DDD");
    c(this, "WIDGET_SECONDARY_TEXT_COLOR", "#999");
    c(this, "WIDGET_DISABLED_TEXT_COLOR", "#666");
    c(this, "LINK_COLOR", "#9A9");
    c(this, "EVENT_LINK_COLOR", "#A86");
    c(this, "CONNECTING_LINK_COLOR", "#AFA");
    /** avoid infinite loops */
    c(this, "MAX_NUMBER_OF_NODES", 1e4);
    /** default node position */
    c(this, "DEFAULT_POSITION", [100, 100]);
    /** ,"circle" */
    c(this, "VALID_SHAPES", ["default", "box", "round", "card"]);
    c(this, "ROUND_RADIUS", 8);
    // shapes are used for nodes but also for slots
    c(this, "BOX_SHAPE", RenderShape.BOX);
    c(this, "ROUND_SHAPE", RenderShape.ROUND);
    c(this, "CIRCLE_SHAPE", RenderShape.CIRCLE);
    c(this, "CARD_SHAPE", RenderShape.CARD);
    c(this, "ARROW_SHAPE", RenderShape.ARROW);
    /** intended for slot arrays */
    c(this, "GRID_SHAPE", RenderShape.GRID);
    // enums
    c(this, "INPUT", NodeSlotType.INPUT);
    c(this, "OUTPUT", NodeSlotType.OUTPUT);
    // TODO: -1 can lead to ambiguity in JS; these should be updated to a more explicit constant or Symbol.
    /** for outputs */
    c(this, "EVENT", -1);
    /** for inputs */
    c(this, "ACTION", -1);
    /** helper, will add "On Request" and more in the future */
    c(this, "NODE_MODES", ["Always", "On Event", "Never", "On Trigger"]);
    /** use with node_box_coloured_by_mode */
    c(this, "NODE_MODES_COLORS", ["#666", "#422", "#333", "#224", "#626"]);
    c(this, "ALWAYS", LGraphEventMode.ALWAYS);
    c(this, "ON_EVENT", LGraphEventMode.ON_EVENT);
    c(this, "NEVER", LGraphEventMode.NEVER);
    c(this, "ON_TRIGGER", LGraphEventMode.ON_TRIGGER);
    c(this, "UP", LinkDirection.UP);
    c(this, "DOWN", LinkDirection.DOWN);
    c(this, "LEFT", LinkDirection.LEFT);
    c(this, "RIGHT", LinkDirection.RIGHT);
    c(this, "CENTER", LinkDirection.CENTER);
    /** helper */
    c(this, "LINK_RENDER_MODES", ["Straight", "Linear", "Spline"]);
    c(this, "HIDDEN_LINK", LinkRenderType.HIDDEN_LINK);
    c(this, "STRAIGHT_LINK", LinkRenderType.STRAIGHT_LINK);
    c(this, "LINEAR_LINK", LinkRenderType.LINEAR_LINK);
    c(this, "SPLINE_LINK", LinkRenderType.SPLINE_LINK);
    c(this, "NORMAL_TITLE", TitleMode.NORMAL_TITLE);
    c(this, "NO_TITLE", TitleMode.NO_TITLE);
    c(this, "TRANSPARENT_TITLE", TitleMode.TRANSPARENT_TITLE);
    c(this, "AUTOHIDE_TITLE", TitleMode.AUTOHIDE_TITLE);
    /** arrange nodes vertically */
    c(this, "VERTICAL_LAYOUT", "vertical");
    /** used to redirect calls */
    c(this, "proxy", null);
    c(this, "node_images_path", "");
    c(this, "debug", !1);
    c(this, "catch_exceptions", !0);
    c(this, "throw_errors", !0);
    /** if set to true some nodes like Formula would be allowed to evaluate code that comes from unsafe sources (like node configuration), which could lead to exploits */
    c(this, "allow_scripts", !1);
    /** nodetypes by string */
    c(this, "registered_node_types", {});
    /** @deprecated used for dropping files in the canvas.  It appears the code that enables this was removed, but the object remains and is references by built-in drag drop. */
    c(this, "node_types_by_file_extension", {});
    /** node types by classname */
    c(this, "Nodes", {});
    /** used to store vars between graphs */
    c(this, "Globals", {});
    /** @deprecated Unused and will be deleted. */
    c(this, "searchbox_extras", {});
    /** [true!] this make the nodes box (top left circle) coloured when triggered (execute/action), visual feedback */
    c(this, "node_box_coloured_when_on", !1);
    /** [true!] nodebox based on node mode, visual feedback */
    c(this, "node_box_coloured_by_mode", !1);
    /** [false on mobile] better true if not touch device, TODO add an helper/listener to close if false */
    c(this, "dialog_close_on_mouse_leave", !1);
    c(this, "dialog_close_on_mouse_leave_delay", 500);
    /** [false!] prefer false if results too easy to break links - implement with ALT or TODO custom keys */
    c(this, "shift_click_do_break_link_from", !1);
    /** [false!]prefer false, way too easy to break links */
    c(this, "click_do_break_link_to", !1);
    /** [true!] who accidentally ctrl-alt-clicks on an in/output? nobody! that's who! */
    c(this, "ctrl_alt_click_do_break_link", !0);
    /** [true!] snaps links when dragging connections over valid targets */
    c(this, "snaps_for_comfy", !0);
    /** [true!] renders a partial border to highlight when a dragged link is snapped to a node */
    c(this, "snap_highlights_node", !0);
    /**
     * If `true`, items always snap to the grid - modifier keys are ignored.
     * When {@link snapToGrid} is falsy, a value of `1` is used.
     * Default: `false`
     */
    c(this, "alwaysSnapToGrid");
    /**
     * When set to a positive number, when nodes are moved their positions will
     * be rounded to the nearest multiple of this value.  Half up.
     * Default: `undefined`
     * @todo Not implemented - see {@link LiteGraph.CANVAS_GRID_SIZE}
     */
    c(this, "snapToGrid");
    /** [false on mobile] better true if not touch device, TODO add an helper/listener to close if false */
    c(this, "search_hide_on_mouse_leave", !0);
    /**
     * [true!] enable filtering slots type in the search widget
     * !requires auto_load_slot_types or manual set registered_slot_[in/out]_types and slot_types_[in/out]
     */
    c(this, "search_filter_enabled", !1);
    /** [true!] opens the results list when opening the search widget */
    c(this, "search_show_all_on_open", !0);
    /**
     * [if want false, use true, run, get vars values to be statically set, than disable]
     * nodes types and nodeclass association with node types need to be calculated,
     * if dont want this, calculate once and set registered_slot_[in/out]_types and slot_types_[in/out]
     */
    c(this, "auto_load_slot_types", !1);
    // set these values if not using auto_load_slot_types
    /** slot types for nodeclass */
    c(this, "registered_slot_in_types", {});
    /** slot types for nodeclass */
    c(this, "registered_slot_out_types", {});
    /** slot types IN */
    c(this, "slot_types_in", []);
    /** slot types OUT */
    c(this, "slot_types_out", []);
    /**
     * specify for each IN slot type a(/many) default node(s), use single string, array, or object
     * (with node, title, parameters, ..) like for search
     */
    c(this, "slot_types_default_in", {});
    /**
     * specify for each OUT slot type a(/many) default node(s), use single string, array, or object
     * (with node, title, parameters, ..) like for search
     */
    c(this, "slot_types_default_out", {});
    /** [true!] very handy, ALT click to clone and drag the new node */
    c(this, "alt_drag_do_clone_nodes", !1);
    /**
     * [true!] will create and connect event slots when using action/events connections,
     * !WILL CHANGE node mode when using onTrigger (enable mode colors), onExecuted does not need this
     */
    c(this, "do_add_triggers_slots", !1);
    /** [false!] being events, it is strongly reccomended to use them sequentially, one by one */
    c(this, "allow_multi_output_for_events", !0);
    /** [true!] allows to create and connect a ndoe clicking with the third button (wheel) */
    c(this, "middle_click_slot_add_default_node", !1);
    /** [true!] dragging a link to empty space will open a menu, add from list, search or defaults */
    c(this, "release_link_on_empty_shows_menu", !1);
    /** "mouse"|"pointer" use mouse for retrocompatibility issues? (none found @ now) */
    c(this, "pointerevents_method", "pointer");
    /**
     * [true!] allows ctrl + shift + v to paste nodes with the outputs of the unselected nodes connected
     * with the inputs of the newly pasted nodes
     */
    c(this, "ctrl_shift_v_paste_connect_unselected_outputs", !0);
    // if true, all newly created nodes/links will use string UUIDs for their id fields instead of integers.
    // use this if you must have node IDs that are unique across all graphs and subgraphs.
    c(this, "use_uuids", !1);
    // Whether to highlight the bounding box of selected groups
    c(this, "highlight_selected_group", !0);
    /** Whether to scale context with the graph when zooming in.  Zooming out never makes context menus smaller. */
    c(this, "context_menu_scaling", !1);
    /**
     * Debugging flag. Repeats deprecation warnings every time they are reported.
     * May impact performance.
     */
    c(this, "alwaysRepeatWarnings", !1);
    /**
     * Array of callbacks to execute when Litegraph first reports a deprecated API being used.
     * @see alwaysRepeatWarnings By default, will not repeat identical messages.
     */
    c(this, "onDeprecationWarning", [console.warn]);
    /**
     * If `true`, mouse wheel events will be interpreted as trackpad gestures.
     * Tested on MacBook M4 Pro.
     * @default false
     * @see macGesturesRequireMac
     */
    c(this, "macTrackpadGestures", !1);
    /**
     * If both this setting and {@link macTrackpadGestures} are `true`, trackpad gestures will
     * only be enabled when the browser user agent includes "Mac".
     * @default true
     * @see macTrackpadGestures
     */
    c(this, "macGesturesRequireMac", !0);
    /**
     * If `true`, widget labels and values will both be truncated (proportionally to size),
     * until they fit within the widget.
     *
     * Otherwise, the label will be truncated completely before the value is truncated.
     * @default false
     */
    c(this, "truncateWidgetTextEvenly", !1);
    /**
     * If `true`, widget values will be completely truncated when shrinking a widget,
     * before truncating widget labels.  {@link truncateWidgetTextEvenly} must be `false`.
     * @default false
     */
    c(this, "truncateWidgetValuesFirst", !1);
    // TODO: Remove legacy accessors
    c(this, "LGraph", LGraph);
    c(this, "LLink", LLink);
    c(this, "LGraphNode", LGraphNode);
    c(this, "LGraphGroup", LGraphGroup);
    c(this, "DragAndScale", DragAndScale);
    c(this, "LGraphCanvas", LGraphCanvas);
    c(this, "ContextMenu", ContextMenu);
    c(this, "CurveEditor", CurveEditor);
    c(this, "Reroute", Reroute);
    c(this, "InputIndicators", InputIndicators);
    /** @see {@link createUuidv4} @inheritdoc */
    c(this, "uuidv4", createUuidv4);
    c(this, "distance", distance);
    c(this, "isInsideRectangle", isInsideRectangle);
    c(this, "overlapBounding", overlapBounding);
  }
  /**
   * Register a node class so it can be listed when the user wants to create a new one
   * @param type name of the node and path
   * @param base_class class containing the structure of a node
   */
  registerNodeType(t, i) {
    var r, l, a;
    if (!i.prototype)
      throw "Cannot register a simple object, it must be a class with a prototype";
    i.type = t, this.debug && console.log("Node registered:", t);
    const n = i.name, s = t.lastIndexOf("/");
    i.category = t.substring(0, s), i.title || (i.title = n);
    for (const h in LGraphNode.prototype)
      (r = i.prototype)[h] || (r[h] = LGraphNode.prototype[h]);
    const o = this.registered_node_types[t];
    o && this.debug && console.log("replacing node type:", t), this.registered_node_types[t] = i, i.constructor.name && (this.Nodes[n] = i), (l = this.onNodeTypeRegistered) == null || l.call(this, t, i), o && ((a = this.onNodeTypeReplaced) == null || a.call(this, t, i, o)), i.prototype.onPropertyChange && console.warn(`LiteGraph node class ${t} has onPropertyChange method, it must be called onPropertyChanged with d at the end`), this.auto_load_slot_types && new i(i.title || "tmpnode");
  }
  /**
   * removes a node type from the system
   * @param type name of the node or the node constructor itself
   */
  unregisterNodeType(t) {
    const i = typeof t == "string" ? this.registered_node_types[t] : t;
    if (!i) throw `node type not found: ${String(t)}`;
    delete this.registered_node_types[String(i.type)];
    const n = i.constructor.name;
    n && delete this.Nodes[n];
  }
  /**
   * Save a slot type and his node
   * @param type name of the node or the node constructor itself
   * @param slot_type name of the slot type (variable type), eg. string, number, array, boolean, ..
   */
  registerNodeAndSlotType(t, i, n) {
    n || (n = !1);
    const o = (typeof t == "string" && this.registered_node_types[t] !== "anonymous" ? this.registered_node_types[t] : t).constructor.type;
    let r = [];
    typeof i == "string" ? r = i.split(",") : i == this.EVENT || i == this.ACTION ? r = ["_event_"] : r = ["*"];
    for (let l of r) {
      l === "" && (l = "*");
      const a = n ? this.registered_slot_out_types : this.registered_slot_in_types;
      a[l] ?? (a[l] = { nodes: [] });
      const { nodes: h } = a[l];
      h.includes(o) || h.push(o);
      const u = n ? this.slot_types_out : this.slot_types_in, d = l.toLowerCase();
      u.includes(d) || (u.push(d), u.sort());
    }
  }
  /**
   * Removes all previously registered node's types
   */
  clearRegisteredTypes() {
    this.registered_node_types = {}, this.node_types_by_file_extension = {}, this.Nodes = {}, this.searchbox_extras = {};
  }
  /**
   * Create a node of a given type with a name. The node is not attached to any graph yet.
   * @param type full name of the node class. p.e. "math/sin"
   * @param title a name to distinguish from other nodes
   * @param options to set options
   */
  createNode(t, i, n) {
    var r;
    const s = this.registered_node_types[t];
    if (!s)
      return this.debug && console.log(`GraphNode type "${t}" not registered.`), null;
    i = i || s.title || t;
    let o = null;
    if (this.catch_exceptions)
      try {
        o = new s(i);
      } catch (l) {
        return console.error(l), null;
      }
    else
      o = new s(i);
    if (o.type = t, !o.title && i && (o.title = i), o.properties || (o.properties = {}), o.properties_info || (o.properties_info = []), o.flags || (o.flags = {}), o.size || (o.size = o.computeSize()), o.pos || (o.pos = [this.DEFAULT_POSITION[0], this.DEFAULT_POSITION[1]]), o.mode || (o.mode = LGraphEventMode.ALWAYS), n)
      for (const l in n)
        o[l] = n[l];
    return (r = o.onNodeCreated) == null || r.call(o), o;
  }
  /**
   * Returns a registered node type with a given name
   * @param type full name of the node class. p.e. "math/sin"
   * @returns the node class
   */
  getNodeType(t) {
    return this.registered_node_types[t];
  }
  /**
   * Returns a list of node types matching one category
   * @param category category name
   * @returns array with all the node classes
   */
  getNodeTypesInCategory(t, i) {
    const n = [];
    for (const s in this.registered_node_types) {
      const o = this.registered_node_types[s];
      o.filter == i && (t == "" ? o.category == null && n.push(o) : o.category == t && n.push(o));
    }
    return n;
  }
  /**
   * Returns a list with all the node type categories
   * @param filter only nodes with ctor.filter equal can be shown
   * @returns array with all the names of the categories
   */
  getNodeTypesCategories(t) {
    const i = { "": 1 };
    for (const s in this.registered_node_types) {
      const o = this.registered_node_types[s];
      if (o.category && !o.skip_list) {
        if (o.filter != t) continue;
        i[o.category] = 1;
      }
    }
    const n = [];
    for (const s in i)
      n.push(s);
    return n;
  }
  // debug purposes: reloads all the js scripts that matches a wildcard
  reloadNodes(t) {
    const i = document.getElementsByTagName("script"), n = [];
    for (const o of i)
      n.push(o);
    const s = document.getElementsByTagName("head")[0];
    t = document.location.href + t;
    for (const o of n) {
      const r = o.src;
      if (!(!r || r.substr(0, t.length) != t))
        try {
          this.debug && console.log("Reloading:", r);
          const l = document.createElement("script");
          l.type = "text/javascript", l.src = r, s.append(l), o.remove();
        } catch (l) {
          if (this.throw_errors) throw l;
          this.debug && console.log("Error while reloading", r);
        }
    }
    this.debug && console.log("Nodes reloaded");
  }
  // separated just to improve if it doesn't work
  /** @deprecated Prefer {@link structuredClone} */
  cloneObject(t, i) {
    if (t == null) return null;
    const n = JSON.parse(JSON.stringify(t));
    if (!i) return n;
    for (const s in n)
      i[s] = n[s];
    return i;
  }
  /**
   * Returns if the types of two slots are compatible (taking into account wildcards, etc)
   * @param type_a output
   * @param type_b input
   * @returns true if they can be connected
   */
  isValidConnection(t, i) {
    if ((t == "" || t === "*") && (t = 0), (i == "" || i === "*") && (i = 0), !t || !i || t == i || t == this.EVENT && i == this.ACTION)
      return !0;
    if (t = String(t), i = String(i), t = t.toLowerCase(), i = i.toLowerCase(), !t.includes(",") && !i.includes(","))
      return t == i;
    const n = t.split(","), s = i.split(",");
    for (const o of n)
      for (const r of s)
        if (this.isValidConnection(o, r))
          return !0;
    return !1;
  }
  // used to create nodes from wrapping functions
  getParameterNames(t) {
    return String(t).replaceAll(/\/\/.*$/gm, "").replaceAll(/\s+/g, "").replaceAll(/\/\*[^*/]*\*\//g, "").split("){", 1)[0].replace(/^[^(]*\(/, "").replaceAll(/=[^,]+/g, "").split(",").filter(Boolean);
  }
  /* helper for interaction: pointer, touch, mouse Listeners
    used by LGraphCanvas DragAndScale ContextMenu */
  pointerListenerAdd(t, i, n, s = !1) {
    if (!t || !t.addEventListener || !i || typeof n != "function") return;
    let o = this.pointerevents_method, r = i;
    if (o == "pointer" && !window.PointerEvent)
      switch (console.warn("sMethod=='pointer' && !window.PointerEvent"), console.log(`Converting pointer[${r}] : down move up cancel enter TO touchstart touchmove touchend, etc ..`), r) {
        case "down": {
          o = "touch", r = "start";
          break;
        }
        case "move": {
          o = "touch";
          break;
        }
        case "up": {
          o = "touch", r = "end";
          break;
        }
        case "cancel": {
          o = "touch";
          break;
        }
        case "enter": {
          console.log("debug: Should I send a move event?");
          break;
        }
        // case "over": case "out": not used at now
        default:
          console.warn(`PointerEvent not available in this browser ? The event ${r} would not be called`);
      }
    switch (r) {
      // @ts-expect-error
      // both pointer and move events
      case "down":
      case "up":
      case "move":
      case "over":
      case "out":
      case "enter":
        t.addEventListener(o + r, n, s);
      // @ts-expect-error
      // only pointerevents
      case "leave":
      case "cancel":
      case "gotpointercapture":
      case "lostpointercapture":
        if (o != "mouse")
          return t.addEventListener(o + r, n, s);
      // not "pointer" || "mouse"
      default:
        return t.addEventListener(r, n, s);
    }
  }
  pointerListenerRemove(t, i, n, s = !1) {
    if (!(!t || !t.removeEventListener || !i || typeof n != "function"))
      switch (i) {
        // @ts-expect-error
        // both pointer and move events
        case "down":
        case "up":
        case "move":
        case "over":
        case "out":
        case "enter":
          (this.pointerevents_method == "pointer" || this.pointerevents_method == "mouse") && t.removeEventListener(this.pointerevents_method + i, n, s);
        // @ts-expect-error
        // only pointerevents
        case "leave":
        case "cancel":
        case "gotpointercapture":
        case "lostpointercapture":
          if (this.pointerevents_method == "pointer")
            return t.removeEventListener(this.pointerevents_method + i, n, s);
        // not "pointer" || "mouse"
        default:
          return t.removeEventListener(i, n, s);
      }
  }
  getTime() {
    return performance.now();
  }
  colorToString(t) {
    return `rgba(${Math.round(t[0] * 255).toFixed()},${Math.round(t[1] * 255).toFixed()},${Math.round(t[2] * 255).toFixed()},${t.length == 4 ? t[3].toFixed(2) : "1.0"})`;
  }
  // [minx,miny,maxx,maxy]
  growBounding(t, i, n) {
    i < t[0] ? t[0] = i : i > t[2] && (t[2] = i), n < t[1] ? t[1] = n : n > t[3] && (t[3] = n);
  }
  // point inside bounding box
  isInsideBounding(t, i) {
    return !(t[0] < i[0][0] || t[1] < i[0][1] || t[0] > i[1][0] || t[1] > i[1][1]);
  }
  // Convert a hex value to its decimal value - the inputted hex must be in the
  // format of a hex triplet - the kind we use for HTML colours. The function
  // will return an array with three values.
  hex2num(t) {
    t.charAt(0) == "#" && (t = t.slice(1)), t = t.toUpperCase();
    const i = "0123456789ABCDEF", n = new Array(3);
    let s = 0, o, r;
    for (let l = 0; l < 6; l += 2)
      o = i.indexOf(t.charAt(l)), r = i.indexOf(t.charAt(l + 1)), n[s] = o * 16 + r, s++;
    return n;
  }
  // Give a array with three values as the argument and the function will return
  // the corresponding hex triplet.
  num2hex(t) {
    const i = "0123456789ABCDEF";
    let n = "#", s, o;
    for (let r = 0; r < 3; r++)
      s = t[r] / 16, o = t[r] % 16, n += i.charAt(s) + i.charAt(o);
    return n;
  }
  closeAllContextMenus(t = window) {
    const i = [...t.document.querySelectorAll(".litecontextmenu")];
    if (i.length)
      for (const n of i)
        "close" in n && typeof n.close == "function" ? n.close() : n.remove();
  }
  extendClass(t, i) {
    for (const n in i)
      t.hasOwnProperty(n) || (t[n] = i[n]);
    if (i.prototype)
      for (const n in i.prototype)
        i.prototype.hasOwnProperty(n) && (t.prototype.hasOwnProperty(n) || (i.prototype.__lookupGetter__(n) ? t.prototype.__defineGetter__(
          n,
          i.prototype.__lookupGetter__(n)
        ) : t.prototype[n] = i.prototype[n], i.prototype.__lookupSetter__(n) && t.prototype.__defineSetter__(
          n,
          i.prototype.__lookupSetter__(n)
        )));
  }
}
Symbol.dispose ?? (Symbol.dispose = Symbol("Symbol.dispose"));
Symbol.asyncDispose ?? (Symbol.asyncDispose = Symbol("Symbol.asyncDispose"));
function loadPolyfills() {
  typeof window < "u" && window.CanvasRenderingContext2D && !window.CanvasRenderingContext2D.prototype.roundRect && (window.CanvasRenderingContext2D.prototype.roundRect = function(f, t, i, n, s, o) {
    let r = 0, l = 0, a = 0, h = 0;
    if (s === 0) {
      this.rect(f, t, i, n);
      return;
    }
    if (o === void 0 && (o = s), Array.isArray(s))
      if (s.length == 1)
        r = l = a = h = s[0];
      else if (s.length == 2)
        r = h = s[0], l = a = s[1];
      else if (s.length == 4)
        r = s[0], l = s[1], a = s[2], h = s[3];
      else
        return;
    else {
      r = s || 0, l = s || 0;
      const u = !Array.isArray(o) && o ? o : 0;
      a = u, h = u;
    }
    this.moveTo(f + r, t), this.lineTo(f + i - l, t), this.quadraticCurveTo(f + i, t, f + i, t + l), this.lineTo(f + i, t + n - h), this.quadraticCurveTo(
      f + i,
      t + n,
      f + i - h,
      t + n
    ), this.lineTo(f + h, t + n), this.quadraticCurveTo(f, t + n, f, t + n - a), this.lineTo(f, t + a), this.quadraticCurveTo(f, t, f + r, t);
  }), typeof window < "u" && !window.requestAnimationFrame && (window.requestAnimationFrame = // @ts-expect-error Legacy code
  window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(f) {
    window.setTimeout(f, 1e3 / 60);
  });
}
const LiteGraph = new LiteGraphGlobal();
function clamp(f, t, i) {
  return t > f ? t : i < f ? i : f;
}
loadPolyfills();
async function init(f, t) {
  document.getElementById(f), addLink("./_content/BootstrapBlazor.NodeGraph/css/graph.css"), nodeGraphServiceRef = t;
}
let nodeGraphServiceRef = null;
function createLGraph(f) {
  let t = new LGraph(f);
  return graphInstance = t, t;
}
let graphInstance;
function getNodeById(f) {
  let t = graphInstance.getNodeById(f);
  return t || null;
}
function createLGraphCanvas(f, t) {
  let i = new LGraphCanvas(f, t), n = f.parentNode, s = () => {
    const r = window.devicePixelRatio;
    if (r != 1) {
      const l = n.getBoundingClientRect(), { width: a, height: h } = l;
      f.width = a * r, f.height = h * r, f.style.width = a + "px", f.style.height = h + "px", f.getContext("2d").scale(r, r);
    }
  };
  return new ResizeObserver(s).observe(n), s(), i;
}
function constructGraphNode(f) {
  var i;
  let t = (i = class extends LGraphNode {
    constructor() {
      super(f), this.addInput("A", "number"), this.addInput("B", "number"), this.addOutput("A+B", "number");
    }
    onExecute() {
      let n = this.getInputData(0), s = this.getInputData(1), o = n && 0, r = s && 0;
      this.setOutputData(0, o + r);
    }
  }, c(i, "title", f), i);
  LiteGraph.registerNodeType("basic/testNode", t);
}
function registerNodeType(f) {
  var i;
  let t = (i = class extends LGraphNode {
    constructor() {
      super(f.displayName), f.inputs.forEach((n) => this.addInput(n.name, n.type)), f.outputs.forEach((n) => this.addOutput(n.name, n.type)), f.widgets.forEach((n) => {
        let s = null;
        n.hasCallback && (s = async (o) => {
          await (nodeGraphServiceRef == null ? void 0 : nodeGraphServiceRef.invokeMethodAsync("OnNodeWidgetCallback", f.typePath, n.widgetId, o, this.id));
        }), this.addWidget(n.widgetType, n.displayName, n.value, s, n.widgetOptions);
      });
    }
    async onExecute() {
      f.hasAction && await (nodeGraphServiceRef == null ? void 0 : nodeGraphServiceRef.invokeMethodAsync("OnNodeActionExecuted", f.typePath, this.id));
    }
  }, c(i, "title", f.displayName), i);
  LiteGraph.registerNodeType(f.typePath, t);
}
export {
  constructGraphNode,
  createLGraph,
  createLGraphCanvas,
  getNodeById,
  init,
  registerNodeType
};
