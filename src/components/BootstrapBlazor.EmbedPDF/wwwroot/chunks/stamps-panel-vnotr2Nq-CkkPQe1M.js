import { u as $, a0 as j, a1 as B, a2 as O, a3 as F, O as H, a4 as U, a5 as W, A as _, d as u, m as I, a6 as q, a7 as Y, a8 as G, e as t, S as J, T as b, I as i, W as K, a9 as M, aa as Q, ab as V } from "./wasm-url-asset-DQFmMC86.js";
const c = "all";
function ee() {
  const r = $(), s = j(), { standard: f, sidebar: m } = B(), l = O({ kind: m ?? ["stamps"] }), S = F(), { activeToolId: w } = H(), { locale: k } = U(), P = W("stamps"), A = _(null), [L, h] = u(null), [g, p] = u(null), [x, n] = u(null), [C, v] = u(c), y = P.props?.libraryId;
  I(() => {
    typeof y == "string" && v(y);
  }, [y]), I(() => {
    let e = !0;
    return p("loading"), q(s).then(() => Y(s, G(k), f)).catch((a) => {
      console.error("[embedpdf] default stamps failed:", a), e && n(r("demo.stampsError"));
    }).finally(() => e && p(null)), () => {
      e = !1;
    };
  }, [s, k]), I(() => {
    w !== "stamp" && h(null);
  }, [w]);
  const z = (e) => {
    n(null), h(e.id), s.armAsset(e.id).catch((a) => {
      console.error("[embedpdf] arm stamp failed:", a), h(null), n(r("demo.stampsArmError"));
    });
  }, R = (e) => {
    n(null), p("importing"), s.importLibrary(e, { name: e.name.replace(/\.pdf$/i, "") }).then(({ library: a }) => v(a.id)).catch((a) => {
      console.error("[embedpdf] stamp library import failed:", a), n(r("demo.stampsImportError"));
    }).finally(() => p(null));
  }, D = async (e, a) => {
    const E = await s.exportLibrary(e).catch(() => null);
    E && M(E, `${a || "stamps"}.pdf`, "application/pdf");
  }, o = l.length === 1 ? l[0].id : l.some((e) => e.id === C) ? C : c, d = o === c ? null : l.find((e) => e.id === o) ?? null, N = o === c ? S : S.filter((e) => e.libraryId === o), T = (e) => e === Q;
  return /* @__PURE__ */ t("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [
      l.length > 0 && /* @__PURE__ */ t("div", {
        className: "border-border-subtle flex items-center gap-1 border-b p-2",
        children: [l.length > 1 ? /* @__PURE__ */ t("select", {
          value: o,
          onChange: (e) => v(e.target.value),
          "aria-label": r("panels.stamps"),
          className: "border-border bg-surface text-fg min-w-0 flex-1 rounded border px-2 py-1.5 text-sm",
          children: [/* @__PURE__ */ t("option", {
            value: c,
            children: r("demo.stampsAll")
          }), l.map((e) => /* @__PURE__ */ t("option", {
            value: e.id,
            children: e.name
          }, e.id))]
        }) : /* @__PURE__ */ t("span", {
          className: "text-fg-muted min-w-0 flex-1 truncate px-1 text-xs font-semibold uppercase tracking-wide",
          children: l[0].name
        }), d && /* @__PURE__ */ t(J, { children: [/* @__PURE__ */ t(b, {
          label: r("demo.stampsExportLibrary"),
          onClick: () => D(d.id, d.name),
          className: "text-fg-muted hover:text-fg grid h-7 w-7 shrink-0 place-items-center rounded",
          children: /* @__PURE__ */ t(i, {
            name: "download",
            size: 14
          })
        }), !T(d.id) && /* @__PURE__ */ t(b, {
          label: r("demo.stampsRemoveLibrary"),
          onClick: () => void s.deleteLibrary(d.id),
          className: "text-fg-muted hover:text-fg grid h-7 w-7 shrink-0 place-items-center rounded",
          children: /* @__PURE__ */ t(i, {
            name: "trash",
            size: 14
          })
        })] })]
      }),
      /* @__PURE__ */ t("div", {
        className: "min-h-0 flex-1 overflow-y-auto p-3",
        children: g === "loading" && N.length === 0 ? /* @__PURE__ */ t("div", {
          className: "flex flex-col items-center gap-3 px-4 py-10 text-center",
          children: [/* @__PURE__ */ t("div", { className: "border-border-subtle border-t-accent h-6 w-6 animate-spin rounded-full border-2" }), /* @__PURE__ */ t("p", {
            className: "text-fg-muted text-sm",
            children: r("demo.stampsLoading")
          })]
        }) : N.length === 0 ? /* @__PURE__ */ t("div", {
          className: "flex flex-col items-center gap-3 px-4 py-10 text-center",
          children: [/* @__PURE__ */ t(i, {
            name: "rubberStamp",
            size: 32,
            className: "text-fg-muted"
          }), /* @__PURE__ */ t("p", {
            className: "text-fg-muted text-sm",
            children: r("demo.stampsEmpty")
          })]
        }) : /* @__PURE__ */ t("ul", {
          className: "grid grid-cols-2 gap-3",
          children: N.map((e) => /* @__PURE__ */ t("li", {
            className: "group relative",
            children: [/* @__PURE__ */ t(X, {
              asset: e,
              armed: L === e.id,
              onArm: () => z(e)
            }), !T(e.libraryId) && /* @__PURE__ */ t(b, {
              label: r("demo.stampsRemoveStamp"),
              onClick: () => void s.deleteAsset(e.id),
              className: "bg-surface border-border text-fg-muted hover:text-fg absolute end-1 top-1 grid h-5 w-5 place-items-center rounded-full border opacity-0 shadow-sm focus:opacity-100 group-hover:opacity-100",
              children: /* @__PURE__ */ t(i, {
                name: "x",
                size: 12
              })
            })]
          }, e.id))
        })
      }),
      (x || L) && /* @__PURE__ */ t("div", {
        className: `border-border-subtle shrink-0 border-t px-3 py-2 text-xs ${x ? "text-red-600" : "text-fg-muted"}`,
        children: x ?? r("demo.stampsArmedHint")
      }),
      /* @__PURE__ */ t("div", {
        className: "border-border-subtle shrink-0 border-t p-3",
        children: [/* @__PURE__ */ t(K, {
          content: { label: r("demo.stampsImportHint") },
          children: (e) => /* @__PURE__ */ t("button", {
            ...e,
            type: "button",
            disabled: g != null,
            onClick: () => A.current?.click(),
            className: "border-border text-fg hover:bg-hover flex w-full items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm disabled:opacity-40",
            children: [/* @__PURE__ */ t(i, {
              name: "rubberStampPlus",
              size: 16
            }), r(g === "importing" ? "demo.stampsImporting" : "demo.stampsImport")]
          })
        }), /* @__PURE__ */ t("input", {
          ref: A,
          type: "file",
          accept: "application/pdf",
          className: "hidden",
          onChange: (e) => {
            const a = e.currentTarget.files?.[0];
            e.currentTarget.value = "", a && R(a);
          }
        })]
      })
    ]
  });
}
function X({ asset: r, armed: s, onArm: f }) {
  const m = V(r.id);
  return /* @__PURE__ */ t(b, {
    label: r.label,
    onClick: f,
    "aria-pressed": s,
    className: `flex aspect-square w-full items-center justify-center rounded-md border p-2 ${s ? "border-accent bg-accent-light ring-accent ring-2" : "border-border-subtle hover:border-border hover:bg-hover"}`,
    children: m ? /* @__PURE__ */ t("img", {
      src: m,
      alt: r.label,
      className: "max-h-full max-w-full object-contain"
    }) : /* @__PURE__ */ t("span", {
      className: "text-fg truncate text-sm",
      children: r.label
    })
  });
}
export {
  ee as StampsPanel
};
//# sourceMappingURL=stamps-panel-vnotr2Nq-CkkPQe1M.js.map
