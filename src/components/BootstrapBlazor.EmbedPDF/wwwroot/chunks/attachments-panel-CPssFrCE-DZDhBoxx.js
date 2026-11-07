import { u as k, an as F, ao as O, ap as S, C as A, K as P, p as B, aq as L, A as N, k as j, q as z, l as n, F as I, n as q, m as E, L as M } from "./init-DY-DOXIU.js";
import { displayNameOf as $ } from "@embedpdf/plugin-attachment";
function K(t, r) {
  const [s, o] = t < 1e3 ? [t, "byte"] : t < 1e6 ? [t / 1e3, "kilobyte"] : [t / 1e6, "megabyte"];
  return new Intl.NumberFormat(r, {
    style: "unit",
    unit: o,
    unitDisplay: "short",
    maximumFractionDigits: o === "byte" ? 0 : 1
  }).format(s);
}
function R(t) {
  const r = t.mimeType ?? "";
  return r === "application/pdf" ? "file" : r.startsWith("image/") ? "photo" : "paperclip";
}
const v = (t) => t.dataTransfer.types.includes("Files");
function Q() {
  const t = k(), r = F((e) => e.locale) ?? void 0, s = O(), { files: o, selected: x, status: u } = S(), p = A(), i = P("attachment:add"), b = B(), f = L(), d = i.visible && i.enabled, c = N(0), [g, m] = j(!1), l = z(() => {
    const e = new Map(f.map((a) => [a.ref.objectNumber, a]));
    return (a) => {
      if (a.home.kind !== "page") return null;
      const h = e.get(a.home.ref.page.objectNumber);
      return h ? h.label ?? String(h.index + 1) : null;
    };
  }, [f]), D = new Set(x.map((e) => e.id)), w = (e) => {
    if (s.select([e]), e.home.kind === "page") {
      s.reveal(e), b();
      return;
    }
    p.execute("attachment:save").catch(() => {
    });
  }, C = d ? {
    onDragEnter: (e) => {
      v(e) && (e.preventDefault(), e.stopPropagation(), c.current += 1, m(!0));
    },
    onDragOver: (e) => {
      v(e) && (e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy");
    },
    onDragLeave: () => {
      c.current !== 0 && (c.current -= 1, c.current === 0 && m(!1));
    },
    onDrop: (e) => {
      if (c.current = 0, m(!1), !v(e)) return;
      e.preventDefault(), e.stopPropagation();
      const a = Array.from(e.dataTransfer.files);
      if (a.length === 0) return;
      const h = { files: a };
      p.execute("attachment:add", { args: h }).catch(() => {
      });
    }
  } : {}, y = (e, a = !1) => /* @__PURE__ */ n("div", {
    className: "text-fg-muted flex flex-col items-center gap-3 p-6 text-center text-sm",
    children: [
      /* @__PURE__ */ n("p", { children: e }),
      a && d && /* @__PURE__ */ n("button", {
        type: "button",
        onClick: () => void i.run(),
        className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
        children: i.label
      }),
      a && d && /* @__PURE__ */ n("p", {
        className: "text-xs",
        children: t("attachments.dropHint")
      })
    ]
  }), T = o.length === 0 ? u === "idle" || u === "loading" ? y(t("attachments.loading")) : u === "forbidden" || u === "error" ? y(t("attachments.failed")) : y(t("attachments.empty"), !0) : /* @__PURE__ */ n("ul", {
    "aria-label": t("panels.attachments"),
    className: "min-h-0 flex-1 overflow-y-auto p-1",
    children: o.map((e) => /* @__PURE__ */ n(H, {
      file: e,
      page: l(e),
      selected: D.has(e.id),
      pending: s.isPending(e),
      locale: r,
      onPick: () => w(e),
      onMenu: () => s.select([e])
    }, e.id))
  });
  return /* @__PURE__ */ n("div", {
    className: "relative flex min-h-0 flex-1 flex-col",
    ...C,
    children: [T, g && /* @__PURE__ */ n("div", {
      className: "border-accent bg-accent/10 text-fg pointer-events-none absolute inset-1 flex items-center justify-center rounded-md border-2 border-dashed text-sm",
      children: t("attachments.drop")
    })]
  });
}
function H({ file: t, page: r, selected: s, pending: o, locale: x, onPick: u, onMenu: p }) {
  const i = k(), { touch: b } = I(), f = N(null), d = $(t), c = N(null), g = q({
    label: d,
    labelShown: !0
  }, { clipped: () => c.current }), m = [
    o ? i("attachments.adding") : t.sizeBytes === null ? null : K(t.sizeBytes, x),
    r === null ? null : i("attachments.onPage", { params: { page: r } }),
    t.description
  ].filter((l) => !!l);
  return /* @__PURE__ */ n("li", {
    onContextMenu: (l) => {
      l.preventDefault(), p(), f.current?.querySelector("button")?.click();
    },
    className: `group flex items-center gap-1 rounded pe-1 ${s ? "bg-accent/10" : "hover:bg-hover"} ${o ? "opacity-60" : ""}`,
    children: [
      /* @__PURE__ */ n("button", {
        ...g.trigger,
        type: "button",
        onClick: u,
        className: "flex min-w-0 flex-1 items-center gap-2 rounded px-2 py-1.5 text-start",
        children: [/* @__PURE__ */ n(E, {
          name: R(t),
          size: 16,
          className: "text-fg-muted shrink-0"
        }), /* @__PURE__ */ n("span", {
          className: "min-w-0 flex-1",
          children: [/* @__PURE__ */ n("span", {
            ref: c,
            className: "text-fg block truncate text-sm",
            children: /* @__PURE__ */ n("bdi", { children: d })
          }), m.length > 0 && /* @__PURE__ */ n("span", {
            className: "text-fg-muted block truncate text-xs",
            children: m.join(" · ")
          })]
        })]
      }),
      g.element,
      /* @__PURE__ */ n("span", {
        ref: f,
        onClick: (l) => l.stopPropagation(),
        onPointerDownCapture: p,
        className: `shrink-0 ${s || b ? "" : "opacity-0 focus-within:opacity-100 group-hover:opacity-100"}`,
        children: /* @__PURE__ */ n(W, {})
      })
    ]
  });
}
function W() {
  const t = P("menu:attachment-item");
  return t.visible ? /* @__PURE__ */ n(M, {
    cmd: t,
    variant: "icon",
    run: () => void t.run()
  }) : null;
}
export {
  Q as AttachmentsPanel
};
//# sourceMappingURL=attachments-panel-CPssFrCE-DZDhBoxx.js.map
