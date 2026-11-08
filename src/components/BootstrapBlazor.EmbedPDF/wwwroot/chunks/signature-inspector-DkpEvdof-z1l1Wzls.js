import { u as x, a5 as T, ac as h, af as v, d as y, U as V, m as C, e as t, I as k, aB as O, a9 as j, ap as A } from "./wasm-url-asset-DQFmMC86.js";
const D = (e) => e ? e.summary === "valid" ? "demo.verdictValid" : e.summary === "valid-untrusted" ? "demo.verdictValidUntrusted" : e.summary === "invalid" ? e.modifications.basis === "working-copy" ? "demo.verdictWillInvalidate" : "demo.verdictInvalid" : "demo.verdictIndeterminate" : "demo.verdictIndeterminate", F = (e) => {
  const s = new Date(e);
  return Number.isNaN(s.getTime()) ? e : s.toLocaleString();
}, b = (e) => e === "valid" ? "text-green-600" : e === "invalid" ? "text-red-600" : e === "valid-untrusted" ? "text-amber-600" : "text-fg-muted";
function $() {
  const e = x(), s = T("signature-inspector"), a = h(), l = v((c) => c.status);
  v((c) => c.signatures);
  const [m, r] = y(!1), o = s.props?.field, n = o ? a.getSignature(o) : null, i = o ? a.getVerdict(o) : null, u = n?.widget ?? null, N = V(A), p = (u && N?.getWidget(u)?.rect) ?? null;
  if (C(() => {
    !s.isOpen || !n?.signed || a.listVerdicts() || (r(!0), a.validate().finally(() => r(!1)));
  }, [s.isOpen, n?.index]), !s.isOpen || !o || !n || l !== "ready") return null;
  const w = () => {
    r(!0), a.validate().finally(() => r(!1));
  }, I = i?.summary ?? null, g = i?.modifications.verdict ?? null, d = (c, S, R = "text-fg") => /* @__PURE__ */ t("div", {
    className: "flex items-baseline justify-between gap-3 text-xs",
    children: [/* @__PURE__ */ t("span", {
      className: "text-fg-muted",
      children: c
    }), /* @__PURE__ */ t("span", {
      className: `text-end ${R}`,
      children: S
    })]
  }), f = /* @__PURE__ */ t("div", {
    className: "border-border bg-elevated w-72 rounded-lg border p-3 text-sm shadow-xl",
    children: [
      /* @__PURE__ */ t("div", {
        className: "flex items-center justify-between",
        children: [/* @__PURE__ */ t("span", {
          className: "text-fg font-semibold",
          children: e("demo.inspectTitle")
        }), /* @__PURE__ */ t("button", {
          type: "button",
          onClick: s.close,
          className: "text-fg-muted hover:bg-hover grid h-6 w-6 place-items-center rounded",
          "aria-label": e("demo.cancel"),
          children: /* @__PURE__ */ t(k, {
            name: "x",
            size: 14
          })
        })]
      }),
      /* @__PURE__ */ t("p", {
        className: `mt-1 text-sm font-medium ${b(I)}`,
        children: e(m ? "demo.signaturesValidating" : D(i))
      }),
      /* @__PURE__ */ t("div", {
        className: "mt-2 flex flex-col gap-1",
        children: [
          d(e("demo.inspectSigner"), n.signer.name ?? "—"),
          n.signer.reason ? d(e("demo.inspectReason"), n.signer.reason) : null,
          n.signer.location ? d(e("demo.inspectLocation"), n.signer.location) : null,
          n.signer.signedAt ? d(e("demo.inspectTime"), F(n.signer.signedAt)) : null
        ]
      }),
      /* @__PURE__ */ t("div", {
        className: "border-border-subtle mt-2 flex flex-col gap-1 border-t pt-2",
        children: [
          d(e("demo.inspectIntegrity"), i?.integrity ?? "—", b(i?.integrity === "valid" ? "valid" : i?.integrity === "invalid" ? "invalid" : null)),
          d(e("demo.inspectCryptography"), i?.cryptography ?? "—"),
          d(e("demo.inspectTrust"), i?.trust ?? "—"),
          d(e("demo.inspectChanges"), g === "unchanged" ? i?.modifications.undone ? e("demo.verdictRestored") : e("demo.verdictUnchanged") : g === "permitted" ? e("demo.verdictPermitted") : g === "forbidden" ? e("demo.verdictForbidden") : "—", g === "forbidden" ? "text-red-600" : "text-fg"),
          i?.modifications.laterRevisions ? d(e("demo.inspectLaterRevisions"), String(i.modifications.laterRevisions)) : null
        ]
      }),
      /* @__PURE__ */ t("div", {
        className: "mt-3 flex justify-end gap-2",
        children: [/* @__PURE__ */ t("button", {
          type: "button",
          disabled: m,
          onClick: w,
          className: "border-border text-fg hover:bg-hover rounded-md border px-2 py-1 text-xs disabled:opacity-60",
          children: e("demo.signaturesValidate")
        }), /* @__PURE__ */ t(L, { field: o })]
      })
    ]
  });
  return u?.page && p ? /* @__PURE__ */ t(O, {
    anchor: {
      page: u.page,
      bounds: p
    },
    placement: "bottom",
    gap: 8,
    children: f
  }) : /* @__PURE__ */ t("div", {
    className: "absolute end-4 top-4 z-40",
    children: f
  });
}
function L({ field: e }) {
  const s = x(), a = h(), l = a.getSignature(e), [m, r] = y(!1);
  if (!l || l.revisionIndex === null) return null;
  const o = l.revisionIndex, n = async () => {
    r(!0);
    try {
      j(await a.readRevision({ revisionIndex: o }), `${l.fieldName}-signed.pdf`, "application/pdf");
    } catch (i) {
      console.error("[embedpdf] signed revision download failed:", i);
    } finally {
      r(!1);
    }
  };
  return /* @__PURE__ */ t("button", {
    type: "button",
    disabled: m,
    onClick: () => void n(),
    className: "border-border text-fg hover:bg-hover rounded-md border px-2 py-1 text-xs disabled:opacity-60",
    children: s("demo.inspectDownload")
  });
}
export {
  $ as SignatureInspector
};
//# sourceMappingURL=signature-inspector-DkpEvdof-z1l1Wzls.js.map
