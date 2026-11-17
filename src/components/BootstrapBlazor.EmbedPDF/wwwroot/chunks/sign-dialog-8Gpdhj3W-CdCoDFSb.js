import { u as E, a6 as T, ac as j, k as r, am as B, ab as L, l as e, Q as w } from "./init-D01edhbm.js";
import { isPluginError as A } from "@embedpdf/core";
function R(t) {
  if (!A(t)) return null;
  const { details: n, cause: l } = t;
  return n?.authority ? l?.code === "Network" ? "demo.signTimestampUnreachable" : "demo.signTimestampRefused" : null;
}
function U() {
  const t = E(), n = T("signature-sign"), l = j(), [m, K] = r(""), [u, S] = r(""), [g, F] = r("approval"), [a, f] = r(null), [p, x] = r(null), [h, y] = r(null), c = B(), d = n.props?.field, i = n.props?.mark, v = L(i && "assetId" in i ? i.assetId : null);
  if (!n.isOpen || !d || !i) return null;
  const I = {
    ...m.trim() ? { reason: m.trim() } : {},
    ...u.trim() ? { location: u.trim() } : {}
  }, N = async (s) => {
    f(s), x(null);
    try {
      if (s === "sign") {
        const o = await l.sign({
          field: d,
          mark: i,
          signer: I,
          ...g !== "approval" && l.canCertify() ? { certify: { permission: Number(g.slice(-1)) } } : {}
        });
        if (o.validationInfoError) {
          console.error("[embedpdf] verification information not added:", o.validationInfoError), y(t("demo.signedWithoutValidationInfo"));
          return;
        }
      } else await l.fillField(d, i);
      n.close();
    } catch (o) {
      const k = R(o);
      x(k ? t(k) : o instanceof Error ? o.message : String(o));
    } finally {
      f(null);
    }
  }, b = "border-border bg-surface text-fg w-full rounded border px-2 py-1.5 text-sm", C = () => {
    y(null), n.close();
  };
  return h ? /* @__PURE__ */ e(w, {
    labelledBy: c,
    onClose: C,
    className: "border-border bg-surface w-96 rounded-lg border p-4 shadow-xl",
    children: [
      /* @__PURE__ */ e("h2", {
        id: c,
        className: "text-fg text-base font-semibold",
        children: t("demo.signTitle")
      }),
      /* @__PURE__ */ e("p", {
        className: "mt-3 text-sm text-amber-600",
        children: h
      }),
      /* @__PURE__ */ e("div", {
        className: "mt-4 flex justify-end",
        children: /* @__PURE__ */ e("button", {
          type: "button",
          onClick: C,
          className: "bg-accent text-on-accent rounded-md px-3 py-1.5 text-sm",
          children: t("panel.close")
        })
      })
    ]
  }) : /* @__PURE__ */ e(w, {
    labelledBy: c,
    onClose: () => {
      a == null && n.close();
    },
    className: "border-border bg-surface w-96 rounded-lg border p-4 shadow-xl",
    children: [
      /* @__PURE__ */ e("h2", {
        id: c,
        className: "text-fg text-base font-semibold",
        children: t("demo.signTitle")
      }),
      /* @__PURE__ */ e("div", {
        className: "border-border-subtle mt-3 flex h-24 items-center justify-center rounded-md border p-2",
        children: v ? /* @__PURE__ */ e("img", {
          src: v,
          alt: "",
          className: "max-h-full max-w-full object-contain"
        }) : /* @__PURE__ */ e("span", {
          className: "text-fg-muted text-sm",
          children: t("demo.signatureLabel")
        })
      }),
      /* @__PURE__ */ e("label", {
        className: "text-fg-muted mt-3 block text-xs",
        children: [t("demo.signReason"), /* @__PURE__ */ e("input", {
          value: m,
          onChange: (s) => K(s.target.value),
          className: b
        })]
      }),
      /* @__PURE__ */ e("label", {
        className: "text-fg-muted mt-2 block text-xs",
        children: [t("demo.signLocation"), /* @__PURE__ */ e("input", {
          value: u,
          onChange: (s) => S(s.target.value),
          className: b
        })]
      }),
      l.canCertify() ? /* @__PURE__ */ e("label", {
        className: "text-fg-muted mt-3 block text-xs",
        children: [t("demo.signKind"), /* @__PURE__ */ e("select", {
          value: g,
          onChange: (s) => F(s.target.value),
          className: b,
          children: [
            /* @__PURE__ */ e("option", {
              value: "approval",
              children: t("demo.signKindApproval")
            }),
            /* @__PURE__ */ e("option", {
              value: "certify-3",
              children: t("demo.signKindCertifyAnnotate")
            }),
            /* @__PURE__ */ e("option", {
              value: "certify-2",
              children: t("demo.signKindCertifyFill")
            }),
            /* @__PURE__ */ e("option", {
              value: "certify-1",
              children: t("demo.signKindCertifyLocked")
            })
          ]
        })]
      }) : null,
      p ? /* @__PURE__ */ e("p", {
        className: "mt-2 text-sm text-red-600",
        children: p
      }) : null,
      /* @__PURE__ */ e("div", {
        className: "mt-4 flex justify-end gap-2",
        children: [
          /* @__PURE__ */ e("button", {
            type: "button",
            disabled: a != null,
            onClick: n.close,
            className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
            children: t("demo.cancel")
          }),
          l.canFill(d) ? /* @__PURE__ */ e("button", {
            type: "button",
            disabled: a != null,
            onClick: () => void N("fill"),
            className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm disabled:opacity-60",
            children: t("demo.signFill")
          }) : null,
          l.canSign(d) ? /* @__PURE__ */ e("button", {
            type: "button",
            disabled: a != null,
            onClick: () => void N("sign"),
            className: "bg-accent text-on-accent rounded-md px-3 py-1.5 text-sm disabled:opacity-60",
            children: t(a === "sign" ? "demo.signSigning" : "demo.signButton")
          }) : null
        ]
      })
    ]
  });
}
export {
  U as SignDialog
};
//# sourceMappingURL=sign-dialog-8Gpdhj3W-CdCoDFSb.js.map
