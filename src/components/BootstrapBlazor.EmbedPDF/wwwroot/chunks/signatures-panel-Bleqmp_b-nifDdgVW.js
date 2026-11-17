import { u as k, aa as w, am as E, an as L, ao as V, ap as N, a0 as z, af as P, g as y, aq as I, r as S, ag as R, h as e, j as p, i as v, X as $, ar as q, ak as B, al as D } from "./wasm-url-asset-C3FjD8P-.js";
const M = (t) => t.kind === "fqn" ? t.name : `#${t.objectNumber}`;
function O() {
  const t = k(), i = w(), c = E(), m = L(), l = V(), r = N((s) => s.target), f = N((s) => s.busy), { activeToolId: d } = z(), u = P("signature-maker"), [h, b] = y(null), [g, a] = y(null), [n, x] = y(null);
  I((s) => s.onInvalidationPredicted, (s) => x(c.getSignature(s.field)?.fieldName ?? M(s.field))), I((s) => s.onValidated, (s) => {
    s.verdicts.some((o) => o.summary === "invalid" && o.modifications.basis === "working-copy") || x(null);
  }), S(() => {
    R(i);
  }, [i]), S(() => {
    d !== "stamp" && b(null);
  }, [d]);
  const C = (s) => {
    if (a(null), r) {
      c.placeMark({ assetId: s.id }, { field: r }).then((o) => {
        o.status === "signed" && o.result.validationInfoError && (console.error("[embedpdf] verification information not added:", o.result.validationInfoError), a(t("demo.signedWithoutValidationInfo")));
      }).catch((o) => {
        console.error("[embedpdf] placing the mark failed:", o), a(t("demo.signError"));
      });
      return;
    }
    b(s.id), i.armAsset(s.id).catch((o) => {
      console.error("[embedpdf] arm mark failed:", o), b(null), a(t("demo.stampsArmError"));
    });
  }, T = (m.libraries ?? "many") === "many" || l.length === 0, A = (m.kinds ?? ["signature", "initials"]).includes("initials");
  return /* @__PURE__ */ e("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: [
      /* @__PURE__ */ e("div", {
        className: "min-h-0 flex-1 overflow-y-auto p-3",
        children: [l.length === 0 ? /* @__PURE__ */ e("div", {
          className: "flex flex-col items-center gap-3 px-4 py-8 text-center",
          children: [/* @__PURE__ */ e(p, {
            name: "signature",
            size: 32,
            className: "text-fg-muted"
          }), /* @__PURE__ */ e("p", {
            className: "text-fg-muted text-sm",
            children: t("demo.signaturesEmpty")
          })]
        }) : /* @__PURE__ */ e("ul", {
          className: "flex flex-col gap-3",
          children: l.map((s) => /* @__PURE__ */ e(U, {
            row: s,
            armedId: h,
            wantsInitials: A,
            onPick: C,
            onAddInitials: () => u.open({
              exclusive: "modal",
              props: { libraryId: s.libraryId }
            })
          }, s.libraryId))
        }), /* @__PURE__ */ e(F, {})]
      }),
      n && /* @__PURE__ */ e("div", {
        className: "border-border-subtle shrink-0 border-t px-3 py-2 text-xs text-amber-700",
        children: t("demo.signaturesInvalidating", { params: { field: n } })
      }),
      (g || r || h) && /* @__PURE__ */ e("div", {
        className: `border-border-subtle shrink-0 border-t px-3 py-2 text-xs ${g ? "text-red-600" : "text-fg-muted"}`,
        children: g ?? t(r ? f ? "demo.signSigning" : "demo.signaturesTargetHint" : "demo.signaturesArmedHint")
      }),
      T ? /* @__PURE__ */ e("div", {
        className: "border-border-subtle shrink-0 border-t p-3",
        children: /* @__PURE__ */ e("button", {
          type: "button",
          onClick: () => u.open({ exclusive: "modal" }),
          className: "border-border text-fg hover:bg-hover flex w-full items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm",
          children: [/* @__PURE__ */ e(p, {
            name: "plus",
            size: 16
          }), t("demo.signaturesNew")]
        })
      }) : null
    ]
  });
}
function U({ row: t, armedId: i, wantsInitials: c, onPick: m, onAddInitials: l }) {
  const r = k(), f = w(), [d, u] = y(null), h = async () => {
    const a = await f.exportLibrary(t.libraryId).catch(() => null);
    a && B(a, `${t.name || "signature"}.pdf`, "application/pdf");
  }, b = () => {
    const a = d?.trim();
    u(null), a && a !== t.name && f.updateLibrary(t.libraryId, { name: a });
  }, g = "text-fg-muted hover:text-fg grid h-6 w-6 shrink-0 place-items-center rounded";
  return /* @__PURE__ */ e("li", {
    className: "border-border-subtle rounded-md border p-2",
    children: [/* @__PURE__ */ e("div", {
      className: "flex items-center gap-1",
      children: [
        d !== null ? /* @__PURE__ */ e("input", {
          autoFocus: !0,
          value: d,
          onChange: (a) => u(a.target.value),
          onBlur: b,
          onKeyDown: (a) => {
            a.key === "Enter" && b(), a.key === "Escape" && u(null);
          },
          className: "border-border bg-surface text-fg min-w-0 flex-1 rounded border px-1.5 py-0.5 text-sm"
        }) : /* @__PURE__ */ e("span", {
          className: "text-fg min-w-0 flex-1 truncate text-sm font-medium",
          children: t.name
        }),
        /* @__PURE__ */ e(v, {
          label: r("demo.signaturesRename"),
          onClick: () => u(t.name),
          className: g,
          children: /* @__PURE__ */ e(p, {
            name: "pencilMarker",
            size: 13
          })
        }),
        /* @__PURE__ */ e(v, {
          label: r("demo.signaturesExport"),
          onClick: h,
          className: g,
          children: /* @__PURE__ */ e(p, {
            name: "download",
            size: 13
          })
        }),
        /* @__PURE__ */ e(v, {
          label: r("demo.signaturesRemove"),
          onClick: () => void f.deleteLibrary(t.libraryId),
          className: g,
          children: /* @__PURE__ */ e(p, {
            name: "trash",
            size: 13
          })
        })
      ]
    }), /* @__PURE__ */ e("div", {
      className: "mt-2 grid grid-cols-[2fr_1fr] gap-2",
      children: [t.signatures.map((a) => /* @__PURE__ */ e(j, {
        asset: a,
        label: r("demo.signatureLabel"),
        armed: i === a.id,
        onPick: () => m(a)
      }, a.id)), c ? t.initials ? /* @__PURE__ */ e(j, {
        asset: t.initials,
        label: r("demo.initialsLabel"),
        armed: i === t.initials.id,
        onPick: () => m(t.initials)
      }) : /* @__PURE__ */ e(v, {
        label: r("demo.signaturesAddInitials"),
        onClick: l,
        className: "border-border-subtle text-fg-muted hover:bg-hover flex h-16 items-center justify-center rounded-md border border-dashed text-xs",
        children: /* @__PURE__ */ e(p, {
          name: "plus",
          size: 14
        })
      }) : null]
    })]
  });
}
function j({ asset: t, label: i, armed: c, onPick: m }) {
  const l = D(t.id);
  return /* @__PURE__ */ e(v, {
    label: i,
    onClick: m,
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
  const t = k(), i = E(), c = $(q, (n) => n.getSnapshot()), m = N((n) => n.signatures), l = N((n) => n.target), [r, f] = y(!1), d = c?.signatures ?? [], u = (n) => m.find((x) => x.index === n.index)?.verdict ?? null, h = (n) => n ? n.summary === "valid" ? t("demo.verdictValid") : n.summary === "valid-untrusted" ? t("demo.verdictValidUntrusted") : n.summary === "indeterminate" ? t("demo.verdictIndeterminate") : n.modifications.basis === "working-copy" ? t("demo.verdictWillInvalidate") : t("demo.verdictInvalid") : t("demo.signaturesSigned"), b = (n) => !n || n.summary === "indeterminate" ? "text-fg-muted" : n.summary === "invalid" ? n.modifications.basis === "working-copy" ? "text-amber-600" : "text-red-600" : n.summary === "valid-untrusted" ? "text-amber-600" : "text-green-600", g = (n) => !!l && (l.kind === "fqn" ? l.name === n.fieldName : l.objectNumber === (n.field.kind === "objectNumber" ? n.field.objectNumber : -1)), a = () => {
    f(!0), i.validate().finally(() => f(!1));
  };
  return /* @__PURE__ */ e("div", {
    className: "mt-4",
    children: [/* @__PURE__ */ e("div", {
      className: "flex items-center justify-between",
      children: [/* @__PURE__ */ e("span", {
        className: "text-fg-muted text-xs font-semibold uppercase tracking-wide",
        children: t("demo.signaturesInDocument")
      }), d.some((n) => n.signed) ? /* @__PURE__ */ e("button", {
        type: "button",
        disabled: r,
        onClick: a,
        className: "text-accent text-xs hover:underline disabled:opacity-60",
        children: t(r ? "demo.signaturesValidating" : "demo.signaturesValidate")
      }) : null]
    }), d.length === 0 ? /* @__PURE__ */ e("p", {
      className: "text-fg-muted mt-1 text-xs",
      children: t("demo.signaturesNone")
    }) : /* @__PURE__ */ e("ul", {
      className: "mt-1 flex flex-col gap-1",
      children: d.map((n) => {
        const x = u(n);
        return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e("button", {
          type: "button",
          onClick: () => n.signed ? i.requestInspection(n.field) : i.setTarget(n.field),
          className: `hover:bg-hover flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-sm ${g(n) ? "bg-accent-light" : ""}`,
          children: [
            /* @__PURE__ */ e(p, {
              name: n.signed ? "check" : "signature",
              size: 14,
              className: n.signed ? "text-green-600" : "text-fg-muted"
            }),
            /* @__PURE__ */ e("span", {
              className: "text-fg min-w-0 flex-1 truncate",
              children: n.fieldName
            }),
            /* @__PURE__ */ e("span", {
              className: `shrink-0 text-end text-xs ${n.signed ? b(x) : "text-fg-muted"}`,
              children: n.signed ? h(x) : t("demo.signaturesUnsigned")
            })
          ]
        }) }, n.index);
      })
    })]
  });
}
export {
  O as SignaturesPanel
};
//# sourceMappingURL=signatures-panel-Bleqmp_b-nifDdgVW.js.map
