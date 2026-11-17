import { u as B, aa as H, ab as O, ac as W, ad as q, a0 as D, ae as F, af as U, s as V, g as u, r as w, ag as G, ah as J, ai as K, aj as M, h as t, S as Q, i as b, j as d, W as X, ak as Y, al as Z } from "./wasm-url-asset-C3FjD8P-.js";
const c = "all";
function te() {
  const r = B(), s = H(), { standard: f, sidebar: m, libraries: S } = O(), l = W({ kind: m ?? ["stamps"] }), k = q(), { activeToolId: L } = D(), { locale: A } = F(), j = U("stamps"), I = V(null), [C, h] = u(null), [g, p] = u(null), [x, n] = u(null), [P, v] = u(c), y = j.props?.libraryId;
  w(() => {
    typeof y == "string" && v(y);
  }, [y]), w(() => {
    let e = !0;
    return p("loading"), G(s).then(() => Promise.all([J(s, K(A), f), M(s, S ?? [])])).catch((a) => {
      console.error("[embedpdf] stamp libraries failed:", a), e && n(r("demo.stampsError"));
    }).finally(() => e && p(null)), () => {
      e = !1;
    };
  }, [s, A]), w(() => {
    L !== "stamp" && h(null);
  }, [L]);
  const z = (e) => {
    n(null), h(e.id), s.armAsset(e.id).catch((a) => {
      console.error("[embedpdf] arm stamp failed:", a), h(null), n(r("demo.stampsArmError"));
    });
  }, $ = (e) => {
    n(null), p("importing"), s.importLibrary(e, { name: e.name.replace(/\.pdf$/i, "") }).then(({ library: a }) => v(a.id)).catch((a) => {
      console.error("[embedpdf] stamp library import failed:", a), n(r("demo.stampsImportError"));
    }).finally(() => p(null));
  }, R = async (e, a) => {
    const T = await s.exportLibrary(e).catch(() => null);
    T && Y(T, `${a || "stamps"}.pdf`, "application/pdf");
  }, i = l.length === 1 ? l[0].id : l.some((e) => e.id === P) ? P : c, o = i === c ? null : l.find((e) => e.id === i) ?? null, N = i === c ? k : k.filter((e) => e.libraryId === i), E = (e) => e === "embedpdf-standard" || (S ?? []).some((a) => a.id === e);
  return /* @__PURE__ */ t("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [
      l.length > 0 && /* @__PURE__ */ t("div", {
        className: "border-border-subtle flex items-center gap-1 border-b p-2",
        children: [l.length > 1 ? /* @__PURE__ */ t("select", {
          value: i,
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
        }), o && /* @__PURE__ */ t(Q, { children: [/* @__PURE__ */ t(b, {
          label: r("demo.stampsExportLibrary"),
          onClick: () => R(o.id, o.name),
          className: "text-fg-muted hover:text-fg grid h-7 w-7 shrink-0 place-items-center rounded",
          children: /* @__PURE__ */ t(d, {
            name: "download",
            size: 14
          })
        }), !E(o.id) && /* @__PURE__ */ t(b, {
          label: r("demo.stampsRemoveLibrary"),
          onClick: () => void s.deleteLibrary(o.id),
          className: "text-fg-muted hover:text-fg grid h-7 w-7 shrink-0 place-items-center rounded",
          children: /* @__PURE__ */ t(d, {
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
          children: [/* @__PURE__ */ t(d, {
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
            children: [/* @__PURE__ */ t(_, {
              asset: e,
              armed: C === e.id,
              onArm: () => z(e)
            }), !E(e.libraryId) && /* @__PURE__ */ t(b, {
              label: r("demo.stampsRemoveStamp"),
              onClick: () => void s.deleteAsset(e.id),
              className: "bg-surface border-border text-fg-muted hover:text-fg absolute end-1 top-1 grid h-5 w-5 place-items-center rounded-full border opacity-0 shadow-sm focus:opacity-100 group-hover:opacity-100",
              children: /* @__PURE__ */ t(d, {
                name: "x",
                size: 12
              })
            })]
          }, e.id))
        })
      }),
      (x || C) && /* @__PURE__ */ t("div", {
        className: `border-border-subtle shrink-0 border-t px-3 py-2 text-xs ${x ? "text-red-600" : "text-fg-muted"}`,
        children: x ?? r("demo.stampsArmedHint")
      }),
      /* @__PURE__ */ t("div", {
        className: "border-border-subtle shrink-0 border-t p-3",
        children: [/* @__PURE__ */ t(X, {
          content: { label: r("demo.stampsImportHint") },
          children: (e) => /* @__PURE__ */ t("button", {
            ...e,
            type: "button",
            disabled: g != null,
            onClick: () => I.current?.click(),
            className: "border-border text-fg hover:bg-hover flex w-full items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm disabled:opacity-40",
            children: [/* @__PURE__ */ t(d, {
              name: "rubberStampPlus",
              size: 16
            }), r(g === "importing" ? "demo.stampsImporting" : "demo.stampsImport")]
          })
        }), /* @__PURE__ */ t("input", {
          ref: I,
          type: "file",
          accept: "application/pdf",
          className: "hidden",
          onChange: (e) => {
            const a = e.currentTarget.files?.[0];
            e.currentTarget.value = "", a && $(a);
          }
        })]
      })
    ]
  });
}
function _({ asset: r, armed: s, onArm: f }) {
  const m = Z(r.id);
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
  te as StampsPanel
};
//# sourceMappingURL=stamps-panel-BfRJ9uBl-B13HTg2f.js.map
