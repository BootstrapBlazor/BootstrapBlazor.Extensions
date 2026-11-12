import { u as O, N as D, O as R, P as f, A as J, k as m, v as L, l as t, Q as j, U as F, B as Q, x as V } from "./init-tVr9KnGC.js";
import { MeasurementToken as T } from "@embedpdf/plugin-measurement";
import { AnnotationToken as M } from "@embedpdf/plugin-annotation";
import { StageToken as $ } from "@embedpdf/plugin-stage";
const b = "border-border bg-surface text-fg w-full rounded-md border px-2 py-1.5 text-sm disabled:opacity-50", w = "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm disabled:opacity-50", z = () => f($, (a) => a.getCurrentPage());
function W() {
  const a = O(), c = z(), s = D(), i = R((e) => e.busy), A = f(T, (e) => e.canCalibrate()), o = F(c), u = Q(M), y = V((e) => e.selected), h = f(M, (e) => e.selection.getSelected().filter((l) => (l.subtype === "polygon" || l.subtype === "polyline") && l.captionCenter && e.canUpdate(l.ref) && !l.lockedContents), (e, l) => e.length === l.length && e.every((q, B) => q === l[B])), v = f(T, (e) => u.selection.getSelected().map((l) => e.getReadout(l.ref)).filter((l) => !("unavailable" in l)), (e, l) => JSON.stringify(e) === JSON.stringify(l)), d = R((e) => e.lastReports), [N, x] = m(!1), [C, k] = m(!0), [p, P] = m(null), n = !c || i || !A || !o?.ready, r = o?.measure?.subtype === "rectilinear" ? o.measure : null, S = N ? "all" : c, U = { recalculate: C }, g = async (e) => {
    P(null);
    try {
      await e();
    } catch (l) {
      P(l instanceof Error ? l.message : String(l));
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
      o && !o.persistent && o.ready && /* @__PURE__ */ t("p", {
        className: "text-fg-muted",
        children: a("measurement.sessionOnly")
      }),
      /* @__PURE__ */ t("label", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ t("input", {
          type: "checkbox",
          checked: N,
          disabled: i,
          onChange: (e) => x(e.target.checked)
        }), a("measurement.allPages")]
      }),
      /* @__PURE__ */ t("label", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ t("input", {
          type: "checkbox",
          checked: C,
          disabled: i,
          onChange: (e) => k(e.target.checked)
        }), a("measurement.recalculate")]
      }),
      /* @__PURE__ */ t("label", { children: [a("measurement.preset"), /* @__PURE__ */ t("select", {
        "aria-label": a("measurement.preset"),
        className: b,
        value: "",
        disabled: n,
        onChange: (e) => void g(() => s.setPreset(S, e.target.value, U)),
        children: [/* @__PURE__ */ t("option", {
          value: "",
          disabled: !0,
          children: a("measurement.choosePreset")
        }), s.listPresets().map((e) => /* @__PURE__ */ t("option", {
          value: e.id,
          children: e.label
        }, e.id))]
      })] }),
      /* @__PURE__ */ t("label", { children: [a("measurement.unit"), /* @__PURE__ */ t("select", {
        "aria-label": a("measurement.unit"),
        className: b,
        value: r?.distance[0]?.unit.trim() ?? "",
        disabled: n || !r,
        onChange: (e) => void g(() => s.setUnit(S, e.target.value, U)),
        children: [!s.listUnits().includes(r?.distance[0]?.unit.trim()) && /* @__PURE__ */ t("option", {
          value: r?.distance[0]?.unit.trim() ?? "",
          children: a("measurement.custom")
        }), s.listUnits().map((e) => /* @__PURE__ */ t("option", {
          value: e,
          children: e
        }, e))]
      })] }),
      /* @__PURE__ */ t("label", { children: [a("measurement.areaUnit"), /* @__PURE__ */ t("select", {
        "aria-label": a("measurement.areaUnit"),
        className: b,
        value: r?.area[0]?.unit.trim().replace("²", "2") ?? "",
        disabled: n || !r,
        onChange: (e) => void g(() => s.setAreaUnit(S, e.target.value, U)),
        children: [!s.listAreaUnits().includes(r?.area[0]?.unit.trim().replace("²", "2")) && /* @__PURE__ */ t("option", {
          value: r?.area[0]?.unit.trim().replace("²", "2") ?? "",
          children: a("measurement.custom")
        }), s.listAreaUnits().map((e) => /* @__PURE__ */ t("option", {
          value: e,
          children: e.replace("2", "²")
        }, e))]
      })] }),
      /* @__PURE__ */ t("label", { children: [a("measurement.precision"), /* @__PURE__ */ t("select", {
        "aria-label": a("measurement.precision"),
        className: b,
        value: E,
        disabled: n || !r,
        onChange: (e) => void g(() => s.setPrecision(S, Number(e.target.value), U)),
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
        disabled: n,
        onClick: () => s.startCalibration(),
        children: a("measurement.calibrate")
      }),
      y.length > 0 && /* @__PURE__ */ t("section", {
        className: "border-border-subtle border-t pt-3",
        children: [
          /* @__PURE__ */ t("h3", {
            className: "mb-1 font-medium",
            children: a("measurement.selection")
          }),
          v.length ? v.map((e, l) => /* @__PURE__ */ t("div", {
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
          }, l)) : /* @__PURE__ */ t("p", {
            className: "text-fg-muted",
            children: a("measurement.unavailable")
          }),
          h.length > 0 && /* @__PURE__ */ t("button", {
            className: w,
            disabled: i,
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
          updated: d.reduce((e, l) => e + l.updated.length, 0),
          skipped: d.reduce((e, l) => e + l.skipped.length, 0),
          failed: d.reduce((e, l) => e + l.failed.length + (l.scaleError || l.error ? 1 : 0), 0)
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
function X() {
  const a = O(), c = D(), { busy: s, calibrationRequest: i } = R(), A = f(T, (n) => n.canCalibrate()), o = J(null), [u, y] = m(""), [h, v] = m("m"), [d, N] = m(!1), [x, C] = m(!0), [k, p] = m(null);
  if (L(() => {
    y(""), p(null), o.current?.focus();
  }, [i]), !i) return null;
  const P = async () => {
    p(null);
    try {
      await c.calibrate({
        page: i.page,
        from: i.from,
        to: i.to,
        distance: {
          value: Number(u),
          unit: h
        }
      }, {
        recalculate: x,
        applyTo: d ? "all" : void 0
      }), c.dismissCalibration();
    } catch (n) {
      p(n instanceof Error ? n.message : String(n));
    }
  };
  return /* @__PURE__ */ t(j, {
    labelledBy: "measurement-calibration-title",
    onClose: () => {
      s || c.dismissCalibration();
    },
    className: "border-border bg-surface w-96 rounded-lg border p-5 shadow-xl",
    children: /* @__PURE__ */ t("form", {
      className: "flex flex-col gap-4",
      onSubmit: (n) => {
        n.preventDefault(), P();
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
          ref: o,
          "aria-label": a("measurement.length"),
          className: b,
          type: "number",
          min: "0",
          step: "any",
          value: u,
          onChange: (n) => y(n.target.value)
        })] }),
        /* @__PURE__ */ t("label", { children: [a("measurement.unit"), /* @__PURE__ */ t("select", {
          className: b,
          "aria-label": a("measurement.unit"),
          value: h,
          onChange: (n) => v(n.target.value),
          children: c.listUnits().map((n) => /* @__PURE__ */ t("option", { children: n }, n))
        })] }),
        /* @__PURE__ */ t("label", {
          className: "flex items-center gap-2 text-sm",
          children: [/* @__PURE__ */ t("input", {
            type: "checkbox",
            checked: d,
            onChange: (n) => N(n.target.checked)
          }), a("measurement.allPages")]
        }),
        /* @__PURE__ */ t("label", {
          className: "flex items-center gap-2 text-sm",
          children: [/* @__PURE__ */ t("input", {
            type: "checkbox",
            checked: x,
            onChange: (n) => C(n.target.checked)
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
            disabled: s,
            onClick: () => c.dismissCalibration(),
            children: a("demo.cancel")
          }), /* @__PURE__ */ t("button", {
            className: w,
            type: "submit",
            disabled: s || !A || !(Number(u) > 0) || !Number.isFinite(Number(u)),
            children: a(s ? "measurement.applying" : "measurement.apply")
          })]
        })
      ]
    })
  });
}
export {
  X as CalibrationDialog,
  W as MeasurementSection
};
//# sourceMappingURL=measurement-6M_KEsFK-Bw9_NzWx.js.map
