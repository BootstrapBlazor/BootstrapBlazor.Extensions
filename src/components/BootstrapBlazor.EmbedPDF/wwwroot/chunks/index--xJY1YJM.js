import { aV as _ } from "./wasm-url-asset-DQFmMC86.js";
function Te(u) {
  const a = u, p = Date;
  let r = null;
  const g = (t) => Array.isArray(t) ? t.map((e) => String(e)) : t, v = (t, e) => Array.isArray(t) && Array.isArray(e) ? t.length === e.length && t.every((n, o) => n === e[o]) : t === e, h = (t) => {
    const e = t;
    return e?.kind === "objectNumber" ? `obj:${String(e.objectNumber)}` : `fqn:${String(e?.name ?? "")}`;
  }, b = (t, e) => {
    r?.diagnostics.push({ code: t, message: e });
  }, T = (t) => {
    b("blocked-network", `${t} is blocked by the scripting policy`);
  }, M = (t) => {
    if (typeof t == "number") return Number.isFinite(t) ? t : 0;
    const e = Number(String(t ?? "").replace(/[^0-9+\-.]/g, ""));
    return Number.isFinite(e) ? e : 0;
  }, x = (t) => t === "hidden" ? 1 : t === "noPrint" ? 2 : t === "noView" ? 3 : 0, Q = (t) => Number(t) === 1 ? "hidden" : Number(t) === 2 ? "noPrint" : Number(t) === 3 ? "noView" : "visible", V = (t) => t === "widget-activate" ? "Mouse Up" : t === "field-keystroke" ? "Keystroke" : t === "field-validate" ? "Validate" : t === "field-calculate" ? "Calculate" : t === "field-format" ? "Format" : "Open", y = {}, Se = (t) => {
    const e = t.input, n = {};
    return Object.defineProperties(n, {
      name: { enumerable: !0, get: () => e.name },
      type: { enumerable: !0, get: () => e.kind },
      value: {
        enumerable: !0,
        get: () => g(t.value),
        set: (o) => {
          t.value = g(o);
        }
      },
      valueAsString: {
        enumerable: !0,
        get: () => Array.isArray(t.value) ? t.value.join(",") : String(t.value ?? "")
      },
      defaultValue: { enumerable: !0, get: () => g(e.defaultValue) },
      readonly: {
        enumerable: !0,
        get: () => !!e.readOnly,
        set: () => {
          b("unsupported-api", "Field.readonly writes are not supported in v1");
        }
      },
      required: {
        enumerable: !0,
        get: () => !!e.required,
        set: () => {
          b("unsupported-api", "Field.required writes are not supported in v1");
        }
      },
      display: {
        enumerable: !0,
        get: () => x(t.display),
        set: (o) => {
          t.display = Q(o);
        }
      },
      source: { enumerable: !1, get: () => y }
    }), n.setFocus = () => {
      r?.uiEffects.push({ type: "focusField", field: String(e.name) });
    }, n;
  }, L = (t) => r?.fieldsByName.get(String(t))?.wrapper ?? null, ve = {
    square: ["strokeColor", "fillColor", "opacity", "width", "borderStyle", "dash", "rect"],
    circle: ["strokeColor", "fillColor", "opacity", "width", "borderStyle", "dash", "rect"],
    polygon: ["strokeColor", "fillColor", "opacity", "width", "borderStyle", "dash", "rect"],
    polyline: ["strokeColor", "fillColor", "opacity", "width", "borderStyle", "dash", "rect"],
    line: ["strokeColor", "fillColor", "opacity", "width", "borderStyle", "dash", "rect"],
    ink: ["strokeColor", "opacity", "width", "rect"],
    "free-text": ["strokeColor", "fillColor", "opacity", "rect"],
    highlight: ["strokeColor", "opacity"],
    underline: ["strokeColor", "opacity"],
    squiggly: ["strokeColor", "opacity"],
    strikeout: ["strokeColor", "opacity"],
    caret: ["strokeColor", "opacity"],
    text: ["strokeColor", "opacity", "rect"],
    stamp: ["rect"],
    "file-attachment": ["strokeColor", "opacity"]
  }, U = ["hidden", "print", "readOnly", "locked", "noView", "toggleNoView"], Ne = {
    square: "Square",
    circle: "Circle",
    line: "Line",
    polygon: "Polygon",
    polyline: "PolyLine",
    ink: "Ink",
    "free-text": "FreeText",
    highlight: "Highlight",
    underline: "Underline",
    squiggly: "Squiggly",
    strikeout: "StrikeOut",
    text: "Text",
    stamp: "Stamp",
    caret: "Caret",
    "file-attachment": "FileAttachment"
  }, B = (t) => {
    if (!Array.isArray(t) || t.length === 0) return !1;
    const n = { T: 0, G: 1, RGB: 3, CMYK: 4 }[String(t[0])];
    return n !== void 0 && t.length === n + 1 && t.slice(1).every((o) => typeof o == "number" && isFinite(Number(o)));
  }, P = (t) => {
    const e = t, n = String(e[0]);
    if (n === "T") return null;
    if (n === "G") return [Number(e[1]), Number(e[1]), Number(e[1])];
    if (n === "RGB") return [Number(e[1]), Number(e[2]), Number(e[3])];
    const o = Number(e[1]), i = Number(e[2]), d = Number(e[3]), s = Number(e[4]);
    return [
      1 - Math.min(1, o + s),
      1 - Math.min(1, i + s),
      1 - Math.min(1, d + s)
    ];
  }, Me = (t, e) => Array.isArray(t) && Array.isArray(e) ? t.length === e.length && t.every((n, o) => n === e[o]) : t === e, C = (t) => Array.isArray(t) ? [...t] : t, we = (t) => {
    const e = t.input, n = String(e.subtype), o = ve[n] ?? [], i = {}, d = (c, S, k) => {
      if (c !== "contents" && U.indexOf(c) < 0 && o.indexOf(c) < 0) {
        b(
          "unsupported-api",
          `Annot.${c} is not writable on subtype '${n}' (write ignored)`
        );
        return;
      }
      if (e.opaqueBody && U.indexOf(c) < 0 && c !== "contents") {
        b(
          "unsupported-api",
          `Annot.${c}: '${n}' has an opaque appearance (write ignored)`
        );
        return;
      }
      if (!k(S)) {
        b("invalid-field-value", `Annot.${c}: invalid value (write ignored)`);
        return;
      }
      t.current[c] = C(S);
    }, s = (c, S) => ({
      enumerable: !0,
      get: () => C(t.current[c]),
      set: (k) => d(c, k, S)
    }), l = (c) => typeof c == "number" && isFinite(c), f = (c) => typeof c == "boolean";
    return Object.defineProperties(i, {
      name: { enumerable: !0, get: () => String(e.name ?? "") },
      type: { enumerable: !0, get: () => Ne[n] ?? n },
      page: { enumerable: !0, get: () => Number(e.page ?? 0) },
      author: { enumerable: !0, get: () => String(e.author ?? "") },
      subject: { enumerable: !0, get: () => String(e.subject ?? "") },
      strokeColor: s("strokeColor", B),
      fillColor: s("fillColor", B),
      opacity: s("opacity", (c) => l(c) && Number(c) >= 0 && Number(c) <= 1),
      width: s("width", (c) => l(c) && Number(c) >= 0),
      style: s("borderStyle", (c) => c === "S" || c === "D"),
      dash: s("dash", (c) => Array.isArray(c) && c.every(l)),
      rect: s(
        "rect",
        (c) => Array.isArray(c) && c.length === 4 && c.every(l)
      ),
      contents: s("contents", (c) => typeof c == "string"),
      hidden: s("hidden", f),
      print: s("print", f),
      readOnly: s("readOnly", f),
      lock: s("locked", f),
      noView: s("noView", f),
      toggleNoView: s("toggleNoView", f),
      doc: { enumerable: !1, get: () => y }
    }), i.getProps = () => {
      const c = {};
      for (const S of Object.keys(t.current))
        c[S] = C(t.current[S]);
      return c;
    }, i.setProps = (c) => {
      const S = c ?? {};
      for (const k of Object.keys(S))
        i[k] = S[k];
    }, i;
  }, H = (t) => {
    if (!r) return null;
    const e = t?.nPage;
    if (e == null)
      return r.annotsCoverDocument || b(
        "unsupported-api",
        "getAnnots: whole-document search is limited to the prefetched pages (compatibility deviation)"
      ), r.annots.length ? r.annots.map((i) => i.wrapper) : null;
    const n = Math.trunc(Number(e));
    if (!r.annotPages.has(n))
      return b(
        "unsupported-api",
        `getAnnots: page ${n} is outside the prefetched annots plane (compatibility deviation)`
      ), null;
    const o = r.annotsByPage.get(n) ?? [];
    return o.length ? o.map((i) => i.wrapper) : null;
  }, X = (t, e) => {
    const n = H({ nPage: t });
    if (!n) return null;
    for (const o of n)
      if (String(o.name) === String(e)) return o;
    return null;
  };
  y.getAnnots = H, y.getAnnot = X, Object.defineProperties(y, {
    documentFileName: {
      enumerable: !0,
      get: () => String(r?.input.document?.fileName ?? "")
    },
    numFields: { enumerable: !0, get: () => r?.fields.length ?? 0 },
    pageNum: {
      enumerable: !0,
      get: () => Number(r?.input.document?.pageNumber ?? 0),
      set: (t) => {
        const e = Math.trunc(Number(t));
        Number.isFinite(e) && r?.uiEffects.push({ type: "goToPage", pageIndex: e });
      }
    }
  }), y.getField = L, y.getNthFieldName = (t) => String(r?.fields[Math.trunc(Number(t))]?.input.name ?? ""), y.resetForm = (t) => {
    if (!r) return;
    const e = t === void 0 ? r.fields : (Array.isArray(t) ? t : [t]).map((n) => r.fieldsByName.get(String(n))).filter((n) => n !== void 0);
    for (const n of e) {
      n.value = g(n.input.defaultValue);
      const o = h(n.input.ref);
      r.resetKeys.has(o) || (r.resetKeys.add(o), r.resetRefs.push(n.input.ref));
    }
  }, y.print = () => r?.uiEffects.push({ type: "print" }), y.submitForm = (t, e, n, o) => {
    if (!r) return;
    const i = t !== null && typeof t == "object" ? t : { cURL: t, bFDF: e, bEmpty: n, aFields: o }, d = Array.isArray(i.aFields) ? i.aFields.map((f) => String(f)) : null, s = i.cSubmitAs === void 0 ? void 0 : String(i.cSubmitAs).toUpperCase(), l = s === "FDF" ? "fdf" : s === "XFDF" ? "xfdf" : s === "HTML" ? "html" : s === "PDF" ? "pdf" : i.bFDF === !1 ? "html" : void 0;
    r.uiEffects.push({
      type: "submitForm",
      url: i.cURL === void 0 || i.cURL === null ? null : String(i.cURL),
      fieldNames: d,
      includeEmpty: !!i.bEmpty,
      ...l === void 0 ? {} : { format: l },
      ...i.bGet === void 0 ? {} : { method: i.bGet ? "get" : "post" }
    });
  }, y.mailDoc = () => T("mailDoc"), y.getURL = () => T("getURL");
  const ke = {
    // Viewer identity — the properties Adobe's ubiquitous version-check
    // boilerplate (`!ADBE::…VersChk…` name-tree scripts) branches on. Honest
    // values for an emulated modern-Reader-level environment, so those
    // scripts take their "viewer is current" paths instead of tripping over
    // `undefined`. Deliberately no `xfa_installed`: we never claim XFA.
    platform: "WIN",
    language: "ENU",
    viewerType: "Reader",
    viewerVariation: "Reader",
    viewerVersion: 21,
    formsVersion: 21,
    alert: (t, e, n, o) => (r?.uiEffects.push({
      type: "alert",
      message: String(t),
      icon: Number.isFinite(Number(e)) ? Number(e) : 0,
      ...o === void 0 ? {} : { title: String(o) }
    }), 1),
    beep: () => b("unsupported-api", "app.beep is not supported in v1"),
    response: () => (b("unsupported-api", "app.response is not supported in v1"), null),
    launchURL: () => T("app.launchURL"),
    // Acrobat's contract when a viewer component (e.g. the XFA plugin) is not
    // available is `undefined` — never a throw. A web viewer has no
    // installable components, so "not available" is always the truthful
    // answer; Adobe's XFA-check boilerplate calls this after its upgrade nag.
    findComponent: () => {
      b("unsupported-api", "app.findComponent: no installable components in this viewer");
    }
  }, E = (t, e = 2) => String(t).padStart(e, "0"), Z = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ], Ae = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ], G = (t, e) => {
    const n = r?.input.environment ?? {}, o = e && typeof e.getTime == "function" ? new p(Number(e.getTime())) : new p(Number(n.nowMs ?? 0)), i = new p(
      o.getTime() + Number(n.utcOffsetMinutes ?? 0) * 6e4
    ), d = i.getUTCFullYear(), s = i.getUTCMonth(), l = i.getUTCDate(), f = i.getUTCHours(), c = i.getUTCMinutes(), S = i.getUTCSeconds(), k = f % 12 === 0 ? 12 : f % 12, w = {
      yyyy: String(d),
      yy: E(d % 100),
      mmmm: Ae[s],
      mmm: Z[s],
      mm: E(s + 1),
      m: String(s + 1),
      dd: E(l),
      d: String(l),
      HH: E(f),
      hh: E(k),
      h: String(k),
      H: String(f),
      MM: E(c),
      M: String(c),
      ss: E(S),
      tt: f < 12 ? "am" : "pm"
    };
    return String(t).replace(
      /yyyy|mmmm|mmm|yy|mm|dd|HH|hh|MM|ss|tt|m|d|H|h|M/g,
      (m) => w[m]
    );
  }, Fe = {
    printd: G,
    printf: (t, ...e) => {
      let n = 0;
      return String(t).replace(/%(?:,?\d*(?:\.\d+)?)?[dfs]/g, (o) => {
        const i = e[n++];
        if (o.endsWith("s")) return String(i ?? "");
        if (o.endsWith("d")) return String(Math.trunc(M(i)));
        const d = /\.(\d+)/.exec(o)?.[1];
        return M(i).toFixed(d ? Number(d) : 0);
      });
    }
  }, ee = (t, e) => {
    const n = (t.fields ?? []).map((m) => {
      const N = {
        input: m,
        originalValue: g(m.value),
        value: g(m.value),
        originalDisplay: String(m.display ?? "visible"),
        display: String(m.display ?? "visible"),
        wrapper: {}
      };
      return N.wrapper = Se(N), N;
    }), o = new Map(n.map((m) => [String(m.input.name), m])), i = new Map(n.map((m) => [h(m.input.ref), m])), d = (t.annots ?? []).map(
      (m) => {
        const N = () => ({
          strokeColor: C(m.strokeColor ?? ["T"]),
          fillColor: C(m.fillColor ?? ["T"]),
          opacity: Number(m.opacity ?? 1),
          width: Number(m.width ?? 1),
          borderStyle: String(m.borderStyle ?? "S"),
          dash: C(m.dash ?? []),
          rect: C(m.rect ?? [0, 0, 0, 0]),
          contents: String(m.contents ?? ""),
          hidden: !!m.hidden,
          print: !!m.print,
          readOnly: !!m.readOnly,
          locked: !!m.locked,
          noView: !!m.noView,
          toggleNoView: !!m.toggleNoView
        }), F = {
          input: m,
          original: N(),
          current: N(),
          wrapper: {}
        };
        return F.wrapper = we(F), F;
      }
    ), s = /* @__PURE__ */ new Map();
    for (const m of d) {
      const N = Number(m.input.page ?? 0), F = s.get(N);
      F ? F.push(m) : s.set(N, [m]);
    }
    const l = t.event ?? {}, f = i.get(h(l.target)), c = i.get(h(l.source)), S = l.value !== void 0 ? g(l.value) : g(f?.value ?? null), k = l.type !== void 0 ? String(l.type) : l.kind === "name-tree-boot" ? "Doc" : "Field", w = {
      // Explicit type/name (action-driven runs, from trigger provenance)
      // beat the kind-derived defaults (the K/V/C/F pipeline path).
      name: l.name !== void 0 ? String(l.name) : V(String(l.kind ?? "")),
      type: k,
      // Doc-typed events target the Doc object (Acrobat's WillSave
      // boilerplate does `event.target.getField(...)`); field targets win
      // when present (a widget-anchored run).
      target: f?.wrapper ?? (k === "Doc" ? y : null),
      targetName: String(f?.input.name ?? ""),
      source: c?.wrapper ?? { source: y },
      value: S,
      change: String(l.change ?? ""),
      selStart: Math.max(0, Math.trunc(Number(l.selStart ?? 0))),
      selEnd: Math.max(0, Math.trunc(Number(l.selEnd ?? 0))),
      willCommit: !!l.willCommit,
      modifier: !!l.modifier,
      shift: !!l.shift,
      rc: !0
    };
    r = {
      input: t,
      fields: n,
      fieldsByName: o,
      fieldsByRef: i,
      annots: d,
      annotsByPage: s,
      annotPages: new Set(
        (t.annotPages ?? []).map((m) => Math.trunc(Number(m)))
      ),
      annotsCoverDocument: !!t.annotsCoverDocument,
      event: w,
      resetRefs: [],
      resetKeys: /* @__PURE__ */ new Set(),
      uiEffects: [],
      diagnostics: [],
      randomState: Number(t.environment?.randomSeed ?? 1) >>> 0,
      maxEffects: Math.max(1, Math.trunc(Number(e?.maxEffects ?? 256)))
    }, a.event = w, a.identity = { ...t.identity ?? {} };
  }, xe = (t, e) => {
    const n = String(t.input.kind);
    if (n === "text") return { value: String(e ?? "") };
    if (n === "checkbox" || n === "radio")
      return {
        value: e == null || String(e) === "Off" ? null : String(e)
      };
    if (n === "combobox") {
      const o = Array.isArray(e) ? e[0] : e, i = o == null ? "" : String(o);
      return { value: i === "" ? null : i };
    }
    return n === "listbox" ? Array.isArray(e) ? { selectedValues: e.map(String) } : {
      selectedValues: e == null || e === "" ? [] : [String(e)]
    } : (b(
      "invalid-field-value",
      `field '${String(t.input.name)}' cannot accept a scripted value`
    ), null);
  }, I = () => ({
    rc: !!r?.event.rc,
    value: g(r?.event.value ?? null),
    change: String(r?.event.change ?? ""),
    selStart: Math.max(0, Math.trunc(Number(r?.event.selStart ?? 0))),
    selEnd: Math.max(0, Math.trunc(Number(r?.event.selEnd ?? 0)))
  }), te = () => {
    if (!r) throw new Error("AcroJS run state was not initialized");
    const t = r.input.event, e = r.fieldsByRef.get(h(t.target)), n = String(t.kind ?? "");
    e && n === "field-calculate" && (e.value = g(r.event.value));
    const o = [];
    r.resetRefs.length > 0 && o.push({ kind: "reset", refs: [...r.resetRefs] });
    for (const s of r.fields) {
      const l = h(s.input.ref), f = r.resetKeys.has(l) ? s.input.defaultValue : s.originalValue;
      if (!v(s.value, f)) {
        const c = xe(s, s.value);
        c && o.push({ kind: "setValue", ref: s.input.ref, value: c });
      }
      s.display !== s.originalDisplay && o.push({ kind: "setDisplay", ref: s.input.ref, display: s.display });
    }
    e && n === "field-format" && o.push({
      kind: "setAppearanceText",
      ref: e.input.ref,
      text: String(r.event.value ?? "")
    });
    const i = [];
    for (const s of r.annots) {
      const l = {}, f = {};
      for (const c of Object.keys(s.current))
        Me(s.current[c], s.original[c]) || (U.indexOf(c) >= 0 ? f[c] = s.current[c] : l[c] = C(s.current[c]));
      Object.keys(f).length > 0 && (l.flags = f), Object.keys(l).length > 0 && i.push({ ref: s.input.ref, patch: l });
    }
    const d = o.length + i.length + r.uiEffects.length;
    return d > r.maxEffects ? {
      event: I(),
      formEffects: [],
      annotEffects: [],
      uiEffects: [],
      diagnostics: [...r.diagnostics],
      error: {
        kind: "budget",
        message: `script produced ${d} effects; limit is ${r.maxEffects}`
      }
    } : {
      event: I(),
      formEffects: o,
      annotEffects: i,
      uiEffects: [...r.uiEffects],
      diagnostics: [...r.diagnostics]
    };
  }, re = (t) => ({
    event: I(),
    formEffects: [],
    annotEffects: [],
    uiEffects: [],
    diagnostics: [...r?.diagnostics ?? []],
    error: {
      kind: "exception",
      message: t instanceof Error ? t.message : String(t),
      ...t instanceof Error && t.stack ? { stack: t.stack } : {}
    }
  }), ne = (t) => (0, eval)(t);
  Object.defineProperties(a, {
    __acrojsBoot: { configurable: !1, writable: !1, value: (t, e, n) => {
      ee(e, n);
      try {
        for (const o of t ?? []) ne(String(o));
        return te();
      } catch (o) {
        return re(o);
      }
    } },
    __acrojsRun: { configurable: !1, writable: !1, value: (t, e, n) => {
      ee(e, n);
      try {
        return ne(String(t)), te();
      } catch (o) {
        return re(o);
      }
    } }
  }), a.app = ke, a.util = Fe, a.display = Object.freeze({ visible: 0, hidden: 1, noPrint: 2, noView: 3 }), a.color = Object.freeze({
    transparent: Object.freeze(["T"]),
    black: Object.freeze(["G", 0]),
    white: Object.freeze(["G", 1]),
    gray: Object.freeze(["G", 0.5]),
    ltGray: Object.freeze(["G", 0.75]),
    dkGray: Object.freeze(["G", 0.25]),
    red: Object.freeze(["RGB", 1, 0, 0]),
    green: Object.freeze(["RGB", 0, 1, 0]),
    blue: Object.freeze(["RGB", 0, 0, 1]),
    cyan: Object.freeze(["CMYK", 1, 0, 0, 0]),
    magenta: Object.freeze(["CMYK", 0, 1, 0, 0]),
    yellow: Object.freeze(["CMYK", 0, 0, 1, 0]),
    convert: (t, e) => {
      if (!B(t)) return ["T"];
      const n = String(e), o = P(t);
      if (n === "T" || o === null) return ["T"];
      if (n === "G") return ["G", 0.3 * o[0] + 0.59 * o[1] + 0.11 * o[2]];
      if (n === "RGB") return ["RGB", o[0], o[1], o[2]];
      if (n === "CMYK") {
        const i = 1 - Math.max(o[0], o[1], o[2]);
        return ["CMYK", 1 - o[0] - i, 1 - o[1] - i, 1 - o[2] - i, i];
      }
      return ["T"];
    },
    equal: (t, e) => {
      if (!B(t) || !B(e)) return !1;
      const n = P(t), o = P(e);
      return n === null || o === null ? n === o : n.every((i, d) => Math.abs(i - o[d]) < 1e-6);
    }
  }), a.getField = L, a.getAnnots = H, a.getAnnot = X, a.resetForm = y.resetForm, a.print = y.print, a.submitForm = y.submitForm, a.mailDoc = y.mailDoc, a.getURL = y.getURL, Object.defineProperties(a, {
    documentFileName: { configurable: !0, get: () => y.documentFileName },
    numFields: { configurable: !0, get: () => y.numFields },
    pageNum: {
      configurable: !0,
      get: () => y.pageNum,
      set: (t) => {
        y.pageNum = t;
      }
    }
  });
  class oe extends p {
    constructor(...e) {
      e.length === 0 ? super(Number((r?.input.environment ?? {}).nowMs ?? 0)) : e.length === 1 ? super(e[0]) : super(
        Number(e[0]),
        Number(e[1]),
        Number(e[2] ?? 1),
        Number(e[3] ?? 0),
        Number(e[4] ?? 0),
        Number(e[5] ?? 0),
        Number(e[6] ?? 0)
      );
    }
    static now() {
      return Number((r?.input.environment ?? {}).nowMs ?? 0);
    }
  }
  a.Date = oe;
  const ie = a.Math;
  ie && (ie.random = () => r ? (r.randomState = 1664525 * r.randomState + 1013904223 >>> 0, r.randomState / 4294967296) : 0), a.AFSimple_Calculate = (t, e) => {
    const o = (Array.isArray(e) ? e : String(e).split(",")).map((s) => M(L(String(s).trim())?.value)), i = String(t).toUpperCase(), d = o.length === 0 ? 0 : i === "PRD" ? o.reduce((s, l) => s * l, 1) : i === "AVG" ? o.reduce((s, l) => s + l, 0) / o.length : i === "MIN" ? Math.min(...o) : i === "MAX" ? Math.max(...o) : o.reduce((s, l) => s + l, 0);
    r && (r.event.value = d);
  }, a.AFNumber_Format = (t, e, n, o, i, d) => {
    if (!r) return;
    const s = Math.max(0, Math.min(10, Math.trunc(Number(t))));
    let l = M(r.event.value).toFixed(s);
    if (Number(e) === 0 || Number(e) === 2) {
      const [c, S] = l.split(".");
      l = `${c.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${S === void 0 ? "" : `.${S}`}`;
    }
    const f = String(i ?? "");
    r.event.value = d ? `${f}${l}` : `${l}${f}`;
  }, a.AFPercent_Format = (t) => {
    if (!r) return;
    const e = Math.max(0, Math.min(10, Math.trunc(Number(t))));
    r.event.value = `${(M(r.event.value) * 100).toFixed(e)}%`;
  };
  const se = [
    "m/d",
    "m/d/yy",
    "mm/dd/yy",
    "mm/yy",
    "d-mmm",
    "d-mmm-yy",
    "dd-mmm-yy",
    "yy-mm-dd",
    "mmm-yy",
    "mmmm-yy",
    "mmm d, yyyy",
    "mmmm d, yyyy",
    "m/d/yy h:MM tt",
    "m/d/yy HH:MM"
  ], q = ["HH:MM", "h:MM tt", "HH:MM:ss", "h:MM:ss tt"], J = (t) => {
    r && (r.uiEffects.push({ type: "alert", message: t, icon: 0 }), r.event.rc = !1);
  }, K = () => J(
    `The value entered does not match the format of the field [ ${String(
      r?.event.targetName ?? ""
    )} ]`
  ), ae = (t) => J(
    `Invalid date/time: please ensure that the date/time exists. Field [ ${String(
      r?.event.targetName ?? ""
    )} ] should match format ${String(t ?? "")}`
  ), O = (t) => {
    const e = t ?? r?.event ?? {}, n = String(e.value ?? "");
    if (e.willCommit) return n;
    const o = Math.max(0, Math.trunc(Number(e.selStart ?? 0))), i = Math.max(o, Math.trunc(Number(e.selEnd ?? 0)));
    return n.slice(0, o) + String(e.change ?? "") + n.slice(i);
  };
  a.AFMergeChange = O;
  const ue = (t) => {
    if (typeof t == "number") return Number.isFinite(t) ? t : null;
    let e = String(t ?? "").trim();
    if (e === "") return null;
    e = e.replace(/[^0-9,.\-+eE]/g, ""), e.includes(",") && e.includes(".") ? e = e.lastIndexOf(",") > e.lastIndexOf(".") ? e.replace(/\./g, "").replace(",", ".") : e.replace(/,/g, "") : e.includes(",") && (e = (e.match(/,/g) ?? []).length === 1 ? e.replace(",", ".") : e.replace(/,/g, ""));
    const n = Number(e);
    return e !== "" && Number.isFinite(n) ? n : null;
  };
  a.AFMakeNumber = ue, a.AFExtractNums = (t) => {
    const e = String(t ?? "").match(/\d+/g);
    return e && e.length > 0 ? [...e] : null;
  };
  const ce = (t, e) => {
    const n = t.trim();
    return n === "" ? !0 : (e === 2 || e === 3 ? /^[+-]?(\d+|\d{1,3}(\.\d{3})+)?(,\d*)?$/ : /^[+-]?(\d+|\d{1,3}(,\d{3})+)?(\.\d*)?$/).test(n) && /\d/.test(n);
  };
  a.AFNumber_Keystroke = (t, e, n, o, i) => {
    if (!r || !r.event.willCommit) return;
    const d = O(r.event), s = i ? d.split(String(i)).join("") : d;
    ce(s, Math.trunc(Number(e))) || K();
  }, a.AFPercent_Keystroke = (t, e) => {
    if (!r || !r.event.willCommit) return;
    const n = O(r.event).replace(/%\s*$/, "");
    ce(n, Math.trunc(Number(e))) || K();
  };
  const le = (t) => String(t ?? "").replace(/\D/g, ""), Ce = (t) => {
    if (!r) return;
    const e = le(r.event.value), n = Math.trunc(Number(t));
    let o = String(r.event.value ?? "");
    n === 0 ? o = e.slice(0, 5) : n === 1 ? o = `${e.slice(0, 5)}-${e.slice(5, 9)}` : n === 2 ? o = e.length >= 10 ? `(${e.slice(0, 3)}) ${e.slice(3, 6)}-${e.slice(6, 10)}` : `${e.slice(0, 3)}-${e.slice(3, 7)}` : n === 3 && (o = `${e.slice(0, 3)}-${e.slice(3, 5)}-${e.slice(5, 9)}`), r.event.value = o;
  };
  a.AFSpecial_Format = Ce, a.AFSpecial_Keystroke = (t) => {
    if (!r || !r.event.willCommit) return;
    const e = O(r.event);
    if (e.trim() === "") return;
    const n = le(e).length, o = Math.trunc(Number(t));
    (o === 0 ? n === 5 : o === 1 ? n === 9 : o === 2 ? n === 7 || n === 10 : n === 9) || K();
  }, a.AFRange_Validate = (t, e, n, o) => {
    if (!r) return;
    const i = ue(r.event.value);
    if (i === null) return;
    const d = !!t, s = !!n, l = Number(e), f = Number(o);
    (!d || i >= l) && (!s || i <= f) || J(
      d && s ? `Invalid value: must be greater than or equal to ${l} and less than or equal to ${f}.` : d ? `Invalid value: must be greater than or equal to ${l}.` : `Invalid value: must be less than or equal to ${f}.`
    );
  };
  const Ee = () => {
    const t = r?.input.environment ?? {}, e = new p(
      Number(t.nowMs ?? 0) + Number(t.utcOffsetMinutes ?? 0) * 6e4
    );
    return {
      y: e.getUTCFullYear(),
      m: e.getUTCMonth() + 1,
      d: e.getUTCDate(),
      H: 0,
      M: 0,
      S: 0
    };
  }, me = (t) => {
    const e = r?.input.environment ?? {};
    return new p(
      p.UTC(t.y, t.m - 1, t.d, t.H, t.M, t.S) - Number(e.utcOffsetMinutes ?? 0) * 6e4
    );
  }, R = (t, e) => {
    const n = String(t ?? "").trim();
    if (n === "") return null;
    const o = n.toLowerCase();
    let i = null;
    for (let A = 0; A < 12; A += 1)
      if (o.indexOf(Z[A].toLowerCase()) >= 0) {
        i = A + 1;
        break;
      }
    const d = /(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?/i.exec(n);
    let s = 0, l = 0, f = 0;
    if (d) {
      s = Number(d[1]), l = Number(d[2]), f = Number(d[3] ?? 0);
      const A = String(d[4] ?? "").toLowerCase();
      if (A === "pm" && s < 12 && (s += 12), A === "am" && s === 12 && (s = 0), s > 23 || l > 59 || f > 59) return null;
    }
    const S = ((d ? n.slice(0, d.index) + n.slice(d.index + d[0].length) : n).match(/\d+/g) ?? []).map((A) => Number(A)), k = [];
    for (const A of String(e ?? "").match(/yyyy|mmmm|mmm|yy|mm|dd|m|d/g) ?? []) {
      const $ = A[0] === "y" ? "y" : A[0] === "m" ? "m" : "d";
      k.indexOf($) < 0 && k.push($);
    }
    let w = null, m = i, N = null, F = 0;
    for (const A of k) {
      if (A === "m" && i !== null) continue;
      if (F >= S.length) break;
      const $ = S[F];
      F += 1, A === "y" ? w = $ : A === "m" ? m = $ : N = $;
    }
    if (w === null && m === null && N === null && !d) return null;
    const ge = Ee();
    if (w === null ? w = ge.y : w < 100 && (w = w < 50 ? 2e3 + w : 1900 + w), m === null && (m = ge.m), N === null && (N = 1), m < 1 || m > 12 || N < 1 || N > 31) return null;
    const z = new p(p.UTC(w, m - 1, N));
    return z.getUTCFullYear() !== w || z.getUTCMonth() !== m - 1 || z.getUTCDate() !== N ? null : { y: w, m, d: N, H: s, M: l, S: f };
  }, de = (t) => {
    if (!r) return;
    const e = String(r.event.value ?? "");
    if (e.trim() === "") return;
    const n = R(e, t), o = n ? me(n) : new oe(e);
    Number.isNaN(o.getTime()) || (r.event.value = G(t, o));
  };
  a.AFDate_FormatEx = de, a.AFDate_Format = (t) => de(se[Math.trunc(Number(t))] ?? "m/d/yy");
  const fe = (t) => {
    if (!r || !r.event.willCommit) return;
    const e = O(r.event);
    e.trim() !== "" && (R(e, t) || ae(t));
  };
  a.AFDate_KeystrokeEx = fe, a.AFDate_Keystroke = (t) => fe(se[Math.trunc(Number(t))] ?? "m/d/yy");
  const pe = (t) => {
    if (!r) return;
    const e = String(r.event.value ?? "");
    if (e.trim() === "") return;
    const n = R(e, t);
    n && (r.event.value = G(t, me(n)));
  };
  a.AFTime_FormatEx = pe, a.AFTime_Format = (t) => pe(q[Math.trunc(Number(t))] ?? "HH:MM"), a.AFTime_Keystroke = (t) => {
    if (!r || !r.event.willCommit) return;
    const e = O(r.event);
    e.trim() !== "" && (R(e, q[Math.trunc(Number(t))] ?? "HH:MM") || ae(q[Math.trunc(Number(t))] ?? "HH:MM"));
  }, a.fetch = void 0, a.XMLHttpRequest = void 0, a.WebSocket = void 0;
}
const Oe = `(${Te.toString()})(globalThis);`;
async function $e(u) {
  let a = Y(await u), [p, r, { QuickJSWASMModule: g }] = await Promise.all([a.importModuleLoader().then(Y), a.importFFI(), import("./module-6F3E5H7Y-CZSA4oPd.js").then(Y)]), v = await p();
  v.type = "sync";
  let h = new r(v);
  return new g(v, h);
}
function Y(u) {
  return u && "default" in u && u.default ? u.default && "default" in u.default && u.default.default ? u.default.default : u.default : u;
}
var Be = { type: "sync", importFFI: () => import("./ffi-B1Y4jedD.js").then((u) => u.QuickJSFFI), importModuleLoader: () => import("./emscripten-module.browser-VTL2UBYQ-Bukliz-p.js").then((u) => u.default) }, je = Be;
let ye;
function De() {
  return ye ?? (ye = $e(je)), ye;
}
function he(u) {
  for (const [a, p] of Object.entries(u))
    if (!Number.isSafeInteger(p) || p <= 0)
      throw new RangeError(`ScriptBudget.${a} must be a positive safe integer`);
  return u;
}
function D(u) {
  return typeof u == "object" && u !== null && !Array.isArray(u);
}
function Re(u) {
  return u === null || typeof u == "string" || typeof u == "boolean" || typeof u == "number" && Number.isFinite(u) || Array.isArray(u) && u.every((a) => typeof a == "string");
}
function _e(u) {
  if (!D(u) || !D(u.event)) return !1;
  const a = u.event, p = (r) => Array.isArray(r) && r.every(D);
  return typeof a.rc != "boolean" || !Re(a.value) || typeof a.change != "string" || !Number.isSafeInteger(a.selStart) || !Number.isSafeInteger(a.selEnd) || !p(u.formEffects) || !p(u.uiEffects) || !p(u.diagnostics) ? !1 : u.error === void 0 ? !0 : D(u.error) && (u.error.kind === "exception" || u.error.kind === "budget" || u.error.kind === "invalid-output") && typeof u.error.message == "string" && (u.error.stack === void 0 || typeof u.error.stack == "string");
}
function be(u) {
  if (D(u)) {
    const a = typeof u.name == "string" ? `${u.name}: ` : "";
    if (typeof u.message == "string") return `${a}${u.message}`;
  }
  return String(u);
}
function Ve(u) {
  if (!u) return !1;
  const a = u.message.toLowerCase();
  return a.includes("interrupted") || a.includes("out of memory") || a.includes("stack overflow");
}
function j(u, a, p) {
  const r = u.event.target ? u.fields.find((g) => {
    const v = g.ref, h = u.event.target;
    return v.kind === "objectNumber" && h.kind === "objectNumber" ? v.objectNumber === h.objectNumber : v.kind === "fqn" && h.kind === "fqn" ? v.name === h.name : !1;
  }) : void 0;
  return {
    event: {
      rc: !1,
      value: u.event.value ?? r?.value ?? null,
      change: u.event.change ?? "",
      selStart: u.event.selStart ?? 0,
      selEnd: u.event.selEnd ?? 0
    },
    formEffects: [],
    annotEffects: [],
    uiEffects: [],
    diagnostics: [],
    error: { kind: a, message: p }
  };
}
class W {
  constructor(a, p) {
    this.hasBooted = !1, this.isDisposed = !1, this.runtime = a, this.context = p;
  }
  static create(a, p = {}) {
    const r = a.newRuntime();
    r.setMemoryLimit(_.maxMemoryBytes), r.setMaxStackSize(_.maxStackBytes);
    const g = r.newContext();
    try {
      const v = g.evalCode(
        p.preludeSource ?? Oe,
        "embedpdf-acrojs-prelude.js",
        { type: "global" }
      );
      if (v.error) {
        const h = be(g.dump(v.error));
        throw v.error.dispose(), new Error(`Failed to install the AcroJS prelude: ${h}`);
      }
      return v.value.dispose(), new W(r, g);
    } catch (v) {
      throw g.dispose(), r.dispose(), v;
    }
  }
  get destroyed() {
    return this.isDisposed;
  }
  boot(a, p, r = _) {
    if (this.assertActive(), this.hasBooted) throw new Error("The document JavaScript name tree has already booted");
    return this.hasBooted = !0, this.invoke("__acrojsBoot", a, p, he(r));
  }
  run(a, p, r = _) {
    return this.assertActive(), this.invoke("__acrojsRun", a, p, he(r));
  }
  destroy() {
    this.isDisposed || (this.isDisposed = !0, this.context.dispose(), this.runtime.dispose());
  }
  assertActive() {
    if (this.isDisposed) throw new Error("The script sandbox has been disposed");
  }
  poison() {
    try {
      this.destroy();
    } catch {
    }
  }
  invoke(a, p, r, g) {
    this.runtime.setMemoryLimit(g.maxMemoryBytes), this.runtime.setMaxStackSize(g.maxStackBytes);
    const v = Date.now() + g.maxExecutionMs;
    let h = !1;
    this.runtime.setInterruptHandler(() => (h = Date.now() >= v, h));
    let b;
    try {
      const M = `globalThis.${a}(${JSON.stringify(p)},${JSON.stringify(
        r
      )},${JSON.stringify({ maxEffects: g.maxEffects })})`, x = this.context.evalCode(M, "embedpdf-acrojs-event.js", { type: "global" });
      if (x.error) {
        b = this.context.dump(x.error), x.error.dispose();
        const V = j(r, h ? "budget" : "invalid-output", be(b));
        return this.poison(), V;
      }
      b = this.context.dump(x.value), x.value.dispose();
    } catch (M) {
      const x = j(
        r,
        h ? "budget" : "invalid-output",
        M instanceof Error ? M.message : String(M)
      );
      return this.poison(), x;
    } finally {
      this.isDisposed || this.runtime.removeInterruptHandler();
    }
    if (!_e(b)) {
      const M = j(r, "invalid-output", "AcroJS returned an invalid output");
      return this.poison(), M;
    }
    if (h || Ve(b.error)) {
      const M = j(
        r,
        "budget",
        h ? "Script execution exceeded its time budget" : b.error.message
      );
      return this.poison(), M;
    }
    const T = new TextEncoder().encode(JSON.stringify(b)).byteLength;
    if (T > g.maxOutputBytes) {
      const M = j(
        r,
        "budget",
        `Script output used ${T} bytes; limit is ${g.maxOutputBytes}`
      );
      return this.poison(), M;
    }
    return b;
  }
}
async function He(u = {}) {
  return W.create(await De(), u);
}
export {
  W as QuickJsSandbox,
  He as createQuickJsSandbox
};
//# sourceMappingURL=index--xJY1YJM.js.map
