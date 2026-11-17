import { u as C, N as K, af as P, am as j, ap as R, g as h, a3 as $, r as z, h as t, j as G, aJ as W, aC as B, ak as J, aw as Y } from "./wasm-url-asset-C3FjD8P-.js";
const _ = (e) => e ? e.summary === "valid" ? "demo.verdictValid" : e.summary === "valid-untrusted" ? "demo.verdictValidUntrusted" : e.summary === "invalid" ? e.modifications.basis === "working-copy" ? "demo.verdictWillInvalidate" : "demo.verdictInvalid" : "demo.verdictIndeterminate" : "demo.verdictIndeterminate", q = (e, r) => {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleDateString(r, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}, H = {
  "no-timestamp": "demo.longTermNoTimestamp",
  untrusted: "demo.longTermUntrusted",
  "no-answer": "demo.longTermNoAnswer",
  revoked: "demo.longTermRevoked"
}, M = (e) => B(e) && e.cause?.code === "Network" ? "demo.longTermAddUnreachable" : "demo.longTermAddFailed", V = (e, r) => {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString(r);
}, T = (e) => e === "valid" ? "text-green-600" : e === "invalid" ? "text-red-600" : e === "valid-untrusted" ? "text-amber-600" : "text-fg-muted";
function Z() {
  const e = C(), r = K(), a = P("signature-inspector"), i = j(), y = R((l) => l.status);
  R((l) => l.signatures);
  const [g, m] = h(!1), [p, f] = h(!1), [w, A] = h(null), c = a.props?.field, d = c ? i.getSignature(c) : null, n = c ? i.getVerdict(c) : null, b = d?.widget ?? null, D = $(Y), v = (b && D?.getWidget(b)?.rect) ?? null, k = v && v.width > 0 && v.height > 0 ? v : null;
  if (z(() => {
    !a.isOpen || !d?.signed || i.listVerdicts() || (m(!0), i.validate().finally(() => m(!1)));
  }, [a.isOpen, d?.index]), !a.isOpen || !c || !d || y !== "ready") return null;
  const E = () => {
    m(!0), i.validate().finally(() => m(!1));
  }, o = n?.longTerm ?? null, N = o?.missing[0] ?? null, I = o ? o.enabled ? o.expiresAt ? e("demo.longTermUntil", { params: { date: q(o.expiresAt, r) } }) : null : N ? e(H[N.reason], { params: { name: N.certificate ?? e("demo.longTermUnnamed") } }) : null : null, F = () => {
    f(!0), A(null), i.addValidationInfo(c).catch((l) => {
      console.error("[embedpdf] adding verification information failed:", l), A(e(M(l)));
    }).finally(() => f(!1));
  }, L = n?.summary ?? null, x = n?.modifications.verdict ?? null, u = n?.timestamp ?? null, s = (l, U, O = "text-fg") => /* @__PURE__ */ t("div", {
    className: "flex items-baseline justify-between gap-3 text-xs",
    children: [/* @__PURE__ */ t("span", {
      className: "text-fg-muted",
      children: l
    }), /* @__PURE__ */ t("span", {
      className: `text-end ${O}`,
      children: U
    })]
  }), S = /* @__PURE__ */ t("div", {
    className: "border-border bg-elevated w-72 rounded-lg border p-3 text-sm shadow-xl",
    children: [
      /* @__PURE__ */ t("div", {
        className: "flex items-center justify-between",
        children: [/* @__PURE__ */ t("span", {
          className: "text-fg font-semibold",
          children: e("demo.inspectTitle")
        }), /* @__PURE__ */ t("button", {
          type: "button",
          onClick: a.close,
          className: "text-fg-muted hover:bg-hover grid h-6 w-6 place-items-center rounded",
          "aria-label": e("demo.cancel"),
          children: /* @__PURE__ */ t(G, {
            name: "x",
            size: 14
          })
        })]
      }),
      /* @__PURE__ */ t("p", {
        className: `mt-1 text-sm font-medium ${T(L)}`,
        children: e(g ? "demo.signaturesValidating" : _(n))
      }),
      /* @__PURE__ */ t("div", {
        className: "mt-2 flex flex-col gap-1",
        children: [
          s(e("demo.inspectSigner"), d.signer.name ?? "—"),
          d.signer.reason ? s(e("demo.inspectReason"), d.signer.reason) : null,
          d.signer.location ? s(e("demo.inspectLocation"), d.signer.location) : null,
          d.signer.signedAt ? s(e("demo.inspectTime"), V(d.signer.signedAt, r)) : null,
          u ? /* @__PURE__ */ t("div", {
            className: "flex items-baseline justify-between gap-3 text-xs",
            children: [/* @__PURE__ */ t("span", {
              className: "text-fg-muted",
              children: e("demo.inspectTimestamp")
            }), /* @__PURE__ */ t("span", {
              className: "text-end",
              children: [/* @__PURE__ */ t("span", {
                className: T(u.summary),
                children: u.stampedAt ? V(u.stampedAt, r) : "—"
              }), u.authorityName ? /* @__PURE__ */ t("span", {
                className: "text-fg-muted block",
                children: u.authorityName
              }) : null]
            })]
          }) : null
        ]
      }),
      /* @__PURE__ */ t("div", {
        className: "border-border-subtle mt-2 flex flex-col gap-1 border-t pt-2",
        children: [
          s(e("demo.inspectIntegrity"), n?.integrity ?? "—", T(n?.integrity === "valid" ? "valid" : n?.integrity === "invalid" ? "invalid" : null)),
          s(e("demo.inspectCryptography"), n?.cryptography ?? "—"),
          s(e("demo.inspectTrust"), n?.trust ?? "—"),
          n?.revocation === "good" ? s(e("demo.inspectRevocation"), e("demo.revocationGood")) : n?.revocation === "revoked" ? s(e("demo.inspectRevocation"), e("demo.revocationRevoked"), "text-red-600") : null,
          s(e("demo.inspectChanges"), x === "unchanged" ? n?.modifications.undone ? e("demo.verdictRestored") : e("demo.verdictUnchanged") : x === "permitted" ? e("demo.verdictPermitted") : x === "forbidden" ? e("demo.verdictForbidden") : "—", x === "forbidden" ? "text-red-600" : "text-fg"),
          n?.modifications.laterRevisions ? s(e("demo.inspectLaterRevisions"), String(n.modifications.laterRevisions)) : null,
          o ? /* @__PURE__ */ t("div", {
            className: "flex items-baseline justify-between gap-3 text-xs",
            "data-long-term": !0,
            children: [/* @__PURE__ */ t("span", {
              className: "text-fg-muted shrink-0",
              children: e("demo.inspectLongTerm")
            }), /* @__PURE__ */ t("span", {
              className: "text-end",
              children: [/* @__PURE__ */ t("span", {
                className: o.enabled ? "text-green-600" : "text-fg",
                children: e(o.enabled ? "demo.longTermEnabled" : "demo.longTermNotEnabled")
              }), I ? /* @__PURE__ */ t("span", {
                className: "text-fg-muted block",
                children: I
              }) : null]
            })]
          }) : null
        ]
      }),
      o && !o.enabled && i.canAddValidationInfo() ? /* @__PURE__ */ t("div", {
        className: "mt-2",
        children: [/* @__PURE__ */ t("button", {
          type: "button",
          disabled: p,
          onClick: F,
          className: "border-border text-fg hover:bg-hover w-full rounded-md border px-2 py-1 text-xs disabled:opacity-60",
          children: e(p ? "demo.longTermAdding" : "demo.longTermAdd")
        }), w ? /* @__PURE__ */ t("p", {
          className: "mt-1 text-xs text-red-600",
          children: w
        }) : null]
      }) : null,
      /* @__PURE__ */ t("div", {
        className: "mt-3 flex justify-end gap-2",
        children: [/* @__PURE__ */ t("button", {
          type: "button",
          disabled: g,
          onClick: E,
          className: "border-border text-fg hover:bg-hover rounded-md border px-2 py-1 text-xs disabled:opacity-60",
          children: e("demo.signaturesValidate")
        }), /* @__PURE__ */ t(Q, { field: c })]
      })
    ]
  });
  return b?.page && k ? /* @__PURE__ */ t(W, {
    anchor: {
      page: b.page,
      bounds: k
    },
    placement: "bottom",
    gap: 8,
    children: S
  }) : /* @__PURE__ */ t("div", {
    className: "absolute end-4 top-4 z-40",
    children: S
  });
}
function Q({ field: e }) {
  const r = C(), a = j(), i = a.getSignature(e), [y, g] = h(!1);
  if (!i || i.revisionIndex === null) return null;
  const m = i.revisionIndex, p = async () => {
    g(!0);
    try {
      J(await a.readRevision({ revisionIndex: m }), `${i.fieldName}-signed.pdf`, "application/pdf");
    } catch (f) {
      console.error("[embedpdf] signed revision download failed:", f);
    } finally {
      g(!1);
    }
  };
  return /* @__PURE__ */ t("button", {
    type: "button",
    disabled: y,
    onClick: () => void p(),
    className: "border-border text-fg hover:bg-hover rounded-md border px-2 py-1 text-xs disabled:opacity-60",
    children: r("demo.inspectDownload")
  });
}
export {
  Z as SignatureInspector
};
//# sourceMappingURL=signature-inspector-Yyp3zocQ-frSNAke8.js.map
