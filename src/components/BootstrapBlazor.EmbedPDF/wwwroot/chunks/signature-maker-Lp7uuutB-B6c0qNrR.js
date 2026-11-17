import { u as E, af as j, aa as B, an as U, g as s, aB as G, h as t, j as z, Z as K, s as P, r as R, aD as O, aE as H, aF as F, aG as W, aH as Y, aI as $ } from "./wasm-url-asset-C3FjD8P-.js";
const J = [], k = {
  width: 360,
  height: 120
};
function L({ value: n, onChange: o, fonts: i }) {
  const d = E(), [m, f] = s("draw"), [h, b] = s([]), [g, y] = s(""), [u, S] = s(i[0]?.key ?? ""), [I, N] = s(null), v = P(null), c = P(null), [l, M] = s(null);
  R(() => {
    const e = m === "type" ? i.find((r) => r.key === u) : void 0;
    if (!e) return;
    let a = !0;
    return O(e).then((r) => a && M(r), (r) => console.error("[embedpdf] loading the signature font failed:", r)), () => {
      a = !1;
    };
  }, [
    m,
    u,
    i
  ]), H(l ? [l] : J), R(() => {
    const e = v.current;
    if (!e) return;
    const a = window.devicePixelRatio || 1;
    e.width = k.width * a, e.height = k.height * a;
    const r = e.getContext("2d");
    if (r) {
      r.setTransform(a, 0, 0, a, 0, 0), r.clearRect(0, 0, k.width, k.height), r.lineCap = "round", r.lineJoin = "round", r.lineWidth = 2.5, r.strokeStyle = getComputedStyle(e).color || "#000";
      for (const _ of h)
        r.beginPath(), _.forEach((A, D) => D === 0 ? r.moveTo(A.x, A.y) : r.lineTo(A.x, A.y)), r.stroke();
    }
  }, [h, m]);
  const w = (e) => {
    const a = e.currentTarget.getBoundingClientRect();
    return {
      x: e.clientX - a.left,
      y: e.clientY - a.top
    };
  }, C = (e) => {
    b(e), o(e.length ? {
      kind: "ink",
      strokes: e,
      color: "#000000",
      strokeWidth: 2.5
    } : null);
  }, T = (e, a) => {
    y(e), S(a), o(e.trim() ? {
      kind: "text",
      text: e.trim(),
      fontFamily: a,
      color: "#000000",
      fontSize: 36
    } : null);
  }, p = (e) => {
    N(e.name), o(e.type === "application/pdf" ? {
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
            C([]), y(""), N(null), o(null);
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
        e.currentTarget.setPointerCapture(e.pointerId), c.current = [w(e)], b((a) => [...a, c.current]);
      },
      onPointerMove: (e) => {
        c.current && (c.current.push(w(e)), b((a) => [...a.slice(0, -1), [...c.current]]));
      },
      onPointerUp: () => {
        if (!c.current) return;
        const e = c.current;
        c.current = null, b((a) => {
          const r = [...a.slice(0, -1), e];
          return C(r), r;
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
      children: [I ?? d("demo.makerUploadHint"), /* @__PURE__ */ t("input", {
        type: "file",
        accept: "image/png,image/jpeg,application/pdf",
        className: "hidden",
        onChange: (e) => {
          const a = e.currentTarget.files?.[0];
          e.currentTarget.value = "", a && p(a);
        }
      })]
    })]
  });
}
function Z() {
  const n = E(), o = j("signature-maker"), i = B(), d = U(), [m, f] = s(""), [h, b] = s(null), [g, y] = s(null), [u, S] = s(!1), [I, N] = s(null), v = G(), c = o.props?.libraryId, l = c ? i.getLibrary(c) : null, M = (d.kinds ?? ["signature", "initials"]).includes("initials"), [w] = s(() => $(d.fonts));
  if (!o.isOpen) return null;
  const C = l ? g != null : m.trim().length > 0 && h != null, T = async () => {
    S(!0), N(null);
    try {
      if (l) await i.createAsset({
        libraryId: l.id,
        name: F,
        label: n("demo.initialsLabel"),
        mark: g
      });
      else {
        const { library: p } = await i.createLibrary(m.trim(), { kind: W }), x = p.id;
        await i.createAsset({
          libraryId: x,
          name: Y,
          label: n("demo.signatureLabel"),
          mark: h
        }), g && await i.createAsset({
          libraryId: x,
          name: F,
          label: n("demo.initialsLabel"),
          mark: g
        });
      }
      f(""), b(null), y(null), o.close();
    } catch (p) {
      console.error("[embedpdf] saving the signature failed:", p), N(n("demo.makerError"));
    } finally {
      S(!1);
    }
  };
  return /* @__PURE__ */ t(K, {
    labelledBy: v,
    onClose: () => {
      u || o.close();
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
          onClick: o.close,
          className: "text-fg-muted hover:bg-hover grid h-7 w-7 place-items-center rounded-md",
          "aria-label": n("demo.cancel"),
          children: /* @__PURE__ */ t(z, {
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
      I ? /* @__PURE__ */ t("p", {
        className: "mt-2 text-sm text-red-600",
        children: I
      }) : null,
      /* @__PURE__ */ t("div", {
        className: "mt-4 flex justify-end gap-2",
        children: [/* @__PURE__ */ t("button", {
          type: "button",
          disabled: u,
          onClick: o.close,
          className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
          children: n("demo.cancel")
        }), /* @__PURE__ */ t("button", {
          type: "button",
          disabled: u || !C,
          onClick: () => void T(),
          className: "bg-accent text-on-accent rounded-md px-3 py-1.5 text-sm disabled:opacity-60",
          children: n(u ? "demo.makerSaving" : "demo.makerSave")
        })]
      })
    ]
  });
}
export {
  Z as SignatureMakerModal
};
//# sourceMappingURL=signature-maker-Lp7uuutB-B6c0qNrR.js.map
