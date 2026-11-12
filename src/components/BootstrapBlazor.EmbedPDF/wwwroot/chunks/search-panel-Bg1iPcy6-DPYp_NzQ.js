import { u as m, o as O, p as R, q as P, l as t, k as p, T as b, m as x, r as N, s as T, t as I, v as w, A as y, w as z, S as E } from "./init-tVr9KnGC.js";
import { validateSearchQuery as K } from "@embedpdf/plugin-search";
const B = 300, L = (e, s) => e != null && e.text === s.text && !!e.regex == !!s.regex && !!e.matchCase == !!s.matchCase && !!e.wholeWord == !!s.wholeWord;
function C() {
  const e = T(), s = I(), { query: a } = s, [r, h] = p(() => a?.text ?? ""), [n, f] = p(() => a?.matchCase ?? !1), [i, l] = p(() => a?.wholeWord ?? !1), [c, d] = p(() => a?.regex ?? !1), o = {
    text: r,
    regex: c,
    matchCase: n,
    wholeWord: i
  }, k = r && c ? K(o) : { ok: !0 }, g = k.ok && !L(a, o) && !(r === "" && a === null);
  return w(() => {
    if (!g) return;
    const u = setTimeout(() => e.search(o), B);
    return () => clearTimeout(u);
  }, [
    r,
    n,
    i,
    c,
    a,
    g,
    e
  ]), {
    search: e,
    state: s,
    draft: r,
    setDraft: h,
    matchCase: n,
    setMatchCase: f,
    wholeWord: i,
    setWholeWord: l,
    regex: c,
    setRegex: d,
    validation: k,
    onKeyDown: (u) => {
      u.key !== "Enter" || u.nativeEvent.isComposing || (u.preventDefault(), g ? e.search(o) : u.shiftKey ? e.previousHit() : e.nextHit());
    }
  };
}
function S({ box: e }) {
  const s = m(), a = y(null);
  return z("search", a, { select: !0 }), /* @__PURE__ */ t("div", {
    className: "relative min-w-0 flex-1",
    children: [
      /* @__PURE__ */ t("div", {
        className: "text-fg-muted pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2.5",
        children: /* @__PURE__ */ t(x, {
          name: "search",
          size: 16
        })
      }),
      /* @__PURE__ */ t("input", {
        ref: a,
        type: "text",
        value: e.draft,
        placeholder: s("demo.searchPlaceholder"),
        onChange: (r) => e.setDraft(r.target.value),
        onKeyDown: e.onKeyDown,
        className: `bg-surface text-fg w-full rounded-md border py-1.5 pe-9 ps-8 text-sm outline-none focus:ring-1 ${e.validation.ok ? "border-border focus:border-accent focus:ring-accent" : "border-red-400 focus:border-red-400 focus:ring-red-400"}`
      }),
      e.draft && /* @__PURE__ */ t("button", {
        type: "button",
        onClick: () => {
          e.setDraft(""), a.current?.focus();
        },
        className: "text-fg-muted hover:text-fg-secondary absolute inset-y-0 end-0 flex items-center pe-2.5",
        children: /* @__PURE__ */ t(x, {
          name: "x",
          size: 16
        })
      })
    ]
  });
}
function W({ box: e }) {
  return e.validation.ok ? null : /* @__PURE__ */ t("p", {
    className: "mt-1.5 text-xs text-red-500",
    children: e.validation.message
  });
}
function v({ label: e, checked: s, onChange: a }) {
  return /* @__PURE__ */ t("label", {
    className: "text-fg-secondary flex cursor-pointer select-none items-center gap-2 text-xs font-medium",
    children: [/* @__PURE__ */ t("span", {
      className: "relative flex h-4 w-4 items-center justify-center",
      children: [/* @__PURE__ */ t("input", {
        type: "checkbox",
        checked: s,
        onChange: (r) => a(r.target.checked),
        className: "border-border bg-surface checked:border-accent checked:bg-accent rounded-xs peer h-4 w-4 shrink-0 appearance-none border transition-colors"
      }), /* @__PURE__ */ t("svg", {
        viewBox: "0 0 24 24",
        className: "text-on-accent pointer-events-none absolute h-3 w-3 opacity-0 peer-checked:opacity-100",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /* @__PURE__ */ t("polyline", { points: "20 6 9 17 4 12" })
      })]
    }), e]
  });
}
function D({ box: e, className: s }) {
  const a = m();
  return /* @__PURE__ */ t("div", {
    className: s,
    children: [
      /* @__PURE__ */ t(v, {
        label: a("demo.searchCaseSensitive"),
        checked: e.matchCase,
        onChange: e.setMatchCase
      }),
      /* @__PURE__ */ t(v, {
        label: a("demo.searchWholeWord"),
        checked: e.wholeWord,
        onChange: e.setWholeWord
      }),
      /* @__PURE__ */ t(v, {
        label: a("demo.searchRegex"),
        checked: e.regex,
        onChange: e.setRegex
      })
    ]
  });
}
function H({ box: e, disabled: s = !1 }) {
  const a = m();
  return /* @__PURE__ */ t("div", {
    className: "flex shrink-0 items-center",
    children: [/* @__PURE__ */ t(b, {
      label: a("demo.searchPrevious"),
      disabled: s,
      className: N(!1, !s),
      onClick: () => e.search.previousHit(),
      children: /* @__PURE__ */ t(x, {
        name: "chevronLeft",
        size: 20,
        className: "rtl:-scale-x-100"
      })
    }), /* @__PURE__ */ t(b, {
      label: a("demo.searchNext"),
      disabled: s,
      className: N(!1, !s),
      onClick: () => e.search.nextHit(),
      children: /* @__PURE__ */ t(x, {
        name: "chevronRight",
        size: 20,
        className: "rtl:-scale-x-100"
      })
    })]
  });
}
function M(e) {
  return /* @__PURE__ */ t(E, { children: [
    e.before,
    /* @__PURE__ */ t("span", {
      className: "text-accent font-semibold",
      children: e.match
    }),
    e.after
  ] });
}
function j({ hit: e, index: s, active: a, onClick: r }) {
  const h = m(), n = y(null);
  return w(() => {
    a && n.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, [a]), /* @__PURE__ */ t("button", {
    ref: n,
    type: "button",
    onClick: r,
    className: `w-full rounded border p-2 text-left text-sm transition-colors ${a ? "border-accent bg-accent-light text-fg" : "border-border-subtle bg-surface text-fg-secondary hover:bg-hover"}`,
    children: /* @__PURE__ */ t("span", { children: e.snippet ? M(e.snippet) : h("demo.searchResult", { params: { index: s + 1 } }) })
  });
}
function $() {
  const e = m(), s = C(), { status: a, hitCount: r, activeHitIndex: h } = s.state, n = O(), f = R(), i = P(() => {
    const l = /* @__PURE__ */ new Map();
    return n.forEach((c, d) => {
      const o = l.get(c.pageIndex);
      o ? o.push({
        hit: c,
        index: d
      }) : l.set(c.pageIndex, [{
        hit: c,
        index: d
      }]);
    }), [...l.entries()].sort((c, d) => c[0] - d[0]);
  }, [n]);
  return /* @__PURE__ */ t("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [/* @__PURE__ */ t("div", {
      className: "p-3",
      children: [
        /* @__PURE__ */ t(S, { box: s }),
        /* @__PURE__ */ t(W, { box: s }),
        /* @__PURE__ */ t(D, {
          box: s,
          className: "mt-3 flex flex-col gap-2"
        }),
        /* @__PURE__ */ t("hr", { className: "border-border-subtle mb-2 mt-4" }),
        a !== "idle" && /* @__PURE__ */ t("div", {
          className: "flex h-8 items-center justify-between",
          children: [/* @__PURE__ */ t("div", {
            className: "text-fg-muted text-xs",
            children: r === 0 ? e(a === "searching" ? "demo.searchSearching" : "demo.searchNoResults") : e("demo.searchResults", { params: { count: r } })
          }), r > 1 && /* @__PURE__ */ t(H, { box: s })]
        })
      ]
    }), /* @__PURE__ */ t("div", {
      className: "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3",
      children: i.map(([l, c]) => /* @__PURE__ */ t("div", {
        className: "mt-2 first:mt-0",
        children: [/* @__PURE__ */ t("div", {
          className: "bg-surface/80 text-fg-muted py-2 text-xs backdrop-blur",
          children: e("demo.searchPage", { params: { page: l + 1 } })
        }), /* @__PURE__ */ t("div", {
          className: "flex flex-col gap-2",
          children: c.map(({ hit: d, index: o }) => /* @__PURE__ */ t(j, {
            hit: d,
            index: o,
            active: o === h,
            onClick: () => {
              s.search.goToHit(o), f();
            }
          }, o))
        })]
      }, l))
    })]
  });
}
function A() {
  const e = m(), s = C(), { status: a, hitCount: r, activeHitIndex: h } = s.state, [n, f] = p(() => s.matchCase || s.wholeWord || s.regex), i = a === "idle" ? null : r === 0 ? e(a === "searching" ? "demo.searchSearching" : "demo.searchNoResults") : e("demo.searchHitOf", { params: {
    current: h + 1,
    total: r
  } });
  return /* @__PURE__ */ t("div", {
    className: "min-w-0",
    children: [
      /* @__PURE__ */ t("div", {
        className: "flex items-center gap-1",
        children: [
          /* @__PURE__ */ t(S, { box: s }),
          i !== null && /* @__PURE__ */ t("span", {
            className: "text-fg-muted shrink-0 whitespace-nowrap px-1 text-xs tabular-nums",
            children: i
          }),
          /* @__PURE__ */ t(H, {
            box: s,
            disabled: r === 0
          }),
          /* @__PURE__ */ t(b, {
            label: e("demo.searchOptions"),
            "aria-expanded": n,
            className: N(n),
            onClick: () => f((l) => !l),
            children: /* @__PURE__ */ t(x, {
              name: "chevronDown",
              size: 20
            })
          })
        ]
      }),
      /* @__PURE__ */ t(W, { box: s }),
      n && /* @__PURE__ */ t(D, {
        box: s,
        className: "mt-2.5 flex flex-wrap gap-x-4 gap-y-2 px-1 pb-1"
      })
    ]
  });
}
export {
  A as FindBar,
  $ as SearchPanel
};
//# sourceMappingURL=search-panel-Bg1iPcy6-DPYp_NzQ.js.map
