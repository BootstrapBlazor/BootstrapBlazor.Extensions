import { u as D, G as J, H as M, J as f, M as R, A as q, d as m, m as j, e as t, K as B, L as F, r as G, s as T, o as H, t as K } from "./wasm-url-asset-DQFmMC86.js";
const b = "border-border bg-surface text-fg w-full rounded-md border px-2 py-1.5 text-sm disabled:opacity-50", w = "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm disabled:opacity-50", V = () => f(K, (a) => a.getCurrentPage());
function z() {
  const a = D(), o = V(), n = J(), c = M((e) => e.busy), A = f(R, (e) => e.canCalibrate()), i = F(o), u = G(T), y = H((e) => e.selected), h = f(T, (e) => e.selection.getSelected().filter((s) => (s.subtype === "polygon" || s.subtype === "polyline") && s.captionCenter && e.canUpdate(s.ref) && !s.lockedContents), (e, s) => e.length === s.length && e.every((L, O) => L === s[O])), v = f(R, (e) => u.selection.getSelected().map((s) => e.getReadout(s.ref)).filter((s) => !("unavailable" in s)), (e, s) => JSON.stringify(e) === JSON.stringify(s)), d = M((e) => e.lastReports), [N, x] = m(!1), [C, k] = m(!0), [p, P] = m(null), l = !o || c || !A || !i?.ready, r = i?.measure?.subtype === "rectilinear" ? i.measure : null, S = N ? "all" : o, U = { recalculate: C }, g = async (e) => {
    P(null);
    try {
      await e();
    } catch (s) {
      P(s instanceof Error ? s.message : String(s));
    }
  }, E = r?.distance[r.distance.length - 1]?.precision ?? 100;
  return /* @__PURE__ */ t("div", {
    className: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 text-sm",
    children: [
      /* @__PURE__ */ t("p", {
        className: "text-fg-muted",
        children: a("measurement.instructions")
      }),
      /* @__PURE__ */ t("div", { children: [/* @__PURE__ */ t("span", {
        className: "text-fg-muted",
        children: [a("measurement.scale"), ": "]
      }), /* @__PURE__ */ t("strong", { children: r?.ratio ?? a("measurement.unavailable") })] }),
      i?.error && /* @__PURE__ */ t("p", {
        role: "alert",
        className: "text-red-600",
        children: i.error.message
      }),
      i && !i.persistent && i.ready && /* @__PURE__ */ t("p", {
        className: "text-fg-muted",
        children: a("measurement.sessionOnly")
      }),
      /* @__PURE__ */ t("label", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ t("input", {
          type: "checkbox",
          checked: N,
          disabled: c,
          onChange: (e) => x(e.target.checked)
        }), a("measurement.allPages")]
      }),
      /* @__PURE__ */ t("label", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ t("input", {
          type: "checkbox",
          checked: C,
          disabled: c,
          onChange: (e) => k(e.target.checked)
        }), a("measurement.recalculate")]
      }),
      /* @__PURE__ */ t("label", { children: [a("measurement.preset"), /* @__PURE__ */ t("select", {
        "aria-label": a("measurement.preset"),
        className: b,
        value: "",
        disabled: l,
        onChange: (e) => void g(() => n.setPreset(S, e.target.value, U)),
        children: [/* @__PURE__ */ t("option", {
          value: "",
          disabled: !0,
          children: a("measurement.choosePreset")
        }), n.listPresets().map((e) => /* @__PURE__ */ t("option", {
          value: e.id,
          children: e.label
        }, e.id))]
      })] }),
      /* @__PURE__ */ t("label", { children: [a("measurement.unit"), /* @__PURE__ */ t("select", {
        "aria-label": a("measurement.unit"),
        className: b,
        value: r?.distance[0]?.unit.trim() ?? "",
        disabled: l || !r,
        onChange: (e) => void g(() => n.setUnit(S, e.target.value, U)),
        children: [!n.listUnits().includes(r?.distance[0]?.unit.trim()) && /* @__PURE__ */ t("option", {
          value: r?.distance[0]?.unit.trim() ?? "",
          children: a("measurement.custom")
        }), n.listUnits().map((e) => /* @__PURE__ */ t("option", {
          value: e,
          children: e
        }, e))]
      })] }),
      /* @__PURE__ */ t("label", { children: [a("measurement.areaUnit"), /* @__PURE__ */ t("select", {
        "aria-label": a("measurement.areaUnit"),
        className: b,
        value: r?.area[0]?.unit.trim().replace("²", "2") ?? "",
        disabled: l || !r,
        onChange: (e) => void g(() => n.setAreaUnit(S, e.target.value, U)),
        children: [!n.listAreaUnits().includes(r?.area[0]?.unit.trim().replace("²", "2")) && /* @__PURE__ */ t("option", {
          value: r?.area[0]?.unit.trim().replace("²", "2") ?? "",
          children: a("measurement.custom")
        }), n.listAreaUnits().map((e) => /* @__PURE__ */ t("option", {
          value: e,
          children: e.replace("2", "²")
        }, e))]
      })] }),
      /* @__PURE__ */ t("label", { children: [a("measurement.precision"), /* @__PURE__ */ t("select", {
        "aria-label": a("measurement.precision"),
        className: b,
        value: E,
        disabled: l || !r,
        onChange: (e) => void g(() => n.setPrecision(S, Number(e.target.value), U)),
        children: [![
          1,
          10,
          100,
          1e3,
          1e4
        ].includes(E) && /* @__PURE__ */ t("option", {
          value: E,
          children: a("measurement.custom")
        }), [
          1,
          10,
          100,
          1e3,
          1e4
        ].map((e) => /* @__PURE__ */ t("option", {
          value: e,
          children: 1 / e
        }, e))]
      })] }),
      /* @__PURE__ */ t("button", {
        className: w,
        disabled: l,
        onClick: () => n.startCalibration(),
        children: a("measurement.calibrate")
      }),
      y.length > 0 && /* @__PURE__ */ t("section", {
        className: "border-border-subtle border-t pt-3",
        children: [
          /* @__PURE__ */ t("h3", {
            className: "mb-1 font-medium",
            children: a("measurement.selection")
          }),
          v.length ? v.map((e, s) => /* @__PURE__ */ t("div", {
            className: "mb-2",
            children: [/* @__PURE__ */ t("p", { children: [
              a(`measurement.${e.kind}`),
              ": ",
              e.label
            ] }), e.perimeter && /* @__PURE__ */ t("p", { children: [
              a("measurement.perimeter"),
              ": ",
              e.perimeter
            ] })]
          }, s)) : /* @__PURE__ */ t("p", {
            className: "text-fg-muted",
            children: a("measurement.unavailable")
          }),
          h.length > 0 && /* @__PURE__ */ t("button", {
            className: w,
            disabled: c,
            onClick: () => void g(async () => {
              for (const e of h) (e.subtype === "polygon" || e.subtype === "polyline") && await u.update(e.ref, {
                subtype: e.subtype,
                captionCenter: null
              });
            }),
            children: a("measurement.resetLabel")
          })
        ]
      }),
      d.length > 0 && /* @__PURE__ */ t("p", {
        role: "status",
        children: a("measurement.report", { params: {
          updated: d.reduce((e, s) => e + s.updated.length, 0),
          skipped: d.reduce((e, s) => e + s.skipped.length, 0),
          failed: d.reduce((e, s) => e + s.failed.length + (s.scaleError || s.error ? 1 : 0), 0)
        } })
      }),
      p && /* @__PURE__ */ t("p", {
        role: "alert",
        className: "text-red-600",
        children: p
      })
    ]
  });
}
function I() {
  const a = D(), o = J(), { busy: n, calibrationRequest: c } = M(), A = f(R, (l) => l.canCalibrate()), i = q(null), [u, y] = m(""), [h, v] = m("m"), [d, N] = m(!1), [x, C] = m(!0), [k, p] = m(null);
  if (j(() => {
    y(""), p(null), i.current?.focus();
  }, [c]), !c) return null;
  const P = async () => {
    p(null);
    try {
      await o.calibrate({
        page: c.page,
        from: c.from,
        to: c.to,
        distance: {
          value: Number(u),
          unit: h
        }
      }, {
        recalculate: x,
        applyTo: d ? "all" : void 0
      }), o.dismissCalibration();
    } catch (l) {
      p(l instanceof Error ? l.message : String(l));
    }
  };
  return /* @__PURE__ */ t(B, {
    labelledBy: "measurement-calibration-title",
    onClose: () => {
      n || o.dismissCalibration();
    },
    className: "border-border bg-surface w-96 rounded-lg border p-5 shadow-xl",
    children: /* @__PURE__ */ t("form", {
      className: "flex flex-col gap-4",
      onSubmit: (l) => {
        l.preventDefault(), P();
      },
      children: [
        /* @__PURE__ */ t("h2", {
          id: "measurement-calibration-title",
          className: "font-semibold",
          children: a("measurement.calibrate")
        }),
        /* @__PURE__ */ t("p", {
          className: "text-fg-muted text-sm",
          children: a("measurement.knownLength")
        }),
        /* @__PURE__ */ t("label", { children: [a("measurement.length"), /* @__PURE__ */ t("input", {
          ref: i,
          "aria-label": a("measurement.length"),
          className: b,
          type: "number",
          min: "0",
          step: "any",
          value: u,
          onChange: (l) => y(l.target.value)
        })] }),
        /* @__PURE__ */ t("label", { children: [a("measurement.unit"), /* @__PURE__ */ t("select", {
          className: b,
          "aria-label": a("measurement.unit"),
          value: h,
          onChange: (l) => v(l.target.value),
          children: o.listUnits().map((l) => /* @__PURE__ */ t("option", { children: l }, l))
        })] }),
        /* @__PURE__ */ t("label", {
          className: "flex items-center gap-2 text-sm",
          children: [/* @__PURE__ */ t("input", {
            type: "checkbox",
            checked: d,
            onChange: (l) => N(l.target.checked)
          }), a("measurement.allPages")]
        }),
        /* @__PURE__ */ t("label", {
          className: "flex items-center gap-2 text-sm",
          children: [/* @__PURE__ */ t("input", {
            type: "checkbox",
            checked: x,
            onChange: (l) => C(l.target.checked)
          }), a("measurement.recalculate")]
        }),
        k && /* @__PURE__ */ t("p", {
          role: "alert",
          className: "text-sm text-red-600",
          children: k
        }),
        /* @__PURE__ */ t("div", {
          className: "flex justify-end gap-2",
          children: [/* @__PURE__ */ t("button", {
            type: "button",
            className: w,
            disabled: n,
            onClick: () => o.dismissCalibration(),
            children: a("demo.cancel")
          }), /* @__PURE__ */ t("button", {
            className: w,
            type: "submit",
            disabled: n || !A || !(Number(u) > 0) || !Number.isFinite(Number(u)),
            children: a(n ? "measurement.applying" : "measurement.apply")
          })]
        })
      ]
    })
  });
}
export {
  I as CalibrationDialog,
  z as MeasurementSection
};
//# sourceMappingURL=measurement-DZOOYxOT-DZDR7o1H.js.map
