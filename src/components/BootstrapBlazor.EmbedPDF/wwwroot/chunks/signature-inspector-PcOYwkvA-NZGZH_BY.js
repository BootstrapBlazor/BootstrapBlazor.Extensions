import { u as h, E as T, a6 as C, ad as y, ag as b, d as N, V as k, m as F, e as t, I as L, az as O, aa as j, an as z } from "./wasm-url-asset-BJXsMWLm.js";
const A = (e) => e ? e.summary === "valid" ? "demo.verdictValid" : e.summary === "valid-untrusted" ? "demo.verdictValidUntrusted" : e.summary === "invalid" ? e.modifications.basis === "working-copy" ? "demo.verdictWillInvalidate" : "demo.verdictInvalid" : "demo.verdictIndeterminate" : "demo.verdictIndeterminate", D = (e, l) => {
  const i = new Date(e);
  return Number.isNaN(i.getTime()) ? e : i.toLocaleString(l);
}, x = (e) => e === "valid" ? "text-green-600" : e === "invalid" ? "text-red-600" : e === "valid-untrusted" ? "text-amber-600" : "text-fg-muted";
function W() {
  const e = h(), l = T(), i = C("signature-inspector"), a = y(), p = b((m) => m.status);
  b((m) => m.signatures);
  const [c, r] = N(!1), o = i.props?.field, n = o ? a.getSignature(o) : null, s = o ? a.getVerdict(o) : null, u = n?.widget ?? null, w = k(z), f = (u && w?.getWidget(u)?.rect) ?? null;
  if (F(() => {
    !i.isOpen || !n?.signed || a.listVerdicts() || (r(!0), a.validate().finally(() => r(!1)));
  }, [i.isOpen, n?.index]), !i.isOpen || !o || !n || p !== "ready") return null;
  const I = () => {
    r(!0), a.validate().finally(() => r(!1));
  }, S = s?.summary ?? null, g = s?.modifications.verdict ?? null, d = (m, V, R = "text-fg") => /* @__PURE__ */ t("div", {
    className: "flex items-baseline justify-between gap-3 text-xs",
    children: [/* @__PURE__ */ t("span", {
      className: "text-fg-muted",
      children: m
    }), /* @__PURE__ */ t("span", {
      className: `text-end ${R}`,
      children: V
    })]
  }), v = /* @__PURE__ */ t("div", {
    className: "border-border bg-elevated w-72 rounded-lg border p-3 text-sm shadow-xl",
    children: [
      /* @__PURE__ */ t("div", {
        className: "flex items-center justify-between",
        children: [/* @__PURE__ */ t("span", {
          className: "text-fg font-semibold",
          children: e("demo.inspectTitle")
        }), /* @__PURE__ */ t("button", {
          type: "button",
          onClick: i.close,
          className: "text-fg-muted hover:bg-hover grid h-6 w-6 place-items-center rounded",
          "aria-label": e("demo.cancel"),
          children: /* @__PURE__ */ t(L, {
            name: "x",
            size: 14
          })
        })]
      }),
      /* @__PURE__ */ t("p", {
        className: `mt-1 text-sm font-medium ${x(S)}`,
        children: e(c ? "demo.signaturesValidating" : A(s))
      }),
      /* @__PURE__ */ t("div", {
        className: "mt-2 flex flex-col gap-1",
        children: [
          d(e("demo.inspectSigner"), n.signer.name ?? "—"),
          n.signer.reason ? d(e("demo.inspectReason"), n.signer.reason) : null,
          n.signer.location ? d(e("demo.inspectLocation"), n.signer.location) : null,
          n.signer.signedAt ? d(e("demo.inspectTime"), D(n.signer.signedAt, l)) : null
        ]
      }),
      /* @__PURE__ */ t("div", {
        className: "border-border-subtle mt-2 flex flex-col gap-1 border-t pt-2",
        children: [
          d(e("demo.inspectIntegrity"), s?.integrity ?? "—", x(s?.integrity === "valid" ? "valid" : s?.integrity === "invalid" ? "invalid" : null)),
          d(e("demo.inspectCryptography"), s?.cryptography ?? "—"),
          d(e("demo.inspectTrust"), s?.trust ?? "—"),
          d(e("demo.inspectChanges"), g === "unchanged" ? s?.modifications.undone ? e("demo.verdictRestored") : e("demo.verdictUnchanged") : g === "permitted" ? e("demo.verdictPermitted") : g === "forbidden" ? e("demo.verdictForbidden") : "—", g === "forbidden" ? "text-red-600" : "text-fg"),
          s?.modifications.laterRevisions ? d(e("demo.inspectLaterRevisions"), String(s.modifications.laterRevisions)) : null
        ]
      }),
      /* @__PURE__ */ t("div", {
        className: "mt-3 flex justify-end gap-2",
        children: [/* @__PURE__ */ t("button", {
          type: "button",
          disabled: c,
          onClick: I,
          className: "border-border text-fg hover:bg-hover rounded-md border px-2 py-1 text-xs disabled:opacity-60",
          children: e("demo.signaturesValidate")
        }), /* @__PURE__ */ t($, { field: o })]
      })
    ]
  });
  return u?.page && f ? /* @__PURE__ */ t(O, {
    anchor: {
      page: u.page,
      bounds: f
    },
    placement: "bottom",
    gap: 8,
    children: v
  }) : /* @__PURE__ */ t("div", {
    className: "absolute end-4 top-4 z-40",
    children: v
  });
}
function $({ field: e }) {
  const l = h(), i = y(), a = i.getSignature(e), [p, c] = N(!1);
  if (!a || a.revisionIndex === null) return null;
  const r = a.revisionIndex, o = async () => {
    c(!0);
    try {
      j(await i.readRevision({ revisionIndex: r }), `${a.fieldName}-signed.pdf`, "application/pdf");
    } catch (n) {
      console.error("[embedpdf] signed revision download failed:", n);
    } finally {
      c(!1);
    }
  };
  return /* @__PURE__ */ t("button", {
    type: "button",
    disabled: p,
    onClick: () => void o(),
    className: "border-border text-fg hover:bg-hover rounded-md border px-2 py-1 text-xs disabled:opacity-60",
    children: l("demo.inspectDownload")
  });
}
export {
  W as SignatureInspector
};
//# sourceMappingURL=signature-inspector-PcOYwkvA-NZGZH_BY.js.map
