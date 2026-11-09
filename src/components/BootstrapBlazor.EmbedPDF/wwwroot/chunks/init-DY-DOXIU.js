var oi = (e) => {
  throw TypeError(e);
};
var tr = (e, t, n) => t.has(e) || oi("Cannot " + n);
var $ = (e, t, n) => (tr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), ge = (e, t, n) => t.has(e) ? oi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), ue = (e, t, n, o) => (tr(e, t, "write to private field"), o ? o.call(e, n) : t.set(e, n), n), pe = (e, t, n) => (tr(e, t, "access private method"), n);
import { CommandsToken as De, resolvedCommandsEqual as Jd, unknownCommandWarning as Qd, boundCommandOf as eu, unregisteredCommand as tu, commandsPlugin as nu } from "@embedpdf/plugin-commands";
import { formatShortcut as Qs, modesOf as el, barsInMode as ou, modeCommandOf as po, panelCommandOf as It, createLayout as ru, EXPANDED_MIN_WIDTH_PX as au, menuOf as tl, barsAt as iu, compileBar as nl, sameShortcut as su, normalizeBar as Jr, stripGroupsOf as lu, sameStripGroups as cu, layoutToolbar as du, groupMenuView as Pn, VIEW_MODE_COMMAND as ol, tabsOf as uu, hostOf as pu, sizeOf as fu, resolveLayout as mu, validateLayout as hu, edgeStackOf as gu, floatStackOf as bu, omittedCommandsOf as vu, barsInPanel as wu, panelPresentationsOf as yu, hideWhenIdleOf as _u, panelWidthFieldsOf as xu, hasVisibleUnits as ku, commandOfUnit as Su, didYouMean as Mu } from "@embedpdf/core-ui";
import { CommandsToken as Qr } from "@embedpdf/plugin-commands/contract/host";
import { createStandardCommands as Pu } from "@embedpdf/plugin-commands/standard";
import { browserTextMeasurer as Ou, browserPrinter as Tu, browserClock as Cu, observeAnchoredFit as Eu, sameAnchoredFit as Au, projectAnchoredTarget as Nu, scrollbarLayout as ri, paintDefault as On, createScrollbarPresses as Iu, createStageSurface as Lu, pageSurfaceLayout as Ru, makePageContext as Du, stagePageDemand as $u, paint as We, ZOOM_BOX_DASH as zu, zoomBoxPaint as Fu, stageViewProjector as Bu, pageLayersOf as Ao, rectInPixels as Lt, SNAPSHOT_BOX_DASH as Ku, snapshotBoxPaint as Hu, pictureLayerOptionsOf as rl, partsDrawnTwice as ju, whenPresented as Uu, bindPaintedImage as Gu, toolCursorsOf as Wu, wireSelectionClipboard as Vu, mixAccent as qu, svgPoints as Yu, quadInPixels as Xu, samePageBounds as Zu, sameSelectionEndpoints as Ju, attachSelectionHandle as Qu, createFontMounts as ep, fontProgramsOf as tp, sameSelectionAnchor as np, sameRotationAnchor as op, pickRequestedFile as rp, installFilePickerProvider as ap, loadAppearanceUrls as al, editingTextKeyOf as ip, pictureOrPainting as il, shownAppearance as sl, rasterInFrame as sp, annotationDrawingOf as lp, layerTextBoxesOf as cp, frameInPixels as ll, bakedAppearanceOf as dp, lookFrameOf as up, registerRendererBehaviors as pp, sceneViewBox as fp, svgShapesOf as cl, ghostOpacity as dl, freeTextBoxOf as mp, loadObjectUrl as hp, chromeInPixels as gp, annotationChromePaint as bp, createTextBoxEditorFollower as vp, createShownUrls as ul, enrichCommentThreads as wp, objectUrlOf as yp, isolateWheel as _p, createOptimisticSelection as xp, formFocusRingStyleOf as kp, formColorsOf as Sp, FORM_CONTROL_FILL as ea, listBoxControlStyleOf as Mp, createTextFieldEditor as Pp, textFieldEditorStyleOf as Op, bindFieldFocus as Tp, widgetBoxStyleOf as Cp, pressToggle as Ep, isolatePointerDown as ta, navigableLinksOf as Ap, linkAnchorOf as Np, linkActivateContextOf as Ip, sendLinkEvent as Kn, hoverLink as Lp, isModifiedClick as Rp, openExternalUri as Dp, bindCommandShortcuts as ai, isMacPlatform as No, standardCommandsBrowser as $p, createSurfaceFocusFollower as zp, copySelection as Fp, copyImage as Bp, saveFile as na, pickFile as oa, deepActiveElementOf as xn, moveFocusInto as Kp, attachFocusTrap as Hp, observeClientGeometry as Io, directionOf as ra, anchoredViewOf as pl, fitAnchoredRect as jp, indexedDbByteStore as Up, observeOutsidePress as aa, computeReleaseVelocity as Gp, observeContentLength as Wp, attachToolbarFocus as Vp, toolbarMeasureKey as ii, TOOLBAR_ITEM_ATTRIBUTE as fl, focusablesIn as qp, attachMenuKeys as ia, observeLength as ml, observeOwnLength as Yp, createToolbarLengths as Xp, ownLengthOf as Zp, isUnavailable as Jp, createDefaultActionsUiAdapter as Qp, searchHighlightsOf as ef, createClickDetector as tf, observeWidth as sa, isFromTextField as nf, observeHeight as of, vibrationFeedback as rf } from "@embedpdf/web";
import { standInFor as af, documentsState as si, DocumentsToken as Oe, documentState as li, shallowEqual as Tn, viewerSettingsOf as sf, isLocalEngine as hl, createKernel as lf, toPageRef as fo, annotationKey as nr, createCapabilityToken as cf, mergeSettings as df, isPluginError as ci, isReadMember as uf, PluginError as mo, isPdf as pf } from "@embedpdf/core";
import { ShellToken as K, shellState as ff, shellPlugin as mf } from "@embedpdf/plugin-shell";
import { interactionState as hf, InteractionToken as Cn, interactionPlugin as gf, feedbackPlugin as bf } from "@embedpdf/plugin-interaction";
import { createScrollHandler as vf, createZoomDragHandler as wf, stageState as di, ZoomMode as or, StageToken as lt, stagePlugin as ui } from "@embedpdf/plugin-stage";
import { RenderToken as tn, SNAPSHOT_TOOL as rr, renderPlugin as yf } from "@embedpdf/plugin-render";
import { RedactionToken as gt, redactionPlugin as _f } from "@embedpdf/plugin-redaction";
import { measurementState as xf, NO_PAGE_SCALE as kf, MeasurementToken as xt, measurementPlugin as Sf } from "@embedpdf/plugin-measurement";
import { StampToken as Pe, stampState as Mf, persistStampLibraries as Pf, restoreStampLibraries as Of, stampPlugin as Tf } from "@embedpdf/plugin-stamp";
import { i18nState as Cf, I18nToken as En, negotiateLocale as la, i18nPlugin as Ef } from "@embedpdf/plugin-i18n";
import { LinkToken as ho, linkPlugin as Af } from "@embedpdf/plugin-link";
import { HistoryToken as Hn, historyPlugin as Nf } from "@embedpdf/plugin-history";
import { FormToken as nn, formState as If, formPlugin as Lf } from "@embedpdf/plugin-form";
import { annotationKey as Ut, AnnotationToken as we, annotationPlugin as Rf } from "@embedpdf/plugin-annotation";
import { selectionHandleViewOf as pi, SelectionToken as An, selectionHandleEndpointsOf as Df, selectionHandleGeometry as $f, HANDLE_BAR as jn, HANDLE_PAD as Pt, HANDLE_HEAD as cn, armSelectionHandle as zf, selectionState as Ff, selectionPlugin as Bf } from "@embedpdf/plugin-selection";
import { outlineState as Kf, OutlineToken as Lo, outlinePlugin as Hf } from "@embedpdf/plugin-outline";
import { attachmentState as jf, AttachmentToken as Ro, attachmentPlugin as Uf } from "@embedpdf/plugin-attachment";
import { PageEditToken as Do, pageEditState as Gf, pageEditPlugin as Wf } from "@embedpdf/plugin-page-edit";
import { SignatureToken as on, signatureState as Vf, SIGNATURES_LIBRARY_KIND as qf, signerRowsOf as Yf, signaturePlugin as Xf } from "@embedpdf/plugin-signature";
import { LOCALES as Zf, loadDefaultLibrary as Jf } from "@embedpdf/default-stamps/library";
import { InteractionToken as Sr } from "@embedpdf/plugin-interaction/contract";
import { InteractionToken as $o } from "@embedpdf/plugin-interaction/contract/host";
import { StageToken as gl } from "@embedpdf/plugin-stage/contract";
import { resolvedCommandsEqual as Qf, unregisteredCommand as em } from "@embedpdf/plugin-commands/contract";
import { fontProgramFamily as tm } from "@embedpdf/core-fonts";
import { DEFAULT_SIGNATURE_FONTS as nm, loadSignatureFont as om } from "@embedpdf/default-signature-fonts/library";
import { RenderToken as Be } from "@embedpdf/plugin-render/contract/host";
import { SelectionToken as Gt } from "@embedpdf/plugin-selection/contract/host";
import { hasLiveDrawing as rm, scene as am, MITER_LIMIT as bl } from "@embedpdf/core-annotation";
import { AnnotationToken as Ue, previewBucket as im } from "@embedpdf/plugin-annotation/contract/host";
import { AnnotationToken as vl, annotationState as sm } from "@embedpdf/plugin-annotation/contract";
import { ActionsToken as wl, actionsPlugin as lm } from "@embedpdf/plugin-actions";
import { FontsToken as cm } from "@embedpdf/plugin-fonts/contract";
import { FormToken as Te } from "@embedpdf/plugin-form/contract/host";
import { SignatureToken as fi } from "@embedpdf/plugin-signature/contract";
import { createHoverPump as dm, ActionsToken as um } from "@embedpdf/plugin-actions/contract";
import { LinkToken as yl } from "@embedpdf/plugin-link/contract/host";
import { searchState as pm, SearchToken as rn, searchPlugin as fm } from "@embedpdf/plugin-search";
import { FontsToken as mm, fontsPlugin as hm } from "@embedpdf/plugin-fonts";
import { MetadataToken as gm, metadataPlugin as bm } from "@embedpdf/plugin-metadata";
var Nn, I, _l, mt, mi, xl, kl, ar, oo, hn, Sl, ca, Mr, Pr, Ml, go = {}, bo = [], vm = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, In = Array.isArray;
function Ge(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function da(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function Ee(e, t, n) {
  var o, r, a, s = {};
  for (a in t) a == "key" ? o = t[a] : a == "ref" ? r = t[a] : s[a] = t[a];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? Nn.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) s[a] === void 0 && (s[a] = e.defaultProps[a]);
  return gn(e, s, o, r, null);
}
function gn(e, t, n, o, r) {
  var a = { type: e, props: t, key: n, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++_l, __i: -1, __u: 0 };
  return r == null && I.vnode != null && I.vnode(a), a;
}
function wm() {
  return { current: null };
}
function D(e) {
  return e.children;
}
function xe(e, t) {
  this.props = e, this.context = t;
}
function Xt(e, t) {
  if (t == null) return e.__ ? Xt(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? Xt(e) : null;
}
function ym(e) {
  if (e.__P && e.__d) {
    var t = e.__v, n = t.__e, o = [], r = [], a = Ge({}, t);
    a.__v = t.__v + 1, I.vnode && I.vnode(a), ua(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, o, n ?? Xt(t), !!(32 & t.__u), r), a.__v = t.__v, a.__.__k[a.__i] = a, El(o, a, r), t.__e = t.__ = null, a.__e != n && Pl(a);
  }
}
function Pl(e) {
  if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
    if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
  }), Pl(e);
}
function Or(e) {
  (!e.__d && (e.__d = !0) && mt.push(e) && !vo.__r++ || mi != I.debounceRendering) && ((mi = I.debounceRendering) || xl)(vo);
}
function vo() {
  try {
    for (var e, t = 1; mt.length; ) mt.length > t && mt.sort(kl), e = mt.shift(), t = mt.length, ym(e);
  } finally {
    mt.length = vo.__r = 0;
  }
}
function Ol(e, t, n, o, r, a, s, l, d, c, p) {
  var f, u, m, b, h, g, y, v = o && o.__k || bo, _ = t.length;
  for (d = _m(n, t, v, d, _), f = 0; f < _; f++) (m = n.__k[f]) != null && (u = m.__i != -1 && v[m.__i] || go, m.__i = f, g = ua(e, m, u, r, a, s, l, d, c, p), b = m.__e, m.ref && u.ref != m.ref && (u.ref && pa(u.ref, null, m), p.push(m.ref, m.__c || b, m)), h == null && b != null && (h = b), (y = !!(4 & m.__u)) || u.__k === m.__k ? (d = Tl(m, d, e, y), y && u.__e && (u.__e = null)) : typeof m.type == "function" && g !== void 0 ? d = g : b && (d = b.nextSibling), m.__u &= -7);
  return n.__e = h, d;
}
function _m(e, t, n, o, r) {
  var a, s, l, d, c, p = n.length, f = p, u = 0;
  for (e.__k = new Array(r), a = 0; a < r; a++) (s = t[a]) != null && typeof s != "boolean" && typeof s != "function" ? (typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? s = e.__k[a] = gn(null, s, null, null, null) : In(s) ? s = e.__k[a] = gn(D, { children: s }, null, null, null) : s.constructor === void 0 && s.__b > 0 ? s = e.__k[a] = gn(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : e.__k[a] = s, d = a + u, s.__ = e, s.__b = e.__b + 1, l = null, (c = s.__i = xm(s, n, d, f)) != -1 && (f--, (l = n[c]) && (l.__u |= 2)), l == null || l.__v == null ? (c == -1 && (r > p ? u-- : r < p && u++), typeof s.type != "function" && (s.__u |= 4)) : c != d && (c == d - 1 ? u-- : c == d + 1 ? u++ : (c > d ? u-- : u++, s.__u |= 4))) : e.__k[a] = null;
  if (f) for (a = 0; a < p; a++) (l = n[a]) != null && (2 & l.__u) == 0 && (l.__e == o && (o = Xt(l)), Nl(l, l));
  return o;
}
function Tl(e, t, n, o) {
  var r, a;
  if (typeof e.type == "function") {
    for (r = e.__k, a = 0; r && a < r.length; a++) r[a] && (r[a].__ = e, t = Tl(r[a], t, n, o));
    return t;
  }
  e.__e != t && (o && (t && e.type && !t.parentNode && (t = Xt(e)), n.insertBefore(e.__e, t || null)), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function Le(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (In(e) ? e.some(function(n) {
    Le(n, t);
  }) : t.push(e)), t;
}
function xm(e, t, n, o) {
  var r, a, s, l = e.key, d = e.type, c = t[n], p = c != null && (2 & c.__u) == 0;
  if (c === null && l == null || p && l == c.key && d == c.type) return n;
  if (o > (p ? 1 : 0)) {
    for (r = n - 1, a = n + 1; r >= 0 || a < t.length; ) if ((c = t[s = r >= 0 ? r-- : a++]) != null && (2 & c.__u) == 0 && l == c.key && d == c.type) return s;
  }
  return -1;
}
function hi(e, t, n) {
  t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || vm.test(t) ? n : n + "px";
}
function Un(e, t, n, o, r) {
  var a, s;
  e: if (t == "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof o == "string" && (e.style.cssText = o = ""), o) for (t in o) n && t in n || hi(e.style, t, "");
    if (n) for (t in n) o && n[t] == o[t] || hi(e.style, t, n[t]);
  }
  else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(Sl, "$1")), s = t.toLowerCase(), t = s in e || t == "onFocusOut" || t == "onFocusIn" ? s.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? o ? n[hn] = o[hn] : (n[hn] = ca, e.addEventListener(t, a ? Pr : Mr, a)) : e.removeEventListener(t, a ? Pr : Mr, a);
  else {
    if (r == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function gi(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t[oo] == null) t[oo] = ca++;
      else if (t[oo] < n[hn]) return;
      return n(I.event ? I.event(t) : t);
    }
  };
}
function ua(e, t, n, o, r, a, s, l, d, c) {
  var p, f, u, m, b, h, g, y, v, _, O, S, x, P, M, T, L = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && (d = !!(32 & n.__u), a = [l = t.__e = n.__e]), (p = I.__b) && p(t);
  e: if (typeof L == "function") {
    f = s.length;
    try {
      if (v = t.props, _ = L.prototype && L.prototype.render, O = (p = L.contextType) && o[p.__c], S = p ? O ? O.props.value : p.__ : o, n.__c ? y = (u = t.__c = n.__c).__ = u.__E : (_ ? t.__c = u = new L(v, S) : (t.__c = u = new xe(v, S), u.constructor = L, u.render = Sm), O && O.sub(u), u.state || (u.state = {}), u.__n = o, m = u.__d = !0, u.__h = [], u._sb = []), _ && u.__s == null && (u.__s = u.state), _ && L.getDerivedStateFromProps != null && (u.__s == u.state && (u.__s = Ge({}, u.__s)), Ge(u.__s, L.getDerivedStateFromProps(v, u.__s))), b = u.props, h = u.state, u.__v = t, m) _ && L.getDerivedStateFromProps == null && u.componentWillMount != null && u.componentWillMount(), _ && u.componentDidMount != null && u.__h.push(u.componentDidMount);
      else {
        if (_ && L.getDerivedStateFromProps == null && v !== b && u.componentWillReceiveProps != null && u.componentWillReceiveProps(v, S), t.__v == n.__v || !u.__e && u.shouldComponentUpdate != null && u.shouldComponentUpdate(v, u.__s, S) === !1) {
          t.__v != n.__v && (u.props = v, u.state = u.__s, u.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(A) {
            A && (A.__ = t);
          }), bo.push.apply(u.__h, u._sb), u._sb = [], u.__h.length && s.push(u);
          break e;
        }
        u.componentWillUpdate != null && u.componentWillUpdate(v, u.__s, S), _ && u.componentDidUpdate != null && u.__h.push(function() {
          u.componentDidUpdate(b, h, g);
        });
      }
      if (u.context = S, u.props = v, u.__P = e, u.__e = !1, x = I.__r, P = 0, _) u.state = u.__s, u.__d = !1, x && x(t), p = u.render(u.props, u.state, u.context), bo.push.apply(u.__h, u._sb), u._sb = [];
      else do
        u.__d = !1, x && x(t), p = u.render(u.props, u.state, u.context), u.state = u.__s;
      while (u.__d && ++P < 25);
      u.state = u.__s, u.getChildContext != null && (o = Ge(Ge({}, o), u.getChildContext())), _ && !m && u.getSnapshotBeforeUpdate != null && (g = u.getSnapshotBeforeUpdate(b, h)), M = p != null && p.type === D && p.key == null ? Al(p.props.children) : p, l = Ol(e, In(M) ? M : [M], t, n, o, r, a, s, l, d, c), u.base = t.__e, t.__u &= -161, u.__h.length && s.push(u), y && (u.__E = u.__ = null);
    } catch (A) {
      if (s.length = f, t.__v = null, d || a != null) {
        if (A.then) {
          for (t.__u |= d ? 160 : 128; l && l.nodeType == 8 && l.nextSibling; ) l = l.nextSibling;
          a != null && (a[a.indexOf(l)] = null), t.__e = l;
        } else if (a != null) for (T = a.length; T--; ) da(a[T]);
      } else t.__e = n.__e;
      t.__k == null && (t.__k = n.__k || []), A.then || Cl(t), I.__e(A, t, n);
    }
  } else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : l = t.__e = km(n.__e, t, n, o, r, a, s, d, c);
  return (p = I.diffed) && p(t), 128 & t.__u ? void 0 : l;
}
function Cl(e) {
  e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(Cl));
}
function El(e, t, n) {
  for (var o = 0; o < n.length; o++) pa(n[o], n[++o], n[++o]);
  I.__c && I.__c(t, e), e.some(function(r) {
    try {
      e = r.__h, r.__h = [], e.some(function(a) {
        a.call(r);
      });
    } catch (a) {
      I.__e(a, r.__v);
    }
  });
}
function Al(e) {
  return typeof e != "object" || e == null || e.__b > 0 ? e : In(e) ? e.map(Al) : e.constructor !== void 0 ? null : Ge({}, e);
}
function km(e, t, n, o, r, a, s, l, d) {
  var c, p, f, u, m, b, h, g = n.props || go, y = t.props, v = t.type;
  if (v == "svg" ? r = "http://www.w3.org/2000/svg" : v == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), a != null) {
    for (c = 0; c < a.length; c++) if ((m = a[c]) && "setAttribute" in m == !!v && (v ? m.localName == v : m.nodeType == 3)) {
      e = m, a[c] = null;
      break;
    }
  }
  if (e == null) {
    if (v == null) return document.createTextNode(y);
    e = document.createElementNS(r, v, y.is && y), l && (I.__m && I.__m(t, a), l = !1), a = null;
  }
  if (v == null) g === y || l && e.data == y || (e.data = y);
  else {
    if (a = v == "textarea" && y.defaultValue != null ? null : a && Nn.call(e.childNodes), !l && a != null) for (g = {}, c = 0; c < e.attributes.length; c++) g[(m = e.attributes[c]).name] = m.value;
    for (c in g) m = g[c], c == "dangerouslySetInnerHTML" ? f = m : c == "children" || c in y || c == "value" && "defaultValue" in y || c == "checked" && "defaultChecked" in y || Un(e, c, null, m, r);
    for (c in y) m = y[c], c == "children" ? u = m : c == "dangerouslySetInnerHTML" ? p = m : c == "value" ? b = m : c == "checked" ? h = m : l && typeof m != "function" || g[c] === m || Un(e, c, m, g[c], r);
    if (p) l || f && (p.__html == f.__html || p.__html == e.innerHTML) || (e.innerHTML = p.__html), t.__k = [];
    else if (f && (e.innerHTML = ""), Ol(t.type == "template" ? e.content : e, In(u) ? u : [u], t, n, o, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, a, s, a ? a[0] : n.__k && Xt(n, 0), l, d), a != null) for (c = a.length; c--; ) da(a[c]);
    l && v != "textarea" || (c = "value", v == "progress" && b == null ? e.removeAttribute("value") : b != null && (b !== e[c] || v == "progress" && !b || v == "option" && b != g[c]) && Un(e, c, b, g[c], r), c = "checked", h != null && h != e[c] && Un(e, c, h, g[c], r));
  }
  return e;
}
function pa(e, t, n) {
  try {
    if (typeof e == "function") {
      var o = typeof e.__u == "function";
      o && e.__u(), o && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (r) {
    I.__e(r, n);
  }
}
function Nl(e, t, n) {
  var o, r;
  if (I.unmount && I.unmount(e), (o = e.ref) && (o.current && o.current != e.__e || pa(o, null, t)), (o = e.__c) != null) {
    if (o.componentWillUnmount) try {
      o.componentWillUnmount();
    } catch (a) {
      I.__e(a, t);
    }
    o.base = o.__P = o.__n = null;
  }
  if (o = e.__k) for (r = 0; r < o.length; r++) o[r] && Nl(o[r], t, n || typeof e.type != "function");
  n || da(e.__e), e.__c = e.__ = e.__e = void 0;
}
function Sm(e, t, n) {
  return this.constructor(e, n);
}
function Rt(e, t, n) {
  var o, r, a, s;
  t == document && (t = document.documentElement), I.__ && I.__(e, t), r = (o = typeof n == "function") ? null : n && n.__k || t.__k, a = [], s = [], ua(t, e = (!o && n || t).__k = Ee(D, null, [e]), r || go, go, t.namespaceURI, !o && n ? [n] : r ? null : t.firstChild ? Nn.call(t.childNodes) : null, a, !o && n ? n : r ? r.__e : t.firstChild, o, s), El(a, e, s), e.props.children = null;
}
function Il(e, t) {
  Rt(e, t, Il);
}
function Mm(e, t, n) {
  var o, r, a, s, l = Ge({}, e.props);
  for (a in e.type && e.type.defaultProps && (s = e.type.defaultProps), t) a == "key" ? o = t[a] : a == "ref" ? r = t[a] : l[a] = t[a] === void 0 && s != null ? s[a] : t[a];
  return arguments.length > 2 && (l.children = arguments.length > 3 ? Nn.call(arguments, 2) : n), gn(e.type, l, o || e.key, r || e.ref, null);
}
function be(e) {
  function t(n) {
    var o, r;
    return this.getChildContext || (o = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
      return r;
    }, this.componentWillUnmount = function() {
      o = null;
    }, this.shouldComponentUpdate = function(a) {
      this.props.value != a.value && o.forEach(function(s) {
        s.__e = !0, Or(s);
      });
    }, this.sub = function(a) {
      o.add(a);
      var s = a.componentWillUnmount;
      a.componentWillUnmount = function() {
        o && o.delete(a), s && s.call(a);
      };
    }), n.children;
  }
  return t.__c = "__cC" + Ml++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(n, o) {
    return n.children(o);
  }).contextType = t, t;
}
Nn = bo.slice, I = { __e: function(e, t, n, o) {
  for (var r, a, s; t = t.__; ) if ((r = t.__c) && !r.__) try {
    if ((a = r.constructor) && a.getDerivedStateFromError != null && (r.setState(a.getDerivedStateFromError(e)), s = r.__d), r.componentDidCatch != null && (r.componentDidCatch(e, o || {}), s = r.__d), s) return r.__E = r;
  } catch (l) {
    e = l;
  }
  throw e;
} }, _l = 0, xe.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = Ge({}, this.state), typeof e == "function" && (e = e(Ge({}, n), this.props)), e && Ge(n, e), e != null && this.__v && (t && this._sb.push(t), Or(this));
}, xe.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Or(this));
}, xe.prototype.render = D, mt = [], xl = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, kl = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, vo.__r = 0, ar = Math.random().toString(8), oo = "__d" + ar, hn = "__a" + ar, Sl = /(PointerCapture)$|Capture$/i, ca = 0, Mr = gi(!1), Pr = gi(!0), Ml = 0;
var kt, ae, ir, bi, Zt = 0, Ll = [], de = I, vi = de.__b, wi = de.__r, yi = de.diffed, _i = de.__c, xi = de.unmount, ki = de.__;
function an(e, t) {
  de.__h && de.__h(ae, e, Zt || t), Zt = 0;
  var n = ae.__H || (ae.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function C(e) {
  return Zt = 1, St(Dl, e);
}
function St(e, t, n) {
  var o = an(kt++, 2);
  if (o.t = e, !o.__c && (o.__ = [n ? n(t) : Dl(void 0, t), function(l) {
    var d = o.__N ? o.__N[0] : o.__[0], c = o.t(d, l);
    d !== c && (o.__N = [c, o.__[1]], o.__c.setState({}));
  }], o.__c = ae, !ae.__f)) {
    var r = function(l, d, c) {
      if (!o.__c.__H) return !0;
      var p = !1, f = o.__c.props !== l;
      if (o.__c.__H.__.some(function(m) {
        if (m.__N) {
          p = !0;
          var b = m.__[0];
          m.__ = m.__N, m.__N = void 0, b !== m.__[0] && (f = !0);
        }
      }), a) {
        var u = a.call(this, l, d, c);
        return p ? u || f : u;
      }
      return !p || f;
    };
    ae.__f = !0;
    var a = ae.shouldComponentUpdate, s = ae.componentWillUpdate;
    ae.componentWillUpdate = function(l, d, c) {
      if (this.__e) {
        var p = a;
        a = void 0, r(l, d, c), a = p;
      }
      s && s.call(this, l, d, c);
    }, ae.shouldComponentUpdate = r;
  }
  return o.__N || o.__;
}
function E(e, t) {
  var n = an(kt++, 3);
  !de.__s && ma(n.__H, t) && (n.__ = e, n.u = t, ae.__H.__h.push(n));
}
function R(e, t) {
  var n = an(kt++, 4);
  !de.__s && ma(n.__H, t) && (n.__ = e, n.u = t, ae.__h.push(n));
}
function k(e) {
  return Zt = 5, H(function() {
    return { current: e };
  }, []);
}
function fa(e, t, n) {
  Zt = 6, R(function() {
    if (typeof e == "function") {
      var o = e(t());
      return function() {
        e(null), o && typeof o == "function" && o();
      };
    }
    if (e) return e.current = t(), function() {
      return e.current = null;
    };
  }, n == null ? n : n.concat(e));
}
function H(e, t) {
  var n = an(kt++, 7);
  return ma(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ve(e, t) {
  return Zt = 8, H(function() {
    return e;
  }, t);
}
function X(e) {
  var t = ae.context[e.__c], n = an(kt++, 9);
  return n.c = e, t ? (n.__ == null && (n.__ = !0, t.sub(ae)), t.props.value) : e.__;
}
function Rl(e, t) {
  de.useDebugValue && de.useDebugValue(t ? t(e) : e);
}
function Je() {
  var e = an(kt++, 11);
  if (!e.__) {
    for (var t = ae.__v; t !== null && !t.__m && t.__ !== null; ) t = t.__;
    var n = t.__m || (t.__m = [0, 0]);
    e.__ = "P" + n[0] + "-" + n[1]++;
  }
  return e.__;
}
function Pm() {
  for (var e; e = Ll.shift(); ) {
    var t = e.__H;
    if (e.__P && t) try {
      t.__h.some(ro), t.__h.some(Tr), t.__h = [];
    } catch (n) {
      t.__h = [], de.__e(n, e.__v);
    }
  }
}
de.__b = function(e) {
  ae = null, vi && vi(e);
}, de.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), ki && ki(e, t);
}, de.__r = function(e) {
  wi && wi(e), kt = 0;
  var t = (ae = e.__c).__H;
  t && (ir === ae ? (t.__h = [], ae.__h = [], t.__.some(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (t.__h.some(ro), t.__h.some(Tr), t.__h = [], kt = 0)), ir = ae;
}, de.diffed = function(e) {
  yi && yi(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (Ll.push(t) !== 1 && bi === de.requestAnimationFrame || ((bi = de.requestAnimationFrame) || Om)(Pm)), t.__H.__.some(function(n) {
    n.u && (n.__H = n.u, n.u = void 0);
  })), ir = ae = null;
}, de.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.some(ro), n.__h = n.__h.filter(function(o) {
        return !o.__ || Tr(o);
      });
    } catch (o) {
      t.some(function(r) {
        r.__h && (r.__h = []);
      }), t = [], de.__e(o, n.__v);
    }
  }), _i && _i(e, t);
}, de.unmount = function(e) {
  xi && xi(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.some(function(o) {
    try {
      ro(o);
    } catch (r) {
      t = r;
    }
  }), n.__H = void 0, t && de.__e(t, n.__v));
};
var Si = typeof requestAnimationFrame == "function";
function Om(e) {
  var t, n = function() {
    clearTimeout(o), Si && cancelAnimationFrame(t), setTimeout(e);
  }, o = setTimeout(n, 35);
  Si && (t = requestAnimationFrame(n));
}
function ro(e) {
  var t = ae, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), ae = t;
}
function Tr(e) {
  var t = ae;
  e.__c = e.__(), ae = t;
}
function ma(e, t) {
  return !e || e.length !== t.length || t.some(function(n, o) {
    return n !== e[o];
  });
}
function Dl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function $l(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Cr(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var o in t) if (o !== "__source" && e[o] !== t[o]) return !0;
  return !1;
}
function Xe(e, t) {
  var n = t(), o = C({ t: { __: n, u: t } }), r = o[0].t, a = o[1];
  return R(function() {
    r.__ = n, r.u = t, sr(r) && a({ t: r });
  }, [e, n, t]), E(function() {
    return sr(r) && a({ t: r }), e(function() {
      sr(r) && a({ t: r });
    });
  }, [e]), n;
}
function sr(e) {
  try {
    return !((t = e.__) === (n = e.u()) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
  } catch {
    return !0;
  }
  var t, n;
}
function zl(e) {
  e();
}
function Fl(e) {
  return e;
}
function Bl() {
  return [!1, zl];
}
var ha = R;
function Er(e, t) {
  this.props = e, this.context = t;
}
function Tm(e, t) {
  function n(r) {
    var a = this.props.ref;
    return a != r.ref && a && (typeof a == "function" ? a(null) : a.current = null), t ? !t(this.props, r) || a != r.ref : Cr(this.props, r);
  }
  function o(r) {
    return this.shouldComponentUpdate = n, Ee(e, r);
  }
  return o.displayName = "Memo(" + (e.displayName || e.name) + ")", o.__f = o.prototype.isReactComponent = !0, o.type = e, o;
}
(Er.prototype = new xe()).isPureReactComponent = !0, Er.prototype.shouldComponentUpdate = function(e, t) {
  return Cr(this.props, e) || Cr(this.state, t);
};
var Mi = I.__b;
I.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Mi && Mi(e);
};
var Cm = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function Kl(e) {
  function t(n) {
    var o = $l({}, n);
    return delete o.ref, e(o, n.ref || null);
  }
  return t.$$typeof = Cm, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var Pi = function(e, t) {
  return e == null ? null : Le(Le(e).map(t));
}, Em = { map: Pi, forEach: Pi, count: function(e) {
  return e ? Le(e).length : 0;
}, only: function(e) {
  var t = Le(e);
  if (t.length !== 1) throw "Children.only";
  return t[0];
}, toArray: Le }, Am = I.__e;
I.__e = function(e, t, n, o) {
  if (e.then) {
    for (var r, a = t; a = a.__; ) if ((r = a.__c) && r.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k || []), r.__c(e, t);
  }
  Am(e, t, n, o);
};
var Oi = I.unmount;
function Hl(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), e.__c.__H = null), (e = $l({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
    return Hl(o, t, n);
  })), e;
}
function jl(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
    return jl(o, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function bn() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Ul(e) {
  var t = e.__ && e.__.__c;
  return t && t.__a && t.__a(e);
}
function Gl(e) {
  var t, n, o, r = null;
  function a(s) {
    if (t || (t = e()).then(function(l) {
      l && (r = l.default || l), o = !0;
    }, function(l) {
      n = l, o = !0;
    }), n) throw n;
    if (!o) throw t;
    return r ? Ee(r, s) : null;
  }
  return a.displayName = "Lazy", a.__f = !0, a;
}
function mn() {
  this.i = null, this.l = null;
}
I.unmount = function(e) {
  var t = e.__c;
  t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Oi && Oi(e);
}, (bn.prototype = new xe()).__c = function(e, t) {
  var n = t.__c, o = this;
  o.o == null && (o.o = []), o.o.push(n);
  var r = Ul(o.__v), a = !1, s = function() {
    a || o.__z || (a = !0, n.__R = null, r ? r(d) : d());
  };
  n.__R = s;
  var l = n.__P;
  n.__P = null;
  var d = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var c = o.state.__a;
        o.__v.__k[0] = jl(c, c.__c.__P, c.__c.__O);
      }
      var p;
      for (o.setState({ __a: o.__b = null }); p = o.o.pop(); ) p.__P = l, p.forceUpdate();
    }
  };
  o.__u++ || 32 & t.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(s, s);
}, bn.prototype.componentWillUnmount = function() {
  this.o = [];
}, bn.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = Hl(this.__b, n, o.__O = o.__P);
    }
    this.__b = null;
  }
  var r = t.__a && Ee(D, null, e.fallback);
  return r && (r.__u &= -33), [Ee(D, null, t.__a ? null : e.children), r];
};
var Ti = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
function Nm(e) {
  return this.getChildContext = function() {
    return e.context;
  }, e.children;
}
function Im(e) {
  var t = this, n = e.h;
  if (t.componentWillUnmount = function() {
    Rt(null, t.v), t.v = null, t.h = null;
  }, t.h && t.h !== n && t.componentWillUnmount(), !t.v) {
    for (var o = t.__v; o !== null && !o.__m && o.__ !== null; ) o = o.__;
    t.h = n, t.v = { nodeType: 1, parentNode: n, childNodes: [], __k: { __m: o.__m }, contains: function() {
      return !0;
    }, namespaceURI: n.namespaceURI, insertBefore: function(r, a) {
      this.childNodes.push(r), t.h.insertBefore(r, a);
    }, removeChild: function(r) {
      this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), t.h.removeChild(r);
    } };
  }
  Rt(Ee(Nm, { context: t.context }, e.__v), t.v);
}
function ga(e, t) {
  var n = Ee(Im, { __v: e, h: t });
  return n.containerInfo = t, n;
}
(mn.prototype = new xe()).__a = function(e) {
  var t = this, n = Ul(t.__v), o = t.l.get(e);
  return o[0]++, function(r) {
    var a = function() {
      t.props.revealOrder ? (o.push(r), Ti(t, e, o)) : r();
    };
    n ? n(a) : a();
  };
}, mn.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = Le(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, mn.prototype.componentDidUpdate = mn.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    Ti(e, n, t);
  });
};
var Wl = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Lm = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Rm = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Dm = /[A-Z0-9]/g, $m = typeof document < "u", zm = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function Fm(e, t, n) {
  return t.__k == null && (t.textContent = ""), Rt(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function Bm(e, t, n) {
  return Il(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
xe.prototype.isReactComponent = !0, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(xe.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var Ci = I.event;
I.event = function(e) {
  return Ci && (e = Ci(e)), e.persist = function() {
  }, e.isPropagationStopped = function() {
    return this.cancelBubble;
  }, e.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, e.nativeEvent = e;
};
var ba, Km = { configurable: !0, get: function() {
  return this.class;
} }, Ei = I.vnode;
I.vnode = function(e) {
  typeof e.type == "string" && (function(t) {
    var n = t.props, o = t.type, r = {}, a = o.indexOf("-") == -1;
    for (var s in n) {
      var l = n[s];
      if (!(s === "value" && "defaultValue" in n && l == null || $m && s === "children" && o === "noscript" || s === "class" || s === "className")) {
        var d = s.toLowerCase();
        s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && l === !0 ? l = "" : d === "translate" && l === "no" ? l = !1 : d[0] === "o" && d[1] === "n" ? d === "ondoubleclick" ? s = "ondblclick" : d !== "onchange" || o !== "input" && o !== "textarea" || zm(n.type) ? d === "onfocus" ? s = "onfocusin" : d === "onblur" ? s = "onfocusout" : Rm.test(s) && (s = d) : d = s = "oninput" : a && Lm.test(s) ? s = s.replace(Dm, "-$&").toLowerCase() : l === null && (l = void 0), d === "oninput" && r[s = d] && (s = "oninputCapture"), r[s] = l;
      }
    }
    o == "select" && (r.multiple && Array.isArray(r.value) && (r.value = Le(n.children).forEach(function(c) {
      c.props.selected = r.value.indexOf(c.props.value) != -1;
    })), r.defaultValue != null && (r.value = Le(n.children).forEach(function(c) {
      c.props.selected = r.multiple ? r.defaultValue.indexOf(c.props.value) != -1 : r.defaultValue == c.props.value;
    }))), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", Km)) : n.className && (r.class = r.className = n.className), t.props = r;
  })(e), e.$$typeof = Wl, Ei && Ei(e);
};
var Ai = I.__r;
I.__r = function(e) {
  Ai && Ai(e), ba = e.__c;
};
var Ni = I.diffed;
I.diffed = function(e) {
  Ni && Ni(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), ba = null;
};
var Hm = { ReactCurrentDispatcher: { current: { readContext: function(e) {
  return ba.__n[e.__c].props.value;
}, useCallback: Ve, useContext: X, useDebugValue: Rl, useDeferredValue: Fl, useEffect: E, useId: Je, useImperativeHandle: fa, useInsertionEffect: ha, useLayoutEffect: R, useMemo: H, useReducer: St, useRef: k, useState: C, useSyncExternalStore: Xe, useTransition: Bl } } }, jm = "18.3.1";
function Um(e) {
  return Ee.bind(null, e);
}
function zo(e) {
  return !!e && e.$$typeof === Wl;
}
function Gm(e) {
  return zo(e) && e.type === D;
}
function Wm(e) {
  return !!e && typeof e.displayName == "string" && e.displayName.indexOf("Memo(") == 0;
}
function Vm(e) {
  return zo(e) ? Mm.apply(null, arguments) : e;
}
function qm(e) {
  return !!e.__k && (Rt(null, e), !0);
}
function Ym(e) {
  return e && (e.base || e.nodeType === 1 && e) || null;
}
var Xm = function(e, t) {
  return e(t);
}, Zm = function(e, t) {
  var n = I.debounceRendering;
  I.debounceRendering = function(r) {
    return r();
  };
  var o = e(t);
  return I.debounceRendering = n, o;
}, Jm = zo, Qm = { useState: C, useId: Je, useReducer: St, useEffect: E, useLayoutEffect: R, useInsertionEffect: ha, useTransition: Bl, useDeferredValue: Fl, useSyncExternalStore: Xe, startTransition: zl, useRef: k, useImperativeHandle: fa, useMemo: H, useCallback: Ve, useContext: X, useDebugValue: Rl, version: "18.3.1", Children: Em, render: Fm, hydrate: Bm, unmountComponentAtNode: qm, createPortal: ga, createElement: Ee, createContext: be, createFactory: Um, cloneElement: Vm, createRef: wm, Fragment: D, isValidElement: zo, isElement: Jm, isFragment: Gm, isMemo: Wm, findDOMNode: Ym, Component: xe, PureComponent: Er, memo: Tm, forwardRef: Kl, flushSync: Zm, unstable_batchedUpdates: Xm, StrictMode: D, Suspense: bn, SuspenseList: mn, lazy: Gl, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Hm };
function eh(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Ii(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var o in t) if (o !== "__source" && e[o] !== t[o]) return !0;
  return !1;
}
function Li(e, t) {
  this.props = e, this.context = t;
}
(Li.prototype = new xe()).isPureReactComponent = !0, Li.prototype.shouldComponentUpdate = function(e, t) {
  return Ii(this.props, e) || Ii(this.state, t);
};
var Ri = I.__b;
I.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Ri && Ri(e);
};
var th = I.__e;
I.__e = function(e, t, n, o) {
  if (e.then) {
    for (var r, a = t; a = a.__; ) if ((r = a.__c) && r.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k || []), r.__c(e, t);
  }
  th(e, t, n, o);
};
var Di = I.unmount;
function Vl(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), e.__c.__H = null), (e = eh({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
    return Vl(o, t, n);
  })), e;
}
function ql(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
    return ql(o, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function lr() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Yl(e) {
  var t = e.__ && e.__.__c;
  return t && t.__a && t.__a(e);
}
function Gn() {
  this.i = null, this.l = null;
}
I.unmount = function(e) {
  var t = e.__c;
  t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Di && Di(e);
}, (lr.prototype = new xe()).__c = function(e, t) {
  var n = t.__c, o = this;
  o.o == null && (o.o = []), o.o.push(n);
  var r = Yl(o.__v), a = !1, s = function() {
    a || o.__z || (a = !0, n.__R = null, r ? r(d) : d());
  };
  n.__R = s;
  var l = n.__P;
  n.__P = null;
  var d = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var c = o.state.__a;
        o.__v.__k[0] = ql(c, c.__c.__P, c.__c.__O);
      }
      var p;
      for (o.setState({ __a: o.__b = null }); p = o.o.pop(); ) p.__P = l, p.forceUpdate();
    }
  };
  o.__u++ || 32 & t.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(s, s);
}, lr.prototype.componentWillUnmount = function() {
  this.o = [];
}, lr.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = Vl(this.__b, n, o.__O = o.__P);
    }
    this.__b = null;
  }
  var r = t.__a && Ee(D, null, e.fallback);
  return r && (r.__u &= -33), [Ee(D, null, t.__a ? null : e.children), r];
};
var $i = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
(Gn.prototype = new xe()).__a = function(e) {
  var t = this, n = Yl(t.__v), o = t.l.get(e);
  return o[0]++, function(r) {
    var a = function() {
      t.props.revealOrder ? (o.push(r), $i(t, e, o)) : r();
    };
    n ? n(a) : a();
  };
}, Gn.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = Le(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, Gn.prototype.componentDidUpdate = Gn.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    $i(e, n, t);
  });
};
var nh = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, oh = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, rh = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, ah = /[A-Z0-9]/g, ih = typeof document < "u", sh = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function lh(e, t, n) {
  return t.__k == null && (t.textContent = ""), Rt(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
xe.prototype.isReactComponent = !0, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(xe.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var zi = I.event;
I.event = function(e) {
  return zi && (e = zi(e)), e.persist = function() {
  }, e.isPropagationStopped = function() {
    return this.cancelBubble;
  }, e.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, e.nativeEvent = e;
};
var ch = { configurable: !0, get: function() {
  return this.class;
} }, Fi = I.vnode;
I.vnode = function(e) {
  typeof e.type == "string" && (function(t) {
    var n = t.props, o = t.type, r = {}, a = o.indexOf("-") == -1;
    for (var s in n) {
      var l = n[s];
      if (!(s === "value" && "defaultValue" in n && l == null || ih && s === "children" && o === "noscript" || s === "class" || s === "className")) {
        var d = s.toLowerCase();
        s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && l === !0 ? l = "" : d === "translate" && l === "no" ? l = !1 : d[0] === "o" && d[1] === "n" ? d === "ondoubleclick" ? s = "ondblclick" : d !== "onchange" || o !== "input" && o !== "textarea" || sh(n.type) ? d === "onfocus" ? s = "onfocusin" : d === "onblur" ? s = "onfocusout" : rh.test(s) && (s = d) : d = s = "oninput" : a && oh.test(s) ? s = s.replace(ah, "-$&").toLowerCase() : l === null && (l = void 0), d === "oninput" && r[s = d] && (s = "oninputCapture"), r[s] = l;
      }
    }
    o == "select" && (r.multiple && Array.isArray(r.value) && (r.value = Le(n.children).forEach(function(c) {
      c.props.selected = r.value.indexOf(c.props.value) != -1;
    })), r.defaultValue != null && (r.value = Le(n.children).forEach(function(c) {
      c.props.selected = r.multiple ? r.defaultValue.indexOf(c.props.value) != -1 : r.defaultValue == c.props.value;
    }))), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", ch)) : n.className && (r.class = r.className = n.className), t.props = r;
  })(e), e.$$typeof = nh, Fi && Fi(e);
};
var Bi = I.__r;
I.__r = function(e) {
  Bi && Bi(e), e.__c;
};
var Ki = I.diffed;
I.diffed = function(e) {
  Ki && Ki(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
function dh(e) {
  return !!e.__k && (Rt(null, e), !0);
}
function uh(e) {
  return {
    // eslint-disable-next-line
    render: function(t) {
      lh(t, e);
    },
    // eslint-disable-next-line
    unmount: function() {
      dh(e);
    }
  };
}
var ph = 0;
function i(e, t, n, o, r, a) {
  t || (t = {});
  var s, l, d = t;
  if ("ref" in d) for (l in d = {}, t) l == "ref" ? s = t[l] : d[l] = t[l];
  var c = { type: e, props: d, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --ph, __i: -1, __u: 0, __source: r, __self: a };
  if (typeof e == "function" && (s = e.defaultProps)) for (l in s) d[l] === void 0 && (d[l] = s[l]);
  return I.vnode && I.vnode(c), c;
}
const Hi = /* @__PURE__ */ new Set();
function Xl() {
  try {
    return !1;
  } catch {
    return !0;
  }
}
function Ln(e, t) {
  !Xl() || Hi.has(e) || (Hi.add(e), console.warn(`[embedpdf] ${t}`));
}
const Zl = be(null), fh = be(null);
function ct() {
  const e = X(Zl);
  if (!e) throw new Error("useKernel must be used within <Viewer>/<EmbedPDF>");
  return e;
}
const qe = (e, t) => e === t || e.length === t.length && e.every((n, o) => n === t[o]);
function ie(e, t = Object.is) {
  const n = ct(), o = k(null), r = () => {
    const a = e(n);
    return o.current && t(o.current.v, a) ? o.current.v : (o.current = { v: a }, a);
  };
  return Xe(n.subscribe, r);
}
function mh() {
  return ie((e) => e.documents.getActiveId());
}
function ye() {
  const e = Ze(), t = mh();
  return e ?? t;
}
function Ze() {
  return X(fh);
}
function hh({ fallback: e = null, locked: t, error: n, children: o }) {
  const r = wo();
  return r.status === "ready" ? /* @__PURE__ */ i(D, { children: o }) : r.status === "locked" && t ? /* @__PURE__ */ i(D, { children: t(r) }) : r.status === "error" && n ? /* @__PURE__ */ i(D, { children: n(r) }) : /* @__PURE__ */ i(D, { children: e });
}
function j(e) {
  const t = ct(), n = Q(e);
  return n || (t.scopeOf(e) === "document" ? af(t, e) : t.capability(e));
}
function Q(e) {
  const t = Ze();
  return ie((n) => n.tryCapability(e, t ?? void 0));
}
function W(e, t, n = Object.is) {
  const o = ct(), r = Ze(), a = Q(e) ?? o.capability(e, r ?? void 0), s = k(null), l = () => {
    const d = t(a);
    return s.current && n(s.current.v, d) ? s.current.v : (s.current = { v: d }, d);
  };
  return Xe(o.subscribe, l);
}
function oe(e, t, n, o = Object.is) {
  const r = ct(), a = Q(e), s = k(null), l = () => {
    let d;
    if (a === null)
      d = n;
    else
      try {
        d = t(a);
      } catch {
        d = n;
      }
    return s.current && o(s.current.v, d) ? s.current.v : (s.current = { v: d }, d);
  };
  return Xe(r.subscribe, l);
}
function va(e, t, n) {
  const o = Q(e), r = k(n);
  r.current = n;
  const a = k(t);
  a.current = t, E(() => {
    if (o)
      return a.current(o)((s) => r.current(s));
  }, [o]);
}
function wa() {
  return j(Oe);
}
function Jl(e, t, n, o) {
  const r = Ze();
  return ie((a) => {
    const s = a.tryCapability(e, r ?? void 0), l = s ? t(s) : n;
    return o ? o(l) : l;
  }, Tn);
}
function wo(e) {
  return Jl(Oe, li.read, li.empty, e);
}
function Fo(e) {
  return Jl(Oe, si.read, si.empty, e);
}
const gh = Object.freeze([]);
function bh() {
  const e = ye();
  return ie(
    (t) => e ? t.documents.listPages(e) : gh
  );
}
function Dt(e) {
  return ie((t) => {
    const n = t.getSettings();
    return e ? e(n) : n;
  }, Tn);
}
const vh = Kl(function({
  engine: t,
  plugins: n,
  initialDocuments: o,
  fallback: r,
  renderError: a,
  onReady: s,
  identity: l,
  scope: d,
  accent: c,
  page: p,
  fetch: f,
  children: u
}, m) {
  const b = k({ engine: t, plugins: n, initialDocuments: o }), h = sf({ identity: l, scope: d, accent: c, page: p }), g = k(h);
  g.current = h;
  const y = k(!1);
  Xl() && !y.current && (b.current.engine !== t || b.current.plugins !== n) && (y.current = !0, console.warn(
    "[embedpdf] <Viewer> engine/plugins are init-only. A changed identity is ignored — pass stable references (module scope, useState, or useMemo). An inline `plugins={[...]}` array recreates its identity every render."
  ));
  const [v, _] = C({ phase: "booting", kernel: null }), O = k(s);
  O.current = s;
  const S = k(f);
  S.current = f, fa(
    m,
    () => v.phase === "ready" ? v.kernel : null,
    [v]
  ), E(() => {
    const P = b.current, M = typeof P.engine == "function", T = M ? P.engine() : P.engine;
    hl(T) && T.warmup();
    let L;
    try {
      L = lf({
        engine: T,
        plugins: P.plugins,
        settings: g.current,
        clock: Cu(),
        printer: Tu(),
        measurer: Ou(),
        fetch: (F, ce) => (S.current ?? globalThis.fetch)(F, ce)
      });
    } catch (F) {
      _({ phase: "error", error: F }), M && T.destroy();
      return;
    }
    let A = !0;
    return _({ phase: "booting", kernel: L }), L.start().then(
      () => {
        A && (O.current?.(L), _({ phase: "ready", kernel: L }), L.documents.openAll(P.initialDocuments ?? []));
      },
      (F) => {
        A && _({ phase: "error", error: F });
      }
    ), () => {
      A = !1, L.destroy().then(() => {
        M && T.destroy();
      });
    };
  }, []);
  const x = v.phase === "error" ? null : v.kernel;
  return E(() => {
    x?.updateSettings(g.current);
  }), v.phase === "error" ? /* @__PURE__ */ i(D, { children: a ? a(v.error) : null }) : v.kernel ? /* @__PURE__ */ i(Zl.Provider, { value: v.kernel, children: v.phase === "ready" ? u : r ?? null }) : null;
}), Ql = be(null), wh = Ql.Provider;
function $e() {
  const e = X(Ql);
  if (!e) throw new Error("usePage must be used inside <PageView> or a <Stage> page");
  return e;
}
const ya = be(null), yh = ya.Provider, ec = be(null), _h = ec.Provider;
function xh() {
  return X(ya);
}
function tc() {
  const e = X(ya);
  if (!e)
    throw new Error(
      "No ViewProjector in scope: mount anchored UI under <Stage> (overlay slot) or <PageView>."
    );
  return e;
}
function Bo(e) {
  const t = X(ec);
  return !e.anchor?.bounds || t && !t.has(e.anchor.page.objectNumber) ? null : /* @__PURE__ */ i(kh, { ...e });
}
function kh({
  anchor: e,
  placement: t = "top",
  gap: n = 8,
  pinned: o = !1,
  children: r
}) {
  const { projector: a, subscribe: s } = tc(), [l, d] = C(null), [c, p] = C(null), [, f] = St((b) => b + 1, 0);
  if (R(() => s ? s(f) : void 0, [s]), R(() => {
    a.space === "client" && f();
  }, [a, e]), R(() => {
    if (l)
      return Eu(
        l,
        a.space,
        (b) => p((h) => Au(h, b) ? h : b)
      );
  }, [l, a.space]), E(() => {
    if (!l) return;
    const b = (h) => h.stopPropagation();
    return l.addEventListener("pointerdown", b), () => l.removeEventListener("pointerdown", b);
  }, [l]), !e?.bounds) return null;
  const u = Nu(
    a,
    { ...e, bounds: e.bounds },
    { placement: t, gap: n, pinned: o },
    c
  );
  if (!u) return null;
  const m = /* @__PURE__ */ i(
    "div",
    {
      ref: d,
      "data-placement": u.placement,
      style: {
        position: a.space === "client" ? "fixed" : "absolute",
        left: u.left,
        top: u.top,
        // Its own width, wherever it sits: the size the placement measured.
        width: "max-content",
        transform: u.transform,
        pointerEvents: "auto"
      },
      children: r
    }
  );
  return a.space === "client" ? typeof document > "u" ? null : ga(m, document.body) : m;
}
const nc = be(null);
function Sh({ token: e, children: t }) {
  return /* @__PURE__ */ i(nc.Provider, { value: e, children: t });
}
function $t(e) {
  const t = X(nc);
  return e ?? t ?? gl;
}
const Mh = Object.freeze({
  scrollLeft: 0,
  scrollTop: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  clientWidth: 0,
  clientHeight: 0,
  scrollableX: !1,
  scrollableY: !1
});
function Ph(e) {
  const t = oc($t(e)), n = Ze();
  return ie(
    (o) => o.tryCapability(t, n ?? void 0)?.getScrollMetrics() ?? Mh
  );
}
const oc = (e) => e;
function Ar({
  axis: e,
  token: t,
  autoHide: n = 1200,
  minThumbSize: o = 24,
  trackPress: r = "page",
  className: a,
  style: s,
  thumbClassName: l,
  thumbStyle: d
}) {
  const c = $t(t), p = j(oc(c)), f = Ph(c), u = e === "y", m = u ? f.scrollableY : f.scrollableX, b = k(null), [h, g] = C(0), [y, v] = C(!1), [_, O] = C(!1), [S, x] = C(!0), P = ri(f, u, h, o), M = n === !1 ? 0 : n;
  E(() => {
    if (!M) return;
    x(!0);
    const te = setTimeout(() => x(!1), M);
    return () => clearTimeout(te);
  }, [f, M]);
  const T = !M || S || _ || y;
  E(() => {
    const te = b.current;
    if (!te) return;
    const se = () => g(u ? te.clientHeight : te.clientWidth), nt = new ResizeObserver(se);
    return nt.observe(te), se(), () => nt.disconnect();
  }, [u, m]);
  const L = H(() => Iu(v), []), A = () => ({
    stage: p,
    vertical: u,
    element: b.current,
    layout: P,
    // Fresh geometry for paging steps — read from the capability, never a stale render.
    liveLayout: () => ri(p.getScrollMetrics(), u, h, o)
  });
  if (E(() => () => L.release(), [L]), !m) return null;
  const F = u ? { position: "absolute", top: 0, right: 0, bottom: 0, width: 12 } : { position: "absolute", left: 0, right: 0, bottom: 0, height: 12 }, ce = u ? {
    position: "absolute",
    left: 2,
    right: 2,
    top: P.thumbPosition,
    height: P.thumbLength
  } : {
    position: "absolute",
    top: 2,
    bottom: 2,
    left: P.thumbPosition,
    width: P.thumbLength
  };
  return /* @__PURE__ */ i(
    "div",
    {
      ref: b,
      role: "scrollbar",
      "aria-orientation": u ? "vertical" : "horizontal",
      "aria-valuemin": 0,
      "aria-valuemax": Math.round(P.maxOffset),
      "aria-valuenow": Math.round(P.offset),
      "data-embedpdf-scrollbar": "",
      "data-axis": e,
      "data-state": T ? "visible" : "hidden",
      "data-dragging": y ? "" : void 0,
      className: a,
      style: {
        ...F,
        touchAction: "none",
        userSelect: "none",
        opacity: T ? 1 : 0,
        transition: "opacity 200ms",
        // a hidden overlay bar must not eat the clicks under it
        pointerEvents: T ? "auto" : "none",
        ...s
      },
      onPointerDown: (te) => L.pressTrack(te, A(), r),
      onPointerMove: (te) => L.move(te, A()),
      onPointerUp: () => L.release(),
      onPointerCancel: () => L.release(),
      onPointerEnter: () => O(!0),
      onPointerLeave: () => O(!1),
      children: /* @__PURE__ */ i(
        "div",
        {
          "data-embedpdf-scrollbar-thumb": "",
          className: l,
          style: {
            ...ce,
            borderRadius: 6,
            background: On("scrollbar-thumb"),
            ...d
          },
          onPointerDown: (te) => L.pressThumb(te, A())
        }
      )
    }
  );
}
function Oh({
  documentId: e,
  page: t,
  frame: n,
  stage: o,
  render: r,
  chrome: a
}) {
  const s = k(null), l = t.transform, d = Dt((m) => m.page), c = Ru(l, n, { x: t.screenX, y: t.screenY }), p = t.ref.objectNumber, f = H(() => fo(p), [p]), u = H(
    () => Du(
      e,
      // the hosting lens — per-view raster planning keys tile state by it,
      // so a thumbnail rail and the main view never fight over one plan
      o.getLensId(),
      f,
      t.pageIndex,
      n,
      l,
      () => s.current.getBoundingClientRect(),
      () => $u(o, p, l.deviceWidth)
    ),
    [e, f, p, t.pageIndex, n, l, o]
  );
  return /* @__PURE__ */ i("div", { style: { position: "absolute", ...c.outer }, children: /* @__PURE__ */ i(wh, { value: u, children: [
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "absolute",
          ...c.shadow,
          boxShadow: We("page-shadow", d.shadow)
        }
      }
    ),
    /* @__PURE__ */ i(
      "div",
      {
        ref: s,
        style: {
          position: "absolute",
          ...c.content,
          background: We("page-background", d.background),
          transform: c.turn ?? void 0,
          // We render our own selection highlights — suppress native text/image
          // selection (and the double-click image grab) on the whole page subtree.
          userSelect: "none",
          WebkitUserSelect: "none"
        },
        children: r(u)
      }
    ),
    a?.(u)
  ] }) });
}
function Th({ token: e }) {
  const n = W(e, (a) => a.getZoomBox()), o = W(e, (a) => a.getSettings().zoomBox), r = Dt((a) => a.accent);
  return n ? /* @__PURE__ */ i(
    "svg",
    {
      "aria-hidden": !0,
      width: n.width,
      height: n.height,
      style: {
        position: "absolute",
        left: n.x,
        top: n.y,
        overflow: "visible",
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ i(
        "rect",
        {
          width: n.width,
          height: n.height,
          strokeWidth: 1,
          strokeDasharray: zu,
          style: Fu(o, r)
        }
      )
    }
  ) : null;
}
function rc({
  children: e,
  pageChrome: t,
  overlay: n,
  tool: o,
  onToolChange: r,
  token: a,
  className: s,
  style: l
}) {
  const d = $t(a), c = j(d), p = Q($o);
  E(() => {
    o === void 0 || !p || p.getActiveToolId() !== o && p.activateTool(o);
  }, [o, p]), va(
    Sr,
    (M) => M.onToolChanged,
    (M) => r?.(M.toolId)
  );
  const f = W(d, (M) => M.getSettings().interaction), u = W(d, (M) => M.getSettings().panFallback), m = W(d, (M) => M.getSettings().zoomGestures), b = f && !!p, h = ie(() => p?.getCursor() ?? "default"), g = k(null), y = ye(), v = W(d, (M) => M.listVisiblePages()), _ = W(
    d,
    (M) => M.getSettings().pageFrame,
    (M, T) => M.top === T.top && M.right === T.right && M.bottom === T.bottom && M.left === T.left
  ), O = H(() => Bu(() => c), [c]), S = H(
    () => ({ projector: O, revision: v }),
    [O, v]
  ), x = v.map((M) => M.ref.objectNumber).join(","), P = H(
    () => new Set(x ? x.split(",").map(Number) : []),
    [x]
  );
  return R(() => {
    const M = g.current, T = Lu(M, c, {
      hub: b ? p : null,
      source: c.getLensId(),
      zoomGestures: m
    }), L = b && p ? p.registerHandler(vf(c, p, { panFallback: u }), {
      source: c.getLensId()
    }) : null, A = b && p ? p.registerHandler(wf(c, p), { source: c.getLensId() }) : null;
    return () => {
      A?.(), L?.(), T();
    };
  }, [c, p, b, m, u]), /* @__PURE__ */ i(
    "div",
    {
      ref: g,
      className: s,
      style: {
        position: "relative",
        overflow: "hidden",
        touchAction: "none",
        ...b ? { cursor: h } : null,
        ...l
      },
      children: /* @__PURE__ */ i(Sh, { token: d, children: [
        v.map((M) => /* @__PURE__ */ i(
          Oh,
          {
            documentId: y ?? "",
            page: M,
            frame: _,
            stage: c,
            render: e,
            chrome: t
          },
          M.ref.objectNumber
        )),
        /* @__PURE__ */ i(Th, { token: d }),
        /* @__PURE__ */ i(_h, { value: P, children: /* @__PURE__ */ i(yh, { value: S, children: n }) })
      ] })
    }
  );
}
function ji(e) {
  return j($t(e));
}
function Jt(e, t) {
  const n = $t(t), o = Ze();
  return ie((r) => {
    const a = r.tryCapability(n, o ?? void 0), s = a ? di.read(a) : di.empty;
    return e ? e(s) : s;
  }, Tn);
}
function ac(e, t) {
  ha(() => Ao(e).paint(t), [e, t]);
}
function Ch(e) {
  const t = Ao(e);
  return Xe(t.subscribe, t.painted, t.painted);
}
function Ae(e) {
  const { ensure: t } = e, n = function(r) {
    const a = Ze();
    return ie((s) => {
      const l = s.tryCapability(e.token, a ?? void 0), d = l ? e.read(l) : e.empty;
      return r ? r(d) : d;
    }, Tn);
  };
  return t ? function(r) {
    const a = Ze(), s = ie(
      (l) => l.tryCapability(e.token, a ?? void 0),
      Object.is
    );
    return E(() => {
      s && t(s).catch(() => {
      });
    }, [s]), n(r);
  } : n;
}
function zt(e) {
  return function(n) {
    return ie((o) => {
      const r = o.settingsOf(e).getSettings();
      return n ? n(r) : r;
    }, Tn);
  };
}
const Eh = zt(tn), Ah = Object.freeze({ status: "idle", slow: !1 });
function Nh() {
  const e = $e();
  return oe(
    tn,
    (t) => t.getPictureState(e.ref, e.view),
    Ah
  );
}
let Ui = !1;
function ic(e = {}) {
  const t = $e(), n = W(Be, (o) => o.getPicturePainter());
  return n?.paints(t.view) ? /* @__PURE__ */ i(Ih, { painter: n }) : /* @__PURE__ */ i(Lh, { ...e });
}
function Ih({ painter: e }) {
  const t = $e(), n = k(null), o = j(Be), r = k(null);
  return R(() => {
    const a = o.reportPicture(t.view, t.ref);
    return r.current = { picture: e.paint(n.current, t, a), page: t }, () => {
      r.current?.picture.destroy(), r.current = null, a.close();
    };
  }, [o, e, t.ref]), R(() => {
    const a = r.current;
    !a || a.page === t || (a.page = t, a.picture.update(t));
  }, [t]), /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }
    }
  );
}
function Lh({
  annotations: e,
  formFields: t,
  tiles: n = !0,
  thumbnail: o = !1
}) {
  const r = $e(), a = j(Be), s = W(Be, (h) => h.getPaintSettings()), l = k(null), d = k(null), c = { annotations: e, formFields: t }, p = Ch(r.ref), f = W(Be, (h) => h.getLayerRights()), u = rl(p, c, f);
  ju(p, c).length > 0 && Ln(
    "render-layer-draws-what-a-layer-paints",
    "<RenderLayer annotations> or <RenderLayer formFields> draws what an <AnnotationLayer> or a <FormLayer> on the page paints too, so it shows twice. Leave the prop out: the picture leaves out what a layer paints."
  );
  const m = o ? { thumbnail: !0 } : {}, b = W(
    Be,
    (h) => h.getSourceKey(r.ref, { scale: r.transform.renderScale, ...m, ...u })
  );
  return R(() => {
    const h = a.reportPicture(r.view, r.ref);
    d.current = h;
    const g = Uu(l.current, () => h.shown());
    return () => {
      g(), h.close(), d.current === h && (d.current = null);
    };
  }, [a, r.view, r.ref]), E(() => {
    if (Ao(r.ref).painted() !== p) return;
    const h = new AbortController();
    let g;
    return (async () => {
      try {
        const v = await (await a.renderSource(r.ref, {
          scale: r.transform.renderScale,
          ...m,
          ...u,
          view: r.view,
          signal: h.signal
        })).objectUrl().abortWith(h.signal);
        if (h.signal.aborted) {
          v.revoke();
          return;
        }
        g = v.revoke, l.current && (l.current.src = v.url);
      } catch (y) {
        h.signal.aborted || d.current?.failed(y);
      }
    })(), () => {
      h.abort(), g?.();
    };
  }, [a, r.ref, b, p]), /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ i(
      "img",
      {
        ref: l,
        alt: "",
        draggable: !1,
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }
      }
    ),
    n && !o && s.tiles ? /* @__PURE__ */ i(Rh, { parts: c }) : null
  ] });
}
function Rh({ parts: e }) {
  const t = $e(), n = j(Be), o = t.getViewDemand?.() ?? {
    desiredDeviceWidth: t.transform.deviceWidth
  }, r = H(() => n.createViewDemand(t.view), [n, t.view]);
  E(() => () => r.destroy(), [r]), R(() => {
    const d = Ao(t.ref).painted(), c = rl(d, e, n.getLayerRights());
    r.setDemand(t.ref, o, c);
  });
  const a = W(Be, () => r.getPlan(t.ref));
  if (E(() => () => r.release(t.ref), [r, t.ref]), a.paint.length === 0) return null;
  const s = t.transform, l = s.viewScale;
  return /* @__PURE__ */ i(
    "div",
    {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: s.contentWidth,
        height: s.contentHeight,
        pointerEvents: "none",
        // Stacking contract: tile <img>s carry zIndex ranks (coarse under
        // fine) that exist only while generations are mixed — mid-zoom. This
        // container must be a stacking context so those ranks stay internal;
        // without it they join the Stage's context and paint above every
        // z-auto sibling (annotations, page chrome, menus) exactly while
        // zooming. The old scaled container created one implicitly via its
        // transform; `isolation` is the explicit, no-side-effect way.
        isolation: "isolate"
      },
      children: a.paint.map((d) => /* @__PURE__ */ i(
        Dh,
        {
          source: d,
          view: {
            x: d.rect.x * l,
            y: d.rect.y * l,
            width: d.rect.width * l,
            height: d.rect.height * l
          },
          onPainted: () => r.markPainted(t.ref, d.key),
          onUnpainted: () => r.markUnpainted(t.ref, d.key)
        },
        d.key
      ))
    }
  );
}
function Dh({
  source: e,
  view: t,
  onPainted: n,
  onUnpainted: o
}) {
  const r = k(null);
  return R(() => {
    if (r.current)
      return Gu(r.current, e.handle, { onPainted: n, onUnpainted: o });
  }, [e.handle]), /* @__PURE__ */ i(
    "img",
    {
      ref: r,
      alt: "",
      draggable: !1,
      onLoad: (a) => {
        const s = a.currentTarget.naturalWidth;
        if (s > 0 && !Ui) {
          const l = Math.round(e.rect.width * e.scale);
          Math.abs(s - l) > 1 && (Ui = !0, console.warn(
            `[render] tile bitmap ${s}px wide does not match its rect (expected ~${l}px) — stale raster identity? key=${e.key}`
          ));
        }
      },
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.width,
        height: t.height,
        zIndex: e.z
      }
    }
  );
}
function $h() {
  return oe(tn, (e) => e.getSnapshot(), null);
}
function zh({ children: e, gap: t = 8, placement: n = "bottom" }) {
  const o = $h(), r = H(
    () => o && { page: o.page, bounds: o.rect },
    [o]
  );
  return r ? /* @__PURE__ */ i(Bo, { anchor: r, placement: n, gap: t, children: e }) : null;
}
function Fh() {
  const e = $e(), t = oe(Be, (d) => d.getSnapshotBox(e.ref), null), n = Eh((d) => d.snapshot.box), o = Dt((d) => d.accent);
  if (!t) return null;
  const { left: r, top: a, width: s, height: l } = Lt(t, e.transform);
  return /* @__PURE__ */ i(
    "svg",
    {
      "aria-hidden": !0,
      width: s,
      height: l,
      style: { position: "absolute", left: r, top: a, overflow: "visible", pointerEvents: "none" },
      children: /* @__PURE__ */ i(
        "rect",
        {
          width: s,
          height: l,
          strokeWidth: 1,
          strokeDasharray: Ku,
          style: Hu(n, o)
        }
      )
    }
  );
}
function Bh() {
  return j(Do);
}
const Kh = Ae(Gf);
function L_() {
  return j(Lo);
}
const Hh = Ae(Kf);
function R_() {
  return j(Ro);
}
const sc = Ae(jf), jh = Ae(hf);
function Uh(e) {
  const t = Q($o), n = e && JSON.stringify(e), o = k(e);
  o.current = e, E(() => {
    const r = o.current;
    if (!(!r || !t))
      return t.setToolCursor(r.toolId, Wu(r.cursors)), () => t.setToolCursor(r.toolId, null);
  }, [t, n]);
}
function Gh() {
  const e = $e(), t = j(Gt), n = W(
    Gt,
    (l) => l.listSegments(e.ref),
    qe
  ), o = W(Gt, (l) => l.isHighlightVisible()), r = cc((l) => l.color), a = Dt((l) => l.accent);
  if (E(() => {
    t.ensureLoaded(e.ref);
  }, [t, e.ref]), !o) return null;
  const s = We("text-selection", r ?? qu("text-selection", a));
  return /* @__PURE__ */ i(
    "svg",
    {
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none"
      },
      children: n.map((l, d) => (
        // Page space → the page layer's pixels, which ride the page's CSS
        // rotation: mapping the four corners is exact, for turned text too.
        /* @__PURE__ */ i(
          "polygon",
          {
            points: Yu(Xu(l.quad, e.transform)),
            style: { fill: s }
          },
          d
        )
      ))
    }
  );
}
const lc = Ae(Ff), cc = zt(An);
function Wh({ children: e, gap: t = 8, placement: n = "top" }) {
  const o = lc((a) => a.isSelecting), r = W(An, (a) => a.getAnchor(), Zu);
  return o || !r ? null : /* @__PURE__ */ i(Bo, { anchor: r, placement: n, gap: t, children: e });
}
function Vh({ token: e } = {}) {
  const t = $t(e), n = j(Gt), o = Q(t), r = xh();
  (!r || r.projector.space !== "overlay") && Ln(
    "selection-handles-outside-stage",
    "<SelectionHandles> renders nothing here: mount it in the <Stage> overlay slot (a <PageView> has no camera to project the handles through)."
  );
  const a = lc((v) => v.isSelecting), s = W(Gt, (v) => v.isHighlightVisible()), l = cc((v) => v.handles), d = Dt((v) => v.accent), c = W(
    Gt,
    (v) => Df(v.getSnapshot()),
    Ju
  );
  ie(() => o?.listVisiblePages() ?? null);
  const [p, f] = C(null), u = k(
    null
  );
  u.current = o && c ? { stage: o, endpoints: c } : null;
  const m = H(() => {
    const v = {}, _ = (O) => (S) => {
      v[O]?.(), delete v[O], S && (v[O] = Qu(S, {
        arm: () => {
          const x = u.current;
          if (!x) return null;
          const P = zf(
            n,
            pi(x.stage),
            x.endpoints,
            O
          );
          return P ? (f(O), {
            // the point the user grabbed: the bar's midpoint
            base: P.base,
            session: {
              move: P.drag.move,
              end: () => {
                P.drag.end(), f(null);
              }
            }
          }) : null;
        }
      }));
    };
    return { start: _("start"), end: _("end") };
  }, [n]);
  if (!o || !c || !s || a && !p) return null;
  const b = pi(o), h = We("text-selection-handle", l.color ?? d), g = We("text-selection-handle-shadow", l.shadow), y = (v) => {
    const _ = $f(b, c[v], v);
    if (!_) return null;
    const O = Pt + (v === "start" ? cn : 0), S = Pt + jn / 2;
    return /* @__PURE__ */ i(
      "div",
      {
        ref: m[v],
        style: {
          position: "absolute",
          left: _.bar.from.x - S,
          top: _.bar.from.y - O,
          width: jn + 2 * Pt,
          height: _.length + cn + 2 * Pt,
          // Upright text carries no transform — pixel-identical to an
          // axis-aligned box (the geometry's float-noise guard decides).
          ..._.upright ? null : {
            transform: `rotate(${_.rotation}deg)`,
            transformOrigin: `${S}px ${O}px`
          },
          touchAction: "none",
          cursor: "grab",
          pointerEvents: "auto"
        },
        children: [
          /* @__PURE__ */ i(
            "div",
            {
              style: {
                position: "absolute",
                left: Pt,
                top: O,
                width: jn,
                height: _.length,
                background: h,
                borderRadius: jn / 2
              }
            }
          ),
          /* @__PURE__ */ i(
            "div",
            {
              style: {
                position: "absolute",
                left: S - cn / 2,
                top: v === "start" ? Pt : Pt + _.length,
                width: cn,
                height: cn,
                borderRadius: "50%",
                background: h,
                boxShadow: g
              }
            }
          )
        ]
      },
      v
    );
  };
  return /* @__PURE__ */ i(D, { children: [
    y("start"),
    y("end")
  ] });
}
function qh({ prefetch: e, onRefused: t, target: n } = {}) {
  const o = Q(An), r = k(t);
  return r.current = t, E(() => {
    const a = n ? n.current : void 0;
    if (!(!o || a === null))
      return Vu(o, {
        ...e === void 0 ? {} : { prefetch: e },
        ...a ? { target: a } : {},
        onRefused: () => r.current?.()
      });
  }, [o, e, n]), null;
}
function Ko(e) {
  const [t] = C(() => ep());
  E(() => () => t.release(), [t]), E(() => t.mount(e));
}
const Yh = Ae(sm), dc = zt(vl), uc = Number.parseInt(jm, 10) >= 19 ? { inert: !0 } : { inert: "true" };
function pc({ shapes: e }) {
  return Ko(tp(e)), /* @__PURE__ */ i(D, { children: mc(e) });
}
const fc = (e) => e.replace(/-([a-z])/g, (t, n) => n.toUpperCase());
function Xh(e) {
  return Object.fromEntries(
    Object.entries(e).map(([t, n]) => [fc(t), n])
  );
}
function Zh(e) {
  return Object.fromEntries(
    Object.entries(e).map(([t, n]) => [fc(t), n])
  );
}
function mc(e) {
  return e.map(
    (t, n) => Qm.createElement(
      t.tag,
      {
        key: n,
        ...Xh(t.attributes),
        ...t.style ? { style: Zh(t.style) } : {}
      },
      t.children ? mc(t.children) : t.text
    )
  );
}
function Jh({ children: e, gap: t = 15, placement: n = "top" }) {
  const { projector: o } = tc(), r = oe(
    Ue,
    (a) => {
      const s = a.selection.getAnchor();
      if (!s) return null;
      const l = o.viewEnv(s.page);
      return l ? a.getSelectionAnchorIn(l) : s;
    },
    null,
    np
  );
  return r ? /* @__PURE__ */ i(
    Bo,
    {
      anchor: {
        page: r.page,
        bounds: r.bounds,
        ...r.rotationHandle ? { avoid: [r.rotationHandle] } : {}
      },
      placement: n,
      gap: t,
      children: e
    }
  ) : null;
}
function Qh({
  children: e,
  gap: t = 16,
  placement: n = "right"
}) {
  const o = oe(
    vl,
    (a) => a.selection.getRotationAnchor(),
    null,
    op
  ), r = dc((a) => a.chrome.readout);
  return !o || !e && !r.enabled ? null : /* @__PURE__ */ i(
    Bo,
    {
      anchor: { page: o.page, bounds: { ...o.at, width: 0, height: 0 } },
      placement: n,
      gap: t,
      children: e ? e(o) : /* @__PURE__ */ i(
        "div",
        {
          style: {
            pointerEvents: "none",
            whiteSpace: "nowrap",
            borderRadius: 4,
            padding: "2px 6px",
            fontFamily: On("font-mono"),
            fontSize: 12,
            background: We("readout-background", r.background),
            color: We("readout-color", r.color)
          },
          children: [
            o.angle,
            "°"
          ]
        }
      )
    }
  );
}
const eg = be(1);
function tg({
  item: e,
  page: t,
  interactive: n = !1,
  inert: o = !1,
  children: r
}) {
  const a = ll(e.frame, t.transform);
  return /* @__PURE__ */ i(
    "div",
    {
      ...o ? uc : {},
      style: {
        position: "absolute",
        left: a.left,
        top: a.top,
        width: a.width,
        height: a.height,
        transform: a.transform,
        transformOrigin: "center",
        // On the frame: a turned frame groups what is inside it, so blending on
        // an inner element would stop blending with the page.
        mixBlendMode: e.blend,
        // An interactive renderer takes the pointer: the layer's own `none` ends here.
        pointerEvents: n ? "auto" : "none"
      },
      children: r
    }
  );
}
function ng({ item: e }) {
  const t = fp(e.box);
  return t ? /* @__PURE__ */ i(
    "svg",
    {
      viewBox: t,
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
        // A ghost is see-through as a whole, so its fill and stroke don't stack.
        ...e.source === "ghost" ? { opacity: dl(e.ghostOpacity ?? 0.5) } : {}
      },
      children: /* @__PURE__ */ i(pc, { shapes: cl(am(e), { miterLimit: bl }) })
    }
  ) : null;
}
function og({ url: e, box: t }) {
  return /* @__PURE__ */ i(
    "img",
    {
      src: e,
      alt: "",
      draggable: !1,
      style: {
        position: "absolute",
        left: t.left,
        top: t.top,
        width: t.width,
        height: t.height,
        // The AP box is sized in content units; a global `img { max-width: 100% }`
        // reset would otherwise clamp it to the containing block and distort the
        // aspect. This bites specifically when the box is wider than that block —
        // a landscape stamp whose unrotated box overhangs a view-rotated (portrait)
        // page — so honour the explicit size.
        maxWidth: "none",
        maxHeight: "none",
        pointerEvents: "none",
        // The turn the engine took out of the raster, put back about its middle.
        transform: t.transform,
        transformOrigin: "center"
      }
    }
  );
}
function rg({ page: e }) {
  const t = j(Ue), n = W(
    Ue,
    (d) => d.getImageGhost(e.ref)
  ), o = W(Ue, (d) => d.getArmedStamp()), [r, a] = C(null), s = n ? im(n.box.width * e.transform.renderScale) : 0;
  if (E(() => {
    if (!s) {
      a(null);
      return;
    }
    return hp(() => t.renderArmedStampPreview(s), a);
  }, [t, o, s]), !n || !r) return null;
  const l = Lt(n.box, e.transform);
  return /* @__PURE__ */ i(
    "img",
    {
      src: r,
      alt: "",
      draggable: !1,
      style: {
        position: "absolute",
        left: l.left,
        top: l.top,
        width: l.width,
        height: l.height,
        // Same explicit-size rule as BakedImage: never let a global img reset
        // clamp the box and distort the aspect.
        maxWidth: "none",
        maxHeight: "none",
        pointerEvents: "none",
        opacity: dl(n.opacity),
        ...n.rot ? { transform: `rotate(${n.rot}deg)`, transformOrigin: "center" } : {}
      }
    }
  );
}
function hc() {
  const e = dc((o) => o.chrome), t = Dt((o) => o.accent), n = H(() => bp(e, t), [e, t]);
  return { chrome: e, painted: n };
}
function ag({
  at: e,
  size: t,
  rotation: n,
  shape: o,
  style: r
}) {
  return o === "circle" ? /* @__PURE__ */ i("circle", { cx: e.x, cy: e.y, r: t / 2, strokeWidth: 1.5, style: r }) : /* @__PURE__ */ i(
    "rect",
    {
      x: e.x - t / 2,
      y: e.y - t / 2,
      width: t,
      height: t,
      strokeWidth: 1.5,
      style: r,
      ...n ? { transform: `rotate(${n} ${e.x} ${e.y})` } : {}
    }
  );
}
function ig({
  page: e,
  components: t
}) {
  const n = e.transform.viewScale, o = e.transform.rotation, r = e.transform.zoom, a = W(
    Ue,
    (u) => u.listChromeNodes(e.ref, n, o, r),
    qe
  ), { chrome: s, painted: l } = hc(), d = t?.Handle, c = t?.RotationHandle, p = [], f = gp(a, e.transform).map((u, m) => {
    switch (u.kind) {
      case "handle":
        return d ? (p.push(
          /* @__PURE__ */ i(
            d,
            {
              at: u.at,
              size: s.handles.size,
              rotation: u.rotation,
              kind: u.role,
              active: u.active
            },
            m
          )
        ), null) : /* @__PURE__ */ i(
          ag,
          {
            at: u.at,
            size: s.handles.size,
            rotation: u.rotation,
            shape: s.handles.shape,
            style: l.handle
          },
          m
        );
      case "guide":
        return /* @__PURE__ */ i(
          "line",
          {
            x1: u.from.x,
            y1: u.from.y,
            x2: u.to.x,
            y2: u.to.y,
            shapeRendering: "crispEdges",
            style: l.guide
          },
          m
        );
      case "turned-outline":
        return /* @__PURE__ */ i("polygon", { points: u.points, fill: "none", style: l.outline }, m);
      case "rotation-guides":
        return /* @__PURE__ */ i("g", { children: u.lines.map((b, h) => /* @__PURE__ */ i(
          "line",
          {
            x1: b.from.x,
            y1: b.from.y,
            x2: b.to.x,
            y2: b.to.y,
            opacity: b.opacity,
            style: l.rotationGuide
          },
          h
        )) }, m);
      case "rotation-handle":
        return c ? (p.push(
          /* @__PURE__ */ i(
            c,
            {
              at: u.at,
              from: u.from,
              size: s.rotationHandle.size,
              rotation: 0,
              active: !1
            },
            m
          )
        ), null) : /* @__PURE__ */ i("g", { children: [
          s.rotationHandle.stalk && /* @__PURE__ */ i(
            "line",
            {
              x1: u.from.x,
              y1: u.from.y,
              x2: u.at.x,
              y2: u.at.y,
              strokeWidth: 1,
              style: { stroke: l.rotationHandle.stroke }
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: u.at.x,
              cy: u.at.y,
              r: s.rotationHandle.size / 2,
              strokeWidth: 1.5,
              style: l.rotationHandle
            }
          )
        ] }, m);
      // The box dragged to select keeps its own look (a see-through accent
      // fill, always dashed); the selection outline follows the settings.
      case "marquee":
        return /* @__PURE__ */ i(
          "rect",
          {
            x: u.box.left,
            y: u.box.top,
            width: u.box.width,
            height: u.box.height,
            strokeWidth: 1,
            strokeDasharray: "4 3",
            style: l.marquee
          },
          m
        );
      case "outline":
        return /* @__PURE__ */ i(
          "rect",
          {
            x: u.box.left,
            y: u.box.top,
            width: u.box.width,
            height: u.box.height,
            fill: "none",
            style: l.outline
          },
          m
        );
    }
  });
  return /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ i("svg", { style: { position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }, children: f }),
    p.length > 0 && /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: p })
  ] });
}
function sg(e, t) {
  const n = j(Ue), [o, r] = C(null), [a] = C(() => vp());
  return E(
    () => a.follow(o, n, e, t),
    [a, n, o, e, t]
  ), E(() => () => a.detach(), [a]), r;
}
function lg({ item: e, page: t }) {
  const { painted: n } = hc();
  Ko(e.programs);
  const o = mp(e, t.transform, n.textOutline), r = sg(e, o.scale);
  return /* @__PURE__ */ i("div", { ref: r, suppressContentEditableWarning: !0, style: o.style });
}
function cg(e, t, n) {
  const o = k(t);
  o.current = t;
  const [, r] = C(0);
  E(() => {
    if (!n) return;
    const a = pp(e, n, () => o.current());
    return r((s) => s + 1), a;
  }, [e, n]);
}
function dg({ renderers: e, components: t } = {}) {
  const n = $e(), o = j(Ue);
  oe(Sr, (g) => g.getActiveToolId(), "");
  const r = Q(Sr), a = n.transform.zoom, s = n.transform.rotation, l = W(
    Ue,
    (g) => g.listPageItems(n.ref, { zoom: a, rotation: s }),
    qe
  ), d = W(
    Ue,
    (g) => g.listTextItems(n.ref, { zoom: a, rotation: s }),
    qe
  ), [c, p] = C(null), [f] = C(ul);
  E(() => () => f.release(), [f]), cg(o, () => r?.getActiveToolId() ?? "", e), ac(n.ref, "annotations");
  const u = k(e);
  e && u.current && e !== u.current && qe(e, u.current) && Ln(
    "annotation-renderers-inline",
    "<AnnotationLayer renderers> was given a new array with the same entries — define it outside render (module scope or useMemo), because entry identity keys the behavior registration."
  ), u.current = e;
  const m = W(
    Ue,
    (g) => g.getAppearanceEpoch(n.ref)
  ), b = oe(
    Be,
    (g) => g.getAppearanceScale(n.transform.renderScale),
    n.transform.renderScale
  );
  E(
    () => al(
      f,
      (g) => o.renderAppearances(n.ref, b, g),
      Ut,
      p
    ),
    [f, o, n.ref, b, m]
  );
  const h = ip(d, Ut);
  return /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [
    l.map((g) => {
      const y = g.annotation?.appearanceState ?? null, v = il({
        pending: g.source !== "baked",
        picture: c && sl(c, g.id, y),
        version: g.pictureVersion ?? 0,
        loaded: c !== null,
        paint: () => rm(g) ? g : null
      }), _ = v?.kind === "painting" ? (
        // shapes, cloudy, markup: all painted via scene()
        /* @__PURE__ */ i(ng, { item: g })
      ) : v?.kind === "picture" && g.raster ? /* @__PURE__ */ i(og, { url: v.picture.url, box: sp(g.raster, g.frame) }) : null, O = (T, L) => /* @__PURE__ */ i(tg, { item: g, page: n, ...L, children: T }, g.id), S = g.annotation;
      if (!S) return O(_);
      const x = (T, L) => {
        const A = ll(g.frame, n.transform), F = T.scale !== !1, ce = T.component, te = /* @__PURE__ */ i(
          ce,
          {
            annotation: S,
            frame: up(A, F),
            native: _,
            appearance: c && dp(c, g.id, y),
            hovered: g.hovered ?? !1,
            selected: g.selected,
            interactive: L
          }
        );
        return F ? /* @__PURE__ */ i(
          "div",
          {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: A.design.width,
              height: A.design.height,
              transform: `scale(${A.scale})`,
              transformOrigin: "0 0"
            },
            children: /* @__PURE__ */ i(eg.Provider, { value: A.scale, children: te })
          }
        ) : te;
      }, P = h !== null && Ut(S.ref) === h, M = lp(S, o, e, P);
      switch (M.kind) {
        case "owned": {
          const T = M.entry.component;
          return /* @__PURE__ */ i(
            T,
            {
              annotation: S,
              item: g,
              page: n,
              native: O(_),
              hovered: g.hovered ?? !1,
              selected: g.selected,
              interactive: !0
            },
            g.id
          );
        }
        case "look":
          return O(x(M.entry, M.interactive), {
            interactive: M.interactive,
            inert: M.inert
          });
        case "native":
          return O(_, { inert: M.inert });
      }
    }),
    cp(d, l, e, Ut).map((g) => /* @__PURE__ */ i(lg, { item: g, page: n }, g.id)),
    /* @__PURE__ */ i(rg, { page: n }),
    /* @__PURE__ */ i(ig, { page: n, components: t })
  ] });
}
const ug = rp;
function pg(e = ug) {
  const t = Q(we);
  E(() => {
    if (t)
      return ap(
        t,
        e,
        () => Ln(
          "file-picker-provider-twice",
          "useFilePickerProvider() is called from two mounted components for the same document — the later one wins. Call it once, at a document-scoped spot."
        )
      );
  }, [t, e]);
}
function fg() {
  return j(we);
}
const mg = {};
function hg(e) {
  return oe(
    we,
    (t) => t.tools.getDefaults(e),
    mg
  );
}
const gg = { properties: [], values: {}, mixed: [] };
function D_(e) {
  return oe(
    we,
    (t) => e === void 0 ? t.selection.getProperties() : t.tools.getProperties(e),
    gg
  );
}
function $_() {
  return j(we).comments;
}
const bg = [], vg = [];
function z_() {
  const e = ye(), t = oe(
    we,
    (o) => o.comments.listThreads(),
    vg
  ), n = ie(
    (o) => e ? o.documents.listPages(e) : bg
  );
  return H(() => wp(t, n), [t, n]);
}
function _a() {
  return j(Pe);
}
const wg = Ae(Mf);
function yg(e) {
  const t = e?.kind === void 0 ? void 0 : [].concat(e.kind).join("\0");
  return W(
    Pe,
    (n) => n.listLibraries(t === void 0 ? void 0 : { kind: t.split("\0") }),
    qe
  );
}
function gc(e) {
  const t = e?.libraryId, n = e?.kind, o = e?.category;
  return W(
    Pe,
    (r) => r.listAssets({ libraryId: t, kind: n, category: o }),
    qe
  );
}
function _g(e) {
  const t = _a(), [n, o] = C(null);
  return E(() => {
    const r = e ? t.getAssetPreview(e) : null;
    if (!r) {
      o(null);
      return;
    }
    const a = yp(r);
    return o(a.url), () => {
      a.revoke(), o(null);
    };
  }, [t, e]), n;
}
function F_() {
  return j(xt);
}
const xg = Ae(xf);
function kg(e) {
  const t = Ze();
  return ie((n) => e === null ? null : n.tryCapability(xt, t ?? void 0)?.getPageScale(e) ?? kf);
}
function Sg({
  ariaLabel: e,
  disabled: t,
  multi: n,
  options: o,
  selected: r,
  onSelect: a,
  onFocus: s,
  onBlur: l,
  style: d
}) {
  const [c] = C(() => xp(r)), p = Xe(c.subscribe, c.get, c.get), f = k(null);
  return E(() => f.current ? _p(f.current) : void 0, []), E(() => c.setConfirmed(r), [c, r]), /* @__PURE__ */ i(
    "select",
    {
      ref: f,
      "aria-label": e,
      multiple: n,
      size: Math.max(2, o.length),
      disabled: t,
      value: n ? p : p[0] ?? "",
      onFocus: s,
      onBlur: l,
      onChange: (u) => c.choose(
        Array.from(u.currentTarget.selectedOptions).map((m) => m.value),
        a
      ),
      style: d,
      children: o.map((u, m) => /* @__PURE__ */ i("option", { value: u.value, children: u.label }, m))
    }
  );
}
function xa({ visible: e, color: t }) {
  return e ? /* @__PURE__ */ i("span", { "aria-hidden": "true", "data-embedpdf-form-focus-ring": "", style: kp(t) }) : null;
}
function Mg() {
  const e = Dt((o) => o.accent), t = Gi((o) => o.focus), n = Gi((o) => o.fields);
  return H(() => Sp({ focus: t, fields: n }, e), [e, t, n]);
}
function Pg(e) {
  const t = k(null), n = k(e);
  return n.current = e, E(
    () => t.current ? ta(t.current, () => n.current?.()) : void 0,
    []
  ), t;
}
function Og(e, t) {
  const n = j(Te), o = k(t);
  return o.current = t, H(() => {
    const r = (a) => {
      const s = o.current;
      s && n.notifyWidgetEvent(e, s, a);
    };
    return {
      onPointerEnter: () => r("cursorEnter"),
      onPointerLeave: () => r("cursorExit"),
      // The press, from the box's native listener (`useIsolated`).
      onPress: () => r("mouseDown"),
      onPointerUp: () => r("mouseUp"),
      // React focus and blur bubble, so the inner control's focus reaches the
      // box; blur fires after the control's own commit, so a blur script
      // always sees the committed value.
      onFocus: () => r("focus"),
      onBlur: () => r("blur")
    };
  }, [n, e]);
}
function Rn(e) {
  const t = j(Te), n = k(e);
  return n.current = e, Ve(() => {
    const o = n.current;
    o && t.activateWidget(o);
  }, [t]);
}
function sn({
  item: e,
  page: t,
  colors: n,
  edge: o = !0,
  focusable: r = !0,
  onClick: a,
  children: s,
  ...l
}) {
  const d = j(Te), { onPress: c, ...p } = Og(e.fieldRef, e.annotationRef), f = Pg(c), u = Lt(e.box, t.transform), m = e.annotationRef, b = r && !e.disabled, h = e.control === "toggle" && e.kind === "radio";
  return E(
    () => f.current && m && b ? Tp(f.current, d, m, { radio: h }) : void 0,
    [f, d, m, b, h]
  ), /* @__PURE__ */ i(
    "div",
    {
      ref: f,
      ...p,
      ...l,
      onFocus: (g) => {
        p.onFocus?.(g), l.onFocus?.(g);
      },
      onBlur: (g) => {
        p.onBlur?.(g), l.onBlur?.(g);
      },
      onClick: a,
      style: { ...Cp(e, u, n, { edge: o }), ...l.style },
      children: s
    }
  );
}
function Tg({ item: e, page: t, colors: n }) {
  const o = j(Te), r = Rn(e.annotationRef), a = H(
    () => Pp(o, e.fieldRef, e.value),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [o, e.key]
  ), { focused: s, draft: l } = Xe(
    a.subscribe,
    a.getState,
    a.getState
  );
  E(() => a.setValue(e.value), [a, e.value]);
  const d = Lt(e.box, t.transform);
  oe(cm, (f) => f.getPaintFontsEpoch(), 0);
  const c = e.annotationRef ? o.getTextEditorLayout(e.annotationRef, l) : null;
  Ko(c ? c.programs : bc);
  const p = {
    value: l,
    maxLength: e.maxLength ?? void 0,
    "aria-label": e.label,
    disabled: e.disabled,
    onFocus: a.focus,
    onChange: (f) => a.input(f.target.value),
    onBlur: a.blur,
    onKeyDown: (f) => {
      a.keyDown(f.key, e.multiline) && f.currentTarget.blur();
    },
    style: Op(e, d, n, s, c)
  };
  return (
    // A click runs the widget's action too, as in Acrobat: the editor's
    // focus click bubbles here, a read-only field's lands here directly.
    /* @__PURE__ */ i(sn, { item: e, page: t, colors: n, onClick: r, children: e.multiline ? /* @__PURE__ */ i("textarea", { ...p }) : /* @__PURE__ */ i("input", { ...p, type: e.password ? "password" : "text" }) })
  );
}
function Cg({ item: e, page: t, colors: n }) {
  const o = j(Te), r = Rn(e.annotationRef), [a, s] = C(!1), l = () => Ep(o, e, r);
  return /* @__PURE__ */ i(
    sn,
    {
      item: e,
      page: t,
      colors: n,
      role: e.kind === "checkbox" ? "checkbox" : "radio",
      "aria-checked": e.checked,
      "aria-label": e.label,
      tabIndex: e.disabled ? -1 : 0,
      onClick: l,
      onFocus: () => s(!0),
      onBlur: () => s(!1),
      onKeyDown: (d) => {
        (d.key === " " || d.key === "Enter") && (d.preventDefault(), l());
      },
      style: { cursor: e.disabled ? "default" : "pointer", outline: "none" },
      children: /* @__PURE__ */ i(xa, { visible: a, color: n.focus })
    }
  );
}
function Eg({ item: e, page: t, colors: n }) {
  const o = j(Te), r = Rn(e.annotationRef), [a, s] = C(!1);
  return /* @__PURE__ */ i(sn, { item: e, page: t, colors: n, onClick: r, children: [
    /* @__PURE__ */ i(
      "select",
      {
        defaultValue: e.selected[0] ?? "",
        "aria-label": e.label,
        disabled: e.disabled,
        onFocus: () => s(!0),
        onBlur: () => s(!1),
        onChange: (l) => void o.setValue(e.fieldRef, { value: l.currentTarget.value || null }),
        style: {
          ...ea,
          opacity: 0,
          cursor: e.disabled ? "default" : "pointer",
          ...e.disabled ? { pointerEvents: "none" } : {}
        },
        children: [
          e.selected.length === 0 && /* @__PURE__ */ i("option", { value: "" }),
          e.options.map((l, d) => /* @__PURE__ */ i("option", { value: l.value, children: l.label }, d))
        ]
      },
      e.selected.join("\0")
    ),
    /* @__PURE__ */ i(xa, { visible: a, color: n.focus })
  ] });
}
function Ag({ item: e, page: t, colors: n }) {
  const o = j(Te), r = Rn(e.annotationRef), [a, s] = C(!1), l = Lt(e.box, t.transform), d = W(
    Te,
    (c) => e.annotationRef ? c.getWidgetFontCss(e.annotationRef) : null
  );
  return Ko(d ? d.programs : bc), /* @__PURE__ */ i(sn, { item: e, page: t, colors: n, edge: !1, onClick: r, children: [
    /* @__PURE__ */ i(
      Sg,
      {
        ariaLabel: e.label,
        disabled: e.disabled,
        multi: e.multi,
        options: e.options,
        selected: e.selected,
        onFocus: () => s(!0),
        onBlur: () => s(!1),
        onSelect: async (c) => {
          await o.setValue(e.fieldRef, { selectedValues: c });
        },
        style: Mp(e, l, n, d)
      }
    ),
    /* @__PURE__ */ i(xa, { visible: a, color: n.focus })
  ] });
}
function Ng({ item: e, page: t, colors: n }) {
  const o = Rn(e.annotationRef);
  return /* @__PURE__ */ i(
    sn,
    {
      item: e,
      page: t,
      colors: n,
      edge: !1,
      style: { cursor: e.disabled ? "default" : "pointer" },
      children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-label": e.label,
          disabled: e.disabled,
          onClick: o,
          style: {
            ...ea,
            padding: 0,
            border: 0,
            background: "transparent",
            cursor: "inherit",
            // The box is the event surface; a disabled button must not swallow the pointer.
            pointerEvents: e.disabled ? "none" : "auto"
          }
        }
      )
    }
  );
}
function Ig({ item: e, page: t, colors: n }) {
  const o = Q(fi), r = e.fieldRef, a = oe(
    fi,
    (l) => l.getSignature(r)?.signed ?? e.signed,
    e.signed
  ), s = o !== null && (a || !e.disabled);
  return /* @__PURE__ */ i(
    sn,
    {
      item: e,
      page: t,
      colors: n,
      focusable: s,
      style: { cursor: s ? "pointer" : "default" },
      children: s ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-label": e.label,
          "data-signed": a ? "" : void 0,
          onClick: () => a ? o.requestInspection(r) : o.setTarget(r),
          style: {
            ...ea,
            padding: 0,
            border: 0,
            background: "transparent",
            cursor: "inherit"
          }
        }
      ) : null
    }
  );
}
function Lg() {
  const e = $e(), t = j(Te), n = Mg(), o = W(
    $o,
    (a) => a.activeToolEnables("form-fill")
  );
  ac(e.ref, "formFields"), E(() => {
    t.ensureLoaded(e.ref);
  }, [t, e.ref]);
  const r = W(
    Te,
    (a) => a.listWidgets(e.ref),
    qe
  );
  return /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [
    /* @__PURE__ */ i(Rg, { page: e }),
    (o ? r : []).map((a) => {
      const s = `${a.key}:${a.annotObjectNumber}`;
      switch (a.control) {
        case "text":
          return /* @__PURE__ */ i(Tg, { item: a, page: e, colors: n }, s);
        case "toggle":
          return /* @__PURE__ */ i(Cg, { item: a, page: e, colors: n }, s);
        case "choice":
          return a.kind === "list" ? /* @__PURE__ */ i(Ag, { item: a, page: e, colors: n }, s) : /* @__PURE__ */ i(Eg, { item: a, page: e, colors: n }, s);
        case "button":
          return /* @__PURE__ */ i(Ng, { item: a, page: e, colors: n }, s);
        case "signature":
          return /* @__PURE__ */ i(Ig, { item: a, page: e, colors: n }, s);
      }
    })
  ] });
}
function Rg({ page: e }) {
  const t = j(Te), n = W(
    Te,
    (c) => c.listShownWidgets(e.ref),
    qe
  ), o = W(Te, (c) => c.getAppearanceEpoch(e.ref)), r = oe(
    Be,
    (c) => c.getAppearanceScale(e.transform.renderScale),
    0
  ), [a, s] = C(null), [l] = C(ul);
  E(() => () => l.release(), [l]), E(() => {
    if (r)
      return al(
        l,
        (c) => t.renderAppearances(e.ref, r, c),
        nr,
        s
      );
  }, [l, t, e.ref, r, o]);
  const d = n.map(
    (c) => il({
      pending: c.pending,
      picture: a && sl(a, nr(c.ref), c.appearanceState),
      version: c.pictureVersion,
      loaded: a !== null,
      paint: () => t.getWidgetPainting(c.ref)
    })
  );
  return /* @__PURE__ */ i(D, { children: n.map((c, p) => {
    const f = d[p];
    if (!f) return null;
    const u = nr(c.ref);
    if (f.kind === "painting") {
      const { x: b, y: h, width: g, height: y } = c.rect, v = Lt(c.rect, e.transform);
      return /* @__PURE__ */ i(
        "svg",
        {
          viewBox: `${b} ${h} ${g} ${y}`,
          style: {
            position: "absolute",
            left: v.left,
            top: v.top,
            width: v.width,
            height: v.height,
            overflow: "visible",
            pointerEvents: "none"
          },
          children: /* @__PURE__ */ i(pc, { shapes: cl(f.painting.scene, { miterLimit: bl }) })
        },
        u
      );
    }
    const m = Lt(f.picture.box, e.transform);
    return /* @__PURE__ */ i(
      "img",
      {
        src: f.picture.url,
        alt: "",
        draggable: !1,
        style: {
          position: "absolute",
          left: m.left,
          top: m.top,
          width: m.width,
          height: m.height,
          // A global `img { max-width: 100% }` reset would clamp it.
          maxWidth: "none",
          maxHeight: "none",
          pointerEvents: "none"
        }
      },
      u
    );
  }) });
}
const bc = Object.freeze([]);
Ae(If);
const Gi = zt(nn);
function B_() {
  return j(on);
}
const K_ = Ae(Vf);
function Wn(e, t) {
  va(on, e, t);
}
function H_() {
  const e = yg({ kind: qf }), t = gc();
  return H(() => Yf(e, t), [e, t]);
}
function Dg({
  onPress: e,
  ...t
}) {
  const n = k(null), o = k(e);
  return o.current = e, E(
    () => n.current ? ta(n.current, () => o.current()) : void 0,
    []
  ), /* @__PURE__ */ i("a", { ref: n, ...t });
}
function $g() {
  const e = Q(yl);
  E(() => e?.registerUriOpener(Dp), [e]);
}
function zg({ renderLink: e } = {}) {
  const t = $e(), n = j(ho);
  $g();
  const o = Q($t()), r = Q(um), a = H(() => r ? dm(r.dispatch) : null, [r]), s = W(ho, (p) => p.listLinks(t.ref), qe), l = W(yl, (p) => p.isNavigationEngaged()), d = oe(
    $o,
    (p) => p.activeToolEnables("annotation-edit"),
    !1
  );
  if (E(() => {
    n.ensureLoaded(t.ref);
  }, [n, t.ref]), !l || !s.length) return null;
  const c = Ap(s, d);
  return c.length ? /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: c.map((p) => {
    const { box: f, href: u, label: m } = Np(
      p,
      t.transform,
      (y) => n.getLabel(y)
    ), b = Ip(p, t.ref, o), h = /* @__PURE__ */ i(
      Dg,
      {
        onPress: () => Kn(r, p, t.ref, "mouseDown"),
        href: u ?? void 0,
        target: "_blank",
        rel: "noopener noreferrer",
        role: "link",
        tabIndex: 0,
        title: m,
        "aria-label": m,
        onClick: (y) => {
          u && Rp(y) || (y.preventDefault(), n.activate(p, b));
        },
        onKeyDown: (y) => {
          (y.key === "Enter" || y.key === " ") && (y.preventDefault(), n.activate(p, b));
        },
        onPointerEnter: () => Lp(a, p, t.ref),
        onPointerLeave: () => a?.hover(null),
        onPointerUp: () => Kn(r, p, t.ref, "mouseUp"),
        onFocus: () => Kn(r, p, t.ref, "focus"),
        onBlur: () => Kn(r, p, t.ref, "blur"),
        style: {
          position: "absolute",
          left: f.left,
          top: f.top,
          width: f.width,
          height: f.height,
          cursor: "pointer",
          pointerEvents: "auto"
        }
      }
    ), g = e?.({ link: p, native: h }) ?? h;
    return /* @__PURE__ */ i(D, { children: g }, p.id);
  }) }) : null;
}
const vc = Ae(Cf), j_ = zt(En);
function Z() {
  return W(En, (e) => e.getTranslator());
}
const Fg = /* @__PURE__ */ Pu($p);
function ke() {
  return j(De);
}
const Bg = zt(De);
function wc(e, t = {}) {
  return Qs(e, { isMac: t.isMac ?? No() });
}
function Ce(e) {
  const t = j(De), n = ye() ?? void 0, o = ie(
    () => t.resolveCommand(e, n),
    Jd
  );
  return o === null && Ln(`useCommand:${e}`, `useCommand(): ${Qd(e, t.listCommandIds())}`), H(
    () => eu(
      o ?? tu(e),
      (r) => t.execute(r, { documentId: n }),
      { isMac: No() }
    ),
    [o, t, n, e]
  );
}
function Kg(e) {
  const t = j(Qr), n = e?.isMac, o = e?.target, r = k(e?.onRefused);
  r.current = e?.onRefused, E(() => {
    const a = (s, l) => r.current?.(s, l);
    return o ? o.current ? ai(t, { isMac: n, target: o.current, onRefused: a }) : void 0 : ai(t, { isMac: n, onRefused: a });
  }, [t, n, o]);
}
function Hg() {
  return j(K);
}
function jg(e, t) {
  va(K, e, t);
}
const Ug = Ae(ff), Wi = Object.freeze({});
function Qe(e) {
  const t = Q(K), n = oe(K, (r) => r.isOpen(e), !1), o = oe(
    K,
    (r) => r.getSurface(e)?.props ?? Wi,
    Wi
  );
  return H(
    () => ({
      isOpen: n,
      props: o,
      open: (r) => t?.open(e, r),
      close: () => t?.close(e),
      toggle: (r) => t?.toggle(e, r)
    }),
    [t, e, n, o]
  );
}
function U_(e, t, n = {}) {
  const o = Q(K), r = oe(
    K,
    (l) => l.getSurface(e)?.focusRequest ?? 0,
    0
  ), [a] = C(zp), s = n.select ?? !1;
  E(() => a.follow(t.current, o, r, { select: s }));
}
const Gg = "attachments", Wg = "attachment-item", je = (e) => e.tryGet(Ro), Ot = (e) => je(e)?.getSelected()[0] ?? null;
async function Vi(e, t) {
  const { bytes: n, name: o, mimeType: r } = await e.download(t);
  na(n, o, r ?? void 0);
}
const qi = (e) => {
  const t = e.tryGet(we)?.selection.getSelected() ?? [], [n] = t;
  if (t.length !== 1 || n?.subtype !== "file-attachment") return null;
  const o = Ut(n.ref);
  return (je(e)?.list() ?? []).find((r) => r.home.kind === "page" && Ut(r.home.ref) === o) ?? null;
}, Yi = {
  categories: ["documents.download"],
  allowed: (e) => je(e)?.canDownload() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-download"
}, Xi = {
  categories: ["attachments.adding"],
  allowed: (e) => je(e)?.canCreate() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-attachments-modify"
}, Vg = [
  {
    id: "attachment:add",
    labelKey: "commands.attachment.add",
    icon: "plus",
    ...Xi,
    run: async (e) => {
      const t = je(e);
      if (!t) return;
      const n = e.args?.files ?? [await oa()].filter((o) => o !== null);
      n.length !== 0 && (e.tryGet(K)?.open(Gg), await t.create(n.map((o) => ({ data: o }))));
    }
  },
  {
    id: "attachment:save",
    labelKey: "commands.attachment.save",
    icon: "download",
    ...Yi,
    enabled: (e) => Ot(e) !== null,
    run: async (e) => {
      const t = je(e), n = Ot(e);
      t && n && await Vi(t, n);
    }
  },
  {
    id: "attachment:go-to",
    labelKey: "commands.attachment.goTo",
    visible: (e) => Ot(e)?.home.kind === "page",
    run: (e) => {
      const t = Ot(e);
      t && je(e)?.reveal(t);
    }
  },
  {
    id: "attachment:delete",
    labelKey: "commands.attachment.delete",
    icon: "trash",
    ...Xi,
    allowed: (e) => {
      const t = je(e), n = Ot(e);
      return t ? n ? t.canDelete(n) : t.canCreate() : !0;
    },
    enabled: (e) => Ot(e) !== null,
    run: async (e) => {
      const t = je(e), n = Ot(e);
      t && n && await t.delete(n);
    }
  },
  {
    id: "menu:attachment-item",
    labelKey: "commands.attachment.more",
    icon: "dots",
    menu: Wg,
    categories: ["attachments"]
  },
  {
    id: "annotation:save-file",
    labelKey: "commands.annotate.saveFile",
    icon: "download",
    ...Yi,
    visible: (e) => qi(e) !== null,
    run: async (e) => {
      const t = je(e), n = qi(e);
      t && n && await Vi(t, n);
    }
  }
], qg = "comment-item", Yg = [
  "accepted",
  "rejected",
  "cancelled",
  "completed",
  "none"
], Xg = {
  none: "comments.statusNone",
  accepted: "comments.statusAccepted",
  rejected: "comments.statusRejected",
  cancelled: "comments.statusCancelled",
  completed: "comments.statusCompleted"
}, Zg = (e) => !!e.root.contents?.trim() || e.replies.length > 0, Jg = (e) => e.review.lastChange?.state ?? "none", yo = (e) => e.tryGet(we)?.comments ?? null, kn = (e) => {
  const t = e.tryGet(we), [n] = t?.selection.getSelected() ?? [];
  return n ? t?.comments.getThread(n.ref) ?? null : null;
}, Qg = (e) => {
  const t = kn(e);
  return t !== null && Zg(t) && !!yo(e)?.canSetStatus(t.root.ref);
}, eb = (e) => ({
  id: `comment:status-${e}`,
  labelKey: Xg[e],
  categories: ["comments.writing"],
  visible: Qg,
  active: (t) => {
    const n = kn(t);
    return n !== null && Jg(n) === e;
  },
  run: async (t) => {
    const n = kn(t);
    n && await yo(t)?.setStatus(n.root.ref, e);
  }
}), tb = [
  ...Yg.map(eb),
  {
    id: "comment:delete-thread",
    labelKey: "comments.deleteThread",
    icon: "trash",
    categories: ["comments.writing"],
    enabled: (e) => {
      const t = kn(e);
      return t !== null && !!yo(e)?.canDeleteThread(t.root.ref);
    },
    run: async (e) => {
      const t = kn(e);
      t && await yo(e)?.deleteThread(t.root.ref);
    }
  },
  {
    id: "menu:comment-item",
    labelKey: "commands.commentThread.more",
    icon: "dots",
    menu: qg,
    categories: ["comments.writing"]
  }
], nb = "mode";
function _o(e) {
  return e.listOpenSurfaces().find((t) => t.exclusive === "mode")?.id ?? null;
}
function ob(e) {
  return el(e).map((t) => {
    const n = ou(e, t).map((o) => e.bars[o]).find((o) => o.title !== void 0 || o.titleKey !== void 0);
    return {
      mode: t,
      title: n?.title,
      titleKey: n?.titleKey
    };
  });
}
const rb = (e, t) => e.length === t.length && e.every((n, o) => n.mode === t[o].mode && n.title === t[o].title && n.titleKey === t[o].titleKey);
function ab(e, t) {
  return e.filter((n) => !t(po(n.mode))).map((n) => {
    const o = po(n.mode);
    return {
      id: o,
      label: n.title ?? (n.titleKey === void 0 ? n.mode : void 0),
      labelKey: n.titleKey,
      run: (r) => {
        r.tryGet(K)?.toggle(o, { exclusive: nb }), r.tryGet(Cn)?.activateTool("pointer");
      },
      active: (r) => r.tryGet(K)?.isOpen(o) ?? !1
    };
  });
}
const Nr = "document:open", ka = "application/pdf", Sa = (e) => e.type === ka || /\.pdf$/i.test(e.name);
function yc(e) {
  if (!e || !Array.from(e.types).includes("Files")) return !1;
  const t = Array.from(e.items ?? []).filter((n) => n.kind === "file");
  return t.length === 0 || t.some((n) => n.type === ka || n.type === "");
}
const ib = (e) => {
  const t = e?.files;
  return Array.isArray(t) ? t : null;
}, sb = () => oa({ accept: `.pdf,${ka}` }).then((e) => e ? [e] : []);
function lb(e, t) {
  e.openAll(t.map((n) => ({
    name: n.name.replace(/\.pdf$/i, "") || n.name,
    source: async () => ({
      kind: "bytes",
      bytes: new Uint8Array(await n.arrayBuffer())
    })
  })));
}
const cb = {
  id: Nr,
  labelKey: "commands.open",
  icon: "fileImport",
  shortcut: "Mod+O",
  categories: ["documents.open"],
  visible: (e) => e.tryGet(Oe)?.canOpenFiles() ?? !1,
  run: async (e) => {
    const t = e.tryGet(Oe);
    t && lb(t, ib(e.args) ?? await sb());
  }
}, db = "outline", Ir = "outline-rename", _c = "outline-properties", ub = "outline-item", bt = (e) => e.tryGet(Lo), vn = (e) => {
  const t = bt(e), [n] = t?.getSelected() ?? [];
  return n ? t?.get(n) ?? null : null;
}, dn = (e) => vn(e) !== null, Tt = {
  categories: ["outline.editing"],
  allowed: (e) => bt(e)?.canEdit() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-outline-modify"
};
async function Zi(e, t) {
  const n = bt(e);
  if (!n) return;
  const o = e.tryGet(K), r = vn(e);
  o?.open(db), o?.open(Ir, { props: { after: r?.ref.objectNumber ?? null } });
  try {
    await n.create(t(r), { select: !0 });
  } catch (a) {
    throw o?.close(Ir), a;
  }
}
const pb = [
  {
    id: "outline:add",
    labelKey: "commands.outline.add",
    icon: "plus",
    shortcut: "Mod+B",
    ...Tt,
    run: (e) => Zi(e, (t) => t ? {
      parent: t.parent,
      position: { after: t.ref }
    } : {})
  },
  {
    id: "outline:add-child",
    labelKey: "commands.outline.addChild",
    ...Tt,
    enabled: dn,
    run: (e) => Zi(e, (t) => t ? { parent: t.ref } : {})
  },
  {
    id: "outline:rename",
    labelKey: "commands.outline.rename",
    ...Tt,
    enabled: dn,
    run: (e) => {
      const t = vn(e);
      t && e.tryGet(K)?.open(Ir, { props: { item: t.ref.objectNumber } });
    }
  },
  {
    id: "outline:set-destination",
    labelKey: "commands.outline.setDestination",
    ...Tt,
    enabled: (e) => dn(e) && bt(e)?.getCurrentViewTarget() != null,
    run: async (e) => {
      const t = bt(e), n = vn(e), o = t?.getCurrentViewTarget() ?? null;
      t && n && o && await t.update(n.ref, { target: o });
    }
  },
  {
    id: "outline:properties",
    labelKey: "commands.outline.properties",
    ...Tt,
    enabled: dn,
    run: (e) => {
      const t = vn(e);
      t && e.tryGet(K)?.open(_c, {
        exclusive: "modal",
        props: { item: t.ref.objectNumber }
      });
    }
  },
  {
    id: "outline:delete",
    labelKey: "commands.outline.delete",
    icon: "trash",
    ...Tt,
    enabled: dn,
    run: async (e) => {
      const t = bt(e), n = t?.getSelected() ?? [];
      t && n.length > 0 && await t.delete(n);
    }
  },
  {
    id: "menu:outline-item",
    labelKey: "commands.outline.more",
    icon: "dots",
    menu: ub,
    ...Tt
  },
  {
    id: "outline:expand-all",
    labelKey: "commands.outline.expandAll",
    icon: "chevronsDown",
    categories: ["outline"],
    run: (e) => bt(e)?.expandAll()
  },
  {
    id: "outline:collapse-all",
    labelKey: "commands.outline.collapseAll",
    icon: "chevronsUp",
    categories: ["outline"],
    run: (e) => bt(e)?.collapseAll()
  }
], fb = "page", xc = "application/pdf", He = (e) => e.tryGet(Do), vt = (e) => He(e)?.getSelected() ?? [], Lr = (e) => vt(e).length > 0, ao = (e) => e.tryGet(Oe)?.listPages(e.documentId ?? void 0) ?? [], kc = (e) => e.args ?? {}, Ct = {
  categories: ["pages"],
  allowed: (e) => He(e)?.canEdit() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-pages-assemble"
};
function Ji(e) {
  const t = kc(e).position;
  if (t) return t;
  const n = new Set(vt(e).map((r) => r.objectNumber)), o = ao(e).filter((r) => n.has(r.ref.objectNumber)).pop();
  return o ? { after: o.ref } : "end";
}
async function mb(e) {
  const t = kc(e).files;
  if (t) return t.filter(Sa);
  const n = await oa({ accept: `.pdf,${xc}` });
  return n ? [n] : [];
}
function hb(e) {
  const t = e.documentId ?? void 0;
  return `${e.tryGet(Oe)?.get(t)?.name?.replace(/\.pdf$/i, "") || "document"}-pages.pdf`;
}
const Qi = (e, t, n, o) => ({
  id: e,
  labelKey: t,
  icon: n,
  ...Ct,
  enabled: Lr,
  run: async (r) => {
    const a = vt(r);
    a.length > 0 && await He(r)?.rotateBy(a, o);
  }
}), gb = [
  Qi("page:rotate-clockwise", "commands.pages.rotateClockwise", "pageRotateClockwise", 90),
  Qi("page:rotate-counterclockwise", "commands.pages.rotateCounterclockwise", "pageRotateCounterClockwise", -90),
  {
    id: "page:delete",
    labelKey: "commands.pages.delete",
    icon: "trash",
    ...Ct,
    enabled: (e) => {
      const t = vt(e).length;
      return t > 0 && t < ao(e).length;
    },
    run: async (e) => {
      const t = vt(e);
      t.length > 0 && await He(e)?.delete(t);
    }
  },
  {
    id: "page:duplicate",
    labelKey: "commands.pages.duplicate",
    icon: "copy",
    ...Ct,
    enabled: Lr,
    run: async (e) => {
      const t = He(e), n = vt(e);
      if (!t || n.length === 0) return;
      const { pages: o } = await t.duplicate(n);
      t.select(o);
    }
  },
  {
    id: "page:insert-blank",
    labelKey: "commands.pages.insertBlank",
    icon: "filePlus",
    ...Ct,
    run: async (e) => {
      const t = He(e);
      if (!t) return;
      const { pages: n } = await t.insertBlank({ position: Ji(e) });
      t.select(n);
    }
  },
  {
    id: "page:insert-file",
    labelKey: "commands.pages.insertFile",
    icon: "fileImport",
    ...Ct,
    run: async (e) => {
      const t = He(e);
      if (!t) return;
      let n = Ji(e);
      const o = await mb(e), r = [];
      for (const a of o) {
        const { pages: s } = await t.insertFromBytes(new Uint8Array(await a.arrayBuffer()), { position: n });
        r.push(...s);
        const l = s[s.length - 1];
        l && (n = { after: l });
      }
      r.length > 0 && t.select(r);
    }
  },
  {
    id: "page:extract",
    labelKey: "commands.pages.extract",
    icon: "fileExport",
    categories: ["documents.download"],
    allowed: (e) => He(e)?.canExtract() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-download",
    enabled: Lr,
    run: async (e) => {
      const t = vt(e), n = He(e);
      !n || t.length === 0 || na(await n.extract(t), hb(e), xc);
    }
  },
  {
    id: "page:select-all",
    labelKey: "commands.pages.selectAll",
    categories: Ct.categories,
    enabled: (e) => vt(e).length < ao(e).length,
    run: (e) => He(e)?.select(ao(e).map((t) => t.ref))
  },
  {
    id: "menu:page",
    labelKey: "commands.pages.more",
    icon: "dots",
    menu: fb,
    ...Ct
  }
], Sc = "go-to-page", Mc = "shortcuts", es = "redact-confirm", bb = "print", ts = "form-design", vb = "form-edit", wb = [
  "form-text",
  "form-checkbox",
  "form-radio",
  "form-combobox",
  "form-listbox",
  "form-button",
  "form-signature"
], yb = (e) => e === "form-edit" || e != null && wb.includes(e), ns = (e) => yb(e.tryGet(Cn)?.getActiveToolId()), _b = "embedpdf-custom", z = (e) => e.tryGet(lt), Vn = (e) => (z(e)?.getPageCount() ?? 0) > 1, me = (e) => e.tryGet(Cn), he = (e) => e.tryGet(we), io = (e) => e.tryGet(An), so = (e) => e.tryGet(tn), qn = (e) => so(e)?.getSnapshot() ?? null, xb = Fg.find((e) => "id" in e && e.id === "document:download"), kb = (e, t) => {
  const n = e.tryGet(Oe), o = e.documentId ?? void 0;
  return `${(n?.get(o)?.name ?? "document").replace(/\.pdf$/i, "")} p${(n?.listPages(o).findIndex((r) => r.ref.objectNumber === t.objectNumber) ?? -1) + 1}.png`;
}, re = {
  allowed: (e) => he(e)?.canCreate() ?? !0,
  notAllowedKey: "commands.notAllowed.annotations-create"
}, pt = {
  allowed: (e) => e.tryGet(nn)?.canDesign() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-forms-modify"
}, os = {
  allowed: (e) => e.tryGet(Pe)?.canPlace(e.documentId ?? void 0) ?? !0,
  notAllowedKey: "commands.notAllowed.annotations-create"
}, Sb = (e, t) => e === t || !!e && !!t && e.start.page.objectNumber === t.start.page.objectNumber && e.start.index === t.start.index && e.end.page.objectNumber === t.end.page.objectNumber && e.end.index === t.end.index, Yn = (e, t) => ({
  run: (n) => n.tryGet(De)?.execute(It(e), { documentId: n.documentId ?? void 0 }),
  active: (n) => n.tryGet(K)?.isOpen(e) ?? !1,
  visible: (n) => (n.tryGet(De)?.hasCommand(It(e)) ?? !1) && (t?.(n) ?? !0)
}), cr = (e) => {
  const t = z(e)?.getCurrentPage();
  return t != null && (e.tryGet(xt)?.canMeasure(t) ?? !1);
}, dr = (e) => (he(e)?.selection.getSelected().length ?? 0) > 0, rs = (e) => {
  const t = he(e);
  return (t?.selection.getSelected() ?? []).every(({ ref: n }) => t.isEditable(n));
}, ur = (e) => new Set((he(e)?.selection.getSelected() ?? []).map((t) => t.subtype)), pr = (e) => {
  const t = he(e)?.selection.getSelected() ?? [];
  return t.every((n) => n.subtype === "redact") ? t.map((n) => n.ref) : [];
}, Xn = (e) => {
  const t = he(e)?.selection.getProperties();
  if (!(!t || !t.properties.some((n) => n.key === "link") || t.mixed.includes("link")))
    return t.values.link ?? null;
}, Wt = {};
Wt.stamp = { icon: "rubberStamp" };
const Pc = (e, t, n) => {
  if (!n) return null;
  const o = e.tryGet(we);
  if (!o) return null;
  const r = o.tools.getDefaults(t), a = (s) => r[s] ?? void 0;
  return {
    primary: a(n.primary),
    secondary: n.secondary ? a(n.secondary) : void 0
  };
}, Oc = {}, Tc = (e, t, n, { feature: o, check: r, accent: a }) => (n && (Wt[t] = {
  icon: n,
  ...a ? { accent: a } : {}
}), Oc[t] = o, {
  id: e,
  ...n ? { icon: n } : {},
  categories: [o],
  ...r,
  run: (s) => me(s)?.activateTool(t),
  active: (s) => me(s)?.getActiveToolId() === t,
  enabled: (s) => me(s) != null,
  iconAccent: (s) => Pc(s, t, a)
}), Y = (e, t, n, o, r) => ({
  ...Tc(e, t, o, r),
  labelKey: n
}), fr = (e, t, n, o, r) => ({
  id: e,
  labelKey: n,
  icon: o,
  categories: [r],
  ...re,
  visible: (a) => io(a)?.hasSelection() ?? !1,
  run: (a) => he(a)?.createFromSelection(t),
  iconAccent: (a) => Pc(a, t, { primary: "color" })
}), Mb = (e) => {
  const t = e?.page;
  return typeof t == "number" && Number.isFinite(t) ? Math.round(t) : null;
}, un = (e, t, n) => ({
  id: e,
  labelKey: n,
  run: (o) => z(o)?.zoomTo({ level: t }),
  enabled: (o) => z(o) != null
}), mr = (e, t, n, o) => ({
  id: e,
  labelKey: n,
  icon: o,
  run: (r) => z(r)?.updateSettings({ spread: t }),
  active: (r) => z(r)?.getSettings().spread === t,
  enabled: (r) => z(r) != null,
  locked: (r) => z(r)?.getLock("spread") ?? null
}), as = (e, t, n, o) => ({
  id: e,
  labelKey: n,
  icon: o,
  run: (r) => z(r)?.updateSettings({
    flow: "continuous",
    layout: t
  }),
  active: (r) => {
    const a = z(r)?.getSettings();
    return a?.flow === "continuous" && a.layout === t;
  },
  enabled: (r) => z(r) != null,
  locked: (r) => z(r)?.getLock("flow") ?? z(r)?.getLock("layout") ?? null
}), is = [
  {
    id: "zoom:in",
    labelKey: "commands.zoom.in",
    icon: "zoomIn",
    shortcut: ["Mod+=", "Mod+NumpadAdd"],
    run: (e) => z(e)?.zoomIn(),
    enabled: (e) => z(e)?.canZoomIn() ?? !1
  },
  {
    id: "zoom:out",
    labelKey: "commands.zoom.out",
    icon: "zoomOut",
    shortcut: ["Mod+-", "Mod+NumpadSubtract"],
    run: (e) => z(e)?.zoomOut(),
    enabled: (e) => z(e)?.canZoomOut() ?? !1
  },
  {
    id: "zoom:fit-page",
    labelKey: "commands.zoom.fitPage",
    icon: "fitToPage",
    shortcut: "Mod+0",
    run: (e) => z(e)?.fitPage(),
    active: (e) => z(e)?.getZoomMode() === or.FitPage,
    enabled: (e) => z(e) != null
  },
  {
    id: "zoom:fit-width",
    labelKey: "commands.zoom.fitWidth",
    icon: "fitToWidth",
    shortcut: "Mod+1",
    run: (e) => z(e)?.fitWidth(),
    active: (e) => z(e)?.getZoomMode() === or.FitWidth,
    enabled: (e) => z(e) != null
  },
  {
    id: "zoom:automatic",
    labelKey: "commands.zoom.automatic",
    run: (e) => z(e)?.fitAutomatic(),
    active: (e) => z(e)?.getZoomMode() === or.Automatic,
    enabled: (e) => z(e) != null
  },
  un("zoom:50", 0.5, "commands.zoom.p50"),
  un("zoom:100", 1, "commands.zoom.p100"),
  un("zoom:150", 1.5, "commands.zoom.p150"),
  un("zoom:200", 2, "commands.zoom.p200"),
  un("zoom:400", 4, "commands.zoom.p400"),
  {
    id: "menu:zoom",
    labelKey: "commands.zoom.menu",
    icon: "zoomIn",
    menu: "zoom"
  },
  {
    id: "page:next",
    labelKey: "commands.page.next",
    icon: "chevronRight",
    shortcut: "ArrowRight",
    run: (e) => z(e)?.nextPage(),
    enabled: (e) => z(e)?.canGoNext() ?? !1,
    visible: Vn
  },
  {
    id: "page:previous",
    labelKey: "commands.page.previous",
    icon: "chevronLeft",
    shortcut: "ArrowLeft",
    run: (e) => z(e)?.previousPage(),
    enabled: (e) => z(e)?.canGoPrevious() ?? !1,
    visible: Vn
  },
  {
    id: "page:first",
    labelKey: "commands.page.first",
    shortcut: "Home",
    run: (e) => z(e)?.goToFirstPage(),
    enabled: (e) => z(e)?.canGoPrevious() ?? !1,
    visible: Vn
  },
  {
    id: "page:last",
    labelKey: "commands.page.last",
    shortcut: "End",
    run: (e) => z(e)?.goToLastPage(),
    enabled: (e) => z(e)?.canGoNext() ?? !1,
    visible: Vn
  },
  {
    id: "page:go-to",
    labelKey: "commands.page.goTo",
    run: (e) => {
      const t = z(e);
      if (!t) return;
      const n = Mb(e.args);
      if (n === null) {
        e.tryGet(K)?.open(Sc, { exclusive: "modal" });
        return;
      }
      t.goToPage(Math.min(Math.max(n, 1), t.getPageCount()) - 1);
    },
    enabled: (e) => (z(e)?.getPageCount() ?? 0) > 0
  },
  {
    id: "tool:pan",
    labelKey: "commands.pan",
    icon: "hand",
    run: (e) => me(e)?.activateTool("pan"),
    active: (e) => me(e)?.getActiveToolId() === "pan",
    enabled: (e) => me(e) != null
  },
  {
    id: "tool:pointer",
    labelKey: "commands.pointer",
    icon: "pointer",
    run: (e) => me(e)?.activateTool("pointer"),
    active: (e) => me(e)?.getActiveToolId() === "pointer",
    enabled: (e) => me(e) != null
  },
  {
    id: "tool:zoom",
    labelKey: "commands.zoom.marquee",
    icon: "zoomInArea",
    run: (e) => me(e)?.activateTool("zoom"),
    active: (e) => me(e)?.getActiveToolId() === "zoom",
    enabled: (e) => me(e) != null
  },
  {
    id: "tool:snapshot",
    labelKey: "commands.snapshot.tool",
    icon: "screenshot",
    categories: ["snapshots"],
    allowed: (e) => so(e)?.canSnapshot() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-content-copy",
    run: (e) => me(e)?.activateTool(rr),
    active: (e) => me(e)?.getActiveToolId() === rr,
    enabled: (e) => me(e)?.hasTool(rr) ?? !1
  },
  {
    id: "menu:document",
    labelKey: "commands.menu",
    icon: "menu",
    menu: "document"
  },
  {
    id: "menu:view",
    labelKey: "commands.viewControls",
    icon: "viewSettings",
    menu: "view"
  },
  ...pb,
  ...Vg,
  ...tb,
  ...gb,
  cb,
  {
    id: "document:download",
    labelKey: "commands.download",
    icon: "download",
    shortcut: "Mod+S",
    categories: ["documents.download"],
    allowed: (e) => e.tryGet(Oe)?.canDownload() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-download",
    run: (e) => {
      e.tryGet(Oe) && Promise.resolve(xb.run?.(e)).catch((t) => console.warn("[embedpdf] download failed", t));
    },
    enabled: (e) => e.documentId != null
  },
  {
    id: "document:print",
    labelKey: "commands.print",
    icon: "print",
    shortcut: "Mod+P",
    categories: ["documents.print"],
    allowed: (e) => e.tryGet(Oe)?.canPrint() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-print",
    modal: bb,
    enabled: (e) => e.documentId != null
  },
  mr("view:single-page", "none", "commands.spread.none", "singlePage"),
  mr("view:two-pages", "odd", "commands.spread.odd", "doublePage"),
  mr("view:cover-page", "even", "commands.spread.even", "book2"),
  as("view:scroll-vertical", "vertical", "commands.scroll.vertical", "vertical"),
  as("view:scroll-horizontal", "horizontal", "commands.scroll.horizontal", "horizontal"),
  {
    id: "view:scroll-paged",
    labelKey: "commands.scroll.paged",
    icon: "pageByPage",
    run: (e) => z(e)?.updateSettings({ flow: "paged" }),
    active: (e) => z(e)?.getSettings().flow === "paged",
    enabled: (e) => z(e) != null,
    locked: (e) => z(e)?.getLock("flow") ?? null
  },
  {
    id: "view:rotate-clockwise",
    labelKey: "commands.rotate.clockwise",
    icon: "rotateClockwise",
    run: (e) => z(e)?.rotateViewBy(90),
    enabled: (e) => z(e) != null,
    locked: (e) => z(e)?.getLock("viewRotation") ?? null
  },
  {
    id: "view:rotate-counterclockwise",
    labelKey: "commands.rotate.counterclockwise",
    icon: "rotateCounterClockwise",
    run: (e) => z(e)?.rotateViewBy(-90),
    enabled: (e) => z(e) != null,
    locked: (e) => z(e)?.getLock("viewRotation") ?? null
  },
  {
    id: "mode:view",
    labelKey: "commands.mode.view",
    run: (e) => {
      const t = e.tryGet(K), n = t ? _o(t) : null;
      n && t?.close(n), me(e)?.activateTool("pointer");
    },
    active: (e) => {
      const t = e.tryGet(K);
      return t ? _o(t) === null : !0;
    }
  },
  Bt("mode:annotate", "commands.mode.annotate", { feature: "annotations" }),
  Bt("mode:shapes", "commands.mode.shapes", { feature: "shapes" }),
  Bt("mode:insert", "commands.mode.insert"),
  Bt("mode:form", "commands.mode.form", { feature: "forms.building" }),
  Bt("mode:redact", "commands.mode.redact", { feature: "redaction" }),
  Bt("mode:measure", "commands.mode.measure", { feature: "measurement" }),
  Y("tool:highlight", "highlight", "commands.annotate.highlight", "highlight", {
    feature: "annotations.highlight",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:strikeout", "strikeout", "commands.annotate.strikeout", "strikethrough", {
    feature: "annotations.markup",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:underline", "underline", "commands.annotate.underline", "underline", {
    feature: "annotations.markup",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:squiggly", "squiggly", "commands.annotate.squiggly", "squiggly", {
    feature: "annotations.markup",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:ink", "ink", "commands.annotate.ink", "pencilMarker", {
    feature: "annotations.drawing",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:ink-highlight", "ink-highlight", "commands.annotate.inkHighlight", "inkHighlighter", {
    feature: "annotations.drawing",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:free-text", "free-text", "commands.annotate.text", "freeText", {
    feature: "annotations.text",
    check: re,
    accent: { primary: "fontColor" }
  }),
  Y("tool:insert-text", "insert-text", "commands.annotate.insertText", "insertText", {
    feature: "annotations.text",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:replace-text", "replace-text", "commands.annotate.replaceText", "replaceText", {
    feature: "annotations.text",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:callout", "free-text-callout", "commands.annotate.callout", "callout", {
    feature: "annotations.text",
    check: re,
    accent: {
      primary: "color",
      secondary: "interiorColor"
    }
  }),
  Y("tool:note", "note", "commands.annotate.note", "message", {
    feature: "annotations.notes",
    check: re
  }),
  Y("tool:link", "link", "commands.annotate.link", "link", {
    feature: "annotations.links",
    check: re
  }),
  Y("tool:square", "square", "commands.shapes.rectangle", "square", {
    feature: "shapes",
    check: re,
    accent: {
      primary: "color",
      secondary: "interiorColor"
    }
  }),
  Y("tool:circle", "circle", "commands.shapes.circle", "circle", {
    feature: "shapes",
    check: re,
    accent: {
      primary: "color",
      secondary: "interiorColor"
    }
  }),
  Y("tool:line", "line", "commands.shapes.line", "line", {
    feature: "shapes",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:arrow", "arrow", "commands.shapes.arrow", "lineArrow", {
    feature: "shapes",
    check: re,
    accent: { primary: "color" }
  }),
  Y("tool:polygon", "polygon", "commands.shapes.polygon", "polygon", {
    feature: "shapes",
    check: re,
    accent: {
      primary: "color",
      secondary: "interiorColor"
    }
  }),
  Y("tool:polyline", "polyline", "commands.shapes.polyline", "zigzag", {
    feature: "shapes",
    check: re,
    accent: { primary: "color" }
  }),
  {
    id: "tool:stamp",
    labelKey: "commands.insert.stamp",
    icon: "rubberStamp",
    categories: ["stamps"],
    ...os,
    ...Yn("stamps", (e) => e.tryGet(Pe) != null)
  },
  Y("tool:attachment", "attachment", "commands.insert.attachment", "paperclip", {
    feature: "attachments.adding",
    check: re
  }),
  {
    id: "tool:signature",
    labelKey: "commands.insert.signature",
    icon: "signature",
    categories: ["signatures.signing"],
    ...os,
    ...Yn("signatures", (e) => e.tryGet(Pe) != null && e.tryGet(on) != null)
  },
  Y("tool:image", "image", "commands.insert.image", "photo", {
    feature: "stamps",
    check: re
  }),
  {
    id: "form:design",
    labelKey: "commands.form.design",
    icon: "formDesign",
    categories: ["forms.building"],
    ...pt,
    run: (e) => {
      const t = me(e), n = e.tryGet(K);
      if (t) {
        if (ns(e)) {
          t.activateTool("pointer"), n?.close(ts);
          return;
        }
        n && !n.isOpen("mode:form") && n.open("mode:form", { exclusive: "mode" }), t.activateTool(vb), n?.open(ts);
      }
    },
    active: ns,
    enabled: (e) => me(e) != null
  },
  Y("tool:text-field", "form-text", "commands.form.textfield", "formTextfield", {
    feature: "forms.building",
    check: pt
  }),
  Y("tool:checkbox", "form-checkbox", "commands.form.checkbox", "formCheckbox", {
    feature: "forms.building",
    check: pt
  }),
  Y("tool:radio", "form-radio", "commands.form.radio", "formRadio", {
    feature: "forms.building",
    check: pt
  }),
  Y("tool:combo-box", "form-combobox", "commands.form.select", "formSelect", {
    feature: "forms.building",
    check: pt
  }),
  Y("tool:list-box", "form-listbox", "commands.form.listbox", "formListbox", {
    feature: "forms.building",
    check: pt
  }),
  Y("tool:button", "form-button", "commands.form.button", "formButton", {
    feature: "forms.building",
    check: pt
  }),
  Y("tool:signature-field", "form-signature", "commands.form.signature", "signature", {
    feature: "forms.building",
    check: pt
  }),
  Y("tool:redact", "redact", "commands.redact.mark", "redactArea", {
    feature: "redaction",
    check: {
      allowed: (e) => e.tryGet(gt)?.canMark() ?? !0,
      notAllowedKey: "commands.notAllowed.annotations-create"
    }
  }),
  {
    id: "redaction:apply",
    labelKey: "commands.redact.applyAll",
    icon: "redact",
    categories: ["redaction"],
    allowed: (e) => e.tryGet(gt)?.canApply() ?? !0,
    modal: es,
    enabled: (e) => {
      const t = e.tryGet(gt);
      return !!t && t.getPendingCount() > 0 && !t.isApplying();
    }
  },
  {
    id: "annotation:apply-redaction",
    labelKey: "commands.redact.apply",
    labelParams: (e) => ({ count: pr(e).length }),
    icon: "check",
    categories: ["redaction"],
    allowed: (e) => e.tryGet(gt)?.canApply() ?? !0,
    run: (e) => e.tryGet(K)?.open(es, {
      exclusive: "modal",
      props: { refs: pr(e) }
    }),
    visible: (e) => pr(e).length > 0,
    enabled: (e) => {
      const t = e.tryGet(gt);
      return !!t && !t.isApplying();
    }
  },
  {
    ...Y("tool:distance", "distance", "measurement.distance", "distance", {
      feature: "measurement",
      check: re,
      accent: { primary: "color" }
    }),
    enabled: cr
  },
  {
    ...Y("tool:perimeter", "perimeter", "measurement.perimeter", "perimeter", {
      feature: "measurement",
      check: re,
      accent: { primary: "color" }
    }),
    enabled: cr
  },
  {
    ...Y("tool:area", "area", "measurement.area", "area", {
      feature: "measurement",
      check: re,
      accent: { primary: "color" }
    }),
    enabled: cr
  },
  {
    id: "measurement:calibrate",
    labelKey: "measurement.calibrate",
    icon: "calibrate",
    categories: ["measurement"],
    allowed: (e) => e.tryGet(xt)?.canCalibrate() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-annotate-modify",
    enabled: (e) => e.tryGet(xt) != null,
    active: (e) => me(e)?.getActiveToolId() === "calibrate",
    run: (e) => e.tryGet(xt)?.startCalibration()
  },
  {
    id: "annotation:cancel-creation",
    labelKey: "commands.annotate.cancelCreation",
    shortcut: "Escape",
    enabled: (e) => he(e)?.draft.get() != null,
    run: (e) => he(e)?.draft.cancel()
  },
  {
    id: "annotation:delete",
    labelKey: "commands.annotate.delete",
    icon: "trash",
    shortcut: ["Delete", "Backspace"],
    categories: ["annotations"],
    run: (e) => void he(e)?.selection.delete(),
    visible: dr,
    enabled: (e) => {
      const t = he(e), n = t?.selection.getSelected() ?? [];
      return n.length > 0 && n.every(({ ref: o }) => t.canDelete(o) && t.isEditable(o));
    }
  },
  {
    id: "annotation:comment",
    labelKey: "commands.comment",
    icon: "comment",
    categories: ["comments"],
    ...Yn("comments", (e) => dr(e) && !ur(e).has("widget"))
  },
  {
    id: "annotation:style",
    labelKey: "commands.style",
    icon: "palette",
    categories: ["annotations"],
    ...Yn("style", (e) => (he(e)?.selection.getProperties().properties.length ?? 0) > 0)
  },
  {
    id: "annotation:stamp-from-selection",
    labelKey: "commands.annotate.stampFromSelection",
    icon: "rubberStampPlus",
    categories: ["stamps"],
    allowed: (e) => e.tryGet(Pe)?.canCreateFromAnnotations(e.documentId ?? void 0) ?? !0,
    notAllowedKey: "commands.notAllowed.doc-download",
    run: (e) => {
      const t = he(e), n = e.tryGet(Pe), o = e.documentId;
      if (!t || !n || o == null) return;
      const r = t.selection.getSelected(), a = r[0]?.ref.page;
      if (a === void 0) return;
      const s = e.tryGet(En), l = s?.t("demo.stampsCustomLabel") ?? "Custom stamp", d = s?.t("demo.stampsCustomLibrary") ?? "My stamps", c = _b;
      (n.getLibrary(c) ? Promise.resolve(c) : n.createLibrary(d, {
        id: c,
        categories: ["custom"]
      }).then(({ library: p }) => p.id)).then((p) => n.createAssetFromAnnotations(a, r.map((f) => f.ref), {
        libraryId: p,
        label: `${l} ${n.listAssets({ libraryId: p }).length + 1}`
      }, { documentId: o })).then(async () => {
        const p = e.tryGet(K);
        p && (p.isOpen("stamps") || await e.tryGet(De)?.execute(It("stamps"), { documentId: o }), p.updateSurfaceProps("stamps", { libraryId: c }));
      }).catch((p) => console.warn("[embedpdf] stamp from selection failed", p));
    },
    visible: (e) => e.tryGet(Pe) != null && dr(e) && !ur(e).has("widget") && !ur(e).has("redact") && new Set((he(e)?.selection.getSelected() ?? []).map((t) => t.ref.page.objectNumber)).size === 1
  },
  {
    id: "annotation:group",
    labelKey: "commands.annotate.group",
    icon: "group",
    categories: ["annotations"],
    run: (e) => void he(e)?.selection.group(),
    visible: (e) => (he(e)?.selection.canGroup() ?? !1) && rs(e)
  },
  {
    id: "annotation:ungroup",
    labelKey: "commands.annotate.ungroup",
    icon: "ungroup",
    categories: ["annotations"],
    run: (e) => void he(e)?.selection.ungroup(),
    visible: (e) => (he(e)?.selection.canUngroup() ?? !1) && rs(e)
  },
  {
    id: "selection:copy",
    labelKey: "commands.selection.copy",
    icon: "copy",
    categories: ["text.copy"],
    allowed: (e) => io(e)?.canCopy() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-text-copy",
    visible: (e) => io(e)?.hasSelection() ?? !1,
    run: (e) => {
      const t = io(e);
      if (!t) return;
      const n = t.getRange();
      Fp(t).then((o) => {
        o !== "" && Sb(t.getRange(), n) && t.clear();
      }, () => {
      });
    }
  },
  fr("selection:highlight", "highlight", "commands.annotate.highlight", "highlight", "annotations.highlight"),
  fr("selection:underline", "underline", "commands.annotate.underline", "underline", "annotations.markup"),
  fr("selection:strikeout", "strikeout", "commands.annotate.strikeout", "strikethrough", "annotations.markup"),
  {
    id: "snapshot:copy",
    labelKey: "commands.snapshot.copy",
    icon: "copy",
    shortcut: "Mod+C",
    categories: ["snapshots"],
    visible: (e) => qn(e) != null,
    run: (e) => {
      const t = so(e), n = t?.getSnapshot();
      !t || !n || Bp(n.image).then(() => {
        t.getSnapshot() === n && t.clearSnapshot();
      }, () => {
      });
    }
  },
  {
    id: "snapshot:save",
    labelKey: "commands.snapshot.save",
    icon: "download",
    categories: ["snapshots"],
    visible: (e) => qn(e) != null,
    run: (e) => {
      const t = qn(e);
      if (!t) return;
      const n = kb(e, t.page);
      t.image.then((o) => o.blob()).then((o) => na(o, n, "image/png")).catch((o) => console.warn("[snippet-react] snapshot save failed", o));
    }
  },
  {
    id: "snapshot:clear",
    labelKey: "commands.snapshot.clear",
    icon: "x",
    shortcut: "Escape",
    categories: ["snapshots"],
    visible: (e) => qn(e) != null,
    run: (e) => so(e)?.clearSnapshot()
  },
  {
    id: "annotation:link",
    labelKey: "commands.annotate.link",
    icon: "link",
    categories: ["annotations.links"],
    run: (e) => e.tryGet(K)?.toggle("link-editor"),
    active: (e) => e.tryGet(K)?.isOpen("link-editor") ?? !1,
    visible: (e) => Xn(e) === null
  },
  {
    id: "annotation:goto-link",
    labelKey: "commands.annotate.gotoLink",
    icon: "externalLink",
    run: (e) => {
      const t = Xn(e);
      t && e.tryGet(ho)?.activate(t);
    },
    visible: (e) => Xn(e) != null
  },
  {
    id: "annotation:remove-link",
    labelKey: "commands.annotate.removeLink",
    icon: "linkOff",
    categories: ["annotations.links"],
    run: (e) => he(e)?.selection.updateLink(null),
    visible: (e) => Xn(e) != null
  },
  {
    id: "help:shortcuts",
    labelKey: "commands.shortcuts",
    shortcut: "?",
    modal: Mc,
    enabled: (e) => e.tryGet(K) != null
  },
  {
    id: "history:undo",
    labelKey: "commands.undo",
    icon: "arrowBackUp",
    shortcut: "Mod+z",
    run: (e) => e.tryGet(Hn)?.undo(),
    enabled: (e) => e.tryGet(Hn)?.canUndo() ?? !1
  },
  {
    id: "history:redo",
    labelKey: "commands.redo",
    icon: "arrowForwardUp",
    shortcut: ["Shift+Mod+z", "Mod+y"],
    run: (e) => e.tryGet(Hn)?.redo(),
    enabled: (e) => e.tryGet(Hn)?.canRedo() ?? !1
  }
];
function Bt(e, t, { feature: n } = {}) {
  return {
    id: e,
    labelKey: t,
    ...n ? { categories: [n] } : {},
    run: (o) => {
      o.tryGet(K)?.toggle(e, { exclusive: "mode" }), me(o)?.activateTool("pointer");
    },
    active: (o) => o.tryGet(K)?.isOpen(e) ?? !1
  };
}
function Pb(e, t) {
  return e.flatMap((n) => {
    const o = `tool:${n.id}`;
    if (t(o)) return [];
    const r = n.extends, a = n.meta ?? {}, s = typeof a.icon == "string" ? a.icon : r && Wt[r]?.icon;
    return [{
      ...Tc(o, n.id, s || void 0, {
        feature: r && Oc[r] || "annotations",
        check: re,
        ...r && Wt[r]?.accent ? { accent: Wt[r].accent } : {}
      }),
      label: typeof a.label == "string" ? a.label : n.id
    }];
  });
}
const Kt = {
  id: "style",
  items: ["panel:style"],
  importance: 4,
  dependent: !0
}, Ht = {
  id: "history",
  items: ["history:undo", "history:redo"],
  importance: 3,
  dependent: !0
}, Cc = {
  bars: {
    main: {
      place: "top",
      start: [
        {
          id: "document",
          items: ["menu:document"],
          importance: 5
        },
        {
          id: "view",
          items: [{
            command: "panel:thumbnails",
            importance: 5
          }, "menu:view"],
          importance: 3
        },
        {
          id: "zoom",
          items: [{
            custom: "zoom",
            command: "menu:zoom",
            variants: ["inline", "button"]
          }],
          importance: 3
        },
        {
          id: "tools",
          items: ["tool:pan", "tool:pointer"],
          importance: 2
        }
      ],
      center: [{
        id: "modes",
        items: [],
        shed: !0,
        collapse: "select",
        importance: 4,
        titleKey: "commands.mode.group"
      }],
      end: [{
        id: "panels",
        items: [
          {
            custom: "view-only",
            variants: ["label", "icon"]
          },
          "panel:search",
          "panel:comments"
        ],
        importance: 5
      }]
    },
    annotate: {
      place: { with: "main" },
      mode: "annotate",
      titleKey: "commands.mode.annotate",
      center: [
        {
          id: "comment",
          items: ["tool:note", "tool:link"],
          importance: 4
        },
        {
          id: "markup",
          items: [
            "tool:highlight",
            "tool:strikeout",
            "tool:underline",
            "tool:squiggly"
          ],
          importance: 4
        },
        {
          id: "draw",
          items: ["tool:ink", "tool:ink-highlight"],
          importance: 3
        },
        {
          id: "text",
          items: [
            "tool:free-text",
            "tool:insert-text",
            "tool:replace-text",
            "tool:callout"
          ],
          importance: 2
        },
        Kt,
        Ht
      ]
    },
    shapes: {
      place: { with: "main" },
      mode: "shapes",
      titleKey: "commands.mode.shapes",
      center: [
        {
          id: "shapes",
          items: [
            "tool:square",
            "tool:circle",
            "tool:line",
            "tool:arrow"
          ],
          importance: 4
        },
        {
          id: "polygons",
          items: ["tool:polygon", "tool:polyline"],
          importance: 2
        },
        Kt,
        Ht
      ]
    },
    insert: {
      place: { with: "main" },
      mode: "insert",
      titleKey: "commands.mode.insert",
      center: [
        {
          id: "stamps",
          items: [
            "tool:stamp",
            {
              custom: "quick-stamps",
              command: "tool:stamp",
              importance: 3
            },
            "tool:attachment",
            "tool:signature",
            "tool:image"
          ],
          importance: 4
        },
        Kt,
        Ht
      ]
    },
    form: {
      place: { with: "main" },
      mode: "form",
      titleKey: "commands.mode.form",
      center: [
        {
          id: "design",
          items: ["form:design"],
          importance: 5
        },
        {
          id: "fields",
          items: [
            "tool:text-field",
            "tool:checkbox",
            "tool:radio"
          ],
          importance: 4
        },
        {
          id: "choices",
          items: ["tool:combo-box", "tool:list-box"],
          importance: 2
        },
        {
          id: "buttons",
          items: ["tool:button"],
          importance: 2
        },
        {
          id: "signatures",
          items: ["tool:signature-field"],
          importance: 2
        },
        Kt,
        Ht
      ]
    },
    redact: {
      place: { with: "main" },
      mode: "redact",
      titleKey: "commands.mode.redact",
      center: [
        {
          id: "redact",
          items: ["tool:redact", "panel:redaction"],
          importance: 4
        },
        Kt,
        Ht
      ]
    },
    measure: {
      place: { with: "main" },
      mode: "measure",
      titleKey: "commands.mode.measure",
      center: [
        {
          id: "measure",
          items: [
            "tool:distance",
            "tool:perimeter",
            "tool:area",
            "measurement:calibrate"
          ],
          importance: 5
        },
        {
          id: "scale",
          items: [{
            custom: "measurement-scale",
            command: "panel:measurement",
            variants: ["inline"]
          }],
          importance: 4
        },
        Kt
      ]
    },
    pager: {
      place: { float: "bottom" },
      center: [{
        id: "pages",
        items: [
          "page:previous",
          { custom: "page-number" },
          "page:next"
        ],
        importance: 5
      }]
    },
    selection: {
      place: { at: "selection" },
      center: [{
        id: "selection",
        items: [
          "selection:copy",
          "selection:highlight",
          "selection:underline",
          "selection:strikeout"
        ],
        importance: 4
      }]
    },
    snapshot: {
      place: { at: "snapshot" },
      center: [{
        id: "snapshot",
        items: ["snapshot:copy", "snapshot:save"],
        importance: 4
      }]
    },
    annotation: {
      place: { at: "annotation" },
      center: [{
        id: "actions",
        items: [
          "annotation:comment",
          "annotation:style",
          "annotation:stamp-from-selection",
          "annotation:link",
          "annotation:goto-link",
          "annotation:save-file",
          "annotation:remove-link",
          "annotation:group",
          "annotation:ungroup"
        ],
        importance: 4
      }, {
        id: "danger",
        items: ["annotation:apply-redaction", "annotation:delete"],
        importance: 5
      }]
    },
    thumbnails: {
      place: { panel: "thumbnails" },
      start: [{
        id: "edit",
        items: [
          "page:insert-blank",
          "page:rotate-counterclockwise",
          "page:rotate-clockwise",
          "page:delete"
        ],
        importance: 4
      }, {
        id: "more",
        items: [
          "page:insert-file",
          "page:duplicate",
          "page:extract"
        ],
        importance: 1
      }],
      end: [Ht]
    },
    outline: {
      place: { panel: "outline" },
      start: [{
        id: "filter",
        items: [{
          custom: "outline-filter",
          variants: ["wide", "narrow"]
        }]
      }],
      end: [{
        id: "items",
        items: [
          "outline:add",
          "outline:expand-all",
          "outline:collapse-all"
        ]
      }]
    },
    attachments: {
      place: { panel: "attachments" },
      start: [{
        id: "count",
        items: [{ custom: "attachments-count" }],
        dependent: !0
      }],
      end: [{
        id: "files",
        items: ["attachment:add"]
      }]
    }
  },
  menus: {
    document: [[
      "document:open",
      "document:download",
      "document:print",
      "tool:snapshot"
    ], ["view:fullscreen"]],
    view: [
      {
        titleKey: "commands.spread.group",
        items: [
          "view:single-page",
          "view:two-pages",
          "view:cover-page"
        ]
      },
      {
        titleKey: "commands.scroll.group",
        items: [
          "view:scroll-vertical",
          "view:scroll-horizontal",
          "view:scroll-paged"
        ]
      },
      {
        titleKey: "commands.rotate.group",
        items: ["view:rotate-clockwise", "view:rotate-counterclockwise"]
      },
      ["view:fullscreen"]
    ],
    zoom: [
      {
        titleKey: "commands.zoom.level",
        items: [
          "zoom:50",
          "zoom:100",
          "zoom:150",
          "zoom:200",
          "zoom:400"
        ]
      },
      [
        "zoom:in",
        "zoom:out",
        "tool:zoom"
      ],
      [
        "zoom:fit-page",
        "zoom:fit-width",
        "zoom:automatic"
      ]
    ],
    "outline-item": [
      ["outline:add", "outline:add-child"],
      [
        "outline:rename",
        "outline:set-destination",
        "outline:properties"
      ],
      ["outline:delete"]
    ],
    "attachment-item": [["attachment:save", "attachment:go-to"], ["attachment:delete"]],
    "comment-item": [{
      titleKey: "comments.status",
      items: [
        "comment:status-accepted",
        "comment:status-rejected",
        "comment:status-cancelled",
        "comment:status-completed",
        "comment:status-none"
      ]
    }, ["comment:delete-thread"]],
    page: [
      ["page:rotate-clockwise", "page:rotate-counterclockwise"],
      [
        "page:insert-blank",
        "page:insert-file",
        "page:duplicate"
      ],
      ["page:extract"],
      ["page:delete"]
    ]
  },
  panels: {
    thumbnails: { side: "start" },
    outline: { side: "start" },
    attachments: { side: "start" },
    search: { side: "end" },
    comments: { side: "end" },
    style: { side: "end" },
    stamps: { side: "end" },
    signatures: { side: "end" },
    redaction: { side: "end" },
    measurement: { side: "end" },
    "form-design": { side: "end" }
  }
}, Ob = ru(Cc), Tb = [
  "iconAccent",
  "allowed",
  "enabled",
  "active",
  "visible",
  "labelParams",
  "run"
], Cb = [["label", "labelKey"], [
  "run",
  "menu",
  "panel",
  "modal"
]];
function Eb(e, t) {
  const n = (a) => typeof a != "string" ? a : Object.prototype.hasOwnProperty.call(t.plugins, a) ? t.plugins[a] ?? null : null, o = ((a) => {
    const s = n(a);
    if (!s) throw new Error(`[embedpdf] the viewer has no plugin named "${String(a)}". Its plugins: ${Object.keys(t.plugins).join(", ")}.`);
    return e.get(s);
  }), r = ((a) => {
    const s = n(a);
    return s ? e.tryGet(s) : null;
  });
  return {
    documentId: e.documentId,
    appState: e.appState,
    ...e.args === void 0 ? {} : { args: e.args },
    ...e.signal ? { signal: e.signal } : {},
    get: o,
    tryGet: r,
    get viewer() {
      const a = t.viewer();
      if (!a) throw new Error("[embedpdf] the viewer is not live yet");
      return a;
    }
  };
}
function Ab(e, t) {
  const n = /* @__PURE__ */ new WeakMap(), o = (a) => {
    let s = n.get(a);
    return s || (s = Eb(a, t), n.set(a, s)), s;
  }, r = { ...e };
  for (const a of Tb) {
    const s = e[a];
    s && (r[a] = (l) => s(o(l)));
  }
  return r;
}
function Nb(e, t) {
  const n = { ...e };
  for (const o of Cb)
    if (o.some((r) => t[r] !== void 0))
      for (const r of o) delete n[r];
  for (const [o, r] of Object.entries(t)) r !== void 0 && (n[o] = r);
  return n;
}
const ss = (e) => e.shortcut === void 0 ? [] : [].concat(e.shortcut), Ib = {
  commands: [],
  isYours: () => !1,
  over: (e) => e
};
function Lb(e, t, n, o) {
  const r = /* @__PURE__ */ new Map();
  for (const c of t) r.set(c.id, Ab(c, n));
  const a = [...r.values()].flatMap(ss), s = (c) => a.some((p) => {
    try {
      return su(p, c, o);
    } catch {
      return !1;
    }
  }), l = (c) => {
    const p = ss(c), f = p.filter((b) => !s(b)), u = f.length === p.length ? c : {
      ...c,
      shortcut: f
    }, m = r.get(c.id);
    return m ? Nb(u, m) : u;
  }, d = new Set(e.map((c) => c.id));
  return {
    commands: [...e.map(l), ...[...r.values()].filter((c) => !d.has(c.id))],
    isYours: (c) => r.has(c) && !d.has(c),
    over: l
  };
}
const et = be({
  icons: {},
  viewerCommands: Ib,
  stamp: {},
  signature: {},
  fonts: [],
  warnBeforeLeaving: !0
}), Rb = et.Provider;
function Db() {
  return X(et).layout;
}
function $b() {
  const { size: e, touch: t } = X(et);
  return {
    size: e,
    touch: t
  };
}
function zb() {
  return X(et).warnBeforeLeaving;
}
function Ec() {
  const { onPanelResize: e } = X(et);
  return (t) => e?.(t);
}
const Ma = {
  size: "expanded",
  width: au,
  touch: !1,
  dir: "ltr"
};
function lo(e, t, n) {
  const o = iu(e, t).map(n).filter((a) => a !== null);
  if (o.length <= 1) return o[0] ?? null;
  const r = {};
  for (const a of [
    "start",
    "center",
    "end"
  ]) {
    const s = o.flatMap((l) => (l.sections[a] ?? []).map((d) => ({
      ...d,
      id: `${l.id}.${d.id}`
    })));
    s.length > 0 && (r[a] = s);
  }
  return {
    id: t,
    sections: r
  };
}
function Fb(e, t) {
  const n = (o) => nl(e, o);
  return {
    data: e,
    env: t,
    bar: n,
    strip: (o) => lo(e, o, n),
    menu: (o) => tl(e, o)
  };
}
const Dn = be(Fb(Cc, Ma)), Bb = Dn.Provider;
function tt() {
  return X(Dn);
}
function dt() {
  return X(Dn).env;
}
function Kb(e) {
  return X(Dn).menu(e);
}
function Pa(e) {
  return X(Dn).strip(e) ?? void 0;
}
function Oa() {
  return X(et).viewerCommands;
}
function Ac() {
  return X(et).icons;
}
function Hb() {
  return X(et).stamp;
}
function G_() {
  return X(et).signature;
}
function jb() {
  return X(et).fonts;
}
const Ub = (e) => Array.isArray(e);
function Gb(e) {
  if (typeof e == "string") return [e];
  if (Ub(e)) return e;
  const t = typeof e.paths == "string" ? [e.paths] : e.paths;
  return e.fill ? t.map((n) => typeof n == "string" ? {
    d: n,
    fill: !0
  } : n) : t;
}
const ls = [{
  d: "M5 4H19M20 5V19M19 20H5M4 19V5",
  stroke: "primary"
}, {
  d: "M3.1 3.1h1.8v1.8H3.1zM19.1 3.1h1.8v1.8h-1.8zM3.1 19.1h1.8v1.8H3.1zM19.1 19.1h1.8v1.8h-1.8z",
  stroke: "primary"
}], Nc = {
  ruler: ["M3 8h18v8H3z", "M7 8v4M11 8v2M15 8v4M19 8v2"],
  distance: [{
    d: "M5 12H19",
    stroke: "primary",
    strokeDasharray: "2 2"
  }, {
    d: "M3.5 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3M20.5 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3",
    stroke: "primary",
    fill: "primary",
    fillOpacity: 0.25
  }],
  perimeter: ls,
  area: [
    {
      d: "M5 4H19V5H20V19H19V20H5V19H4V5H5Z",
      fill: "primary",
      fillOpacity: 0.08
    },
    {
      d: "M4.5 7.5L7.5 4.5M4.5 10.5L10.5 4.5M4.5 13.5L13.5 4.5M4.5 16.5L16.5 4.5M4.5 19.5L19.5 4.5M7.5 19.5L19.5 7.5M10.5 19.5L19.5 10.5M13.5 19.5L19.5 13.5M16.5 19.5L19.5 16.5",
      stroke: "primary",
      strokeWidth: 0.6,
      strokeOpacity: 0.5
    },
    ...ls
  ],
  alertTriangle: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"],
  alignBottom: [
    "M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    "M11 17h2",
    "M9 14h6",
    "M10 11h4"
  ],
  alignCenter: [
    "M4 6l16 0",
    "M8 12l8 0",
    "M6 18l12 0"
  ],
  alignLeft: [
    "M4 6l16 0",
    "M4 12l10 0",
    "M4 18l14 0"
  ],
  alignMiddle: [
    "M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    "M11 15h2",
    "M9 12h6",
    "M10 9h4"
  ],
  alignRight: [
    "M4 6l16 0",
    "M10 12l10 0",
    "M6 18l14 0"
  ],
  alignTop: [
    "M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    "M11 13h2",
    "M9 10h6",
    "M10 7h4"
  ],
  arrowBackUp: ["M9 14l-4 -4l4 -4", "M5 10h11a4 4 0 1 1 0 8h-1"],
  arrowForwardUp: ["M15 14l4 -4l-4 -4", "M19 10h-11a4 4 0 1 0 0 8h1"],
  bold: ["M7 5h6a3.5 3.5 0 0 1 0 7h-6z", "M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7"],
  book: [
    "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
    "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
    "M3 6l0 13",
    "M12 6l0 13",
    "M21 6l0 13"
  ],
  book2: [
    "M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z",
    "M19 16h-12a2 2 0 0 0 -2 2",
    "M9 8h6"
  ],
  calibrate: [
    "M12 12m-7.5 0a7.5 7.5 0 1 0 15 0a7.5 7.5 0 1 0 -15 0",
    "M12 2.75V7M12 17V21.25M2.75 12H7M17 12H21.25",
    "M12 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"
  ],
  callout: [
    {
      d: "M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1",
      stroke: "primary",
      fill: "secondary"
    },
    {
      d: "M17 11v6h-9",
      stroke: "primary"
    },
    {
      d: "M8 15l-2 2l2 2",
      stroke: "primary"
    }
  ],
  check: ["M5 12l5 5l10 -10"],
  chevronDown: ["M6 9l6 6l6 -6"],
  chevronLeft: ["M15 6l-6 6l6 6"],
  chevronRight: ["M9 6l6 6l-6 6"],
  chevronsDown: ["M7 7l5 5l5 -5", "M7 13l5 5l5 -5"],
  chevronsUp: ["M7 11l5 -5l5 5", "M7 17l5 -5l5 5"],
  circle: [{
    d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    stroke: "primary",
    fill: "secondary"
  }],
  circleCheck: ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M9 12l2 2l4 -4"],
  comment: [
    "M12 11v.01",
    "M8 11v.01",
    "M16 11v.01",
    "M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z"
  ],
  copy: ["M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z", "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"],
  deviceFloppy: [
    "M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2",
    "M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M14 4l0 4l-6 0l0 -4"
  ],
  dots: [
    "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
  ],
  doublePage: ["M3 3m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1zm9 -1v18"],
  download: [
    "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2",
    "M7 11l5 5l5 -5",
    "M12 4l0 12"
  ],
  externalLink: [
    "M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6",
    "M11 13l9 -9",
    "M15 4h5v5"
  ],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],
  fileExport: ["M14 3v4a1 1 0 0 0 1 1h4", "M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"],
  fileImport: ["M14 3v4a1 1 0 0 0 1 1h4", "M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3"],
  filePlus: [
    "M14 3v4a1 1 0 0 0 1 1h4",
    "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z",
    "M12 11l0 6",
    "M9 14l6 0"
  ],
  fitToPage: [
    "M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6",
    "M18 14v7",
    "M18 3v7",
    "M15 18l3 3l3 -3",
    "M15 6l3 -3l3 3"
  ],
  fitToWidth: [
    "M4 12v-6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6",
    "M10 18h-7",
    "M21 18h-7",
    "M6 15l-3 3l3 3",
    "M18 15l3 3l-3 3"
  ],
  formButton: ["M3 8a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-8", "M8 12h8"],
  formCheckbox: ["M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14", "M9 12l2 2l4 -4"],
  formDesign: [
    "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2",
    "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2",
    "M9 12l.01 0",
    "M13 12l2 0",
    "M9 16l.01 0",
    "M13 16l2 0"
  ],
  formListbox: [
    "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14",
    "M11 8h6",
    "M11 12h6",
    "M11 16h6",
    "M7 8l0 .01",
    "M7 12l0 .01",
    "M7 16l0 .01"
  ],
  formRadio: [{
    d: "M9 12a2 2 0 1 0 6 0a2 2 0 1 0 -6 0",
    fill: !0
  }, "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"],
  formSelect: ["M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14", "M9 11l3 3l3 -3"],
  formTextfield: [
    "M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3",
    "M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3",
    "M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7",
    "M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1",
    "M17 12h.01",
    "M13 12h.01"
  ],
  freeText: [
    {
      d: "M4 7v-2h12v2",
      stroke: "primary"
    },
    {
      d: "M10 5v14",
      stroke: "primary"
    },
    {
      d: "M12 19h-4",
      stroke: "primary"
    },
    {
      d: "M15 13v-1h6v1",
      stroke: "primary"
    },
    {
      d: "M18 12v7",
      stroke: "primary"
    },
    {
      d: "M17 19h2",
      stroke: "primary"
    }
  ],
  fullscreen: [
    "M4 8v-2a2 2 0 0 1 2 -2h2",
    "M4 16v2a2 2 0 0 0 2 2h2",
    "M16 4h2a2 2 0 0 1 2 2v2",
    "M16 20h2a2 2 0 0 0 2 -2v-2"
  ],
  fullscreenExit: [
    "M4 8v-2c0 -.551 .223 -1.05 .584 -1.412",
    "M4 16v2a2 2 0 0 0 2 2h2",
    "M16 4h2a2 2 0 0 1 2 2v2",
    "M16 20h2c.545 0 1.04 -.218 1.4 -.572",
    "M3 3l18 18"
  ],
  group: [
    "M3 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M17 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M3 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M17 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M5 7v10",
    "M19 7v10",
    "M7 5h10",
    "M7 19h10",
    "M8 8H12.8V11.2H16V16H11.2V12.8H8V8Z"
  ],
  hand: [
    "M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5",
    "M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5",
    "M14 5.5a1.5 1.5 0 0 1 3 0v6.5",
    "M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"
  ],
  highlight: [
    {
      d: "M4 6h16a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2H4a2 2 0 0 1 -2 -2V8a2 2 0 0 1 2 -2z",
      fill: "primary"
    },
    "M8 16v-8a4 4 0 1 1 8 0v8",
    "M8 10h8"
  ],
  horizontal: [
    "M7 8l-4 4l4 4",
    "M17 8l4 4l-4 4",
    "M3 12l18 0"
  ],
  inkHighlighter: [
    "M3 19h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
    "M12.5 5.5l4 4",
    "M4.5 13.5l4 4",
    {
      d: "M21 15v4h-8l4 -4l4 0",
      stroke: "primary",
      fill: "primary"
    }
  ],
  insertText: [
    {
      d: "M3 7v-2h12v2",
      stroke: "primary"
    },
    {
      d: "M9 5v14",
      stroke: "primary"
    },
    {
      d: "M7 19h4",
      stroke: "primary"
    },
    {
      d: "M18 15l2 2h-5",
      stroke: "primary"
    },
    {
      d: "M18 19l2 -2",
      stroke: "primary"
    }
  ],
  italic: [
    "M11 5l6 0",
    "M7 19l6 0",
    "M14 5l-4 14"
  ],
  line: [{
    d: "M20 4l-16 16",
    stroke: "primary"
  }],
  lineArrow: [{
    d: "M20 4l-16 16",
    stroke: "primary"
  }, {
    d: "M16 3h5v5",
    stroke: "primary"
  }],
  link: [
    "M9 15l6 -6",
    "M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464",
    "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
  ],
  linkOff: [
    "M9 15l3 -3m2 -2l1 -1",
    "M11 6l.463 -.536a5 5 0 0 1 7.072 7.071l-.534 .464",
    "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463",
    "M3 3l18 18"
  ],
  listTree: [
    "M9 6h11",
    "M12 12h8",
    "M15 18h5",
    "M5 6v.01",
    "M8 12v.01",
    "M11 18v.01"
  ],
  lock: ["M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2v-7a2 2 0 0 1 2 -2z", "M7 11V7a5 5 0 0 1 10 0v4"],
  marqueeSelect: [
    "M17 20h6",
    "M20 17v6",
    "M4 13v-2",
    "M4 6v-1a1 1 0 0 1 1 -1h1",
    "M6 20h-1a1 1 0 0 1 -1 -1v-1",
    "M11 4h2",
    "M11 20h2",
    "M18 4h1a1 1 0 0 1 1 1v1",
    "M20 11v2"
  ],
  menu: ["M4 8l16 0", "M4 16l16 0"],
  message: [
    "M8 9h8",
    "M8 13h6",
    "M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12"
  ],
  pageByPage: [
    "M8 4m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z",
    "M5 9l-3 3l3 3",
    "M19 9l3 3l-3 3"
  ],
  pageRotateClockwise: [
    "M5 9h7a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-7a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1z",
    "M9 4h5a5 5 0 0 1 5 5v4",
    "M16 10l3 3l3 -3"
  ],
  pageRotateCounterClockwise: [
    "M19 9h-7a1 1 0 0 0 -1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1z",
    "M15 4h-5a5 5 0 0 0 -5 5v4",
    "M8 10l-3 3l-3 -3"
  ],
  palette: [
    "M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25",
    "M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
  ],
  paperclip: ["M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"],
  pencilMarker: ["m9.109 16.275 8.856-8.097c.812-.743.87-2.014.127-2.826s-2.014-.869-2.826-.127L6.41 13.322l-.127 2.826zM13.79 6.575l2.7 2.952", {
    d: "M19.375 20.125c.569.063-4.05-.562-6.412-.437s-4.759 1.229-6.857 1.625c-1.764.687-3.404-.938-1.981-2.5",
    stroke: "primary"
  }],
  photo: [
    "M15 8h.01",
    "M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z",
    "M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5",
    "M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"
  ],
  plus: ["M12 5l0 14", "M5 12l14 0"],
  pointer: ["M7.904 17.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047 -1.047a1.067 1.067 0 0 0 0 -1.509l-4.907 -4.907l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-13.582 -3.904l3.904 13.563z"],
  polygon: [{
    d: "M13.163 2.168l8.021 5.828c.694 .504 .984 1.397 .719 2.212l-3.064 9.43a1.978 1.978 0 0 1 -1.881 1.367h-9.916a1.978 1.978 0 0 1 -1.881 -1.367l-3.064 -9.43a1.978 1.978 0 0 1 .719 -2.212l8.021 -5.828a1.978 1.978 0 0 1 2.326 0z",
    stroke: "primary",
    fill: "secondary"
  }],
  print: [
    "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2",
    "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4",
    "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"
  ],
  redact: [
    "M7 4h10",
    "M12 4v8",
    "M-7 24l12 -12",
    "M-3 24l12 -12",
    "M1 24l12 -12",
    "M5 24l12 -12",
    "M9 24l12 -12",
    "M13 24l12 -12",
    "M17 24l12 -12",
    "M21 24l12 -12",
    "M25 24l12 -12"
  ],
  redactArea: [
    "M6 20h-1a2 2 0 0 1 -2 -2v-1",
    "M3 13v-3",
    "M3 6v-1a2 2 0 0 1 2 -2h1",
    "M10 3h3",
    "M17 3h1a2 2 0 0 1 2 2v1",
    "M12 10h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2z",
    "M10 12l2 -2",
    "M10 16l6 -6",
    "M10 20l10 -10",
    "M12 22l10 -10",
    "M16 22l6 -6",
    "M20 22l2 -2"
  ],
  redactCombined: [
    "M6 20h-1a2 2 0 0 1 -2 -2v-1",
    "M3 13v-3",
    "M20 13v-3",
    "M3 6v-1a2 2 0 0 1 2 -2h1",
    "M10 3h3",
    "M17 3h1a2 2 0 0 1 2 2v1",
    "M8 8h8",
    "M12 8v7",
    "M6 19l12 -12",
    "M6 23l12 -12",
    "M10 23l12 -12",
    "M14 27l12 -12",
    "M14 23l12 -12"
  ],
  redactionSidebar: [
    "M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",
    "M15 4v16",
    "M7 8h5",
    "M7 11h5",
    "M7 14h4"
  ],
  replaceText: [
    {
      d: "M3 7v-2h12v2",
      stroke: "primary"
    },
    {
      d: "M9 5v14",
      stroke: "primary"
    },
    {
      d: "M7 19h4",
      stroke: "primary"
    },
    {
      d: "M20 14l2 2h-3",
      stroke: "primary"
    },
    {
      d: "M20 18l2 -2",
      stroke: "primary"
    },
    {
      d: "M19 16a3 3 0 1 0 2 5.236",
      stroke: "primary"
    }
  ],
  rotateClockwise: ["M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"],
  rotateCounterClockwise: ["M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5"],
  rubberStamp: ["M21 17.85h-18c0 -4.05 1.421 -4.05 3.79 -4.05c5.21 0 1.21 -4.59 1.21 -6.8a4 4 0 1 1 8 0c0 2.21 -4 6.8 1.21 6.8c2.369 0 3.79 0 3.79 4.05", "M5 21h14"],
  rubberStampPlus: [
    "M21 17.85h-18c0 -4.05 1.421 -4.05 3.79 -4.05c5.21 0 1.21 -4.59 1.21 -6.8a4 4 0 0 1 4.9 -4.1",
    "M16 10c0 1.2 -4 3.8 1.21 3.8c2.369 0 3.79 0 3.79 4.05",
    "M5 21h14",
    "M16 5h6",
    "M19 2v6"
  ],
  save: [
    "M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2",
    "M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M14 4l0 4l-6 0l0 -4"
  ],
  screenshot: [
    "M7 19a2 2 0 0 1 -2 -2",
    "M5 13v-2",
    "M5 7a2 2 0 0 1 2 -2",
    "M11 5h2",
    "M17 5a2 2 0 0 1 2 2",
    "M19 11v2",
    "M19 17v4",
    "M21 19h-4",
    "M13 19h-2"
  ],
  search: ["M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", "M21 21l-6 -6"],
  send: ["M10 14l11 -11", "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"],
  settings: ["M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z", "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"],
  sidebar: ["M4 18v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z", "M10 18v-12a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"],
  signature: ["M3 17c3.333 -3.333 5 -6 5 -8c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 4.877 2.5 6c1.5 2 2.5 2.5 3.5 1l2 -3c.333 2.667 1.333 4 3 4c.53 0 2.639 -2 3 -2c.517 0 1.517 .667 3 2"],
  singlePage: ["M5 3m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z"],
  square: [{
    d: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
    stroke: "primary",
    fill: "secondary"
  }],
  squares: ["M8 10a2 2 0 0 1 2 -2h9a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-9a2 2 0 0 1 -2 -2z", "M16 8v-3a2 2 0 0 0 -2 -2h-9a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h3"],
  squiggly: [
    "M8 16v-8a4 4 0 1 1 8 0v8",
    "M8 10h8",
    {
      d: "M4 20c1.5 -1.5 3.5 -1.5 5 0s3.5 1.5 5 0 3.5 -1.5 5 0",
      stroke: "primary"
    }
  ],
  strikethrough: ["M8 16v-8a4 4 0 1 1 8 0v8", {
    d: "M4 10h16",
    stroke: "primary"
  }],
  text: [
    "M6.5 15.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0",
    "M14 19v-10.5a3.5 3.5 0 0 1 7 0v10.5",
    "M14 13h7",
    "M10 12v7"
  ],
  trash: [
    "M4 7l16 0",
    "M10 11l0 6",
    "M14 11l0 6",
    "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",
    "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
  ],
  underline: [
    {
      d: "M4 20h16",
      stroke: "primary"
    },
    "M8 16v-8a4 4 0 1 1 8 0v8",
    "M8 10h8"
  ],
  ungroup: ["M4 5a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1z", "M13 14a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1z"],
  unlock: ["M7 11V7a5 5 0 0 1 9.9-1"],
  updateScale: [
    "M3.5 13.5L18.5 7.5L21.25 14.5L6.25 20.5L3.5 13.5Z",
    "M8 12.8L9 15.2M11.5 11.4L12.2 13.2M15 10L16 12.4",
    "M4 9.39849C4.10585 8.34804 4.487 7.34411 5.10497 6.48809C5.72294 5.63207 6.55584 4.95427 7.51957 4.52312C8.4833 4.09198 9.54373 3.92277 10.5938 4.03257C11.6438 4.14237 12.6463 4.5273 13.5 5.14849M11.5 6.00003L13.5 5.14849L12.7807 2.96999"
  ],
  vertical: [
    "M8 7l4 -4l4 4",
    "M8 17l4 4l4 -4",
    "M12 3l0 18"
  ],
  viewSettings: [
    "M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M12 10.5v1.5",
    "M12 16v1.5",
    "M15.031 12.25l-1.299 .75",
    "M10.268 15l-1.3 .75",
    "M15 15.803l-1.285 -.773",
    "M10.285 12.97l-1.285 -.773",
    "M14 3v4a1 1 0 0 0 1 1h4",
    "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
  ],
  widgetEdit: [
    "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1",
    "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415",
    "M16 5l3 3"
  ],
  x: ["M18 6l-12 12", "M6 6l12 12"],
  zigzag: [{
    d: "M12 2.4L21.36 11.76L2.64 12.24L12 21.6",
    stroke: "primary"
  }],
  zoomIn: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
    "M9 12h6",
    "M12 9v6"
  ],
  zoomInArea: [
    "M15 13v4",
    "M13 15h4",
    "M15 15m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0",
    "M22 22l-3 -3",
    "M6 18h-1a2 2 0 0 1 -2 -2v-1",
    "M3 11v-1",
    "M3 6v-1a2 2 0 0 1 2 -2h1",
    "M10 3h1",
    "M15 3h1a2 2 0 0 1 2 2v1"
  ],
  zoomOut: ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M9 12l6 0"]
}, Ic = Nc, Wb = (e) => Object.prototype.hasOwnProperty.call(Ic, e);
function Lc(e, t) {
  const n = Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
  return n !== void 0 ? Gb(n) : Wb(e) ? Ic[e] : null;
}
const Vb = /* @__PURE__ */ new Set(["chevronLeft", "chevronRight"]), Qt = (e) => Vb.has(e) ? "rtl:-scale-x-100" : "";
function q({ name: e, size: t = 20, strokeWidth: n = 2, className: o, title: r, accent: a }) {
  const s = Lc(e, Ac());
  return s ? /* @__PURE__ */ i("svg", {
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: n,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: o,
    role: "img",
    "aria-hidden": r ? void 0 : !0,
    "aria-label": r,
    children: s.map((l, d) => {
      if (typeof l == "string") return /* @__PURE__ */ i("path", { d: l }, d);
      const c = l.fill === !0 ? "currentColor" : l.fill ? a?.[l.fill] : void 0, p = l.stroke ? a?.[l.stroke] : l.fill ? "none" : void 0;
      return /* @__PURE__ */ i("path", {
        d: l.d,
        fill: c ?? "none",
        stroke: p,
        strokeWidth: l.strokeWidth,
        strokeDasharray: l.strokeDasharray,
        strokeOpacity: l.strokeOpacity,
        fillOpacity: l.fillOpacity
      }, d);
    })
  }) : null;
}
const qb = {
  top: !1,
  right: !1,
  bottom: !1,
  left: !1
}, Zn = 1;
function Rc(e, t) {
  const n = e.right > 0 && e.left < t.width, o = e.bottom > 0 && e.top < t.height;
  return {
    top: n && e.top <= Zn && e.bottom > 0,
    right: o && e.right >= t.width - Zn && e.left < t.width,
    bottom: n && e.bottom >= t.height - Zn && e.top < t.height,
    left: o && e.left <= Zn && e.right > 0
  };
}
const Yb = (e, t) => e.top === t.top && e.right === t.right && e.bottom === t.bottom && e.left === t.left, Xb = {
  top: "paddingTop",
  right: "paddingRight",
  bottom: "paddingBottom",
  left: "paddingLeft"
};
function Dc(e, t = [
  "top",
  "right",
  "bottom",
  "left"
]) {
  const n = {};
  for (const o of t) e[o] && (n[Xb[o]] = `env(safe-area-inset-${o}, 0px)`);
  return n;
}
function $c(e) {
  const { clientWidth: t, clientHeight: n } = e.ownerDocument.documentElement;
  return {
    width: t,
    height: n
  };
}
const Ta = { popover: "manual" }, zc = "text-fg m-0 overflow-clip border-0 bg-transparent", Zb = "data-epdf-focus-root", Rr = (e) => e.getRootNode().fullscreenElement === e;
function Jb(e) {
  for (let t = e; t; ) {
    if (Rr(t)) return !0;
    t = t.parentElement ?? t.getRootNode().host ?? null;
  }
  return !1;
}
function Qb(e, t) {
  e.style.left = `${t.left}px`, e.style.top = `${t.top}px`, e.style.width = `${t.width}px`, e.style.height = `${t.height}px`;
  const n = e.getBoundingClientRect();
  (Math.abs(n.left - t.left) > 0.5 || Math.abs(n.top - t.top) > 0.5) && (e.style.left = `${2 * t.left - n.left}px`, e.style.top = `${2 * t.top - n.top}px`);
}
function Fc(e, t) {
  const n = e.parentElement?.closest("[data-embedpdf-root]") ?? null;
  typeof e.showPopover == "function" && e.showPopover();
  let o = "";
  const r = () => {
    const f = $c(e), u = n?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
      right: f.width,
      bottom: f.height
    }, m = Math.max(0, u.left), b = Math.max(0, u.top), h = {
      left: m,
      top: b,
      width: Math.max(0, Math.min(f.width, u.right) - m),
      height: Math.max(0, Math.min(f.height, u.bottom) - b)
    }, g = `${h.left},${h.top},${h.width},${h.height},${f.width},${f.height}`;
    g !== o && (o = g, Qb(e, h), t?.(Rc(u, f)));
  };
  r();
  const a = new ResizeObserver(r);
  n && a.observe(n);
  const s = Io(r), l = e.ownerDocument, d = () => {
    if (typeof e.showPopover != "function" || !e.matches(":popover-open")) return;
    const f = xn(l);
    e.hidePopover(), e.showPopover(), f && f !== xn(l) && f.focus({ preventScroll: !0 });
  }, c = () => {
    n && Jb(n) && d();
  }, p = (f) => {
    f.newState === "open" && d();
  };
  return l.addEventListener("fullscreenchange", c), n?.addEventListener("toggle", p), () => {
    l.removeEventListener("fullscreenchange", c), n?.removeEventListener("toggle", p), s(), a.disconnect(), typeof e.hidePopover == "function" && e.matches(":popover-open") && e.hidePopover();
  };
}
function Ho(e, t) {
  const n = e.ownerDocument, o = xn(n), r = (l) => {
    l.key !== "Escape" || l.defaultPrevented || (l.preventDefault(), l.stopPropagation(), t.onEscape());
  };
  e.addEventListener("keydown", r);
  let a = null;
  t.trap === !1 ? Kp(e, t.initialFocus) : a = Hp(e, {
    initialFocus: t.initialFocus,
    returnFocus: !1
  });
  const s = () => {
    a?.(), a = null, e.removeEventListener("keydown", r);
  };
  return {
    standDown: s,
    release: () => {
      s();
      const l = xn(n), d = l === null || e.contains(l) || l.hasAttribute("data-epdf-focus-root");
      o?.isConnected && d && o.focus();
    }
  };
}
const Bc = be("top"), $n = Bc.Provider;
function Ca() {
  return X(Bc);
}
function Kc(e, t, n = "start", o = "above") {
  return e === "start" || e === "end" ? `${e === "start" == (t === "ltr") ? "right" : "left"}-${n}` : `${e === "bottom" || e === "float-bottom" || e === "selection" && o === "above" ? "top" : "bottom"}-${n === "start" == (t === "ltr") ? "start" : "end"}`;
}
function Hc(e) {
  return e === "ltr" ? "right-start" : "left-start";
}
function ev(e, t, n = !1, o = "above") {
  return (n ? Hc(t) : Kc(e, t, "start", o)).split("-")[0];
}
function jc(e) {
  return e === "ltr" ? {
    open: "ArrowRight",
    close: "ArrowLeft"
  } : {
    open: "ArrowLeft",
    close: "ArrowRight"
  };
}
const xo = (e) => {
  const t = e.getBoundingClientRect();
  return {
    x: t.left,
    y: t.top,
    width: t.width,
    height: t.height
  };
}, Uc = (e) => e.closest("[data-placement]")?.getAttribute("data-placement")?.startsWith("bottom") ? "below" : "above";
function Gc(e, t, n, o) {
  const r = pl(e, "client");
  if (!r) return;
  const { left: a, top: s } = jp(t, n, o, {
    size: {
      width: e.offsetWidth,
      height: e.offsetHeight
    },
    view: r
  });
  e.style.left = `${a}px`, e.style.top = `${s}px`;
  const l = e.getBoundingClientRect();
  (Math.abs(l.left - a) > 0.5 || Math.abs(l.top - s) > 0.5) && (e.style.left = `${2 * a - l.left}px`, e.style.top = `${2 * s - l.top}px`);
}
let jt = null, cs = Number.NEGATIVE_INFINITY;
const ds = (e) => e.pointerType === "touch";
function tv(e, t, n) {
  let o = null, r = !1, a = !1, s = !1, l = !1, d, c;
  const p = { hide: () => h() }, f = () => {
    clearTimeout(d), clearTimeout(c);
  }, u = () => e.getAttribute("aria-expanded") === "true", m = () => jt !== null || Date.now() - cs < 300, b = (P) => {
    if (f(), !(o === P || o === "pointer")) {
      if (o === null) {
        if (t.canShow && !t.canShow()) return;
        jt !== p && jt?.hide(), jt = p, n.addEventListener("keydown", x, !0);
      }
      o = P, t.show(P);
    }
  }, h = () => {
    f(), o !== null && (o = null, jt === p && (jt = null), cs = Date.now(), n.removeEventListener("keydown", x, !0), t.hide());
  }, g = () => {
    clearTimeout(c), c = setTimeout(h, 100);
  }, y = (P) => {
    ds(P) || (r = !0, clearTimeout(c), !(l || u()) && (o !== null || m() ? b("pointer") : d = setTimeout(() => b("pointer"), 500)));
  }, v = (P) => {
    ds(P) || (r = !1, clearTimeout(d), !s && (l = !1, o !== null && !a && g()));
  }, _ = () => {
    e.matches(":focus-visible") && (s = !0, !l && !u() && b("focus"));
  }, O = () => {
    s = !1, !(r || a) && (l = !1, h());
  }, S = () => {
    l = !0, h();
  }, x = (P) => {
    P.key === "Escape" && (l = !0, h());
  };
  return e.addEventListener("pointerenter", y), e.addEventListener("pointerleave", v), e.addEventListener("focus", _), e.addEventListener("blur", O), e.addEventListener("pointerdown", S), {
    enterTooltip() {
      a = !0, clearTimeout(c);
    },
    leaveTooltip() {
      a = !1, !r && !s && g();
    },
    detach() {
      e.removeEventListener("pointerenter", y), e.removeEventListener("pointerleave", v), e.removeEventListener("focus", _), e.removeEventListener("blur", O), e.removeEventListener("pointerdown", S), h();
    }
  };
}
const nv = 6, ov = '[inert], [aria-hidden="true"]', rv = "bg-tooltip text-tooltip-fg m-0 max-w-64 overflow-visible rounded-sm border border-transparent px-2 py-1 text-start text-xs font-normal leading-4 tracking-normal normal-case whitespace-normal shadow-md transition-opacity duration-100 starting:opacity-0 motion-reduce:transition-none", us = (e) => e.label !== "" && (!e.labelShown || !!e.shortcut || !!e.reason), av = (e) => e !== null && (e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight);
function ve(e, t = {}) {
  const [n, o] = C(null), [r, a] = C(null), s = k(null), l = Ca(), d = Je(), c = t.clipped !== void 0 && e !== null && !us(e), p = e !== null && (us(e) || c && e.label !== ""), f = k(t.clipped);
  f.current = t.clipped, R(() => {
    if (!n || !p || n.closest(ov)) return;
    const b = n.ownerDocument.defaultView ?? n.ownerDocument, h = tv(n, {
      show: a,
      hide: () => a(null),
      canShow: c ? () => av(f.current?.(n) ?? null) : void 0
    }, b);
    return s.current = h, () => {
      s.current = null, h.detach();
    };
  }, [
    n,
    p,
    c
  ]);
  const u = p && e !== null && r !== null && n !== null, m = u && (e.labelShown === !0 || t.clipped !== void 0 || n.getAttribute("aria-label") === e.label);
  return {
    trigger: {
      ref: o,
      "aria-describedby": u && (!m || e.shortcut || e.reason) ? d : void 0
    },
    element: u ? /* @__PURE__ */ i(iv, {
      id: d,
      button: n,
      content: e,
      named: m,
      interactive: r === "pointer",
      placement: () => ev(l, ra(n), t.inMenu === !0, l === "selection" ? Uc(n) : void 0),
      timing: s
    }) : null
  };
}
function jo({ content: e, options: t, children: n }) {
  const o = ve(e, t);
  return /* @__PURE__ */ i(D, { children: [n(o.trigger), o.element] });
}
function Wc({ label: e, reason: t, inMenu: n, ...o }) {
  const r = ve({
    label: e,
    reason: t
  }, { inMenu: n });
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    type: "button",
    "aria-label": e,
    ...o,
    ...r.trigger
  }), r.element] });
}
function iv({ id: e, button: t, content: n, named: o, interactive: r, placement: a, timing: s }) {
  const l = k(null), d = k(a);
  return d.current = a, R(() => {
    const c = l.current;
    if (!c) return;
    typeof c.showPopover == "function" && c.showPopover();
    const p = () => Gc(c, xo(t), d.current(), nv);
    p();
    const f = new ResizeObserver(p);
    f.observe(c), f.observe(t);
    const u = Io(p);
    return () => {
      u(), f.disconnect(), typeof c.hidePopover == "function" && c.matches(":popover-open") && c.hidePopover();
    };
  }, [t]), /* @__PURE__ */ i("div", {
    ref: l,
    ...Ta,
    id: e,
    role: "tooltip",
    part: "tooltip",
    className: `${rv} ${r ? "pointer-events-auto" : "pointer-events-none"}`,
    style: {
      position: "fixed",
      right: "auto",
      bottom: "auto",
      fontFamily: "var(--epdf-font)"
    },
    onPointerEnter: () => s.current?.enterTooltip(),
    onPointerLeave: () => s.current?.leaveTooltip(),
    children: [
      /* @__PURE__ */ i("span", {
        className: "flex items-baseline gap-2",
        children: [
          /* @__PURE__ */ i("span", {
            "aria-hidden": o || void 0,
            children: n.label
          }),
          " ",
          n.shortcut && /* @__PURE__ */ i("kbd", {
            className: "opacity-75 [font-variant-emoji:text]",
            style: { fontFamily: "inherit" },
            children: n.shortcut
          })
        ]
      }),
      " ",
      n.reason && /* @__PURE__ */ i("span", {
        className: "mt-0.5 block opacity-80",
        children: n.reason
      })
    ]
  });
}
const Sn = "embedpdf-standard", sv = "standard";
function lv(e) {
  const t = `${sv}:`;
  return e.startsWith(t) ? `${Sn}:${e.slice(t.length)}` : e;
}
function cv(e) {
  return la(Zf, [e, ...typeof navigator < "u" ? navigator.languages ?? [] : []]) ?? "en";
}
const dv = async (e) => {
  const t = await fetch(e);
  if (!t.ok) throw new Error(`${e}: HTTP ${t.status}`);
  return new Uint8Array(await t.arrayBuffer());
}, uv = (e, t) => t ? dv(t.replace("{locale}", e)) : Jf(e), ps = /* @__PURE__ */ new WeakMap();
function pv(e, t, n) {
  if (n === !1) return Promise.resolve();
  const o = typeof n == "string" ? n : void 0, r = ps.get(e);
  if (r?.locale === t) return r.promise;
  const s = (async () => {
    await r?.promise.catch(() => {
    });
    const l = e.getLibrary(Sn);
    l?.locale !== t && (r && !l || (l && await e.deleteLibrary(Sn), await e.importLibrary(await uv(t, o))));
  })();
  return ps.set(e, {
    locale: t,
    promise: s
  }), s;
}
const ko = typeof indexedDB > "u" ? null : Up("embedpdf-stamps", { storeName: "libraries" }), fs = /* @__PURE__ */ new WeakMap(), Vc = (e) => {
  let t = fs.get(e);
  return t || (t = ko ? Of(e, ko) : Promise.resolve(), fs.set(e, t)), t;
};
function fv() {
  const e = _a();
  return E(() => (Vc(e), ko ? Pf(e, ko, { except: [Sn] }) : void 0), [e]), null;
}
const mv = 0.5;
function hv(e, t, n) {
  if (e.length === 0) return null;
  if (n >= 500) {
    const o = e.filter((r) => r < t - 1);
    return o.length > 0 ? o[o.length - 1] : null;
  }
  return n <= -500 ? e.find((o) => o > t + 1) ?? e[e.length - 1] : t < e[0] / 2 ? null : e.reduce((o, r) => Math.abs(r - t) < Math.abs(o - t) ? r : o);
}
function ms(e) {
  const t = Math.max(0, Math.round(e - 40)), n = Math.min(t, Math.round(e * mv));
  return n < t ? [n, t] : [t];
}
const gv = 'button, a[href], input, select, textarea, [role="tab"], [contenteditable]:not([contenteditable="false"])', Ea = "bg-black/30 transition-opacity duration-200 starting:opacity-0", qc = () => {
}, Yc = be(qc), Xc = Yc.Provider;
function bv() {
  return X(Yc);
}
const vv = (e, t) => e.composedPath().some((n) => n instanceof Element && n !== t && n.matches('[aria-modal="true"]')), wv = (e) => Object.fromEntries(Object.entries(e ?? {}).map(([t, n]) => [`data-${t}`, n])), yv = 8;
function Zc({ label: e, onClose: t, size: n = "content", list: o = !1, trapFocus: r = !0, header: a, width: s, part: l, data: d, children: c }) {
  const p = k(null), f = k(null), u = k(null), m = k(t);
  m.current = t;
  const b = k(0), h = k(null), g = () => n === "panel" ? ms(p.current?.offsetHeight ?? 0) : [u.current?.offsetHeight ?? 0], y = (S, x) => {
    const P = u.current;
    if (!P || x.length === 0) return;
    const M = x[0], T = x[x.length - 1];
    n === "panel" && (P.style.height = `${Math.min(T, Math.max(M, S))}px`);
    const L = Math.max(0, M - S);
    P.style.translate = L > 0 ? `0 ${L}px` : "", f.current && (f.current.style.opacity = L > 0 ? `${Math.max(0, 1 - L / M)}` : "");
  };
  R(() => {
    const S = p.current, x = u.current;
    if (!S || !x) return;
    const P = Fc(S, (L) => {
      const A = Dc(L, [
        "right",
        "bottom",
        "left"
      ]);
      if (x.style.paddingLeft = A.paddingLeft ?? "", x.style.paddingRight = A.paddingRight ?? "", x.style.paddingBottom = A.paddingBottom ?? "", x.style.maxHeight = `${Math.max(0, S.offsetHeight - 40)}px`, n === "panel" && !h.current) {
        const F = ms(S.offsetHeight);
        y(F[Math.min(b.current, F.length - 1)], F);
      }
    }), M = r ? Ho(x, { onEscape: () => m.current() }) : null, T = aa(S, (L) => {
      vv(L, x) || m.current();
    });
    return () => {
      T(), M?.release(), P();
    };
  }, []);
  const v = (S) => {
    if (S.pointerType === "mouse" && S.button !== 0 || S.target.closest(gv)) return;
    const x = u.current;
    if (!x) return;
    S.currentTarget.setPointerCapture(S.pointerId);
    const P = x.offsetHeight;
    h.current = {
      pointerId: S.pointerId,
      startY: S.clientY,
      startHeight: P,
      heights: g(),
      samples: [{
        t: S.timeStamp,
        x: S.clientX,
        y: S.clientY
      }],
      height: P
    }, p.current?.setAttribute("data-dragging", "");
  }, _ = (S) => {
    const x = h.current;
    !x || x.pointerId !== S.pointerId || (x.height = x.startHeight - (S.clientY - x.startY), x.samples.push({
      t: S.timeStamp,
      x: S.clientX,
      y: S.clientY
    }), x.samples.length > yv && x.samples.shift(), y(x.height, x.heights));
  }, O = (S) => {
    const x = h.current;
    if (!x || x.pointerId !== S.pointerId) return;
    h.current = null, p.current?.removeAttribute("data-dragging");
    const P = S.type === "pointercancel", M = P ? 0 : Gp(x.samples, S.timeStamp)?.vy ?? 0, T = P ? x.heights[b.current] : hv(x.heights, x.height, M);
    if (T === null) {
      m.current();
      return;
    }
    b.current = Math.max(0, x.heights.indexOf(T)), y(T, x.heights);
  };
  return /* @__PURE__ */ i("div", {
    ref: p,
    ...Ta,
    "data-epdf-layer": "",
    className: `${zc} p-0 open:flex open:flex-col open:justify-end`,
    style: {
      position: "fixed",
      inset: "auto",
      maxWidth: "none",
      maxHeight: "none"
    },
    children: [/* @__PURE__ */ i("div", {
      ref: f,
      "aria-hidden": "true",
      className: `absolute inset-0 ${Ea} in-data-dragging:transition-none`,
      onClick: () => m.current()
    }), /* @__PURE__ */ i("div", {
      ref: u,
      role: r ? "dialog" : void 0,
      "aria-modal": r ? !0 : void 0,
      "aria-label": r ? e : void 0,
      part: l,
      ...wv(d),
      "data-epdf-sheet": "",
      className: `border-border-subtle bg-elevated starting:translate-y-full in-data-dragging:transition-none relative flex shrink-0 flex-col rounded-t-2xl border-t shadow-2xl transition-[translate,height] duration-200 ease-out motion-reduce:transition-none ${s === void 0 ? "w-full" : "max-w-full self-center border-x"}`,
      style: s === void 0 ? void 0 : { width: s },
      children: [/* @__PURE__ */ i("div", {
        className: "shrink-0 touch-pan-x select-none",
        onPointerDown: v,
        onPointerMove: _,
        onPointerUp: O,
        onPointerCancel: O,
        children: [/* @__PURE__ */ i("div", {
          "data-epdf-sheet-handle": "",
          className: "flex h-6 cursor-grab items-center justify-center active:cursor-grabbing",
          children: /* @__PURE__ */ i("span", { className: "bg-border-strong h-1 w-10 rounded-full" })
        }), a]
      }), /* @__PURE__ */ i("div", {
        className: "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain",
        children: /* @__PURE__ */ i(Xc, {
          value: o ? () => m.current() : qc,
          children: c
        })
      })]
    })]
  });
}
const _v = (e, t) => cu(e, t, Qf), xv = [];
function Aa(e) {
  const t = j(Qr), n = ye(), o = H(() => e ? Jr(e) : null, [e]), r = ie(
    () => o ? lu(o, (a) => t.resolveCommand(a, n ?? void 0)) : xv,
    _v
  );
  return H(
    () => r.length === 0 ? null : {
      groups: r,
      execute: (a) => void t.execute(a, { documentId: n ?? void 0 })
    },
    [r, t, n]
  );
}
function hs({
  k: e,
  orientation: t,
  onLength: n,
  children: o
}) {
  const r = k(null);
  return R(
    () => r.current ? ml(r.current, t, (a) => n(e, a)) : void 0,
    [e, t, n]
  ), /* @__PURE__ */ i("span", { ref: r, style: { display: "inline-flex", flexShrink: 0 }, children: o });
}
function kv({
  name: e,
  k: t,
  orientation: n,
  grow: o,
  onLength: r,
  children: a
}) {
  const s = k(null);
  return R(() => {
    const l = s.current;
    if (!l) return;
    const d = (c) => r(t, c);
    return o ? Yp(l, n, d) : ml(l, n, d);
  }, [t, n, o, r]), /* @__PURE__ */ i(
    "slot",
    {
      ref: s,
      name: e,
      style: {
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        flexGrow: o ? 1 : 0
      },
      children: a
    }
  );
}
const Sv = (e) => ({
  position: "absolute",
  left: 0,
  top: 0,
  height: 0,
  overflow: "hidden",
  visibility: "hidden",
  pointerEvents: "none",
  display: "flex",
  whiteSpace: "nowrap",
  ...e === "vertical" ? { flexDirection: "column", alignItems: "flex-start" } : null
}), gs = { [fl]: "" }, Mv = { display: "contents" }, Pv = (e) => ({
  display: "flex",
  flexDirection: e === "vertical" ? "column" : "row",
  alignItems: "center",
  flex: "1 0 auto"
}), Jc = On("toolbar-surface"), en = On("toolbar-border"), Na = On("toolbar-active"), Ov = (e, t, n) => /* @__PURE__ */ i(
  "button",
  {
    type: "button",
    onClick: n,
    disabled: !e.enabled,
    "aria-pressed": e.pressable ? e.active : void 0,
    "aria-haspopup": e.menu ? "menu" : void 0,
    "aria-expanded": e.menu ? e.active : void 0,
    title: e.label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "4px 8px",
      whiteSpace: "nowrap",
      color: "inherit",
      font: "inherit",
      background: e.active ? Na : "transparent",
      border: `1px solid ${en}`,
      borderRadius: 4,
      cursor: e.enabled ? "pointer" : "default",
      opacity: e.enabled ? 1 : 0.4
    },
    children: e.label
  }
);
function Tv({ orientation: e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      style: { ...e === "vertical" ? { height: 1 } : { width: 1 }, alignSelf: "stretch", background: "currentColor", opacity: 0.2 }
    }
  );
}
const Qc = (e, t) => /* @__PURE__ */ i(
  "button",
  {
    type: "button",
    onClick: t,
    "aria-haspopup": "menu",
    "aria-expanded": e,
    title: "More",
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 8px",
      color: "inherit",
      font: "inherit",
      border: `1px solid ${en}`,
      borderRadius: 4,
      background: e ? Na : "transparent",
      cursor: "pointer"
    },
    children: "⋯"
  }
), Cv = (e) => e === "vertical" ? { top: 0, insetInlineStart: "100%" } : { top: "100%", insetInlineEnd: 0 };
function Ia({
  view: e,
  orientation: t
}) {
  const n = k(null), o = k(e.close);
  return o.current = e.close, R(() => {
    const r = n.current;
    if (!e.isOpen || !r) return;
    const a = r.parentElement ?? r, s = qp(a).find((c) => !r.contains(c)) ?? null, l = aa(a, () => o.current()), d = ia(r, { trigger: s, close: () => o.current() });
    return () => {
      l(), d();
    };
  }, [e.isOpen]), e.isOpen ? /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      role: "menu",
      style: {
        position: "absolute",
        ...Cv(t),
        zIndex: 41,
        minWidth: 200,
        padding: 4,
        background: Jc,
        border: `1px solid ${en}`,
        borderRadius: 6,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
      },
      children: e.sections.map((r, a) => /* @__PURE__ */ i(D, { children: [
        a > 0 && /* @__PURE__ */ i("div", { style: { height: 1, background: en, margin: "4px 0" } }),
        r.rows.map((s) => {
          const l = e.resolve(s.command);
          if (!l) return null;
          const d = s.kind === "submenu";
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              role: r.role === "radio" ? "menuitemradio" : "menuitem",
              "aria-checked": r.role === "radio" ? l.active : void 0,
              disabled: !l.enabled,
              tabIndex: -1,
              onClick: () => {
                e.execute(s.command), d || e.close();
              },
              style: {
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "6px 8px",
                border: "none",
                color: "inherit",
                font: "inherit",
                background: "transparent",
                cursor: l.enabled ? "pointer" : "default",
                opacity: l.enabled ? 1 : 0.4,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ i("span", { children: [
                  l.active && r.role === "radio" ? "• " : "",
                  l.label
                ] }),
                d ? /* @__PURE__ */ i("span", { children: "▸" }) : null
              ]
            },
            s.command
          );
        })
      ] }, a))
    }
  ) : null;
}
function Ev({
  view: e,
  orientation: t
}) {
  if (e.collapse === "select") {
    const n = e.commands.find((o) => o.active);
    return /* @__PURE__ */ i(
      "select",
      {
        value: n?.id ?? "",
        onChange: (o) => e.execute(o.target.value),
        style: {
          padding: "4px 6px",
          font: "inherit",
          borderRadius: 4,
          border: `1px solid ${en}`,
          background: Jc
        },
        children: e.commands.map((o) => /* @__PURE__ */ i("option", { value: o.id, disabled: !o.enabled, children: o.label }, o.id))
      }
    );
  }
  return /* @__PURE__ */ i(Av, { view: e, orientation: t });
}
function Av({
  view: e,
  orientation: t
}) {
  const [n, o] = C(!1);
  return /* @__PURE__ */ i("span", { style: { position: "relative", display: "inline-flex" }, children: [
    Qc(n, () => o((r) => !r)),
    /* @__PURE__ */ i(
      Ia,
      {
        view: Pn(e, n, () => o(!1)),
        orientation: t
      }
    )
  ] });
}
function Nv({
  view: e,
  orientation: t
}) {
  const [n, o] = C(!1), r = e.commands.some((a) => a.active);
  return /* @__PURE__ */ i("span", { style: { position: "relative", display: "inline-flex" }, children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => o((a) => !a),
        "aria-haspopup": "menu",
        "aria-expanded": n,
        title: "More",
        style: {
          display: "inline-flex",
          alignItems: "center",
          padding: "4px 6px",
          color: "inherit",
          font: "inherit",
          border: `1px solid ${en}`,
          borderRadius: 4,
          // A hint that the active item is in here.
          background: n || r ? Na : "transparent",
          cursor: "pointer"
        },
        children: "▾"
      }
    ),
    /* @__PURE__ */ i(
      Ia,
      {
        view: Pn(e, n, () => o(!1)),
        orientation: t
      }
    )
  ] });
}
function Iv({
  bar: e,
  orientation: t = "horizontal",
  gap: n = 8,
  separatorWidth: o = 1,
  "aria-label": r,
  className: a,
  style: s,
  renderCommand: l = Ov,
  renderCustom: d,
  renderCollapsed: c,
  renderGroupTrigger: p,
  renderSeparator: f,
  renderOverflowTrigger: u = Qc,
  renderOverflowMenu: m
}) {
  const b = ct(), h = j(Qr), g = ye(), y = t === "vertical", [, v] = St((N) => N + 1, 0);
  E(() => b.subscribe(v), [b]);
  const _ = k(null), [O, S] = C(0);
  R(
    () => _.current ? Wp(_.current, t, S) : void 0,
    [t]
  );
  const [x] = C(Xp), [, P] = St((N) => N + 1, 0), M = H(
    () => (N, ee) => {
      x.report(t, N, ee) && P();
    },
    [x, t]
  ), T = k(null);
  R(() => {
    const N = _.current;
    if (!N) return;
    const ee = Vp(N, t);
    return T.current = ee, () => {
      ee.detach(), T.current = null;
    };
  }, [t]), R(() => T.current?.refresh());
  const L = (N) => h.resolveCommand(N, g ?? void 0), A = (N) => void h.execute(N, { documentId: g ?? void 0 }), F = H(() => Jr(e), [e]), ce = du({
    bar: F,
    resolve: L,
    unregistered: em,
    execute: A,
    menuTarget: (N) => h.getMenuTarget(N),
    metrics: x.metrics(t, n, o),
    measureKey: ii,
    containerLength: O,
    orientation: t
  }), [te, se] = C(!1);
  E(() => {
    ce.hasOverflow || se(!1);
  }, [ce.hasOverflow]);
  const nt = (N) => N.kind === "custom" && !d?.[N.name], ot = (N, ee) => {
    switch (N.kind) {
      case "command":
        return l(N.command, N.variant, N.run);
      case "custom": {
        const _e = () => N.terminal ? l(N.terminal, "icon", N.runTerminal) : null, Me = d?.[N.name];
        if (Me) {
          const ze = Me(N.variant, {
            layer: ee,
            measure: (ut) => M(N.measureKey, ut)
          });
          return ze === void 0 ? _e() : ze;
        }
        return ee === "measure" ? null : /* @__PURE__ */ i(
          kv,
          {
            name: N.name,
            k: N.measureKey,
            orientation: t,
            grow: N.grow,
            onLength: M,
            children: _e()
          }
        );
      }
      case "collapsed": {
        const _e = c?.(N.view);
        return _e === void 0 ? /* @__PURE__ */ i(Ev, { view: N.view, orientation: t }) : _e;
      }
      case "disclosure": {
        const _e = p?.(N.view);
        return _e === void 0 ? /* @__PURE__ */ i(Nv, { view: N.view, orientation: t }) : _e;
      }
    }
  }, Mt = (N) => N.groups.map((ee, _e) => /* @__PURE__ */ i(D, { children: [
    _e > 0 && (f ? f() : /* @__PURE__ */ i(Tv, { orientation: t })),
    ee.parts.map((Me) => /* @__PURE__ */ i(
      "span",
      {
        ...gs,
        style: Me.kind === "custom" && Me.grow ? Pv(t) : Mv,
        children: ot(Me, "live")
      },
      Me.key
    ))
  ] }, ee.id)), Ft = (N) => ({
    display: "flex",
    flexDirection: y ? "column" : "row",
    alignItems: "center",
    gap: n,
    flex: N.grows ? "1 0 auto" : "0 0 auto",
    ...N.spacing === "balance" ? y ? { marginTop: "auto", marginBottom: "auto" } : { marginLeft: "auto", marginRight: "auto" } : N.spacing === "gap" ? y ? { marginTop: n } : { marginInlineStart: n } : null
  }), Ke = {
    sections: ce.overflow,
    isOpen: te,
    close: () => se(!1),
    resolve: L,
    execute: A
  };
  return /* @__PURE__ */ i(
    "div",
    {
      ref: _,
      role: "toolbar",
      "aria-orientation": t,
      "aria-label": r,
      className: a,
      style: {
        position: "relative",
        display: "flex",
        flexDirection: y ? "column" : "row",
        alignItems: "center",
        ...s
      },
      children: [
        ce.sections.map((N) => /* @__PURE__ */ i("div", { style: Ft(N), children: [
          Mt(N),
          N.name === "end" && ce.hasOverflow && /* @__PURE__ */ i("span", { ...gs, style: { position: "relative", display: "inline-flex" }, children: [
            u(te, () => se((ee) => !ee)),
            m ? m(Ke) : /* @__PURE__ */ i(Ia, { view: Ke, orientation: t })
          ] })
        ] }, N.name)),
        /* @__PURE__ */ i("div", { "aria-hidden": !0, ...uc, style: Sv(t), children: [
          ce.measured.filter((N) => !nt(N)).map((N) => {
            const ee = ot(N, "measure");
            return N.kind === "custom" && ee === null ? null : /* @__PURE__ */ i(
              hs,
              {
                k: N.measureKey,
                orientation: t,
                onLength: M,
                children: ee
              },
              N.measureKey
            );
          }),
          /* @__PURE__ */ i(
            hs,
            {
              k: ii.overflowTrigger,
              orientation: t,
              onLength: M,
              children: u(!1, () => {
              })
            }
          )
        ] })
      ]
    }
  );
}
const Lv = {
  annotations: [
    "highlight",
    "markup",
    "drawing",
    "text",
    "notes",
    "links"
  ],
  shapes: [],
  stamps: [],
  comments: ["writing"],
  forms: ["filling", "building"],
  signatures: ["signing", "checking"],
  redaction: [],
  measurement: [],
  pages: [],
  attachments: ["adding"],
  text: ["selection", "copy"],
  snapshots: [],
  search: [],
  thumbnails: [],
  outline: ["editing"],
  documents: [
    "open",
    "download",
    "print",
    "tabs"
  ]
}, ed = [
  "annotations",
  "shapes",
  "stamps",
  "comments.writing",
  "forms",
  "signatures.signing",
  "redaction",
  "measurement",
  "pages",
  "attachments.adding",
  "outline.editing"
], Dr = (e, t) => e === t || e.startsWith(`${t}.`), Rv = (e) => ed.every(e), Dv = {
  "annotations.highlight": ["highlight"],
  "annotations.markup": [
    "underline",
    "strikeout",
    "squiggly"
  ],
  "annotations.drawing": ["ink"],
  "annotations.text": ["free-text", "caret"],
  "annotations.notes": ["text"],
  "annotations.links": ["link"],
  shapes: [
    "square",
    "circle",
    "line",
    "polygon",
    "polyline"
  ],
  stamps: ["stamp"],
  redaction: ["redact"],
  measurement: [
    "line-dimension",
    "polyline-dimension",
    "polygon-dimension"
  ],
  "attachments.adding": ["file-attachment"],
  "forms.building": ["widget"]
}, $v = {
  "forms.filling": [
    "text",
    "checkbox",
    "radio",
    "combobox",
    "listbox",
    "pushbutton"
  ],
  "signatures.signing": ["signature"]
};
function bs(e, t) {
  const n = Object.keys(e), o = n.filter((r) => !t.some((a) => Dr(r, a)));
  return o.length === n.length ? !0 : o.length === 0 ? !1 : o.flatMap((r) => e[r]);
}
const zv = (e) => Lv[e] ?? [];
function Fv(e) {
  if (!e) return [];
  const t = e === !0 ? [] : e.except, n = [], o = (r) => {
    if (t.some((s) => Dr(r, s))) return;
    const a = zv(r);
    if (a.length === 0 || !t.some((s) => Dr(s, r))) {
      n.push(r);
      return;
    }
    for (const s of a) o(`${r}.${s}`);
  };
  for (const r of ed) o(r);
  return n;
}
function td(e, t) {
  const n = (e ?? []).filter((o) => !o.includes(":"));
  return [.../* @__PURE__ */ new Set([...n, ...Fv(t)])];
}
function Bv(e, t) {
  const n = new Set((e ?? []).filter((o) => o.includes(":")));
  return {
    disabledCategories: td(e, t),
    disabledCommands: [...n]
  };
}
function Kv(e, t) {
  const n = td(e, t);
  return {
    editable: bs(Dv, n),
    fillable: bs($v, n)
  };
}
function vs(e, t) {
  return e === !0 ? t : t === !0 ? e : e === !1 || t === !1 ? !1 : e.filter((n) => t.includes(n));
}
const ws = (e, t) => typeof e == "boolean" || typeof t == "boolean" ? e === t : e.length === t.length && e.every((n, o) => n === t[o]);
function Hv() {
  const e = Z(), t = kg(W(lt, (r) => r.getCurrentPage())), n = Qe("measurement"), o = ve({ label: e("measurement.title") });
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...o.trigger,
    type: "button",
    part: Se(n.isOpen),
    className: Re(n.isOpen),
    "aria-pressed": n.isOpen,
    onClick: () => n.toggle(),
    children: /* @__PURE__ */ i("span", {
      className: "flex items-center whitespace-nowrap text-sm",
      children: [/* @__PURE__ */ i(q, {
        name: "updateScale",
        size: 20,
        className: "me-1.5 shrink-0"
      }), /* @__PURE__ */ i("span", { children: [
        e("measurement.scale"),
        ":",
        " ",
        t?.measure?.subtype === "rectilinear" ? t.measure.ratio ?? e("measurement.custom") : e("measurement.unavailable")
      ] })]
    })
  }), o.element] });
}
function jv() {
  const e = Z(), { files: t } = sc();
  return /* @__PURE__ */ i("span", {
    className: "text-fg-muted whitespace-nowrap text-xs",
    children: e("attachments.count", { params: { count: t.length } })
  });
}
const La = be(null);
function Uv({ children: e }) {
  const t = ye() ?? "", [n, o] = C(() => /* @__PURE__ */ new Map()), r = Ve((l) => o((d) => new Map(d).set(t, l)), [t]), a = n.get(t) ?? "", s = H(() => [a, r], [a, r]);
  return /* @__PURE__ */ i(La.Provider, {
    value: s,
    children: e
  });
}
const Gv = ["", () => {
}];
function W_() {
  return X(La) ?? Gv;
}
function Wv({ variant: e }) {
  const t = Z(), n = X(La);
  if (!n) return null;
  const [o, r] = n;
  return /* @__PURE__ */ i("div", {
    className: `relative ${e === "narrow" ? "w-24" : "w-36"}`,
    children: [/* @__PURE__ */ i("div", {
      className: "text-fg-muted pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2",
      children: /* @__PURE__ */ i(q, {
        name: "search",
        size: 14
      })
    }), /* @__PURE__ */ i("input", {
      type: "search",
      value: o,
      placeholder: t("outline.filter"),
      "aria-label": t("outline.filter"),
      onChange: (a) => r(a.target.value),
      className: "border-border bg-surface text-fg focus:border-accent focus:ring-accent w-full rounded-md border py-1 pe-2 ps-7 text-sm outline-none focus:ring-1"
    })]
  });
}
function Vv(e) {
  const t = e.listCurrentPages().map((n) => n.index + 1);
  return t.length ? {
    first: Math.min(...t),
    last: Math.max(...t)
  } : null;
}
const qv = (e, t) => e?.first === t?.first && e?.last === t?.last;
function Yv() {
  const e = Z(), t = Q(lt), n = Jt((O) => O.currentPageIndex + 1), o = Jt((O) => O.pageCount), r = oe(lt, Vv, null, qv), a = r !== null && r.last > r.first, s = a ? r.first : n, [l, d] = C(null), c = k(null), p = k(null), f = k(!1), u = l !== null, m = ve({ label: e("pageNumber.goToPage") }), b = m.trigger.ref, h = Ve((O) => {
    p.current = O, b(O);
  }, [b]);
  if (R(() => {
    u ? (c.current?.focus(), c.current?.select()) : f.current && (f.current = !1, p.current?.focus());
  }, [u]), o <= 1) return null;
  const g = () => {
    f.current = !0, d(null);
  }, y = () => {
    const O = Number.parseInt(l ?? "", 10);
    Number.isFinite(O) && t?.goToPage(Math.min(Math.max(O, 1), o) - 1), g();
  }, [v, _ = ""] = (a ? e("pageNumber.pages", { params: {
    first: "",
    last: r.last,
    total: o
  } }) : e("pageNumber.page", { params: {
    current: "",
    total: o
  } })).split("");
  return /* @__PURE__ */ i("span", {
    className: "text-fg-secondary flex whitespace-nowrap text-sm",
    children: u ? /* @__PURE__ */ i("span", {
      className: "block h-8 px-2 leading-8",
      children: [
        v,
        /* @__PURE__ */ i("input", {
          ref: c,
          type: "text",
          inputMode: "numeric",
          "aria-label": e("pageNumber.goToPage"),
          value: l,
          onChange: (O) => d(O.target.value.replace(/[^0-9]/g, "")),
          onKeyDown: (O) => {
            O.key === "Enter" ? (O.preventDefault(), y()) : O.key === "Escape" && (O.preventDefault(), g());
          },
          onBlur: () => d(null),
          style: { width: `${String(o).length + 1}ch` },
          className: "bg-hover ring-accent text-fg rounded text-center tabular-nums outline-none ring-1"
        }),
        _
      ]
    }) : /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
      ...m.trigger,
      ref: h,
      type: "button",
      onClick: () => d(String(s)),
      className: "hover:bg-hover hover:text-fg block h-8 cursor-pointer rounded-md px-2 tabular-nums leading-8",
      children: [
        v,
        s,
        _
      ]
    }), m.element] })
  });
}
function Xv() {
  const e = Z(), t = _a(), { standard: n, quick: o } = Hb(), { locale: r } = vc(), a = gc(), s = ye(), l = oe(Cn, (u) => u.getActiveToolId(), null), d = wg((u) => u.armedAsset?.id ?? null), c = (o ?? []).map(lv), p = c.some((u) => u.startsWith(`${Sn}:`));
  E(() => {
    p && Vc(t).then(() => pv(t, cv(r), n)).catch((u) => console.error("[embedpdf] quick stamps failed:", u));
  }, [
    t,
    r,
    p
  ]);
  const f = c.map((u) => a.find((m) => m.id === u)).filter((u) => !!u);
  return f.length === 0 || !s ? null : /* @__PURE__ */ i("div", {
    className: "flex items-center gap-1",
    role: "group",
    "aria-label": e("demo.quickStampsLabel"),
    children: f.map((u) => /* @__PURE__ */ i(Zv, {
      asset: u,
      active: l === "stamp" && d === u.id,
      onArm: () => void t.armAsset(u.id).catch((m) => console.error("[embedpdf] arm failed", m))
    }, u.id))
  });
}
function Zv({ asset: e, active: t, onArm: n }) {
  const o = _g(e.id), r = ve({
    label: e.label,
    labelShown: !o
  });
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...r.trigger,
    type: "button",
    onClick: n,
    "aria-label": e.label,
    "aria-pressed": t,
    part: Se(t),
    className: Re(t, !0),
    children: o ? /* @__PURE__ */ i("img", {
      src: o,
      alt: "",
      className: "h-5 w-5 object-contain",
      draggable: !1
    }) : /* @__PURE__ */ i("span", {
      className: "text-xs",
      children: e.label
    })
  }), r.element] });
}
function Jv(e) {
  return e.canCreate() ? !0 : e.list().some(({ ref: t }) => e.canUpdate(t) || e.canDelete(t));
}
function Qv(e, t) {
  return e.canDesign() ? !0 : e.list().some((n) => n.kind === "signature" ? t?.canSign(n.ref) ?? !1 : e.canFill(n.ref));
}
function e0() {
  const e = Q(we) !== null, t = Q(on), n = oe(we, Jv, !1), o = oe(nn, (s) => Qv(s, t), !1), r = oe(Do, (s) => s.canEdit(), !1), a = oe(gt, (s) => s.canApply(), !1);
  return e && !n && !o && !r && !a;
}
function t0({ compact: e = !1 }) {
  const t = Z(), n = ke();
  Bg((a) => a.disabledCategories);
  const o = Rv((a) => n.isCategoryDisabled(a)), r = e0();
  return !o && !r ? null : /* @__PURE__ */ i(jo, {
    content: { label: t(o ? "viewOnly.turnedOff" : "viewOnly.notAllowed") },
    children: (a) => /* @__PURE__ */ i("span", {
      ...a,
      className: "bg-hover text-fg-secondary flex h-7 shrink-0 select-none items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-medium",
      children: [/* @__PURE__ */ i(q, {
        name: "eye",
        size: 16,
        className: "shrink-0"
      }), /* @__PURE__ */ i("span", {
        className: e ? "sr-only" : void 0,
        children: t("viewOnly.label")
      })]
    })
  });
}
const n0 = {
  orientation: "data-orientation",
  edge: "data-edge",
  variant: "data-variant",
  size: "data-size"
}, o0 = (e) => e === "float-top" || e === "float-bottom" ? "float" : e;
function r0(e, t) {
  for (const [n, o] of Object.entries(n0)) {
    const r = t[n];
    r === null ? e.removeAttribute(o) : e.getAttribute(o) !== r && e.setAttribute(o, r);
  }
}
const a0 = (e) => e.parentElement ?? e.getRootNode().host ?? null;
function nd() {
  const e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new Set();
  let n = 0;
  return {
    set(o, r) {
      if (e.get(o) !== r) {
        e.set(o, r), n += 1;
        for (const a of [...t]) a();
      }
    },
    edgeOf(o) {
      for (let r = o; r; r = a0(r)) {
        const a = e.get(r);
        if (a) return a;
      }
      return "top";
    },
    subscribe(o) {
      return t.add(o), () => {
        t.delete(o);
      };
    },
    version: () => n
  };
}
const od = be(nd()), i0 = od.Provider;
function rd() {
  return X(od);
}
const ad = {
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0
}, s0 = {
  ...ad,
  flexGrow: 1
};
function l0({ id: e, variant: t, orientation: n, grow: o = !1, measure: r, children: a }) {
  const s = k(null), l = Ca(), { size: d } = dt(), c = rd(), p = k(r);
  p.current = r;
  const f = k(null), u = t !== null;
  return R(() => {
    const m = s.current;
    if (!m) return;
    const b = n === "vertical" ? "height" : "width", h = () => p.current(o ? Zp(m, n) : m.getBoundingClientRect()[b]);
    u || h();
    const g = new ResizeObserver(h);
    return g.observe(m), f.current = g, () => {
      g.disconnect(), f.current = null;
    };
  }, [
    n,
    u,
    o
  ]), R(() => {
    const m = s.current, b = f.current;
    !m || !b || (b.unobserve(m), b.observe(m));
  }, [t]), R(() => {
    const m = s.current;
    if (!m) return;
    const b = {
      orientation: n,
      edge: o0(l),
      variant: t,
      size: d
    }, h = () => {
      for (const g of m.assignedElements())
        r0(g, b), c.set(g, l);
    };
    return h(), m.addEventListener("slotchange", h), () => m.removeEventListener("slotchange", h);
  }, [
    n,
    l,
    t,
    d,
    c
  ]), /* @__PURE__ */ i("slot", {
    ref: s,
    name: `item:${e}`,
    style: o ? s0 : ad,
    children: a
  });
}
const id = 4, c0 = { popover: "manual" }, d0 = '[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]', sd = '[inert], [aria-hidden="true"]', $r = be(!1), wn = (e) => [...e.querySelectorAll(d0)].filter((t) => t.closest('[role="menu"]') === e), ld = (e) => e?.getAttribute("aria-label") || e?.textContent?.trim() || void 0, cd = (e, t) => [...e.querySelectorAll("[aria-haspopup]")].find((n) => !t.contains(n)) ?? null;
function u0(e, t) {
  const n = xo(e), o = e.closest('[role="menu"]'), r = o ? xo(o) : n, a = t.clientTop + parseFloat(getComputedStyle(t).paddingTop || "0");
  return {
    x: r.x,
    y: n.y - a,
    width: r.width,
    height: n.height
  };
}
function p0(e, t, n, o) {
  const r = pl(e, "client");
  r && (e.style.maxHeight = `${Math.max(0, r.height - 2 * id)}px`, Gc(e, t, n, o));
}
function f0(e, t, n) {
  const { nested: o, close: r } = n, a = cd(t, e), s = ra(t), l = n.placement(s), d = ld(a);
  d && e.setAttribute("aria-label", d), typeof e.showPopover == "function" && e.showPopover();
  const c = () => p0(e, o ? u0(t, e) : xo(t), l, o ? 0 : id);
  c();
  const p = new ResizeObserver(c);
  p.observe(e), p.observe(t);
  const f = Io(c), u = aa(e, (g) => {
    (!a || !g.composedPath().includes(a)) && r();
  }), m = ia(e, {
    trigger: a,
    close: r,
    items: () => wn(e)
  }), b = jc(s), h = (g) => {
    const y = g.target, v = !g.defaultPrevented, _ = y.getAttribute("aria-haspopup") === "menu";
    if (v && g.key === b.open && _ && wn(e).includes(y))
      if (g.preventDefault(), y.getAttribute("aria-expanded") !== "true") y.click();
      else {
        const O = y.parentElement?.querySelector('[role="menu"]');
        O && wn(O)[0]?.focus();
      }
    else v && g.key === b.close && o && (g.preventDefault(), r(), a?.focus());
    o && g.key !== "Tab" && g.stopPropagation();
  };
  return e.addEventListener("keydown", h), () => {
    e.removeEventListener("keydown", h), m(), u(), f(), p.disconnect(), typeof e.hidePopover == "function" && e.matches(":popover-open") && e.hidePopover();
  };
}
function zn(e) {
  const t = k(null), [n, o] = C(!1), r = dt().size === "compact";
  return R(() => {
    const a = t.current?.parentElement;
    a && !a.closest(sd) && o(!0);
  }, []), n ? r ? /* @__PURE__ */ i(g0, { ...e }) : /* @__PURE__ */ i(m0, { ...e }) : /* @__PURE__ */ i("span", {
    ref: t,
    hidden: !0
  });
}
function m0({ children: e, onClose: t, align: n = "start" }) {
  const o = k(null), r = Ca(), a = X($r), s = k(t);
  return s.current = t, R(() => {
    const l = o.current, d = l?.parentElement;
    if (!(!l || !d))
      return f0(l, d, {
        placement: (c) => a ? Hc(c) : Kc(r, c, n, r === "selection" ? Uc(d) : void 0),
        nested: a,
        close: () => s.current()
      });
  }, []), /* @__PURE__ */ i("div", {
    ref: o,
    ...c0,
    role: "menu",
    part: "menu",
    className: "border-border-subtle bg-elevated text-fg z-50 overflow-y-auto rounded-lg border shadow-xl",
    style: {
      position: "fixed",
      right: "auto",
      bottom: "auto",
      margin: 0
    },
    children: /* @__PURE__ */ i($r.Provider, {
      value: !0,
      children: e
    })
  });
}
const dd = be(null);
function h0(e) {
  const t = e.closest("[data-epdf-layer]"), n = t?.parentElement;
  return t && n ? cd(n, t) : null;
}
function g0({ children: e, onClose: t }) {
  const [n, o] = C([]), r = k(n);
  r.current = n;
  const a = k(null), s = k(t);
  s.current = t;
  const l = (c) => o([...r.current, c]), d = () => {
    const c = r.current;
    c.length !== 0 && (a.current = c[c.length - 1].opener, o(c.slice(0, -1)));
  };
  return R(() => {
    a.current?.focus(), a.current = null;
  }, [n]), /* @__PURE__ */ i(Zc, {
    label: "",
    onClose: t,
    trapFocus: !1,
    children: /* @__PURE__ */ i(dd.Provider, {
      value: l,
      children: /* @__PURE__ */ i("div", {
        className: "grid",
        children: [/* @__PURE__ */ i(ys, {
          covered: n.length > 0,
          close: () => s.current(),
          children: e
        }), n.map((c, p) => /* @__PURE__ */ i(ys, {
          covered: p < n.length - 1,
          close: d,
          opener: c.opener,
          label: c.label,
          onBack: d,
          children: /* @__PURE__ */ i(Da, {
            menuId: c.menuId,
            onRun: c.onRun
          })
        }, p))]
      })
    })
  });
}
function ys({ covered: e, close: t, opener: n, label: o, onBack: r, children: a }) {
  const s = Z(), l = k(null), d = k({
    close: t,
    onBack: r
  });
  return d.current = {
    close: t,
    onBack: r
  }, R(() => {
    const c = l.current;
    if (!c) return;
    const p = n ?? h0(c), f = o ?? ld(p);
    f && c.setAttribute("aria-label", f);
    const u = ia(c, {
      trigger: p,
      close: () => d.current.close(),
      items: () => wn(c),
      initialFocus: "none"
    });
    queueMicrotask(() => {
      c.isConnected && !c.inert && wn(c).find((h) => !Jp(h))?.focus();
    });
    const m = jc(ra(c)), b = (h) => {
      if (h.defaultPrevented) return;
      const g = h.target;
      h.key === m.open && g.getAttribute("aria-haspopup") === "menu" ? (h.preventDefault(), g.click()) : h.key === m.close && d.current.onBack && (h.preventDefault(), d.current.onBack());
    };
    return c.addEventListener("keydown", b), () => {
      c.removeEventListener("keydown", b), u();
    };
  }, []), R(() => {
    l.current && (l.current.inert = e);
  }, [e]), /* @__PURE__ */ i("div", {
    ref: l,
    role: "menu",
    part: "menu",
    className: `bg-elevated isolate col-start-1 row-start-1 min-w-0 ${r ? "starting:translate-x-full rtl:starting:-translate-x-full transition-[translate] duration-200 ease-out motion-reduce:transition-none" : ""}`,
    children: [r && /* @__PURE__ */ i("div", {
      className: "p-1 pb-0",
      children: [/* @__PURE__ */ i("button", {
        type: "button",
        tabIndex: -1,
        role: "menuitem",
        part: "menu-item",
        "data-epdf-menu-back": "",
        onClick: r,
        className: Ra,
        children: [/* @__PURE__ */ i(q, {
          name: "chevronLeft",
          size: 16,
          className: "text-fg-muted rtl:-scale-x-100"
        }), /* @__PURE__ */ i("span", {
          className: "flex-1 truncate",
          children: s("menu.back")
        })]
      }), o && /* @__PURE__ */ i("div", {
        className: "text-fg px-2.5 pb-1 pt-2 text-sm font-semibold",
        children: o
      })]
    }), /* @__PURE__ */ i($r.Provider, {
      value: !0,
      children: a
    })]
  });
}
const _s = /* @__PURE__ */ new WeakMap();
function hr(e) {
  let t = _s.get(e);
  return t || (t = /* @__PURE__ */ new Map(), _s.set(e, t)), t;
}
function Uo({ menuId: e, className: t = "relative inline-flex", children: n }) {
  const o = Q(K), r = Ug((c) => c.openMenus.includes(e)), a = k(null), [, s] = St((c) => c + 1, 0), l = o ? hr(o).get(e) : void 0, d = r && l !== void 0 && l === a.current;
  return R(() => {
    const c = a.current;
    if (!o || !c) return;
    const p = hr(o), f = p.get(e);
    if (!r) {
      f === c && p.delete(e);
      return;
    }
    !f?.isConnected && !c.closest(sd) && (p.set(e, c), s());
  }), /* @__PURE__ */ i("span", {
    ref: a,
    className: t,
    onClickCapture: (c) => {
      const p = c.target, f = p.closest("[aria-haspopup]") && !p.closest('[role="menu"]');
      o && a.current && f && hr(o).set(e, a.current);
    },
    children: [n(d), d && /* @__PURE__ */ i(zn, {
      onClose: () => o?.closeMenu(e),
      children: /* @__PURE__ */ i(Da, {
        menuId: e,
        onRun: () => o?.closeMenu(e)
      })
    })]
  });
}
const ud = (e) => {
  const t = e.filter((o) => !o.menu), n = t.filter((o) => o.active).length;
  return n === 0 ? "none" : n === 1 && t.length > 1 ? "radio" : "checkbox";
}, b0 = {
  none: "menuitem",
  radio: "menuitemradio",
  checkbox: "menuitemcheckbox"
}, pd = "flex w-full items-center gap-3 rounded-md px-2.5 py-1.5 text-start text-sm outline-none transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-40", Ra = `${pd} text-fg-secondary hover:bg-hover focus-visible:bg-hover aria-disabled:hover:bg-transparent`, v0 = `${pd} bg-selected text-accent focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent forced-colors:outline-2 forced-colors:outline-solid forced-colors:-outline-offset-2`, fd = (e) => ve(e.enabled ? null : {
  label: e.label,
  reason: e.disabledReason,
  labelShown: !0
}, { inMenu: !0 });
function Fn({ command: e, choice: t, onSelect: n }) {
  const o = t !== "none" && e.active, [r] = e.shortcuts, a = fd(e);
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...a.trigger,
    type: "button",
    tabIndex: -1,
    role: b0[t],
    "aria-checked": t === "none" ? void 0 : e.active,
    "aria-disabled": e.enabled ? void 0 : !0,
    part: o ? "menu-item menu-item-active" : "menu-item",
    onClick: () => {
      e.enabled && n();
    },
    className: o ? v0 : Ra,
    children: [
      e.icon && /* @__PURE__ */ i(q, {
        name: e.icon,
        size: 16,
        accent: e.iconAccent,
        className: `${o ? "text-accent" : "text-fg-muted"} ${Qt(e.icon)}`
      }),
      /* @__PURE__ */ i("span", {
        className: "flex-1 truncate",
        children: e.label
      }),
      r && /* @__PURE__ */ i("span", {
        className: "text-fg-muted ms-4 text-xs [font-variant-emoji:text]",
        children: wc(r)
      })
    ]
  }), a.element] });
}
function md({ command: e, menuId: t, onRun: n }) {
  const [o, r] = C(!1), a = X(dd), s = fd(e);
  return /* @__PURE__ */ i("div", {
    role: "none",
    className: "relative",
    children: [
      /* @__PURE__ */ i("button", {
        ...s.trigger,
        type: "button",
        tabIndex: -1,
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o,
        "aria-disabled": e.enabled ? void 0 : !0,
        part: "menu-item",
        onClick: (l) => {
          e.enabled && (a ? a({
            menuId: t,
            label: e.label,
            opener: l.currentTarget,
            onRun: n
          }) : r((d) => !d));
        },
        className: `${Ra} ${o ? "bg-hover" : ""}`,
        children: [
          e.icon && /* @__PURE__ */ i(q, {
            name: e.icon,
            size: 16,
            accent: e.iconAccent,
            className: `text-fg-muted ${Qt(e.icon)}`
          }),
          /* @__PURE__ */ i("span", {
            className: "flex-1 truncate",
            children: e.label
          }),
          /* @__PURE__ */ i(q, {
            name: "chevronRight",
            size: 16,
            className: "text-fg-muted rtl:-scale-x-100"
          })
        ]
      }),
      s.element,
      o && /* @__PURE__ */ i(zn, {
        onClose: () => r(!1),
        children: /* @__PURE__ */ i(Da, {
          menuId: t,
          onRun: n
        })
      })
    ]
  });
}
function w0({ commandId: e, choice: t, onRun: n }) {
  const o = Ce(e);
  return o.visible ? o.menu ? /* @__PURE__ */ i(md, {
    command: o,
    menuId: o.menu,
    onRun: n
  }) : /* @__PURE__ */ i(Fn, {
    command: o,
    choice: t,
    onSelect: () => {
      o.run(), n?.();
    }
  }) : null;
}
function hd({ title: e, first: t, children: n }) {
  const o = Je();
  return /* @__PURE__ */ i(D, { children: [!t && /* @__PURE__ */ i("div", {
    role: "separator",
    className: "bg-border-subtle my-1 h-px"
  }), /* @__PURE__ */ i("div", {
    role: "group",
    "aria-labelledby": e ? o : void 0,
    children: [e && /* @__PURE__ */ i("div", {
      id: o,
      className: "text-fg-muted px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide",
      children: e
    }), n]
  })] });
}
const y0 = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]);
function Da({ menuId: e, onRun: t }) {
  const n = Z(), o = Kb(e), r = ke(), a = ye() ?? void 0, s = ie(() => (o ?? []).map((d) => {
    const c = d.items.map((p) => r.resolveCommand(p, a)).filter((p) => p?.visible === !0);
    return c.length === 0 ? null : ud(c);
  }), y0);
  if (!o) return null;
  const l = o.flatMap((d, c) => {
    const p = s[c];
    return p ? [{
      section: d,
      choice: p
    }] : [];
  });
  return l.length === 0 ? null : /* @__PURE__ */ i("div", {
    className: "min-w-52 p-1",
    children: l.map(({ section: d, choice: c }, p) => /* @__PURE__ */ i(hd, {
      first: p === 0,
      title: d.title ?? (d.titleKey ? n(d.titleKey) : void 0),
      children: d.items.map((f) => /* @__PURE__ */ i(w0, {
        commandId: f,
        choice: c,
        onRun: t
      }, f))
    }, p))
  });
}
function Go({ view: e, align: t }) {
  const n = Z();
  if (!e.isOpen) return null;
  const o = e.sections.map((r) => {
    const a = r.rows.flatMap((s) => {
      const l = e.resolve(s.command);
      return l ? [{
        row: s,
        command: l
      }] : [];
    });
    return {
      section: r,
      rows: a,
      choice: r.role === "radio" ? "radio" : ud(a.map(({ command: s }) => s))
    };
  });
  return /* @__PURE__ */ i(zn, {
    onClose: e.close,
    align: t,
    children: /* @__PURE__ */ i("div", {
      className: "min-w-56 p-1",
      children: o.map(({ section: r, rows: a, choice: s }, l) => /* @__PURE__ */ i(hd, {
        first: l === 0,
        title: r.labelKey ? n(r.labelKey) : void 0,
        children: a.map(({ row: d, command: c }) => d.kind === "submenu" ? /* @__PURE__ */ i(md, {
          command: c,
          menuId: d.menu,
          onRun: e.close
        }, d.command) : /* @__PURE__ */ i(Fn, {
          command: c,
          choice: s,
          onSelect: () => {
            e.execute(d.command), e.close();
          }
        }, d.command))
      }, l))
    })
  });
}
const xs = "flex h-8 w-auto min-w-8 cursor-pointer items-center justify-center rounded-md p-[5px] transition-colors", _0 = "hover:bg-hover hover:ring hover:ring-accent", x0 = "border-none bg-selected text-accent shadow ring ring-accent", k0 = "cursor-not-allowed opacity-50 hover:bg-transparent hover:ring-0", S0 = "bg-accent text-on-accent hover:bg-accent-hover", M0 = "border-none bg-accent-active text-on-accent shadow", P0 = "cursor-not-allowed opacity-50 hover:bg-accent";
function Re(e, t = !0, n) {
  return n === "primary" ? `${xs} ${e ? M0 : S0} ${t ? "" : P0}` : `${xs} ${e ? x0 : _0} ${t ? "" : k0}`;
}
const Se = (e, t) => [
  "toolbar-button",
  t === "primary" ? "toolbar-button-primary" : null,
  e ? "toolbar-button-active" : null
].filter(Boolean).join(" "), Wo = (e) => `toolbar toolbar-${e}`, gd = (e) => e ? "mode-tab mode-tab-active" : "mode-tab", O0 = "flex h-8 w-auto min-w-8 cursor-pointer items-center justify-center rounded-none border-b-2 px-2 py-1 text-sm transition-colors hover:bg-transparent hover:border-b-fg-muted", T0 = "border-b-accent text-accent hover:border-b-accent", C0 = "border-b-transparent", bd = (e, t = !0) => `${O0} ${e ? T0 : C0} ${t ? "" : "cursor-not-allowed opacity-50"}`;
function Vt(e, t = !1) {
  const [n] = e.shortcuts;
  return {
    label: e.label,
    shortcut: n === void 0 ? null : wc(n),
    reason: e.enabled ? null : e.disabledReason ?? null,
    labelShown: t
  };
}
function Vo({ cmd: e, variant: t, run: n, emphasis: o }) {
  const r = t === "label", a = ve(Vt(e, r || t === "icon+label" || !e.icon)), s = (l) => /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...a.trigger,
    type: "button",
    onClick: n,
    disabled: !e.enabled,
    "aria-pressed": e.pressable ? l : void 0,
    "aria-haspopup": e.menu ? "menu" : void 0,
    "aria-expanded": e.menu ? l : void 0,
    "aria-label": e.label,
    part: r ? gd(l) : Se(l, o),
    className: r ? bd(l, e.enabled) : `${Re(l, e.enabled, o)} ${o === "primary" && t === "icon+label" ? "px-2.5" : ""}`,
    children: r ? /* @__PURE__ */ i("span", {
      className: "whitespace-nowrap px-1",
      children: e.label
    }) : t === "icon+label" ? /* @__PURE__ */ i("span", {
      className: "flex items-center whitespace-nowrap text-sm",
      children: [e.icon && /* @__PURE__ */ i(q, {
        name: e.icon,
        size: 20,
        accent: e.iconAccent,
        className: `me-1.5 shrink-0 ${Qt(e.icon)}`
      }), /* @__PURE__ */ i("span", { children: e.label })]
    }) : e.icon ? /* @__PURE__ */ i(q, {
      name: e.icon,
      size: 20,
      accent: e.iconAccent,
      className: Qt(e.icon)
    }) : /* @__PURE__ */ i("span", {
      className: "text-sm",
      children: e.label
    })
  }), a.element] });
  return e.menu ? /* @__PURE__ */ i(Uo, {
    menuId: e.menu,
    children: s
  }) : s(e.active);
}
const gr = {
  [fl]: "",
  className: "contents"
};
function E0() {
  const e = Z(), t = ke(), n = Ce("zoom:in"), o = Ce("zoom:out"), r = Ce("menu:zoom"), a = ve(Vt(n)), s = ve(Vt(o)), l = ve(Vt(r)), d = Q(K), c = Q(lt), p = oe(lt, (h) => h.getZoomLevel(), 1), f = Math.round((p ?? 1) * 100), [u, m] = C(String(f));
  E(() => m(String(f)), [f]);
  const b = (h) => {
    h.preventDefault();
    const g = parseFloat(u);
    !isNaN(g) && g > 0 && c?.zoomTo({ level: g / 100 });
  };
  return /* @__PURE__ */ i(Uo, {
    menuId: "zoom",
    className: "relative block",
    children: (h) => /* @__PURE__ */ i("div", {
      className: "bg-hover flex items-center rounded",
      children: [
        /* @__PURE__ */ i("form", {
          onSubmit: b,
          className: "flex min-w-0 flex-nowrap items-center overflow-hidden whitespace-nowrap",
          children: [/* @__PURE__ */ i("input", {
            name: "zoom",
            type: "text",
            inputMode: "numeric",
            pattern: "\\d*",
            "aria-label": e("commands.zoom.level"),
            className: "h-6 w-8 min-w-0 shrink border-0 bg-transparent p-0 text-end text-sm outline-none focus:outline-none",
            value: u,
            onChange: (g) => m(g.target.value.replace(/[^0-9]/g, "")),
            onBlur: () => {
              (!u || parseFloat(u) <= 0) && m(String(f));
            }
          }), /* @__PURE__ */ i("span", {
            className: "shrink-0 text-sm",
            children: "%"
          })]
        }),
        /* @__PURE__ */ i("span", {
          ...gr,
          children: [/* @__PURE__ */ i("button", {
            ...l.trigger,
            type: "button",
            "aria-haspopup": "menu",
            "aria-expanded": h,
            "aria-label": r.label,
            part: Se(!1),
            className: Re(!1),
            onClick: () => d?.toggleMenu("zoom"),
            children: /* @__PURE__ */ i(q, {
              name: "chevronDown",
              size: 20
            })
          }), l.element]
        }),
        /* @__PURE__ */ i("span", {
          ...gr,
          children: [/* @__PURE__ */ i("button", {
            ...s.trigger,
            type: "button",
            "aria-label": o.label,
            disabled: !o.enabled,
            part: Se(!1),
            className: Re(!1, o.enabled),
            onClick: () => t.execute("zoom:out"),
            children: /* @__PURE__ */ i(q, {
              name: "zoomOut",
              size: 20
            })
          }), s.element]
        }),
        /* @__PURE__ */ i("span", {
          ...gr,
          children: [/* @__PURE__ */ i("button", {
            ...a.trigger,
            type: "button",
            "aria-label": n.label,
            disabled: !n.enabled,
            part: Se(!1),
            className: Re(!1, n.enabled),
            onClick: () => t.execute("zoom:in"),
            children: /* @__PURE__ */ i(q, {
              name: "zoomIn",
              size: 20
            })
          }), a.element]
        })
      ]
    })
  });
}
function A0() {
  const e = Q(K), t = Ce("menu:zoom"), n = ve(Vt(t));
  return /* @__PURE__ */ i(Uo, {
    menuId: "zoom",
    children: (o) => /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
      ...n.trigger,
      type: "button",
      "aria-label": t.label,
      "aria-haspopup": "menu",
      "aria-expanded": o,
      part: Se(o),
      className: Re(o),
      onClick: () => e?.toggleMenu("zoom"),
      children: /* @__PURE__ */ i(q, {
        name: "zoomIn",
        size: 20
      })
    }), n.element] })
  });
}
function N0({ view: e }) {
  const [t, n] = C(!1), o = e.commands.some((r) => r.active);
  return /* @__PURE__ */ i("span", {
    className: "relative inline-flex",
    children: [/* @__PURE__ */ i("button", {
      type: "button",
      onClick: () => n((r) => !r),
      "aria-haspopup": "menu",
      "aria-expanded": t,
      part: e.id === "modes" ? gd(o) : Se(t),
      className: bd(o),
      children: /* @__PURE__ */ i(q, {
        name: "chevronDown",
        size: 18
      })
    }), /* @__PURE__ */ i(Go, { view: Pn(e, t, () => n(!1)) })]
  });
}
function I0({ view: e }) {
  const [t, n] = C(!1), o = e.commands.find((a) => a.active) ?? e.commands[0], r = !!(o?.active && o.id !== ol);
  return /* @__PURE__ */ i("div", {
    style: { width: 100 },
    className: "relative",
    children: [/* @__PURE__ */ i("button", {
      type: "button",
      onClick: () => n((a) => !a),
      "aria-haspopup": "menu",
      "aria-expanded": t,
      part: Se(t),
      className: "bg-surface hover:bg-hover flex w-full cursor-pointer appearance-none items-center rounded-md py-1.5 pe-2 ps-3 text-[13px] transition-colors",
      children: [/* @__PURE__ */ i("span", {
        className: `min-w-0 flex-1 truncate text-start ${r ? "text-accent" : "text-fg"}`,
        children: o?.label
      }), /* @__PURE__ */ i(q, {
        name: "chevronDown",
        size: 16,
        className: r ? "text-accent" : "text-fg-secondary"
      })]
    }), /* @__PURE__ */ i(Go, { view: Pn(e, t, () => n(!1)) })]
  });
}
function L0({ view: e }) {
  const t = Z(), [n, o] = C(!1), r = e.commands.find((l) => l.active) ?? e.commands[0], a = e.labelKey ? t(e.labelKey) : r?.label, s = ve(a ? {
    label: a,
    labelShown: !r?.icon
  } : null);
  return /* @__PURE__ */ i("span", {
    className: "relative inline-flex",
    children: [
      /* @__PURE__ */ i("button", {
        ...s.trigger,
        type: "button",
        onClick: () => o((l) => !l),
        "aria-haspopup": "menu",
        "aria-expanded": n,
        "aria-label": a,
        part: Se(n),
        className: Re(n),
        children: [r?.icon ? /* @__PURE__ */ i(q, {
          name: r.icon,
          size: 20,
          accent: r.iconAccent,
          className: Qt(r.icon)
        }) : /* @__PURE__ */ i("span", {
          className: "whitespace-nowrap px-1 text-sm",
          children: a
        }), /* @__PURE__ */ i(q, {
          name: "chevronDown",
          size: 14,
          className: "text-fg-secondary"
        })]
      }),
      s.element,
      /* @__PURE__ */ i(Go, { view: Pn(e, n, () => o(!1)) })
    ]
  });
}
function R0({ view: e }) {
  return /* @__PURE__ */ i(Go, {
    view: e,
    align: "end"
  });
}
function D0({ isOpen: e, toggle: t }) {
  const n = Z()("demo.more"), o = ve({ label: n });
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...o.trigger,
    type: "button",
    onClick: t,
    "aria-haspopup": "menu",
    "aria-expanded": e,
    "aria-label": n,
    part: Se(e),
    className: Re(e),
    children: /* @__PURE__ */ i(q, {
      name: "dots",
      size: 20
    })
  }), o.element] });
}
const vd = (e) => [
  ...e.sections.start ?? [],
  ...e.sections.center ?? [],
  ...e.sections.end ?? []
].flatMap((t) => t.items);
function $0(e) {
  return vd(e).filter((t) => typeof t == "object" && "slot" in t);
}
function wd(e) {
  return new Set(vd(e).flatMap((t) => typeof t == "object" && "command" in t && t.emphasis === "primary" ? [t.command] : []));
}
function z0({ commandId: e }) {
  const t = Ce(e);
  return t.visible ? /* @__PURE__ */ i(Vo, {
    cmd: t,
    variant: "icon",
    run: () => void t.run()
  }) : null;
}
function $a({ bar: e, orientation: t = "horizontal", gap: n = 8, className: o }) {
  const r = t === "vertical", a = H(() => wd(e), [e]), s = {
    "measurement-scale": () => /* @__PURE__ */ i(Hv, {}),
    zoom: (l) => l === "button" || r ? /* @__PURE__ */ i(A0, {}) : /* @__PURE__ */ i(E0, {}),
    "quick-stamps": () => /* @__PURE__ */ i(Xv, {}),
    "page-number": () => /* @__PURE__ */ i(Yv, {}),
    "view-only": (l) => /* @__PURE__ */ i(t0, { compact: l === "icon" || r }),
    "outline-filter": (l) => /* @__PURE__ */ i(Wv, { variant: l }),
    "attachments-count": () => /* @__PURE__ */ i(jv, {})
  };
  return /* @__PURE__ */ i(Iv, {
    bar: e,
    orientation: t,
    gap: n,
    separatorWidth: 1,
    className: o,
    renderCommand: (l, d, c) => /* @__PURE__ */ i(Vo, {
      cmd: l,
      variant: d,
      run: c,
      emphasis: a.has(l.id) ? "primary" : void 0
    }),
    renderCustom: {
      ...Object.fromEntries($0(e).filter((l) => !Object.prototype.hasOwnProperty.call(s, l.slot)).map((l) => [l.slot, (d, c) => c.layer === "measure" ? null : /* @__PURE__ */ i(l0, {
        id: l.slot,
        variant: l.variants ? d : null,
        orientation: t,
        grow: l.grow === !0,
        measure: c.measure,
        children: l.terminal ? /* @__PURE__ */ i(z0, { commandId: l.terminal }) : null
      })])),
      ...s
    },
    renderCollapsed: (l) => l.id === "modes" ? /* @__PURE__ */ i(I0, { view: l }) : l.collapse === "menu" ? /* @__PURE__ */ i(L0, { view: l }) : void 0,
    renderGroupTrigger: (l) => /* @__PURE__ */ i(N0, { view: l }),
    renderSeparator: () => /* @__PURE__ */ i("span", { className: `bg-border self-center ${r ? "h-px w-6" : "h-6 w-px"}` }),
    renderOverflowTrigger: (l, d) => /* @__PURE__ */ i(D0, {
      isOpen: l,
      toggle: d
    }),
    renderOverflowMenu: (l) => /* @__PURE__ */ i(R0, { view: l })
  });
}
const F0 = [
  "accent",
  "background",
  "surface",
  "surface-raised",
  "text",
  "text-muted",
  "border",
  "hover",
  "canvas",
  "page-background",
  "page-shadow",
  "tooltip",
  "tooltip-text",
  "radius",
  "font"
], yd = (e) => typeof e == "string" ? { preference: e } : e ?? {}, B0 = (e) => F0.includes(e);
function K0(e) {
  return Object.entries(e).filter(([t, n]) => n === void 0 ? !1 : B0(t) ? typeof n != "string" || /[{};]/.test(n) ? (console.warn(`[embedpdf] theme: ignoring the invalid value of "${t}"`), !1) : !0 : (console.warn(`[embedpdf] theme: "${t}" isn't a token, ignored`), !1)).map(([t, n]) => `--epdf-${t}:var(--embedpdf-host-${t},${n});`).join("");
}
function br(e, t) {
  const n = t ? K0(t) : "";
  return n ? `${e}{${n}}` : "";
}
function H0(e, t) {
  const { accent: n, tokens: o, light: r, dark: a } = yd(e);
  return br(t, {
    ...n === void 0 ? null : { accent: n },
    ...o
  }) + br(`${t}:not(.dark)`, r) + br(`${t}.dark`, a);
}
const _d = be(null), xd = "(prefers-color-scheme: dark)", j0 = () => typeof window < "u" && window.matchMedia?.(xd).matches ? "dark" : "light";
function U0({ children: e, preference: t = "system", target: n }) {
  const [o, r] = C(j0);
  E(() => {
    if (t !== "system" || typeof window > "u" || !window.matchMedia) return;
    const l = window.matchMedia(xd), d = () => r(l.matches ? "dark" : "light");
    return d(), l.addEventListener("change", d), () => l.removeEventListener("change", d);
  }, [t]);
  const a = t === "system" ? o : t;
  R(() => {
    (n ?? document.documentElement).classList.toggle("dark", a === "dark");
  }, [a, n]);
  const s = H(() => ({ mode: a }), [a]);
  return /* @__PURE__ */ i(_d.Provider, {
    value: s,
    children: e
  });
}
function V_() {
  const e = X(_d);
  if (!e) throw new Error("useTheme must be used within <ThemeProvider>");
  return e;
}
function za({ labelledBy: e, onClose: t, className: n, children: o }) {
  const r = k(null), a = k(null), s = k(t);
  return s.current = t, R(() => {
    const l = r.current, d = a.current;
    if (!l || !d) return;
    const c = Fc(l), p = Ho(d, { onEscape: () => s.current() });
    return () => {
      p.release(), c();
    };
  }, []), /* @__PURE__ */ i("div", {
    ref: r,
    ...Ta,
    "data-epdf-layer": "",
    className: `${zc} place-items-center p-4 open:grid`,
    style: {
      position: "fixed",
      inset: "auto",
      maxWidth: "none",
      maxHeight: "none"
    },
    children: [/* @__PURE__ */ i("div", {
      "aria-hidden": "true",
      className: `absolute inset-0 ${Ea}`
    }), /* @__PURE__ */ i("div", {
      ref: a,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": e,
      className: `relative max-h-full max-w-full overflow-y-auto ${n}`,
      children: o
    })]
  });
}
function kd(e) {
  let t = null;
  return () => {
    if (!t) {
      const n = e();
      n.catch(() => {
        t === n && (t = null);
      }), t = n;
    }
    return t;
  };
}
const G0 = nm.map((e) => ({
  key: e.key,
  label: e.label,
  bytes: kd(() => om(e.key))
})), W0 = (e) => async () => {
  if (e.data) return new Uint8Array(e.data);
  if (!e.url) throw new Error(`[embedpdf] signature font "${e.key}" has no url or data`);
  const t = await fetch(e.url);
  if (!t.ok) throw new Error(`${e.url}: HTTP ${t.status}`);
  return new Uint8Array(await t.arrayBuffer());
}, ks = /* @__PURE__ */ new WeakMap();
function V0(e) {
  if (!e) return G0;
  let t = ks.get(e);
  return t || (t = e.map((n) => ({
    key: n.key,
    label: n.label,
    bytes: kd(W0(n))
  })), ks.set(e, t)), t;
}
const q0 = (e) => V0(e).map((t) => ({
  key: t.key,
  load: t.bytes
})), vr = /* @__PURE__ */ new WeakMap();
function q_(e) {
  let t = vr.get(e);
  return t || (t = (async () => {
    if (!globalThis.crypto?.subtle) return null;
    const n = await e.bytes(), o = new Uint8Array(await crypto.subtle.digest("SHA-256", n)), r = Array.from(o, (a) => a.toString(16).padStart(2, "0")).join("");
    return {
      hash: r,
      family: tm(r),
      weight: 400,
      style: "normal",
      load: async () => n
    };
  })(), vr.set(e, t), t.catch(() => vr.delete(e))), t;
}
function Y0(e) {
  const t = Q(wl), n = Q(gl), o = k(e);
  o.current = e, E(() => {
    if (!t) return;
    const r = Qp({
      overrides: () => o.current,
      goToPage: (a) => n?.goToPage(a)
    });
    return t.setUiAdapter(r);
  }, [t, n]);
}
function X0({ onHitClick: e }) {
  const t = $e(), n = e1(t.ref), o = Z0((u) => u.activeHit), r = J0((u) => u.highlight), [a] = C(tf);
  if (n.length === 0) return null;
  const s = We("search-highlight", r.color), l = We("search-highlight-active", r.activeColor), d = We(
    "search-blend-mode",
    r.blendMode
  ), c = e ? { pointerEvents: "auto", cursor: "pointer" } : null, p = (u) => e && {
    onPointerDown: (m) => a.press(m),
    onClick: (m) => {
      a.isClick(m) && e(u);
    }
  }, f = ef(n, {
    active: o,
    page: t.transform,
    color: s,
    activeColor: l
  });
  return /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: f.map(
    (u) => u.box ? /* @__PURE__ */ i(
      "div",
      {
        ...p(u.hit),
        style: {
          position: "absolute",
          left: u.box.left,
          top: u.box.top,
          width: u.box.width,
          height: u.box.height,
          backgroundColor: u.fill,
          mixBlendMode: d,
          borderRadius: 2,
          ...c
        }
      },
      u.key
    ) : /* @__PURE__ */ i(
      "svg",
      {
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          mixBlendMode: d
        },
        children: /* @__PURE__ */ i(
          "polygon",
          {
            points: u.points ?? void 0,
            ...p(u.hit),
            style: { fill: u.fill, ...c }
          }
        )
      },
      u.key
    )
  ) });
}
function Y_() {
  return j(rn);
}
const Z0 = Ae(pm), J0 = zt(rn), Q0 = Object.freeze([]);
function e1(e) {
  const t = Ze();
  return ie(
    (n) => n.tryCapability(rn, t ?? void 0)?.listHits(e === void 0 ? void 0 : { page: e }) ?? Q0
  );
}
const yn = cf("stage-thumbs"), Ss = {
  code: "en",
  name: "English",
  translations: {
    measurement: {
      title: "Measurements",
      distance: "Distance",
      perimeter: "Perimeter",
      area: "Area",
      areaUnit: "Area unit",
      resetLabel: "Reset label position",
      calibrate: "Calibrate scale",
      scale: "Scale",
      custom: "Custom",
      unavailable: "Unavailable",
      instructions: "Drag to measure a distance, then click to place its dimension line. Click vertices for a perimeter or area and double-click to finish. Area boundaries must not cross; an unavailable preview cannot be finished. Press Escape to cancel. Drag the label itself to move it.",
      sessionOnly: "This engine keeps page calibration for this session only.",
      allPages: "Apply to all pages",
      recalculate: "Recalculate existing measurements",
      preset: "Scale preset",
      choosePreset: "Choose a preset",
      unit: "Unit",
      precision: "Precision",
      selection: "Selected measurements",
      report: "{updated} updated · {skipped} skipped · {failed} failed",
      knownLength: "Enter the real length represented by the line you just drew.",
      length: "Known length",
      apply: "Apply scale",
      applying: "Applying…"
    },
    commands: {
      zoom: {
        in: "Zoom In",
        out: "Zoom Out",
        fitPage: "Fit to Page",
        fitWidth: "Fit to Width",
        automatic: "Automatic",
        marquee: "Marquee Zoom",
        menu: "Zoom",
        level: "Zoom Level",
        p50: "50%",
        p100: "100%",
        p150: "150%",
        p200: "200%",
        p400: "400%"
      },
      pan: "Pan",
      pointer: "Pointer",
      comment: "Comment",
      style: "Style",
      menu: "Menu",
      viewControls: "View Controls",
      open: "Open",
      download: "Download",
      print: "Print",
      fullscreen: "Full Screen",
      spread: {
        group: "Page Layout",
        none: "Single Page",
        odd: "Two Page",
        even: "Cover Page"
      },
      scroll: {
        group: "Scrolling",
        vertical: "Vertical",
        horizontal: "Horizontal",
        paged: "Page by page"
      },
      rotate: {
        group: "Rotate",
        clockwise: "Rotate Clockwise",
        counterclockwise: "Rotate Counter-Clockwise"
      },
      mode: {
        measure: "Measure",
        group: "Mode",
        view: "View",
        annotate: "Annotate",
        shapes: "Shapes",
        insert: "Insert",
        form: "Form",
        redact: "Redact"
      },
      annotate: {
        cancelCreation: "Cancel drawing",
        highlight: "Highlight",
        strikeout: "Strikeout",
        underline: "Underline",
        squiggly: "Squiggly",
        ink: "Draw",
        inkHighlight: "Ink Highlighter",
        text: "Text",
        insertText: "Insert Text",
        replaceText: "Replace Text",
        callout: "Callout",
        note: "Comment",
        link: "Link",
        gotoLink: "Go to link",
        saveFile: "Save file",
        removeLink: "Remove link",
        delete: "Delete",
        group: "Group",
        ungroup: "Ungroup",
        stampFromSelection: "Make stamp",
        strip: "Annotation actions"
      },
      selection: {
        copy: "Copy",
        strip: "Text selection actions"
      },
      snapshot: {
        tool: "Take a Snapshot",
        copy: "Copy",
        save: "Save Image",
        clear: "Clear Snapshot",
        strip: "Snapshot actions"
      },
      shapes: {
        rectangle: "Rectangle",
        circle: "Circle",
        line: "Line",
        arrow: "Arrow",
        polygon: "Polygon",
        polyline: "Polyline"
      },
      insert: {
        stamp: "Rubber Stamp",
        attachment: "Attach File",
        signature: "Signature",
        image: "Image"
      },
      form: {
        textfield: "Text Field",
        checkbox: "Checkbox",
        radio: "Radio Button",
        select: "Dropdown",
        listbox: "List Box",
        button: "Button",
        signature: "Signature Field",
        design: "Form design"
      },
      redact: {
        mark: "Mark for Redaction",
        applyAll: "Apply Redactions",
        apply: {
          one: "Apply Redaction",
          other: "Apply {count} Redactions"
        },
        clearAll: "Clear Marks"
      },
      undo: "Undo",
      redo: "Redo",
      page: {
        next: "Next Page",
        previous: "Previous Page",
        first: "First Page",
        last: "Last Page",
        goTo: "Go to Page"
      },
      find: "Find",
      shortcuts: "Keyboard Shortcuts",
      notAllowed: {
        default: "{label} isn't allowed",
        "annotations-create": "Adding annotations isn't allowed",
        "doc-annotate-modify": "Changing annotations isn't allowed",
        "doc-annotate-read": "Viewing annotations isn't allowed",
        "doc-attachments-modify": "Adding files isn’t allowed",
        "doc-content-copy": "Taking snapshots isn't allowed",
        "doc-download": "Downloading isn't allowed",
        "doc-forms-modify": "Editing form fields isn't allowed",
        "doc-outline-modify": "Changing the outline isn’t allowed",
        "doc-pages-assemble": "Changing pages isn’t allowed",
        "doc-print": "Printing isn't allowed",
        "doc-render-thumbnail": "Showing thumbnails isn't allowed",
        "doc-text-copy": "Copying isn't allowed",
        "doc-text-search": "Searching isn't allowed"
      },
      commentThread: { more: "More options" },
      attachment: {
        add: "Add file",
        save: "Save",
        goTo: "Go to page",
        delete: "Delete",
        more: "More options"
      },
      outline: {
        add: "Add item",
        addChild: "Add child item",
        rename: "Rename",
        setDestination: "Set destination to current view",
        properties: "Properties…",
        delete: "Delete",
        expandAll: "Expand all",
        collapseAll: "Collapse all",
        more: "More options"
      },
      pages: {
        rotateClockwise: "Rotate Page Clockwise",
        rotateCounterclockwise: "Rotate Page Counter-Clockwise",
        delete: "Delete Pages",
        duplicate: "Duplicate Pages",
        insertBlank: "Insert Blank Page",
        insertFile: "Insert from File…",
        extract: "Extract Pages",
        selectAll: "Select All Pages",
        more: "Page Options"
      },
      turnedOff: "{label} isn't available",
      locked: { default: "{label} can't be changed in this document" }
    },
    passwordPrompt: {
      title: "Password required",
      required: "This document is password protected. Enter the password to open it.",
      incorrect: "The password was incorrect. Please try again.",
      incorrectWarning: "Incorrect password",
      label: "Password",
      placeholder: "Enter password",
      cancel: "Cancel",
      open: "Open",
      opening: "Opening…"
    },
    grantPrompt: {
      passphraseTitle: "Passphrase required",
      passphraseRequired: "This link is protected. Enter the passphrase you were given to open the document.",
      passphraseIncorrect: "That passphrase didn’t work. Please try again.",
      passphraseLabel: "Passphrase",
      openTitle: "Before you open this document",
      changeTitle: "Before you make changes",
      asks: "The owner of this document asks who you are.",
      shownOnChanges: "Your name is shown on what you add.",
      final: "You can’t change your answers later.",
      privacy: "Privacy notice",
      optional: "optional",
      invalid: "Check this answer.",
      invalidEmail: "Enter a valid email address.",
      fields: {
        displayName: "Name",
        email: "Email",
        title: "Job title",
        organization: "Organization",
        organizationalUnit: "Department"
      },
      open: "Open",
      cancel: "Cancel",
      continue: "Continue",
      saving: "Saving…",
      notNow: "Not now"
    },
    dropToOpen: { label: "Drop a PDF to open it" },
    documentError: {
      title: "Couldn’t open document",
      unknown: "The document could not be opened.",
      notFound: "The file wasn’t found.",
      notAllowed: "You don’t have access to this document.",
      damaged: "This file isn’t a PDF, or it’s damaged.",
      unsupported: "This viewer can’t open this kind of document.",
      retry: "Try again",
      close: "Close document"
    },
    tabs: {
      close: "Close {name}",
      loading: "Loading",
      untitled: "Document {id}"
    },
    closeUnsaved: {
      title: "Close without saving?",
      body: "“{name}” has changes that weren’t downloaded. They’ll be lost.",
      cancel: "Cancel",
      close: "Close without saving"
    },
    viewOnly: {
      label: "View only",
      turnedOff: "The tools that change this document are turned off",
      notAllowed: "You can read this document, but not change it"
    },
    panel: {
      close: "Close",
      resize: "Resize {title}"
    },
    menu: { back: "Back" },
    shortcuts: {
      document: "Document",
      viewing: "Viewing",
      editing: "Editing",
      other: "Other"
    },
    goToPage: { go: "Go" },
    print: {
      title: "Print",
      pages: "Pages",
      allPages: "All pages",
      currentPage: "Current page",
      range: "Custom",
      rangeLabel: "Pages to print",
      rangePlaceholder: "e.g. 1-3, 5",
      rangeInvalid: "Use page numbers from 1 to {total}, such as 1-3, 5",
      annotations: "Print annotations",
      preparing: "Preparing…",
      preparingPage: "Preparing page {page} of {total}…",
      ready: "Ready to print.",
      images: "Pages print as images at {dpi} DPI.",
      lowResolution: "This document allows only low-resolution printing ({dpi} DPI).",
      failed: "The printout couldn’t be prepared.",
      cancel: "Cancel",
      print: "Print"
    },
    panels: {
      thumbnails: "Thumbnails",
      outline: "Outline",
      attachments: "Attachments",
      search: "Search",
      comments: "Comments",
      style: "Style",
      stamps: "Stamps",
      signatures: "Signatures",
      redaction: "Redactions",
      measurement: "Measurements",
      formDesign: "Form design",
      switch: "Switch panel"
    },
    annotation: {
      comment: "Comment",
      highlight: "Highlight",
      underline: "Underline",
      squiggly: "Squiggly",
      strikeout: "Strikethrough",
      square: "Square",
      circle: "Circle",
      line: "Line",
      polygon: "Polygon",
      polyline: "Polyline",
      ink: "Ink",
      freeText: "Text",
      stamp: "Stamp",
      caret: "Caret",
      redact: "Redact",
      fileAttachment: "Attachment",
      style: {
        kind: "Type",
        opacity: "Opacity",
        stroke: "Stroke",
        fill: "Fill",
        color: "Color",
        strokeWidth: "Stroke width",
        border: "Border",
        borderStyle: "Border style",
        borderColor: "Border color",
        borderWidth: "Border width",
        background: "Background",
        outline: "Outline",
        lineEndings: "Line endings",
        blendMode: "Blend mode",
        font: "Font",
        fontSize: "Font size",
        textColor: "Text color",
        bold: "Bold",
        italic: "Italic",
        underline: "Underline",
        align: "Align",
        alignment: "Alignment",
        label: "Label",
        labelFont: "Label font",
        labelSize: "Label size",
        labelColor: "Label color",
        icon: "Icon",
        link: "Link"
      },
      flags: {
        print: "Print",
        hidden: "Hidden",
        noView: "No view",
        toggleNoView: "Toggle no view",
        readOnly: "Read only",
        locked: "Locked",
        lockedContents: "Locked contents",
        noZoom: "No zoom",
        noRotate: "No rotate",
        invisible: "Invisible"
      },
      borderStyles: {
        solid: "Solid",
        dashed: "Dashed",
        cloudy: "Cloudy"
      },
      lineEndings: {
        none: "None",
        square: "Square",
        circle: "Circle",
        diamond: "Diamond",
        openArrow: "Open arrow",
        closedArrow: "Closed arrow",
        butt: "Butt",
        reverseOpenArrow: "Reverse open arrow",
        reverseClosedArrow: "Reverse closed arrow",
        slash: "Slash"
      },
      blendModes: {
        normal: "Normal",
        multiply: "Multiply",
        screen: "Screen",
        overlay: "Overlay",
        darken: "Darken",
        lighten: "Lighten",
        colorDodge: "Color dodge",
        colorBurn: "Color burn",
        hardLight: "Hard light",
        softLight: "Soft light",
        difference: "Difference",
        exclusion: "Exclusion",
        hue: "Hue",
        saturation: "Saturation",
        color: "Color",
        luminosity: "Luminosity"
      },
      fonts: {
        courier: "Courier",
        courierBold: "Courier Bold",
        courierBoldOblique: "Courier Bold Oblique",
        courierOblique: "Courier Oblique",
        helvetica: "Helvetica",
        helveticaBold: "Helvetica Bold",
        helveticaBoldOblique: "Helvetica Bold Oblique",
        helveticaOblique: "Helvetica Oblique",
        timesRoman: "Times Roman",
        timesBold: "Times Bold",
        timesBoldItalic: "Times Bold Italic",
        timesItalic: "Times Italic",
        symbol: "Symbol",
        zapfDingbats: "Zapf Dingbats"
      },
      alignments: {
        left: "Left",
        center: "Center",
        right: "Right"
      },
      noteIcons: {
        comment: "Comment",
        key: "Key",
        note: "Note",
        help: "Help",
        newParagraph: "New paragraph",
        paragraph: "Paragraph",
        insert: "Insert"
      },
      attachmentIcons: {
        pushPin: "Push pin",
        paperclip: "Paperclip",
        graph: "Graph",
        tag: "Tag"
      }
    },
    form: { settings: {
      name: "Name",
      tooltip: "Tooltip",
      required: "Required",
      readOnly: "Read-only",
      noExport: "Don't export",
      defaultValue: "Default value",
      maxLength: "Maximum length",
      multiline: "Several lines",
      password: "Password",
      comb: "One character per box",
      radiosInUnison: "Buttons with one value turn on together",
      keepOneOn: "Keep one on",
      options: "Options",
      allowTyping: "Allow typing",
      multiSelect: "Several choices"
    } },
    thumbnails: { page: "Page {page}" },
    formDesign: {
      empty: "No fields yet. Pick a field tool to add one.",
      page: "Page {page}",
      allFields: "All fields",
      buttons: "Buttons",
      boxes: "Boxes",
      box: "Box {number}",
      addButton: "Add a button",
      addBox: "Add a box"
    },
    stylePanel: {
      mixed: "(mixed)",
      transparent: "Transparent",
      lineStart: "Start",
      lineEnd: "End",
      empty: "Pick a draw tool or select an annotation to edit its style.",
      selected: {
        one: "{count} selected",
        other: "{count} selected"
      },
      toolDefaults: "{tool} defaults",
      defaults: "Defaults",
      fontGroups: {
        document: "In this document",
        yours: "Your fonts",
        server: "Server fonts",
        standard: "Standard"
      },
      fontStyles: {
        bold: "Bold",
        italic: "Italic",
        boldItalic: "Bold Italic"
      },
      fontRestrictions: {
        notEmbedded: "The document only names it",
        subset: "The document holds only the characters it uses",
        previewAndPrint: "Its licence allows viewing and printing only",
        unsupportedFormat: "New text can’t be written in this kind of font",
        noUnicodeMap: "It doesn’t say which characters it draws",
        other: "New text can’t be written in it"
      }
    },
    attachments: {
      loading: "Loading attachments…",
      failed: "The attachments couldn’t be read.",
      empty: "This document has no attached files",
      drop: "Drop files to attach them",
      dropHint: "Or drop files here",
      adding: "Adding…",
      onPage: "Page {page}",
      count: {
        one: "{count} file",
        other: "{count} files"
      }
    },
    outline: {
      filter: "Filter outline",
      loading: "Loading outline…",
      failed: "The outline couldn’t be read.",
      empty: "This document has no outline",
      noMatches: "No items match",
      incomplete: "Part of the outline couldn’t be read.",
      untitled: "Untitled",
      properties: {
        title: "Item properties",
        name: "Title",
        color: "Color",
        noColor: "None",
        customColor: "Custom color",
        bold: "Bold",
        italic: "Italic",
        open: "Expanded when the document opens",
        target: "Destination",
        targetNone: "None",
        targetView: "Current view",
        targetNamed: "Page action",
        targetKept: "Kept as it is",
        keptNote: "This item runs a script or opens another file. It can’t be changed here.",
        fit: "Fit",
        fitKept: "As it is",
        save: "Save",
        cancel: "Cancel"
      }
    },
    linkEditor: {
      toUrl: "Link to a URL",
      url: "URL",
      toPage: "Link to a page",
      page: "Page",
      urlPlaceholder: "https://…",
      pagePlaceholder: "Page number",
      add: "Add link",
      update: "Update link"
    },
    pageNumber: {
      page: "{current} / {total}",
      pages: "{first}–{last} / {total}",
      goToPage: "Go to page"
    },
    comments: {
      forbidden: "You don’t have access to comments on this document.",
      loading: "Loading comments…",
      error: "Comments failed to load.",
      retry: "Retry",
      empty: "No comments yet. Use the note tool to start a thread.",
      emptyReadOnly: "No comments on this document.",
      anonymous: "Guest",
      page: "Page {page}",
      count: {
        one: "{count} comment",
        other: "{count} comments"
      },
      reply: "Reply",
      replyPlaceholder: "Reply…",
      addPlaceholder: "Add a comment…",
      delete: "Delete comment",
      deleteThread: "Delete thread",
      edit: "Edit comment",
      status: "Status",
      statusNone: "No status",
      statusAccepted: "Accepted",
      statusRejected: "Rejected",
      statusCancelled: "Cancelled",
      statusCompleted: "Completed",
      markCompleted: "Mark as completed"
    },
    demo: {
      starting: "Starting viewer…",
      opening: "Opening document…",
      pageLoading: "Loading page {page}…",
      pageError: "This page couldn’t load.",
      pageForbidden: "You don’t have access to this page.",
      more: "More",
      searchPlaceholder: "Search document…",
      searchCaseSensitive: "Case sensitive",
      searchWholeWord: "Whole word",
      searchRegex: "Regular expression",
      searchSearching: "Searching…",
      searchResults: {
        one: "{count} result found",
        other: "{count} results found"
      },
      searchNoResults: "No results",
      searchPrevious: "Previous result",
      searchNext: "Next result",
      searchPage: "Page {page}",
      searchHitOf: "{current} of {total}",
      searchResult: "Result {index}",
      searchOptions: "Search options",
      empty: "Nothing here yet in this demo panel.",
      cancel: "Cancel",
      pageBadge: "p. {page}",
      redactionEmpty: "No pending redactions. Use the Redact tool to mark text or areas.",
      redactionArea: "Area mark",
      redactionText: "Text mark",
      redactionRemove: "Remove mark",
      redactConfirmTitle: {
        one: "Apply redaction?",
        other: "Apply redactions?"
      },
      redactConfirmBody: {
        one: "Permanently remove the content under {count} redaction mark. This cannot be undone.",
        other: "Permanently remove the content under {count} redaction marks. This cannot be undone."
      },
      redactConfirmCollateral: {
        one: "{count} other annotation will also be removed.",
        other: "{count} other annotations will also be removed."
      },
      redactApply: "Apply",
      redactApplying: "Applying…",
      formatLabel: "Format",
      fieldSettingsTitle: "Field",
      fieldOptionLabel: "Label",
      fieldOptionValue: "Value",
      fieldOptionAdd: "Add option",
      fieldOptionRemove: "Remove option",
      fieldNone: "None",
      redactLabelTitle: "Redaction label",
      redactLabelPlaceholder: "e.g. REDACTED",
      redactLabelRepeat: "Repeat label across region",
      stampsAll: "All stamps",
      stampsLoading: "Loading stamps…",
      stampsEmpty: "No stamps yet. Import a PDF to turn each of its pages into a stamp.",
      stampsRemoveStamp: "Remove stamp",
      stampsArmedHint: "Click a page to place the stamp.",
      stampsImport: "Import PDF…",
      stampsImporting: "Importing…",
      stampsImportHint: "Import a PDF as a stamp library — each page becomes one stamp.",
      stampsRemoveLibrary: "Remove library",
      stampsExportLibrary: "Export library as PDF",
      stampsCustomLibrary: "My stamps",
      stampsCustomLabel: "Custom stamp",
      stampsError: "The built-in stamps could not be loaded.",
      stampsArmError: "That stamp could not be armed.",
      stampsImportError: "That PDF could not be imported as a stamp library.",
      quickStampsLabel: "Quick stamps",
      signaturesEmpty: "No signatures yet. Create one to sign with.",
      signaturesNew: "New signature…",
      signaturesArmedHint: "Click a signature field to sign it, or anywhere on a page to place the mark.",
      signaturesTargetHint: "Pick a mark for the selected field.",
      signaturesInDocument: "In this document",
      signaturesNone: "This document has no signature fields.",
      signaturesValidate: "Validate",
      signaturesValidating: "Validating…",
      signaturesSigned: "Signed",
      signaturesUnsigned: "Unsigned",
      signaturesRename: "Rename",
      signaturesRemove: "Remove",
      signaturesExport: "Export as PDF",
      signaturesAddInitials: "Add initials",
      signatureLabel: "Signature",
      initialsLabel: "Initials",
      makerTitle: "New signature",
      makerName: "Name",
      makerNamePlaceholder: "Your name",
      makerDraw: "Draw",
      makerType: "Type",
      makerUpload: "Upload",
      makerTypePlaceholder: "Type your name",
      makerFont: "Font",
      makerUploadHint: "Choose a PNG, JPEG, or one-page PDF",
      makerClear: "Clear",
      makerOptional: "(optional)",
      makerSave: "Save",
      makerSaving: "Saving…",
      makerError: "The signature could not be saved.",
      signTitle: "Sign this field",
      signReason: "Reason",
      signLocation: "Location",
      signKind: "What may change afterwards",
      signKindApproval: "Approval signature — form filling and more signatures stay valid",
      signKindCertifyAnnotate: "Certify — allow comments, form filling and signatures",
      signKindCertifyFill: "Certify — allow form filling and signatures only",
      signKindCertifyLocked: "Certify — allow no changes",
      signButton: "Sign",
      signSigning: "Signing…",
      signFill: "Place without signing",
      signError: "The field could not be signed.",
      inspectTitle: "Signature",
      inspectSigner: "Signed by",
      inspectReason: "Reason",
      inspectLocation: "Location",
      inspectTime: "Time",
      inspectIntegrity: "Document",
      inspectCryptography: "Signature",
      inspectTrust: "Signer",
      inspectChanges: "Changes since",
      inspectDownload: "Download signed version",
      verdictValid: "Valid",
      verdictValidUntrusted: "Valid, signer not trusted",
      verdictInvalid: "Invalid — modified after signing",
      verdictWillInvalidate: "Valid, invalid once saved",
      signaturesInvalidating: "This change will invalidate {field} when the document is saved. Undo it to keep the signature.",
      verdictIndeterminate: "Could not be verified",
      verdictUnchanged: "None",
      verdictRestored: "Changed, then restored",
      inspectLaterRevisions: "Revisions after signing",
      verdictPermitted: "Permitted",
      verdictForbidden: "Not permitted"
    }
  }
}, Ms = {
  de: () => import("./de-Brfb8qPY-DjSVSg7f.js").then((e) => e.de),
  fr: () => import("./fr-CxJ-h5zO-Ct_Z5wYg.js").then((e) => e.fr),
  es: () => import("./es-MfgrlNdR-DW332Lm9.js").then((e) => e.es),
  it: () => import("./it-B0rNVsFK-C9JKRTCT.js").then((e) => e.it),
  nl: () => import("./nl-DMicqqYw-jDRpgMWC.js").then((e) => e.nl),
  pt: () => import("./pt-DyQ0sdQk-DbzdajDg.js").then((e) => e.pt),
  pl: () => import("./pl-BrqfUcaS-BK8oIkBd.js").then((e) => e.pl),
  sv: () => import("./sv-BU7Kv6y9-DVYIsZF9.js").then((e) => e.sv),
  ja: () => import("./ja-NIsVo9eS-TU5VOOvE.js").then((e) => e.ja),
  "zh-CN": () => import("./zh-cn-CJUxCiaS-DJhfzusu.js").then((e) => e.zhCN),
  "zh-TW": () => import("./zh-tw-C8JAsPYs-Ct2GX9YM.js").then((e) => e.zhTW),
  ko: () => import("./ko-DGQjyIlu-BBjTyYlT.js").then((e) => e.ko),
  ar: () => import("./ar-8tnB9ZtN-6jbI8wNW.js").then((e) => e.ar),
  he: () => import("./he-DdQ5RKLM-DWlzNFC0.js").then((e) => e.he)
}, Ps = (e, t, n = "en") => la(t, e !== "auto" ? [e] : typeof navigator < "u" ? navigator.languages : []) ?? n, t1 = (e, t) => e === void 0 ? "en" : la(t, [e]), zr = (e) => typeof e == "object" && e !== null;
function So(e, t) {
  const n = { ...e };
  for (const [o, r] of Object.entries(t)) {
    const a = o.split(".");
    let s = n;
    for (let c = 0; c < a.length - 1; c++) {
      const p = s[a[c]];
      s = s[a[c]] = zr(p) ? { ...p } : {};
    }
    const l = a[a.length - 1], d = s[l];
    s[l] = typeof r == "string" ? r : So(zr(d) ? d : {}, r);
  }
  return n;
}
const Jn = (e, t) => t ? {
  ...e,
  translations: So(e.translations, t)
} : e, wr = (e) => typeof e == "function", n1 = (e) => zr(e.default) ? e.default : e;
function o1(e) {
  const t = e.filter((o) => !wr(o)).reduce((o, r) => So(o ?? {}, r), void 0);
  return e.some(wr) ? {
    words: t,
    load: () => Promise.all(e.map((o) => wr(o) ? o().then(n1) : Promise.resolve(o))).then((o) => o.reduce(So, {}))
  } : {
    words: t,
    load: void 0
  };
}
const r1 = /* @__PURE__ */ new Set([
  "Adlm",
  "Arab",
  "Aran",
  "Hebr",
  "Mand",
  "Mend",
  "Nkoo",
  "Rohg",
  "Samr",
  "Syrc",
  "Thaa",
  "Yezi"
]);
function a1(e) {
  try {
    const { script: t } = new Intl.Locale(e).maximize();
    return t !== void 0 && r1.has(t) ? "rtl" : "ltr";
  } catch {
    return "ltr";
  }
}
function i1(e) {
  try {
    return new Intl.DisplayNames([e], { type: "language" }).of(e) ?? e;
  } catch {
    return e;
  }
}
function s1(e = {}) {
  const t = ["en", ...Object.keys(Ms)], n = (d) => t.find((c) => c.toLowerCase() === d.toLowerCase()), o = /* @__PURE__ */ new Map();
  for (const [d, c] of Object.entries(e)) {
    const p = n(d) ?? d;
    o.set(p, [...o.get(p) ?? [], c]);
  }
  const r = new Map([...o].map(([d, c]) => [d, o1(c)])), a = r.get("en"), s = [Jn(Ss, a?.words)], l = {};
  if (a?.load) {
    const d = a.load;
    l.en = () => d().then((c) => Jn(Ss, c));
  }
  for (const [d, c] of Object.entries(Ms)) {
    const p = r.get(d), f = p?.load, u = p?.words;
    l[d] = f ? () => Promise.all([c(), f()]).then(([m, b]) => Jn(m, b)) : u ? () => c().then((m) => Jn(m, u)) : c;
  }
  for (const [d, { words: c, load: p }] of r) {
    if (n(d) !== void 0) continue;
    const f = {
      code: d,
      name: i1(d),
      direction: a1(d)
    };
    p ? l[d] = () => p().then((u) => ({
      ...f,
      translations: u
    })) : s.push({
      ...f,
      translations: c ?? {}
    });
  }
  return {
    locales: s,
    loaders: l,
    codes: [.../* @__PURE__ */ new Set([...t, ...o.keys()])]
  };
}
const Fa = {
  stage: lt,
  thumbnails: yn,
  render: tn,
  link: ho,
  selection: An,
  search: rn,
  annotation: we,
  stamp: Pe,
  measurement: xt,
  redaction: gt,
  form: nn,
  signature: on,
  pageEdit: Do,
  metadata: gm,
  fonts: mm,
  outline: Lo,
  attachment: Ro,
  actions: wl,
  documents: Oe,
  interaction: Cn,
  commands: De,
  shell: K,
  i18n: En
}, l1 = Symbol.for("@embedpdf/viewer/kernel"), c1 = "this viewer is gone: it was unmounted, or mounted again with a new config. Use the viewer the new onReady gives you.", d1 = /^(?:on|register)(?:[A-Z]|$)/, u1 = (e) => {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
};
function p1(e, t) {
  let n = !1;
  const o = /* @__PURE__ */ new Set(), r = (h) => new mo("instance-closed", h, c1), a = (h) => {
    const g = () => {
      o.delete(g), h();
    };
    return o.add(g), g;
  }, s = /* @__PURE__ */ new WeakMap(), l = (h, g) => {
    const y = s.get(h);
    if (y) return y;
    const v = /* @__PURE__ */ new Map(), _ = (x, P) => d1.test(x) ? (...M) => {
      if (n) return () => {
      };
      const T = P.apply(h, M);
      return typeof T == "function" ? a(T) : T;
    } : uf(x) ? (...M) => {
      if (n) throw r(g);
      return P.apply(h, M);
    } : (...M) => n ? Promise.reject(r(g)) : P.apply(h, M), O = (x) => {
      const P = Reflect.get(h, x, h);
      if (typeof x == "symbol") return P;
      if (u1(P)) return l(P, g);
      if (typeof P != "function") return P;
      const M = v.get(x);
      if (M?.value === P) return M.member;
      const T = _(x, P);
      return v.set(x, {
        value: P,
        member: T
      }), T;
    }, S = new Proxy({}, {
      get: (x, P) => O(P),
      has: (x, P) => Reflect.has(h, P),
      ownKeys: () => Reflect.ownKeys(h),
      getOwnPropertyDescriptor: (x, P) => {
        const M = Reflect.getOwnPropertyDescriptor(h, P);
        return M && {
          configurable: !0,
          enumerable: M.enumerable,
          value: O(P)
        };
      }
    });
    return s.set(h, S), S;
  }, d = (h) => Object.prototype.hasOwnProperty.call(t, h) ? t[h] ?? null : null, c = (h) => {
    if (typeof h != "string") return h;
    const g = d(h);
    if (!g) throw new Error(`[embedpdf] the viewer has no plugin named "${h}". Its plugins: ${Object.keys(t).join(", ")}.`);
    return g;
  }, p = (h, g) => {
    try {
      return e.capability(h, g);
    } catch (y) {
      if (ci(y) || e.scopeOf(h) !== "document") throw y;
      const v = y instanceof Error ? y.message : String(y);
      throw new mo("not-ready", h.name, v, { cause: y });
    }
  }, f = (h) => {
    function g(v) {
      const _ = c(v);
      if (n) throw r(_.name);
      return l(p(_, h), _.name);
    }
    function y(v) {
      const _ = typeof v == "string" ? d(v) : v, O = _ && !n ? e.tryCapability(_, h) : null;
      return O === null ? null : l(O, _.name);
    }
    return {
      get: g,
      tryGet: y
    };
  }, u = (h, g, y = {}) => {
    if (n) return () => {
    };
    const { immediate: v = !1, isEqual: _ = Object.is } = y, O = g;
    let S = null;
    const x = () => {
      let P;
      try {
        P = h();
      } catch (T) {
        if (ci(T, "not-ready")) return;
        throw T;
      }
      if (S === null) {
        S = { value: P }, v && O(P, void 0);
        return;
      }
      if (_(S.value, P)) return;
      const M = S.value;
      S = { value: P }, O(P, M);
    };
    return x(), a(e.subscribe(x));
  }, m = {
    ...f(void 0),
    documents: l(e.documents, Oe.name),
    commands: l(e.capability(De), De.name),
    forDocument: f,
    watch: u
  };
  return Object.defineProperty(m, l1, { value: e }), {
    viewer: m,
    destroy: () => {
      if (!n) {
        n = !0;
        for (const h of [...o]) h();
      }
    }
  };
}
function f1(e) {
  let t = null;
  return {
    attach: (n) => (t?.kernel !== n && (t?.lifetime.destroy(), t = {
      kernel: n,
      lifetime: p1(n, e)
    }), t.lifetime.viewer),
    current: () => t?.lifetime.viewer ?? null,
    release: (n) => {
      t?.kernel === n && (t.lifetime.destroy(), t = null);
    }
  };
}
const m1 = [
  "standard",
  "quick",
  "sidebar"
], h1 = [
  "kinds",
  "fonts",
  "libraries"
], g1 = /* @__PURE__ */ new Set([
  "link",
  "pageEdit",
  "metadata",
  "fonts",
  "outline",
  "attachment",
  "documents",
  "shell"
]), b1 = (e) => Object.prototype.hasOwnProperty.call(Fa, e), Sd = (e) => typeof e == "object" && e !== null;
function Os(e) {
  if (!Sd(e)) return !1;
  const { id: t, create: n } = e;
  return typeof t == "string" && typeof n == "function";
}
function v1(e) {
  const t = {}, n = [], o = [];
  for (const [r, a] of Object.entries(e ?? {}))
    a !== void 0 && (b1(r) ? Os(a) ? o.push(`"${r}" is the viewer's own ${r} plugin: give it settings, or give your plugin a name of its own`) : g1.has(r) ? o.push(`the ${r} plugin takes no settings`) : !Sd(a) || Array.isArray(a) ? o.push(`the ${r} plugin's settings are an object`) : t[r] = a : Os(a) ? n.push({
      name: r,
      plugin: a
    }) : o.push(`"${r}" is not one of the viewer's plugins, and not a plugin definition` + Mu(r, Object.keys(Fa))));
  return t.i18n && (t.i18n = w1(t.i18n, o)), {
    settings: t,
    viewer: {
      stamp: Ts(t, "stamp", m1),
      signature: Ts(t, "signature", h1)
    },
    own: n,
    problems: o
  };
}
function w1(e, t) {
  const { fallbackLocale: n, ...o } = e;
  for (const r of Object.keys(o)) t.push(r === "locale" ? "the i18n plugin's locale is the viewer's `locale`" : `the i18n plugin's ${r} are the viewer's \`strings\`: give your words there`);
  return n === void 0 ? {} : { fallbackLocale: n };
}
function Ts(e, t, n) {
  const o = e[t];
  if (!o) return {};
  const r = {}, a = { ...o };
  for (const s of n)
    a[s] !== void 0 && (r[s] = a[s]), delete a[s];
  return e[t] = a, r;
}
function Cs(e, t) {
  return df(e, t);
}
function y1(e) {
  return e.screen ? "screen" : e.topLevel && e.popover ? "window" : null;
}
function Md(e) {
  const t = e.ownerDocument, n = t.defaultView;
  return {
    screen: t.fullscreenEnabled === !0 && typeof e.requestFullscreen == "function",
    topLevel: n !== null && n.top === n,
    popover: typeof e.showPopover == "function"
  };
}
const Pd = (e) => e.closest("[data-embedpdf-root]") ?? e, Ba = "data-epdf-fills-window";
function qt(e) {
  if (e.hasAttribute(Ba)) return "window";
  const t = e.getRootNode().host ?? null;
  return Rr(e) || t !== null && Rr(t) ? "screen" : null;
}
async function _1(e) {
  if (qt(e) !== null) return;
  const t = Md(e);
  if (t.screen) try {
    await e.requestFullscreen({ navigationUI: "hide" });
    return;
  } catch {
  }
  t.topLevel && t.popover && k1(e);
}
async function x1(e) {
  const t = qt(e);
  t === "window" ? Fr(e) : t === "screen" && await e.ownerDocument.exitFullscreen();
}
function k1(e) {
  e.setAttribute(Ba, ""), e.setAttribute("popover", "manual"), e.showPopover();
}
function Fr(e) {
  e.matches(":popover-open") && e.hidePopover(), e.removeAttribute("popover"), e.removeAttribute(Ba);
}
const S1 = {
  way: null,
  current: null
};
function M1(e) {
  const [t, n] = C(S1);
  return R(() => {
    const o = e.current;
    if (!o) return;
    const r = Pd(o), a = y1(Md(r)), s = () => {
      const c = qt(r);
      n((p) => p.way === a && p.current === c ? p : {
        way: a,
        current: c
      });
    }, l = (c) => {
      c.key !== "Escape" || c.defaultPrevented || nf(c) || qt(r) === "window" && (c.preventDefault(), Fr(r));
    }, d = r.ownerDocument;
    return s(), d.addEventListener("fullscreenchange", s), r.addEventListener("toggle", s), r.addEventListener("keydown", l), () => {
      d.removeEventListener("fullscreenchange", s), r.removeEventListener("toggle", s), r.removeEventListener("keydown", l), qt(r) === "window" && Fr(r);
    };
  }, [e]), t;
}
const P1 = "view:fullscreen";
function O1(e, t, n) {
  const o = t.current !== null, r = o || t.way === "screen" || t.way === "window" && !n;
  return {
    id: P1,
    labelKey: "commands.fullscreen",
    icon: o ? "fullscreenExit" : "fullscreen",
    visible: () => r,
    active: () => o,
    run: () => qt(e) === null ? _1(e) : x1(e)
  };
}
const Ka = (e) => typeof e == "object" && e !== null, T1 = (e) => e.side === "start" ? "start" : "end";
function C1(e, t) {
  return Object.entries(e.panels ?? {}).filter(([, n]) => Ka(n) && T1(n) === t).map(([n]) => n);
}
function E1(e, t, n) {
  const o = t.ids.filter((a) => t.shown.includes(a) && Ka(e[a])), r = o.filter((a) => e[a].open === !0 && !n.has(a));
  return t.current !== null ? {
    open: null,
    started: r
  } : {
    open: o.find((a) => t.docks(a) && (e[a].closable === !1 || r.includes(a))) ?? null,
    started: r
  };
}
const Es = (e, t, n, o) => t > 0 || n && !(e.tryGet(De)?.isCategoryDisabled(o) ?? !1), Ha = "search", Od = {
  categories: ["search"],
  allowed: (e) => e.tryGet(rn)?.canSearch() ?? !0,
  notAllowedKey: "commands.notAllowed.doc-text-search"
}, As = {
  id: "search:find",
  labelKey: "commands.find",
  icon: "search",
  shortcut: "Mod+F",
  shortcutInTextFields: !0,
  ...Od,
  run: (e) => e.tryGet(K)?.open(Ha, { focus: !0 })
}, A1 = /* @__PURE__ */ new Map([
  ["thumbnails", {
    titleKey: "panels.thumbnails",
    icon: "sidebar",
    categories: ["thumbnails"],
    allowed: (e) => e.tryGet(tn)?.canRenderThumbnail() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-render-thumbnail"
  }],
  ["outline", {
    titleKey: "panels.outline",
    icon: "listTree",
    categories: ["outline"],
    visible: (e) => {
      const t = e.tryGet(Lo);
      return t != null && Es(e, t.list().length, t.canEdit(), "outline.editing");
    }
  }],
  ["attachments", {
    titleKey: "panels.attachments",
    icon: "paperclip",
    categories: ["attachments"],
    visible: (e) => {
      const t = e.tryGet(Ro);
      return t != null && Es(e, t.list().length, t.canCreate(), "attachments.adding");
    }
  }],
  [Ha, {
    titleKey: "panels.search",
    icon: "search",
    ...Od,
    focus: !0
  }],
  ["comments", {
    titleKey: "panels.comments",
    icon: "comment",
    categories: ["comments"],
    allowed: (e) => e.tryGet(we)?.canRead() ?? !0,
    notAllowedKey: "commands.notAllowed.doc-annotate-read"
  }],
  ["style", {
    titleKey: "panels.style",
    icon: "palette",
    categories: ["annotations"]
  }],
  ["stamps", {
    titleKey: "panels.stamps",
    icon: "rubberStamp",
    categories: ["stamps"],
    allowed: (e) => e.tryGet(Pe)?.canPlace(e.documentId ?? void 0) ?? !0,
    notAllowedKey: "commands.notAllowed.annotations-create",
    visible: (e) => e.tryGet(Pe) != null
  }],
  ["signatures", {
    titleKey: "panels.signatures",
    icon: "signature",
    categories: ["signatures"],
    visible: (e) => e.tryGet(Pe) != null && e.tryGet(on) != null
  }],
  ["redaction", {
    titleKey: "panels.redaction",
    icon: "redactionSidebar",
    categories: ["redaction"],
    allowed: (e) => {
      const t = e.tryGet(gt);
      return t ? t.canMark() || t.canApply() : !0;
    }
  }],
  ["measurement", {
    titleKey: "panels.measurement",
    icon: "updateScale",
    categories: ["measurement"],
    allowed: (e) => {
      const t = e.tryGet(xt), n = e.tryGet(we);
      return t ? t.canCalibrate() || (n?.canCreate() ?? !0) : !0;
    }
  }],
  ["form-design", {
    titleKey: "panels.formDesign",
    icon: "formDesign",
    categories: ["forms.building"],
    allowed: (e) => e.tryGet(nn)?.canDesign() ?? !0,
    visible: (e) => e.tryGet(K)?.isOpen("mode:form") ?? !1
  }]
]), N1 = (e, t, n) => n ? { panel: t ? {
  id: e,
  focus: t
} : e } : {
  run: (o) => o.tryGet(K)?.open(e, t ? { focus: t } : void 0),
  active: (o) => o.tryGet(K)?.isOpen(e) ?? !1
};
function I1(e, t) {
  return Object.entries(e ?? {}).flatMap(([n, o]) => {
    const r = It(n);
    if (!Ka(o)) return [];
    const a = n === Ha && !t(As.id) ? [As] : [];
    if (t(r)) return a;
    const s = A1.get(n), { focus: l, titleKey: d, icon: c, ...p } = s ?? {}, f = o.titleKey ?? (o.title === void 0 ? s?.titleKey : void 0);
    return [{
      id: r,
      label: o.title ?? (f === void 0 ? n : void 0),
      labelKey: f,
      icon: o.icon ?? s?.icon,
      ...N1(n, l, o.closable !== !1),
      ...p
    }, ...a];
  });
}
const L1 = (e, t) => e === t || JSON.stringify(e ?? {}) === JSON.stringify(t ?? {}), R1 = 2e3;
function D1(e, t) {
  const { start: n = [], center: o = [], end: r = [] } = e.sections;
  return [
    ...n,
    ...o,
    ...r
  ].some((a) => a.items.some((s) => typeof s == "object" && "slot" in s && s.slot === t));
}
function $1(e, t) {
  return t === null ? !1 : e ?? D1(t, "page-number");
}
function z1(e, t) {
  const n = Q(lt), [o, r] = C(!1);
  return E(() => {
    const a = t.current;
    if (!e || !a) return;
    let s = !1, l;
    const d = () => {
      const g = xn(a.ownerDocument);
      return s || g !== null && a.contains(g) && g.matches(":focus-visible") || a.querySelector('[aria-expanded="true"]') !== null;
    }, c = () => {
      r(!1), clearTimeout(l), l = setTimeout(p, R1);
    };
    function p() {
      d() ? c() : r(!0);
    }
    const f = () => {
      s = !0, c();
    }, u = () => {
      s = !1, c();
    }, m = a.closest("[data-float]")?.offsetParent ?? null, b = {
      capture: !0,
      passive: !0
    };
    m?.addEventListener("pointermove", c, b), m?.addEventListener("pointerdown", c, b), a.addEventListener("pointerenter", f), a.addEventListener("pointerleave", u), a.addEventListener("focusin", c);
    const h = n?.onCameraChanged(c);
    return c(), () => {
      h?.(), m?.removeEventListener("pointermove", c, b), m?.removeEventListener("pointerdown", c, b), a.removeEventListener("pointerenter", f), a.removeEventListener("pointerleave", u), a.removeEventListener("focusin", c), clearTimeout(l), r(!1);
    };
  }, [
    e,
    n,
    t
  ]), o;
}
function F1(e) {
  const [t, n] = C(qb);
  return R(() => {
    const o = e.current;
    if (!o) return;
    const r = () => {
      const l = Rc(o.getBoundingClientRect(), $c(o));
      n((d) => Yb(d, l) ? d : l);
    };
    r();
    const a = new ResizeObserver(r);
    a.observe(o);
    const s = Io(r);
    return () => {
      s(), a.disconnect();
    };
  }, [e]), t;
}
const Td = "(pointer: coarse)", B1 = () => typeof matchMedia == "function" && matchMedia(Td).matches, Ns = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]);
function Is(e, t) {
  const n = k(e);
  return n.current !== e && !t(n.current, e) && (n.current = e), n.current;
}
const Ls = [
  "compact",
  "medium",
  "expanded"
];
function K1(e, t) {
  const n = [], o = (r) => r === void 0 || r === "auto";
  return !o(e) && !Ls.includes(e) && n.push(`size: ${JSON.stringify(e)} is not auto, compact, medium or expanded; the viewer measures its width`), !o(t) && typeof t != "boolean" && n.push(`touch: ${JSON.stringify(t)} is not auto, true or false; the viewer asks the browser`), {
    size: Ls.includes(e) ? e : null,
    touch: typeof t == "boolean" ? t : null,
    problems: n
  };
}
function H1(e, t) {
  const n = vc((p) => p.direction), [o, r] = C(null), [a, s] = C(B1);
  R(() => {
    const p = e.current;
    return p ? sa(p, (f) => r(Math.round(f))) : void 0;
  }, [e]);
  const l = t.touch === null;
  E(() => {
    if (!l || typeof matchMedia != "function") return;
    const p = matchMedia(Td), f = () => s(p.matches);
    return p.addEventListener("change", f), () => p.removeEventListener("change", f);
  }, [l]);
  const d = t.size, c = t.touch ?? a;
  return H(() => o === null ? null : {
    size: d ?? fu(o),
    width: o,
    touch: c,
    dir: n
  }, [
    o,
    d,
    c,
    n
  ]);
}
function j1({ className: e, rootRef: t, children: n }) {
  const o = k(null), r = t ?? o, a = $b(), [s] = C(() => K1(a.size, a.touch));
  E(() => {
    for (const _ of s.problems) console.warn(`[embedpdf] ${_}`);
  }, [s]);
  const l = H1(r, s), d = l ?? Ma, c = Db(), p = H(() => mu(c, Ob, d), [c, d]), f = p.toJSON(), u = ke(), m = ye() ?? void 0, b = ie(() => vu(f, (_) => u.resolveCommand(_, m)), Ns), h = k(/* @__PURE__ */ new Map()), g = H(() => {
    const _ = (T, L) => {
      const A = JSON.stringify(L), F = h.current.get(T);
      return F?.key === A ? F.value : (h.current.set(T, {
        key: A,
        value: L
      }), L);
    }, O = new Set(b), S = /* @__PURE__ */ new Map();
    for (const T of Object.keys(f.bars ?? {})) S.set(T, _(`bar:${T}`, nl(f, T, { omit: O })));
    const x = (T) => S.get(T) ?? null, P = {
      selection: _("strip:selection", lo(f, "selection", x)),
      annotation: _("strip:annotation", lo(f, "annotation", x)),
      snapshot: _("strip:snapshot", lo(f, "snapshot", x))
    }, M = /* @__PURE__ */ new Map();
    for (const T of Object.keys(f.menus ?? {})) M.set(T, _(`menu:${T}`, tl(f, T)));
    return {
      data: f,
      env: d,
      bar: x,
      strip: (T) => P[T],
      menu: (T) => M.get(T) ?? null
    };
  }, [
    f,
    d,
    b
  ]), y = ie(() => el(f).map(po).filter((_) => !b.includes(_) && u.resolveCommand(_, m)?.visible === !0), Ns);
  U1(Is(ob(f), rb)), G1(Is(f.panels, L1)), V1(y), q1(l === null ? null : p);
  const v = F1(r);
  return W1(r, v.top && v.right && v.bottom && v.left), /* @__PURE__ */ i("div", {
    ref: r,
    tabIndex: -1,
    [Zb]: "",
    dir: d.dir,
    "data-touch": d.touch ? "" : void 0,
    className: e,
    style: Dc(v),
    children: /* @__PURE__ */ i(Bb, {
      value: g,
      children: n
    })
  });
}
function U1(e) {
  const t = ke(), n = Oa();
  R(() => {
    const o = ab(e, (r) => t.hasCommand(r) && !n.isYours(r)).map(n.over);
    return o.length > 0 ? t.registerCommands(o, { replace: !0 }) : void 0;
  }, [
    t,
    e,
    n
  ]);
}
function G1(e) {
  const t = ke(), n = Oa();
  R(() => {
    const o = I1(e, (r) => t.hasCommand(r) && !n.isYours(r)).map(n.over);
    return o.length > 0 ? t.registerCommands(o, { replace: !0 }) : void 0;
  }, [
    t,
    e,
    n
  ]);
}
function W1(e, t) {
  const n = ke(), o = Oa(), r = M1(e);
  R(() => {
    const a = e.current;
    if (!a) return;
    const s = O1(Pd(a), r, t);
    return n.registerCommands([o.over(s)], { replace: !0 });
  }, [
    n,
    o,
    e,
    r,
    t
  ]);
}
function V1(e) {
  const t = ke(), n = Q(K), o = oe(K, _o, null);
  E(() => {
    o === null || e.includes(o) || (n?.close(o), t.execute(ol).catch(() => {
    }));
  }, [
    t,
    n,
    o,
    e
  ]);
}
function q1(e) {
  const t = ke(), n = k(/* @__PURE__ */ new Set());
  E(() => {
    if (e === null) return;
    const o = hu(e, {
      commands: t.listCommandIds(),
      hasCommand: (r) => t.hasCommand(r)
    });
    for (const r of o)
      n.current.has(r) || (n.current.add(r), console.warn(`[embedpdf] layout: ${r}`));
  }, [t, e]);
}
const Y1 = {
  top: {
    start: "top-start",
    middle: "top",
    end: "top-end"
  },
  sides: {
    start: "start",
    middle: null,
    end: "end"
  },
  bottom: {
    start: "bottom-start",
    middle: "bottom",
    end: "bottom-end"
  }
}, rt = {
  insetStart: 0,
  insetEnd: 0,
  offset: 0
}, ht = (e) => e !== null && e.width > 0;
function X1(e, t, n, o) {
  const r = n + t / 2, a = e - o - t / 2;
  if (r > a) return null;
  const s = Math.min(Math.max(e / 2, r), a), l = Math.min(s - n, e - o - s);
  return {
    insetStart: s - l,
    insetEnd: e - s - l,
    offset: 0
  };
}
function Z1({ length: e, gap: t, start: n, middle: o, end: r }) {
  const a = ht(n) ? n.width + t : 0, s = ht(r) ? r.width + t : 0, l = ht(o) ? X1(e, o.width, a, s) : null, d = ht(o) && l === null ? o.height + t : 0, c = ht(n) && ht(r) && n.width + t + r.width > e;
  return {
    start: {
      ...rt,
      offset: d
    },
    middle: l ?? rt,
    end: {
      ...rt,
      offset: d + (c ? n.height + t : 0)
    }
  };
}
function J1({ length: e, gap: t, start: n, end: o }) {
  return ht(n) && ht(o) && n.width + t + o.width > e ? {
    start: {
      ...rt,
      offset: o.height + t
    },
    middle: rt,
    end: {
      ...rt,
      offset: n.height + t
    }
  } : {
    start: rt,
    middle: rt,
    end: rt
  };
}
function ja(e) {
  const t = ke(), n = ye() ?? void 0, o = H(() => e ? Jr(e) : null, [e]);
  return ie(() => o !== null && ku(o, (r) => {
    const a = Su(r);
    return a !== null && t.resolveCommand(a, n)?.visible === !0;
  }));
}
function Ua(e) {
  const { data: t } = tt(), n = oe(K, _o, null);
  return e.filter((o) => {
    const r = t.bars?.[o]?.mode;
    return r === void 0 || n === po(r);
  });
}
const Q1 = {
  top: "border-b",
  bottom: "border-t",
  start: "border-e",
  end: "border-s"
};
function ew({ id: e, edge: t, rides: n }) {
  const o = tt().bar(e), r = ja(o);
  if (!o || !r) return null;
  const a = t === "start" || t === "end";
  return /* @__PURE__ */ i($n, {
    value: t,
    children: /* @__PURE__ */ i("div", {
      part: Wo(e),
      "data-bar": e,
      className: `border-border flex shrink-0 ${a ? "flex-col px-2 py-4" : "items-center px-4 py-2"} ${n ? "bg-surface-alt" : "bg-surface"} ${Q1[t]}`,
      children: /* @__PURE__ */ i($a, {
        bar: o,
        orientation: a ? "vertical" : "horizontal",
        className: a ? "min-h-0 flex-1" : "w-full"
      })
    })
  });
}
function Qn({ edge: e }) {
  const { data: t } = tt(), n = Ua(H(() => gu(t, e), [t, e]));
  return /* @__PURE__ */ i(D, { children: (e === "top" || e === "start" ? n : [...n].reverse()).map((o) => /* @__PURE__ */ i(ew, {
    id: o,
    edge: e,
    rides: pu(t.bars?.[o]?.place) !== null
  }, o)) });
}
const Rs = {
  "top-start": "start",
  top: "center",
  "top-end": "end",
  start: "start",
  end: "end",
  "bottom-start": "start",
  bottom: "center",
  "bottom-end": "end"
}, tw = [
  "start",
  "center",
  "end"
], nw = (e) => e.startsWith("bottom") ? "float-bottom" : "float-top";
function ow(e, t) {
  const n = [
    ...e.sections.start ?? [],
    ...e.sections.center ?? [],
    ...e.sections.end ?? []
  ];
  return {
    id: e.id,
    sections: { [t]: n }
  };
}
const Cd = be(() => {
});
function rw({ id: e, position: t }) {
  const { data: n, bar: o } = tt(), r = o(e), a = ja(r), s = H(() => r ? ow(r, Rs[t]) : null, [r, t]), l = k(null), d = s !== null && a;
  E(() => d && l.current ? ta(l.current) : void 0, [d]);
  const c = z1(d && $1(_u(n, e), r), l), p = X(Cd);
  return R(() => {
    let f = null;
    if (l.current?.querySelectorAll(':scope > [role="toolbar"] > div')?.forEach((m, b) => {
      tw[b] === Rs[t] ? (m.setAttribute("part", Wo(e)), f = m) : m.removeAttribute("part");
    }), f === null) return;
    const u = sa(f, (m) => p(e, m));
    return () => {
      u(), p(e, null);
    };
  }, [
    d,
    t,
    e,
    p
  ]), d ? /* @__PURE__ */ i($n, {
    value: nw(t),
    children: /* @__PURE__ */ i("div", {
      ref: l,
      "data-bar": e,
      "data-idle-hidden": c ? "" : void 0,
      className: "flex w-full",
      children: /* @__PURE__ */ i($a, {
        bar: s,
        className: "float-pill:pointer-events-auto float-pill:rounded-lg float-pill:border float-pill:border-border-subtle float-pill:bg-elevated/95 float-pill:p-0.5 float-pill:shadow-lg pointer-events-none w-full"
      })
    })
  }) : null;
}
const aw = 8, _t = 20, iw = [
  "top",
  "sides",
  "bottom"
], sw = [
  "start",
  "middle",
  "end"
], lw = {
  top: { top: _t },
  sides: {
    top: _t,
    bottom: _t,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  bottom: { bottom: _t }
}, cw = (e, t) => e === "top" || e === "sides" && t === "end" ? "paddingTop" : "paddingBottom";
function dw() {
  const e = k(null), [t, n] = C(0);
  return R(() => e.current ? sa(e.current, n) : void 0, []), /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("div", {
    ref: e,
    "aria-hidden": !0,
    className: "pointer-events-none absolute top-0 h-0",
    style: {
      insetInlineStart: _t,
      insetInlineEnd: _t
    }
  }), iw.map((o) => /* @__PURE__ */ i(fw, {
    row: o,
    length: t
  }, o))] });
}
const uw = {
  start: null,
  middle: null,
  end: null
}, pw = (e, t) => e === t || e !== null && t !== null && Math.abs(e.width - t.width) <= 0.5 && Math.abs(e.height - t.height) <= 0.5;
function fw({ row: e, length: t }) {
  const { data: n } = tt(), o = Y1[e], [r, a] = C(uw), s = Ve((d, c) => a((p) => pw(p[d], c) ? p : {
    ...p,
    [d]: c
  }), []), l = (e === "sides" ? J1 : Z1)({
    length: t,
    gap: aw,
    ...r
  });
  return /* @__PURE__ */ i(D, { children: sw.map((d) => {
    const c = o[d];
    return c === null ? null : /* @__PURE__ */ i(mw, {
      row: e,
      slot: d,
      position: c,
      stack: bu(n, c),
      spot: l[d],
      onColumn: s
    }, c);
  }) });
}
function mw({ row: e, slot: t, position: n, stack: o, spot: r, onColumn: a }) {
  const s = Ua(o), l = k(null), [d, c] = C(0), [p, f] = C(() => /* @__PURE__ */ new Map()), u = Ve((h, g) => f((y) => {
    const v = y.get(h);
    if (g === null ? v === void 0 : v !== void 0 && Math.abs(v - g) <= 0.5) return y;
    const _ = new Map(y);
    return g === null ? _.delete(h) : _.set(h, g), _;
  }), []), m = o.length > 0;
  R(() => m && l.current ? of(l.current, c) : void 0, [m]);
  const b = Math.max(0, ...p.values());
  return R(() => {
    a(t, b > 0 ? {
      width: b,
      height: d
    } : null);
  }, [
    a,
    t,
    b,
    d
  ]), R(() => () => a(t, null), [a, t]), m ? /* @__PURE__ */ i("div", {
    "data-float": n,
    className: "pointer-events-none absolute",
    style: {
      ...lw[e],
      insetInlineStart: _t + r.insetStart,
      insetInlineEnd: _t + r.insetEnd,
      [cw(e, t)]: r.offset
    },
    children: /* @__PURE__ */ i("div", {
      ref: l,
      className: `flex gap-2 ${e === "bottom" ? "flex-col-reverse" : "flex-col"}`,
      children: /* @__PURE__ */ i(Cd.Provider, {
        value: u,
        children: s.map((h) => /* @__PURE__ */ i(rw, {
          id: h,
          position: n
        }, h))
      })
    })
  }) : null;
}
function hw({ id: e }) {
  const t = tt().bar(e), n = ja(t);
  return !t || !n ? null : /* @__PURE__ */ i($n, {
    value: "top",
    children: /* @__PURE__ */ i("div", {
      part: Wo(e),
      "data-bar": e,
      className: "border-border-subtle flex shrink-0 items-center border-b p-2",
      children: /* @__PURE__ */ i($a, {
        bar: t,
        gap: 4,
        className: "w-full"
      })
    })
  });
}
function gw({ panel: e }) {
  const { data: t } = tt();
  return /* @__PURE__ */ i(D, { children: Ua(H(() => wu(t, e), [t, e])).map((n) => /* @__PURE__ */ i(hw, { id: n }, n)) });
}
async function bw(e) {
  if (e.data) return new Uint8Array(e.data);
  if (!e.url) throw new Error("a font needs a url or its data");
  const t = await fetch(e.url);
  if (!t.ok) throw new Error(`${e.url}: HTTP ${t.status}`);
  return new Uint8Array(await t.arrayBuffer());
}
function vw() {
  const e = ct(), t = jb();
  return E(() => {
    if (!t.length) return;
    if (!hl(e.engine)) {
      console.warn("[embedpdf] the `fonts` setting is ignored: only a local engine takes an app’s fonts. A cloud engine’s fonts are its server’s.");
      return;
    }
    const n = e.engine.fonts;
    let o = !1;
    const r = t.map((a) => bw(a));
    return (async () => {
      for (const [a, s] of t.entries()) try {
        const l = await r[a];
        if (o) return;
        await n.register({
          key: s.key,
          familyName: s.familyName,
          weight: s.weight,
          italic: s.italic,
          data: l
        });
      } catch (l) {
        console.warn(`[embedpdf] font "${s.key}" was not registered:`, l);
      }
    })(), () => {
      o = !0;
    };
  }, [e, t]), null;
}
const Ed = [];
function fe(e, { shownWhile: t, prefetch: n = !0 } = {}) {
  let o = null;
  const r = () => o ?? (o = e().catch((l) => {
    throw o = null, l;
  }));
  n && Ed.push(r);
  const a = Gl(async () => ({ default: await r() })), s = (l) => /* @__PURE__ */ i(bn, {
    fallback: null,
    children: /* @__PURE__ */ i(a, { ...l })
  });
  return t ? function(d) {
    return t() ? /* @__PURE__ */ i(s, { ...d }) : null;
  } : s;
}
const ww = 1e4, yw = 1e3;
function _w(e) {
  if (typeof requestIdleCallback == "function") {
    const n = requestIdleCallback(e, { timeout: ww });
    return () => cancelIdleCallback(n);
  }
  const t = setTimeout(e, yw);
  return () => clearTimeout(t);
}
let pn = "not-yet";
function xw() {
  if (pn !== "not-yet") return () => {
  };
  pn = "running";
  const e = [...Ed];
  let t = () => {
  }, n = !1;
  const o = () => {
    const r = e.shift();
    if (!n) {
      if (!r) {
        pn = "done";
        return;
      }
      t = _w(() => {
        r().catch(() => {
        }).finally(o);
      });
    }
  };
  return o(), () => {
    n = !0, t(), pn === "running" && (pn = "not-yet");
  };
}
function kw() {
  return E(() => xw(), []), null;
}
function Sw({ cmd: e, run: t, emphasis: n }) {
  const o = ve(Vt(e)), r = (a) => /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...o.trigger,
    type: "button",
    onClick: t,
    disabled: !e.enabled,
    "aria-pressed": e.pressable ? a : void 0,
    "aria-haspopup": e.menu ? "menu" : void 0,
    "aria-expanded": e.menu ? a : void 0,
    "aria-label": e.label,
    part: Se(a, n),
    className: Re(a, e.enabled, n),
    children: e.icon && /* @__PURE__ */ i(q, {
      name: e.icon,
      size: 20,
      accent: e.iconAccent,
      className: Qt(e.icon)
    })
  }), o.element] });
  return e.menu ? /* @__PURE__ */ i(Uo, {
    menuId: e.menu,
    children: r
  }) : r(e.active);
}
function Ga({ bar: e, view: t, label: n }) {
  const o = H(() => wd(e), [e]);
  return /* @__PURE__ */ i($n, {
    value: "selection",
    children: /* @__PURE__ */ i("div", {
      role: "toolbar",
      "aria-label": n,
      part: Wo(e.id),
      className: "border-border-subtle bg-elevated flex items-center gap-1 rounded-lg border p-1 shadow-xl",
      children: t.groups.map((r, a) => /* @__PURE__ */ i(D, { children: [a > 0 && /* @__PURE__ */ i("span", {
        "aria-hidden": !0,
        className: "bg-border h-5 w-px"
      }), r.commands.map((s) => /* @__PURE__ */ i(Sw, {
        cmd: s,
        run: () => t.execute(s.id),
        emphasis: o.has(s.id) ? "primary" : void 0
      }, s.id))] }, r.id))
    })
  });
}
const Mw = fe(() => import("./link-editor-CVY83aSe-Ceo9-oRp.js").then((e) => e.LinkEditorCard));
function Pw() {
  const e = Z(), t = Pa("annotation"), n = Aa(t), o = Qe("link-editor"), r = Yh((a) => a.selected);
  return E(() => {
    !r.length && o.isOpen && o.close();
  }, [r.length, o.isOpen]), !t || !n ? null : /* @__PURE__ */ i(Jh, {
    placement: "bottom",
    gap: 15,
    children: o.isOpen ? /* @__PURE__ */ i(Mw, { onClose: o.close }) : /* @__PURE__ */ i(Ga, {
      bar: t,
      view: n,
      label: e("commands.annotate.strip")
    })
  });
}
function Ow() {
  const e = ye(), { unlock: t, close: n } = wa(), o = Fo((b) => b.documents), r = Z(), [a, s] = C(""), [l, d] = C(!1), [c, p] = C(!1), f = o.find((b) => b.id === e);
  if (!e || !f) return null;
  const u = l || f.passwordProvided === !0, m = async () => {
    if (!(c || !a.trim())) {
      p(!0);
      try {
        await t(e, { password: a });
      } catch {
        d(!0), s("");
      } finally {
        p(!1);
      }
    }
  };
  return /* @__PURE__ */ i("div", {
    className: "bg-app flex h-full w-full items-center justify-center p-8",
    children: /* @__PURE__ */ i("div", {
      className: "bg-surface border-border w-full max-w-sm rounded-xl border p-6 shadow-lg",
      children: [
        /* @__PURE__ */ i("div", {
          className: "flex flex-col items-center text-center",
          children: [
            /* @__PURE__ */ i("div", {
              className: "bg-accent-light mb-4 rounded-full p-4",
              children: /* @__PURE__ */ i(q, {
                name: "lock",
                size: 28,
                className: "text-accent"
              })
            }),
            /* @__PURE__ */ i("h3", {
              className: "text-fg text-lg font-semibold",
              children: r("passwordPrompt.title")
            }),
            f.name && /* @__PURE__ */ i("p", {
              className: "text-fg-muted mt-1 text-sm",
              children: f.name
            })
          ]
        }),
        /* @__PURE__ */ i("p", {
          className: "text-fg-secondary mt-4 text-center text-sm",
          children: r(u ? "passwordPrompt.incorrect" : "passwordPrompt.required")
        }),
        /* @__PURE__ */ i("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ i("label", {
            className: "text-fg mb-1.5 block text-sm font-medium",
            htmlFor: "doc-password",
            children: r("passwordPrompt.label")
          }), /* @__PURE__ */ i("input", {
            id: "doc-password",
            type: "password",
            value: a,
            onChange: (b) => s(b.target.value),
            onKeyDown: (b) => b.key === "Enter" && void m(),
            disabled: c,
            placeholder: r("passwordPrompt.placeholder"),
            className: "bg-surface border-border focus:border-accent focus:ring-accent text-fg placeholder:text-fg-muted block w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 disabled:opacity-50",
            autoFocus: !0
          })]
        }),
        u && /* @__PURE__ */ i("div", {
          className: "mt-3 flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500/10 p-3",
          children: [/* @__PURE__ */ i(q, {
            name: "alertTriangle",
            size: 16,
            className: "flex-shrink-0 text-red-500"
          }), /* @__PURE__ */ i("p", {
            className: "text-sm text-red-500",
            children: r("passwordPrompt.incorrectWarning")
          })]
        }),
        /* @__PURE__ */ i("div", {
          className: "mt-6 flex gap-3",
          children: [/* @__PURE__ */ i("button", {
            type: "button",
            onClick: () => void n(e),
            disabled: c,
            className: "border-border text-fg-secondary hover:bg-hover flex-1 cursor-pointer rounded-md border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50",
            children: r("passwordPrompt.cancel")
          }), /* @__PURE__ */ i("button", {
            type: "button",
            onClick: () => void m(),
            disabled: c || !a.trim(),
            className: "bg-accent text-on-accent flex-1 cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
            children: r(c ? "passwordPrompt.opening" : "passwordPrompt.open")
          })]
        })
      ]
    })
  });
}
function Br(e) {
  switch (e?.code) {
    case "not-found":
      return "documentError.notFound";
    case "permission-denied":
      return "documentError.notAllowed";
    case "invalid-input":
      return "documentError.damaged";
    case "unsupported":
      return "documentError.unsupported";
    default:
      return "documentError.unknown";
  }
}
function Tw() {
  const e = ye(), { close: t, retry: n } = wa(), o = Fo((s) => s.documents), r = Z(), a = o.find((s) => s.id === e);
  return !e || !a ? null : /* @__PURE__ */ i("div", {
    className: "bg-app flex h-full w-full items-center justify-center p-8",
    children: /* @__PURE__ */ i("div", {
      role: "alert",
      className: "bg-surface border-border flex max-w-sm flex-col items-center rounded-xl border p-6 text-center shadow-lg",
      children: [
        /* @__PURE__ */ i("div", {
          className: "mb-4 rounded-full bg-red-500/10 p-4",
          children: /* @__PURE__ */ i(q, {
            name: "alertTriangle",
            size: 28,
            className: "text-red-500"
          })
        }),
        /* @__PURE__ */ i("h3", {
          className: "text-fg text-lg font-semibold",
          children: r("documentError.title")
        }),
        a.name && /* @__PURE__ */ i("p", {
          className: "text-fg-muted mt-1 text-sm",
          children: a.name
        }),
        /* @__PURE__ */ i("p", {
          className: "text-fg-secondary mt-2 text-sm",
          "data-epdf-error-reason": "",
          children: r(Br(a.error))
        }),
        /* @__PURE__ */ i("div", {
          className: "mt-5 flex w-full gap-3",
          children: [/* @__PURE__ */ i("button", {
            type: "button",
            onClick: () => void t(e),
            className: "border-border text-fg-secondary hover:bg-hover flex-1 cursor-pointer rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
            children: r("documentError.close")
          }), /* @__PURE__ */ i("button", {
            type: "button",
            onClick: () => void n(e).catch(() => {
            }),
            className: "bg-accent text-on-accent flex-1 cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-90",
            children: r("documentError.retry")
          })]
        })
      ]
    })
  });
}
function Cw({ className: e, children: t }) {
  const n = Z(), o = ke(), r = Ce(Nr), a = r.visible && r.enabled, s = k(0), [l, d] = C(!1), c = (f) => a && yc(f.dataTransfer), p = () => {
    s.current = 0, d(!1);
  };
  return /* @__PURE__ */ i("div", {
    className: e,
    onDragEnter: (f) => {
      c(f) && (f.preventDefault(), s.current += 1, d(!0));
    },
    onDragOver: (f) => {
      c(f) && (f.preventDefault(), f.dataTransfer.dropEffect = "copy");
    },
    onDragLeave: () => {
      s.current !== 0 && (s.current -= 1, s.current === 0 && d(!1));
    },
    onDrop: (f) => {
      if (p(), !c(f)) return;
      f.preventDefault(), f.stopPropagation();
      const u = Array.from(f.dataTransfer.files).filter(Sa);
      if (u.length === 0) return;
      const m = { files: u };
      o.execute(Nr, { args: m }).catch(() => {
      });
    },
    children: [t, l && /* @__PURE__ */ i("div", {
      "data-epdf-drop-target": "",
      className: "border-accent bg-accent-light/60 pointer-events-none absolute inset-2 z-40 grid place-items-center rounded-lg border-2 border-dashed",
      children: /* @__PURE__ */ i("span", {
        className: "bg-elevated text-fg rounded-full px-4 py-1.5 text-sm font-medium shadow-lg",
        children: n("dropToOpen.label", { fallback: "Drop a PDF to open it" })
      })
    })]
  });
}
function Ew() {
  const e = Qe(Sc);
  return e.isOpen ? /* @__PURE__ */ i(Aw, { onClose: e.close }) : null;
}
function Aw({ onClose: e }) {
  const t = Z(), n = Je(), o = Q(lt), r = Jt((f) => f.currentPageIndex + 1), a = Jt((f) => f.pageCount), [s, l] = C(() => String(r)), d = () => {
    const f = Number.parseInt(s, 10);
    Number.isFinite(f) && a > 0 && o?.goToPage(Math.min(Math.max(f, 1), a) - 1), e();
  }, [c, p = ""] = t("pageNumber.page", { params: {
    current: "",
    total: a
  } }).split("");
  return /* @__PURE__ */ i(za, {
    labelledBy: n,
    onClose: e,
    className: "border-border bg-surface w-80 rounded-lg border p-4 shadow-xl",
    children: /* @__PURE__ */ i("form", {
      onSubmit: (f) => {
        f.preventDefault(), d();
      },
      children: [
        /* @__PURE__ */ i("h2", {
          id: n,
          className: "text-fg text-base font-semibold",
          children: t("commands.page.goTo")
        }),
        /* @__PURE__ */ i("label", {
          className: "text-fg-secondary mt-3 flex items-center gap-2 text-sm",
          children: [
            c,
            /* @__PURE__ */ i("input", {
              type: "text",
              inputMode: "numeric",
              "aria-label": t("pageNumber.goToPage"),
              value: s,
              onChange: (f) => l(f.target.value.replace(/[^0-9]/g, "")),
              onFocus: (f) => f.currentTarget.select(),
              style: { width: `${String(a).length + 2}ch` },
              className: "border-border bg-surface text-fg focus:border-accent focus:ring-accent rounded-md border px-1.5 py-1 text-center tabular-nums outline-none focus:ring-1"
            }),
            p
          ]
        }),
        /* @__PURE__ */ i("div", {
          className: "mt-4 flex justify-end gap-2",
          children: [/* @__PURE__ */ i("button", {
            type: "button",
            onClick: e,
            className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
            children: t("demo.cancel")
          }), /* @__PURE__ */ i("button", {
            type: "submit",
            className: "bg-accent text-on-accent hover:bg-accent-hover rounded-md px-3 py-1.5 text-sm",
            children: t("goToPage.go")
          })]
        })
      ]
    })
  });
}
function Ad({ small: e = !1 }) {
  const t = Z(), n = $e(), { status: o, slow: r } = Nh(), a = o === "loading" && r;
  if (!a && !(o === "error" || o === "forbidden")) return null;
  const { viewScale: s, rotation: l } = n.transform, d = n.getViewDemand?.().visibleRect, c = d && d.width > 0 && d.height > 0 ? {
    x: (d.x + d.width / 2) * s,
    y: (d.y + d.height / 2) * s
  } : {
    x: n.transform.contentWidth / 2,
    y: n.transform.contentHeight / 2
  }, p = {
    position: "absolute",
    left: c.x,
    top: c.y,
    transform: `translate(-50%, -50%) rotate(${-l}deg)`,
    pointerEvents: "none"
  };
  if (a) {
    const f = e ? "h-5 w-5" : "h-8 w-8";
    return /* @__PURE__ */ i("div", {
      style: p,
      children: /* @__PURE__ */ i("div", {
        part: "page-loading",
        role: "status",
        "aria-label": t("demo.pageLoading", { params: { page: n.pageIndex + 1 } }),
        className: `border-border-subtle border-t-accent ${f} rounded-full border-2 motion-safe:animate-spin`
      })
    });
  }
  return e ? null : /* @__PURE__ */ i("p", {
    part: "page-error",
    role: "status",
    className: "text-fg-muted m-0 max-w-[16rem] text-center text-sm",
    style: p,
    children: t(o === "forbidden" ? "demo.pageForbidden" : "demo.pageError")
  });
}
const yr = {
  initial: 288,
  min: 200,
  max: 640
}, Nw = {
  compact: "sheet",
  medium: "overlay",
  expanded: "dock"
};
function Nd(e, t) {
  return (t === void 0 ? void 0 : yu(t)[e]) ?? Nw[e];
}
function Wa(e) {
  const t = e === void 0 ? {} : xu(e), n = t.max ?? yr.max, o = Math.min(t.min ?? yr.min, n);
  return {
    initial: t.initial ?? yr.initial,
    min: o,
    max: n
  };
}
function Va(e, t) {
  return Math.max(t.min, Math.min(t.max, Math.floor(e / 2)));
}
function qo(e, t, n) {
  const o = Va(t, n);
  return Math.round(Math.min(o, Math.max(n.min, e)));
}
function Iw(e, t) {
  return Math.round(Math.max(0, Math.min(e, t - 48)));
}
function Lw(e, t, n) {
  const o = Math.min(n.max, Math.max(n.min, e));
  return Math.round(Math.max(0, Math.min(o, t)));
}
const Rw = (e, t) => Nd(e, t) === "dock";
function Dw(e, t) {
  return e === "start" == (t === "ltr") ? 1 : -1;
}
function Kr(e, t, n) {
  return qo(e + t * Dw(n.side, n.dir), n.viewerWidth, n.widths);
}
function $w(e, t, n, o) {
  const r = 16 * (n ? 4 : 1);
  return t === "ArrowRight" ? Kr(e, r, o) : t === "ArrowLeft" ? Kr(e, -r, o) : t === "Home" ? qo(o.widths.min, o.viewerWidth, o.widths) : t === "End" ? Va(o.viewerWidth, o.widths) : null;
}
function zw(e) {
  const { size: t } = dt(), n = Nd(t, e.present);
  return n === "sheet" ? /* @__PURE__ */ i(jw, { ...e }) : n === "overlay" ? /* @__PURE__ */ i(Hw, { ...e }) : /* @__PURE__ */ i(Bw, { ...e });
}
function qa({ title: e, header: t, onClose: n }) {
  const o = Z();
  return /* @__PURE__ */ i("div", {
    part: "panel-header",
    "data-epdf-panel-header": "",
    className: "border-border-subtle flex min-h-11 shrink-0 items-center gap-2 border-b px-3 py-1.5",
    children: [/* @__PURE__ */ i("div", {
      className: "flex min-w-0 flex-1 items-center",
      children: t ?? /* @__PURE__ */ i("h2", {
        className: "text-fg truncate text-sm font-semibold",
        children: e
      })
    }), n && /* @__PURE__ */ i(jo, {
      content: { label: o("panel.close") },
      children: (r) => /* @__PURE__ */ i("button", {
        ...r,
        type: "button",
        onClick: n,
        "aria-label": o("panel.close"),
        className: "text-fg-muted hover:bg-hover grid h-7 w-7 shrink-0 place-items-center rounded-md",
        children: /* @__PURE__ */ i(q, {
          name: "x",
          size: 16
        })
      })
    })]
  });
}
const Ds = /* @__PURE__ */ new WeakMap();
function Fw(e) {
  let t = Ds.get(e);
  return t || (t = /* @__PURE__ */ new Map(), Ds.set(e, t)), t;
}
function Ya(e, t) {
  const n = Fw(ct()), [, o] = St((s) => s + 1, 0);
  return [n.get(e) ?? t.initial, (s) => {
    n.get(e) !== s && (n.set(e, s), o());
  }];
}
function Bw({ id: e, side: t, width: n, resizable: o = !0, closable: r = !0, title: a, onClose: s, header: l, bars: d, children: c }) {
  const p = dt(), f = Je(), u = Wa(n), [m, b] = Ya(e, u), h = qo(m, p.width, u), g = Ec(), y = {
    side: t,
    dir: p.dir,
    viewerWidth: p.width,
    widths: u
  };
  return /* @__PURE__ */ i("section", {
    id: f,
    role: "region",
    "aria-label": a,
    part: "panel",
    "data-epdf-panel": e,
    "data-present": "dock",
    className: `bg-surface border-border-subtle relative z-[35] flex shrink-0 flex-col ${t === "start" ? "border-e" : "border-s"}`,
    style: { width: h },
    children: [
      /* @__PURE__ */ i(qa, {
        title: a,
        header: l,
        onClose: r ? s : void 0
      }),
      d,
      /* @__PURE__ */ i("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: c
      }),
      o && /* @__PURE__ */ i(Id, {
        regionId: f,
        edge: y,
        title: a,
        width: h,
        onWidth: b,
        onResized: (v) => g({
          id: e,
          width: v
        })
      })
    ]
  });
}
function Id({ regionId: e, edge: t, title: n, width: o, onWidth: r, onResized: a }) {
  const s = Z(), l = k(null), d = (f) => {
    f.pointerType === "mouse" && f.button !== 0 || (f.preventDefault(), f.currentTarget.setPointerCapture(f.pointerId), l.current = {
      pointerId: f.pointerId,
      startX: f.clientX,
      startWidth: o,
      width: o
    });
  }, c = (f) => {
    const u = l.current;
    !u || u.pointerId !== f.pointerId || (u.width = Kr(u.startWidth, f.clientX - u.startX, t), r(u.width));
  }, p = (f) => {
    const u = l.current;
    u?.pointerId === f.pointerId && (l.current = null, u.width !== u.startWidth && a(u.width));
  };
  return /* @__PURE__ */ i("div", {
    role: "separator",
    "aria-orientation": "vertical",
    "aria-controls": e,
    "aria-label": s("panel.resize", { params: { title: n } }),
    "aria-valuenow": o,
    "aria-valuemin": t.widths.min,
    "aria-valuemax": Va(t.viewerWidth, t.widths),
    tabIndex: 0,
    "data-epdf-panel-edge": "",
    className: `focus-visible:bg-accent/40 hover:bg-accent/20 absolute inset-y-0 z-10 w-2 cursor-col-resize touch-none outline-none transition-colors ${t.side === "start" ? "-end-1" : "-start-1"}`,
    onPointerDown: d,
    onPointerMove: c,
    onPointerUp: p,
    onPointerCancel: p,
    onKeyDown: (f) => {
      const u = $w(o, f.key, f.shiftKey, t);
      u !== null && (f.preventDefault(), u !== o && (r(u), a(u)));
    }
  });
}
const Kw = {
  start: "start-0 border-e starting:-translate-x-full rtl:starting:translate-x-full",
  end: "end-0 border-s starting:translate-x-full rtl:starting:-translate-x-full"
};
function Hw({ id: e, side: t, width: n, resizable: o = !0, title: r, onClose: a, header: s, bars: l, list: d, children: c }) {
  const p = dt(), f = Je(), u = Wa(n), [m, b] = Ya(e, u), h = qo(m, p.width, u), g = Ec(), y = {
    side: t,
    dir: p.dir,
    viewerWidth: p.width,
    widths: u
  }, v = k(null), _ = k(a);
  return _.current = a, R(() => {
    const O = v.current;
    if (!O) return;
    const S = Ho(O, {
      onEscape: () => _.current(),
      trap: !1
    });
    return () => S.release();
  }, []), /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("div", {
    "aria-hidden": "true",
    "data-epdf-scrim": "",
    className: `absolute inset-0 z-30 ${Ea}`,
    onClick: () => _.current()
  }), /* @__PURE__ */ i("section", {
    ref: v,
    id: f,
    role: "dialog",
    "aria-label": r,
    part: "panel",
    "data-epdf-panel": e,
    "data-present": "overlay",
    className: `bg-surface border-border-subtle absolute inset-y-0 z-40 flex flex-col shadow-xl transition-[translate] duration-200 ease-out motion-reduce:transition-none ${Kw[t]}`,
    style: { width: Iw(h, p.width) },
    children: [
      /* @__PURE__ */ i(qa, {
        title: r,
        header: s,
        onClose: a
      }),
      l,
      /* @__PURE__ */ i("div", {
        className: "flex min-h-0 flex-1 flex-col",
        children: /* @__PURE__ */ i(Xc, {
          value: d ? () => _.current() : () => {
          },
          children: c
        })
      }),
      o && /* @__PURE__ */ i(Id, {
        regionId: f,
        edge: y,
        title: r,
        width: h,
        onWidth: b,
        onResized: (O) => g({
          id: e,
          width: O
        })
      })
    ]
  })] });
}
function jw({ id: e, width: t, title: n, onClose: o, header: r, bars: a, list: s, children: l }) {
  const d = dt(), c = Wa(t), [p] = Ya(e, c);
  return /* @__PURE__ */ i(Zc, {
    label: n,
    onClose: o,
    size: "panel",
    width: d.size === "compact" ? void 0 : Lw(p, d.width, c),
    list: s,
    part: "panel",
    data: {
      "epdf-panel": e,
      present: "sheet"
    },
    header: /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i(qa, {
      title: n,
      header: r,
      onClose: o
    }), a] }),
    children: l
  });
}
function Uw({ id: e, side: t, title: n, onClose: o, children: r }) {
  const a = Z(), { size: s } = dt(), l = k(null), d = k(o);
  return d.current = o, R(() => {
    const c = l.current;
    if (!c) return;
    const p = Ho(c, {
      onEscape: () => d.current(),
      trap: !1
    });
    return () => p.release();
  }, []), /* @__PURE__ */ i("section", {
    ref: l,
    role: "dialog",
    "aria-label": n,
    part: "panel",
    "data-epdf-panel": e,
    "data-present": "bar",
    className: `bg-surface border-border-subtle absolute top-2 z-40 flex items-start gap-1 rounded-lg border p-2 shadow-xl ${s === "compact" ? "inset-x-2" : `w-[24rem] max-w-[calc(100%-1rem)] ${t === "start" ? "start-2" : "end-2"}`}`,
    children: [/* @__PURE__ */ i("div", {
      className: "min-w-0 flex-1",
      children: r
    }), /* @__PURE__ */ i(jo, {
      content: { label: a("panel.close") },
      children: (c) => /* @__PURE__ */ i("button", {
        ...c,
        type: "button",
        onClick: o,
        "aria-label": a("panel.close"),
        className: "text-fg-muted hover:bg-hover grid h-8 w-8 shrink-0 place-items-center rounded-md",
        children: /* @__PURE__ */ i(q, {
          name: "x",
          size: 16
        })
      })
    })]
  });
}
function Gw({ id: e, title: t, panels: n }) {
  const o = Z(), [r, a] = C(!1), s = ve({ label: o("panels.switch") });
  return /* @__PURE__ */ i("div", {
    className: "relative flex min-w-0",
    children: [
      /* @__PURE__ */ i("button", {
        ...s.trigger,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": r,
        "data-epdf-panel-switcher": "",
        onClick: () => a((l) => !l),
        className: "text-fg hover:bg-hover -ms-1.5 flex min-w-0 items-center gap-1 rounded-md px-1.5 py-1 text-sm font-semibold",
        children: [/* @__PURE__ */ i("span", {
          className: "truncate",
          children: t
        }), /* @__PURE__ */ i(q, {
          name: "chevronDown",
          size: 16,
          className: "text-fg-muted shrink-0"
        })]
      }),
      s.element,
      r && /* @__PURE__ */ i(zn, {
        onClose: () => a(!1),
        children: /* @__PURE__ */ i("div", {
          className: "min-w-48 p-1",
          children: n.map((l) => /* @__PURE__ */ i(Ww, {
            panel: l,
            current: l === e,
            onPicked: () => a(!1)
          }, l))
        })
      })
    ]
  });
}
function Ww({ panel: e, current: t, onPicked: n }) {
  const o = Ce(It(e));
  return o.visible ? /* @__PURE__ */ i(Fn, {
    command: {
      ...o,
      active: t
    },
    choice: "radio",
    onSelect: () => {
      t || o.run(), n();
    }
  }) : null;
}
const eo = 2;
function Ld(e) {
  const t = e[0];
  return t ? Math.max(1, e.filter((n) => Math.abs(n.y - t.y) < 1).length) : 1;
}
function $s(e, t, n) {
  const o = Math.max(e.x - t, 0, t - (e.x + e.width)), r = Math.max(e.y - n, 0, n - (e.y + e.height));
  return Math.hypot(o, r);
}
function Vw(e, t, n) {
  const o = e.filter((l) => !t.has(l)), r = "before" in n ? n.before : n.after, a = o.indexOf(r) + ("after" in n ? 1 : 0), s = e.filter((l) => t.has(l));
  return [
    ...o.slice(0, a),
    ...s,
    ...o.slice(a)
  ];
}
function qw(e, t, n, o, r) {
  let a = null;
  for (const p of e) (!a || $s(p, t.x, t.y) < $s(a, t.x, t.y)) && (a = p);
  if (!a || r.has(a.page)) return null;
  const s = Ld(e) > 1, l = s ? t.x < a.x + a.width / 2 : t.y < a.y + a.height / 2, d = l ? { before: a.page } : { after: a.page };
  if (r.size > 0 && Vw(o, r, d).every((p, f) => p === o[f]))
    return null;
  const c = n.gap / 2;
  return {
    position: d,
    line: s ? {
      x: (l ? a.x - c : a.x + a.width + c) - eo / 2,
      y: a.y,
      width: eo,
      height: a.height
    } : {
      x: a.x,
      y: (l ? a.y - c : a.y + a.height + n.band + c) - eo / 2,
      width: a.width,
      height: eo
    }
  };
}
function Yw(e, t, n) {
  const o = e.flatMap((r, a) => t.has(r) ? [a] : []);
  if (o.length === 0) return null;
  if (n < 0) {
    for (let r = o[0] - 1; r >= 0; r -= 1) if (!t.has(e[r])) return { before: e[r] };
    return null;
  }
  for (let r = o[o.length - 1] + 1; r < e.length; r += 1) if (!t.has(e[r])) return { after: e[r] };
  return null;
}
const Xw = 4, Zw = 450, zs = 28, Jw = 16;
function Fs(e) {
  return e.listVisiblePages().map((t) => ({
    page: t.ref.objectNumber,
    x: t.screenX,
    y: t.screenY,
    width: t.transform.viewWidth,
    height: t.transform.viewHeight
  }));
}
const _r = (e) => "before" in e ? { before: fo(e.before) } : { after: fo(e.after) };
function Qw() {
  const e = Z(), t = Je(), n = ji(), o = ji(yn), r = Jt((w) => w.currentPageIndex), a = bh(), s = Bh(), l = Kh((w) => w.selected), d = ke(), c = Ce("page:insert-file"), p = Ce("page:insert-blank"), f = p.visible && p.enabled, u = bv(), m = k(null), [b, h] = C(null), [g, y] = C(null), [v, _] = C(!1), [O, S] = C(null), x = k(null);
  x.current = O;
  const [P, M] = C(null), T = k(null), L = k(!1), A = a.map((w) => w.ref.objectNumber), F = (w) => w === null ? -1 : A.indexOf(w), ce = new Set(l.map((w) => w.objectNumber)), te = F(b) >= 0 ? F(b) : r;
  E(() => o.reveal(r), [r, o]);
  const se = Jt((w) => w.pageCount, yn), nt = l[l.length - 1]?.objectNumber ?? null, ot = nt === null ? -1 : A.indexOf(nt);
  E(() => {
    ot >= 0 && ot < se && o.reveal(ot);
  }, [
    ot,
    se,
    o
  ]);
  const Mt = () => {
    const { gap: w, pageFrame: B } = o.getSettings();
    return {
      gap: typeof w == "object" && w !== null && "px" in w ? w.px : Jw,
      band: B.bottom
    };
  }, Ft = (w, B) => {
    const G = m.current?.getBoundingClientRect();
    return G ? {
      x: w - G.left,
      y: B - G.top
    } : null;
  }, Ke = (w, B, G) => {
    const ne = Ft(w, B);
    return ne ? qw(Fs(o), ne, Mt(), A, G) : null;
  }, N = (w) => {
    n.goToPage(w), u();
  }, ee = (w) => s.select(w), _e = (w, B, G) => {
    if (L.current) {
      L.current = !1;
      return;
    }
    const ne = w.objectNumber;
    if (h(ne), f && (G.metaKey || G.ctrlKey)) {
      ee(ce.has(ne) ? l.filter((U) => U.objectNumber !== ne) : [...l, w]), y(ne);
      return;
    }
    if (f && G.shiftKey && F(g) >= 0) {
      const U = F(g), [le, V] = U < B ? [U, B] : [B, U];
      ee(a.slice(le, V + 1).map((Qo) => Qo.ref));
      return;
    }
    y(ne), f && ee([w]), N(B);
  }, Me = (w) => {
    h(w.objectNumber), ce.has(w.objectNumber) || ee([w]);
  }, ze = (w) => m.current?.querySelector(`[data-epdf-page-menu="${w}"] button`)?.click(), ut = () => {
    T.current !== null && clearTimeout(T.current), T.current = null;
  }, Vd = (w, B) => {
    if (!f || B.button !== 0 || B.target.closest("[data-epdf-page-menu]")) return;
    const G = w.objectNumber, ne = ce.has(G) ? ce : /* @__PURE__ */ new Set([G]);
    S({
      pointerId: B.pointerId,
      startX: B.clientX,
      startY: B.clientY,
      page: G,
      moving: ne,
      held: !1,
      active: !1,
      drop: null
    }), B.pointerType !== "mouse" && (T.current = setTimeout(() => {
      const U = x.current;
      U && !U.active && S({
        ...U,
        held: !0
      });
    }, Zw));
  }, Bn = O?.active === !0, qd = O !== null;
  E(() => {
    if (!qd) return;
    const w = (U) => {
      const le = x.current;
      if (!le || U.pointerId !== le.pointerId) return;
      if (!le.active) {
        if (Math.hypot(U.clientX - le.startX, U.clientY - le.startY) <= Xw) return;
        if (U.pointerType !== "mouse" && !le.held) {
          ut(), S(null);
          return;
        }
      }
      const V = m.current?.getBoundingClientRect();
      V && U.clientY < V.top + zs ? o.scrollBy({ top: -8 }) : V && U.clientY > V.bottom - zs && o.scrollBy({ top: 8 }), S({
        ...le,
        active: !0,
        drop: Ke(U.clientX, U.clientY, le.moving)
      });
    }, B = (U, le) => {
      ut();
      const V = x.current;
      if (!V || U.pointerId !== V.pointerId) return;
      if (S(null), !V.active) {
        V.held && le && (L.current = !0, Me(fo(V.page)), ze(V.page));
        return;
      }
      if (L.current = !0, setTimeout(() => {
        L.current = !1;
      }, 0), !le || !V.drop) return;
      const Qo = a.filter((er) => V.moving.has(er.ref.objectNumber));
      s.reorder(Qo.map((er) => er.ref), _r(V.drop.position)).catch(() => {
      });
    }, G = (U) => B(U, !0), ne = (U) => B(U, !1);
    return window.addEventListener("pointermove", w), window.addEventListener("pointerup", G), window.addEventListener("pointercancel", ne), () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", G), window.removeEventListener("pointercancel", ne);
    };
  }), E(() => {
    if (!Bn) return;
    const w = (B) => B.preventDefault();
    return document.addEventListener("touchmove", w, { passive: !1 }), () => document.removeEventListener("touchmove", w);
  }, [Bn]), E(() => ut, []);
  const Zo = (w) => f && c.visible && c.enabled && yc(w.dataTransfer), ti = (w) => {
    Zo(w) && (w.preventDefault(), w.stopPropagation(), w.dataTransfer.dropEffect = "copy", M(Ke(w.clientX, w.clientY, /* @__PURE__ */ new Set())));
  }, Yd = (w) => {
    if (!Zo(w)) return;
    w.stopPropagation();
    const B = w.relatedTarget;
    (!B || !m.current?.contains(B)) && M(null);
  }, Xd = (w) => {
    if (!Zo(w)) return;
    w.preventDefault(), w.stopPropagation();
    const B = Ke(w.clientX, w.clientY, /* @__PURE__ */ new Set());
    M(null);
    const G = Array.from(w.dataTransfer.files).filter(Sa);
    if (G.length === 0) return;
    const ne = {
      files: G,
      ...B ? { position: _r(B.position) } : {}
    };
    d.execute("page:insert-file", { args: ne }).catch(() => {
    });
  }, ni = (w, B) => {
    const G = a[w];
    if (G) {
      if (h(G.ref.objectNumber), o.reveal(w), !f) {
        n.goToPage(w);
        return;
      }
      if (B && F(g) >= 0) {
        const ne = F(g), [U, le] = ne < w ? [ne, w] : [w, ne];
        ee(a.slice(U, le + 1).map((V) => V.ref));
        return;
      }
      y(G.ref.objectNumber), ee([G.ref]), n.goToPage(w);
    }
  }, Zd = (w) => {
    if (w.target !== w.currentTarget || a.length === 0) return;
    _(!0);
    const B = Ld(Fs(o)), G = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -B,
      ArrowDown: B
    }[w.key], ne = w.metaKey || w.ctrlKey;
    if (G !== void 0 && w.altKey && f) {
      w.preventDefault();
      const U = Yw(A, ce, G < 0 ? -1 : 1), le = a.filter((V) => ce.has(V.ref.objectNumber));
      U && le.length > 0 && s.reorder(le.map((V) => V.ref), _r(U)).catch(() => {
      });
      return;
    }
    if (G !== void 0) {
      w.preventDefault(), ni(Math.max(0, Math.min(a.length - 1, te + G)), w.shiftKey);
      return;
    }
    switch (w.key) {
      case "Home":
      case "End":
        w.preventDefault(), ni(w.key === "Home" ? 0 : a.length - 1, w.shiftKey);
        return;
      case "Enter":
        w.preventDefault(), N(te);
        return;
      case " ": {
        if (!f) return;
        w.preventDefault();
        const U = a[te];
        if (!U) return;
        const le = U.ref.objectNumber;
        y(le), ee(ce.has(le) ? l.filter((V) => V.objectNumber !== le) : [...l, U.ref]);
        return;
      }
      case "Delete":
      case "Backspace":
        if (!f) return;
        w.preventDefault(), d.execute("page:delete").catch(() => {
        });
        return;
      case "a":
      case "A":
        if (!ne || !f) return;
        w.preventDefault(), d.execute("page:select-all").catch(() => {
        });
        return;
    }
  }, Jo = a[te]?.ref ?? null, ln = Bn ? O.drop : P;
  return /* @__PURE__ */ i("div", {
    className: "flex min-h-0 flex-1 flex-col",
    children: /* @__PURE__ */ i("div", {
      ref: m,
      role: "listbox",
      "aria-label": e("panels.thumbnails"),
      "aria-multiselectable": f || void 0,
      tabIndex: 0,
      "aria-activedescendant": v && Jo ? `${t}-${Jo.objectNumber}` : void 0,
      onKeyDown: Zd,
      onFocus: (w) => w.target === w.currentTarget && _(w.currentTarget.matches(":focus-visible")),
      onBlur: (w) => w.target === w.currentTarget && _(!1),
      onDragEnter: ti,
      onDragOver: ti,
      onDragLeave: Yd,
      onDrop: Xd,
      className: "focus-visible:ring-accent relative flex min-h-0 flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset",
      children: /* @__PURE__ */ i(rc, {
        token: yn,
        className: "flex-1",
        style: { position: "relative" },
        overlay: /* @__PURE__ */ i(D, { children: [ln && /* @__PURE__ */ i("div", {
          "aria-hidden": !0,
          className: "bg-accent pointer-events-none absolute rounded-full",
          style: {
            left: ln.line.x,
            top: ln.line.y,
            width: ln.line.width,
            height: ln.line.height
          }
        }), /* @__PURE__ */ i(Ar, { axis: "y" })] }),
        pageChrome: (w) => {
          const B = w.ref.objectNumber, G = f && ce.has(B), ne = w.pageIndex === r, U = v && Jo?.objectNumber === B, le = Bn && O.moving.has(B);
          return /* @__PURE__ */ i("div", {
            className: "group",
            style: {
              position: "absolute",
              inset: 0
            },
            children: [
              /* @__PURE__ */ i(Wc, {
                label: e("thumbnails.page", { params: { page: w.pageIndex + 1 } }),
                id: `${t}-${B}`,
                role: "option",
                "aria-selected": f ? G : ne,
                "aria-current": ne ? "page" : void 0,
                tabIndex: -1,
                onClick: (V) => _e(w.ref, w.pageIndex, V),
                onPointerDown: (V) => Vd(w.ref, V),
                onContextMenu: (V) => {
                  f && (V.preventDefault(), Me(w.ref), ze(B));
                },
                className: `box-border cursor-pointer touch-manipulation rounded ${G || ne ? "border-accent border-2" : "border-border-subtle border"} ${ne ? "ring-accent-light ring-2" : ""} ${G ? "bg-accent/10" : ""} ${U ? "outline-accent outline outline-2 outline-offset-2" : ""} ${le ? "bg-surface/60" : ""}`,
                style: {
                  position: "absolute",
                  top: w.frame.top,
                  left: w.frame.left,
                  right: w.frame.right,
                  bottom: w.frame.bottom
                }
              }),
              f && /* @__PURE__ */ i("span", {
                "data-epdf-page-menu": B,
                onClick: (V) => V.stopPropagation(),
                onPointerDownCapture: () => Me(w.ref),
                className: `bg-elevated absolute rounded shadow-sm ${G || U ? "" : "opacity-0 focus-within:opacity-100 group-hover:opacity-100"}`,
                style: {
                  top: w.frame.top + 4,
                  right: w.frame.right + 4
                },
                children: /* @__PURE__ */ i(ey, {})
              }),
              /* @__PURE__ */ i("div", {
                style: {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: w.frame.bottom,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "var(--epdf-text-muted)",
                  pointerEvents: "none"
                },
                children: w.pageIndex + 1
              })
            ]
          });
        },
        children: () => /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i(ic, { thumbnail: !0 }), /* @__PURE__ */ i(Ad, { small: !0 })] })
      })
    })
  });
}
function ey() {
  const e = Ce("menu:page");
  return e.visible ? /* @__PURE__ */ i(Vo, {
    cmd: e,
    variant: "icon",
    run: () => void e.run()
  }) : null;
}
const ty = fe(() => import("./search-panel-Eivx6mw6-Dhc9WWk-.js").then((e) => e.SearchPanel)), ny = fe(() => import("./search-panel-Eivx6mw6-Dhc9WWk-.js").then((e) => e.FindBar)), oy = fe(() => import("./comments-panel-WWRsL--Q-H14drDZj.js").then((e) => e.CommentsPanel)), ry = fe(() => import("./measurement-DZOOYxOT-DhLpoEY8.js").then((e) => e.MeasurementSection)), ay = fe(() => import("./annotation-style-CF_uQ82y-CRTERsP6.js").then((e) => e.AnnotationStylePanel)), iy = fe(() => import("./stamps-panel-vnotr2Nq-BTL56Bnw.js").then((e) => e.StampsPanel)), sy = fe(() => import("./signatures-panel-DKFVlxyM-D_imZbgh.js").then((e) => e.SignaturesPanel)), ly = fe(() => import("./redaction-panel-BJvgl75F-QBtkOm4Z.js").then((e) => e.RedactionPanel)), cy = fe(() => import("./outline-panel-BgbrOoBa-D3gSj0ae.js").then((e) => e.OutlinePanel)), dy = fe(() => import("./attachments-panel-CPssFrCE-DZDhBoxx.js").then((e) => e.AttachmentsPanel)), uy = fe(() => import("./form-design-panel-wzDO2bUT-BI1FHAFA.js").then((e) => e.FormDesignPanel)), Rd = /* @__PURE__ */ new Map([
  ["thumbnails", {
    draw: () => /* @__PURE__ */ i(Qw, {}),
    list: !0
  }],
  ["outline", {
    draw: (e) => /* @__PURE__ */ i(cy, {}, e ?? "none"),
    list: !0,
    scope: Uv
  }],
  ["attachments", {
    draw: (e) => /* @__PURE__ */ i(dy, {}, e ?? "none"),
    list: !0
  }],
  ["search", {
    draw: (e) => /* @__PURE__ */ i(ty, {}, e ?? "none"),
    list: !0,
    bar: {
      when: (e, t) => e.tryCapability(rn, t ?? void 0)?.canSearch({ snippets: !0 }) === !1,
      draw: (e) => /* @__PURE__ */ i(ny, {}, e ?? "none")
    }
  }],
  ["comments", { draw: (e) => /* @__PURE__ */ i(oy, {}, e ?? "none") }],
  ["measurement", { draw: (e) => /* @__PURE__ */ i(ry, {}, e ?? "none") }],
  ["style", { draw: () => /* @__PURE__ */ i(ay, {}) }],
  ["stamps", { draw: () => /* @__PURE__ */ i(iy, {}) }],
  ["signatures", { draw: () => /* @__PURE__ */ i(sy, {}) }],
  ["redaction", { draw: () => /* @__PURE__ */ i(ly, {}) }],
  ["form-design", { draw: (e) => /* @__PURE__ */ i(uy, {}, e ?? "none") }]
]), py = [], to = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]), fy = (e, t) => to(e.shown, t.shown) && to(e.off, t.off) && to(e.open, t.open) && to(e.bars, t.bars), Bs = /* @__PURE__ */ new WeakMap();
function my(e, t) {
  let n = Bs.get(e);
  return n || (n = {
    start: /* @__PURE__ */ new Set(),
    end: /* @__PURE__ */ new Set()
  }, Bs.set(e, n)), n[t];
}
function Ks({ side: e }) {
  const { data: t, env: n } = tt(), o = ke(), r = Q(K), a = ye(), s = H(() => C1(t, e), [t, e]), { shown: l, off: d, open: c, bars: p } = ie((u) => {
    const m = (b) => o.resolveCommand(It(b), a ?? void 0)?.visible;
    return {
      shown: s.filter((b) => m(b) === !0),
      off: s.filter((b) => m(b) === !1),
      open: r ? s.filter((b) => r.isOpen(b)) : py,
      bars: s.filter((b) => Rd.get(b)?.bar?.when(u, a) === !0)
    };
  }, fy);
  jg((u) => u.onSurfaceOpened, (u) => {
    if (!(!r || !s.includes(u.id)))
      for (const m of s) m !== u.id && r.isOpen(m) && r.close(m);
  });
  const f = c.find((u) => l.includes(u)) ?? null;
  return R(() => {
    if (!r) return;
    for (const h of c) h !== f && (f !== null || d.includes(h)) && r.close(h);
    if (n === Ma) return;
    const u = t.panels ?? {}, m = my(r, e), b = E1(u, {
      ids: s,
      shown: l,
      current: f,
      docks: (h) => Rw(n.size, u[h]?.present) && !p.includes(h)
    }, m);
    for (const h of b.started) m.add(h);
    b.open !== null && r.open(b.open);
  }, [
    r,
    e,
    t,
    n,
    s,
    l,
    c,
    d,
    p,
    f
  ]), f === null ? null : /* @__PURE__ */ i(hy, {
    id: f,
    side: e,
    siblings: l
  }, f);
}
function hy({ id: e, side: t, siblings: n }) {
  const o = tt().data.panels?.[e], r = ke(), a = Q(K), s = ye(), l = Rd.get(e), d = ie((f) => l?.bar?.when(f, s) === !0), c = ie(() => r.resolveCommand(It(e), s ?? void 0)?.label ?? null);
  if (!o) return null;
  const p = c ?? o.title ?? e;
  return d ? /* @__PURE__ */ i(Uw, {
    id: e,
    side: t,
    title: p,
    onClose: () => a?.close(e),
    children: /* @__PURE__ */ i("slot", {
      name: `panel:${e}`,
      children: l?.bar?.draw(s)
    })
  }) : /* @__PURE__ */ i(l?.scope ?? D, { children: /* @__PURE__ */ i(zw, {
    id: e,
    side: t,
    present: o.present,
    width: o.width,
    resizable: o.resizable,
    closable: o.closable !== !1,
    title: p,
    header: n.length > 1 ? /* @__PURE__ */ i(Gw, {
      id: e,
      title: p,
      panels: n
    }) : void 0,
    bars: /* @__PURE__ */ i(gw, { panel: e }),
    list: l?.list,
    onClose: () => a?.close(e),
    children: /* @__PURE__ */ i("slot", {
      name: `panel:${e}`,
      children: l?.draw(s)
    })
  }) });
}
function gy() {
  let e = [];
  const t = /* @__PURE__ */ new Set(), n = (o) => {
    e = o;
    for (const r of [...t]) r();
  };
  return {
    list: () => e,
    subscribe(o) {
      return t.add(o), () => {
        t.delete(o);
      };
    },
    place(o) {
      const r = e.findIndex((a) => a.host === o.host);
      n(r < 0 ? [...e, o] : e.map((a, s) => s === r ? o : a));
    },
    remove(o) {
      e.some((r) => r.host === o) && n(e.filter((r) => r.host !== o));
    }
  };
}
const xr = /* @__PURE__ */ new WeakSet();
function by(e, t) {
  const { visible: n, enabled: o } = t;
  R(() => {
    !n && !e.hidden ? (e.hidden = !0, xr.add(e)) : n && xr.has(e) && (e.hidden = !1, xr.delete(e)), o ? e.removeAttribute("aria-disabled") : e.setAttribute("aria-disabled", "true");
  }, [
    e,
    n,
    o
  ]);
}
function Dd({ icon: e, label: t }) {
  return e ? /* @__PURE__ */ i(q, {
    name: e,
    size: 20
  }) : /* @__PURE__ */ i("span", {
    className: "whitespace-nowrap px-1 text-sm",
    children: t
  });
}
function vy({ host: e, commandId: t, active: n }) {
  const o = Ce(t);
  return by(e, o), o.visible ? /* @__PURE__ */ i(Vo, {
    cmd: n ? {
      ...o,
      active: n
    } : o,
    variant: "icon",
    run: () => void o.run()
  }) : null;
}
function wy({ icon: e, label: t, active: n }) {
  const o = ve(t ? {
    label: t,
    labelShown: !e
  } : null);
  return /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i("button", {
    ...o.trigger,
    type: "button",
    "aria-label": t ?? void 0,
    "aria-pressed": n || void 0,
    part: Se(n),
    className: Re(n),
    children: /* @__PURE__ */ i(Dd, {
      icon: e,
      label: t
    })
  }), o.element] });
}
function yy({ button: e }) {
  return e.command ? /* @__PURE__ */ i(vy, {
    host: e.host,
    commandId: e.command,
    active: e.active
  }) : /* @__PURE__ */ i(wy, {
    icon: e.icon,
    label: e.label,
    active: e.active
  });
}
const _y = (e) => ({
  id: "",
  label: e.label,
  icon: e.icon ?? void 0,
  shortcuts: [],
  enabled: !0,
  active: e.active,
  pressable: !1,
  visible: !0,
  categories: []
});
function xy({ item: e, commandId: t, onPicked: n }) {
  const o = Ce(t);
  if (!o.visible) return null;
  const r = {
    ...o,
    label: e.label || o.label,
    icon: e.icon ?? o.icon,
    active: e.active || o.active
  };
  return /* @__PURE__ */ i(Fn, {
    command: r,
    choice: r.active ? "checkbox" : "none",
    onSelect: () => {
      o.run(), e.select(), n();
    }
  });
}
function ky({ menu: e }) {
  const [t, n] = C(!1), o = () => n(!1), r = ve(e.label ? {
    label: e.label,
    labelShown: !e.icon
  } : null);
  return /* @__PURE__ */ i("span", {
    className: "relative inline-flex",
    children: [
      /* @__PURE__ */ i("button", {
        ...r.trigger,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": t,
        "aria-label": e.label ?? void 0,
        part: Se(t),
        className: Re(t),
        onClick: () => n((a) => !a),
        children: /* @__PURE__ */ i(Dd, {
          icon: e.icon,
          label: e.label
        })
      }),
      r.element,
      t && /* @__PURE__ */ i(zn, {
        onClose: o,
        children: /* @__PURE__ */ i("div", {
          className: "min-w-52 p-1",
          children: e.items.map((a, s) => a.command ? /* @__PURE__ */ i(xy, {
            item: a,
            commandId: a.command,
            onPicked: o
          }, s) : /* @__PURE__ */ i(Fn, {
            command: _y(a),
            choice: a.active ? "checkbox" : "none",
            onSelect: () => {
              a.select(), o();
            }
          }, s))
        })
      })
    ]
  });
}
function Sy({ icon: e }) {
  return e.icon ? /* @__PURE__ */ i(q, {
    name: e.icon,
    size: e.size ?? 20,
    title: e.label ?? void 0,
    className: "block"
  }) : null;
}
const Hs = /* @__PURE__ */ new WeakMap();
let My = 0;
const Py = (e) => {
  let t = Hs.get(e);
  return t === void 0 && (t = My++, Hs.set(e, t)), t;
};
function Oy({ components: e }) {
  const t = Xe(e.subscribe, e.list, e.list), n = rd();
  return Xe(n.subscribe, n.version, n.version), /* @__PURE__ */ i(D, { children: t.map((o) => /* @__PURE__ */ i(D, { children: ga(/* @__PURE__ */ i($n, {
    value: n.edgeOf(o.host),
    children: o.kind === "button" ? /* @__PURE__ */ i(yy, { button: o }) : o.kind === "menu" ? /* @__PURE__ */ i(ky, { menu: o }) : /* @__PURE__ */ i(Sy, { icon: o })
  }), o.root) }, Py(o.host))) });
}
const Ty = 2500;
function Cy() {
  const e = Z(), [t, n] = C(null), o = Ve((r) => n((a) => ({
    message: r,
    count: (a?.count ?? 0) + 1
  })), []);
  return E(() => {
    if (!t) return;
    const r = setTimeout(() => n(null), Ty);
    return () => clearTimeout(r);
  }, [t]), {
    onShortcutRefused: Ve((r, a) => o(a.message), [o]),
    onCopyRefused: Ve(() => o(e("commands.notAllowed.doc-text-copy", { fallback: "Copying isn't allowed" })), [o, e]),
    element: /* @__PURE__ */ i("div", {
      role: "status",
      "aria-live": "polite",
      "data-epdf-refusal-notice": "",
      className: "pointer-events-none absolute inset-x-0 bottom-16 z-30 flex justify-center",
      children: t && /* @__PURE__ */ i("div", {
        className: "border-border-subtle bg-elevated/95 text-fg rounded-full border px-4 py-1.5 text-sm shadow-lg backdrop-blur",
        children: t.message
      }, t.count)
    })
  };
}
function Ey() {
  return /* @__PURE__ */ i(Qh, { children: ({ angle: e }) => /* @__PURE__ */ i("div", {
    className: "pointer-events-none whitespace-nowrap rounded bg-black/80 px-1.5 py-0.5 font-mono text-xs text-white",
    children: [e, "°"]
  }) });
}
const Ay = 12, Ny = 38;
function Iy() {
  const e = Z(), { touch: t } = dt(), n = Pa("selection"), o = Aa(n);
  return !n || !o ? null : /* @__PURE__ */ i(Wh, {
    placement: "bottom",
    gap: t ? Ny : Ay,
    children: /* @__PURE__ */ i(Ga, {
      bar: n,
      view: o,
      label: e("commands.selection.strip")
    })
  });
}
const Ly = 12;
function Ry() {
  const e = Z(), t = Pa("snapshot"), n = Aa(t);
  return !t || !n ? null : /* @__PURE__ */ i(zh, {
    placement: "bottom",
    gap: Ly,
    children: /* @__PURE__ */ i(Ga, {
      bar: t,
      view: n,
      label: e("commands.snapshot.strip")
    })
  });
}
const js = [
  {
    titleKey: "shortcuts.document",
    areas: ["document"]
  },
  {
    titleKey: "shortcuts.viewing",
    areas: [
      "page",
      "zoom",
      "view",
      "search",
      "panel",
      "menu",
      "mode",
      "help"
    ]
  },
  {
    titleKey: "shortcuts.editing",
    areas: [
      "history",
      "tool",
      "selection",
      "annotation",
      "snapshot",
      "redaction",
      "measurement",
      "outline"
    ]
  }
], Us = "shortcuts.other", Dy = /* @__PURE__ */ new Set([
  "selection",
  "annotation",
  "snapshot"
]), Gs = (e) => e.split(":")[0] ?? e;
function $y(e, t) {
  const n = [...new Set(e.listShortcuts().map((r) => r.commandId))].flatMap((r) => {
    if (e.getRefusal(r, t)) return [];
    const a = e.resolveCommand(r, t);
    return !a || a.shortcuts.length === 0 ? [] : !a.visible && !Dy.has(Gs(r)) ? [] : [{
      commandId: r,
      label: a.label,
      shortcuts: a.shortcuts
    }];
  }), o = (r) => js.find((a) => a.areas.includes(Gs(r.commandId)))?.titleKey ?? Us;
  return [...js.map((r) => r.titleKey), Us].map((r) => ({
    titleKey: r,
    rows: n.filter((a) => o(a) === r)
  })).filter((r) => r.rows.length > 0);
}
const zy = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Fy() {
  const e = Qe(Mc);
  return e.isOpen ? /* @__PURE__ */ i(By, { onClose: e.close }) : null;
}
function By({ onClose: e }) {
  const t = Z(), n = Je(), o = ke(), r = ye() ?? void 0, a = ie(() => $y(o, r), zy), s = No();
  return /* @__PURE__ */ i(za, {
    labelledBy: n,
    onClose: e,
    className: "border-border bg-surface w-96 rounded-lg border p-4 shadow-xl",
    children: /* @__PURE__ */ i("div", {
      "data-epdf-shortcuts": "",
      children: [/* @__PURE__ */ i("div", {
        className: "flex items-center justify-between gap-4",
        children: [/* @__PURE__ */ i("h2", {
          id: n,
          className: "text-fg text-base font-semibold",
          children: t("commands.shortcuts")
        }), /* @__PURE__ */ i(Wc, {
          label: t("panel.close"),
          onClick: e,
          className: "text-fg-muted hover:bg-hover hover:text-fg grid h-7 w-7 place-items-center rounded-md",
          children: /* @__PURE__ */ i(q, {
            name: "x",
            size: 16
          })
        })]
      }), a.map((l) => /* @__PURE__ */ i("section", {
        className: "mt-4",
        children: [/* @__PURE__ */ i("h3", {
          className: "text-fg-muted text-xs font-semibold",
          children: t(l.titleKey)
        }), /* @__PURE__ */ i("dl", {
          className: "mt-1",
          children: l.rows.map((d) => /* @__PURE__ */ i("div", {
            "data-epdf-shortcut": "",
            className: "flex items-center justify-between gap-4 py-1 text-sm",
            children: [/* @__PURE__ */ i("dt", {
              className: "text-fg min-w-0 truncate",
              children: d.label
            }), /* @__PURE__ */ i("dd", {
              className: "flex shrink-0 gap-1",
              children: d.shortcuts.map((c) => /* @__PURE__ */ i("kbd", {
                className: "border-border-subtle bg-surface-alt text-fg-secondary rounded border px-1.5 py-0.5 font-sans text-xs",
                children: Qs(c, { isMac: s })
              }, c))
            })]
          }, d.commandId))
        })]
      }, l.titleKey))]
    })
  });
}
function Ky() {
  return Hh((e) => e.status), sc((e) => e.status), null;
}
function Hy() {
  const e = Hg();
  return Wn((t) => t.onTargetChanged, (t) => {
    t.field && e.open("signatures");
  }), Wn((t) => t.onSignRequested, (t) => e.open("signature-sign", {
    exclusive: "modal",
    props: {
      field: t.field,
      mark: t.mark
    }
  })), Wn((t) => t.onInspectionRequested, (t) => e.open("signature-inspector", { props: { field: t.field } })), Wn((t) => t.onInvalidationPredicted, () => e.open("signatures")), null;
}
function jy() {
  const e = zb(), t = Fo((n) => n.documents.some((o) => o.hasUnsavedChanges));
  return E(() => {
    if (!e || !t) return;
    const n = (o) => {
      o.preventDefault(), o.returnValue = "";
    };
    return window.addEventListener("beforeunload", n), () => window.removeEventListener("beforeunload", n);
  }, [e, t]), null;
}
function Uy({ name: e, onCancel: t, onClose: n }) {
  const o = Z(), r = Je();
  return /* @__PURE__ */ i(za, {
    labelledBy: r,
    onClose: t,
    className: "border-border bg-surface w-96 rounded-lg border p-4 shadow-xl",
    children: [
      /* @__PURE__ */ i("h2", {
        id: r,
        className: "text-fg text-base font-semibold",
        children: o("closeUnsaved.title")
      }),
      /* @__PURE__ */ i("p", {
        className: "text-fg-muted mt-2 text-sm",
        children: o("closeUnsaved.body", { params: { name: e } })
      }),
      /* @__PURE__ */ i("div", {
        className: "mt-4 flex justify-end gap-2",
        children: [/* @__PURE__ */ i("button", {
          type: "button",
          onClick: t,
          className: "border-border text-fg hover:bg-hover rounded-md border px-3 py-1.5 text-sm",
          children: o("closeUnsaved.cancel")
        }), /* @__PURE__ */ i("button", {
          type: "button",
          onClick: n,
          className: "rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700",
          children: o("closeUnsaved.close")
        })]
      })
    ]
  });
}
function Gy({ visibility: e }) {
  const { setActive: t, close: n } = wa(), { documents: o, activeId: r } = Fo(), a = Z(), [s, l] = C(null);
  if (!(e === "always" || e === "multiple" && o.length > 1)) return null;
  const d = (c, p) => {
    c.hasUnsavedChanges ? l({
      id: c.id,
      name: p
    }) : n(c.id);
  };
  return /* @__PURE__ */ i("div", {
    className: "bg-surface-alt flex items-end pr-2 pt-2",
    children: [/* @__PURE__ */ i("div", {
      className: "flex flex-1 items-end overflow-x-auto pl-4",
      children: o.map((c) => {
        const p = r === c.id, f = c.name ?? a("tabs.untitled", { params: { id: c.id.slice(0, 8) } });
        return /* @__PURE__ */ i("div", {
          onClick: () => t(c.id),
          role: "tab",
          part: p ? "tab tab-active" : "tab",
          tabIndex: 0,
          "aria-selected": p,
          onKeyDown: (u) => {
            (u.key === "Enter" || u.key === " ") && (u.preventDefault(), t(c.id));
          },
          className: `group relative flex min-w-[120px] max-w-[240px] cursor-pointer items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-all ${p ? "bg-surface text-fg z-10" : "bg-surface-alt text-fg-secondary hover:bg-hover hover:text-fg"}`,
          children: [
            c.status === "loading" && /* @__PURE__ */ i("span", {
              className: "border-border-subtle border-t-accent h-3 w-3 flex-shrink-0 animate-spin rounded-full border",
              "aria-label": a("tabs.loading")
            }),
            c.status === "locked" && /* @__PURE__ */ i(q, {
              name: "lock",
              size: 13,
              className: "text-fg-muted flex-shrink-0"
            }),
            c.status === "error" && c.openRequest && /* @__PURE__ */ i(q, {
              name: "lock",
              size: 13,
              className: "text-fg-muted flex-shrink-0"
            }),
            c.status === "error" && !c.openRequest && /* @__PURE__ */ i(jo, {
              content: { label: a(Br(c.error)) },
              children: (u) => /* @__PURE__ */ i("span", {
                ...u,
                className: "flex flex-shrink-0",
                role: "img",
                "aria-label": a(Br(c.error)),
                children: /* @__PURE__ */ i(q, {
                  name: "alertTriangle",
                  size: 13,
                  className: "text-red-500"
                })
              })
            }),
            /* @__PURE__ */ i("span", {
              className: "min-w-0 flex-1 truncate",
              children: f
            }),
            p && o.length > 1 && /* @__PURE__ */ i("button", {
              type: "button",
              onClick: (u) => {
                u.stopPropagation(), d(c, f);
              },
              "aria-label": a("tabs.close", { params: { name: f } }),
              className: "hover:bg-hover flex-shrink-0 cursor-pointer rounded-full p-1 opacity-100 transition-all",
              children: /* @__PURE__ */ i(q, {
                name: "x",
                size: 14
              })
            })
          ]
        }, c.id);
      })
    }), s && /* @__PURE__ */ i(Uy, {
      name: s.name,
      onCancel: () => l(null),
      onClose: () => {
        l(null), n(s.id);
      }
    })]
  });
}
const no = 40, $d = {
  x: 8,
  y: 28
}, co = "#1a1a1a", _n = "#ffffff", Wy = "#34a853";
function Vy(e, t, n) {
  const o = Lc(e, n);
  if (!o) return null;
  const r = [], a = [];
  for (const s of o) {
    const l = typeof s == "string" ? {
      d: s,
      fill: void 0,
      stroke: void 0
    } : s, d = l.fill === !0 ? co : l.fill ? t?.[l.fill] : void 0, c = l.stroke ? t?.[l.stroke] ?? co : l.fill ? "none" : co;
    r.push(`<path d="${l.d}" fill="none" stroke="${_n}" stroke-width="3.5"/>`);
    const p = [
      ["stroke-width", l.strokeWidth],
      ["stroke-dasharray", l.strokeDasharray],
      ["stroke-opacity", l.strokeOpacity],
      ["fill-opacity", l.fillOpacity]
    ].filter(([, f]) => f !== void 0).map(([f, u]) => `${f}="${u}"`).join(" ");
    a.push(`<path d="${l.d}" fill="${d ?? "none"}" stroke="${c}" ${p}/>`);
  }
  return r.join("") + a.join("");
}
const fn = (e, t, n, o) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${o}" stroke="${_n}" stroke-width="3"/><line x1="${e}" y1="${t}" x2="${n}" y2="${o}" stroke="${co}" stroke-width="1.25"/>`;
function qy(e) {
  const { x: t, y: n } = $d;
  return e === "crosshair" ? fn(t, n - 6, t, n + 6) + fn(t - 6, n, t + 6, n) : e === "ibeam" ? fn(t, n - 6.5, t, n + 6.5) + fn(t - 2.5, n - 6.5, t + 2.5, n - 6.5) + fn(t - 2.5, n + 6.5, t + 2.5, n + 6.5) : `<circle cx="${t}" cy="${n}" r="7.5" fill="${Wy}" stroke="${_n}" stroke-width="1.5"/><line x1="${t}" y1="${n - 3.5}" x2="${t}" y2="${n + 3.5}" stroke="${_n}" stroke-width="2"/><line x1="${t - 3.5}" y1="${n}" x2="${t + 3.5}" y2="${n}" stroke="${_n}" stroke-width="2"/>`;
}
function Yy(e, t, n, o) {
  const r = Vy(t, n, o);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${no}" height="${no}" viewBox="0 0 ${no} ${no}" fill="none" stroke-linecap="round" stroke-linejoin="round">` + qy(e) + (r ? `<g transform="translate(17 3) scale(${(20 / 24).toFixed(4)})" stroke-width="2">${r}</g>` : "") + "</svg>";
}
const Xy = {
  crosshair: "crosshair",
  text: "ibeam",
  copy: "plus"
};
function Zy() {
  const e = jh((s) => s.activeToolId) ?? "pointer", t = hg(e), n = Ac(), o = fg().tools.get(e)?.ghost ? void 0 : Wt[e], r = (s) => t[s] ?? void 0, a = o?.accent ? {
    primary: r(o.accent.primary),
    secondary: o.accent.secondary ? r(o.accent.secondary) : void 0
  } : void 0;
  return Uh(o ? {
    toolId: e,
    cursors: Object.fromEntries(Object.entries(Xy).map(([s, l]) => [s, {
      svg: Yy(l, o.icon, a, n),
      hotspot: $d
    }]))
  } : null), null;
}
const Jy = () => Qe("redact-confirm").isOpen, Qy = () => xg((e) => e.calibrationRequest !== null), e2 = () => Qe("signature-sign").isOpen, t2 = () => Qe("signature-maker").isOpen, n2 = () => Qe("signature-inspector").isOpen, o2 = () => Qe("print").isOpen, r2 = fe(() => import("./redact-confirm-C0AI8Tbt-kx6yQn1w.js").then((e) => e.RedactConfirmModal), { shownWhile: Jy }), a2 = fe(() => import("./measurement-DZOOYxOT-DhLpoEY8.js").then((e) => e.CalibrationDialog), { shownWhile: Qy }), i2 = fe(() => import("./sign-dialog-DETgmjof-E3lEsjm-.js").then((e) => e.SignDialog), { shownWhile: e2 }), s2 = fe(() => import("./signature-maker-DmqserJG-Dqe4dnaT.js").then((e) => e.SignatureMakerModal), { shownWhile: t2 }), l2 = fe(() => import("./signature-inspector-DkpEvdof-B8jYrCeN.js").then((e) => e.SignatureInspector), { shownWhile: n2 }), c2 = fe(() => import("./print-dialog-Bloq0P0B-BhaTDpmp.js").then((e) => e.PrintDialog), { shownWhile: o2 }), d2 = () => Qe(_c).isOpen, Ws = fe(() => import("./grant-prompt-BDEos2cl-4vCbb2Va.js").then((e) => e.GrantPrompt), { prefetch: !1 }), u2 = () => wo((e) => e.identityRequest !== void 0), p2 = fe(() => import("./grant-prompt-BDEos2cl-4vCbb2Va.js").then((e) => e.VisitorIdentityDialog), {
  shownWhile: u2,
  prefetch: !1
}), f2 = fe(() => import("./outline-properties-Fm45njZA-CIdMmLmr.js").then((e) => e.OutlinePropertiesDialog), { shownWhile: d2 });
function m2() {
  const e = uu(tt().data);
  return e === "never" ? null : /* @__PURE__ */ i("slot", {
    name: "tabs",
    children: /* @__PURE__ */ i(Gy, { visibility: e })
  });
}
function h2() {
  const e = Z();
  return /* @__PURE__ */ i("div", {
    className: "grid h-full w-full place-items-center",
    children: /* @__PURE__ */ i("div", {
      className: "text-fg-muted flex flex-col items-center gap-3",
      children: [/* @__PURE__ */ i("div", { className: "border-border-subtle border-t-accent h-8 w-8 animate-spin rounded-full border-2" }), /* @__PURE__ */ i("div", {
        className: "text-sm",
        children: e("demo.opening")
      })]
    })
  });
}
function g2({ children: e }) {
  const t = ye(), n = wo((r) => r.status), o = wo((r) => r.openRequest !== void 0);
  return t === null ? /* @__PURE__ */ i("div", {
    className: "min-w-0 flex-1 overflow-auto",
    children: /* @__PURE__ */ i("slot", { name: "empty" })
  }) : n === "locked" ? /* @__PURE__ */ i(Ow, {}, t) : n === "error" ? o ? /* @__PURE__ */ i(Ws, {}, t) : /* @__PURE__ */ i(Tw, {}, t) : /* @__PURE__ */ i(hh, {
    fallback: /* @__PURE__ */ i(h2, {}),
    children: [e, o && /* @__PURE__ */ i("div", {
      className: "absolute inset-0 z-40",
      children: /* @__PURE__ */ i(Ws, {}, t)
    })]
  });
}
function b2({ children: e }) {
  const { dir: t } = dt();
  return /* @__PURE__ */ i("div", {
    dir: t,
    className: "contents",
    children: e
  });
}
function v2({ components: e }) {
  const t = Cy(), n = k(null);
  return Kg({
    target: n,
    onRefused: t.onShortcutRefused
  }), pg(), Y0(), /* @__PURE__ */ i(D, { children: [/* @__PURE__ */ i(vw, {}), /* @__PURE__ */ i(j1, {
    rootRef: n,
    className: "bg-app text-fg flex h-full flex-col outline-none",
    children: [
      e && /* @__PURE__ */ i(Oy, { components: e }),
      /* @__PURE__ */ i(fv, {}),
      /* @__PURE__ */ i(jy, {}),
      /* @__PURE__ */ i("slot", { name: "header" }),
      /* @__PURE__ */ i(m2, {}),
      /* @__PURE__ */ i(Qn, { edge: "top" }),
      /* @__PURE__ */ i("div", {
        className: "relative flex min-h-0 flex-1",
        children: [
          t.element,
          /* @__PURE__ */ i(Qn, { edge: "start" }),
          /* @__PURE__ */ i(Cw, {
            className: "relative flex min-w-0 flex-1",
            children: /* @__PURE__ */ i(g2, { children: [
              /* @__PURE__ */ i(Ks, { side: "start" }),
              /* @__PURE__ */ i("div", {
                className: "relative min-w-0 flex-1",
                children: [
                  /* @__PURE__ */ i(Zy, {}),
                  /* @__PURE__ */ i(qh, {
                    target: n,
                    onRefused: t.onCopyRefused
                  }),
                  /* @__PURE__ */ i(rc, {
                    overlay: /* @__PURE__ */ i(b2, { children: [
                      /* @__PURE__ */ i(dw, {}),
                      /* @__PURE__ */ i(Pw, {}),
                      /* @__PURE__ */ i(Ey, {}),
                      /* @__PURE__ */ i(Iy, {}),
                      /* @__PURE__ */ i(Ry, {}),
                      /* @__PURE__ */ i(l2, {}),
                      /* @__PURE__ */ i(Vh, {}),
                      /* @__PURE__ */ i(Ar, { axis: "y" }),
                      /* @__PURE__ */ i(Ar, { axis: "x" })
                    ] }),
                    className: "h-full w-full",
                    style: {
                      background: "var(--epdf-canvas)",
                      direction: "ltr"
                    },
                    children: () => /* @__PURE__ */ i(D, { children: [
                      /* @__PURE__ */ i(ic, {}),
                      /* @__PURE__ */ i(Ad, {}),
                      /* @__PURE__ */ i(Gh, {}),
                      /* @__PURE__ */ i(X0, {}),
                      /* @__PURE__ */ i(zg, {}),
                      /* @__PURE__ */ i(dg, {}),
                      /* @__PURE__ */ i(Lg, {}),
                      /* @__PURE__ */ i(Fh, {})
                    ] })
                  })
                ]
              }),
              /* @__PURE__ */ i(Ks, { side: "end" }),
              /* @__PURE__ */ i(r2, {}),
              /* @__PURE__ */ i(a2, {}),
              /* @__PURE__ */ i(Ew, {}),
              /* @__PURE__ */ i(c2, {}),
              /* @__PURE__ */ i(f2, {}),
              /* @__PURE__ */ i(Fy, {}),
              /* @__PURE__ */ i(Hy, {}),
              /* @__PURE__ */ i(Ky, {}),
              /* @__PURE__ */ i(kw, {}),
              /* @__PURE__ */ i(i2, {}),
              /* @__PURE__ */ i(s2, {}),
              /* @__PURE__ */ i(p2, {})
            ] })
          }),
          /* @__PURE__ */ i(Qn, { edge: "end" })
        ]
      }),
      /* @__PURE__ */ i(Qn, { edge: "bottom" }),
      /* @__PURE__ */ i("slot", { name: "footer" })
    ]
  })] });
}
function w2({ slot: e, onReady: t, onDocumentChange: n }) {
  const o = ct();
  return R(() => {
    const r = e.attach(o);
    if (t?.(r), n) {
      r.watch(() => r.documents.getActiveId(), (s) => n(s));
      const a = r.documents.getActiveId();
      a !== null && n(a);
    }
    return () => e.release(o);
  }, [o]), null;
}
const Vs = (e, t) => e.length === t.length && e.every((n, o) => n === t[o]);
function zd(e, t, n) {
  const o = Bv(e, t), r = Kv(e, t), a = (s, l) => l?.length ? [.../* @__PURE__ */ new Set([...s, ...l])] : s;
  return {
    disabled: {
      disabledCategories: a(o.disabledCategories, n.commands?.disabledCategories),
      disabledCommands: a(o.disabledCommands, n.commands?.disabledCommands)
    },
    byHand: {
      editable: vs(r.editable, n.annotation?.editable ?? !0),
      fillable: vs(r.fillable, n.form?.fillable ?? !0)
    }
  };
}
function y2({ registered: e, settings: t, locale: n, disable: o, readOnly: r, appState: a }) {
  const s = ct(), l = k(e);
  return R(() => {
    const { disabled: d, byHand: c } = zd(o, r, t), p = l.current;
    l.current = {
      locale: n,
      disabled: d,
      byHand: c,
      appState: a
    }, Object.is(p.appState, a) || s.capability(De).updateSettings({ appState: a }), ws(p.byHand.editable, c.editable) || s.settingsOf(we).updateSettings({ editable: c.editable }), ws(p.byHand.fillable, c.fillable) || s.settingsOf(nn).updateSettings({ fillable: c.fillable }), (!Vs(p.disabled.disabledCategories, d.disabledCategories) || !Vs(p.disabled.disabledCommands, d.disabledCommands)) && s.capability(De).updateSettings(d), p.locale !== n && s.capability(En).setLocale(n).catch(() => {
    });
  }), null;
}
function _2() {
  return /* @__PURE__ */ i("div", {
    className: "bg-app text-fg-muted grid h-full place-items-center",
    children: /* @__PURE__ */ i("div", {
      className: "animate-pulse text-sm",
      children: Z()("demo.starting")
    })
  });
}
function qs({ engine: e, initialDocuments: t, fetch: n, fallback: o, commands: r, appState: a, icons: s, strings: l, locale: d = "auto", disable: c, readOnly: p, scope: f, identity: u, notAllowed: m, layout: b, size: h, touch: g, plugins: y, fonts: v, warnBeforeLeaving: _, theme: O, themeTarget: S, components: x, onReady: P, onDocumentChange: M, onPanelResize: T }) {
  const [L] = C(nd), [A] = C(() => {
    const se = v1(y), { locales: nt, loaders: ot, codes: Mt } = s1(l), Ft = se.settings.i18n?.fallbackLocale, Ke = t1(Ft, Mt), N = Ke === null ? [`the viewer has no language "${Ft}" to fall back to, so it falls back to English: give its words in \`strings\``] : [], ee = { ...Fa };
    for (const { name: ze, plugin: ut } of se.own) ut.token && (ee[ze] = ut.token);
    const _e = f1(ee), Me = new Set(is.map((ze) => ze.id));
    return {
      slot: _e,
      viewerCommands: Lb([...is, ...Pb(se.settings.annotation?.tools ?? [], (ze) => Me.has(ze))], r ?? [], {
        plugins: ee,
        viewer: _e.current
      }, { isMac: No() }),
      layout: b,
      size: h,
      touch: g,
      icons: s ?? {},
      stamp: se.viewer.stamp,
      signature: se.viewer.signature,
      fonts: v ?? [],
      warnBeforeLeaving: _ !== !1,
      onPanelResize: T,
      i18n: {
        locales: nt,
        loaders: ot,
        codes: Mt,
        fallback: Ke ?? "en",
        initial: Ps(d, Mt, Ke ?? "en")
      },
      plugins: {
        ...se,
        problems: [...se.problems, ...N]
      },
      tokens: ee,
      ...zd(c, p, se.settings),
      appState: a
    };
  });
  E(() => {
  }, [A]), E(() => {
    for (const se of A.plugins.problems) console.warn(`[embedpdf] plugins: ${se}`);
  }, [A]);
  const { settings: F } = A.plugins, [ce] = C(() => [
    ui(Cs({ layout: "vertical" }, F.stage)),
    ui({
      layout: "grid",
      columns: "auto",
      sizing: "uniform",
      zoom: { pageWidth: 150 },
      padding: 20,
      responsive: [],
      gap: { px: 16 },
      pageFrame: {
        top: 0,
        right: 0,
        bottom: 20,
        left: 0
      },
      fitAlign: {
        x: "center",
        y: "start"
      },
      scrollBehavior: "instant",
      interaction: !1,
      zoomGestures: !1,
      ...F.thumbnails,
      id: "stage-thumbs",
      token: yn
    }),
    yf(F.render),
    Wf(),
    bm(),
    hm(),
    Hf(),
    Uf(),
    gf(F.interaction),
    bf({ provider: rf }),
    Bf(F.selection),
    Rf({
      ...F.annotation,
      tools: [
        {
          id: "square",
          ghost: !0
        },
        {
          id: "circle",
          ghost: !0
        },
        {
          id: "line",
          ghost: !0
        },
        {
          id: "arrow",
          extends: "line",
          defaults: { lineEndings: {
            start: "none",
            end: "open-arrow"
          } }
        },
        {
          id: "image",
          extends: "stamp",
          source: {
            kind: "prompt",
            accept: "image/png,image/jpeg"
          }
        },
        ...F.annotation?.tools ?? []
      ],
      editable: A.byHand.editable
    }),
    Nf(),
    Tf({
      fonts: q0(A.signature.fonts),
      ...F.stamp
    }),
    lm(Cs({ javascript: { enabled: !0 } }, F.actions)),
    Lf({
      ...F.form,
      fillable: A.byHand.fillable
    }),
    Xf(F.signature),
    Af(),
    _f(F.redaction),
    Sf(F.measurement),
    fm(F.search),
    Ef({
      locale: A.i18n.initial,
      fallbackLocale: A.i18n.fallback,
      locales: A.i18n.locales,
      loaders: A.i18n.loaders
    }),
    nu({
      ...F.commands,
      commands: [...A.viewerCommands.commands, ...F.commands?.commands ?? []],
      ...A.appState === void 0 ? {} : { appState: A.appState },
      ...A.disabled,
      ...m ? { notAllowed: m } : {}
    }),
    mf(),
    ...A.plugins.own.map(({ plugin: se }) => se)
  ]), te = A;
  return /* @__PURE__ */ i(U0, {
    preference: yd(O).preference,
    target: S,
    children: /* @__PURE__ */ i(vh, {
      engine: e,
      plugins: ce,
      initialDocuments: t,
      fetch: n,
      scope: f,
      identity: u,
      fallback: o ?? /* @__PURE__ */ i(_2, {}),
      onReady: (se) => void A.slot.attach(se),
      children: /* @__PURE__ */ i(Rb, {
        value: te,
        children: [
          /* @__PURE__ */ i(y2, {
            registered: {
              locale: A.i18n.initial,
              disabled: A.disabled,
              byHand: A.byHand,
              appState: A.appState
            },
            settings: F,
            locale: Ps(d, A.i18n.codes, A.i18n.fallback),
            disable: c,
            readOnly: p,
            appState: a
          }),
          /* @__PURE__ */ i(w2, {
            slot: A.slot,
            onReady: P,
            onDocumentChange: M
          }),
          /* @__PURE__ */ i(i0, {
            value: L,
            children: /* @__PURE__ */ i(v2, { components: x })
          })
        ]
      })
    })
  });
}
const x2 = /* @__PURE__ */ new Set([
  "src",
  "theme",
  "locale",
  "disable",
  "readOnly",
  "fetch",
  "appState"
]), k2 = (e) => x2.has(e), Ys = (e) => {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
};
function Hr(e, t) {
  return Object.is(e, t) ? !0 : Array.isArray(e) && Array.isArray(t) ? e.length === t.length && e.every((n, o) => Hr(n, t[o])) : Ys(e) && Ys(t) ? [.../* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)])].every((o) => Hr(e[o], t[o])) : !1;
}
function S2(e, t) {
  const n = e, o = t;
  return [.../* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(o)])].filter((a) => !Hr(n[a], o[a]));
}
function M2(e, t) {
  if (!e) return t;
  const n = { ...e };
  for (const [o, r] of Object.entries(t ?? {})) {
    const a = e[o];
    n[o] = a && r && Object.getPrototypeOf(r) === Object.prototype ? { ...a, ...r } : r;
  }
  return n;
}
const Yo = (e) => typeof e == "object" && "kind" in e, P2 = (e) => typeof e == "string" || e instanceof ArrayBuffer || e instanceof Uint8Array || typeof Blob < "u" && e instanceof Blob;
function O2(e) {
  return (typeof e == "string" ? decodeURIComponent(e.split("?")[0].split("/").pop() ?? "") : typeof File < "u" && e instanceof File ? e.name : "").replace(/\.pdf$/i, "") || "Document";
}
const Fd = (e) => typeof e == "string" ? e : Yo(e) ? "id" in e && typeof e.id == "string" ? e.id : "document" : typeof File < "u" && e instanceof File ? e.name : "document";
function Bd(e, t, n = Promise.resolve()) {
  if (Yo(e))
    return {
      source: async () => (await n, e)
    };
  if (!P2(e))
    return {
      source: async () => {
        throw new mo("invalid-input", "documents", "this viewer can't open that document");
      }
    };
  const o = O2(e);
  return typeof e == "string" ? { name: o, source: async () => ({ kind: "url", url: e, id: t }) } : {
    name: o,
    source: async () => {
      const r = e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : new Uint8Array(e);
      if (!pf(r)) throw new mo("invalid-input", "documents", `${o} isn't a PDF`);
      return { kind: "bytes", id: t, bytes: r };
    }
  };
}
function T2(e, t = (n) => n) {
  const n = /* @__PURE__ */ new Set(), o = (r) => {
    let a = r;
    for (let s = 2; n.has(a); s++) a = `${r}#${s}`;
    return n.add(a), a;
  };
  return e.map(({ src: r, name: a, password: s, active: l }) => {
    const d = t(r);
    return {
      ...Yo(d) ? { source: d } : Bd(d, o(Fd(d))),
      ...a !== void 0 ? { name: a } : {},
      ...s !== void 0 ? { password: s } : {},
      ...l ? { active: l } : {}
    };
  });
}
function C2(e, t) {
  if (!t) return e;
  const n = { ...e };
  for (const [o, r] of Object.entries(t)) r !== void 0 && (n[o] = r);
  return n;
}
function E2(e) {
  const t = {}, n = e.getAttribute("src"), o = e.getAttribute("locale"), r = e.getAttribute("theme");
  return n && (t.src = n), o && (t.locale = o), (r === "light" || r === "dark" || r === "system") && (t.theme = r), t;
}
const A2 = '/*! tailwindcss v4.1.18 | MIT License | https://tailwindcss.com */@layer properties{*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-pan-x:initial;--tw-pan-y:initial;--tw-pinch-zoom:initial;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial;--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-red-400:oklch(70.4% .191 22.216);--color-red-500:oklch(63.7% .237 25.331);--color-red-600:oklch(57.7% .245 27.325);--color-red-700:oklch(50.5% .213 27.518);--color-amber-600:oklch(66.6% .179 58.318);--color-amber-700:oklch(55.5% .163 48.998);--color-green-600:oklch(62.7% .194 149.214);--color-black:#000;--color-white:#fff;--spacing:4px;--container-sm:384px;--text-xs:12px;--text-xs--line-height:calc(1/.75);--text-sm:14px;--text-sm--line-height:calc(1.25/.875);--text-base:16px;--text-base--line-height: 1.5 ;--text-lg:18px;--text-lg--line-height:calc(1.75/1.125);--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--tracking-normal:0em;--tracking-wide:.025em;--ease-out:cubic-bezier(0,0,.2,1);--animate-spin:spin 1s linear infinite;--animate-pulse:pulse 2s cubic-bezier(.4,0,.6,1)infinite;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.pointer-events-auto{pointer-events:auto}.pointer-events-none{pointer-events:none}.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.inset-0{inset:calc(var(--spacing)*0)}.inset-1{inset:calc(var(--spacing)*1)}.inset-2{inset:calc(var(--spacing)*2)}.inset-x-0{inset-inline:calc(var(--spacing)*0)}.inset-x-2{inset-inline:calc(var(--spacing)*2)}.inset-y-0{inset-block:calc(var(--spacing)*0)}.inset-y-1{inset-block:calc(var(--spacing)*1)}.-start-1{inset-inline-start:calc(var(--spacing)*-1)}.start-0{inset-inline-start:calc(var(--spacing)*0)}.start-2{inset-inline-start:calc(var(--spacing)*2)}.-end-1{inset-inline-end:calc(var(--spacing)*-1)}.end-0{inset-inline-end:calc(var(--spacing)*0)}.end-1{inset-inline-end:calc(var(--spacing)*1)}.end-2{inset-inline-end:calc(var(--spacing)*2)}.end-4{inset-inline-end:calc(var(--spacing)*4)}.top-0{top:calc(var(--spacing)*0)}.top-1{top:calc(var(--spacing)*1)}.top-2{top:calc(var(--spacing)*2)}.top-4{top:calc(var(--spacing)*4)}.bottom-16{bottom:calc(var(--spacing)*16)}.isolate{isolation:isolate}.z-10{z-index:10}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.z-\\[35\\]{z-index:35}.col-start-1{grid-column-start:1}.row-start-1{grid-row-start:1}.container{width:100%}@media(min-width:640px){.container{max-width:640px}}@media(min-width:768px){.container{max-width:768px}}@media(min-width:1024px){.container{max-width:1024px}}@media(min-width:1280px){.container{max-width:1280px}}@media(min-width:1536px){.container{max-width:1536px}}.m-0{margin:calc(var(--spacing)*0)}.my-1{margin-block:calc(var(--spacing)*1)}.-ms-1\\.5{margin-inline-start:calc(var(--spacing)*-1.5)}.ms-1{margin-inline-start:calc(var(--spacing)*1)}.ms-1\\.5{margin-inline-start:calc(var(--spacing)*1.5)}.ms-4{margin-inline-start:calc(var(--spacing)*4)}.me-1\\.5{margin-inline-end:calc(var(--spacing)*1.5)}.mt-0\\.5{margin-top:calc(var(--spacing)*.5)}.mt-1{margin-top:calc(var(--spacing)*1)}.mt-1\\.5{margin-top:calc(var(--spacing)*1.5)}.mt-2{margin-top:calc(var(--spacing)*2)}.mt-2\\.5{margin-top:calc(var(--spacing)*2.5)}.mt-3{margin-top:calc(var(--spacing)*3)}.mt-4{margin-top:calc(var(--spacing)*4)}.mt-5{margin-top:calc(var(--spacing)*5)}.mt-6{margin-top:calc(var(--spacing)*6)}.mb-1{margin-bottom:calc(var(--spacing)*1)}.mb-1\\.5{margin-bottom:calc(var(--spacing)*1.5)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.mb-3{margin-bottom:calc(var(--spacing)*3)}.mb-4{margin-bottom:calc(var(--spacing)*4)}.mb-5{margin-bottom:calc(var(--spacing)*5)}.box-border{box-sizing:border-box}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-flex{display:inline-flex}.table{display:table}.aspect-square{aspect-ratio:1}.h-0{height:calc(var(--spacing)*0)}.h-0\\.5{height:calc(var(--spacing)*.5)}.h-1{height:calc(var(--spacing)*1)}.h-1\\.5{height:calc(var(--spacing)*1.5)}.h-3{height:calc(var(--spacing)*3)}.h-4{height:calc(var(--spacing)*4)}.h-5{height:calc(var(--spacing)*5)}.h-6{height:calc(var(--spacing)*6)}.h-7{height:calc(var(--spacing)*7)}.h-8{height:calc(var(--spacing)*8)}.h-9{height:calc(var(--spacing)*9)}.h-16{height:calc(var(--spacing)*16)}.h-24{height:calc(var(--spacing)*24)}.h-full{height:100%}.h-px{height:1px}.max-h-48{max-height:calc(var(--spacing)*48)}.max-h-60{max-height:calc(var(--spacing)*60)}.max-h-full{max-height:100%}.min-h-0{min-height:calc(var(--spacing)*0)}.min-h-5{min-height:calc(var(--spacing)*5)}.min-h-11{min-height:calc(var(--spacing)*11)}.w-0\\.5{width:calc(var(--spacing)*.5)}.w-2{width:calc(var(--spacing)*2)}.w-3{width:calc(var(--spacing)*3)}.w-4{width:calc(var(--spacing)*4)}.w-5{width:calc(var(--spacing)*5)}.w-6{width:calc(var(--spacing)*6)}.w-7{width:calc(var(--spacing)*7)}.w-8{width:calc(var(--spacing)*8)}.w-9{width:calc(var(--spacing)*9)}.w-10{width:calc(var(--spacing)*10)}.w-24{width:calc(var(--spacing)*24)}.w-36{width:calc(var(--spacing)*36)}.w-64{width:calc(var(--spacing)*64)}.w-72{width:calc(var(--spacing)*72)}.w-80{width:calc(var(--spacing)*80)}.w-96{width:calc(var(--spacing)*96)}.w-\\[24rem\\]{width:384px}.w-\\[26rem\\]{width:416px}.w-auto{width:auto}.w-full{width:100%}.w-px{width:1px}.max-w-64{max-width:calc(var(--spacing)*64)}.max-w-\\[16rem\\]{max-width:256px}.max-w-\\[180px\\]{max-width:180px}.max-w-\\[240px\\]{max-width:240px}.max-w-\\[calc\\(100\\%-1rem\\)\\]{max-width:calc(100% - 16px)}.max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 32px)}.max-w-full{max-width:100%}.max-w-sm{max-width:var(--container-sm)}.min-w-0{min-width:calc(var(--spacing)*0)}.min-w-8{min-width:calc(var(--spacing)*8)}.min-w-48{min-width:calc(var(--spacing)*48)}.min-w-52{min-width:calc(var(--spacing)*52)}.min-w-56{min-width:calc(var(--spacing)*56)}.min-w-\\[120px\\]{min-width:120px}.flex-1{flex:1}.flex-shrink-0{flex-shrink:0}.shrink{flex-shrink:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.origin-top-left{transform-origin:0 0}.rotate-90{rotate:90deg}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.animate-pulse{animation:var(--animate-pulse)}.animate-spin{animation:var(--animate-spin)}.cursor-col-resize{cursor:col-resize}.cursor-default{cursor:default}.cursor-grab{cursor:grab}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.touch-pan-x{--tw-pan-x:pan-x;touch-action:var(--tw-pan-x,)var(--tw-pan-y,)var(--tw-pinch-zoom,)}.touch-manipulation{touch-action:manipulation}.touch-none{touch-action:none}.resize{resize:both}.resize-none{resize:none}.appearance-none{appearance:none}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.grid-cols-\\[2fr_1fr\\]{grid-template-columns:2fr 1fr}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-nowrap{flex-wrap:nowrap}.flex-wrap{flex-wrap:wrap}.place-items-center{place-items:center}.items-baseline{align-items:baseline}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.gap-0\\.5{gap:calc(var(--spacing)*.5)}.gap-1{gap:calc(var(--spacing)*1)}.gap-1\\.5{gap:calc(var(--spacing)*1.5)}.gap-2{gap:calc(var(--spacing)*2)}.gap-2\\.5{gap:calc(var(--spacing)*2.5)}.gap-3{gap:calc(var(--spacing)*3)}.gap-4{gap:calc(var(--spacing)*4)}.gap-5{gap:calc(var(--spacing)*5)}.gap-x-1{column-gap:calc(var(--spacing)*1)}.gap-x-4{column-gap:calc(var(--spacing)*4)}.gap-y-2{row-gap:calc(var(--spacing)*2)}.gap-y-3{row-gap:calc(var(--spacing)*3)}.self-center{align-self:center}.self-start{align-self:flex-start}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-auto{overflow:auto}.overflow-clip{overflow:clip}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-x-auto{overflow-x:auto}.overflow-x-hidden{overflow-x:hidden}.overflow-y-auto{overflow-y:auto}.overscroll-contain{overscroll-behavior:contain}.rounded{border-radius:calc(var(--epdf-radius)*2/3)}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:calc(var(--epdf-radius)*4/3)}.rounded-md{border-radius:var(--epdf-radius)}.rounded-none{border-radius:0}.rounded-sm{border-radius:calc(var(--epdf-radius)*2/3)}.rounded-xl{border-radius:calc(var(--epdf-radius)*2)}.rounded-xs{border-radius:calc(var(--epdf-radius)/2)}.rounded-t-2xl{border-top-left-radius:calc(var(--epdf-radius)*8/3);border-top-right-radius:calc(var(--epdf-radius)*8/3)}.rounded-t-lg{border-top-left-radius:calc(var(--epdf-radius)*4/3);border-top-right-radius:calc(var(--epdf-radius)*4/3)}.border{border-style:var(--tw-border-style);border-width:1px}.border-0{border-style:var(--tw-border-style);border-width:0}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-x{border-inline-style:var(--tw-border-style);border-inline-width:1px}.border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-b-2{border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-none{--tw-border-style:none;border-style:none}.border-accent{border-color:var(--epdf-accent)}.border-border,.border-border-strong{border-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.border-border-strong{border-color:color-mix(in srgb,var(--epdf-border)75%,var(--epdf-text))}}.border-border-subtle{border-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.border-border-subtle{border-color:color-mix(in srgb,var(--epdf-border)50%,var(--epdf-surface))}}.border-red-400{border-color:var(--color-red-400)}.border-red-500\\/40{border-color:#fb2c3666}@supports (color:color-mix(in lab,red,red)){.border-red-500\\/40{border-color:color-mix(in oklab,var(--color-red-500)40%,transparent)}}.border-transparent{border-color:#0000}.border-t-accent{border-top-color:var(--epdf-accent)}.border-b-accent{border-bottom-color:var(--epdf-accent)}.border-b-transparent{border-bottom-color:#0000}.bg-accent,.bg-accent-active{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.bg-accent-active{background-color:color-mix(in srgb,var(--epdf-accent)65%,black)}}.bg-accent-light,.bg-accent-light\\/60{background-color:var(--embedpdf-accent-tint)}@supports (color:color-mix(in lab,red,red)){.bg-accent-light\\/60{background-color:color-mix(in oklab,var(--embedpdf-accent-tint)60%,transparent)}}.bg-accent\\/10{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.bg-accent\\/10{background-color:color-mix(in oklab,var(--epdf-accent)10%,transparent)}}.bg-app{background-color:var(--epdf-background)}.bg-black\\/30{background-color:#0000004d}@supports (color:color-mix(in lab,red,red)){.bg-black\\/30{background-color:color-mix(in oklab,var(--color-black)30%,transparent)}}.bg-black\\/80{background-color:#000c}@supports (color:color-mix(in lab,red,red)){.bg-black\\/80{background-color:color-mix(in oklab,var(--color-black)80%,transparent)}}.bg-border,.bg-border-strong{background-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.bg-border-strong{background-color:color-mix(in srgb,var(--epdf-border)75%,var(--epdf-text))}}.bg-border-subtle{background-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.bg-border-subtle{background-color:color-mix(in srgb,var(--epdf-border)50%,var(--epdf-surface))}}.bg-elevated,.bg-elevated\\/95{background-color:var(--epdf-surface-raised)}@supports (color:color-mix(in lab,red,red)){.bg-elevated\\/95{background-color:color-mix(in oklab,var(--epdf-surface-raised)95%,transparent)}}.bg-hover{background-color:var(--epdf-hover)}.bg-red-500\\/10{background-color:#fb2c361a}@supports (color:color-mix(in lab,red,red)){.bg-red-500\\/10{background-color:color-mix(in oklab,var(--color-red-500)10%,transparent)}}.bg-red-600{background-color:var(--color-red-600)}.bg-selected{background-color:var(--embedpdf-accent-tint)}.bg-surface,.bg-surface-alt{background-color:var(--epdf-surface)}@supports (color:color-mix(in lab,red,red)){.bg-surface-alt{background-color:color-mix(in srgb,var(--epdf-surface),var(--epdf-text)6%)}}.bg-surface\\/60{background-color:var(--epdf-surface)}@supports (color:color-mix(in lab,red,red)){.bg-surface\\/60{background-color:color-mix(in oklab,var(--epdf-surface)60%,transparent)}}.bg-surface\\/80{background-color:var(--epdf-surface)}@supports (color:color-mix(in lab,red,red)){.bg-surface\\/80{background-color:color-mix(in oklab,var(--epdf-surface)80%,transparent)}}.bg-tooltip{background-color:var(--epdf-tooltip)}.bg-transparent{background-color:#0000}.object-contain{object-fit:contain}.p-0{padding:calc(var(--spacing)*0)}.p-1{padding:calc(var(--spacing)*1)}.p-2{padding:calc(var(--spacing)*2)}.p-3{padding:calc(var(--spacing)*3)}.p-4{padding:calc(var(--spacing)*4)}.p-5{padding:calc(var(--spacing)*5)}.p-6{padding:calc(var(--spacing)*6)}.p-8{padding:calc(var(--spacing)*8)}.p-\\[5px\\]{padding:5px}.px-1{padding-inline:calc(var(--spacing)*1)}.px-1\\.5{padding-inline:calc(var(--spacing)*1.5)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-2\\.5{padding-inline:calc(var(--spacing)*2.5)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-4{padding-inline:calc(var(--spacing)*4)}.py-0\\.5{padding-block:calc(var(--spacing)*.5)}.py-1{padding-block:calc(var(--spacing)*1)}.py-1\\.5{padding-block:calc(var(--spacing)*1.5)}.py-2{padding-block:calc(var(--spacing)*2)}.py-2\\.5{padding-block:calc(var(--spacing)*2.5)}.py-4{padding-block:calc(var(--spacing)*4)}.py-8{padding-block:calc(var(--spacing)*8)}.py-10{padding-block:calc(var(--spacing)*10)}.ps-2{padding-inline-start:calc(var(--spacing)*2)}.ps-2\\.5{padding-inline-start:calc(var(--spacing)*2.5)}.ps-3{padding-inline-start:calc(var(--spacing)*3)}.ps-7{padding-inline-start:calc(var(--spacing)*7)}.ps-8{padding-inline-start:calc(var(--spacing)*8)}.pe-1{padding-inline-end:calc(var(--spacing)*1)}.pe-2{padding-inline-end:calc(var(--spacing)*2)}.pe-2\\.5{padding-inline-end:calc(var(--spacing)*2.5)}.pe-7{padding-inline-end:calc(var(--spacing)*7)}.pe-9{padding-inline-end:calc(var(--spacing)*9)}.pt-1\\.5{padding-top:calc(var(--spacing)*1.5)}.pt-2{padding-top:calc(var(--spacing)*2)}.pt-3{padding-top:calc(var(--spacing)*3)}.pt-4{padding-top:calc(var(--spacing)*4)}.pr-2{padding-right:calc(var(--spacing)*2)}.pb-0{padding-bottom:calc(var(--spacing)*0)}.pb-1{padding-bottom:calc(var(--spacing)*1)}.pb-1\\.5{padding-bottom:calc(var(--spacing)*1.5)}.pb-3{padding-bottom:calc(var(--spacing)*3)}.pl-4{padding-left:calc(var(--spacing)*4)}.text-center{text-align:center}.text-end{text-align:end}.text-left{text-align:left}.text-start{text-align:start}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[11px\\]{font-size:11px}.text-\\[13px\\]{font-size:13px}.leading-4{--tw-leading:calc(var(--spacing)*4);line-height:calc(var(--spacing)*4)}.leading-8{--tw-leading:calc(var(--spacing)*8);line-height:calc(var(--spacing)*8)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-normal{--tw-tracking:var(--tracking-normal);letter-spacing:var(--tracking-normal)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.whitespace-normal{white-space:normal}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.text-accent{color:var(--epdf-accent)}.text-amber-600{color:var(--color-amber-600)}.text-amber-700{color:var(--color-amber-700)}.text-fg{color:var(--epdf-text)}.text-fg-disabled{color:var(--epdf-text-muted)}@supports (color:color-mix(in lab,red,red)){.text-fg-disabled{color:color-mix(in srgb,var(--epdf-text-muted)60%,var(--epdf-surface))}}.text-fg-muted{color:var(--epdf-text-muted)}.text-fg-secondary{color:var(--epdf-text)}@supports (color:color-mix(in lab,red,red)){.text-fg-secondary{color:color-mix(in srgb,var(--epdf-text)65%,var(--epdf-text-muted))}}.text-green-600{color:var(--color-green-600)}.text-on-accent{color:var(--epdf-surface)}.text-red-500{color:var(--color-red-500)}.text-red-600{color:var(--color-red-600)}.text-tooltip-fg{color:var(--epdf-tooltip-text)}.text-white{color:var(--color-white)}.normal-case{text-transform:none}.uppercase{text-transform:uppercase}.italic{font-style:italic}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,)}.underline{text-decoration-line:underline}.accent-accent{accent-color:var(--epdf-accent)}.opacity-0{opacity:0}.opacity-40{opacity:.4}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-75{opacity:.75}.opacity-80{opacity:.8}.opacity-100{opacity:1}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring,.ring-1{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-accent{--tw-ring-color:var(--epdf-accent)}.ring-accent-light{--tw-ring-color:var(--embedpdf-accent-tint)}.ring-accent\\/40{--tw-ring-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.ring-accent\\/40{--tw-ring-color:color-mix(in oklab,var(--epdf-accent)40%,transparent)}}.ring-accent\\/60{--tw-ring-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.ring-accent\\/60{--tw-ring-color:color-mix(in oklab,var(--epdf-accent)60%,transparent)}}.ring-offset-1{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,)0 0 0 var(--tw-ring-offset-width)var(--tw-ring-offset-color)}.\\!outline{outline-style:var(--tw-outline-style)!important;outline-width:1px!important}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.outline-2{outline-style:var(--tw-outline-style);outline-width:2px}.outline-offset-2{outline-offset:2px}.outline-accent{outline-color:var(--epdf-accent)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition-\\[translate\\,height\\]{transition-property:translate,height;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[translate\\]{transition-property:translate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-100{--tw-duration:.1s;transition-duration:.1s}.duration-200{--tw-duration:.2s;transition-duration:.2s}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}.\\[font-variant-emoji\\:text\\]{font-variant-emoji:text}.ring-inset{--tw-ring-inset:inset}@media(hover:hover){.group-hover\\:opacity-100:is(:where(.group):hover *),.group-hover\\/body\\:opacity-100:is(:where(.group\\/body):hover *){opacity:1}}.peer-checked\\:opacity-100:is(:where(.peer):checked~*){opacity:1}.selection\\:underline ::selection{text-decoration-line:underline}.selection\\:underline::selection{text-decoration-line:underline}.placeholder\\:text-fg-muted::placeholder{color:var(--epdf-text-muted)}.first\\:mt-0:first-child{margin-top:calc(var(--spacing)*0)}.open\\:flex:is([open],:popover-open,:open){display:flex}.open\\:grid:is([open],:popover-open,:open){display:grid}.open\\:flex-col:is([open],:popover-open,:open){flex-direction:column}.open\\:justify-end:is([open],:popover-open,:open){justify-content:flex-end}.checked\\:border-accent:checked{border-color:var(--epdf-accent)}.checked\\:bg-accent:checked{background-color:var(--epdf-accent)}.focus-within\\:opacity-100:focus-within{opacity:1}@media(hover:hover){.hover\\:border-border:hover{border-color:var(--epdf-border)}.hover\\:border-b-accent:hover{border-bottom-color:var(--epdf-accent)}.hover\\:border-b-fg-muted:hover{border-bottom-color:var(--epdf-text-muted)}.hover\\:bg-accent:hover,.hover\\:bg-accent-hover:hover{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-accent-hover:hover{background-color:color-mix(in srgb,var(--epdf-accent)80%,black)}}.hover\\:bg-accent\\/20:hover{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-accent\\/20:hover{background-color:color-mix(in oklab,var(--epdf-accent)20%,transparent)}}.hover\\:bg-hover:hover{background-color:var(--epdf-hover)}.hover\\:bg-red-700:hover{background-color:var(--color-red-700)}.hover\\:bg-transparent:hover{background-color:#0000}.hover\\:text-fg:hover,.hover\\:text-fg-secondary:hover{color:var(--epdf-text)}@supports (color:color-mix(in lab,red,red)){.hover\\:text-fg-secondary:hover{color:color-mix(in srgb,var(--epdf-text)65%,var(--epdf-text-muted))}}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-90:hover{opacity:.9}.hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring:hover{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring-0:hover{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(0px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring-accent:hover{--tw-ring-color:var(--epdf-accent)}}.focus\\:border-accent:focus{border-color:var(--epdf-accent)}.focus\\:border-red-400:focus{border-color:var(--color-red-400)}.focus\\:opacity-100:focus{opacity:1}.focus\\:ring-1:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-accent:focus{--tw-ring-color:var(--epdf-accent)}.focus\\:ring-red-400:focus{--tw-ring-color:var(--color-red-400)}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.focus-visible\\:bg-accent\\/40:focus-visible{background-color:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:bg-accent\\/40:focus-visible{background-color:color-mix(in oklab,var(--epdf-accent)40%,transparent)}}.focus-visible\\:bg-hover:focus-visible{background-color:var(--epdf-hover)}.focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-accent:focus-visible{--tw-ring-color:var(--epdf-accent)}.focus-visible\\:ring-inset:focus-visible{--tw-ring-inset:inset}.active\\:cursor-grabbing:active{cursor:grabbing}.disabled\\:cursor-default:disabled{cursor:default}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-40:disabled{opacity:.4}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-60:disabled{opacity:.6}:where([data-dragging]) .in-data-dragging\\:transition-none{transition-property:none}.aria-disabled\\:cursor-not-allowed[aria-disabled=true]{cursor:not-allowed}.aria-disabled\\:opacity-40[aria-disabled=true]{opacity:.4}@media(hover:hover){.aria-disabled\\:hover\\:bg-transparent[aria-disabled=true]:hover{background-color:#0000}}.aria-\\[invalid\\=true\\]\\:border-red-600[aria-invalid=true]{border-color:var(--color-red-600)}@media(prefers-reduced-motion:no-preference){.motion-safe\\:animate-spin{animation:var(--animate-spin)}}@media(prefers-reduced-motion:reduce){.motion-reduce\\:transition-none{transition-property:none}}.rtl\\:origin-top-right:where(:dir(rtl),[dir=rtl],[dir=rtl] *){transform-origin:100% 0}.rtl\\:-scale-x-100:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-scale-x: -100% ;scale:var(--tw-scale-x)var(--tw-scale-y)}.rtl\\:-rotate-90:where(:dir(rtl),[dir=rtl],[dir=rtl] *){rotate:-90deg}@starting-style{.starting\\:-translate-x-full{--tw-translate-x:-100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.starting\\:translate-x-full{--tw-translate-x:100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.starting\\:translate-y-full{--tw-translate-y:100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.starting\\:opacity-0{opacity:0}}@starting-style{.rtl\\:starting\\:-translate-x-full:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@starting-style{.rtl\\:starting\\:translate-x-full:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:100%;translate:var(--tw-translate-x)var(--tw-translate-y)}}@media(forced-colors:active){.forced-colors\\:outline-2{outline-style:var(--tw-outline-style);outline-width:2px}.forced-colors\\:-outline-offset-2{outline-offset:-2px}.forced-colors\\:outline-solid{--tw-outline-style:solid;outline-style:solid}}.float-pill\\:pointer-events-auto>div:has(>[data-epdf-toolbar-item]:not(:empty)){pointer-events:auto}.float-pill\\:rounded-lg>div:has(>[data-epdf-toolbar-item]:not(:empty)){border-radius:calc(var(--epdf-radius)*4/3)}.float-pill\\:border>div:has(>[data-epdf-toolbar-item]:not(:empty)){border-style:var(--tw-border-style);border-width:1px}.float-pill\\:border-border-subtle>div:has(>[data-epdf-toolbar-item]:not(:empty)){border-color:var(--epdf-border)}@supports (color:color-mix(in lab,red,red)){.float-pill\\:border-border-subtle>div:has(>[data-epdf-toolbar-item]:not(:empty)){border-color:color-mix(in srgb,var(--epdf-border)50%,var(--epdf-surface))}}.float-pill\\:bg-elevated\\/95>div:has(>[data-epdf-toolbar-item]:not(:empty)){background-color:var(--epdf-surface-raised)}@supports (color:color-mix(in lab,red,red)){.float-pill\\:bg-elevated\\/95>div:has(>[data-epdf-toolbar-item]:not(:empty)){background-color:color-mix(in oklab,var(--epdf-surface-raised)95%,transparent)}}.float-pill\\:p-0\\.5>div:has(>[data-epdf-toolbar-item]:not(:empty)){padding:calc(var(--spacing)*.5)}.float-pill\\:shadow-lg>div:has(>[data-epdf-toolbar-item]:not(:empty)){--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}}:host{--embedpdf-host-accent:var(--epdf-accent);--embedpdf-host-background:var(--epdf-background);--embedpdf-host-surface:var(--epdf-surface);--embedpdf-host-surface-raised:var(--epdf-surface-raised);--embedpdf-host-text:var(--epdf-text);--embedpdf-host-text-muted:var(--epdf-text-muted);--embedpdf-host-border:var(--epdf-border);--embedpdf-host-hover:var(--epdf-hover);--embedpdf-host-canvas:var(--epdf-canvas);--embedpdf-host-page-background:var(--epdf-page-background);--embedpdf-host-page-shadow:var(--epdf-page-shadow);--embedpdf-host-tooltip:var(--epdf-tooltip);--embedpdf-host-tooltip-text:var(--epdf-tooltip-text);--embedpdf-host-radius:var(--epdf-radius);--embedpdf-host-font:var(--epdf-font);--embedpdf-host-scrollbar-thumb:var(--epdf-scrollbar-thumb);--embedpdf-host-toolbar-surface:var(--epdf-toolbar-surface);--embedpdf-host-toolbar-border:var(--epdf-toolbar-border);--embedpdf-host-toolbar-active:var(--epdf-toolbar-active)}:root,[data-embedpdf-root]{--epdf-accent:var(--embedpdf-host-accent,#3b82f6);--epdf-background:var(--embedpdf-host-background,#f3f4f6);--epdf-surface:var(--embedpdf-host-surface,#fff);--epdf-surface-raised:var(--embedpdf-host-surface-raised,#fff);--epdf-text:var(--embedpdf-host-text,#111827);--epdf-text-muted:var(--embedpdf-host-text-muted,#6b7280);--epdf-border:var(--embedpdf-host-border,#d1d5db);--epdf-hover:var(--embedpdf-host-hover,#f3f4f6);--epdf-canvas:var(--embedpdf-host-canvas,#f3f4f6);--epdf-page-background:var(--embedpdf-host-page-background,#fff);--epdf-page-shadow:var(--embedpdf-host-page-shadow,0 6px 18px #0000002e);--epdf-tooltip:var(--embedpdf-host-tooltip,var(--epdf-text));--epdf-tooltip-text:var(--embedpdf-host-tooltip-text,var(--epdf-surface));--epdf-radius:var(--embedpdf-host-radius,6px);--epdf-font:var(--embedpdf-host-font,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");--epdf-scrollbar-thumb:var(--embedpdf-host-scrollbar-thumb,var(--epdf-text))}@supports (color:color-mix(in lab,red,red)){:root,[data-embedpdf-root]{--epdf-scrollbar-thumb:var(--embedpdf-host-scrollbar-thumb,color-mix(in srgb,var(--epdf-text)35%,transparent))}}:root,[data-embedpdf-root]{--epdf-toolbar-surface:var(--embedpdf-host-toolbar-surface,var(--epdf-surface-raised));--epdf-toolbar-border:var(--embedpdf-host-toolbar-border,var(--epdf-border));--epdf-toolbar-active:var(--embedpdf-host-toolbar-active,var(--epdf-hover))}@supports (color:color-mix(in lab,red,red)){:root,[data-embedpdf-root]{--epdf-toolbar-active:var(--embedpdf-host-toolbar-active,color-mix(in srgb,var(--epdf-hover)90%,var(--epdf-text)))}}:root,[data-embedpdf-root]{--embedpdf-accent-tint:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){:root,[data-embedpdf-root]{--embedpdf-accent-tint:color-mix(in srgb,var(--epdf-accent)8%,var(--epdf-surface))}}.dark{--epdf-accent:var(--embedpdf-host-accent,#60a5fa);--epdf-background:var(--embedpdf-host-background,#111827);--epdf-surface:var(--embedpdf-host-surface,#1f2937);--epdf-surface-raised:var(--embedpdf-host-surface-raised,#1f2937);--epdf-text:var(--embedpdf-host-text,#f9fafb);--epdf-text-muted:var(--embedpdf-host-text-muted,#9ca3af);--epdf-border:var(--embedpdf-host-border,#4b5563);--epdf-hover:var(--embedpdf-host-hover,#374151);--epdf-canvas:var(--embedpdf-host-canvas,#0d1117);--epdf-tooltip:var(--embedpdf-host-tooltip,var(--epdf-text));--epdf-tooltip-text:var(--embedpdf-host-tooltip-text,var(--epdf-surface));--epdf-scrollbar-thumb:var(--embedpdf-host-scrollbar-thumb,var(--epdf-text))}@supports (color:color-mix(in lab,red,red)){.dark{--epdf-scrollbar-thumb:var(--embedpdf-host-scrollbar-thumb,color-mix(in srgb,var(--epdf-text)28%,transparent))}}.dark{--embedpdf-accent-tint:var(--epdf-accent)}@supports (color:color-mix(in lab,red,red)){.dark{--embedpdf-accent-tint:color-mix(in srgb,var(--epdf-accent)25%,var(--epdf-surface))}}html,body,#root{height:100%;margin:0}body{font-family:var(--epdf-font);color:var(--epdf-text);background:var(--epdf-background)}[data-measure-layer]{pointer-events:none}[data-embedpdf-scrollbar-thumb]{transition:background .15s}[data-embedpdf-scrollbar-thumb]:hover,[data-embedpdf-scrollbar][data-dragging] [data-embedpdf-scrollbar-thumb]{background:var(--epdf-text-muted)}[data-epdf-fills-window]:popover-open{border:0;width:auto;max-width:none;height:auto;max-height:none;margin:0;padding:0;position:fixed;inset:0}[data-touch] [role=toolbar] button,[data-touch] [role=tab],[data-touch] [data-epdf-panel-header] button,[data-touch] [role=menu] :is([role=menuitem],[role=menuitemradio],[role=menuitemcheckbox]){min-height:44px}[data-touch] [role=toolbar] button,[data-touch] [data-epdf-panel-header] button{min-width:44px}[data-touch] :is(input,textarea,select){font-size:16px}[data-float] [data-bar]{transition:opacity .15s}[data-float] [data-idle-hidden]{opacity:0;transition:opacity .5s}[data-idle-hidden] *{pointer-events:none}@media(prefers-reduced-motion:reduce){[data-float] [data-bar]{transition:none}}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-pan-x{syntax:"*";inherits:false}@property --tw-pan-y{syntax:"*";inherits:false}@property --tw-pinch-zoom{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}';
function Xo(e) {
  const t = new CSSStyleSheet();
  return t.replaceSync(e), t;
}
let Xs = null;
function Kd() {
  return Xs ?? (Xs = Xo(A2)), Xs;
}
const kr = Symbol.for("@embedpdf/viewer/placed-components");
function jr(e) {
  const t = e;
  return t[kr] || Object.defineProperty(t, kr, { value: gy() }), t[kr];
}
function N2(e) {
  for (let t = e.parentNode; t; )
    if (t instanceof ShadowRoot) t = t.host;
    else {
      if (t instanceof Element && t.localName === "embedpdf-viewer") return t;
      t = t.parentNode;
    }
  return null;
}
const I2 = ":host{display:inline-flex;vertical-align:middle}:host([hidden]){display:none}";
let Zs = null;
const L2 = () => (Zs ?? (Zs = [Kd(), Xo(I2)]), Zs), Hd = typeof HTMLElement > "u" ? class {
} : HTMLElement, Ie = (e, t) => e.getAttribute(t);
function Ye(e, t, n) {
  n === null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
const Xa = (e) => e.hasAttribute("active"), jd = (e, t) => {
  e.toggleAttribute("active", !!t);
};
var at, wt;
class Za extends Hd {
  constructor() {
    super(...arguments);
    ge(this, at, null);
    ge(this, wt, null);
  }
  /** Whether what it draws takes focus: a button does, an icon doesn't. */
  get focusable() {
    return !0;
  }
  connectedCallback() {
    $(this, wt) || (ue(this, wt, this.attachShadow({ mode: "open", delegatesFocus: this.focusable })), $(this, wt).adoptedStyleSheets = L2()), this.focusable && !this.hasAttribute("tabindex") && (this.tabIndex = 0), ue(this, at, N2(this)), this.changed();
  }
  disconnectedCallback() {
    $(this, at) && jr($(this, at)).remove(this), ue(this, at, null);
  }
  attributeChangedCallback() {
    this.changed();
  }
  /** Tells the viewer what this element says now. */
  changed() {
    $(this, at) && $(this, wt) && jr($(this, at)).place(this.describe($(this, wt)));
  }
}
at = new WeakMap(), wt = new WeakMap();
const Ja = class Ja extends Za {
  /** The command it is, by id. */
  get command() {
    return Ie(this, "command");
  }
  set command(t) {
    Ye(this, "command", t);
  }
  /** Its icon, by name: the viewer's or one of yours. */
  get icon() {
    return Ie(this, "icon");
  }
  set icon(t) {
    Ye(this, "icon", t);
  }
  /** Its name, for its tooltip and screen readers. */
  get label() {
    return Ie(this, "label");
  }
  set label(t) {
    Ye(this, "label", t);
  }
  /** Shown pressed: the `active` attribute, there or not. */
  get active() {
    return Xa(this);
  }
  set active(t) {
    jd(this, t);
  }
  describe(t) {
    return {
      kind: "button",
      host: this,
      root: t,
      command: this.command,
      icon: this.icon,
      label: this.label,
      active: this.active
    };
  }
};
Ja.observedAttributes = ["command", "icon", "label", "active"];
let Ur = Ja;
class R2 extends Hd {
  /** The command it is, by id. */
  get command() {
    return Ie(this, "command");
  }
  set command(t) {
    Ye(this, "command", t);
  }
  /** Its icon, by name: the viewer's or one of yours. */
  get icon() {
    return Ie(this, "icon");
  }
  set icon(t) {
    Ye(this, "icon", t);
  }
  /** Shown checked: the `active` attribute, there or not. */
  get active() {
    return Xa(this);
  }
  set active(t) {
    jd(this, t);
  }
}
var Yt;
const Qa = class Qa extends Za {
  constructor() {
    super(...arguments);
    ge(this, Yt, null);
  }
  /** Its icon, by name: the viewer's or one of yours. */
  get icon() {
    return Ie(this, "icon");
  }
  set icon(n) {
    Ye(this, "icon", n);
  }
  /** Its name, for its tooltip and screen readers. */
  get label() {
    return Ie(this, "label");
  }
  set label(n) {
    Ye(this, "label", n);
  }
  connectedCallback() {
    $(this, Yt) ?? ue(this, Yt, new MutationObserver(() => this.changed())), $(this, Yt).observe(this, {
      childList: !0,
      subtree: !0,
      characterData: !0,
      attributes: !0,
      attributeFilter: ["command", "icon", "active"]
    }), super.connectedCallback();
  }
  disconnectedCallback() {
    $(this, Yt)?.disconnect(), super.disconnectedCallback();
  }
  describe(n) {
    const o = [...this.children].filter((r) => r.localName === "epdf-menu-item").map(
      (r) => ({
        command: Ie(r, "command"),
        icon: Ie(r, "icon"),
        label: r.textContent?.trim() ?? "",
        active: Xa(r),
        select: () => r.dispatchEvent(new CustomEvent("select", { bubbles: !0 }))
      })
    );
    return { kind: "menu", host: this, root: n, icon: this.icon, label: this.label, items: o };
  }
};
Yt = new WeakMap(), Qa.observedAttributes = ["icon", "label"];
let Gr = Qa;
const ei = class ei extends Za {
  get focusable() {
    return !1;
  }
  /** The icon, by name: the viewer's or one of yours. */
  get name() {
    return Ie(this, "name");
  }
  set name(t) {
    Ye(this, "name", t);
  }
  /** Its width and height in px; null for a toolbar button's. */
  get size() {
    const t = Number.parseFloat(Ie(this, "size") ?? "");
    return Number.isFinite(t) && t > 0 ? t : null;
  }
  set size(t) {
    Ye(this, "size", t == null ? null : String(t));
  }
  /** What it shows, for screen readers; without one, they skip it. */
  get label() {
    return Ie(this, "label");
  }
  set label(t) {
    Ye(this, "label", t);
  }
  describe(t) {
    return {
      kind: "icon",
      host: this,
      root: t,
      icon: this.name,
      size: this.size,
      label: this.label
    };
  }
};
ei.observedAttributes = ["name", "size", "label"];
let Wr = ei;
if (typeof customElements < "u") {
  const e = [
    ["epdf-button", Ur],
    ["epdf-menu", Gr],
    ["epdf-menu-item", R2],
    ["epdf-icon", Wr]
  ];
  for (const [t, n] of e)
    customElements.get(t) || customElements.define(t, n);
}
const Ud = "data-embedpdf-root", Vr = `[${Ud}]`, D2 = `:host{display:block;height:100%}${Vr}{all:initial;visibility:inherit;pointer-events:inherit;display:block;position:relative;isolation:isolate;contain:layout;box-sizing:border-box;height:100%;font-family:var(--epdf-font);font-size:16px;line-height:1.5;color:var(--epdf-text);color-scheme:light;tab-size:4;-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-tap-highlight-color:transparent}${Vr}.dark{color-scheme:dark}`;
let Js = null;
const $2 = () => (Js ?? (Js = [Xo(D2), Kd()]), Js);
function z2(e) {
  const t = e.engine;
  if (typeof t == "function") return { engine: t };
  if (t && typeof t.open == "function") return { engine: t };
  const n = Mo.defaultEngineProvider;
  if (!n)
    throw new Error(
      "[embedpdf] no engine: this build has no default engine. Pass one in the config (`engine: () => yourEngine()`), or import '@embedpdf/viewer' (which bundles the bundled local engine) instead of '@embedpdf/viewer/core'."
    );
  return n(t);
}
function F2(e) {
  try {
    for (const t of e.commands ?? [])
      t.icon && !(t.icon in Nc) && !(e.icons && t.icon in e.icons) && console.warn(`[embedpdf] command "${t.id}": unknown icon "${t.icon}"`);
  } catch (t) {
    console.warn("[embedpdf] invalid config:", t);
  }
}
const B2 = typeof HTMLElement > "u" ? class {
} : HTMLElement, K2 = [
  "config",
  "src",
  "theme",
  "locale",
  "disable",
  "readOnly",
  "fetch",
  "appState"
], H2 = "data-epdf-wrapped";
var Et, yt, Fe, Ne, it, Mn, st, At, Nt, Po, J, ft, qr, Yr, Oo, To, Co, Xr, Gd, Wd, Zr, uo;
const Eo = class Eo extends B2 {
  constructor() {
    super(...arguments);
    ge(this, J);
    ge(this, Et, null);
    ge(this, yt, null);
    ge(this, Fe, null);
    /** The config the running viewer shows, and the props it renders with. */
    ge(this, Ne, null);
    ge(this, it, null);
    /** What the running viewer's door makes of a `src` (`DoorEngine.sourceOf`). */
    ge(this, Mn, (n) => n);
    ge(this, st, null);
    ge(this, At, null);
    /** The ids of `src` documents still closing, which a new one must not take. */
    ge(this, Nt, /* @__PURE__ */ new Set());
    /**
     * How the viewer downloads a URL: the shown config's `fetch`, read at each download, so a new
     * one needs no new viewer.
     */
    ge(this, Po, (n, o) => ($(this, Ne)?.fetch ?? globalThis.fetch)(n, o));
    /** The viewer is live: `src` opens, then `epdf:ready` and the config's `onReady` say so. */
    ge(this, Oo, (n) => {
      ue(this, st, n), pe(this, J, Xr).call(this), this.dispatchEvent(new CustomEvent("epdf:ready", { detail: { viewer: n } })), $(this, Ne)?.onReady?.(n);
    });
    /** The active document changed: `epdf:documentchange` and the config's `onDocumentChange`. */
    ge(this, To, (n) => {
      this.dispatchEvent(new CustomEvent("epdf:documentchange", { detail: { documentId: n } })), $(this, Ne)?.onDocumentChange?.(n);
    });
    /** The user resized a panel: `epdf:panelresize` and the config's `onPanelResize`. */
    ge(this, Co, (n) => {
      this.dispatchEvent(new CustomEvent("epdf:panelresize", { detail: n })), $(this, Ne)?.onPanelResize?.(n);
    });
  }
  /**
   * The config, over the declarative attributes. Set on a running viewer, the
   * live keys change in place and any other change builds a new viewer.
   */
  set config(n) {
    ue(this, Et, n), pe(this, J, qr).call(this);
  }
  get config() {
    return C2(E2(this), $(this, Et));
  }
  /**
   * The document: a URL, a `File`, or bytes (or what the door's engine opens). Another one opens
   * in its place, `null` closes it, and `undefined` goes back to the `src` attribute.
   */
  set src(n) {
    pe(this, J, ft).call(this, { src: n });
  }
  get src() {
    return this.config.src ?? null;
  }
  /** `'light'`, `'dark'`, `'system'`, or the theme config. */
  set theme(n) {
    pe(this, J, ft).call(this, { theme: n });
  }
  get theme() {
    return this.config.theme;
  }
  /** `'auto'` or a language code. */
  set locale(n) {
    pe(this, J, ft).call(this, { locale: n });
  }
  get locale() {
    return this.config.locale;
  }
  /** The features and commands this viewer doesn't have. */
  set disable(n) {
    pe(this, J, ft).call(this, { disable: n });
  }
  get disable() {
    return this.config.disable;
  }
  /** Every feature that changes the document off, or all but `except`. */
  set readOnly(n) {
    pe(this, J, ft).call(this, { readOnly: n });
  }
  get readOnly() {
    return this.config.readOnly;
  }
  /** How a document at a URL downloads: your own `fetch`. The next download uses a new one. */
  set fetch(n) {
    pe(this, J, ft).call(this, { fetch: n });
  }
  get fetch() {
    return this.config.fetch;
  }
  /** Your app's state, which your commands read: a new value, and every button asks again. */
  set appState(n) {
    pe(this, J, ft).call(this, { appState: n });
  }
  get appState() {
    return this.config.appState;
  }
  /**
   * The viewer in code: `get(name)`, `documents`, `commands`, `watch`. Null
   * until `epdf:ready` fires (once per mount); a new one after a config change
   * builds a new viewer.
   */
  get viewer() {
    return $(this, st);
  }
  connectedCallback() {
    for (const n of K2) {
      if (!Object.prototype.hasOwnProperty.call(this, n)) continue;
      const o = Reflect.get(this, n);
      Reflect.deleteProperty(this, n), Reflect.set(this, n, o);
    }
    this.hasAttribute(H2) && $(this, Et) === null || queueMicrotask(() => {
      this.isConnected && !$(this, Fe) && pe(this, J, uo).call(this);
    });
  }
  disconnectedCallback() {
    pe(this, J, Yr).call(this);
  }
  attributeChangedCallback() {
    $(this, Fe) && pe(this, J, qr).call(this);
  }
};
Et = new WeakMap(), yt = new WeakMap(), Fe = new WeakMap(), Ne = new WeakMap(), it = new WeakMap(), Mn = new WeakMap(), st = new WeakMap(), At = new WeakMap(), Nt = new WeakMap(), Po = new WeakMap(), J = new WeakSet(), ft = function(n) {
  this.config = { ...$(this, Et), ...n };
}, /** Show the current config: in place when only live keys changed, else on a new viewer. */
qr = function() {
  if (!this.isConnected) return;
  const n = $(this, Ne);
  if (!$(this, Fe) || !n) {
    pe(this, J, uo).call(this);
    return;
  }
  const o = this.config, r = S2(n, o);
  if (r.length !== 0) {
    if (!r.every(k2)) {
      pe(this, J, uo).call(this);
      return;
    }
    if (ue(this, Ne, o), r.includes("theme") && pe(this, J, Zr).call(this, o.theme), r.some((a) => a !== "src" && a !== "fetch")) {
      const { theme: a, locale: s, disable: l, readOnly: d, appState: c } = o;
      ue(this, it, { ...$(this, it), theme: a, locale: s, disable: l, readOnly: d, appState: c }), $(this, Fe).render(Ee(qs, $(this, it)));
    }
    r.includes("src") && pe(this, J, Xr).call(this);
  }
}, Yr = function() {
  ue(this, st, null), ue(this, At, null), $(this, Nt).clear(), ue(this, Ne, null), ue(this, it, null), $(this, Fe)?.unmount(), ue(this, Fe, null);
}, Oo = new WeakMap(), To = new WeakMap(), Co = new WeakMap(), /**
 * Open the document `src` names in the place of the one the previous `src` opened, which
 * closes. `documents` takes over from `src` when the config has them.
 */
Xr = function() {
  const n = $(this, st), o = $(this, Ne);
  if (!n || !o || o.documents) return;
  const { documents: r } = n, a = $(this, At);
  ue(this, At, null);
  const s = a && r.has(a.id) ? a.id : a?.reserved, l = s ? r.getOrder().indexOf(s) : -1;
  let d = () => {
  };
  const c = new Promise((p) => d = p);
  if (o.src != null && pe(this, J, Gd).call(this, o.src, l, a ? c : void 0), a) {
    const p = a.id;
    $(this, Nt).add(p);
    const f = /* @__PURE__ */ new Set([a.reserved, p]), u = () => {
      $(this, Nt).delete(p), d();
    };
    Promise.all([...f].map((m) => r.close(m))).then(() => a.opened).then((m) => m !== null && !f.has(m) ? r.close(m) : void 0).then(u, u);
  }
}, /** Open `src` as the `src` document, at `position` in the tabs, once `after` settles. */
Gd = function(n, o, r) {
  const { documents: a } = $(this, st), s = $(this, Mn).call(this, n), l = pe(this, J, Wd).call(this, s), { source: d, name: c } = Bd(s, l, r), p = new Set(a.getOrder()), f = a.open(d, c !== void 0 ? { name: c } : {}), u = a.getOrder().find((h) => !p.has(h)), m = f.then(
    ({ document: h }) => h.id,
    () => null
  );
  if (!u) return;
  const b = { reserved: u, id: Yo(s) ? u : l, opened: m };
  ue(this, At, b), m.then((h) => {
    h !== null && (b.id = h);
  }), o >= 0 && a.move(u, o);
}, /** The id `src` asks for, or with a number after it while a document still has it. */
Wd = function(n) {
  const o = Fd(n), r = (s) => $(this, Nt).has(s) || !!$(this, st)?.documents.has(s);
  let a = o;
  for (let s = 2; r(a); s++) a = `${o}#${s}`;
  return a;
}, /** The chrome's sheets, and the theme's tokens after them, so they win over its defaults. */
Zr = function(n) {
  const o = H0(n, Vr);
  this.shadowRoot.adoptedStyleSheets = [...$2(), ...o ? [Xo(o)] : []];
}, uo = function() {
  if (!this.shadowRoot) {
    const u = this.attachShadow({ mode: "open" });
    ue(this, yt, document.createElement("div")), $(this, yt).setAttribute(Ud, ""), u.appendChild($(this, yt));
  }
  pe(this, J, Yr).call(this);
  const n = this.config;
  F2(n);
  const {
    src: o,
    documents: r,
    engine: a,
    theme: s,
    fetch: l,
    ...d
  } = n;
  pe(this, J, Zr).call(this, s), ue(this, Ne, n);
  const { engine: c, sourceOf: p = (u) => u, plugins: f } = z2(n);
  ue(this, Mn, p), ue(this, it, {
    engine: c,
    initialDocuments: r && T2(r, p),
    fetch: $(this, Po),
    theme: s,
    themeTarget: $(this, yt),
    // The viewer's own components among the children (`<epdf-button>`, `<epdf-menu>`).
    components: jr(this),
    ...d,
    plugins: M2(f, d.plugins),
    // The element's own, which call the config's after its events.
    onReady: $(this, Oo),
    onDocumentChange: $(this, To),
    onPanelResize: $(this, Co)
  }), ue(this, Fe, uh($(this, yt))), $(this, Fe).render(Ee(qs, $(this, it)));
}, Eo.observedAttributes = ["src", "locale", "theme"], Eo.defaultEngineProvider = null;
let Mo = Eo;
typeof customElements < "u" && !customElements.get("embedpdf-viewer") && customElements.define("embedpdf-viewer", Mo);
function X_(e) {
  const { target: t, ...n } = e, o = typeof t == "string" ? document.querySelector(t) : t;
  if (!o) throw new Error(`[embedpdf] init: target not found: ${String(t)}`);
  const r = document.createElement("embedpdf-viewer");
  return r.config = n, o.appendChild(r), r;
}
export {
  oe as $,
  k as A,
  j as B,
  ke as C,
  Bg as D,
  Mo as E,
  dt as F,
  Zg as G,
  Jg as H,
  Nc as I,
  Se as J,
  Ce as K,
  Vo as L,
  F_ as M,
  xg as N,
  W as O,
  za as P,
  kg as Q,
  Xg as R,
  D as S,
  Wc as T,
  ye as U,
  jh as V,
  jo as W,
  hg as X,
  ie as Y,
  Q as Z,
  jb as _,
  Ur as a,
  _a as a0,
  Hb as a1,
  yg as a2,
  gc as a3,
  vc as a4,
  Qe as a5,
  Vc as a6,
  pv as a7,
  cv as a8,
  Sn as a9,
  bb as aA,
  wa as aB,
  Jt as aC,
  Fo as aD,
  wo as aE,
  _c as aF,
  _g as aa,
  B_ as ab,
  G_ as ac,
  H_ as ad,
  K_ as ae,
  Wn as af,
  L_ as ag,
  Hh as ah,
  V_ as ai,
  W_ as aj,
  Ir as ak,
  Je as al,
  R as am,
  j_ as an,
  R_ as ao,
  sc as ap,
  bh as aq,
  ji as ar,
  yb as as,
  vb as at,
  Ae as au,
  Ze as av,
  q_ as aw,
  Ko as ax,
  V0 as ay,
  Bo as az,
  Wr as b,
  Gr as c,
  R2 as d,
  is as e,
  Ob as f,
  ct as g,
  fg as h,
  X_ as i,
  D_ as j,
  C as k,
  i as l,
  q as m,
  ve as n,
  e1 as o,
  bv as p,
  H as q,
  Re as r,
  Y_ as s,
  Z0 as t,
  Z as u,
  E as v,
  U_ as w,
  Yh as x,
  $_ as y,
  z_ as z
};
//# sourceMappingURL=init-DY-DOXIU.js.map
