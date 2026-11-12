import { u as k, a1 as T, ad as j, ae as L, af as P, ag as N, P as z, a6 as V, d as y, ah as I, m as S, a7 as R, e, I as x, T as v, K as $, ai as q, aa as B, ac as D } from "./wasm-url-asset-BJXsMWLm.js";
const M = (n) => n.kind === "fqn" ? n.name : `#${n.objectNumber}`;
function K() {
  const n = k(), i = T(), c = j(), o = L(), l = P(), r = N((s) => s.target), g = N((s) => s.busy), { activeToolId: d } = z(), m = V("signature-maker"), [p, f] = y(null), [u, a] = y(null), [t, b] = y(null);
  I((s) => s.onInvalidationPredicted, (s) => b(c.getSignature(s.field)?.fieldName ?? M(s.field))), I((s) => s.onValidated, (s) => {
    s.verdicts.some((h) => h.summary === "invalid" && h.modifications.basis === "working-copy") || b(null);
  }), S(() => {
    R(i);
  }, [i]), S(() => {
    d !== "stamp" && f(null);
  }, [d]);
  const C = (s) => {
    if (a(null), r) {
      c.placeMark({ assetId: s.id }, { field: r }).catch((h) => {
        console.error("[embedpdf] placing the mark failed:", h), a(n("demo.signError"));
      });
      return;
    }
    f(s.id), i.armAsset(s.id).catch((h) => {
      console.error("[embedpdf] arm mark failed:", h), f(null), a(n("demo.stampsArmError"));
    });
  }, A = (o.libraries ?? "many") === "many" || l.length === 0, E = (o.kinds ?? ["signature", "initials"]).includes("initials");
  return /* @__PURE__ */ e("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [
      /* @__PURE__ */ e("div", {
        className: "min-h-0 flex-1 overflow-y-auto p-3",
        children: [l.length === 0 ? /* @__PURE__ */ e("div", {
          className: "flex flex-col items-center gap-3 px-4 py-8 text-center",
          children: [/* @__PURE__ */ e(x, {
            name: "signature",
            size: 32,
            className: "text-fg-muted"
          }), /* @__PURE__ */ e("p", {
            className: "text-fg-muted text-sm",
            children: n("demo.signaturesEmpty")
          })]
        }) : /* @__PURE__ */ e("ul", {
          className: "flex flex-col gap-3",
          children: l.map((s) => /* @__PURE__ */ e(U, {
            row: s,
            armedId: p,
            wantsInitials: E,
            onPick: C,
            onAddInitials: () => m.open({
              exclusive: "modal",
              props: { libraryId: s.libraryId }
            })
          }, s.libraryId))
        }), /* @__PURE__ */ e(F, {})]
      }),
      t && /* @__PURE__ */ e("div", {
        className: "border-border-subtle shrink-0 border-t px-3 py-2 text-xs text-amber-700",
        children: n("demo.signaturesInvalidating", { params: { field: t } })
      }),
      (u || r || p) && /* @__PURE__ */ e("div", {
        className: `border-border-subtle shrink-0 border-t px-3 py-2 text-xs ${u ? "text-red-600" : "text-fg-muted"}`,
        children: u ?? n(r ? g ? "demo.signSigning" : "demo.signaturesTargetHint" : "demo.signaturesArmedHint")
      }),
      A ? /* @__PURE__ */ e("div", {
        className: "border-border-subtle shrink-0 border-t p-3",
        children: /* @__PURE__ */ e("button", {
          type: "button",
          onClick: () => m.open({ exclusive: "modal" }),
          className: "border-border text-fg hover:bg-hover flex w-full items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm",
          children: [/* @__PURE__ */ e(x, {
            name: "plus",
            size: 16
          }), n("demo.signaturesNew")]
        })
      }) : null
    ]
  });
}
function U({ row: n, armedId: i, wantsInitials: c, onPick: o, onAddInitials: l }) {
  const r = k(), g = T(), [d, m] = y(null), p = async () => {
    const a = await g.exportLibrary(n.libraryId).catch(() => null);
    a && B(a, `${n.name || "signature"}.pdf`, "application/pdf");
  }, f = () => {
    const a = d?.trim();
    m(null), a && a !== n.name && g.updateLibrary(n.libraryId, { name: a });
  }, u = "text-fg-muted hover:text-fg grid h-6 w-6 shrink-0 place-items-center rounded";
  return /* @__PURE__ */ e("li", {
    className: "border-border-subtle rounded-md border p-2",
    children: [/* @__PURE__ */ e("div", {
      className: "flex items-center gap-1",
      children: [
        d !== null ? /* @__PURE__ */ e("input", {
          autoFocus: !0,
          value: d,
          onChange: (a) => m(a.target.value),
          onBlur: f,
          onKeyDown: (a) => {
            a.key === "Enter" && f(), a.key === "Escape" && m(null);
          },
          className: "border-border bg-surface text-fg min-w-0 flex-1 rounded border px-1.5 py-0.5 text-sm"
        }) : /* @__PURE__ */ e("span", {
          className: "text-fg min-w-0 flex-1 truncate text-sm font-medium",
          children: n.name
        }),
        /* @__PURE__ */ e(v, {
          label: r("demo.signaturesRename"),
          onClick: () => m(n.name),
          className: u,
          children: /* @__PURE__ */ e(x, {
            name: "pencilMarker",
            size: 13
          })
        }),
        /* @__PURE__ */ e(v, {
          label: r("demo.signaturesExport"),
          onClick: p,
          className: u,
          children: /* @__PURE__ */ e(x, {
            name: "download",
            size: 13
          })
        }),
        /* @__PURE__ */ e(v, {
          label: r("demo.signaturesRemove"),
          onClick: () => void g.deleteLibrary(n.libraryId),
          className: u,
          children: /* @__PURE__ */ e(x, {
            name: "trash",
            size: 13
          })
        })
      ]
    }), /* @__PURE__ */ e("div", {
      className: "mt-2 grid grid-cols-[2fr_1fr] gap-2",
      children: [n.signatures.map((a) => /* @__PURE__ */ e(w, {
        asset: a,
        label: r("demo.signatureLabel"),
        armed: i === a.id,
        onPick: () => o(a)
      }, a.id)), c ? n.initials ? /* @__PURE__ */ e(w, {
        asset: n.initials,
        label: r("demo.initialsLabel"),
        armed: i === n.initials.id,
        onPick: () => o(n.initials)
      }) : /* @__PURE__ */ e(v, {
        label: r("demo.signaturesAddInitials"),
        onClick: l,
        className: "border-border-subtle text-fg-muted hover:bg-hover flex h-16 items-center justify-center rounded-md border border-dashed text-xs",
        children: /* @__PURE__ */ e(x, {
          name: "plus",
          size: 14
        })
      }) : null]
    })]
  });
}
function w({ asset: n, label: i, armed: c, onPick: o }) {
  const l = D(n.id);
  return /* @__PURE__ */ e(v, {
    label: i,
    onClick: o,
    "aria-pressed": c,
    className: `flex h-16 items-center justify-center rounded-md border p-1 ${c ? "border-accent bg-accent-light ring-accent ring-2" : "border-border-subtle hover:border-border hover:bg-hover"}`,
    children: l ? /* @__PURE__ */ e("img", {
      src: l,
      alt: i,
      className: "max-h-full max-w-full object-contain"
    }) : /* @__PURE__ */ e("span", {
      className: "text-fg-muted text-xs",
      children: i
    })
  });
}
function F() {
  const n = k(), i = j(), c = $(q, (t) => t.getSnapshot()), o = N((t) => t.signatures), l = N((t) => t.target), [r, g] = y(!1), d = c?.signatures ?? [], m = (t) => o.find((b) => b.index === t.index)?.verdict ?? null, p = (t) => t ? t.summary === "valid" ? n("demo.verdictValid") : t.summary === "valid-untrusted" ? n("demo.verdictValidUntrusted") : t.summary === "indeterminate" ? n("demo.verdictIndeterminate") : t.modifications.basis === "working-copy" ? n("demo.verdictWillInvalidate") : n("demo.verdictInvalid") : n("demo.signaturesSigned"), f = (t) => !t || t.summary === "indeterminate" ? "text-fg-muted" : t.summary === "invalid" ? t.modifications.basis === "working-copy" ? "text-amber-600" : "text-red-600" : t.summary === "valid-untrusted" ? "text-amber-600" : "text-green-600", u = (t) => !!l && (l.kind === "fqn" ? l.name === t.fieldName : l.objectNumber === (t.field.kind === "objectNumber" ? t.field.objectNumber : -1)), a = () => {
    g(!0), i.validate().finally(() => g(!1));
  };
  return /* @__PURE__ */ e("div", {
    className: "mt-4",
    children: [/* @__PURE__ */ e("div", {
      className: "flex items-center justify-between",
      children: [/* @__PURE__ */ e("span", {
        className: "text-fg-muted text-xs font-semibold uppercase tracking-wide",
        children: n("demo.signaturesInDocument")
      }), d.some((t) => t.signed) ? /* @__PURE__ */ e("button", {
        type: "button",
        disabled: r,
        onClick: a,
        className: "text-accent text-xs hover:underline disabled:opacity-60",
        children: n(r ? "demo.signaturesValidating" : "demo.signaturesValidate")
      }) : null]
    }), d.length === 0 ? /* @__PURE__ */ e("p", {
      className: "text-fg-muted mt-1 text-xs",
      children: n("demo.signaturesNone")
    }) : /* @__PURE__ */ e("ul", {
      className: "mt-1 flex flex-col gap-1",
      children: d.map((t) => {
        const b = m(t);
        return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("button", {
          type: "button",
          onClick: () => t.signed ? i.requestInspection(t.field) : i.setTarget(t.field),
          className: `hover:bg-hover flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-sm ${u(t) ? "bg-accent-light" : ""}`,
          children: [
            /* @__PURE__ */ e(x, {
              name: t.signed ? "check" : "signature",
              size: 14,
              className: t.signed ? "text-green-600" : "text-fg-muted"
            }),
            /* @__PURE__ */ e("span", {
              className: "text-fg min-w-0 flex-1 truncate",
              children: t.fieldName
            }),
            /* @__PURE__ */ e("span", {
              className: `shrink-0 text-end text-xs ${t.signed ? f(b) : "text-fg-muted"}`,
              children: t.signed ? p(b) : n("demo.signaturesUnsigned")
            })
          ]
        }) }, t.index);
      })
    })]
  });
}
export {
  K as SignaturesPanel
};
//# sourceMappingURL=signatures-panel-QneSliC6-B-zJ-FPc.js.map
