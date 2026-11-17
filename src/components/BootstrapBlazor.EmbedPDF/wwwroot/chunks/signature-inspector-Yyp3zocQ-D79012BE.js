import { u as C, K as O, a6 as z, ac as D, af as R, k as h, _ as P, v as $, l as t, m as G, az as W } from "./init-D01edhbm.js";
import { saveFile as _ } from "@embedpdf/web";
import { isPluginError as B } from "@embedpdf/core";
import { FormToken as Y } from "@embedpdf/plugin-form";
const q = (e) => e ? e.summary === "valid" ? "demo.verdictValid" : e.summary === "valid-untrusted" ? "demo.verdictValidUntrusted" : e.summary === "invalid" ? e.modifications.basis === "working-copy" ? "demo.verdictWillInvalidate" : "demo.verdictInvalid" : "demo.verdictIndeterminate" : "demo.verdictIndeterminate", H = (e, r) => {
  const i = new Date(e);
  return Number.isNaN(i.getTime()) ? e : i.toLocaleDateString(r, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}, J = {
  "no-timestamp": "demo.longTermNoTimestamp",
  untrusted: "demo.longTermUntrusted",
  "no-answer": "demo.longTermNoAnswer",
  revoked: "demo.longTermRevoked"
}, M = (e) => B(e) && e.cause?.code === "Network" ? "demo.longTermAddUnreachable" : "demo.longTermAddFailed", V = (e, r) => {
  const i = new Date(e);
  return Number.isNaN(i.getTime()) ? e : i.toLocaleString(r);
}, T = (e) => e === "valid" ? "text-green-600" : e === "invalid" ? "text-red-600" : e === "valid-untrusted" ? "text-amber-600" : "text-fg-muted";
function ne() {
  const e = C(), r = O(), i = z("signature-inspector"), a = D(), y = R((l) => l.status);
  R((l) => l.signatures);
  const [g, m] = h(!1), [p, f] = h(!1), [w, A] = h(null), c = i.props?.field, d = c ? a.getSignature(c) : null, n = c ? a.getVerdict(c) : null, b = d?.widget ?? null, E = P(Y), v = (b && E?.getWidget(b)?.rect) ?? null, k = v && v.width > 0 && v.height > 0 ? v : null;
  if ($(() => {
    !i.isOpen || !d?.signed || a.listVerdicts() || (m(!0), a.validate().finally(() => m(!1)));
  }, [i.isOpen, d?.index]), !i.isOpen || !c || !d || y !== "ready") return null;
  const F = () => {
    m(!0), a.validate().finally(() => m(!1));
  }, s = n?.longTerm ?? null, N = s?.missing[0] ?? null, I = s ? s.enabled ? s.expiresAt ? e("demo.longTermUntil", { params: { date: H(s.expiresAt, r) } }) : null : N ? e(J[N.reason], { params: { name: N.certificate ?? e("demo.longTermUnnamed") } }) : null : null, L = () => {
    f(!0), A(null), a.addValidationInfo(c).catch((l) => {
      console.error("[embedpdf] adding verification information failed:", l), A(e(M(l)));
    }).finally(() => f(!1));
  }, U = n?.summary ?? null, x = n?.modifications.verdict ?? null, u = n?.timestamp ?? null, o = (l, j, K = "text-fg") => /* @__PURE__ */ t("div", {
    className: "flex items-baseline justify-between gap-3 text-xs",
    children: [/* @__PURE__ */ t("span", {
      className: "text-fg-muted",
      children: l
    }), /* @__PURE__ */ t("span", {
      className: `text-end ${K}`,
      children: j
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
          onClick: i.close,
          className: "text-fg-muted hover:bg-hover grid h-6 w-6 place-items-center rounded",
          "aria-label": e("demo.cancel"),
          children: /* @__PURE__ */ t(G, {
            name: "x",
            size: 14
          })
        })]
      }),
      /* @__PURE__ */ t("p", {
        className: `mt-1 text-sm font-medium ${T(U)}`,
        children: e(g ? "demo.signaturesValidating" : q(n))
      }),
      /* @__PURE__ */ t("div", {
        className: "mt-2 flex flex-col gap-1",
        children: [
          o(e("demo.inspectSigner"), d.signer.name ?? "—"),
          d.signer.reason ? o(e("demo.inspectReason"), d.signer.reason) : null,
          d.signer.location ? o(e("demo.inspectLocation"), d.signer.location) : null,
          d.signer.signedAt ? o(e("demo.inspectTime"), V(d.signer.signedAt, r)) : null,
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
          o(e("demo.inspectIntegrity"), n?.integrity ?? "—", T(n?.integrity === "valid" ? "valid" : n?.integrity === "invalid" ? "invalid" : null)),
          o(e("demo.inspectCryptography"), n?.cryptography ?? "—"),
          o(e("demo.inspectTrust"), n?.trust ?? "—"),
          n?.revocation === "good" ? o(e("demo.inspectRevocation"), e("demo.revocationGood")) : n?.revocation === "revoked" ? o(e("demo.inspectRevocation"), e("demo.revocationRevoked"), "text-red-600") : null,
          o(e("demo.inspectChanges"), x === "unchanged" ? n?.modifications.undone ? e("demo.verdictRestored") : e("demo.verdictUnchanged") : x === "permitted" ? e("demo.verdictPermitted") : x === "forbidden" ? e("demo.verdictForbidden") : "—", x === "forbidden" ? "text-red-600" : "text-fg"),
          n?.modifications.laterRevisions ? o(e("demo.inspectLaterRevisions"), String(n.modifications.laterRevisions)) : null,
          s ? /* @__PURE__ */ t("div", {
            className: "flex items-baseline justify-between gap-3 text-xs",
            "data-long-term": !0,
            children: [/* @__PURE__ */ t("span", {
              className: "text-fg-muted shrink-0",
              children: e("demo.inspectLongTerm")
            }), /* @__PURE__ */ t("span", {
              className: "text-end",
              children: [/* @__PURE__ */ t("span", {
                className: s.enabled ? "text-green-600" : "text-fg",
                children: e(s.enabled ? "demo.longTermEnabled" : "demo.longTermNotEnabled")
              }), I ? /* @__PURE__ */ t("span", {
                className: "text-fg-muted block",
                children: I
              }) : null]
            })]
          }) : null
        ]
      }),
      s && !s.enabled && a.canAddValidationInfo() ? /* @__PURE__ */ t("div", {
        className: "mt-2",
        children: [/* @__PURE__ */ t("button", {
          type: "button",
          disabled: p,
          onClick: L,
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
          onClick: F,
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
  const r = C(), i = D(), a = i.getSignature(e), [y, g] = h(!1);
  if (!a || a.revisionIndex === null) return null;
  const m = a.revisionIndex, p = async () => {
    g(!0);
    try {
      _(await i.readRevision({ revisionIndex: m }), `${a.fieldName}-signed.pdf`, "application/pdf");
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
  ne as SignatureInspector
};
//# sourceMappingURL=signature-inspector-Yyp3zocQ-D79012BE.js.map
