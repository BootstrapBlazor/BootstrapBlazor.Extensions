import { u as v, x as I, y as w, z as _, B as R, C as W, D as Y, n as D, s as P, E as A, r as H, h as t, F as $, G as j, j as T, H as G, g as q, J, K as Q, W as E, i as K, o as U, L as V, N as X, R as Z, P as ee, Q as te } from "./wasm-url-asset-C3FjD8P-.js";
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
function se(e, n) {
  const a = e.formatToParts(n), l = (i) => le.has(a[i]?.type ?? "");
  return a.map((i, m) => {
    const d = i.value.replace(/ /g, z);
    return i.type === "literal" && l(m - 1) !== l(m + 1) ? d.replace(z, " ") : d;
  }).join("");
}
const F = /* @__PURE__ */ new Map();
function ce(e) {
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
      short: (m, d = /* @__PURE__ */ new Date()) => se(m.getFullYear() === d.getFullYear() ? a : l, m),
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
function O({ dto: e, className: n }) {
  const a = ce(X()), l = ie(e.modifiedAt ?? e.createdAt);
  return l ? /* @__PURE__ */ t(E, {
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
  const e = $();
  return j((n) => n.disabledCategories), !e.isCategoryDisabled("comments.writing");
}
function ge() {
  const e = v(), n = me(), a = I((o) => o.status), l = w(), i = _(), m = R(W), d = R(Y), p = I((o) => o.selected), b = D(() => p.map((o) => o.ref), [p]), h = P(null), s = P({}), x = D(() => {
    for (const o of b) {
      const r = l.getThread(o);
      if (r) return A(r.root.ref);
    }
    return null;
  }, [b, l]);
  H(() => {
    if (!x || !h.current) return;
    const o = s.current[x];
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
  }, N = D(() => {
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
      children: N.map(([o, r]) => {
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
              const g = A(f.root.ref);
              return /* @__PURE__ */ t(de, {
                view: f,
                writing: n,
                selected: x === g,
                onSelect: () => C(f),
                onPick: () => y(f),
                cardRef: (k) => {
                  s.current[g] = k;
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
  const d = v(), p = w(), { touch: b } = G(), h = P(null), [s, x] = q(""), y = e.root.ref, C = J(e), N = !C && p.canSetText(y), o = {
    canDeleteThread: n && p.canDeleteThread(y),
    canSetStatus: n && C && p.canSetStatus(y),
    canWrite: n && (N || p.canReply(y))
  }, r = o.canSetStatus || o.canDeleteThread, u = ae(e.root), f = Q(e), g = f === "completed", k = () => {
    const c = s.trim();
    c && (x(""), N ? p.setText(y, c) : p.reply(y, c));
  };
  return /* @__PURE__ */ t("li", {
    ref: m,
    onClick: l,
    onContextMenu: (c) => {
      r && (c.preventDefault(), i(), h.current?.querySelector("button")?.click());
    },
    className: `bg-surface group cursor-pointer rounded-lg border shadow-sm transition-all hover:shadow-md ${a ? "border-accent ring-accent/40 ring-2" : "border-border-subtle"}`,
    children: /* @__PURE__ */ t("div", {
      className: "flex flex-col gap-2 p-3",
      children: [
        /* @__PURE__ */ t("div", {
          className: "flex items-start gap-2.5",
          children: [
            /* @__PURE__ */ t(E, {
              content: { label: d(u.labelKey, { fallback: u.label }) },
              children: (c) => /* @__PURE__ */ t("div", {
                ...c,
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
                children: [/* @__PURE__ */ t(O, { dto: e.root }), f !== "none" && /* @__PURE__ */ t(E, {
                  content: e.review.lastChange?.by ? { label: `${L(d, f)} · ${e.review.lastChange.by}` } : null,
                  children: (c) => /* @__PURE__ */ t("span", {
                    ...c,
                    className: "bg-accent-light text-accent rounded px-1.5 text-[11px] font-medium",
                    children: L(d, f)
                  })
                })]
              })]
            }),
            (o.canSetStatus || r) && /* @__PURE__ */ t("div", {
              onClick: (c) => c.stopPropagation(),
              className: `flex shrink-0 items-center ${a || b ? "" : "opacity-0 focus-within:opacity-100 group-hover:opacity-100"}`,
              children: [o.canSetStatus && /* @__PURE__ */ t(K, {
                label: d("comments.markCompleted"),
                "aria-pressed": g,
                part: V(g),
                onClick: () => void p.setStatus(y, g ? "none" : "completed"),
                className: U(g),
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
        /* @__PURE__ */ t(M, {
          annotationRef: e.root.ref,
          text: e.root.contents ?? "",
          deletable: !1,
          writing: n
        }),
        e.replies.length > 0 && /* @__PURE__ */ t("div", {
          className: "border-border-subtle flex flex-col gap-2 border-t pt-2",
          children: e.replies.map((c) => /* @__PURE__ */ t(pe, {
            dto: c,
            writing: n
          }, A(c.ref)))
        }),
        o.canWrite && (a || s) && /* @__PURE__ */ t("div", {
          className: `flex items-center gap-1.5 ${C ? "border-border-subtle border-t pt-2" : ""}`,
          onClick: (c) => c.stopPropagation(),
          children: [/* @__PURE__ */ t("input", {
            type: "text",
            value: s,
            placeholder: d(C ? "comments.replyPlaceholder" : "comments.addPlaceholder"),
            onChange: (c) => x(c.target.value),
            onKeyDown: (c) => c.key === "Enter" && k(),
            className: "border-border bg-surface text-fg focus:border-accent h-8 w-full min-w-0 flex-1 rounded-md border px-2.5 text-sm outline-none"
          }), /* @__PURE__ */ t(K, {
            label: d(C ? "comments.reply" : "commands.comment"),
            onClick: k,
            disabled: !s.trim(),
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
  const e = ee("menu:comment-item");
  return e.visible ? /* @__PURE__ */ t(te, {
    cmd: e,
    variant: "icon",
    run: () => void e.run()
  }) : null;
}
function pe({ dto: e, writing: n }) {
  const a = v();
  return /* @__PURE__ */ t("div", {
    className: "border-border-subtle ms-1 border-s-2 ps-2",
    children: [/* @__PURE__ */ t("div", {
      className: "flex items-baseline gap-2",
      children: [/* @__PURE__ */ t("span", {
        className: "text-fg-secondary min-w-0 truncate text-xs font-medium",
        children: e.author ?? a("comments.anonymous")
      }), /* @__PURE__ */ t(O, {
        dto: e,
        className: "text-fg-muted shrink-0 whitespace-nowrap text-[11px]"
      })]
    }), /* @__PURE__ */ t(M, {
      annotationRef: e.ref,
      text: e.contents ?? "",
      deletable: !0,
      writing: n
    })]
  });
}
function M({ annotationRef: e, text: n, deletable: a, writing: l }) {
  const i = v(), m = w(), d = {
    canEditText: l && m.canSetText(e),
    canDelete: l && m.canDelete(e)
  }, [p, b] = q(null);
  if (p !== null) {
    const h = () => {
      const s = p.trim();
      b(null), s && s !== n && m.setText(e, s);
    };
    return /* @__PURE__ */ t("textarea", {
      value: p,
      autoFocus: !0,
      rows: 2,
      onClick: (s) => s.stopPropagation(),
      onChange: (s) => b(s.target.value),
      onBlur: h,
      onKeyDown: (s) => {
        s.key === "Enter" && !s.shiftKey && (s.preventDefault(), h()), s.key === "Escape" && b(null);
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
      d.canEditText && /* @__PURE__ */ t(K, {
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
      a && d.canDelete && /* @__PURE__ */ t(K, {
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
function L(e, n) {
  const a = Z[n];
  return a ? e(a) : n;
}
function fe(e) {
  return (e.root.contents?.trim() ? 1 : 0) + e.replies.length;
}
export {
  ge as CommentsPanel
};
//# sourceMappingURL=comments-panel-CJhI-qq4-CUuxhu8S.js.map
