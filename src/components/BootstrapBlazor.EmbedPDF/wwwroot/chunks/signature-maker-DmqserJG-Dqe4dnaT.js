import { u as E, a5 as U, a0 as j, ac as B, k as o, al as z, l as t, m as G, P as K, A as P, v as R, aw as O, ax as W, ay as Y } from "./init-DY-DOXIU.js";
import { INITIALS_MARK_NAME as F, SIGNATURES_LIBRARY_KIND as $, SIGNATURE_MARK_NAME as H } from "@embedpdf/plugin-signature";
const J = [], k = {
  width: 360,
  height: 120
};
function L({ value: n, onChange: s, fonts: i }) {
  const d = E(), [m, f] = o("draw"), [h, b] = o([]), [g, y] = o(""), [u, S] = o(i[0]?.key ?? ""), [C, N] = o(null), v = P(null), c = P(null), [l, M] = o(null);
  R(() => {
    const e = m === "type" ? i.find((a) => a.key === u) : void 0;
    if (!e) return;
    let r = !0;
    return O(e).then((a) => r && M(a), (a) => console.error("[embedpdf] loading the signature font failed:", a)), () => {
      r = !1;
    };
  }, [
    m,
    u,
    i
  ]), W(l ? [l] : J), R(() => {
    const e = v.current;
    if (!e) return;
    const r = window.devicePixelRatio || 1;
    e.width = k.width * r, e.height = k.height * r;
    const a = e.getContext("2d");
    if (a) {
      a.setTransform(r, 0, 0, r, 0, 0), a.clearRect(0, 0, k.width, k.height), a.lineCap = "round", a.lineJoin = "round", a.lineWidth = 2.5, a.strokeStyle = getComputedStyle(e).color || "#000";
      for (const _ of h)
        a.beginPath(), _.forEach((A, D) => D === 0 ? a.moveTo(A.x, A.y) : a.lineTo(A.x, A.y)), a.stroke();
    }
  }, [h, m]);
  const w = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  }, I = (e) => {
    b(e), s(e.length ? {
      kind: "ink",
      strokes: e,
      color: "#000000",
      strokeWidth: 2.5
    } : null);
  }, T = (e, r) => {
    y(e), S(r), s(e.trim() ? {
      kind: "text",
      text: e.trim(),
      fontFamily: r,
      color: "#000000",
      fontSize: 36
    } : null);
  }, p = (e) => {
    N(e.name), s(e.type === "application/pdf" ? {
      kind: "pdf",
      source: e,
      pageIndex: 0
    } : {
      kind: "image",
      source: e
    });
  }, x = (e) => `rounded px-2 py-1 text-xs font-medium ${m === e ? "bg-accent text-on-accent" : "text-fg-muted hover:bg-hover"}`;
  return /* @__PURE__ */ t("div", {
    className: "flex flex-col gap-2",
    children: [/* @__PURE__ */ t("div", {
      className: "flex items-center gap-1",
      children: [
        /* @__PURE__ */ t("button", {
          type: "button",
          className: x("draw"),
          onClick: () => f("draw"),
          children: d("demo.makerDraw")
        }),
        i.length > 0 ? /* @__PURE__ */ t("button", {
          type: "button",
          className: x("type"),
          onClick: () => f("type"),
          children: d("demo.makerType")
        }) : null,
        /* @__PURE__ */ t("button", {
          type: "button",
          className: x("upload"),
          onClick: () => f("upload"),
          children: d("demo.makerUpload")
        }),
        /* @__PURE__ */ t("div", { className: "flex-1" }),
        n ? /* @__PURE__ */ t("button", {
          type: "button",
          onClick: () => {
            I([]), y(""), N(null), s(null);
          },
          className: "text-fg-muted hover:text-fg text-xs",
          children: d("demo.makerClear")
        }) : null
      ]
    }), m === "draw" ? /* @__PURE__ */ t("canvas", {
      ref: v,
      style: {
        width: k.width,
        height: k.height,
        touchAction: "none"
      },
      className: "border-border-subtle bg-surface text-fg rounded-md border",
      onPointerDown: (e) => {
        e.currentTarget.setPointerCapture(e.pointerId), c.current = [w(e)], b((r) => [...r, c.current]);
      },
      onPointerMove: (e) => {
        c.current && (c.current.push(w(e)), b((r) => [...r.slice(0, -1), [...c.current]]));
      },
      onPointerUp: () => {
        if (!c.current) return;
        const e = c.current;
        c.current = null, b((r) => {
          const a = [...r.slice(0, -1), e];
          return I(a), a;
        });
      }
    }) : m === "type" ? /* @__PURE__ */ t("div", {
      className: "flex flex-col gap-2",
      children: [/* @__PURE__ */ t("input", {
        value: g,
        placeholder: d("demo.makerTypePlaceholder"),
        onChange: (e) => T(e.target.value, u),
        style: l ? {
          fontFamily: `"${l.family}", cursive`,
          fontSize: 22
        } : void 0,
        className: "border-border bg-surface text-fg w-full rounded border px-2 py-1.5 text-sm"
      }), /* @__PURE__ */ t("label", {
        className: "text-fg-muted flex items-center gap-2 text-xs",
        children: [d("demo.makerFont"), /* @__PURE__ */ t("select", {
          value: u,
          onChange: (e) => T(g, e.target.value),
          className: "border-border bg-surface text-fg rounded border px-2 py-1 text-xs",
          children: i.map((e) => /* @__PURE__ */ t("option", {
            value: e.key,
            children: e.label
          }, e.key))
        })]
      })]
    }) : /* @__PURE__ */ t("label", {
      className: "border-border-subtle text-fg-muted hover:bg-hover flex h-24 cursor-pointer items-center justify-center rounded-md border border-dashed text-sm",
      children: [C ?? d("demo.makerUploadHint"), /* @__PURE__ */ t("input", {
        type: "file",
        accept: "image/png,image/jpeg,application/pdf",
        className: "hidden",
        onChange: (e) => {
          const r = e.currentTarget.files?.[0];
          e.currentTarget.value = "", r && p(r);
        }
      })]
    })]
  });
}
function Q() {
  const n = E(), s = U("signature-maker"), i = j(), d = B(), [m, f] = o(""), [h, b] = o(null), [g, y] = o(null), [u, S] = o(!1), [C, N] = o(null), v = z(), c = s.props?.libraryId, l = c ? i.getLibrary(c) : null, M = (d.kinds ?? ["signature", "initials"]).includes("initials"), [w] = o(() => Y(d.fonts));
  if (!s.isOpen) return null;
  const I = l ? g != null : m.trim().length > 0 && h != null, T = async () => {
    S(!0), N(null);
    try {
      if (l) await i.createAsset({
        libraryId: l.id,
        name: F,
        label: n("demo.initialsLabel"),
        mark: g
      });
      else {
        const { library: p } = await i.createLibrary(m.trim(), { kind: $ }), x = p.id;
        await i.createAsset({
          libraryId: x,
          name: H,
          label: n("demo.signatureLabel"),
          mark: h
        }), g && await i.createAsset({
          libraryId: x,
          name: F,
          label: n("demo.initialsLabel"),
          mark: g
        });
      }
      f(""), b(null), y(null), s.close();
    } catch (p) {
      console.error("[embedpdf] saving the signature failed:", p), N(n("demo.makerError"));
    } finally {
      S(!1);
    }
  };
  return /* @__PURE__ */ t(K, {
    labelledBy: v,
    onClose: () => {
      u || s.close();
    },
    className: "border-border bg-surface w-[26rem] rounded-lg border p-4 shadow-xl",
    children: [
      /* @__PURE__ */ t("div", {
        className: "flex items-center justify-between",
        children: [/* @__PURE__ */ t("h2", {
          id: v,
          className: "text-fg text-base font-semibold",
          children: n(l ? "demo.signaturesAddInitials" : "demo.makerTitle")
        }), /* @__PURE__ */ t("button", {
          type: "button",
          onClick: s.close,
          className: "text-fg-muted hover:bg-hover grid h-7 w-7 place-items-center rounded-md",
          "aria-label": n("demo.cancel"),
          children: /* @__PURE__ */ t(G, {
            name: "x",
            size: 16
          })
        })]
      }),
      l ? null : /* @__PURE__ */ t("label", {
        className: "text-fg-muted mt-3 block text-xs",
        children: [n("demo.makerName"), /* @__PURE__ */ t("input", {
          value: m,
          placeholder: n("demo.makerNamePlaceholder"),
          onChange: (p) => f(p.target.value),
          className: "border-border bg-surface text-fg mt-1 w-full rounded border px-2 py-1.5 text-sm"
        })]
      }),
      l ? null : /* @__PURE__ */ t("div", {
        className: "mt-3",
        children: [/* @__PURE__ */ t("p", {
          className: "text-fg mb-1 text-xs font-semibold uppercase tracking-wide",
          children: n("demo.signatureLabel")
        }), /* @__PURE__ */ t(L, {
          value: h,
          onChange: b,
          fonts: w
        })]
      }),
      M ? /* @__PURE__ */ t("div", {
        className: "mt-3",
        children: [/* @__PURE__ */ t("p", {
          className: "text-fg mb-1 text-xs font-semibold uppercase tracking-wide",
          children: [n("demo.initialsLabel"), l ? null : /* @__PURE__ */ t("span", {
            className: "text-fg-muted ms-1 font-normal normal-case tracking-normal",
            children: n("demo.makerOptional")
          })]
        }), /* @__PURE__ */ t(L, {
          value: g,
          onChange: y,
          fonts: w
        })]
      }) : null,
      C ? /* @__PURE__ */ t("p", {
        className: "mt-2 text-sm text-red-600",
        children: C
      }) : null,
      /* @__PURE__ */ t("div", {
        className: "mt-4 flex justify-end gap-2",
        children: [/* @__PURE__ */ t("button", {
          type: "button",
          disabled: u,
          onClick: s.close,
          className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
          children: n("demo.cancel")
        }), /* @__PURE__ */ t("button", {
          type: "button",
          disabled: u || !I,
          onClick: () => void T(),
          className: "bg-accent text-on-accent rounded-md px-3 py-1.5 text-sm disabled:opacity-60",
          children: n(u ? "demo.makerSaving" : "demo.makerSave")
        })]
      })
    ]
  });
}
export {
  Q as SignatureMakerModal
};
//# sourceMappingURL=signature-maker-DmqserJG-Dqe4dnaT.js.map
