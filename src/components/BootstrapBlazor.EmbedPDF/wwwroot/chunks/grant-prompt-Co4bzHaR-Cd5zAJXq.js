import { O as k, aD as E, e, aE as F, aB as v, u as x, as as y, d as p, L as T, I as R } from "./wasm-url-asset-BJXsMWLm.js";
const N = [
  "displayName",
  "email",
  "title",
  "organization",
  "organizationalUnit"
], U = {
  displayName: "name",
  email: "email",
  title: "organization-title",
  organization: "organization",
  organizationalUnit: "off"
}, $ = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function h(t) {
  return N.filter((n) => {
    const a = t[n]?.trim();
    return a ? n === "email" ? a.length > 254 || !$.test(a) : a.length > 256 : !1;
  });
}
const I = (t) => N.filter((n) => t.fields[n] !== void 0), b = (t, n) => I(t).every((a) => t.fields[a] !== "required" || !!n[a]?.trim());
function D(t) {
  const n = {};
  for (const a of N) {
    const l = t[a]?.trim();
    l && (n[a] = l);
  }
  return n;
}
const S = "bg-surface border-border focus:border-accent focus:ring-accent text-fg placeholder:text-fg-muted block w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 disabled:opacity-50", P = "border-border text-fg-secondary hover:bg-hover flex-1 cursor-pointer rounded-md border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50", w = "bg-accent text-on-accent flex-1 cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
function A({ request: t, answers: n, onChange: a, invalid: l, disabled: c }) {
  const s = x(), r = y(), d = I(t);
  return /* @__PURE__ */ e("div", {
    className: "flex flex-col gap-4",
    children: [
      /* @__PURE__ */ e("p", {
        className: "text-fg-secondary text-sm",
        children: s("grantPrompt.asks")
      }),
      t.purpose && /* @__PURE__ */ e("p", {
        className: "bg-surface-alt text-fg rounded-md p-3 text-sm",
        children: t.purpose
      }),
      d.map((o, m) => {
        const i = `${r}-${o}`, u = l.includes(o);
        return /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("label", {
            className: "text-fg mb-1.5 block text-sm font-medium",
            htmlFor: i,
            children: [s(`grantPrompt.fields.${o}`), t.fields[o] === "optional" && /* @__PURE__ */ e("span", {
              className: "text-fg-muted font-normal",
              children: [
                " (",
                s("grantPrompt.optional"),
                ")"
              ]
            })]
          }),
          /* @__PURE__ */ e("input", {
            id: i,
            type: o === "email" ? "email" : "text",
            autoComplete: U[o],
            value: n[o] ?? "",
            onChange: (f) => a({
              ...n,
              [o]: f.target.value
            }),
            disabled: c,
            required: t.fields[o] === "required",
            "aria-invalid": u || void 0,
            "aria-describedby": u ? `${i}-invalid` : void 0,
            className: S,
            autoFocus: m === 0
          }),
          u && /* @__PURE__ */ e("p", {
            id: `${i}-invalid`,
            className: "mt-1 text-sm text-red-500",
            children: s(o === "email" ? "grantPrompt.invalidEmail" : "grantPrompt.invalid")
          })
        ] }, o);
      }),
      /* @__PURE__ */ e("div", {
        className: "text-fg-muted flex flex-col gap-1 text-xs",
        children: [
          t.fields.displayName !== void 0 && /* @__PURE__ */ e("p", { children: s("grantPrompt.shownOnChanges") }),
          /* @__PURE__ */ e("p", { children: s("grantPrompt.final") }),
          t.privacyUrl && /* @__PURE__ */ e("a", {
            href: t.privacyUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-accent self-start underline",
            children: s("grantPrompt.privacy")
          })
        ]
      })
    ]
  });
}
function _() {
  const t = k(), n = E((l) => l.documents).find((l) => l.id === t), a = n?.openRequest;
  return !t || !n || !a ? null : /* @__PURE__ */ e("div", {
    className: "bg-app flex h-full w-full items-center justify-center overflow-auto p-8",
    children: /* @__PURE__ */ e("div", {
      className: "bg-surface border-border w-full max-w-sm rounded-xl border p-6 shadow-lg",
      children: a.kind === "passphrase" ? /* @__PURE__ */ e(O, {
        docId: t,
        name: n.name,
        passphraseProvided: a.passphraseProvided
      }) : /* @__PURE__ */ e(B, {
        docId: t,
        name: n.name,
        request: a.request
      })
    })
  });
}
function L({ title: t, name: n }) {
  return /* @__PURE__ */ e("div", {
    className: "flex flex-col items-center text-center",
    children: [
      /* @__PURE__ */ e("div", {
        className: "bg-accent-light mb-4 rounded-full p-4",
        children: /* @__PURE__ */ e(R, {
          name: "lock",
          size: 28,
          className: "text-accent"
        })
      }),
      /* @__PURE__ */ e("h3", {
        className: "text-fg text-lg font-semibold",
        children: t
      }),
      n && /* @__PURE__ */ e("p", {
        className: "text-fg-muted mt-1 text-sm",
        children: n
      })
    ]
  });
}
function O({ docId: t, name: n, passphraseProvided: a }) {
  const { retry: l, close: c } = v(), s = x(), r = y(), [d, o] = p("");
  return /* @__PURE__ */ e("form", {
    onSubmit: (i) => {
      i.preventDefault(), d && l(t, { passphrase: d }).catch(() => o(""));
    },
    children: [
      /* @__PURE__ */ e(L, {
        title: s("grantPrompt.passphraseTitle"),
        name: n
      }),
      /* @__PURE__ */ e("p", {
        className: "text-fg-secondary mt-4 text-center text-sm",
        children: s(a ? "grantPrompt.passphraseIncorrect" : "grantPrompt.passphraseRequired")
      }),
      /* @__PURE__ */ e("div", {
        className: "mt-5",
        children: [/* @__PURE__ */ e("label", {
          className: "text-fg mb-1.5 block text-sm font-medium",
          htmlFor: r,
          children: s("grantPrompt.passphraseLabel")
        }), /* @__PURE__ */ e("input", {
          id: r,
          type: "password",
          autoComplete: "off",
          value: d,
          onChange: (i) => o(i.target.value),
          className: S,
          autoFocus: !0
        })]
      }),
      /* @__PURE__ */ e("div", {
        className: "mt-6 flex gap-3",
        children: [/* @__PURE__ */ e("button", {
          type: "button",
          onClick: () => void c(t),
          className: P,
          children: s("grantPrompt.cancel")
        }), /* @__PURE__ */ e("button", {
          type: "submit",
          disabled: !d,
          className: w,
          children: s("grantPrompt.open")
        })]
      })
    ]
  });
}
function B({ docId: t, name: n, request: a }) {
  const { retry: l, close: c } = v(), s = x(), [r, d] = p({}), [o, m] = p(!1), i = o ? h(r) : a.invalid;
  return /* @__PURE__ */ e("form", {
    onSubmit: (f) => {
      f.preventDefault(), m(!0), !(!b(a, r) || h(r).length > 0) && l(t, { visitorIdentity: D(r) }).catch(() => {
      });
    },
    noValidate: !0,
    children: [
      /* @__PURE__ */ e(L, {
        title: s("grantPrompt.openTitle"),
        name: n
      }),
      /* @__PURE__ */ e("div", {
        className: "mt-5",
        children: /* @__PURE__ */ e(A, {
          request: a,
          answers: r,
          onChange: d,
          invalid: i,
          disabled: !1
        })
      }),
      /* @__PURE__ */ e("div", {
        className: "mt-6 flex gap-3",
        children: [/* @__PURE__ */ e("button", {
          type: "button",
          onClick: () => void c(t),
          className: P,
          children: s("grantPrompt.cancel")
        }), /* @__PURE__ */ e("button", {
          type: "submit",
          disabled: !b(a, r),
          className: w,
          children: s("grantPrompt.open")
        })]
      })
    ]
  });
}
function M() {
  const t = k(), n = F((g) => g.identityRequest), { identify: a, declineIdentity: l } = v(), c = x(), s = y(), [r, d] = p({}), [o, m] = p(!1), [i, u] = p(!1);
  if (!t || !n) return null;
  const f = o ? h(r) : n.invalid, C = () => {
    i || l(t);
  }, z = async (g) => {
    if (g.preventDefault(), m(!0), !(i || !b(n, r) || h(r).length > 0)) {
      u(!0);
      try {
        await a(t, D(r));
      } catch {
        m(!1);
      } finally {
        u(!1);
      }
    }
  };
  return /* @__PURE__ */ e(T, {
    labelledBy: s,
    onClose: C,
    className: "bg-surface border-border w-full max-w-sm rounded-xl border p-6 shadow-lg",
    children: /* @__PURE__ */ e("form", {
      onSubmit: (g) => void z(g),
      noValidate: !0,
      children: [
        /* @__PURE__ */ e("h3", {
          id: s,
          className: "text-fg text-lg font-semibold",
          children: c("grantPrompt.changeTitle")
        }),
        /* @__PURE__ */ e("div", {
          className: "mt-4",
          children: /* @__PURE__ */ e(A, {
            request: n,
            answers: r,
            onChange: d,
            invalid: f,
            disabled: i
          })
        }),
        /* @__PURE__ */ e("div", {
          className: "mt-6 flex gap-3",
          children: [/* @__PURE__ */ e("button", {
            type: "button",
            onClick: C,
            disabled: i,
            className: P,
            children: c("grantPrompt.notNow")
          }), /* @__PURE__ */ e("button", {
            type: "submit",
            disabled: i || !b(n, r),
            className: w,
            children: c(i ? "grantPrompt.saving" : "grantPrompt.continue")
          })]
        })
      ]
    })
  });
}
export {
  _ as GrantPrompt,
  M as VisitorIdentityDialog
};
//# sourceMappingURL=grant-prompt-Co4bzHaR-Cd5zAJXq.js.map
