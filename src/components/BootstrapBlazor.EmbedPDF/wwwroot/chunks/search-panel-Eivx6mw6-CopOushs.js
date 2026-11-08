import { u as m, g as O, h as R, i as I, e as t, d as p, T as b, I as x, j as N, k as P, l as T, v as z, m as y, A as w, n as E, S as K } from "./wasm-url-asset-DQFmMC86.js";
const j = 300, B = (e, s) => e != null && e.text === s.text && !!e.regex == !!s.regex && !!e.matchCase == !!s.matchCase && !!e.wholeWord == !!s.wholeWord;
function C() {
  const e = P(), s = T(), { query: a } = s, [n, h] = p(() => a?.text ?? ""), [r, f] = p(() => a?.matchCase ?? !1), [i, l] = p(() => a?.wholeWord ?? !1), [c, d] = p(() => a?.regex ?? !1), o = {
    text: n,
    regex: c,
    matchCase: r,
    wholeWord: i
  }, k = n && c ? z(o) : { ok: !0 }, g = k.ok && !B(a, o) && !(n === "" && a === null);
  return y(() => {
    if (!g) return;
    const u = setTimeout(() => e.search(o), j);
    return () => clearTimeout(u);
  }, [
    n,
    r,
    i,
    c,
    a,
    g,
    e
  ]), {
    search: e,
    state: s,
    draft: n,
    setDraft: h,
    matchCase: r,
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
  const s = m(), a = w(null);
  return E("search", a, { select: !0 }), /* @__PURE__ */ t("div", {
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
        onChange: (n) => e.setDraft(n.target.value),
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
        onChange: (n) => a(n.target.checked),
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
function L(e) {
  return /* @__PURE__ */ t(K, { children: [
    e.before,
    /* @__PURE__ */ t("span", {
      className: "text-accent font-semibold",
      children: e.match
    }),
    e.after
  ] });
}
function M({ hit: e, index: s, active: a, onClick: n }) {
  const h = m(), r = w(null);
  return y(() => {
    a && r.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, [a]), /* @__PURE__ */ t("button", {
    ref: r,
    type: "button",
    onClick: n,
    className: `w-full rounded border p-2 text-left text-sm transition-colors ${a ? "border-accent bg-accent-light text-fg" : "border-border-subtle bg-surface text-fg-secondary hover:bg-hover"}`,
    children: /* @__PURE__ */ t("span", { children: e.snippet ? L(e.snippet) : h("demo.searchResult", { params: { index: s + 1 } }) })
  });
}
function $() {
  const e = m(), s = C(), { status: a, hitCount: n, activeHitIndex: h } = s.state, r = O(), f = R(), i = I(() => {
    const l = /* @__PURE__ */ new Map();
    return r.forEach((c, d) => {
      const o = l.get(c.pageIndex);
      o ? o.push({
        hit: c,
        index: d
      }) : l.set(c.pageIndex, [{
        hit: c,
        index: d
      }]);
    }), [...l.entries()].sort((c, d) => c[0] - d[0]);
  }, [r]);
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
            children: n === 0 ? e(a === "searching" ? "demo.searchSearching" : "demo.searchNoResults") : e("demo.searchResults", { params: { count: n } })
          }), n > 1 && /* @__PURE__ */ t(H, { box: s })]
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
          children: c.map(({ hit: d, index: o }) => /* @__PURE__ */ t(M, {
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
function q() {
  const e = m(), s = C(), { status: a, hitCount: n, activeHitIndex: h } = s.state, [r, f] = p(() => s.matchCase || s.wholeWord || s.regex), i = a === "idle" ? null : n === 0 ? e(a === "searching" ? "demo.searchSearching" : "demo.searchNoResults") : e("demo.searchHitOf", { params: {
    current: h + 1,
    total: n
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
            disabled: n === 0
          }),
          /* @__PURE__ */ t(b, {
            label: e("demo.searchOptions"),
            "aria-expanded": r,
            className: N(r),
            onClick: () => f((l) => !l),
            children: /* @__PURE__ */ t(x, {
              name: "chevronDown",
              size: 20
            })
          })
        ]
      }),
      /* @__PURE__ */ t(W, { box: s }),
      r && /* @__PURE__ */ t(D, {
        box: s,
        className: "mt-2.5 flex flex-wrap gap-x-4 gap-y-2 px-1 pb-1"
      })
    ]
  });
}
export {
  q as FindBar,
  $ as SearchPanel
};
//# sourceMappingURL=search-panel-Eivx6mw6-CopOushs.js.map
