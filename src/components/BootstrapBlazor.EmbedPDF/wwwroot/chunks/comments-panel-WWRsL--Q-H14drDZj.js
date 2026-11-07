import { u as S, x as z, y as E, z as W, B, q as D, A, v as $, l as e, C as w, D as F, m as k, F as H, k as R, G as O, H as _, W as L, T as K, r as G, J as Y, R as J, K as U, L as V } from "./init-DY-DOXIU.js";
import { AnnotationToken as j, annotationKey as P } from "@embedpdf/plugin-annotation";
import { StageToken as Q } from "@embedpdf/plugin-stage";
const X = {
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
}, Z = {
  icon: "message",
  labelKey: "annotation.comment",
  label: "Comment"
}, ee = (t) => X[t.subtype] ?? Z, te = (t) => {
  const o = t, r = o.fontColor ?? o.color, f = o.interiorColor ?? void 0;
  return {
    ...r ? { primary: r } : {},
    ...f ? { secondary: f } : {}
  };
}, I = (t) => {
  if (!t) return "";
  const o = new Date(t);
  return Number.isNaN(o.getTime()) ? "" : o.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
};
function ne() {
  const t = w();
  return F((o) => o.disabledCategories), !t.isCategoryDisabled("comments.writing");
}
function me() {
  const t = S(), o = ne(), r = z((n) => n.status), f = E(), b = W(), h = B(j), d = B(Q), i = z((n) => n.selected), g = D(() => i.map((n) => n.ref), [i]), u = A(null), l = A({}), y = D(() => {
    for (const n of g) {
      const a = f.getThread(n);
      if (a) return P(a.root.ref);
    }
    return null;
  }, [g, f]);
  $(() => {
    if (!y || !u.current) return;
    const n = l.current[y];
    if (!n) return;
    const a = u.current, s = n.getBoundingClientRect(), m = a.getBoundingClientRect();
    if (s.top >= m.top && s.bottom <= m.bottom) return;
    const p = n.offsetTop - a.clientHeight / 2 + n.clientHeight / 2 - a.offsetTop;
    a.scrollTo({
      top: p,
      behavior: "smooth"
    });
  }, [y]);
  const x = (n) => h.selection.select([n.root.ref]), C = (n) => {
    h.selection.select([n.root.ref]), !(n.pageIndex < 0) && d?.reveal(n.pageIndex, {
      rect: n.root.rect,
      align: {
        x: "center",
        y: 0.35
      },
      behavior: "smooth"
    });
  }, N = D(() => {
    const n = /* @__PURE__ */ new Map();
    for (const a of b) {
      const s = n.get(a.pageIndex);
      s ? s.push(a) : n.set(a.pageIndex, [a]);
    }
    return [...n.entries()].sort((a, s) => a[0] - s[0]);
  }, [b]);
  return r === "loading" ? /* @__PURE__ */ e(v, {
    icon: "comment",
    text: t("comments.loading")
  }) : r === "forbidden" ? /* @__PURE__ */ e(v, {
    icon: "lock",
    text: t("comments.forbidden")
  }) : r === "error" ? /* @__PURE__ */ e(v, {
    icon: "alertTriangle",
    text: t("comments.error"),
    children: /* @__PURE__ */ e("button", {
      type: "button",
      onClick: () => void h.refresh(),
      className: "bg-accent text-on-accent rounded-md px-3 py-1.5 text-sm font-medium",
      children: t("comments.retry")
    })
  }) : b.length === 0 ? /* @__PURE__ */ e(v, {
    icon: "comment",
    text: t(o ? "comments.empty" : "comments.emptyReadOnly")
  }) : /* @__PURE__ */ e("div", {
    ref: u,
    className: "min-h-0 flex-1 overflow-y-auto",
    children: /* @__PURE__ */ e("div", {
      className: "flex flex-col gap-5 p-3",
      children: N.map(([n, a]) => {
        const s = a.reduce((m, p) => m + le(p), 0);
        return /* @__PURE__ */ e("div", {
          className: "flex flex-col gap-2",
          children: [/* @__PURE__ */ e("div", {
            className: "bg-surface sticky top-0 z-10",
            children: /* @__PURE__ */ e("div", {
              className: "border-border-subtle border-b pb-1.5",
              children: [/* @__PURE__ */ e("h3", {
                className: "text-fg text-sm font-semibold",
                children: t("comments.page", { params: { page: a[0].pageLabel } })
              }), s > 0 && /* @__PURE__ */ e("p", {
                className: "text-fg-muted text-xs",
                children: t("comments.count", { params: { count: s } })
              })]
            })
          }), /* @__PURE__ */ e("ul", {
            className: "flex flex-col gap-2",
            children: a.map((m) => {
              const p = P(m.root.ref);
              return /* @__PURE__ */ e(oe, {
                view: m,
                writing: o,
                selected: y === p,
                onSelect: () => C(m),
                onPick: () => x(m),
                cardRef: (T) => {
                  l.current[p] = T;
                }
              }, p);
            })
          })]
        }, n);
      })
    })
  });
}
function v({ icon: t, text: o, children: r }) {
  return /* @__PURE__ */ e("div", {
    className: "flex flex-col items-center gap-3 px-4 py-10 text-center",
    children: [
      /* @__PURE__ */ e(k, {
        name: t,
        size: 32,
        className: "text-fg-muted"
      }),
      /* @__PURE__ */ e("p", {
        className: "text-fg-muted text-sm",
        children: o
      }),
      r
    ]
  });
}
function oe({ view: t, writing: o, selected: r, onSelect: f, onPick: b, cardRef: h }) {
  const d = S(), i = E(), { touch: g } = H(), u = A(null), [l, y] = R(""), x = t.root.ref, C = O(t), N = !C && i.canSetText(x), n = {
    canDeleteThread: o && i.canDeleteThread(x),
    canSetStatus: o && C && i.canSetStatus(x),
    canWrite: o && (N || i.canReply(x))
  }, a = n.canSetStatus || n.canDeleteThread, s = ee(t.root), m = _(t), p = m === "completed", T = () => {
    const c = l.trim();
    c && (y(""), N ? i.setText(x, c) : i.reply(x, c));
  };
  return /* @__PURE__ */ e("li", {
    ref: h,
    onClick: f,
    onContextMenu: (c) => {
      a && (c.preventDefault(), b(), u.current?.querySelector("button")?.click());
    },
    className: `bg-surface group cursor-pointer rounded-lg border shadow-sm transition-all hover:shadow-md ${r ? "border-accent ring-accent/40 ring-2" : "border-border-subtle"}`,
    children: /* @__PURE__ */ e("div", {
      className: "flex flex-col gap-2 p-3",
      children: [
        /* @__PURE__ */ e("div", {
          className: "flex items-start gap-2.5",
          children: [
            /* @__PURE__ */ e(L, {
              content: { label: d(s.labelKey, { fallback: s.label }) },
              children: (c) => /* @__PURE__ */ e("div", {
                ...c,
                role: "img",
                "aria-label": d(s.labelKey, { fallback: s.label }),
                className: "bg-hover grid h-8 w-8 shrink-0 place-items-center rounded-full",
                children: /* @__PURE__ */ e(k, {
                  name: s.icon,
                  size: 18,
                  accent: te(t.root)
                })
              })
            }),
            /* @__PURE__ */ e("div", {
              className: "min-w-0 flex-1",
              children: [/* @__PURE__ */ e("div", {
                className: "text-fg truncate text-sm font-medium",
                children: t.root.author ?? d("comments.anonymous")
              }), /* @__PURE__ */ e("div", {
                className: "text-fg-muted flex items-center gap-1.5 text-xs",
                children: [/* @__PURE__ */ e("span", { children: I(t.root.modifiedAt ?? t.root.createdAt) }), m !== "none" && /* @__PURE__ */ e(L, {
                  content: t.review.lastChange?.by ? { label: `${q(d, m)} · ${t.review.lastChange.by}` } : null,
                  children: (c) => /* @__PURE__ */ e("span", {
                    ...c,
                    className: "bg-accent-light text-accent rounded px-1.5 text-[11px] font-medium",
                    children: q(d, m)
                  })
                })]
              })]
            }),
            (n.canSetStatus || a) && /* @__PURE__ */ e("div", {
              onClick: (c) => c.stopPropagation(),
              className: `flex shrink-0 items-center ${r || g ? "" : "opacity-0 focus-within:opacity-100 group-hover:opacity-100"}`,
              children: [n.canSetStatus && /* @__PURE__ */ e(K, {
                label: d("comments.markCompleted"),
                "aria-pressed": p,
                part: Y(p),
                onClick: () => void i.setStatus(x, p ? "none" : "completed"),
                className: G(p),
                children: /* @__PURE__ */ e(k, {
                  name: "circleCheck",
                  size: 20
                })
              }), a && /* @__PURE__ */ e("span", {
                ref: u,
                onPointerDownCapture: b,
                children: /* @__PURE__ */ e(ae, {})
              })]
            })
          ]
        }),
        /* @__PURE__ */ e(M, {
          annotationRef: t.root.ref,
          text: t.root.contents ?? "",
          deletable: !1,
          writing: o
        }),
        t.replies.length > 0 && /* @__PURE__ */ e("div", {
          className: "border-border-subtle flex flex-col gap-2 border-t pt-2",
          children: t.replies.map((c) => /* @__PURE__ */ e(re, {
            dto: c,
            writing: o
          }, P(c.ref)))
        }),
        n.canWrite && (r || l) && /* @__PURE__ */ e("div", {
          className: `flex items-center gap-1.5 ${C ? "border-border-subtle border-t pt-2" : ""}`,
          onClick: (c) => c.stopPropagation(),
          children: [/* @__PURE__ */ e("input", {
            type: "text",
            value: l,
            placeholder: d(C ? "comments.replyPlaceholder" : "comments.addPlaceholder"),
            onChange: (c) => y(c.target.value),
            onKeyDown: (c) => c.key === "Enter" && T(),
            className: "border-border bg-surface text-fg focus:border-accent h-8 w-full min-w-0 flex-1 rounded-md border px-2.5 text-sm outline-none"
          }), /* @__PURE__ */ e(K, {
            label: d(C ? "comments.reply" : "commands.comment"),
            onClick: T,
            disabled: !l.trim(),
            className: "bg-accent text-on-accent grid h-8 w-8 shrink-0 place-items-center rounded-md disabled:opacity-40",
            children: /* @__PURE__ */ e(k, {
              name: "send",
              size: 16
            })
          })]
        })
      ]
    })
  });
}
function ae() {
  const t = U("menu:comment-item");
  return t.visible ? /* @__PURE__ */ e(V, {
    cmd: t,
    variant: "icon",
    run: () => void t.run()
  }) : null;
}
function re({ dto: t, writing: o }) {
  const r = S();
  return /* @__PURE__ */ e("div", {
    className: "border-border-subtle ms-1 border-s-2 ps-2",
    children: [/* @__PURE__ */ e("div", {
      className: "flex items-baseline gap-2",
      children: [/* @__PURE__ */ e("span", {
        className: "text-fg-secondary text-xs font-medium",
        children: t.author ?? r("comments.anonymous")
      }), /* @__PURE__ */ e("span", {
        className: "text-fg-muted text-[11px]",
        children: I(t.modifiedAt ?? t.createdAt)
      })]
    }), /* @__PURE__ */ e(M, {
      annotationRef: t.ref,
      text: t.contents ?? "",
      deletable: !0,
      writing: o
    })]
  });
}
function M({ annotationRef: t, text: o, deletable: r, writing: f }) {
  const b = S(), h = E(), d = {
    canEditText: f && h.canSetText(t),
    canDelete: f && h.canDelete(t)
  }, [i, g] = R(null);
  if (i !== null) {
    const u = () => {
      const l = i.trim();
      g(null), l && l !== o && h.setText(t, l);
    };
    return /* @__PURE__ */ e("textarea", {
      value: i,
      autoFocus: !0,
      rows: 2,
      onClick: (l) => l.stopPropagation(),
      onChange: (l) => g(l.target.value),
      onBlur: u,
      onKeyDown: (l) => {
        l.key === "Enter" && !l.shiftKey && (l.preventDefault(), u()), l.key === "Escape" && g(null);
      },
      className: "border-accent bg-surface text-fg w-full resize-none rounded-md border px-2 py-1 text-sm outline-none"
    });
  }
  return !o && !r ? null : /* @__PURE__ */ e("div", {
    className: "group/body flex items-start gap-1",
    children: [
      /* @__PURE__ */ e("p", {
        className: "text-fg min-w-0 flex-1 whitespace-pre-wrap text-sm",
        children: o
      }),
      d.canEditText && /* @__PURE__ */ e(K, {
        label: b("comments.edit"),
        onClick: (u) => {
          u.stopPropagation(), g(o);
        },
        className: "text-fg-muted hover:text-fg grid h-5 w-5 shrink-0 place-items-center rounded opacity-0 group-hover/body:opacity-100",
        children: /* @__PURE__ */ e(k, {
          name: "pencilMarker",
          size: 12
        })
      }),
      r && d.canDelete && /* @__PURE__ */ e(K, {
        label: b("comments.delete"),
        onClick: (u) => {
          u.stopPropagation(), h.delete(t);
        },
        className: "text-fg-muted hover:text-fg grid h-5 w-5 shrink-0 place-items-center rounded opacity-0 group-hover/body:opacity-100",
        children: /* @__PURE__ */ e(k, {
          name: "trash",
          size: 12
        })
      })
    ]
  });
}
function q(t, o) {
  const r = J[o];
  return r ? t(r) : o;
}
function le(t) {
  return (t.root.contents?.trim() ? 1 : 0) + t.replies.length;
}
export {
  me as CommentsPanel
};
//# sourceMappingURL=comments-panel-WWRsL--Q-H14drDZj.js.map
