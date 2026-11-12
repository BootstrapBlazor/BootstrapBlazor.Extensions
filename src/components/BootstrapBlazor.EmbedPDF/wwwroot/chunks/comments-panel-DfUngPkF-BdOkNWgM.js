import { u as K, x as I, y as E, z as _, B as R, q as D, A as P, v as W, l as t, C as Y, D as H, m as T, F as $, k as L, G, H as j, W as A, T as v, r as J, J as U, K as V, R as Q, L as X, M as Z } from "./init-tVr9KnGC.js";
import { AnnotationToken as ee, annotationKey as w } from "@embedpdf/plugin-annotation";
import { StageToken as te } from "@embedpdf/plugin-stage";
const ne = {
  text: {
    icon: "message",
    labelKey: "annotation.comment",
    label: "Comment"
  },
  highlight: {
    icon: "highlight",
    labelKey: "annotation.highlight",
    label: "Highlight"
  },
  underline: {
    icon: "underline",
    labelKey: "annotation.underline",
    label: "Underline"
  },
  squiggly: {
    icon: "squiggly",
    labelKey: "annotation.squiggly",
    label: "Squiggly"
  },
  strikeout: {
    icon: "strikethrough",
    labelKey: "annotation.strikeout",
    label: "Strikethrough"
  },
  square: {
    icon: "square",
    labelKey: "annotation.square",
    label: "Square"
  },
  circle: {
    icon: "circle",
    labelKey: "annotation.circle",
    label: "Circle"
  },
  line: {
    icon: "line",
    labelKey: "annotation.line",
    label: "Line"
  },
  polygon: {
    icon: "polygon",
    labelKey: "annotation.polygon",
    label: "Polygon"
  },
  polyline: {
    icon: "zigzag",
    labelKey: "annotation.polyline",
    label: "Polyline"
  },
  ink: {
    icon: "pencilMarker",
    labelKey: "annotation.ink",
    label: "Ink"
  },
  "free-text": {
    icon: "freeText",
    labelKey: "annotation.freeText",
    label: "Text"
  },
  stamp: {
    icon: "rubberStamp",
    labelKey: "annotation.stamp",
    label: "Stamp"
  },
  caret: {
    icon: "insertText",
    labelKey: "annotation.caret",
    label: "Caret"
  },
  redact: {
    icon: "redact",
    labelKey: "annotation.redact",
    label: "Redact"
  },
  "file-attachment": {
    icon: "paperclip",
    labelKey: "annotation.fileAttachment",
    label: "Attachment"
  }
}, oe = {
  icon: "message",
  labelKey: "annotation.comment",
  label: "Comment"
}, ae = (e) => ne[e.subtype] ?? oe, re = (e) => {
  const n = e, a = n.fontColor ?? n.color, l = n.interiorColor ?? void 0;
  return {
    ...a ? { primary: a } : {},
    ...l ? { secondary: l } : {}
  };
}, B = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit"
}, le = /* @__PURE__ */ new Set([
  "hour",
  "minute",
  "second",
  "dayPeriod"
]), z = " ";
function ce(e, n) {
  const a = e.formatToParts(n), l = (i) => le.has(a[i]?.type ?? "");
  return a.map((i, m) => {
    const d = i.value.replace(/ /g, z);
    return i.type === "literal" && l(m - 1) !== l(m + 1) ? d.replace(z, " ") : d;
  }).join("");
}
const F = /* @__PURE__ */ new Map();
function se(e) {
  let n = F.get(e);
  if (!n) {
    const a = new Intl.DateTimeFormat(e, B), l = new Intl.DateTimeFormat(e, {
      ...B,
      year: "numeric"
    }), i = new Intl.DateTimeFormat(e, {
      dateStyle: "full",
      timeStyle: "medium"
    });
    n = {
      short: (m, d = /* @__PURE__ */ new Date()) => ce(m.getFullYear() === d.getFullYear() ? a : l, m),
      full: (m) => i.format(m)
    }, F.set(e, n);
  }
  return n;
}
function ie(e) {
  if (!e) return null;
  const n = new Date(e);
  return Number.isNaN(n.getTime()) ? null : n;
}
function M({ dto: e, className: n }) {
  const a = se(V()), l = ie(e.modifiedAt ?? e.createdAt);
  return l ? /* @__PURE__ */ t(A, {
    content: { label: a.full(l) },
    children: (i) => /* @__PURE__ */ t("time", {
      ...i,
      dateTime: l.toISOString(),
      className: n,
      children: a.short(l)
    })
  }) : null;
}
function me() {
  const e = Y();
  return H((n) => n.disabledCategories), !e.isCategoryDisabled("comments.writing");
}
function ye() {
  const e = K(), n = me(), a = I((o) => o.status), l = E(), i = _(), m = R(ee), d = R(te), p = I((o) => o.selected), b = D(() => p.map((o) => o.ref), [p]), h = P(null), c = P({}), x = D(() => {
    for (const o of b) {
      const r = l.getThread(o);
      if (r) return w(r.root.ref);
    }
    return null;
  }, [b, l]);
  W(() => {
    if (!x || !h.current) return;
    const o = c.current[x];
    if (!o) return;
    const r = h.current, u = o.getBoundingClientRect(), f = r.getBoundingClientRect();
    if (u.top >= f.top && u.bottom <= f.bottom) return;
    const g = o.offsetTop - r.clientHeight / 2 + o.clientHeight / 2 - r.offsetTop;
    r.scrollTo({
      top: g,
      behavior: "smooth"
    });
  }, [x]);
  const y = (o) => m.selection.select([o.root.ref]), C = (o) => {
    m.selection.select([o.root.ref]), !(o.pageIndex < 0) && d?.reveal(o.pageIndex, {
      rect: o.root.rect,
      align: {
        x: "center",
        y: 0.35
      },
      behavior: "smooth"
    });
  }, k = D(() => {
    const o = /* @__PURE__ */ new Map();
    for (const r of i) {
      const u = o.get(r.pageIndex);
      u ? u.push(r) : o.set(r.pageIndex, [r]);
    }
    return [...o.entries()].sort((r, u) => r[0] - u[0]);
  }, [i]);
  return a === "loading" ? /* @__PURE__ */ t(S, {
    icon: "comment",
    text: e("comments.loading")
  }) : a === "forbidden" ? /* @__PURE__ */ t(S, {
    icon: "lock",
    text: e("comments.forbidden")
  }) : a === "error" ? /* @__PURE__ */ t(S, {
    icon: "alertTriangle",
    text: e("comments.error"),
    children: /* @__PURE__ */ t("button", {
      type: "button",
      onClick: () => void m.refresh(),
      className: "bg-accent text-on-accent rounded-md px-3 py-1.5 text-sm font-medium",
      children: e("comments.retry")
    })
  }) : i.length === 0 ? /* @__PURE__ */ t(S, {
    icon: "comment",
    text: e(n ? "comments.empty" : "comments.emptyReadOnly")
  }) : /* @__PURE__ */ t("div", {
    ref: h,
    className: "min-h-0 flex-1 overflow-y-auto",
    children: /* @__PURE__ */ t("div", {
      className: "flex flex-col gap-5 p-3",
      children: k.map(([o, r]) => {
        const u = r.reduce((f, g) => f + fe(g), 0);
        return /* @__PURE__ */ t("div", {
          className: "flex flex-col gap-2",
          children: [/* @__PURE__ */ t("div", {
            className: "bg-surface sticky top-0 z-10",
            children: /* @__PURE__ */ t("div", {
              className: "border-border-subtle border-b pb-1.5",
              children: [/* @__PURE__ */ t("h3", {
                className: "text-fg text-sm font-semibold",
                children: e("comments.page", { params: { page: r[0].pageLabel } })
              }), u > 0 && /* @__PURE__ */ t("p", {
                className: "text-fg-muted text-xs",
                children: e("comments.count", { params: { count: u } })
              })]
            })
          }), /* @__PURE__ */ t("ul", {
            className: "flex flex-col gap-2",
            children: r.map((f) => {
              const g = w(f.root.ref);
              return /* @__PURE__ */ t(de, {
                view: f,
                writing: n,
                selected: x === g,
                onSelect: () => C(f),
                onPick: () => y(f),
                cardRef: (N) => {
                  c.current[g] = N;
                }
              }, g);
            })
          })]
        }, o);
      })
    })
  });
}
function S({ icon: e, text: n, children: a }) {
  return /* @__PURE__ */ t("div", {
    className: "flex flex-col items-center gap-3 px-4 py-10 text-center",
    children: [
      /* @__PURE__ */ t(T, {
        name: e,
        size: 32,
        className: "text-fg-muted"
      }),
      /* @__PURE__ */ t("p", {
        className: "text-fg-muted text-sm",
        children: n
      }),
      a
    ]
  });
}
function de({ view: e, writing: n, selected: a, onSelect: l, onPick: i, cardRef: m }) {
  const d = K(), p = E(), { touch: b } = $(), h = P(null), [c, x] = L(""), y = e.root.ref, C = G(e), k = !C && p.canSetText(y), o = {
    canDeleteThread: n && p.canDeleteThread(y),
    canSetStatus: n && C && p.canSetStatus(y),
    canWrite: n && (k || p.canReply(y))
  }, r = o.canSetStatus || o.canDeleteThread, u = ae(e.root), f = j(e), g = f === "completed", N = () => {
    const s = c.trim();
    s && (x(""), k ? p.setText(y, s) : p.reply(y, s));
  };
  return /* @__PURE__ */ t("li", {
    ref: m,
    onClick: l,
    onContextMenu: (s) => {
      r && (s.preventDefault(), i(), h.current?.querySelector("button")?.click());
    },
    className: `bg-surface group cursor-pointer rounded-lg border shadow-sm transition-all hover:shadow-md ${a ? "border-accent ring-accent/40 ring-2" : "border-border-subtle"}`,
    children: /* @__PURE__ */ t("div", {
      className: "flex flex-col gap-2 p-3",
      children: [
        /* @__PURE__ */ t("div", {
          className: "flex items-start gap-2.5",
          children: [
            /* @__PURE__ */ t(A, {
              content: { label: d(u.labelKey, { fallback: u.label }) },
              children: (s) => /* @__PURE__ */ t("div", {
                ...s,
                role: "img",
                "aria-label": d(u.labelKey, { fallback: u.label }),
                className: "bg-hover grid h-8 w-8 shrink-0 place-items-center rounded-full",
                children: /* @__PURE__ */ t(T, {
                  name: u.icon,
                  size: 18,
                  accent: re(e.root)
                })
              })
            }),
            /* @__PURE__ */ t("div", {
              className: "min-w-0 flex-1",
              children: [/* @__PURE__ */ t("div", {
                className: "text-fg truncate text-sm font-medium",
                children: e.root.author ?? d("comments.anonymous")
              }), /* @__PURE__ */ t("div", {
                className: "text-fg-muted flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs",
                children: [/* @__PURE__ */ t(M, { dto: e.root }), f !== "none" && /* @__PURE__ */ t(A, {
                  content: e.review.lastChange?.by ? { label: `${q(d, f)} · ${e.review.lastChange.by}` } : null,
                  children: (s) => /* @__PURE__ */ t("span", {
                    ...s,
                    className: "bg-accent-light text-accent rounded px-1.5 text-[11px] font-medium",
                    children: q(d, f)
                  })
                })]
              })]
            }),
            (o.canSetStatus || r) && /* @__PURE__ */ t("div", {
              onClick: (s) => s.stopPropagation(),
              className: `flex shrink-0 items-center ${a || b ? "" : "opacity-0 focus-within:opacity-100 group-hover:opacity-100"}`,
              children: [o.canSetStatus && /* @__PURE__ */ t(v, {
                label: d("comments.markCompleted"),
                "aria-pressed": g,
                part: U(g),
                onClick: () => void p.setStatus(y, g ? "none" : "completed"),
                className: J(g),
                children: /* @__PURE__ */ t(T, {
                  name: "circleCheck",
                  size: 20
                })
              }), r && /* @__PURE__ */ t("span", {
                ref: h,
                onPointerDownCapture: i,
                children: /* @__PURE__ */ t(ue, {})
              })]
            })
          ]
        }),
        /* @__PURE__ */ t(O, {
          annotationRef: e.root.ref,
          text: e.root.contents ?? "",
          deletable: !1,
          writing: n
        }),
        e.replies.length > 0 && /* @__PURE__ */ t("div", {
          className: "border-border-subtle flex flex-col gap-2 border-t pt-2",
          children: e.replies.map((s) => /* @__PURE__ */ t(pe, {
            dto: s,
            writing: n
          }, w(s.ref)))
        }),
        o.canWrite && (a || c) && /* @__PURE__ */ t("div", {
          className: `flex items-center gap-1.5 ${C ? "border-border-subtle border-t pt-2" : ""}`,
          onClick: (s) => s.stopPropagation(),
          children: [/* @__PURE__ */ t("input", {
            type: "text",
            value: c,
            placeholder: d(C ? "comments.replyPlaceholder" : "comments.addPlaceholder"),
            onChange: (s) => x(s.target.value),
            onKeyDown: (s) => s.key === "Enter" && N(),
            className: "border-border bg-surface text-fg focus:border-accent h-8 w-full min-w-0 flex-1 rounded-md border px-2.5 text-sm outline-none"
          }), /* @__PURE__ */ t(v, {
            label: d(C ? "comments.reply" : "commands.comment"),
            onClick: N,
            disabled: !c.trim(),
            className: "bg-accent text-on-accent grid h-8 w-8 shrink-0 place-items-center rounded-md disabled:opacity-40",
            children: /* @__PURE__ */ t(T, {
              name: "send",
              size: 16
            })
          })]
        })
      ]
    })
  });
}
function ue() {
  const e = X("menu:comment-item");
  return e.visible ? /* @__PURE__ */ t(Z, {
    cmd: e,
    variant: "icon",
    run: () => void e.run()
  }) : null;
}
function pe({ dto: e, writing: n }) {
  const a = K();
  return /* @__PURE__ */ t("div", {
    className: "border-border-subtle ms-1 border-s-2 ps-2",
    children: [/* @__PURE__ */ t("div", {
      className: "flex items-baseline gap-2",
      children: [/* @__PURE__ */ t("span", {
        className: "text-fg-secondary min-w-0 truncate text-xs font-medium",
        children: e.author ?? a("comments.anonymous")
      }), /* @__PURE__ */ t(M, {
        dto: e,
        className: "text-fg-muted shrink-0 whitespace-nowrap text-[11px]"
      })]
    }), /* @__PURE__ */ t(O, {
      annotationRef: e.ref,
      text: e.contents ?? "",
      deletable: !0,
      writing: n
    })]
  });
}
function O({ annotationRef: e, text: n, deletable: a, writing: l }) {
  const i = K(), m = E(), d = {
    canEditText: l && m.canSetText(e),
    canDelete: l && m.canDelete(e)
  }, [p, b] = L(null);
  if (p !== null) {
    const h = () => {
      const c = p.trim();
      b(null), c && c !== n && m.setText(e, c);
    };
    return /* @__PURE__ */ t("textarea", {
      value: p,
      autoFocus: !0,
      rows: 2,
      onClick: (c) => c.stopPropagation(),
      onChange: (c) => b(c.target.value),
      onBlur: h,
      onKeyDown: (c) => {
        c.key === "Enter" && !c.shiftKey && (c.preventDefault(), h()), c.key === "Escape" && b(null);
      },
      className: "border-accent bg-surface text-fg w-full resize-none rounded-md border px-2 py-1 text-sm outline-none"
    });
  }
  return !n && !a ? null : /* @__PURE__ */ t("div", {
    className: "group/body flex items-start gap-1",
    children: [
      /* @__PURE__ */ t("p", {
        className: "text-fg min-w-0 flex-1 whitespace-pre-wrap text-sm",
        children: n
      }),
      d.canEditText && /* @__PURE__ */ t(v, {
        label: i("comments.edit"),
        onClick: (h) => {
          h.stopPropagation(), b(n);
        },
        className: "text-fg-muted hover:text-fg grid h-5 w-5 shrink-0 place-items-center rounded opacity-0 group-hover/body:opacity-100",
        children: /* @__PURE__ */ t(T, {
          name: "pencilMarker",
          size: 12
        })
      }),
      a && d.canDelete && /* @__PURE__ */ t(v, {
        label: i("comments.delete"),
        onClick: (h) => {
          h.stopPropagation(), m.delete(e);
        },
        className: "text-fg-muted hover:text-fg grid h-5 w-5 shrink-0 place-items-center rounded opacity-0 group-hover/body:opacity-100",
        children: /* @__PURE__ */ t(T, {
          name: "trash",
          size: 12
        })
      })
    ]
  });
}
function q(e, n) {
  const a = Q[n];
  return a ? e(a) : n;
}
function fe(e) {
  return (e.root.contents?.trim() ? 1 : 0) + e.replies.length;
}
export {
  ye as CommentsPanel
};
//# sourceMappingURL=comments-panel-DfUngPkF-BdOkNWgM.js.map
